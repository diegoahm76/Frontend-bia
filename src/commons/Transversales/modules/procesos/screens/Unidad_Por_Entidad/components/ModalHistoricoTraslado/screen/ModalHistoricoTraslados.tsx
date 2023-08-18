/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { type FC } from 'react';
import { historicoTrasladosMasivosUxE } from '../columns/columnsHistoricoUxE';
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import { Title } from '../../../../../../../../../components';
// ? types

export const ModalHistoricoTraslados: FC<any> = (): JSX.Element => {
  //* -------- COLUMNS TO MODAL -------------- */
  const columns: GridColDef[] = [
    ...historicoTrasladosMasivosUxE,
    {
      headerName: 'Fecha de traslado',
      field: 'fecha_cambio',
      width: 200,
      renderCell: (params: any) => (
        <Chip
          label={params.value ? new Date(params.value).toLocaleString() : ''}
          color="success"
          variant="outlined"
        />
      )
    },
    {
      headerName: 'Tipo de cambio',
      field: 'tipo_cambio',
      width: 200,
      renderCell: (params: any) => (
        <Chip
          label={params.value ? 'Cambio unidad por entidad' : ''}
          color="success"
          variant="outlined"
        />
      )
    }
  ];

  // * -------- FUNCIONES DEL COMPONENTE -------------- */

  const closeModalHistoricoTraslados = (): void => {};

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="md"
        open={true}
        onClose={closeModalHistoricoTraslados}
      >
        <DialogTitle>
          <Title title="Histórico de traslados masivos (Unidad por Entidad)" />
        </DialogTitle>
        <Divider />
        <DialogContent
          sx={{
            mb: '0px',
            justifyContent: 'center',
            zIndex: 999999
          }}
        >
          <DataGrid
            sx={{ mt: '15px' }}
            density="compact"
            autoHeight
            rows={[]}
            columns={columns || []}
            pageSize={5}
            rowsPerPageOptions={[7]}
            experimentalFeatures={{ newEditingApi: true }}
            getRowId={() => uuidv4()}
          />
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
              color="error"
              onClick={closeModalHistoricoTraslados}
              startIcon={<CloseIcon />}
            >
              CERRAR
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  );
};
