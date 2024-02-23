/* eslint-disable no-unused-vars */
import { useContext } from 'react';
import { Box, SpeedDial, SpeedDialAction, Typography } from '@mui/material';
import MultipleStopIcon from '@mui/icons-material/MultipleStop';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../../../hooks';
//import { showAlert } from '../../../../../../../../../../utils/showAlert/ShowAlert';
//import Swal from 'sweetalert2';
import { withValidation } from '../functions/validationAction';
import { useNavigate } from 'react-router-dom';
import { ModalAndLoadingContext } from '../../../../../../../../../../context/GeneralContext';
import { ModalInfoTarea } from '../../../utils/tareaPqrsdf/ModalInfoTarea';
import { ModalRespuestaReqReasigna } from '../../../utils/tareaPqrsdf/RespuestaReqReasignaciones/ModalRespuestaReqReasigna';

/* eslint-disable @typescript-eslint/naming-convention */
export const ButtonsTareaOtros: React.FC = (): JSX.Element => {
  //* dispatch decalration
  const dispatch = useAppDispatch();
  //* redux states

  const {
    currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas,
    actionsOtros,
  } = useAppSelector((state) => state.BandejaTareasSlice);
  //* navigate declaration
  const navigate = useNavigate();

  //* context declaration
  const { handleThirdLoading, handleFourthLoading } = useContext(
    ModalAndLoadingContext
  );

  // ? MANEJO DE ACCIONES PARA PQRSDF ----------------------
  // ? MANEJO DE ACCIONES PARA PQRSDF ----------------------

  const handleInfoSolicitud = withValidation(() => {
    handleThirdLoading(true);
    console.log(currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas);
  });

  const handleReasignar = withValidation(() => console.log('Reasignar'));

  const handleArchivar = withValidation(() => console.log('Archivando tarea'));

  interface action {
    [key: string]: any;
  }

  const actionHandlers: action = {
    InfoSolictud: handleInfoSolicitud,
    // RespondeSolicitud: handleRespondeSolicitud,
    Reasignar: handleReasignar,
    Archivar: handleArchivar,
  };

  const handleClickActionsGeneral = (action: any) => {
    const handler = actionHandlers[action.id];
    if (handler) {
      handler(action, navigate);
    }
  };

  return (
    <>
      {/*se acomoda el modal para ver la información resumida de la tarea*/}
      <ModalInfoTarea />
      {/*se acomoda el modal para ver la información resumida de la tarea*/}
      {/* se acomoda el modal para ver las respuestas de los requerimientos y las reasignaciones */}
      {/* se debe cambiar este modal o analizar si el de pqrsdf funciona, pero con condicionales en el llamado de los servicios */}
      {/*<ModalRespuestaReqReasigna />*/}
      {/* se acomoda el modal para ver las respuestas de los requerimientos y las reasignaciones */}

      <Box sx={{ height: 70, transform: 'translateZ(0px)', flexGrow: 1 }}>
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ mt: '1.5rem', mr: '1.5rem' }}
          icon={<MultipleStopIcon />}
          direction="right"
        >
          {actionsOtros.every(
            (action: { disabled: boolean }) => action.disabled
          ) ? (
            <Typography variant="body1" color="text.secondary">
              No hay acciones disponibles para el elemento seleccionado
            </Typography>
          ) : (
            actionsOtros.map(
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
    </>
  );
};
