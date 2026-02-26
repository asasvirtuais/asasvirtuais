import * as ChatModule from '@/packages/chat'
import * as MessageModule from '@/packages/message'
import * as CharacterModule from '@/packages/character'
import * as VenueModule from '@/packages/venue'

export const schema = {
    'chats': ChatModule.schema,
    'messages': MessageModule.schema,
    'characters': CharacterModule.schema,
    'venues': VenueModule.schema,
}
