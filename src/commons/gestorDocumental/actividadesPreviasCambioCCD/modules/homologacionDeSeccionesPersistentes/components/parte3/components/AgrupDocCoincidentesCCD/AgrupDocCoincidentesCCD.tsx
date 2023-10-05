/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react'
import { RenderDataGrid } from '../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid'
import { useAppSelector } from '../../../../../../../../../hooks'

export const AgrupDocCoincidentesCCD = (): JSX.Element | null => {
  //* redux declaration
  const {homologacionAgrupacionesSerieSubserie} = useAppSelector((state) => state.HomologacionesSlice)


  if(homologacionAgrupacionesSerieSubserie.length === 0) return null


  return (
    <>
      <RenderDataGrid
        columns={[] || []}
        rows={homologacionAgrupacionesSerieSubserie || []}
        title="Agrupaciones documentales coincidentes entre CCD ( CCD actual / CCD nuevo )"
      />
    </>
  )
}
