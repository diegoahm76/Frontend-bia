import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
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
  Grid,
  MenuItem,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import {
  add_medida_service,
  edit_medida_service,
} from '../../store/thunks/MarcaMedidaPorcentajeThunks';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/';
import { api } from '../../../../../api/axios';
import type { IList } from '../../../../../interfaces/globalModels';
import { Title } from '../../../../../components';

interface IProps {
  action: string;
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
}

interface FormValues {
  id_unidad_medida: number | null;
  nombre: string;
  abreviatura: string;
  id_magnitud: number | null;
  precargado: boolean;
  activo: boolean;
  item_ya_usado: boolean;
}
const initial_options: IList[] = [
  {
    label: '',
    value: '',
  },
];
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const CrearMedidaModal = ({
  action,
  is_modal_active,
  set_is_modal_active,
}: IProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { medida_seleccionada } = useAppSelector((state) => state.medida);
  const [magnitudes, set_magnitudes] = useState(initial_options);
  const {
    control: control_medida,
    handleSubmit: handle_submit,
    reset: reset_medida,
  } = useForm<FormValues>();

  // eslint-disable-next-line @typescript-eslint/naming-convention

  const handle_close_add_medida = (): void => {
    set_is_modal_active(false);
  };

  useEffect(() => {
    reset_medida(medida_seleccionada);
    /// //  console.log('')(medida_seleccionada);
  }, [medida_seleccionada]);

  const on_submit = (data: FormValues): void => {
    const form_data: any = new FormData();
    form_data.append('id_unidad_medida', data.id_unidad_medida);
    form_data.append('nombre', data.nombre);
    form_data.append('abreviatura', data.abreviatura);
    form_data.append('id_magnitud', data.id_magnitud);
    form_data.append('activo', data.activo);
    form_data.append('item_ya_usado', data.item_ya_usado);
    void dispatch(add_medida_service(form_data, navigate));
    handle_close_add_medida();
  };
  const on_submit_edit = (data: FormValues): void => {
    const form_data: any = new FormData();
    form_data.append('nombre', data.nombre);
    form_data.append('abreviatura', data.abreviatura);
    form_data.append('id_magnitud', data.id_magnitud);

    void dispatch(
      edit_medida_service(data, medida_seleccionada.id_unidad_medida, navigate)
    );
    handle_close_add_medida();
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
        const { data: magnitud_no_format } = await api.get(
          'almacen/choices/magnitudes/'
        );

        const magnitud_format = text_choise_adapter(magnitud_no_format);
        set_magnitudes(magnitud_format);
      } catch (err) {
        // //  console.log('')(err);
      }
    };
    void get_selects_options();
  }, []);

  return (
    <Dialog
      maxWidth="xl"
      open={is_modal_active}
      onClose={handle_close_add_medida}
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
      <Grid item xs={12} marginLeft={2} marginRight={2} marginTop={3}>
                    <Title title={` ${action === 'create'
            ? 'Crear medida'
            : action === 'detail'
            ? 'Detalle Medida'
            : 'Editar Medida'}`} />
                </Grid>  
        <DialogTitle>
          {/* {action === 'create'
            ? 'Crear medida'
            : action === 'detail'
            ? 'Detalle Medida'
            : 'Editar Medida'} */}
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ mb: '0px' }}>
          <Grid container>
            <Grid xs={11} md={11} margin={1}>
              <Controller
                name="nombre"
                control={control_medida}
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
                    label="Medida"
                    variant="outlined"
                    value={value}
                    onChange={onChange}
                    error={!(error == null)}
                    helperText={
                      error != null
                        ? 'Es obligatorio ingresar una unidad de medida'
                        : 'Ingrese unidad de medida'
                    }
                  />
                )}
              />
            </Grid>

            <Grid xs={11} md={11} margin={1}>
              <Controller
                name="abreviatura"
                control={control_medida}
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
                    label="Abreviatura"
                    variant="outlined"
                    value={value}
                    onChange={onChange}
                    error={!(error == null)}
                  />
                )}
              />
            </Grid>
            <Grid xs={11} md={11} margin={1}>
              <Controller
                name="id_magnitud"
                control={control_medida}
                defaultValue={1}
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
                    label="Magnitud"
                    variant="outlined"
                    defaultValue={value}
                    value={value}
                    onChange={onChange}
                    error={!(error == null)}
                    helperText={
                      error != null
                        ? 'Es obligatorio seleccionar una Magnitud'
                        : 'Seleccione magnitud'
                    }
                  >
                    {magnitudes.map((option: IList) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
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
              variant="contained"
              color='error'
              onClick={handle_close_add_medida}
              startIcon={<CloseIcon />}
            >
              CERRAR
            </Button>
            {action === 'create' ? (
              <Button
                type="submit"
                color='success'
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
export default CrearMedidaModal;
