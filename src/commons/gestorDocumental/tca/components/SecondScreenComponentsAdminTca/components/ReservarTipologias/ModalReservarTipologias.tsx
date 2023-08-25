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
} from '@mui/material';

//* icons
import CloseIcon from '@mui/icons-material/Close';
import AddTaskIcon from '@mui/icons-material/AddTask';

import { DataGrid } from '@mui/x-data-grid';

import { v4 as uuidv4 } from 'uuid';
import AddIcon from '@mui/icons-material/Add';

import { useAppDispatch, useAppSelector } from '../../../../../../../hooks';
import { Title } from '../../../../../../../components';
import { ModalContextTCA } from '../../../../context/ModalContextTca';

import { AvatarStyles } from '../../../../../ccd/componentes/crearSeriesCcdDialog/utils/constant';
import { control_success } from '../../../../../../../helpers';
import DeleteIcon from '@mui/icons-material/Delete';
import { columnsResTipologias } from './columns/columnsResTipologias';

import { set_tipologias_reservadas } from '../../../../toolkit/TCAResources/slice/TcaSlice';
import CleanIcon from '@mui/icons-material/CleaningServices';

export const ModalReservarTipologias = (): JSX.Element => {
  //* useAppDispatch
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useAppDispatch();
  //* context values
  const { modalReservaTipologia, closeModalReservaTipologia } =
    useContext(ModalContextTCA);

  //* get element from store
  const { tipologias_NO_resevadas, tipologias_resevadas } = useAppSelector(
    (state: any) => state.tca_slice
  );

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
                // ? añdir tipologias con reservadass
                dispatch(
                  set_tipologias_reservadas(
                    tipologias_NO_resevadas.length > 0
                      ? [...tipologias_resevadas, params.row]
                      : [...tipologias_NO_resevadas, params.row]
                  )
                );
                control_success('Ítem añadido como tipología restringida');
                console.log(params.row);
                // console.log('añadiendo tipología restringida');
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
                control_success('Ítem eliminado de tipologías restringidas');
                console.log(params.row);
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
                <Box>
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
                      ) || tipologias_NO_resevadas
                    }
                    columns={columns_tipologias_NO_restringidas}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    experimentalFeatures={{ newEditingApi: true }}
                    getRowId={() => uuidv4()}
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
            <Grid item xs={12} sm={12} sx={{ marginTop: '1rem' }}>
              <Button
                variant="contained"
                type="submit"
                startIcon={<AddTaskIcon />}
                color="success"
              >
                ESTABLECER TIPOLOGIAS RESTRINGIDAS
              </Button>
              <Button
                variant="outlined"
                startIcon={<CleanIcon />}
                color="primary"
                sx={{ ml: '10px' }}
                onClick={() => dispatch(set_tipologias_reservadas([]))}
              >
                REINICIAR TIPOLOGÍAS
              </Button>
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
                color="error"
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
