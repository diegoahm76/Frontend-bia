/* eslint-disable @typescript-eslint/naming-convention */
import { containerStyles } from '../../../../tca/screens/utils/constants/constants'
import { Title } from '../../../../../../components'
import { Box, Grid } from '@mui/material'
import { ConfiguracionInicial } from '../components/base/Config/Configuracion'
import { Clasificacion } from '../components/caminoUno/Clasificacion/Clasificacion'
import { useAppSelector } from '../../../../../../hooks'

export const PermisosPorClasificacionScreen = (): JSX.Element | null=> {

  const { currentCcdCtrlAccesoExp } = useAppSelector((state) => state.ctrlAccesoExpSlice);

  if(!currentCcdCtrlAccesoExp) return null;

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
         <ConfiguracionInicial/>


          {/* si el modo seleccionado en la configuración inicial es UNO se renderiza el siguiente componente */}
          <Clasificacion/>
          {/* si el modo seleccionado en la configuración inicial es UNO se renderiza el siguiente componente */}

          {/* si el modo seleccionado en la configuración inicial es "DOS" se renderiza los siguientes componente */}
                  {/*  -- pendientes de creación los componentes necesarios dentro del módulo ---- */}
          {/* si el modo seleccionado en la configuración inicial es "DOS" se renderiza los siguientes componente */}



        </Grid>
    </Grid>
  )
}
