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

export interface Concepto {
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
  plan: any;
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
  nombre_fuente: any;
  vano_1: any;
  vano_2: any;
  vano_3: any;
  vano_4: any;
  vadicion1: any;
  vadicion2: any;
  vadicion3: any;
  vadicion4: any;
  valor_total: any;
  id_plan: any;
}

// export const Resultados: React.FC = () => {
export const FuentesScreen: React.FC = () => {
  const initialFormData: FormData = {
    eje: '',
    meta: '',
    plan: '',
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
    nombre_fuente: '',
    vano_1: '',
    vano_2: '',
    vano_3: '',
    vano_4: '',
    vadicion1: false,
    vadicion2: false,
    vadicion3: false,
    vadicion4: false,
    valor_total: '',
    id_plan: '',
  };
  const [conceptoPoai, setConceptoPoai] =
    useState<ConceptoPoai>(initialConceptoPoai);


    const formatCurrency = (value: string) => {
      if (!value) return '';
      return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
      }).format(Number(value));
    };
    const handleInputChange = (event: any) => {
      const { name, value } = event.target;
    
      const numberFields = ['vano_1', 'vano_2', 'vano_3', 'id_plan', 'vano_4', 'valor_total'];
      const booleanFields = ['vadicion1', 'vadicion2', 'vadicion3', 'vadicion4'];
      const currencyFields = ['vano_1', 'vano_2', 'vano_3', 'vano_4',"valor_total"]; // Lista de campos que deben formatearse como moneda
    
      const convertValue = (name: string, value: unknown): any => {
        if (numberFields.includes(name)) {
          return value === '' ? null : Number(value);
        } else if (booleanFields.includes(name)) {
          return value === 'true' || value === '1' ? true : false;
        } else {
          return value;
        }
      };
    
      let formattedValue = value;
      if (currencyFields.includes(name)) {
        formattedValue = value.replace(/\D/g, ''); // Elimina caracteres no numéricos
      }
    
      setConceptoPoai({ ...conceptoPoai, [name as string]: convertValue(name as string, formattedValue) });
    };

    
    // const handleInputChange = (event: any ) => {
    //   const { name, value } = event.target;
    
    //   const numberFields = ['vano_1', 'vano_2', 'vano_3', 'id_plan', 'vano_4', 'valor_total'];
    //   const booleanFields = ['vadicion1', 'vadicion2','vadicion3','vadicion4'];
    
    //   const convertValue = (name: string, value: unknown): any => {
    //     if (numberFields.includes(name)) {
    //       return value === '' ? null : Number(value);
    //     } else if (booleanFields.includes(name)) {
    //       return value === 'true' || value === '1' ? true : false;
    //     } else {
    //       return value;
    //     }
    //   };
    
    //   setConceptoPoai({ ...conceptoPoai, [name as string]: convertValue(name as string, value) });
    // };

  const [selecTodosId, setSelecTodosId] = useState<any>('');
  
  useEffect(() => {
    if (selecTodosId) {
      setConceptoPoai({
        id_plan: formData.plan,
        nombre_fuente: selecTodosId.nombre_fuente,
        vano_1: selecTodosId.vano_1,
        vano_2: selecTodosId.vano_2,
        vano_3: selecTodosId.vano_3,
        vano_4: selecTodosId.vano_4,
        vadicion1: selecTodosId.vadicion1,
        vadicion2: selecTodosId.vadicion2,
        vadicion3: selecTodosId.vadicion3,
        vadicion4: selecTodosId.vadicion4,
        valor_total: selecTodosId.valor_total,
      });
    }
  }, [selecTodosId]);
  


  const [abrir0, setabrir0] = useState(false);
  const [abrir1, setabrir1] = useState(false);
 
  const [Historico, setHistorico] = useState<Concepto[]>([]);
  const fetchHistorico = async (): Promise<void> => {
    try {
      const url = `seguimiento-planes/consultar-fuentes-financiacion-indicadores-id-plan/${formData.plan}/`;

      // `/seguimiento-planes/consultar-conceptos-poai-lista/?id_plan=${formData.plan}&id_proyecto=${formData.proyecto}&id_indicador=${formData.indicador}&id_meta=${formData.meta}`
      const res = await api.get(url);
      const HistoricoData: Concepto[] = res.data?.data || [];
      setHistorico(HistoricoData);
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
      field: 'nombre_fuente',
      headerName: 'Fuente de funanciación ',
      minWidth: 400,
    },
    {
      field: 'vano_1',
      headerName: 'Valor añor 1',
      minWidth: 300,
      renderCell: (params: any) => {
        // Formatear el valor a pesos colombianos
        const valorFormateado = new Intl.NumberFormat('es-CO', {
          style: 'currency',
          currency: 'COP',
          minimumFractionDigits: 0, // Ajusta según la precisión deseada
        }).format(params.value);
        return <>{valorFormateado}</>;
      },
    },
    {
      field: 'vano_2',
      headerName: 'Valor añor 2',
      minWidth: 300,
      renderCell: (params: any) => {
        // Formatear el valor a pesos colombianos
        const valorFormateado = new Intl.NumberFormat('es-CO', {
          style: 'currency',
          currency: 'COP',
          minimumFractionDigits: 0, // Ajusta según la precisión deseada
        }).format(params.value);
        return <>{valorFormateado}</>;
      },
    },

    {
      field: 'vano_3',
      headerName: 'Valor añor 3',
      minWidth: 300,
      renderCell: (params: any) => {
        // Formatear el valor a pesos colombianos
        const valorFormateado = new Intl.NumberFormat('es-CO', {
          style: 'currency',
          currency: 'COP',
          minimumFractionDigits: 0, // Ajusta según la precisión deseada
        }).format(params.value);
        return <>{valorFormateado}</>;
      },
    },
    {
      field: 'vano_4',
      headerName: 'Valor añor 4',
      minWidth: 300,
      renderCell: (params: any) => {
        // Formatear el valor a pesos colombianos
        const valorFormateado = new Intl.NumberFormat('es-CO', {
          style: 'currency',
          currency: 'COP',
          minimumFractionDigits: 0, // Ajusta según la precisión deseada
        }).format(params.value);
        return <>{valorFormateado}</>;
      },
    },

    {
      field: 'vadicion1',
      headerName: 'Adición año 1',
      minWidth: 300,
      renderCell: (params: GridRenderCellParams<boolean>) => {
        return <>{params.value ? 'Sí' : 'No'}</>;
      },
    },
    {
      field: 'vadicion2',
      headerName: 'Adición año 2',
      minWidth: 300,
      renderCell: (params: GridRenderCellParams<boolean>) => {
        return <>{params.value ? 'Sí' : 'No'}</>;
      },
    },
    {
      field: 'vadicion3',
      headerName: 'Adición año 3',
      minWidth: 300,
      renderCell: (params: GridRenderCellParams<boolean>) => {
        return <>{params.value ? 'Sí' : 'No'}</>;
      },
    },
    {
      field: 'vadicion4',
      headerName: 'Adición año 4',
      minWidth: 300,
      renderCell: (params: GridRenderCellParams<boolean>) => {
        return <>{params.value ? 'Sí' : 'No'}</>;
      },
    },

    {
      field: 'valor_total',
      headerName: 'Valor total',
      minWidth: 300,
      renderCell: (params: any) => {
        // Formatear el valor a pesos colombianos
        const valorFormateado = new Intl.NumberFormat('es-CO', {
          style: 'currency',
          currency: 'COP',
          minimumFractionDigits: 0, // Ajusta según la precisión deseada
        }).format(params.value);
        return <>{valorFormateado}</>;
      },
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
    }
    
   
  ];

  
  const [planes, setPlanes] = useState<Planes[]>([]);
 

  useEffect(() => {
    fetplames({ setPlanes });
  }, []);

  const transformEmptyFieldsToNull = (obj: any) => {
    const result: any = {};
    for (const key in obj) {
      if (obj[key] === '') {
        result[key] = null;
      } else {
        result[key] = obj[key];
      }
    }
    return result;
  };

  //actualizar
  const editartabla = async () => {
    try {
      
      const conceptoPoaiToSend = transformEmptyFieldsToNull(conceptoPoai);
      const url = `seguimiento-planes/actualizar-fuentes-financiacion-indicadores/${selecTodosId.id_fuente}/`;
      const res = await api.put(url, conceptoPoaiToSend);
      console.log('Configuración actualizada con éxito', res.data);
      control_success('Editado correctamente');
      fetchHistorico();
      setabrir1(false)
    } catch (error: any) {
      console.error('Error al actualizar la configuración', error);
      control_error(error.response.data.detail);
    }
  };

  //crear
  const crearConfiguracion = async () => {
    try {
      const conceptoPoaiToSend = transformEmptyFieldsToNull(conceptoPoai);

      const url = 'seguimiento-planes/crear-fuentes-financiacion-indicadores/';
      const res = await api.post(url, conceptoPoaiToSend);
      console.log('Formulario creado con éxito', res.data);
      control_success('Formulario creado con éxito');
      setConceptoPoai(initialConceptoPoai);
      fetchHistorico();
      setabrir1(false)
    } catch (error: any) {
      console.error('Error al crear el formulario', error);
      control_error(error.response.data.detail);
    }
  };

  const handlecrear = () => {
    setabrir1(true);
    seteditar(false);

    setConceptoPoai({
      id_plan: formData.plan,
      nombre_fuente: "",
      vano_1: "",
      vano_2: "",
      vano_3: "",
      vano_4: "",
      vadicion1: false,
      vadicion2: false,
      vadicion3: false,
      vadicion4: false,
      valor_total: "",
    });
  };

  const handlecerrar = () => {
    setabrir1(false);
  };

  const handleLimpiarClick = () => {
    setConceptoPoai((prevData: any) => ({
      ...prevData,
      id_plan: formData.plan,
      nombre_fuente: "",
      vano_1: "" ,
      vano_2: "" ,
      vano_3: "" ,
      vano_4: "",
      vadicion1: false,
      vadicion2: false,
      vadicion3: false,
      vadicion4: false,
      valor_total: "" ,
     
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
      id_plan: formData.plan,
    }));
  }, [formData.plan]);

  const limpiartodo = (): void => {
   setFormData(initialFormData)
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
          <Title title="Fuentes de Financiación" />
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
          <Title title="Seleccione el Plan de Acción Institucional " />
        </Grid>
        {/* {selectedConceptoId} */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small">
            <InputLabel id="si-no-select-label"> Nombre de plan</InputLabel>
            <Select
              name="plan"
              // disabled
              label="Nombre de plan"
              value={formData.plan}
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
        {/* validar el buscar en disable  */}
{/* filtro ,en valor se agregan dos .00 al crear  */}
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
              startIcon={<SearchOutlined />}
              variant="contained"
              fullWidth
              disabled={!formData.plan}
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
            title="Resultados de la Búsqueda Fuentes de Financiación "
            columns={columns ?? []}
            rows={Historico ?? []}
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
                Agregar fuente 
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
              <Title title="Agregar Fuente de Financiación" />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel shrink id="si-no-select-label">
                  Fuente de financiación
                </InputLabel>
                <Select
                  name="nombre_fuente"
                  value={conceptoPoai.nombre_fuente}
                  onChange={handleInputChange}
                  label="Fuente de financiación"
                >
                  {fuente.map((unidad: any) => (
                    <MenuItem key={unidad.id_fuente} value={unidad.nombre_fuente}>
                      {unidad.nombre_fuente}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
              InputLabelProps={{
                shrink: true,
              }}
                fullWidth
                size="small"
                variant="outlined"
                label="Valor total"
                name="valor_total"
                value={formatCurrency(conceptoPoai.valor_total)}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                size="small"
                variant="outlined"
                label="Valor añor 1"
                name="vano_1"
                value={formatCurrency(conceptoPoai.vano_1)}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                size="small"
                variant="outlined"
                label="Valor añor 2"
                name="vano_2"
                value={formatCurrency(conceptoPoai.vano_2)}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                size="small"
                variant="outlined"
                label="Valor añor 3"
                name="vano_3"
                value={formatCurrency(conceptoPoai.vano_3)}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                size="small"
                variant="outlined"
                label="Valor añor 4"
                name="vano_4"
                value={formatCurrency(conceptoPoai.vano_4)}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <FormControl  fullWidth size="small">
                <InputLabel id="si-no-select-label" shrink> Adición año 1 </InputLabel>
                <Select
                  fullWidth
                  size="small"
                  variant="outlined"
                  label="Adicion año 1"
                  name="vadicion1" 
                  value={conceptoPoai.vadicion1}
                  onChange={handleInputChange}
                  
                >
                  <MenuItem value="true"> Si </MenuItem>
                  <MenuItem value="false"> No </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={3}>
             <FormControl fullWidth size="small">
                <InputLabel shrink id="si-no-select-label"> Adición año 2 </InputLabel>
                <Select
                  fullWidth
                  size="small"
                  variant="outlined"
                  label="Adicion año 2"
                  name="vadicion2"
                  value={conceptoPoai.vadicion2}
                  onChange={handleInputChange}
                >
                  <MenuItem value="true"> Si </MenuItem>
                  <MenuItem value="false"> No </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
            <FormControl fullWidth size="small">
                <InputLabel shrink id="si-no-select-label"> Adición año 3 </InputLabel>
                <Select
                  fullWidth
                  size="small"
                  variant="outlined"
                  label="Adicion año 3"
                  name="vadicion3"
                  value={conceptoPoai.vadicion3}
                  onChange={handleInputChange}
                >
                  <MenuItem value="true"> Si </MenuItem>
                  <MenuItem value="false"> No </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={3}>
            <FormControl fullWidth size="small">
                <InputLabel  shrink id="si-no-select-label"> Adición año 4 </InputLabel>
                <Select
                  fullWidth
                  size="small"
                  variant="outlined"
                  label="Adicion año 4"
                  name="vadicion4"
                  value={conceptoPoai.vadicion4}
                  onChange={handleInputChange}
                >
                  <MenuItem value="true"> Si </MenuItem>
                  <MenuItem value="false"> No </MenuItem>
                </Select>
              </FormControl>
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
