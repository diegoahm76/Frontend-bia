/* eslint-disable @typescript-eslint/naming-convention */
import { Avatar, Grid, IconButton, Tooltip } from '@mui/material';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../../hooks';
import { RenderDataGrid } from '../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { columnsCoincidencias as columnsPersistenciasConfirmadas } from '../coincidenciasHalladasCCD/columnsCoincidencias/columnsCoincidencia';
import DeleteIcon from '@mui/icons-material/Delete';
import { AvatarStyles } from '../../../../../../../ccd/componentes/crearSeriesCcdDialog/utils/constant';
import { control_success } from '../../../../../../../../../helpers';
import {
  setAgrupacionesPersistentesSerieSubserie,
  setAllElements,
  setCurrentPersistenciaSeccionSubseccion,
  setHomologacionAgrupacionesSerieSubserie,
  setHomologacionUnidades,
  setUnidadesPersistentes,
} from '../../../../toolkit/slice/HomologacionesSeriesSlice';
import { type GridValueGetterParams } from '@mui/x-data-grid';
import { control_warning } from '../../../../../../../../almacen/configuracion/store/thunks/BodegaThunks';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import {
  fnGetAgrupacionesCoincidetesCcd,
  fnGetPersistenciasConfirmadas,
  getAllElements,
} from '../../../../toolkit/thunks/seriesDocumentalesPersistentes.service';
import Swal from 'sweetalert2';
import { ModalAndLoadingContext } from '../../../../../../../../../context/GeneralContext';
import { useContext } from 'react';

export const PersistenciaConfirmadaCCD = (): JSX.Element => {
  // ? dispatch declaration
  const dispatch = useAppDispatch();

  //* redux states
  const {
    unidadesPersistentes,
    homologacionUnidades,
    agrupacionesPersistentesSerieSubserie,
    homologacionAgrupacionesSerieSubserie,
    currentPersistenciaSeccionSubseccion,
  } = useAppSelector((state) => state.HomologacionesSlice);

  // ? context declaration
  const { generalLoading, handleGeneralLoading } = useContext(
    ModalAndLoadingContext
  );

  // ? ----- ESPACIO PARA FUNCIONES OPEN ------

  // ? eliminación de persitencia sin validación

  const eliminarPersistencia = (
    unidadesPersistentes: any[],
    idUnidadActual: number
  ) => {
    // ? si existe el valor en el local storage se asigna el valor al estado correspondiente
    const nuevasUnidadesPersistentes =
      homologacionAgrupacionesSerieSubserie?.filter(
        (item: any) => item?.id_unidad_org_actual !== idUnidadActual
      );

    //  console.log('')(nuevasUnidadesPersistentes);

    dispatch(
      setHomologacionAgrupacionesSerieSubserie(nuevasUnidadesPersistentes)
    );

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

    void fnGetPersistenciasConfirmadas({
      id_ccd_nuevo: row?.id_ccd_nuevo,
      id_unidad_actual: row?.id_unidad_actual,
      id_unidad_nueva: row?.id_unidad_nueva,
      setLoading: handleGeneralLoading,
    })
      .then((resAgrupacionesPersistentes: any) => {
        //  console.log('')(resAgrupacionesPersistentes);

        if (resAgrupacionesPersistentes?.length > 0) {
          void Swal.fire({
            title: 'Atención',
            text: `No puede eliminar la persistencia confirmada de la unidad con código ${row?.cod_unidad_actual} - ${row?.nom_unidad_actual} porque tiene agrupaciones persistentes, elimine primero las agrupaciones persistentes`,
            icon: 'warning',
            confirmButtonText: 'Aceptar',
          });
          return;
        } else {
          const nuevasUnidadesPersistentes = eliminarPersistencia(
            unidadesPersistentes,
            row?.id_unidad_actual
          );

          control_success('Persistencia eliminada');
          dispatch(setUnidadesPersistentes(nuevasUnidadesPersistentes));
          //* se actualiza tambien la tabla de las homologaciones si se pasa a este caso, en caso contrario no lo hace
          dispatch(setHomologacionUnidades(nuevaHomologacionUnidades));

          //* se quita la persistencia marcada como current
          dispatch(setCurrentPersistenciaSeccionSubseccion(null));
        }

        //* asignar esas persistencias al estado si ya existen
      })
      .catch((err: any) => {
        //  console.log('')(err);
      });
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
              !params?.row?.mismo_organigrama
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
              disabled={currentPersistenciaSeccionSubseccion}
              onClick={() => {
                //  console.log('')(params?.row);
                void getAllElements(unidadesPersistentes, handleGeneralLoading).then((res) => {
                  dispatch(setAllElements(res))
                })
                //* se limpian tambien los estados consecuentes luego de la elección de las agrupaciones coincidentes o persistentes

                //? revisar la necesidad de estos dos estados ya que se debe mantener en memoria esos elememtos para poder hacer la comparación de los elementos que se van a homologar

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

                //* la idea es asignar el array de las coincidencias en series documentales en base al elemento seleccionado y al mismo tiempo seleccionar ese elemento como la persistencia actual
                dispatch(
                  setCurrentPersistenciaSeccionSubseccion({
                    cod_unidad_actual,
                    nom_unidad_actual,
                    cod_unidad_nueva,
                    nom_unidad_nueva,
                    id_unidad_actual,
                    id_unidad_nueva,
                  })
                );

                // id_unidad_actual - secciones
                // id_unidad_org_actual - series

                void fnGetAgrupacionesCoincidetesCcd({
                  id_ccd_actual,
                  id_ccd_nuevo,
                  id_unidad_actual,
                  id_unidad_nueva,
                  setLoading: handleGeneralLoading,
                }).then((resCoincidenciasAgrupacionesDocumentales: any) => {
                  //  console.log('')(resCoincidenciasAgrupacionesDocumentales);

                  //* se asigna las agrupaciones coincidentes en el estado de las agrupaciones coincidentes
                  dispatch(
                    setHomologacionAgrupacionesSerieSubserie(
                      resCoincidenciasAgrupacionesDocumentales
                    )
                  );
                });

                //* tambien se debe hacer la petición de las series con persitencias confirmadas en caso de que alguna vez ya se haya hecho

                // ! LLAMAR A LA PETICIÓN DE LAS AGRUPACIONES PERSISTENTES
                void fnGetPersistenciasConfirmadas({
                  id_ccd_nuevo,
                  id_unidad_actual,
                  id_unidad_nueva,
                  setLoading: handleGeneralLoading,
                })
                  .then((resAgrupacionesPersistentes: any) => {
                    //  console.log('')(resAgrupacionesPersistentes);
                    dispatch(
                      setAgrupacionesPersistentesSerieSubserie(
                        [...resAgrupacionesPersistentes,/*{
                          "id_unidad_org_actual": 5383,
                          "id_catalogo_serie_actual": 10874545,
                          "id_serie_actual": 295,
                          "cod_serie_actual": "1",
                          "nombre_serie_actual": "ser 1aw",
                          "id_subserie_actual": null,
                          "cod_subserie_actual": null,
                          "nombre_subserie_actual": null,
                          "id_unidad_org_nueva": 5387,
                          "id_catalogo_serie_nueva": 1046599,
                          "id_serie_nueva": 299,
                          "cod_serie_nueva": "1",
                          "nombre_serie_nueva": "seriwwe 1",
                          "id_subserie_nueva": null,
                          "cod_subserie_nueva": null,
                          "nombre_subserie_nueva": null,
                          "iguales": false
                      }*/] || []
                      )
                    );
                    //* asignar esas persistencias al estado si ya existen
                  })
                  .catch((err: any) => {
                    //  console.log('')(err);
                  });
              }}
            >
              <Avatar sx={AvatarStyles} variant="rounded">
                <DoneAllIcon
                  titleAccess={
                    currentPersistenciaSeccionSubseccion &&
                    'Ya hay una persistencia seleccionada, limpie la selección para poder seleccionar otra persistencia'
                  }
                  sx={{
                    color: currentPersistenciaSeccionSubseccion
                      ? 'gray'
                      : 'green',
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
    /*  cuando el loading esté en true se debe mostrar el loading necesario para que se muestre la carga progresiva del componente */
  }

 /* if (generalLoading) {
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
  }*/
  {
    /* si no hay unidades persistentes este componente no se visualiza */
  }

  if (unidadesPersistentes?.length === 0) return <></>;

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
