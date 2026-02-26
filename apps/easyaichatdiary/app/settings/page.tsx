'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSettings } from '@/src/settings/provider';
import { useDays } from '@/src/days/provider';
import { useSummaries } from '@/src/summaries/provider';
import { motion } from 'motion/react';
import { ArrowLeft, Save, Eye, EyeOff, Download } from 'lucide-react';

function toYaml(data: unknown, indent = 0): string {
  const pad = '  '.repeat(indent);

  if (data === null || data === undefined) {
    return 'null';
  }
  if (typeof data === 'boolean') {
    return data ? 'true' : 'false';
  }
  if (typeof data === 'number') {
    return String(data);
  }
  if (typeof data === 'string') {
    if (data.includes('\n')) {
      const lines = data.split('\n');
      return '|\n' + lines.map(l => pad + '  ' + l).join('\n');
    }
    if (/[:#{}[\],&*?|><=%@`!]/.test(data) || data === '' || /^\s|\s$/.test(data)) {
      return JSON.stringify(data);
    }
    return data;
  }
  if (Array.isArray(data)) {
    if (data.length === 0) return '[]';
    return '\n' + data.map(item => {
      const val = toYaml(item, indent + 1);
      if (typeof item === 'object' && item !== null) {
        return pad + '- ' + val.trimStart();
      }
      return pad + '- ' + val;
    }).join('\n');
  }
  if (typeof data === 'object') {
    const entries = Object.entries(data as Record<string, unknown>);
    if (entries.length === 0) return '{}';
    return entries.map(([key, value]) => {
      const val = toYaml(value, indent + 1);
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        return pad + key + ':\n' + val;
      }
      if (Array.isArray(value) && value.length > 0) {
        return pad + key + ':' + val;
      }
      return pad + key + ': ' + val;
    }).join('\n');
  }
  return String(data);
}

export default function SettingsPage() {
  const router = useRouter();
  const { array, update, list } = useSettings();
  const { array: days, list: listDays } = useDays();
  const { array: summaries, list: listSummaries } = useSummaries();

  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [intent, setIntent] = useState('');
  const [notifications, setNotifications] = useState(false);
  const [interval, setInterval] = useState(2);
  const [startHour, setStartHour] = useState(9);
  const [endHour, setEndHour] = useState(21);
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    list.trigger({});
    listDays.trigger({});
    listSummaries.trigger({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (array.length > 0) {
      const settings = array[0];
      setGeminiApiKey(settings.geminiApiKey || '');
      setIntent(settings.intent || '');
      setNotifications(settings.notificationsEnabled || false);
      setInterval(settings.notificationInterval || 2);
      setStartHour(settings.notificationStartHour || 9);
      setEndHour(settings.notificationEndHour || 21);
    }
  }, [array]);

  const handleSave = async () => {
    if (array.length === 0) return;

    setLoading(true);
    try {
      const settings = {
        geminiApiKey,
        intent,
        notificationsEnabled: notifications,
        notificationInterval: interval,
        notificationStartHour: startHour,
        notificationEndHour: endHour,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      };

      await update.trigger({ id: array[0].id, data: settings });

      if (notifications && 'Notification' in window) {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          // Send updated settings to the custom service worker
          const registration = await navigator.serviceWorker.getRegistration('/sw-custom.js');
          if (registration) {
            const sw = registration.active || registration.installing || registration.waiting;
            if (sw) {
              sw.postMessage({
                type: 'NOTIFICATION_SETTINGS',
                enabled: true,
                intervalHours: interval,
                startHour: startHour,
                endHour: endHour,
              });
              // Fire a test notification so the user knows it works
              sw.postMessage({ type: 'FORCE_NOTIFICATION' });
            }
          }
        }
      }

      router.back();
    } catch (error) {
      console.error('Failed to save settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportYaml = () => {
    setExporting(true);
    try {
      const exportData = {
        exportedAt: new Date().toISOString(),
        days: days.map(d => ({
          id: d.id,
          summary: d.summary || null,
          messages: (d.messages || []).map(m => ({
            id: m.id,
            role: m.role,
            content: m.content,
            timestamp: m.timestamp,
          })),
        })),
        summaries: summaries.map(s => ({
          id: s.id,
          type: s.type,
          content: s.content || null,
        })),
      };

      const yamlContent = '# EasyAI Diary Export\n# Generated: ' + exportData.exportedAt + '\n\n' + toYaml(exportData);

      const blob = new Blob([yamlContent], { type: 'text/yaml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `easyai-diary-export-${new Date().toISOString().split('T')[0]}.yaml`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to export:', error);
      alert('Failed to export data.');
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden font-sans">
      <header className="flex items-center justify-between border-b border-zinc-200 bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="p-2 text-zinc-500 hover:text-zinc-900 transition-colors">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-serif font-medium text-zinc-900">
            Settings
          </h1>
        </div>
        <button
          onClick={handleSave}
          disabled={loading}
          className="flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-zinc-800 disabled:opacity-50"
        >
          <Save size={16} />
          {loading ? 'Saving...' : 'Save'}
        </button>
      </header>

      <main className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-2xl space-y-8">
          <section className="space-y-4">
            <h2 className="text-lg font-serif font-medium text-zinc-900">Gemini API Key</h2>
            <p className="text-zinc-600 text-sm">
              Your Gemini API key is required for the AI assistant to work. Get one from{' '}
              <a
                href="https://aistudio.google.com/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-900 underline underline-offset-2 hover:text-zinc-700"
              >
                Google AI Studio
              </a>.
            </p>
            <p className="text-zinc-500 text-xs">
              Your key is stored locally on your device and never sent to any server other than Google&apos;s API.
            </p>
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={geminiApiKey}
                onChange={e => setGeminiApiKey(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-white p-4 pr-12 text-zinc-900 shadow-sm focus:border-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400 font-mono text-sm"
                placeholder="AIzaSy..."
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-700 transition-colors"
              >
                {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-serif font-medium text-zinc-900">Your Intent</h2>
            <p className="text-zinc-600 text-sm">
              This sets the context for your AI assistant. (e.g., &quot;I want to track my mood and productivity,&quot; or &quot;Help me reflect on my parenting.&quot;)
            </p>
            <textarea
              value={intent}
              onChange={e => setIntent(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-white p-4 text-zinc-900 shadow-sm focus:border-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400 min-h-[120px] resize-none"
              placeholder="I want to..."
            />
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-serif font-medium text-zinc-900">Reminders</h2>
            <div className="space-y-4 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="font-medium text-zinc-900">Enable notifications</span>
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={e => setNotifications(e.target.checked)}
                  className="h-5 w-5 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900"
                />
              </label>

              {notifications && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-4 pt-4 border-t border-zinc-100"
                >
                  <div>
                    <label className="block text-sm text-zinc-600 mb-1">Remind me every</label>
                    <select
                      value={interval}
                      onChange={e => setInterval(Number(e.target.value))}
                      className="w-full rounded-lg border border-zinc-200 p-2 text-zinc-900 focus:border-zinc-400 focus:outline-none"
                    >
                      {[1, 2, 3, 4, 5].map(h => (
                        <option key={h} value={h}>{h} hour{h > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-sm text-zinc-600 mb-1">Between</label>
                      <select
                        value={startHour}
                        onChange={e => setStartHour(Number(e.target.value))}
                        className="w-full rounded-lg border border-zinc-200 p-2 text-zinc-900 focus:border-zinc-400 focus:outline-none"
                      >
                        {Array.from({ length: 24 }).map((_, i) => (
                          <option key={i} value={i}>{i}:00</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm text-zinc-600 mb-1">And</label>
                      <select
                        value={endHour}
                        onChange={e => setEndHour(Number(e.target.value))}
                        className="w-full rounded-lg border border-zinc-200 p-2 text-zinc-900 focus:border-zinc-400 focus:outline-none"
                      >
                        {Array.from({ length: 24 }).map((_, i) => (
                          <option key={i} value={i}>{i}:00</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-serif font-medium text-zinc-900">Data</h2>
            <p className="text-zinc-600 text-sm">
              Export all your diary data (chats and summaries) as a YAML file for backup or portability.
            </p>
            <button
              onClick={handleExportYaml}
              disabled={exporting}
              className="flex items-center gap-3 w-full rounded-xl border border-zinc-200 bg-white px-6 py-4 text-zinc-900 shadow-sm transition-all hover:bg-zinc-50 hover:border-zinc-300 disabled:opacity-50"
            >
              <Download size={20} />
              <div className="text-left">
                <div className="font-medium">{exporting ? 'Exporting...' : 'Export as YAML'}</div>
                <div className="text-xs text-zinc-500">Download all chats and summaries</div>
              </div>
            </button>
          </section>
        </div>
      </main>
    </div>
  );
}
