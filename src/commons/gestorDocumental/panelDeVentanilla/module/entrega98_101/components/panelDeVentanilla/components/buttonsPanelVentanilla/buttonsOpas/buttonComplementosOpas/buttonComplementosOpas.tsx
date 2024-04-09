/* eslint-disable @typescript-eslint/naming-convention */
import { Box, SpeedDial, SpeedDialAction, Typography } from '@mui/material';
import MultipleStopIcon from '@mui/icons-material/MultipleStop';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../../../../hooks';
import { withValidation } from '../../functions/validationAction';
import { showAlert } from '../../../../../../../../../../../utils/showAlert/ShowAlert';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { postDigitalizacionComplementos } from '../../../../../../../../toolkit/thunks/PqrsdfyComplementos/postDigitalizacion.service';
import { putContinuarAsigGrupoComple } from '../../../../../../../../toolkit/thunks/PqrsdfyComplementos/putContinuarAsigGrupoComple.service';
import { putContinuarAsigGrupoComOpa } from '../../../../../../../../toolkit/thunks/opas/complementos/putContinuarAsigGrupOpas.service';

export const ButtonsComplementosOpas = (): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();
  //* navigate
  const navigate = useNavigate();

  const actionsComplementos = useAppSelector(
    (state) => state.PanelVentanillaSlice.actionsComplementos
  );
  const currentElementPqrsdComplementoTramitesYotros = useAppSelector(
    (state) =>
      state.PanelVentanillaSlice.currentElementPqrsdComplementoTramitesYotros
  );

  const sendDigitalizationRequest = async () => {
    const { id_respuesta_requerimiento } =
      currentElementPqrsdComplementoTramitesYotros;
    await postDigitalizacionComplementos(id_respuesta_requerimiento);
    // dispatch(resetPanelVentanillaFull());
  };

  const sendContinuarAsignacionAGrupoRequest = async () => {
    const { id_respuesta_requerimiento } =
      currentElementPqrsdComplementoTramitesYotros;
    await putContinuarAsigGrupoComOpa(id_respuesta_requerimiento);
    // dispatch(resetPanelVentanillaFull());
  };

  const handleDigitalizacion = withValidation(async () => {
    await Swal.fire({
      title: '¿Desea enviar la solicitud de digitalización?',
      text: 'Se enviará la solicitud de digitalización al módulo de central de digitalización.',
      showDenyButton: true,
      confirmButtonText: `Si, digitalizar`,
      denyButtonText: `No, cancelar`,
      confirmButtonColor: '#3085d6',
      denyButtonColor: '#d33',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await sendDigitalizationRequest();
      } else if (result.isDenied) {
        showAlert(
          'Opps...',
          'Haz decidido no enviar la solicitud de digitalización.',
          'info'
        );
      }
    });
  });

  const handleContinuarAsignacionAGrupo = withValidation(
    async () =>
      await Swal.fire({
        title: '¿Desea continuar con la asignación a unidad?',
        text: 'Se enviará la solicitud de asignación a unidad para el complemento.',
        showDenyButton: true,
        confirmButtonText: `Si, continuar`,
        denyButtonText: `No, cancelar`,
        confirmButtonColor: '#3085d6',
        denyButtonColor: '#d33',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await sendContinuarAsignacionAGrupoRequest();
        } else if (result.isDenied) {
          showAlert(
            'Opps...',
            'Haz decidido cancelar la acción de continuar con la asignación a unidad.',
            'info'
          );
        }
      })
  );

  const actionHandlers: any = {
    Dig: handleDigitalizacion,
    ContinuarAsigGrup: handleContinuarAsignacionAGrupo,
  };

  const handleClickActionsGeneral = (action: any) => {
    const handleAction = actionHandlers[action.id];
    if (handleAction) {
      handleAction(action, navigate);
    } else {
      // puedes manejar el caso en que no se encuentra un manejador de acción aquí
      console.warn(`No se encontró un manejador de acción para ${action.id}`);
    }
  };

  return (
    <Box sx={{ height: 100, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', top: 0, left: 0 }}
        icon={<MultipleStopIcon />}
        direction="right"
      >
        {actionsComplementos.every(
          (action: { disabled: boolean }) => action.disabled
        ) ? (
          <Typography variant="body1" color="text.secondary">
            No hay acciones disponibles para el elemento seleccionado
          </Typography>
        ) : (
          actionsComplementos.map(
            (action: {
              id: string;
              icon: any;
              name: string;
              path: string;
              disabled: boolean;
            }) =>
              action.disabled ? (
                null
              ) : (
                <SpeedDialAction
                  key={action.name}
                  icon={action.icon}
                  tooltipTitle={action.name}
                  onClick={() => handleClickActionsGeneral(action)}
                />
              )
          )
        )}
      </SpeedDial>
    </Box>
  );
};
