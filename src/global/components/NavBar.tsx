import { createContext, useContext, useState } from 'react';
import { AppBar, IconButton, Stack, Toolbar, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import NotificationsIcon from '@mui/icons-material/Notifications';

interface Props {
  drawer_width: number;
}

const color_mode_context = createContext({ toggleColorMode: () => {} });

// eslint-disable-next-line @typescript-eslint/naming-convention
export const NavBar: React.FC<Props> = ({ drawer_width }: Props) => {
  const color_mode = useContext(color_mode_context);
  const [desktop_open, set_desktop_open] = useState(true);
  const [mobile_open, set_mobile_open] = useState(false);
  const theme = useTheme();

  const handle_drawer_toggle = (): void => {
    set_mobile_open(!mobile_open);
  };

  const handle_drawer_toggle_desktop = (): void => {
    set_desktop_open(!desktop_open);
  };

  return (
    <>
      <AppBar
        elevation={0}
        sx={{
          width: desktop_open
            ? { sm: `calc(100% - ${drawer_width}px)` }
            : { md: `100%` },
          ml: { sm: `${drawer_width}px` },
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
              onClick={handle_drawer_toggle}
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
              onClick={handle_drawer_toggle_desktop}
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
                }}
              />
            </IconButton>
          </Stack>
          <Stack spacing={2} direction="row">
            <IconButton onClick={color_mode.toggleColorMode}>
              {theme.palette.mode === 'dark' ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
            <IconButton>
              <NotificationsIcon />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
};
