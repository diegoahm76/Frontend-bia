/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react'
import { containerStyles } from '../../../../../../tca/screens/utils/constants/constants'
import { Grid } from '@mui/material'
import { Title } from '../../../../../../../../components'
import { AgrupDocCoincidentesCCD } from '../components/AgrupDocCoincidentesCCD/AgrupDocCoincidentesCCD'
import { PersistenciaSeriesConfirmadasCCD } from '../components/PersistenciaSeriesConfirmadasCCD/PersistenciaSeriesConfirmadasCCD'
import { SecSubSeleccionada } from '../components/SecSubSeleccionada/SecSubSeleccionada'


export const SelSerDocPersistentesScreen = (): JSX.Element => {
  return (
    <Grid container sx={containerStyles}>
      <Title title="Selección de series documentales persistentes entre CCD's" />

      {/* campo de texto con los valores  */}
      <SecSubSeleccionada/>

      {/*Agrupaciones documentales coincidentes entre CCD */}

      <AgrupDocCoincidentesCCD/>

      {/* Persistencia de series confirmadas en nuevo CCD */}
      <PersistenciaSeriesConfirmadasCCD/>
    </Grid>
  )
}
