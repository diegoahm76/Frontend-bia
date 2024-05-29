/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */

import { useContext } from 'react';
import {
  Avatar,
  // Autocomplete,
  Box,
  Button,
  // Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  // FormControl,
  // FormControlLabel,
  Grid,
  IconButton,
  Stack
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
import DeleteIcon from '@mui/icons-material/Delete';
// import SearchIcon from '@mui/icons-material/Search';

import { ModalContextTRD } from '../../../../../../../../context/ModalsContextTrd';
// import { Controller, useForm } from 'react-hook-form';
import { Title } from '../../../../../../../../../../../components';
import { DataGrid } from '@mui/x-data-grid';
import {
  useAppDispatch,
  useAppSelector
} from '../../../../../../../../../../../hooks';
import { v4 as uuidv4 } from 'uuid';
import AddIcon from '@mui/icons-material/Add';
import { AvatarStyles } from '../../../../../../../../../ccd/componentes/crearSeriesCcdDialog/utils/constant';
import Swal from 'sweetalert2';

//* css file
import './css/Swal.css';
import { add_tipologia_documental_to_trd } from '../../../../../../../../toolkit/TRDResources/slice/TRDResourcesSlice';
import { control_success } from '../../../../../../../../../../../helpers';
import { use_trd } from '../../../../../../../../hooks/use_trd';

export const EstablecerTipologias = (): JSX.Element => {
  //* useAppDispatch
  const dispatch = useAppDispatch();
  //* context values
  const {
    modalEstablecerTipologiaDocumentalATRD,
    closeModalEstablecerTipologiaDocumentalATRD
  } = useContext(ModalContextTRD);

  //* get element from store
  const {
    tipologias_asociadas_a_trd,
    trd_current,
    tipologias,
    nuevasTipologias
  } = useAppSelector((state) => state.trd_slice);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-empty-pattern
  const {
    // reset_administrar_trd,
  } = use_trd();

  const colums_tipologias = [
    {
      field: 'nombre',
      headerName: 'Nombre',
      width: 200
    },
    {
      field: 'cod_tipo_medio_doc',
      headerName: 'Cód. tipo medio doc',
      width: 200,
      renderCell: (params: any) => {
        if (params.row.cod_tipo_medio_doc === 'H') {
          return 'Híbrido';
        } else if (params.row.cod_tipo_medio_doc === 'F') {
          return 'Físico';
        } else if (params.row.cod_tipo_medio_doc === 'E') {
          return 'Electrónico';
        }
      }
    },
    {
      headerName: 'Acciones',
      field: 'acciones',
      width: 180,
      renderCell: (params: any) => (
        <>
          <IconButton
            aria-label="edit"
            size="large"
            title="Añadir tipología a TRD"
            onClick={() => {
              // ? añdir y actualizar tipologias asociadas a trd
              dispatch(
                add_tipologia_documental_to_trd(
                  nuevasTipologias.length > 0
                    ? [...nuevasTipologias, params.row]
                    : [...tipologias_asociadas_a_trd, params.row]
                )
              );
              control_success('Tipología añadida a la relación TRD');
              //  console.log('')(params.row);
              /* reset_administrar_trd({
                

              }); */
            }}
          >
            <Avatar sx={AvatarStyles} variant="rounded">
              <AddIcon
                sx={{
                  color: 'primary.main',
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

  const colums_tipologias_asociadas = [
    {
      field: 'nombre',
      headerName: 'Nombre',
      width: 200
    },
    {
      field: 'cod_tipo_medio_doc',
      headerName: 'Cód. tipo medio doc',
      width: 200,
      renderCell: (params: any) => {
        if (params.row.cod_tipo_medio_doc === 'H') {
          return 'Híbrido';
        } else if (params.row.cod_tipo_medio_doc === 'F') {
          return 'Físico';
        } else if (params.row.cod_tipo_medio_doc === 'E') {
          return 'Electrónico';
        }
      }
    },
    {
      headerName: 'Acciones',
      field: 'acciones',
      width: 180,
      renderCell: (params: any) => (
        <>
          <IconButton
            aria-label="edit"
            size="large"
            title="Eliminar"
            onClick={() => {
              dispatch(
                add_tipologia_documental_to_trd(
                  nuevasTipologias.length > 0
                    ? nuevasTipologias.filter(
                        (item: any) => {
                          //  console.log('')(item);
                          //  console.log('')(params.row);
                          return (
                            item.id_tipologia_documental !==
                            params.row.id_tipologia_documental
                          );
                        }
                        /* item.id_tipologia_documental !==
                      params.row.id_tipologia_documental */
                      )
                    : tipologias_asociadas_a_trd.filter(
                        (item: any) =>
                          item.id_tipologia_documental !==
                          params.row.id_tipologia_documental
                      )
                )
              );
              control_success('Tipología eliminada de la relación TRD');
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
        </>
      )
    }
  ];

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="md"
        open={modalEstablecerTipologiaDocumentalATRD}
        onClose={closeModalEstablecerTipologiaDocumentalATRD}
      >
        <Box
          component="form"
          onSubmit={(e: any) => {
            e.preventDefault();
            void Swal.fire({
              title: 'Recuerde guardar para que los cambios se vean reflejados',
              icon: 'info',
              confirmButtonText: 'Ok',
              confirmButtonColor: '#042F4A',
              customClass: {
                container: 'my-swal'
              }
            });
            closeModalEstablecerTipologiaDocumentalATRD();
          }}
        >
          <DialogTitle>
            Establecer Tipologías Documentales a TRD
            <IconButton
              aria-label="close"
              onClick={closeModalEstablecerTipologiaDocumentalATRD}
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
              {/* tipologias existentes */}

              <Grid item xs={12} sm={12}>
                <Box /* sx={{ width: '100%' }} */>
                  <Title title="Tipologías existentes" />
                  <DataGrid
                    sx={{ marginTop: '1.5rem' }}
                    density="compact"
                    autoHeight
                    rows={
                      nuevasTipologias.length > 0
                        ? tipologias
                            .filter((item) => item.activo)
                            .filter(
                              (item) =>
                                !nuevasTipologias.find(
                                  (item2) =>
                                    item2?.id_tipologia_documental ===
                                    item.id_tipologia_documental
                                )
                            ) || []
                        : tipologias
                            .filter((item) => item.activo)
                            .filter(
                              (item) =>
                                !Array.isArray(tipologias_asociadas_a_trd) ||
                                !tipologias_asociadas_a_trd.find(
                                  (item2) =>
                                    item2?.id_tipologia_documental ===
                                    item.id_tipologia_documental
                                )
                            ) || []
                    }
                    columns={colums_tipologias}
                    pageSize={9}
                    rowsPerPageOptions={[9]}
                    experimentalFeatures={{ newEditingApi: true }}
                    getRowId={(row) => uuidv4()}
                  />
                </Box>
              </Grid>

              <Grid item xs={12} sm={12}>
                <Box /* sx={{ width: '100%' }} */>
                  <Title
                    title={`Tipologías asociadas a TRD con nombre: ${trd_current.nombre}`}
                  />
                  <DataGrid
                    sx={{ marginTop: '1.5rem' }}
                    density="compact"
                    autoHeight
                    rows={
                      nuevasTipologias.length > 0
                        ? nuevasTipologias.reduce((acc, current) => {
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
                        : tipologias_asociadas_a_trd
                    }
                    columns={colums_tipologias_asociadas}
                    pageSize={4}
                    rowsPerPageOptions={[4]}
                    experimentalFeatures={{ newEditingApi: true }}
                    getRowId={(row) => row.id_tipologia_documental}
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
                onClick={closeModalEstablecerTipologiaDocumentalATRD}
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
