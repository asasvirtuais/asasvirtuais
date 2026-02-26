'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDays } from '@/src/days/provider';
import { useSummaries } from '@/src/summaries/provider';
import { useSettings } from '@/src/settings/provider';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, parse, getWeek } from 'date-fns';
import { generateDailySummary, generateWeeklySummary, generateMonthlySummary, generateYearlySummary } from '@/src/ai';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, X, Calendar as CalendarIcon, Edit2, Check } from 'lucide-react';

export default function CalendarPage() {
  const router = useRouter();
  const { array: days, list: listDays, update: updateDay, create: createDay } = useDays();
  const { array: summaries, list: listSummaries, create: createSummary, update: updateSummary } = useSummaries();
  const { array: settingsArray, list: listSettings } = useSettings();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedItem, setSelectedItem] = useState<{ type: 'day' | 'week' | 'month' | 'year', id: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const [isEditingSummary, setIsEditingSummary] = useState(false);
  const [editSummaryContent, setEditSummaryContent] = useState('');

  useEffect(() => {
    listDays.trigger({});
    listSummaries.trigger({});
    listSettings.trigger({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setIsEditingSummary(false);
    setEditSummaryContent('');
  }, [selectedItem]);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const handlePrevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  const handleGoToToday = () => {
    const today = format(new Date(), 'yyyyMMdd');
    router.push(`/chat/${today}`);
  };

  const getDaySummary = (dateStr: string) => days.find(d => d.id === dateStr)?.summary;
  const getSummary = (id: string) => summaries.find(s => s.id === id)?.content;

  const handleEditSummary = () => {
    if (!selectedItem) return;
    const content = selectedItem.type === 'day'
      ? getDaySummary(selectedItem.id)
      : getSummary(selectedItem.id);
    setEditSummaryContent(content || '');
    setIsEditingSummary(true);
  };

  const handleSaveSummary = async () => {
    if (!selectedItem) return;
    setLoading(true);
    try {
      if (selectedItem.type === 'day') {
        const day = days.find(d => d.id === selectedItem.id);
        if (day) {
          await updateDay.trigger({ id: selectedItem.id, data: { summary: editSummaryContent } });
        } else {
          await createDay.trigger({ data: { id: selectedItem.id, messages: [], summary: editSummaryContent } });
        }
      } else {
        const existing = summaries.find(s => s.id === selectedItem.id);
        if (existing) {
          await updateSummary.trigger({ id: selectedItem.id, data: { content: editSummaryContent } });
        } else {
          const typeMap = { week: 'weekly', month: 'monthly', year: 'yearly' } as const;
          await createSummary.trigger({ data: { id: selectedItem.id, type: typeMap[selectedItem.type as keyof typeof typeMap], content: editSummaryContent } });
        }
      }
      setIsEditingSummary(false);
    } catch (error) {
      console.error('Failed to save summary:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    if (!selectedItem) return;
    const apiKey = settingsArray[0]?.geminiApiKey;
    if (!apiKey) {
      alert('Please set your Gemini API Key in Settings first.');
      return;
    }
    setLoading(true);
    try {
      if (selectedItem.type === 'day') {
        const day = days.find(d => d.id === selectedItem.id);
        if (day && day.messages) {
          const dayDate = parse(selectedItem.id, 'yyyyMMdd', new Date());
          const dateLabel = format(dayDate, 'EEEE, MMMM d, yyyy');
          const summary = await generateDailySummary(apiKey, dateLabel, day.messages);
          await updateDay.trigger({ id: selectedItem.id, data: { summary } });
        }
      } else if (selectedItem.type === 'week') {
        const [yearStr, weekStr] = selectedItem.id.split('-W');
        const targetYear = parseInt(yearStr, 10);
        const targetWeek = parseInt(weekStr, 10);

        const weekDays = days.filter(d => {
          const date = parse(d.id, 'yyyyMMdd', new Date());
          return parseInt(format(date, 'yyyy'), 10) === targetYear && getWeek(date) === targetWeek;
        }).filter(d => d.summary);

        const weekSummaries = weekDays.map(d => ({
          label: format(parse(d.id, 'yyyyMMdd', new Date()), 'EEEE, MMMM d, yyyy'),
          content: d.summary as string,
        }));

        if (weekSummaries.length > 0) {
          const summary = await generateWeeklySummary(apiKey, weekSummaries);
          const existing = summaries.find(s => s.id === selectedItem.id);
          if (existing) await updateSummary.trigger({ id: selectedItem.id, data: { content: summary } });
          else await createSummary.trigger({ data: { id: selectedItem.id, type: 'weekly', content: summary } });
        }
      } else if (selectedItem.type === 'month') {
        const monthWeeklySummaries = summaries
          .filter(s => s.type === 'weekly' && s.id.startsWith(selectedItem.id) && s.content)
          .map(s => ({ label: `Week ${s.id}`, content: s.content as string }));

        if (monthWeeklySummaries.length > 0) {
          const summary = await generateMonthlySummary(apiKey, monthWeeklySummaries);
          const existing = summaries.find(s => s.id === selectedItem.id);
          if (existing) await updateSummary.trigger({ id: selectedItem.id, data: { content: summary } });
          else await createSummary.trigger({ data: { id: selectedItem.id, type: 'monthly', content: summary } });
        }
      } else if (selectedItem.type === 'year') {
        const yearMonthlySummaries = summaries
          .filter(s => s.type === 'monthly' && s.id.startsWith(selectedItem.id) && s.content)
          .map(s => {
            const monthDate = parse(s.id, 'yyyy-MM', new Date());
            return { label: format(monthDate, 'MMMM yyyy'), content: s.content as string };
          });

        if (yearMonthlySummaries.length > 0) {
          const summary = await generateYearlySummary(apiKey, yearMonthlySummaries);
          const existing = summaries.find(s => s.id === selectedItem.id);
          if (existing) await updateSummary.trigger({ id: selectedItem.id, data: { content: summary } });
          else await createSummary.trigger({ data: { id: selectedItem.id, type: 'yearly', content: summary } });
        }
      }
    } catch (error) {
      console.error('Failed to generate summary:', error);
    } finally {
      setLoading(false);
    }
  };

  const weeks: (Date | null)[][] = [];
  let currentWeek: (Date | null)[] = Array(7).fill(null);
  let currentDayOfWeek = monthStart.getDay();

  monthDays.forEach(day => {
    currentWeek[currentDayOfWeek] = day;
    currentDayOfWeek++;
    if (currentDayOfWeek === 7) {
      weeks.push(currentWeek);
      currentWeek = Array(7).fill(null);
      currentDayOfWeek = 0;
    }
  });
  if (currentDayOfWeek > 0) {
    weeks.push(currentWeek);
  }

  return (
    <div className="flex flex-1 overflow-hidden font-sans relative">
      <main className="flex-1 flex flex-col p-4 md:p-8 overflow-y-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div className="flex items-center justify-between w-full md:w-auto gap-4">
            <h1
              className="text-2xl md:text-3xl font-serif font-medium text-zinc-400 cursor-pointer hover:text-zinc-600 transition-colors"
              onClick={() => setSelectedItem({ type: 'year', id: format(currentDate, 'yyyy') })}
            >
              {format(currentDate, 'yyyy')}
            </h1>

            <div className="flex items-center gap-2 md:gap-4">
              <button onClick={handlePrevMonth} className="p-1 md:p-2 rounded-full hover:bg-zinc-200 transition-colors"><ChevronLeft /></button>
              <h1
                className="text-2xl md:text-3xl font-serif font-medium cursor-pointer hover:text-zinc-600 transition-colors min-w-[120px] md:min-w-[150px] text-center"
                onClick={() => setSelectedItem({ type: 'month', id: format(currentDate, 'yyyy-MM') })}
              >
                {format(currentDate, 'MMMM')}
              </h1>
              <button onClick={handleNextMonth} className="p-1 md:p-2 rounded-full hover:bg-zinc-200 transition-colors"><ChevronRight /></button>
            </div>
          </div>

          <button
            onClick={handleGoToToday}
            className="flex items-center gap-2 rounded-full bg-zinc-900 px-4 md:px-6 py-2 md:py-3 text-sm font-medium text-white shadow-sm transition-all hover:bg-zinc-800 w-full md:w-auto justify-center"
          >
            <CalendarIcon size={16} />
            Go to Today
          </button>
        </div>

        <div className="grid grid-cols-8 gap-1 md:gap-4 mb-2 md:mb-4">
          {['Wk', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-xs md:text-sm font-medium text-zinc-500 uppercase tracking-wider truncate">{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-8 gap-1 md:gap-4">
          {weeks.map((week, weekIndex) => {
            const firstValidDay = week.find(d => d !== null);
            const weekNum = firstValidDay ? getWeek(firstValidDay) : '';
            const weekId = firstValidDay ? `${format(firstValidDay, 'yyyy')}-W${weekNum}` : '';

            return (
              <React.Fragment key={`week-${weekIndex}`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => weekId && setSelectedItem({ type: 'week', id: weekId })}
                  className="relative h-16 md:h-32 cursor-pointer rounded-lg md:rounded-2xl border border-zinc-200 bg-zinc-100 p-1 md:p-4 transition-all hover:bg-zinc-200 flex items-center justify-center"
                >
                  <div className="text-sm md:text-lg font-serif text-zinc-500">
                    {weekNum}
                  </div>
                </motion.div>

                {week.map((day, dayIndex) => {
                  if (!day) {
                    return <div key={`empty-${weekIndex}-${dayIndex}`} className="h-16 md:h-32 rounded-lg md:rounded-2xl bg-zinc-100/50 border border-zinc-100" />;
                  }

                  const dateStr = format(day, 'yyyyMMdd');
                  const hasData = days.some(d => d.id === dateStr);
                  const isCurrent = isToday(day);

                  return (
                    <motion.div
                      key={dateStr}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedItem({ type: 'day', id: dateStr })}
                      className={`relative h-16 md:h-32 cursor-pointer rounded-lg md:rounded-2xl border p-1 md:p-4 transition-all ${isCurrent ? 'border-zinc-900 bg-zinc-900 text-white shadow-md' :
                        hasData ? 'border-zinc-300 bg-white shadow-sm hover:border-zinc-400' :
                          'border-zinc-200 bg-zinc-50 hover:bg-white'
                        }`}
                    >
                      <div className={`text-sm md:text-lg font-serif ${isCurrent ? 'text-white' : 'text-zinc-900'}`}>
                        {format(day, 'd')}
                      </div>
                      {hasData && !isCurrent && (
                        <div className="absolute bottom-1 right-1 md:bottom-4 md:right-4 h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-zinc-900" />
                      )}
                    </motion.div>
                  );
                })}
              </React.Fragment>
            );
          })}
        </div>
      </main>

      <AnimatePresence>
        {selectedItem && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="fixed inset-0 bg-black/20 z-40 md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full md:w-96 md:relative border-l border-zinc-200 bg-white p-6 md:p-8 shadow-2xl flex flex-col z-50"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-serif font-medium text-zinc-900 capitalize">
                  {selectedItem.type} Summary
                </h2>
                <div className="flex items-center gap-2">
                  {!isEditingSummary && (
                    <button onClick={handleEditSummary} className="p-2 text-zinc-400 hover:text-zinc-900 transition-colors rounded-full hover:bg-zinc-100">
                      <Edit2 size={16} />
                    </button>
                  )}
                  <button onClick={() => setSelectedItem(null)} className="p-2 text-zinc-400 hover:text-zinc-900 transition-colors rounded-full hover:bg-zinc-100">
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                {isEditingSummary ? (
                  <div className="space-y-4 h-full flex flex-col">
                    <textarea
                      value={editSummaryContent}
                      onChange={e => setEditSummaryContent(e.target.value)}
                      className="flex-1 w-full rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-zinc-900 focus:border-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400 resize-none"
                      placeholder="Write your summary here..."
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => setIsEditingSummary(false)}
                        className="flex-1 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-900 shadow-sm transition-all hover:bg-zinc-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveSummary}
                        disabled={loading}
                        className="flex-1 rounded-xl bg-zinc-900 px-4 py-3 text-sm font-medium text-white shadow-sm transition-all hover:bg-zinc-800 disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        <Check size={16} />
                        {loading ? 'Saving...' : 'Save'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {selectedItem.type === 'day' ? (
                      <div className="space-y-6">
                        <div className="text-sm font-medium text-zinc-500 uppercase tracking-wider">
                          {format(parse(selectedItem.id, 'yyyyMMdd', new Date()), 'MMMM d, yyyy')}
                        </div>
                        {getDaySummary(selectedItem.id) ? (
                          <div className="prose prose-zinc">
                            <p className="text-zinc-700 leading-relaxed">{getDaySummary(selectedItem.id)}</p>
                          </div>
                        ) : (
                          <div className="text-zinc-500 italic">No summary generated yet.</div>
                        )}
                        <button
                          onClick={() => router.push(`/chat/${selectedItem.id}`)}
                          className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-900 shadow-sm transition-all hover:bg-zinc-50 hover:border-zinc-300"
                        >
                          View Full Chat
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="text-sm font-medium text-zinc-500 uppercase tracking-wider">
                          {selectedItem.id}
                        </div>
                        {getSummary(selectedItem.id) ? (
                          <div className="prose prose-zinc">
                            <p className="text-zinc-700 leading-relaxed">{getSummary(selectedItem.id)}</p>
                          </div>
                        ) : (
                          <div className="text-zinc-500 italic">No summary generated yet.</div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>

              {!isEditingSummary && (
                <div className="pt-6 border-t border-zinc-100 mt-auto">
                  <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="w-full rounded-xl bg-zinc-900 px-4 py-3 text-sm font-medium text-white shadow-sm transition-all hover:bg-zinc-800 disabled:opacity-50"
                  >
                    {loading ? 'Generating...' : 'Generate Summary'}
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

