/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { useContext } from 'react';
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
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

import {
  set_mixed_tipologias,
  set_tipologias_NO_reservadas,
  set_tipologias_reservadas
} from '../../../../toolkit/TCAResources/slice/TcaSlice';
import { Loader } from '../../../../../../../utils/Loader/Loader';
import { download_xls } from '../../../../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../../../../documentos-descargar/PDF_descargar';

export const ModalReservarTipologias = (): JSX.Element => {
  //* useAppDispatch
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useAppDispatch();
  //* context values
  const { modalReservaTipologia, closeModalReservaTipologia } =
    useContext(ModalContextTCA);

  //* get element from store
  const { tipologias_NO_resevadas, tipologias_resevadas, loadTipologias } =
    useAppSelector((state: any) => state.tca_slice);

  const baseTipologias = [
    ...columnsResTipologias,
    {
      headerName: 'Cod. tipo medio documental',
      field: 'cod_tipo_medio_doc',
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
    }
  ];

  const columns_tipologias_NO_restringidas = [
    ...baseTipologias,
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
                  set_tipologias_reservadas([
                    ...tipologias_resevadas,
                    {
                      ...params.row,
                      reservada: true
                    }
                  ])
                );

                dispatch(
                  set_tipologias_NO_reservadas(
                    tipologias_NO_resevadas.filter(
                      (item: any) =>
                        item.id_tipologia_documental !==
                        params.row.id_tipologia_documental
                    )
                  )
                );

                control_success('Ítem añadido como tipología restringida');
                //  console.log('')(params.row);
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
    ...baseTipologias,
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
                  set_tipologias_NO_reservadas([
                    ...tipologias_NO_resevadas,
                    {
                      ...params.row,
                      reservada: false
                    }
                  ])
                );

                dispatch(
                  set_tipologias_reservadas(
                    tipologias_resevadas.filter(
                      (item: any) =>
                        item.id_tipologia_documental !==
                        params.row.id_tipologia_documental
                    )
                  )
                );
                control_success('Ítem eliminado de tipologías restringidas');
                //  console.log('')(params.row);
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
          {loadTipologias ? (
            <Loader altura={400} />
          ) : (
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
                      <ButtonGroup style={{ margin: 7, display: 'flex', justifyContent: 'flex-end' }}>

                        {download_xls({ nurseries: tipologias_NO_resevadas, columns: columns_tipologias_NO_restringidas })}
                        {download_pdf({ nurseries: tipologias_NO_resevadas, columns: columns_tipologias_NO_restringidas, title: 'Tipologías no restringidas' })}

                      </ButtonGroup>
                    <DataGrid
                      sx={{ marginTop: '1.5rem' }}
                      density="compact"
                      autoHeight
                      rows={tipologias_NO_resevadas}
                      /* rows={
                        tipologias_NO_resevadas?.length > 0
                          ? tipologias_NO_resevadas?.filter((item: any) => {
                              return tipologias_resevadas?.every(
                                (element: any) => {
                                  return (
                                    element?.id_tipologia_documental !==
                                    item?.id_tipologia_documental
                                  );
                                }
                              );
                            })
                          : tipologias_resevadas
                      } */
                      columns={columns_tipologias_NO_restringidas}
                      pageSize={10}
                      rowsPerPageOptions={[10]}
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
                      /* rows={tipologias_resevadas?.filter((item: any) => {
                        return tipologias_NO_resevadas?.some(
                          (element: any) => {
                            return (
                              element?.id_tipologia_documental !==
                              item?.id_tipologia_documental
                            );
                          }
                        );
                      })} */
                      rows={tipologias_resevadas}
                      /*  rows={
                        tipologias_NO_resevadas?.length > 0
                          ? tipologias_resevadas?.filter((item: any) => {
                              return tipologias_NO_resevadas?.some(
                                (element: any) => {
                                  return (
                                    element?.id_tipologia_documental ===
                                    item?.id_tipologia_documental
                                  );
                                }
                              );
                            })
                          : tipologias_resevadas
                      } */
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
                  onClick={() => {
                    const combinedArray = [
                      ...tipologias_resevadas,
                      ...tipologias_NO_resevadas
                    ].reduce((acc: any[], item: any) => {
                      const existingItem = acc.find(
                        (i: any) =>
                          i.id_tipologia_documental ===
                          item.id_tipologia_documental
                      );
                      if (existingItem) {
                        if (!existingItem.reservada && item.reservada) {
                          return [
                            ...acc.filter(
                              (i: any) =>
                                i.id_tipologia_documental !==
                                item.id_tipologia_documental
                            ),
                            item
                          ];
                        } else {
                          return acc;
                        }
                      } else {
                        return [...acc, item];
                      }
                    }, []);

                    const tipologiasToSend = combinedArray.map((el: any) => {
                      return {
                        id_tipologia_documental: el.id_tipologia_documental,
                        reservada: el.reservada
                      };
                    });

                    dispatch(set_mixed_tipologias(tipologiasToSend));

                    //  console.log('')(tipologiasToSend);
                  }}
                >
                  ESTABLECER TIPOLOGIAS RESTRINGIDAS
                </Button>
                <Button
                  sx={{ ml: '1rem' }}
                  color="error"
                  variant="outlined"
                  onClick={closeModalReservaTipologiaDocumentalesAll}
                  startIcon={<CloseIcon />}
                >
                  CERRAR
                </Button>
              </Grid>
            </DialogContent>
          )}
        </Box>
      </Dialog>
    </>
  );
};
