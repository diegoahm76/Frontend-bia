// import * as React from 'react';
// import { useTheme} from '@mui/material/styles';
import {
  AppBar,
  IconButton,
  Toolbar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
// import Brightness4Icon from '@mui/icons-material/Brightness4';
// import Brightness7Icon from '@mui/icons-material/Brightness7';
import NotificationsIcon from '@mui/icons-material/Notifications';

import { Stack } from '@mui/system';

// const drawer_width = 300;


function NavBar() {
    // const theme = useTheme();
    return (
        <AppBar
            elevation={0}
            sx={{
                // width: desktop_open
                //     ? { sm: `calc(100% - ${drawer_width}px)` }
                //     : { md: `100%` },
                // ml: { sm: `${drawer_width}px` },
                transition: 'width 0.15s',
                bgcolor: 'secondary.main',
                background: 'transparent',
                position: 'absolute',
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Stack spacing={2} direction="row">
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        // onClick={handle_drawer_toggle}
                        sx={{
                            mr: 2,
                            display: { sm: 'none' },
                            bgcolor: '#042F4A',
                        }}
                    >
                        <MenuIcon sx={{ color: '#FAFAFA', ml: '0 !import' }} />
                    </IconButton>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        // onClick={handle_drawer_toggle_desktop}
                        sx={{
                            display: { xs: 'none', sm: 'grid' },
                            background: '#042F4A',
                            '&:hover': { background: '#042F4A' },
                        }}
                    >
                        <MenuIcon
                            sx={{
                                color: '#FAFAFA',
                                // '&:hover': { color: '#042F4A' },
                                ml: '0 !import',
                            }} />
                    </IconButton>
                </Stack>
                <Stack spacing={2} direction="row">
                    {/* <IconButton onClick={color_mode.toggleColorMode}> */}
                    {/* {theme.palette.mode === 'dark' ? (
                <Brightness7Icon />
            ) : (
                <Brightness4Icon />
            )}} */}
                    {/* </IconButton> */}
                    <IconButton>
                        <NotificationsIcon />
                    </IconButton>
                </Stack>
            </Toolbar>
        </AppBar>
    );
}
// eslint-disable-next-line no-restricted-syntax
export default NavBar;
