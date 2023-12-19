/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react'
import { RenderDataGrid } from '../../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid'

export const ElementosOtros = (): JSX.Element => {
  return (
    <>
    <RenderDataGrid
      rows={[] ?? []}
      columns={[] ?? []}
      title={`Listado de tareas asignadas en otros`}
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
  )
}
