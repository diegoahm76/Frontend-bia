/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState } from 'react'
import { AccionesFinalModulo } from '../../../../../../../utils/AccionesFinalModulo/Atom/AccionesFinalModulo'
import { LoadingButton } from '@mui/lab';

export const AccionesFinal = (): JSX.Element => {

  const [LoadingButton, setLoadingButton] = useState(false)

  return (
    <AccionesFinalModulo loadingButton={LoadingButton} handleSubmit={function (): void {
      throw new Error('Function not implemented.');
    } } reset_states={function (): void {
      throw new Error('Function not implemented.');
    } }/>
  )
}
