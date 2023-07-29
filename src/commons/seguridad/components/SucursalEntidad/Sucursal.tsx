import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Grid, IconButton } from '@mui/material';
 import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState, type FC, } from 'react';
import { api } from '../../../../api/axios';
 import { SucursalActuaizar } from './SucursalActuaizar';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import Swal from 'sweetalert2';
import { SucursalEntidad } from './SucursalEntidad';
 


export interface ISucursalEmpresa {
    id_sucursal_empresa: number;
    numero_sucursal: number;
    descripcion_sucursal: string;
    direccion: string;
   direccion_sucursal_georeferenciada: string | null;
    municipio: string | null;
  pais_sucursal_exterior: string | null;
  direccion_notificacion: string;
  direccion_notificacion_referencia: string | null;
  municipio_notificacion: string | null;
  email_sucursal: string;
  telefono_sucursal: string;
  es_principal: boolean;
  activo: boolean;
  item_ya_usado: boolean;
  id_persona_empresa: number;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Sucursal: FC = () => {
    // eslint-disable-next-line @typescript-eslint/naming-convention 
    const initialData: ISucursalEmpresa[] = [];
  const [selected_id, setselected_id] = useState<number | null>(null);
  const [data_entidad, setdata_entidad] = useState<ISucursalEmpresa[]>(initialData);
  
    // eslint-disable-next-line @typescript-eslint/naming-convention 
  const fetchAndUpdateData = async (): Promise<void> => {
    try {
      const url = "/transversal/sucursales/sucursales-empresa-lista/3";
      const res = await api.get(url);
      const sucursales_data = res.data.data;
      setdata_entidad(sucursales_data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    // Fetch data on initial component mount
    fetchAndUpdateData().catch((error) => {
      console.error(error);
    });

    // Set up interval to fetch data every 5 seconds
    const interval = setInterval(() => {
      fetchAndUpdateData().catch((error) => {
        console.error(error);
      });
    }, 50);

    // Clear the interval when the component unmounts
    return () => {clearInterval(interval)};
  }, []);

  const fetch_dataget = async (): Promise<void> => {
    try {
      const url = "/transversal/sucursales/sucursales-empresa-lista/3";
      const res = await api.get(url);
      const sucursales_data = res.data.data;
      setdata_entidad(sucursales_data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetch_dataget().catch((error) => {
      console.error(error);
    });
  }, []);

  const handle_delete_sucursal = (id: number): void => {
    void Swal.fire({
      title: '¿Está seguro de eliminar esta sucursal?',
      showDenyButton: true,
      confirmButtonText: `Sí`,
      denyButtonText: `No`,
      confirmButtonColor: '#042F4A',
      cancelButtonColor: '#DE1616',
      icon: 'question',
      customClass: {
        container: 'my-swal',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        void api.delete(`/transversal/sucursales/sucursales-empresas-borrar/${id}/`)
          .then((res) => {
           void fetch_dataget();
          })
          .catch((error) => {
            console.error(error);
          });
      } else if (result.isDenied) {
        void Swal.fire({
          title: 'La sucursal no se ha eliminado',
          icon: 'info',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#042F4A',
          customClass: {
            container: 'my-swal',
          },
        });
      }
    });
  };

  const columns = [
    // { field: "id_sucursal_empresa", headerName: "ID Sucursal", width: 150 },
    { field: "numero_sucursal", headerName: "Número de Sucursal", width: 200, flex: 1, },
    { field: "descripcion_sucursal", headerName: "Descripción", width: 200, flex: 1, },
    { field: "direccion", headerName: "Dirección", width: 200, flex: 1, },
    // { field: "direccion_sucursal_georeferenciada", headerName: "Dirección Georreferenciada", width: 250 },
    // { field: "municipio", headerName: "Municipio", width: 150 },
    // { field: "pais_sucursal_exterior", headerName: "País", width: 150 },
    // { field: "direccion_notificacion", headerName: "Dirección de Notificación", width: 250 },
    // { field: "municipio_notificacion", headerName: "Municipio de Notificación", width: 200 },
    // { field: "email_sucursal", headerName: "Email", width: 200 },
    // { field: "telefono_sucursal", headerName: "Teléfono", width: 150 },
    { field: "es_principal", headerName: "Es Principal", width: 150, flex: 1, },
    // { field: "activo", headerName: "Activo", width: 120 },
    {
      field: "accion",
      headerName: "Acción",
      width: 150, flex: 1,
      renderCell: (params: any) => (
        <>
          <IconButton
            color="primary"
            aria-label="Editar"
            onClick={() => {
              setselected_id(params.row.id_sucursal_empresa);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="primary"
            aria-label="Eliminar"
            onClick={() => {
              handle_delete_sucursal(params.row.id_sucursal_empresa);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px', mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
          marginTop: '20px',
          marginLeft: '-5px',
        }}
      >
        {/* <Crear /> */}
        {/* sucursal entidad ///////////////////// */}
        <SucursalEntidad />


        {/*  direcciones      //////////////////// */}
        {/* <SucursalDirecciones /> */}

        <SucursalActuaizar selected_id={selected_id} />

        {/* tabla SUCURSAL         ///////////////////// */}
        <Grid item xs={12}>
          <DataGrid
            density="compact"
            autoHeight
            columns={columns}
            rows={data_entidad}
            pageSize={10}
            rowsPerPageOptions={[10]}
            getRowId={(row) => row.id_sucursal_empresa}
          />
        </Grid>

      </Grid>
    </>
  );
};

