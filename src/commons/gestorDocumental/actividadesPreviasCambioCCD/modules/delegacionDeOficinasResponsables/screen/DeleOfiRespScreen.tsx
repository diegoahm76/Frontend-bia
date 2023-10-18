/* eslint-disable @typescript-eslint/naming-convention */
import { AccionesFinal } from '../components/final/AccionesFinal';
import { Parte1ScreenOfi } from '../components/parte1/screen/Parte1ScreenOfi';
import { Parte2ScreenOfi } from '../components/parte2/screen/Parte2ScreenOfi';
import { Parte3OfiScreen } from '../components/parte3/Screen/Parte3OfiScreen';

/**
 * Renders the screen for delegating responsible offices.
 * @returns JSX.Element
 */
export const DeleOfiRespScreen = (): JSX.Element => {
  return (
    <div>
      <Parte1ScreenOfi />
      <Parte2ScreenOfi />
      <Parte3OfiScreen />
      <AccionesFinal />
    </div>
  );
};
