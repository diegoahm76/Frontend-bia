/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
//! libraries or frameworks
import { type FC, useEffect, useContext } from 'react';
import { Controller } from 'react-hook-form';
//* Components Material UI
import { Button, Grid, Stack } from '@mui/material';
// * react select
import Select from 'react-select';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import { Title } from '../../../../../../../../components';
import { containerStyles } from '../../../../../../../gestorDocumental/tca/screens/utils/constants/constants';
import { use_u_x_entidad } from '../../hooks/use_u_x_entidad';
import {
  getListaUnidadesOrganigramaSeleccionado,
  getListadoPersonasOrganigramaActual,
  getOrganigramasDispobibles,
  get_organigrama_acual
} from '../../toolkit/UxE_thunks/UxE_thunks';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../../../../../../../../utils/Loader/Loader';
import { filtrarOrganigramas } from './utils/function/filterOrganigramas';
import { GridActualANuevo } from '../../components/GridActualANuevo/GridActualANuevo';
import { ContextUnidadxEntidad } from '../../context/ContextUnidadxEntidad';
import { useAppDispatch, useAppSelector } from '../../../../../../../../hooks';
import {
  setAsignacionConsultaTablaTemporal,
  setGridActualANuevo,
  setUnidadesSeleccionadas,
  set_current_id_organigrama
} from '../../toolkit/UxE_slice/UxE_slice';
import Swal from 'sweetalert2';
import { eliminarObjetosDuplicadosPorId } from '../../functions/functions';

export const ActualANuevo: FC = (): JSX.Element => {
  //* navigate declaration
  const navigate = useNavigate();
  //* dispatch declaration
  const dispatch = useAppDispatch();
  // ? redux toolkit - values

  const {
    asignacionConsultaTablaTemporal,
    controlFaseEntrada,
  } = useAppSelector((state) => state.u_x_e_slice);

  //! use_u_x_entidad hooks

  const {
    control_opcion_actual_a_nuevo,
    organigramaActual,
    setOrganigramaActual,
    organigramasDisponibles,
    setOrganigramasDisponibles
  } = use_u_x_entidad();

  //* context necesario

  const { gridActualANuevo, handleGridActualANuevo } = useContext(
    ContextUnidadxEntidad
  );

  // ! use effects necesarios para el manejo del módulo
  useEffect(() => {
    //* obtiene el organigrama actual
    const obtenerOrganigramas = async (): Promise<any> => {
      const organigramasActuales = await get_organigrama_acual(navigate);
      // //  console.log('')('res', organigramasActuales);
      setOrganigramaActual(
        organigramasActuales?.map((item: any) => ({
          label: item?.nombre,
          value: item?.id_organigrama
        }))
      );

      //* --- se cierra la petición de la asignación del organigrama actual

      // * si hay algo en la tabla temporal se analiza para seleccionar de inmediato el organigrama correspondiente

      // ? se debe revisar porque ambos escenarios la propiedad: id_organigrama_nuevo está presente

      if (asignacionConsultaTablaTemporal?.id_organigrama_nuevo) {
        //  console.log('')('assssignacion T026', asignacionConsultaTablaTemporal);
        // ! se debe realizar la consulta de los organigramas disponibles para el traslado
        void getOrganigramasDispobibles().then((resOrganigramas: any) => {
          // //  console.log('')(resOrganigramas);
          // //  console.log('')(asignacionConsultaTablaTemporal?.id_organigrama_nuevo);
          // //  console.log('')('resOrganigramas', resOrganigramas);
          const organigramaNecesario = resOrganigramas?.filter(
            (item: any) =>
              item?.id_organigrama ===
              asignacionConsultaTablaTemporal?.id_organigrama_nuevo
          );
          // //  console.log('')('organigramaNecesario', organigramaNecesario);

          setOrganigramasDisponibles(
            organigramaNecesario?.map((item: any) => ({
              label: item?.nombre,
              value: item?.id_organigrama
            }))
          );

          // //  console.log('')('organigramaNecesario', organigramaNecesario);
        });

        // ? se deben realizar las acciones necesarias para volver reemplazar la función del onchange cuando si se pueden elegir datos para llamar la data necesaria - unidades organizacionales disponibles para el traslado
        //* selecciona el id del organigrama sobre el que estoy trabajando para hacer el almacenamiento de datos dentro de la tabla temporal T026
        dispatch(
          set_current_id_organigrama(
            asignacionConsultaTablaTemporal?.id_organigrama_nuevo
          )
        );
        // //  console.log('')(organigrama_current);

        handleGridActualANuevo(true);
        //* dentro de esta seleccion, tambien debe existir una selección de modo que se pueda realizar la consulta de las unidades que se deben mostrar en la tabla de asignaciones
        //! 1. se realiza la consuta del listado de personas del organigrama actual
        void getListadoPersonasOrganigramaActual().then(
          (resListaPersonas: any) => {
            // dispatch(setMoodAction(true));
            void getListaUnidadesOrganigramaSeleccionado(
              asignacionConsultaTablaTemporal?.id_organigrama_nuevo
            ).then((resListaUnidades) => {
              const dataMixed =
                resListaPersonas?.data?.map((item: any) => {
                  return {
                    ...item,
                    unidadesDisponiblesParaTraslado: resListaUnidades?.data
                  };
                }) || [];

              const dataMixed2 =
                asignacionConsultaTablaTemporal?.data?.map((item: any) => {
                  return {
                    ...item,
                    unidadesDisponiblesParaTraslado: resListaUnidades?.data
                  };
                }) || [];

              // ! realizo la asignaciónde la dataMixed
              dispatch(setGridActualANuevo(dataMixed ? dataMixed : []));
              // ! se realiza nueva asignacion a al data de la tabla tempora
              dispatch(
                setAsignacionConsultaTablaTemporal(dataMixed2 ? dataMixed2 : [])
              );

              // ? se realiza el mixing de los componentes para evitar los elementos repetidos y si los hay se sobreponene con el valor de aquellos que vienen en la tabla temporal t026

              const arraySinRepetidos = [...dataMixed2, ...dataMixed];

              // //  console.log('')('arraySinRepetidosPrimerOpcion', arraySinRepetidos);

              const elementosNoRepetidos = eliminarObjetosDuplicadosPorId(
                arraySinRepetidos || []
              );

              if (elementosNoRepetidos.length === 0) {
                void Swal.fire({
                  icon: 'warning',
                  title: 'NO HAY PERSONAS PARA TRASLADAR',
                  text: 'No se encuentran personas disponibles para realizar el traslado masivo de unidades organizacionales',
                  showCloseButton: false,
                  allowOutsideClick: false,
                  showCancelButton: true,
                  showConfirmButton: true,
                  cancelButtonText: 'Reiniciar módulo',
                  confirmButtonText: 'Ir a administrador de personas',
                  confirmButtonColor: '#042F4A',

                  allowEscapeKey: false
                }).then((result: any) => {
                  if (result.isConfirmed) {
                    navigate('/app/transversal/administracion_personas');
                  } else {
                    window.location.reload();
                  }
                });
              } else {
                dispatch(setGridActualANuevo(elementosNoRepetidos || []));
                // dispatch(setGridAnteriorAActual(dataMixed));
              }

              //* se limpian las unidades seleccionadas al realizar un cambio de organigrama - analizar que tan viable es esta opción al momento en el que se deben traer los datos

              // ! ya se limpian las unidades al momento de ejecutar el guardar y el proceder, sin embargo, se debe analizar si de todas maneras es necesario manejar el limpiado cuando se monte el componente
              // dispatch(setUnidadesSeleccionadas([]));
            });
          }
        );
        // 2. se realiza la consulta del listado de unidades del organigrama seleccioanado para traer las unidades de dicho organigrama que deben mostrarse en la tabla en la que se van a realizar las asignaciones del traslado

        // //  console.log('')('selectedOption', selectedOption);
        // onChange(selectedOption);
      } else {
        const organigramasDisponibles = await getOrganigramasDispobibles();
        setOrganigramasDisponibles(
          filtrarOrganigramas(organigramasDisponibles)
        );
        // //  console.log('')('organigramasDisponibles', organigramasDisponibles);
      }
    };

    void obtenerOrganigramas();
  }, [
    dispatch,
    navigate,
    setOrganigramaActual,
    setOrganigramasDisponibles,
    asignacionConsultaTablaTemporal
  ]);

  if (!organigramaActual[0]?.label || organigramasDisponibles?.length === 0)
    return (
      <Grid
        container
        sx={{
          ...containerStyles,
          position: 'static',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Loader altura={150} />
      </Grid>
    );

  return (
    <>
      <Grid container sx={containerStyles}>
        <Grid item xs={12}>
          <Title title="Traslado masivo unidad organizacional por entidad" />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // onSubmit();
            }}
            style={{
              marginTop: '20px'
            }}
          >
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  zIndex: 2
                }}
              >
                <Controller
                  name="organigrama_actual_opcion_1" // posiblemenete se deba modificar el nombre
                  control={control_opcion_actual_a_nuevo}
                  rules={{ required: true }}
                  render={({
                  }) => (
                    <div>
                      <Select
                        isDisabled={true}
                        value={
                          organigramaActual?.length > 0
                            ? {
                                label: organigramaActual[0]?.label,
                                value: organigramaActual[0]?.value
                              }
                            : null
                        }
                        placeholder="Seleccionar"
                      />
                      <label>
                        <small
                          style={{
                            color: 'rgba(0, 0, 0, 0.6)',
                            fontWeight: 'thin',
                            fontSize: '0.75rem',
                            marginTop: '0.25rem',
                            marginLeft: '0.25rem'
                          }}
                        >
                          Organigrama Actual
                        </small>
                      </label>
                    </div>
                  )}
                />
              </Grid>

              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  zIndex: 8
                }}
              >
                <Controller
                  name="organigrama_nuevo_opcion_1" // posiblemenete se deba modificar el nombre
                  control={control_opcion_actual_a_nuevo}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                  }) => (
                    <div>
                      <Select
                        value={
                          controlFaseEntrada === 2
                            ? organigramasDisponibles?.length > 0
                              ? {
                                  label: organigramasDisponibles[0]?.label,
                                  value: organigramasDisponibles[0]?.value
                                }
                              : value
                            : value
                        }
                        isDisabled={controlFaseEntrada === 2}
                        // el value también debe venir preselccionado cuando ya exista datos en la tabla T026 y no se haya realizado la puesta en producción del organigrama que he seleccionado

                        onChange={(selectedOption) => {
                          // //  console.log('')('selectedOption', selectedOption);
                          //* selecciona el id del organigrama sobre el que estoy trabajando para hacer el almacenamiento de datos dentro de la tabla temporal T026
                          dispatch(
                            set_current_id_organigrama(selectedOption.value)
                          );
                          // //  console.log('')(organigrama_current);

                          handleGridActualANuevo(true);
                          //* dentro de esta seleccion, tambien debe existir una selección de modo que se pueda realizar la consulta de las unidades que se deben mostrar en la tabla de asignaciones
                          //! 1. se realiza la consuta del listado de personas del organigrama actual
                          void getListadoPersonasOrganigramaActual().then(
                            (resListaPersonas: any) => {
                              void getListaUnidadesOrganigramaSeleccionado(
                                selectedOption.value
                              ).then((resListaUnidades) => {
                                const dataMixed = resListaPersonas?.data?.map(
                                  (item: any) => {
                                    return {
                                      ...item,
                                      unidadesDisponiblesParaTraslado:
                                        resListaUnidades?.data
                                    };
                                  }
                                );
                                // ! realizo la asignaciónde la dataMixed
                                dispatch(setGridActualANuevo(dataMixed));
                                // //  console.log('')('data mixed', dataMixed);

                                //* se limpian las unidades seleccionadas al realizar un cambio de organigrama - analizar que tan viable es esta opción al momento en el que se deben traer los datos
                                dispatch(setUnidadesSeleccionadas([]));
                              });
                            }
                          );
                          // 2. se realiza la consulta del listado de unidades del organigrama seleccioanado para traer las unidades de dicho organigrama que deben mostrarse en la tabla en la que se van a realizar las asignaciones del traslado

                          // //  console.log('')('selectedOption', selectedOption);
                          onChange(selectedOption);
                        }}
                        /* isDisabled={
                            debe ir dehabilitado cuando ya se ha realizado una preselección de los datos de traslado que me permite generar un registro en la tabla temporal T026
                        } */
                        // se debe llegar a deshabilitar dependiendo la circunstancia en base a los resultados de la T026
                        options={organigramasDisponibles} // deben ir seleccionado por defecto el org Actual
                        placeholder="Seleccionar"
                      />
                      <label>
                        <small
                          style={{
                            color: 'rgba(0, 0, 0, 0.6)',
                            fontWeight: 'thin',
                            fontSize: '0.75rem',
                            marginTop: '0.25rem',
                            marginLeft: '0.25rem'
                          }}
                        >
                          Organigrama Nuevo
                        </small>
                      </label>
                    </div>
                  )}
                />
              </Grid>
            </Grid>
          </form>
  
              <Stack
                direction="row"
                justifyContent="center"
                spacing={3}
                sx={{ mt: '25px' }}
              >
                <Button
                  startIcon={<CloseFullscreenIcon />}
                  endIcon={<CloseFullscreenIcon />}
                  variant="contained"
                  color="warning"
                  onClick={() => {
                    handleGridActualANuevo(!gridActualANuevo);
                  }}
                >
                  {gridActualANuevo ? 'Contrer tabla' : 'Expandir tabla'}
                </Button>
              </Stack>
          
        </Grid>
      </Grid>

      {/* data grid traslado masico organigrama actual a nuevo */}
      {gridActualANuevo ? <GridActualANuevo /> : <></>}
      {/*  <GridActualANuevo /> */}
      {/* data grid traslado masico organigrama actual a nuevo */}
    </>
  );
};
