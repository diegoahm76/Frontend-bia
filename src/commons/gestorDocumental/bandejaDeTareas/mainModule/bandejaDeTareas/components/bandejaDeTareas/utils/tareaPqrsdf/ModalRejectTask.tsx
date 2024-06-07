
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
import { putRechazarTareaOtros } from '../../../../../../toolkit/thunks/otros/putRechazarTareaOtros.service';
import { getListadoTareaasOtrosByPerson } from '../../../../../../toolkit/thunks/otros/getListadoTareasOtros.service';
import { getListadoTramitesByPerson } from '../../../../../../toolkit/thunks/tramitesServicios/getListadoTramitesByPerson.service';
import { putRechazarTareaTramite } from '../../../../services/servicesStates/tramites/rechazarTramite/putRechazarTramite.service';
import { getListadoTareasOpasByPerson } from '../../../../../../toolkit/thunks/opas/getListadoDeOpasByPerson.service';
import { putRechazarTareaOpa } from '../../../../services/servicesStates/opas/rechazarTarea/RecharOpa.service';
import { rejectTaskDocs } from '../../../../../../toolkit/thunks/documentos/rechazarTareaDocs.service';
import { getListadoDocsByPerson } from '../../../../../../toolkit/thunks/documentos/getListDocsByPerson.service';

export const ModalRejectTask: FC = (): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();

  //* redux states
  const {
    currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas,
    listaTareasPqrsdfTramitesUotrosUopas,
  } = useAppSelector((state) => state.BandejaTareasSlice);
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
    setLoading(false);
  };

  const TASK_TYPES: Record<
    string,
    {
      rejectTask: (
        id_tarea_asignada: number,
        justificacion_rechazo: string,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>
      ) => Promise<any>;
      getListadoTareas: (
        idPersona: number,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>,
        tipo_de_tarea?: string,
        estado_asignacion_de_tarea?: string,
        estado_de_la_tarea?: string,
        fecha_inicio?: string,
        fecha_fin?: string
      ) => Promise<any>;
      listadoTareasType: string;
    }
  > = {
    'RESPONDER PQRSDF': {
      rejectTask: putRechazarTarea,
      getListadoTareas: getListadoTareasByPerson,
      listadoTareasType: 'Rpqr',
    },
    'RESPONDER OTRO': {
      rejectTask: putRechazarTareaOtros,
      getListadoTareas: getListadoTareaasOtrosByPerson,
      listadoTareasType: 'ROtros',
    },
    'RESPONDER TRÁMITE': {
      rejectTask: putRechazarTareaTramite,
      getListadoTareas: getListadoTramitesByPerson,
      listadoTareasType: '',
    },
    'Responder Documentos': {
      rejectTask: rejectTaskDocs,
      getListadoTareas: getListadoDocsByPerson,
      listadoTareasType: '',
    },
    'RESPONDER OPA': {
      rejectTask: putRechazarTareaOpa,
      getListadoTareas: (
        idPersona: number,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>,
        tipo_de_tarea?: string,
        estado_asignacion_de_tarea?: string,
        estado_de_la_tarea?: string,
        fecha_inicio?: string,
        fecha_fin?: string
      ) => getListadoTareasOpasByPerson(
        idPersona,
        setLoading,
        estado_asignacion_de_tarea,
        estado_de_la_tarea,
        fecha_inicio,
        fecha_fin,
        '', // Set the value of mostrar_respuesta_con_req_pendientes to false
        undefined // Set the value of radicado to undefined
      ),
      listadoTareasType: '',
    },
    // Agrega aquí los nuevos tipos de tareas
    //* agregar luego para tramites y para opas
  } as const;

  const handleSubsmit = async () => {
    setLoading(true);

    if (!currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas) {
      control_error('No se ha seleccionado una tarea para rechazar');
      return;
    }

    if (!exe_watch_justificacion?.justificacion_rechazo) {
      control_warning(
        'Debe ingresar una justificación de rechazo para la tarea'
      );
      return;
    }

    try {
      const { tipo_tarea } = listaTareasPqrsdfTramitesUotrosUopas[0] || {};
      const taskType = TASK_TYPES[tipo_tarea];

      if (!taskType) {
        console.error('Tipo de tarea no reconocido:', tipo_tarea);
        return;
      }

      const rejectedTask = await taskType.rejectTask(
        currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas.id_tarea_asignada,
        exe_watch_justificacion?.justificacion_rechazo,
        setLoading
      );

      console.log('rejectedTask', rejectedTask)
      if (rejectedTask?.status === 200 || rejectedTask?.success) {
        const listadoTareas = await taskType.getListadoTareas(
          id_persona,
          handleSecondLoading,
          taskType.listadoTareasType || ''
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
                currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.radicado ||
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

