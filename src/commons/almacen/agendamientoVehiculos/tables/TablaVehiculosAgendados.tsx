/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/naming-convention */
import { GridColDef } from "@mui/x-data-grid";
import { FC } from "react";
import { interface_data_agendamiento_vehiculos, interface_detalles_vehiculos_agendados } from "../interfaces/types";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { RenderDataGrid } from "../../../gestorDocumental/tca/Atom/RenderDataGrid/RenderDataGrid";


interface custom_column extends GridColDef {
  renderCell?: (params: { row: interface_detalles_vehiculos_agendados }) => React.ReactNode;
}

interface props_table {
  data_detalles_vehiculos_agendados: interface_detalles_vehiculos_agendados[];
  set_accion: React.Dispatch<React.SetStateAction<string>>;
  set_data_editar_agendamiento: React.Dispatch<React.SetStateAction<interface_detalles_vehiculos_agendados>>;
  set_data_solicitud_a_aprobar: React.Dispatch<React.SetStateAction<interface_data_agendamiento_vehiculos>>
}


const TablaVehiculosAgendados: FC<props_table> = ({
  data_detalles_vehiculos_agendados,
  set_accion,set_data_editar_agendamiento,
  set_data_solicitud_a_aprobar
}) => {

  const editar_detalle_vehiculo_agendado = (params: any) => {
    set_accion('editar_agendamiento');
    console.log(params);
    set_data_editar_agendamiento(params);
    set_data_solicitud_a_aprobar(params);
  }

  const columns: custom_column[] = [
    {field: 'persona_conductor', headerName:'Conductor', minWidth:190, flex:1,},
    {field: 'placa', headerName:'Placa vehículos', minWidth:120, flex:1,},
    {field: 'nombre', headerName:'Nombre vehículo', minWidth:120, flex:1,},
    {field: 'marca', headerName:'Marca vehículo', minWidth:120, flex:1,},
    {field: 'fecha_partida_asignada', headerName:'Fecha inicio viaje', minWidth:120, flex:1,},
    {field: 'fecha_retorno_asignada', headerName:'Fecha fin viaje', minWidth:120, flex:1,},
    {field: 'editar', headerName:'Editar', maxWidth:80, flex:1, headerAlign:'center', align:'center',
      renderCell: ((res)=>(
        <ModeEditIcon
          style={{cursor:'pointer'}}
          onClick={()=>editar_detalle_vehiculo_agendado(res.row)}
        />
      ))
    },
  ]

  return (
      <RenderDataGrid
        title="Vehículos agendados"
        rows={data_detalles_vehiculos_agendados ?? []}
        columns={columns ?? []}
    />
  );
}

// eslint-disable-next-line no-restricted-syntax
export default TablaVehiculosAgendados;