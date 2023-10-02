/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react'
import { RenderDataGrid } from '../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid'

export const PersistenciaSeriesConfirmadasCCD = (): JSX.Element | null => {
  return (
    <>
      <RenderDataGrid
        columns={[] || []}
        rows={[]|| []}
        title="Persistencia de series confirmadas en nuevo CCD ( CCD actual / CCD nuevo )"
      />
    </>
  )
}
