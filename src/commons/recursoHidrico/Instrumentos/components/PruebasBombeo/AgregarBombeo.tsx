/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import {
  Box,
  Button,
  Divider,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import {
  LocalizationProvider,
  DatePicker,
  TimePicker,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { v4 as uuidv4 } from 'uuid';
import { Title } from '../../../../../components/Title';
import { type GridColDef, DataGrid } from '@mui/x-data-grid';
import { use_register_bombeo_hook } from './hook/useRegisterBombeoHook';
import { prueba_de_bombeo, tipo_caudal } from './utils/choices/choices';
import { colums_bombeo } from './utils/colums/colums';
import { useRegisterInstrumentoHook } from '../RegistroInstrumentos/hook/useRegisterInstrumentoHook';
import { useAppSelector } from '../../../../../hooks';
import { useEffect } from 'react';
import { Controller } from 'react-hook-form';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AgregarBombeo: React.FC = () => {
  const columns_prueba: GridColDef[] = [
    ...colums_bombeo,
    {
      field: 'ACCIONES',
      headerName: 'ACCIONES',
      width: 120,
      renderCell: (params) => (
        <>
          {/* <IconButton
              onClick={() => {
                set_id_seccion(params.row.id_seccion);
                set_info_seccion(params.row);
              }}
            >
              <Avatar
                sx={{
                  width: 24,
                  height: 24,
                  background: '#fff',
                  border: '2px solid',
                }}
                variant="rounded"
              >
                <ChecklistIcon
                  titleAccess="Seleccionar Sección"
                  sx={{
                    color: 'primary.main',
                    width: '18px',
                    height: '18px',
                  }}
                />
              </Avatar>
            </IconButton> */}
        </>
      ),
    },
  ];

  const {
    pruebaBombeo,
    caudal,
    fecha_prubea_bombeo,
    fechaPruebaBombeo,
    row_prueba,
    tiempoTranscurrido,
    nivelAgua,
    abatimientoRecuperacion,
    caudalAgua,
    setTiempoTranscurrido,
    setNivelAgua,
    setAbatimientoRecuperacion,
    setCaudalAgua,
    handle_agregar,
    handleComboChange,
    handle_date_change,

    // * use form
    register_bombeo,
    handleSubmit_bombeo,
    errors_bombeo,
    control_bombeo,
    reset_bombeo,
    setValue_bombeo,
    getValues_bombeo,
    watch_bombeo,
  } = use_register_bombeo_hook();

  const {
    // watch_instrumento,
    reset_instrumento,
    control,
  } = useRegisterInstrumentoHook();

  const { instrumentos } = useAppSelector((state) => state.instrumentos_slice);

  useEffect(() => {
    reset_instrumento({
      nombre: instrumentos.nombre,
      nombre_seccion: instrumentos.nombre_seccion,
      nombre_subseccion: instrumentos.nombre_subseccion,
    });
  }, [instrumentos]);

  return (
    <>
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
          <Title title=" REGISTRO DE PRUEBAS DE BOMBEO " />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" fontWeight="bold">
            Datos Generales
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Sección"
            fullWidth
            size="small"
            margin="dense"
            value={instrumentos.nombre_seccion}
            disabled={true}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Subsección"
            fullWidth
            value={instrumentos.nombre_subseccion}
            size="small"
            margin="dense"
            disabled={true}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="nombre"
            control={control}
            defaultValue=""
            // rules={{ required: false }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                margin="dense"
                fullWidth
                label="Instrumento Asociado"
                size="small"
                variant="outlined"
                disabled={true}
                value={value}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => {
                  onChange(e.target.value);
                  console.log(e.target.value);
                }}
                error={!!error}
                /* helperText={
                        error
                          ? 'Es obligatorio subir un archivo'
                          : 'Seleccione un archivo'
                      } */
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Fecha de prueba de bombeo"
              value={fecha_prubea_bombeo}
              onChange={(value) => {
                handle_date_change('fecha_prueba', value);
              }}
              renderInput={(params: any) => (
                <TextField fullWidth size="small" {...params} />
              )}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="ubicacion_prueba"
            control={control_bombeo}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Lugar de prueba de bombeo"
                fullWidth
                size="small"
                margin="dense"
                required
                disabled={false}
                error={!!errors_bombeo.ubicacion_prueba}
                helperText={
                  errors_bombeo.ubicacion_prueba
                    ? 'Es obligatorio la ubicación de la prueba de bombeo'
                    : 'Ingrese la ubicación de la prueba de bombeo'
                }
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" fontWeight="bold">
            Coordenadas
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Latitud"
            size="small"
            fullWidth
            margin="dense"
            disabled={false}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Longitud"
            size="small"
            fullWidth
            margin="dense"
            disabled={false}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Descripción"
            fullWidth
            multiline
            size="small"
            margin="dense"
            disabled={false}
            rows={2}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={1}>
          <Typography variant="subtitle1" fontWeight="bold">
            Pozo:
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Pozo"
            size="small"
            margin="dense"
            disabled={true}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button variant="contained" color="primary">
            Buscar
          </Button>
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
          <Typography variant="subtitle1" fontWeight="bold">
            Registro de Sección de prueba de bombeo
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Controller
            name="prueba_bombeo"
            control={control_bombeo}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Prueba de bombeo de: "
                size="small"
                margin="dense"
                select
                fullWidth
                required={true}
                error={!!errors_bombeo.prueba_bombeo}
                helperText={
                  errors_bombeo.prueba_bombeo
                    ? 'Es obligatorio seleccionar un tipo prueba de bombeo'
                    : 'ingrese el tipo prueba de bombeo'
                }
                onChange={(e) => {
                  field.onChange(e); // Mantén esto para que react-hook-form funcione correctamente
                  handleComboChange(
                    e.target.value,
                    getValues_bombeo('caudal_sesion')
                  );
                }}
              >
                {prueba_de_bombeo.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Controller
            name="caudal_sesion"
            control={control_bombeo}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Caudal: "
                size="small"
                margin="dense"
                select
                fullWidth
                required={true}
                error={!!errors_bombeo.caudal}
                helperText={
                  errors_bombeo.caudal
                    ? 'Es obligatorio seleccionar un tipo caudal'
                    : 'ingrese el tipo caudal'
                }
                onChange={(e) => {
                  field.onChange(e); // Mantén esto para que react-hook-form funcione correctamente
                  handleComboChange(
                    getValues_bombeo('prueba_bombeo'),
                    e.target.value
                  );
                }}
              >
                {tipo_caudal.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Fecha de prueba de bombeo"
              value={fechaPruebaBombeo}
              onChange={(value) => {
                handle_date_change('fecha_prueba_bombeo', value);
              }}
              renderInput={(params) => (
                <TextField fullWidth size="small" {...params} />
              )}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="Hora de prueba de bombeo"
              value={fechaPruebaBombeo}
              onChange={(value) => {
                handle_date_change('hora_prueba_bombeo', value);
              }}
              renderInput={(params) => (
                <TextField fullWidth size="small" {...params} />
              )}
              ampm
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" fontWeight="bold">
            Registro de medición
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Tiempo transcurrido (min)"
            fullWidth
            type="number"
            size="small"
            margin="dense"
            disabled={false}
            value={tiempoTranscurrido}
            onChange={(e) => {
              setTiempoTranscurrido(parseInt(e.target.value));
            }}
            inputProps={{ min: 0 }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Nivel (m)"
            fullWidth
            size="small"
            margin="dense"
            disabled={false}
            value={nivelAgua}
            onChange={(e) => {
              setNivelAgua(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Abatimiento / Recuperación (m)"
            fullWidth
            size="small"
            margin="dense"
            disabled={false}
            value={abatimientoRecuperacion}
            onChange={(e) => {
              setAbatimientoRecuperacion(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Caudal (l/s)"
            size="small"
            margin="dense"
            required
            disabled={false}
            fullWidth
            value={caudalAgua}
            onChange={(e) => {
              setCaudalAgua(e.target.value);
            }}
          />
        </Grid>{' '}
        <Box sx={{ flexGrow: 1 }}>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="flex-end"
            sx={{ mt: '10px' }}
          >
            <Button variant="outlined" color="primary" onClick={handle_agregar}>
              Agregar
            </Button>
          </Stack>
        </Box>
        {row_prueba.length > 0 && (
          <>
            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight="bold">
                Datos de Prueba de bombeo:
              </Typography>
              <Divider />
              <DataGrid
                autoHeight
                rows={row_prueba}
                columns={columns_prueba}
                getRowId={(row) => uuidv4()}
                pageSize={5}
                rowsPerPageOptions={[5]}
              />
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};
