import { useState, useEffect } from 'react';
import { type Dispatch, type SetStateAction } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
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
import {
  set_current_nursery
} from '../store/slice/viveroSlice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { type IObjNursery as FormValues } from '../interfaces/vivero';
import { api } from '../../../../api/axios';
import type { IList } from '../../../../interfaces/globalModels';
import { get_ciudades } from "../../../../request/getRequest";
import { control_error } from '../../solicitudMaterial/store/thunks/solicitudViveroThunks';
import FormInputFileController from '../../../../components/partials/form/FormInputFileController';
import ViveristaActual from './ViveristaActual';

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
  const [file_name, set_file_name] = useState<string>("");

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
        set_file_name(String(current_nursery.ruta_archivo_creacion))
        if(current_nursery.id_viverista_actual !== null){
          void dispatch(get_viverista_id_service(Number(current_nursery.id_vivero ?? 0))) 
        }
      }
    }
  }, [current_nursery]);


  useEffect(() => {
    if (file !== null) {
      if ('name' in file) {
        console.log(file.name)
        set_file_name(file.name)
        dispatch(set_current_nursery({ 
          ...current_nursery, 
          nombre: get_values("nombre"),
          cod_municipio: get_values("cod_municipio"),
          direccion: get_values("direccion"),
          area_mt2: get_values("area_mt2"),
          area_propagacion_mt2: get_values("area_propagacion_mt2"),
          tiene_area_produccion: get_values("tiene_area_produccion"),
          tiene_areas_pep_sustrato: get_values("tiene_areas_pep_sustrato"),
          tiene_area_embolsado: get_values("tiene_area_embolsado"),
          cod_tipo_vivero: get_values("cod_tipo_vivero"),
          cod_origen_recursos_vivero: get_values("cod_origen_recursos_vivero"),
          ruta_archivo_creacion: file
        }))
      }
    }
  }, [file]);

  const on_submit = (data: FormValues): void => {
    console.log(file);
    data.ruta_archivo_creacion = file;
    const form_data: any = new FormData();
    form_data.append('nombre', data.nombre);
    form_data.append('cod_municipio', data.cod_municipio);
    form_data.append('direccion', data.direccion);
    form_data.append('area_mt2', data.area_mt2);
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
        data: { data: municipios }
      } = await get_ciudades("50");
      set_municipalities(municipios);
    } catch (err) {
      control_error("error encontrando municipios");
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
        console.log(err);
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
            ? 'Detalle vivero'
            : 'Editar vivero'}
        </DialogTitle> */}
        <Divider />
        <DialogContent sx={{ mb: '0px' }}>
        <Grid container    sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
          marginLeft: '-6px',
          marginTop: '-6px',
        }} spacing={2}>
            <Title title="Informacion pricipal"></Title>
            <Grid item xs={11} md={5} margin={0}>
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
                        : 'Ingrese nombre'
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={11} md={5} margin={1}>
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
            <Grid item xs={11} md={5} margin={1}>
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
            <Grid item xs={11} md={5} margin={1}>
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
                    margin="dense"
                    fullWidth
                    size="small"
                    label="Area m2"
                    variant="outlined"
                    type="number"
                    disabled={action === 'detail'}
                    value={value}
                    onChange={onChange}
                    error={!(error == null)}
                    helperText={
                      error != null
                        ? error.type === 'required'
                          ? 'El area es requerida'
                          : `El valor del area debe ser mayor al area de propagacion (${
                              get_values('area_propagacion_mt2') ?? ''
                            })`
                        : 'Ingrese area'
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={11} md={5} margin={1}>
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
                    label="Tipo vivero"
                    variant="outlined"
                    disabled={action === 'detail'}
                    defaultValue={value}
                    value={value}
                    onChange={onChange}
                    error={!(error == null)}
                    helperText={
                      error != null
                        ? 'Es obligatorio seleccionar tipo de vivero'
                        : 'seleccione tipo vivero'
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
            <Title title="Detalles vivero"></Title>

            <Grid item xs={11} md={5} margin={0}>
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
                    margin="dense"
                    fullWidth
                    size="small"
                    label="Area propagacion m2"
                    variant="outlined"
                    type="number"
                    disabled={action === 'detail'}
                    value={value}
                    onChange={onChange}
                    error={!(error == null)}
                    helperText={
                      error != null
                        ? error.type === 'required'
                          ? 'El area de propagacion es requerida'
                          : `El valor del área de propagación debe ser menor al área total (${
                              get_values('area_mt2') ?? ''
                            })`
                        : 'Ingrese area'
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={11} md={5} margin={1}>
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
                    margin="dense"
                    fullWidth
                    select
                    size="small"
                    label="¿Tiene area de produccion?"
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
            <Grid item xs={11} md={5} margin={1}>
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
                    margin="dense"
                    fullWidth
                    select
                    size="small"
                    label="¿Tiene area preparacion de sustrato?"
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
            <Grid item xs={11} md={5} margin={1}>
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
                    margin="dense"
                    fullWidth
                    select
                    size="small"
                    label="¿Tiene area de embolsado?"
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
            <Grid item xs={11} md={5} margin={1}>
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
                xs={11}
                md={5}
                margin={1}
                control_form={control_vivero}
                control_name="ruta_archivo_creacion"
                default_value=""
                rules={{required_rule: {rule: true, message: "Archivo requerido"}}}
                label="Archivo de soporte"
                disabled={false}
                helper_text=""
                set_value={set_file}
                hidden_text={action !== 'create'}
                file_name={file_name}
            />
            {current_nursery.id_viverista_actual !== null &&
              <ViveristaActual/>
            }
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
              variant="outlined"
              onClick={handle_close_add_nursery}
              startIcon={<CloseIcon />}
            >
              CERRAR
            </Button>
            {action === 'create' ? (
              <Button
                type="submit"
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