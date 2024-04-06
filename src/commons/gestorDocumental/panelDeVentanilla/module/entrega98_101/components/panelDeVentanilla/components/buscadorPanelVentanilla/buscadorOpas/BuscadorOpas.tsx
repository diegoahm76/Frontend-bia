/* eslint-disable @typescript-eslint/naming-convention */
import { Grid, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { getRequestStatesOpas } from '../services/getRequestStatesOpas.service';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const BuscadorOpas = (props: any): JSX.Element => {
  const { control_busqueda_panel_ventanilla } = props;

  // ? useState Necesario
  const [requestStatuses, setRequestStatuses] = useState<any[]>([]);

  //* se debe establecer un useEffect ya que cada vez que se recargeue el elemento se deben filtrar de diferente manera los elementos
  useEffect(() => {
    void getRequestStatesOpas().then((res: any) => {
      //  console.log('')(res);
      setRequestStatuses(res);
    });
  }, []);

  // ?

  return (
    <>
      {/*el select de tipo de solicitud, fecha de inicio y fin va a ir en el panel principal de busqueda para que se puede manejar la dualidad al momento de seleccionar*/}
      <Grid item xs={12} sm={4}>
        <Controller
          name="nombre_titular"
          control={control_busqueda_panel_ventanilla}
          defaultValue=""
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              fullWidth
              label="Nombre titular OPA"
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
      <Grid item xs={12} sm={4}>
        <Controller
          name="radicado"
          control={control_busqueda_panel_ventanilla}
          defaultValue=""
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              fullWidth
              label="Radicado OPA"
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
      <Grid item xs={12} sm={4}>
        <Controller
          name="nombre_proyecto"
          control={control_busqueda_panel_ventanilla}
          defaultValue=""
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              fullWidth
              label="Nombre OPA"
              size="small"
              variant="outlined"
              value={value}
              InputLabelProps={{ shrink: true }}
              onChange={(e) => {
                onChange(e.target.value);
              }}
              inputProps={{ maxLength: 150 }}
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
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div>
              <Select
                value={value}
                onChange={(selectedOption) => {
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
                  Estado actual de la OPA
                </small>
              </label>
            </div>
          )}
        />
      </Grid>
    </>
  );
};
