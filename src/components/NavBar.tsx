/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import {
  AppBar,
  IconButton,
  Badge,
  Stack,
  Toolbar,
  Tooltip,
  Button,
  Drawer,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HomeIcon from '@mui/icons-material/Home';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import {
  open_drawer_desktop,
  open_drawer_mobile,
  handle_mod_dark,
} from '../store/layoutSlice';
import { Link, useNavigate } from 'react-router-dom';
import type { AuthSlice } from '../commons/auth/interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { useContext } from 'react';
import { AlertasContext } from '../commons/Transversales/modules/Alertas/context/AlertasContext';
import { PerfilPersonaIngresa } from './PerfilPersonaIngresa';
import { DialogEntornoApp } from '../commons/auth/components/DialogEntornoApp/DialogEntornoApp';
import { open_dialog_representado } from '../commons/auth/store';
import { useMediaQuery, useTheme } from '@material-ui/core';

interface Props {
  drawer_width: number;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const NavBar: React.FC<Props> = ({ drawer_width }: Props) => {
  const { numeroDeAlertas } = useContext(AlertasContext);

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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

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

  const drawerContent = (
    <Stack spacing={2} direction="row">
      <IconButton onClick={handle_button_mod_dark}>
        {mod_dark ? (
          <Tooltip title="Modo claro">
            <Brightness7Icon sx={{ color: '#FAFAFA' }} />
          </Tooltip>
        ) : (
          <Tooltip title="Modo oscuro">
            <Brightness4Icon sx={{ color: '#707070' }} />
          </Tooltip>
        )}
      </IconButton>
      <IconButton>
        <Tooltip title="Notificaciones">
          <NotificationsIcon sx={{ color: mod_dark ? '#FAFAFA' : '#707070' }} />
        </Tooltip>
      </IconButton>
      <Link to="/app/transversal/bandeja_alertas">
        <Badge
          badgeContent={numeroDeAlertas}
          color="error"
          invisible={!tiene_alerta}
          overlap="circular"
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          sx={{ position: 'relative', left: '-4px' }}
        >
          <IconButton>
            <Tooltip title="Bandeja de alertas">
              <ReportProblemIcon
                sx={{ color: mod_dark ? '#FAFAFA' : '#707070' }}
              />
            </Tooltip>
          </IconButton>
        </Badge>
      </Link>
    </Stack>
  );

  return (
    <>
      <AppBar
        elevation={0}
        sx={{
          // height: '80px',
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
        <Toolbar sx={{ justifyContent: 'space-between', width: '100%' }}>
          <Stack spacing={3} direction="row">
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
              <Tooltip title="Volver al home">
                <HomeIcon sx={{ color: mod_dark ? '#FAFAFA' : '#707070' }} />
              </Tooltip>
            </IconButton>
          </Stack>

          <Stack spacing={2} direction="row">
            {userinfo.tipo_persona !== 'J' ? (
              <Tooltip title="Realizar cambio de entorno">
                <Button
                  variant="contained"
                  startIcon={<ChangeCircleIcon />}
                  color={mod_dark ? 'secondary' : 'primary'}
                  onClick={() => {
                    dispatch(open_dialog_representado());
                  }}
                >
                  entorno
                </Button>
              </Tooltip>
            ) : (
              <></>
            )}
          </Stack>

          <Stack spacing={2} direction="row">
            {/*perfil de la persona que ingresa*/}
            <IconButton>
              <PerfilPersonaIngresa />
            </IconButton>

            {/*perfil de la persona que ingresa*/}
          </Stack>

          <>
            {isMobile ? (
              <>
              <Tooltip title="Ver demás opciones">
                <IconButton
                  sx={{
                    display: { xs: 'none', sm: 'grid' },
                    background: '#042F4A',
                    '&:hover': { background: '#042F4A' },
                  }}
                  onClick={handleDrawerToggle}
                >
                  <NewReleasesIcon
                    sx={{
                      color: '#FAFAFA',
                      ml: '0 !import',
                    }}
                  />
                </IconButton>
                </Tooltip>
                <Drawer
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    padding: '1rem',
                    borderRadius: '3rem',
                    '& .MuiDrawer-paper': {
                      display: 'flex',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      width: '11rem',
                      height: '11rem',
                      padding: '1rem',
                      margin: '.7rem',
                      borderRadius: '3rem',
                      boxSizing: 'border-box',
                      bgcolor: mod_dark ? '#042F4A' : '#FAFAFA',
                      color: mod_dark ? '#FAFAFA' : '#707070',
                    },
                  }}
                  anchor="right"
                  open={drawerOpen}
                  onClose={handleDrawerToggle}
                >
                  {drawerContent}
                </Drawer>
              </>
            ) : (
              drawerContent
            )}
          </>
        </Toolbar>
      </AppBar>

      {/*dialog entorno app*/}
      <DialogEntornoApp />
      {/*dialog entorno app*/}
    </>
  );
};
