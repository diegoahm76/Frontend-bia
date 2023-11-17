/* eslint-disable @typescript-eslint/naming-convention */
import { useContext, useEffect } from 'react';
import { RenderDataGrid } from '../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { PanelVentanillaContext } from '../../../../../../context/PanelVentanillaContext';
import { Button, Grid } from '@mui/material';
import { ModalAndLoadingContext } from '../../../../../../../../../context/GeneralContext';
import { containerStyles } from './../../../../../../../tca/screens/utils/constants/constants';
import { Loader } from '../../../../../../../../../utils/Loader/Loader';
import { Link } from 'react-router-dom';

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
      <Link
        //* estos ids se van a manejar a traves de los params.row
        to="/app/gestor_documental/panel_ventanilla/pqr_info/1"
      >
        <Button
          color="warning"
          sx={{
            marginLeft: '1rem',
          }}
          variant="contained"
          onClick={() => {
            console.log('cambiando a ver pqrsdf');
          }}
        >
          Ver pqrsdf
        </Button>
      </Link>

      <Link
        //* estos ids se van a manejar a traves de los params.row
        to="/app/gestor_documental/panel_ventanilla/complemento_info/1"
      >
        <Button
          color="error"
          sx={{
            marginLeft: '1rem',
          }}
          variant="contained"
          onClick={() => {
            console.log('cambiando a ver complemento');
          }}
        >
          Ver complemento de pqrsdf
        </Button>
      </Link>
      <RenderDataGrid
        rows={[]}
        columns={[]}
        title={`Elementos principales (...)`}
      />
    </>
  );
};
