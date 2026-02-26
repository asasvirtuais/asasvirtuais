import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Providers } from './providers';
import { NotificationScheduler } from './notification-scheduler';

const APP_NAME = 'EasyAI Diary';
const APP_DESCRIPTION = 'Keep track of everything you do.';

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_NAME,
    template: `%s — ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_NAME,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: APP_NAME,
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: '#18181B',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className="h-screen flex flex-col overflow-hidden bg-zinc-50">
        <Providers>
          <NotificationScheduler />
          {children}
        </Providers>
      </body>
    </html>
  );
}
