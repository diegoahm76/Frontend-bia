/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/naming-convention */
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
import { BusquedaCuencas } from '../BusquedaCuencas';
import { BusquedaPozos } from '../BusquedaPozos';
import { Controller } from 'react-hook-form';
import { control_error, control_success } from '../../../../../helpers';
import { agregar_instrumento } from '../../request/request';
import dayjs from 'dayjs';


export const RegistroInstrumentos: React.FC = (): JSX.Element => {
  const columns_aforo: GridColDef[] = [
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
  const columns_prueba_bombeo: GridColDef[] = [
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
  const columns_laboratorio: GridColDef[] = [
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

  const {
    id_seccion,
    id_subseccion,
    archivos,
    nombres_archivos,
    fecha_creacion,
    fecha_vigencia,
    current_date,
    tipo_agua_selected,
    row_cartera_aforo,
    row_prueba_bombeo,
    row_result_laboratorio,
    set_is_open_cuenca,
    set_is_open_pozos,
    handle_date_change,
    register,
    handleSubmit,
    control,
    formErrors,
  } = useRegisterInstrumentoHook();

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    // Perform submit logic here
    try {
      const nombre_archivos_set = new Set(nombres_archivos);
      if (nombre_archivos_set.size !== nombres_archivos.length) {
        control_error('No se permiten nombres de archivo duplicados');
        return;
      }
      const fecha_crea = dayjs(data.fecha_creacion_instrumento).format('YYYY-MM-DDTHH:mm:ss');
      console.log(fecha_crea, 'fecha_crea');

      const datos_instrumento = new FormData();
      datos_instrumento.append('nombre', data.nombre);
      datos_instrumento.append('fecha_creacion_instrumento', fecha_crea);
      datos_instrumento.append(
        'fecha_vigencia_instrumento',
        data.fecha_vigencia_instrumento
      );
      datos_instrumento.append('cod_tipo_agua', tipo_agua_selected);
      if (id_seccion && id_subseccion) {
        datos_instrumento.append('id_seccion', id_seccion.toString());
        datos_instrumento.append('id_subseccion', id_subseccion.toString());
      }
      datos_instrumento.append(
        'id_cuencas',
        '[{"id_cuenca":1},{"id_cuenca":2}]'
      );
      archivos.forEach((archivo: any, index: any) => {
        if (archivo != null) {
          datos_instrumento.append(`archivo`, archivo);
          datos_instrumento.append(`nombre_archivo`, nombres_archivos[index]);
        }
      });

      await agregar_instrumento(datos_instrumento)
      control_success('Se agregó instrumento correctamente');


      console.log('datos_instrumento', datos_instrumento);
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <form
        onSubmit={onSubmit}
        style={{
          width: '100%',
          height: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
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
            <Typography variant="subtitle1" fontWeight="bold">
              Información del Instrumento:
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="nombre"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nombre"
                  size="small"
                  margin="dense"
                  disabled={false}
                  fullWidth
                  required
                  error={!!formErrors.nombre}
                  helperText={
                    formErrors?.nombre?.type === 'required' &&
                    'Este campo es obligatorio'
                  }
                />
              )}
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
            <Controller
              name="cod_tipo_agua"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Tipo de agua"
                  select
                  size="small"
                  margin="dense"
                  disabled={false}
                  fullWidth
                  required
                  error={!!formErrors.cod_tipo_agua}
                  helperText={
                    formErrors?.cod_tipo_agua?.type === 'required' &&
                    'Este campo es obligatorio'
                  }
                >
                  {tipo_agua.map((option) => (
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
                label="Fecha de creación del instrumento"
                value={fecha_creacion}
                onChange={(value) => {
                  handle_date_change('fecha_creacion', value);
                }}
                renderInput={(params: any) => (
                  <TextField
                    fullWidth
                    size="small"
                    {...params}
                    {...register('fecha_creacion_instrumento', {
                      required: true,
                    })}
                    error={!!formErrors?.fecha_creacion_instrumento}
                    helperText={
                      formErrors?.fecha_creacion_instrumento?.type ===
                      'required'
                        ? 'Este campo es obligatorio'
                        : ''
                    }
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
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
                  <TextField
                    fullWidth
                    size="small"
                    {...params}
                    {...register('fecha_vigencia_instrumento', {
                      required: true,
                    })}
                    error={!!formErrors?.fecha_vigencia_instrumento}
                    helperText={
                      formErrors?.fecha_vigencia_instrumento?.type ===
                      'required'
                        ? 'Este campo es obligatorio'
                        : ''
                    }
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          {tipo_agua_selected === 'SUP' ? (
            <Grid item spacing={2} justifyContent="end" container>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    set_is_open_cuenca(true);
                  }}
                >
                  Buscar Cuenca
                </Button>
              </Grid>
            </Grid>
          ) : null}
          {tipo_agua_selected === 'SUB' ? (
            <Grid item spacing={2} justifyContent="end" container>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    set_is_open_pozos(true);
                  }}
                >
                  Buscar Pozo
                </Button>
              </Grid>
            </Grid>
          ) : null}
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
      </form>

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
        {tipo_agua_selected === 'SUP' ? (
          <>
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
                    columns={columns_aforo}
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
          </>
        ) : null}
        {tipo_agua_selected === 'SUB' ? (
          <>
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
                    columns={columns_prueba_bombeo}
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
          </>
        ) : null}
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
                columns={columns_laboratorio}
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
      </Grid>
      <BusquedaCuencas />
      <BusquedaPozos />
    </>
  );
};
