/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { type FC } from 'react';
import { v4 as uuidv4 } from 'uuid';
// ? types
import { DataGrid } from '@mui/x-data-grid';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack
} from '@mui/material';
import { Title } from '../../../../../../../../../components';
import CloseIcon from '@mui/icons-material/Close';
import { totalPersonas } from '../columns/totalPersonasColumns';
import { useAppSelector } from '../../../../../../../../../hooks';

// ? component para mostrar todas las personas de las unidades el organigrama anterior
export const TotalPersonas: FC<{
  modalTotalPersonas: boolean;
  setModalTotalPersonas: (value: boolean) => void;
}> = ({
  modalTotalPersonas,
  setModalTotalPersonas
}: {
  modalTotalPersonas: boolean;
  setModalTotalPersonas: (value: boolean) => void;
}): JSX.Element => {
  //* states dara from store
  const { listado_personas_totales_unidades } = useAppSelector(
    (state) => state.uni_a_uni_slice
  );

  const closeModalHistoricoTraslados = (): void => setModalTotalPersonas(false);

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={modalTotalPersonas}
        onClose={closeModalHistoricoTraslados}
      >
        <DialogTitle>
          <Title title="Histórico de traslados masivos (Unidad a Unidad)" />
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
            rows={listado_personas_totales_unidades || []}
            columns={totalPersonas || []}
            pageSize={5}
            rowsPerPageOptions={[7]}
            experimentalFeatures={{ newEditingApi: true }}
            getRowId={(row) => uuidv4()}
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
