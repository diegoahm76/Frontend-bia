/* eslint-disable @typescript-eslint/naming-convention */
import React, { useContext, useEffect, useState } from 'react';
import { RenderDataGrid } from '../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { Grid } from '@mui/material';
import { containerStyles } from './../../../../../../tca/screens/utils/constants/constants';
import { Loader } from '../../../../../../../../utils/Loader/Loader';
import { ModalAndLoadingContext } from '../../../../../../../../context/GeneralContext';

export const ListaPorPersonaSolPendientes = (): JSX.Element => {
  //* context declaration
  const { sevenLoading, handleSevenLoading, eigthLoading, handleEigthLoading } =
    useContext(ModalAndLoadingContext);

  //? states declarations
  const [listaOpas, setlistaOpas] = useState({
    opasSinResponder: [],
    reqOSolSinResponderRelacionadasAUnaOpa: [],
  });

  useEffect(() => {
    // Aquí debes cargar tus datos y establecer los estados de carga a false cuando los datos estén cargados
    // Por ejemplo:
    (async () => {
      console.log('opas cargando siuuuuuu');
      handleEigthLoading(true);
      handleSevenLoading(true);

      setTimeout(() => {
        handleSevenLoading(false);
        handleEigthLoading(false);
      }, 1500);
    })();
  }, []);

  return (
    <>
      {sevenLoading ? (
        <Grid
          container
          sx={{
            ...containerStyles,
            position: 'static',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Loader altura={270} />
        </Grid> // Reemplaza esto con tu componente de carga
      ) : (
        listaOpas?.opasSinResponder && (
          <RenderDataGrid
            title="Solicitudes de opas por persona - Existentes sin responder"
            rows={[]}
            columns={[]}
          />
        )
      )}

      {/*el loading numero ocho carga tras la busqueda del elemento, el 7 carga en la entrada de la busqueda del elemento*/}
      {eigthLoading ? (
        <Grid
          container
          sx={{
            ...containerStyles,
            position: 'static',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Loader altura={270} />
        </Grid> // Reemplaza esto con tu componente de carga
      ) : (
        listaOpas?.reqOSolSinResponderRelacionadasAUnaOpa && (
          <RenderDataGrid
            title="Solicitudes / requerimientos pendientes por respuesta"
            rows={[]}
            columns={[]}
          />
        )
      )}
    </>
  );
};
