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
import EditIcon from '@mui/icons-material/Edit';

import { edit_bien_service } from '../store/thunks/configuracionThunks';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { type IObjBien as FormValues } from '../interfaces/configuracion';
import { api } from '../../../../api/axios';
import type { IList } from '../../../../interfaces/globalModels';
interface IProps {
  action: string;
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const EditarBienDialogForm = ({
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
  const [tipo_elemento, set_tipo_elemento] = useState<IList[]>(initial_options);
  const [tipo_elemento_selected, set_tipo_elemento_selected] =
    useState<any>('MV');

  const { current_bien } = useAppSelector((state) => state.configuracion);

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const {
    control: control_bien,
    handleSubmit: handle_submit,
    reset: reset_bien,
  } = useForm<FormValues>();

  const handle_close_add_bien = (): void => {
    set_is_modal_active(false);
  };
  useEffect(() => {
    reset_bien(current_bien);
  }, [current_bien]);

  const on_submit_edit = (data: FormValues): void => {
    data.cod_tipo_elemento_vivero = tipo_elemento_selected;
    void dispatch(edit_bien_service(data, current_bien.id_bien, navigate));
    handle_close_add_bien();
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
        const { data: tipo_elemento_no_format } = await api.get(
          'almacen/choices/tipo-elemento/'
        );
        const tipo_elemento_format: IList[] = text_choise_adapter(
          tipo_elemento_no_format
        );
        set_tipo_elemento(tipo_elemento_format);
      } catch (err) {
        //  console.log('')(err);
      }
    };
    void get_selects_options();
  }, []);
  const on_change_tipo_elemento: any = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    set_tipo_elemento_selected(e.target.value);
  };

  return (
    <Dialog
      maxWidth="xl"
      open={is_modal_active}
      onClose={handle_close_add_bien}
    >
      <Box
        component="form"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handle_submit(on_submit_edit)}
      >
        <Grid container
          sx={{
            position: 'relative',
            background: '#FAFAFA',
            borderRadius: '15px',
            p: '20px',
            mb: '20px',
            boxShadow: '0px 3px 6px #042F4A26',
          }} item xs={11.5} margin={1}>

          <Title title={action === 'create'
            ? 'Crear vivero'
            : action === 'detail'
              ? 'Detalle Vivero'
              : 'Editar vivero'}  ></Title>

          <DialogTitle>

          </DialogTitle>

        </Grid>

        <Divider />
        <DialogContent sx={{ mb: '0px' }}>
          <Grid container spacing={2} sx={{
            position: 'relative',
            background: '#FAFAFA',
            borderRadius: '15px',
            p: '20px',
            mb: '0px',
            boxShadow: '0px 3px 6px #042F4A26',
          }}>
            <Title title="Tipificar bien"></Title>
            <Grid item xs={12} md={5} margin={0}>
              <Controller
                name="nombre_cientifico"
                control={control_bien}
                defaultValue=""
                rules={{ required: tipo_elemento_selected === 'MV' }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    margin="dense"
                    fullWidth
                    size="small"
                    label="Nombre científico"
                    variant="outlined"
                    disabled={action === 'detail'}
                    value={value}
                    onChange={onChange}
                    error={!(error == null)}
                    helperText={
                      error != null
                        ? 'Es obligatorio ingresar un nombre científico'
                        : 'Ingrese nombre científico'
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={11} md={5} margin={0}>
              <TextField
                margin="dense"
                fullWidth
                select
                size="small"
                label="Tipo de elemento"
                variant="outlined"
                disabled={action === 'detail'}
                value={tipo_elemento_selected}
                onChange={on_change_tipo_elemento}
              >
                {tipo_elemento.map((option: IList) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={11} md={5} margin={0}>
              <Controller
                name="es_semilla_vivero"
                control={control_bien}
                defaultValue={tipo_elemento_selected === 'MV'}
                rules={{ required: tipo_elemento_selected === 'MV' }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    margin="dense"
                    fullWidth
                    select
                    size="small"
                    label="¿Es una semilla?"
                    variant="outlined"
                    disabled={
                      tipo_elemento_selected !== 'MV' || action === 'detail'
                    }
                    value={value}
                    onChange={onChange}
                    error={!(error == null)}
                    helperText={
                      error != null
                        ? 'Es obligatorio seleccionar una opción'
                        : 'Seleccione la opción'
                    }
                  >
                    <MenuItem value="true">SI</MenuItem>
                    <MenuItem value="false">NO</MenuItem>
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
              color="error"
              onClick={handle_close_add_bien}
              startIcon={<CloseIcon />}
            >
              CERRAR
            </Button>
            {action === 'edit' ? (
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
export default EditarBienDialogForm;
