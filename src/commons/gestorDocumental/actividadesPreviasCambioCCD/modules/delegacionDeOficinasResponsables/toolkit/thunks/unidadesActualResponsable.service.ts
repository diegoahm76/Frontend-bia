import { api } from "../../../../../../../api/axios";

/* eslint-disable @typescript-eslint/naming-convention */
export const getUnidadesResponsablesActual = async ({
  idCcdSeleccionado,
  setLoading,
}: {
  idCcdSeleccionado: number;
  setLoading: (loading: boolean) => void;
}) => {
  //* no olvidar añadirel respectivo loading
  try {
    const url = `gestor/ccd/get-unidades-actual-responsable-ccd/get/${idCcdSeleccionado}/`;
    const response = await api.get(url);
    console.log(response);
  } catch (err) {
  } finally {
    //* debe ir el loading
  }
};
