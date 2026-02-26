'use client';
import { useSettings } from '@/src/settings/provider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { format } from 'date-fns';
import { motion } from 'motion/react';

export default function Home() {
  const { array, list } = useSettings();
  const router = useRouter();

  useEffect(() => {
    list.trigger({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStart = () => {
    if (array.length > 0 && array[0].intent && array[0].geminiApiKey) {
      const today = format(new Date(), 'yyyyMMdd');
      router.push(`/chat/${today}`);
    } else {
      router.push('/onboarding');
    }
  };

  return (
    <main className="flex flex-1 flex-col items-center justify-center p-6 text-zinc-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-md text-center"
      >
        <h1 className="mb-4 text-5xl font-serif font-medium tracking-tight text-zinc-900">
          EasyAI Diary
        </h1>
        <p className="mb-12 text-lg text-zinc-600 font-serif italic">
          &quot;Keep track of everything you do.&quot;
        </p>
        <button
          onClick={handleStart}
          className="rounded-full bg-zinc-900 px-8 py-4 text-sm font-medium text-white shadow-sm transition-all hover:bg-zinc-800 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2"
        >
          Start your diary
        </button>
        <div className="mt-8">
          <a
            href="https://www.buymeacoffee.com/asasvirtuais.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
              alt="Buy Me A Coffee"
              style={{ height: 36 }}
              className="mx-auto"
            />
          </a>
        </div>
      </motion.div>
    </main>
  );
}
