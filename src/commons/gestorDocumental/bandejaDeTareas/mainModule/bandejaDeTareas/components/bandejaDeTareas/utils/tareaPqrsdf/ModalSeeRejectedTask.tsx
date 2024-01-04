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
import { FC, useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Title } from '../../../../../../../../../components';

export const ModalSeeRejectedTask: FC = (): JSX.Element => {
  //* useState
  const [infoTareaRechazada, setInfoTareaRechazada] = useState('');

  //* useEffect
  useEffect(() => {
    console.log('ModalSeeRejectedTask');
    //* para cargar los datos de la tarea rechazada
    setInfoTareaRechazada('hola, esta es la justificación del rechazo de la tarea');
  }, []);

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="md"
        open={true}
        // onClose={closeModal}
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
                onClick={() => {}}
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
