import { Icon, IconProps } from '@chakra-ui/react'

export type Props = { size: number, transparent?: boolean, borderless?: boolean }

export type LogoIconProps = Props & IconProps

export const logoSvgString = ({ size, borderless, transparent }: Props) => `
    <svg xmlns="http://www.w3.org/2000/svg" height="${size}" width="${size}" viewBox="0 0 16 16">
        <rect x="1.25%" y="1.25%" width="97.5%" height="97.5%" fill="${transparent ? "none" : "white"}" stroke="black" stroke-width="${borderless ? "0" : "2.25%"}" />
        <path d="M4.63294 0.575989H5.04894L8.09961 7.99999H7.67294L6.67028 5.54666H3.01161L1.99828 7.99999H1.58228L4.63294 0.575989ZM3.17161 5.16266H6.51028L4.83561 1.08799L3.17161 5.16266Z" />
        <path d="M8.09961 7.99999L10.9369 14.9013L13.7743 7.99999H14.1903L11.1396 15.424H10.7236L7.67294 7.99999H8.09961Z" />
    </svg>
`

export const LogoIcon = ({ transparent, borderless, size }: Props) => {

    return (
        <svg viewBox='0 0 16 16' width={size} height={size}>
            <rect x='1.25%' y='1.25%' width='97.5%' height='97.5%' fill={transparent ? 'none' : 'white'} stroke='black' strokeWidth={borderless ? '0' : '2.25%'} />
            <path d='M4.63294 0.575989H5.04894L8.09961 7.99999H7.67294L6.67028 5.54666H3.01161L1.99828 7.99999H1.58228L4.63294 0.575989ZM3.17161 5.16266H6.51028L4.83561 1.08799L3.17161 5.16266Z' />
            <path d='M8.09961 7.99999L10.9369 14.9013L13.7743 7.99999H14.1903L11.1396 15.424H10.7236L7.67294 7.99999H8.09961Z' />
        </svg>
    )
}


export const LogoImage = ({ size = 50, borderless, transparent }: Props) => {
    const params = new URLSearchParams()
    if (borderless) params.set('borderless', '')
    if (transparent) params.set('transparent', '')
    const query = params.toString()
    return (
        <img
            alt='Asas Virtuais Logo'
            height={size} width={size}
            src={`/logo/${size}/asasvirtuais.png${query ? '?' + query : ''}`}
        />
    )
}
