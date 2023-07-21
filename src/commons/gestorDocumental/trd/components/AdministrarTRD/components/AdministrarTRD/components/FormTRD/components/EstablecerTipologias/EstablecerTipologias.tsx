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
import SaveIcon from '@mui/icons-material/Save';
// import SearchIcon from '@mui/icons-material/Search';

import { ModalContextTRD } from '../../../../../../../../context/ModalsContextTrd';
// import { Controller, useForm } from 'react-hook-form';
import { Title } from '../../../../../../../../../../../components';
import { DataGrid } from '@mui/x-data-grid';
import { useAppSelector } from '../../../../../../../../../../../hooks';
import { v4 as uuidv4 } from 'uuid';
import AddIcon from '@mui/icons-material/Add';
import { AvatarStyles } from '../../../../../../../../../ccd/componentes/crearSeriesCcdDialog/utils/constant';
import { type EstablecerTipologiasProps } from './types/types';
import Swal from 'sweetalert2';

export const colums_tipologias_asociadas = [
  {
    field: 'nombre',
    headerName: 'Nombre',
    width: 200
  },
  {
    field: 'cod_tipo_medio_doc',
    headerName: 'Cód. tipo medio doc',
    width: 200
  }
];

export const EstablecerTipologias = ({
  nuevasTipologias,
  setNuevasTipologias
}: EstablecerTipologiasProps): JSX.Element => {
  //* context values
  const {
    modalEstablecerTipologiaDocumentalATRD,
    closeModalEstablecerTipologiaDocumentalATRD
  } = useContext(ModalContextTRD);

  //* get element from store
  const { tipologias_asociadas_a_trd, trd_current, tipologias } =
    useAppSelector((state) => state.trd_slice);
  /*
  const {
    control: controlEstablecerTipologiasDocumentales,
  } = useForm() */

  const colums_tipologias = [
    {
      field: 'nombre',
      headerName: 'Nombre',
      width: 200
    },
    {
      field: 'cod_tipo_medio_doc',
      headerName: 'Cód. tipo medio doc',
      width: 200
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
              setNuevasTipologias(
                nuevasTipologias.length > 0
                  ? [...nuevasTipologias, params.row]
                  : [...tipologias_asociadas_a_trd, params.row]
              );
              console.log(params.row);
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
            console.log('estableciendo tipologias documentales');
            void Swal.fire({
              title:
                'Recuerde finalizar el proceso para que los cambios se vean reflejados',
              icon: 'info',
              confirmButtonText: 'Ok',
              confirmButtonColor: '#042F4A'
            });
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
                    rows={tipologias.filter((item) => item.activo) || []}
                    columns={colums_tipologias}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
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
                        ? nuevasTipologias.filter(
                            (item: any, index: any, self: any) => {
                              return (
                                index ===
                                self.findIndex(
                                  (t: any) =>
                                    t.id_tipologia_documental ===
                                    item.id_tipologia_documental
                                )
                              );
                            }
                          )
                        : tipologias_asociadas_a_trd
                    }
                    columns={colums_tipologias_asociadas}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
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
                startIcon={<SaveIcon />}
                color="primary"
              >
                GUARDAR
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
