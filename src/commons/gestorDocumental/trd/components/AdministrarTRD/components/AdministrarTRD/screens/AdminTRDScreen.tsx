/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import { Avatar, Box, Button, ButtonGroup, Grid, IconButton, Stack } from '@mui/material';
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
import {
  delete_item_catalogo_trd,
  getServiceSeriesSubseriesXUnidadOrganizacional,
  get_catalogo_trd,
  get_tipologia_doc_asociadas_trd
} from '../../../../../toolkit/TRDResources/thunks/TRDResourcesThunks';
import {
  get_tipologias_asociadas_a_trd,
  set_selected_item_from_catalogo_trd_action
} from '../../../../../toolkit/TRDResources/slice/TRDResourcesSlice';
import { use_trd } from '../../../../../hooks/use_trd';
import { DownloadButton } from '../../../../../../../../utils/DownloadButton/DownLoadButton';
import { download_xls } from '../../../../../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../../../../../documentos-descargar/PDF_descargar';

export const AdminTRDScreen = (): JSX.Element | null => {
  //* dispatch declaration
  const dispatch = useAppDispatch();
  //* context declaration
  const {
    modalAdministracionTRD,
    openModalAdministracionTRD,
    closeModalAdministracionTRD,
    buttonAddNewTRDRelationActual,
    setButtonAddNewTRDRelationActual,
    buttonSpecialEditionActualTRD,
    setButtonSpecialEditionActualTRD
  } = useContext(ModalContextTRD);

  const {
    trd_current,
    catalado_series_subseries_unidad_organizacional,
    catalogo_trd
  } = useAppSelector((state: any) => state.trd_slice);
  //* crear modal open y close para administrar trd

  //* use_trd
  const { reset_administrar_trd } = use_trd();

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
                dispatch(
                  get_tipologia_doc_asociadas_trd(
                    params.row.id_catserie_unidadorg
                  )
                );
                openModalAdministracionTRD();
                //  console.log('')(params.row);
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
            {trd_current.actual ? null : (
              <IconButton
                aria-label="delete"
                size="large"
                title="Eliminar relación catalogo TRD"
                onClick={() => {
                  // ? pendiente de revision esta funcion
                  dispatch(
                    delete_item_catalogo_trd(params.row.id_catserie_unidadorg)
                  )
                    .then(() => {
                      dispatch(get_catalogo_trd(trd_current.id_trd));
                    })
                    .then(() => {
                      dispatch(
                        getServiceSeriesSubseriesXUnidadOrganizacional({
                          id_ccd: trd_current.id_ccd,
                          id_organigrama: trd_current.id_organigrama
                        })
                      );
                      closeModalAdministracionTRD();
                      dispatch(get_tipologias_asociadas_a_trd([]));
                      reset_administrar_trd({
                        cod_disposicion_final: '',
                        digitalizacion_dis_final: true,
                        tiempo_retencion_ag: '',
                        tiempo_retencion_ac: '',
                        descripcion_procedimiento: '',
                        justificacion_cambio: '',
                        tipologias: [],
                        ruta_archivo_cambio: ''
                      });
                    });

                  //  console.log('')(params.row);
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
            )}
          </>
        );
      }
    },
    ...columns,
    {
      headerName: 'Justificación cambio',
      field: 'justificacion_cambio',
      width: 180
    },
    {
      headerName: 'Archivo cambio',
      field: 'ruta_archivo_cambio',
      renderCell: (params: any) => (
        params.row.ruta_archivo_cambio &&
        <DownloadButton
          fileName="ruta_archivo_cambio"
          condition={false}
          fileUrl={params.row.ruta_archivo_cambio}
        />
      )
    }
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
                setButtonSpecialEditionActualTRD(false);
                //  console.log('')(buttonSpecialEditionActualTRD);
                // ? this is the function to get data asociated to trd
                // dispatch(get_tipologia_doc_asociadas_trd(params.row.id_cat_serie_und));
                openModalAdministracionTRD();
                //  console.log('')(params.row);
                dispatch(
                  set_selected_item_from_catalogo_trd_action(params.row)
                );
                dispatch(get_tipologias_asociadas_a_trd([]));
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
    ...columnsCCD
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
              onClick={() => {
                dispatch(set_selected_item_from_catalogo_trd_action(null));
                closeModalAdministracionTRD();
              }}
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
          <Grid item xs={12}>
            <Box sx={{ width: '100%' }}>
              <Title title="Cuadro de clasificación documental Seleccionado - (Administración TRD)" />

              {trd_current?.actual ? null : (
                <>
                
                <ButtonGroup style={{ margin: 7, display: 'flex', justifyContent: 'flex-end' }}>

                  {download_xls({
                    nurseries: catalado_series_subseries_unidad_organizacional.filter(
                      (item: any) => !catalogo_trd.some(
                        (otherItem: any) => otherItem.id_cat_serie_und === item.id_cat_serie_und
                      )
                    ), columns: columns_catalogo_ccd })}
                  {download_pdf({
                    nurseries: catalado_series_subseries_unidad_organizacional.filter(
                      (item: any) => !catalogo_trd.some(
                        (otherItem: any) => otherItem.id_cat_serie_und === item.id_cat_serie_und
                      )
                    ), columns: columns_catalogo_ccd, title: 'Clasificación documental' })}

                </ButtonGroup>
                
                <DataGrid
                    sx={{
                      marginTop: '.5rem'
                    }}
                    density="compact"
                    autoHeight
                    rows={catalado_series_subseries_unidad_organizacional.filter(
                      (item: any) => !catalogo_trd.some(
                        (otherItem: any) => otherItem.id_cat_serie_und === item.id_cat_serie_und
                      )
                    ) || []}
                    columns={columns_catalogo_ccd}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    experimentalFeatures={{ newEditingApi: true }}
                    getRowId={(row) => row.id_cat_serie_und ?? 0} /></>
              )}

              {trd_current?.actual &&
              catalado_series_subseries_unidad_organizacional.filter(
                (item: any) =>
                  !catalogo_trd.some(
                    (otherItem: any) =>
                      otherItem.id_cat_serie_und === item.id_cat_serie_und
                  )
              ).length > 0 &&
              !buttonAddNewTRDRelationActual ? (
                <Button
                  sx={{
                    marginTop: '1rem'
                  }}
                  variant="contained"
                  color="warning"
                  onClick={() => {
                    // setButton(true);
                    setButtonAddNewTRDRelationActual(true);
                    //  console.log('')('agregar nueva relacion ccd');
                  }}
                >
                  AGREGAR NUEVA RELACION CCD
                </Button>
              ) : null}

              {buttonAddNewTRDRelationActual &&
              trd_current?.actual &&
              catalado_series_subseries_unidad_organizacional.filter(
                (item: any) =>
                  !catalogo_trd.some(
                    (otherItem: any) =>
                      otherItem.id_cat_serie_und === item.id_cat_serie_und
                  )
              ).length > 0 ? (
                <>
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
                              otherItem.id_cat_serie_und ===
                              item.id_cat_serie_und
                          )
                      ) || []
                    }
                    columns={columns_catalogo_ccd}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    experimentalFeatures={{ newEditingApi: true }}
                    getRowId={(row) => row.id_cat_serie_und ?? 0}
                  />
                  <Button
                    sx={{
                      marginTop: '1rem'
                    }}
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setButtonAddNewTRDRelationActual(false);
                      //  console.log('')('agregar nueva relacion ccd');
                    }}
                  >
                    CANCELAR AGREGAR NUEVA RELACION CCD
                  </Button>
                </>
              ) : null}
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
              <ButtonGroup style={{ margin: 7, display: 'flex', justifyContent: 'flex-end' }}>

                {download_xls({ nurseries: catalogo_trd, columns: columns_catalogo_trd })}
                {download_pdf({ nurseries: catalogo_trd, columns: columns_catalogo_trd, title: 'Catálogo TRD' })}

              </ButtonGroup>
              <DataGrid
                sx={{
                  marginTop: '.5rem'
                }}
                density="compact"
                autoHeight
                rows={catalogo_trd || []}
                columns={columns_catalogo_trd}
                pageSize={10}
                rowsPerPageOptions={[10]}
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
