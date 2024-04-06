/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/naming-convention */
import { useEffect, useState } from 'react';
import { data_asignacion_vehiculos, data_row_asignacion_vehiculos } from '../interfaces/types';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { control_error, control_success } from '../../../../helpers';
import Swal from 'sweetalert2';
import { useAppDispatch } from '../../../../hooks';
import { elimiar_asignacion_vehiculo } from '../thunks/asignacion_vehiculos';
import { ButtonGroup, Grid } from '@mui/material';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';

interface custom_column extends GridColDef {
  renderCell?: (params: { row: data_asignacion_vehiculos }) => React.ReactNode;
}

interface props {
  data_asignacion_vehiculos: data_asignacion_vehiculos[];
  set_refrescar_tabla: React.Dispatch<React.SetStateAction<boolean>>;
  refrescar_tabla: boolean;
  obtener_asignaciones_vehiculos: () => void;
  refrescar_tabla_conductores: boolean;
  set_refrescar_tabla_conductores: React.Dispatch<React.SetStateAction<boolean>>;
}


const AsignacionVehiculos: React.FC<props> = ({
  data_asignacion_vehiculos,
  set_refrescar_tabla,
  refrescar_tabla,
  obtener_asignaciones_vehiculos,
  set_refrescar_tabla_conductores,
  refrescar_tabla_conductores}) => {
  const dispatch = useAppDispatch();


  const eliminar_asignacion = async(params: data_asignacion_vehiculos) => {
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
        dispatch(elimiar_asignacion_vehiculo(params.id_asignacion)).then((response: { success: boolean, detail: string, data: any }) => {
          if (response.success) {
            set_refrescar_tabla_conductores(!refrescar_tabla_conductores);
            control_success('Se elimino la solicitud correctamente');
          }
        });
        return true;
      } else if(result.isDenied){
        return false;
      }
    });
    if(modal_confirmar_eliminacion){
      obtener_asignaciones_vehiculos();
      set_refrescar_tabla(!refrescar_tabla);
    }    
  }

  const columns: custom_column[] = [
    { field: 'tipo_vehiculo', headerName: 'Tipo de vehículo', minWidth: 120, flex: 1,
      renderCell: (params) => (
        params.row.tipo_vehiculo === 'M' ? 'Moto' : params.row.tipo_vehiculo === 'C' && 'Carro'
      ),
    },
    { field: 'marca', headerName: 'Marca', minWidth: 170, flex: 1 },
    { field: 'placa', headerName: 'Placa', minWidth: 120, flex: 1 },
    { field: 'tipo_conductor', headerName: 'Tipo de conductor', minWidth: 120, flex: 1 },
    { field: 'nombre_conductor', headerName: 'Nombres', minWidth: 120, flex: 1 },
    { field: 'nro_documento_conductor', headerName: 'Numero de documento', minWidth: 120, flex: 1 },
    { field: 'fecha_inicio_asignacion', headerName: 'Fecha inicio', minWidth: 120, flex: 1 },
    { field: 'fecha_final_asignacion', headerName: 'Fecha Final', minWidth: 120, flex: 1 },
    {
      field: 'asignar',
      headerName: 'Asignar',
      width: 80,
      align: 'center',
      renderCell: (params) => (
        <DeleteForeverIcon
          sx={{ cursor: 'pointer', fontSize: '32px' , color:'#e72929'}}
          onClick={() => eliminar_asignacion(params.row)}
        />
      ),
    }
  ];

  return (
    <>
      <Grid item xs={12} container
        direction="row"
        justifyContent="flex-end"
        alignItems="center" >
        <Grid item  >
          <ButtonGroup style={{ margin: 5, }}>
              {download_xls({ nurseries: data_asignacion_vehiculos, columns })}
              {download_pdf({
                  nurseries: data_asignacion_vehiculos,
                  columns,
                  title: 'Asignaciónes de vehículos',
              })}
          </ButtonGroup>
        </Grid>
      </Grid>

      <DataGrid
        style={{margin:'15px 0px'}}
        density="compact"
        autoHeight
        rows={data_asignacion_vehiculos ?? []}
        columns={columns ?? []}
        pageSize={5}
        rowHeight={75}
        rowsPerPageOptions={[5]}
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
    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default AsignacionVehiculos;