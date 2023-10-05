/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import { RenderDataGrid } from '../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { useAppSelector } from '../../../../../../../../../hooks';
import { columnsAgrupDocCoinCCD } from './columnsAgrupDocCoinCCD/columnsAgrupDocCoinCCD';
import { Avatar, IconButton, Tooltip, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { type GridValueGetterParams } from '@mui/x-data-grid';
import { AvatarStyles } from '../../../../../../../ccd/componentes/crearSeriesCcdDialog/utils/constant';

export const AgrupDocCoincidentesCCD = (): JSX.Element | null => {
  //* redux declaration
  const { homologacionAgrupacionesSerieSubserie } = useAppSelector(
    (state) => state.HomologacionesSlice
  );

  //* declaración de columnas del data grid
  const columns = [
    ...columnsAgrupDocCoinCCD,
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
              // title="Añadir tipología a TRD"
              onClick={() => {
                console.log(params?.row)
                // handleConfirmarPersistencia(params);
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

  const rows = [...homologacionAgrupacionesSerieSubserie]?.sort(
    (a: any, b: any) => {
      if (a?.iguales && !b?.iguales) {
        return -1;
      } else if (!a?.iguales && b?.iguales) {
        return 1;
      } else {
        return 0;
      }
    }
  );

  if (homologacionAgrupacionesSerieSubserie?.length === 0) return null;

  return (
    <>
      <RenderDataGrid
        columns={columns || []}
        rows={rows || []}
        title="Agrupaciones documentales coincidentes entre CCD ( CCD actual / CCD nuevo )"
      />
    </>
  );
};
