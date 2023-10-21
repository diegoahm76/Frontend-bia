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
} from '../../../../toolkit/slice/types/AsignacionUniResp';
import { control_success } from '../../../../../../../../../helpers';

export const GridListadoAsign = (): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();
  //* redux states declarations
  const { listadoDeAsignaciones } = useAppSelector(
    (state) => state.AsigUniRespSlice
  );

  //* context
  const { generalLoading, handleGeneralLoading } = useContext(
    ModalAndLoadingContext
  );

  //* ------- FUNCTIONS SPACE ------------
  const handleDelete = (params: GridValueGetterParams) => {
    console.log(params.row);
    const filteredElementsToDelete = listadoDeAsignaciones.filter(
      (element) =>
        element.id_unidad_seccion_actual !== params.row.id_unidad_seccion_actual
    );

    dispatch(setListadoDeAsignaciones(filteredElementsToDelete));

    control_success('el elemento ha sido eliminado de forma exitosa');
  };

  const handleEditElememt = (params: GridValueGetterParams) => {
    console.log(params.row);
    dispatch(setCurrentUnidadAsociada(params.row));

    //* lista para actualizar

    const listaEditada = listadoDeAsignaciones.map((row) =>
      row.id_unidad_seccion_actual === params.row.id_unidad_seccion_actual
        ? {
            ...row,
            id_unidad_seccion_nueva: params.row.id_unidad_seccion_nueva,
            cod_unidad_nueva: params.row.cod_unidad_nueva,
            nombre_unidad_nueva: params.row.nombre_unidad_nueva,
            id_seccion_nueva: params.row.id_seccion_nueva,
            cod_seccion_nueva: params.row.cod_seccion_nueva,
            nombre_seccion_nueva: params.row.nombre_seccion_nueva,
          }
        : row
    );

    dispatch(setListadoDeAsignaciones(listaEditada));
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
