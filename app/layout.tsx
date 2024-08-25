import Chakra from '@/app/theme/chakra'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body>
        <Chakra>
          {children}
        </Chakra>
      </body>
    </html>
  )
}
