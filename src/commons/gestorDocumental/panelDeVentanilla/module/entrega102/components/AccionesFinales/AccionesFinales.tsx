/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Grid, Stack } from '@mui/material';
import { containerStyles } from '../../../../../tca/screens/utils/constants/constants';
import { Title } from '../../../../../../../components';
import {
  getOutModule,
  reset_all,
} from '../../../../../../../utils/functions/getOutOfModule';
import { resetPanelVentanillaFull } from '../../../../toolkit/store/PanelVentanillaStore';
import CloseIcon from '@mui/icons-material/Close';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../../../hooks';
import { useContext } from 'react';
import { AsignacionGrupoContext } from '../../context/AsignacionGrupoContext';
import SaveIcon from '@mui/icons-material/Save';
import Swal from 'sweetalert2';
import { LoadingButton } from '@mui/lab';
import { ModalAndLoadingContext } from '../../../../../../../context/GeneralContext';
import { postAsignacionGrupo as postAsignacionGrupoPQRSDF } from '../../services/post/pqrsdf/postAsignacionGrupo.service';
import { getAsignaciones as getAsignacionesPQRSDF } from '../../services/asignaciones/pqrsdf/getAsignaciones.service';
import { showAlert } from '../../../../../../../utils/showAlert/ShowAlert';
import { getAsignacionesOtros } from '../../services/asignaciones/otros/getAsignacionesOtros.service';
import { postAsignacionGrupoOtros } from '../../services/post/otros/postAsignacionGrupoOtros.service';

export const AccionesFinales = (): JSX.Element => {
  //* conetxt declaration
  const {
    listaAsignaciones,
    liderAsignado,
    currentGrupo,
    setListaAsignaciones,
  } = useContext(AsignacionGrupoContext);
  const { secondLoading, handleSecondLoading, handleGeneralLoading } =
    useContext(ModalAndLoadingContext);
  //* dispatch declaration
  const dispatch = useAppDispatch();

  //* navigate declaration
  const navigate = useNavigate();

  //* redux states
  const currentElementPqrsdComplementoTramitesYotros = useAppSelector(
    (state) =>
      state.PanelVentanillaSlice.currentElementPqrsdComplementoTramitesYotros
  );

  // ? declaración de las funciones

  const handleClick = async () => {
    const item = listaAsignaciones.find(
      (item: any) =>
        item.estado_asignado === 'EN ESPERA' ||
        item.estado_asignado === 'ACEPTADA'
    );

    if (item) {
      await Swal.fire({
        icon: 'warning',
        title: 'Atención',
        text: `Hay asignaciones pendientes por aceptar o rechazar, por favor verifique`,
        confirmButtonText: 'Entendido',
      });
      return;
    }

    const tipo =
      currentElementPqrsdComplementoTramitesYotros?.tipo_solicitud ||
      currentElementPqrsdComplementoTramitesYotros?.tipo;

    let res;

    switch (tipo) {
      case 'PQRSDF':
        // Call the service for PQRSDF
        console.log(
          'somos la información para el post de la asignación y respectiva creación del expediente',
          {
            id_pqrsdf:
              currentElementPqrsdComplementoTramitesYotros?.id_PQRSDF,
            id_persona_asignada: liderAsignado?.id_persona,
            id_und_org_seccion_asignada: currentGrupo?.grupoSelected?.value,
            id_catalogo_serie_subserie:
              currentGrupo?.currentSerie?.id_cat_serie_und,
            // id_serie:  currentGrupo?.currentSerie,
          }
        );
       res = await postAsignacionGrupoPQRSDF(
          {
            id_pqrsdf:
              currentElementPqrsdComplementoTramitesYotros?.id_PQRSDF,
            id_persona_asignada: liderAsignado?.id_persona,
            id_und_org_seccion_asignada: currentGrupo?.grupoSelected?.value,
            id_catalogo_serie_subserie:
              currentGrupo?.currentSerie?.id_cat_serie_und,
          },
          handleSecondLoading
        );
        break;
      case 'Tramites y Servicios':
        // Call the service for Tramites y Servicios
        /*  res = await postAsignacionGrupoTramitesYServicios(
          {
            id_pqrsdf: currentElementPqrsdComplementoTramitesYotros?.id_PQRSDF,
            id_persona_asignada: liderAsignado?.id_persona,
            id_und_org_seccion_asignada: currentGrupo?.value,
          },
          handleSecondLoading
        );*/
        break;
      case 'OTROS':
        // Call the service for Otros
        res = await postAsignacionGrupoOtros(
          {
            id_otros: currentElementPqrsdComplementoTramitesYotros?.id_otros,
            id_persona_asignada: liderAsignado?.id_persona,
            id_und_org_seccion_asignada: currentGrupo?.value,
          },
          handleSecondLoading
        );
        break;
      case 'OPA':
        // Call the service for OPA
        showAlert(
          'Estimado usuario:',
          'No hay servicio aún para asignar la OPA, así que no se realiza asignacion de este elemento',
          'warning'
        );
        /*res = await postAsignacionGrupoOPA(
            {
              id_pqrsdf: currentElementPqrsdComplementoTramitesYotros?.id_PQRSDF,
              id_persona_asignada: liderAsignado?.id_persona,
              id_und_org_seccion_asignada: currentGrupo?.value,
            },
            handleSecondLoading
          );*/
        break;
      default:
        // Default service call or no service call
        break;
    }

    if (res) {
      await Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: `Se ha realizado la asignación a grupo correctamente`,
        confirmButtonText: 'Entendido',
      });

      let asignaciones;

      switch (tipo) {
        case 'PQRSDF':
          // Fetch the assignments for PQRSDF
          asignaciones = await getAsignacionesPQRSDF(
            // para pqrsdf
            currentElementPqrsdComplementoTramitesYotros?.id_PQRSDF,
            handleGeneralLoading
          );
          break;
        case 'Tramites y Servicios':
          // Fetch the assignments for Tramites y Servicios
          /*asignaciones = await getAsignacionesTramitesYServicios(
            currentElementPqrsdComplementoTramitesYotros?.id_PQRSDF,
            handleGeneralLoading
          );*/
          break;
        case 'OTROS':
          // Fetch the assignments for Otros
          asignaciones = await getAsignacionesOtros(
            currentElementPqrsdComplementoTramitesYotros?.id_otros,
            handleGeneralLoading
          );
          break;
        case 'OPA':
          showAlert(
            'Atención',
            'No hay servicio aún para ver las asignaciones de las OPA, así que no hay asignaciones de opa por el momento',
            'warning'
          );
          // Fetch the assignments for OOpas
          /* asignaciones = await getAsignacionesOPas(
              currentElementPqrsdComplementoTramitesYotros?.id_PQRSDF,
              handleGeneralLoading
            );*/
          break;
        default:
          // Default fetch call or no fetch call
          break;
      }

      setListaAsignaciones(asignaciones);
    }
  };

  return (
    <Grid container sx={containerStyles}>
      <Grid item xs={12}>
        <Title title="Acciones" />
        <section
          style={{
            textAlign: 'center',
            justifyContent: 'center',
            marginTop: '20px',
          }}
        >
          <Grid
            container
            sx={{
              justifyContent: 'center',
            }}
            spacing={2}
          >
            <Grid
              item
              xs={12}
              sm={12}
              sx={{
                justifyContent: 'center',
              }}
            >
              <Stack
                direction="row"
                justifyContent="center"
                spacing={2}
                sx={{ m: '20px 0' }}
              >
                <Button
                  color="error"
                  variant="contained"
                  startIcon={<CloseIcon />}
                  onClick={() => {
                    getOutModule(navigate, [
                      () => console.log('haz salido del módulo'),
                    ]);
                  }}
                >
                  SALIR DEL MÓDULO
                </Button>

                <Button
                  color="primary"
                  variant="outlined"
                  startIcon={<CleanIcon />}
                  onClick={() => {
                    reset_all([() => dispatch(resetPanelVentanillaFull())]);
                  }}
                >
                  REINICIAR Y VOLVER A PANEL DE VENTANILLA
                </Button>

                <LoadingButton
                  loading={secondLoading}
                  color="success"
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={handleClick}
                >
                  {`ASIGNAR ${
                    currentElementPqrsdComplementoTramitesYotros?.tipo_solicitud ||
                    currentElementPqrsdComplementoTramitesYotros?.tipo
                  } A GRUPO`}
                </LoadingButton>
              </Stack>
            </Grid>
          </Grid>
        </section>
      </Grid>
    </Grid>
  );
};
