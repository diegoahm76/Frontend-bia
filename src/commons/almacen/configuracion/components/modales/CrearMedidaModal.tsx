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
  MenuItem
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { add_medida_service} from '../../store/thunks/MarcaMedidaPorcentajeThunks';
 import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../../../hooks/';
import { type IList } from '../../interfaces/MarcaMedidaPorcentaje';
import { api } from '../../../../../api/axios';
// import { type IList } from "../interfaces/marca";

interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
}

interface FormValues {
        id_medida: number | null;
        nombre: string;
        abreviatura: string;
        id_magnitud: number | null;
   

      }
  const initial_options: IList[] = [
        {
          label: '',
          value: '',
        },
      ];
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const CrearMedidaModal = ({
  is_modal_active,
  set_is_modal_active,
}: IProps) => {
 
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [magnitudes, set_magnitudes] =
    useState<IList[]>(initial_options);
 // eslint-disable-next-line @typescript-eslint/naming-convention
  const { control: control_medida, handleSubmit: handle_submit } =
    useForm<FormValues>();

  const handle_close_add_medida = (): void => {
    set_is_modal_active(false);
  };
  
  const on_submit = (data: FormValues): void => {
  
    void dispatch(add_medida_service(data, navigate));
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
      const { data: magnitudes_no_format } = await api.get(
        'almacen/choices/magnitudes/'
      );
      console.log(magnitudes_no_format)
      const magnitudes_format: IList[] = text_choise_adapter(
        magnitudes_no_format
      );
      set_magnitudes(magnitudes_format);
    }
    catch (err) {
      console.log(err);
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
       onSubmit={handle_submit(on_submit)}
      >
        <DialogTitle>Crear Medida</DialogTitle>
        <Divider />
        <DialogContent sx={{ mb: '0px' }}>
         <Grid container >
         <Grid xs={ 11 } md={ 11 } margin={ 1 }>
          <Controller
            name="nombre"
            control={control_medida}
            defaultValue = ""
            rules={{ required: true }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
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
                    ? 'Es obligatorio ingresar un nombre'
                    : 'Ingrese nombre'
                }
              />
            )}
          />
          </Grid>

          <Grid xs={ 11 } md={ 11 } margin={ 1 }>
          <Controller
            name="abreviatura"
            control={control_medida}
            defaultValue = ""
            rules={{ required: true }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
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
          <Grid xs={ 11 } md={ 11 } margin={ 1 }>

          <Controller
                name="id_magnitud"
                control={control_medida}
                defaultValue= {1}
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
              variant="outlined"
              onClick={handle_close_add_medida}
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
export default CrearMedidaModal;
