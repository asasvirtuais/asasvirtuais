import { layout } from '@/next'

export default layout( ( { children } ) => (
  <html lang='en'>
    <body>
      {children}
    </body>
  </html>
) )
