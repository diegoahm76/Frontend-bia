/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { historicoTrasladosMasivos } from '../columns/columnsHistorico';
import { v4 as uuidv4 } from 'uuid';
// ? types
import { type FC, useState, useEffect } from 'react';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
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
import { Title } from '../../../../../../../../../components';
import CloseIcon from '@mui/icons-material/Close';
import {
  type DataHistorico,
  type IHistoricoTraslados
} from '../types/HistoricoTraslados.types';
import { getHistoricoTrasladosU_U } from '../services/getHistorico.service';

// ? component to show the history of "traslados masivos UNIDAD A UNIDAD"
export const HistoricoTraslados: FC<IHistoricoTraslados> = ({
  modalHistoricoTraslados,
  setModalHistoricoTraslados
}: IHistoricoTraslados): JSX.Element => {
  // ? columns to show the history of "traslados masivos UNIDAD A UNIDAD"
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const columnsTraslados: GridColDef[] = [
    ...historicoTrasladosMasivos,
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
    }
  ];

  const closeModalHistoricoTraslados = (): void =>
    setModalHistoricoTraslados(false);

  // ! useEffect to load data to render
  const [dataHistorico, setDataHistorico] = useState<DataHistorico[]>([]);

  useEffect(() => {
    if (modalHistoricoTraslados) {
      void getHistoricoTrasladosU_U().then((res) => {
        setDataHistorico(res);
        //  console.log('')(res);
      });
    }

    return () => {
      setDataHistorico([]);
    };
  }, [modalHistoricoTraslados]);

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="md"
        open={modalHistoricoTraslados}
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
            zIndex: 999999,
          }}
        >
          <DataGrid
            sx={{ mt: '15px' }}
            density="compact"
            autoHeight
            rows={dataHistorico || []}
            columns={columnsTraslados || []}
            pageSize={5}
            rowsPerPageOptions={[7]}
            experimentalFeatures={{ newEditingApi: true }}
            getRowId={(_row) => uuidv4()}
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
