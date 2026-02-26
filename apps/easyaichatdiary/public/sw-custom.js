/// EasyAI Diary – Custom Service Worker
/// Handles background notifications independently of the React app.

// ─── Notification Settings (updated via postMessage from the app) ────────────
let notificationSettings = {
    enabled: false,
    intervalHours: 2,
    startHour: 9,
    endHour: 21,
};

let lastNotifiedTimestamp = 0;

const REMINDERS = [
    "How's your day going? Take a moment to jot something down.",
    "Haven't heard from you today — what's on your mind?",
    "A quick note now is a memory you'll treasure later.",
    "Your diary is waiting. Even one sentence counts.",
    "Take 2 minutes to reflect on your day so far.",
    "What happened today that you don't want to forget?",
    "Your future self will thank you for writing today.",
    "Pause for a moment. How are you feeling right now?",
    "Don't forget to write in your diary today! 📝",
    "Hey! Your diary misses you. Write a quick entry!",
];

function getRandomReminder() {
    return REMINDERS[Math.floor(Math.random() * REMINDERS.length)];
}

// ─── Check and fire a notification ──────────────────────────────────────────
function checkAndNotify() {
    if (!notificationSettings.enabled) return;

    const now = new Date();
    const currentHour = now.getHours();

    // Only notify within configured hours
    if (currentHour < notificationSettings.startHour || currentHour >= notificationSettings.endHour) return;

    // Check interval
    const msInterval = notificationSettings.intervalHours * 60 * 60 * 1000;
    const elapsed = Date.now() - lastNotifiedTimestamp;
    if (elapsed < msInterval) return;

    // Fire!
    lastNotifiedTimestamp = Date.now();

    self.registration.showNotification('EasyAI Diary 📝', {
        body: getRandomReminder(),
        icon: '/icons/icon-512x512.png',
        badge: '/icons/icon-512x512.png',
        tag: 'diary-reminder',
        renotify: true,
        data: { url: '/' },
        vibrate: [200, 100, 200],
        requireInteraction: false,
        actions: [
            { action: 'open', title: 'Write now' },
            { action: 'dismiss', title: 'Later' },
        ],
    });
}

// ─── Interval-based checker (runs every 60s while SW is alive) ──────────────
let checkIntervalId = null;

function startCheckInterval() {
    if (checkIntervalId) clearInterval(checkIntervalId);
    // Check every 60 seconds
    checkIntervalId = setInterval(checkAndNotify, 60 * 1000);
    // Also check immediately
    checkAndNotify();
}

// ─── Message handler: receive settings from the React app ───────────────────
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'NOTIFICATION_SETTINGS') {
        notificationSettings = {
            enabled: event.data.enabled ?? false,
            intervalHours: event.data.intervalHours ?? 2,
            startHour: event.data.startHour ?? 9,
            endHour: event.data.endHour ?? 21,
        };
        console.log('[SW] Notification settings updated:', notificationSettings);
        startCheckInterval();
    }

    if (event.data && event.data.type === 'FORCE_NOTIFICATION') {
        // For testing: immediately fire a notification
        self.registration.showNotification('EasyAI Diary 📝', {
            body: 'Don\'t forget to add entries to your diary today! 📝',
            icon: '/icons/icon-512x512.png',
            badge: '/icons/icon-512x512.png',
            tag: 'diary-reminder-test',
            renotify: true,
            data: { url: '/' },
            vibrate: [200, 100, 200],
        });
    }
});

// ─── Notification click: open / focus the app ───────────────────────────────
self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    if (event.action === 'dismiss') return;

    const targetUrl = event.notification.data?.url || '/';

    event.waitUntil(
        self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            // If a window is already open, focus it
            for (const client of clientList) {
                if (client.url.includes(self.location.origin) && 'focus' in client) {
                    return client.focus();
                }
            }
            // Otherwise open a new window
            if (self.clients.openWindow) {
                return self.clients.openWindow(targetUrl);
            }
        })
    );
});

// ─── Activate: claim clients immediately ────────────────────────────────────
self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
    console.log('[SW] Activated and claimed clients');
    startCheckInterval();
});

// ─── Install: skip waiting ──────────────────────────────────────────────────
self.addEventListener('install', (event) => {
    self.skipWaiting();
    console.log('[SW] Installed');
});

// ─── Periodic Background Sync (where supported, e.g. Chrome on Android) ────
self.addEventListener('periodicsync', (event) => {
    if (event.tag === 'diary-notification-check') {
        event.waitUntil(checkAndNotify());
    }
});
