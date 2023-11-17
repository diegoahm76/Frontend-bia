/* eslint-disable @typescript-eslint/naming-convention */
import { useContext, useEffect } from 'react';
import { PanelVentanillaContext } from '../../../../../../../context/PanelVentanillaContext';
import { ModalAndLoadingContext } from '../../../../../../../../../../context/GeneralContext';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { RenderDataGrid } from '../../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';

export const ListaElementosPqrsdf = (): JSX.Element => {
  //* context declaration
  const { setRadicado, setValue } = useContext(PanelVentanillaContext);

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
