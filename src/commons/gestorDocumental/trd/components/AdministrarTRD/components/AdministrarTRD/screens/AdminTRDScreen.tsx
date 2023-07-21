/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import { Avatar, Box, Button, Grid, IconButton, Stack } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../../../../../hooks';
import { Title } from '../../../../../../../../components';
import { DataGrid } from '@mui/x-data-grid';
import { columns } from '../../CatalogoTRD/utils/columsCatalogoTRD';
import { columnsCCD } from '../../../../CCDSeleccionadoCatalogo/colums/colums';
import { Link } from 'react-router-dom';

//* Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { AvatarStyles } from '../../../../../../ccd/componentes/crearSeriesCcdDialog/utils/constant';
import { FormTRDAdmin } from '../components/FormTRD/FormTRDAdmin';
import { useContext } from 'react';
import { ModalContextTRD } from '../../../../../context/ModalsContextTrd';
import {/* delete_item_catalogo_trd, get_catalogo_trd, */ get_tipologia_doc_asociadas_trd } from '../../../../../toolkit/TRDResources/thunks/TRDResourcesThunks';
import { set_selected_item_from_catalogo_trd_action } from '../../../../../toolkit/TRDResources/slice/TRDResourcesSlice';

export const AdminTRDScreen = (): JSX.Element | null => {
  //* dispatch declaration
  const dispatch = useAppDispatch();
  //* context declaration
  const {
    modalAdministracionTRD,
    openModalAdministracionTRD,
    closeModalAdministracionTRD
  } = useContext(ModalContextTRD);

  const {
    trd_current,
    catalado_series_subseries_unidad_organizacional,
    catalogo_trd
  } = useAppSelector((state: any) => state.trd_slice);
  //* crear modal open y close para administrar trd

const columns_catalogo_trd = [
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 120,
      renderCell: (params: any) => {
        return (
          <>
            <IconButton
              aria-label="edit"
              size="large"
              title="Editar relación catalogo TRD"
              onClick={() => {
                // ? this is the function to get data asociated to trd
                dispatch(
                  set_selected_item_from_catalogo_trd_action(params.row)
                );
                dispatch(get_tipologia_doc_asociadas_trd(trd_current.id_trd));
                openModalAdministracionTRD();
                console.log(params.row);
              }}
            >
              <Avatar sx={AvatarStyles} variant="rounded">
                <EditIcon
                  sx={{
                    color: 'primary.main',
                    width: '18px',
                    height: '18px'
                  }}
                />
              </Avatar>
            </IconButton>

            <IconButton
              aria-label="delete"
              size="large"
              title="Eliminar relación catalogo TRD"
              onClick={() => {

                // ? pendiente de revision esta funcion
               /* dispatch(
                  delete_item_catalogo_trd(params.row.id_catserie_unidadorg)
                ).then(() => {
                  dispatch(get_catalogo_trd(trd_current.id_trd));
                });
*/
                console.log(params.row);
              }}
            >
              <Avatar sx={AvatarStyles} variant="rounded">
                <DeleteIcon
                  sx={{
                    color: 'primary.main',
                    width: '18px',
                    height: '18px'
                  }}
                />
              </Avatar>
            </IconButton>
          </>
        );
      }
    },
    ...columns
];

const columns_catalogo_ccd = [
    {
      headerName: 'Acciones',
      field: 'acciones',
      width: 80,
      renderCell: (params: { row: { id_cat_serie_und: string } }) => {
        return (
          <>
            <IconButton
              aria-label="admin"
              size="large"
              title="Administrar TRD en base a relación"
              onClick={() => {
                // ? this is the function to get data asociated to trd
                // dispatch(get_tipologia_doc_asociadas_trd(trd_current.id_trd));
                openModalAdministracionTRD();
                console.log(params.row);
                dispatch(
                  set_selected_item_from_catalogo_trd_action(params.row)
                );
              }}
            >
              <Avatar sx={AvatarStyles} variant="rounded">
                <AdminPanelSettingsIcon
                  sx={{
                    color: 'primary.main',
                    width: '18px',
                    height: '18px'
                  }}
                />
              </Avatar>
            </IconButton>
          </>
        );
      }
    },
    ...columnsCCD,
];

  return (
    <>
      <Grid
        item
        sx={{
          width: '100%',
          marginTop: '1rem'
        }}
      >
        <Stack
          direction="row"
          justifyContent="center"
          spacing={2}
          sx={{ m: '20px 0' }}
        >
          {/* buttons start */}
          <Link to="/app/gestor_documental/trd/">
            <Button
              color="success"
              variant="contained"
              startIcon={<ArrowBackIcon />}
              onClick={closeModalAdministracionTRD}
            >
              REGRESAR A TRD
            </Button>
          </Link>
        </Stack>

        <Grid
          item
          container
          sx={{
            position: 'relative',
            background: '#FAFAFA',
            borderRadius: '15px',
            p: '20px',
            mb: '20px',
            boxShadow: '0px 3px 6px #042F4A26'
          }}
        >
          <Grid xs={12}>
            <Box sx={{ width: '100%' }}>
              <Title title="Cuadro de clasificación documental Seleccionado - (Administración TRD)" />
              <DataGrid
                sx={{
                  marginTop: '.5rem'
                }}
                density="compact"
                autoHeight
                rows={
                  catalado_series_subseries_unidad_organizacional.filter(
                    (item: any) =>
                      !catalogo_trd.some(
                        (otherItem: any) =>
                          otherItem.id_cat_serie_und === item.id_cat_serie_und
                      )
                  ) || []
                }
                columns={columns_catalogo_ccd}
                pageSize={5}
                rowsPerPageOptions={[5]}
                experimentalFeatures={{ newEditingApi: true }}
                getRowId={(row) => row.id_cat_serie_und ?? 0}
              />
            </Box>
          </Grid>
        </Grid>

        <Grid
          container
          sx={{
            position: 'relative',
            background: '#FAFAFA',
            borderRadius: '15px',
            p: '20px',
            mb: '20px',
            boxShadow: '0px 3px 6px #042F4A26'
          }}
        >
          <Grid xs={12}>
            <Box sx={{ width: '100%' }}>
              <Title title="Catalogo TRD - Tabla de retención documental - (Administración TRD)" />
              <DataGrid
                sx={{
                  marginTop: '.5rem'
                }}
                density="compact"
                autoHeight
                rows={catalogo_trd || []}
                columns={columns_catalogo_trd}
                pageSize={5}
                rowsPerPageOptions={[5]}
                experimentalFeatures={{ newEditingApi: true }}
                getRowId={(row) => row.id_catserie_unidadorg ?? 0}
              />
            </Box>
          </Grid>
        </Grid>

        {modalAdministracionTRD ? (
          <Grid
            container
            sx={{
              position: 'relative',
              background: '#FAFAFA',
              borderRadius: '15px',
              p: '20px',
              mb: '20px',
              boxShadow: '0px 3px 6px #042F4A26'
            }}
          >
            <FormTRDAdmin />
          </Grid>
        ) : null}
      </Grid>
    </>
  );
};
