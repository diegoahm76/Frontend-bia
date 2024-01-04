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
import { FC, useState } from 'react';
import CleanIcon from '@mui/icons-material/CleaningServices';
import CloseIcon from '@mui/icons-material/Close';
import { Title } from '../../../../../../../../../components';
import { Controller, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export const ModalRejectTask: FC = (props: any): JSX.Element => {
  const { title = 'Rechazar tarea' } = props;

  const handleSubsmit = () => {
    //* set the service to reject the task
    console.log('handleSubsmit');
  };

  //* states
  const [loading, setLoading] = useState(false);

  const { control: control_justificacion,
    handleSubmit: handleSubmit_justificacion,
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
        open={false}
        // onClose={closeModal}
      >
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubsmit();
          }}
        >
          <DialogTitle>
            <Title title={title} />
          </DialogTitle>
          <Divider />
          <DialogContent
            sx={{
              mb: '0px',
              justifyContent: 'center',
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} lg={12} md={12}
                sx={{
                  marginY: '1.5rem'
                }}
              >
                <Controller
                  name="justificacion_rechazo"
                  control={control_justificacion}
                  defaultValue=""
                  rules={{ required: false }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      label="Justificación de rechazo *"
                      placeholder='Escriba la justificación de rechazo de la tarea'
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
              {/*<Grid item xs={12} sm={3}>
                <LoadingButton
                  loading={loading}
                  variant="contained"
                  type="submit"
                  color="primary"
                >
                  BUSCAR
                </LoadingButton>
              </Grid>*/}
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
                onClick={() => {}}
                startIcon={<CleanIcon />}
              >
                LIMPIAR CAMPOS
              </Button>
              <Button
                color="success"
                variant="contained"
                onClick={() => {}}
                startIcon={<CheckCircleOutlineIcon />}
              >
                ACEPTAR TAREA
              </Button>
              <Button
                color="error"
                variant="contained"
                onClick={() => {}}
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
