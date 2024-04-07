/* eslint-disable @typescript-eslint/naming-convention */
import React, { useContext, useEffect } from 'react';
import { InformacionElemento } from '../components/InformacionElemento/InformacionElemento';
import { useAppSelector } from '../../../../../../hooks';
import { useNavigate } from 'react-router-dom';
import { getSecSubAsiGrupo } from '../services/getSecSub.service';
import { ModalAndLoadingContext } from '../../../../../../context/GeneralContext';
import { SeleccionUnidadSecSub } from '../components/SeleccionUnidadSecSub/SeleccionUnidadSecSub';
import { Grid } from '@mui/material';
import { AsignacionGrupoContext } from '../context/AsignacionGrupoContext';
import { SeleccionGrupo } from '../components/SeleccionGrupo/SeleccionGrupo';
import { Asignaciones } from '../components/Asignaciones/Asginaciones';
import { AccionesFinales } from '../components/AccionesFinales/AccionesFinales';
import { getAsignaciones } from '../services/asignaciones/pqrsdf/getAsignaciones.service';
import { showAlert } from '../../../../../../utils/showAlert/ShowAlert';
import { getAsignacionesOtros } from '../services/asignaciones/otros/getAsignacionesOtros.service';

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
  const { setListaSeccionesSubsecciones, setListaAsignaciones } = useContext(
    AsignacionGrupoContext
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
      case 'PQRSDF':
        void getAsignaciones(
          currentElementPqrsdComplementoTramitesYotros?.id_PQRSDF,
          handleGeneralLoading
        ).then((res) => {
          setListaAsignaciones(res);
        });
        break;
      case 'Tramites y Servicios':
        // Call the service for Tramites y Servicios
        showAlert(
          'Atención',
          'No hay servicio aún para ver las asignacion para tramites y servicios, así que no hay asignaciones de tramites y servicios por el momento',
          'warning'
        );
        break;
      case 'OTROS':
        void getAsignacionesOtros(
          currentElementPqrsdComplementoTramitesYotros?.id_otros,
          handleGeneralLoading
        ).then((res) => {
          setListaAsignaciones(res);
        });

        break;
      case 'OPA':
        //* se debe llamar el servicio respectivo para las asignaciones de OPA, apenas esté listo
        showAlert(
          'Atención',
          'No hay servicio aún para ver las asignaciones de las OPAS, así que no hay asignaciones de opa por el momento',
          'warning'
        );

        // Call the service for OPA
        break;
      default:
        // Default service call or no service call
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
