/* eslint-disable @typescript-eslint/naming-convention */
// import type React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, TextField, Button, Box, Dialog, IconButton, InputLabel, Select, MenuItem } from '@mui/material';
import { useForm } from 'react-hook-form';
import { control_error } from '../../../helpers/controlError';
import CloseIcon from '@mui/icons-material/Close';
import type { AuthSlice } from '../../auth/interfaces';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@material-ui/core/Grid';
import { useTheme } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import { change_super_user, get_person_by_documents } from '../request/authRequest';
import { create_super_user } from '../store';
// import { superuser_request } from '../request/seguridadRequest';
// import { CustomSelect } from '../../auth/components/CustomSelect';

export const SuperUserScreen = ({ onClose }: { onClose: () => void }): JSX.Element => {

  // Aquí puedes definir estados y funciones necesarias para el componente
  // const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const { tipo_documento_opt, tipo_documento, set_tipo_documento } = change_super_user();
  // const [loading, set_loading] = useState(false);
  const { userinfo } = useSelector(
    (state: AuthSlice) => state.auth
  );
  // const { roles } = useSelector((state:any) => state.seguridad)
  const dispatch = useDispatch();
  const [superUsuarioActual, setSuperUsuarioActual] = useState(userinfo.nombre_de_usuario);
  const [nuevoSuperUsuario, setNuevoSuperUsuario] = useState({
    tipoDocumento: tipo_documento,
    numeroIdentificacion: '',
    nombre: '',
  });
  const theme = useTheme();


  // Watch
  const {
    register,
    formState: { errors },
    watch,
  } = useForm();
  const numero_documento = watch('numero_documento');


  // Función para seleccionar el nuevo superusuario
  const handleSeleccionarNuevoSuperUsuario = (id_persona: number): void => {
    // Aquí puedes agregar una validación para asegurarte de que el usuario tiene el rol de superusuario
      // setSuperUsuarioActual(nuevoSuperUsuario.nombre);
      // setNuevoSuperUsuario({
      //   tipoDocumento: '',
      //   numeroIdentificacion: '',
      //   nombre: '',
      // });
      // handleClose();
      dispatch(create_super_user(id_persona) as any)
      // superuser_request(id_persona).then(data => {
      //   console.log(data);
      // }).catch((error) => {
      //   console.log(error);
      // })
  };
  // Función para buscar el nuevo superusuario
  const handleSearchSuperUsuario = (tipo_documento: string, numero_documento: string): void => {

    // if (!hasSubmitted) {
    //   setIsSubmitting(true);
    //   setHasSubmitted(true);
    // Aquí puedes hacer la solicitud al servidor
    console.log('9876543210');
    // set_loading(true);
    get_person_by_documents(tipo_documento, numero_documento)
      .then(({ data: { data } }) => {
        if (data !== null && data !== undefined) {
          // Aquí puedes agregar una validación para asegurarte de que el usuario tiene el rol de superusuario
          setSuperUsuarioActual(userinfo.nombre_de_usuario);
          setNuevoSuperUsuario({
            tipoDocumento: tipo_documento,
            numeroIdentificacion: numero_documento,
            nombre: data.nombre_completo,
          });
        } else {

          setErrorMessage('No se encontraron resultados');
          setShowErrorAlert(true);
          setTimeout(() => {
            setShowErrorAlert(false);
          }, 5000); // Oculta la alerta después de 5 segundos
        }
      })
      .catch((error) => {
        control_error(error);
      })
      .finally(() => {
        // set_loading(false);

      });
    // }


  };

  const handleClose = (): void => {
    console.log('onClose called');
    onClose();
  };

  useEffect(() => {
    if (tipo_documento !== undefined) {
      set_tipo_documento(tipo_documento);
    }
  }, [tipo_documento]);

  // Consultamos si el usuario existe
  // useEffect(() => {
  //   if (numero_documento !== undefined && numero_documento !== '') {
  //     void get_person_by_documents(tipo_documento, numero_documento);
  //   }
  // }, [tipo_documento, numero_documento]);

  return (

    <Dialog
      open={true}
      onClose={handleClose}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          width: '100%',
        }}
      >
        <IconButton color={theme.palette.mode === 'light' ? 'primary' : 'inherit'} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Typography variant="h5" sx={{ mb: 6, marginLeft: '10px', marginRight: '10px' }}>
        Superusuario actual: {superUsuarioActual}
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Seleccione el nuevo superusuario:
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
          <InputLabel id="tipo-documento-label">Tipo de documento</InputLabel>
          <Select
            labelId="tipo-documento-label"
            variant="outlined"
            name="tipo_documento"
            sx={{
              boxShadow: "1px 1px 5px 1px rgba(0, 0, 0, 0.2)",
              border: "1px solid rgba(0, 0, 0, 0.2)"
            }}
            value={nuevoSuperUsuario.tipoDocumento}
            onChange={(event) => {
              setNuevoSuperUsuario((prevState) => ({
                ...prevState,
                tipoDocumento: event.target.value,
              }));
            }}
          >

            {tipo_documento_opt.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </Box>


        <Grid item xs={12} sm={6} md={4}>

          <Typography variant="subtitle1" sx={{ mb: 1, color: "#000000" }}>
            Numero Documento
          </Typography>
          <TextField
            fullWidth

            type="number"
            size="small"
            disabled={false}

            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            error={errors.numero_documento?.type === 'required'}
            helperText={
              errors.numero_documento?.type === 'required'
                ? 'Este campo es obligatorio'
                : ''
            }
            {...register('numero_documento', {
              required: true,
            })}

          />

        </Grid>
        <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 1, color: "#000000" }}>
            Nombre
          </Typography>
          <TextField

            variant="outlined"
            sx={{
              boxShadow: "1px 1px 5px 1px rgba(0, 0, 0, 0.2)",
              border: "1px solid rgba(0, 0, 0, 0.2)",
            }}
            value={nuevoSuperUsuario.nombre}

          />
          {showErrorAlert && (
  <Alert severity="error" onClose={() => { setShowErrorAlert(false); }}>
    {errorMessage}
  </Alert>
)}
        </Box>


        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <Button
                // disabled={isSubmitting}
                onClick={() => {
                  handleSearchSuperUsuario(nuevoSuperUsuario.tipoDocumento, numero_documento);
                }}
                sx={{ bgcolor: 'white', color: 'black', mr: 1 }}>
                <IconButton color={theme.palette.mode === 'light' ? 'primary' : 'inherit'} sx={{ p: 1 }}>
                  <SearchIcon />
                </IconButton>
                Busqueda
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <Button 
                variant="contained"
                onClick={() => { handleSeleccionarNuevoSuperUsuario(userinfo.id_persona) }}
                sx={{ bgcolor: 'green', color: 'white', mr: 1 }}
              >
                  Guardar
              </Button>
            </Grid>

            <Grid item>
              <Button variant="contained" onClick={handleClose} sx={{ bgcolor: 'red', color: 'white' }}>
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </Box>


      </Box>

    </Dialog >
  );
};


