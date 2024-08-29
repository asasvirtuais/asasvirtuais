import { Box, Text, Card, CardBody, CardHeader, BoxProps } from '@chakra-ui/react'
import { forwardRef } from '@chakra-ui/react'
import { useMemo } from 'react'
import { GalleryItem } from '.'

export type Props = { open?: boolean } & GalleryItem & BoxProps

const Panel = forwardRef<Props, 'button'>(({
    image = 'https://placebear.com/800/600',
    title = 'Placebear, The Bear Placeholder',
    open = false,
    text,
    ...props
}, ref: any) => {

    const background = useMemo(() => `linear-gradient(rgba(0, 0, 0, 0.666), rgba(0, 0, 0, 0.666)), url('${image}')`, [image])

    return (
        <Box as='button'
            maxW='100%' py={12} px={1} display='flex'
            {...props}
        >
            <Card
                ref={ref}
                rounded='none'
                width={open ? '500px' : '300px'}
                maxW='clamp(auto, 500px, 100dvh)'
                aspectRatio={1.618}
                transform='scale(1)'
                transition='.500s width'
                background={background}
                color='white'
                backgroundSize='cover'
                _hover={!open ? {
                    outline: '4px solid white',
                    shadow: 'lg',
                    width: '360px',
                    zIndex: 2
                } : {}}
                {...(open ? {
                    outline: '4px solid lightblue',
                    height: 'auto',
                    zIndex: 2,
                } : {})}
            >
                <CardHeader pointerEvents='none' textAlign='left' w='100%'>
                    {title}
                </CardHeader>
                <CardBody pointerEvents='none'>
                    <Text textAlign='left' fontSize={0.857 + 'em'}
                        overflow='hidden' textOverflow='ellipsis'
                        noOfLines={open ? 16 : 3}>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa quisquam laudantium veniam reprehenderit harum similique natus hic accusantium deleniti quod facilis iure magnam vel laborum, corporis dolores atque nesciunt aspernatur accusamus totam nulla amet. Eius, quam aliquam sapiente nihil magni, assumenda sed incidunt pariatur iusto debitis molestias ad, laudantium accusantium libero similique odio at consequuntur architecto? Omnis cupiditate unde repellendus, quisquam cumque, facilis autem labore suscipit nobis quo quibusdam sequi distinctio, nemo aliquid? Iste, corrupti distinctio labore repellendus aut temporibus. Ipsum blanditiis necessitatibus quo tempora quaerat quos illum et quod, dolore fugiat? Necessitatibus, officiis exercitationem ratione unde laborum in dicta, veritatis nostrum placeat facilis eius, fuga minus iste natus sed non error obcaecati cumque ipsa? Dolore iure incidunt voluptate tenetur ipsa dolorem, cupiditate omnis nemo architecto numquam ab eaque aliquam totam, possimus commodi quia earum praesentium laudantium dignissimos.
                    </Text>
                </CardBody>
            </Card>
        </Box >
    )
})

export default Panel
