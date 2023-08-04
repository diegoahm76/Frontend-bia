import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from "@mui/material";
import { useState, type Dispatch, type SetStateAction } from "react";
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';

interface IProps {
  open_categoria_modal: boolean;
  set_open_categoria_modal: Dispatch<SetStateAction<boolean>>;
  submit_new_categoria: (categoria: string) => void;
}

interface FormData {
  categoria: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CrearCategoriaModal = ({ open_categoria_modal, set_open_categoria_modal, submit_new_categoria }: IProps): JSX.Element => {
  const [form_data, set_form_data] = useState<FormData>({
    categoria: '',
  });

  const handle_close = (): void => {
    set_open_categoria_modal(false);
  };

  const handle_input_change = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    set_form_data((previousState) => ({ ...previousState, [name]: value }));
  };

  const handle_submit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { categoria } = form_data;
    submit_new_categoria(categoria);
    set_form_data({ categoria: ''});
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
        <DialogTitle>Crear Nueva Categoria</DialogTitle>
        <DialogContent dividers>
          <Grid container direction='column' spacing={2}>
            <Grid item xs={12} md={5} margin={1}>
              <TextField
                name="categoria"
                value={form_data.categoria}
                label='Categoria'
                helperText='Ingrese un nombre para la categoria'
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
            variant='outlined'
            startIcon={<CloseIcon />}
            onClick={handle_close}
          >
            Cerrar
          </Button>
          <Button
            type="submit"
            variant='contained'
            color="primary"
            startIcon={<SaveIcon />}
          >
            Crear
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};