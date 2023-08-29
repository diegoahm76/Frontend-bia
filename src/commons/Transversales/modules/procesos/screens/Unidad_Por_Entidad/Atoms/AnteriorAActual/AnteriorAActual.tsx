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
// import CleanIcon from '@mui/icons-material/CleaningServices';

export const AnteriorAActual: FC = (): JSX.Element => {
  //* dispatch declaration
  // ? redux toolkit - values

  //! use_u_x_entidad hooks

  const { control_opcion_anterior_a_actual } = use_u_x_entidad();

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

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const onSubmit = () => {
    console.log('hello from submit');
  };


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
                        value={value}
                        onChange={(selectedOption) => {
                          //* dentro de esta seleccion, tambien debe existir una selección de modo
                          /*  dispatch(
                            getServiceSeriesSubseriesXUnidadOrganizacional(
                              selectedOption.item
                            )
                          ); */
                          onChange(selectedOption);
                        }}
                        /* isDisabled={
                        } */
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
                        value={value}
                        onChange={(selectedOption) => {
                          //* dentro de esta seleccion, tambien debe existir una selección de modo
                          /*  dispatch(
                            getServiceSeriesSubseriesXUnidadOrganizacional(
                              selectedOption.item
                            )
                          ); */
                          onChange(selectedOption);
                        }}
                        /* isDisabled={
                        } */
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
              label="Fecha actual"
              variant="outlined"
              value={currentDate}
              InputLabelProps={{ shrink: true }}
              disabled={true}
            />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};
