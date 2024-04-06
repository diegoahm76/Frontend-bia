import { useState, useEffect } from 'react';
import { type Dispatch, type SetStateAction } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Typography,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  // DialogTitle,
  Stack,
  Button,
  Box,
  Divider,
  MenuItem,
  Grid,
  Chip,
} from '@mui/material';
import { Title } from '../../../../components/Title';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';

import {
  add_nursery_service,
  edit_nursery_service,
  get_viverista_id_service,
} from '../store/thunks/gestorViveroThunks';
import { set_current_nursery } from '../store/slice/viveroSlice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { type IObjNursery as FormValues } from '../interfaces/vivero';
import { api } from '../../../../api/axios';
import type { IList } from '../../../../interfaces/globalModels';
import { get_ciudades } from '../../../../request/getRequest';
import { control_error } from '../../solicitudMaterial/store/thunks/solicitudViveroThunks';
import FormInputFileController from '../../../../components/partials/form/FormInputFileController';
import ViveristaActual from './ViveristaActual';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import BusinessIcon from '@mui/icons-material/Business';
import DomainDisabledIcon from '@mui/icons-material/DomainDisabled';
interface IProps {
  action: string;
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const CrearViveroDialogForm = ({
  action,
  is_modal_active,
  set_is_modal_active,
}: IProps) => {
  const initial_options: IList[] = [
    {
      label: '',
      value: '',
    },
  ];
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [municipalities, set_municipalities] =
    useState<IList[]>(initial_options);
  const [nursery_types, set_nursery_types] = useState(initial_options);
  const [source_resources, set_source_resources] = useState(initial_options);
  const [file, set_file] = useState<any>(null);
  const [file_name, set_file_name] = useState<string>('');

  const { current_nursery } = useAppSelector((state) => state.nursery);

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const {
    control: control_vivero,
    handleSubmit: handle_submit,
    reset: reset_nursery,
    getValues: get_values,
  } = useForm<FormValues>();

  const handle_close_add_nursery = (): void => {
    set_is_modal_active(false);
  };
  useEffect(() => {
    reset_nursery(current_nursery);
    if (current_nursery.id_vivero !== null) {
      if (current_nursery.ruta_archivo_creacion !== null) {
        if (typeof current_nursery.ruta_archivo_creacion === 'string') {
          const name =
            current_nursery.ruta_archivo_creacion?.split('/').pop() ?? '';
          set_file_name(name);
        }
        if (current_nursery.id_viverista_actual !== null) {
          void dispatch(
            get_viverista_id_service(Number(current_nursery.id_vivero ?? 0))
          );
        }
      }
    } else {
      set_file_name('');
    }
  }, [current_nursery]);

  useEffect(() => {
    if (file !== null) {
      if ('name' in file) {
        //  console.log('')(file.name);
        set_file_name(file.name);
        dispatch(
          set_current_nursery({
            ...current_nursery,
            nombre: get_values('nombre'),
            cod_municipio: get_values('cod_municipio'),
            direccion: get_values('direccion'),
            area_mt2: get_values('area_mt2'),
            coordenadas_lat: get_values('coordenadas_lat'),
            coordenadas_lon: get_values('coordenadas_lon'),
            tiene_area_produccion: get_values('tiene_area_produccion'),
            tiene_areas_pep_sustrato: get_values('tiene_areas_pep_sustrato'),
            tiene_area_embolsado: get_values('tiene_area_embolsado'),
            cod_tipo_vivero: get_values('cod_tipo_vivero'),
            cod_origen_recursos_vivero: get_values(
              'cod_origen_recursos_vivero'
            ),
            ruta_archivo_creacion: file,
          })
        );
      }
    }
  }, [file]);

  const on_submit = (data: FormValues): void => {
    //  console.log('')(file);
    data.ruta_archivo_creacion = file;
    const form_data: any = new FormData();
    form_data.append('nombre', data.nombre);
    form_data.append('cod_municipio', data.cod_municipio);
    form_data.append('direccion', data.direccion);
    form_data.append('area_mt2', data.area_mt2);
    form_data.append('coordenadas_lat', data.coordenadas_lat);
    form_data.append('coordenadas_lon', data.coordenadas_lon);
    form_data.append('area_propagacion_mt2', data.area_propagacion_mt2);
    form_data.append('tiene_area_produccion', data.tiene_area_produccion);
    form_data.append('tiene_areas_pep_sustrato', data.tiene_areas_pep_sustrato);
    form_data.append('tiene_area_embolsado', data.tiene_area_embolsado);
    form_data.append('cod_tipo_vivero', data.cod_tipo_vivero);
    form_data.append(
      'cod_origen_recursos_vivero',
      data.cod_origen_recursos_vivero
    );
    form_data.append('ruta_archivo_creacion', file === null ? '' : file);
    void dispatch(add_nursery_service(form_data, navigate));
    handle_close_add_nursery();
  };
  const on_submit_edit = (data: FormValues): void => {
    const form_data: any = new FormData();

    form_data.append('area_mt2', data.area_mt2);
    form_data.append('coordenadas_lat', data.coordenadas_lat);
    form_data.append('coordenadas_lon', data.coordenadas_lon);
    form_data.append('area_propagacion_mt2', data.area_propagacion_mt2);
    form_data.append('tiene_area_produccion', data.tiene_area_produccion);
    form_data.append('tiene_areas_pep_sustrato', data.tiene_areas_pep_sustrato);
    form_data.append('tiene_area_embolsado', data.tiene_area_embolsado);
    form_data.append('cod_tipo_vivero', data.cod_tipo_vivero);
    form_data.append(
      'cod_origen_recursos_vivero',
      data.cod_origen_recursos_vivero
    );

    void dispatch(
      edit_nursery_service(form_data, current_nursery.id_vivero, navigate)
    );
    handle_close_add_nursery();
  };

  const get_numicipalities = async (): Promise<void> => {
    try {
      const {
        data: { data: municipios },
      } = await get_ciudades('50');
      set_municipalities(municipios);
    } catch (err) {
      control_error('Error encontrando municipios');
    }
  };
  const text_choise_adapter: any = (dataArray: string[]) => {
    const data_new_format: IList[] = dataArray.map((dataOld) => ({
      label: dataOld[1],
      value: dataOld[0],
    }));
    return data_new_format;
  };

  useEffect(() => {
    const get_selects_options: any = async () => {
      try {
        const { data: nursery_types_no_format } = await api.get(
          'conservacion/choices/tipo-vivero/'
        );
        const { data: source_resources_no_format } = await api.get(
          'conservacion/choices/origen-recursos-vivero/'
        );

        const nursery_types_format = text_choise_adapter(
          nursery_types_no_format
        );
        const source_resources_format = text_choise_adapter(
          source_resources_no_format
        );
        set_source_resources(source_resources_format);
        set_nursery_types(nursery_types_format);
        // const meta: IList[] = [];
        // municipalities_format.map(({ label, value }) => {
        //     const num = Number(value);

        //     if (num >= 50000 && num <= 51000) {
        //         meta.push({ label, value } as IList);
        //     }
        // });
        void get_numicipalities();
      } catch (err) {
        //  console.log('')(err);
      }
    };
    void get_selects_options();
  }, []);

  return (
    <Dialog
      maxWidth="xl"
      open={is_modal_active}
      onClose={handle_close_add_nursery}
    >
      <Box
        component="form"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={
          action === 'create'
            ? handle_submit(on_submit)
            : handle_submit(on_submit_edit)
        }
      >
        {/* <DialogTitle>
          {action === 'create'
            ? 'Crear vivero'
            : action === 'detail'
            ? 'Detalle de vivero'
            : 'Editar vivero'}
        </DialogTitle> */}
        <Divider />

        <DialogContent sx={{ mb: '0px' }}>
          <Grid>
            <Typography variant="h5" fontWeight="bold">
              Administración de viveros
            </Typography>
          </Grid>
          <Grid container>
            <Title title="Información principal"></Title>
            <Grid container marginTop={3} spacing={1}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="nombre"
                  control={control_vivero}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      autoFocus
                      margin="dense"
                      fullWidth
                      size="small"
                      label="Nombre"
                      variant="outlined"
                      disabled={action !== 'create'}
                      value={value}
                      onChange={onChange}
                      error={!(error == null)}
                      helperText={
                        error != null
                          ? 'Es obligatorio ingresar un nombre'
                          : 'Ingrese el nombre'
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="cod_municipio"
                  control={control_vivero}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      margin="dense"
                      fullWidth
                      select
                      size="small"
                      label="Municipio"
                      variant="outlined"
                      disabled={action !== 'create'}
                      defaultValue={value}
                      value={value}
                      onChange={onChange}
                      error={!(error == null)}
                      helperText={
                        error != null
                          ? 'Es obligatorio seleccionar municipio'
                          : 'Seleccione municipio'
                      }
                    >
                      {municipalities.map((option: IList) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="direccion"
                  control={control_vivero}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      autoFocus
                      margin="dense"
                      fullWidth
                      size="small"
                      label="Dirección"
                      variant="outlined"
                      disabled={action !== 'create'}
                      value={value}
                      onChange={onChange}
                      error={!(error == null)}
                      helperText={
                        error != null
                          ? 'Es obligatorio ingresar una dirección'
                          : 'Ingrese dirección'
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="area_mt2"
                  control={control_vivero}
                  defaultValue={0}
                  rules={{
                    required: true,
                    min: get_values('area_propagacion_mt2') ?? '',
                  }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      autoFocus
                      margin="dense"
                      fullWidth
                      size="small"
                      label="Área m2"
                      variant="outlined"
                      type="number"
                      disabled={action === 'detail'}
                      value={value}
                      onChange={onChange}
                      error={!(error == null)}
                      helperText={
                        error != null
                          ? error.type === 'required'
                            ? 'El área es requerida'
                            : `El valor del área debe ser mayor al área de propagación (${
                                get_values('area_propagacion_mt2') ?? ''
                              })`
                          : 'Ingrese área'
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="cod_tipo_vivero"
                  control={control_vivero}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      margin="dense"
                      fullWidth
                      select
                      size="small"
                      label="Tipo de vivero"
                      variant="outlined"
                      disabled={action === 'detail'}
                      defaultValue={value}
                      value={value}
                      onChange={onChange}
                      error={!(error == null)}
                      helperText={
                        error != null
                          ? 'Es obligatorio seleccionar el tipo de vivero'
                          : 'Seleccione tipo vivero'
                      }
                    >
                      {nursery_types.map((option: IList) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Controller
                  name="coordenadas_lat"
                  control={control_vivero}
                  rules={{
                    required: true,
                  }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      autoFocus
                      margin="dense"
                      fullWidth
                      size="small"
                      label="Latitud"
                      variant="outlined"
                      type="number"
                      disabled={action === 'detail'}
                      value={value}
                      onChange={onChange}
                      error={!(error == null)}
                      helperText={
                        error != null
                          ? error.type === 'required'
                            ? 'La latitud es requerida'
                            : ''
                          : 'Ingrese latitud'
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Controller
                  name="coordenadas_lon"
                  control={control_vivero}
                  rules={{
                    required: true,
                  }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      autoFocus
                      margin="dense"
                      fullWidth
                      size="small"
                      label="Lóngitud"
                      variant="outlined"
                      type="number"
                      disabled={action === 'detail'}
                      value={value}
                      onChange={onChange}
                      error={!(error == null)}
                      helperText={
                        error != null
                          ? error.type === 'required'
                            ? 'La lóngitud es requerida'
                            : ''
                          : 'Ingrese lóngitud'
                      }
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid container>
            <Title title="Detalles vivero"></Title>

            <Grid container marginTop={3} spacing={1}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="area_propagacion_mt2"
                  control={control_vivero}
                  defaultValue={0}
                  rules={{ required: true, max: get_values('area_mt2') ?? '' }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      autoFocus
                      margin="dense"
                      fullWidth
                      size="small"
                      label="Area propagación m2"
                      variant="outlined"
                      type="number"
                      disabled={action === 'detail'}
                      value={value}
                      onChange={onChange}
                      error={!(error == null)}
                      helperText={
                        error != null
                          ? error.type === 'required'
                            ? 'El área de propagación es requerida'
                            : `El valor del área de propagación debe ser menor al área total (${
                                get_values('area_mt2') ?? ''
                              })`
                          : 'Ingrese área'
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="tiene_area_produccion"
                  control={control_vivero}
                  defaultValue={true}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      autoFocus
                      margin="dense"
                      fullWidth
                      select
                      size="small"
                      label="¿Tiene area de producción?"
                      variant="outlined"
                      disabled={action === 'detail'}
                      defaultValue={value}
                      value={value}
                      onChange={onChange}
                      error={!(error == null)}
                      helperText={
                        error != null
                          ? 'Es obligatorio seleccionar una opción'
                          : 'Seleccionar opción'
                      }
                    >
                      <MenuItem value="true">SI</MenuItem>
                      <MenuItem value="false">NO</MenuItem>
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="tiene_areas_pep_sustrato"
                  control={control_vivero}
                  defaultValue={true}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      autoFocus
                      margin="dense"
                      fullWidth
                      select
                      size="small"
                      label="¿Tiene área preparación de sustrato?"
                      variant="outlined"
                      disabled={action === 'detail'}
                      defaultValue={value}
                      value={value}
                      onChange={onChange}
                      error={!(error == null)}
                      helperText={
                        error != null
                          ? 'Es obligatorio seleccionar una opción'
                          : 'Seleccionar opción'
                      }
                    >
                      <MenuItem value="true">SI</MenuItem>
                      <MenuItem value="false">NO</MenuItem>
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="tiene_area_embolsado"
                  control={control_vivero}
                  defaultValue={true}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      autoFocus
                      margin="dense"
                      fullWidth
                      select
                      size="small"
                      label="¿Tiene área de embolsado?"
                      variant="outlined"
                      disabled={action === 'detail'}
                      defaultValue={value}
                      value={value}
                      onChange={onChange}
                      error={!(error == null)}
                      helperText={
                        error != null
                          ? 'Es obligatorio seleccionar una opción'
                          : 'Seleccionar opción'
                      }
                    >
                      <MenuItem value="true">SI</MenuItem>
                      <MenuItem value="false">NO</MenuItem>
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="cod_origen_recursos_vivero"
                  control={control_vivero}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      margin="dense"
                      fullWidth
                      select
                      size="small"
                      label="¿Vivero creado por medio de ?"
                      variant="outlined"
                      disabled={action === 'detail'}
                      defaultValue={value}
                      value={value}
                      onChange={onChange}
                      error={!(error == null)}
                      helperText={
                        error != null
                          ? 'Es obligatorio seleccionar origen de recursos'
                          : 'Elija origen recurso'
                      }
                    >
                      {source_resources.map((option: IList) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>

              <FormInputFileController
                xs={12}
                md={6}
                control_form={control_vivero}
                control_name="ruta_archivo_creacion"
                default_value=""
                rules={{
                  required_rule: { rule: true, message: 'Archivo requerido' },
                }}
                label="Archivo de soporte"
                disabled={action !== 'create'}
                helper_text=""
                set_value={set_file}
                hidden_text={action === 'edit'}
                file_name={file_name}
                value_file={current_nursery.ruta_archivo_creacion}
              />
            </Grid>
          </Grid>

          <Grid container marginTop={3}>
            {current_nursery.id_viverista_actual !== null &&
              current_nursery.activo === true && <ViveristaActual />}
          </Grid>

          <Grid item xs={12} marginY={2} align-items="center">
            {current_nursery.vivero_en_cuarentena === true ? (
              <Chip
                label={
                  <>
                    El vivero se encuentra en cuarentena desde el dia{' '}
                    {String(current_nursery.fecha_inicio_cuarentena).slice(
                      0,
                      10
                    )}{' '}
                    <a
                      href={`#/app/conservacion/gestor_vivero/cuarentena_detalle/${
                        current_nursery.id_vivero ?? ''
                      }/`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      más información
                    </a>
                  </>
                }
                color="error"
                variant="outlined"
              />
            ) : current_nursery.en_funcionamiento !== true ? (
              current_nursery.id_viverista_actual === null ? (
                <Chip
                  label={`El vivero no tiene viverista asignado`}
                  color="error"
                  variant="outlined"
                />
              ) : (
                <Chip
                  label={
                    current_nursery.fecha_cierre_actual === null ? (
                      'El vivero nunca ha sido abierto'
                    ) : (
                      <>
                        El vivero se encuentra cerrado desde el dia{' '}
                        {String(current_nursery.fecha_cierre_actual).slice(
                          0,
                          10
                        )}{' '}
                        <a
                          href={`#/app/conservacion/gestor_vivero/apertura_cierre_detalle/${
                            current_nursery.id_vivero ?? ''
                          }/`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          más información
                        </a>
                      </>
                    )
                  }
                  color="error"
                  variant="outlined"
                />
              )
            ) : (
              <Chip
                label={`El vivero se encuentra abierto y en normalidad desde el
                      dia ${String(current_nursery.fecha_ultima_apertura).slice(
                        0,
                        10
                      )}
                      `}
                color="success"
                variant="outlined"
              />
            )}
          </Grid>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Stack
            direction="row"
            spacing={2}
            sx={{ mr: '15px', mb: '10px', mt: '10px' }}
          >
            <Button
              variant="contained"
              color="error"
              onClick={handle_close_add_nursery}
              startIcon={<CloseIcon />}
            >
              CERRAR
            </Button>

            {current_nursery.activo === true &&
              current_nursery.id_viverista_actual !== null && (
                <>
                  {current_nursery.vivero_en_cuarentena !== true && (
                    <Button
                      variant="contained"
                      href={`#/app/conservacion/gestor_vivero/apertura_cierre/${
                        current_nursery.id_vivero ?? ''
                      }/`}
                      color={
                        current_nursery.en_funcionamiento === true
                          ? 'warning'
                          : 'primary'
                      }
                      onClick={handle_close_add_nursery}
                      startIcon={
                        current_nursery.en_funcionamiento === true ? (
                          <LockIcon />
                        ) : (
                          <LockOpenIcon />
                        )
                      }
                    >
                      {current_nursery.en_funcionamiento === true
                        ? 'Cerrar vivero'
                        : 'Abrir vivero'}
                    </Button>
                  )}
                  {(current_nursery.fecha_ultima_apertura !== null ||
                    current_nursery.fecha_ultima_apertura !== '') &&
                    (current_nursery.en_funcionamiento === true ||
                      current_nursery.vivero_en_cuarentena === true) && (
                      <Button
                        variant="contained"
                        href={`#/app/conservacion/gestor_vivero/cuarentena/${
                          current_nursery.id_vivero ?? ''
                        }/`}
                        color={
                          current_nursery.vivero_en_cuarentena === true
                            ? 'success'
                            : 'error'
                        }
                        onClick={handle_close_add_nursery}
                        startIcon={
                          current_nursery.vivero_en_cuarentena === true ? (
                            <BusinessIcon />
                          ) : (
                            <DomainDisabledIcon />
                          )
                        }
                      >
                        {current_nursery.vivero_en_cuarentena === true
                          ? 'Quitar cuarentena'
                          : 'Poner cuarentena'}
                      </Button>
                    )}
                </>
              )}
            {action === 'create' ? (
              <Button
                type="submit"
                color="success"
                variant="contained"
                startIcon={<SaveIcon />}
              >
                GUARDAR
              </Button>
            ) : action === 'edit' ? (
              <Button
                type="submit"
                variant="contained"
                startIcon={<EditIcon />}
              >
                EDITAR
              </Button>
            ) : null}
          </Stack>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default CrearViveroDialogForm;
