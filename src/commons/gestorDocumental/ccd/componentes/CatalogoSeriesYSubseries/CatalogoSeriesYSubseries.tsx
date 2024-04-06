/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useEffect, useState, useContext } from 'react';
// import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Button,
  Divider,
  Grid,
  IconButton,
  TextField,
  Avatar,
  ButtonGroup
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CleanIcon from '@mui/icons-material/CleaningServices';
import CloseIcon from '@mui/icons-material/Close';
import { ModalContext } from '../../context/ModalContext';
import { AvatarStyles } from '../crearSeriesCcdDialog/utils/constant';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  delete_independiente_serie_service,
  getCatalogoSeriesYSubseries
} from './services/CatalogoSeriesYSubseries.service';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { Title } from '../../../../../components';
import { control_warning } from '../../../../almacen/configuracion/store/thunks/BodegaThunks';
import { download_xls } from '../../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../../documentos-descargar/PDF_descargar';
/* eslint-disable @typescript-eslint/naming-convention */
export const CatalogoSeriesYSubseries = () => {
  const { seriesAndSubseries } = useAppSelector(
    (state) => state.slice_series_and_subseries
  );

  const { ccd_current } = useAppSelector((state: any) => state.ccd);

  const dispatch: any = useAppDispatch();
  const { closeModalModalSeriesAndSubseries, modalSeriesAndSubseries } =
    useContext(ModalContext);

  const delete_independente_series = (id_serie_doc: number) => {
    // //  console.log('')('delete_independente_series', id_serie_doc);
    void dispatch(
      delete_independiente_serie_service(id_serie_doc, ccd_current)
    );
  };

  const columns: GridColDef[] = [
    {
      headerName: 'Nombre serie',
      field: 'nombre_serie',
      minWidth: 350,
      maxWidth: 400,
      flex: 1
    },
    {
      headerName: 'Código serie',
      field: 'codigo_serie',
      minWidth: 120,
      maxWidth: 150,
      flex: 1
    },
    {
      headerName: 'Nombre subserie',
      field: 'nombre_subserie',
      minWidth: 350,
      maxWidth: 400,
      flex: 1
    },
    {
      headerName: 'Código subserie',
      field: 'codigo_subserie',
      minWidth: 120,
      maxWidth: 150,
      flex: 1
    },
    {
      headerName: 'Acciones',
      field: 'accion',
      minWidth: 200,
      maxWidth: 235,
      flex: 1,
      renderCell: (params: any) => (
        <>
          <IconButton
            sx={{
              // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
              visibility: ccd_current?.actual ? ' hidden ' : ''
            }}
            onClick={() => {
              if (params.row.codigo_subserie) {
                control_warning(
                  'Solo es posible eliminar del catálogo series independientes'
                );
                return;
              }

              delete_independente_series(params.row.id_catalogo_serie);
            }}
          >
            <Avatar sx={AvatarStyles} variant="rounded">
              <DeleteIcon
                titleAccess="Eliminar serie independiente"
                sx={{
                  color: params.row.codigo_subserie ? 'gray' : 'red',
                  width: '18px',
                  height: '18px'
                }}
              />
            </Avatar>
          </IconButton>
        </>
      )
    }
  ];

  return (
    <Dialog
      open={modalSeriesAndSubseries}
      onClose={closeModalModalSeriesAndSubseries}
      maxWidth="lg"
    >
      <DialogTitle>
        <Title title="Catálogo de series y subseries" />
      </DialogTitle>
      <DialogContent>
        <Grid item xs={12} sx={{ width: 670 }}>
          <ButtonGroup
            style={{ margin: 7, display: 'flex', justifyContent: 'flex-end' }}
          >
            {download_xls({ nurseries: seriesAndSubseries, columns })}
            {download_pdf({ nurseries: seriesAndSubseries, columns, title: 'Catálogo de series y subseries' })}
          </ButtonGroup> 
          <DataGrid
            density="compact"
            autoHeight
            rows={seriesAndSubseries}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            experimentalFeatures={{ newEditingApi: true }}
            getRowId={(row) => row.id_catalogo_serie}
          />
        </Grid>
      </DialogContent>

      <DialogActions>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="flex-end"
          sx={{ mr: '15px', mb: '10px', mt: '10px' }}
        >
          <Button
            variant="outlined"
            color="error"
            onClick={closeModalModalSeriesAndSubseries}
            startIcon={<CloseIcon />}
          >
            CERRAR
          </Button>
        </Stack>
      </DialogActions>

    </Dialog>
  );
};

