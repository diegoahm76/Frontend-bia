import { useEffect, useState } from 'react';
import { Box, Button, Grid, Input, Stack, TextField } from '@mui/material';
import { Title } from '../../../components';
import { control_error, control_success, validate_password } from '../../../helpers';
import type { AxiosError } from 'axios';
import { useSelector } from 'react-redux';
import type { AuthSlice } from '../../auth/interfaces';
import { get_user_by_id } from '../../../request/getRequest';
import type { Users } from '../interfaces';
import { type FieldValues, type SubmitHandler, useForm } from 'react-hook-form';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import UpdateIcon from '@mui/icons-material/Update';
import { editar_datos_acceso } from '../request/seguridadRequest';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DatosAccesoScreen: React.FC = () => {
  const {
    register,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleSubmit: handle_submit,
    formState: { errors },
    watch
  } = useForm();
  const [datos, set_datos] = useState<Users>();
  const { userinfo } = useSelector((state: AuthSlice) => state.auth);
  const [message_error, set_message_error_password] = useState('');
  const [is_error_password, set_error_password] = useState(false);
  const [is_cambio_password, set_is_cambio_password] = useState(false);
  const [file_name, set_file_name] = useState('');
  const [image_url, set_image_url] = useState<string | null>(null);

  const password = watch('password');
  const password2 = watch('password2');

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handle_file_select = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected_file = event.target.files != null ? event.target.files[0] : null;
    if (selected_file != null) {
      set_file_name(selected_file.name);

      const reader = new FileReader();
      reader.onload = (event) => {
        set_image_url(event.target?.result as string);
      };
      reader.readAsDataURL(selected_file);
    }
  };


  useEffect(() => {
    if (password !== password2) {
      set_message_error_password('Las contraseñas no son iguales');
      set_error_password(true);
      return;
    }

    if (password !== undefined && password !== '') {
      if (!validate_password(password)) {
        set_error_password(true);
        set_message_error_password(
          'La contraseña no cumple con el formato requerido'
        );
        return;
      }
    }
    set_error_password(false);
  }, [password, password2]);

  const datos_usuario = async (id_usuario: number): Promise<void> => {
    try {
      const {
        data: { data },
      } = await get_user_by_id(id_usuario);
      set_datos(data)
    } catch (err) {
      const temp = err as AxiosError;
      if (temp.response?.status !== 404) {
        control_error(err);
      }
    }
  };

  useEffect(() => {
    void datos_usuario(userinfo.id_usuario);
  }, []);

  const on_submit_persona: SubmitHandler<FieldValues> = async (data) => {
    try {
      //  set_loading_natural(true);
      const datos_persona = new FormData();
      if (data !== undefined) {
        datos_persona.append('password', data.password);
        console.log('first_name')
      }
      if (data.profile_img !== undefined) {
        datos_persona.append(
          'profile_img',
          data.profile_img[0]
        );
      }
      console.log(datos_persona , 'datos_persona')
      await editar_datos_acceso(datos_persona);
      // reset_file_state();
      // set_loading_natural(false);
      control_success('Se actualizaron los datos correctamente');
    } catch (error) {
      // set_loading_natural(false);
      control_error(error);
    }
  };

  return (
    <>
      {datos !== undefined && (
        <>
          <Box component="form"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={handle_submit(on_submit_persona)}
          >
            <Grid
              container
              spacing={2}
              sx={{
                position: 'relative',
                background: '#FAFAFA',
                borderRadius: '15px',
                p: '20px',
                mb: '20px',
                mt: '80px',
                boxShadow: '0px 3px 6px #042F4A26',
              }}
            >
              <Grid item xs={12}>
                <Title title="Mis datos de acceso" />
              </Grid>
              <Grid item xs={12} container justifyContent="center">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <img
                    height={250}
                    width={250}
                    // datos?.profile_img !== '' ? datos?.profile_img : 
                    src={image_url != null ? image_url : 'https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg'}
                    alt="Imagen de perfil"
                  />
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<CloudUploadIcon />}
                    style={{ marginTop: '1rem', justifyContent: 'center' }}
                    size='small'
                  >
                    {file_name !== ''
                      ? file_name
                      : 'Seleccione foto de perfil '}
                    <Input
                      hidden
                      id="foto-peril"
                      type="file"
                      autoFocus
                      style={{ opacity: 0 }}
                      {...register('profile_img')}
                      inputProps={{ accept: 'image/*' }}
                      error={Boolean(errors.profile_img)}
                      onChange={handle_file_select}
                    />
                  </Button>
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <TextField label="Nombre de usuario"
                  size="small"
                  disabled
                  value={datos?.nombre_de_usuario}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <TextField label="Tipo usuario"
                  size="small"
                  fullWidth
                  disabled
                  value={datos?.tipo_usuario === 'E' ? 'Externo' : 'Ingterno'}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <TextField
                  label="fecha activacion inicial"
                  size="small"
                  fullWidth
                  disabled
                  value={datos?.activated_at}
                />
              </Grid >
              {is_cambio_password && (
                <>
                  <Grid item xs={12}>
                    <Title title="Cambio de contraseña" />
                  </Grid>
                  <Grid item xs={12}>
                    <p className="title">
                      La contraseña debe cumplir con el siguiente formato:
                    </p>
                    <ul className="formatoPassowrd">
                      <li>Debe contener mínimo 8 caracteres</li>
                      <li>Debe contener 1 Caracter en Mayúscula</li>
                      <li>Debe contener 1 Caracter numérico</li>
                      <li>Debe contener 1 Caracter simbólico (*,-,_,%...)</li>
                    </ul>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      label="Nueva contraseña"
                      fullWidth
                      size='small'
                      error={is_error_password || errors.password?.type === 'required'}
                      helperText={message_error}
                      {...register('password', {
                        required: true,
                        minLength: {
                          value: 8,
                          message: 'La contraseña debe tener 8 carácteres mínimio'
                        }
                      })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      label="Confirme su contraseña"
                      size='small'
                      fullWidth
                      error={is_error_password || errors.password2?.type === 'required'}
                      helperText={message_error}
                      {...register('password2', {
                        required: true,
                        minLength: {
                          value: 8,
                          message: 'La contraseña debe tener 8 carácteres mínimio'
                        }
                      })}
                    />
                  </Grid>
                </>
              )}
              <Grid item xs={12}>
                <Stack
                  justifyContent="flex-end"
                  sx={{ m: '10px 0 20px 0' }}
                  direction="row"
                  spacing={2}
                >
                  {is_cambio_password && (
                    <>
                      <Button color="error" variant="outlined"
                        onClick={() => {
                          set_is_cambio_password(false);
                        }}
                      >
                        Volver
                      </Button>
                    </>
                  )}
                  <Button variant="contained"
                    startIcon={<UpdateIcon />}
                    onClick={() => {
                      set_is_cambio_password(true);
                    }}
                  >
                    Cambiar contraseña
                  </Button>
                  <Button color="success" variant="contained" type='submit'>
                    Guardar
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
    </>
  );
};
