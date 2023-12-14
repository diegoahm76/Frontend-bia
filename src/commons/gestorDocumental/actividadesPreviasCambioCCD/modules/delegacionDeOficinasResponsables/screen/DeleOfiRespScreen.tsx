/* eslint-disable @typescript-eslint/naming-convention */
import { useEffect } from 'react';
import { AccionesFinal } from '../components/final/AccionesFinal';
import { Parte1ScreenOfi } from '../components/parte1/screen/Parte1ScreenOfi';
import { Parte2ScreenOfi } from '../components/parte2/screen/Parte2ScreenOfi';
import { Parte3OfiScreen } from '../components/parte3/Screen/Parte3OfiScreen';
import { useAppDispatch } from '../../../../../../hooks';
import { reset_states_asi_ofi_resp } from '../toolkit/slice/DelOfiResSlice';

/**
 * Renders the screen for delegating responsible offices.
 * @returns JSX.Element
 */
export const DeleOfiRespScreen = (): JSX.Element => {
  // ? dispatch declaration
  const dispatch = useAppDispatch();

  useEffect(() => {
    // ? revisar si se debe hacer el reinicio de los estados para evitar los errores de superposición de datos
    dispatch(reset_states_asi_ofi_resp());
  }, []);

  return (
    <div>
      <Parte1ScreenOfi />
      <Parte2ScreenOfi />
      <Parte3OfiScreen />
      <AccionesFinal />
    </div>
  );
};
