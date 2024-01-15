/* eslint-disable @typescript-eslint/naming-convention */
import type { AuthSlice } from '../commons/auth/interfaces/authModels';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import {
  Box,
  Hidden,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import  VisibilityIcon  from '@mui/icons-material/Visibility';

/*
{
    "email": "guillermo.sarmiento@macarenia.org",
    "telefono_celular": "573204030369",
    "tipo_documento": "CC",
    "numero_documento": "222",
    "nombre_de_usuario": "seguridad",
    "nombre": "SeguridadNombre  SeguridadApellido ",
    "tipo_usuario": "I",
    "tipo_persona": "N",
    "nombre_unidad_organizacional": "Unidad 3",
    "profile_img": "/media/home/BIA/Otros/FotosPerfil/Pf-00000112-12012024.png"
}
*/

export const PerfilPersonaIngresa: React.FC = () => {
  const {
    userinfo: { nombre_de_usuario, tipo_persona, tipo_usuario },
  } = useSelector((state: AuthSlice) => state.auth);
  const { mod_dark } = useSelector(
    (state: {
      layout: {
        mod_dark: boolean;
      };
    }) => state.layout
  );
  const nombre_usu = nombre_de_usuario;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: 'black',
        }}
      >
        <Hidden smDown mdDown>
          <Typography
            component="div"
            sx={{
              width: 'auto',
              height: 39,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 10px',
              color: mod_dark ? '#fff' : '#042F4A',
              borderRadius: 1, // 1 => 4px
              fontWeight: 'bold',
              fontSize: 14,
            }}
          >
            <strong
              style={{
                marginRight: '.5rem',
              }}
            >
              {`${nombre_usu} :`.toUpperCase()}
            </strong>{' '}
            <strong>
              {tipo_persona === 'J'
                ? ' Usuario - Empresa'.toUpperCase()
                : tipo_persona === 'N' && tipo_usuario === 'I'
                ? ' Usuario - Interno'.toUpperCase()
                : ' Usuario - Persona'.toUpperCase()}
            </strong>
          </Typography>
        </Hidden>
        <Hidden mdUp>
          <Tooltip title="Ver Perfil">
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
              startIcon={<VisibilityIcon />}
              sx={{
                color: mod_dark ? '#fff' : '#042F4A',
                borderRadius: 1, // 1 => 4px
                fontWeight: 'bold',
                fontSize: 14,
              }}
            >
                Información
            </Button>
          </Tooltip>

          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              {`En Sesión : ${nombre_usu}`.toUpperCase()}
            </MenuItem>
            <MenuItem onClick={handleClose}>
              {tipo_persona === 'J'
                ? 'Entorno : Usuario - Empresa'.toUpperCase()
                : tipo_persona === 'N' && tipo_usuario === 'I'
                ? 'Entorno : Usuario - Interno'.toUpperCase()
                : 'Entorno : Usuario - Persona'.toUpperCase()}
            </MenuItem>
          </Menu>
        </Hidden>
      </Box>
    </>
  );
};
