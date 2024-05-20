/* eslint-disable @typescript-eslint/naming-convention */
import React from "react";
import { api } from "../../../../../api/axios";
import { control_error, control_success } from "../../../../../helpers";
import { control_warning } from "../../../../almacen/configuracion/store/thunks/BodegaThunks";
import { getUnidadesOrganizacionalesInterface } from "./types/thunks";

export const getUnidadesOrganizacionalesSeccionSubseccion = async ({
  idOrganigrama,
  setLoadingUnidadesOrg,
  nombre = ''
}: getUnidadesOrganizacionalesInterface ): Promise<Array<any>> => {
  try {
    setLoadingUnidadesOrg(true);
    const url = `gestor/permisos/unidades-ccd/get/${idOrganigrama}/?nombre=${nombre}`;
    const { data } = await api.get(url);
    if (data?.data?.length > 0) {
      control_success(
        `Se encontró la siguiente información de seccion / subseccion`
      );
      //  console.log('')(data?.data);
      return data?.data;
    } else {
      control_warning('No se encontraron unidades organizacionales');
      //  console.log('')('no se encontraron unidades organizacionales')
      return [];
    }
  } catch (error: any) {
    control_error(error?.response?.data?.detail);
    return [];
  } finally {
    setLoadingUnidadesOrg(false);
  }
};