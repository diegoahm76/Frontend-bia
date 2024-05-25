/* eslint-disable @typescript-eslint/naming-convention */
import { RenderDataGrid } from '../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { Title } from '../../../../../../../../../components';
import { Avatar, Grid, IconButton, TextField, Tooltip } from '@mui/material';
import { VisaulTexto } from './visualTexto/VisualTexto';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../../hooks';
import {
  columnsseriesSeccionSeleccionadSinResp,
  unidadSeriesColumns,
} from './columns/unidadSeriesColumns';
import { AvatarStyles } from '../../../../../../../ccd/componentes/crearSeriesCcdDialog/utils/constant';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { type GridValueGetterParams } from '@mui/x-data-grid';
import {
  GET_SERIES_ASOCIADA_UNIDAD_SIN_RESPONSABLE,
  GET_UNIDADES_ORGNAIZACIONALES_UNIDADES_RESP,
} from '../../../../toolkit/thunks/seccPendientesAndCat.service';
import { Loader } from '../../../../../../../../../utils/Loader/Loader';
import { containerStyles } from './../../../../../../../tca/screens/utils/constants/constants';
import { useContext } from 'react';
import { ModalAndLoadingContext } from '../../../../../../../../../context/GeneralContext';
import {
  setCurrentUnidadAsociada,
  setSeriesSeccionSeleccionadaSinResponsable,
  setUnidadeCcdAsociado,
} from '../../../../toolkit/slice/types/AsignacionUniResp';
import { control_error } from '../../../../../../../../../helpers';

export const UnidadesSeries = (): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();
  //* redux states neccesaries
  const { seccionesSinResponsable, seriesSeccionSeleccionadaSinResponsable } =
    useAppSelector((state) => state.AsigUniRespSlice);

  // ? ---- context declaration ----
  const { secondLoading, handleThirdLoading, thirdLoading } = useContext(
    ModalAndLoadingContext
  );

  //* ---------------- FUNCTIONS ------------------------

  const handleRequest = async (paramsRow: any) => {
    dispatch(setCurrentUnidadAsociada(null));
    try {
      //  console.log('')(paramsRow);
      const { id_unidad_organizacional } = paramsRow;
      const { id_ccd_actual, id_ccd_nuevo } = seccionesSinResponsable;

      const [coincidencias, unidadesRelacionadas] = await Promise.all([
        GET_SERIES_ASOCIADA_UNIDAD_SIN_RESPONSABLE({
          idUnidadActual: id_unidad_organizacional,
          idCcdActual: id_ccd_actual,
          idCcdNuevo: id_ccd_nuevo,
          setLoading: handleThirdLoading,
        }),
        GET_UNIDADES_ORGNAIZACIONALES_UNIDADES_RESP({
          idCcdNuevo: id_ccd_nuevo,
          setLoading: handleThirdLoading,
        }),
      ]);

      // ? Setear la lista de series de la sección seleccionada sin responsable, y también se setea la sección seleccionada para acceder a esos datos más adelante, todo lo que contenga el params.row
      dispatch(
        setSeriesSeccionSeleccionadaSinResponsable({
          coincidencias,
          seccionSeleccionada: paramsRow,
        })
      );

      dispatch(setUnidadeCcdAsociado(unidadesRelacionadas));
    } catch (err) {
      control_error(
        'Ha ocurrido un error al intentar acceder a la información'
      );

      dispatch(setSeriesSeccionSeleccionadaSinResponsable({}));
      dispatch(setUnidadeCcdAsociado([]));
    }
  };

  // ? definicion de la columnas necesarias para el funcionamiento de las tablas
  // ? columnas para la tabla de secciones del ccd actual
  const columnsSeccionCcActual: any[] = [
    ...unidadSeriesColumns,
    {
      headerName: 'Acciones',
      field: 'acciones',
      width: 150,
      renderCell: (params: GridValueGetterParams) => {
        return (
          <Tooltip title="Seleccionar serie">
            <IconButton
              aria-label="select"
              size="large"
              onClick={() => handleRequest(params.row)}
            >
              <Avatar sx={AvatarStyles} variant="rounded">
                <DoneAllIcon
                  sx={{
                    color: 'green',
                    width: '18px',
                    height: '18px',
                  }}
                />
              </Avatar>
            </IconButton>
          </Tooltip>
        );
      },
    },
  ];

  return (
    <>
      <Title title="Selección de secciones responsables del CCD nuevo sobre las series documentales de secciones del CCD actual" />
      <Grid
        item
        xs={12}
        sm={12}
        sx={{
          width: '100%',
          display: 'flex',
          mt: '20px',
          mb: '20px',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <VisaulTexto
          elements={[
            'Las asignaciones aquí realizadas son sólo para responsables sobre el catálogo de series, no continuarán con los permisos ni los consecutivos en el nuevo CCD',
            'Éstas asignaciones se realizan cuando la sección o subsección actual no tienen persistencia en el nuevo CCD',
          ]}
        />
      </Grid>
      {/* debe ponerse la condicional de la carga de este elemento */}

      {secondLoading ? (
        <>
          <Grid
            container
            sx={{
              ...containerStyles,
              boxShadow: 'none',
              background: 'none',
              position: 'static',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Loader altura={300} />
          </Grid>
        </>
      ) : !seccionesSinResponsable?.unidades?.length ? (
        <></>
      ) : (
        <>
          <RenderDataGrid
            title="Secciones CCD actual"
            columns={columnsSeccionCcActual ?? []}
            rows={seccionesSinResponsable?.unidades ?? []}
          />
        </>
      )}

      {thirdLoading ? (
        <>
          <Grid
            container
            sx={{
              ...containerStyles,
              boxShadow: 'none',
              background: 'none',
              position: 'static',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Loader altura={300} />
          </Grid>
        </>
      ) : !seriesSeccionSeleccionadaSinResponsable?.coincidencias?.length ? (
        <></>
      ) : (
        <>
          <RenderDataGrid
            title={`Cátalogo de serieres asociado a la unidad - ( ${
              seriesSeccionSeleccionadaSinResponsable?.seccionSeleccionada
                ?.nombre ||
              seriesSeccionSeleccionadaSinResponsable?.seccionSeleccionada
                ?.nom_unidad_actual
            } )`}
            columns={columnsseriesSeccionSeleccionadSinResp ?? []}
            rows={seriesSeccionSeleccionadaSinResponsable?.coincidencias ?? []}
          />
        </>
      )}
    </>
  );
};

/*{
  id_unidad_organizacional: 5384,
  id_cat_serie_und: 1093,
  id_serie: 295,
  cod_serie: '2',
  nombre_serie: 'ser Carros',
  id_subserie: null,
  cod_subserie: 4,
  nombre_subserie: 'serie Automóviles',
},
{
  id_unidad_organizacional: 5384,
  id_cat_serie_und: 1093,
  id_serie: 295,
  cod_serie: '3',
  nombre_serie: 'serie Documentos',
  id_subserie: null,
  cod_subserie: null,
  nombre_subserie: null,
},
{
  id_unidad_organizacional: 5384,
  id_cat_serie_und: 1093,
  id_serie: 295,
  cod_serie: '4',
  nombre_serie: 'serie Aguas',
  id_subserie: null,
  cod_subserie: null,
  nombre_subserie: null,
},
{
  id_unidad_organizacional: 5384,
  id_cat_serie_und: 1093,
  id_serie: 295,
  cod_serie: '4',
  nombre_serie: 'serie Aguas',
  id_subserie: null,
  cod_subserie: null,
  nombre_subserie: null,
},*/

/*{
  id_unidad_organizacional: 5382,
  codigo: '102',
  nombre: 'Unidad 3',
  id_organigrama: 158,
},
{
  id_unidad_organizacional: 5384,
  codigo: '14804',
  nombre: 'Unidad 25.0',
  id_organigrama: 158,
},
{
  id_unidad_organizacional: 5382,
  codigo: '10288',
  nombre: 'Unidad 3',
  id_organigrama: 158,
},
{
  id_unidad_organizacional: 5384,
  codigo: '104',
  nombre: 'Unidad 4.0',
  id_organigrama: 158,
},
{
  id_unidad_organizacional: 5382,
  codigo: '1047',
  nombre: 'Grupo tierras perdidas',
  id_organigrama: 158,
},
{
  id_unidad_organizacional: 5384,
  codigo: '1400',
  nombre: 'Grupo aguas residuales',
  id_organigrama: 158,
},
{
  id_unidad_organizacional: 5384,
  codigo: '110',
  nombre: 'Oficina jurídica',
  id_organigrama: 158,
},
{
  id_unidad_organizacional: 5384,
  codigo: '1000',
  nombre: 'Dirección general',
  id_organigrama: 158,
},*/
