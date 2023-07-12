import {
  Button,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { v4 as uuidv4 } from 'uuid';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { LoadingButton } from '@mui/lab';
import { ButtonSalir } from '../../../../../components/Salir/ButtonSalir';
import { AgregarArchivo } from '../../../../../utils/AgregarArchivo/AgregarArchivo';
import { tipo_agua } from './choices/choices';
import { useRegisterInstrumentoHook } from './hook/useRegisterInstrumentoHook';
import { useContext } from 'react';
import { DataContext } from '../../context/contextData';
// import dayjs from 'dayjs';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const RegistroInstrumentos: React.FC = () => {
  const colums_aforo: GridColDef[] = [
    // ...columns_result_lab,
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
  const colums_prueba_bombeo: GridColDef[] = [
    // ...columns_result_lab,
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
  const colums_laboratorio: GridColDef[] = [
    // ...columns_result_lab,
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

  const { fecha_creacion, fecha_vigencia, current_date, handle_date_change } =
    useRegisterInstrumentoHook();

  const { row_cartera_aforo, row_prueba_bombeo, row_result_laboratorio } =
    useContext(DataContext);

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
          <Typography variant="subtitle1" fontWeight="bold">
            Información del Instrumento:
          </Typography>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Nombre"
            size="small"
            margin="dense"
            disabled={false}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Fecha de registro"
            InputLabelProps={{
              shrink: true,
            }}
            type="date"
            size="small"
            fullWidth
            value={current_date}
            disabled
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Tipo de agua"
            select
            size="small"
            margin="dense"
            disabled={false}
            fullWidth
          >
            {tipo_agua.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Fecha de creación del instrumento"
              value={fecha_creacion}
              onChange={(value) => {
                handle_date_change('fecha_creacion', value);
              }}
              renderInput={(params: any) => (
                <TextField fullWidth size="small" {...params} />
              )}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Resolución"
            size="small"
            margin="dense"
            disabled={true}
            fullWidth
            value="n.O PS-GJ.1.2.6.18-2900"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Finalización de vigencia"
              value={fecha_vigencia}
              onChange={(value) => {
                handle_date_change('fecha_vigencia', value);
              }}
              renderInput={(params: any) => (
                <TextField fullWidth size="small" {...params} />
              )}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={6} md={1}>
          <Typography variant="subtitle1" fontWeight="bold">
            Cuenca o Pozo:
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
            Carteras de aforo
          </Typography>
          <Divider />
        </Grid>
        {row_cartera_aforo.length > 0 && (
          <>
            <Grid item xs={12}>
              <DataGrid
                autoHeight
                rows={row_cartera_aforo}
                columns={colums_aforo}
                getRowId={(row) => uuidv4()}
                pageSize={5}
                rowsPerPageOptions={[5]}
              />
            </Grid>
          </>
        )}
        <Grid item spacing={2} justifyContent="end" container>
          <Grid item>
            <LoadingButton variant="outlined" color="primary" type="submit">
              Agregar nueva cartera de aforo
            </LoadingButton>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" fontWeight="bold">
            Pruebas de bombeo
          </Typography>
          <Divider />
        </Grid>
        {row_prueba_bombeo.length > 0 && (
          <>
            <Grid item xs={12}>
              <DataGrid
                autoHeight
                rows={row_prueba_bombeo}
                columns={colums_prueba_bombeo}
                getRowId={(row) => uuidv4()}
                pageSize={5}
                rowsPerPageOptions={[5]}
              />
            </Grid>
          </>
        )}
        <Grid item spacing={2} justifyContent="end" container>
          <Grid item>
            <LoadingButton variant="outlined" color="primary" type="submit">
              Agregar nueva prueba de bombeo
            </LoadingButton>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" fontWeight="bold">
            Resultados de laboratorio
          </Typography>
          <Divider />
        </Grid>
        {row_result_laboratorio.length > 0 && (
          <>
            <Grid item xs={12}>
              <DataGrid
                autoHeight
                rows={row_result_laboratorio}
                columns={colums_laboratorio}
                getRowId={(row) => uuidv4()}
                pageSize={5}
                rowsPerPageOptions={[5]}
              />
            </Grid>
          </>
        )}
        <Grid item spacing={2} justifyContent="end" container>
          <Grid item>
            <LoadingButton variant="outlined" color="primary" type="submit">
              Agregar nuevo resultado de laboratorio
            </LoadingButton>
          </Grid>
        </Grid>
        <AgregarArchivo multiple={true} />
        <Grid item spacing={2} justifyContent="end" container>
          <Grid item>
            <ButtonSalir />
          </Grid>
          <Grid item>
            <LoadingButton variant="contained" color="success" type="submit">
              Guardar
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
