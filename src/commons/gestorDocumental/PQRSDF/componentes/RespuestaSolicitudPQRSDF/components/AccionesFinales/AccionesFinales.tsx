/* eslint-disable @typescript-eslint/naming-convention */
import { useState } from 'react';
import { AccionesFinalModulo } from '../../../../../../../utils/AccionesFinalModulo/Atom/AccionesFinalModulo';
import { LoadingButton } from '@mui/lab';

export const AccionesFinales = (): JSX.Element => {
  const [LoadingButton, setLoadingButton] = useState(false);

  return (
    <AccionesFinalModulo
      loadingButton={LoadingButton}
      handleSubmit={async () => {
        console.log('submit solicitud al usuario');
        setLoadingButton(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setLoadingButton(false);
      }}
      reset_states={() => console.log('cancel')}
    />
  );
};
