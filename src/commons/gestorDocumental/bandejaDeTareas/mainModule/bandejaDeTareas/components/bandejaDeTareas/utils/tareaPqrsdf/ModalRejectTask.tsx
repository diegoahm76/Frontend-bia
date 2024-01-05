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
import { FC, useContext, useState } from 'react';
import CleanIcon from '@mui/icons-material/CleaningServices';
import CloseIcon from '@mui/icons-material/Close';
import { Title } from '../../../../../../../../../components';
import { Controller, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { ModalAndLoadingContext } from '../../../../../../../../../context/GeneralContext';
import {
  setCurrentTareaPqrsdfTramitesUotrosUopas,
  setListaTareasPqrsdfTramitesUotrosUopas,
} from '../../../../../../toolkit/store/BandejaDeTareasStore';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../../hooks';
import { control_error } from '../../../../../../../../../helpers';
import { control_warning } from '../../../../../../../../almacen/configuracion/store/thunks/BodegaThunks';
import { putRechazarTarea } from '../../../../services/servicesStates/pqrsdf/rechazarTarea/putRechazarTarea.service';
import { getListadoTareasByPerson } from '../../../../../../toolkit/thunks/Pqrsdf/getListadoTareasByPerson.service';
import { AuthSlice } from '../../../../../../../../auth/interfaces';
import { showAlert } from '../../../../../../../../../utils/showAlert/ShowAlert';

export const ModalRejectTask: FC = (): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();

  //* redux states
  const { currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas } =
    useAppSelector((state) => state.BandejaTareasSlice);
  const {
    userinfo: { id_persona },
  } = useAppSelector((state: AuthSlice) => state.auth);

  //* context declaration
  const { openModalNuevo, handleOpenModalNuevo, handleSecondLoading } =
    useContext(ModalAndLoadingContext);

  const resetState = () => {
    dispatch(setCurrentTareaPqrsdfTramitesUotrosUopas(null));
    handleOpenModalNuevo(false);
    reset_justificacion({
      justificacion_rechazo: '',
    });
  };

  const handleSubsmit = async () => {
    if (!currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas)
      return control_error('No se ha seleccionado una tarea para rechazar');
    if (!exe_watch_justificacion?.justificacion_rechazo)
      return control_warning(
        'Debe ingresar una justificación de rechazo para la tarea'
      );

    try {
      const rejectTask = await putRechazarTarea(
        currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas.id_tarea_asignada,
        exe_watch_justificacion?.justificacion_rechazo,
        setLoading
      );

      if (rejectTask?.status === 200) {
        const listadoTareas = await getListadoTareasByPerson(
          id_persona,
          handleSecondLoading,
          'Rpqr'
        );

        dispatch(setListaTareasPqrsdfTramitesUotrosUopas(listadoTareas ?? []));
        showAlert(
          'Tarea rechazada',
          'La tarea se ha rechazado correctamente',
          'success'
        );
      } else {
        showAlert(
          'Opps!',
          'No se ha podido rechazar la tarea, por favor intente nuevamente',
          'error'
        );
      }
    } catch (error) {
      console.error(error);
      showAlert(
        'Opps!',
        'No se ha podido rechazar la tarea, por favor intente nuevamente',
        'error'
      );
    } finally {
      resetState();
    }
  };

  //* states
  const [loading, setLoading] = useState(false);

  const {
    control: control_justificacion,
    reset: reset_justificacion,
    watch: watch_justificacion,
  } = useForm({
    defaultValues: {
      justificacion_rechazo: '',
    },
  });

  const exe_watch_justificacion = watch_justificacion();

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="md"
        open={openModalNuevo}
        onClose={() => {
          dispatch(setCurrentTareaPqrsdfTramitesUotrosUopas(null));
          handleOpenModalNuevo(false);
        }}
      >
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubsmit();
          }}
        >
          <DialogTitle>
            <Title
              title={`Rechazar tarea con radicado: ${
                currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.radicado ??
                'N/A'
              }`}
            />
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
                <Controller
                  name="justificacion_rechazo"
                  control={control_justificacion}
                  defaultValue=""
                  // rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      label="Justificación de rechazo *"
                      placeholder="Escriba la justificación de rechazo de la tarea"
                      size="small"
                      multiline
                      rows={8}
                      variant="outlined"
                      value={value}
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => {
                        onChange(e.target.value);
                        // //  console.log('')(e.target.value);
                      }}
                    />
                  )}
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
                variant="outlined"
                color="primary"
                onClick={() => {
                  reset_justificacion({
                    justificacion_rechazo: '',
                  });
                }}
                startIcon={<CleanIcon />}
              >
                LIMPIAR CAMPOS
              </Button>
              <LoadingButton
                loading={loading}
                type="submit"
                color="success"
                variant="contained"
                onClick={() => {}}
                startIcon={<CheckCircleOutlineIcon />}
              >
                RECHAZAR TAREA
              </LoadingButton>
              <Button
                color="error"
                variant="contained"
                onClick={() => {
                  dispatch(setCurrentTareaPqrsdfTramitesUotrosUopas(null));
                  handleOpenModalNuevo(false);
                }}
                startIcon={<CloseIcon />}
              >
                CANCELAR Y CERRAR
              </Button>
            </Stack>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};
