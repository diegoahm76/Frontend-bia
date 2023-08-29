/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
//! libraries or frameworks
import { type FC, useContext /* useEffect */ } from 'react';
import CloseIcon from '@mui/icons-material/Close';
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
import { type GridColDef, DataGrid } from '@mui/x-data-grid';
//! helpers

import { ModalContextTRD } from '../../context/ModalsContextTrd';
import { useAppSelector } from '../../../../../hooks';
import { columnsModalCCDUsados } from './utils/columns';
import { Title } from '../../../../../components';
import { download_xls } from '../../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../../documentos-descargar/PDF_descargar';

//! toolkit-redux values

export const ModalCCDUsados: FC = (): JSX.Element => {

  const { ccd_finished } = useAppSelector(
    (state: any) => state.finished_ccd_slice
  );

  // ? context destructuring useModalContextTRD
  const { modalCCDUsados, closeModalCCDUsados } = useContext(ModalContextTRD);

  const columns_trd_busqueda: GridColDef[] = [
    ...columnsModalCCDUsados,
    {
      headerName: 'Estado',
      field: 'estado',
      minWidth: 180,
      maxWidth: 220,
      renderCell: (params: { row: { fecha_terminado: null } }) => {
        return params.row.fecha_terminado !== null ? (
          <Chip
            size="small"
            label={`Terminado ${params.row.fecha_terminado}`}
            color="success"
            variant="outlined"
          />
        ) : (
          <Chip
            size="small"
            label="En Proceso"
            color="error"
            variant="outlined"
          />
        );
      }
    },
    {
      headerName: 'Actual',
      field: 'is_actual',
      minWidth: 50,
      maxWidth: 60,
      renderCell: (params: { row: { actual: null } }) => {
        return params.row.actual !== false ? (
          <Chip size="small" label="Si" color="info" variant="outlined" />
        ) : (
          <Chip size="small" label="No" color="warning" variant="outlined" />
        );
      }
    }
  ];

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={modalCCDUsados}
        onClose={closeModalCCDUsados}
      >
        <DialogTitle>
          <Title title="CCD's Usados" />
        </DialogTitle>
        <Divider />
        <DialogContent
          sx={{
            mb: '0px',
            justifyContent: 'center'
          }}
        >
          <ButtonGroup style={{ margin: 7, display: 'flex', justifyContent: 'flex-end' }}>

            {download_xls({ nurseries: ccd_finished, columns: columns_trd_busqueda })}
            {download_pdf({ nurseries: ccd_finished, columns: columns_trd_busqueda, title: 'CCDs Usados' })}

          </ButtonGroup>
          <DataGrid
            sx={{ mt: '15px' }}
            density="compact"
            autoHeight
            rows={ccd_finished}
            columns={columns_trd_busqueda}
            pageSize={10}
            rowsPerPageOptions={[10]}
            experimentalFeatures={{ newEditingApi: true }}
            getRowId={(row) => row.id_ccd}
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
              onClick={() => {
                closeModalCCDUsados();
              }}
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
