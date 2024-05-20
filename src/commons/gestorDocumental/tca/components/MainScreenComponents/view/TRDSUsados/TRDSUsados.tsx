/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { useEffect, type FC, useContext, useState } from 'react';
import { getTRDsUsados } from './services/TRDUsados.service';
import { TRDUSadosColumns } from './columns/TRDUSadosColumns';
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
import { DataGrid } from '@mui/x-data-grid';
import { ModalContextTCA } from '../../../../context/ModalContextTca';
import { v4 as uuidv4 } from 'uuid';
import { type TrdsUsados } from './types/modalTRDsTerminados.types';
import { Title } from '../../../../../../../components';

export const TRDSUsados: FC<any> = (): JSX.Element => {
  // ? manage modal
  const { modalTrdsUsados, closeModalTrdsUsados } = useContext(ModalContextTCA);

  // ? state to data rows
  const [rowsTrdsUsados, setrowsTrdsUsados] = useState<TrdsUsados[]>([]);

  useEffect(() => {
    if (modalTrdsUsados) {
      void getTRDsUsados().then((res) => {
        const filterRes = res.filter((el: TrdsUsados) => el.usado);
        setrowsTrdsUsados(filterRes);
        // //  console.log('')('getTRDsUsados');
        // //  console.log('')(res);
      });
    }
    return () => {
      setrowsTrdsUsados([]);
    };
  }, [modalTrdsUsados]);

  const newColums = [
    ...TRDUSadosColumns,
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
        params.value.actual ? (
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
        open={modalTrdsUsados}
        onClose={closeModalTrdsUsados}
      >
        <DialogTitle>
          <Title title="TRD'S USADOS" />
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
            rows={rowsTrdsUsados || []}
            columns={newColums || []}
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
              onClick={closeModalTrdsUsados}
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
