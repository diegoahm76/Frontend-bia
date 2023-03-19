import { useState } from 'react';
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
} from '@mui/material';

// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CircleIcon from '@mui/icons-material/Circle';
// import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import { open_drawer_desktop, open_drawer_mobile } from '../store/layoutSlice';
import LogoutIcon from '@mui/icons-material/Logout';
import type { AuthSlice, Permisos } from '../commons/auth/interfaces';
import { logout } from '../commons/auth/store';

interface Props {
  window?: () => Window;
  drawer_width: number;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SideBar: React.FC<Props> = ({ window, drawer_width }: Props) => {
  const dispatch = useDispatch();
  const [open, set_open] = useState(false);
  const { userinfo } = useSelector((state: AuthSlice) => state.auth);
  const [permisos, set_permisos] = useState<Permisos[]>([
    {
      subsistema: 'SEGU',
      desc_subsistema: 'Seguridad',
      expanded: true,
      modulos: [
        {
          id_modulo: 2,
          nombre_modulo: 'Administración de Usuarios',
          descripcion:
            'Permite administrar las credenciales de acceso de las personas al sistema',
          ruta_formulario: '/#/app/seguridad/administracion_usuarios',
          nombre_icono: 'test',
          permisos: {
            actualizar: true,
            consultar: true,
            crear: true,
          },
        },
        {
          id_modulo: 5,
          nombre_modulo: 'Roles',
          descripcion: 'Permite administrar los roles del sistema',
          ruta_formulario: '/#/app/seguridad/roles',
          nombre_icono: 'test',
          permisos: {
            actualizar: true,
            borrar: true,
            consultar: true,
            crear: true,
          },
        },
        {
          id_modulo: 8,
          nombre_modulo: 'Delegación del Rol de SuperUsuario',
          descripcion:
            'Proceso que permite a un SuperUsuario delegar dicha función a otra persona',
          ruta_formulario: '/#/app/seguridad/superusuario',
          nombre_icono: 'test',
          permisos: {
            consultar: true,
            ejecutar: true,
          },
        },
        {
          id_modulo: 3,
          nombre_modulo: 'Actualizacion de Datos Usuario',
          descripcion:
            'Permite administrar a una persona que tiene un usuario interno, los datos de su usuario desde el sistema-Sóo para usuarios internos',
          ruta_formulario: '/test',
          nombre_icono: 'test',
          permisos: {
            actualizar: true,
            consultar: true,
          },
        },
        {
          id_modulo: 4,
          nombre_modulo: 'Actualizacion Datos Usuario Externo',
          descripcion:
            'Permite administrar a una persona que tiene un usuario externo, los datos de su usuario desde el portal web-Sólo para usuarios externos',
          ruta_formulario: '/test',
          nombre_icono: 'test',
          permisos: {
            actualizar: true,
            consultar: true,
          },
        },
      ],
    },
    {
      subsistema: 'TRSV',
      desc_subsistema: 'Transversal',
      expanded: true,
      modulos: [
        {
          id_modulo: 1,
          nombre_modulo: 'Administración de Personas',
          descripcion:
            'Permite administrar las personas registradas en el sistema',
          ruta_formulario: '/test',
          nombre_icono: 'test',
          permisos: {
            actualizar: true,
            consultar: true,
            crear: true,
          },
        },
      ],
    },
  ]);

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

  const open_collapse = (obj: Permisos, key: number): void => {
    permisos[key] = { ...obj, expanded: !obj.expanded };
    set_permisos([...permisos]);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

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
        {/* {mobile_open && (
          <IconButton onClick={handle_drawer_toggle}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        )} */}
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
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <CircleIcon sx={{ color: 'secondary.main', height: '10px' }} />
              </ListItemIcon>
              <ListItemText primary="Starred" />
            </ListItemButton>
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
      {permisos.map((e, k) => {
        return (
          <List sx={{ margin: '0 20px', color: 'secondary.main' }} key={k}>
            <ListItemButton
              onClick={() => {
                open_collapse(e, k);
              }}
            >
              {/* <ListItemIcon>
                <AssignmentOutlinedIcon sx={{ color: 'secondary.main' }} />
              </ListItemIcon> */}
              <ListItemText primary="Tableros de control" />
              {e.expanded ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse timeout="auto" unmountOnExit in={e.expanded}>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <CircleIcon sx={{ color: 'secondary.main' }} />
                  </ListItemIcon>
                  <ListItemText primary="Starred" />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        );
      })}
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
