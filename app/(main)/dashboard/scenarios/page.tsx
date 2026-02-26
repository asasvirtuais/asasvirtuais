'use client'
import { OperationalDashboardLayout } from '@/components/OperationalDashboardLayout'
import { schema } from '@/packages/scenario'
import { CreateScenario, UpdateScenario, DeleteScenario } from '@/packages/scenario/forms'
import { SingleScenario, ScenarioListItem } from '@/packages/scenario/components'

export default function ScenariosDashboardPage() {
    return (
        <OperationalDashboardLayout
            title="Scenarios Management"
            tableName="scenarios"
            schema={schema}
            ListItem={ScenarioListItem}
            SingleItem={SingleScenario}
            CreateForm={CreateScenario}
            UpdateForm={UpdateScenario}
            DeleteForm={DeleteScenario}
        />
    )
}
