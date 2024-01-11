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
      currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.tipo_tarea ||
      currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.tipo;

    let res;

    switch (tipo) {
      case 'Responder PQRSDF':
      console.log('liderAsignado', liderAsignado)
      console.log('currentGrupo', currentGrupo)
      console.log('currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas', currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas)
      console.log('comentario de reasignacion', comentario)


        showAlert(
          'Atención',
          'No hay servicio aún para (RESPUESTA A PQRSDF), así que no se realiza re-asignacion por el momento',
          'warning'
        )
        // Call the service for PQRSDF
        /* res = await postAsignacionGrupoPQRSDF(
          {
            id_pqrsdf: currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.id_PQRSDF,
            id_persona_asignada: liderAsignado?.id_persona,
            id_und_org_seccion_asignada: currentGrupo?.value,
          },
          handleSecondLoading
        );*/
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
        case 'Responder PQRSDF':
          // Fetch the assignments for PQRSDF
          /*asignaciones = await getAsignacionesPQRSDF(
            // para pqrsdf
            currentElementPqrsdComplementoTramitesYotros?.id_PQRSDF,
            handleGeneralLoading
          );*/
          break;
        case 'Responder Trámite':
          // Fetch the assignments for Tramites y Servicios
          /*asignaciones = await getAsignacionesTramitesYServicios(
            currentElementPqrsdComplementoTramitesYotros?.id_PQRSDF,
            handleGeneralLoading
          );*/
          break;
        case 'Otros':
        // Fetch the assignments for Otros
        /* asignaciones = await getAsignacionesOtros(
            currentElementPqrsdComplementoTramitesYotros?.id_PQRSDF,
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
                  {`ASIGNAR (${
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
