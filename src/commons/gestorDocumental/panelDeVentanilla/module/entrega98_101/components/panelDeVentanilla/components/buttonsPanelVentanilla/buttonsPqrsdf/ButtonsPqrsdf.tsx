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
import { postDigitalizacionPqrsdf } from '../../../../../../../toolkit/thunks/PqrsdfyComplementos/postDigitalizacion.service';

/* eslint-disable @typescript-eslint/naming-convention */
export const ButtonsPqrsdf: React.FC = (): JSX.Element => {
  //* dispatch decalration
  const dispatch = useAppDispatch();
  //* redux states
  const actions = useAppSelector((state) => state.PanelVentanillaSlice.actions);
  const currentElementPqrsdComplementoTramitesYotros = useAppSelector(
    (state) =>
      state.PanelVentanillaSlice.currentElementPqrsdComplementoTramitesYotros
  );
  //* navigate declaration
  const navigate = useNavigate();

  // ? MANEJO DE ACCIONES PARA PQRSDF ----------------------
  // ? MANEJO DE ACCIONES PARA PQRSDF ----------------------
  // ? MANEJO DE ACCIONES PARA PQRSDF ----------------------

  const sendDigitalizationRequest = async () => {
    const { id_PQRSDF } = currentElementPqrsdComplementoTramitesYotros;
    await postDigitalizacionPqrsdf(id_PQRSDF);
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

  const handleAsignacionPersonal = withValidation(() =>
    console.log('Enviar solicitud al usuario')
  );

  const handleAsignacionGrupo = withValidation(() =>
    console.log('Asignar al grupo')
  );

  const handleContinuarAsignacionAGrupo = withValidation(() =>
    console.log('Continuar con asignación de grupo')
  );

  interface action {
    [key: string]: any;
  }

  const actionHandlers: action = {
    Dig: handleDigitalizacion,
    AsigPer: handleAsignacionPersonal,
    AsigGrup: handleAsignacionGrupo,
    ContinuarAsigGrup: handleContinuarAsignacionAGrupo,
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
        {actions.every((action: { disabled: boolean }) => action.disabled) ? (
          <Typography variant="body1" color="text.secondary">
            No hay acciones disponibles para el elemento seleccionado
          </Typography>
        ) : (
          actions.map(
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
