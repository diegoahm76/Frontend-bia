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
  Tooltip,
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
import { useRegisterInstrumentoHook } from '../RegistroInstrumentos/hook/useRegisterInstrumentoHook';
import { useAppSelector } from '../../../../../hooks';
import { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { ButtonSalir } from '../../../../../components/Salir/ButtonSalir';
import { AgregarArchivo } from '../../../../../utils/AgregarArchivo/AgregarArchivo';
import { use_register_laboratorio_hook } from '../ResultadoLaboratorio/hook/useRegisterLaboratorioHook';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import { get_header_name } from './utils/functions/functions';
import { colums_bombeo } from './utils/colums/colums';
import { tipo_sesion } from './utils/choices/choices';
import { use_register_bombeo_hook } from './hook/useRegisterBombeoHook';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EditarSesionPrueba: React.FC = () => {
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
  const columns_sesion: GridColDef[] = [
    {
      field: 'cod_tipo_sesion',
      headerName: 'SECCIÓN/CAUDAL',
      sortable: true,
      width: 400,
      valueGetter: (params) => get_header_name(params.value),
    },
    {
      field: 'fecha_inicio',
      headerName: 'HORA INICIO',
      sortable: true,
      width: 200,
    },
    {
      field: 'ACCIONES',
      headerName: 'ACCIONES',
      width: 80,
      renderCell: (params) => (
        <>
          <Tooltip title="Editar prueba de bombeo">
            <Button
              variant="outlined"
              color="primary"
              size="small"
              startIcon={<EditIcon />}
              onClick={() => {
                // set_id_sesion_bombeo(params.row.id_sesion_prueba_bombeo);
                // set_info_sesion_bombeo(params.row);
              }}
            />
          </Tooltip>
          <Tooltip title="Eliminar prueba de bombeo">
            <Button
              variant="outlined"
              color="primary"
              size="small"
              startIcon={<DeleteIcon />}
              onClick={() => {
                // set_id_sesion_bombeo(params.row.id_sesion_prueba_bombeo);
                // set_info_sesion_bombeo(params.row);
              }}
            />
          </Tooltip>
        </>
      ),
    },
  ];
  const { pozos_selected, fetch_data_pozo_instrumentos_select } =
    use_register_laboratorio_hook();
  const {
    fecha_prubea_bombeo,
    horaPruebaBombeo,
    row_prueba,
    row_data_prueba,
    handle_agregar,
    handle_date_change,
    handle_time_change,

    // * use form
    register_bombeo,
    handleSubmit_bombeo,
    errors_bombeo,
    control_bombeo,
    reset_bombeo,
    setValue_bombeo,
    getValues_bombeo,
    watch_bombeo,

    // *OnSubmit
    onSubmit,
    is_saving,

    // // * datos de sesion
    // rows_sesion_bombeo,
    // fetch_data_general_sesion,
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

  useEffect(() => {
    if (instrumentos.id_pozo) {
      void fetch_data_pozo_instrumentos_select(instrumentos.id_pozo);
    }
  }, [instrumentos.id_pozo]);

  useEffect(() => {
    if (row_data_prueba) {
      console.log(row_data_prueba, 'row_data_prueba');
    }
  }, [row_data_prueba]);

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="subtitle1" fontWeight="bold">
          Registro de Sección de prueba de bombeo
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Controller
          name="cod_tipo_sesion"
          control={control_bombeo}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              label=" Prueba de bombeo / caudal "
              size="small"
              margin="dense"
              select
              fullWidth
              required={true}
              error={!!errors_bombeo.caudal}
              helperText={
                errors_bombeo.caudal
                  ? 'Es obligatorio seleccionar un tipo de prueba de bombeo / caudal'
                  : 'ingrese el tipo de prueba de bombeo / caudal'
              }
            >
              {tipo_sesion.map((option) => (
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
          <TimePicker
            label="Hora de prueba de bombeo"
            value={horaPruebaBombeo}
            onChange={(value) => {
              handle_time_change(value);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                size="small"
                {...register_bombeo('hora_inicio', { required: true })}
                error={!!errors_bombeo.hora_inicio}
                helperText={
                  errors_bombeo.hora_inicio
                    ? 'Es obligatorio la hora de inicio de la prueba de bombeo'
                    : 'Ingrese la hora de inicio de la prueba de bombeo'
                }
              />
            )}
            ampm={true}
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
        <Controller
          name="tiempo_transcurrido"
          control={control_bombeo}
          rules={{ required: true }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              value={value}
              label="Tiempo transcurrido (min)"
              size="small"
              margin="dense"
              type="number"
              disabled={false}
              fullWidth
              required={true}
              onChange={onChange}
              error={!!errors_bombeo.tiempo_transcurrido}
              helperText={
                errors_bombeo.tiempo_transcurrido
                  ? 'Es obligatorio ingresar el tiempo transcurrido'
                  : 'Ingrese el tiempo transcurrido'
              }
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Controller
          name="nivel"
          control={control_bombeo}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Nivel (m)"
              size="small"
              margin="dense"
              disabled={false}
              fullWidth
              required={true}
              error={!!errors_bombeo.nivel}
              helperText={
                errors_bombeo.nivel
                  ? 'Es obligatorio ingresar el nivel'
                  : 'Ingrese el nivel'
              }
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Controller
          name="resultado"
          control={control_bombeo}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Abatimiento / Recuperación (m)"
              size="small"
              margin="dense"
              disabled={false}
              fullWidth
              required={true}
              error={!!errors_bombeo.resultado}
              helperText={
                errors_bombeo.resultado
                  ? 'Es obligatorio ingresar el abatimiento / recuperación'
                  : 'Ingrese el abatimiento / recuperación'
              }
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Controller
          name="caudal"
          control={control_bombeo}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Caudal (l/s)"
              size="small"
              margin="dense"
              disabled={false}
              fullWidth
              required={true}
              error={!!errors_bombeo.caudal}
              helperText={
                errors_bombeo.caudal
                  ? 'Es obligatorio ingresar el caudal'
                  : 'Ingrese el caudal'
              }
            />
          )}
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
      <Grid item xs={12}></Grid>
      <AgregarArchivo multiple={true} />
      <Grid item spacing={2} justifyContent="end" container>
        <Grid item>
          <ButtonSalir />
        </Grid>
        <Grid item>
          <LoadingButton
            variant="contained"
            color="success"
            type="submit"
            disabled={is_saving}
            loading={is_saving}
          >
            Guardar
          </LoadingButton>
        </Grid>
      </Grid>
    </>
  );
};
