/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormControl, Grid, InputLabel, MenuItem, Select, type SelectChangeEvent, TextField, Box } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { type Dayjs } from "dayjs";
import { useState } from "react";
import { Title } from "../../../../components";
import SearchIcon from '@mui/icons-material/Search';

const tipos_entrada = [{ value: "O", label: "óptimo" }, { value: "D", label: "Defectuoso" }, { value: "A", label: "Averiado" }];

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EntradaBienesAlmacenScreen: React.FC = () => {
  const [numero_entrada, set_numero_entrada] = useState<string>("");
  const [fecha_entrada, set_fecha_entrada] = useState<Dayjs | null>(dayjs());
  const [tipo_entrada, set_tipo_entrada] = useState<string>("");
  const [mensaje_error_tipo, set_mensaje_error_tipo] = useState<string>("");
  const [observaciones, set_observaciones] = useState<string | null>("");
  const [motivo, set_motivo] = useState<string | null>("");
  const [tipo_documento, set_tipo_documento] = useState<string>("");
  const [numero_documento, set_numero_documento] = useState<string>("");
  const [mensaje_error_documento, set_mensaje_error_documento] = useState<string>("");
  const [nombre_proveedor, set_nombre_proveedor] = useState<string>("");

  const cambio_tipo_entrada: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
    set_tipo_entrada(e.target.value);
    if (e.target.value !== null && e.target.value !== "")
      set_mensaje_error_tipo("");
  }

  const cambio_fecha_entrada = (date: Dayjs | null): void => {
    set_fecha_entrada(date);
  };

  const cambio_motivo: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_motivo(e.target.value);
  };

  const cambio_observacion: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_observaciones(e.target.value);
  };

  const cambio_tipo_documento: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
    set_tipo_documento(e.target.value);
    if (e.target.value !== null && e.target.value !== "")
      set_mensaje_error_documento("");
  }
  return (
    <>
      <h1>Entrada de bienes de Almacen</h1>
      <Grid
        container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item md={12} xs={12}>
          <Title title="Entrada" />
          <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
            <Grid item container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Numero de entrada"
                  type={'number'}
                  size="small"
                  fullWidth
                  value={numero_entrada}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl required size='small' fullWidth>
                  <InputLabel>Tipo de entrada</InputLabel>
                  <Select
                    value={tipo_entrada}
                    label="Tipo de entrada"
                    onChange={cambio_tipo_entrada}
                    error={mensaje_error_tipo !== ""}
                  >
                    {tipos_entrada.map(({ value, label }) => (
                      <MenuItem key={value} value={value}>
                        {label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Fecha mantenimiento"
                    value={fecha_entrada}
                    onChange={(newValue) => { cambio_fecha_entrada(newValue); }}
                    renderInput={(params) => (
                      <TextField
                        required
                        fullWidth
                        size="small"
                        {...params}
                      />
                    )}
                    maxDate={dayjs()}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </Box>
          <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
            <Grid item container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  multiline
                  rows={3}
                  value={motivo}
                  label="Motivo"
                  helperText="Ingresar motivo"
                  size="small"
                  fullWidth
                  onChange={cambio_motivo} />
              </Grid>
            </Grid>
          </Box>
          <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
            <Grid item container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  multiline
                  rows={3}
                  value={observaciones}
                  label="Observaciones"
                  helperText="Ingresar observaciones"
                  size="small"
                  fullWidth
                  onChange={cambio_observacion} />
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
          p: '20px',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item md={12} xs={12}>
          <Title title="Proveedor" />
          <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
            <Grid item container spacing={2}>
              <Grid item xs={12} sm={3}>
                <FormControl required size='small' fullWidth>
                  <InputLabel>Tipo de documento</InputLabel>
                  <Select
                    value={tipo_documento}
                    label="Tipo de documento"
                    onChange={cambio_tipo_documento}
                    error={mensaje_error_documento !== ""}
                  >
                    {tipos_entrada.map(({ value, label }) => (
                      <MenuItem key={value} value={value}>
                        {label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Numero documento"
                  type={'text'}
                  size="small"
                  fullWidth
                  value={numero_documento}
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  label="Nombre proveedor"
                  type={'text'}
                  size="small"
                  fullWidth
                  value={nombre_proveedor}
                />
              </Grid>
              <Grid item xs={12} sm={1} sx={{ mt: '10px' }}>
                <SearchIcon style={{ cursor: 'pointer' }} onClick={() => { }} />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
