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
import { GET_SERIES_ASOCIADA_UNIDAD_SIN_RESPONSABLE } from '../../../../toolkit/thunks/seccPendientesAndCat.service';
import { Loader } from '../../../../../../../../../utils/Loader/Loader';
import { containerStyles } from './../../../../../../../tca/screens/utils/constants/constants';
import { useContext } from 'react';
import { ModalAndLoadingContext } from '../../../../../../../../../context/GeneralContext';
import { setSeriesSeccionSeleccionadaSinResponsable } from '../../../../toolkit/slice/types/AsignacionUniResp';

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
          <Tooltip title="Seleccionar persistencia">
            <IconButton
              aria-label="select"
              size="large"
              onClick={() => {
                void GET_SERIES_ASOCIADA_UNIDAD_SIN_RESPONSABLE({
                  idUnidadActual: params?.row?.id_unidad_organizacional,
                  idCcdActual: seccionesSinResponsable?.id_ccd_actual,
                  idCcdNuevo: seccionesSinResponsable?.id_ccd_nuevo,
                  setLoading: handleThirdLoading,
                }).then((resSeriesDeLaSeccionSeleccionada) => {
                  console.log(
                    'resSeriesDeLaSeccionSeleccionada',
                    resSeriesDeLaSeccionSeleccionada
                  );
                  console.log(params.row);

                  // ? set lista de series de la seccion seleccionada sin responsable, y tambien se setea la seccion seleccionada para acceder a esos datos mas adelante, todo lo que contentenga el params.row

                  dispatch(
                    setSeriesSeccionSeleccionadaSinResponsable({
                      coincidencias: resSeriesDeLaSeccionSeleccionada,
                      seccionSeleccionada: params?.row,
                    })
                  );
                });
              }}
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
  // ? columnas para la tabla de secciones del ccd nuevo
  //* -------------

  /*if (!seccionesSinResponsable?.unidades?.length) return <></>;*/

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
      ) : !seccionesSinResponsable?.coincidencias?.length ? (
        <></>
      ) : (
        <>
          <RenderDataGrid
            title={''}
            columns={columnsseriesSeccionSeleccionadSinResp ?? []}
            rows={seriesSeccionSeleccionadaSinResponsable?.coincidencias ?? []}
          />
        </>
      )}
    </>
  );
};
