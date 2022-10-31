import { useContext } from 'react';
import NextLink from 'next/link';

import { AppBar, Box, Button, Link, Toolbar, Typography } from '@mui/material';

import { UiContext } from '../../context';
import Image from 'next/image';

export const AdminNavbar = () => {

    const { toggleSideMenu } = useContext( UiContext );

    return (
        <AppBar>
            <Toolbar>
                <NextLink href='/' passHref>
                <Link display='flex' alignItems='center' mt={1}>
                            <Image
                                src={`/logo1.png`}
                                alt="Picture of the author"
                                width={150}
                                height={80}
                                />
                    </Link>  
                </NextLink>

                <Box flex={ 1 } />

                <Button onClick={ toggleSideMenu }>
                    Menú
                </Button>

            </Toolbar>
        </AppBar>
    )
}
