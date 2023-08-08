/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack
} from '@mui/material';
import { useContext, type FC, useEffect, useState } from 'react';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

import CloseIcon from '@mui/icons-material/Close';

import { v4 as uuidv4 } from 'uuid';
import { ModalContextTCA } from '../../../../context/ModalContextTca';
import { get_historial_cambios_tca_service } from './services/TcaHistorialCambios.service';
import { type TcaHistoricoInterface } from './types/TcaHistorico.types';
import { columnsTcasterminados } from './columns/columns';
import { useAppSelector } from '../../../../../../../hooks';
import { DownloadButton } from '../../../../../../../utils/DownloadButton/DownLoadButton';

export const HistorialCambiosTCA: FC<any> = (): JSX.Element => {
  //* redux state declaration
  const { tca_current } = useAppSelector((state) => state.tca_slice);

  // ? manage modal
  const {
    modalHistorialCambios,
    // openModalHistorialCambios,
    closeModalHistorialCambios
  } = useContext(ModalContextTCA);

  // ? state to data rows
  const [rowsHistorialCambiosTCA, setRowsHistorialCambiosTCA] = useState<
    TcaHistoricoInterface[]
  >([]);

  //* assign data to rowsHistorialCambiosTCA
  useEffect(() => {
    if (modalHistorialCambios)
      void get_historial_cambios_tca_service(tca_current.id_tca).then((res) => {
        setRowsHistorialCambiosTCA(res);
      });
    return () => {
      setRowsHistorialCambiosTCA([]);
    };
  }, [modalHistorialCambios]);

  const newColums: GridColDef[] = [
    ...columnsTcasterminados,
    {
      field: 'fecha_inicio',
      headerName: 'Fecha Inicio',
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
      headerName: 'Archivo cambio',
      field: 'ruta_archivo_cambio',
      renderCell: (params: any) =>
        params.row.ruta_archivo_cambio && (
          <DownloadButton
            fileName="ruta_archivo_cambio"
            condition={false}
            fileUrl={params.row.ruta_archivo_cambio}
          />
        )
    }
  ];

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={modalHistorialCambios}
        onClose={closeModalHistorialCambios}
      >
        <DialogTitle>
          HISTORIAL DE CAMBIOS DE TCA
          <IconButton
            aria-label="close"
            onClick={closeModalHistorialCambios}
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
          <DataGrid
            sx={{ mt: '15px' }}
            density="compact"
            autoHeight
            rows={rowsHistorialCambiosTCA || []}
            columns={newColums}
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
              onClick={closeModalHistorialCambios}
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
