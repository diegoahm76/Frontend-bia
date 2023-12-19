/* eslint-disable @typescript-eslint/naming-convention */
import { Box, SpeedDial, SpeedDialAction } from '@mui/material';
import MultipleStopIcon from '@mui/icons-material/MultipleStop';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../../../../hooks';
import { withValidation } from '../../functions/validationAction';
import { showAlert } from '../../../../../../../../../../../utils/showAlert/ShowAlert';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { resetPanelVentanillaFull, setActionssToManagePermissions } from '../../../../../../../../toolkit/store/BandejaDeTareasStore';
import { postDigitalizacionComplementos } from '../../../../../../../../toolkit/thunks/PqrsdfyComplementos/postDigitalizacion.service';
import { useEffect } from 'react';

export const ButtonsComplementos = (): JSX.Element => {
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
    const { idComplementoUsu_PQR } =
      currentElementPqrsdComplementoTramitesYotros;
    await postDigitalizacionComplementos(idComplementoUsu_PQR);
    dispatch(resetPanelVentanillaFull());
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

  const handleContinuarAsignacionAGrupo = withValidation(() =>
    console.log('Continuar con asignación de grupo')
  );

  const handleClickActionsGeneral = (action: any) => {
    //* por cada nombre se ejecutaran acciones diferentes, se debe analizar por si vienen cambios desde el backend que se plantee
    switch (action.id) {
      case 'Dig':
        handleDigitalizacion(action, navigate);
        break;
      case 'ContinuarAsigGrup':
        handleContinuarAsignacionAGrupo(action, navigate);
        break;
      default:
        break;
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
        {actionsComplementos.map(
          (action: {
            id: string;
            icon: any;
            name: string;
            path: string;
            disabled: boolean;
          }) =>
            action.disabled ? <></> : (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={() => handleClickActionsGeneral(action)}
              />
            )
        )}
      </SpeedDial>
    </Box>
  );
};
