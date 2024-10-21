'use client'
import { createContext } from '@chakra-ui/react-context'
import { PropsWithChildren } from 'react'

type DashboardProps = {
}

const useDashboardHook = (props: DashboardProps) => {
    return {}
}

const [DashboardContextProvider, useDashboardContext] = createContext<ReturnType<typeof useDashboardHook>>()

export const DashboardProvider = ({children, ...props} : PropsWithChildren<DashboardProps>) => {
    const value = useDashboardHook(props)
    return (
        <DashboardContextProvider value={value} >
            {children}
        </DashboardContextProvider>
    )
}

export const useDashboard = () => useDashboardContext()
