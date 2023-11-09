/* eslint-disable @typescript-eslint/naming-convention */
import { useContext, useEffect } from 'react';
import { RenderDataGrid } from '../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { PanelVentanillaContext } from '../../../../../../context/PanelVentanillaContext';
import { Button, Grid } from '@mui/material';
import { ModalAndLoadingContext } from '../../../../../../../../../context/GeneralContext';
import { containerStyles } from './../../../../../../../tca/screens/utils/constants/constants';
import { Loader } from '../../../../../../../../../utils/Loader/Loader';

export const ElementosPrincipales = (): JSX.Element => {
  //* context declaration
  const { setRadicado, setValue } = useContext(PanelVentanillaContext);

  const { secondLoading, handleSecondLoading } = useContext(
    ModalAndLoadingContext
  );

  //? también se debe entrar a definir los loadings
  /*  if (secondLoading)
  return (
    <Grid
      container
      sx={{
        ...containerStyles,
        position: 'static',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <Loader altura={270} />
    </Grid>
  );*/

  return (
    <>
      <Button
        color="primary"
        variant="contained"
        onClick={() => {
          setValue(1);
          setRadicado('panel8');
        }}
      >
        Se debe usar para el cambio a la otra pestaña
      </Button>
      <Button
        color="warning"
        variant="contained"
        onClick={() => {
          console.log('cambiando a ver pqrsdf');
        }}
      >
        Ver pqrsdf
      </Button>
      <Button
        color="error"
        variant="contained"
        onClick={() => {
          console.log('cambiando a ver complemento');
        }}
      >
        Ver complemento de pqrsdf
      </Button>
      <RenderDataGrid
        rows={[]}
        columns={[]}
        title={`Elementos principales (...)`}
      />
    </>
  );
};
