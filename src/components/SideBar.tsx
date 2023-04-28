import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Collapse,
  Avatar,
  Icon,
  Grid,
  CircularProgress,
  Typography,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CircleIcon from '@mui/icons-material/Circle';
import { open_drawer_desktop, open_drawer_mobile } from '../store/layoutSlice';
import LogoutIcon from '@mui/icons-material/Logout';
import type { AuthSlice, Menu, MenuElement } from '../commons/auth/interfaces';
import { logout } from '../commons/auth/store';
import { SuperUserScreen } from '../commons/seguridad/screens/SuperUserScreen';
interface Props {
  window?: () => Window;
  drawer_width: number;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SideBar: React.FC<Props> = ({ window, drawer_width }: Props) => {
  const dispatch = useDispatch();
  const [open, set_open] = useState(false);
  const [dialog_open, set_dialog_open] = useState(false);
  const [is_loading, set_is_loading] = useState(true);
  const { userinfo, permisos: permisos_store } = useSelector(
    (state: AuthSlice) => state.auth
  );
  const [permisos, set_permisos] = useState<Menu[]>([]);

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

  const handle_click = (): void => {
    set_open(!open);
  };
  const handle_click_delegar_super = (): void => {
    set_dialog_open(true);
  };
  const handle_close_dialog_user = (): void => {
    set_dialog_open(false);
  };

  const open_collapse = (obj: Menu, key: number): void => {
    const temp_permisos = [...permisos];
    temp_permisos[key] = { ...obj, expanded: !obj.expanded };
    set_permisos(temp_permisos);
  };

  const open_collapse_sbm = (
    obj: MenuElement,
    key: number,
    key_modulo: number
  ): void => {
    const temp_permisos = [...permisos];
    const menus = [...temp_permisos[key_modulo].menus];
    menus[key] = { ...obj, expanded: !obj.expanded };
    temp_permisos[key_modulo].menus = [...menus];
    set_permisos(temp_permisos);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  useEffect(() => {
    setTimeout(() => {
      set_permisos(permisos_store);
      set_is_loading(false);
    }, 2000);
  }, [permisos_store]);

  const conten_drawer = (
    <Box
      className="drawer"
      sx={{
        bgcolor: 'customColor.main',
        margin: '10px 0 10px 10px',
        pb: '30px',
        borderRadius: '15px 0 0 15px',
        height: 'calc(98vh - 10px)',
        overflowY: 'scroll',
        boxShadow: '0px 2px 10px #041926',
      }}
    >
      <Toolbar
        sx={{
          display: 'grid',
          height: '100px',
          background: '#041926 !important',
        }}
      >
        <img
          alt="Imagen de perfil"
          src="../image/logos/Web-Bia-logo.png"
          style={{ height: 55, justifySelf: 'center' }}
        />
      </Toolbar>
      <Divider className={mod_dark ? 'divider' : 'divider2'} />
      <List sx={{ margin: '0 20px', color: 'secondary.main' }}>
        <ListItemButton onClick={handle_click} sx={{ borderRadius: '10px' }}>
          <ListItemIcon>
            <Avatar alt="Cristian Mendoza" src="/static/images/avatar/1.jpg" />
          </ListItemIcon>
          <ListItemText primary={userinfo.nombre_de_usuario} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse
          in={open}
          timeout="auto"
          unmountOnExit
          sx={{
            bgcolor: 'background.default',
            mt: '5px',
            borderRadius: '10px',
          }}
        >
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <CircleIcon sx={{ color: 'secondary.main', height: '10px' }} />
              </ListItemIcon>
              <ListItemText primary="Starred" />
            </ListItemButton>

            {/* Validamos si es superusuario */}
            {userinfo.is_superuser && (
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={handle_click_delegar_super}
              >
                <ListItemIcon>
                  <CircleIcon
                    sx={{ color: 'secondary.main', height: '10px' }}
                  />
                </ListItemIcon>
                <ListItemText primary="Delegacion de Super Usuario" />
              </ListItemButton>
            )}
            {dialog_open && (
              <SuperUserScreen onClose={handle_close_dialog_user} />
            )}
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => {
                dispatch(logout(''));
              }}
            >
              <ListItemIcon>
                <LogoutIcon sx={{ color: 'secondary.main' }} />
              </ListItemIcon>
              <ListItemText primary="Cerrar Sesión" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
      <Divider className={mod_dark ? 'divider' : 'divider2'} />
      {!is_loading ? (
        permisos.map((e, k) => {
          return (
            <List
              sx={{
                margin: '0 20px',
                color: 'secondary.main',
              }}
              key={k}
            >
              <ListItemButton
                onClick={() => {
                  open_collapse(e, k);
                }}
              >
                <ListItemText primary={e.desc_subsistema} />
                {e.expanded ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>

              <Collapse
                timeout="auto"
                unmountOnExit
                in={e.expanded}
                sx={{ bgcolor: '#e7ffe7', borderRadius: '10px' }}
              >
                {e.menus.map((m, km) => {
                  return (
                    <List
                      component="div"
                      disablePadding
                      key={km}
                      sx={{
                        pl: '10px',
                      }}
                    >
                      <ListItemButton
                        onClick={() => {
                          open_collapse_sbm(m, km, k);
                        }}
                      >
                        <ListItemText primary={m.nombre} />
                        {m.expanded ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>

                      <Collapse timeout="auto" unmountOnExit in={m.expanded}>
                        <List component="div" disablePadding>
                          {m.modulos.map((mo, km2) => {
                            return (
                              <ListItemButton
                                sx={{ pl: 4 }}
                                key={km2}
                                href={mo.ruta_formulario}
                              >
                                <ListItemIcon sx={{ minWidth: '25px' }}>
                                  <Icon sx={{ fontSize: '10px' }}>circle</Icon>
                                </ListItemIcon>
                                <ListItemText primary={mo.nombre_modulo} />
                              </ListItemButton>
                            );
                          })}
                        </List>
                      </Collapse>
                    </List>
                  );
                })}
              </Collapse>
            </List>
          );
        })
      ) : (
        <>
          <Grid
            container
            alignContent="center"
            justifyContent="center"
            sx={{
              height: 'calc(100% - 170px)',
            }}
          >
            <Grid item xs={12} container justifyContent="center" padding={5}>
              <CircularProgress />
            </Grid>
            <Grid item xs={12} padding={5}>
              <Typography textAlign="center">
                Cargando permisos, por favor espere...
              </Typography>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );

  return (
    <>
      <Box
        component="nav"
        sx={{ flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobile_open}
          onClose={handle_drawer_toggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawer_width,
              bgcolor: 'background.default',
            },
          }}
        >
          {conten_drawer}
        </Drawer>
        <Drawer
          variant="persistent"
          open={desktop_open}
          onClose={handle_drawer_toggle_desktop}
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawer_width,
              bgcolor: 'background.default',
              borderRight: 'none',
            },
          }}
        >
          {conten_drawer}
        </Drawer>
      </Box>
      <Box
        sx={{
          padding: '0px 20px 0 20px',
          mt: 8,
          width: '100vw',
          ml: { sm: desktop_open ? `${drawer_width}px` : '0px' },
          bgcolor: 'background.default',
        }}
      >
        <Outlet />
      </Box>
    </>
  );
};
