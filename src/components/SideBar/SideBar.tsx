/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import './css/swalStyles.css';
import { useEffect, useState, type FC } from 'react';
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
  // Icon,
  Grid,
  CircularProgress,
  Typography
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PersonIcon from '@mui/icons-material/Person';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import {
  open_drawer_desktop,
  open_drawer_mobile
} from '../../store/layoutSlice';
import LogoutIcon from '@mui/icons-material/Logout';
import ListIcon from '@mui/icons-material/List';
import type {
  AuthSlice,
  Menu,
  MenuElement
} from '../../commons/auth/interfaces';
import { logout /* set_permissions */ } from '../../commons/auth/store';
import { SuperUserScreen } from '../../commons/seguridad/screens/SuperUserScreen';
import { FooterGov } from '../goviernoEnLinea/FooterGov';
import { HeaderGov } from '../goviernoEnLinea/HeaderGov';
import Swal from 'sweetalert2';
//* component types
import { type SideBarProps } from './types/types';
import { useRoutes } from './hook/useRoutes';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SideBar: FC<SideBarProps> = ({
  window,
  drawer_width
}: SideBarProps) => {
  //! useRoutes to navigate, use the hook to declare another routes
  const {
    handle_click_delegar_super,
    handle_datos_acceso,
    handle_datos_personales,
    handle_autorizacion_notificacion,
    handle_indices_electronicos
  } = useRoutes();

  const dispatch = useDispatch();
  const [open, set_open] = useState(false);
  const [dialog_open, set_dialog_open] = useState(false);
  const [is_loading, set_is_loading] = useState(true);
  const { userinfo, permisos: permisos_store } = useSelector(
    (state: AuthSlice) => state.auth
  );
  // console.log(userinfo);
  // console.log(permisos_store);
  const [permisos, set_permisos] = useState<any[]>([]);

  const { mobile_open, desktop_open, mod_dark } = useSelector(
    (state: {
      layout: {
        mobile_open: boolean;
        desktop_open: boolean;
        mod_dark: boolean;
      };
    }) => state.layout
  );

  const handle_drawer_toggle = () => dispatch(open_drawer_mobile(!mobile_open));
  const handle_drawer_toggle_desktop = () =>
    dispatch(open_drawer_desktop(!desktop_open));
  const handle_close_dialog_user = (): void => set_dialog_open(false);
  const handle_click = (): void => set_open(!open);

  const open_collapse = (obj: Menu, key: number): void => {
    console.log('open_collapse000', /* obj, */ key);
    set_permisos((prevPermisos) =>
      prevPermisos.map((menu, index) => {
        console.log('menu', /* menu, */ 'index', index);
        return index === key ? { ...menu, expanded: !menu.expanded } : menu;
      })
    );
  };

  const open_collapse_sbm = (
    obj: MenuElement,
    key: number,
    key_modulo: number
  ): void => {
    console.log('open_collapse_sbm1111', /* obj, */ key, key_modulo);
    set_permisos((prevPermisos) =>
      prevPermisos.map((modulo, index) => {
        console.log('modulo', /* modulo, */ 'index', index);
        return index === key_modulo
          ? {
              ...modulo,
              menus: modulo.menus.map((menu: any, menuIndex: any) => {
                console.log('menu', /* menu, */ 'menuIndex', menuIndex);
                return menuIndex === key
                  ? { ...menu, expanded: !menu.expanded }
                  : menu;
              })
            }
          : modulo;
      })
    );
  };

  const open_collapse_sbm2 = (
    obj: MenuElement,
    key: number,
    key_modulo: number,
    key_submenu: number
  ): void => {
    console.log(
      'open_collapse_sbm22222',
      /* obj, */ key,
      key_modulo,
      key_submenu
    );
    set_permisos((prevPermisos) =>
      prevPermisos.map((modulo, moduloIndex) => {
        console.log('modulo', /* modulo, */ 'moduloIndex', moduloIndex);
        return moduloIndex === key_modulo
          ? {
              ...modulo,
              menus: modulo.menus.map((menu: any, menuIndex: any) => {
                console.log('menu', /* menu, */ 'menuIndex', menuIndex);
                return menuIndex === key_submenu
                  ? {
                      ...menu,
                      submenus: menu.submenus.map(
                        (submenu: any, submenuIndex: any) => {
                          console.log(
                            'submenu',
                            // submenu,
                            'submenuIndex',
                            submenuIndex
                          );
                          return submenuIndex === key
                            ? { ...submenu, expanded: !submenu.expanded }
                            : submenu;
                        }
                      )
                    }
                  : menu;
              })
            }
          : modulo;
      })
    );
  };

  const open_collapse_sbm3 = (
    // obj: MenuElement,
    key: number,
    key_modulo: number,
    key_submenu: number,
    key_submenu2: number
  ): void => {
    console.log(
      'open_collapse_sbm3333',
      // obj,
      key,
      key_modulo,
      key_submenu,
      key_submenu2
    );
    set_permisos((prevPermisos) =>
      prevPermisos.map((modulo, moduloIndex) => {
        console.log('modulo', /* modulo */ 'moduloIndex', moduloIndex);
        return moduloIndex === key_modulo
          ? {
              ...modulo,
              menus: modulo.menus.map((menu: any, menuIndex: any) => {
                console.log('menu', /* menu, */ 'menuIndex', menuIndex);
                return menuIndex === key_submenu
                  ? {
                      ...menu,
                      submenus: menu.submenus.map(
                        (submenu: any, submenuIndex: any) => {
                          console.log(
                            /* 'submenu',
                        submenu, */
                            'submenuIndex',
                            submenuIndex
                          );
                          return submenuIndex === key_submenu2
                            ? {
                                ...submenu,
                                submenus: submenu.submenus.map(
                                  (submenu2: any, submenu2Index: any) => {
                                    console.log(
                                      'submenu2',
                                      /* submenu2, */
                                      'submenu2Index',
                                      submenu2Index
                                    );
                                    return submenu2Index === key
                                      ? {
                                          ...submenu2,
                                          expanded: !submenu2.expanded
                                        }
                                      : submenu2;
                                  }
                                )
                              }
                            : submenu;
                        }
                      )
                    }
                  : menu;
              })
            }
          : modulo;
      })
    );
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  useEffect(() => {
    setTimeout(() => {
      set_permisos(permisos_store);
      console.log('permisos', permisos);
      set_is_loading(false);
    }, 1000);
  }, [permisos_store]);

  // ? ------- static side bar content, except super user delegation screen ------
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
        boxShadow: '0px 2px 10px #041926'
      }}
    >
      {/* -------------- Header of the drawer ------------------- */}
      <Toolbar
        sx={{
          display: 'grid',
          height: '100px',
          background: '#041926 !important'
        }}
      >
        <img
          alt="Imagen de perfil"
          src="../image/logos/Web-Bia-logo.png"
          style={{ height: 55, justifySelf: 'center' }}
        />
      </Toolbar>
      {}
      {/* -------------- Divider of the drawer ------------------- */}
      <Divider className={mod_dark ? 'divider' : 'divider2'} />

      {/* -------------- List main elements, logout, Access Data, Personal Data, etc  ------------------- */}
      <List sx={{ margin: '0 20px', color: mod_dark ? '#fafafa' : '#141415' }}>
        <ListItemButton onClick={handle_click} sx={{ borderRadius: '10px' }}>
          <ListItemIcon>
            <Avatar alt="Usuario" src="/static/images/avatar/1.jpg" />
          </ListItemIcon>
          <ListItemText primary={userinfo.nombre_de_usuario} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse
          in={open}
          timeout="auto"
          unmountOnExit
          sx={{
            bgcolor: mod_dark ? '#042F4A' : '#FAFAFA',
            mt: '5px',
            borderRadius: '10px'
          }}
        >
          <List component="div" disablePadding>
            {/* -------------- Datos de acceso del usuario ------------------- */}
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <PersonIcon
                  sx={{
                    color: mod_dark ? '#fafafa' : '#141415',
                    height: '20px'
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary="Datos Acceso"
                onClick={handle_datos_acceso}
              />
            </ListItemButton>

            {/* --------------  Datos de Personales del usuario ------------------- */}
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <ContactEmergencyIcon
                  sx={{
                    color: mod_dark ? '#fafafa' : '#141415',
                    height: '20px'
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary="Datos Personales"
                onClick={handle_datos_personales}
              />
            </ListItemButton>

            {/* Autorización de Notificacion  */}
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <CircleNotificationsIcon
                  sx={{
                    color: mod_dark ? '#fafafa' : '#141415',
                    height: '20px'
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary="Autoriza Notificaciones"
                onClick={handle_autorizacion_notificacion}
              />
            </ListItemButton>

            {/* ------------ índices electrónicos ------------  */}
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <ListIcon
                  sx={{
                    color: mod_dark ? '#fafafa' : '#141415',
                    height: '20px'
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary="Índices electrónicos"
                onClick={handle_indices_electronicos}
              />
            </ListItemButton>

            {/* --------- Validamos si es superusuario para delegacion de superUsuario ------------- */}
            {userinfo.is_superuser && (
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={handle_click_delegar_super}
              >
                <ListItemIcon>
                  <SupervisedUserCircleIcon
                    sx={{
                      color: mod_dark ? '#fafafa' : '#141415',
                      height: '20px'
                    }}
                  />
                </ListItemIcon>
                <ListItemText primary="Delegacion de Super Usuario" />
              </ListItemButton>
            )}
            {/* --------- Dialog delegación de Super usuario ------------- */}
            {dialog_open && (
              <SuperUserScreen onClose={handle_close_dialog_user} />
            )}
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => {
                void Swal.fire({
                  title: '¿Está seguro de cerrar sesión?',
                  showDenyButton: true,
                  confirmButtonText: `Si`,
                  denyButtonText: `No`,
                  confirmButtonColor: '#042F4A',
                  cancelButtonColor: '#DE1616',
                  icon: 'question',
                  customClass: {
                    container: 'my-swal'
                  }
                }).then((result) => {
                  /* Read more about isConfirmed, isDenied below */
                  if (result.isConfirmed) {
                    dispatch(logout(''));
                  } else if (result.isDenied) {
                    void Swal.fire({
                      title: 'No se ha cerrado sesión',
                      icon: 'info',
                      confirmButtonText: 'Ok',
                      confirmButtonColor: '#042F4A',
                      customClass: {
                        container: 'my-swal'
                      }
                    });
                  }
                });
              }}
            >
              <ListItemIcon>
                <LogoutIcon sx={{ color: mod_dark ? '#fafafa' : '#141415' }} />
              </ListItemIcon>
              <ListItemText primary="Cerrar Sesión" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
      {/* -------------- Close List main elements ------------------- */}

      <Divider className={mod_dark ? 'divider' : 'divider2'} />
      {!is_loading ? (
        permisos.map((elementStore, indexStore) => {
          return (
            <List
              sx={{
                margin: '0 20px',
                color: mod_dark ? '#fafafa' : '#141415'
              }}
              key={indexStore}
            >
              <ListItemButton
                sx={{ borderRadius: '10px' }}
                onClick={() => {
                  open_collapse(elementStore, indexStore);
                }}
              >
                <ListItemText primary={elementStore.desc_subsistema} />
                {elementStore.expanded ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>

              <Collapse
                timeout="auto"
                unmountOnExit
                in={elementStore.expanded}
                sx={{
                  bgcolor: mod_dark ? '#2B3C46' : '#F0F0F0',
                  borderRadius: '10px'
                }}
              >
                {elementStore.menus.map((elementMenu: any, indexMenu: any) => {
                  // console.log(m);
                  return (
                    <List
                      component="div"
                      disablePadding
                      key={indexMenu}
                      sx={{
                        pl: '10px'
                      }}
                    >
                      <ListItemButton
                        onClick={() => {
                          open_collapse_sbm(elementMenu, indexMenu, indexStore);
                        }}
                      >
                        <ListItemText primary={elementMenu.nombre} />
                        {elementMenu.expanded ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>

                      <Collapse
                        timeout="auto"
                        unmountOnExit
                        in={elementMenu.expanded}
                      >
                        {elementMenu.submenus.map(
                          (elementSubmenuMenu: any, indexSubmenuMenu: any) => {
                            return (
                              <List
                                component="div"
                                disablePadding
                                key={indexSubmenuMenu}
                                sx={{
                                  pl: '20px'
                                }}
                              >
                                <ListItemButton
                                  onClick={() => {
                                    open_collapse_sbm2(
                                      elementSubmenuMenu,
                                      indexSubmenuMenu,
                                      indexStore,
                                      indexMenu
                                    );
                                  }}
                                >
                                  <ListItemText
                                    primary={elementSubmenuMenu.nombre}
                                  />
                                  {elementSubmenuMenu.expanded ? (
                                    <ExpandLess />
                                  ) : (
                                    <ExpandMore />
                                  )}
                                </ListItemButton>

                                <Collapse
                                  timeout="auto"
                                  unmountOnExit
                                  in={elementSubmenuMenu.expanded}
                                >
                                  <List component="div" disablePadding>
                                    {elementSubmenuMenu.submenus &&
                                      elementSubmenuMenu.submenus.length > 0 &&
                                      elementSubmenuMenu.submenus.map(
                                        (element: any, indexElement: any) => {
                                          return (
                                            <List
                                              component="div"
                                              disablePadding
                                              key={indexElement}
                                              sx={{
                                                pl: '30px'
                                              }}
                                            >
                                              <ListItemButton
                                                onClick={() => {
                                                  /*  open_collapse_sbm3(
                                                
                                                indexStore,
                                                indexMenu,
                                                indexSubmenuMenu,
                                                indexElement,
                                              ); */
                                                  open_collapse_sbm3(
                                                    indexSubmenuMenu,
                                                    indexStore,
                                                    indexMenu,
                                                    indexElement
                                                  );
                                                }}
                                              >
                                                <ListItemText
                                                  primary={element.nombre}
                                                />
                                                {element.expanded ? (
                                                  <ExpandLess />
                                                ) : (
                                                  <ExpandMore />
                                                )}
                                              </ListItemButton>

                                              <Collapse
                                                timeout="auto"
                                                unmountOnExit
                                                in={element.expanded}
                                              >
                                                <List
                                                  component="div"
                                                  disablePadding
                                                >
                                                  {element.modulos &&
                                                    element.modulos.length >
                                                      0 &&
                                                    element.modulos.map(
                                                      (mo: any, km2: any) => {
                                                        return (
                                                          <ListItemButton
                                                            key={km2}
                                                            href={
                                                              mo.ruta_formulario
                                                            }
                                                          >
                                                            <ListItemText
                                                              primary={
                                                                mo.nombre_modulo
                                                              }
                                                            />
                                                          </ListItemButton>
                                                        );
                                                      }
                                                    )}
                                                </List>
                                              </Collapse>
                                            </List>
                                          );
                                        }
                                      )}
                                    {elementSubmenuMenu.modulos &&
                                      elementSubmenuMenu.modulos.length > 0 &&
                                      elementSubmenuMenu.modulos.map(
                                        (mo: any, km2: any) => {
                                          return (
                                            <ListItemButton
                                              key={km2}
                                              href={mo.ruta_formulario}
                                            >
                                              <ListItemText
                                                primary={mo.nombre_modulo}
                                              />
                                            </ListItemButton>
                                          );
                                        }
                                      )}
                                  </List>
                                </Collapse>
                              </List>
                            );
                          }
                        )}
                        {elementMenu.modulos &&
                          elementMenu.modulos.length > 0 &&
                          elementMenu.modulos.map((mo: any, km2: any) => {
                            return (
                              <ListItemButton
                                key={km2}
                                href={mo.ruta_formulario}
                              >
                                <ListItemText primary={mo.nombre_modulo} />
                              </ListItemButton>
                            );
                          })}
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
              // color: mod_dark ? '#fafafa' : '#141415'
              color: mod_dark ? '#fafafa' : '#141415'
            }}
          >
            <Grid item xs={12} container justifyContent="center" padding={5}>
              <CircularProgress />
            </Grid>
            <Grid item xs={12} padding={5}>
              <Typography textAlign="center">
                Cargando Menú, porfavor espere...
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
        /*  onMouseDown={handleMouseDown}
       onMouseMove={handleMouseMove}
       onMouseUp={handleMouseUp} */
        component="nav"
        sx={{ flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobile_open}
          onClose={handle_drawer_toggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawer_width,
              bgcolor: mod_dark ? '#042F4A' : '#FAFAFA'
            }
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
              bgcolor: mod_dark ? '#042F4A' : '#FAFAFA',
              borderRight: 'none'
            }
          }}
        >
          {conten_drawer}
        </Drawer>
      </Box>

      {/* ------------ Box header and footer gov external user ------------- */}
      <Box
        sx={{
          width: '100vw',
          height: '100%',
          ml: { sm: desktop_open ? `${drawer_width}px` : '0px' },
          bgcolor: mod_dark ? '#042F4A' : '#FAFAFA'
        }}
      >
        {userinfo.tipo_usuario === 'E' && <HeaderGov />}
        <Box
          sx={{
            padding: '0px 20px 20px 20px',
            mt: '64px',
            minHeight: '100vh',
            height: '-webkit-fill-available'
          }}
        >
          <Outlet />
        </Box>
        {userinfo.tipo_usuario === 'E' && <FooterGov />}
      </Box>
    </>
  );
};
