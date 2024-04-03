/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Grid, TextField, Typography } from '@mui/material';
import { Title } from '../../../../components/Title';
import { Controller } from 'react-hook-form';
import { useAlertaHook } from '../utils/useAlertaHook';
import Select from 'react-select';
import { useContext } from 'react';
import { DataContext } from '../context/contextData';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SeleccionAlerta: React.FC = () => {
  // ? context
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { setSelectValueFromSelect } = useContext(DataContext);

  const {
    control_alertas,
    // errors_alertas
    
    // * selected
    alertas_selected,

    // * info
    alertas,
  } = useAlertaHook();

  return (
    <Grid
      container
      spacing={2}
      m={2}
      p={2}
      sx={{
        position: 'relative',
        background: '#FAFAFA',
        borderRadius: '15px',
        p: '20px',
        m: '10px 0 20px 0',
        mb: '20px',
        boxShadow: '0px 3px 6px #042F4A26',
      }}
    >
      <Grid item xs={12}>
        <Title title="Selección de alerta" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="body2" color="text.secondary">
          <strong>Selecciona una alerta</strong>
        </Typography>
        <Controller
          name="cod_clase_alerta"
          control={control_alertas}
          rules={{ required: true }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div>
              
              <Select
                value={value}
                options={alertas_selected as any}
                placeholder="Seleccione alerta"
                onChange={(selectedoption) => {
                  // //  console.log('')(selectedoption)
                  setSelectValueFromSelect(selectedoption);
                  onChange(selectedoption);
                }}
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
                  Seleccione alerta
                </small>
              </label>
            </div>
          )}
        />
      </Grid>
      <Grid item xs={12} sm={6}></Grid>
      {alertas ? (
        <>
          <Grid item xs={12} sm={6}>
            <Controller
              name="nombre_clase_alerta"
              control={control_alertas}
              rules={{ required: false }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="Nombre de alerta"
                  variant="outlined"
                  fullWidth
                  disabled
                  size="small"
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="descripcion_clase_alerta"
              control={control_alertas}
              rules={{ required: false }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="Descripción de alerta"
                  variant="outlined"
                  fullWidth
                  disabled
                  multiline
                  rows={3}
                  size="small"
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </Grid>
        </>
      ) : null}
    </Grid>
  );
};
