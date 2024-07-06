/* eslint-disable @typescript-eslint/naming-convention */

import { Grid, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import {
  getOficinasByIdUnidad,
  getUnidadesOrgActual,
} from '../../../../services/getUnidadesOrgActual.service';
import { getSeriesByIdUnidad } from '../../../../services/getSeriesByIdUnidad.service';

export const BusquedaReporteTipoCuatro = ({
  controlBusquedaGeneradoraReporte,
  resetBusquedaGeneradoraReporte,
}: any): JSX.Element => {
  const [unidades, setUnidades] = useState<any>({
    unidades: [],
    series: [],
    grupos: [],
  });

  useEffect(() => {
    getUnidadesOrgActual()
      .then((data) => {
        setUnidades({
          ...unidades,
          unidades: data,
        });
      })
      .catch((error) => {
        console.error('Failed to get unidades:', error);
      });
  }, []);

  const [selectedValue, setSelectedValue] = useState('');

  return (
    <>
      <Grid
        item
        xs={12}
        sm={4}
        sx={{
          zIndex: 20,
        }}
      >
        {/* ddddr */}
        {/* <h1>{selectedValue}</h1> */}
        <Controller
          //* estos names de los controllers deben ser modificiado para que sirvan a la busqueda del panel de ventanilla
          name="seccion_subseccion"
          control={controlBusquedaGeneradoraReporte}
          // rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <div>
              <Select
                required
                value={value}
                onChange={(selectedOption) => {
                  // console.log('')(selectedOption);
                  onChange(selectedOption);
                  setSelectedValue(selectedOption.value);
                  Promise.all([
                    getSeriesByIdUnidad(selectedOption.value),
                    getOficinasByIdUnidad(selectedOption.value),
                  ])
                    .then(([seriesData, gruposData]) => {
                      setUnidades((prevUnidades: any) => ({
                        ...prevUnidades,
                        series: seriesData,
                        grupos: gruposData,
                      }));
                    })
                    .catch((error) => {
                      console.error('Error fetching data:', error);
                      // Handle the error appropriately here
                    });

                  resetBusquedaGeneradoraReporte((prevData: any) => ({
                    ...prevData,
                    // fecha_inicio: '',
                    // fecha_fin: '',
                    seccion_subseccion: selectedOption,
                    serie_subserie: '',
                    grupo: '',
                  }));
                  // resetBusquedaGeneradoraReporte({
                  //   // fecha_inicio: '',
                  //   // fecha_fin: '',
                  //   seccion_subseccion: selectedOption,
                  //   // serie_subserie: '',
                  //   // grupo: '',
                  // });
                }}
                options={unidades?.unidades ?? []}
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
                  Sección / Subsección
                </small>
              </label>
            </div>
          )}
        />
      </Grid>

      {!controlBusquedaGeneradoraReporte?._formValues?.seccion_subseccion
        ?.value || !unidades?.series ? (
        <></>
      ) : (
        <>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{
              zIndex: 20,
            }}
          >
            <Controller
              //* estos names de los controllers deben ser modificiado para que sirvan a la busqueda del panel de ventanilla
              name="serie_subserie"
              control={controlBusquedaGeneradoraReporte}
              //rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <div>
                  <Select
                    // required
                    value={value}
                    onChange={(selectedOption) => {
                      //  console.log('')(selectedOption);
                      onChange(selectedOption);
                    }}
                    options={unidades?.series ?? []}
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
                      Serie / Subserie
                    </small>
                  </label>
                </div>
              )}
            />
          </Grid>
          {!unidades?.grupos ? (
            <></>
          ) : (
            <Grid
              item
              xs={12}
              sm={4}
              sx={{
                zIndex: 20,
              }}
            >
              <Controller
                //* estos names de los controllers deben ser modificiado para que sirvan a la busqueda del panel de ventanilla
                name="grupo"
                control={controlBusquedaGeneradoraReporte}
                // rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <div>
                    <Select
                      // required
                      value={value}
                      onChange={(selectedOption) => {
                        //  console.log('')(selectedOption);
                        onChange(selectedOption);
                      }}
                      options={unidades?.grupos ?? []}
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
                        Grupo
                      </small>
                    </label>
                  </div>
                )}
              />
            </Grid>
          )}
        </>
      )}
    </>
  );
};
