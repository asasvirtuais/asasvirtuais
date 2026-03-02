'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { ActionIcon, Tooltip, Popover, Text, Stack } from '@mantine/core'

type Language = 'en' | 'pt'

interface IntlContextType {
    language: Language
    setLanguage: (lang: Language) => void
    toggleLanguage: () => void
}

const IntlContext = createContext<IntlContextType | undefined>(undefined)

export function IntlProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>('pt')

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === 'en' ? 'pt' : 'en'))
    }

    return (
        <IntlContext.Provider value={{ language, setLanguage, toggleLanguage }}>
            {children}
        </IntlContext.Provider>
    )
}

export function useIntl() {
    const context = useContext(IntlContext)
    if (!context) {
        throw new Error('useIntl must be used within an IntlProvider')
    }
    return context
}

export function Intl({ en, pt }: { en: ReactNode; pt: ReactNode }) {
    const { language } = useIntl()
    return <>{language === 'en' ? en : pt}</>
}

const PULSE_ANIMATION_ID = 'lang-toggle-pulse'
const PULSE_KEYFRAMES = `
@keyframes langPulseRing {
    0% { box-shadow: 0 0 0 0 rgba(121, 80, 242, 0.5); }
    70% { box-shadow: 0 0 0 8px rgba(121, 80, 242, 0); }
    100% { box-shadow: 0 0 0 0 rgba(121, 80, 242, 0); }
}
`

export function LanguageToggle() {
    const { language, toggleLanguage } = useIntl()
    const [popoverOpened, setPopoverOpened] = useState(false)
    const [hasInteracted, setHasInteracted] = useState(false)

    useEffect(() => {
        // Inject keyframes CSS
        if (!document.getElementById(PULSE_ANIMATION_ID)) {
            const style = document.createElement('style')
            style.id = PULSE_ANIMATION_ID
            style.textContent = PULSE_KEYFRAMES
            document.head.appendChild(style)
        }

        const showTimer = setTimeout(() => {
            setPopoverOpened(true)
        }, 300)

        const hideTimer = setTimeout(() => {
            setPopoverOpened(false)
        }, 6800)

        return () => {
            clearTimeout(showTimer)
            clearTimeout(hideTimer)
        }
    }, [])

    const handleToggle = () => {
        setPopoverOpened(false)
        setHasInteracted(true)
        toggleLanguage()
    }

    const handleDismiss = () => {
        setPopoverOpened(false)
        setHasInteracted(true)
    }

    return (
        <Popover
            opened={popoverOpened}
            onDismiss={handleDismiss}
            position="bottom"
            withArrow
            arrowSize={12}
            shadow="lg"
            radius="md"
        >
            <Popover.Target>
                <Tooltip
                    label={language === 'en' ? 'Mudar para Português' : 'Switch to English'}
                    disabled={popoverOpened}
                >
                    <ActionIcon
                        variant="subtle"
                        color="gray"
                        size="lg"
                        onClick={handleToggle}
                        title="Toggle Language"
                        style={{
                            fontSize: '1.2rem',
                            borderRadius: '50%',
                            animation: !hasInteracted ? 'langPulseRing 2s ease-out infinite' : undefined,
                            transition: 'transform 0.2s ease',
                        }}
                    >
                        {language === 'en' ? '🇧🇷' : '🇺🇸'}
                    </ActionIcon>
                </Tooltip>
            </Popover.Target>

            <Popover.Dropdown
                style={{
                    background: 'linear-gradient(135deg, rgba(121, 80, 242, 0.95) 0%, rgba(21, 170, 191, 0.95) 100%)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(12px)',
                    cursor: 'pointer',
                }}
                onClick={handleDismiss}
            >
                <Stack gap={2} align="center">
                    <Text size="sm" fw={700} c="white" style={{ letterSpacing: '0.3px' }}>
                        🌐 Selecione a Linguagem
                    </Text>
                    <Text size="xs" c="rgba(255,255,255,0.8)" fw={500}>
                        Select Language
                    </Text>
                </Stack>
            </Popover.Dropdown>
        </Popover>
    )
}
