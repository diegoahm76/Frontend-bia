import { useEffect } from 'react';
import { type Dispatch, type SetStateAction } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  Button,
  Box,
  Divider,
  MenuItem,
  Grid,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

import { add_mixture_service, edit_mixture_service, get_medida_service } from '../store/thunks/configuracionThunks';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { type IObjMixture as FormValues } from '../interfaces/configuracion';
import { Title } from '../../../../components';
interface IProps {
  action: string,
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
}



// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const EditarBienDialogForm = ({
  action,
  is_modal_active,
  set_is_modal_active,
}: IProps) => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const [tipo_elemento_selected, set_tipo_elemento_selected] = useState<any>("MV");


  const { current_mixture, unidad_medida } = useAppSelector((state) => state.configuracion);


  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { control: control_mixture, handleSubmit: handle_submit, reset: reset_mixture } =
    useForm<FormValues>();

  const handle_close_add_mixture = (): void => {
    set_is_modal_active(false);
  };
  useEffect(() => {
    reset_mixture(current_mixture);
  }, [current_mixture]);



  const on_submit = (data: FormValues): void => {

    void dispatch(add_mixture_service(data, navigate));
    handle_close_add_mixture();
  };
  const on_submit_edit = (data: FormValues): void => {
    void dispatch(edit_mixture_service(data, current_mixture.id_mezcla, navigate));
    handle_close_add_mixture();
  };



  useEffect(() => {
    void dispatch(get_medida_service());
  }, []);

  return (
    <Dialog
      maxWidth="xl"
      open={is_modal_active}
      onClose={handle_close_add_mixture}
    >
      <Box
        component="form"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={action === "create" ? handle_submit(on_submit) : handle_submit(on_submit_edit)}

      >
        <Grid item xs={12} marginLeft={2} marginRight={2} marginTop={2}>
          <Title title={`${action === "create" ? "Crear mezcla" : action === "detail" ? "Detalle mezcla" : "Editar mezcla"} `} />
        </Grid>

        {/* <Title title={action === "create" ? "Crear mezcla" : action === "detail" ? "Detalle mezcla" : "Editar mezcla"} ></Title> */}


        <Divider />
        <DialogContent sx={{ mb: '0px' }}>
          <Grid container
            sx={{
              position: 'relative',
              background: '#FAFAFA',
              borderRadius: '15px',
              p: '20px',
              mb: '0px',
              boxShadow: '0px 3px 6px #042F4A26',
            }} >
            <Grid item xs={11} md={12} margin={1}>
              <Controller
                name="nombre"
                control={control_mixture}
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
                    disabled={action === "detail"}
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
            <Grid item xs={11} md={12} margin={1}>
              <Controller
                name="id_unidad_medida"
                control={control_mixture}
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
                    label="Unidad de medida"
                    variant="outlined"
                    disabled={action === "detail"}
                    defaultValue={value}
                    value={value}
                    onChange={onChange}
                    error={!(error == null)}
                    helperText={
                      error != null
                        ? 'Es obligatorio seleccionar unidad de medida'
                        : 'Seleccione unidad de media'
                    }
                  >
                    {unidad_medida.map((option) => (
                      <MenuItem key={option.id_unidad_medida} value={option.id_unidad_medida}>
                        {option.nombre}
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
              onClick={handle_close_add_mixture}
              startIcon={<CloseIcon />}
            >
              CERRAR
            </Button>
            {action === "create" ?
              <Button color='success' type="submit" variant="contained" startIcon={<SaveIcon />}>
                GUARDAR
              </Button> :
              action === "edit" ?
                <Button type="submit" variant="contained" startIcon={<EditIcon />}>
                  EDITAR
                </Button> :
                null
            }
          </Stack>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default EditarBienDialogForm;
