/* eslint-disable @typescript-eslint/naming-convention */
import {type FC} from 'react'
import { Parte1CcdCtrlAccesoExp } from '../components/parte1/screen/Parte1CcdCtrlAccesoExp';


/**
 * Renders the screen for controlling access to expedited documents.
 * @returns JSX.Element representing the screen.
 * 1. Primera parte
 */
export const ScreenControlAccExp: FC<any> = (): JSX.Element => {
  return (
    <Parte1CcdCtrlAccesoExp />
  );
}
