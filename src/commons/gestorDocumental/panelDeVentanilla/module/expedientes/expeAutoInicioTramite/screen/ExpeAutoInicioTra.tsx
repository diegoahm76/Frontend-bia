/* eslint-disable @typescript-eslint/naming-convention */
import React, { useContext, useEffect } from 'react';
import { InformacionElemento } from '../components/InformacionElemento/InformacionElemento';
import { useNavigate } from 'react-router-dom';
import { getSecSubAsiGrupo } from '../services/getSecSub.service';
import { SeleccionUnidadSecSub } from '../components/SeleccionUnidadSecSub/SeleccionUnidadSecSub';
import { Grid } from '@mui/material';
import { SeleccionGrupo } from '../components/SeleccionGrupo/SeleccionGrupo';
import { Asignaciones } from '../components/Asignaciones/Asginaciones';
import { AccionesFinales } from '../components/AccionesFinales/AccionesFinales';
import { getAsignacionesTramites } from '../services/asignaciones/tramites/getAsignacionesTramites.service';
import { useAppSelector } from '../../../../../../../hooks';
import { ModalAndLoadingContext } from '../../../../../../../context/GeneralContext';
import { AutoInicioContext } from '../context/ExpedienteContext';
import { AutoScreen } from '../components/AutoDeInicio/AutoScreen';
import { AutosCreados } from '../components/AutoCreados/AutosCreados';
import { getAutosDeInicioCreados } from '../services/getAutosCreados.service';
import { getExpedienteRelacionado } from '../services/getExpedienteRelacionado.service';
import { ExpedienteCreado } from '../components/ExpedienteCreado/ExpedienteCreado';

export const ExpeAutoDeInicioTram: React.FC = (): JSX.Element => {
  //* redux states
  const currentElementPqrsdComplementoTramitesYotros = useAppSelector(
    (state) =>
      state.PanelVentanillaSlice.currentElementPqrsdComplementoTramitesYotros
  );
  //* navigate declaration
  const navigate = useNavigate();

  //* context loading declaration
  const { handleGeneralLoading } = useContext(ModalAndLoadingContext);
  const {
    setListaSeccionesSubsecciones,
    setListaAsignaciones,
    setListaAutoDeInicio,
    expediente,
    setExpediente,
  } = useContext(AutoInicioContext);
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
      case 'TRAMITE':
        (async () => {
          try {
            const res = await getAsignacionesTramites(
              currentElementPqrsdComplementoTramitesYotros?.id_solicitud_tramite,
              handleGeneralLoading
            );
            setListaAsignaciones(res);
          } catch (error) {
            console.error(error);
          }
        })();
        // ? get autos creados
        (async () => {
          try {
            const res = await getAutosDeInicioCreados(
              currentElementPqrsdComplementoTramitesYotros?.id_solicitud_tramite,
              handleGeneralLoading
            );
            setListaAutoDeInicio(res);
          } catch (error) {
            console.error(error);
          }
        })();
        //* get expediente relacionado
        (async () => {
          try {
            const res = await getExpedienteRelacionado(
              currentElementPqrsdComplementoTramitesYotros?.id_solicitud_tramite,
              handleGeneralLoading
            );
            setExpediente(res);
          } catch (error) {
            console.error(error);
          }
        })();
        break;
      default:
        console.log('No hay tipo de solicitud');
        break;
    }
  }, []);

  useEffect(() => {
    if (!currentElementPqrsdComplementoTramitesYotros) return;

    void getSecSubAsiGrupo(handleGeneralLoading, navigate).then((res) => {
      console.log('siuuuuuuuuuuuuuuuuuu', res);
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

      <AutoScreen />

      {/* segunda parte, seleccion de seccion y subseccion */}
      <SeleccionUnidadSecSub />
      {/*selección de grupo*/}

      <SeleccionGrupo />

      {/* asignaciones realizadas, (en espera, rechazadas, aceptadas) */}
      <ExpedienteCreado/>
      {/*<Asignaciones />*/}
      <AutosCreados />
      {/*acciones finales del módulo*/}
      <AccionesFinales />
    </>
  );
};
