/* eslint-disable @typescript-eslint/naming-convention */
import { Grid, TextField } from '@mui/material';
import { Title } from '../../../../../components/Title';

import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';

import { BusquedaExpedientes } from '../components/BusquedaExpedientes';
import { LoadingButton } from '@mui/lab';
import { ButtonSalir } from '../../../../../components/Salir/ButtonSalir';
import { useCierreExpedientes } from '../hook/useCierreExpedientes';
import { Controller } from 'react-hook-form';
import { ArchivosSoporte } from '../components/ArchivosSoporte';
import { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CierreExpedientesScreen: React.FC = () => {
  const [open_dialog, set_open_dialog] = useState<boolean>(false);

  const { control_cierre_exp, formattedDate } = useCierreExpedientes();

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
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
            <Title title="Cierre de expedientes documentales" />
          </Grid>
        </Grid>
        <BusquedaExpedientes />
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
            <Title title="Observaciones del cierre" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="observaciones"
              control={control_cierre_exp}
              rules={{ required: false }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Observaciones"
                  // placeholder="Año radicado"
                  size="small"
                  margin="dense"
                  disabled={false}
                  fullWidth
                  required={false}
                  multiline={true}
                  value={value}
                  onChange={onChange}
                  helperText={'Ingresa una observación'}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Fecha de Actual"
              size="small"
              margin="dense"
              disabled={true}
              fullWidth
              required={false}
              value={formattedDate}
            />
          </Grid>
        </Grid>
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
            <Title title="Archivos de soporte" />
          </Grid>
          <Grid container item spacing={2} justifyContent="flex-end">
            <Grid item>
              <LoadingButton
                variant="outlined"
                color="primary"
                loading={false}
                disabled={false}
                startIcon={<AddIcon />}
                onClick={() => {
                  set_open_dialog(true);
                }}
              >
                Agregar
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>
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
          <Grid container spacing={2} justifyContent="flex-end">
            <Grid item>
              <LoadingButton
                variant="outlined"
                color="primary"
                loading={false}
                disabled={true}
                startIcon={<CleaningServicesIcon />}
                onClick={() => {}}
              >
                Limpiar
              </LoadingButton>
            </Grid>
            <Grid item>
              <LoadingButton
                variant="contained"
                color="success"
                type="submit"
                // loading={is_saving}
                // disabled={is_saving}
                startIcon={<SaveIcon />}
              >
                Guardar
              </LoadingButton>{' '}
            </Grid>{' '}
            <Grid item>
              <ButtonSalir />
            </Grid>
          </Grid>
        </Grid>
        <ArchivosSoporte
          open_dialog={open_dialog}
          set_open_dialog={set_open_dialog}
        />
      </form>
    </>
  );
};
