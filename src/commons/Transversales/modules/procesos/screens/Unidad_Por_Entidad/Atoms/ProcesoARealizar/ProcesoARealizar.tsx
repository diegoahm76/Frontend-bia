/* eslint-disable @typescript-eslint/naming-convention */
//! libraries or frameworks
import { useEffect, type FC, useContext, useState } from 'react';
import { Controller } from 'react-hook-form';
//* Components Material UI
import { Grid } from '@mui/material';
// * react select
import Select from 'react-select';

import { Title } from '../../../../../../../../components';
import { use_u_x_entidad } from '../../hooks/use_u_x_entidad';
import { containerStyles } from '../../../../../../../gestorDocumental/tca/screens/utils/constants/constants';
import {
  consultarTablaTemporal,
  getPersonasSinActualizarOrganigramaAnteriorAlActual,
  get_organigrama_acual
} from '../../toolkit/UxE_thunks/UxE_thunks';
import { ContextUnidadxEntidad } from '../../context/ContextUnidadxEntidad';
import {
  setAsignacionConsultaTablaTemporal,
  setControlFaseEntrada,
  setControlModoTrasladoUnidadXEntidad,
  setUnidadesSeleccionadas
} from '../../toolkit/UxE_slice/UxE_slice';
import { useAppDispatch, useAppSelector } from '../../../../../../../../hooks';
import { Loader } from '../../../../../../../../utils/Loader/Loader';
import { useNavigate } from 'react-router-dom';

export const ProcesoARealizar: FC = (): JSX.Element => {
  //* navigate
  const navigate = useNavigate();
  //* dispatch declaration
  const dispatch = useAppDispatch();
  // ? redux toolkit - values
  const { controlFaseEntrada, asignacionConsultaTablaTemporal } = useAppSelector((state) => state.u_x_e_slice);

  //! use_u_x_entidad hooks
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {
    control_opciones_traslado,
    reset_opciones_traslado,
    controlModoTrasladoUnidadXEntidad
  } = use_u_x_entidad();

  //* context necesario

  const { handleGridActualANuevo } = useContext(ContextUnidadxEntidad);

  //* estados necesarios para el manejo de la aplicación
  const [cargaApp, setCargaApp] = useState<boolean>(false);

  useEffect(() => {
    // //  console.log('')('use_u_x_entidad');

    setCargaApp(true);
    void consultarTablaTemporal()
      .then((resTablaTemporal: any) => {
        // //  console.log('')(resTablaTemporal);

        //* por otro lado, cuando hayan resultados de la T026 se deben almacenar en un estado para realizar las comparaciones necesarias para el manejo de la aplicación

        //* el estado de esta variable para la validación siempre será === 0
        if (resTablaTemporal.data.length === 0) {
          dispatch(setControlFaseEntrada(1));
          //* se resetean resultados de la tabla temporal por si habian quedado rezagos
          dispatch(setAsignacionConsultaTablaTemporal(null));
        } else {
          void getPersonasSinActualizarOrganigramaAnteriorAlActual().then(
            (resListadoPersonasSinActualizar: any) => {
              // //  console.log('')(resListadoPersonasSinActualizar);

              //* el estado de esta variable para su validación siempre será !== 0
              void get_organigrama_acual(navigate).then(
                (resOrganigramaActual: any) => {
                  // //  console.log('')(' orgggg actual', resOrganigramaActual);
                  // //  console.log('')('orggg tabla temporal', resTablaTemporal);
                  if (
                    resListadoPersonasSinActualizar.data.length !== 0 ||
                    resOrganigramaActual[0]?.id_organigrama ===
                      resTablaTemporal?.totalData?.id_organigrama_nuevo
                  ) {
                    dispatch(setControlFaseEntrada(2));
                    dispatch(
                      setControlModoTrasladoUnidadXEntidad(
                        'modo_entrada_con_validacion_organigrama_anterior_a_actual'
                      )
                    );
                    reset_opciones_traslado({
                      opciones_traslado: {
                        value:
                          'modo_entrada_con_validacion_organigrama_anterior_a_actual',
                        label:
                          'Traslado de unidad organizanizacionales de organigrama anterior a actual'
                      }
                    });
                  } else {
                    //! se realiza la asiganción de manera temporal a la tabla temporal (valga la redundancia), ya que esos valores se van a asignar cuando se realice la petición fetch de los datos dependiendo el id de los organigramas que traiga la T026 al realizar dicha solicitud, en cualquera de los dos escenarios de la tabla temporal

                    dispatch(
                      setAsignacionConsultaTablaTemporal({
                        data: resTablaTemporal?.data,
                        id_organigrama_nuevo:
                          resTablaTemporal?.totalData?.id_organigrama_nuevo
                      })
                    );

                    dispatch(setControlFaseEntrada(2));
                    dispatch(
                      setControlModoTrasladoUnidadXEntidad(
                        'modo_entrada_con_validacion_organigrama_actual_a_nuevo'
                      )
                    );
                    reset_opciones_traslado({
                      opciones_traslado: {
                        value:
                          'modo_entrada_con_validacion_organigrama_actual_a_nuevo',
                        label:
                          'Traslado de unidad organizanizacionales de organigrama actual a nuevo'
                      }
                    });
                  }
                }
              );

              //* --------------------------

              ///* ----------------
            }
          );
        }

        //* en esta operacion consulto la tabla temporal para saber si hay datos en ella y dispongo las opereaciones que se deben hacer para la aplicacion

        // ? 1. si la tabla temporal no trae datos, la interacción no pasa de acá, debe dejarse al usuario elegir la opción que desea realizar
        // ? 2. si la tabla temporal trae datos, hay dos posibles escenarios:
        // ! 2.1. si la tabla temporal trae datos (T026), y al menos unas de las unidades organizaciones de la tabla coinciden con el organigrama actual se debe seleccionar la opción de "traslado de unidad organizacional de organigrama actual a nuevo"
        // * 2.2. si la tabla temporal trae datos (T026), y al menos unas de las unidades organizaciones de la tabla coinciden con el organigrama anterior se debe seleccionar la opción de "traslado de unidad organizacional de organigrama anterior a actual"
      })
      .finally(() => {
        // //  console.log('')('finally');
        setCargaApp(false);
      });
  }, [
    dispatch,
    reset_opciones_traslado,
    controlModoTrasladoUnidadXEntidad,
    controlFaseEntrada,
    setCargaApp
  ]);

  function resetOpcionesTraslado(): Array<{
    value: string;
    label: string;
  }> {
    return [
      {
        //* el value también va a representar el modo de entrada
        value: 'modo_entrada_con_validacion_organigrama_actual_a_nuevo',
        label:
          'Traslado de unidad organizanizacionales de organigrama actual a nuevo'
      },
      {
        //* el value también va a representar el modo de entrada
        value: 'modo_entrada_con_validacion_organigrama_anterior_a_actual',
        label:
          'Traslado de unidad organizanizacionales de organigrama anterior a actual'
      }
    ];
  }

  if (cargaApp) {
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
        <Loader altura="100vh" />
      </Grid>
    );
  }

  return (
    <>
      <Grid container sx={containerStyles}>
        <Grid item xs={12}>
          <Title title="Traslado masivo unidad organizacional por entidad" />
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            style={{
              marginTop: '20px'
            }}
          >
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sm={12}
                sx={{
                  zIndex: 2
                }}
              >
                <Controller
                  name="opciones_traslado"
                  control={control_opciones_traslado}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                  }) => (
                    <div>
                      <Select
                        value={value}
                        onChange={(selectedOption) => {
                          //* dentro de esta seleccion, tambien debe existir una selección de modo
                          dispatch(
                            setControlModoTrasladoUnidadXEntidad(
                              selectedOption.value
                            )
                          );
                          onChange(selectedOption);

                          //! reiniciar modos

                          handleGridActualANuevo(false);
                          dispatch(setUnidadesSeleccionadas([]));
                        }}
                        isDisabled={
                          controlFaseEntrada !== 1 ||
                          asignacionConsultaTablaTemporal
                        }
                        // se debe llegar a deshabilitar dependiendo la circunstancia en base a los resultados de la T026
                        options={resetOpcionesTraslado()}
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
                          ¿Qué proceso desea realizar?
                        </small>
                      </label>
                    </div>
                  )}
                />
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  );
};
