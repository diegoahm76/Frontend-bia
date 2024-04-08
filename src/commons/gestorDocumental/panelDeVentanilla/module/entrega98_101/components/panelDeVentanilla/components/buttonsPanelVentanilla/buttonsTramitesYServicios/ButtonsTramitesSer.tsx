import { Box, SpeedDial, SpeedDialAction, Typography } from '@mui/material';
import MultipleStopIcon from '@mui/icons-material/MultipleStop';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../../../hooks';
import { showAlert } from '../../../../../../../../../../utils/showAlert/ShowAlert';
import Swal from 'sweetalert2';
import { withValidation } from '../functions/validationAction';
import { useNavigate } from 'react-router-dom';
import { postDigitalizacionOpas } from '../../../../../../../toolkit/thunks/opas/postDigitalizacionOpas.service';
import { postDigitalizacionTramites } from '../../../../../../../toolkit/thunks/TramitesyServiciosyRequerimientos/postDigitalizacionTramites.service';

/* eslint-disable @typescript-eslint/naming-convention */
export const ButtonsTramites: React.FC = (): JSX.Element => {
  //* redux states
  const actionsTramitesYServicios = useAppSelector(
    (state) => state.PanelVentanillaSlice.actionsTramitesYServicios
  );
  const currentElementPqrsdComplementoTramitesYotros = useAppSelector(
    (state) =>
      state.PanelVentanillaSlice.currentElementPqrsdComplementoTramitesYotros
  );
  //* navigate declaration
  const navigate = useNavigate();

  // ? MANEJO DE ACCIONES PARA OPAS ----------------------
  // ? MANEJO DE ACCIONES PARA OPAS ----------------------

  const sendDigitalizationRequest = async () => {
   const { id_solicitud_tramite } =
      currentElementPqrsdComplementoTramitesYotros;
    await postDigitalizacionTramites(id_solicitud_tramite);
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
          'Haz decidido no enviar la solicitud de digitalización del trámite.',
          'info'
        );
      }
    });
  });

  const handleAsignacionGrupo = withValidation(() =>
    console.log('Asignar al grupo')
  );

  const handleAsignacionJurídica = withValidation(() =>
    console.log('ir a revisión jurídica')
  );

  interface action {
    [key: string]: any;
  }

  const actionHandlers: action = {
    Dig: handleDigitalizacion,
    AsigGrup: handleAsignacionGrupo,
    Jurídica: handleAsignacionJurídica,
  };

  const handleClickActionsGeneral = (action: any) => {
    const handler = actionHandlers[action.id];
    if (handler) {
      handler(action, navigate);
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
        {actionsTramitesYServicios?.every(
          (action: { disabled: boolean }) => action.disabled
        ) ? (
          <Typography variant="body1" color="text.secondary">
            No hay acciones disponibles para el elemento seleccionado
          </Typography>
        ) : (
          actionsTramitesYServicios?.map(
            (action: {
              id: string;
              icon: any;
              name: string;
              path: string;
              disabled: boolean;
            }) =>
              action.disabled ? (
                <></>
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
