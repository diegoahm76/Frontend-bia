/* eslint-disable @typescript-eslint/naming-convention */
import { useEffect, useState } from 'react';
import { Grid, Skeleton } from '@mui/material';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { getEstadoSolicitudTarea } from '../../../../../services/servicesStates/pqrsdf/getEstadoSolicitudTarea.service';
import { getEstadoAsignacionTarea } from '../../../../../services/servicesStates/pqrsdf/getEstadoAsignacionTarea.service';
import { choiceShowTaskRequerimientos } from './utils/choiceShowTaskRequerimientos';

export const BuscadorPqrsdf = (props: any): JSX.Element => {
  const { controlBusquedaBandejaTareas } = props;

  // ? useState Necesario
  const [request, setRequest] = useState<any>({
    estadoAsignacionTarea: [],
    estadoSolicitudTarea: [],
  });

  const getDataToSelect = async (): Promise<any> => {
    const [requestAsignacion, requestSolicitud] = await Promise.all([
      getEstadoAsignacionTarea(),
      getEstadoSolicitudTarea(),
    ]);

    console.log('requestAsignacion', requestAsignacion);
    console.log('requestSolicitud', requestSolicitud);

    setRequest({
      estadoAsignacionTarea: requestAsignacion,
      estadoSolicitudTarea: requestSolicitud,
    });
  };

  //* se debe establecer un useEffect ya que cada vez que se recargeue el elemento se deben filtrar de diferente manera los elementos
  useEffect(() => {
    void getDataToSelect();
  }, []);

  // ?
  return (
    <>
      {/*el select de tipo de solicitud va a ir en el panel principal de busqueda para que se puede manejar la dualidad al momento de seleccionar*/}
      <Grid
        item
        xs={12}
        sm={4}
        sx={{
          zIndex: 2,
        }}
      >
        <Controller
          name="estado_asignacion_de_tarea"
          control={controlBusquedaBandejaTareas}
          render={({ field: { onChange, value } }) => (
            <div>
              {request?.estadoAsignacionTarea?.length === 0 ? (
                <Skeleton variant="text" height={35} /> // Reemplaza esto con tu componente de Skeleton
              ) : (
                <Select
                  value={value}
                  onChange={(selectedOption) => {
                    //  console.log('')(selectedOption);
                    onChange(selectedOption);
                  }}
                  options={[...request?.estadoAsignacionTarea, {
                    label: 'PENDIENTE POR CONFIRMAR',
                    value: 'None', // back lo recibe de esa manera
                  }] ?? []}
                  placeholder="Seleccionar"
                />
              )}
              <label>
                <small
                  style={{
                    color: 'rgba(0, 0, 0, 0.6)',
                    fontWeight: 'thin',
                    fontSize: '0.75rem',
                    marginTop: '0.25rem',
                    marginLeft: '0.25rem',
                  }}
                >
                  Estado asignación de tarea
                </small>
              </label>
            </div>
          )}
        />
      </Grid>

      {controlBusquedaBandejaTareas?._formValues?.estado_asignacion_de_tarea
        ?.value === 'Ac' &&
        controlBusquedaBandejaTareas?._formValues?.estado_asignacion_de_tarea
          ?.value && (
          <Grid
            item
            xs={12}
            sm={4}
            sx={{
              zIndex: 2,
            }}
          >
            <Controller
              name="estado_de_la_tarea"
              control={controlBusquedaBandejaTareas}
              render={({ field: { onChange, value } }) => (
                <div>
                  <Select
                    value={value}
                    onChange={(selectedOption) => {
                      //  console.log('')(selectedOption);
                      onChange(selectedOption);
                    }}
                    options={request?.estadoSolicitudTarea ?? []}
                    placeholder="Seleccionar"
                  />
                  <label>
                    <small
                      style={{
                        color: 'rgba(0, 0, 0, 0.6)',
                        fontWeight: 'thin',
                        fontSize: '0.75rem',
                        marginTop: '0.25rem',
                        marginLeft: '0.25rem',
                      }}
                    >
                      Estado de la tarea
                    </small>
                  </label>
                </div>
              )}
            />
          </Grid>
        )}

      <Grid
        item
        xs={12}
        sm={4}
        sx={{
          zIndex: 2,
        }}
      >
        <Controller
          name="mostrar_respuesta_con_req_pendientes"
          control={controlBusquedaBandejaTareas}
          render={({ field: { onChange, value } }) => (
            <div>
              <Select
                value={value}
                onChange={(selectedOption) => {
                  //  console.log('')(selectedOption);
                  onChange(selectedOption);
                }}
                options={choiceShowTaskRequerimientos ?? []}
                placeholder="Seleccionar"
              />
              <label>
                <small
                  style={{
                    color: 'rgba(0, 0, 0, 0.6)',
                    fontWeight: 'thin',
                    fontSize: '0.75rem',
                    marginTop: '0.25rem',
                    marginLeft: '0.25rem',
                  }}
                >
                  ¿Mostrar tareas con requerimientos pendientes de respuesta?
                </small>
              </label>
            </div>
          )}
        />
      </Grid>
    </>
  );
};
