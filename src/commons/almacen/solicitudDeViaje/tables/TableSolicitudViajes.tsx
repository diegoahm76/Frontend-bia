/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/naming-convention */
import { Grid } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { v4 as uuidv4 } from 'uuid';
import { data_solicitud_viaje } from "../interfaces/types";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { elimiar_solicitud_viaje } from "../thunks/viajes";
import { useAppDispatch } from "../../../../hooks";
import { control_success } from "../../../../helpers";
import Swal from "sweetalert2";
import { FC } from "react";



interface props_table {
  data_row_solicitud_viaje: data_solicitud_viaje[];
  set_refrescar_tabla: React.Dispatch<React.SetStateAction<boolean>>;
  refrescar_tabla: boolean;
  obtener_solicitudes_fc: ()=> void;
}

interface custom_column extends GridColDef {
  renderCell?: (params: { row: data_solicitud_viaje }) => React.ReactNode;
}

const TableSolicitudViajes: FC<props_table> = ({obtener_solicitudes_fc,data_row_solicitud_viaje,set_refrescar_tabla,refrescar_tabla}) => {
  const dispatch = useAppDispatch();


  const ver_solicitud = (params: data_solicitud_viaje) => {
    console.log(params)
  }

  const eliminar_solicitud = async(params: data_solicitud_viaje) => {
    const modal_confirmar_eliminacion = await Swal.fire({
      title: '¿Está seguro que desea eliminar esta solicitud?',
      showDenyButton: true,
      confirmButtonText: `Si`,
      denyButtonText: `Cancelar`,
      confirmButtonColor: '#042F4A',
      cancelButtonColor: '#DE1616',
      icon: 'question',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(elimiar_solicitud_viaje(params.eliminar)).then((response: { success: boolean, detail: string, data: any }) => {
          if (response.success) {
            control_success('Se elimino la solicitud correctamente');
          }
        })
        return true;
      } else if(result.isDenied){
        return false;
      }
    });
    if(modal_confirmar_eliminacion){
      obtener_solicitudes_fc();
      set_refrescar_tabla(!refrescar_tabla);
    }    
  }

  const columns: custom_column[] = [
    {field: 'estado_solicitud', headerName:'Estado', width:150, flex:1},
    {field: 'fecha_solicitud', headerName:'Fecha Solicitud', width:150, flex:1},
    {field: 'nro_pasajeros', headerName:'N° Pasajeros', width:150, flex:1},
    {field: 'fecha_partida', headerName:'Fecha Salida', width:150, flex:1},
    {field: 'fecha_retorno', headerName:'Fecha Retorno', width:150, flex:1},
    {field: 'cod_municipio', headerName:'Municipio Destino', width:150, flex:1},
    {
      field: 'eliminar',
      headerName: 'Eliminar',
      width: 80,
      align: 'center',
      headerAlign: 'center',
      renderCell: ((params) => {
        return <DeleteForeverIcon
          sx={{ cursor: 'pointer', fontSize: '28px', display: params.row.estado_solicitud === 'Finalizado' ? 'none' : 'inline-block' }}
          onClick={() => eliminar_solicitud(params.row)}
        />
      }),
    },
    {
      field: 'ver',
      headerName: 'Ver',
      width: 80,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <VisibilityIcon
          sx={{ cursor: 'pointer', fontSize: '28px', display: params.row.estado_solicitud === 'Finalizada' || params.row.estado_solicitud === 'Respondida' ? 'inline-block' : 'none'}}
          onClick={() => ver_solicitud(params.row)}
        />
      ),
    },
    {
      field: 'editar',
      headerName: 'Editar',
      width: 80,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <SaveAsIcon
          sx={{ cursor: 'pointer', fontSize: '28px', display: params.row.estado_solicitud === 'Rechazada' ? 'inline-block' : 'none' }}
          onClick={() => ver_solicitud(params.row)}
        />
      ),
    }
  ]

  return (
    <Grid container>
      <DataGrid
      style={{margin:'15px 0px'}}
      density="compact"
      autoHeight
      rows={data_row_solicitud_viaje ?? []}
      columns={columns ?? []}
      pageSize={5}
      rowHeight={75}
      rowsPerPageOptions={[10]}
      experimentalFeatures={{ newEditingApi: true }}
      getRowId={() => {
        try {
          return uuidv4();
        } catch (error) {
          console.error(error);
          //? Genera un ID de respaldo único
          return `fallback-id-${Date.now()}-${Math.random()}`;
        }
      }}
    />
    </Grid>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default TableSolicitudViajes;