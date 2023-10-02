/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react'
import { RenderDataGrid } from '../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid'

export const AgrupDocCoincidentesCCD = (): JSX.Element | null => {
  return (
    <>
      <RenderDataGrid
        columns={[] || []}
        rows={[]|| []}
        title="Agrupaciones documentales coincidentes entre CCD ( CCD actual / CCD nuevo )"
      />
    </>
  )
}
