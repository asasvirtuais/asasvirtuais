'use client';

import { useEffect, useRef } from 'react';
import { useSettings } from '@/src/settings/provider';

/**
 * NotificationScheduler
 * 
 * Registers a custom service worker and forwards notification settings to it.
 * The service worker then handles background notification scheduling independently
 * of whether the app tab is open.
 * 
 * Also attempts to register for Periodic Background Sync on supported browsers
 * (Chrome Android) so the SW can wake up and check even when the app is closed.
 */
export function NotificationScheduler() {
    const { array, list } = useSettings();
    const swRegistrationRef = useRef<ServiceWorkerRegistration | null>(null);
    const settingsSentRef = useRef(false);

    // Load settings on mount
    useEffect(() => {
        list.trigger({});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Register the custom service worker on mount
    useEffect(() => {
        if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;

        navigator.serviceWorker
            .register('/sw-custom.js', { scope: '/' })
            .then((registration) => {
                console.log('[NotificationScheduler] Custom SW registered:', registration);
                swRegistrationRef.current = registration;

                // If settings are already loaded, send them now
                if (array.length > 0 && !settingsSentRef.current) {
                    sendSettingsToSW(registration, array[0]);
                }

                // Try to register periodic background sync
                tryPeriodicSync(registration);
            })
            .catch((err) => {
                console.error('[NotificationScheduler] SW registration failed:', err);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Forward settings to the SW whenever they change
    useEffect(() => {
        if (array.length === 0) return;
        const settings = array[0];

        if (swRegistrationRef.current) {
            sendSettingsToSW(swRegistrationRef.current, settings);
        } else {
            // SW might not be registered yet — wait for it
            settingsSentRef.current = false;
        }
    }, [array]);

    return null;
}

function sendSettingsToSW(
    registration: ServiceWorkerRegistration,
    settings: { notificationsEnabled?: boolean; notificationInterval?: number; notificationStartHour?: number; notificationEndHour?: number }
) {
    const sw = registration.active || registration.installing || registration.waiting;
    if (!sw) return;

    sw.postMessage({
        type: 'NOTIFICATION_SETTINGS',
        enabled: settings.notificationsEnabled ?? false,
        intervalHours: settings.notificationInterval ?? 2,
        startHour: settings.notificationStartHour ?? 9,
        endHour: settings.notificationEndHour ?? 21,
    });

    console.log('[NotificationScheduler] Sent settings to SW:', settings);
}

async function tryPeriodicSync(registration: ServiceWorkerRegistration) {
    try {
        // Periodic Background Sync API (Chrome Android 80+)
        const periodicSync = (registration as any).periodicSync;
        if (periodicSync) {
            const status = await navigator.permissions.query({ name: 'periodic-background-sync' as any });
            if (status.state === 'granted') {
                await periodicSync.register('diary-notification-check', {
                    minInterval: 60 * 60 * 1000, // 1 hour minimum
                });
                console.log('[NotificationScheduler] Periodic background sync registered');
            }
        }
    } catch (err) {
        // Periodic sync not supported or permission denied — that's ok,
        // the SW will still use setInterval while alive.
        console.log('[NotificationScheduler] Periodic sync not available:', err);
    }
}
