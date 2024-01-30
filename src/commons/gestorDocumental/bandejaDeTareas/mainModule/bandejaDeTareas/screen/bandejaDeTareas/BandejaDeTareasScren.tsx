/* eslint-disable @typescript-eslint/naming-convention */
import { BuscadorBandejaDeTareas } from '../../components/bandejaDeTareas/components/buscadorBandejaDeTareas/BuscadorBandejaDeTareas';
import { ButtonsBandejaDeTareas } from '../../components/bandejaDeTareas/components/buttonsBandejaDeTareas/ButtonsBandejaDeTareas';
import { ElementosPrincipales } from '../../components/bandejaDeTareas/components/elementosPrincipales/ElementosPrincipales';
import { SalidaModulo } from '../../components/bandejaDeTareas/components/salidaModulo/SalidaModulo';

export const BandejaDeTareasScreen = (): JSX.Element => {
  return (
    <>
      {/* primer parte, button */}
     <ButtonsBandejaDeTareas />
      {/* segunda parte, buscado panel de ventanilla */}
      <BuscadorBandejaDeTareas />
      {/* tercer parte, elementos principales de la busqueda (pqrsdf, tramites u otros) */}
      <ElementosPrincipales />
      {/* Acciones finales, salida del módulo */}
      <SalidaModulo />
    </>
  );
};
