/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Grid, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import Swal from 'sweetalert2';
import { LoadingButton } from '@mui/lab';
import { postAsignacionTramiteGrupo } from '../../services/post/tramitesServicios/postAsignacionTramites.service';
import { getAsignacionesTramites } from '../../services/asignaciones/tramites/getAsignacionesTramites.service';
import { AutoInicioContext } from '../../context/ExpedienteContext';
import { ModalAndLoadingContext } from '../../../../../../../../context/GeneralContext';
import { useAppDispatch, useAppSelector } from '../../../../../../../../hooks';
import { containerStyles } from '../../../../../../tca/screens/utils/constants/constants';
import { Title } from '../../../../../../../../components';
import { getOutModule, reset_all } from '../../../../../../../../utils/functions/getOutOfModule';
import { resetPanelVentanillaFull } from '../../../../../toolkit/store/PanelVentanillaStore';
import { showAlert } from '../../../../../../../../utils/showAlert/ShowAlert';
import { getExpedienteRelacionado } from '../../services/getExpedienteRelacionado.service';
import { getAutosDeInicioCreados } from '../../services/getAutosCreados.service';

export const AccionesFinales = (): JSX.Element => {
  //* conetxt declaration
  const {
    listaAsignaciones,
    liderAsignado,
    currentGrupo,
    setListaAsignaciones,
    setExpediente,
    setListaAutoDeInicio,
  } = useContext(AutoInicioContext);
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

    /*
    {
    "id_solicitud_tramite":2294,
    "id_und_org_seccion_asignada": 5809,
    "id_catalogo_serie_subserie" :1183
    }
    */

  const handleClick = async () => {
   /* const item = listaAsignaciones.find(
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
    }*/

    const tipo =
      currentElementPqrsdComplementoTramitesYotros?.tipo_solicitud ||
      currentElementPqrsdComplementoTramitesYotros?.tipo;

    let res;

    switch (tipo) {
      case 'TRAMITE':
        // seguramente se va a requerir ahora el id de la serie para realizar la creación del expediente
        console.log(
          'somos la información para el post de la asignación y respectiva creación del expediente',
          {
            "id_solicitud_tramite":2294,
            "id_und_org_seccion_asignada": 5809,
            "id_catalogo_serie_subserie" :1183
            },
          {
            id_solicitud_tramite:
              currentElementPqrsdComplementoTramitesYotros?.id_solicitud_tramite,
            id_persona_asignada: liderAsignado?.id_persona,
            id_und_org_seccion_asignada: currentGrupo?.grupoSelected?.value,
            id_catalogo_serie_subserie:
              currentGrupo?.currentSerie?.id_cat_serie_und,
            // id_serie:  currentGrupo?.currentSerie,
          }
        );
        res = await postAsignacionTramiteGrupo(
          {
            id_solicitud_tramite:
              currentElementPqrsdComplementoTramitesYotros?.id_solicitud_tramite,
            id_catalogo_serie_subserie:
              currentGrupo?.currentSerie?.id_cat_serie_und,
            id_persona_asignada: liderAsignado?.id_persona,
            id_und_org_seccion_asignada: currentGrupo?.grupoSelected?.value,
          },
          handleSecondLoading
        );
        break;
      default:
        // Default service call or no service call
        break;
    }

    console.log('desde asginacion ', res);
    if (res) {
      await Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: `Se ha realizado la asignación a grupo correctamente`,
        confirmButtonText: 'Entendido',
      });

      let asignaciones;

      switch (tipo) {
        case 'TRAMITE':
          asignaciones = await getAsignacionesTramites(
            currentElementPqrsdComplementoTramitesYotros?.id_solicitud_tramite,
            handleGeneralLoading
          );
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
          // Default fetch call or no fetch call
          break;
      }
      console.log('somos las siuuu asignaciones', asignaciones);
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
                  onClick={() => {
                    /*listaAsignaciones?.length &&
                    listaAsignaciones.find(
                      (el: { estado_asignado: string }) =>
                        el.estado_asignado === 'RECHAZADA'
                    )
                      ? showAlert(
                          'Opps',
                          'La asignación ya fue hecha automáticamente por el sistema',
                          'warning'
                        )
                      :*/ handleClick();
                  }}
                >
                  Crear expediente
                  {/*{`ASIGNAR ${
                    currentElementPqrsdComplementoTramitesYotros?.tipo_solicitud ||
                    currentElementPqrsdComplementoTramitesYotros?.tipo
                  } A GRUPO`}*/}
                </LoadingButton>
              </Stack>
            </Grid>
          </Grid>
        </section>
      </Grid>
    </Grid>
  );
};
