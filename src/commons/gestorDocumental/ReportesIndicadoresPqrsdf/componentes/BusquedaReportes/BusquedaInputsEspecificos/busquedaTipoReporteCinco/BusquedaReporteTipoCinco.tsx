/* eslint-disable @typescript-eslint/naming-convention */

import { Grid, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import {
  getOficinasByIdUnidad,
  getUnidadesOrgActual,
} from '../../../../../ReportesGeneralesGestorDocumental/services/getUnidadesOrgActual.service';

export const BusquedaReporteTipoCinco = ({
  controlBusquedaGeneradoraReporte,
  resetBusquedaGeneradoraReporte,
}: any): JSX.Element => {
  const [unidades, setUnidades] = useState<any>({
    unidades: [],
    //series: [],
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

  return (
    <>
      <Grid item xs={12} sm={4}>
        <Controller
          name="estado_pqrsdf"
          control={controlBusquedaGeneradoraReporte}
          render={() => (
            <TextField
              required
              disabled
              fullWidth
              label="Estado de la PQRSDF"
              type="text"
              size="small"
              variant="outlined"
              value={'TODOS'}
              InputLabelProps={{ shrink: true }}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Controller
          name="sede"
          control={controlBusquedaGeneradoraReporte}
          render={() => (
            <TextField
              required
              disabled
              fullWidth
              label="Sede de la PQRSDF"
              type="text"
              size="small"
              variant="outlined"
              value={'TODOS'}
              InputLabelProps={{ shrink: true }}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Controller
          name="tipo_pqrsdf"
          control={controlBusquedaGeneradoraReporte}
          defaultValue=""
          render={() => (
            <TextField
              required
              disabled
              fullWidth
              label="Tipo PQRSDF"
              type="text"
              size="small"
              variant="outlined"
              value={'TODOS'}
              InputLabelProps={{ shrink: true }}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Controller
          name="seccion_subseccion"
          control={controlBusquedaGeneradoraReporte}
          defaultValue=""
          render={() => (
            <TextField
              required
              disabled
              fullWidth
              label="Sección / Subsección"
              type="text"
              size="small"
              variant="outlined"
              value={'TODAS'}
              InputLabelProps={{ shrink: true }}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Controller
          name="grupos"
          control={controlBusquedaGeneradoraReporte}
          defaultValue=""
          render={() => (
            <TextField
              required
              disabled
              fullWidth
              label="Grupo de la corporación"
              type="text"
              size="small"
              variant="outlined"
              value={'TODOS'}
              InputLabelProps={{ shrink: true }}
            />
          )}
        />
        </Grid>
    {/*  <Grid
        item
        xs={12}
        sm={4}
        sx={{
          zIndex: 20,
        }}
      >
        <Controller
          //* estos names de los controllers deben ser modificiado para que sirvan a la busqueda del panel de ventanilla
          name="seccion_subseccion"
          control={controlBusquedaGeneradoraReporte}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <div>
              <Select
                required
                value={value}
                onChange={(selectedOption) => {
                  onChange(selectedOption);
                  Promise.all([getOficinasByIdUnidad(selectedOption.value)])
                    .then(([gruposData]) => {
                      setUnidades((prevUnidades: any) => ({
                        ...prevUnidades,
                        grupos: gruposData,
                      }));
                    })
                    .catch((error) => {
                      console.error('Error fetching data:', error);
                    });

                  resetBusquedaGeneradoraReporte({
                    fecha_inicio: '',
                    fecha_fin: '',
                    seccion_subseccion: selectedOption,
                    grupos: '',
                  });
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
      </Grid>*/}
     {/* {!controlBusquedaGeneradoraReporte?._formValues?.seccion_subseccion
        ?.value || !unidades?.grupos ? (
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
            name="grupos"
            control={controlBusquedaGeneradoraReporte}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <div>
                <Select
                  required
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
                    Grupo de la corporación
                  </small>
                </label>
              </div>
            )}
          />
        </Grid>
      )}*/}
    </>
  );
};
