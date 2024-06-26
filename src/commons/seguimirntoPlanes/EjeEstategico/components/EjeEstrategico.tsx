/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { Title } from '../../../../components';
import {
  Dialog,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { api } from '../../../../api/axios';
import { RenderDataGrid } from '../../../gestorDocumental/tca/Atom/RenderDataGrid/RenderDataGrid';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import CleanIcon from '@mui/icons-material/CleaningServices';
import SaveIcon from '@mui/icons-material/Save';
import { control_error, control_success } from '../../../../helpers';

import {
  Planes,
  Programa,
  Proyecto,
  Producto,
  Actividad,
  Indicador,
  metas,
  EjeEstrategico,
  miEstilo,
  ConsultarSeguimiento,
  FormDataRegistro,
} from '../../Seguimientopoai/interface/types';
import {
  fetplames,
  fetmetas,
  fetproyecto,
  fetactividad,
  fetejeplan,
  fetproducto,
  fetprogramas,
  fetindicador,
} from '../../Seguimientopoai/services/select.service';
import { ButtonSalir } from '../../../../components/Salir/ButtonSalir';
import { GridRenderCellParams } from '@mui/x-data-grid';

export interface Rubrog {
  cod_pre: any;
  cuenta:any 
  id_plan:any; 
  id_rubro :any; 
}
export interface Fuente {
  id_fuente: number;
  nombre_fuente: string;
  vano_1: number | null;
  vano_2: number | null;
  vano_3: number | null;
  vano_4: number | null;
  vadicion1: number | null;
  vadicion2: number | null;
  vadicion3: number | null;
  vadicion4: boolean | null;
  valor_total: number;
  id_plan: number;
}
export interface UnidadOrganizaciona {
  nombre: string;
  id_unidad_organizacional: number;
}
export interface FormData {
  meta: any;
  plans: any;
  programa: any;
  proyecto: any;
  producto: any;
  actividad: any;
  indicador: any;
  eje: any;
}
interface Modalidad {
  id_modalidad: number;
  nombre_modalidad: string;
  codigo_modalidad: string;
  activo: boolean;
  item_ya_usado: boolean;
  registro_precargado: boolean;
}

interface ConceptoPoai {
  cod_pre: any;
  cuenta: any;
  id_plan: any;
}

// export const Resultados: React.FC = () => {
export const ConseptoPoai: React.FC = () => {
  const initialFormData: FormData = {
    eje: '',
    meta: '',
    plans: '',
    programa: '',
    proyecto: '',
    producto: '',
    actividad: '',
    indicador: '',
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleInputSelect = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const initialConceptoPoai: ConceptoPoai = {
    cod_pre: '',
    cuenta: '',
    id_plan: '',
  };
  const [conceptoPoai, setConceptoPoai] =
    useState<ConceptoPoai>(initialConceptoPoai);
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;

    const numberFields = ["" ];
    const booleanFields = ['vadicion1'];

    const convertValue = (name: string, value: unknown): any => {
      if (numberFields.includes(name)) {
        return value === '' ? null : Number(value);
      } else if (booleanFields.includes(name)) {
        return value === 'true' || value === '1' ? true : false;
      } else {
        return value;
      }
    };

    setConceptoPoai({
      ...conceptoPoai,
      [name as string]: convertValue(name as string, value),
    });
  };

  const [selecTodosId, setSelecTodosId] = useState<any>('');

  useEffect(() => {
    if (selecTodosId) {
      setConceptoPoai({
        cod_pre: selecTodosId.cod_pre,
        cuenta: selecTodosId.cuenta,
        id_plan: selecTodosId.id_plan,
      });
    }
  }, [selecTodosId]);

  const [abrir0, setabrir0] = useState(false);
  const [abrir1, setabrir1] = useState(false);

  const [Rubro, setRubro] = useState<Rubrog[]>([]);
  const fetchHistorico = async (): Promise<void> => {
    try {
      const url = `seguimiento/planes/consultar-parametrica-rubros-id-plan/${formData.plans}/`;

      // `/seguimiento-planes/consultar-conceptos-poai-lista/?id_plan=${formData.plan}&id_proyecto=${formData.proyecto}&id_indicador=${formData.indicador}&id_meta=${formData.meta}`
      const res = await api.get(url);
      const HistoricoData: Rubrog[] = res.data?.data || [];
      setRubro(HistoricoData);
      setabrir0(true);
      control_success('Datos encontrados con exito');
    } catch (error: any) {
      // console.error(error);
      setabrir0(true)
      control_error(error.response.data.detail);
    }
  };
  const [editar, seteditar] = useState(false);

  const handlcerrar = () => {
    setabrir1(false);
    setabrir0(false);
  };

  const columns = [
    {
      field: 'cod_pre',
      headerName: 'Codigo presupuestal',
      minWidth: 500,
    },
    {
      field: 'cuenta',
      headerName: 'Cuenta',
      minWidth: 1400,
    },

    {
      field: 'Acciones',
      headerName: 'Acciones',
      minWidth: 100,
      renderCell: (params: any) => (
        <>
          <IconButton
            color="primary"
            aria-label="Ver"
            onClick={() => {
              setSelecTodosId(params.row);
              seteditar(true);
              setabrir1(true); // Mover esta línea aquí
            }}
          >
            <EditIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const [planes, setPlanes] = useState<Planes[]>([]);

  useEffect(() => {
    fetplames({ setPlanes });
  }, []);

  //actualizar
  // const editartabla = async () => {
  //   try {
  //     const url = `seguimiento/planes/actualizar-parametrica-rubros/${selecTodosId.id_rubro}/`;
  //     const res = await api.put(url, conceptoPoai);
  //     console.log('Configuración actualizada con éxito', res.data);
  //     control_success('Editado correctamente');
  //     fetchHistorico();
  //     useState(false)
  //   } catch (error: any) {
  //     console.error('Error al actualizar la configuración', error);
  //     control_error(error.response.data.detail);
  //   }
  // };
  const editartabla = async () => {
    try {
      const url = `seguimiento/planes/actualizar-parametrica-rubros/${selecTodosId.id_rubro}/`;
      const res = await api.put(url, conceptoPoai);
      if (res.data) {
        console.log('Configuración actualizada con éxito', res.data);
        control_success('Editado correctamente');
        fetchHistorico();
        setabrir1(false)
      }
    } catch (error: any) {
      console.error('Error al actualizar la configuración', error);
      control_error(error.response?.data?.detail || 'Error al actualizar la configuración');
    }
  };
  //crear
  // const crearConfiguracion = async () => {
  //   try {
  //     const url = 'seguimiento/planes/crear-parametrica-rubros/';
  //     const res = await api.post(url, conceptoPoai);
  //     console.log('Formulario creado con éxito', res.data);
  //     control_success('Formulario creado con éxito');
  //     // setConceptoPoai(initialConceptoPoai);
  //     fetchHistorico();
  //     useState(false)
  //   } catch (error: any) {
  //     console.error('Error al crear el formulario', error);
  //     control_error(error.response.data.detail);
  //   }
  // };
  const crearConfiguracion = async () => {
    try {
      const url = 'seguimiento/planes/crear-parametrica-rubros/';
      const res = await api.post(url, conceptoPoai);
      if (res.data) {
        console.log('Formulario creado con éxito', res.data);
        control_success('Formulario creado con éxito');
        fetchHistorico();
        setabrir1(false)
      }
    } catch (error: any) {
      console.error('Error al crear el formulario', error);
      control_error(error.response?.data?.detail || 'Error al crear el formulario');
    }
  };
  const handlecrear = () => {
    setabrir1(true);
    seteditar(false);

 
  };

  const handlecerrar = () => {
    setabrir1(false);
  };

  const handleLimpiarClick = () => {
    setConceptoPoai((prevData: any) => ({
      ...prevData,
      cod_pre: '',
      cuenta: '',
      id_plan: '',
    }));
  };

  const [unidades, setUnidades] = useState<UnidadOrganizaciona[]>([]);
  const fetchUnidades = async () => {
    try {
      const url =
        '/gestor/consecutivos-unidades/unidades_organigrama_actual/get/';
      const res = await api.get(url);
      const unidadesData = res.data.data;
      setUnidades(unidadesData);
      // control_success('Configuraciones encotradas  ');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUnidades();
  }, []);

  const [modalidad, setmodalidad] = useState<Modalidad[]>([]);
  const fetchmodalidad = async () => {
    try {
      const url = 'seguimiento-planes/consultar-modalidades/';
      const res = await api.get(url);
      const unidadesData = res.data.data;
      setmodalidad(unidadesData);
      // control_success('Configuraciones encotradas  ');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchmodalidad();
  }, []);

  const [fuente, fetfuente] = useState<Fuente[]>([]);

  const fetfuented = async () => {
    try {
      const url =
        'seguimiento-planes/consultar-fuentes-financiacion-indicadores-lista/';
      const res = await api.get(url);
      const unidadesData = res.data.data;
      fetfuente(unidadesData);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetfuented();
  }, []);

  useEffect(() => {
    setConceptoPoai((prevData: any) => ({
      ...prevData,
      id_plan: formData.plans,
    }));
  }, [formData.plans]);

  const limpiartodo = (): void => {
    setFormData(initialFormData);
  };
  return (
    <>
      {/* <Button
                color="primary"
                variant="outlined"
                fullWidth
                onClick={limpiartodo}
                // startIcon={<SaveIcon />}
              >
              
              </Button> */}
      <Grid
        container
        item
        xs={12}
        spacing={2}
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
        <Grid item xs={12} sm={12}>
          <Title title=" Parámetro de rubros" />
        </Grid>
      </Grid>

      <Grid
        container
        item
        xs={12}
        spacing={2}
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
        <Grid item xs={12} sm={12}>
          <Title title="Seleccione el plan de acción institucional " />
        </Grid>
        {/* {selectedConceptoId} */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small">
            <InputLabel id="si-no-select-label"> Nombre de plan</InputLabel>
            <Select
              name="plans"
              // disabled
              label="Nombre de plan"
              value={formData.plans}
              onChange={handleInputSelect}
            >
              {planes.map((unidad: any) => (
                <MenuItem key={unidad.id_plan} value={unidad.id_plan}>
                  {unidad.nombre_plan}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
{/* EDITAR Y FILTRO  */}
        

        <Grid
          container
          spacing={2}
          marginTop={2}
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
        >
          {/* <Grid item>
            <Button
              color="error"
              variant="outlined"
              fullWidth
              onClick={handlcerrar}
              startIcon={<ClearIcon />}
            >
              cerrar
            </Button>
          </Grid> */}
          <Grid item>
            <Button
              startIcon={<SearchOutlined />}
              variant="contained"
              fullWidth
              disabled={!formData.plans}
              onClick={fetchHistorico}
            >
              Buscar
            </Button>
          </Grid>
          <Grid item xs={12} sm={1}>
            <ButtonSalir />
          </Grid>
        </Grid>
      </Grid>

      {abrir0 && (
        <Grid
          container
          item
          xs={12}
          spacing={2}
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
          <RenderDataGrid
            title="Resultados de la búsqueda parámetro de rubros "
            columns={columns ?? []}
            rows={Rubro ?? []}
          />
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
                color="primary"
                variant="outlined"
                fullWidth
                onClick={handlecrear}
                // startIcon={<SaveIcon />}
              >
                Agregar Parámetro de rubro
              </Button>
            </Grid>
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
                color="error"
                variant="outlined"
                fullWidth
                onClick={handlcerrar}
                startIcon={<ClearIcon />}
              >
                cerrar
              </Button>
            </Grid>
            <Grid item>
              <Button
                startIcon={<SearchOutlined />}
                variant="contained"
                fullWidth
                onClick={fetchHistorico}
              >
                Buscar
              </Button>
            </Grid>
            <Grid item xs={12} sm={1}>
              <ButtonSalir />
            </Grid>
          </Grid>
        </Grid>
      )}

      {abrir1 && (
        <>
          <Grid
            container
            item
            xs={12}
            spacing={2}
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
            <Grid item xs={12} sm={12}>
              <Title title="Agregar parámetro de rubros" />
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth size="small">
                <InputLabel id="si-no-select-label"> Nombre de plan</InputLabel>
                <Select
                  name="id_plan"
                  value={conceptoPoai.id_plan}
                  disabled 
                  onChange={handleInputChange}
                  label="Nombre de plan"
                >
                  {planes.map((unidad: any) => (
                    <MenuItem key={unidad.id_plan} value={unidad.id_plan}>
                      {unidad.nombre_plan}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {/* cod_pre cuenta id_plan */}
            <Grid item xs={12} sm={6}>
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                size="small"
                variant="outlined"
                label="Codigo presupuestal"
                name="cod_pre"
                value={conceptoPoai.cod_pre}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                size="small"
                variant="outlined"
                label="Cuenta"
                name="cuenta"
                value={conceptoPoai.cuenta}
                onChange={(event) => { handleInputChange(event); }}
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
                  color="error"
                  variant="outlined"
                  fullWidth
                  onClick={handlecerrar}
                  startIcon={<ClearIcon />}
                >
                  cerrar
                </Button>
              </Grid>
              <Grid item>
                <Button
                  color="warning"
                  variant="outlined"
                  fullWidth
                  startIcon={<CleanIcon />}
                  onClick={handleLimpiarClick}
                >
                  Limpiar
                </Button>
              </Grid>
              <Grid item>
                <Button
                  color="success"
                  variant="contained"
                  fullWidth
                  onClick={editar ? editartabla : crearConfiguracion}
                  startIcon={<SaveIcon />}
                >
                  {editar ? 'Actualizar' : 'Guardar'}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};
