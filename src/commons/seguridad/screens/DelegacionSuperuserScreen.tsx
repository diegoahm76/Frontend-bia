/* eslint-disable @typescript-eslint/naming-convention */
import {
  Alert,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Title } from '../../../components';
import { change_super_user } from '../request/authRequest';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { type AuthSlice } from '../../auth/interfaces';
import SearchIcon from '@mui/icons-material/Search';
import { get_person_by_document } from '../../../request';
import { control_error } from '../../../helpers';
import { create_super_user } from '../store';
import Swal from 'sweetalert2';
import SaveIcon from '@mui/icons-material/Save';
// eslint-disable-next-line @typescript-eslint/naming-convention
export const DelegacionSuperuserScreen: React.FC = () => {
  const { watch, register } = useForm();
  const { userinfo } = useSelector((state: AuthSlice) => state.auth);
  const dispatch = useDispatch();

  const { tipo_documento_opt, tipo_documento, set_tipo_documento } =
    change_super_user();

  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [superUsuarioActual, setSuperUsuarioActual] = useState(
    userinfo.nombre_de_usuario
  );
  const [nuevoSuperUsuario, setNuevoSuperUsuario] = useState({
    tipoDocumento: tipo_documento,
    numeroIdentificacion: '',
    nombre: '',
    id_persona: 0,
  });

  useEffect(() => {
    if (tipo_documento !== undefined) {
      set_tipo_documento(tipo_documento);
    }
  }, [tipo_documento]);

  const numero_documento = watch('numero_documento');

  const handleSearchSuperUsuario = (
    tipo_documento: string,
    numero_documento: string
  ): void => {
    get_person_by_document(tipo_documento, numero_documento)
      .then(({ data: { data } }) => {
        if (data !== null && data !== undefined) {
          // //  console.log('')(data);
          setSuperUsuarioActual(userinfo.nombre_de_usuario);
          setNuevoSuperUsuario({
            tipoDocumento: tipo_documento,
            numeroIdentificacion: numero_documento,
            nombre: data?.nombre_completo,
            id_persona: data.id_persona,
          });
        } else {
          setErrorMessage('No se encontraron resultados');
          setShowErrorAlert(true);
          setTimeout(() => {
            setShowErrorAlert(false);
          }, 5000);
        }
      })
      .catch((error) => {
        control_error(error);
      });
  };

  const handleSeleccionarNuevoSuperUsuario = (id_persona: number): void => {
    Swal.fire({
      customClass: {
        confirmButton: 'square-btn',
        cancelButton: 'square-btn',
      },
      width: 350,
      text: `¿Estas Seguro de delegar el superusuario a ${nuevoSuperUsuario.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#8BC34A',
      cancelButtonColor: '#B71C1C',
      confirmButtonText: 'Si, Delegar',
      cancelButtonText: 'Cancelar',
    })
      .then((result) => {
        if (
          nuevoSuperUsuario.numeroIdentificacion !== '' &&
          result.isConfirmed
        ) {
          dispatch(create_super_user(id_persona) as any);
        }
      })
      .catch((err) => {
        //  console.log('')(err);
      });
  };

  return (
    <>
      <Grid
        container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item xs={12}>
          <Title title="Delegación de Superusuario"></Title>
          <Box
            component="form"
            sx={{ mt: '20px' }}
            noValidate
            autoComplete="off"
          >
            <Grid
              container
              spacing={1}
              sx={{
                justifyContent: '-moz-initial',
              }}
            >
              <Grid item sx={{ display: 'flex'  }}>
                <Typography variant="body2" sx={{ pr: '20px', margin: 1.3 }}>
                  SuperUsuarioActual:
                </Typography>
                <TextField
                  value={superUsuarioActual}
                  size="small"
                  fullWidth
                  disabled
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ my: '10px' }}>
              <Grid item xs={12} sm={4}>
                <FormControl size="small" fullWidth>
                  <InputLabel>Tipo de Documento</InputLabel>
                  <Select
                    label="Tipo de Documento"
                    value={nuevoSuperUsuario.tipoDocumento}
                    onChange={(event) => {
                      setNuevoSuperUsuario((prevState) => ({
                        ...prevState,
                        tipoDocumento: event.target.value,
                      }));
                    }}
                  >
                    {tipo_documento_opt.map(({ value, label }) => (
                      <MenuItem key={value} value={value}>
                        {label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  label="Número de identificación"
                  size="small"
                  fullWidth
                  {...register('numero_documento')}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  disabled
                  placeholder="Nombre"
                  size="small"
                  value={nuevoSuperUsuario.nombre}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  type="button"
                  variant="contained"
                  startIcon={<SearchIcon />}
                  onClick={() => {
                    handleSearchSuperUsuario(
                      nuevoSuperUsuario.tipoDocumento,
                      numero_documento
                    );
                  }}
                >
                  Busqueda Personal
                </Button>
              </Grid>
            </Grid>
            {showErrorAlert && (
              <Alert
                severity="error"
                onClose={() => {
                  setShowErrorAlert(false);
                }}
              >
                {errorMessage}
              </Alert>
            )}
          </Box>
          <Stack
            direction="row-reverse"
            spacing={2}
            sx={{ mr: '15px', mb: '10px', mt: '10px' }}
          >
            <Button
              color="success"
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={() => {
                handleSeleccionarNuevoSuperUsuario(
                  nuevoSuperUsuario.id_persona
                );
              }}
            >
              Guardar
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};
