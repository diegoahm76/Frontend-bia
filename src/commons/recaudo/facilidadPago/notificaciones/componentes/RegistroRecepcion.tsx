/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState } from 'react';
import { Box, Button, FormControl, Grid, Stack, TextField } from '@mui/material';
import { EditorTexto } from '../../componentes/EditorTexto/EditorTexto';
import { Add } from '@mui/icons-material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import esLocale from 'dayjs/locale/es';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { use_form } from '../../../../../hooks/useForm';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const RegistroRecepcion: React.FC = () => {
  const [file_name, set_file_name] = useState('');
  const [date, set_date] = useState<Date | null>(new Date());
  const [fecha_string, set_fecha_string] = useState(dayjs(new Date()).format('YYYY-MM-DD'));
  const { form_state, on_input_change } = use_form({});

  const handle_date_change = (date: Date | null) => {
    set_date(date);
    set_fecha_string(dayjs(date).format('YYYY-MM-DD'));
  };

  const handle_file_selected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected_file =
      event.target.files != null ? event.target.files[0] : null;
    if (selected_file != null) {
      set_file_name(selected_file.name);
    }
    console.log('archivo', selected_file)
  };

  console.log('fecha', fecha_string)
  console.log('texto', form_state)

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
                  <LocalizationProvider dateAdapter={AdapterDayjs} locale={esLocale}>
                    <DatePicker
                      label="Fecha de Radicación en Cormacarena"
                      inputFormat="YYYY/MM/DD"
                      openTo="day"
                      views={[ 'day', 'month', 'year' ]}
                      value={date}
                      onChange={handle_date_change}
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
                  name='empresa'
                  onChange={on_input_change}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Funcionario Entrega"
                  size="small"
                  fullWidth
                  required
                  name='funcionario'
                  onChange={on_input_change}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Button
                  variant="outlined"
                  fullWidth
                  size='medium'
                  component="label"
                  startIcon={<CloudUploadIcon />}
                >
                  {file_name !== '' ? file_name : 'Documento Firmado'}
                    <input
                      hidden
                      type="file"
                      required
                      autoFocus
                      style={{ opacity: 0 }}
                      name='doc_firmado'
                      onChange={handle_file_selected}
                    />
                </Button>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Button
                  variant="outlined"
                  fullWidth
                  size='medium'
                  component="label"
                  startIcon={<CloudUploadIcon />}
                >
                  {file_name !== '' ? file_name : 'Guía Transportador'}
                    <input
                      hidden
                      type="file"
                      required
                      autoFocus
                      style={{ opacity: 0 }}
                      name='guia'
                      onChange={handle_file_selected}
                    />
                </Button>
              </Grid>
            </Grid>
            <EditorTexto />
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
