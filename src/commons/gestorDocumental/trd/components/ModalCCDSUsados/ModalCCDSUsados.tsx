/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

//! libraries or frameworks
import { type FC, useContext /* useEffect */ } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {
  // Avatar,
  // Box,
  Button,
  // Grid,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack
  // TextField,
  // Typography
} from '@mui/material';
import { type GridColDef, DataGrid } from '@mui/x-data-grid';
//! helpers

// import { use_trd } from '../../hooks/use_trd';
// import { useAppDispatch } from '../../../../../hooks';
import { ModalContextTRD } from '../../context/ModalsContextTrd';
import { useAppSelector } from '../../../../../hooks';
import { columnsModalCCDUsados } from './utils/columns';

//! toolkit-redux values

export const ModalCCDUsados: FC = (): JSX.Element => {
  //! dispatch hook from react-redux
  // const dispatch: any = useAppDispatch();

  // ? use_trd hook
  /* const {
    list_finished_ccd,
  } = use_trd(); */

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
          {`CCD's Usados`}
          <IconButton
            aria-label="close"
            onClick={() => {
              console.log('cerrando');
              closeModalCCDUsados();
            }}
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
            rows={ccd_finished}
            columns={columns_trd_busqueda}
            pageSize={5}
            rowsPerPageOptions={[7]}
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
                console.log('cerrando');
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
