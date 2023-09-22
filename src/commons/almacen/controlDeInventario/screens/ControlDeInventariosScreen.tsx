/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormControl, Grid, InputLabel, MenuItem, Select, type SelectChangeEvent, TextField, Box, Button, Stack, FormHelperText, Switch, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Title } from "../../../../components";
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch } from "../../../../hooks";
import { useNavigate } from "react-router-dom";
import BuscarBienViveros from "./BuscarBienViveros";
import { ResultadosBusqueda } from "./ResultadosBusqueda";
import { obtener_bodegas, obtener_categorias, obtener_estados, obtener_inventario_af } from "../thunks/ControlDeInventarios";
import dayjs from "dayjs";
// eslint-disable-next-line @typescript-eslint/naming-convention
export const ControlDeInventariosScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    obtener_bodegas_fc();
    obtener_categorias_fc();
    obtener_estados_fc();
  }, []);

  const obtener_bodegas_fc: () => void = () => {
    dispatch(obtener_bodegas()).then((response: any) => {
      const bodegas_activas = response.filter((resp: { activo: boolean; }) => resp.activo);
      console.log('filtrado activo: ', bodegas_activas)
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
  // Listas
  const lt_tipo_bien = [{ id: 'AF', value: 'Activo fijo' }, { id: 'BC', value: 'Bienes de consumo' }]
  const lt_activos_fijos = [{ value: 'Todo el inventario', id: 'TI' },
  { value: 'Bien específico', id: 'BE' },
  { value: 'Inventario según origen', id: 'ISO' },
  { value: 'Inventario por categoría', id: 'IPC' },
  { value: 'Ver inventario propio', id: 'IP' },
  { value: 'Inventario por tipo por bodega', id: 'IPT' }];
  const lt_bienes_consumo = [{ value: 'Todo el inventario', id: 'TI' },
  { value: 'Bienes solicitables por vivero', id: 'BSV' }];
  const lt_ubicaciones = [{ id: "Asignado", value: "Asignado" }, { id: "Prestado", value: "Prestado" }, { id: "En Bodega", value: "En Bodega" }];
  const lt_propiedad = [{ id: "Propio", value: "Propio" }, { id: "No propio", value: "No propio" }];
  // Variables globales
  const [resultado_busqueda, set_resultado_busqueda] = useState<any[]>([]);
  const [lt_tipo_consulta, set_lt_tipo_consulta] = useState<any[]>([]);
  const [lt_bodegas, set_lt_bodegas] = useState<any[]>([]);
  const [lt_categorias, set_lt_categorias] = useState<any[]>([]);
  const [lt_estados_bien, set_lt_estados_bien] = useState<any[]>([]);
  const [seleccion_tipo_bien, set_seleccion_tipo_bien] = useState<string>("");
  const [seleccion_tipo_consulta, set_seleccion_tipo_consulta] = useState<string>("");
  const [seleccion_bodega, set_seleccion_bodega] = useState<string>("");
  const [seleccion_estado, set_seleccion_estado] = useState<string>("");
  const [seleccion_ubicacion, set_seleccion_ubicacion] = useState<string>("");
  const [seleccion_propiedad, set_seleccion_propiedad] = useState<string>("");
  const [seleccion_categoria, set_seleccion_categoria] = useState<string>("");
  const [bienes_baja, set_bienes_baja] = useState<boolean>(false);
  const [bienes_salida, set_bienes_salida] = useState<boolean>(false);
  const [seleccion_bien, set_seleccion_bien] = useState<any>("");

  const cambio_tipo_consulta: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
    set_seleccion_tipo_consulta(e.target.value);
  }
  const cambio_tipo_bien: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
    set_seleccion_tipo_bien(e.target.value);
    e.target.value === 'AF' ? set_lt_tipo_consulta(lt_activos_fijos) : set_lt_tipo_consulta(lt_bienes_consumo);
  }
  const cambio_bodega: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
    set_seleccion_bodega(e.target.value);
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
  }

  useEffect(() => {
    // set_seleccion_bien_id(seleccion_bien.id_bien);
  }, [seleccion_bien]);

  const salir_entrada: () => void = () => {
    navigate('/home');
  }

  const busqueda_control: () => void = () => {
    dispatch(obtener_inventario_af({ seleccion_bodega, seleccion_estado, seleccion_ubicacion, seleccion_propiedad, seleccion_categoria, bienes_baja, bienes_salida })).then((response: any) => {
      response.data.forEach((data: any) => {
        data.fecha_ingreso = dayjs(data.fecha_ingreso).format('DD/MM/YYYY');
        data.fecha_ultimo_movimiento = dayjs(data.fecha_ultimo_movimiento).format('DD/MM/YYYY HH:mm');
      });
      set_resultado_busqueda(response.data);
    })
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
          <Title title="Tablero de control - Almacén" />
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
              <Grid item xs={12} sm={12}>
                <Stack
                  direction="row"
                  justifyContent="center"
                  spacing={2}>
                  <Button
                    color='primary'
                    variant='contained'
                    startIcon={<SearchIcon />}
                    onClick={busqueda_control}
                  >
                    Buscar
                  </Button>
                </Stack>
              </Grid>
            </Grid>}
          </Box>
        </Grid>
      </Grid>}
      {(resultado_busqueda.length > 0)  && (<Grid
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
          <ResultadosBusqueda resultado_busqueda={resultado_busqueda} titulo={"Activos fijos"}></ResultadosBusqueda>
        </Grid>
      </Grid>)}
    </>
  );
}
