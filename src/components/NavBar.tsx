
import { AppBar, IconButton, Badge, Stack, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HomeIcon from '@mui/icons-material/Home';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import {
  open_drawer_desktop,
  open_drawer_mobile,
  handle_mod_dark,
} from '../store/layoutSlice';
import { Link, useNavigate } from 'react-router-dom';
import type { AuthSlice } from '../commons/auth/interfaces';
import { useDispatch, useSelector } from 'react-redux';


interface Props {
  drawer_width: number;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const NavBar: React.FC<Props> = ({ drawer_width }: Props) => {


 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userinfo } = useSelector((state: AuthSlice) => state.auth);
  const { mobile_open, desktop_open, mod_dark } = useSelector(
    (state: {
      layout: {
        mobile_open: boolean;
        desktop_open: boolean;
        mod_dark: boolean;
      };
    }) => state.layout
  );

  const handle_drawer_toggle = (): void => {
    dispatch(open_drawer_mobile(!mobile_open));
  };

  const handle_drawer_toggle_desktop = (): void => {
    dispatch(open_drawer_desktop(!desktop_open));
  };

  const handle_button_mod_dark = (): void => {
    dispatch(handle_mod_dark(!mod_dark));
  };

  const handle_direct_home = (): void => {
    navigate('/');
  };

  const tiene_alerta = true; 

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
          bgcolor: mod_dark ? '#042F4A' : '#FAFAFA',
          position: 'absolute',
          mt: userinfo.tipo_usuario === 'E' ? '48px' : '0px',
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
                  ml: '0 !import',
                }}
              />
            </IconButton>
            <IconButton onClick={handle_direct_home}>
              <HomeIcon sx={{ color: mod_dark ? '#FAFAFA' : '#707070' }} />
            </IconButton>
          </Stack>
          <Stack spacing={2} direction="row">
            <IconButton onClick={handle_button_mod_dark}>
              {mod_dark ? (
                <Brightness7Icon sx={{ color: '#FAFAFA' }} />
              ) : (
                <Brightness4Icon sx={{ color: '#707070' }} />
              )}
            </IconButton>
            <IconButton>
              <NotificationsIcon
                sx={{ color: mod_dark ? '#FAFAFA' : '#707070' }}
              />
            </IconButton>
            <Link to="/app/transversal/bandeja_alertas">
              <Badge
                badgeContent={2} // Número que se mostrará en el círculo
                color="error" // El color del círculo (rojo en este caso)
                invisible={!tiene_alerta} // Si no hay alerta, el círculo no se mostrará
                overlap="circular" // Superposición circular para acercar el círculo al icono
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                sx={{ position: 'relative', top: '-4px', left: '-4px' }} // Ajusta la posición del círculo según tus necesidades
              >
                <IconButton>
                  <ReportProblemIcon
                    sx={{ color: mod_dark ? '#FAFAFA' : '#707070' }}
                  />
                </IconButton>
              </Badge>
            </Link>
          </Stack>

        </Toolbar>
      </AppBar>
    </>
  );
};
