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
import { register_bombeo_hook } from './hook/RegisterBombeoHook';
import { tipo_sesion } from './utils/choices/choices';
import { colums_bombeo } from './utils/colums/colums';

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
    handlePruebaBombeoChange,
    handleCaudalChange,
    handle_date_change,
  } = register_bombeo_hook();

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
            disabled={true}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Subsección"
            fullWidth
            size="small"
            margin="dense"
            disabled={true}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Instrumento Asociado"
            fullWidth
            size="small"
            margin="dense"
            disabled={true}
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
          <TextField
            label="Lugar de prueba de bombeo"
            fullWidth
            size="small"
            margin="dense"
            disabled={false}
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
          <TextField
            label="Prueba de bombeo de: "
            select
            size="small"
            margin="dense"
            required
            value={pruebaBombeo}
            fullWidth
            onChange={handlePruebaBombeoChange}
          >
            {tipo_sesion.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Caudal: "
            select
            size="small"
            margin="dense"
            required
            value={caudal}
            fullWidth
            onChange={handleCaudalChange}
          >
            {tipo_sesion.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
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
