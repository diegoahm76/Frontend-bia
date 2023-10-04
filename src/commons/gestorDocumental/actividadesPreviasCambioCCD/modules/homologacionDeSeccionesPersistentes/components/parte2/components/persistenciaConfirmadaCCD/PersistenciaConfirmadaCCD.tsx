/* eslint-disable @typescript-eslint/naming-convention */
import { Avatar, IconButton, Tooltip } from '@mui/material';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../../hooks';
import { RenderDataGrid } from '../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { columnsCoincidenciasHalladas as columnsPersistenciasConfirmadas } from '../coincidenciasHalladasCCD/columnsCoincidenciasHalladas/columnsCoincidenciasHalladas';
import DeleteIcon from '@mui/icons-material/Delete';
import { AvatarStyles } from '../../../../../../../ccd/componentes/crearSeriesCcdDialog/utils/constant';
import { control_success } from '../../../../../../../../../helpers';
import {
  setHomologacionUnidades,
  setUnidadesPersistentes,
} from '../../../../toolkit/slice/HomologacionesSeriesSlice';
import { type GridValueGetterParams } from '@mui/x-data-grid';
import { control_warning } from '../../../../../../../../almacen/configuracion/store/thunks/BodegaThunks';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { Grid } from 'blockly';
import { Loader } from '../../../../../../../../../utils/Loader/Loader';
import { fnGetAgrupacionesCoincidetesCcd } from '../../../../toolkit/thunks/seriesDocumentalesPersistentes.service';

export const PersistenciaConfirmadaCCD = (): JSX.Element => {
  // ? dispatch declaration
  const dispatch = useAppDispatch();

  //* redux states
  const {
    unidadesPersistentes,
    homologacionUnidades,
    agrupacionesPersistentesSerieSubserie,
  } = useAppSelector((state) => state.HomologacionesSlice);

  // ? ----- ESPACIO PARA FUNCIONES OPEN ------

  // ? handleEliminicacionValidacionPersistencia
  const handleEliminicacionValidacionPersistencia = (
    unidadesPersistentes: any[],
    agrupacionesPersistentesSerieSubserie: any[],
    params: any
  ) => {
    const { row } = params;

    // ? se debe validar si hay agrupaciones persistentes para poder eliminarlas
    if (agrupacionesPersistentesSerieSubserie?.length === 0) {
      const nuevasAgrupacionesPersistentes =
        agrupacionesPersistentesSerieSubserie.filter(
          (item: any) => item?.id_unidad_org_actual !== row?.id_unidad_actual
        );
      control_warning(
        'no se puede eliminar la persistencia confirmada de secciones, ya que tiene un valor asociado'
      );
      return;
    }

    //* si no entra en la condicional pasa directamente a absorber este valor
    const nuevasUnidadesPersistentes = unidadesPersistentes.filter(
      (item: any) => item?.id_unidad_actual !== row?.id_unidad_actual
    );

    console.log('valor actualizado');
    dispatch(setUnidadesPersistentes(nuevasUnidadesPersistentes));
  };

  // ! eliminación de persistencias confirmadas

  const handleEliminarPersistencia = (params: GridValueGetterParams) => {
    const { row } = params;

    if (row?.mismo_organigrama) {
      control_warning(
        'No se puede eliminar una persistencia confirmada de un CCD perteneciente al mismo organigrama'
      );
      return;
    }
    // ? debe validarse la eliminación al recorrer primero el array de las persistencias de las series con persistencias, para que se hay
    const nuevaHomologacionUnidades = [
      ...homologacionUnidades,
      {
        ...row,
        persistenciaConfirmada: false,
      },
    ];
    /* const nuevasUnidadesPersistentes = unidadesPersistentes.filter(
      (item: any) => item?.id_unidad_actual !== row?.id_unidad_actual
    );*/

    dispatch(setHomologacionUnidades(nuevaHomologacionUnidades));
    //* aquó se realiza la validación de la eliminación de la persistencia y se actualiza el estado de las persistencias en consecuencia
    handleEliminicacionValidacionPersistencia(
      unidadesPersistentes,
      agrupacionesPersistentesSerieSubserie,
      params
    );
    control_success('Persistencia eliminada');
  };

  // ? ----- ESPACIO PARA FUNCIONES OPEN ------

  // ? columnas modificadas para la tabla de persistencia confirmada
  const columns = [
    ...columnsPersistenciasConfirmadas,
    {
      headerName: 'Acciones',
      field: 'acciones',
      width: 180,
      renderCell: (params: any) => (
        <>
          <Tooltip
            title={
              params?.row?.mismo_organigrama
                ? 'Eliminar persistencia'
                : 'No se puede eliminar una persistencia confirmada de un CCD perteneciente al mismo organigrama'
            }
          >
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
                    color: params?.row?.mismo_organigrama ? 'gray' : 'red',
                    width: '18px',
                    height: '18px',
                  }}
                />
              </Avatar>
            </IconButton>
          </Tooltip>

          {/* se añade un nuevo botón que permite la selección de ese elemento para poder traer su catálogo correspondiente */}

          <Tooltip title="Seleccionar persistencia">
            <IconButton
              aria-label="select"
              size="large"
              onClick={() => {
                const {
                  //* datos para traer las agrupaciones coincidentes del ccd
                  id_ccd_actual,
                  id_ccd_nuevo,
                  id_unidad_actual,
                  id_unidad_nueva,
                  //* datos para traer las agrupaciones coincidentes del ccd
                  // ? datos que necesito para llenar el espacio de la unidad actual y nuevo que estoy usando
                  cod_unidad_actual,
                  nom_unidad_actual,
                  cod_unidad_nueva,
                  nom_unidad_nueva,
                  // ? datos que necesito para llenar el espacio de la unidad actual y nuevo que estoy usando
                } = params?.row;
                // ! crear estado para almacenar la row actual seleccionada y de esa manera mostrar los datos correspondientes que necesito

                void fnGetAgrupacionesCoincidetesCcd({
                  id_ccd_actual,
                  id_ccd_nuevo,
                  id_unidad_actual,
                  id_unidad_nueva,
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
        </>
      ),
    },
  ];

  {
    /* si no hay unidades persistentes este componente no se visualiza */
  }

  if (unidadesPersistentes?.length === 0) return <></>;

  {
    /*  cuando el loading esté en true se debe mostrar el loading necesario para que se muestre la carga progresiva del componente */
  }

  /*
  if (isLoadingSeccionSub) {
    return (
      <Grid
      container
      sx={{
        ...containerStyles,
        boxShadow: 'none',
        background: 'none',
        position: 'static',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <Loader altura={200} />
    </Grid>
    );
  } */

  return (
    <>
      <RenderDataGrid
        columns={columns || []}
        rows={unidadesPersistentes || []}
        title="Persistencia confirmada en nuevo CCD ( CCD actual / CCD nuevo )"
      />
    </>
  );
};
