'use client';
import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useDays } from '@/src/days/provider';
import { useSettings } from '@/src/settings/provider';
import { useSummaries } from '@/src/summaries/provider';
import { format, parse } from 'date-fns';
import { generateChatResponse, compressConversation, generateDailySummary } from '@/src/ai';
import { motion } from 'motion/react';
import { Calendar, Settings, Minimize2, Trash2, Edit2, Check, X } from 'lucide-react';

export default function ChatPage() {
  const params = useParams();
  const dateStr = params.date as string;
  const router = useRouter();
  const date = parse(dateStr, 'yyyyMMdd', new Date());

  const { array: days, create: createDay, update: updateDay, list: listDays } = useDays();
  const { array: settings, list: listSettings } = useSettings();
  const { array: summaries, list: listSummaries } = useSummaries();

  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listDays.trigger({});
    listSettings.trigger({});
    listSummaries.trigger({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const day = days.find(d => d.id === dateStr);
    const newMessages = day?.messages || [];
    setMessages(prev => {
      if (prev.length !== newMessages.length) return newMessages;
      if (JSON.stringify(prev) !== JSON.stringify(newMessages)) return newMessages;
      return prev;
    });
  }, [days, dateStr]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const saveMessages = async (newMessages: any[]) => {
    const day = days.find(d => d.id === dateStr);
    if (day) {
      await updateDay.trigger({ id: dateStr, data: { messages: newMessages } });
    } else {
      await createDay.trigger({ data: { id: dateStr, messages: newMessages } });
    }
    setMessages(newMessages);
  };

  const handleSend = async () => {

    const userMessage = input.trim();
    setInput('');

    let newMessages = [...messages];
    if (userMessage) {
      newMessages.push({
        id: Date.now().toString(),
        role: 'user',
        content: userMessage,
        timestamp: Date.now(),
      });
      await saveMessages(newMessages);

      // Track last write for notification suppression
      localStorage.setItem('easyai-diary-last-write', new Date().toISOString().split('T')[0]);
    }

    setLoading(true);
    try {
      const apiKey = settings[0]?.geminiApiKey;
      if (!apiKey) {
        alert('Please set your Gemini API Key in Settings first.');
        setLoading(false);
        return;
      }
      const intent = settings[0]?.intent || 'A personal diary';
      const response = await generateChatResponse(apiKey, intent, format(date, 'yyyy-MM-dd'), summaries, days, newMessages);

      newMessages.push({
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: Date.now(),
      });
      await saveMessages(newMessages);
    } catch (error) {
      console.error('Failed to generate response:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCompress = async () => {
    if (messages.length === 0) return;
    const apiKey = settings[0]?.geminiApiKey;
    if (!apiKey) {
      alert('Please set your Gemini API Key in Settings first.');
      return;
    }
    setLoading(true);
    try {
      const compressed = await compressConversation(apiKey, messages);
      const newMessages = [{
        id: Date.now().toString(),
        role: 'assistant',
        content: `*Conversation compressed*\n\n${compressed}`,
        timestamp: Date.now(),
      }];
      await saveMessages(newMessages);
    } catch (error) {
      console.error('Failed to compress:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = async () => {
    if (confirm('Are you sure you want to clear today\'s conversation?')) {
      await saveMessages([]);
    }
  };

  const handleEdit = (id: string, content: string) => {
    setEditingId(id);
    setEditContent(content);
  };

  const saveEdit = async (id: string) => {
    const newMessages = messages.map(m => m.id === id ? { ...m, content: editContent } : m);
    await saveMessages(newMessages);
    setEditingId(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this message?')) {
      const newMessages = messages.filter(m => m.id !== id);
      await saveMessages(newMessages);
    }
  };

  const handleGenerateSummary = async () => {
    if (messages.length === 0) return;
    const apiKey = settings[0]?.geminiApiKey;
    if (!apiKey) {
      alert('Please set your Gemini API Key in Settings first.');
      return;
    }
    setLoading(true);
    try {
      const summary = await generateDailySummary(apiKey, format(date, 'EEEE, MMMM d, yyyy'), messages);
      const day = days.find(d => d.id === dateStr);
      if (day) {
        await updateDay.trigger({ id: dateStr, data: { summary } });
      } else {
        await createDay.trigger({ data: { id: dateStr, messages, summary } });
      }
      alert('Daily summary generated!');
    } catch (error) {
      console.error('Failed to generate summary:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden font-sans">
      <header className="flex items-center justify-between border-b border-zinc-200 bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-serif font-medium text-zinc-900">
            {format(date, 'MMMM d, yyyy')}
          </h1>

        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleCompress} className="p-2 text-zinc-500 hover:text-zinc-900 transition-colors" title="Compress Conversation">
            <Minimize2 size={20} />
          </button>
          <button onClick={handleClear} className="p-2 text-zinc-500 hover:text-red-600 transition-colors" title="Clear Conversation">
            <Trash2 size={20} />
          </button>
          <button onClick={() => router.push('/calendar')} className="p-2 text-zinc-500 hover:text-zinc-900 transition-colors" title="Calendar">
            <Calendar size={20} />
          </button>
          <button onClick={() => router.push('/settings')} className="p-2 text-zinc-500 hover:text-zinc-900 transition-colors" title="Settings">
            <Settings size={20} />
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center text-zinc-400 font-serif italic">
            No entries for this day.
          </div>
        ) : (
          messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`group relative max-w-[80%] rounded-2xl px-5 py-3 shadow-sm ${msg.role === 'user'
                  ? 'bg-zinc-900 text-white rounded-br-sm'
                  : 'bg-white text-zinc-900 border border-zinc-200 rounded-bl-sm'
                  }`}
              >
                {editingId === msg.id ? (
                  <div className="flex flex-col gap-2">
                    <textarea
                      value={editContent}
                      onChange={e => setEditContent(e.target.value)}
                      className="w-full bg-transparent border-b border-current focus:outline-none resize-none min-h-[60px]"
                    />
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setEditingId(null)} className="p-1 hover:opacity-70"><X size={16} /></button>
                      <button onClick={() => saveEdit(msg.id)} className="p-1 hover:opacity-70"><Check size={16} /></button>
                    </div>
                  </div>
                ) : (
                  <div className="whitespace-pre-wrap leading-relaxed">{msg.content}</div>
                )}

                {editingId !== msg.id && (
                  <div className={`absolute top-2 ${msg.role === 'user' ? '-left-16' : '-right-16'} hidden group-hover:flex gap-1`}>
                    <button onClick={() => handleEdit(msg.id, msg.content)} className="p-1.5 text-zinc-400 hover:text-zinc-900 bg-white rounded-full shadow-sm border border-zinc-100"><Edit2 size={14} /></button>
                    <button onClick={() => handleDelete(msg.id)} className="p-1.5 text-zinc-400 hover:text-red-600 bg-white rounded-full shadow-sm border border-zinc-100"><Trash2 size={14} /></button>
                  </div>
                )}
              </div>
            </motion.div>
          ))
        )}
        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <div className="max-w-[80%] rounded-2xl bg-white border border-zinc-200 px-5 py-3 shadow-sm rounded-bl-sm text-zinc-500 italic">
              Thinking...
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </main>

      <footer className="border-t border-zinc-200 bg-white p-4">
        <div className="mx-auto flex max-w-4xl items-end gap-4">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Write something..."
            className="max-h-32 min-h-[56px] flex-1 resize-none rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-4 text-zinc-900 focus:border-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400"
            rows={1}
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="flex h-14 items-center justify-center rounded-2xl bg-zinc-900 px-6 font-medium text-white transition-colors hover:bg-zinc-800 disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </footer>
    </div>
  );
}
