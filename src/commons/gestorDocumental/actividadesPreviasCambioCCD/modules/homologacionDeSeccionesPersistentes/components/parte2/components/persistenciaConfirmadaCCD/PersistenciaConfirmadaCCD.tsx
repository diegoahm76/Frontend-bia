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
  setAgrupacionesPersistentesSerieSubserie,
  setCurrentPersistenciaSeccionSubseccion,
  setHomologacionAgrupacionesSerieSubserie,
  setHomologacionUnidades,
  setUnidadesPersistentes,
} from '../../../../toolkit/slice/HomologacionesSeriesSlice';
import { type GridValueGetterParams } from '@mui/x-data-grid';
import { control_warning } from '../../../../../../../../almacen/configuracion/store/thunks/BodegaThunks';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { Grid } from 'blockly';
import { Loader } from '../../../../../../../../../utils/Loader/Loader';
import { fnGetAgrupacionesCoincidetesCcd } from '../../../../toolkit/thunks/seriesDocumentalesPersistentes.service';
import Swal from 'sweetalert2';

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

  // ? eliminación de persitencia sin validación

  const eliminarPersistencia = (
    unidadesPersistentes: any[],
    idUnidadActual: number
  ) => {
    return unidadesPersistentes.filter(
      (item: any) => item?.id_unidad_actual !== idUnidadActual
    );
  };

  // ? handleEliminicacionValidacionPersistencia
  const handleEliminicacionValidacionPersistencia = (
    params: GridValueGetterParams,
    unidadesPersistentes: any[],
    nuevaHomologacionUnidades: any[],
    agrupacionesPersistentesSerieSubserie: any[] = [
      {
        id_unidad_org_actual: 5381,
      },
    ]
  ) => {
    const { row } = params;

    const nuevasAgrupacionesPersistentes =
      agrupacionesPersistentesSerieSubserie?.filter(
        //* revisar si es !== o ===
        (item: any) => item?.id_unidad_org_actual === row?.id_unidad_actual
      );

    if (nuevasAgrupacionesPersistentes?.length > 0) {
      //* si hay un valor coincida no se elimina
      void Swal.fire({
        title: 'Atención',
        text: `No puede eliminar la persistencia confirmada de secciones, ya que tiene ${nuevasAgrupacionesPersistentes?.length} valor(es) asociado(s) en la persistencia confirmada de series, elimine primero la(s) relacion(es).`,
        icon: 'warning',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    const nuevasUnidadesPersistentes = eliminarPersistencia(
      unidadesPersistentes,
      row?.id_unidad_actual
    );

    control_success('Persistencia eliminada');
    dispatch(setUnidadesPersistentes(nuevasUnidadesPersistentes));
    //* se actualiza tambien la tabla de las homologaciones si se pasa a este caso, en caso contrario no lo hace
    dispatch(setHomologacionUnidades(nuevaHomologacionUnidades));
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

    //* aquó se realiza la validación de la eliminación de la persistencia y se actualiza el estado de las persistencias en consecuencia
    handleEliminicacionValidacionPersistencia(
      params,
      unidadesPersistentes,
      nuevaHomologacionUnidades,
      agrupacionesPersistentesSerieSubserie
    );
  };

  // ? ----- ESPACIO PARA FUNCIONES CLOSED ------

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
                //* se limpian tambien los estados consecuentes luego de la elección de las agrupaciones coincidentes o persistentes

                //? revisar la necesidad de estos dos estados ya que se debe mantener en memoria esos elememtos para poder hacer la comparación de los elementos que se van a homologar
                dispatch(setHomologacionAgrupacionesSerieSubserie([]));
                dispatch(setAgrupacionesPersistentesSerieSubserie([]));
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
                }).then((resCoincidenciasAgrupacionesDocumentales: any) => {
                  console.log(resCoincidenciasAgrupacionesDocumentales);

                  //* se asigna las agrupaciones coincidentes en el estado de las agrupaciones coincidentes
                  dispatch(
                    setHomologacionAgrupacionesSerieSubserie(
                      resCoincidenciasAgrupacionesDocumentales
                    )
                  );

                  console.log(params?.row);
                  //* la idea es asignar el array de las coincidencias en series documentales en base al elemento seleccionado y al mismo tiempo seleccionar ese elemento como la persistencia actual
                  dispatch(
                    setCurrentPersistenciaSeccionSubseccion({
                      cod_unidad_actual,
                      nom_unidad_actual,
                      cod_unidad_nueva,
                      nom_unidad_nueva,
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
