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
  Avatar
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CleanIcon from '@mui/icons-material/CleaningServices';
import CloseIcon from '@mui/icons-material/Close';
import { ModalContext } from '../../context/ModalContext';
import { columns } from './../../../../seguridad/screens/AuditoriaScreen/utils/colums';
import { AvatarStyles } from '../crearSeriesCcdDialog/utils/constant';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getCatalogoSeriesYSubseries } from './services/CatalogoSeriesYSubseries.service';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
/* eslint-disable @typescript-eslint/naming-convention */
export const CatalogoSeriesYSubseries = () => {
  const { seriesAndSubseries } = useAppSelector(
    (state) => state.slice_series_and_subseries
  );

  const { ccd_current } = useAppSelector((state: any) => state.ccd);

  const dispatch: any = useAppDispatch();
  const { closeModalModalSeriesAndSubseries, modalSeriesAndSubseries } =
    useContext(ModalContext);

  const [series_ccd, set_series_ccd] = useState<any[]>([]);
  // const [columns, set_columns] = useState<any[]>([]);

 /*  useEffect(() => {
    console.log('useEffect, getCatalogoSeriesYSubseries');
    console.log(ccd_current);
    dispatch(getCatalogoSeriesYSubseries(ccd_current.id_ccd));
  }, [dispatch]); */

  const columns: GridColDef[] = [
    {
      headerName: 'Nombre serie',
      field: 'nombre_serie',
      minWidth: 150,
      maxWidth: 200,
      flex: 1
    },
    {
      headerName: 'Código serie',
      field: 'codigo_serie',
      minWidth: 150,
      maxWidth: 200,
      flex: 1
    },
    {
      headerName: 'Nombre subserie',
      field: 'nombre_subserie',
      minWidth: 150,
      maxWidth: 200,
      flex: 1
    },
    {
      headerName: 'Código subserie',
      field: 'codigo_subserie',
      minWidth: 150,
      maxWidth: 200,
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
          <IconButton onClick={() => {
            console.log('params', params);
          }}>
            <Avatar sx={AvatarStyles} variant="rounded">
              <EditIcon
                sx={{ color: 'primary.main', width: '18px', height: '18px' }}
              />
            </Avatar>
          </IconButton>
          {/* <IconButton onClick={() => {
            console.log('params', params);
          }}>
            <Avatar sx={AvatarStyles} variant="rounded">
              <DeleteIcon
                sx={{ color: 'primary.main', width: '18px', height: '18px' }}
              />
            </Avatar>
          </IconButton> */}
        </>
      )
    }
  ];
  /*    {
        headerName: 'Acciones',
        field: 'accion',
        minWidth: 200,
        maxWidth: 235,
        flex: 1,
        renderCell: (params: any) => (
          <>
            <IconButton onClick={() => {
              console.log('params', params);
            }}>
              <Avatar sx={AvatarStyles} variant="rounded">
                <EditIcon
                  sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                />
              </Avatar>
            </IconButton>
            <IconButton onClick={() => {
              console.log('params', params);
            }}>
              <Avatar sx={AvatarStyles} variant="rounded">
                <DeleteIcon
                  sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                />
              </Avatar>
            </IconButton>
          </>
        )
      } */

  return (
    <Dialog
      open={modalSeriesAndSubseries}
      onClose={closeModalModalSeriesAndSubseries}
      maxWidth="md"
    >
      <DialogTitle>
        CATÁLOGO DE SERIES Y SUBSERIES
        <IconButton
          onClick={() => {
            closeModalModalSeriesAndSubseries();
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid item xs={12} sx={{ width: 700 }}>
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
    </Dialog>
  );
};
