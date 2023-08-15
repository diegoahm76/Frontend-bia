/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/naming-convention */
import { Grid } from '@mui/material';
import { type FC } from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { useUnidadAUnidad } from '../../../../hook/useUnidadAUnidad';
import { useAppSelector } from '../../../../../../../../../../hooks';
import { Title } from '../../../../../../../../../../components';
import { containerStyles } from '../../../../../../../../../gestorDocumental/tca/screens/utils/constants/constants';
import { getListPersonasUnidades } from '../../../../toolkit/thunks/thunks_uni_a_uni';
export const Traslado: FC<any> = (): JSX.Element => {
  //* states
  const { unidades_org_anterior, unidades_org_actual } = useAppSelector(
    (state: any) => state.uni_a_uni_slice
  );

  //* hooks
  const { control_traslado_unidad_a_unidad } = useUnidadAUnidad();

  return (
    <>
      <Grid container sx={containerStyles}>
        <Grid item xs={12}>
          <Title title="Proceso traslado de unidad a unidad" />
          <form
            onSubmit={(w) => {
              w.preventDefault();
              console.log('submit');
              // onSubmit();
            }}
            style={{
              marginTop: '20px'
            }}
          >
            <Grid
              item
              xs={12}
              sm={4.5}
              sx={{
                zIndex: 99999
              }}
            >
              <Controller
                name="id_antigua_unidad_organizacional"
                rules={{ required: true }}
                control={control_traslado_unidad_a_unidad}
                render={({ field: { onChange, value, name } }) => (
                  <div>
                    <Select
                      // isDisabled={ccd_current != null || ccd_current?.actual}
                      value={value}
                      onChange={(selectedOption) => {
                        void getListPersonasUnidades(
                          selectedOption.value,
                        );
                        onChange(selectedOption);
                      }}
                      options={unidades_org_anterior}
                      placeholder="Seleccionar unidad organizacional"
                    />
                    <label htmlFor={name}>
                      <small
                        style={{
                          color: 'rgba(0, 0, 0, 0.6)',
                          fontWeight: 'thin',
                          fontSize: '0.75rem'
                        }}
                      >
                        Unidad organizacional origen
                        {/*
                          {ccd_current
                            ? `
                              Organigrama Seleccionado
                            `
                            : `Seleccionar Organigrama`} */}
                      </small>
                    </label>
                  </div>
                )}
              />
            </Grid>

            {/* definir parte 2, debe estar controlada por un boolean para mostrar o no - para carga del grid que muestras las personas que pertenecen a la unidad seleccioanda y las unidades del organigrama actual */}

            <Grid
              item
              xs={12}
              sm={4.5}
              sx={{
                zIndex: 99999
              }}
            >
              <Controller
                name="id_nueva_unidad_organizacional"
                rules={{ required: true }}
                control={control_traslado_unidad_a_unidad}
                render={({ field: { onChange, value, name } }) => (
                  <div>
                    <Select
                      // isDisabled={ccd_current != null || ccd_current?.actual}
                      value={value}
                      onChange={(selectedOption) => {
                        console.log(selectedOption);
                        onChange(selectedOption);
                      }}
                      options={unidades_org_actual}
                      placeholder="Seleccionar unidad organizacional destino"
                    />
                    <label htmlFor={name}>
                      <small
                        style={{
                          color: 'rgba(0, 0, 0, 0.6)',
                          fontWeight: 'thin',
                          fontSize: '0.75rem'
                        }}
                      >
                        Unidad organizacional destino
                        {/*
                          {ccd_current
                            ? `
                              Organigrama Seleccionado
                            `
                            : `Seleccionar Organigrama`} */}
                      </small>
                    </label>
                  </div>
                )}
              />

              {/* definir parte 2, debe estar controlada por un moda - para carga del grid que muestras las personas que pertenecen a la unidad seleccioanda y las unidades del organigrama actual */}

              {/* {errors_create_ccd.organigrama != null && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Este campo es obligatorio
                    </small>
                  </div>
                )} */}
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  );
};
