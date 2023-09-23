/**
 * Interface representing the actions related to the control of access to expedients in the CCD module.
 */
export interface InitialState {
  /**
   * An array of CCDs related to the search for control of access to expedients.
   */
  ccdsBusquedaCtrlAccesoExp: any[];
  /**
   * The current CCD related to the control of access to expedients, or null if there is none.
   */
  currentCcdCtrlAccesoExp: any | null;

  moodConfig: any;

  tipoDeClasificacion: any;
}
