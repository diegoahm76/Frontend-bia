/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormControl, Grid, InputLabel, MenuItem, Select, type SelectChangeEvent, TextField, Box, Button, Stack, FormHelperText, Switch, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Title } from "../../../../components";
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch } from "../../../../hooks";
import { useNavigate } from "react-router-dom";
import { ResultadosBusqueda } from "./ResultadosBusqueda";
import { obtener_bien_especifico_af, obtener_bodegas, obtener_categorias, obtener_estados, obtener_inventario_af, obtener_inventario_categoria, obtener_inventario_consumo, obtener_inventario_propio, obtener_inventario_tipo, obtener_lista_origenes } from "../thunks/ControlDeInventarios";
import dayjs from "dayjs";
import BuscarBien from "./BuscarBien";
import BuscarBienConsumo from "./BuscarBienConsumo";
import ClearIcon from '@mui/icons-material/Clear';
import CleanIcon from '@mui/icons-material/CleaningServices';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ControlDeInventariosScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    obtener_bodegas_fc();
    obtener_categorias_fc();
    obtener_estados_fc();
    obtener_lista_origenes_fc();
  }, []);

  const obtener_bodegas_fc: () => void = () => {
    dispatch(obtener_bodegas()).then((response: any) => {
      const bodegas_activas = response.filter((resp: { activo: boolean; }) => resp.activo);
      set_lt_bodegas(bodegas_activas);
    })
  }
  const obtener_categorias_fc: () => void = () => {
    dispatch(obtener_categorias()).then((response: any) => {
      set_lt_categorias(response);
    })
  }
  const obtener_estados_fc: () => void = () => {
    dispatch(obtener_estados()).then((response: any) => {
      set_lt_estados_bien(response);
    })
  }
  const obtener_lista_origenes_fc: () => void = () => {
    dispatch(obtener_lista_origenes()).then((response: any) => {
      set_lt_origenes(response.data);
    })
  }
  // Listas
  const lt_tipo_bien = [{ id: 'AF', value: 'Activo fijo' }, { id: 'BC', value: 'Bienes de consumo' }]
  const lt_activos_fijos = [{ value: 'Todo el inventario', id: 'TI' },
  { value: 'Bien específico', id: 'BE' },
  { value: 'Inventario según origen', id: 'ISO' },
  { value: 'Inventario por categoría', id: 'IPC' },
  { value: 'Ver inventario propio', id: 'IP' },
  { value: 'Inventario por tipo por bodega', id: 'ITB' }];

  let new_title: string = '';
  const lt_bienes_consumo = [{ value: 'Todo el inventario', id: 'TIC' },
  { value: 'Bienes solicitables por vivero', id: 'BSV' }];
  const lt_ubicaciones = [{ id: "Asignado", value: "Asignado" }, { id: "Prestado", value: "Prestado" }, { id: "En Bodega", value: "En Bodega" }];
  const lt_propiedad = [{ id: "Propio", value: "Propio" }, { id: "No propio", value: "No propio" }];
  // Variables globales
  const [resultado_busqueda, set_resultado_busqueda] = useState<any[]>([]);
  const [lt_tipo_consulta, set_lt_tipo_consulta] = useState<any[]>([]);
  const [lt_bodegas, set_lt_bodegas] = useState<any[]>([]);
  const [lt_categorias, set_lt_categorias] = useState<any[]>([]);
  const [lt_origenes, set_lt_origenes] = useState<any[]>([]);
  const [lt_estados_bien, set_lt_estados_bien] = useState<any[]>([]);
  const [inventarios, set_inventarios] = useState<any[]>([]);
  const [seleccion_tipo_bien, set_seleccion_tipo_bien] = useState<string>("");
  const [seleccion_tipo_consulta, set_seleccion_tipo_consulta] = useState<string>("");
  const [seleccion_bodega, set_seleccion_bodega] = useState<string>("");
  const [seleccion_estado, set_seleccion_estado] = useState<string>("");
  const [seleccion_consulta, set_seleccion_consulta] = useState<string>("");
  const [seleccion_ubicacion, set_seleccion_ubicacion] = useState<string>("");
  const [seleccion_propiedad, set_seleccion_propiedad] = useState<string>("");
  const [seleccion_categoria, set_seleccion_categoria] = useState<string>("");
  const [seleccion_origen, set_seleccion_origen] = useState<string>("");
  const [bienes_baja, set_bienes_baja] = useState<boolean>(false);
  const [bienes_salida, set_bienes_salida] = useState<boolean>(false);
  const [agrupar, set_agrupar] = useState<boolean>(false);
  const [agrupar_bodega, set_agrupar_bodega] = useState<boolean>(false);
  const [mostrar, set_mostrar] = useState<boolean>(false);
  const [seleccion_bien, set_seleccion_bien] = useState<any>("");
  const [msj_error_bien, set_msj_error_bien] = useState<any>("");
  const [abrir_modal_bien, set_abrir_modal_bien] = useState<boolean>(false);
  const [nombre_archivo, set_nombre_archivo] = useState<string>("");

  const cambio_tipo_consulta: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
    set_seleccion_tipo_consulta(e.target.value);
    limpiar_filtros();
  }
  const cambio_tipo_bien: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
    set_seleccion_tipo_bien(e.target.value);
    set_seleccion_tipo_consulta('');
    limpiar_filtros();
    e.target.value === 'AF' ? set_lt_tipo_consulta(lt_activos_fijos) : set_lt_tipo_consulta(lt_bienes_consumo);
  }
  const cambio_bodega: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
    set_seleccion_bodega(e.target.value);
  }
  const cambio_consulta: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
    set_seleccion_consulta(e.target.value);
    if (e.target.value === 'E') {
      set_agrupar_bodega(false);
      set_inventarios([]);
    }
  }
  const cambio_estado: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
    set_seleccion_estado(e.target.value);
  }
  const cambio_ubicacion: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
    set_seleccion_ubicacion(e.target.value);
  }
  const cambio_propiedad: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
    set_seleccion_propiedad(e.target.value);
  }
  const cambio_categoria: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
    set_seleccion_categoria(e.target.value);
    set_agrupar(false);
  }
  const cambio_origen: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
    set_seleccion_origen(e.target.value);
  }

  const limpiar_filtros: () => void = () => {
    set_msj_error_bien('');
    set_seleccion_bodega('');
    set_seleccion_estado('');
    set_seleccion_ubicacion('');
    set_seleccion_propiedad('');
    set_seleccion_categoria('');
    set_seleccion_origen('');
    set_seleccion_bien('');
    set_seleccion_consulta('');
    set_bienes_baja(false);
    set_bienes_salida(false);
    set_agrupar(false);
    set_agrupar_bodega(false);
    set_resultado_busqueda([]);
    set_inventarios([]);
  }

  const limpiar_todo: () => void = () => {
    set_seleccion_tipo_bien('');
    set_seleccion_tipo_consulta('');
    limpiar_filtros();
  }

  const salir_entrada: () => void = () => {
    navigate('/home');
  }

  const obtener_inventario_af_fc: () => void = () => {
    dispatch(obtener_inventario_af({ seleccion_bodega, seleccion_estado, seleccion_ubicacion, seleccion_propiedad, seleccion_categoria, bienes_baja, bienes_salida, seleccion_origen })).then((response: any) => {
      response.data.forEach((data: any) => {
        data.fecha_ingreso = dayjs(data.fecha_ingreso).format('DD/MM/YYYY');
        data.fecha_ultimo_movimiento = dayjs(data.fecha_ultimo_movimiento).format('DD/MM/YYYY HH:mm');
      });
      set_resultado_busqueda(response.data);
    });
  }
  const obtener_inventario_consumo_fc: () => void = () => {
    let solicitable_vivero: any = null;
    solicitable_vivero = seleccion_tipo_consulta === 'TIC' ? '' : true;
    const id_bien =  seleccion_bien !== undefined && seleccion_bien !== '' ? seleccion_bien.id_bien : '';
    dispatch(obtener_inventario_consumo({ seleccion_bodega, seleccion_bien: id_bien, solicitable: solicitable_vivero, agrupar_bodega })).then((response: any) => {
      if (agrupar_bodega) {
        response.data.forEach((data: any) => {
          data.inventario.forEach((inv: any) => { inv.nombre_bodega = data.nombre_bodega; });
        });
      }
      set_resultado_busqueda(response.data);
    });
  }

  useEffect(() => {
    if (resultado_busqueda.length > 0 && (agrupar || agrupar_bodega || mostrar || seleccion_tipo_consulta === 'IPC')) {
      let agrupamiento: any = [];
      resultado_busqueda.forEach(rb => {
        rb.inventario.forEach((inv: any) => {
          agrupamiento.push(inv);
        });
      });
      set_inventarios(agrupamiento);
    }
  }, [resultado_busqueda]);

  useEffect(() => {
    if (seleccion_bien !== undefined && seleccion_bien !== '')
      set_msj_error_bien('');
  }, [seleccion_bien]);

  const busqueda_control: () => void = () => {
    switch (seleccion_tipo_consulta) {
      case 'TI':
        new_title = 'Todo el inventario';
        obtener_inventario_af_fc();
        break;
      case 'BE':
        new_title = 'Bien específico';
        if(seleccion_bien !== undefined && seleccion_bien !== ''){
          dispatch(obtener_bien_especifico_af(seleccion_bien.id_bien)).then((response: any) => {
          response.data.fecha_ingreso = dayjs(response.data.fecha_ingreso).format('DD/MM/YYYY');
          response.data.fecha_ultimo_movimiento = dayjs(response.data.fecha_ultimo_movimiento).format('DD/MM/YYYY HH:mm');
          set_resultado_busqueda([response.data]);
        });
        }else
          set_msj_error_bien('El campo es obligatorio');
        break;
      case 'IPC':
        new_title = 'Inventario por categoría';
        dispatch(obtener_inventario_categoria({ seleccion_bodega, seleccion_categoria })).then((response: any) => {
          response.data.forEach((data: any) => {
            data.inventario.forEach((inv: any) => {
              inv.fecha_ingreso = dayjs(inv.fecha_ingreso).format('DD/MM/YYYY');
              inv.fecha_ultimo_movimiento = dayjs(inv.fecha_ultimo_movimiento).format('DD/MM/YYYY HH:mm');
            });
          });
          set_resultado_busqueda(response.data);
        });
        break;
      case 'ISO':
        new_title = 'Inventario según origen';
        obtener_inventario_af_fc();
        break;
      case 'IP':
        new_title = 'Ver inventario propio';
        dispatch(obtener_inventario_propio({ seleccion_bodega, seleccion_categoria, agrupar })).then((response: any) => {
          if (agrupar) {
            response.data.forEach((data: any) => {
              data.inventario.forEach((inv: any) => {
                inv.fecha_ingreso = dayjs(inv.fecha_ingreso).format('DD/MM/YYYY');
                inv.fecha_ultimo_movimiento = dayjs(inv.fecha_ultimo_movimiento).format('DD/MM/YYYY HH:mm');
              });
            });
          } else {
            response.data.forEach((data: any) => {
              data.fecha_ingreso = dayjs(data.fecha_ingreso).format('DD/MM/YYYY');
              data.fecha_ultimo_movimiento = dayjs(data.fecha_ultimo_movimiento).format('DD/MM/YYYY HH:mm');
            });
          }
          set_resultado_busqueda(response.data);
        });
        break;
      case 'ITB':
        new_title = 'Inventario por tipo por bodega';
        dispatch(obtener_inventario_tipo({ seleccion_bodega, mostrar })).then((response: any) => {
          set_resultado_busqueda(response.data);
        });
        break;
      case 'TIC':
        new_title = 'Todo el inventario';
        obtener_inventario_consumo_fc();
        break;
      case 'BSV':
        new_title = 'Bienes solicitables por vivero';
        obtener_inventario_consumo_fc();
        break;
      default:
        break;
    }
    asignar_nombre_reporte();
  }

  const asignar_nombre_reporte: () => void = () => {
    const nombre = lt_tipo_consulta.find((lt: any) => lt.id === seleccion_tipo_consulta)?.value;
    if (nombre !== undefined)
      set_nombre_archivo(nombre)
  }

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
        <Grid item md={12} xs={12}>
          <Title title="Control de inventario" />
          <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
            <Grid item container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl size='small' fullWidth>
                  <InputLabel>Tipo de bien</InputLabel>
                  <Select
                    value={seleccion_tipo_bien}
                    label="Tipo de bien"
                    onChange={cambio_tipo_bien}
                  >
                    {lt_tipo_bien.map((lt: any) => (
                      <MenuItem key={lt.id} value={lt.id}>
                        {lt.value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl size='small' fullWidth>
                  <InputLabel>Tipo de consulta</InputLabel>
                  <Select
                    value={seleccion_tipo_consulta}
                    label="Tipo de consulta"
                    onChange={cambio_tipo_consulta}
                    disabled={seleccion_tipo_bien === ''}
                  >
                    {lt_tipo_consulta.map((lt: any) => (
                      <MenuItem key={lt.id} value={lt.id}>
                        {lt.value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      {seleccion_tipo_consulta !== '' && <Grid
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
          <Title title="Filtros de búsqueda" />
          <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
            {seleccion_tipo_consulta === 'TI' && <Grid item container spacing={2}>
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
                  <InputLabel>Estado del activo</InputLabel>
                  <Select
                    value={seleccion_estado}
                    label="Estado del activo"
                    onChange={cambio_estado}
                  >
                    <MenuItem value={"Todos"}>Todos</MenuItem>
                    {lt_estados_bien.map((lt: any) => (
                      <MenuItem key={lt[0]} value={lt[0]}>
                        {lt[1]}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl size='small' fullWidth>
                  <InputLabel>Ubicación</InputLabel>
                  <Select
                    value={seleccion_ubicacion}
                    label="Ubicación"
                    onChange={cambio_ubicacion}
                  >
                    <MenuItem value={"Todos"}>Todos</MenuItem>
                    {lt_ubicaciones.map((lt: any) => (
                      <MenuItem key={lt.id} value={lt.id}>
                        {lt.value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl size='small' fullWidth>
                  <InputLabel>Propiedad</InputLabel>
                  <Select
                    value={seleccion_propiedad}
                    label="Propiedad"
                    onChange={cambio_propiedad}
                  >
                    <MenuItem value={"Todos"}>Todos</MenuItem>
                    {lt_propiedad.map((lt: any) => (
                      <MenuItem key={lt.id} value={lt.id}>
                        {lt.value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Stack direction="row" justifyContent="center">
                  <Grid item xs={12} sm={6}>
                    <FormControl size='small' fullWidth>
                      <InputLabel>Categoría</InputLabel>
                      <Select
                        value={seleccion_categoria}
                        label="Categoría"
                        onChange={cambio_categoria}
                      >
                        <MenuItem value={"Todos"}>Todos</MenuItem>
                        {lt_categorias.map((lt: any) => (
                          <MenuItem key={lt[0]} value={lt[0]}>
                            {lt[1]}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack
                  direction="row"
                  justifyContent="flex-end"
                  spacing={2}>
                  <span style={{ margin: '7px' }}>Incluir bienes dados de baja</span><Switch color="primary" onChange={() => { set_bienes_baja(!bienes_baja); }} />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  spacing={2}>
                  <span style={{ margin: '7px' }}>Incluir a los que seles dión salida</span><Switch color="primary" onChange={() => { set_bienes_salida(!bienes_salida); }} />
                </Stack>
              </Grid>
            </Grid>}
            {seleccion_tipo_consulta === 'BE' && <Grid item container spacing={2}>
              <Grid item xs={12} sm={12}>
                <Stack direction="row" justifyContent="center">
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Bien"
                      type={'text'}
                      size="small"
                      fullWidth
                      value={seleccion_bien.nombre_bien ?? ""}
                      InputProps={{
                        readOnly: true
                      }}
                      error={msj_error_bien !== ''}
                    />
                    {msj_error_bien !== '' && (<FormHelperText error >{msj_error_bien}</FormHelperText>)}
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Stack
                      direction="row"
                      justifyContent="center"
                      spacing={2}
                    >
                      <Button
                        color='primary'
                        variant='contained'
                        startIcon={<SearchIcon />}
                        onClick={() => { set_abrir_modal_bien(true); }}
                      >
                        Buscar bien
                      </Button>
                      {abrir_modal_bien && (
                        <BuscarBien
                          is_modal_active={abrir_modal_bien}
                          set_is_modal_active={set_abrir_modal_bien}
                          title={"Búsqueda de bienes"}
                          seleccion_bien={set_seleccion_bien} />
                      )}
                    </Stack>
                  </Grid>
                </Stack>
              </Grid>
            </Grid>}
            {seleccion_tipo_consulta === 'IPC' && <Grid item container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl size='small' fullWidth>
                  <InputLabel>Categoría</InputLabel>
                  <Select
                    value={seleccion_categoria}
                    label="Categoría"
                    onChange={cambio_categoria}
                  >
                    <MenuItem value={"Todos"}>Todos</MenuItem>
                    {lt_categorias.map((lt: any) => (
                      <MenuItem key={lt[0]} value={lt[0]}>
                        {lt[1]}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
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
            </Grid>}
            {seleccion_tipo_consulta === 'ISO' && <Grid item container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl size='small' fullWidth>
                  <InputLabel>Origen del activo</InputLabel>
                  <Select
                    value={seleccion_origen}
                    label="Origen del activo"
                    onChange={cambio_origen}
                  >
                    <MenuItem value={"Todos"}>Todos</MenuItem>
                    {lt_origenes.map((lt: any) => (
                      <MenuItem key={lt.cod_tipo_entrada} value={lt.cod_tipo_entrada}>
                        {lt.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
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
            </Grid>}
            {seleccion_tipo_consulta === 'IP' && <Grid item container spacing={2}>
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
                  <InputLabel>Categoría</InputLabel>
                  <Select
                    value={seleccion_categoria}
                    label="Categoría"
                    onChange={cambio_categoria}
                  >
                    <MenuItem value={"Todos"}>Todos</MenuItem>
                    {lt_categorias.map((lt: any) => (
                      <MenuItem key={lt[0]} value={lt[0]}>
                        {lt[1]}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              {seleccion_categoria === 'Todos' && <Grid item xs={12} sm={12}>
                <Stack
                  direction="row"
                  justifyContent="center"
                  spacing={2}>
                  <span style={{ margin: '7px' }}>Agrupar resultados por categoría</span><Switch color="primary" onChange={() => { set_agrupar(!agrupar); set_resultado_busqueda([]); set_inventarios([]); }} />
                </Stack>
              </Grid>}
            </Grid>}
            {seleccion_tipo_consulta === 'ITB' && <Grid item container spacing={2}>
              <Grid item xs={12} sm={12}>
                <Stack
                  direction="row"
                  justifyContent="center"
                  spacing={2}>
                  <Grid item xs={12} sm={7}>

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
                </Stack>
              </Grid>
              {seleccion_bodega === 'Todos' && <Grid item xs={12} sm={12}>
                <Stack
                  direction="row"
                  justifyContent="center"
                  spacing={2}>
                  <span style={{ margin: '7px' }}>Mostrar resultados para toda la entidad</span><Switch color="primary" onChange={() => { set_mostrar(!mostrar); set_resultado_busqueda([]); set_inventarios([]); }} />
                </Stack>
              </Grid>}
            </Grid>}
            {seleccion_tipo_consulta === 'TIC' && <Grid item container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl size='small' fullWidth>
                  <InputLabel>Consulta</InputLabel>
                  <Select
                    value={seleccion_consulta}
                    label="Consulta"
                    onChange={cambio_consulta}
                  >
                    <MenuItem value={"B"}>Por bodega</MenuItem>
                    <MenuItem value={"E"}>por entidad</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl size='small' fullWidth>
                  <InputLabel>Bodega</InputLabel>
                  <Select
                    value={seleccion_bodega}
                    label="Bodega"
                    onChange={cambio_bodega}
                    disabled={seleccion_consulta === 'E' || seleccion_consulta === ''}
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

              <Grid item xs={12} sm={12}>
                <Stack direction="row" justifyContent="center">
                  <Grid item xs={12} sm={5}>
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
                  <Grid item xs={12} sm={3}>
                    <Stack
                      direction="row"
                      justifyContent="center"
                      spacing={2}
                    >
                      <Button
                        color='primary'
                        variant='contained'
                        startIcon={<SearchIcon />}
                        onClick={() => { set_abrir_modal_bien(true); }}
                      >
                        Buscar bien de consumo
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
                </Stack>
              </Grid>
              {seleccion_bodega === 'Todos' && <Grid item xs={12} sm={12}>
                <Stack
                  direction="row"
                  justifyContent="center"
                  spacing={2}>
                  <span style={{ margin: '7px' }}>Agrupar resultados por bodega </span><Switch color="primary" onChange={() => { set_agrupar_bodega(!agrupar_bodega); set_resultado_busqueda([]); set_inventarios([]); }} />
                </Stack>
              </Grid>}
            </Grid>}
            {seleccion_tipo_consulta === 'BSV' && <Grid item container spacing={2}>
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
              <Grid item xs={12} sm={3}>
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
              <Grid item xs={12} sm={3}>
                <Stack
                  direction="row"
                  justifyContent="center"
                  spacing={2}
                >
                  <Button
                    color='primary'
                    variant='contained'
                    startIcon={<SearchIcon />}
                    onClick={() => { set_abrir_modal_bien(true); }}
                  >
                    Buscar bien de consumo
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
              {seleccion_bodega === 'Todos' && <Grid item xs={12} sm={12}>
                <Stack
                  direction="row"
                  justifyContent="center"
                  spacing={2}>
                  <span style={{ margin: '7px' }}>Agrupar resultados por bodega </span><Switch color="primary" onChange={() => { set_agrupar_bodega(!agrupar_bodega); set_resultado_busqueda([]); set_inventarios([]); }} />
                </Stack>
              </Grid>}
            </Grid>}
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
        <Grid item md={12} xs={12}>
          <ResultadosBusqueda title={new_title} resultado_busqueda={resultado_busqueda} seleccion_tipo_consulta={seleccion_tipo_consulta} titulo={"Activos fijos"} agrupar={agrupar} mostrar={mostrar} agrupar_bodega={agrupar_bodega} inventarios={inventarios} nombre_archivo={nombre_archivo ?? ''}></ResultadosBusqueda>
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
