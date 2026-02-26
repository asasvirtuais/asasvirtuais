import * as ChatModule from '@/packages/chat'
import * as MessageModule from '@/packages/message'
import * as SettingModule from '@/packages/setting'

export const schema = {
    'chats': ChatModule.schema,
    'messages': MessageModule.schema,
    'settings': SettingModule.schema,
}
