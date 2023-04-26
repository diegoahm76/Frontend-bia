import React, { useEffect, useState } from 'react';
import { type Dispatch, type SetStateAction } from 'react';
import {
  Box,
  Grid,
  Stack,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Card,
  Alert,
  AlertTitle,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SaveIcon from '@mui/icons-material/Save';
import { Title } from '../../../components/Title';
import { api } from '../../../api/axios';
import { useForm, Controller } from 'react-hook-form';
import { get_permisos_rol_post } from '../../auth/adapters/roles.adapters';
import { toast, type ToastContent } from 'react-toastify';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const control_success = (message: ToastContent) =>
  toast.success(message, {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });

const dataone: React.SetStateAction<Array<{ id: number }> | undefined> = [];

interface IProps {
  set_position_tab_admin_roles: Dispatch<SetStateAction<string>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const FormAdminRoles = ({
  set_position_tab_admin_roles,
}: IProps): JSX.Element => {
  const [expanded, set_expanded] = React.useState<string | false>(false);

  const [is_create, set_is_create] = useState('');
  const [rol_permisos, set_rol_permisos] = useState<Array<{ id: number }>>();

  const [permisos, set_permisos] = React.useState([]);

  const {
    register: register_rol_permiso,
    control,
    handleSubmit: handle_submit_rol_permiso,
  } = useForm();

  const handle_change =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      set_expanded(isExpanded ? panel : false);
    };

  const handle_change_1 = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    // set_checked([event.target.checked, event.target.checked]);
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const get_roles_permisos = async () => {
    try {
      const { data: data_permisos } = await api.get(
        'permisos/permisos-modulos/get-list/'
      );
      console.log(data_permisos.data);
      set_permisos(data_permisos.data);
    } catch (error) {
      console.log(error);
    }
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const on_submit_rol_permiso = async (data: any) => {
    // eslint-disable-next-line array-callback-return
    data.permisos.map((item: any, index: any) => {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (item.true) {
        dataone.push({
          id: index,
        });
        set_rol_permisos(dataone);
      }
    });

    if (is_create === 'crear') {
      const rol_create = {
        nombre_rol: data.nombre_rol,
        descripcion_rol: data.descripcion_rol,
        Rol_sistema: false,
      };
      const { data: data_rol } = await api.post('roles/create/', rol_create);
      control_success('Rol creado');
      set_position_tab_admin_roles('1');
      const permisos_rol = get_permisos_rol_post(data_rol.id_rol, rol_permisos);
      await api
        .post('permisos/permisos-modulos-rol/create/', permisos_rol)
        .then(() => {
          control_success('Rol creado');
        });
    }
    // else {
    //   const datos_edit_rol = {
    //     nombre_rol: data.nombre_rol,
    //     descripcion_rol: data.descripcion_rol,
    //   };

    //   const { data: response_edit_rol } = await api.put(
    //     // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    //     `/roles/update/${data.idRol}/`,
    //     datos_edit_rol
    //   );
    //   console.log(response_edit_rol);

    //   const datos_edit_permisos_rol = get_permisos_rol_post(
    //     data.idRol,
    //     form_values.permisosRol
    //   );
    //   const data_format_request_rol = datos_edit_permisos_rol.map(
    //     (permiso: { id_permiso_modulo: number }) => ({
    //       id_permisos_modulo: permiso.id_permiso_modulo,
    //     })
    //   );
    //   await api
    //     .put(
    //       // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    //       `permisos/permisos-modulos-rol/update/${data.idRol}/`,
    //       data_format_request_rol
    //     )
    //     .then(() => {
    //       control_success('Datos del rol actualizados correctamente');
    //     })
    //     .catch(() => {
    //       control_error('Algo pasó consulta con tu developer de confianza');
    //     });
    // }
  };

  useEffect(() => {
    void get_roles_permisos();
    set_is_create('crear');
  }, []);

  return (
    <>
      <Grid item xs={12}>
        <Title title="LUGAR DE RESIDENCIA" />
        <Box sx={{ mt: '20px' }}>
          <Box
            component="form"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={handle_submit_rol_permiso(on_submit_rol_permiso)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Nombre del rol"
                  size="small"
                  fullWidth
                  {...register_rol_permiso('nombre_rol', { required: true })}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Descripción"
                  size="small"
                  fullWidth
                  {...register_rol_permiso('descripcion_rol', {
                    required: true,
                  })}
                />
              </Grid>
              <Grid item xs={12} sm={3}></Grid>
              <Grid item xs={12} sm={3}></Grid>
            </Grid>
            <Box sx={{ mt: '20px' }}>
              {permisos.map((subsistema: any, index) => (
                <>
                  <Accordion
                    key={subsistema.subsistema}
                    elevation={5}
                    expanded={expanded === `panel${index + 1}`}
                    onChange={handle_change(`panel${index + 1}`)}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        {subsistema.desc_subsistema}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container direction="row" spacing={3}>
                        {subsistema.modulos.map((modulo: any): any => (
                          <>
                            <Grid item xs={12} sm={6}>
                              <Card sx={{ p: '10px' }}>
                                <Box sx={{ flexDirection: 'column' }}>
                                  {Object.keys(modulo.permisos).length > 0 ? (
                                    <Typography>
                                      <FormControlLabel
                                        label={modulo.nombre_modulo}
                                        control={
                                          <Checkbox
                                            key={modulo.id_modulo}
                                            checked={false}
                                            indeterminate={false}
                                            onChange={handle_change_1}
                                          />
                                        }
                                      />
                                    </Typography>
                                  ) : (
                                    <Typography sx={{ p: '0 0 10px 10px' }}>
                                      {modulo.nombre_modulo}
                                    </Typography>
                                  )}

                                  {Object.keys(modulo.permisos).length > 0 ? (
                                    Object.keys(modulo.permisos).map(
                                      (permiso, index) => (
                                        <Controller
                                          key={modulo.permisos[permiso].id}
                                          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                                          name={`permisos[${modulo.permisos[permiso].id}][${modulo.permisos[permiso].value}]`}
                                          control={control}
                                          render={({ field }) => (
                                            <FormControlLabel
                                              {...field}
                                              labelPlacement="top"
                                              label={permiso}
                                              control={
                                                <Checkbox color="primary" />
                                              }
                                            />
                                          )}
                                        ></Controller>
                                      )
                                    )
                                  ) : (
                                    <Box>
                                      <Alert severity="info">
                                        <AlertTitle>Info</AlertTitle>
                                        Sin acciones disponibles
                                      </Alert>
                                    </Box>
                                  )}
                                </Box>
                              </Card>
                            </Grid>
                          </>
                        ))}
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </>
              ))}
            </Box>
            <Stack
              direction="row"
              justifyContent="flex-end"
              spacing={2}
              sx={{ mt: '20px' }}
            >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
              >
                CREAR
              </Button>
            </Stack>
          </Box>
        </Box>
      </Grid>
    </>
  );
};
