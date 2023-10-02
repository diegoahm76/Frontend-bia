/* eslint-disable @typescript-eslint/naming-convention */
import { RenderDataGrid } from '../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid'

export const PersistenciaConfirmadaCCD = (): JSX.Element => {
  return (
    <>
    <RenderDataGrid
      columns={[] || []}
      rows={[]|| []}
      title="Persistencia confirmada en nuevo CCD ( CCD actual / CCD nuevo )"
    />
  </>
  )
}
