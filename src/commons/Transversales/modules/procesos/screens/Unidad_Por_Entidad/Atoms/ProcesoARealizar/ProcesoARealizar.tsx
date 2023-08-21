/* eslint-disable @typescript-eslint/naming-convention */
//! libraries or frameworks
import { type FC } from 'react';
import { Controller } from 'react-hook-form';
//* Components Material UI
import { Grid, Stack } from '@mui/material';
// * react select
import Select from 'react-select';

import { Title } from '../../../../../../../../components';
import { use_u_x_entidad } from '../../hooks/use_u_x_entidad';
import { containerStyles } from '../../../../../../../gestorDocumental/tca/screens/utils/constants/constants';

export const ProceoARealizar: FC = (): JSX.Element => {
  //* dispatch declaration
  // const dispatch = useAppDispatch();
  // ? redux toolkit - values
  /*  const { trd_current, catalado_series_subseries_unidad_organizacional } =
    useAppSelector((state: any) => state.trd_slice); */

  //! use_trd hook
  const { control_opciones_traslado } = use_u_x_entidad();

  //* neccesary hook useState for the code

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

            <Stack
              direction="row"
              justifyContent="flex-end"
              spacing={2}
              sx={{ mb: '20px', mt: '20px' }}
            >
              {/*  <LoadingButton
                loading={createTRDLoadingButton}
                type="submit"
                color="primary"
                variant="contained"
                startIcon={trd_current != null ? <SyncIcon /> : <SaveIcon />}
              >
                {trd_current != null ? 'ACTUALIZAR TRD' : 'CREAR TRD'}
              </LoadingButton>
*/}
            </Stack>
          </form>
        </Grid>
      </Grid>

      <Stack
        direction="row"
        justifyContent="flex-end"
        spacing={2}
        sx={{ m: '20px 0' }}
      >
        {/*  <Button
          color="warning"
          variant="contained"
          startIcon={<AddCircleIcon />}
          onClick={openModalCreacionFormatoTipo}
        >
          MÓDULO DE CREACION DE FORMATOS
        </Button> */}
      </Stack>
    </>
  );
};
