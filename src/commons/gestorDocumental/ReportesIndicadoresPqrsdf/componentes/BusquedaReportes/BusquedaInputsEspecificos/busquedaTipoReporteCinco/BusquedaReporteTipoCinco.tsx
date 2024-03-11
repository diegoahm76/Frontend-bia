/* eslint-disable @typescript-eslint/naming-convention */

import { Grid, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import Select from 'react-select';

export const BusquedaReporteTipoCinco = ({
  controlBusquedaGeneradoraReporte,
}: any): JSX.Element => {
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
                  Grupo de la corporación
                </small>
              </label>
            </div>
          )}
        />
      </Grid>
  </>
  );
};
