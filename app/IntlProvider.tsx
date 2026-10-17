'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { SegmentedControl } from '@mantine/core'

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

export function LanguageToggle() {
    const { language, setLanguage } = useIntl()

    return (
        <SegmentedControl
            size="xs"
            radius="md"
            value={language}
            onChange={(value) => setLanguage(value as Language)}
            data={[
                { label: 'PT', value: 'pt' },
                { label: 'EN', value: 'en' },
            ]}
            aria-label="Idioma / Language"
        />
    )
}
