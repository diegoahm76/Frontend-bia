/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
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
  import {
    tipo_parametro_choices,
  } from './utils/choices/choices';
  import { AgregarArchivo } from '../../../../../utils/AgregarArchivo/AgregarArchivo';
  import { LoadingButton } from '@mui/lab';
  import { ButtonSalir } from '../../../../../components/Salir/ButtonSalir';
  import { useRegisterInstrumentoHook } from '../RegistroInstrumentos/hook/useRegisterInstrumentoHook';
  import { useAppSelector } from '../../../../../hooks';
  import { useEffect } from 'react';
  import { Controller } from 'react-hook-form';
  import { tipo_agua } from '../RegistroInstrumentos/choices/choices';
  import { useNavigate } from 'react-router-dom';
  
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export const EditarLaboratorio: React.FC = () => {
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
      // watch_instrumento,
      reset_instrumento,
      control,
    } = useRegisterInstrumentoHook();
  
    const { instrumentos } = useAppSelector((state) => state.instrumentos_slice);
  
    const navigate = useNavigate();
  
    useEffect(() => {
      if (!instrumentos) {
        console.log('instrumentos', instrumentos);
        navigate('/app/recurso_hidrico/instrumentos/instrumentos', {
          replace: true,
        });
      }
    }, []);
    useEffect(() => {
      reset_instrumento({
        nombre: instrumentos.nombre,
        nombre_seccion: instrumentos.nombre_seccion,
        nombre_subseccion: instrumentos.nombre_subseccion,
        cod_tipo_agua: instrumentos.cod_tipo_agua,
      });
    }, [instrumentos]);
  
    const {
      tipo_parametro_value,
      rows_laboratorio,
      fecha_toma_muestra,
      fecha_analisis,
      fecha_envio,
      fecha_resultado,
      handle_date_change,
      handle_change_inputs,
      handle_agregar,
  
      // *Autocomplete
      cuenca_select,
      pozos_selected,
      parametros_select,
      undidad_medida_select,
      id_instrumento_slice,
      fetch_data_parametros_laboratorios_select,
      fetch_data_cuencas_instrumentos_select,
      fetch_data_pozo_instrumentos_select,
  
      // * Use Form
      register_laboratorio,
      control_registro_laboratorio,
      formErrors_laboratorio,
  
      // * Onsubmit
      onSubmit,
      is_saving,
    } = use_register_laboratorio_hook();
  
    useEffect(() => {
      if (id_instrumento_slice) {
        void fetch_data_cuencas_instrumentos_select();
      }
    }, [id_instrumento_slice]);
  
    useEffect(() => {
      if (instrumentos.id_pozo) {
        void fetch_data_pozo_instrumentos_select(instrumentos.id_pozo);
      }
    }, [instrumentos.id_pozo]);
  
    useEffect(() => {
      if (tipo_parametro_value) {
        void fetch_data_parametros_laboratorios_select();
        console.log(undidad_medida_select, 'undidad_medida_select');
      }
    }, [tipo_parametro_value]);
  
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
              <Title title=" EDICIÒN DE LABORATORIO " />
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
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
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
                  />
                )}
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
                    <TextField
                      {...params}
                      fullWidth
                      size="small"
                      required
                      {...register_laboratorio('fecha_toma_muestra', {
                        required: true,
                      })}
                      error={!!formErrors_laboratorio.fecha_toma_muestra}
                      helperText={
                        formErrors_laboratorio?.fecha_toma_muestra?.type ===
                          'required' && 'Este campo es obligatorio'
                      }
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Lugar de la muestra"
                fullWidth
                required
                size="small"
                margin="dense"
                disabled={false}
                {...register_laboratorio('lugar_muestra', { required: true })}
                error={!!formErrors_laboratorio.lugar_muestra}
                helperText={
                  formErrors_laboratorio?.lugar_muestra?.type === 'required' &&
                  'Este campo es obligatorio'
                }
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
                    disabled={true}
                    fullWidth
                    required
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
                  label="Enviado a laboratorio el día"
                  value={fecha_envio}
                  onChange={(value) => {
                    handle_date_change('fecha_envio', value);
                  }}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      fullWidth
                      required
                      size="small"
                      {...register_laboratorio('fecha_envio_lab', {
                        required: true,
                      })}
                      error={!!formErrors_laboratorio.fecha_envio_lab}
                      helperText={
                        formErrors_laboratorio?.fecha_envio_lab?.type ===
                          'required' && 'Este campo es obligatorio'
                      }
                    />
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
                    <TextField
                      {...params}
                      fullWidth
                      required
                      size="small"
                      {...register_laboratorio('fecha_resultados_lab', {
                        required: true,
                      })}
                      error={!!formErrors_laboratorio.fecha_resultados_lab}
                      helperText={
                        formErrors_laboratorio?.fecha_resultados_lab?.type ===
                          'required' && 'Este campo es obligatorio'
                      }
                    />
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
                required
                {...register_laboratorio('latitud', { required: true })}
                error={!!formErrors_laboratorio.latitud}
                helperText={
                  formErrors_laboratorio?.latitud?.type === 'required' &&
                  'Este campo es obligatorio'
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Longitud"
                size="small"
                fullWidth
                margin="dense"
                disabled={false}
                required
                {...register_laboratorio('longitud', { required: true })}
                error={!!formErrors_laboratorio.longitud}
                helperText={
                  formErrors_laboratorio?.longitud?.type === 'required' &&
                  'Este campo es obligatorio'
                }
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
                {...register_laboratorio('descripcion', { required: true })}
                error={!!formErrors_laboratorio.descripcion}
                helperText={
                  formErrors_laboratorio?.descripcion?.type === 'required' &&
                  'Este campo es obligatorio'
                }
              />
            </Grid>
            {instrumentos.cod_tipo_agua === 'SUP' ? (
              <>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="id_cuenca"
                    control={control_registro_laboratorio}
                    defaultValue=""
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Seleccione una cuenca"
                        select
                        size="small"
                        margin="dense"
                        disabled={false}
                        fullWidth
                        required
                        error={!!formErrors_laboratorio.id_cuenca}
                        helperText={
                          formErrors_laboratorio?.id_cuenca?.type ===
                            'required' && 'Este campo es obligatorio'
                        }
                      >
                        {cuenca_select.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>
              </>
            ) : null}
            {instrumentos.cod_tipo_agua === 'SUB' ? (
              <>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="id_pozo"
                    control={control_registro_laboratorio}
                    defaultValue=""
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Seleccione un pozo"
                        select
                        size="small"
                        margin="dense"
                        disabled={false}
                        fullWidth
                        required
                        error={!!formErrors_laboratorio.id_pozo}
                        helperText={
                          formErrors_laboratorio?.id_pozo?.type === 'required' &&
                          'Este campo es obligatorio'
                        }
                      >
                        {pozos_selected.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>
              </>
            ) : null}
            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight="bold">
                Registro de medición
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Tipo parámetro "
                select
                fullWidth
                size="small"
                value={tipo_parametro_value}
                margin="dense"
                disabled={rows_laboratorio.length > 0}
                name="tipo_parametro"
                onChange={handle_change_inputs}
              >
                {tipo_parametro_choices.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Controller
                name="id_parametro"
                control={control_registro_laboratorio}
                defaultValue=""
                rules={{ required: rows_laboratorio.length === 0 }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Seleccione un parametro"
                    select
                    size="small"
                    margin="dense"
                    disabled={tipo_parametro_value === ''}
                    fullWidth
                    required={rows_laboratorio.length === 0}
                    error={!!formErrors_laboratorio.id_parametro}
                    helperText={
                      formErrors_laboratorio?.id_parametro?.type === 'required' &&
                      'Este campo es obligatorio'
                    }
                  >
                    {parametros_select.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="unidad de medida"
                // select
                fullWidth
                size="small"
                margin="dense"
                value={undidad_medida_select || ''}
                disabled={true}
                name="unidad_medida"
                onChange={handle_change_inputs}
              >
                {/* {unidad_medida_choices.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))} */}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="metodo"
                control={control_registro_laboratorio}
                defaultValue=""
                rules={{ required: rows_laboratorio.length === 0 }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Método de análisis"
                    size="small"
                    margin="dense"
                    disabled={false}
                    fullWidth
                    required={rows_laboratorio.length === 0}
                  ></TextField>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Fecha de análisis"
                  value={fecha_analisis}
                  onChange={(value) => {
                    handle_date_change('fecha_analisis', value);
                  }}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      fullWidth
                      size="small"
                      {...register_laboratorio('fecha_analisis')}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="resultado"
                control={control_registro_laboratorio}
                defaultValue=""
                rules={{ required: rows_laboratorio.length === 0 }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Resultado"
                    size="small"
                    margin="dense"
                    disabled={false}
                    fullWidth
                    required={rows_laboratorio.length === 0}
                  ></TextField>
                )}
              />
            </Grid>
            <Box sx={{ flexGrow: 1 }}>
              <Stack
                direction="row"
                spacing={2}
                justifyContent="flex-end"
                sx={{ mt: '10px' }}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handle_agregar}
                >
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
          </Grid>
        </form>
      </>
    );
  };
  