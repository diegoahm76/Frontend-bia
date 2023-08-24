/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */

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
  Tooltip
  //  TextField
  // TextField,
  // Tooltip,
  // Typography
} from '@mui/material';
// import { Controller } from 'react-hook-form';

//* icons
import CloseIcon from '@mui/icons-material/Close';
// import CleanIcon from '@mui/icons-material/CleaningServices';
import DoneAllIcon from '@mui/icons-material/DoneAll';
// import DeleteIcon from '@mui/icons-material/Delete';
// import SearchIcon from '@mui/icons-material/Search';

import { DataGrid } from '@mui/x-data-grid';

import { v4 as uuidv4 } from 'uuid';
import AddIcon from '@mui/icons-material/Add';
// import { AvatarStyles } from '../../../../../../../../../ccd/componentes/crearSeriesCcdDialog/utils/constant';
// import Swal from 'sweetalert2';

//* css file
// import './css/Swal.css';
// import { add_tipologia_documental_to_trd } from '../../../../../../../../toolkit/TRDResources/slice/TRDResourcesSlice';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useAppDispatch, useAppSelector } from '../../../../../../../hooks';
import { Title } from '../../../../../../../components';
import { ModalContextTCA } from '../../../../context/ModalContextTca';

import { AvatarStyles } from '../../../../../ccd/componentes/crearSeriesCcdDialog/utils/constant';
// import { control_success } from '../../../../../../../helpers';
import DeleteIcon from '@mui/icons-material/Delete';
import { columnsResTipologias } from './columns/columnsResTipologias';

import { set_tipologias_reservadas } from '../../../../toolkit/TCAResources/slice/TcaSlice';

export const ModalReservarTipologias = (): JSX.Element => {
  //* useAppDispatch
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useAppDispatch();
  //* context values
  const {
    modalReservaTipologia,
    // openModalReservaTipologia,
    closeModalReservaTipologia
  } = useContext(ModalContextTCA);

  //* get element from store
  const { tipologias_NO_resevadas, tipologias_resevadas } = useAppSelector(
    (state: any) => state.tca_slice
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-empty-pattern
  /*  const {

  } = use_trd(); */

  //* interacción inicial de columnas creadas
  const baseColumns = [
    ...columnsResTipologias,
    {
      headerName: 'Tipología activa',
      field: 'activo',
      width: 220,
      renderCell: (params: any) => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        return params.row.activo ? (
          <Chip size="small" label="Si" color="info" variant="outlined" />
        ) : (
          <Chip size="small" label="No" color="warning" variant="outlined" />
        );
      }
    }
  ];

  const columns_tipologias_NO_restringidas = [
    ...baseColumns,
    {
      headerName: 'Acciones',
      field: 'acciones',
      width: 180,
      renderCell: (params: any) => (
        <>
          <Tooltip title="Añadir tipología como restringida">
            <IconButton
              aria-label="edit"
              disabled={tipologias_resevadas.find(
                (item: any) =>
                  item.id_tipologia_documental ===
                  params.row.id_tipologia_documental
              )}
              size="large"
              onClick={() => {
                // ? añdir y actualizar tipologias asociadas a trd
                dispatch(
                  set_tipologias_reservadas(
                    tipologias_NO_resevadas.length > 0
                      ? [...tipologias_resevadas, params.row]
                      : [...tipologias_NO_resevadas, params.row]
                  )
                );
                //  control_success('Tipología añadida a la relación TRD');
                console.log(params.row);
                console.log(tipologias_NO_resevadas);
                console.log('añadiendo tipología restringida');
              }}
            >
              <Avatar sx={AvatarStyles} variant="rounded">
                <AddIcon
                  sx={{
                    color: tipologias_resevadas.find(
                      (item: any) =>
                        item.id_tipologia_documental ===
                        params.row.id_tipologia_documental
                    )
                      ? 'gray'
                      : 'primary.main',
                    width: '18px',
                    height: '18px'
                  }}
                />
              </Avatar>
            </IconButton>
          </Tooltip>
        </>
      )
    }
  ];

  const colums_tipologias_restringidas = [
    ...baseColumns,
    {
      headerName: 'Acciones',
      field: 'acciones',
      width: 180,
      renderCell: (params: any) => (
        <>
          <Tooltip title="Eliminar de tipologías restringidas">
            <IconButton
              aria-label="edit"
              size="large"
              onClick={() => {
                dispatch(
                  set_tipologias_reservadas(
                    tipologias_NO_resevadas.length > 0
                      ? tipologias_resevadas.filter((item: any) => {
                          console.log(item);
                          console.log(params.row);
                          return (
                            item.id_tipologia_documental !==
                            params.row.id_tipologia_documental
                          );
                        })
                      : tipologias_NO_resevadas.filter(
                          (item: any) =>
                            item.id_tipologia_documental !==
                            params.row.id_tipologia_documental
                        )
                  )
                );
                // control_success('Tipología eliminada de la relación TRD');
                console.log(params.row);
                console.log('Eliminando de tipologias restringidas');
              }}
            >
              <Avatar sx={AvatarStyles} variant="rounded">
                <DeleteIcon
                  sx={{
                    color: 'red',
                    width: '18px',
                    height: '18px'
                  }}
                />
              </Avatar>
            </IconButton>
          </Tooltip>
        </>
      )
    }
  ];

  const closeModalReservaTipologiaDocumentalesAll = (): void => {
    closeModalReservaTipologia();
  };

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="md"
        open={modalReservaTipologia}
        onClose={closeModalReservaTipologiaDocumentalesAll}
      >
        <Box
          component="form"
          onSubmit={(e: any) => {
            e.preventDefault();
            /* void Swal.fire({
              title: 'Recuerde guardar para que los cambios se vean reflejados',
              icon: 'info',
              confirmButtonText: 'Ok',
              confirmButtonColor: '#042F4A',
              customClass: {
                container: 'my-swal'
              }
            }); */
            closeModalReservaTipologiaDocumentalesAll();
          }}
        >
          <DialogTitle>
            <Title title="Establecer restricción de tipologías" />
          </DialogTitle>
          <Divider />
          <DialogContent
            sx={{
              mb: '0px',
              justifyContent: 'center'
            }}
          >
            <Grid container spacing={2}>
              {/* tipologias existentes */}

              <Grid item xs={12} sm={12}>
                <Box /* sx={{ width: '100%' }} */>
                  <Title title="Tipologías no restringidas" />
                  <DataGrid
                    sx={{ marginTop: '1.5rem' }}
                    density="compact"
                    autoHeight
                    rows={
                      // tipologias_NO_resevadas

                      tipologias_NO_resevadas.filter(
                        (item: any) =>
                          !tipologias_resevadas.some(
                            (element: any) =>
                              element.id_tipologia_documental ===
                              item.id_tipologia_documental
                          )
                      ) || []

                      /* nuevasTipologias.length > 0
                        ? tipologias
                            .filter((item: any) => item.activo)
                            .filter(
                              (item: any) =>
                                !nuevasTipologias.find(
                                  (item2: any) =>
                                    item2?.id_tipologia_documental ===
                                    item.id_tipologia_documental
                                )
                            ) || []
                        : tipologias
                            .filter((item: any) => item.activo)
                            .filter(
                              (item: any) =>
                                !Array.isArray(tipologias_asociadas_a_trd) ||
                                !tipologias_asociadas_a_trd.find(
                                  (item2) =>
                                    item2?.id_tipologia_documental ===
                                    item.id_tipologia_documental
                                )
                            ) || [] */
                    }
                    columns={columns_tipologias_NO_restringidas}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    experimentalFeatures={{ newEditingApi: true }}
                    getRowId={(row) => uuidv4()}
                  />
                </Box>
              </Grid>

              <Grid item xs={12} sm={12}>
                <Box /* sx={{ width: '100%' }} */>
                  <Title title="Tipologías restringidas" />
                  <DataGrid
                    sx={{ marginTop: '1.5rem' }}
                    density="compact"
                    autoHeight
                    rows={
                      tipologias_resevadas || []

                      //  tipologias_resevadas

                      /* nuevasTipologias.length > 0
                        ? nuevasTipologias.reduce((acc: any, current: any) => {
                            const x = acc.find(
                              (item: any) =>
                                item.id_tipologia_documental ===
                                current.id_tipologia_documental
                            );
                            if (!x) {
                              return acc.concat([current]);
                            } else {
                              return acc;
                            }
                          }, [])
                        : tipologias_asociadas_a_trd */
                    }
                    columns={colums_tipologias_restringidas}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    experimentalFeatures={{ newEditingApi: true }}
                    getRowId={(row) => uuidv4()}
                  />
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={5.5} sx={{ marginTop: '1rem' }}>
              <Button
                variant="contained"
                type="submit"
                startIcon={<DoneAllIcon />}
                color="primary"
              >
                ACEPTAR
              </Button>
              {/* <Button
                variant="contained"
                startIcon={<CleanIcon />}
                color="success"
                sx={{ ml: '10px' }}
                onClick={() => {

                }}
              >
                LIMPIAR
              </Button> */}
            </Grid>
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
                onClick={closeModalReservaTipologiaDocumentalesAll}
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
