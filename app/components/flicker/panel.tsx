import { Box, Button, Text, Card, CardBody, CardFooter, CardHeader } from '@chakra-ui/react'
import { forwardRef } from 'react'

const Panel = forwardRef<any>((_props, ref) => (
    <Box py={12} px={1} maxW='100%'>
        <Card
            ref={ref}
            as='button'
            rounded='none'
            width='300px'
            aspectRatio={1.618}
            transform='scale(1)'
            transition='.2s width'
            background={`linear-gradient(rgba(0, 0, 0, 0.666), rgba(0, 0, 0, 0.666)), url('https://placebear.com/800/600')`}
            color='white'
            backgroundSize='cover'
            _hover={{ outline: '4px solid white', shadow: 'lg', width: '360px', zIndex: 2 }}
            _focus={{
                outline: '4px solid lightblue',
                height: 'auto',
                zIndex: 2,
                aspectRatio: 'none',
                width: '500px',
            }}
        >
            <CardHeader pointerEvents='none' textAlign='left' w='100%'>
                Placebear Image
            </CardHeader>
            <CardBody pointerEvents='none'>
                <Text textAlign='left' fontSize={0.857 + 'em'} noOfLines={3} textOverflow='ellipsis' overflow='hidden' _groupFocus={{ noOfLines: 999 }} >
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa quisquam laudantium veniam reprehenderit harum similique natus hic accusantium deleniti quod facilis iure magnam vel laborum, corporis dolores atque nesciunt aspernatur accusamus totam nulla amet. Eius, quam aliquam sapiente nihil magni, assumenda sed incidunt pariatur iusto debitis molestias ad, laudantium accusantium libero similique odio at consequuntur architecto? Omnis cupiditate unde repellendus, quisquam cumque, facilis autem labore suscipit nobis quo quibusdam sequi distinctio, nemo aliquid? Iste, corrupti distinctio labore repellendus aut temporibus. Ipsum blanditiis necessitatibus quo tempora quaerat quos illum et quod, dolore fugiat? Necessitatibus, officiis exercitationem ratione unde laborum in dicta, veritatis nostrum placeat facilis eius, fuga minus iste natus sed non error obcaecati cumque ipsa? Dolore iure incidunt voluptate tenetur ipsa dolorem, cupiditate omnis nemo architecto numquam ab eaque aliquam totam, possimus commodi quia earum praesentium laudantium dignissimos. In enim nam consequatur repellat molestiae, alias ipsam dicta quos autem amet vero a ut nobis rerum natus ea dolore inventore neque voluptatum earum officia accusantium quaerat eaque! Labore voluptates consequuntur blanditiis vitae? Nihil dolor nostrum cumque cum corporis vel exercitationem nulla ut doloremque minima neque, odio, omnis asperiores hic deleniti sit porro, illum impedit placeat. Reiciendis itaque ad veritatis esse sint.
                </Text>
            </CardBody>
        </Card>
    </Box >
))

export default Panel
