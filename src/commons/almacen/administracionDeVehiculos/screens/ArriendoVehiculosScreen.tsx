import { Grid, TextField, Box, Button, Stack, FormHelperText, ToggleButton } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { type Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { Title } from "../../../../components";
import SearchIcon from '@mui/icons-material/Search';
import CleanIcon from '@mui/icons-material/CleaningServices';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// import { useAppDispatch } from "../../../../hooks";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ArriendoVehiculosScreen: React.FC = () => {
  // const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [user_info, set_user_info] = useState<any>({});
  const [nombre_vehiculo, set_nombre_vehiculo] = useState<string>("");
  const [placa, set_placa] = useState<string>("");
  const [descripcion, set_descripcion] = useState<string>("");
  const [msj_error_descripcion, set_msj_error_descripcion] = useState<string>("");
  const [fecha_inicio, set_fecha_inicio] = useState<Dayjs>(dayjs());
  const [msj_error_fecha_inicio, set_msj_error_fecha_inicio] = useState<string>("");
  const [fecha_fin, set_fecha_fin] = useState<Dayjs>(dayjs());
  const [msj_error_fecha_fin, set_msj_error_fecha_fin] = useState<string>("");
  const [abrir_hdv, set_abrir_hdv] = useState<boolean>(false);


  useEffect(() => {
    // obtener_bodegas_fc();
    obtener_usuario();
  }, []);

  // const obtener_bodegas_fc: () => void = () => {
  //   dispatch(obtener_bodegas()).then((response: any) => {
  //     set_bodegas(response);
  //   })
  // }

  const obtener_usuario: () => void = () => {
    const data = localStorage.getItem('persist:macarenia_app');
    if (data !== null) {
      const data_json = JSON.parse(data);
      const data_auth = JSON.parse(data_json.auth);
      set_user_info(data_auth.userinfo);
    }
  }

  const cambio_fecha_inicio = (date: Dayjs | null): void => {
    if (date !== null) {
      set_fecha_inicio(date);
      set_msj_error_fecha_inicio("");
    } else {
      set_msj_error_fecha_inicio("El campo Fecha inicio es obligatorio.");
    }
  };

  const cambio_fecha_fin = (date: Dayjs | null): void => {
    if (date !== null) {
      set_fecha_fin(date);
      set_msj_error_fecha_fin("");
    } else {
      set_msj_error_fecha_fin("El campo Fecha fin es obligatorio.");
    }
  };

  const cambio_nombre_vh: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_nombre_vehiculo(e.target.value);
    if (e.target.value !== null && e.target.value !== "")
      set_msj_error_descripcion("");
  };

  const cambio_placa: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_placa(e.target.value);
    if (e.target.value !== null && e.target.value !== "")
      set_msj_error_descripcion("");
  };

  const cambio_descripcion: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_descripcion(e.target.value);
    if (e.target.value !== null && e.target.value !== "")
      set_msj_error_descripcion("");
  };

  const validar_formulario = (): boolean => {
    let validar = true;
    if (msj_error_descripcion === "") {
      set_msj_error_descripcion("El campo Descripción es obligatorio.");
      validar = false;
    }
    return validar;
  }

  const guardar_formulario = (): void => {
    if (validar_formulario()) {
      console.log('ok', user_info);
    }
  }

  const limpiar_formulario = (): void => {

  }

  const salir_entrada: () => void = () => {
    navigate('/home');
  }

  return (
    <>
      <h1>Administrar vehículo arrendado</h1>
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
        <Grid item md={12} xs={12}>
          <Title title="Vehículo" />
          <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
            <Grid item container spacing={2}>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Nombre"
                  type={'text'}
                  size="small"
                  fullWidth
                  value={nombre_vehiculo}
                  InputProps={{
                    readOnly: true,
                  }}
                  onChange={cambio_nombre_vh}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Placa"
                  type={'text'}
                  size="small"
                  fullWidth
                  value={placa}
                  InputProps={{
                    readOnly: true,
                  }}
                  onChange={cambio_placa}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Marca"
                  type={'text'}
                  size="small"
                  fullWidth
                  value={placa}
                  InputProps={{
                    readOnly: true,
                  }}
                  onChange={cambio_placa}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Empresa proveedora"
                  type={'text'}
                  size="small"
                  fullWidth
                  value={placa}
                  InputProps={{
                    readOnly: true,
                  }}
                  onChange={cambio_placa}
                />
              </Grid>
            </Grid>
          </Box>
          <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
            <Grid item container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  multiline
                  rows={2}
                  value={descripcion}
                  label="Motivo"
                  size="small"
                  fullWidth
                  onChange={cambio_descripcion}
                  error={msj_error_descripcion !== ""} />
                {(msj_error_descripcion !== "") && (<FormHelperText error >{msj_error_descripcion}</FormHelperText>)}
              </Grid>
            </Grid>
          </Box>
          <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
            <Grid item container spacing={2}>
              <Grid item xs={12} sm={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Fecha entrada"
                    value={fecha_inicio}
                    onChange={(newValue) => { cambio_fecha_inicio(newValue); }}
                    renderInput={(params) => (
                      <TextField
                        required
                        fullWidth
                        size="small"
                        {...params}
                        error={msj_error_fecha_inicio !== ""}
                      />
                    )}
                    maxDate={dayjs()}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Fecha entrada"
                    value={fecha_fin}
                    onChange={(newValue) => { cambio_fecha_fin(newValue); }}
                    renderInput={(params) => (
                      <TextField
                        required
                        fullWidth
                        size="small"
                        {...params}
                        error={msj_error_fecha_fin !== ""}
                      />
                    )}
                    maxDate={dayjs()}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack
                  direction="row"
                  justifyContent="center"
                  spacing={2}
                >
                  <ToggleButton
                    value="check"
                    selected={abrir_hdv}
                    onChange={() => {
                      set_abrir_hdv(!abrir_hdv);
                    }}
                    size='small'
                  >
                    <CheckIcon />Desea asignarle hoja de vida
                  </ToggleButton>
                </Stack>

              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>


      <Grid item xs={6}>
        <Box
          component="form"
          sx={{ mt: '20px', mb: '20px' }}
          noValidate
          autoComplete="off"
        >
          <Stack
            direction="row"
            justifyContent="flex-end"
            spacing={2}
            sx={{ mt: '20px' }}
          >
            <Button
              color='error'
              variant='contained'
              startIcon={<DeleteForeverIcon />}
              onClick={() => { }}
              disabled={false}
            >
              Anular
            </Button>
            <Button
              color='inherit'
              variant="contained"
              startIcon={<CleanIcon />}
              onClick={limpiar_formulario}
            >
              Limpiar
            </Button>
            <Button
              color='secondary'
              variant='contained'
              startIcon={<SearchIcon />}
              onClick={() => { }}
            >
              Buscar
            </Button>
            <Button
              color='primary'
              variant='contained'
              startIcon={<SaveIcon />}
              onClick={guardar_formulario}
            >
              Guardar
            </Button>
            <Button
              color='error'
              variant='contained'
              startIcon={<ClearIcon />}
              onClick={salir_entrada}
            >
              Salir
            </Button>
          </Stack>
        </Box>
      </Grid>
    </>
  );
}
