/* eslint-disable @typescript-eslint/naming-convention */
import {type FC} from 'react'
import { RenderDataGrid } from '../../../../../tca/Atom/RenderDataGrid/RenderDataGrid'

// componente restricción para todas las unidades organizacionales (dentro de denegación de permisos sobre expedientes propios)
export const ResUniDifSecSubAct: FC<any> = (): JSX.Element => {
  return (
    <RenderDataGrid
      columns={[]}
      rows={[]}
      title="Restricción a unidades diferentes a la sección o subsección actual responsable de la serie documental"
    />
  )
}
