/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { type FC, useContext, useState } from 'react';
import { containerStyles } from '../../../../../../../gestorDocumental/tca/screens/utils/constants/constants';
import { Button, Grid, Stack } from '@mui/material';
import { Title } from '../../../../../../../../components';
import { ContextUnidadxEntidad } from '../../context/ContextUnidadxEntidad';
import { ModalHistoricoTraslados } from '../ModalHistoricoTraslado/screen/ModalHistoricoTraslados';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import ForwardIcon from '@mui/icons-material/Forward';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../../../../hooks';
import SaveIcon from '@mui/icons-material/Save';
import {
  consultarTablaTemporal,
  getListaUnidadesOrganigramaSeleccionado,
  getListadoPersonasOrganigramaActual,
  getOrganigramasDispobibles,
  getPersonasSinActualizarOrganigramaAnteriorAlActual,
  getUnidadesOrganizacionalesOrganigramaActual,
  get_organigrama_acual,
  get_organigrama_anterior,
  putCrearRegistrosTemporalesT026,
  putTrasladoMasivoUnidadesPorEntidad
} from '../../toolkit/UxE_thunks/UxE_thunks';
import { LoadingButton } from '@mui/lab';
import { setOrganigramaAnterior } from '../../../Unidad_A_Unidad/toolkit/slice/Uni_A_UniSlice';
import { eliminarObjetosDuplicadosPorId } from '../../functions/functions';
import Swal from 'sweetalert2';
import {
  setAsignacionConsultaTablaTemporal,
  setGridActualANuevo,
  setGridAnteriorAActual,
  // setUnidadesSeleccionadas,
  setUnidadesSeleccionadasAnteriorAActual,
  set_current_id_organigrama
} from '../../toolkit/UxE_slice/UxE_slice';
import { use_u_x_entidad } from '../../hooks/use_u_x_entidad';
import { filtrarOrganigramas } from '../../Atoms/ActualANuevo/utils/function/filterOrganigramas';

export const CleanData: FC<any> = (): JSX.Element => {
  //* navigate declaration
  const navigate = useNavigate();
  //* dispatch declaration
  const dispatch = useAppDispatch();
  // ? loading  para los botones guardar y proceder respectivamente
  const [loadingButton, setLoadingButton] = useState<boolean>(false);

  //* states from redux
  const {
    controlModoTrasladoUnidadXEntidad,
    //* unidades seleccionadas traslado actual a nuevo
    unidadesSeleccionadas,
    //* unidades seleccionadas traslado anterior a actual
    unidadesSeleccionadasAnteriorAActual,
    organigrama_current,
    gridAnteriorAActual
    // asignacionConsultaTablaTemporal
    /* controlFaseEntrada */
  } = useAppSelector((state) => state.u_x_e_slice);

  //* elements from context
  const {
    handleModalHistoricos,
    handleGridActualANuevo,
    handleMood /* setOrganigramasDisponibles */
  } = useContext(ContextUnidadxEntidad);

  //* hook elements
  const { setOrganigramaActual, setOrganigramasDisponibles } =
    use_u_x_entidad();

  const guardarRegistrosT026 = (): void => {
    // //  console.log('')(unidadesSeleccionadas);

    const unidadesSeleccionadasArray =
      unidadesSeleccionadas &&
      Object?.entries(unidadesSeleccionadas)
        .filter(([_key, value]) => {
          return value
            ? value?.idPersona && value?.label && value?.value
            : null;
        })
        .map(([_key, value]) => ({
          id_persona: value?.idPersona,
          id_nueva_unidad_organizacional: value?.value
        }));

    // //  console.log('')('unidadesSeleccionadasArray', unidadesSeleccionadasArray);
    // //  console.log('')(organigrama_current, 'organigrama_current');

    void putCrearRegistrosTemporalesT026(
      organigrama_current,
      unidadesSeleccionadasArray,
      setLoadingButton
    ).then(() => {
      void consultarTablaTemporal().then((asignacionConsultaTablaTemporal) => {
        // //  console.log('')('asignacionTemporal', asignacionConsultaTablaTemporal)
        const obtenerOrganigramas = async (): Promise<any> => {
          const organigramasActuales = await get_organigrama_acual(navigate);
          setOrganigramaActual(
            organigramasActuales?.map((item: any) => ({
              label: item?.nombre,
              value: item?.id_organigrama
            }))
          );
          // //  console.log('')('organigramasActuales', organigramasActuales);
          if (
            asignacionConsultaTablaTemporal?.totalData?.id_organigrama_nuevo
          ) {
            void getOrganigramasDispobibles().then((resOrganigramas: any) => {
              handleMood(true);

              const organigramaNecesario = resOrganigramas?.filter(
                (item: any) =>
                  item?.id_organigrama ===
                  asignacionConsultaTablaTemporal?.totalData
                    ?.id_organigrama_nuevo
              );

              // //  console.log('')(organigramaNecesario);

              setOrganigramasDisponibles(
                organigramaNecesario?.map((item: any) => ({
                  label: item?.nombre,
                  value: item?.id_organigrama
                }))
              );
            });

            dispatch(
              set_current_id_organigrama(
                asignacionConsultaTablaTemporal?.totalData?.id_organigrama_nuevo
              )
            );

            handleGridActualANuevo(true);

            void getListadoPersonasOrganigramaActual().then(
              (resListaPersonas: any) => {
                void getListaUnidadesOrganigramaSeleccionado(
                  asignacionConsultaTablaTemporal?.totalData
                    ?.id_organigrama_nuevo
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

                  dispatch(setGridActualANuevo(dataMixed ? dataMixed : []));
                  dispatch(
                    setAsignacionConsultaTablaTemporal(
                      dataMixed2 ? dataMixed2 : []
                    )
                  );

                  const arraySinRepetidos = [...dataMixed2, ...dataMixed] || [];

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
                    dispatch(setGridActualANuevo(elementosNoRepetidos));
                  }
                });
              }
            );
          } else {
            const organigramasDisponibles = await getOrganigramasDispobibles();
            setOrganigramasDisponibles(
              filtrarOrganigramas(organigramasDisponibles)
            );
            handleMood(false);
          }
        };

        void obtenerOrganigramas();
      });
    });
  };

  // ? ----- FUNCION PROCEDER CON LOS CAMBIOS ----
  const procederACambioMasivoUxE = (): void => {
    const unidadesSeleccionadasArray =
      unidadesSeleccionadasAnteriorAActual &&
      Object?.entries(unidadesSeleccionadasAnteriorAActual)
        .filter(
          // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
          ([_key, value]) => {
            return value
              ? value?.idPersona && value?.label && value?.value && value?.data
              : null;
          }
        )
        .map(([_key, value]) => ({
          // data: value?.data,
          id_persona: value?.idPersona,
          nombre_nueva_unidad_organizacional: value?.label,
          id_nueva_unidad_organizacional: value?.value
        }));

    const arraysComparados = unidadesSeleccionadasArray?.map((unidad) => {
      const unidadEncontrada = gridAnteriorAActual?.filter(
        (unidadGrid) => unidadGrid.id_persona === unidad.id_persona
      );
      return {
        ...unidad,
        nombre_completo: unidadEncontrada[0]?.nombre_completo,
        id_unidad_organizacional_actual:
          unidadEncontrada[0]?.id_unidad_organizacional_actual,
        nombre_unidad_organizacional_actual:
          unidadEncontrada[0]?.nombre_unidad_organizacional_actual,
        es_unidad_organizacional_actual:
          unidadEncontrada[0]?.es_unidad_organizacional_actual
      };
    });

    // //  console.log('')('newArray', arraysComparados);

    // ? el servicio el cual se manda a llamar cuando se ejecuta la función está fallando en el backend, se debe revisar
    void putTrasladoMasivoUnidadesPorEntidad(
      arraysComparados,
      setLoadingButton
    ).then((_res) => {
      //* ejecucion get informacion
      setLoadingButton(true);
      const obtenerOrganigramaActual = async (): Promise<any> => {
        const organigramaActual = await get_organigrama_acual(navigate);
        setOrganigramaActual(
          organigramaActual?.map((item: any) => ({
            label: item?.nombre,
            value: item?.id_organigrama
          }))
        );

        return organigramaActual;

        // ! debo entrar a consultar dos cosas necesariamente (la tabla temporal y el registro de personas sin actualizar)

        // ? necesariamente se debe entrar a comparar la data que retornan esos dos servicios para hacer una especie de merge entre la información de ambos, donde la data que trae la tabla temporal será la prioridad y en consecuencia si algunos de los datos se repite en la T026 y en la lista de personas sin actualizar se debe dejar el dato que esté presente en la T026 (tabla temporal)
      };
      //* obtengo la infomración del organigrama anterior
      void get_organigrama_anterior(navigate).then(
        (infoOrganigramaAnterior) => {
          setOrganigramaAnterior(
            infoOrganigramaAnterior?.map((item: any) => ({
              label: item?.nombre,
              value: item?.id_organigrama
            }))
          );

          // ! en consecuencia obtengo los datos del organigrama actual dentro del sistema
          // !
          void obtenerOrganigramaActual().then((_infoOrganigramaActual) => {
            //* luego de haber obtenido el organigrama actual y el organigrama actual debo realizar la consulta de la tabal temporal y de la lista de las personas que en teoría habían quedado sin actualizarse, si no hay personas en ninguna de las dos listas la ídea es mostrar un alerta en la que se mencione que no se encuentran personas disponibles en este momento para realizar el traslado masivo necesario

            // ? se realiza la consulta a la tabla temporal, si la tabla temporal no trae datos se dejan solo los datos de la lista de personas sin actualizar y viceversa
            void consultarTablaTemporal().then((informacionTablaTemporal) => {
              /* La informacionTablaTemporal de la tabla temporal siempre va a ser un objeto compuesto de tres elementos:
              data - array de datos que puedan estar presentes en la tabla temporal
              success - booleano que me indica si la consulta fue exitosa o no
              detail - mensaje de error en caso de que la consulta no haya sido exitosa
            */
              void getPersonasSinActualizarOrganigramaAnteriorAlActual().then(
                (personasSinActualizar) => {
                  /* La información de personas sin actualizar siempre va a serun objeto compuesto de 3 propiedades:
                  -data - array de datos que puedan estar presentes en la lista de personas sin actualizar
                  -success - booleano que me indica si la consulta fue exitosa o no
                  -detail - mensaje de error en caso de que la consulta no haya sido exitosa
                */
                  // //  console.log('')('data tabla temporal', informacionTablaTemporal);
                  /*c//  console.log('')(
                    'personas sin actualizar organigrama anterior',
                    personasSinActualizar
                  ); */

                  // ? se deben hacer un merge de los datos de la tabla temporal y de la lista de personas sin actualizar, eliminando los elemenetos repetidos (deben prevalecer los de la tabla temporal) en el caso de que se repitan los datosen ambas listas
                  void getUnidadesOrganizacionalesOrganigramaActual()
                    .then((unidadesOrganizacionalesOrgActual) => {
                      // //  console.log('')(unidadesOrganizacionalesOrgActual);
                      const arraySinRepetidos = [
                        ...informacionTablaTemporal?.data,
                        ...personasSinActualizar?.data
                      ];

                      const elementosNoRepetidos =
                        eliminarObjetosDuplicadosPorId(arraySinRepetidos);

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
                            navigate(
                              '/app/transversal/administracion_personas'
                            );
                          } else {
                            window.location.reload();
                          }
                        });
                      } else {
                        const dataMixed = elementosNoRepetidos?.map(
                          (item: any) => {
                            return {
                              ...item,
                              unidadesDisponiblesParaTraslado:
                                unidadesOrganizacionalesOrgActual?.data
                            };
                          }
                        );
                        // //  console.log('')(dataMixed);

                        dispatch(setGridAnteriorAActual(dataMixed));
                      }
                    })
                    .finally(() => {
                      //! se deben revisar estas asginaciones ya que puede ser errado que se hagan de esta manera
                      dispatch(setAsignacionConsultaTablaTemporal(null));
                      dispatch(setUnidadesSeleccionadasAnteriorAActual([]));
                      setLoadingButton(false);
                    });
                }
              );
            });
            // //  console.log('')('info organigrama anterior', infoOrganigramaAnterior);
            // //  console.log('')('INFO ORGANIGRAMA ACTUAL', infoOrganigramaActual);
          });
        }
      );
    });
  };

  if (!controlModoTrasladoUnidadXEntidad) return <></>;

  return (
    <>
      <Grid container sx={containerStyles}>
        <Grid item xs={12}>
          <Title title="Acciones" />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              controlModoTrasladoUnidadXEntidad ===
              'modo_entrada_con_validacion_organigrama_actual_a_nuevo'
                ? guardarRegistrosT026()
                : procederACambioMasivoUxE();
            }}
            style={{
              textAlign: 'center',
              justifyContent: 'center',
              marginTop: '20px'
            }}
          >
            <Grid
              container
              sx={{
                justifyContent: 'center'
              }}
              spacing={2}
            >
              <Grid
                item
                xs={12}
                sm={12}
                sx={{
                  // zIndex: 2,
                  justifyContent: 'center'
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="center"
                  spacing={2}
                  sx={{ m: '20px 0' }}
                >
                  {/* la verdadera validación se da con este state
                  controlFaseEntrada !== 1
                  */}
                  {controlModoTrasladoUnidadXEntidad ===
                    'modo_entrada_con_validacion_organigrama_anterior_a_actual' && (
                    <Button
                      color="warning"
                      variant="contained"
                      startIcon={<VisibilityIcon />}
                      onClick={handleModalHistoricos}
                    >
                      HISTÓRICO TRASLADOS MASIVOS
                    </Button>
                  )}

                  {/*  solo en el modo 1 debe aparecer  */}
{/*
                  {controlModoTrasladoUnidadXEntidad !==
                    'modo_entrada_con_validacion_organigrama_anterior_a_actual' && (
                    <Button
                      color="primary"
                      variant="outlined"
                      startIcon={<CleanIcon />}
                      onClick={() => {
                        //  console.log('')('cleaning fields');
                        dispatch(setUnidadesSeleccionadas(null));
                      }}
                    >
                      REINICIAR CAMPOS
                    </Button>
                  )}
*/}
                  <LoadingButton
                    // color="success"
                    loading={loadingButton}
                    color="success"
                    variant="contained"
                    type="submit"
                    // DEBE HABILITARSE LA CONDICIONAL DE GUARDAR O PROCEDER DEPENDIENDO EL ESCENARIO (MODE)
                    startIcon={
                      controlModoTrasladoUnidadXEntidad ===
                      'modo_entrada_con_validacion_organigrama_actual_a_nuevo' ? (
                        <SaveIcon />
                      ) : (
                        <ForwardIcon />
                      )
                    }
                  >
                    {/* guardar en la primera opción, proceder en la segunda opción */}

                    {controlModoTrasladoUnidadXEntidad ===
                    'modo_entrada_con_validacion_organigrama_actual_a_nuevo'
                      ? 'GUARDAR'
                      : 'PROCEDER'}
                  </LoadingButton>

                  <Link to="/app/home">
                    <Button
                      color="error"
                      variant="contained"
                      startIcon={<CloseIcon />}
                    >
                      SALIR DEL MÓDULO
                    </Button>
                  </Link>
                </Stack>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>

      {/*  modal historico traslados masivos, solo debe estar en la opción numero 2
        Traslado de unidades organizacionales de organigrama anterior a actual
      
                    SE DEBE HABILITAR LA CONDICIONAL DE MUESTRA O NO DEPDENDIENDO EL ESCENARIO (MODE)

      */}

      <ModalHistoricoTraslados />
    </>
  );
};
