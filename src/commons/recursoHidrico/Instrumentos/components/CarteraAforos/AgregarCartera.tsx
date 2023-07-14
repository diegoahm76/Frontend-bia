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
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { v4 as uuidv4 } from 'uuid';
import { Title } from '../../../../../components/Title';
import { tipo_aforo } from './utils/choices/Choices';
import { register_aforo_hook } from './hook/registerAforoHook';
import { type GridColDef, DataGrid } from '@mui/x-data-grid';
import { colums_aforos } from './utils/colums/colums';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AgregarCartera: React.FC = () => {
  const columns_aforo: GridColDef[] = [
    ...colums_aforos,
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
    fecha_aforo,
    tipo_aforo_value,
    distancia_orilla,
    profundidad,
    velocidad_superficial,
    velocidad_profunda,
    row_aforo,
    set_distancia_orilla,
    set_profundidad,
    set_velocidad_superficial,
    set_velocidad_profunda,
    handle_date_change,
    handle_tipo_aforo_change,
    handle_agregar,
  } = register_aforo_hook();

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
          <Title title=" REGISTRO DE CARTERA DE AFOROS " />
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
            <DateTimePicker
              label="Fecha de Aforo"
              value={fecha_aforo}
              onChange={(value) => {
                handle_date_change('fecha_aforo', value);
              }}
              renderInput={(params: any) => (
                <TextField fullWidth size="small" {...params} />
              )}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Lugar de Aforo"
            fullWidth
            size="small"
            margin="dense"
            disabled={false}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Tipo de Aforo"
            select
            size="small"
            margin="dense"
            required
            value={tipo_aforo_value}
            fullWidth
            onChange={handle_tipo_aforo_change}
          >
            {tipo_aforo.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Molinete"
            size="small"
            fullWidth
            margin="dense"
            disabled={false}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="No. de serie"
            size="small"
            fullWidth
            margin="dense"
            disabled={false}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="No. de hélices"
            size="small"
            fullWidth
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
            Cuenca:
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Cuenca"
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
            Registro de medición
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Distancia de la orilla (m)"
            fullWidth
            size="small"
            margin="dense"
            disabled={false}
            value={distancia_orilla}
            onChange={(e) => {
              set_distancia_orilla(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Profundidad (m)"
            fullWidth
            size="small"
            margin="dense"
            disabled={false}
            value={profundidad}
            onChange={(e) => {
              set_profundidad(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Velocidad superficial (m/s)"
            fullWidth
            size="small"
            margin="dense"
            disabled={false}
            value={velocidad_superficial}
            onChange={(e) => {
              set_velocidad_superficial(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Velocidad Profunda (m/s)"
            size="small"
            margin="dense"
            required
            disabled={false}
            fullWidth
            value={velocidad_profunda}
            onChange={(e) => {
              set_velocidad_profunda(e.target.value);
            }}
          />
        </Grid>
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
        {row_aforo.length > 0 && (
          <>
            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight="bold">
                Datos Aforo:
              </Typography>
              <Divider />
              <DataGrid
                autoHeight
                rows={row_aforo}
                columns={columns_aforo}
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
