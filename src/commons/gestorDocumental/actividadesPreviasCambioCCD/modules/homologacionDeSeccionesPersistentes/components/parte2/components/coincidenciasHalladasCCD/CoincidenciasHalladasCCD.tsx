/* eslint-disable @typescript-eslint/naming-convention */
import { Avatar, IconButton, Tooltip, Typography } from '@mui/material';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../../hooks';
import { RenderDataGrid } from '../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { columnsCoincidenciasHalladas } from './columnsCoincidenciasHalladas/columnsCoincidenciasHalladas';
import { AvatarStyles } from '../../../../../../../ccd/componentes/crearSeriesCcdDialog/utils/constant';
import { type GridValueGetterParams } from '@mui/x-data-grid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {
  setHomologacionUnidades,
  setUnidadesPersistentes,
} from '../../../../toolkit/slice/HomologacionesSeriesSlice';
import { control_success } from '../../../../../../../../../helpers';

export const CoincidenciasHalladasCCD = (): JSX.Element | null => {
  // ? dispatch declaration
  const dispatch = useAppDispatch();

  //* redux states
  const { homologacionUnidades, unidadesPersistentes } = useAppSelector(
    (state) => state.HomologacionesSlice
  );

  // ? ---- columns adición ----

  const columns = [
    ...columnsCoincidenciasHalladas,
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
                dispatch(
                  setUnidadesPersistentes([
                    ...unidadesPersistentes,
                    {
                      ...params?.row,
                      persistenciaConfirmada: true,
                    },
                  ])
                );

                dispatch(
                  setHomologacionUnidades(
                    homologacionUnidades?.filter(
                      (item: any) =>
                        item?.id_unidad_actual !== params?.row?.id_unidad_actual
                    )
                  )
                );

                control_success('Persi');
                console.log(params.row);
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

  {
    /*
  deben ir dos condicionales
  1. la del loading del componente para que aparezca el loader
  2. si no hay ningún elemento dentro del array que se renderiza acá, no deberia mostrarse el componenten
    */
  }

  return (
    <>
      <RenderDataGrid
        columns={columns ?? []}
        rows={[...homologacionUnidades].sort((a: any, b: any) => {
          if (a.iguales && !b.iguales) {
            return -1;
          } else if (!a.iguales && b.iguales) {
            return 1;
          } else {
            return 0;
          }
        })}
        title="Coincidencias halladas entre CCD's ( CCD actual / CCD nuevo )"
      />
    </>
  );
};
