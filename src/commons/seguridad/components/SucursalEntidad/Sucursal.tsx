/* eslint-disable @typescript-eslint/no-floating-promises */
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Grid, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState, type FC } from 'react';
import { api } from '../../../../api/axios';
import { SucursalActuaizar } from './SucursalActuaizar';
import Swal from 'sweetalert2';
import { SucursalEntidad } from './SucursalEntidad';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ISucursalEmpresa } from './utils/interfac';
import { RenderDataGrid } from '../../../gestorDocumental/tca/Atom/RenderDataGrid/RenderDataGrid';


// eslint-disable-next-line @typescript-eslint/naming-convention
export const Sucursal: FC = () => {
  const initial_data: ISucursalEmpresa[] = [];
  const [selected_id, setselected_id] = useState<number | null>(null);
  const [data_entidad, setdata_entidad] = useState<ISucursalEmpresa[]>(initial_data);
  const [new_number, setnew_number] = useState<number>(0)

  const fetchand_update_data = async (): Promise<void> => {
    try {
      const url = "/transversal/sucursales/sucursales-empresa-lista/3";
      const res = await api.get(url);
      const sucursales_data = res.data.data;
      setdata_entidad(sucursales_data);

    } catch (error) {
      // console.error(error);
    }
  };


  // useEffect(() => {
  //   fetchand_update_data().catch((error) => {
  //     console.error(error);
  //   });


  //   const interval = setInterval(() => {
  //     fetch_dataget();

  //     fetchand_update_data().catch((error) => {
  //       console.error(error);
  //     });
  //   }, 5800);

  //   return () => { clearInterval(interval) };
  // }, []);

  const fetch_dataget = async (): Promise<void> => {
    try {
      const url = "/transversal/sucursales/sucursales-empresa-lista/3";
      const res = await api.get(url);
      const sucursales_data = res.data.data;
      setdata_entidad(sucursales_data);
      // fetch_dataget();
      const max_numero_sucursal = Math.max(...sucursales_data.map((sucursal: any) => sucursal.numero_sucursal));

      setnew_number(max_numero_sucursal + 1);
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
    const sucursaltodelete = data_entidad.find((sucursal) => sucursal.id_sucursal_empresa === id);
    const item_ya_usado = sucursaltodelete?.item_ya_usado ?? false;
    if (item_ya_usado) {
      void Swal.fire({
        title: 'No se puede eliminar',
        text: 'Este item ya ha sido utilizado y no puede ser eliminado.',
        icon: 'info',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#042F4A',
        customClass: {
          container: 'my-swal',
        },
      });
      return;
    }


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
          // await fetchand_update_data()
          .then((res) => {
            void fetch_dataget();
            fetch_dataget();
            fetchand_update_data();
            setselected_id(null);
            void fetch_dataget();
            fetch_dataget();
          })
          .catch((error) => {
            console.error(error);
            void fetch_dataget();
            fetch_dataget();
            fetchand_update_data();
            setselected_id(null);
            void fetch_dataget();
            fetch_dataget();
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
    { field: "numero_sucursal", headerName: "Número de Sucursal", width: 200, flex: 1 },
    { field: "descripcion_sucursal", headerName: "Descripción", width: 200, flex: 1 },
    { field: "direccion", headerName: "Dirección", width: 200, flex: 1 },
    {
      field: "es_principal", headerName: "Es Principal", width: 150, flex: 1, renderCell: (params: any) => (
        <>{params.value === true ? "Sí" : "No"}</>
      ),
    },
    // { field: "item_ya_usado", headerName: "item_ya_usado", width: 150, flex: 1 },

    {
      field: "accion",
      headerName: "Acción",
      width: 150,
      flex: 1,
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

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const esPrincipalExists = data_entidad.some((sucursal) => sucursal.es_principal);


  return (
    <>
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
        {/* sucursal entidad */}
        <SucursalEntidad />
        <Grid item xs={12}>

          {/* <DataGrid
            density="compact"
            autoHeight
            columns={columns ?? []}
            rows={data_entidad ?? []}
            pageSize={10}
            rowsPerPageOptions={[10]}
            getRowId={(row) => row.id_sucursal_empresa}
          /> */}
        </Grid>

        <RenderDataGrid
          title={`Listado de sucursales`}
          columns={columns ?? []}
          rows={data_entidad ?? []}
        />

        <SucursalActuaizar fetch_dataget={fetch_dataget} setnew_number={setnew_number} fetchand_update_data={fetchand_update_data}
          sucursal={Sucursal} data_entidad={data_entidad} setselected_id={setselected_id} selected_id={selected_id} new_number={new_number}
          esPrincipalExists={esPrincipalExists} />
      </Grid>
    </>
  );
};
