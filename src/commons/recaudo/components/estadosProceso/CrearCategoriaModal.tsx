import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from "@mui/material";
import { type Dispatch, type SetStateAction } from "react";
import CloseIcon from '@mui/icons-material/Close';
import type { FormDataCategoria } from "../../interfaces/proceso";
import SaveIcon from '@mui/icons-material/Save';

import { Title } from "../../../../components";


interface IProps {
  form_data_categoria: FormDataCategoria;
  open_categoria_modal: boolean;
  actualizar_categoria: boolean;
  set_form_data_categoria: Dispatch<SetStateAction<FormDataCategoria>>;
  set_open_categoria_modal: Dispatch<SetStateAction<boolean>>;
  submit_new_categoria: () => void;
  submit_updated_categoria: () => void;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CrearCategoriaModal = ({
  form_data_categoria,
  open_categoria_modal,
  actualizar_categoria,
  set_form_data_categoria,
  set_open_categoria_modal,
  submit_new_categoria,
  submit_updated_categoria
}: IProps): JSX.Element => {
  const handle_close = (): void => {
    set_open_categoria_modal(false);
  };

  const handle_input_change = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    set_form_data_categoria((previousState) => ({ ...previousState, [name]: value }));
  };

  const handle_submit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (actualizar_categoria) {
      submit_updated_categoria();
    } else {
      submit_new_categoria();
    }
    handle_close();
  };

  return (
    <Dialog
      open={open_categoria_modal}
      onClose={set_open_categoria_modal}
      maxWidth='xl'
    >
      <Box component='form' onSubmit={handle_submit} sx={{
        width: '500px'
      }}>

         <Grid item xs={12} marginLeft={2} marginRight={2} marginTop={3}>
                    <Title title={`Crear Nueva Categoria `} />
                </Grid>
        <DialogTitle></DialogTitle>

        <DialogContent dividers>
          <Grid container direction='column'>
            <Grid item xs={12} md={5} margin={1}>
              <TextField
                name="categoria"
                value={form_data_categoria.categoria}
                label='Categoria'
                helperText='Ingrese un nombre para la categoria'
                size="small"
                fullWidth
                onChange={handle_input_change}
                required
              />
            </Grid>
            <Grid item xs={12} md={5} margin={1}>
              <TextField
                name="orden"
                value={form_data_categoria.orden}
                label='Orden'
                type="number"
                helperText='Ingrese el orden de la categoría'
                size="small"
                fullWidth
                onChange={handle_input_change}
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            type="button"
            color="error"
            variant='contained'
            startIcon={<CloseIcon />}
            onClick={handle_close}
          >
            Cerrar
          </Button>
          <Button
            type="submit"
            variant='contained'

            color="success"
            startIcon={<SaveIcon />}
          >
            {actualizar_categoria ? 'Editar' : 'Crear'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};