import { FormControl, Grid, InputLabel, MenuItem, Select, type SelectChangeEvent, TextField, Box, Button, Stack, Switch, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Title } from "../../../../components";
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import HandymanOutlinedIcon from '@mui/icons-material/HandymanOutlined';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
import Diversity2OIcon from '@mui/icons-material/Diversity2';
import GrassOutlinedIcon from '@mui/icons-material/GrassOutlined';
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined';
import GrainOutlinedIcon from '@mui/icons-material/GrainOutlined';
import { useAppDispatch } from "../../../../hooks";
import { useNavigate } from "react-router-dom";
import { obtener_etapa_meterial_vegetal, obtener_tipos_bien, obtener_viveros, obtiene_analitica, obtiene_resumen, obtiene_ultimos_movimientos } from "../thunks/DashBoardViveros";
import BuscarBienViveros from "./BuscarBienViveros";
import { ResultadosBusqueda } from "./ResultadosBusqueda";
import { EtapasMaterialVegetal } from "./Analitica/EtapasMaterialVegetal";
import { DistribucionBienes } from "./Analitica/DistribucionBienes";
import { OrigenBienes } from "./Analitica/OrigenBienes";
import { UltimosMovimientos } from "./Analitica/UltimosMovimientos";
// eslint-disable-next-line @typescript-eslint/naming-convention
export const DashBoardViverosScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    obtener_viveros_fc();
    obtener_tipos_bien_fc();
    obtener_etapa_meterial_vegetal_fc();
  }, []);

  const obtener_viveros_fc: () => void = () => {
    dispatch(obtener_viveros()).then((response: any) => {
      const viveros_activos = response.data.filter((resp: { activo: boolean; }) => resp.activo);
      set_lista_viveros(viveros_activos);
    })
  }

  const obtener_tipos_bien_fc: () => void = () => {
    dispatch(obtener_tipos_bien()).then((response: any) => {
      set_lista_tipo_bien(response);
    })
  }

  const obtener_etapa_meterial_vegetal_fc: () => void = () => {
    dispatch(obtener_etapa_meterial_vegetal()).then((response: any) => {
      set_lista_material_vegetal(response);
    })
  }


  // Variables globales
  const [analitica, set_analitica] = useState<any[]>([]);
  const [resumen, set_resumen] = useState<any>();
  const [ultimos_movimientos, set_ultimos_movimientos] = useState<any[]>([]);
  const [seleccion_vivero, set_seleccion_vivero] = useState<string>("");
  const [lista_viveros, set_lista_viveros] = useState<any[]>([]);
  const [seleccion_tipo_bien, set_seleccion_tipo_bien] = useState<string>("");
  const [lista_tipo_bien, set_lista_tipo_bien] = useState<any[]>([]);
  const [seleccion_material_vegetal, set_seleccion_material_vegetal] = useState<string>("");
  const [lista_material_vegetal, set_lista_material_vegetal] = useState<any[]>([]);
  const [seleccion_bien, set_seleccion_bien] = useState<any>("");
  const [seleccion_bien_id, set_seleccion_bien_id] = useState<string>("");
  const [subtitle_resumen, set_subtitle_resumen] = useState<string>("todos los viveros");
  const [viveros_cuarentena, set_viveros_cuarentena] = useState<boolean>(false);
  const [viveros_cerrados, set_viveros_cerrados] = useState<boolean>(false);
  const [abrir_modal_bien, set_abrir_modal_bien] = useState<boolean>(false);

  const cambio_seleccion_vivero: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
    //  console.log('')(e.target);
    const name_selected = (e.target.value !== 'Todos' &&  e.target.value !== '' ) ?  lista_viveros.find((vn: any) => vn.id_vivero === e.target.value).nombre : "todos los viveros";
    set_subtitle_resumen(name_selected);
    set_seleccion_vivero(e.target.value);
  }
  const cambio_tipo_bien: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
    if(e.target.value === 'PL')
      set_seleccion_material_vegetal("");
    set_seleccion_tipo_bien(e.target.value);
  }
  const cambio_material_vegetal: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
    set_seleccion_material_vegetal(e.target.value);
  }

  useEffect(() => {
    set_seleccion_bien_id(seleccion_bien.id_bien);
  }, [seleccion_bien]);

  const salir_entrada: () => void = () => {
    navigate('/home');
  }

  const realizar_analistica: () => void = () => {
    dispatch(obtiene_analitica({ seleccion_vivero, seleccion_tipo_bien, seleccion_material_vegetal, seleccion_bien_id, viveros_cuarentena, viveros_cerrados })).then((response: any) => {
      response.data.forEach((data: any) => {
        if (data.tipo_bien !== 'Planta'){
          data.cantidad_cuarentena = 'N/A';
          data.etapa_lote = 'N/A';
          data.nro_lote = 'N/A';
          data.agno_lote = 'N/A';
          data.cantidad_cuarentena = 'N/A';
        }
      });
      set_analitica(response.data);
      dispatch(obtiene_ultimos_movimientos({seleccion_vivero}, '','','','','')).then((response: any) => {
        set_ultimos_movimientos(response.data);
      })
    })
    dispatch(obtiene_resumen({ seleccion_vivero })).then((response: any) => {
      set_resumen(response.resumen);
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
          <Title title="Tablero de control - Viveros" />
          <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
            <Grid item container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl size='small' fullWidth>
                  <InputLabel>Vivero</InputLabel>
                  <Select
                    value={seleccion_vivero}
                    label="Vivero"
                    onChange={cambio_seleccion_vivero}
                  >
                    <MenuItem value={"Todos"}>Todos</MenuItem>
                    {lista_viveros.map((vive: any) => (
                      <MenuItem key={vive.id_vivero} value={vive.id_vivero}>
                        {vive.nombre}
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
                    <MenuItem value={"Todos"}>Todos</MenuItem>
                    {lista_tipo_bien.map((tb: any) => (
                      <MenuItem key={tb[0]} value={tb[0]}>
                        {tb[1]}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
          <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
            <Grid item container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl size='small' fullWidth>
                  <InputLabel>Etapa material vegetal</InputLabel>
                  <Select
                    value={seleccion_material_vegetal}
                    label="Etapa material vegetal"
                    onChange={cambio_material_vegetal}
                    disabled={seleccion_tipo_bien === 'PL'}
                  >
                    <MenuItem value={"Todos"}>Todos</MenuItem>
                    {lista_material_vegetal.map((mv: any) => (
                      <MenuItem key={mv[0]} value={mv[0]}>
                        {mv[1]}
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
                  value={seleccion_bien.nombre ?? ""}
                  InputProps={{
                    readOnly: true,
                  }}
                  disabled
                />
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
                    onClick={() => { set_abrir_modal_bien(true); }}
                  >
                    Buscar bien
                  </Button>
                  {abrir_modal_bien && (
                    <BuscarBienViveros
                      is_modal_active={abrir_modal_bien}
                      set_is_modal_active={set_abrir_modal_bien}
                      title={"Busqueda de bien"}
                      seleccion_bien={set_seleccion_bien} filtros={{ seleccion_tipo_bien }} />
                  )}
                </Stack>
              </Grid>
            </Grid>
          </Box>
          <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
            <Grid item container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Stack
                  direction="row"
                  justifyContent="flex-end"
                  spacing={2}>
                  <span style={{ margin: '7px' }}>Incluir viveros en cuarentena</span><Switch color="primary" onChange={() => { set_viveros_cuarentena(!viveros_cuarentena); }} />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  spacing={2}>
                  <span style={{ margin: '7px' }}>Incluir viveros cerrados</span><Switch color="primary" onChange={() => { set_viveros_cerrados(!viveros_cerrados); }} />
                </Stack>
              </Grid>
            </Grid>
          </Box>
          <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
            <Grid item container spacing={2}>
              <Grid item xs={12} sm={12}>
                <Stack
                  direction="row"
                  justifyContent="center"
                  spacing={2}>
                  <Button
                    color='primary'
                    variant='contained'
                    startIcon={<SearchIcon />}
                    onClick={() => { realizar_analistica(); }}
                  >
                    Buscar
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
{(resumen !== undefined && resumen !== null)  && (<Grid
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
          <ResultadosBusqueda analitica={analitica}></ResultadosBusqueda>
        </Grid>
      </Grid>)}
      {(resumen !== undefined && resumen !== null)  && (<Grid
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
          <Title title="Resumen general" />
          <Stack
                      direction="row"
                      justifyContent="center"
                    >

          <Typography variant="h5">{"Resumen de inventario de " + subtitle_resumen}</Typography>
                    </Stack>
          <Box component="form" noValidate autoComplete="off">
            <Grid item container spacing={2}>
            <Grid item md={12} xs={12}>
          <Box component="form" sx={{ mt: '10px' }} noValidate autoComplete="off">
            <Grid item container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Card variant="outlined" style={{ backgroundColor: '#D0ECE7', borderColor: '#1ABC9C' }}>
                  <CardContent>
                    <Stack
                      direction="row"
                      justifyContent="center"
                    >
                      <Typography variant="h5">
                        <PendingOutlinedIcon /> {resumen.lotes_germinacion + ' '} Lotes en germinación
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card variant="outlined" style={{ backgroundColor: '#D0ECE7', borderColor: '#1ABC9C' }}>
                  <CardContent>
                    <Stack
                      direction="row"
                      justifyContent="center"
                    >
                      <Typography variant="h5">
                        <GrassOutlinedIcon /> {resumen.plantas_produccion + ' '} Plantas en producción
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card variant="outlined" style={{ backgroundColor: '#D0ECE7', borderColor: '#1ABC9C' }}>
                  <CardContent>
                    <Stack
                      direction="row"
                      justifyContent="center"
                    >
                      <Typography variant="h5">
                        <SpaOutlinedIcon /> {resumen.plantas_distribucion + ' '} Plantas en distribución
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
          <Box component="form" sx={{ mt: '10px' }} noValidate autoComplete="off">
            <Grid item container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Card variant="outlined" style={{ backgroundColor: '#D2B4DE', borderColor: '#A569BD' }}>
                  <CardContent>
                    <Stack
                      direction="row"
                      justifyContent="center"
                    >
                      <Typography variant="h5">
                        <HandymanOutlinedIcon /> {resumen.cantidad_herramientas + ' '} Herramientas
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card variant="outlined" style={{ backgroundColor: '#FADBD8', borderColor: '#F2D7D5' }}>
                  <CardContent>
                    <Stack
                      direction="row"
                      justifyContent="center"
                    >
                      <Typography variant="h5">
                        <Diversity2OIcon /> {resumen.tipos_insumos + ' '} Tipos de insumos
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card variant="outlined" style={{ backgroundColor: '#A9DFBF', borderColor: '#52BE80' }}>
                  <CardContent>
                    <Stack
                      direction="row"
                      justifyContent="center"
                    >
                      <Typography variant="h5">
                        <GrainOutlinedIcon /> {resumen.tipos_semillas + ' '} Tipos de semillas
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Grid>
            </Grid>
          </Box>
          <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
            <Grid item container spacing={2}>
              <Grid item xs={12} sm={6}>
              <Card variant="outlined">
                <CardContent>
              <Stack
                      direction="row"
                      justifyContent="center"
                    >
                      <Typography variant="h5">
                          Distribución de bienes
                      </Typography>
                </Stack>
                <DistribucionBienes resumen={resumen}></DistribucionBienes>
                </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
              <Card variant="outlined">
                <CardContent>
              <Stack
                      direction="row"
                      justifyContent="center"
                    >
                      <Typography variant="h5">
                          Distribución por etapas de material vegetal
                      </Typography>
                </Stack>
                <EtapasMaterialVegetal resumen={resumen}></EtapasMaterialVegetal>
                </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
          <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
            <Grid item container spacing={2}>
              <Grid item xs={12} sm={6}>
              <Card variant="outlined">
                <CardContent>
              <Stack
                      direction="row"
                      justifyContent="center"
                    >
                      <Typography variant="h5">
                          Origen de bienes
                      </Typography>
                </Stack>
                <OrigenBienes resumen={resumen}></OrigenBienes>
                </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <UltimosMovimientos movimientos={ultimos_movimientos}></UltimosMovimientos>
              </Grid>
            </Grid>
          </Box>
        </Grid>
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
      </Grid>)}
    </>
  );
}
