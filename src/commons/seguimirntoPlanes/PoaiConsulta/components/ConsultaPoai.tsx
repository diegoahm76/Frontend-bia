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
  ButtonGroup,
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
import { DataGrid, GridRenderCellParams ,type GridColDef } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';

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
// import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';

export interface Rubrog {
  cod_pre: any;
  cuenta: any;
  id_plan: any;
  id_rubro: any;
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
  plans: any;
  inicio: any;
  fin: any;
 
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
export const ConsultaPoai: React.FC = () => {
  const initialFormData: FormData = {
    plans: '',
    inicio: '',
    fin: '',
  
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

    const numberFields = [''];
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
      const url = 
      `seguimiento-planes/consultar-seguimiento-poai-reporte/?id_plan=${formData.plans}&fecha_registro_inicio=${formData.inicio}&fecha_registro_fin=${formData.fin}`;
      
      // `seguimiento/planes/consultar-parametrica-rubros-id-plan/${formData.plans}/`;

       const res = await api.get(url);
      const HistoricoData: Rubrog[] = res.data?.data || [];
      setRubro(HistoricoData);
      setabrir0(true);
      control_success('Datos encontrados con exito');
    } catch (error: any) {
      // console.error(error);
      setabrir0(true);
      control_error(error.response.data.detail);
    }
  };
  const [editar, seteditar] = useState(false);

  const handlcerrar = () => {
    setabrir1(false);
    setabrir0(false);
  };

  const [fuentes, setFuentes] = useState<Fuente[]>([]);

  const fetchFuentes = async () => {
    try {
      const url = 'seguimiento-planes/consultar-fuentes-financiacion-indicadores-lista/';
      const res = await api.get(url);
      const fuentesData = res.data.data;
      setFuentes(fuentesData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFuentes();
  }, []);
  const fuenteMap = (fuentes ?? []).reduce((acc, fuente) => {
    acc[fuente.id_fuente] = fuente.nombre_fuente;
    return acc;
  }, {} as Record<number, string>);

  const [unidades, setUnidades] = useState<UnidadOrganizaciona[]>([]);
   

  const fetchUnidades = async () => {
    try {
      const url = '/gestor/consecutivos-unidades/unidades_organigrama_actual/get/';
      const res = await api.get(url);
      const unidadesData = res.data.data;
      setUnidades(unidadesData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUnidades();
  }, []);

  const unidadesMap = (unidades ?? []).reduce((acc, unidad) => {
    acc[unidad.id_unidad_organizacional] = unidad.nombre;
    return acc;
  }, {} as Record<number, string>);

  const total = [
    {
      field: 'nombre_plan',
      headerName: 'Nombre de plan',
      minWidth: 400,
    },

    {
      field: 'nombre_programa',
      headerName: 'Nombre de programa',
      minWidth: 400,
    },
    {
      field: 'nombre_proyecto',
      headerName: 'Nombre de proyecto',
      minWidth: 400,
    },

    {
      field: 'nombre_producto',
      headerName: 'Nombre de producto ',
      minWidth: 400,
    },
    {
      field: 'nombre_actividad',
      headerName: 'Nombre de actividad',
      minWidth: 400,
    },
    {
      field: 'nombre_indicador',
      headerName: 'Nombre de indicador',
      minWidth: 400,
    },

    {
      field: 'nombre_meta',
      headerName: 'Nombre de meta',
      minWidth: 400,
    },

    {
      field: 'nombre_concepto',
      headerName: 'Concepto  ',
      minWidth: 400,
    },

    {
      field: 'descripcion',
      headerName: 'Descripción',
      minWidth: 400,
    },

    {
      field: 'nombre_prioridad',
      headerName: 'Prioridad',
      minWidth: 400,
    },
    {
      field: 'codigo_pre',
      headerName: 'CODPRE',
      minWidth: 400,
    },

    {
      field: 'cuenta',
      headerName: 'Cuenta',
      minWidth: 400,
    },

    {
       // field: 'id_unidad_organizacional',
       field: 'nombre_responsable',
      headerName: 'Responsable',
      minWidth: 400,
      valueGetter: (params:any) => {
        return unidadesMap[params.value] || params.value;
      },
    },

    {
      field: 'codigo_modalidad',
      headerName: 'Modalidad',
      minWidth: 400,
    },

    {
      field: 'valor_inicial',
      headerName: 'Valor inicial',
      minWidth: 400,
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
      field: 'nombre_fuente1',
      headerName: 'FTE financiación 1',
      minWidth: 400,
      valueGetter: (params:any) => {
        return fuenteMap[params.value] || params.value;
      },
    },

    { field: 'valor_fte1', headerName: 'Valor 1', minWidth: 300 ,
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
    { field: 'adicion1', headerName: 'Adicción 1', minWidth: 300,
       renderCell: (params: GridRenderCellParams<boolean>) => {
      return <>{params.value ? 'Sí' : 'No'}</>;
    },
   },
    
    { field: 'nombre_fuente2', headerName: 'FTE financiación 2 ', minWidth: 400 ,   valueGetter: (params:any) => {
      return fuenteMap[params.value] || params.value;
    },},


    { field: 'valor_fte2', headerName: 'Valor 2', minWidth: 300,renderCell: (params: any) => {
      // Formatear el valor a pesos colombianos
      const valorFormateado = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0, // Ajusta según la precisión deseada
      }).format(params.value);

      return <>{valorFormateado}</>;
    }, },
    { field: 'adicion2', headerName: 'Adicción 2', minWidth: 300 ,renderCell: (params: GridRenderCellParams<boolean>) => {
      return <>{params.value ? 'Sí' : 'No'}</>;
    },},
    { field: 'nombre_fuente3', headerName: 'FTE financiación 3', minWidth: 400,   valueGetter: (params:any) => {
      return fuenteMap[params.value] || params.value;
    }, },
    { field: 'valor_fte3', headerName: 'Valor 3', minWidth: 300,renderCell: (params: any) => {
      // Formatear el valor a pesos colombianos
      const valorFormateado = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0, // Ajusta según la precisión deseada
      }).format(params.value);

      return <>{valorFormateado}</>;
    }, },
    { field: 'adicion3', headerName: 'Adicción 3', minWidth: 300,renderCell: (params: GridRenderCellParams<boolean>) => {
      return <>{params.value ? 'Sí' : 'No'}</>;
    }, },
    { field: 'nombre_fuente4', headerName: 'FTE financiación 4 ', minWidth: 400 ,   valueGetter: (params:any) => {
      return fuenteMap[params.value] || params.value;
    },},
    { field: 'valor_fte4', headerName: 'Valor 4', minWidth: 300 ,renderCell: (params: any) => {
      // Formatear el valor a pesos colombianos
      const valorFormateado = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0, // Ajusta según la precisión deseada
      }).format(params.value);

      return <>{valorFormateado}</>;
    },},
    { field: 'adicion4', headerName: 'Adicción 4', minWidth: 300 ,renderCell: (params: GridRenderCellParams<boolean>) => {
      return <>{params.value ? 'Sí' : 'No'}</>;
    }, },



    {
      field: 'valor_banco',
      headerName: 'Valor banco',
      minWidth: 400,
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
      field: 'valor_cdp',
      headerName: 'Valor CDP',
      minWidth: 400,
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
      field: 'valor_rp',
      headerName: 'Valor RP',
      minWidth: 400,
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
      field: 'valor_obligado',
      headerName: 'Valor obligado',
      minWidth: 400,
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
      field: 'fecha_terminacion',
      headerName: 'Fecha terminación',
      minWidth: 400,
    },

    {
      field: 'duracion',
      headerName: 'Duración',
      minWidth: 400,
    },
    {
      field: 'valor_mensual',
      headerName: 'Valor mensual',
      minWidth: 400,
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
      field: 'fecha_estimada',
      headerName: 'Fecha estimada',
      minWidth: 400,
    },
    {
      field: 'mes_proyectado',
      headerName: 'Mes poryectado',
      minWidth: 400,
    },
    {
      field: 'codigo_unsp',
      headerName: 'Codigo UNSP  ',
      minWidth: 400,
    },
    {
      field: 'lugar_ejecucion',
      headerName: 'Lugar de ejecución   ',
      minWidth: 400,
    },
    {
      field: 'numero_contrato',
      headerName: 'Numero de contrato ',
      minWidth: 400,
    },

    {
      field: 'numero_banco',
      headerName: 'Numero de banco',
      minWidth: 400,
    },
    {
      field: 'numero_rp',
      headerName: 'Numero RP ',
      minWidth: 400,
    },
    {
      field: 'fecha_rp',
      headerName: 'Fecha RP ',
      minWidth: 400,
    },
    {
      field: 'numero_cdp',
      headerName: 'Numero CDP ',
      minWidth: 400,
    },
    {
      field: 'fecha_cdp',
      headerName: 'Fecha CDP ',
      minWidth: 400,
    },
    {
      field: 'nombre_contratista',
      headerName: 'Nombre contratista ',
      minWidth: 400,
    },
    {
      field: 'observaciones_poai',
      headerName: 'Observaciones POAI  ',
      minWidth: 400,
    },
    {
      field: 'fecha_registro',
      headerName: 'Fecha registro ',
      minWidth: 400,
    },

    {
      field: 'valor_pagado',
      headerName: 'Valor pagado ',
      minWidth: 400,
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
      field: 'vseguimiento_paabanco',
      headerName: 'Valor seguimiento  PAA banco ',
      minWidth: 400,
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
      field: 'vseguimiento_paacdp',
      headerName: 'Valor seguimiento   PAACDP ',
      minWidth: 400,
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
      field: 'vseguimiento_paarp',
      headerName: 'Valor seguimiento   PAARP ',
      minWidth: 400,
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
      field: 'svseguimiento_paaobligado',
      headerName: 'Valor seguimiento   PAA obligado ',
      minWidth: 400,
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
      field: 'vseguimiento_paapagado',
      headerName: 'Valor seguimiento   PAA pagado ',
      minWidth: 400,
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
  ];

  const columns : GridColDef[] =  [
    {
      field: 'nombre_programa',
      headerName: 'Programa',
    
      minWidth: 550,
      flex: 1,
    },
    {
      field: 'nombre_proyecto',
      headerName: 'Proyecto',
      minWidth: 650,
    },
    {
      field: 'nombre_producto',
      headerName: 'Producto',
      minWidth: 550,
    },
    {
      field: 'nombre_actividad',
      headerName: 'Actividad',
      minWidth: 550,
    },
    {
      field: 'nombre_indicador',
      headerName: 'Indicador',
      minWidth: 550,
    },
    {
      field: 'nombre_meta',
      headerName: 'Meta',
      minWidth: 550,
    },
    {
      field: 'descripcion',
      headerName: 'Descripción',
      minWidth: 550,
    },
    {
      field: 'nombre_prioridad',
      headerName: 'Prioridad',
      minWidth: 400,
    },
    {
      field: 'codigo_pre',
      headerName: 'Codigo PPTAL',
      minWidth: 400,
    },

    {
      field: 'cuenta',
      headerName: 'Cuenta',
      minWidth: 400,
    },
    {
      // field: 'id_unidad_organizacional',
      field: 'nombre_responsable',

      
      headerName: 'Responsable',
      minWidth: 400,
      // valueGetter: (params:any) => {
      //   return unidadesMap[params.value] || params.value;
      // },
    },
    {
      field: 'nombre_concepto',
      headerName: 'Modalidad de contratación',
      minWidth: 400,
    },
    {
      field: 'nombre_fuente1',
      headerName: 'FTE financiación 1',
      minWidth: 400,
      valueGetter: (params:any) => {
        return fuenteMap[params.value] || params.value;
      },
    },

    { field: 'valor_fte1', headerName: 'Valor 1', minWidth: 300 ,
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
    { field: 'adicion1', headerName: 'Adicción 1', minWidth: 300,
       renderCell: (params: GridRenderCellParams<boolean>) => {
      return <>{params.value ? 'Sí' : 'No'}</>;
    },
   },
    
    { field: 'nombre_fuente2', headerName: 'FTE financiación 2 ', minWidth: 400 ,   valueGetter: (params:any) => {
      return fuenteMap[params.value] || params.value;
    },},


    { field: 'valor_fte2', headerName: 'Valor 2', minWidth: 300,renderCell: (params: any) => {
      // Formatear el valor a pesos colombianos
      const valorFormateado = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0, // Ajusta según la precisión deseada
      }).format(params.value);

      return <>{valorFormateado}</>;
    }, },
    { field: 'adicion2', headerName: 'Adicción 2', minWidth: 300 ,renderCell: (params: GridRenderCellParams<boolean>) => {
      return <>{params.value ? 'Sí' : 'No'}</>;
    },},
    { field: 'nombre_fuente3', headerName: 'FTE financiación 3', minWidth: 400,   valueGetter: (params:any) => {
      return fuenteMap[params.value] || params.value;
    }, },
    { field: 'valor_fte3', headerName: 'Valor 3', minWidth: 300,renderCell: (params: any) => {
      // Formatear el valor a pesos colombianos
      const valorFormateado = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0, // Ajusta según la precisión deseada
      }).format(params.value);

      return <>{valorFormateado}</>;
    }, },
    { field: 'adicion3', headerName: 'Adicción 3', minWidth: 300,renderCell: (params: GridRenderCellParams<boolean>) => {
      return <>{params.value ? 'Sí' : 'No'}</>;
    }, },
    { field: 'nombre_fuente4', headerName: 'FTE financiación 4 ', minWidth: 400 ,   valueGetter: (params:any) => {
      return fuenteMap[params.value] || params.value;
    },},
    { field: 'valor_fte4', headerName: 'Valor 4', minWidth: 300 ,renderCell: (params: any) => {
      // Formatear el valor a pesos colombianos
      const valorFormateado = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0, // Ajusta según la precisión deseada
      }).format(params.value);

      return <>{valorFormateado}</>;
    },},
    { field: 'adicion4', headerName: 'Adicción 4', minWidth: 300 ,renderCell: (params: GridRenderCellParams<boolean>) => {
      return <>{params.value ? 'Sí' : 'No'}</>;
    }, }, 
  ];

  const [planes, setPlanes] = useState<Planes[]>([]);

  useEffect(() => {
    fetplames({ setPlanes });
  }, []);
  const isFormValid = () => {
    return formData.plans && formData.inicio && formData.fin;
  };
  return (
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
          <Title title="Consulta de Seguimiento POAI" />
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
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            type="date"
            size="small"
            variant="outlined"
            label="Fecha de registro  "
            name="inicio"
            InputLabelProps={{ shrink: true }}

            value={formData.inicio}
            onChange={handleInputSelect}
          />
        </Grid>
        {/* {formData.inicio} */}
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            type="date"
            size="small"
            variant="outlined"
            label="Fecha fin "
            name="fin"
            InputLabelProps={{ shrink: true }}

            value={formData.fin}
            onChange={handleInputSelect}
          />
        </Grid>
        {/* {formData.fin} */}
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
              // disabled={!formData.plans}
              disabled={!isFormValid()}
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
            <Grid item xs={12}>
              <Title title="Resultados de la Búsqueda POAI" />
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
                <ButtonGroup style={{ margin: 5 }}>
                  {download_xls({ nurseries: Rubro, columns: total })}
                  {download_pdf({
                    nurseries: Rubro,
                    columns: total,
                    title: 'Mis alertas',
                  })}
                </ButtonGroup>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <DataGrid
                density="compact"
                autoHeight
                rows={Rubro ?? []}
                columns={columns ?? []}
                // getRowId={(row) => row.id_rubro}
                getRowId={(row) => uuidv4()}
                pageSize={5}
                getRowHeight={() => 'auto'}
              />
            </Grid>

            {/* <RenderDataGrid
            title="Resultados de la Búsqueda de Seguimiento POAI "
            columns={columns ?? []}
            rows={Rubro ?? []}
          /> */}

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

          {/* <RenderDataGrid
            title="Resultados de la Búsqueda de Seguimiento POAI"
            columns={total ?? []}
            rows={Rubro ?? []}
          /> */}
        </>
      )}
    </>
  );
};
