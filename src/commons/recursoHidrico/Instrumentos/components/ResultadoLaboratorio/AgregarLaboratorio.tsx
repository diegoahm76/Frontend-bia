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
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { v4 as uuidv4 } from 'uuid';
import { Title } from '../../../../../components/Title';
import { use_register_laboratorio_hook } from './hook/useRegisterLaboratorioHook';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { columns_result_lab } from './utils/colums/comlums';
import { clase_muestra_choices } from './utils/choices/choices';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AgregarLaboratorio: React.FC = () => {
  const colums_resultado: GridColDef[] = [
    ...columns_result_lab,
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
    rows_laboratorio,
    fecha_toma_muestra,
    fecha_envio,
    fecha_resultado,
    handle_date_change,
    handle_clase_muestra_change,
  } = use_register_laboratorio_hook();

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
          <Title title=" REGISTRO DE LABORATORIO " />
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
              label="Fecha de toma de muestra"
              value={fecha_toma_muestra}
              onChange={(value) => {
                handle_date_change('fecha_toma_muestra', value);
              }}
              renderInput={(params: any) => (
                <TextField fullWidth size="small" {...params} />
              )}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Lugar de la muestra"
            fullWidth
            size="small"
            margin="dense"
            disabled={false}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Analisis realizado en aguas "
            select
            fullWidth
            size="small"
            margin="dense"
            disabled={false}
            onChange={handle_clase_muestra_change}
          >
            {clase_muestra_choices.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="enviado a laboratorio el día"
              value={fecha_envio}
              onChange={(value) => {
                handle_date_change('fecha_envio', value);
              }}
              renderInput={(params: any) => (
                <TextField fullWidth size="small" {...params} />
              )}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="resultados de laboratorio"
              value={fecha_resultado}
              onChange={(value) => {
                handle_date_change('fecha_resultado', value);
              }}
              renderInput={(params: any) => (
                <TextField fullWidth size="small" {...params} />
              )}
            />
          </LocalizationProvider>
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
            Cuenca / Pozo:
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Cuenca / Pozo"
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
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Profundidad (m)"
            fullWidth
            size="small"
            margin="dense"
            disabled={false}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Velocidad superficial (m/s)"
            fullWidth
            size="small"
            margin="dense"
            disabled={false}
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
          />
        </Grid>
        <Box sx={{ flexGrow: 1 }}>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="flex-end"
            sx={{ mt: '10px' }}
          >
            <Button variant="outlined" color="primary">
              Agregar
            </Button>
          </Stack>
        </Box>
        {rows_laboratorio.length > 0 && (
          <>
            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight="bold">
                Datos Aforo:
              </Typography>
              <Divider />
              <DataGrid
                autoHeight
                rows={rows_laboratorio}
                columns={colums_resultado}
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
