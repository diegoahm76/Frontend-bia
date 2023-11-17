/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Grid, Stack, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { LoadingButton } from '@mui/lab';
import SearchIcon from '@mui/icons-material/Search';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { Title } from '../../../../../../../../../../components';
import { usePanelVentanilla } from '../../../../../../../hook/usePanelVentanilla';

export const BuscadorTramitesYservicios = (props: any): JSX.Element => {
  const { control_busqueda_panel_ventanilla } = props;

  // ? useState Necesario
  // const [requestStatuses, setRequestStatuses] = useState<any[]>([]);

  //* se debe establecer un useEffect ya que cada vez que se recargeue el elemento se deben filtrar de diferente manera los elementos
  /* useEffect(() => {
    void getRequestStates().then((res: any) => {
      console.log(res);
      setRequestStatuses(res);
    });
  }, []);*/

  // ?

  return (
    <>
      <Grid item xs={12} sm={4}>
        <Controller
          name="nombre_titular"
          control={control_busqueda_panel_ventanilla}
          defaultValue=""
          rules={{ required: true }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              required
              fullWidth
              label="Nombre titular"
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
          rules={{ required: true }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              required
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

      <Grid item xs={12} sm={4}>
        <Controller
          name="asunto_proyecto"
          control={control_busqueda_panel_ventanilla}
          defaultValue=""
          rules={{ required: true }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              required
              fullWidth
              label="Asunto / Proyecto"
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
          name="pago_tramite"
          control={control_busqueda_panel_ventanilla}
          rules={{ required: true }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div>
              <Select
                value={value}
                onChange={(selectedOption) => {
                  console.log(selectedOption);
                  onChange(selectedOption);
                }}
                options={[] as any[]}
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
                  Pago
                </small>
              </label>
            </div>
          )}
        />
      </Grid>

      <Grid item xs={12} sm={4}>
        <Controller
          name="expediente"
          control={control_busqueda_panel_ventanilla}
          defaultValue=""
          rules={{ required: true }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              required
              fullWidth
              label="Expediente"
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
    </>
  );
};
