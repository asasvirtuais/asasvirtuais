import { layout } from '@/next'
import Chakra from '@/app/theme/chakra'

export default layout( ( { children } ) => (
  <html lang='en'>
    <body>
      <Chakra>
        {children}
      </Chakra>
    </body>
  </html>
) )
