//! --- DOCUMENTO DE THUNKS DE LA PARTE DE SERIES DOCUMENTALES PERSISTENTES DE LA HOMOLOGACIÓN DE CCD'S ---

/* export const fnGetSeriesDocumentalesPersistentes = async (idCcdNuevo: number) => {
  try {
    const url = `gestor/ccd/persistencia-series-ccd/get/${idCcdNuevo}`;
    const { data } = await api.get(url);
    console.log(data);

    if (data.success) {
      control_success(data.detail);
      return data?.data;
    }

    control_error('Error al obtener las series documentales persistentes');
    return {
      coincidencias: [],
      //* mirar si se debe retornar algo más al error
    };
  } catch (error: any) {
    control_error(error?.response?.data?.detail);
  }
} */