/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import {
  Button,
  ButtonGroup,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack
} from '@mui/material';
import { useContext, type FC, useEffect, useState } from 'react';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

import CloseIcon from '@mui/icons-material/Close';

import { v4 as uuidv4 } from 'uuid';
import { ModalContextTCA } from '../../../../context/ModalContextTca';
import { getTcaTerminados } from './services/TcaTerminados.service';
import { type TcaTerminados } from './types/modalTcaTerminados.types';
import { columnsTcasterminados } from './columns/columns';
import { Title } from '../../../../../../../components';
import { download_pdf } from '../../../../../../../documentos-descargar/PDF_descargar';
import { download_xls } from '../../../../../../../documentos-descargar/XLS_descargar';

export const TCASTerminados: FC<any> = (): JSX.Element => {
  // gestor/trd/get-terminados/ -- usado === true
  // en la lista de creacion de trd, se debe mostrar los ccd que estan en la lista de terminados y que esten en usado === false

  // gestor/tca/tca-list/get/
  // ? manage modal
  const { modalTcaTerminados, closeModalTcaTerminados } =
    useContext(ModalContextTCA);

  // ? state to data rows
  const [rowsTcasTerminados, setrowsTcasTerminados] = useState<TcaTerminados[]>(
    []
  );

  //* assign data to rowsTcasTerminados
  useEffect(() => {
    if (modalTcaTerminados)
      void getTcaTerminados().then((res) => {
        setrowsTcasTerminados(res);
      });
    return () => {
      setrowsTcasTerminados([]);
    };
  }, [modalTcaTerminados]);

  const newColums: GridColDef[] = [
    ...columnsTcasterminados,
    {
      field: 'fecha_terminado',
      headerName: 'Fecha de terminado',
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
      field: 'actual',
      headerName: 'Actual',
      width: 100,
      renderCell: (params: any) =>
        params.row.actual ? (
          <Chip label="SI" color="primary" variant="outlined" />
        ) : (
          <Chip label="NO" color="error" variant="outlined" />
        )
    },
    {
      field: 'fecha_puesta_produccion',
      headerName: 'Fecha de puesta en producción',
      width: 200,
      renderCell: (params: any) =>
        params.row.fecha_puesta_produccion ? (
          <Chip
            label={params.value ? new Date(params.value).toLocaleString() : ''}
            color="info"
            variant="outlined"
          />
        ) : (
          <Chip
            label="No se ha puesto en producción"
            color="warning"
            variant="outlined"
          />
        )
    },
    {
      field: 'fecha_retiro_produccion',
      headerName: 'Fecha de retiro de producción',
      width: 200,
      renderCell: (params: any) =>
        params.row.fecha_retiro_produccion ? (
          <Chip
            label={params.value ? new Date(params.value).toLocaleString() : ''}
            color="info"
            variant="outlined"
          />
        ) : (
          <Chip
            label="No se ha retirado de producción"
            color="warning"
            variant="outlined"
          />
        )
    }
  ];

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={modalTcaTerminados}
        onClose={closeModalTcaTerminados}
      >
        <DialogTitle>

          <Title
            title={
              rowsTcasTerminados?.length > 0
                ? 'TCA TERMINADOS'
                : 'TCA TERMINADOS : NO HAY TCA TERMINADOS'
            }
          />

        </DialogTitle>
        <Divider />
        <DialogContent
          sx={{
            mb: '0px',
            justifyContent: 'center'
          }}
        >
          <ButtonGroup style={{ margin: 7, display: 'flex', justifyContent: 'flex-end' }}>

            {download_xls({ nurseries: rowsTcasTerminados, columns: newColums })}
            {download_pdf({ nurseries: rowsTcasTerminados, columns: newColums, title: 'TCA TERMINADOS' })}

          </ButtonGroup>
          <DataGrid
            sx={{ mt: '15px' }}
            density="compact"
            autoHeight
            rows={rowsTcasTerminados || []}
            columns={newColums}
            pageSize={10}
            rowsPerPageOptions={[10]}
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
              onClick={closeModalTcaTerminados}
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
