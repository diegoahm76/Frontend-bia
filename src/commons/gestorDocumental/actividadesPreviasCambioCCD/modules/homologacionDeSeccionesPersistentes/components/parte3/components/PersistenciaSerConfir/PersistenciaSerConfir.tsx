/* eslint-disable @typescript-eslint/naming-convention */
import React, { useContext } from 'react';
import { RenderDataGrid } from '../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../../hooks';
import { columnsAgrupCcd as columnsPersistenciasSeriesSub } from '../AgrupDocCoincidentesCCD/columns/columnsAgrupCcd';
import { Avatar, Grid, IconButton, Tooltip } from '@mui/material';
import { AvatarStyles } from '../../../../../../../ccd/componentes/crearSeriesCcdDialog/utils/constant';
import DeleteIcon from '@mui/icons-material/Delete';
import { control_success } from '../../../../../../../../../helpers';
import {
  setAgrupacionesPersistentesSerieSubserie,
  setAllElements,
  setHomologacionAgrupacionesSerieSubserie,
} from '../../../../toolkit/slice/HomologacionesSeriesSlice';
import { ModalAndLoadingContext } from '../../../../../../../../../context/GeneralContext';
import { containerStyles } from './../../../../../../../tca/screens/utils/constants/constants';
import { Loader } from '../../../../../../../../../utils/Loader/Loader';

export const PersistenciaSerConfir = (): JSX.Element | null => {
  //* dispatch declaration
  const dispatch = useAppDispatch();

  //* redux states declarations
  const {
    agrupacionesPersistentesSerieSubserie,
    homologacionAgrupacionesSerieSubserie,
    allElements,
  } = useAppSelector((state) => state.HomologacionesSlice);

  // ? ----- ESPACIO PARA FUNCIONES OPEN ------
  const { generalLoading } = useContext(ModalAndLoadingContext);

  // ? ----- ESPACIO PARA FUNCIONES OPEN ------

  // ? handleEliminarPersistencia
  const handleEliminarPersistencia = (params: any) => {
    //  console.log('')(params.row);

    const nuevasAgrupacionesPersistentes = [
      ...homologacionAgrupacionesSerieSubserie,
      {
        ...params?.row,
        persistenciaConfirmada: false,
      },
    ];

    const a = agrupacionesPersistentesSerieSubserie.filter(
      (item: any) =>
        item.id_catalogo_serie_actual !== params.row.id_catalogo_serie_actual
    );

    dispatch(
      setHomologacionAgrupacionesSerieSubserie(nuevasAgrupacionesPersistentes)
    );

    dispatch(setAgrupacionesPersistentesSerieSubserie(a));

    dispatch(
      setAllElements({
        coincidenciasAgrupaciones: [
          ...allElements?.coincidenciasAgrupaciones,
          {
            ...params?.row,
            persistenciaConfirmada: false,
          },
        ] || [],
        persistenciasAgrupaciones:
          allElements?.persistenciasAgrupaciones.filter(
            (item: any) =>
              item?.id_catalogo_serie_actual !==
              params?.row?.id_catalogo_serie_actual
          ) || [],
      })
    );

    control_success('Ítem eliminado de tipologías restringidas');
  };

  // ? ---- ESPACIO PARA FUNCIONES CLOSED ----

  // ? definicion de columnas
  const colums = [
    ...columnsPersistenciasSeriesSub,
    {
      headerName: 'Acciones',
      field: 'acciones',
      width: 180,
      renderCell: (params: any) => (
        <>
          <Tooltip title="Eliminar persistencia">
            <IconButton
              aria-label="delete"
              size="large"
              onClick={() => {
                handleEliminarPersistencia(params);
              }}
            >
              <Avatar sx={AvatarStyles} variant="rounded">
                <DeleteIcon
                  sx={{
                    color:
                      /* params?.row?.mismo_organigrama ? 'gray' : */ 'red',
                    width: '18px',
                    height: '18px',
                  }}
                />
              </Avatar>
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  if (agrupacionesPersistentesSerieSubserie?.length === 0) return null;

  return (
    <>
      <RenderDataGrid
        columns={colums || []}
        rows={agrupacionesPersistentesSerieSubserie || []}
        title="Persistencia de series confirmadas en nuevo CCD ( CCD actual / CCD nuevo )"
      />
    </>
  );
};
