import React from 'react';
import { type Dispatch, type SetStateAction } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Grid,
  Box,
  Divider,
  Chip,
  Typography,
  Stepper,
  Step,
  StepButton,
  Button,
  // Alert,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import CloseIcon from '@mui/icons-material/Close';
// import { add_organigrams_service } from '../store/thunks/organigramThunks';
// import { useAppDispatch } from '../../../../hooks';
import { useAppSelector } from '../../../../hooks';

interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
}

interface FormValues {
  nombre: string;
  version: string;
  descripcion: string;
}

const columns: GridColDef[] = [
  {
    field: 'tipo_documento',
    headerName: 'Tipo de documento',
    width: 50,
    editable: true,
  },
  { field: 'id', headerName: 'Cedula', width: 90 },
  {
    field: 'nombre',
    headerName: 'Nombre',
    width: 150,
    editable: true,
  },
  {
    field: 'acciones',
    headerName: 'Seleccionar',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 100,
    // valueGetter: (params: GridValueGetterParams) =>
    //   `${params.row.tipo_documento || ''} ${params.row.nombre || ''}`,
  },
];

const rows = [{ id: 1033752674, nombre: 'Snow', tipo_documento: 'CC' }];

const steps = ['Seleccionar nuevo encargado', 'Verificación de delegación'];

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const DialogDelegarOrganigrama = ({
  is_modal_active,
  set_is_modal_active,
}: IProps) => {
  // const dispatch = useAppDispatch();
  const { organigram_current } = useAppSelector((state) => state.organigram);
  const [active_step, set_active_step] = React.useState(0);
  const [completed, set_completed] = React.useState<Record<number, boolean>>(
    {}
  );
  const { control: control_organigrama, handleSubmit: handle_submit } =
    useForm<FormValues>();

  const handle_close_crear_organigrama = (): void => {
    set_is_modal_active(false);
  };

  const on_submit = (data: FormValues): void => {
    // void dispatch(add_organigrams_service(data, set_position_tab_organigrama));
    handle_close_crear_organigrama();
  };

  const total_steps = (): number => {
    return steps.length;
  };

  const completed_steps = (): number => {
    return Object.keys(completed).length;
  };

  const is_last_step = (): boolean => {
    return active_step === total_steps() - 1;
  };

  const all_steps_completed = (): boolean => {
    return completed_steps() === total_steps();
  };

  const handle_next = (): void => {
    const new_active_step =
      is_last_step() && !all_steps_completed()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : active_step + 1;
    set_active_step(new_active_step);
  };

  const handle_back = (): void => {
    set_active_step((prev_active_step) => prev_active_step - 1);
  };

  const handle_step = (step: number) => () => {
    set_active_step(step);
  };

  const handle_complete = (): void => {
    const new_completed = completed;
    new_completed[active_step] = true;
    set_completed(new_completed);
    handle_next();
  };

  const handle_reset = (): void => {
    set_active_step(0);
    set_completed({});
  };

  return (
    <Dialog
      maxWidth="sm"
      open={is_modal_active}
      onClose={handle_close_crear_organigrama}
    >
      <DialogTitle>
        Delegacion de organigrama
        <IconButton
          aria-label="close"
          onClick={() => {
            set_is_modal_active(false);
          }}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ mb: '0px' }}>
        <Typography sx={{ textAlign: 'center' }}>
          Organigrama: {organigram_current.nombre}
        </Typography>
        <Typography sx={{ textAlign: 'center', mb: '20px' }}>
          Versión:{' '}
          <Chip
            size="small"
            label={organigram_current.version}
            color="success"
            variant="outlined"
          />
        </Typography>
        {/* <Alert severity="info" sx={{ m: '10px 0' }}>
          Al seleccionar un nuevo encargado para este organigrama
          automaticamente ya no tendrás acceso a los permisos para modificar el
          mismo
        </Alert> */}
        <Box>
          <Stepper
            alternativeLabel
            activeStep={active_step}
            sx={{ mb: '20px' }}
          >
            {steps.map((label, index) => (
              <Step key={label} completed={completed[index]}>
                <StepButton color="inherit" onClick={handle_step(index)}>
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
          <div>
            {all_steps_completed() ? (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  All steps completed - you&apos;re finished
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button onClick={handle_reset}>Reset</Button>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {active_step === 0 ? (
                  <>
                    <Box
                      component="form"
                      // eslint-disable-next-line @typescript-eslint/no-misused-promises
                      onSubmit={handle_submit(on_submit)}
                    >
                      <Controller
                        name="nombre"
                        control={control_organigrama}
                        defaultValue=""
                        rules={{ required: true }}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <TextField
                            margin="dense"
                            fullWidth
                            size="small"
                            label="Buscar"
                            variant="outlined"
                            value={value}
                            onChange={onChange}
                          />
                        )}
                      />
                    </Box>
                    <DataGrid
                      density="compact"
                      autoHeight
                      rows={rows}
                      columns={columns}
                      pageSize={3}
                      rowsPerPageOptions={[3]}
                    />
                  </>
                ) : (
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <Controller
                        name="nombre"
                        control={control_organigrama}
                        defaultValue=""
                        rules={{ required: true }}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <TextField
                            margin="dense"
                            fullWidth
                            size="small"
                            label="Nombre"
                            variant="outlined"
                            disabled={
                              organigram_current.fecha_terminado !== null
                            }
                            value={value}
                            onChange={onChange}
                            error={!(error == null)}
                            helperText={
                              error != null
                                ? 'Es obligatorio ingresar un nombre'
                                : 'Ingrese nombre'
                            }
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Controller
                        name="version"
                        control={control_organigrama}
                        defaultValue=""
                        rules={{ required: true }}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <TextField
                            margin="dense"
                            fullWidth
                            size="small"
                            label="Versión"
                            variant="outlined"
                            disabled={
                              organigram_current.fecha_terminado !== null
                            }
                            value={value}
                            onChange={onChange}
                            error={!(error == null)}
                            helperText={
                              error != null
                                ? 'Es obligatorio ingresar una versión'
                                : 'Ingrese versión'
                            }
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Controller
                        name="descripcion"
                        control={control_organigrama}
                        defaultValue=""
                        rules={{ required: true }}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <TextField
                            margin="dense"
                            fullWidth
                            size="small"
                            label="Descripcion"
                            variant="outlined"
                            value={value}
                            disabled={
                              organigram_current.fecha_terminado !== null
                            }
                            onChange={onChange}
                            error={!(error == null)}
                            helperText={
                              error != null
                                ? 'Es obligatorio ingresar una descripción'
                                : 'Ingrese descripción'
                            }
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                )}
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={active_step === 0}
                    onClick={handle_back}
                    sx={{ mr: 1 }}
                  >
                    Volver
                  </Button>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button onClick={handle_next} sx={{ mr: 1 }}>
                    Siguiente
                  </Button>
                  {active_step !== steps.length &&
                    (completed[active_step] ? (
                      <Typography
                        variant="caption"
                        sx={{ display: 'inline-block', textAlign: 'center' }}
                      >
                        Step {active_step + 1} already completed
                      </Typography>
                    ) : (
                      <Button onClick={handle_complete}>
                        {completed_steps() === total_steps() - 1
                          ? 'Finish'
                          : 'Complete Step'}
                      </Button>
                    ))}
                </Box>
              </React.Fragment>
            )}
          </div>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default DialogDelegarOrganigrama;
