/* eslint-disable @typescript-eslint/naming-convention */
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Stack,
  TextField,
} from '@mui/material';
import { FC, useContext, useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Title } from '../../../../../../../../../components';
import { ModalAndLoadingContext } from '../../../../../../../../../context/GeneralContext';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../../hooks';
import { setCurrentTareaPqrsdfTramitesUotrosUopas } from '../../../../../../toolkit/store/BandejaDeTareasStore';
import { getInfoTareaRechazada } from '../../../../services/servicesStates/pqrsdf/rechazarTarea/getInfoTareaRechazada.service';
import { control_success } from '../../../../../../../../../helpers';
import { getInfoTareaRechazadaOtros } from '../../../../services/servicesStates/otros/getInfoTaskRejectedOtros.service';
import { showAlert } from '../../../../../../../../../utils/showAlert/ShowAlert';
import { getInfoTareaRechazadaTramites } from '../../../../services/servicesStates/tramites/getInfoRejectedTaskTramite.service';
import { getInfoTareaRechazadaOpas } from '../../../../services/servicesStates/opas/getInfoOpaRechazada.service';

export const ModalSeeRejectedTask: FC = (): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();

  //* redux states
  const {
    currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas,
    listaTareasPqrsdfTramitesUotrosUopas,
  } = useAppSelector((state) => state.BandejaTareasSlice);

  //* context declaration
  const { openModalNuevoNumero2, handleOpenModalNuevoNumero2 } = useContext(
    ModalAndLoadingContext
  );

  //* useState
  const [infoTareaRechazada, setInfoTareaRechazada] = useState('');

  interface TaskType {
    getInfoRejectedTask: (
      id_tarea_asignada: number,
      handleOpenModalNuevoNumero2: React.Dispatch<React.SetStateAction<boolean>>
    ) => Promise<any>;
  }

  const TASK_TYPES: Record<string, TaskType> = {
    'RESPONDER PQRSDF': {
      getInfoRejectedTask: getInfoTareaRechazada,
    },
    'RESPONDER OTRO': {
      getInfoRejectedTask: getInfoTareaRechazadaOtros,
    },
     'RESPONDER TRÁMITE': {
      getInfoRejectedTask: getInfoTareaRechazadaTramites,
     },
     'RESPONDER OPA': {
      getInfoRejectedTask: getInfoTareaRechazadaOpas,
     },
    // Agrega aquí los nuevos tipos de tareas
    // agregar luego para tramites y para opas
  };

  useEffect(() => {
    if (!openModalNuevoNumero2) return;

    (async () => {
      try {
        const { tipo_tarea } = listaTareasPqrsdfTramitesUotrosUopas[0] || {};
        const taskType = TASK_TYPES[tipo_tarea];

        if (!taskType || !taskType.getInfoRejectedTask) {
          showAlert(
            'Opss..',
            'No se pudo hacer la petición para obtener la información de la justificación del rechazo, ha ocurrido un error, por favor intente de nuevo',
            'error'
          );
        }

        const getJustificacion = await taskType.getInfoRejectedTask(
          currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.id_tarea_asignada,
          handleOpenModalNuevoNumero2
        );

        setInfoTareaRechazada(getJustificacion);
        control_success(
          'Se ha obtenido la justificación del rechazo de la tarea'
        );
      } catch (error) {
        showAlert(
          'Opss..',
          'No se pudo encontrar la información de la justificación del rechazo, ha ocurrido un error, por favor intente de nuevo',
          'error'
        );
      }
    })();
  }, [openModalNuevoNumero2]);
  return (
    <>
      <Dialog
        fullWidth
        maxWidth="md"
        open={openModalNuevoNumero2}
        onClose={() => {
          dispatch(setCurrentTareaPqrsdfTramitesUotrosUopas(null));
          handleOpenModalNuevoNumero2(false);
        }}
      >
        <Box component="form">
          <DialogTitle>
            <Title title="Consulta de la justificación del rechazo de la tarea" />
          </DialogTitle>
          <Divider />
          <DialogContent
            sx={{
              mb: '0px',
              justifyContent: 'center',
            }}
          >
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sm={12}
                lg={12}
                md={12}
                sx={{
                  marginY: '1.5rem',
                }}
              >
                <TextField
                  disabled
                  fullWidth
                  label="Justificación del rechazo (proporcionada por el usuario)"
                  size="small"
                  multiline
                  rows={8}
                  variant="outlined"
                  value={infoTareaRechazada ?? ''}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <Divider />
          <DialogActions>
            <Stack
              direction="row"
              spacing={2}
              sx={{ mr: '15px', mb: '10px', mt: '10px' }}
            >
              <Button
                color="error"
                variant="contained"
                onClick={() => {
                  dispatch(setCurrentTareaPqrsdfTramitesUotrosUopas(null));
                  handleOpenModalNuevoNumero2(false);
                }}
                startIcon={<CloseIcon />}
              >
                CERRAR
              </Button>
            </Stack>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};
