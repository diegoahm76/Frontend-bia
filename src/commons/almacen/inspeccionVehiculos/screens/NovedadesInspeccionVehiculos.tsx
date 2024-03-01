/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/naming-convention */
import VehiculosSinNovedad from "./VehiculosSinNovedad";
import VehiculoConNovedad from "../components/VehiculoConNovedad";
import RowVehiculo from "../components/RowVehiculo";
import { useEffect, useState } from "react";
import ElementosInspeccionadosView from "../components/ElementosInspeccionadosView";
import { interface_put_revisar_vehiculo, interface_vehiculos_con_novedad, interface_vehiculos_sin_novedad, response_vehiculos_inspeccionados } from "../interfaces/types";
import { useAppDispatch } from "../../../../hooks";
import { obtener_vehiculos_inspeccionados } from "../thunks/inspeccion_vehiculos";
import { control_error } from "../../../../helpers";
import { Grid } from "@mui/material";

const NovedadesInspeccionVehiculo = () => {
  const dispatch = useAppDispatch();

  const [mostrar_view_inpeccion, set_mostrar_view_inpeccion] = useState<boolean>(false);
  const [data_vehiculos_sin_novedad, set_data_vehiculos_sin_novedad] = useState<interface_vehiculos_sin_novedad[]>([]);
  const [data_vehiculos_con_novedad, set_data_vehiculos_con_novedad] = useState<interface_vehiculos_con_novedad[]>([]);
  const [data_inspeccion_revisada, set_data_inspeccion_revisada] = useState<interface_put_revisar_vehiculo>(Object);

  const obtener_vehiculos_inspeccionados_fc: () => void = () => {
    dispatch(obtener_vehiculos_inspeccionados())
      .then((response: response_vehiculos_inspeccionados) => {
        if (!response?.success){
          control_error('No se encontraron los nombres del conductor');
          set_data_vehiculos_sin_novedad([]);
        } else {
          set_data_vehiculos_sin_novedad(response.data.vehiculos_sin_novedad);
          set_data_vehiculos_con_novedad(response.data.vehiculos_con_novedad)
        }
      })
  }

  useEffect(() => {
    obtener_vehiculos_inspeccionados_fc();
  }, [mostrar_view_inpeccion])

  useEffect(() => {
    console.log(data_vehiculos_con_novedad);
  }, [data_vehiculos_con_novedad])

  return (
    <>
      <VehiculosSinNovedad
        data_vehiculos_sin_novedad={data_vehiculos_sin_novedad
        }
      />

      {!mostrar_view_inpeccion &&
        <VehiculoConNovedad title="Vehiculos con novedad">
          {data_vehiculos_con_novedad?.length !== 0 ?
            data_vehiculos_con_novedad.map((inspeccion, index)=>(
              <RowVehiculo
                key={index}
                inspeccion={inspeccion}
                set_mostrar_view_inpeccion={set_mostrar_view_inpeccion}
                set_data_inspeccion_revisada={set_data_inspeccion_revisada}
              /> 
            ))
            :
            <Grid item xs={12} sx={{display:'flex', justifyContent:'center'}}>
              No tienes inspecciones por revisar
            </Grid>
          }
        </VehiculoConNovedad>
      }

      {mostrar_view_inpeccion && 
      <ElementosInspeccionadosView 
        data_inspeccion_revisada={data_inspeccion_revisada}
        set_mostrar_view_inpeccion={set_mostrar_view_inpeccion}
      />}
    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default NovedadesInspeccionVehiculo;