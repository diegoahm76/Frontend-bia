/* eslint-disable @typescript-eslint/naming-convention */
import { containerStyles } from '../../../../tca/screens/utils/constants/constants'
import { Title } from '../../../../../../components'
import { Box, Grid } from '@mui/material'
import { ConfiguracionInicial } from '../components/base/Config/Configuracion'

export const PermisosPorClasificacionScreen = (): JSX.Element => {
  return (
    <Grid container sx={containerStyles}>
        <Title title="Permisos por clasificación / Exclusiones por serie documental" />
        <Grid
          container
          spacing={3}
          sx={{
            justifyContent: 'center'
          }}
        >
          {/* cada componete de cajita debe ser llamado dentro de este grid para que se acomode de buena manera */}

          {/* en este componente se define la configuración, para definir el comportamiento del módulo */}
         {/* <ConfiguracionInicial/> */}

        </Grid>
    </Grid>
  )
}
