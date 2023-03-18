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
import { add_nursery_service } from '../store/thunks/gestorViveroThunks';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../../hooks';
import { type IList } from '../interfaces/vivero';
import { api } from '../../../../api/axios';
interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
}

interface FormValues {
  nombre: string;
  cod_municipio: string;
  direccion: string;
  area_mt2: number;
  cod_tipo_vivero: string;
  area_propagacion_mt2: number;
  tiene_area_produccion: boolean;
  tiene_areas_pep_sustrato: boolean;
  tiene_area_embolsado: boolean;
  cod_origen_recursos_vivero: string;
  ruta_archivo_creacion: string | null;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const CrearViveroDialogForm = ({
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
  const [file, set_file] = useState<any>('');

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { control: control_vivero, handleSubmit: handle_submit } =
    useForm<FormValues>();

  const handle_close_add_nursery = (): void => {
    set_is_modal_active(false);
  };

  const on_submit = (data: FormValues): void => {
    data.ruta_archivo_creacion = file;
    console.log(data);
    void dispatch(add_nursery_service(data, navigate));
    handle_close_add_nursery();
  };

  const text_choise_adapter: any = (dataArray: string[]) => {
    const data_new_format: IList[] = dataArray.map((dataOld) => ({
      label: dataOld[1],
      value: dataOld[0],
    }));
    return data_new_format;
  };
  const on_change_file: any = (e: any) => {
    console.log(e)
     if (e.target.files != null) {
       if (e.target.files.length > 0) set_file(e.target.files[0])
     }
    
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

  return (
    <Dialog
      maxWidth="xl"
      open={is_modal_active}
      onClose={handle_close_add_nursery}
    >
      <Box
        component="form"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handle_submit(on_submit)}
      >
        <DialogTitle>Crear vivero</DialogTitle>
        <Divider />
        <DialogContent sx={{ mb: '0px' }}>
          <Grid container>
            <Title title="INFORMACION PRINCIPAL"></Title>
            <Grid xs={11} md={5} margin={1}>
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
            <Grid xs={11} md={5} margin={1}>
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
            <Grid xs={11} md={5} margin={1}>
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
            <Grid xs={11} md={5} margin={1}>
              <Controller
                name="area_mt2"
                control={control_vivero}
                defaultValue={0}
                rules={{ required: true }}
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
                    value={value}
                    onChange={onChange}
                    error={!(error == null)}
                    helperText={
                      error != null
                        ? 'Es obligatorio ingresar area'
                        : 'Ingrese area'
                    }
                  />
                )}
              />
            </Grid>
            <Grid xs={11} md={5} margin={1}>
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
            <Grid xs={11} md={5} margin={1}>
              <Controller
                name="area_propagacion_mt2"
                control={control_vivero}
                defaultValue={0}
                rules={{ required: true }}
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
                    value={value}
                    onChange={onChange}
                    error={!(error == null)}
                    helperText={
                      error != null
                        ? 'Es obligatorio ingresar area'
                        : 'Ingrese area'
                    }
                  />
                )}
              />
            </Grid>
            <Grid xs={11} md={5} margin={1}>
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
                    label="¿Area de produccion?"
                    variant="outlined"
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
            <Grid xs={11} md={5} margin={1}>
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
                    label="¿Area preparacion sustrato?"
                    variant="outlined"
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
            <Grid xs={11} md={5} margin={1}>
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
                    label="¿Area de embolsado?"
                    variant="outlined"
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
            <Grid xs={11} md={5} margin={1}>
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
            <Grid xs={11} md={5} margin={1}>
              <TextField
                margin="dense"
                fullWidth
                size="small"
                label="archivo"
                variant="outlined"
                type="file"
                onChange={(e) => {
                  on_change_file(e);
                }}
              />
            </Grid>
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
            <Button type="submit" variant="contained" startIcon={<SaveIcon />}>
              GUARDAR
            </Button>
          </Stack>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default CrearViveroDialogForm;
