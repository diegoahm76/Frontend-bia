/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Grid, Stack } from '@mui/material';
import { containerStyles } from '../../../../../tca/screens/utils/constants/constants';
import { Title } from '../../../../../../../components';
import {
  getOutModule,
  reset_all,
} from '../../../../../../../utils/functions/getOutOfModule';
//* cambiar por reset bandeja Tareas
import CloseIcon from '@mui/icons-material/Close';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../../../hooks';
import { useContext } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import Swal from 'sweetalert2';
import { LoadingButton } from '@mui/lab';
import { ModalAndLoadingContext } from '../../../../../../../context/GeneralContext';
import { showAlert } from '../../../../../../../utils/showAlert/ShowAlert';
import { ReasignacionContext } from '../../context/ReasignacionContext';
import { resetBandejaDeTareasFull } from '../../../../toolkit/store/BandejaDeTareasStore';
import { postReAsignacionTarea } from '../../services/post/pqrsdf/postReAsignacionTarea.service';
import { getReAsignacionesTareasPqrsdf } from '../../services/reasignaciones/pqrsdf/getReAsignacionesTaskPqrsdf.service';

export const AccionesFinales = (): JSX.Element => {
  //* conetxt declaration
  const {
    listaAsignaciones,
    liderAsignado,
    currentGrupo,
    setListaAsignaciones,
    comentario,
  } = useContext(ReasignacionContext);
  const { secondLoading, handleSecondLoading, handleGeneralLoading } =
    useContext(ModalAndLoadingContext);
  //* dispatch declaration
  const dispatch = useAppDispatch();

  //* navigate declaration
  const navigate = useNavigate();

  //* redux states
  const currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas = useAppSelector(
    (state) =>
      state.BandejaTareasSlice
        .currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas
  );

  // ? declaración de las funciones

  const handleClick = async () => {
    if (
      currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.estado_tarea ===
      'Respondida por el propietario de la bandeja de tareas'
    ) {
      showAlert(
        'Opss!',
        'Esta PQRSDF ya ha sido respondida, por lo que no se puede reasignar',
        'warning'
      );
      return;
    }

    if (!Array.isArray(listaAsignaciones)) {
      console.error('listaAsignaciones debe ser un array');
      return;
    }

    const item = listaAsignaciones.find(
      (item: any) =>
        item.hasOwnProperty('estado_asignacion') &&
        (item.estado_asignacion === 'En espera' ||
          item.estado_asignacion === 'Aceptada')
    );

    if (item) {
      await Swal.fire({
        icon: 'warning',
        title: 'Atención',
        text: `Hay reasignaciones pendientes por aceptar o rechazar, por favor verifique`,
        confirmButtonText: 'Entendido',
      });
      return;
    }
    const tipo =
      currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.tipo_tarea ||
      currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.tipo;

    let res;

    switch (tipo) {
      case 'RESPONDER PQRSDF':
      case 'Responder PQRSDF':
        res = await postReAsignacionTarea(
          {
            id_tarea_asignada:
              currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.id_tarea_asignada,
            id_persona_a_quien_se_reasigna: currentGrupo?.value,
            comentario_reasignacion: comentario,
          },
          handleSecondLoading
        );
        break;
      case 'Responder Trámite':
        // Call the service for Tramites y Servicios
        /*  res = await postAsignacionGrupoTramitesYServicios(
          {
            id_pqrsdf: currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.id_PQRSDF,
            id_persona_asignada: liderAsignado?.id_persona,
            id_und_org_seccion_asignada: currentGrupo?.value,
          },
          handleSecondLoading
        );*/
        break;
      case 'Otros':
        // Call the service for Otros
        /*  res = await postAsignacionGrupoOtros(
          {
            id_pqrsdf: currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.id_PQRSDF,
            id_persona_asignada: liderAsignado?.id_persona,
            id_und_org_seccion_asignada: currentGrupo?.value,
          },
          handleSecondLoading
        );*/
        break;
      case 'OPA':
        // Call the service for OPA
        showAlert(
          'Estimado usuario:',
          'No hay servicio aún para asignar la OPA, así que no se realiza asignacion por el momento',
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
        case 'RESPONDER PQRSDF':
        case 'Responder PQRSDF':
          asignaciones = await getReAsignacionesTareasPqrsdf(
            // para pqrsdf
            currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.id_tarea_asignada,
            handleGeneralLoading
          );
          break;
        case 'Responder Trámite':
          // Fetch the assignments for Tramites y Servicios
          /*asignaciones = await getAsignacionesTramitesYServicios(
            currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.id_PQRSDF,
            handleGeneralLoading
          );*/
          break;
        case 'Otros':
        // Fetch the assignments for Otros
        /* asignaciones = await getAsignacionesOtros(
            currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.id_PQRSDF,
            handleGeneralLoading
          );*/
        case 'OPA':
          showAlert(
            'Atención',
            'No hay servicio aún para ver las asignaciones de las OPA, así que no hay asignaciones de opa por el momento',
            'warning'
          );
          // Fetch the assignments for OOpas
          /* asignaciones = await getAsignacionesOPas(
              currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.id_PQRSDF,
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
                      () => dispatch(resetBandejaDeTareasFull()),
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
                    console.log('reset');
                    reset_all([() => dispatch(resetBandejaDeTareasFull())]);
                  }}
                >
                  REINICIAR Y VOLVER A BANDEJA DE TAREAS
                </Button>

                <LoadingButton
                  loading={secondLoading}
                  color="success"
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={handleClick}
                >
                  {`RE-ASIGNAR (${
                    currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.tipo_tarea ||
                    currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.tipo
                  }) A UNIDAD`}
                </LoadingButton>
              </Stack>
            </Grid>
          </Grid>
        </section>
      </Grid>
    </Grid>
  );
};
