/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react'
import { containerStyles } from '../../../../../../tca/screens/utils/constants/constants'
import { Grid } from '@mui/material'
import { Title } from '../../../../../../../../components'


export const SelSerDocPersistentesScreen = (): JSX.Element => {
  return (
    <Grid container sx={containerStyles}>
      <Title title="Asignación de permisos sobre expedientes no propios" />

      {/* campo de texto con los valores  */}
      <>Campos de texto con los valores</>

      {/*Agrupaciones documentales coincidentes entre CCD */}

      <>Agrupaciones documentales coincidentes entre CCD</>

      {/* Persistencia de series confirmadas en nuevo CCD */}
      <>Persistencia de series confirmadas en nuevo CCD</>
    </Grid>
  )
}
