/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoadingButton } from '@mui/lab';
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Grid,
  IconButton,
  TextField,
} from '@mui/material';

import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import { v4 as uuidv4 } from 'uuid';

import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch } from '../../../../../../hooks';
import { control_error } from '../../../../../../helpers';
import { Title } from '../../../../../../components/Title';
import { download_xls } from '../../../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../../../documentos-descargar/PDF_descargar';
import { set_current_mode_planes } from '../../../../store/slice/indexPlanes';
import { search_indicadores } from '../../../../Indicadores/services/services';
import { DataContextConceptoPOAI } from '../../../context/context';
import { IBusquedaIndicador } from '../../../../Indicadores/components/Programas/BusquedaAvanzada/types';
import { api } from '../../../../../../api/axios';
export interface Planes {
  id_plan: number;
  nombre_plan: string;
  sigla_plan: string;
  tipo_plan: string;
  agno_inicio: number;
  agno_fin: number;
  estado_vigencia: boolean;
}
export interface Indicador {
  id_indicador: number;
  nombre_medicion: string;
  nombre_tipo: string | null;
  nombre_plan: string | null;
  nombre_programa: string | null;
  nombre_proyecto: string | null;
  nombre_producto: string | null;
  nombre_actividad: string;
  nombre_unidad_org: string | null;
  nombre_eje_estrategico: string | null;
  nombre_meta: string | null;
  nombre_linea_base: string | null;
  metas: any[];
  nombre_indicador: string;
  numero_indicador: string;
  linea_base: string | null;
  medida: string;
  tipo_indicador: string;
  fecha_creacion: string; // o Date si prefieres manejarlo como objeto Date
  cumplio: boolean;
  entidad_responsable: string | null;
  id_medicion: number;
  id_tipo: number | null;
  id_producto: number | null;
  id_actividad: number;
  id_plan: number | null;
  id_proyecto: number | null;
  id_programa: number | null;
  id_linea_base: number | null;
  id_meta_eje: number | null;
  id_eje_estrategico: number | null;
  id_unidad_organizacional: number | null;
}
export interface Actividad {
  id_actividad: number;
  nombre_plan: string;
  nombre_programa: string;
  nombre_proyecto: string;
  nombre_producto: string;
  numero_producto: string;
  // indicadores: Indicador[];
  numero_actividad: string;
  nombre_actividad: string;
  fecha_creacion: string; // o Date si prefieres manejarlo como objeto Date
  cumplio: boolean;
  id_producto: number;
  id_plan: number;
  id_proyecto: number;
  id_programa: number;
  id_linea_base: number | null;
  id_meta_eje: number | null;
  id_objetivo: number | null;
  id_eje_estrategico: number | null;
}

export interface Producto {
  id_producto: number;
  nombre_plan: string;
  nombre_programa: string;
  nombre_proyecto: string;
  numero_producto: string;
  nombre_producto: string;
  fecha_creacion: string; // o Date si prefieres manejarlo como objeto Date
  cumplio: boolean;
  id_proyecto: number;
  id_plan: number;
  id_programa: number;
}
export interface Proyecto {
  id_proyecto: number;
  nombre_plan: string;
  nombre_programa: string;
  numero_proyecto: string;
  nombre_proyecto: string;
  pondera_1: number;
  pondera_2: number;
  pondera_3: number;
  pondera_4: number;
  cumplio: boolean;
  fecha_creacion: string; // o Date si prefieres manejarlo como objeto Date
  id_programa: number;
  id_plan: number;
}
export interface EjeEstrategico {
  id_eje_estrategico: number;
  nombre_plan: string;
  sigla_plan: string;
  nombre_tipo_eje: string;
  nombre_objetivo: string | null;
  nombre_plan_objetivo: string | null;
  sigla_plan_objetivo: string | null;
  nombre: string;
  id_tipo_eje: number;
  id_plan: number;
  id_objetivo: number | null;
}
export interface EjeEstrategico {
  id_eje_estrategico: number;
  nombre_plan: string;
  sigla_plan: string;
  nombre_tipo_eje: string;
  nombre_objetivo: string | null;
  nombre_plan_objetivo: string | null;
  sigla_plan_objetivo: string | null;
  nombre: string;
  id_tipo_eje: number;
  id_plan: number;
  id_objetivo: number | null;
}
export interface metas {
  id_meta: number;
  nombre_meta: string;
  unidad_meta: string;
  porcentaje_meta: number;
  valor_meta: string;
  cumplio: boolean;
  fecha_creacion_meta: string;
}
export interface Programa {
  id_programa: number;
  nombre_eje_estrategico: string;
  nombre_programa: string;
  numero_programa: string;
  porcentaje_1: number;
  porcentaje_2: number;
  porcentaje_3: number;
  porcentaje_4: number;
  cumplio: boolean;
  fecha_creacion: string; // o Date si prefieres manejarlo como objeto Date
  id_eje_estrategico: number;
  id_sector: number;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const BusquedaAvanzadaIndicadores: React.FC = () => {
  // const { id_deposito, sucusal_selected } = useContext(DataContext);

  const columns: GridColDef[] = [
    {
      field: 'nombre_plan',
      headerName: 'Nombre del Plan',
      sortable: true,
      minWidth: 250,
      flex: 1,
    },
    {
      field: 'nombre_programa',
      headerName: 'Nombre del Programa',
      sortable: true,
      minWidth: 250,
      flex: 1,
    },
    {
      field: 'nombre_proyecto',
      headerName: 'Nombre del Proyecto',
      sortable: true,
      minWidth: 250,
      flex: 1,
    },
    {
      field: 'nombre_producto',
      headerName: 'Nombre del Producto',
      sortable: true,
      minWidth: 250,
      flex: 1,
    },
    {
      field: 'nombre_actividad',
      headerName: 'Nombre de la Actividad',
      sortable: true,
      minWidth: 250,
      flex: 1,
    },
    {
      field: 'nombre_indicador',
      headerName: 'Nombre del Indicador',
      sortable: true,
      minWidth: 250,
      flex: 1,
    },
    {
      field: 'nombre_medicion',
      headerName: 'Nombre de Medición',
      sortable: true,
      minWidth: 150,
      flex: 1,
    },
    {
      field: 'nombre_tipo',
      headerName: 'Nombre de Tipo',
      sortable: true,
      minWidth: 150,
      flex: 1,
    },

    {
      field: 'cumplio',
      headerName: '¿Cumplió?',
      sortable: true,
      minWidth: 100,
      flex: 1,
      renderCell: (params) => (params.value ? 'Sí' : 'No'),
    },
    {
      field: 'fecha_creacion',
      headerName: 'Fecha de Creación',
      sortable: true,
      minWidth: 150,
      flex: 1,
    },
    {
      field: 'acciones',
      headerName: 'ACCIONES',
      sortable: true,
      minWidth: 120,
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton
            size="small"
            onClick={() => {
              set_id_plan(params.row.id_plan);
              set_id_programa(params.row.id_programa);
              set_id_proyecto(params.row.id_proyecto);
              set_id_producto(params.row.id_producto);
              set_id_actividad(params.row.id_actividad);
              set_id_indicador(params.row.id_indicador);
              dispatch(
                set_current_mode_planes({
                  ver: true,
                  crear: false,
                  editar: false,
                })
              );
              // dispatch(set_current_indicador(params.row));
              reset({
                nombre_plan: params.row.nombre_plan,
                nombre_programa: params.row.nombre_programa,
                nombre_eje: params.row.nombre_eje,
                nombre_meta: params.row.nombre_meta,
                nombre_proyecto: params.row.nombre_proyecto,
                nombre_producto: params.row.nombre_producto,
                nombre_actividad: params.row.nombre_actividad,
                nombre_indicador: params.row.nombre_indicador,
              });
              handle_close();
            }}
          >
            <Avatar
              sx={{
                width: 24,
                height: 24,
                background: '#fff',
                border: '2px solid',
              }}
              variant="rounded"
            >
              <ChecklistOutlinedIcon
                titleAccess="Seleccionar indicador"
                sx={{
                  color: 'primary.main',
                  width: '18px',
                  height: '18px',
                }}
              />
            </Avatar>
          </IconButton>
        </>
      ),
    },
  ];

  const {
    reset,
    handleSubmit: handle_submit,
    control,
  } = useForm({
    defaultValues: {
      nombre_plan: '',
      nombre_eje: '',
      nombre_meta: '',
      nombre_programa: '',
      nombre_proyecto: '',
      nombre_producto: '',
      nombre_actividad: '',
      nombre_indicador: '',
    },
  });

  const [is_search, set_is_search] = useState(false);
  const [open_dialog, set_open_dialog] = useState(false);
  const [rows, set_rows] = useState<IBusquedaIndicador[]>([]);

  const handle_click_open = (): void => {
    set_open_dialog(true);
  };

  const handle_close = (): void => {
    // reset();
    set_open_dialog(false);
  };

  const dispatch = useAppDispatch();

  const on_submit_advance = handle_submit(
    async ({
      nombre_plan,
      nombre_programa,
      nombre_eje,
      nombre_meta,
      nombre_proyecto,
      nombre_producto,
      nombre_actividad,
      nombre_indicador,
    }) => {
      set_is_search(true);
      try {
        set_rows([]);
        const {
          data: { data },
        } = await search_indicadores({
          nombre_plan,
          nombre_programa,
          nombre_eje,
          nombre_meta,
          nombre_proyecto,
          nombre_producto,
          nombre_actividad,
          nombre_indicador,
        });

        if (data?.length > 0) {
          set_rows(data);
        }
      } catch (error: any) {
        // const temp_error = error as AxiosError;
        // const resp = temp_error.response?.data as ResponseServer<any>;
        control_error(error.response?.data.detail ?? 'Error en la búsqueda');
      } finally {
        set_is_search(false);
      }
    }
  );

  const {
    set_id_plan,
    set_id_programa,
    set_id_proyecto,
    set_id_producto,
    set_id_actividad,
    set_id_indicador,
  } = useContext(DataContextConceptoPOAI);

  useEffect(() => {
    reset();
    set_rows([]);
    set_is_search(false);
  }, []);

  const [planes, setPlanes] = useState<Planes[]>([]);
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null); // Estado para almacenar el ID del plan seleccionado
  const handlePlanChange = (event: any) => {
    const selectedPlan = planes.find(
      (plan) => plan.nombre_plan === event.target.value
    );
    if (selectedPlan) {
      setSelectedPlanId(selectedPlan.id_plan);
    }
  };
  const fetplames = async () => {
    try {
      const url = 'seguimiento/planes/consultar-planes/';
      const res = await api.get(url);
      const unidadesData = res.data.data;
      setPlanes(unidadesData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetplames();
  }, []);

  const [ejeplan, setejeplan] = useState<EjeEstrategico[]>([]);

  const [selectedPlanIdeje, setSelectedPlanIdeje] = useState<number | null>(
    null
  ); // Estado para almacenar el ID del plan seleccionado
  const handlePlanChangeeje = (event: any) => {
    const selectedPlan = ejeplan.find(
      (plan) => plan.nombre === event.target.value
    );
    if (selectedPlan) {
      setSelectedPlanIdeje(selectedPlan.id_eje_estrategico);
    }
  };

  const fetejeplan = async () => {
    try {
      const url = `seguimiento/planes/consultar-ejes-estrategicos-id-planes/${selectedPlanId}/`;
      const res = await api.get(url);
      const datas = res.data.data;
      setejeplan(datas);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetejeplan();
  }, [selectedPlanId]);

  // programa
  const [programa, setPrograma] = useState<Programa[]>([]);
  const [selectedProgramaId, setSelectedProgramaId] = useState<number | null>(
    null
  ); // Estado para almacenar el ID del programa seleccionado

  const handleProgramaChange = (event: any) => {
    const selectedPrograma = programa.find(
      (programa) => programa.nombre_programa === event.target.value
    );
    if (selectedPrograma) {
      setSelectedProgramaId(selectedPrograma.id_programa);
    }
  };
  const fetprogramas = async () => {
    try {
      const url = `seguimiento/planes/consultar-programas-id-eje-estrategico/${selectedPlanIdeje}/`;
      const res = await api.get(url);
      const datas = res.data.data;
      setPrograma(datas);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetprogramas();
  }, [selectedPlanIdeje]);

  // proyecto
  const [proyecto, setProyecto] = useState<Proyecto[]>([]);
  const [selectedProyectoId, setSelectedProyectoId] = useState<number | null>(
    null
  ); // Estado para almacenar el ID del programa seleccionado

  const handleProyectoChange = (event: any) => {
    const selectedPrograma = proyecto.find(
      (proyecto) => proyecto.nombre_proyecto === event.target.value
    );
    if (selectedPrograma) {
      setSelectedProyectoId(selectedPrograma.id_proyecto);
    }
  };
  const fetproyecto = async () => {
    try {
      const url = `/seguimiento/planes/consultar-proyectos-id-programas/${selectedProgramaId}/`;
      const res = await api.get(url);
      const datas = res.data.data;
      setProyecto(datas);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetproyecto();
  }, [selectedProgramaId]);

  // producto

  const [producto, setProducto] = useState<Producto[]>([]);

  const [selectedProductoId, setSelectedProductoId] = useState<number | null>(
    null
  );

  const handleProductoChange = (event: any) => {
    const selectedPrograma = producto.find(
      (producto) => producto.nombre_producto === event.target.value
    );
    if (selectedPrograma) {
      setSelectedProductoId(selectedPrograma.id_producto);
    }
  };
  const fetproducto = async () => {
    try {
      const url = `seguimiento/planes/consultar-productos-id-proyectos/${selectedProyectoId}/`;
      const res = await api.get(url);
      const datas = res.data.data;
      setProducto(datas);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetproducto();
  }, [selectedProyectoId]);

  // actividad
  const [actividad, setactividad] = useState<Actividad[]>([]);

  const [selectedactividadId, setSelectedactividadId] = useState<number | null>(
    null
  );

  const handleactividadChange = (event: any) => {
    const selectedPrograma = actividad.find(
      (actividad) => actividad.nombre_actividad === event.target.value
    );
    if (selectedPrograma) {
      setSelectedactividadId(selectedPrograma.id_actividad);
    }
  };
  const fetactividad = async () => {
    try {
      const url = `seguimiento/planes/consultar-actividades-id-productos/${selectedProductoId}/`;
      const res = await api.get(url);
      const datas = res.data.data;
      setactividad(datas);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetactividad();
  }, [selectedProductoId]);

  // indicador

  const [indicador, setindicador] = useState<Indicador[]>([]);

  const [selecteindicadorId, setSelecteindicadorId] = useState<number | null>(
    null
  );

  const handleindicadorChange = (event: any) => {
    const selectedPrograma = indicador.find(
      (indicador) => indicador.nombre_indicador === event.target.value
    );
    if (selectedPrograma) {
      setSelecteindicadorId(selectedPrograma.id_indicador);
    }
  };
  const fetindicador = async () => {
    try {
      const url = `seguimiento/planes/consultar-indicadores-id-actividad/${selectedactividadId}/`;
      const res = await api.get(url);
      const datas = res.data.data;
      setindicador(datas);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetindicador();
  }, [selectedactividadId]);

  // meta

  const [metas, setmetas] = useState<metas[]>([]);

  const fetmetas = async () => {
    try {
      const url = `seguimiento/planes/consultar-metas-id-indicador/${selecteindicadorId}/`;
      const res = await api.get(url);
      const datas = res.data.data;
      setmetas(datas);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetmetas();
  }, [selecteindicadorId]);

  return (
    <>
      <Grid
        container
        spacing={2}
        m={2}
        p={2}
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          m: '10px 0 20px 0',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item xs={12}>
          <Title title="Indicadores" />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="nombre_plan"
            control={control}
            render={(
              { field: { onChange, value } } // formState: { errors }
            ) => (
              <FormControl fullWidth size="small">
                <InputLabel id="si-no-select-label"> Nombre de plan</InputLabel>
                <Select
                  name="nombre_plan"
                  label=" Nombre de plan"
                  value={value}
                  // onChange={onChange}
                  onChange={(event) => {
                    onChange(event);
                    handlePlanChange(event);
                  }}
                  disabled
                >
                  {planes.map((unidad: any) => (
                    <MenuItem key={unidad.id_plan} value={unidad.nombre_plan}>
                      {unidad.nombre_plan}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="nombre_eje"
            control={control}
            render={(
              { field: { onChange, value } } // formState: { errors }
            ) => (
              <FormControl fullWidth size="small">
                <InputLabel id="si-no-select-label"> Nombre de eje</InputLabel>
                <Select
                  name="nombre_eje"
                  label="Nombre de plan"
                  value={value}
                  onChange={(event) => {
                    onChange(event);
                    handlePlanChangeeje(event);
                  }}
                  disabled
                >
                  {ejeplan.map((unidad: any) => (
                    <MenuItem
                      key={unidad.id_eje_estrategico}
                      value={unidad.nombre}
                    >
                      {unidad.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        </Grid>
        {/* {selectedPlanIdeje} */}
        <Grid item xs={12} sm={6}>
          <Controller
            name="nombre_programa"
            control={control}
            render={(
              { field: { onChange, value } } // formState: { errors }
            ) => (
              <FormControl fullWidth size="small">
                <InputLabel id="si-no-select-label">
                  {' '}
                  Nombre de programa
                </InputLabel>
                <Select
                  name="nombre_programa"
                  value={value}
                  onChange={(event) => {
                    onChange(event);
                    handleProgramaChange(event);
                  }}
                  disabled
                  label="Nombre de programa"
                >
                  {programa.map((programa: any) => (
                    <MenuItem
                      key={programa.id_programa}
                      value={programa.nombre_programa}
                    >
                      {programa.nombre_programa}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        </Grid>
        {/* {selectedProgramaId} */}
        <Grid item xs={12} sm={6}>
          <Controller
            name="nombre_proyecto"
            control={control}
            render={(
              { field: { onChange, value } } // formState: { errors }
            ) => (
              <FormControl fullWidth size="small">
                <InputLabel>Nombre del proyecto </InputLabel>
                <Select
                  value={value}
                  onChange={(event) => {
                    onChange(event);
                    handleProyectoChange(event);
                  }}
                  disabled
                  name="nombre_proyecto"
                  label="Nombre del proyecto"
                >
                  {proyecto.map((Proyecto: any) => (
                    <MenuItem
                      key={Proyecto.id_proyecto}
                      value={Proyecto.nombre_proyecto}
                    >
                      {Proyecto.nombre_proyecto}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        </Grid>
        {/* {selectedProyectoId} */}
        <Grid item xs={12} sm={6}>
          <Controller
            name="nombre_producto"
            control={control}
            render={(
              { field: { onChange, value } } // formState: { errors }
            ) => (
              <FormControl fullWidth size="small">
                <InputLabel id="si-no-select-label">
                  Nombre del producto
                </InputLabel>
                <Select
                  name="nombre_producto"
                  value={value}
                  onChange={(event) => {
                    onChange(event);
                    handleProductoChange(event);
                  }}
                  disabled
                  label="Nombre del producto"
                >
                  {producto.map((Proyecto: any) => (
                    <MenuItem
                      key={Proyecto.id_producto}
                      value={Proyecto.nombre_producto}
                    >
                      {Proyecto.nombre_producto}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        </Grid>
        {/* {selectedProductoId} */}

        <Grid item xs={12} sm={6}>
          <Controller
            name="nombre_actividad"
            control={control}
            render={(
              { field: { onChange, value } } // formState: { errors }
            ) => (
              <FormControl fullWidth size="small">
                <InputLabel id="si-no-select-label">
                  Nombre del la actividad
                </InputLabel>
                <Select
                  value={value}
                  onChange={(event) => {
                    onChange(event);
                    handleactividadChange(event);
                  }}
                  disabled
                  name="nombre_actividad"
                  label="Nombre del la actividad "
                >
                  {actividad.map((Proyecto: any) => (
                    <MenuItem
                      key={Proyecto.id_actividad}
                      value={Proyecto.nombre_actividad}
                    >
                      {Proyecto.nombre_actividad}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        </Grid>
        {/* {selectedactividadId} */}
        <Grid item xs={12} sm={6}>
          <Controller
            name="nombre_indicador"
            control={control}
            render={(
              { field: { onChange, value } } // formState: { errors }
            ) => (
              <FormControl fullWidth size="small">
                <InputLabel id="si-no-select-label">
                  Nombre del indicador
                </InputLabel>
                <Select
                  value={value}
                  onChange={(event) => {
                    onChange(event);
                    handleindicadorChange(event);
                  }}
                  disabled
                  name="nombre_indicador"
                  label="Nombre del la indicador "
                >
                  {indicador.map((Proyecto: any) => (
                    <MenuItem
                      key={Proyecto.id_indicador}
                      value={Proyecto.nombre_indicador}
                    >
                      {Proyecto.nombre_indicador}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        </Grid>
        {/* {selecteindicadorId} */}

        <Grid item xs={12} sm={6}>
          <Controller
            name="nombre_meta"
            control={control}
            render={(
              { field: { onChange, value } } // formState: { errors }
            ) => (
              <FormControl fullWidth size="small">
                <InputLabel id="si-no-select-label">
                  {' '}
                  Nombre del la Meta{' '}
                </InputLabel>
                <Select
                  disabled
                  name="nombre_meta"
                  value={value}
                  onChange={(event) => {
                    onChange(event);
                  }}
                  label="Nombre del la Meta"
                >
                  {metas.map((Proyecto: any) => (
                    <MenuItem
                      key={Proyecto.id_meta}
                      value={Proyecto.nombre_indicador}
                    >
                      {Proyecto.nombre_indicador}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        </Grid>
        <Grid
          container
          spacing={2}
          marginTop={2}
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              startIcon={<SearchIcon />}
              onClick={() => {
                handle_click_open();
              }}
            >
              Buscar
            </Button>
          </Grid>
        </Grid>

        {/* {id_deposito && (
          <>
            <Grid container spacing={2} justifyContent="flex-end">
              <Grid item>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    // set_id_deposito(null);
                    dispatch(
                      set_current_mode_estantes({
                        ver: false,
                        crear: true,
                        editar: false,
                      })
                    );
                  }}
                >
                  Agregar estante
                </Button>
              </Grid>
            </Grid>
          </>
        )} */}
      </Grid>
      <Dialog open={open_dialog} onClose={handle_close} fullWidth maxWidth="lg">
        <DialogContent>
          <Grid
            container
            spacing={2}
            sx={{
              position: 'relative',
              background: '#FAFAFA',
              borderRadius: '15px',
              p: '20px',
              mb: '20px',
              boxShadow: '0px 3px 6px #042F4A26',
              marginTop: '20px',
              marginLeft: '-5px',
            }}
          >
            <Title title="Búsqueda avanzada indicadores" />
            {/* <form
              onSubmit={(e) => {
                void on_submit_advance(e);
              }}
              style={{
                width: '100%',
                height: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            > */}
            <Grid container spacing={2} sx={{ mt: '10px', mb: '20px' }}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="nombre_plan"
                  control={control}
                  render={(
                    { field: { onChange, value } } // formState: { errors }
                  ) => (
                    <FormControl fullWidth size="small">
                      <InputLabel id="si-no-select-label">
                        {' '}
                        Nombre de plan
                      </InputLabel>
                      <Select
                        name="nombre_plan"
                        label=" Nombre de plan"
                        value={value}
                        // onChange={onChange}
                        onChange={(event) => {
                          onChange(event);
                          handlePlanChange(event);
                        }}
                      >
                        {planes.map((unidad: any) => (
                          <MenuItem
                            key={unidad.id_plan}
                            value={unidad.nombre_plan}
                          >
                            {unidad.nombre_plan}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="nombre_eje"
                  control={control}
                  render={(
                    { field: { onChange, value } } // formState: { errors }
                  ) => (
                    <FormControl fullWidth size="small">
                      <InputLabel id="si-no-select-label">
                        {' '}
                        Nombre de eje
                      </InputLabel>
                      <Select
                        name="nombre_eje"
                        label="Nombre de plan"
                        value={value}
                        onChange={(event) => {
                          onChange(event);
                          handlePlanChangeeje(event);
                        }}
                      >
                        {ejeplan.map((unidad: any) => (
                          <MenuItem
                            key={unidad.id_eje_estrategico}
                            value={unidad.nombre}
                          >
                            {unidad.nombre}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
              {/* {selectedPlanIdeje} */}
              <Grid item xs={12} sm={6}>
                <Controller
                  name="nombre_programa"
                  control={control}
                  render={(
                    { field: { onChange, value } } // formState: { errors }
                  ) => (
                    <FormControl fullWidth size="small">
                      <InputLabel id="si-no-select-label">
                        {' '}
                        Nombre de programa
                      </InputLabel>
                      <Select
                        name="nombre_programa"
                        value={value}
                        onChange={(event) => {
                          onChange(event);
                          handleProgramaChange(event);
                        }}
                        label="Nombre de programa"
                      >
                        {programa.map((programa: any) => (
                          <MenuItem
                            key={programa.id_programa}
                            value={programa.nombre_programa}
                          >
                            {programa.nombre_programa}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
              {/* {selectedProgramaId} */}
              <Grid item xs={12} sm={6}>
                <Controller
                  name="nombre_proyecto"
                  control={control}
                  render={(
                    { field: { onChange, value } } // formState: { errors }
                  ) => (
                    <FormControl fullWidth size="small">
                      <InputLabel>Nombre del proyecto </InputLabel>
                      <Select
                        value={value}
                        onChange={(event) => {
                          onChange(event);
                          handleProyectoChange(event);
                        }}
                        name="nombre_proyecto"
                        label="Nombre del proyecto"
                      >
                        {proyecto.map((Proyecto: any) => (
                          <MenuItem
                            key={Proyecto.id_proyecto}
                            value={Proyecto.nombre_proyecto}
                          >
                            {Proyecto.nombre_proyecto}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
              {/* {selectedProyectoId} */}
              <Grid item xs={12} sm={6}>
                <Controller
                  name="nombre_producto"
                  control={control}
                  render={(
                    { field: { onChange, value } } // formState: { errors }
                  ) => (
                    <FormControl fullWidth size="small">
                      <InputLabel id="si-no-select-label">
                        Nombre del producto
                      </InputLabel>
                      <Select
                        name="nombre_producto"
                        value={value}
                        onChange={(event) => {
                          onChange(event);
                          handleProductoChange(event);
                        }}
                        label="Nombre del producto"
                      >
                        {producto.map((Proyecto: any) => (
                          <MenuItem
                            key={Proyecto.id_producto}
                            value={Proyecto.nombre_producto}
                          >
                            {Proyecto.nombre_producto}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
              {/* {selectedProductoId} */}

              <Grid item xs={12} sm={6}>
                <Controller
                  name="nombre_actividad"
                  control={control}
                  render={(
                    { field: { onChange, value } } // formState: { errors }
                  ) => (
                    <FormControl fullWidth size="small">
                      <InputLabel id="si-no-select-label">
                        Nombre del la actividad
                      </InputLabel>
                      <Select
                        value={value}
                        onChange={(event) => {
                          onChange(event);
                          handleactividadChange(event);
                        }}
                        name="nombre_actividad"
                        label="Nombre del la actividad "
                      >
                        {actividad.map((Proyecto: any) => (
                          <MenuItem
                            key={Proyecto.id_actividad}
                            value={Proyecto.nombre_actividad}
                          >
                            {Proyecto.nombre_actividad}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
              {/* {selectedactividadId} */}
              <Grid item xs={12} sm={6}>
                <Controller
                  name="nombre_indicador"
                  control={control}
                  render={(
                    { field: { onChange, value } } // formState: { errors }
                  ) => (
                    <FormControl fullWidth size="small">
                      <InputLabel id="si-no-select-label">
                        Nombre del indicador
                      </InputLabel>
                      <Select
                        value={value}
                        onChange={(event) => {
                          onChange(event);
                          handleindicadorChange(event);
                        }}
                        name="nombre_indicador"
                        label="Nombre del la indicador "
                      >
                        {indicador.map((Proyecto: any) => (
                          <MenuItem
                            key={Proyecto.id_indicador}
                            value={Proyecto.nombre_indicador}
                          >
                            {Proyecto.nombre_indicador}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
              {/* {selecteindicadorId} */}

              <Grid item xs={12} sm={6}>
                <Controller
                  name="nombre_meta"
                  control={control}
                  render={(
                    { field: { onChange, value } } // formState: { errors }
                  ) => (
                    <FormControl fullWidth size="small">
                      <InputLabel id="si-no-select-label">
                        {' '}
                        Nombre del la Meta{' '}
                      </InputLabel>
                      <Select
                        name="nombre_meta"
                        value={value}
                        onChange={(event) => {
                          onChange(event);
                        }}
                        label="Nombre del la Meta"
                      >
                        {metas.map((Proyecto: any) => (
                          <MenuItem
                            key={Proyecto.id_meta}
                            value={Proyecto.nombre_indicador}
                          >
                            {Proyecto.nombre_indicador}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid
          container
          spacing={2}
          marginTop={2}
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
        >
           <Grid item >
                <LoadingButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<SearchIcon />}
                  loading={is_search}
                  disabled={is_search}
                  onClick={(e) => {
                    void on_submit_advance(e);
                  }}
                >
                  Buscar
                </LoadingButton>
              </Grid>
        </Grid>
             
              {rows.length > 0 && (
                <>
                  <Grid item xs={12}>
                    <Title title="Resultados de la búsqueda" />
                    {/* <Typography>Resultados de la búsqueda</Typography> */}
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ width: '100%' }}>
                      <ButtonGroup
                        style={{
                          margin: 7,
                          display: 'flex',
                          justifyContent: 'flex-end',
                        }}
                      >
                        {download_xls({ nurseries: rows, columns })}
                        {download_pdf({
                          nurseries: rows,
                          columns,
                          title: 'Resultados de la búsqueda',
                        })}
                      </ButtonGroup>
                      <DataGrid
                        density="compact"
                        autoHeight
                        rows={rows ?? []}
                        columns={columns ?? []}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        getRowId={() => uuidv4()}
                        getRowHeight={() => 'auto'}
                      />
                    </Box>
                  </Grid>
                </>
              )}
            </Grid>
            {/* </form> */}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            color="error"
            variant="outlined"
            startIcon={<CloseIcon />}
            onClick={() => {
              handle_close();
              // reset();
            }}
          >
            Cerrar
          </Button>{' '}
        </DialogActions>
      </Dialog>
    </>
  );
};
