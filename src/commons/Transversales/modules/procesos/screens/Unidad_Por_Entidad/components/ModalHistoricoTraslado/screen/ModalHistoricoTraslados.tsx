/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { useState, type FC, useEffect, useContext } from 'react';

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
import { getHistoricosTraslados } from '../services/modalHistoricos.service';
import { ContextUnidadxEntidad } from '../../../context/ContextUnidadxEntidad';
import { historicoTrasladosMasivosUxE } from '../columns/columnsHistoricoUxE';

// ? types

export const ModalHistoricoTraslados: FC<any> = (): JSX.Element => {
  const { modalHistoricos, handleModalHistoricos } = useContext(
    ContextUnidadxEntidad
  );

  //* -------- STATES -------------- */
  const [historicoTrasladosMasivos, sethistoricoTrasladosMasivos] = useState(
    []
  );

  //* ----------  USE EFFECT NECESARIOS PARA EL CODIGO -------------- */
  const getHistoricoTrasladosMasivos = async (): Promise<any> => {
    //  console.log('')('getHistoricoTrasladosMasivos');
    const res = await getHistoricosTraslados();
    sethistoricoTrasladosMasivos(res);
  };

  useEffect(() => {
    if (modalHistoricos) void getHistoricoTrasladosMasivos();
  }, [modalHistoricos]);

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

  //* --------

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="md"
        open={modalHistoricos}
        onClose={handleModalHistoricos}
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
            rows={historicoTrasladosMasivos || []}
            columns={columns || []}
            pageSize={10}
            rowsPerPageOptions={[10]}
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
              onClick={handleModalHistoricos}
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
