/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { useContext } from 'react';
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
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
//* icons;
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { AvatarStyles } from '../../../../../ccd/componentes/crearSeriesCcdDialog/utils/constant';
import { LoadingButton } from '@mui/lab';

import { Title } from '../../../../../../../components';
import { download_xls } from '../../../../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../../../../documentos-descargar/PDF_descargar';

export const BusquedaTipologias = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { tipologias } = useAppSelector((state) => state.trd_slice);

  const {
    modalBusquedaTipologiasDocumentales,
    closeModalBusquedaTipologiasDocumentales,
    openModalAdministracionTipologiasDocumentales,
    createTRDLoadingButton,
    setCreateTRDLoadingButton
  } = useContext(ModalContextTRD);

  const {
    controlBusquedaTipologiasDocumentales,
    form_data_searched_tipologia_documental,
    resetBusquedaTipologiasDocumentales
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
              resetOnCloseModal();
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
              // //  console.log('')('params edit formato', params.row);
            }}
          >
            <Avatar sx={AvatarStyles} variant="rounded">
              <EditIcon
                titleAccess="Editar tipología documental"
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
                dispatch(
                  delete_tipologia_documental_service(
                    params.row.id_tipologia_documental
                  )
                ).then((res: any) => {
                  dispatch(
                    get_tipologias_documentales_by_name(
                      setCreateTRDLoadingButton,
                      form_data_searched_tipologia_documental.nombre
                    )
                  );
                });
              }}
            >
              <Avatar sx={AvatarStyles} variant="rounded">
                <DeleteIcon
                  titleAccess="Eliminar tipología documental"
                  sx={{
                    color: 'red',
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
            // //  console.log('')('buscando tipologias documentales');
            dispatch(
              get_tipologias_documentales_by_name(
                setCreateTRDLoadingButton,
                form_data_searched_tipologia_documental.nombre
              )
            );
          }}
        >
          <DialogTitle>
            <Title title="Búsqueda de Tipologias Documentales" />
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
                      fullWidth
                      label="Nombre de la Tipología Documental"
                      size="small"
                      variant="outlined"
                      value={value}
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => {
                        onChange(e.target.value);
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
                <LoadingButton
                  loading={createTRDLoadingButton}
                  variant="contained"
                  type="submit"
                  startIcon={<SearchIcon />}
                  // sx={{ mt: '15px' }}
                  color="primary"
                >
                  BUSCAR
                </LoadingButton>
                <Button
                  variant="outlined"
                  startIcon={<CleanIcon />}
                  color="primary"
                  sx={{ ml: '10px' }}
                  onClick={() => {
                    resetBusquedaTipologiasDocumentales({
                      nombre: ''
                    });
                  }}
                >
                  LIMPIAR
                </Button>
              </Grid>
            </Grid>
            <ButtonGroup
              style={{ margin: 7, display: 'flex', justifyContent: 'flex-end' }}
            >
              {download_xls({ nurseries: tipologias, columns:columns_tipologias_documentales_trd })}
              {download_pdf({ nurseries: tipologias, columns:columns_tipologias_documentales_trd, title: 'tipologiasas' })}
            </ButtonGroup>
            <DataGrid
              //* provisional data
              sx={{ mt: '15px' }}
              density="compact"
              autoHeight
              rows={tipologias}
              columns={columns_tipologias_documentales_trd ?? []}
              pageSize={10}
              rowsPerPageOptions={[10]}
              experimentalFeatures={{ newEditingApi: true }}
              getRowId={(row) => row.id_tipologia_documental}
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
                color="error"
                variant="contained"
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
