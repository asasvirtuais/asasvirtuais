import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import Link from '@/app/components/link'

export default function Breadcrumbs({
    crumbs,
    base = '/'
}: {
    crumbs: [label: string, path: `/${string}`][]
    base?: `/${string}`,
}) {
    return (
        <Breadcrumb>
            <BreadcrumbItem>
                <Link href={base} as={BreadcrumbLink}
                    textTransform='capitalize'
                >{base.slice(1)}</Link>
            </BreadcrumbItem>
            {crumbs.map(([label, path]) => (
                <BreadcrumbItem key={path}>
                    <Link as={BreadcrumbLink} href={path}>{label}</Link>
                </BreadcrumbItem>
            ))}
        </Breadcrumb>
    )
}
