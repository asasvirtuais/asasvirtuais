
import { Box, Input, List, ListItem, Stack } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'

import { getByUser } from '@/app/oauth/credentials'
import { userOrLogin } from '@/app/auth/actions'

import { StackList } from '@/app/components/stack/list'
import { Fragment } from 'react'
import Breadcrumbs from '../breadcrumbs'

export default async function () {
    const user = await userOrLogin('/dashboard/credentials')
    const credentials = await getByUser(user.sub)
    return (
        <Box p={6}>
            <Breadcrumbs base='/dashboard'
                crumbs={[['Access Tokens', '/dashboard/credentials']]}
            />

            <Text as='h1' fontSize={['2xl', '3xl']}>Access Tokens</Text>
            <StackList w='full'>
                {credentials.map((c, i) => (
                    <ListItem key={i}>
                        <b>
                            {c.created_at.toLocaleDateString(undefined, { dateStyle: 'long' })}
                            {' at '}
                            {c.created_at.toLocaleTimeString(undefined, { timeStyle: 'short' })}
                        </b>
                        <List styleType='disc' pl={4}>
                            <ListItem>
                                <b>Provider</b>
                                <br />
                                {c.provider}
                            </ListItem>
                            <ListItem>
                                <b>Access scope</b>
                                <pre>
                                    {c.scope.split(' ').map(s => (
                                        s.startsWith('https://www.googleapis.com/auth/') ? s.split('/').pop() : s
                                    )).map(s => <Fragment key={s}>{s}<br /></Fragment>)}
                                </pre>
                            </ListItem>
                            <ListItem>
                                <b>API Key</b>
                                <Input
                                    type='text'
                                    value={c.id}
                                    contentEditable={false}
                                    sx={{ '-webkit-text-security': 'disc' }}
                                    _focus={{ '-webkit-text-security': 'none' }}
                                    width='full'
                                />
                            </ListItem>
                        </List>
                    </ListItem>
                ))}
            </StackList>
        </Box>

    )
}