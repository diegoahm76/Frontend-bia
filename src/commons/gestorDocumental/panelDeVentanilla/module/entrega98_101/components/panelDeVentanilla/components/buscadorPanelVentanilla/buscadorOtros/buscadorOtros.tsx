/* eslint-disable @typescript-eslint/naming-convention */
import { useEffect, useState } from 'react';
import { Grid, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { getRequestStatesOtros } from '../services/getRequestStatesOtros.service';

export const BuscadorOtros = (props: any): JSX.Element => {
  const { control_busqueda_panel_ventanilla } = props;

  // ? useState Necesario
  const [requestStatuses, setRequestStatuses] = useState<any[]>([]);

  //* se debe establecer un useEffect ya que cada vez que se recargeue el elemento se deben filtrar de diferente manera los elementos
 useEffect(() => {
    void getRequestStatesOtros().then((res: any) => {
      //  console.log('')(res);
      setRequestStatuses(res);
    });
  }, []);

  // ?

  return (
    <>
      {/*el select de tipo de solicitud va a ir en el panel principal de busqueda para que se puede manejar la dualidad al momento de seleccionar*/}
      <Grid item xs={12} sm={4}>
        <Controller
          name="radicado"
          control={control_busqueda_panel_ventanilla}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextField
              fullWidth
              label="Radicado"
              size="small"
              variant="outlined"
              value={value}
              InputLabelProps={{ shrink: true }}
              onChange={(e) => {
                onChange(e.target.value);
              }}
              inputProps={{ maxLength: 50 }}
            />
          )}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={4}
        sx={{
          zIndex: 2,
        }}
      >
        <Controller
          //* estos names de los controllers deben ser modificiado para que sirvan a la busqueda del panel de ventanilla
          name="estado_actual_solicitud"
          control={control_busqueda_panel_ventanilla}
          render={({ field: { onChange, value }}) => (
            <div>
              <Select
                value={value}
                onChange={(selectedOption) => {
                  //  console.log('')(selectedOption);
                  onChange(selectedOption);
                }}
                options={requestStatuses as any[]}
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
                  Estado actual
                </small>
              </label>
            </div>
          )}
        />
      </Grid>
    </>
  );
};
