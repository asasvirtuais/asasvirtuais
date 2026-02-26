'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSettings } from '@/src/settings/provider';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, EyeOff } from 'lucide-react';

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [intent, setIntent] = useState('');
  const [notifications, setNotifications] = useState(false);
  const [interval, setInterval] = useState(2);
  const [startHour, setStartHour] = useState(9);
  const [endHour, setEndHour] = useState(21);
  const router = useRouter();
  const { create, array, update } = useSettings();

  const handleNext = () => setStep(s => s + 1);

  const handleFinish = async () => {
    const settings = {
      id: 'default',
      geminiApiKey,
      intent,
      notificationsEnabled: notifications,
      notificationInterval: interval,
      notificationStartHour: startHour,
      notificationEndHour: endHour,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    if (array.length > 0) {
      await update.trigger({ id: array[0].id, data: settings });
    } else {
      await create.trigger({ data: settings });
    }

    if (notifications && 'Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted' && 'serviceWorker' in navigator) {
        // Ensure the custom service worker is registered
        const registration = await navigator.serviceWorker.register('/sw-custom.js', { scope: '/' });
        const sw = registration.active || registration.installing || registration.waiting;
        if (sw) {
          sw.postMessage({
            type: 'NOTIFICATION_SETTINGS',
            enabled: true,
            intervalHours: interval,
            startHour: startHour,
            endHour: endHour,
          });
          // Fire a test notification so the user sees it working
          sw.postMessage({ type: 'FORCE_NOTIFICATION' });
        }
      }
    }

    const today = format(new Date(), 'yyyyMMdd');
    router.push(`/chat/${today}`);
  };

  return (
    <main className="flex flex-1 flex-col items-center justify-center p-6 text-zinc-900">
      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-serif font-medium">Welcome to your diary.</h2>
              <p className="text-zinc-600 leading-relaxed">
                This is a personal AI diary that lives entirely on your device. You write every day, and it learns your life over time — summarizing your days, weeks, months, and years.
              </p>
              <p className="text-zinc-600 leading-relaxed">
                Everything you write is saved locally. No accounts, no cloud, no servers.
              </p>
              <button
                onClick={handleNext}
                className="w-full rounded-xl bg-zinc-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
              >
                Continue
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-serif font-medium">Your Gemini API Key</h2>
              <p className="text-zinc-600 text-sm leading-relaxed">
                This app uses Google&apos;s Gemini AI to power your diary assistant. You&apos;ll need your own API key to get started. You can get one for free from{' '}
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
              <button
                onClick={handleNext}
                disabled={!geminiApiKey.trim()}
                className="w-full rounded-xl bg-zinc-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-serif font-medium">How do you want to use your diary?</h2>
              <p className="text-zinc-600 text-sm">
                This sets the context for your AI assistant. (e.g., &quot;I want to track my mood and productivity,&quot; or &quot;Help me reflect on my parenting.&quot;)
              </p>
              <textarea
                value={intent}
                onChange={e => setIntent(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-white p-4 text-zinc-900 shadow-sm focus:border-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400 min-h-[120px] resize-none"
                placeholder="I want to..."
              />
              <button
                onClick={handleNext}
                disabled={!intent.trim()}
                className="w-full rounded-xl bg-zinc-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-serif font-medium">Reminders</h2>
              <p className="text-zinc-600 text-sm">
                We can remind you to write if you haven&apos;t yet today.
              </p>

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

              <button
                onClick={handleFinish}
                className="w-full rounded-xl bg-zinc-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
              >
                Start Writing
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
