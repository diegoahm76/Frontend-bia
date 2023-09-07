/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
//! libraries or frameworks
import { type FC, useState, useEffect } from 'react';
import { Controller } from 'react-hook-form';
//* Components Material UI
import { Grid, Stack, TextField } from '@mui/material';
// * react select
import Select from 'react-select';
import dayjs from 'dayjs';

import { Title } from '../../../../../../../../components';
import { containerStyles } from '../../../../../../../gestorDocumental/tca/screens/utils/constants/constants';
import { use_u_x_entidad } from '../../hooks/use_u_x_entidad';
import {
  consultarTablaTemporal,
  get_organigrama_acual,
  get_organigrama_anterior
} from '../../toolkit/UxE_thunks/UxE_thunks';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../../../../../../../../utils/Loader/Loader';
import { GridAnteriorAActual2 } from '../../components/GridAnteriorANuevo2/GridAnterioAActual2';

export const AnteriorAActual: FC = (): JSX.Element => {
  //* navigate declaration
  const navigate = useNavigate();

  //* dispatch declaration
  // ? redux toolkit - values

  //! use_u_x_entidad hooks

  const {
    control_opcion_anterior_a_actual,
    organigramaAnterior,
    setOrganigramaAnterior,
    setOrganigramaActual,
    organigramaActual
  } = use_u_x_entidad();

  //* context necesario

  // ? use state to set the currentDate
  const [currentDate, setCurrentDate] = useState(dayjs().format('DD-MM-YYYY'));

  // ? useEffect to update the current date each day
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(dayjs().format('DD-MM-YYYY'));
    }, dayjs().endOf('day').diff(dayjs(), 'millisecond'));

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // ? useeffect principal para las operaciones del módulo
  useEffect(() => {
    //* funcion que me permite obtener el organigrama que se encuentra como actual dentro del sistema
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
    void get_organigrama_anterior(navigate).then((infoOrganigramaAnterior) => {
      setOrganigramaAnterior(
        infoOrganigramaAnterior?.map((item: any) => ({
          label: item?.nombre,
          value: item?.id_organigrama
        }))
      );

      // ! en consecuencia obtengo los datos del organigrama actual dentro del sistema
      // !
      void obtenerOrganigramaActual().then((infoOrganigramaActual) => {
        //* luego de haber obtenido el organigrama actual y el organigrama actual debo realizar la consulta de la tabal temporal y de la lista de las personas que en teoría habían quedado sin actualizarse, si no hay personas en ninguna de las dos listas la ídea es mostrar un alerta en la que se mencione que no se encuentran personas disponibles en este momento para realizar el traslado masivo necesario

        // ? se realiza la consulta a la tabla temporal, si la tabla temporal no trae datos se dejan solo los datos de la lista de personas sin actualizar y viceversa
        void consultarTablaTemporal()

        console.log('info organigrama anterior', infoOrganigramaAnterior);
        console.log('INFO ORGANIGRAMA ACTUAL', infoOrganigramaActual);
      });
    });
  }, []);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const onSubmit = () => {
    console.log('hello from submit');
  };

  if (!organigramaActual[0]?.label || !organigramaAnterior[0]?.label)
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
        <Loader altura={180} />
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
              onSubmit();
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
                  name="opciones_traslado"
                  control={control_opcion_anterior_a_actual} // posiblemenete se deba modificar el nombre
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <div>
                      <Select
                        value={
                          organigramaAnterior?.length > 0
                            ? {
                                label: organigramaAnterior[0]?.label,
                                value: organigramaAnterior[0]?.value
                              }
                            : null
                        }
                        isDisabled={true}
                        // se debe llegar a deshabilitar dependiendo la circunstancia en base a los resultados de la T026
                        options={[]} // deben ir seleccionado por defecto el org Actual
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
                          Organigrama Anterior
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
                  zIndex: 2
                }}
              >
                <Controller
                  name="opciones_traslado"
                  control={control_opcion_anterior_a_actual} // posiblemenete se deba modificar el nombre
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <div>
                      <Select
                        value={
                          organigramaActual?.length > 0
                            ? {
                                label: organigramaActual[0]?.label,
                                value: organigramaActual[0]?.value
                              }
                            : null
                        }
                        isDisabled={true}
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
            </Grid>
          </form>
          <Stack
            direction="row"
            justifyContent="flex-end"
            spacing={3}
            // sx={{ mt: '40px' }}
          >
            <TextField
              label="Fecha de traslado"
              variant="outlined"
              value={currentDate}
              InputLabelProps={{ shrink: true }}
              disabled={true}
            />
          </Stack>
        </Grid>
      </Grid>

      {/* data grid traslado masico organigrama anterio a actual */}
      {<GridAnteriorAActual2 />}
      {/*  {gridActualANuevo ? <GridActualANuevo /> : <></> } */}
      {/* data grid traslado masico organigrama anterio a actual */}
    </>
  );
};
