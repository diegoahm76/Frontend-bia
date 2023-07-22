/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import { useContext } from 'react';
import { ModalContextTRD } from '../../../../../../context/ModalsContextTrd';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Stack
} from '@mui/material';

import { DataGrid } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import CloseIcon from '@mui/icons-material/Close';
import {
  useAppDispatch,
  useAppSelector
} from '../../../../../../../../../hooks';
import { get_historial_cambios_action } from '../../../../../../toolkit/TRDResources/slice/TRDResourcesSlice';
import { columsHistoricoCambiosTrd } from './utils/colums/columsHistoricoCambiosTrd';
export const HistorialDeCambios = (): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();

  // * -------------------------------------------------------> MODAL HISTORIAL DE CAMBIOS
  const {
    modalHistorialCambios,
    closeModalHistorialCambios
  } = useContext(ModalContextTRD);

  //* neccesarie states
  const { historialCambios } = useAppSelector((state) => state.trd_slice);

  const cleanDataCloseModal = (): void => {
    closeModalHistorialCambios();
    dispatch(get_historial_cambios_action([]));
  };

  return (
    <>
      {' '}
      <Dialog
        fullWidth
        maxWidth="sm"
        open={modalHistorialCambios}
        onClose={cleanDataCloseModal}
      >
        <Box>
          <DialogTitle>
            Histórico de cambios
            <IconButton
              aria-label="close"
              onClick={cleanDataCloseModal}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500]
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <Divider />
          <DialogContent
            sx={{
              mb: '0px',
              justifyContent: 'center'
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <Box>
                  <DataGrid
                    sx={{ marginTop: '1.5rem' }}
                    density="compact"
                    autoHeight
                    rows={historialCambios || []}
                    columns={columsHistoricoCambiosTrd}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    experimentalFeatures={{ newEditingApi: true }}
                    getRowId={(row) => uuidv4()}
                  />
                </Box>
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
                onClick={cleanDataCloseModal}
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
