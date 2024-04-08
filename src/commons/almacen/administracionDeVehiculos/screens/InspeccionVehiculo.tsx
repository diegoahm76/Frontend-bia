import { Grid, TextField, Box, Button, Stack, FormHelperText, FormControl, OutlinedInput, InputAdornment, Checkbox } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { type Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { Title } from "../../../../components";
import SearchIcon from '@mui/icons-material/Search';
import CleanIcon from '@mui/icons-material/CleaningServices';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import { red, green } from '@mui/material/colors';
// import { useAppDispatch } from "../../../../hooks";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const InspeccionVehiculoScreen: React.FC = () => {
  // const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [user_info, set_user_info] = useState<any>({});
  const [nombre_conductor, set_nombre_conductor] = useState<string>("");
  const [fecha_inspeccion, set_fecha_inspeccion] = useState<Dayjs>(dayjs());
  const [msj_error_fecha_inspeccion, set_msj_error_fecha_inspeccion] = useState<string>("");
  const [nombre_vehiculo, set_nombre_vehiculo] = useState<string>("");
  const [kilometraje, set_kilometraje] = useState<string>("");
  const [mensaje_error_km, set_mensaje_error_km] = useState<string>("");
  const [observaciones, set_observaciones] = useState<string>("");
  const [msj_error_observaciones, set_msj_error_observaciones] = useState<string>("");
  const [direccionales_del, set_direccionales_del] = useState<boolean>(false);


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
    const data = sessionStorage.getItem('persist:macarenia_app');
    if (data !== null) {
      const data_json = JSON.parse(data);
      const data_auth = JSON.parse(data_json.auth);
      set_user_info(data_auth.userinfo);
    }
  }

  const cambio_fecha_inspeccion = (date: Dayjs | null): void => {
    if (date !== null) {
      set_fecha_inspeccion(date);
      set_msj_error_fecha_inspeccion("");
    } else {
      set_msj_error_fecha_inspeccion("El campo Fecha inicio es obligatorio.");
    }
  };

  const cambio_nombre_vh: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_nombre_vehiculo(e.target.value);
    if (e.target.value !== null && e.target.value !== "")
      set_msj_error_observaciones("");
  };

  const cambio_nombre_conductor: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_nombre_conductor(e.target.value);
    if (e.target.value !== null && e.target.value !== "")
      set_msj_error_observaciones("");
  };

  const cambio_km: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_kilometraje(e.target.value);
    if (e.target.value !== null && e.target.value !== "")
      set_mensaje_error_km("");
  };

  const cambio_observaciones: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_observaciones(e.target.value);
    if (e.target.value !== null && e.target.value !== "")
      set_msj_error_observaciones("");
  };

  const validar_formulario = (): boolean => {
    let validar = true;
    if (msj_error_observaciones === "") {
      set_msj_error_observaciones("El campo Descripción es obligatorio.");
      validar = false;
    }
    return validar;
  }

  const guardar_formulario = (): void => {
    if (validar_formulario()) {
      // //  console.log('')('ok', user_info);
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
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Nombre conductor"
                  type={'text'}
                  size="small"
                  fullWidth
                  value={nombre_conductor}
                  InputProps={{
                    readOnly: true,
                  }}
                  onChange={cambio_nombre_conductor}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Fecha"
                    value={fecha_inspeccion}
                    onChange={(newValue) => { cambio_fecha_inspeccion(newValue); }}
                    renderInput={(params) => (
                      <TextField
                        required
                        fullWidth
                        size="small"
                        {...params}
                        error={msj_error_fecha_inspeccion !== ""}
                      />
                    )}
                    maxDate={dayjs()}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </Box>
          <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
            <Grid item container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Vehículo asignado"
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
              <Grid item xs={12} sm={4}>
                <FormControl sx={{ width: '100%' }} variant="outlined">
                  <OutlinedInput
                    endAdornment={<InputAdornment position="end">km</InputAdornment>}
                    type={'number'}
                    value={kilometraje}
                    size='small'
                    onChange={cambio_km}
                    error={mensaje_error_km !== ""}
                    placeholder={"Kilometraje"}
                  />
                  {(mensaje_error_km !== "") && (<FormHelperText error id="desde-error">{mensaje_error_km}</FormHelperText>)}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Stack
                  direction="row"
                  justifyContent="center"
                  spacing={2}
                >
                  <Button
                    color='primary'
                    variant='contained'
                    startIcon={<SearchIcon />}
                    onClick={() => { }}
                  >
                    Buscar vehículo
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>
          <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
            <Grid item container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  multiline
                  rows={2}
                  value={observaciones}
                  label="Motivo"
                  size="small"
                  fullWidth
                  onChange={cambio_observaciones}
                  error={msj_error_observaciones !== ""} />
                {(msj_error_observaciones !== "") && (<FormHelperText error >{msj_error_observaciones}</FormHelperText>)}
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
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
          <Title title="Elementos a inspeccionar" />
          <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
            <Grid item container spacing={2} xs={12} sm={12}>
              <Grid item container xs={12} sm={6}>
                <Grid item xs={12} sm={6}>
                  Direccionales
                </Grid>

                <Grid item xs={12} sm={3}>
                  <Stack
                    direction="row"
                    justifyContent="flex-end"
                    spacing={2}
                  >
                    Bueno
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Stack
                    direction="row"
                    justifyContent="flex-end"
                    spacing={2}
                  >
                    Malo
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
            <Grid item container spacing={2} xs={12} sm={12}>
              <Grid item container xs={12} sm={6}>
                <Grid item xs={12} sm={6}>
                  Direccionales
                </Grid>

                <Grid item xs={12} sm={3}>
                  <Stack
                    direction="row"
                    justifyContent="flex-end"
                    spacing={2}
                  >
                    Bueno
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Stack
                    direction="row"
                    justifyContent="flex-end"
                    spacing={2}
                  >
                    Malo
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
            <Grid item container spacing={2}>
              <Grid item container>
                <Grid item xs={12} sm={6}>
                  1) Direccionales delanteros
                  <Stack
                    direction="row"
                    justifyContent="flex-end"
                    spacing={2}
                  >
                  <Checkbox value={direccionales_del} onChange={() => { set_direccionales_del(false) }}
                    sx={{ color: green[800], '&.Mui-checked': { color: green[600], } }} />
                  <Checkbox value={!direccionales_del} onChange={() => { set_direccionales_del(false) }}
                    sx={{ color: red[800], '&.Mui-checked': { color: red[600], } }} />
                  </Stack>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Grid item xs={12} sm={6}>
                  2) Direccionales traseros
                  <Checkbox value={direccionales_del} onChange={() => { set_direccionales_del(false) }}
                    sx={{ color: green[800], '&.Mui-checked': { color: green[600], } }} />
                  <Checkbox value={!direccionales_del} onChange={() => { set_direccionales_del(false) }}
                    sx={{ color: red[800], '&.Mui-checked': { color: red[600], } }} />
                </Grid>
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
              color='primary'
              variant='contained'
              startIcon={<SaveIcon />}
              onClick={guardar_formulario}
            >
              Guardar
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
