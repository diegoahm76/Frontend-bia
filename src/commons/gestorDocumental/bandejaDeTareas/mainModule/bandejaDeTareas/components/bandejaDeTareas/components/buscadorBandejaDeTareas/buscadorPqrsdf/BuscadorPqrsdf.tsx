/* eslint-disable @typescript-eslint/naming-convention */
import { useEffect, useState } from 'react';
import { Button, Grid, Stack, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { showAlert } from '../../../../../../../../../../utils/showAlert/ShowAlert';
import { CHOICES_TIPO_PQR_SDF } from './utils/choicesTipoPQRSDF';

export const BuscadorPqrsdf = (props: any): JSX.Element => {
  const { controlBusquedaBandejaTareas } = props;

/*  // ? useState Necesario
  const [request, setRequest] = useState<any>({
    requestStatuses: [],
    unidadesOrganizacionales: [],
  });

  const getDataToSelect = async (): Promise<any> => {
    const [requestStatuses, unidadesOrganizacionales] = await Promise.all([
      getRequestStates(),
      getUnidadesOrgActual(),
    ]);

    setRequest({
      requestStatuses,
      unidadesOrganizacionales,
    });
  };

  //* se debe establecer un useEffect ya que cada vez que se recargeue el elemento se deben filtrar de diferente manera los elementos
  useEffect(() => {
    void getDataToSelect();
  }, []);
*/
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
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div>
              <Select
                value={value}
                onChange={(selectedOption) => {
                  //  console.log('')(selectedOption);
                  onChange(selectedOption);
                }}
                options={[]}
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
                  Estado asignación de tarea	
                </small>
              </label>
            </div>
          )}
        />
      </Grid>
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
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div>
              <Select
                value={value}
                onChange={(selectedOption) => {
                  //  console.log('')(selectedOption);
                  onChange(selectedOption);
                }}
                options={[]}
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
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div>
              <Select
                value={value}
                onChange={(selectedOption) => {
                  //  console.log('')(selectedOption);
                  onChange(selectedOption);
                }}
                options={[]}
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
