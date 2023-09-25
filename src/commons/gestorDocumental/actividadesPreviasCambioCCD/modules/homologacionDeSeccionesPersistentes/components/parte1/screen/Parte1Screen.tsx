/* eslint-disable @typescript-eslint/naming-convention */
import { Grid } from '@mui/material'
import React from 'react'
import { Title } from '../../../../../../../../components'
import { containerStyles } from '../../../../../../tca/screens/utils/constants/constants'

export const Parte1Screen = (): JSX.Element => {
  return (
    <Grid container sx={containerStyles}>
    <Title title="Homologación de secciones persistentes del CCD" />
    </Grid>
  )
}
