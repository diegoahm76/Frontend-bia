/* eslint-disable @typescript-eslint/naming-convention */

import { RenderDataGrid } from "../../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid";

export const ElementoOPAS = (): JSX.Element => {
  return (
    <>
      <RenderDataGrid
        rows={[] ?? []}
        columns={[] ?? []}
        title={`Listado de tareas asignadas en OPAS`}
        /* aditionalElement={
      currentElementPqrsdComplementoTramitesYotros?.tipo_solicitud ? (
        <Button
          onClick={() => {
            dispatch(setCurrentElementPqrsdComplementoTramitesYotros(null));
          }}
          variant="contained"
          color="primary"
        >
          Quitar selección de PQRSDF
        </Button>
      ) : null
    }*/
      />
    </>
  );
};
