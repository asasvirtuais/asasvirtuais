'use server'
import { LogoIcon, LogoIconProps } from '.'

export const LogoString = async (props: LogoIconProps) => {
    const ReactDOMServer = (await import('react-dom/server')).default
    return ReactDOMServer.renderToString(<LogoIcon {...props} />)
}
