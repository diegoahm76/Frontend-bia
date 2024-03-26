/* eslint-disable @typescript-eslint/naming-convention */
import React, { useContext, useEffect } from 'react';
import { InformacionElemento } from '../components/InformacionElemento/InformacionElemento';
import { useAppSelector } from '../../../../../../hooks';
import { useNavigate } from 'react-router-dom';
import { ModalAndLoadingContext } from '../../../../../../context/GeneralContext';
import { Grid } from '@mui/material';
import { AccionesFinales } from '../components/AccionesFinales/AccionesFinales';
import { showAlert } from '../../../../../../utils/showAlert/ShowAlert';
import { ReasignacionContext } from '../context/ReasignacionContext';
import { SeleccionUnidadDestino } from '../components/seleccionUnidadDestino/SeleccionUnidadDestino';
import { SeleccionarUsuario } from '../components/seleccionarUsuario/SeleccionarUsuario';
import { getUnidadesHijasById } from '../services/getUnidadesHijas.service';
import { getReAsignacionesTareasPqrsdf } from '../services/reasignaciones/pqrsdf/getReAsignacionesTaskPqrsdf.service';
import { ReasignacionesGrid } from '../components/reasignacionesGrid/ReasignacionesGrid';
import { getReAsignacionesTareasOtros } from '../services/reasignaciones/otros/getReasignacionesTareasOtros.service';
import { getReAsignacionesTareasTramites } from '../services/reasignaciones/tramitesServicios/getReasignaTram.service';
import { getReAsignacionesTareasOpas } from '../services/reasignaciones/opas/getReasignacionesTareasOpas.service';

export const MainReasignacionesScreen: React.FC = (): JSX.Element => {
  //* redux states
  const currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas = useAppSelector(
    (state) =>
      state.BandejaTareasSlice
        .currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas
  );

  const { userinfo } = useAppSelector((state) => state.auth);
  //* navigate declaration
  const navigate = useNavigate();

  //* context loading declaration
  const { handleGeneralLoading } = useContext(ModalAndLoadingContext);
  const { setListaSeccionesSubsecciones, setListaAsignaciones } =
    useContext(ReasignacionContext);
  // ? quitar mientras se termina de desarrollar el módulo
  useEffect(() => {
    if (!currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas) {
      navigate('/app/gestor_documental/bandeja_tareas/');
    }
  }, [currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas]);

  useEffect(() => {
    //* se entra a consultar el listado de asignaciones realizadas

    if (!currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas) return;

    const tipo =
      currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.tipo_tarea ||
      currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.tipo;

    switch (tipo) {
      case 'RESPONDER PQRSDF':
      case 'Responder PQRSDF':
        void getReAsignacionesTareasPqrsdf(
          currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.id_tarea_asignada,
          handleGeneralLoading
        ).then((res) => {
          setListaAsignaciones(res);
        });
        break;
      case 'Responder Trámite':
      case 'Responder Tramite':
      case 'RESPONDER TRÁMITE':
      case 'RESPONDER TRAMITE':
        void getReAsignacionesTareasTramites(
          currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.id_tarea_asignada,
          handleGeneralLoading
        ).then((res) => {
          setListaAsignaciones(res);
        });
        break;
      case 'RESPONDER OTRO':
      case 'RESPONDER OTROS':
      case 'Responder Otros':
      case 'Responder Otro':
        void getReAsignacionesTareasOtros(
          currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.id_tarea_asignada,
          handleGeneralLoading
        ).then((res) => {
          setListaAsignaciones(res);
        });

        break;
      case 'RESPONDER OPA':
      case 'Responder Opa':
      case 'Responder OPA':
        // ? se debe mirar el tipo de tarea a establecer ---------------
        //* se debe llamar el servicio respectivo para las asignaciones de OPA, apenas esté listo
       void getReAsignacionesTareasOpas(
          currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.id_tarea_asignada,
          handleGeneralLoading
        ).then((res) => {
          setListaAsignaciones(res);
        });

        // Call the service for OPA
        break;
      default:
        // Default service call or no service call
        break;
    }
  }, []);

  useEffect(() => {
    if (!currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas) return;

    void getUnidadesHijasById(
      userinfo?.id_unidad_organizacional_actual,
      handleGeneralLoading,
      navigate
    ).then((res) => {
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
      <SeleccionUnidadDestino />
      {/*selección de grupo*/}

      <SeleccionarUsuario />

      {/* asignaciones realizadas, (en espera, rechazadas, aceptadas) */}
      <ReasignacionesGrid />
      {/*acciones finales del módulo*/}
      <AccionesFinales />
    </>
  );
};
