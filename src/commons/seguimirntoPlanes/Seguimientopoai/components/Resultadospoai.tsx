/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { api } from '../../../../api/axios';
import { RenderDataGrid } from '../../../gestorDocumental/tca/Atom/RenderDataGrid/RenderDataGrid';
import { ResultadosProps } from '../interface/types';
import { v4 as uuidv4 } from 'uuid';
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';

export const miEstilo = {
  p: '20px',
  mb: '20px',
  m: '10px 0 20px 0',
  position: 'relative',
  borderRadius: '15px',
  background: '#FAFAFA',
  boxShadow: '0px 3px 6px #042F4A26',
};

interface Modalidad {
  id_modalidad: number;
  nombre_modalidad: string;
  codigo_modalidad: string;
  activo: boolean;
  item_ya_usado: boolean;
  registro_precargado: boolean;
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
export interface SucursalEmpresa {
  id_sucursal_empresa: number;
  numero_sucursal: number;
  descripcion_sucursal: string;
  direccion: string;
}
// eslint-disable-next-line @typescript-eslint/naming-convention


export interface UnidadOrganizaciona {
  nombre: string;
  id_unidad_organizacional: number;
}

export const Resultadospoai: React.FC<ResultadosProps> = ({selecTodosId, ConsultarSeguimiento ,consultarSeguimiento, seteditarr,editartabla, seteditar, setselectid, handle ,selectedConceptoId }) => {
  // const [ConsultarSeguimiento, setconsultarSeguimiento] = useState<Seguimiento[]>([]);

  // const consultarSeguimiento = async (): Promise<void> => {
  //   try {
  //     const url = `/seguimiento-planes/consultar-seguimiento-poai/${selectedConceptoId}/`;
  //     const res = await api.get(url);
  //     const HistoricoData: Seguimiento[] = res.data?.data || [];
  //     setconsultarSeguimiento(HistoricoData);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  useEffect(() => {
     consultarSeguimiento();
  }, [selectedConceptoId]);

  // const [selectid, setselectid] = useState('');
  const [modalidad, fetmodalidad] = useState<Modalidad[]>([]);

  const fetcodigoo = async () => {
    try {
      const url = 'seguimiento-planes/consultar-modalidades/';
      const res = await api.get(url);
      const unidadesData = res.data.results; // Ajusta la estructura según tus datos
      fetmodalidad(unidadesData);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetcodigoo();
  }, []);
  

  const [modalidades, setModalidades] = useState<Modalidad[]>([]);
  const [rows, setRows] = useState<any[]>([]);

  const fetchModalidades = async () => {
    try {
      const url = 'seguimiento-planes/consultar-modalidades/';
      const res = await api.get(url);
      const modalidadesData = res.data.results; // Ajusta la estructura según tus datos
      setModalidades(modalidadesData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchModalidades();
  }, []);

  const modalidadMap = (modalidades ?? []).reduce((acc, modalidad) => {
    acc[modalidad.id_modalidad] = modalidad.nombre_modalidad;
    return acc;
  }, {} as Record<number, string>);




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

  // useEffect(() => {
  //   fetfuented();
  // }, []);




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


  const columns = [
    { field: 'descripcion', headerName: 'Descripción', minWidth: 400 },
    // { field: 'id_prioridad', headerName: 'Prioridad', minWidth: 150 },
    {
      field: 'id_prioridad',
      headerName: 'Prioridad',
      minWidth: 150,
      valueGetter: (params:any) => {
        switch (params.value) {
          case 1:
            return 'ALTA';
          case 2:
            return 'MEDIA';
          case 3:
            return 'BAJA';
          default:
            return '';
        }
      },
    },
    { field: 'codigo_pre', headerName: 'Código PPTAL', minWidth: 400 },
    { field: 'cuenta', headerName: 'Cuenta', minWidth: 500 },
    {
      field: 'id_unidad_organizacional',
      headerName: 'Responsable',
      minWidth: 300,
      valueGetter: (params:any) => {
        return unidadesMap[params.value] || params.value;
      },
    },
    
    // { field: 'id_modalidad', headerName: 'Modalidad de contratación', minWidth: 300 },
    {
      field: 'id_modalidad',
      headerName: 'Modalidad de contratación',
      minWidth: 400,
      valueGetter: (params:any) => {
        // return modalidadMap[params.value] || params.value;
        return modalidadMap[params.value] || selecTodosId.nombre_modalidad;

        
      },
    },
    
    // { field: 'id_fuente1', headerName: 'FTE financiación 1', minWidth: 300 },

    {
      field: 'id_fuente1',
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
    
    { field: 'id_fuente2', headerName: 'FTE financiación 2 ', minWidth: 400 ,   valueGetter: (params:any) => {
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
    { field: 'id_fuente3', headerName: 'FTE financiación 3', minWidth: 400,   valueGetter: (params:any) => {
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
    { field: 'id_fuente4', headerName: 'FTE financiación 4 ', minWidth: 400 ,   valueGetter: (params:any) => {
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
      field: 'Acciones',
      headerName: 'Acciones',
      minWidth: 200,
      renderCell: (params: any) => (
        <>
          <IconButton color="primary" aria-label="Ver"
          //  onClick={handle}
          onClick={() => { 
             setselectid(params.row);
            seteditarr();
          }}
           >
            <EditIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <>
     

      <RenderDataGrid
        title="Resultados de la búsqueda de seguimiento POAI"
        columns={columns ?? []}
        rows={ConsultarSeguimiento ?? []}
      />
    </>
  );
};
