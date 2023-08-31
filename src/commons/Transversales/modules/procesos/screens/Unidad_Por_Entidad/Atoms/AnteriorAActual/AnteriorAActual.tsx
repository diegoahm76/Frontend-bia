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
  get_organigrama_acual,
  get_organigrama_anterior
} from '../../toolkit/UxE_thunks/UxE_thunks';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../../../../../../../../utils/Loader/Loader';

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
    void get_organigrama_anterior(navigate).then((res) => {
      setOrganigramaAnterior(
        res?.map((item: any) => ({
          label: item?.nombre,
          value: item?.id_organigrama
        }))
      );
    });

    const obtenerOrganigramas = async (): Promise<any> => {
      const organigramasActuales = await get_organigrama_acual(navigate);
      console.log('res', organigramasActuales);
      setOrganigramaActual(
        organigramasActuales?.map((item: any) => ({
          label: item?.nombre,
          value: item?.id_organigrama
        }))
      );

      /*  const organigramasDisponibles = await getOrganigramasDispobibles();
      setOrganigramasDisponibles(filtrarOrganigramas(organigramasDisponibles)); */
    };

    void obtenerOrganigramas();
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
    </>
  );
};
