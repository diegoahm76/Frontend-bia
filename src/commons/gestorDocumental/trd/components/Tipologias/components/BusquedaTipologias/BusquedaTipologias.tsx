/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import { useContext } from 'react';
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
  Grid,
  IconButton,
  Stack,
  TextField
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
//* components
// import { Title } from "../../../../../../../components";
import { ModalContextTRD } from '../../../../context/ModalsContextTrd';

//* Icons
import CloseIcon from '@mui/icons-material/Close';
import { Controller } from 'react-hook-form';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch, useAppSelector } from '../../../../../../../hooks';
import {
  delete_tipologia_documental_service,
  get_formatos_documentales_by_id_tipologia,
  get_tipologias_documentales_by_name
} from '../../../../toolkit/TRDResources/thunks/TRDResourcesThunks';
import { columns } from './utils/columns';
import CleanIcon from '@mui/icons-material/CleaningServices';
import {
  get_current_tipologia_documental_action,
  get_data_tipologias_documentales
} from '../../../../toolkit/TRDResources/slice/TRDResourcesSlice';
import { use_trd } from '../../../../hooks/use_trd';
//* icons
// import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { AvatarStyles } from '../../../../../ccd/componentes/crearSeriesCcdDialog/utils/constant';
// import { v4 as uuidv4 } from 'uuid';

export const BusquedaTipologias = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { tipologias } = useAppSelector((state) => state.trd_slice);

  const {
    modalBusquedaTipologiasDocumentales,
    closeModalBusquedaTipologiasDocumentales,
    openModalAdministracionTipologiasDocumentales
  } = useContext(ModalContextTRD);

  const {
    controlBusquedaTipologiasDocumentales,
    form_data_searched_tipologia_documental,
    resetBusquedaTipologiasDocumentales

    //* state to update data in the administre data
    // set_list_format_documental_type,
  } = use_trd();

  const resetOnCloseModal = (): any => {
    closeModalBusquedaTipologiasDocumentales();
    resetBusquedaTipologiasDocumentales({
      nombre: ''
    });
    dispatch(get_data_tipologias_documentales([]));
  };

  const columns_tipologias_documentales_trd = [
    ...columns,
    {
      headerName: 'Activo',
      field: 'activo',
      width: 70,
      renderCell: (params: any) =>
        params.row.activo ? (
          <Chip label="Si" color="error" variant="outlined" />
        ) : (
          <Chip label="No" color="info" variant="outlined" />
        )
    },
    {
      headerName: 'Usado',
      field: 'item_ya_usado',
      width: 70,
      renderCell: (params: any) =>
        params.row.item_ya_usado ? (
          <Chip label="Si" color="error" variant="outlined" />
        ) : (
          <Chip label="No" color="info" variant="outlined" />
        )
    },
    {
      headerName: 'Acciones',
      field: 'accion',
      width: 100,
      renderCell: (params: any) => (
        <>
          <IconButton
            onClick={() => {
              closeModalBusquedaTipologiasDocumentales();
              openModalAdministracionTipologiasDocumentales();

              dispatch(
                get_formatos_documentales_by_id_tipologia(
                  params.row.id_tipologia_documental
                )
              ).then((res: any) => {
                dispatch(
                  get_current_tipologia_documental_action({
                    ...params.row,
                    formatos: res
                  })
                );
              });

              // console.log('params edit formato', params.row);
            }}
          >
            <Avatar sx={AvatarStyles} variant="rounded">
              <EditIcon
                titleAccess="Editar formato tipo de medio"
                sx={{
                  color: 'primary.main',
                  width: '18px',
                  height: '18px'
                }}
              />
            </Avatar>
          </IconButton>

          {params.row.item_ya_usado ? null : (
            <IconButton
              onClick={() => {
                // console.log('params delete tipologia', params.row);
                dispatch(
                  delete_tipologia_documental_service(
                    params.row.id_tipologia_documental
                  )
                ).then((res: any) => {
                  dispatch(
                    get_tipologias_documentales_by_name(
                      form_data_searched_tipologia_documental.nombre
                    )
                  );
                });
                // void deleteFormat(params);
              }}
            >
              <Avatar sx={AvatarStyles} variant="rounded">
                <DeleteIcon
                  titleAccess="Eliminar formato tipo de medio"
                  sx={{
                    color: 'primary.main',
                    width: '18px',
                    height: '18px'
                  }}
                />
              </Avatar>
            </IconButton>
          )}
        </>
      )
    }
  ];

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={modalBusquedaTipologiasDocumentales}
        onClose={resetOnCloseModal}
      >
        <Box
          component="form"
          onSubmit={(e: any) => {
            e.preventDefault();
            // console.log('buscando tipologias documentales');
            dispatch(
              get_tipologias_documentales_by_name(
                form_data_searched_tipologia_documental.nombre
              )
            );
          }}
        >
          <DialogTitle>
            Búsqueda de Tipologias Documentales
            <IconButton
              aria-label="close"
              onClick={resetOnCloseModal}
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
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6.5}>
                <Controller
                  name="nombre"
                  control={controlBusquedaTipologiasDocumentales}
                  defaultValue=""
                  // rules={{ required: false }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <TextField
                      // margin="dense"
                      fullWidth
                      label="Nombre de la Tipología Documental"
                      size="small"
                      variant="outlined"
                      value={value}
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => {
                        onChange(e.target.value);
                        // console.log(e.target.value);
                      }}
                      error={!!error}
                      /* helperText={
                        error
                          ? 'Es obligatorio subir un archivo'
                          : 'Seleccione un archivo'
                      } */
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={5.5}>
                <Button
                  variant="contained"
                  type="submit"
                  startIcon={<SearchIcon />}
                  color="primary"
                >
                  BUSCAR
                </Button>
                <Button
                  variant="contained"
                  startIcon={<CleanIcon />}
                  color="success"
                  sx={{ ml: '10px' }}
                  onClick={() => {
                    resetBusquedaTipologiasDocumentales({
                      nombre: ''
                    });
                    // dispatch(get_tipologias_documentales_by_name(''));
                  }}
                >
                  LIMPIAR
                </Button>
              </Grid>
            </Grid>
            <DataGrid
              //* provisional data
              sx={{ mt: '15px' }}
              density="compact"
              autoHeight
              rows={tipologias}
              columns={columns_tipologias_documentales_trd ?? []}
              pageSize={5}
              rowsPerPageOptions={[7]}
              experimentalFeatures={{ newEditingApi: true }}
              getRowId={
                (row) => row.id_tipologia_documental
                /* ? row.id_tipologia_documental
                  : uuidv4() */
              }
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
                onClick={resetOnCloseModal}
                startIcon={<CloseIcon />}
              >
                CERRAR
              </Button>
            </Stack>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};
