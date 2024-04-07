/* eslint-disable @typescript-eslint/naming-convention */
import React, { useContext, useEffect } from 'react';
import { InformacionElemento } from '../components/InformacionElemento/InformacionElemento';
import { useAppSelector } from '../../../../../../hooks';
import { useNavigate } from 'react-router-dom';
import { getSecSubAsiGrupo } from '../services/getSecSub.service';
import { ModalAndLoadingContext } from '../../../../../../context/GeneralContext';
import { SeleccionUnidadSecSub } from '../components/SeleccionUnidadSecSub/SeleccionUnidadSecSub';
import { Grid } from '@mui/material';
import { SeleccionGrupo } from '../components/SeleccionGrupo/SeleccionGrupo';
import { Asignaciones } from '../components/Asignaciones/Asginaciones';
import { AccionesFinales } from '../components/AccionesFinales/AccionesFinales';
import { showAlert } from '../../../../../../utils/showAlert/ShowAlert';
import { AsignacionGrupoOpaContext } from '../context/AsignacionGrupoOpaContext';
import { getAsignacionesOpas } from '../services/asignaciones/opas/getAsignacionesOpas.service';

export const MainAsigGrupoOpaScreen: React.FC = (): JSX.Element => {
  //* redux states
  const currentElementPqrsdComplementoTramitesYotros = useAppSelector(
    (state) =>
      state.PanelVentanillaSlice.currentElementPqrsdComplementoTramitesYotros
  );
  //* navigate declaration
  const navigate = useNavigate();

  //* context loading declaration
  const { handleGeneralLoading } = useContext(ModalAndLoadingContext);
  const { setListaSeccionesSubsecciones, setListaAsignaciones } = useContext(
    AsignacionGrupoOpaContext
  );
  // ? quitar mientras se termina de desarrollar el módulo
  useEffect(() => {
    if (!currentElementPqrsdComplementoTramitesYotros) {
      navigate('/app/gestor_documental/panel_ventanilla/');
    }
  }, [currentElementPqrsdComplementoTramitesYotros]);

  useEffect(() => {
    //* se entra a consultar el listado de asignaciones realizadas

    if (!currentElementPqrsdComplementoTramitesYotros) return;

    const tipo =
      currentElementPqrsdComplementoTramitesYotros?.tipo_solicitud ||
      currentElementPqrsdComplementoTramitesYotros?.tipo;

    switch (tipo) {
      case 'OPA':
        (async () => {
          try {
            const res = await getAsignacionesOpas(currentElementPqrsdComplementoTramitesYotros?.id_solicitud_tramite, handleGeneralLoading);
            setListaAsignaciones(res);
          } catch (error) {
            console.error(error);
          }
        })();
        // Call the service for OPA
        break;
      default:
        console.log('No hay tipo de solicitud');
        break;
    }
  }, []);

  useEffect(() => {
    if (!currentElementPqrsdComplementoTramitesYotros) return;

    void getSecSubAsiGrupo(handleGeneralLoading, navigate).then((res) => {
      //  console.log('')(res);
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
        {/*primera parte, información del elemento seleccionado (PQRSDF, OPA, Trámite, otro, etc)*/}
        <InformacionElemento />
      </Grid>

      {/* segunda parte, seleccion de seccion y subseccion */}
      <SeleccionUnidadSecSub />
      {/*selección de grupo*/}

      <SeleccionGrupo />

      {/* asignaciones realizadas, (en espera, rechazadas, aceptadas) */}
      <Asignaciones />
      {/*acciones finales del módulo*/}
      <AccionesFinales />
    </>
  );
};
