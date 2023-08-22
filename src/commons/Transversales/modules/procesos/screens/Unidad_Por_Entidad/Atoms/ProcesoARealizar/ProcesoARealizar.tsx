/* eslint-disable @typescript-eslint/naming-convention */
//! libraries or frameworks
import { useEffect, type FC, useContext } from 'react';
import { Controller } from 'react-hook-form';
//* Components Material UI
import { Grid } from '@mui/material';
// * react select
import Select from 'react-select';

import { Title } from '../../../../../../../../components';
import { use_u_x_entidad } from '../../hooks/use_u_x_entidad';
import { containerStyles } from '../../../../../../../gestorDocumental/tca/screens/utils/constants/constants';
import { consultarTablaTemporal } from '../../toolkit/UxE_thunks/UxE_thunks';
import { ContextUnidadxEntidad } from '../../context/ContextUnidadxEntidad';
import { setControlModeTrasladoUnidadXEntidad } from '../../toolkit/UxE_slice/UxE_slice';
// import CleanIcon from '@mui/icons-material/CleaningServices';

export const ProcesoARealizar: FC = (): JSX.Element => {
  //* dispatch declaration
  // const dispatch = useAppDispatch();
  // ? redux toolkit - values

  //! use_u_x_entidad hook
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { control_opciones_traslado, reset_opciones_traslado } =
    use_u_x_entidad();

  //* context necesario
  const { setloadingConsultaT026 } = useContext(ContextUnidadxEntidad);

  useEffect(() => {
    console.log('use_u_x_entidad');
    void consultarTablaTemporal(setloadingConsultaT026).then((res: any) => {
      console.log(res);

      dispatch(setControlModeTrasladoUnidadXEntidad('mode_doble'))



      //* en esta operacion consulto la tabla temporal para saber si hay datos en ella y dispongo las opereaciones que se deben hacer para la aplicacion

      // ? 1. si la tabla temporal no trae datos, la interacción no pasa de acá, debe dejarse al usuario elegir la opción que desea realizar
      // ? 2. si la tabla temporal trae datos, hay dos posibles escenarios:
      // ! 2.1. si la tabla temporal trae datos (T026), y al menos unas de las unidades organizaciones de la tabla coinciden con el organigrama actual se debe seleccionar la opción de "traslado de unidad organizacional de organigrama actual a nuevo"
      // * 2.2. si la tabla temporal trae datos (T026), y al menos unas de las unidades organizaciones de la tabla coinciden con el organigrama anterior se debe seleccionar la opción de "traslado de unidad organizacional de organigrama anterior a actual"

      /* reset_opciones_traslado({
        opciones_traslado: {
          value: 'Traslado',
          label: 'trasladeichon'
        }
      }); */
    });
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
                    fieldState: { error }
                  }) => (
                    <div>
                      <Select
                        value={value}
                        onChange={(selectedOption) => {
                          /*  dispatch(
                            getServiceSeriesSubseriesXUnidadOrganizacional(
                              selectedOption.item
                            )
                          ); */
                          onChange(selectedOption);
                        }}
                        // isDisabled={trd_current != null}
                        options={[
                          {
                            value: 'Organigrama_actual_a_nuevo',
                            label:
                              'Traslado de unidad organizanizacionales de organigrama actual a nuevo'
                          },
                          {
                            value: 'Organigrama_anterior_a_actual',
                            label:
                              'Traslado de unidad organizanizacionales de organigrama anterior a actual'
                          }
                        ]}
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
        {/* <Stack
          direction="row"
          justifyContent="flex-start"
          spacing={2}
          sx={{ m: '20px 0' }}
        >
          <Button
            color="primary"
            variant="outlined"
            startIcon={<CleanIcon />}
            onClick={() => {
              // eslint-disable-next-line no-console
              console.log('cleaning fields');
            }}
          >
            LIMPIAR CAMPOS
          </Button>
        </Stack> */}
      </Grid>
    </>
  );
};
