/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import PersonIcon from '@mui/icons-material/Person';
import Dialog from '@mui/material/Dialog';
import { useDispatch, useSelector } from 'react-redux';
import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  DialogTitle,
  Typography,
  ListItemIcon,
} from '@mui/material';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import {
  close_dialog_representado_app,
  get_persmisions_user,
  setRepresentacionLegal,
} from '../../store';
import { type AuthSlice } from '../../interfaces';
import Select from 'react-select';
import BoyIcon from '@mui/icons-material/Boy';
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';
import { useAppSelector } from '../../../../hooks';
import { useNavigate } from 'react-router-dom';
import React from 'react';

export const DialogEntornoApp: React.FC = () => {
  //* redux states
  const { userinfo } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { dialog_representante, representante_legal, apoderados } = useSelector(
    (state: AuthSlice) => state.auth
  );

  const options = [
    { label: 'Nombre propio', value: 'MP' },
    { label: 'En representación de una empresa', value: 'Nombre propio' },
    { label: 'En representación de una persona', value: 'Nombre propio' },
  ];

  const select_representado = (value: string | object): void => {
    console.log(value);
    dispatch(setRepresentacionLegal(value));
    dispatch(close_dialog_representado_app());
  };

  const renderSelect = (placeholder: string, options: any, onChange: any) => (
    <Select
      styles={{
        control: (base) => ({
          ...base,
          boxShadow: 'none',
          width: '100%', // Hacer que el ancho sea responsivo
          zIndex: 99,
        }),
        menu: (base) => ({
          ...base,
          zIndex: 99,
          width: '100%',
          maxHeight: '130px', // Limitar la altura máxima del menú
          overflowY: 'auto', // Habilitar el desbordamiento de scroll
        }),
      }}
      placeholder={placeholder}
      menuPlacement="top"
      onChange={(value) => {
        onChange(value);
        dispatch(get_persmisions_user(userinfo.id_usuario, 'C'));
        navigate('/app/home', { replace: true });
      }}
      options={options}
      isSearchable={false}
    />
  );

  return (
    <Dialog
      open={dialog_representante}
      maxWidth="lg"
      sx={{ '& .MuiDialog-paper': { width: '55%', maxHeight: '700px' } }}
      onClose={() => {
        dispatch(close_dialog_representado_app());
      }}
    >
      <DialogTitle
        textAlign="center"
        fontSize={14}
        bgcolor={'#042F4A'}
        color="#FFFF"
        variant="subtitle1"
        sx={{ padding: '10px' }}
      >
        <Typography>Seleccione como continuará dentro del sistema</Typography>
      </DialogTitle>

      <List
        sx={{
          padding: 2,
        }}
      >
        {userinfo.tipo_usuario !== 'E' && (
          <ListItem disableGutters alignItems="center">
            <ListItemButton
              autoFocus
              onClick={() => {
                select_representado({
                  cod_relacion_con_el_titular: 'MP',
                  tipo_sesion: 'I',
                });
                //* llamar el servicio para cargar el menú pero con entorno laboral
                dispatch(get_persmisions_user(userinfo.id_usuario, 'L'));
                dispatch(close_dialog_representado_app());
                navigate('/app/home', { replace: true });
              }}
            >
              <ListItemIcon>
                <PersonPinIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText
                primary={'Continuar como usuario interno - entorno laboral'}
              />
            </ListItemButton>
          </ListItem>
        )}

        {options.map((option, index) => (
          <React.Fragment key={index}>
            {option.label !== 'En representación de una empresa' &&
              option.label !== 'En representación de una persona' && (
                <ListItem key={option.label} disableGutters alignItems="center">
                  <ListItemButton
                    autoFocus
                    onClick={() => {
                      select_representado({
                        cod_relacion_con_el_titular: option.value,
                        tipo_sesion: 'E',
                      });
                      dispatch(close_dialog_representado_app());
                      dispatch(get_persmisions_user(userinfo.id_usuario, 'C'));
                      navigate('/app/home', { replace: true });
                    }}
                  >
                    <ListItemIcon>
                      <BoyIcon fontSize="large" />
                    </ListItemIcon>
                    <ListItemText primary={option.label} />
                  </ListItemButton>
                </ListItem>
              )}

            {option.label === 'En representación de una empresa' &&
              representante_legal?.length > 0 && (
                <ListItem key={option.label} disableGutters alignItems="center">
                  <ListItemButton autoFocus>
                    <ListItemIcon>
                      <EmojiTransportationIcon fontSize="large" />
                    </ListItemIcon>
                    <ListItemText primary={option.label} />
                    {renderSelect(
                      'Seleccione una empresa',
                      [...representante_legal].map((representante) => ({
                        representacion: representante,
                        cod_relacion_con_el_titular:
                          representante?.cod_relacion_con_el_titular,
                        value: representante?.razon_social,
                        label:
                          representante?.razon_social || 'Sin razón social',
                        tipo_sesion: 'E',
                      })),
                      select_representado
                    )}
                  </ListItemButton>
                </ListItem>
              )}

            {option.label === 'En representación de una persona' &&
              apoderados?.length > 0 && (
                <ListItem key={option.label} disableGutters alignItems="center">
                  <ListItemButton autoFocus>
                    <ListItemIcon>
                      <PersonIcon fontSize="large" />
                    </ListItemIcon>
                    <ListItemText primary={option.label} />
                    {renderSelect(
                      'Seleccione una persona',
                      [...apoderados].map((apoderado) => ({
                        representacion: apoderado,
                        cod_relacion_con_el_titular:
                          apoderado?.cod_relacion_con_el_titular,

                        value: apoderado?.id_apoderados_persona,
                        label:
                          apoderado?.nombre_persona_poderdante || 'Sin nombre',
                        tipo_sesion: 'E',
                      })),
                      select_representado
                    )}
                  </ListItemButton>
                </ListItem>
              )}
          </React.Fragment>
        ))}
      </List>
    </Dialog>
  );
};
