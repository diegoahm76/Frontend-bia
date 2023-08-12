/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState } from 'react';
import { Box, Button, FormControl, Grid, Stack, TextField } from '@mui/material';
import { Add, CloudUpload } from '@mui/icons-material';
import esLocale from 'dayjs/locale/es';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { use_form } from '../../../../../hooks/useForm';
import { useFormFiles } from '../../hooks/useFormFiles';
import { post_recepcion_fisica } from '../requests/requests';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const RegistroRecepcion: React.FC = () => {
  const [date, set_date] = useState<Date | null>(new Date());
  const [fecha_string, set_fecha_string] = useState(dayjs(new Date()).format('YYYY-MM-DD'));
  const { form_state, on_input_change } = use_form({});
  const { form_files, name_files, handle_change_file } = useFormFiles({});

  const handle_change_date = (date: Date | null) => {
    set_date(date);
    set_fecha_string(dayjs(date).format('YYYY-MM-DD'));
  };

  return (
    <>
      <Grid
        container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          mb: '20px',
          mt: '20px',
          p: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item xs={12}>
          <Box
            component="form"
            noValidate
            autoComplete="off"
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <TextField
                  disabled
                  label="Nombre o Razón Social"
                  size="small"
                  fullWidth
                  value={``}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  disabled
                  label="Identificación"
                  size="small"
                  fullWidth
                  value={``}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  disabled
                  label="Expediente Asociado"
                  size="small"
                  fullWidth
                  value={``}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  disabled
                  label="Documento Asociado"
                  size="small"
                  fullWidth
                  value={``}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          mb: '20px',
          mt: '20px',
          p: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item xs={12}>
          <Box
            component="form"
            noValidate
            autoComplete="off"
          >
            <Grid container spacing={2} mb='20px'>
              <Grid item xs={12} sm={3}>
                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={esLocale}>
                    <DatePicker
                      label="Fecha de Radicación en Cormacarena"
                      inputFormat="DD/MM/YYYY"
                      openTo="day"
                      views={[ 'day', 'month', 'year' ]}
                      value={date}
                      onChange={handle_change_date}
                      renderInput={(params) => (
                        <TextField
                          size='small'
                          fullWidth
                          required
                          {...params}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Empresa Entrega"
                  size="small"
                  fullWidth
                  required
                  name='empresa_entrega'
                  onChange={on_input_change}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Funcionario Entrega"
                  size="small"
                  fullWidth
                  required
                  name='funcionario_entrega'
                  onChange={on_input_change}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Button
                  variant="outlined"
                  fullWidth
                  size='medium'
                  component="label"
                  startIcon={<CloudUpload />}
                >
                  {name_files.doc_asociado !== undefined ? name_files.doc_asociado : 'Documento Firmado'}
                    <input
                      hidden
                      type="file"
                      required
                      autoFocus
                      style={{ opacity: 0 }}
                      name='doc_asociado'
                      onChange={handle_change_file}
                    />
                </Button>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Button
                  variant="outlined"
                  fullWidth
                  size='medium'
                  component="label"
                  startIcon={<CloudUpload />}
                >
                  {name_files.doc_guia !== undefined ? name_files.doc_guia : 'Guía Transportador'}
                    <input
                      hidden
                      type="file"
                      required
                      autoFocus
                      style={{ opacity: 0 }}
                      name='doc_guia'
                      onChange={handle_change_file}
                    />
                </Button>
              </Grid>
              <Grid item xs={12} sm={15}>
                <TextField
                  required
                  multiline
                  rows={4}
                  label="Observación"
                  size="small"
                  fullWidth
                  name='observaciones'
                  onChange={on_input_change}
                />
              </Grid>
            </Grid>
            <Stack
              direction="row"
              justifyContent="right"
              spacing={2}
              sx={{ mb: '20px' }}
            >
              <Button
                color='primary'
                variant='contained'
                startIcon={<Add />}
                sx={{ marginTop: '30px' }}
                onClick={() => {
                  try {
                    void post_recepcion_fisica({
                      ...form_state,
                      fecha_prestacion: fecha_string,
                      doc_asocioando: form_files.doc_asociado,
                      id_notificacion: 1,
                      id_despacho_notificacion: 1,
                      numero_guia: "Prueba"
                    })
                  } catch (error: any) {
                    throw new Error(error);
                  }
                }}
              >
                Crear Registro Entrada
              </Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}
