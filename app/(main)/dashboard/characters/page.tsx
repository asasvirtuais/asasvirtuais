'use client'
import { OperationalDashboardLayout } from '@/components/OperationalDashboardLayout'
import { schema } from '@/packages/character'
import { CreateCharacter, UpdateCharacter, DeleteCharacter } from '@/packages/character/forms'
import { SingleCharacter, CharacterListItem } from '@/packages/character/components'

import { GenerateCharacterButton } from '@/packages/skills/components'

export default function CharactersDashboardPage() {
    return (
        <OperationalDashboardLayout
            title="Characters Management"
            tableName="characters"
            schema={schema}
            ListItem={CharacterListItem}
            SingleItem={SingleCharacter}
            CreateForm={CreateCharacter}
            UpdateForm={UpdateCharacter}
            DeleteForm={DeleteCharacter}
            generateButton={<GenerateCharacterButton onGenerate={() => { }} />}
        />
    )
}
