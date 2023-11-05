/* eslint-disable @typescript-eslint/naming-convention */
import { useState } from 'react';
import { AccionesFinalModulo } from '../../../../../../../utils/AccionesFinalModulo/Atom/AccionesFinalModulo';
import { useAppSelector } from '../../../../../../../hooks';
import { reset_states_asi_ofi_resp } from '../../toolkit/slice/DelOfiResSlice';

export const AccionesFinal = (): JSX.Element => {
  //* redux states
  const { ccdOrganigramaCurrentBusquedaOfiResp } = useAppSelector(
    (state) => state.DelOfiResSlice
  );

  const [LoadingButton, setLoadingButton] = useState(false);

  //* crear funcion onsubmit

  if (!ccdOrganigramaCurrentBusquedaOfiResp) return <></>;

  const handleSubmit = async () => {
    setLoadingButton(true);
    setTimeout(() => {
      setLoadingButton(false);
    }, 2000);
  };

  return (
    <AccionesFinalModulo
      loadingButton={LoadingButton}
      handleSubmit={handleSubmit}
      reset_states={reset_states_asi_ofi_resp}
    />
  );
};
