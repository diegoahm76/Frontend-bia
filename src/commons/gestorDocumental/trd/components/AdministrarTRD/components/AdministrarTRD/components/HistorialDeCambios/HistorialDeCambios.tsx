/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import { useContext } from 'react';
import { ModalContextTRD } from '../../../../../../context/ModalsContextTrd';
import {
  Box,
  Button,
  Chip,
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
  const { modalHistorialCambios, closeModalHistorialCambios } =
    useContext(ModalContextTRD);

  //* neccesarie states
  const { historialCambios } = useAppSelector((state) => state.trd_slice);

  const cleanDataCloseModal = (): void => {
    closeModalHistorialCambios();
    dispatch(get_historial_cambios_action([]));
  };

  const columns = [
    ...columsHistoricoCambiosTrd,
    {
      headerName: 'Tiempo retención AG',
      field: 'tiempo_retencion_ag',
      width: 180,
      renderCell: (params: any) => {
        return (
          <div>
            {params.row.tiempo_retencion_ag === '0' ? (
              <div>Indefinido</div>
            ) : (
              <div>{params.row.tiempo_retencion_ag} año(s)</div>
            )}
          </div>
        );
      }
    },
    {
      headerName: 'Tiempo retención AC',
      field: 'tiempo_retencion_ac',
      width: 180,
      renderCell: (params: any) => {
        return (
          <div>
            {params.row.tiempo_retencion_ac === '0' ? (
              <div>Indefinido</div>
            ) : (
              <div>{params.row.tiempo_retencion_ac} año(s)</div>
            )}
          </div>
        );
      }
    },
    {
      headerName: 'Digitalización',
      field: 'digitalizacion_disp_final',
      width: 180,
      renderCell: (params: any) => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        return params.row.digitalizacion_disp_final ? (
          <Chip size="small" label="SI" color="success" variant="outlined" />
        ) : (
          <Chip size="small" label="NO" color="warning" variant="outlined" />
        );
      }
    },

    {
      headerName: 'Fecha de registro histórico',
      field: 'fecha_registro_historico',
      width: 220,
      renderCell: (params: any) => (
        <Chip
          size="medium"
          label={params.row.fecha_registro_historico}
          color="success"
          variant="outlined"
        />
      )
    }
  ];

  return (
    <>
      {' '}
      <Dialog
        fullWidth
        maxWidth="md"
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
                    columns={columns}
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
