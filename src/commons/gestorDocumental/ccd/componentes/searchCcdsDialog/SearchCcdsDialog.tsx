/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  TextField,
} from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import { get_ccd_current } from '../../store/slices/ccdSlice';
import type { IProps } from './types/types';
import { get_classification_ccds_service } from '../../store/thunks/ccdThunks';

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SearchCcdModal = ({
  is_modal_active,
  set_is_modal_active,
  title,
}: IProps) => {
  const { ccds } = useAppSelector((state) => state.ccd);
  const dispatch = useAppDispatch();

  const [world_search, set_world_search] = useState<string>('');
  const [filter_ccds, set_filter_ccds] = useState<any>([]);

  useEffect(() => {
    const filter = ccds.filter((item) => {
      return (
        item.nombre
          .toLocaleLowerCase()
          .includes(world_search.toLocaleLowerCase()) ||
        item.version
          .toLocaleLowerCase()
          .includes(world_search.toLocaleLowerCase())
      );
    });
    if (world_search !== '') {
      set_filter_ccds(filter);
    } else {
      set_filter_ccds(ccds);
    }
  }, [
    world_search,
    ccds,
  ]);

  //! se retira use Effect y se realiza llamado a la función de búsqueda de manera dinamica en el archivo ccdScreen.tsx linea 200
  // useEffect para cargar los datos de la tabla
/*  useEffect(() => {
    void dispatch(get_classification_ccds_service(
      'CCD Principal 2',
      '2.0',
    ));
  }, []); */

  const columns_ccds: GridColDef[] = [
    {
      headerName: 'Nombre',
      field: 'nombre',
      minWidth: 200,
    },
    {
      headerName: 'Versión',
      field: 'version',
      minWidth: 150,
    },
    {
      headerName: 'Estado',
      field: 'estado',
      minWidth: 100,
      renderCell: (params: { row: { fecha_terminado: null } }) => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        return params.row.fecha_terminado !== null ? (
          <Chip
            size="small"
            label="Terminado"
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
      },
    },
    {
      headerName: 'Acciones',
      field: 'accion',
      renderCell: (params: any) => (
        <>
          <IconButton
            onClick={() => {
              console.log(
                'params para ver ccd en el icono del ojito',
                params,
              );
              void dispatch(
                get_classification_ccds_service(
                  params.row.nombre,
                  params.row.version,
                )
              )
              

              // dispatch(get_ccd_current(params));
              set_is_modal_active(false);
            }}
          >
            <Avatar
              sx={{
                width: 24,
                height: 24,
                background: '#fff',
                border: '2px solid',
              }}
              variant="rounded"
            >
              <VisibilityIcon
                sx={{ color: 'primary.main', width: '18px', height: '18px' }}
              />
            </Avatar>
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={is_modal_active}
      onClose={() => {
        set_is_modal_active(false);
      }}
    >
      <Box
        component="form"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
      >
        <DialogTitle>
          Consultar los CCD que coincidan con el criterio de búsqueda
          <IconButton
            aria-label="close"
            onClick={() => {
              set_is_modal_active(false);
            }}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ mb: '0px' }}>
          <TextField
            margin="dense"
            fullWidth
            size="small"
            label="Buscador de cuadro de clasificación documental"
            variant="outlined"
            value={world_search}
            onChange={(e) => {
              set_world_search(e.target.value);
            }}
          />
          <DataGrid
            density="compact"
            autoHeight
            rows={filter_ccds}
            columns={columns_ccds}
            pageSize={5}
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
                set_is_modal_active(false);
              }}
              startIcon={<CloseIcon />}
            >
              CERRAR
            </Button>
          </Stack>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default SearchCcdModal;
