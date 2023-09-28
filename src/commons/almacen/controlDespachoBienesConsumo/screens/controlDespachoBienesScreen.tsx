/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { FormControl, Grid, InputLabel, MenuItem, Select, type SelectChangeEvent, TextField, Box, Button, Stack, Switch, FormHelperText } from "@mui/material";
import { useEffect, useState } from "react";
import { Title } from "../../../../components";
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch } from "../../../../hooks";
import { useNavigate } from "react-router-dom";
import { ResultadosBusqueda } from "./ResultadosBusqueda";
import dayjs from "dayjs";
import ClearIcon from '@mui/icons-material/Clear';
import CleanIcon from '@mui/icons-material/CleaningServices';
import BuscarBienConsumo from "../../controlDeInventario/screens/BuscarBienConsumo";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { obtener_consumo_bienes_und, obtener_unidades_organizacionales } from "../thunks/controlDespachoBienesConsumo";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ControlDespachoBienesScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const estilo_seccion = {
    position: 'relative',
    background: '#FAFAFA',
    borderRadius: '15px',
    p: '20px',
    mb: '20px',
    boxShadow: '0px 3px 6px #042F4A26',
  };
  useEffect(() => {
    obtener_unidades_organizacionales_fc();
  }, []);

  const obtener_unidades_organizacionales_fc: () => void = () => {
    dispatch(obtener_unidades_organizacionales()).then((response: any) => {
      const unidades = response.Unidades.filter((und: any) => und.activo);
      set_lt_unidades_org(unidades);
    })
  }
  // Listas
  const lt_tablero_control = [{ id: 'CBU', value: 'Consumo de bienes por unidad' }]
  const lt_tipo_despacho = [{ id: 'DG', value: 'Despacho general' }, { id: 'DV', value: 'Despacho a vivero' }];
  const lt_presentacion = [{ id: "und", value: "Unidad" }, { id: "Bn", value: "Bien" }];
  // Variables globales
  const [resultado_busqueda, set_resultado_busqueda] = useState<any[]>([]);
  const [lt_unidades_org, set_lt_unidades_org] = useState<any[]>([]);
  const [seleccion_tablero_control, set_seleccion_tablero_control] = useState<string>("CBU");
  const [seleccion_tipo_despacho, set_seleccion_tipo_despacho] = useState<string>("");
  const [seleccion_unidad_org, set_seleccion_unidad_org] = useState<string>("");
  const [seleccion_presentacion, set_seleccion_presentacion] = useState<string>("");
  const [seleccion_bien, set_seleccion_bien] = useState<any>("");
  const [fecha_desde, set_fecha_desde] = useState<Date | null>(null);
  const [fecha_hasta, set_fecha_hasta] = useState<Date | null>(null);
  const [discriminar, set_discriminar] = useState<boolean>(false);
  const [abrir_modal_bien, set_abrir_modal_bien] = useState<boolean>(false);
  const [error_fecha_desde, set_error_fecha_desde] = useState<boolean>(false);
  const [error_fecha_hasta, set_error_fecha_hasta] = useState<boolean>(false);

  const cambio_tablero_control: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
    set_seleccion_tablero_control(e.target.value);
    limpiar_filtros();
  }
  const cambio_tipo_despacho: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
    set_seleccion_tipo_despacho(e.target.value);
  }
  const cambio_unidad_org: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
    set_seleccion_unidad_org(e.target.value);
  }
  const cambio_presentacion: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
    set_seleccion_presentacion(e.target.value);
  }
  const handle_change_fecha_desde = (date: Date | null): void => {
    set_fecha_desde(date);
    set_error_fecha_desde(date === null);
  };
  const handle_change_fecha_hasta = (date: Date | null): void => {
    set_fecha_hasta(date);
    set_error_fecha_hasta(date === null);
  };

  const limpiar_filtros: () => void = () => {
    set_discriminar(false);
    set_resultado_busqueda([]);
  }

  const limpiar_todo: () => void = () => {
    set_seleccion_tablero_control('');
    limpiar_filtros();
  }

  const salir_entrada: () => void = () => {
    navigate('/home');
  }

  useEffect(() => {
    // if (resultado_busqueda.length > 0 && (agrupar || discriminar || mostrar || seleccion_tablero_control === 'IPC')) {
    //   let agrupamiento: any = [];
    //   resultado_busqueda.forEach(rb => {
    //     rb.inventario.forEach((inv: any) => {
    //       agrupamiento.push(inv);
    //     });
    //   });
    //   set_inventarios(agrupamiento);
    // }
  }, [resultado_busqueda]);

  const busqueda_control: () => void = () => {
    if (fecha_desde === null || fecha_hasta === null) {
      set_error_fecha_desde(fecha_desde === null);
      set_error_fecha_hasta(fecha_hasta === null);
      return
    }
    const tipo_despacho = (seleccion_tipo_despacho === 'Todos' || seleccion_tipo_despacho === '') ? seleccion_tipo_despacho : seleccion_tipo_despacho === 'DV';
    const id_bien = seleccion_bien !== undefined && seleccion_bien !== '' ? seleccion_bien.id_bien : '';
    dispatch(obtener_consumo_bienes_und({ seleccion_tipo_despacho: tipo_despacho, seleccion_bien: id_bien, seleccion_unidad_org, discriminar, fecha_desde: dayjs(fecha_desde).format('YYYY-MM-DD'), fecha_hasta: dayjs(fecha_hasta).format('YYYY-MM-DD') })).then((response: any) => {
      set_resultado_busqueda(response.data);
    });
  }

  return (
    <>
      <Grid
        container
        sx={estilo_seccion}
      >
        <Grid item md={12} xs={12}>
          <Title title="Tablero de control - Despacho de bienes de consumo" />
          <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
            <Grid item container spacing={2}>
              <Grid item xs={12} sm={12}>
                <Stack
                  direction="row"
                  justifyContent="center"
                  spacing={2}>
                  <Grid item xs={12} sm={8}>
                    <FormControl size='small' fullWidth>
                      <InputLabel>Tablero de control</InputLabel>
                      <Select
                        value={seleccion_tablero_control}
                        label="Tablero de control"
                        onChange={cambio_tablero_control}
                      >
                        {lt_tablero_control.map((lt: any) => (
                          <MenuItem key={lt.id} value={lt.id}>
                            {lt.value}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Grid container sx={estilo_seccion}>
        <Grid item md={12} xs={12}>
          <Title title="Filtros de búsqueda" />
          <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
            <Grid item container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl size='small' fullWidth>
                  <InputLabel>Tipo de despacho</InputLabel>
                  <Select
                    value={seleccion_tipo_despacho}
                    label="Tipo de despacho"
                    onChange={cambio_tipo_despacho}
                  >
                    <MenuItem value={"Todos"}>Todos</MenuItem>
                    {lt_tipo_despacho.map((lt: any) => (
                      <MenuItem key={lt.id} value={lt.id}>
                        {lt.value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Bien"
                  type={'text'}
                  size="small"
                  fullWidth
                  value={seleccion_bien.nombre_bien ?? ""}
                  InputProps={{
                    readOnly: true
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <Stack direction="row" justifyContent="center">
                  <Button
                    color='primary'
                    variant='contained'
                    startIcon={<SearchIcon />}
                    onClick={() => { set_abrir_modal_bien(true); }}
                  >
                    Buscar bien
                  </Button>
                  {abrir_modal_bien && (
                    <BuscarBienConsumo
                      is_modal_active={abrir_modal_bien}
                      set_is_modal_active={set_abrir_modal_bien}
                      title={"Búsqueda de bienes de consumo"}
                      seleccion_bien={set_seleccion_bien} />
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Stack
                  direction="row"
                  justifyContent="center"
                  spacing={2}>
                  <Grid item xs={12} sm={8}>
                    <FormControl size='small' fullWidth>
                      <InputLabel>Unidad organizacional que recibe</InputLabel>
                      <Select
                        value={seleccion_unidad_org}
                        label="Unidad organizacional que recibe"
                        onChange={cambio_unidad_org}
                      >
                        <MenuItem value={"Todos"}>Todos</MenuItem>
                        {lt_unidades_org.map((lt: any) => (
                          <MenuItem key={lt.id_unidad_organizacional} value={lt.id_unidad_organizacional}>
                            {lt.nombre}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Stack
                  direction="row"
                  justifyContent="center"
                  spacing={2}>
                  <span style={{ margin: '7px' }}>No discriminar por unidad </span><Switch color="primary" onChange={() => { set_discriminar(!discriminar); set_resultado_busqueda([]); }} />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack
                  direction="row"
                  justifyContent="flex-end"
                  spacing={2}
                >
                  <Grid item xs={12} sm={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Fecha desde"
                        value={fecha_desde}
                        onChange={(newValue) => {
                          handle_change_fecha_desde(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField required fullWidth size="small" {...params}
                            error={error_fecha_desde}
                          />
                        )}
                        maxDate={fecha_hasta}
                      />
                    </LocalizationProvider>
                    {error_fecha_desde && (<FormHelperText error >{"El campo es obligatorio."}</FormHelperText>)}
                  </Grid>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  spacing={2}
                >
                  <Grid item xs={12} sm={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Fecha hasta"
                        value={fecha_hasta}
                        onChange={(newValue) => {
                          handle_change_fecha_hasta(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField required fullWidth size="small" {...params}
                            error={error_fecha_hasta}
                          />
                        )}
                        minDate={fecha_desde}
                        disabled={fecha_desde == null}
                      />
                    </LocalizationProvider>
                    {error_fecha_hasta && (<FormHelperText error >{"El campo es obligatorio."}</FormHelperText>)}
                  </Grid>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Stack
                  direction="row"
                  justifyContent="center"
                  spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <FormControl size='small' fullWidth>
                      <InputLabel>Presentación</InputLabel>
                      <Select
                        value={seleccion_presentacion}
                        label="Presentación"
                        onChange={cambio_presentacion}
                      >
                        {lt_presentacion.map((lt: any) => (
                          <MenuItem key={lt.id} value={lt.id}>
                            {lt.value}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Stack>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} sx={{ p: '10px' }}>
              <Stack
                direction="row"
                justifyContent="center"
                spacing={2}>
                <Button
                  color='primary'
                  variant='contained'
                  // startIcon={<SearchIcon />}
                  onClick={busqueda_control}
                >
                  Consultar
                </Button>
              </Stack>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      {(resultado_busqueda.length > 0) && (<Grid
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
          <ResultadosBusqueda resultado_busqueda={resultado_busqueda} seleccion_presentacion={seleccion_presentacion} titulo={"Despacho de bienes de consumo"}></ResultadosBusqueda>
        </Grid>
      </Grid>)}
      <Grid container justifyContent="flex-end">
        <Grid item xs={7}>
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
                color='inherit'
                variant='contained'
                startIcon={<CleanIcon />}
                onClick={limpiar_todo}
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
      </Grid>
    </>
  );
}
