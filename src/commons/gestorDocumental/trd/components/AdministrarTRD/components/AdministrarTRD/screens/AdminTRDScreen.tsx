/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import { Avatar, Box, Button, Grid, IconButton, Stack } from '@mui/material';
import { useAppSelector } from '../../../../../../../../hooks';
import { Title } from '../../../../../../../../components';
import { DataGrid } from '@mui/x-data-grid';
import { columns } from '../../CatalogoTRD/utils/columsCatalogoTRD';
import { columnsCCD } from '../../../../CCDSeleccionadoCatalogo/colums/colums';
import { Link } from 'react-router-dom';

//* Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import EditIcon from '@mui/icons-material/Edit';
import { AvatarStyles } from '../../../../../../ccd/componentes/crearSeriesCcdDialog/utils/constant';
import { FormTRDAdmin } from '../components/FormTRD/FormTRDAdmin';
import { useContext } from 'react';
import { ModalContextTRD } from '../../../../../context/ModalsContextTrd';

export const AdminTRDScreen = (): JSX.Element | null => {

  //* context declaration
  const { modalAdministracionTRD, openModalAdministracionTRD, closeModalAdministracionTRD } = useContext(ModalContextTRD);
  const {
    /* ccd_current_catalogo_ser_sub_unid, */ /* trd_current, */ catalado_series_subseries_unidad_organizacional,
    catalogo_trd
  } = useAppSelector((state: any) => state.trd_slice);
  //* crear modal open y close para administrar trd

  /* console.log('--', catalado_series_subseries_unidad_organizacional);

  console.log('catalogo_trd', catalogo_trd); */

  const columns_catalogo_trd = [
    ...columns,
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 180,
      renderCell: (params: any) => {
        return (
          <>
            <IconButton
              aria-label="edit"
              size="large"
              title="Editar relación catalogo TRD"
              onClick={() => {
                // ? this is the function to delete the ccd
                // delete_ccd(params.row.id_cat_serie_und);
                // dispatch(get_ccd_current_catalogo_ser_sub_unid(params.row));
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
          </>
        );
      }
    }
  ];

  const columns_catalogo_ccd = [
    ...columnsCCD,
    {
      headerName: 'Acciones',
      field: 'acciones',
      width: 180,
      renderCell: (params: { row: { id_cat_serie_und: string } }) => {
        return (
          <>
            <IconButton
              aria-label="delete"
              size="large"
              title="Administrar TRD en base a relación"
              onClick={() => {
                // ? this is the function to delete the ccd
                // delete_ccd(params.row.id_cat_serie_und);
                // dispatch(get_ccd_current_catalogo_ser_sub_unid(params.row));
                openModalAdministracionTRD();
                console.log(params.row);
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
    }
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
              // color="info"
              color="success"
              variant="contained"
              // disabled={!trd_current}
              startIcon={<ArrowBackIcon />}
              onClick={closeModalAdministracionTRD}
            >
              REGRESAR A TRD
            </Button>
          </Link>
        </Stack>

        {/* <Box
          sx={{ width: '100%', marginBotton: '1rem', justifyContent: 'center' }}
        >
          <Title title="Administración de TRD" />
        </Box> */}
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

        {/* <Stack
          direction="row"
          justifyContent="flex-start"
          spacing={2}
          sx={{ m: '20px 0' }}
        >
           buttons start 
          <Link to="/app/gestor_documental/trd/">
            <Button
              color="success"
              variant="contained"
              disabled={!trd_current}
              startIcon={<ArrowBackIcon />}
              onClick={() => console.log('ABRIR ADMINISTRACIÓN DE TRD')}
            >
              REGRESAR
            </Button>
          </Link>
        </Stack> */}
      </Grid>
    </>
  );
};
