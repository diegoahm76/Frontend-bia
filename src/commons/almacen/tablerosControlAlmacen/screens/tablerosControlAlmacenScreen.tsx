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
import { obtener_consumo_bienes_und, obtener_control_stock, obtener_entradas_inventario, obtener_mantenimientos_realizados, obtener_movimientos_incautados, obtener_mtto_programados, obtener_tipos_bien, obtener_tipos_mantenimiento, obtener_unidades_organizacionales } from "../thunks/tablerosControlAlmacen";
import { BuscadorPersonaDialog } from "../../gestionDeInventario/gestionHojaDeVida/mantenimiento/components/RegistroMantenimiento/RegistroMantenimientoGeneral/BuscadorPersonaDialog";
import { obtener_bodegas } from "../../controlDeInventario/thunks/ControlDeInventarios";
import { ResultadosBusquedaTable } from "./ResultadosBusquedaTable";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TablerosControlAlmacenScreen: React.FC = () => {
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
    obtener_tipos_mantenimiento_fc();
    obtener_bodegas_fc();
    obtener_tipos_bien_fc();
  }, []);

  const obtener_unidades_organizacionales_fc: () => void = () => {
    dispatch(obtener_unidades_organizacionales()).then((response: any) => {
      const unidades = response.Unidades.filter((und: any) => und.activo);
      set_lt_unidades_org(unidades);
    })
  }
  const obtener_tipos_mantenimiento_fc: () => void = () => {
    dispatch(obtener_tipos_mantenimiento()).then((response: any) => {
      set_lt_tipo_mantenimiento(response);
    })
  }
  const obtener_tipos_bien_fc: () => void = () => {
    dispatch(obtener_tipos_bien()).then((response: any) => {
      set_lt_tipo_bien(response);
    })
  }
  const obtener_bodegas_fc: () => void = () => {
    dispatch(obtener_bodegas()).then((response: any) => {
      const bodegas_activas = response.filter((resp: { activo: boolean; }) => resp.activo);
      //  console.log('')('filtrado activo: ', bodegas_activas)
      set_lt_bodegas(bodegas_activas);
    })
  }
  // Listas
  const lt_tablero_control = [{ id: 'CBU', value: 'Consumo de bienes por unidad' },
  { id: 'MP', value: 'Mantenimientos programados' },
  { id: 'CS', value: 'Control de stock' },
  { id: 'EI', value: 'Entradas a inventario' },
  { id: 'MSI', value: 'Movimientos sobre incautados' },
  { id: 'MR', value: 'Mantenimientos realizados' }]
  
  const lt_tipo_despacho = [{ id: 'DG', value: 'Despacho general' }, { id: 'DV', value: 'Despacho a vivero' }];
  const lt_presentacion = [{ id: "UND", value: "Unidad" }, { id: "BN", value: "Bien" }];
  const lt_presentacion_b = [{ id: "BD", value: "Bodega" }, { id: "BN", value: "Bien" }];
  // Variables globales
  const [resultado_busqueda, set_resultado_busqueda] = useState<any[]>([]);
  const [lt_unidades_org, set_lt_unidades_org] = useState<any[]>([]);
  const [lt_bodegas, set_lt_bodegas] = useState<any[]>([]);
  const [lt_tipo_bien, set_lt_tipo_bien] = useState<any[]>([]);
  const [lt_tipo_mantenimiento, set_lt_tipo_mantenimiento] = useState<any[]>([]);
  const [seleccion_tablero_control, set_seleccion_tablero_control] = useState<string>("");
  const [seleccion_tipo_despacho, set_seleccion_tipo_despacho] = useState<string>("");
  const [seleccion_unidad_org, set_seleccion_unidad_org] = useState<string>("");
  const [seleccion_presentacion, set_seleccion_presentacion] = useState<string>("BN");
  const [seleccion_tipo_mtto, set_seleccion_tipo_mtto] = useState<string>("");
  const [seleccion_tipo_bien, set_seleccion_tipo_bien] = useState<string>("");
  const [seleccion_bodega, set_seleccion_bodega] = useState<string>("");
  const [nombre_archivo, set_nombre_archivo] = useState<string>("");
  const [realizado, set_realizado] = useState<any | null>({ nombre_completo: "" });
  const [seleccion_bien, set_seleccion_bien] = useState<any>("");
  const [filtros, set_filtros] = useState<any[]>([]);
  const [filtros_pdf, set_filtros_pdf] = useState<any[]>([]);
  const [fecha_desde, set_fecha_desde] = useState<Date | null>(null);
  const [fecha_hasta, set_fecha_hasta] = useState<Date | null>(null);
  const [discriminar, set_discriminar] = useState<boolean>(false);
  const [abrir_modal_bien, set_abrir_modal_bien] = useState<boolean>(false);
  const [error_fecha_desde, set_error_fecha_desde] = useState<boolean>(false);
  const [error_fecha_hasta, set_error_fecha_hasta] = useState<boolean>(false);
  const [abrir_modal_persona, set_abrir_modal_persona] = useState<boolean>(false);

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
  const cambio_tipo_bien: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
    set_seleccion_tipo_bien(e.target.value);
  }
  const cambio_tipo_mtto: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
    set_seleccion_tipo_mtto(e.target.value);
  }
  const cambio_bodega: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
    set_seleccion_bodega(e.target.value);
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
    set_seleccion_unidad_org('');
    set_seleccion_tipo_despacho('');
    set_seleccion_presentacion('BN');
    set_seleccion_bien('');
    set_realizado({ nombre_completo: "" });
    set_seleccion_tipo_bien('');
    set_seleccion_tipo_mtto('');
    set_fecha_desde(null);
    set_fecha_hasta(null);
    set_error_fecha_desde(false);
    set_error_fecha_hasta(false);
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

  const crear_objeto_filtro: () => void = () => {
    const tipo_despacho = (seleccion_tipo_despacho === 'Todos' || seleccion_tipo_despacho === '') ? 'Todos' : seleccion_tipo_despacho === 'DV' ? 'Despacho a vivero' : 'Despacho general';
    const nombre_unidad_org = (seleccion_unidad_org === 'Todos' || seleccion_unidad_org === '') ? 'Todos' : lt_unidades_org.find(lt => lt.id === seleccion_unidad_org)?.value;
    const nombre_bien = seleccion_bien !== undefined && seleccion_bien !== '' ? seleccion_bien.nombre_bien : '';
    const nombre = lt_tablero_control.find(lt => lt.id === seleccion_tablero_control)?.value;
    if (nombre !== undefined)
      set_nombre_archivo(nombre)
    switch (seleccion_tablero_control) {
      case 'CBU':
        set_filtros([{ 'Tipo de despacho': tipo_despacho, Bien: nombre_bien, 'Unidad organizacional que recibe': nombre_unidad_org, discriminar: discriminar ? 'Si' : 'No', 'Fecha desde': dayjs(fecha_desde).format('YYYY-MM-DD'), 'Fecha hasta': dayjs(fecha_hasta).format('YYYY-MM-DD') }])
        set_filtros_pdf([{ tipo_despacho: tipo_despacho, nombre_bien: nombre_bien, nombre_unidad_org: nombre_unidad_org, discriminar: discriminar ? 'Si' : 'No', fecha_desde: dayjs(fecha_desde).format('YYYY-MM-DD'), fecha_hasta: dayjs(fecha_hasta).format('YYYY-MM-DD') }])
        break;
      default:
        set_filtros([]);
        set_filtros_pdf([]);
        break;
    }
  }

  const busqueda_control: () => void = () => {
    crear_objeto_filtro();
    switch (seleccion_tablero_control) {
      case 'CBU':
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
        break;
      case 'MP':
        dispatch(obtener_mtto_programados()).then((response: any) => {
          let resultado: any[] = [];
          let data = ordenar_fechas(response.data, 'fecha_programada', 'desc');
          let data_programada_v = data.filter((d: any) => (d.fecha_programada !== null && d.dias_kilometros_vencidos !== null));
          let data_programada_nv = data.filter((d: any) => (d.fecha_programada !== null && d.dias_kilometros_vencidos === null));
          let data_kilometros_v = data.filter((d: any) => d.kilometraje_programado !== null && d.dias_kilometros_vencidos !== null);
          let data_kilometros_nv = ordenar(data.filter((d: any) => d.kilometraje_programado !== null && d.dias_kilometros_vencidos === null), 'dias_kilometros_vencidos', 'asc');

          ordenar(data_kilometros_v, 'dias_kilometros_vencidos', 'desc').forEach((data_o: any) => {
            resultado.push(data_o);
          });
          ordenar(data_programada_v, 'dias_kilometros_vencidos', 'desc').forEach((data_o: any) => {
            resultado.push(data_o);
          });
          data_kilometros_nv.forEach((data_o: any) => {
            resultado.push(data_o);
          });
          data_programada_nv.forEach((data_o: any) => {
            resultado.push(data_o);
          });
          set_resultado_busqueda(set_campos(resultado));
        });
        break;
      case 'CS':
        const solictiable = seleccion_tipo_bien === 'SV';
        dispatch(obtener_control_stock(solictiable)).then((response: any) => {
          set_resultado_busqueda(response.data);
        });
        break;
      case 'MSI':
        if (fecha_desde === null || fecha_hasta === null) {
          set_error_fecha_desde(fecha_desde === null);
          set_error_fecha_hasta(fecha_hasta === null);
          return
        }
        dispatch(obtener_movimientos_incautados({ fecha_desde: dayjs(fecha_desde).format('YYYY-MM-DD'), fecha_hasta: dayjs(fecha_hasta).format('YYYY-MM-DD') })).then((response: any) => {
          set_resultado_busqueda(response.data);
        });
        break;
      case 'MR':
        if (fecha_desde === null || fecha_hasta === null) {
          set_error_fecha_desde(fecha_desde === null);
          set_error_fecha_hasta(fecha_hasta === null);
          return
        }
        dispatch(obtener_mantenimientos_realizados({ seleccion_tipo_mtto, realizado: realizado.id_persona, fecha_desde: dayjs(fecha_desde).format('YYYY-MM-DD'), fecha_hasta: dayjs(fecha_hasta).format('YYYY-MM-DD') })).then((response: any) => {
          set_resultado_busqueda(response.data);
        });
        break;
      case 'EI':
        if (fecha_desde === null || fecha_hasta === null) {
          set_error_fecha_desde(fecha_desde === null);
          set_error_fecha_hasta(fecha_hasta === null);
          return
        }
        dispatch(obtener_entradas_inventario({ seleccion_bodega, seleccion_tipo_bien, fecha_desde: dayjs(fecha_desde).format('YYYY-MM-DD'), fecha_hasta: dayjs(fecha_hasta).format('YYYY-MM-DD') })).then((response: any) => {
          set_resultado_busqueda(response.data);
        });
        break;
      default:
        break;
    }
  }

  const set_campos: (data: any) => any = (data: any) => {
    data.forEach((mtto: any) => {
      mtto.fecha_programada = mtto.fecha_programada !== null ? dayjs(mtto.fecha_programada).format('DD/MM/YYYY') : mtto.fecha_programada = 'N/A';
      if (mtto.kilometraje_programado === null)
        mtto.kilometraje_programado = 'N/A';
      if (mtto.kilometraje_actual === null)
        mtto.kilometraje_actual = 'N/A';
      if (mtto.dias_kilometros_vencidos === null)
        mtto.dias_kilometros_vencidos = 0;
    });
    return data;
  }

  const ordenar: (data: any, parametro: string, tipo: string) => any = (data: any, parametro: string, tipo: string) => {
    if (data.length > 0) {
      data.sort(function (a: any, b: any) {
        if (tipo === 'desc') {
          if (a[parametro] < b[parametro])
            return 1;
          if (a[parametro] > b[parametro])
            return -1;
          return 0;
        } else {
          if (a[parametro] > b[parametro])
            return 1;
          if (a[parametro] < b[parametro])
            return -1;
          return 0;
        }
      });
    }
    return data;
  }

  const ordenar_fechas: (data: any, parametro: string, tipo: string) => any = (data: any, parametro: string, tipo: string) => {
    if (data.length > 0) {
      data.sort(function (a: any, b: any) {
        if (tipo === 'desc') {
          if (dayjs(a[parametro]).isBefore(dayjs(b[parametro])))
            return 1;
          if (dayjs(a[parametro]).isAfter(dayjs(b[parametro])))
            return -1;
          return 0;
        } else {
          if (dayjs(a[parametro]).isAfter(dayjs(b[parametro])))
            return 1;
          if (dayjs(a[parametro]).isBefore(dayjs(b[parametro])))
            return -1;
          return 0;
        }
      });
    }
    return data;
  }

  return (
    <>
      <Grid
        container
        sx={estilo_seccion}
      >
        <Grid item md={12} xs={12}>
          <Title title="Tablero de control - Almacen" />
          <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
            <Grid item container spacing={2}>
              <Grid item xs={12} sm={12}>
                <Stack
                  direction="row"
                  justifyContent="center"
                  spacing={2}>
                  <Grid item xs={12} sm={7}>
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
              {seleccion_tablero_control == 'MP' && <Grid item xs={12} sm={12} sx={{ p: '10px' }}>
                <Stack
                  direction="row"
                  justifyContent="center"
                  spacing={2}>
                  <Button
                    color='primary'
                    variant='contained'
                    onClick={busqueda_control}
                  >
                    Consultar
                  </Button>
                </Stack>
              </Grid>}
            </Grid>
          </Box>
        </Grid>
      </Grid>
      {(seleccion_tablero_control !== '' && seleccion_tablero_control !== 'MP') && <Grid container sx={estilo_seccion}>
        <Grid item md={12} xs={12}>
          <Title title="Filtros de búsqueda" />
          <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
            {seleccion_tablero_control === 'CBU' && <Grid item container spacing={2}>
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
              {!discriminar && <Grid item xs={12} sm={12}>
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
              </Grid>}
            </Grid>}
            {seleccion_tablero_control === 'CS' && <Grid item container spacing={2}>
              <Grid item xs={12} sm={12}>
                <Stack direction="row" justifyContent="center">
                  <Grid item xs={12} sm={7}>
                    <FormControl size='small' fullWidth>
                      <InputLabel>Tipo de bien</InputLabel>
                      <Select
                        value={seleccion_tipo_bien}
                        label="Tipo de bien"
                        onChange={cambio_tipo_bien}
                      >
                        <MenuItem value={"Todos"}>Todos</MenuItem>
                        <MenuItem value={"SV"}>Solicitable por vivero</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Stack>
              </Grid>
            </Grid>}
            {seleccion_tablero_control === 'MSI' && <Grid item container spacing={2}>
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
            </Grid>}
            {seleccion_tablero_control === 'MR' && <Grid item container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl size='small' fullWidth>
                  <InputLabel>Tipo mantenimiento</InputLabel>
                  <Select
                    value={seleccion_tipo_mtto}
                    label="Tipo mantenimiento"
                    onChange={cambio_tipo_mtto}
                  >
                    <MenuItem value={"Todos"}>Todos</MenuItem>
                    {lt_tipo_mantenimiento.map((lt: any) => (
                      <MenuItem key={lt[0]} value={lt[0]}>
                        {lt[1]}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  label="Realizado por"
                  size="small"
                  required
                  disabled
                  fullWidth
                  value={realizado.nombre_completo}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={1} sx={{ mt: '10px' }}>
                <SearchIcon style={{ cursor: 'pointer' }} onClick={() => { set_abrir_modal_persona(true) }} />
              </Grid>
              {abrir_modal_persona && (
                <BuscadorPersonaDialog
                  is_modal_active={abrir_modal_persona}
                  set_is_modal_active={set_abrir_modal_persona}
                  title={"Busqueda de persona"}
                  set_persona={set_realizado} />
              )}
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
            </Grid>}
            {seleccion_tablero_control === 'EI' && <Grid item container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl size='small' fullWidth>
                  <InputLabel>Bodega</InputLabel>
                  <Select
                    value={seleccion_bodega}
                    label="Bodega"
                    onChange={cambio_bodega}
                  >
                    <MenuItem value={"Todos"}>Todos</MenuItem>
                    {lt_bodegas.map((lt: any) => (
                      <MenuItem key={lt.id_bodega} value={lt.id_bodega}>
                        {lt.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl size='small' fullWidth>
                  <InputLabel>Tipo de bien</InputLabel>
                  <Select
                    value={seleccion_tipo_bien}
                    label="Tipo de bien"
                    onChange={cambio_tipo_bien}
                  >
                    {lt_tipo_bien.map((lt: any) => (
                      <MenuItem key={lt[0]} value={lt[0]}>
                        {lt[1]}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
                        {lt_presentacion_b.map((lt: any) => (
                          <MenuItem key={lt.id} value={lt.id}>
                            {lt.value}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Stack>
              </Grid>
            </Grid>}
            <Grid item xs={12} sm={12} sx={{ p: '10px' }}>
              <Stack
                direction="row"
                justifyContent="center"
                spacing={2}>
                <Button
                  color='primary'
                  variant='contained'
                  onClick={busqueda_control}
                >
                  Consultar
                </Button>
              </Stack>
            </Grid>
          </Box>
        </Grid>
      </Grid>}
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
{seleccion_tablero_control !== 'EI'     &&   <Grid item md={12} xs={12}>
          <ResultadosBusqueda resultado_busqueda={resultado_busqueda} seleccion_presentacion={seleccion_presentacion} titulo={"Resultado de búsqueda"} seleccion_tablero_control={seleccion_tablero_control} discriminar={discriminar} filtros={filtros} nombre_archivo={nombre_archivo} filtros_pdf={filtros_pdf}></ResultadosBusqueda>
        </Grid>}
{seleccion_tablero_control === 'EI' &&        <Grid item md={12} xs={12}>
          <ResultadosBusquedaTable resultado_busqueda={resultado_busqueda} seleccion_presentacion={seleccion_presentacion} titulo={"Resultado de búsqueda"} seleccion_tablero_control={seleccion_tablero_control} discriminar={discriminar} filtros={filtros} nombre_archivo={nombre_archivo} filtros_pdf={filtros_pdf}></ResultadosBusquedaTable>
        </Grid>}
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
