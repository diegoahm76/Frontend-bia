/* eslint-disable @typescript-eslint/naming-convention */
import React, { useContext, useEffect } from 'react';
import { InformacionPQRSDF } from '../components/InformacionPQRSDF/InformacionPQRSDF';
import { useAppSelector } from '../../../../../../hooks';
import { useNavigate } from 'react-router-dom';
import { getSecSubAsiGrupo } from '../services/getSecSub.service';
import { ModalAndLoadingContext } from '../../../../../../context/GeneralContext';
import { SeleccionUnidadSecSub } from '../components/SeleccionUnidadSecSub/SeleccionUnidadSecSub';
import { Grid } from '@mui/material';
import { AsignacionGrupoContext } from '../context/AsignacionGrupoContext';
import { SeleccionGrupo } from '../components/SeleccionGrupo/SeleccionGrupo';

export const MainAsigGrupoScreen: React.FC = (): JSX.Element => {
  //* redux states
  const currentElementPqrsdComplementoTramitesYotros = useAppSelector(
    (state) =>
      state.PanelVentanillaSlice.currentElementPqrsdComplementoTramitesYotros
  );
  //* navigate declaration
  const navigate = useNavigate();

  //* context loading declaration
  const { handleGeneralLoading } = useContext(ModalAndLoadingContext);
  const { setListaSeccionesSubsecciones } = useContext(AsignacionGrupoContext);
  // ? quitar mientras se termina de desarrollar el módulo
  /* useEffect(() => {
    if (!currentElementPqrsdComplementoTramitesYotros) {
      navigate('/app/gestor_documental/panel_ventanilla/');
    }
  }, []);
*/

  useEffect(() => {
    void getSecSubAsiGrupo(handleGeneralLoading, navigate).then((res) => {
      console.log(res);
      setListaSeccionesSubsecciones(res);
    });


    //* aqui de entrada tambien se debe consultar el grillado para saber si se puede asginar o no

  }, []);

  return (
    <>
      <Grid
        container
        sx={{
          position: 'relative',
          justifyContent: 'center',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        {/*primera parte, información de la PQRSDF seleccionada*/}
        <InformacionPQRSDF />
      </Grid>

      {/* segunda parte, seleccion de seccion y subseccion */}
      <SeleccionUnidadSecSub />
      {/*selección de grupo*/}

      <SeleccionGrupo />
    </>
  );
};
