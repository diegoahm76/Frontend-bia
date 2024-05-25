/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
import {
  Alert,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { Title } from '../../../../../components/Title';
import { Controller } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { useContext, useEffect, useState } from 'react';
import { set_current_mode_planes } from '../../../store/slice/indexPlanes';
import { useSeguimientoPAIHook } from '../../hooks/useSeguimientoPAIHook';
import { DataContextSeguimientoPAI } from '../../context/context';
// import { NumericFormatCustom } from '../../../components/inputs/NumericInput';
import InfoIcon from '@mui/icons-material/Info';
import { meses_selected } from '../../../PlanAnualAdquisiciones/choices/selects';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FileDocs } from '../../../components/FileDocs';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { IconButtonDownLoad } from '../../../../../utils/DownloadButton/IconButtonDownLoad';
import { v4 as uuidv4 } from 'uuid';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AgregarSeguimientoPAI: React.FC = () => {
  const columns_anexos: GridColDef[] = [
    {
      field: 'numero_documento',
      headerName: 'No.',
      width: 100,
    },
    {
      field: 'ruta_archivo',
      headerName: 'Acciones',
      width: 200,
      renderCell: (params: any) => (
        <>
          <IconButtonDownLoad
            fileUrl={params.value}
            fileName={params.row.nombre_de_Guardado}
            condition={false}
          />
        </>
      ),
    },
  ];
  const {
    control_seguimiento_pai,
    errors_seguimiento_pai,
    reset_seguimiento_pai,
    data_watch_seguimiento_pai,
    register_seguimiento_pai,
    set_value_seguimiento_pai,

    onsubmit_seguimiento_pai,
    onsubmit_editar,
    is_savingd_seguimiento_pai,

    limpiar_formulario_seguimiento_pai,
  } = useSeguimientoPAIHook();

  const dispatch = useAppDispatch();

  const { mode, seguimiento_pai } = useAppSelector((state) => state.planes);

  const {
    // * id
    id_programa,
    id_proyecto,
    id_producto,
    // id_indicador,
    set_id_programa,
    set_id_proyecto,
    set_id_producto,
    set_id_indicador,
    // * data
    proyectos_selected,
    productos_selected,
    actividades_selected,
    unidad_organizacional_selected,
    indicadores_selected,
    metas_selected,
    programas_selected,
    rows_anexos,

    fetch_data_productos,
    fetch_data_proyectos,
    fetch_data_actividades,
    fetch_data_unidad_organizacional,
    fetch_data_indicadores,
    fetch_data_metas,
    fetch_data_anexos,
    fetch_data_programas,
  } = useContext(DataContextSeguimientoPAI);

  useEffect(() => {
    fetch_data_unidad_organizacional();
    fetch_data_indicadores();
    fetch_data_metas();
    fetch_data_programas();
    // fetch_data_anexos();
  }, []);

  useEffect(() => {
    const fetchDataProyectos = async () => {
      if (id_programa) {
        await fetch_data_proyectos();
        // set_value_seguimiento_pai('id_proyecto', seguimiento_pai.id_proyecto);
      }
    };

    fetchDataProyectos();
  }, [id_programa]);

  useEffect(() => {
    const fetchDataProductos = async () => {
      if (id_proyecto) {
        await fetch_data_productos();
        // set_value_seguimiento_pai('id_producto', seguimiento_pai.id_producto);
      }
    };

    fetchDataProductos();
  }, [id_proyecto]);

  useEffect(() => {
    const fetchDataActividades = async () => {
      if (id_producto) {
        await fetch_data_actividades();
        // set_value_seguimiento_pai('id_actividad', seguimiento_pai.id_actividad);
      }
    };

    fetchDataActividades();
  }, [id_producto]);

  useEffect(() => {
    fetch_data_anexos();
  }, [seguimiento_pai.id_seguimiento_pai]);

  // Crear una variable para la fecha actual
  const fecha_registro_avance =
    data_watch_seguimiento_pai.fecha_registro_avance;
  const currentDate = dayjs().format('YYYY-MM-DD');

  const handle_date_change = (value: any) => {
    set_value_seguimiento_pai('fecha_registro_avance', value);
  };

  const [fecha_creacion_pai, set_fecha_creacion_pai] = useState<Dayjs | null>(
    null
  );

  const handle_date_creacion_change = (
    fieldName: string,
    value: Dayjs | null
  ): void => {
    if (value !== null) {
      switch (fieldName) {
        case 'fecha_crea':
          set_fecha_creacion_pai(value);
          set_value_seguimiento_pai(
            'fecha_creacion',
            value.format('YYYY-MM-DD')
          );
          break;
        default:
          break;
      }
    }
  };

  console.log(currentDate); // Imprime la fecha actual en formato 'YYYY-MM-DD'

  useEffect(() => {
    if (mode.crear) {
      set_value_seguimiento_pai('fecha_registro_avance', currentDate);
      // set_fecha_creacion_pai(dayjs(seguimiento_pai?.fecha_creacion));
      set_value_seguimiento_pai(
        'fecha_creacion',
        fecha_creacion_pai?.format('YYYY-MM-DD')
      );
      limpiar_formulario_seguimiento_pai();
    }
    if (mode.editar) {
      set_value_seguimiento_pai(
        'fecha_registro_avance',
        seguimiento_pai.fecha_registro_avance ?? null
      );
      if (seguimiento_pai?.fecha_creacion) {
        set_value_seguimiento_pai(
          'fecha_creacion',
          dayjs(seguimiento_pai.fecha_creacion).format('YYYY-MM-DD')
        );
        set_fecha_creacion_pai(dayjs(seguimiento_pai.fecha_creacion) ?? null);
      }
      set_id_programa(seguimiento_pai.id_programa ?? null);
      set_id_proyecto(seguimiento_pai.id_proyecto ?? null);
      set_id_producto(seguimiento_pai.id_producto ?? null);
      set_id_indicador(seguimiento_pai.id_indicador ?? null);
      reset_seguimiento_pai({
        id_seguimiento_pai: seguimiento_pai.id_seguimiento_pai,
        nombre_programa: seguimiento_pai.nombre_programa,
        nombre_proyecto: seguimiento_pai.nombre_proyecto,
        nombre_producto: seguimiento_pai.nombre_producto,
        nombre_actividad: seguimiento_pai.nombre_actividad,
        nombre_unidad: seguimiento_pai.nombre_unidad,
        nombre_indicador: seguimiento_pai.nombre_indicador,
        nombre_meta: seguimiento_pai.nombre_meta,
        razagada: seguimiento_pai.razagada,
        mes: seguimiento_pai.mes,
        porcentaje_avance: seguimiento_pai.porcentaje_avance,
        fecha_registro_avance: seguimiento_pai.fecha_registro_avance,
        entrega_vigencia: seguimiento_pai.entrega_vigencia,
        hizo: seguimiento_pai.hizo,
        cuando: seguimiento_pai.cuando,
        donde: seguimiento_pai.donde,
        resultado: seguimiento_pai.resultado,
        participacion: seguimiento_pai.participacion,
        beneficiarios: seguimiento_pai.beneficiarios,
        compromisos: seguimiento_pai.compromisos,
        contratros: seguimiento_pai.contratros,
        adelanto: seguimiento_pai.adelanto,
        fecha_creacion: seguimiento_pai.fecha_creacion,
        id_unidad_organizacional: seguimiento_pai.id_unidad_organizacional,
        id_programa: seguimiento_pai.id_programa,
        id_proyecto: seguimiento_pai.id_proyecto,
        id_producto: seguimiento_pai.id_producto,
        id_actividad: seguimiento_pai.id_actividad,
        id_indicador: seguimiento_pai.id_indicador,
        id_meta: seguimiento_pai.id_meta,
      });
    }
  }, [
    mode,
    seguimiento_pai,
    // id_programa,
    // id_proyecto,
    // id_producto,
    // id_indicador,
  ]);

  const porcentaje_avance = Number(
    data_watch_seguimiento_pai.porcentaje_avance
  );
  const isGuardarDisabled = porcentaje_avance > 100;

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (mode.crear) {
            onsubmit_seguimiento_pai();
          }
          if (mode.editar) {
            onsubmit_editar();
          }
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
            <Title title="Registro Seguimiento Técnico PAI" />
          </Grid>
          {mode.editar ? (
            <>
              {/* <Grid item xs={12} sm={6}>
                <Controller
                  name="nombre_sector"
                  control={control_seguimiento_pai}
                  rules={{ required: false }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      size="small"
                      label="Nombre del sector"
                      variant="outlined"
                      multiline
                      value={value}
                      disabled={true}
                      required={true}
                      onChange={onChange}
                    />
                  )}
                />
              </Grid> */}
            </>
          ) : null}
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold">
              Información Básica
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Controller
              name="id_unidad_organizacional"
              control={control_seguimiento_pai}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  size="small"
                  margin="dense"
                  disabled={false}
                  fullWidth
                  required
                  error={!!errors_seguimiento_pai.id_unidad_organizacional}
                  helperText={
                    errors_seguimiento_pai?.id_unidad_organizacional?.type ===
                    'required'
                      ? 'Este campo es obligatorio'
                      : 'ingrese grupo'
                  }
                >
                  {unidad_organizacional_selected.map((option) => (
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
              name="id_programa"
              control={control_seguimiento_pai}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  size="small"
                  margin="dense"
                  disabled={false}
                  fullWidth
                  required
                  error={!!errors_seguimiento_pai.id_programa}
                  helperText={
                    errors_seguimiento_pai?.id_programa?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : 'ingrese el programa'
                  }
                  onChange={(event) => {
                    field.onChange(event);
                    set_id_programa(Number(event.target.value));
                    console.log(event.target.value, 'id_programa');
                  }}
                >
                  {programas_selected.map((option) => (
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
              name="id_proyecto"
              control={control_seguimiento_pai}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  size="small"
                  margin="dense"
                  disabled={id_programa ? false : true}
                  fullWidth
                  required
                  error={!!errors_seguimiento_pai.id_proyecto}
                  helperText={
                    errors_seguimiento_pai?.id_proyecto?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : 'ingrese el proyecto'
                  }
                  onChange={(event) => {
                    field.onChange(event);
                    set_id_proyecto(Number(event.target.value));
                    console.log(event.target.value, 'id_proyecto');
                  }}
                >
                  {proyectos_selected.map((option) => (
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
              name="id_producto"
              control={control_seguimiento_pai}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  size="small"
                  margin="dense"
                  disabled={id_proyecto ? false : true}
                  fullWidth
                  required
                  error={!!errors_seguimiento_pai.id_producto}
                  helperText={
                    errors_seguimiento_pai?.id_producto?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : 'ingrese el producto'
                  }
                  onChange={(event) => {
                    field.onChange(event);
                    set_id_producto(Number(event.target.value));
                    console.log(event.target.value, 'id_producto');
                  }}
                >
                  {productos_selected.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Controller
              name="id_actividad"
              control={control_seguimiento_pai}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  size="small"
                  margin="dense"
                  disabled={id_producto ? false : true}
                  fullWidth
                  required
                  error={!!errors_seguimiento_pai.id_actividad}
                  helperText={
                    errors_seguimiento_pai?.id_actividad?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : 'ingrese la actividad'
                  }
                >
                  {actividades_selected.map((option) => (
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
              name="id_indicador"
              control={control_seguimiento_pai}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  size="small"
                  margin="dense"
                  disabled={false}
                  fullWidth
                  required
                  error={!!errors_seguimiento_pai.id_indicador}
                  helperText={
                    errors_seguimiento_pai?.id_indicador?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : 'ingrese un indicador'
                  }
                >
                  {indicadores_selected.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          <Grid
            sx={{
              marginBottom: '10px',
              width: 'auto',
            }}
            item
            xs={12}
            sm={6}
            md={4}
          >
            <Controller
              name="razagada"
              control={control_seguimiento_pai}
              // defaultValue=""
              rules={{
                required: data_watch_seguimiento_pai.implementar
                  ? 'Este campo es requerido'
                  : false,
              }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <FormControl>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={value}
                        onChange={(e) => {
                          onChange(e.target.checked);
                        }}
                        // name="checkedB"
                        color="primary"
                      />
                    }
                    label={
                      value ? (
                        <Typography variant="body2">
                          <strong>Rezagada</strong>
                          <Tooltip title="SI" placement="right">
                            <InfoIcon
                              sx={{
                                width: '1.2rem',
                                height: '1.2rem',
                                ml: '0.5rem',
                                color: 'green',
                              }}
                            />
                          </Tooltip>
                        </Typography>
                      ) : (
                        <Typography variant="body2">
                          <strong>No Rezagada</strong>
                          <Tooltip title="No" placement="right">
                            <InfoIcon
                              sx={{
                                width: '1.2rem',
                                height: '1.2rem',
                                ml: '0.5rem',
                                color: 'orange',
                              }}
                            />
                          </Tooltip>
                        </Typography>
                      )
                    }
                  />
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Controller
              name="id_meta"
              control={control_seguimiento_pai}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  size="small"
                  margin="dense"
                  disabled={false}
                  fullWidth
                  required
                  error={!!errors_seguimiento_pai.id_meta}
                  helperText={
                    errors_seguimiento_pai?.id_meta?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : 'ingrese una meta'
                  }
                >
                  {metas_selected.map((option) => (
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
              name="mes"
              control={control_seguimiento_pai}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Mes"
                  size="small"
                  margin="dense"
                  select
                  fullWidth
                  required={true}
                  error={!!errors_seguimiento_pai.mes}
                  helperText={
                    errors_seguimiento_pai.mes
                      ? 'Es obligatorio ingresar mes'
                      : 'Ingrese un  mes'
                  }
                >
                  {meses_selected.map((option) => (
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
              name="porcentaje_avance"
              control={control_seguimiento_pai}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  label="Porcentaje de avance"
                  variant="outlined"
                  value={value}
                  disabled={false}
                  required={true}
                  onChange={onChange}
                  error={!!errors_seguimiento_pai.porcentaje_avance}
                  helperText={
                    errors_seguimiento_pai.porcentaje_avance
                      ? 'Es obligatorio ingresar un porcentaje de avance'
                      : 'Ingrese un porcentaje de avance'
                  }
                  prefix="%"
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Fecha registro de avance"
                value={mode.crear ? currentDate : fecha_registro_avance}
                onChange={(value) => {
                  handle_date_change(value);
                }}
                disabled={true}
                renderInput={(params: any) => (
                  <TextField
                    {...params}
                    fullWidth
                    size="small"
                    disabled={true}
                    {...register_seguimiento_pai('fecha_registro_avance', {
                      required: false,
                    })}
                    // error={!!errors_seguimiento_pai.fecha_registro_avance}
                    // helperText={
                    //   errors_seguimiento_pai.fecha_registro_avance
                    //     ? 'Es obligatorio la fecha de registro de avance'
                    //     : 'Ingrese la fecha de registro de avance'
                    // }
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          {isGuardarDisabled ? (
            <Grid item xs={12}>
              <Grid container justifyContent="center" textAlign="center">
                <Alert icon={false} severity="error">
                  <Typography>
                    El procentaje de avance no puede ser mayor a 100
                  </Typography>
                </Alert>
              </Grid>
            </Grid>
          ) : null}
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold">
              Preguntas
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="entrega_vigencia"
              control={control_seguimiento_pai}
              rules={{ required: false }}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="Entregable vigencia"
                  variant="outlined"
                  multiline
                  value={value}
                  disabled={false}
                  required={false}
                  onChange={onChange}
                  // error={!!errors_seguimiento_pai.entrega_vigencia}
                  // helperText={
                  //   errors_seguimiento_pai.entrega_vigencia
                  //     ? 'Es obligatorio ingresar información de entrega de vigencia'
                  //     : 'Ingrese información de entrega de vigencia'
                  // }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="hizo"
              control={control_seguimiento_pai}
              rules={{ required: false }}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="¿Qué se hizo?"
                  variant="outlined"
                  multiline
                  value={value}
                  disabled={false}
                  required={false}
                  onChange={onChange}
                  // error={!!errors_seguimiento_pai.hizo}
                  // helperText={
                  //   errors_seguimiento_pai.hizo
                  //     ? 'Es obligatorio ingresar sobre que se hizo'
                  //     : 'Ingrese información sobre que se hizo'
                  // }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="cuando"
              control={control_seguimiento_pai}
              rules={{ required: false }}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="¿Cuándo?"
                  variant="outlined"
                  multiline
                  value={value}
                  disabled={false}
                  required={false}
                  onChange={onChange}
                  // error={!!errors_seguimiento_pai.cuando}
                  // helperText={
                  //   errors_seguimiento_pai.cuando
                  //     ? 'Es obligatorio ingresar cuando'
                  //     : 'Ingrese cuando'
                  // }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="donde"
              control={control_seguimiento_pai}
              rules={{ required: false }}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="¿Dónde? Municipios"
                  variant="outlined"
                  multiline
                  value={value}
                  disabled={false}
                  required={false}
                  onChange={onChange}
                  // error={!!errors_seguimiento_pai.donde}
                  // helperText={
                  //   errors_seguimiento_pai.donde
                  //     ? 'Es obligatorio ingresar donde'
                  //     : 'Ingrese donde'
                  // }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="adelanto"
              control={control_seguimiento_pai}
              rules={{ required: false }}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="¿Cómo lo adelantó de forma breve y concreta?"
                  variant="outlined"
                  multiline
                  value={value}
                  disabled={false}
                  required={false}
                  onChange={onChange}
                  // error={!!errors_seguimiento_pai.adelanto}
                  // helperText={
                  //   errors_seguimiento_pai.adelanto
                  //     ? 'Es obligatorio ingresar adelanto'
                  //     : 'Ingrese adelanto'
                  // }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="resultado"
              control={control_seguimiento_pai}
              rules={{ required: false }}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="Resultado o conclusión"
                  variant="outlined"
                  multiline
                  value={value}
                  disabled={false}
                  required={false}
                  onChange={onChange}
                  // error={!!errors_seguimiento_pai.resultado}
                  // helperText={
                  //   errors_seguimiento_pai.resultado
                  //     ? 'Es obligatorio ingresar resultado'
                  //     : 'Ingrese resultado'
                  // }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="participacion"
              control={control_seguimiento_pai}
              rules={{ required: false }}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="Participación de otras instituciones"
                  variant="outlined"
                  multiline
                  value={value}
                  disabled={false}
                  required={false}
                  onChange={onChange}
                  // error={!!errors_seguimiento_pai.participacion}
                  // helperText={
                  //   errors_seguimiento_pai.participacion
                  //     ? 'Es obligatorio ingresar participacion'
                  //     : 'Ingrese participacion'
                  // }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="beneficiarios"
              control={control_seguimiento_pai}
              rules={{ required: false }}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="Beneficiarios"
                  variant="outlined"
                  multiline
                  value={value}
                  disabled={false}
                  required={false}
                  onChange={onChange}
                  // error={!!errors_seguimiento_pai.beneficiarios}
                  // helperText={
                  //   errors_seguimiento_pai.beneficiarios
                  //     ? 'Es obligatorio ingresar beneficiarios'
                  //     : 'Ingrese beneficiarios'
                  // }
                />
              )}
            />
          </Grid>{' '}
          <Grid item xs={12} sm={6}>
            <Controller
              name="compromisos"
              control={control_seguimiento_pai}
              rules={{ required: false }}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="Compromisos u Observaciones adicionales"
                  variant="outlined"
                  multiline
                  value={value}
                  disabled={false}
                  required={false}
                  onChange={onChange}
                  // error={!!errors_seguimiento_pai.compromisos}
                  // helperText={
                  //   errors_seguimiento_pai.compromisos
                  //     ? 'Es obligatorio ingresar compromisos'
                  //     : 'Ingrese compromisos'
                  // }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="contratros"
              control={control_seguimiento_pai}
              rules={{ required: false }}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="Contratos o convenios celebrados en el desarrollo de la acción operativa"
                  variant="outlined"
                  multiline
                  value={value}
                  disabled={false}
                  required={false}
                  onChange={onChange}
                  // error={!!errors_seguimiento_pai.contratros}
                  // helperText={
                  //   errors_seguimiento_pai.contratros
                  //     ? 'Es obligatorio ingresar contratros'
                  //     : 'Ingrese contratros'
                  // }
                />
              )}
            />
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Fecha de creación del PAI"
                value={fecha_creacion_pai}
                onChange={(value) => {
                  handle_date_creacion_change('fecha_crea', value);
                }}
                renderInput={(params: any) => (
                  <TextField
                    {...params}
                    fullWidth
                    size="small"
                    {...register_seguimiento_pai('fecha_creacion', {
                      required: true,
                    })}
                    error={!!errors_seguimiento_pai.fecha_creacion}
                    helperText={
                      errors_seguimiento_pai.fecha_creacion
                        ? 'Es obligatorio la fecha de creación del PAI'
                        : 'Ingrese la fecha de creación del PAI'
                    }
                  />
                )}
              />
            </LocalizationProvider>
          </Grid> */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold">
              Documentos Anexos
            </Typography>
            <Divider />
          </Grid>
          <FileDocs multiple={true} />
          {mode.editar ? (
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" fontWeight="bold">
                Anexos asociados:
              </Typography>
              <Divider />
              <DataGrid
                autoHeight
                rows={rows_anexos ?? []}
                columns={columns_anexos ?? []}
                getRowId={(row) => uuidv4()}
                pageSize={10}
                rowsPerPageOptions={[10]}
              />
            </Grid>
          ) : null}
          <Grid item xs={12}></Grid>
          <Grid container spacing={2} justifyContent="flex-end">
            <Grid item>
              <Button
                variant="outlined"
                color="warning"
                disabled={false}
                onClick={() => {
                  limpiar_formulario_seguimiento_pai();
                  dispatch(
                    set_current_mode_planes({
                      ver: true,
                      crear: true,
                      editar: false,
                    })
                  );
                }}
              >
                Limpiar
              </Button>
            </Grid>
            <Grid item>
              <LoadingButton
                variant="contained"
                color="success"
                type="submit"
                disabled={is_savingd_seguimiento_pai}
                startIcon={<SaveIcon />}
                loading={is_savingd_seguimiento_pai}
              >
                {mode.editar ? 'Actualizar' : 'Guardar'}
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
