/* eslint-disable @typescript-eslint/naming-convention */
import React, { useContext, useEffect } from 'react';
import { RenderDataGrid } from '../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../../hooks';
import { columnsAgrupCcd } from './columns/columnsAgrupCcd';
import { Avatar, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { type GridValueGetterParams } from '@mui/x-data-grid';
import { AvatarStyles } from '../../../../../../../ccd/componentes/crearSeriesCcdDialog/utils/constant';
import {
  setAgrupacionesPersistentesSerieSubserie,
  setAllElements,
  setHomologacionAgrupacionesSerieSubserie,
} from '../../../../toolkit/slice/HomologacionesSeriesSlice';
import { control_success } from '../../../../../../../../../helpers';
import { ModalAndLoadingContext } from '../../../../../../../../../context/GeneralContext';

export const AgrupDocCoincidentesCCD = (): JSX.Element | null => {
  //* dispatch declaration
  const dispatch = useAppDispatch();
  //* redux declaration
  const {
    homologacionAgrupacionesSerieSubserie,
    agrupacionesPersistentesSerieSubserie,
    allElements,
  } = useAppSelector((state) => state.HomologacionesSlice);

  // ? ----- ESPACIO PARA FUNCIONES OPEN ------
  const handleConfirmarPersistencia = (params: GridValueGetterParams) => {
    //  console.log('')(params?.row);
    const nuevasAgrupacionesPersistentes = [
      ...agrupacionesPersistentesSerieSubserie,
      {
        ...params?.row,
        persistenciaConfirmada: true,
      },
    ];
    const nuevaHomologacionAgrupaciones =
      homologacionAgrupacionesSerieSubserie?.filter(
        (item: any) =>
          item?.id_catalogo_serie_actual !==
          params?.row?.id_catalogo_serie_actual
      );

    dispatch(
      setAgrupacionesPersistentesSerieSubserie(nuevasAgrupacionesPersistentes)
    );
    dispatch(
      setHomologacionAgrupacionesSerieSubserie(nuevaHomologacionAgrupaciones)
    );

    dispatch(
      setAllElements({
        coincidenciasAgrupaciones:
          allElements?.coincidenciasAgrupaciones?.filter(
            (item: any) =>
              item?.id_catalogo_serie_actual !==
              params?.row?.id_catalogo_serie_actual
          ) || [],
        persistenciasAgrupaciones:
          [
            ...allElements?.persistenciasAgrupaciones,
            {
              ...params?.row,
              persistenciaConfirmada: true,
            },
          ] || [],
      })
    );
    control_success('Persistencia confirmada');
  };
  // ? ---- ESPACIO PARA FUNCIONES CLOSED ----

  //* declaración de columnas del data grid
  const columns = [
    ...columnsAgrupCcd,
    {
      headerName: 'Acciones',
      field: 'acciones',
      width: 180,
      renderCell: (params: GridValueGetterParams) => (
        <>
          <Tooltip
            title={
              params.row.iguales
                ? 'Iguales - confirmar persitencia'
                : 'Confirmar persitencia'
            }
          >
            <IconButton
              aria-label="edit"
              size="large"
              onClick={() => {
                handleConfirmarPersistencia(params);
              }}
            >
              <Avatar
                sx={{
                  ...AvatarStyles,
                  background: 'none',
                }}
                variant="rounded"
              >
                {
                  // ? si es igual, se muestra un icono de check
                  params.row.iguales ? (
                    <CheckCircleIcon
                      sx={{
                        color: 'primary.main',
                        width: '18px',
                        height: '18px',
                      }}
                    />
                  ) : (
                    <CheckCircleOutlineIcon
                      sx={{
                        color: 'primary.main',
                        width: '18px',
                        height: '18px',
                      }}
                    />
                  )
                }
              </Avatar>
              <Typography
                sx={{
                  marginLeft: '8px',
                  fontSize: '.8rem',
                  color: params?.row?.iguales ? '#000' : 'green',
                }}
              >
                {params.row.iguales ? 'Iguales' : 'Confirmar'}
              </Typography>
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  /*  const rows = [...homologacionAgrupacionesSerieSubserie]?.sort(
    (a: any, b: any) => {
      if (a?.iguales && !b?.iguales) {
        return -1;
      } else if (!a?.iguales && b?.iguales) {
        return 1;
      } else {
        return 0;
      }
    }
  );*/

  if (homologacionAgrupacionesSerieSubserie?.length === 0) return null;

  return (
    <>
      <RenderDataGrid
        columns={columns || []}
        rows={
          [...homologacionAgrupacionesSerieSubserie].reduce((acc, curr) => {
            if (curr?.iguales) {
              acc.unshift(curr);
            } else {
              acc.push(curr);
            }
            return acc;
          }, []) || []
        }
        title="Agrupaciones documentales coincidentes entre CCD ( CCD actual / CCD nuevo )"
      />
    </>
  );
};
