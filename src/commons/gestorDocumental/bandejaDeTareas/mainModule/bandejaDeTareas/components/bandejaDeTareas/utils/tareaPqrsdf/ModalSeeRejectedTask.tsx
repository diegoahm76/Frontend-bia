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

export const ModalSeeRejectedTask: FC = (): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();

  //* redux states
  const { currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas } =
    useAppSelector((state) => state.BandejaTareasSlice);

  //* context declaration
  const { openModalNuevoNumero2, handleOpenModalNuevoNumero2 } = useContext(
    ModalAndLoadingContext
  );

  //* useState
  const [infoTareaRechazada, setInfoTareaRechazada] = useState('');

  const modifications = [
    'La tarea que se me asignó no era la correcta, se debe asignar la tarea de responder la PQRSDF',
    'La tarea asignada no era la correcta, se debe asignar la tarea de responder la PQRSDF',
    'La tarea que se me asignó era incorrecta, se debe asignar la tarea de responder la PQRSDF',
    'La tarea asignada era incorrecta, se debe asignar la tarea de responder la PQRSDF',
    'La tarea que se me asignó no era la correcta, se debe asignar la tarea de responder el trámite',
    // Agrega más variaciones aquí
  ];

  useEffect(() => {
    if (!openModalNuevoNumero2) return;

    // void getInfoTareaRechazada(currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.id_tarea_asignada, handleOpenModalNuevoNumero2);
    //* en el then se debe setear el estado de la justificación

    const randomIndex = Math.floor(Math.random() * modifications.length);
    setInfoTareaRechazada(modifications[randomIndex]);
    control_success('Se ha obtenido la justificación del rechazo de la tarea');
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
