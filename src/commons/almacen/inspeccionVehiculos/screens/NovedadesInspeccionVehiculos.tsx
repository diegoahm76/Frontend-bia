import VehiculosSinNovedad from "./VehiculosSinNovedad";
import VehiculoConNovedad from "../components/VehiculoConNovedad";
import RowVehiculo from "../components/RowVehiculo";
import { useEffect, useState } from "react";
import ElementosInspeccionadosView from "../components/ElementosInspeccionadosView";
import { interface_vehiculos_sin_novedad } from "../interfaces/types";
import { useAppDispatch } from "../../../../hooks";
import { obtener_vehiculos_sin_novedad } from "../thunks/inspeccion_vehiculos";

// eslint-disable-next-line @typescript-eslint/naming-convention
const NovedadesInspeccionVehiculo = () => {
  const dispatch = useAppDispatch();

  const [mostrar_view_inpeccion, set_mostrar_view_inpeccion] = useState<boolean>(true);
  const [data_vehiculos_sin_novedad, set_data_vehiculos_sin_novedad] = useState<interface_vehiculos_sin_novedad[]>([]);

  const obtener_vehiculos_sin_novedad_fc: () => void = () => {}
    /*dispatch(obtener_vehiculos_sin_novedad())
      .then((response: response_vehiculo_logueado) => {
        console.log(response);        
        if (!response.success) {
          control_error  ('No se encontraron los nombres del conductor');
          set_vehiculo_seleccionado('');
        } else {
          set_vehiculo_seleccionado(response.data[0][0].placa + ' - ' + response.data[0][0].marca);
          set_id_hoja_vida_vehiculo(response.data[0][0].id_hoja_vida_vehiculo);
        }
      })
  }*/

  useEffect(() => {
    obtener_vehiculos_sin_novedad_fc();
  }, [])

  return (
    <>
      <VehiculosSinNovedad
        data_vehiculos_sin_novedad={data_vehiculos_sin_novedad
        }
      />

      {!mostrar_view_inpeccion &&
        <VehiculoConNovedad title="Vehiculos con novedad">
          <RowVehiculo 
            set_mostrar_view_inpeccion={set_mostrar_view_inpeccion}
          />
        </VehiculoConNovedad>
      }

      {mostrar_view_inpeccion && 
      <ElementosInspeccionadosView 
        set_mostrar_view_inpeccion={set_mostrar_view_inpeccion}
      />}
    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default NovedadesInspeccionVehiculo;