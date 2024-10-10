import { layout } from '@/next'
import Chakra from './chakra'

export default layout( ( { children } ) => (
  <html lang='en'>
    <body>
      <Chakra>
        {children}
      </Chakra>
    </body>
  </html>
) )
