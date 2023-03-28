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
  Grid
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { add_marca_service} from '../../store/thunks/MarcaMedidaPorcentajeThunks';
 import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../../../hooks/';
// import { type IList } from "../interfaces/marca";

interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
}

interface FormValues {
    id_marca: number | null,
    nombre: string,
    activo: boolean,
    item_ya_usado: boolean,
}


// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const CrearMarcaModal = ({
  is_modal_active,
  set_is_modal_active,
}: IProps) => {
 
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

 // eslint-disable-next-line @typescript-eslint/naming-convention
  const { control: control_marca, handleSubmit: handle_submit } =
    useForm<FormValues>();

  const handle_close_add_marca = (): void => {
    set_is_modal_active(false);
  };
  
  const on_submit = (data: FormValues): void => {
  
    void dispatch(add_marca_service(data, navigate));
    handle_close_add_marca();
  };
 

  return (
    <Dialog
      maxWidth="xl"
      open={is_modal_active}
      onClose={handle_close_add_marca}
    >
      <Box
        component="form"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
       onSubmit={handle_submit(on_submit)}
      >
        <DialogTitle>Crear marca</DialogTitle>
        <Divider />
        <DialogContent sx={{ mb: '0px' }}>
         <Grid container >
         <Grid xs={ 11 } md={ 11 } margin={ 1 }>
          <Controller
            name="nombre"
            control={control_marca}
            defaultValue=""
            rules={{ required: true }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                margin="dense"
                fullWidth
                size="small"
                label="Marca"
                variant="outlined"
                value={value}
                onChange={onChange}
                error={!(error == null)}
                helperText={
                  error != null
                    ? 'Es obligatorio ingresar una marca'
                    : 'Ingrese marca'
                }
              />
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
              onClick={handle_close_add_marca}
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
export default CrearMarcaModal;
