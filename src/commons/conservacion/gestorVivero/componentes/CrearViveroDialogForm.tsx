import { useState, useEffect } from 'react';
import { type Dispatch, type SetStateAction } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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

import { add_nursery_service, edit_nursery_service } from '../store/thunks/gestorViveroThunks';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { type IList, type IObjNursery as FormValues } from '../interfaces/vivero';
import { api } from '../../../../api/axios';

interface IProps {
  action: string,
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
  
  const {current_nursery} = useAppSelector((state) => state.nursery);


  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { control: control_vivero, handleSubmit: handle_submit, reset: reset_nursery, getValues, formState: { errors } } =
    useForm<FormValues>();
    console.log("Errors:", errors);

  const handle_close_add_nursery = (): void => {
    set_is_modal_active(false);
  };
  useEffect(() => {
    reset_nursery(current_nursery);
    console.log(current_nursery)
  }, [current_nursery]);


  const on_submit = (data: FormValues): void => {
    console.log(file)
    data.ruta_archivo_creacion = file
    const form_data:any = new FormData();
    form_data.append('nombre', data.nombre);
        form_data.append('cod_municipio', data.cod_municipio);
        form_data.append('direccion', data.direccion);
        form_data.append('area_mt2', data.area_mt2);
        form_data.append('area_propagacion_mt2', data.area_propagacion_mt2);
        form_data.append('tiene_area_produccion', data.tiene_area_produccion);
        form_data.append('tiene_areas_pep_sustrato', data.tiene_areas_pep_sustrato);
        form_data.append('tiene_area_embolsado', data.tiene_area_embolsado);
        form_data.append('cod_tipo_vivero', data.cod_tipo_vivero);
        form_data.append('cod_origen_recursos_vivero', data.cod_origen_recursos_vivero);
        form_data.append('ruta_archivo_creacion', file === null ? '' : file);
    void dispatch(add_nursery_service(form_data, navigate));
    handle_close_add_nursery();
  };
  const on_submit_edit = (data: FormValues): void => {
    const form_data:any = new FormData();
    
        form_data.append('area_mt2', data.area_mt2);
        form_data.append('area_propagacion_mt2', data.area_propagacion_mt2);
        form_data.append('tiene_area_produccion', data.tiene_area_produccion);
        form_data.append('tiene_areas_pep_sustrato', data.tiene_areas_pep_sustrato);
        form_data.append('tiene_area_embolsado', data.tiene_area_embolsado);
        form_data.append('cod_tipo_vivero', data.cod_tipo_vivero);
        form_data.append('cod_origen_recursos_vivero', data.cod_origen_recursos_vivero);
      
    void dispatch(edit_nursery_service(form_data, current_nursery.id_vivero, navigate));
    handle_close_add_nursery();
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
        const { data: municipalities_no_format } = await api.get(
          'choices/municipios/'
        );
        const { data: nursery_types_no_format } = await api.get(
          'conservacion/choices/tipo-vivero/'
        );
        const { data: source_resources_no_format } = await api.get(
          'conservacion/choices/origen-recursos-vivero/'
        );
        const municipalities_format: IList[] = text_choise_adapter(
          municipalities_no_format
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
        set_municipalities(municipalities_format);
      } catch (err) {
        console.log(err);
      }
    };
    void get_selects_options();
  }, []);

  const on_change_file: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_file(e.target.files!=null?e.target.files[0]:"")    
  };


  return (
    <Dialog
      maxWidth="xl"
      open={is_modal_active}
      onClose={handle_close_add_nursery}
    >
      <Box
        component="form"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={action==="create"? handle_submit(on_submit):handle_submit(on_submit_edit)}
      >
        <DialogTitle>{action==="create"? "Crear vivero": action==="detail"? "Detalle vivero": "Editar vivero" }</DialogTitle>
        <Divider />
        <DialogContent sx={{ mb: '0px' }}>
          <Grid container>
            <Title title="INFORMACION PRINCIPAL"></Title>
            <Grid item xs={11} md={5} margin={1}>
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
                    disabled = {action !== "create"}
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
                    disabled = {action !== "create"}
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
                    disabled = {action !== "create"}
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
                rules={{ required: true, min:0, max: getValues("area_propagacion_mt2")?? '' }}
                render={({
                  field: { onChange, value },
                  fieldState: { error }
                }) => (
                  <TextField
                    margin="dense"
                    fullWidth
                    size="small"
                    label="Area m2"
                    variant="outlined"
                    type="number"
                    disabled = {action === "detail"}
                    value={value}
                    onChange={onChange}
                    error={!(error == null)}
                    helperText= {
                      error != null
                        ? error.type === "required"?'El area es requerida':`El valor del area debe ser menor al area de propagacion (${getValues("area_propagacion_mt2")??""})`
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
                    disabled = {action === "detail"}
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
            <Title title="DETALLES VIVERO"></Title>
            <Grid item xs={11} md={5} margin={1}>
              <Controller
                name="area_propagacion_mt2"
                control={control_vivero}
                defaultValue={0}
                rules={{ required: true, min: getValues("area_mt2")?? '' }}
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
                    disabled = {action === "detail"}
                    value={value}
                    onChange={onChange}
                    error={!(error == null)}
                    helperText={
                      error != null
                      ? error.type === "required"?'El area de propagacion es requerida':`El valor del area debe ser mayor al area (${getValues("area_mt2")??""})`
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
                    disabled = {action === "detail"}
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
                    disabled = {action === "detail"}
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
                    disabled = {action === "detail"}
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
                    disabled = {action === "detail"}
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
            {action === "create"?
            <Grid item xs={ 11 } md={ 5 } margin={ 1 }>
          
              <TextField
                margin="dense"
                fullWidth
                size="small"
                label="archivo"
                variant="outlined"
                type="file"
                onChange={ on_change_file }
              />
            
          </Grid>
          :null
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
            {action === "create"?
            <Button type="submit" variant="contained" startIcon={<SaveIcon />}>
              GUARDAR
            </Button> :
            action === "edit"?
            <Button type="submit" variant="contained" startIcon={<EditIcon />}>
              EDITAR
            </Button>:
            null
            }
          </Stack>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default CrearViveroDialogForm;
