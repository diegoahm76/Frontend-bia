/* eslint-disable @typescript-eslint/naming-convention */
import React, { useContext } from 'react';
import { RenderDataGrid } from '../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../../hooks';
import { columnsGridListado } from '../columns/columnsGridListado';
import { Avatar, Grid, IconButton } from '@mui/material';
import { containerStyles } from './../../../../../../../tca/screens/utils/constants/constants';
import { Loader } from '../../../../../../../../../utils/Loader/Loader';
import { ModalAndLoadingContext } from '../../../../../../../../../context/GeneralContext';
import { AvatarStyles } from '../../../../../../../ccd/componentes/crearSeriesCcdDialog/utils/constant';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { type GridValueGetterParams } from '@mui/x-data-grid';
import {
  setCurrentUnidadAsociada,
  setListadoDeAsignaciones,
  setSeriesSeccionSeleccionadaSinResponsable,
  setUnidadeCcdAsociado,
} from '../../../../toolkit/slice/types/AsignacionUniResp';
import {
  control_error,
  control_success,
} from '../../../../../../../../../helpers';
import {
  GET_SERIES_ASOCIADA_UNIDAD_SIN_RESPONSABLE,
  GET_UNIDADES_ORGNAIZACIONALES_UNIDADES_RESP,
} from '../../../../toolkit/thunks/seccPendientesAndCat.service';
import { control_info } from '../../../../../../../alertasgestor/utils/control_error_or_success';

export const GridListadoAsign = (): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();
  //* redux states declarations
  const { listadoDeAsignaciones, seccionesSinResponsable } = useAppSelector(
    (state) => state.AsigUniRespSlice
  );

  //* context
  const { generalLoading, handleThirdLoading } = useContext(
    ModalAndLoadingContext
  );

  //* ------- FUNCTIONS SPACE ------------

  const handleRequest = async (paramsRow: any) => {
    try {
      //  console.log('')(paramsRow);
      const { id_unidad_seccion_actual } = paramsRow;
      const { id_ccd_actual, id_ccd_nuevo } = seccionesSinResponsable;

      const [coincidencias, unidadesRelacionadas] = await Promise.all([
        GET_SERIES_ASOCIADA_UNIDAD_SIN_RESPONSABLE({
          idUnidadActual: id_unidad_seccion_actual,
          idCcdActual: id_ccd_actual,
          idCcdNuevo: id_ccd_nuevo,
          setLoading: handleThirdLoading,
        }),
        GET_UNIDADES_ORGNAIZACIONALES_UNIDADES_RESP({
          idCcdNuevo: id_ccd_nuevo,
          setLoading: handleThirdLoading,
        }),
      ]);

      //  console.log('')(coincidencias);
      //  console.log('')(unidadesRelacionadas);

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

  const handleDelete = (params: GridValueGetterParams) => {
    //  console.log('')(params.row);
    const filteredElementsToDelete = listadoDeAsignaciones.filter(
      (element) =>
        element.id_unidad_seccion_actual !== params.row.id_unidad_seccion_actual
    );

    dispatch(setListadoDeAsignaciones(filteredElementsToDelete));

    control_success('el elemento ha sido eliminado de forma exitosa');
    control_info('no olvides guardar los cambios');
  };

  const handleEditElememt = (params: GridValueGetterParams) => {
    void handleRequest(params.row).then(() => {
      dispatch(setCurrentUnidadAsociada(params.row));
    });
  };

  //* columns edicion y borrado necesarias
  const columns = [
    ...columnsGridListado,
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
              onClick={() => handleEditElememt(params)}
            >
              <Avatar sx={AvatarStyles} variant="rounded">
                <EditIcon
                  sx={{
                    color: 'primary.main',
                    width: '18px',
                    height: '18px',
                  }}
                />
              </Avatar>
            </IconButton>
            <IconButton
              aria-label="delete"
              size="large"
              title="Eliminar relación catalogo TRD"
              onClick={() => handleDelete(params)}
            >
              <Avatar sx={AvatarStyles} variant="rounded">
                <DeleteIcon
                  sx={{
                    color: 'red',
                    width: '18px',
                    height: '18px',
                  }}
                />
              </Avatar>
            </IconButton>
          </>
        );
      },
    },
  ];

  return (
    <>
      {generalLoading ? (
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
      ) : !listadoDeAsignaciones.length ? (
        <></>
      ) : (
        <>
          <RenderDataGrid
            title="Listado de asignaciones (Unidad CCD actual / Unidad responsable CCD nuevo)"
            columns={columns ?? []}
            rows={listadoDeAsignaciones ?? []}
          />
        </>
      )}
    </>
  );
};
