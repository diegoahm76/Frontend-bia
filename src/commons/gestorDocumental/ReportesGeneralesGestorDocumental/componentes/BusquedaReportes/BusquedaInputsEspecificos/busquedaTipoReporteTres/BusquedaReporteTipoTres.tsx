/* eslint-disable @typescript-eslint/naming-convention */

import { Grid, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { getUnidadesOrgActual } from '../../../../services/getUnidadesOrgActual.service';

export const BusquedaReporteTipoTres = ({
  controlBusquedaGeneradoraReporte,
}: any): JSX.Element => {

  const [unidades, setUnidades] = useState<any[]>([])

  useEffect(() => {
    getUnidadesOrgActual()
      .then((data) => {
        setUnidades(data);
      })
      .catch((error) => {
        console.error("Failed to get unidades:", error);
      });
  }, []);

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
                  //  console.log('')(selectedOption);
                  onChange(selectedOption);
                }}
                options={unidades ?? []}
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
      {/*      <Grid
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
                //required
                value={value}
                onChange={(selectedOption) => {
                  //  console.log('')(selectedOption);
                  onChange(selectedOption);
                }}
                options={[] ?? []}
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
      </Grid>*/}
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
              label="Grupos"
              type="text"
              size="small"
              variant="outlined"
              value={'TODOS'}
              InputLabelProps={{ shrink: true }}
            />
          )}
        />
      </Grid>
    </>
  );
};
