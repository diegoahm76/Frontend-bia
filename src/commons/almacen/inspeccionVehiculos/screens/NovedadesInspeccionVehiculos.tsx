import VehiculosSinNovedad from "./VehiculosSinNovedad";
import VehiculoConNovedad from "../components/VehiculoConNovedad";
import RowVehiculo from "../components/RowVehiculo";
import { useState } from "react";
import ElementosInspeccionadosView from "../components/ElementosInspeccionadosView";

// eslint-disable-next-line @typescript-eslint/naming-convention
const NovedadesInspeccionVehiculo = () => {
  const [mostrar_view_inpeccion, set_mostrar_view_inpeccion] = useState<boolean>(true);

  return (
    <>
      <VehiculosSinNovedad />

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