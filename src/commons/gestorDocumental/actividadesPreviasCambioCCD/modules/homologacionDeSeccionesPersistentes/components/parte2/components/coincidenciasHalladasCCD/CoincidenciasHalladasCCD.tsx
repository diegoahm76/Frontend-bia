/* eslint-disable @typescript-eslint/naming-convention */
import { Avatar, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../../hooks';
import { RenderDataGrid } from '../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { columnsCoincidencias } from './columnsCoincidencias/columnsCoincidencia';
import { AvatarStyles } from '../../../../../../../ccd/componentes/crearSeriesCcdDialog/utils/constant';
import { type GridValueGetterParams } from '@mui/x-data-grid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {
  setAgrupacionesPersistentesSerieSubserie,
  setCurrentPersistenciaSeccionSubseccion,
  setHomologacionAgrupacionesSerieSubserie,
  setHomologacionUnidades,
  setUnidadesPersistentes,
} from '../../../../toolkit/slice/HomologacionesSeriesSlice';
import { control_success } from '../../../../../../../../../helpers';
import { ModalAndLoadingContext } from '../../../../../../../../../context/GeneralContext';
import { useContext } from 'react';
import { Loader } from '../../../../../../../../../utils/Loader/Loader';
import { containerStyles } from './../../../../../../../tca/screens/utils/constants/constants';

export const CoincidenciasHalladasCCD = (): JSX.Element | null => {
  // ? dispatch declaration
  const dispatch = useAppDispatch();

  //* redux states
  const { homologacionUnidades, unidadesPersistentes } = useAppSelector(
    (state) => state.HomologacionesSlice
  );

  // * context declaration
  // ? context necesarios
  const { generalLoading } = useContext(ModalAndLoadingContext);

  // ? ----- ESPACIO PARA FUNCIONES OPEN ------
  const handleConfirmarPersistencia = (params: GridValueGetterParams) => {
    const nuevasUnidadesPersistentes = [
      ...unidadesPersistentes,
      {
        ...params?.row,
        persistenciaConfirmada: true,
      },
    ];
    const nuevaHomologacionUnidades = homologacionUnidades?.filter(
      (item: any) => item?.id_unidad_actual !== params?.row?.id_unidad_actual
    );

    dispatch(setHomologacionUnidades(nuevaHomologacionUnidades));
    dispatch(setUnidadesPersistentes(nuevasUnidadesPersistentes));


    //* si limpian los campos tras la entrada de un nuevo dato a las unidades persistentesP
    dispatch(setHomologacionAgrupacionesSerieSubserie([]));
    dispatch(setAgrupacionesPersistentesSerieSubserie([]));
    dispatch(setCurrentPersistenciaSeccionSubseccion(null));

    control_success('Persistencia confirmada');
  };

  // ? ---- columns adición ----

  const columns = [
    ...columnsCoincidencias,
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

  const rows = [...homologacionUnidades].sort((a: any, b: any) => {
    if (a.iguales && !b.iguales) {
      return -1;
    } else if (!a.iguales && b.iguales) {
      return 1;
    } else {
      return 0;
    }
  });

  {
    /*
  deben ir dos condicionales
  1. la del loading del componente para que aparezca el loader
  2. si no hay ningún elemento dentro del array que se renderiza acá, no deberia mostrarse el componenten
    */
  }

  {
    /* cuando el loading esté en true se debe mostrar el loading para la carga progresiva del componenete en el momento en el que se necesite */
  }

  if (generalLoading) {
    return (
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
        <Loader altura={200} />
      </Grid>
    );
  }
  {
    /* si no hay coincidencias en las unidades del ccd este componente no se visualiza */
  }

  if (homologacionUnidades?.length === 0) return <></>;
  return (
    <>
      <RenderDataGrid
        columns={columns ?? []}
        rows={rows ?? []}
        title="Coincidencias halladas entre CCD's ( CCD actual / CCD nuevo )"
      />
    </>
  );
};
