'use client'
import { OperationalDashboardLayout } from '@/components/OperationalDashboardLayout'
import { schema } from '@/packages/venue'
import { CreateVenue, UpdateVenue, DeleteVenue } from '@/packages/venue/forms'
import { SingleVenue, VenueListItem } from '@/packages/venue/components'

import { GenerateVenueButton } from '@/packages/skills/components'

export default function VenuesDashboardPage() {
    return (
        <OperationalDashboardLayout
            title="Venues Management"
            tableName="venues"
            schema={schema}
            ListItem={VenueListItem}
            SingleItem={SingleVenue}
            CreateForm={CreateVenue}
            UpdateForm={UpdateVenue}
            DeleteForm={DeleteVenue}
            generateButton={<GenerateVenueButton onGenerate={() => { }} />}
        />
    )
}
