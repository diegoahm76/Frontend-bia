import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from "@mui/material";
import { useState, type Dispatch, type SetStateAction } from "react";
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { Title } from "../../../../components";

interface IProps {
  open_etapa_modal: boolean;
  set_open_etapa_modal: Dispatch<SetStateAction<boolean>>;
  submit_new_etapa: (etapa: string, descripcion: string) => void;
}

interface FormData {
  etapa: string;
  descripcion: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CrearEtapaModal = ({ open_etapa_modal, set_open_etapa_modal, submit_new_etapa }: IProps): JSX.Element => {
  const [form_data, set_form_data] = useState<FormData>({
    etapa: '',
    descripcion: '',
  });

  const handle_close = (): void => {
    set_open_etapa_modal(false);
  };

  const handle_input_change = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    set_form_data((previousState) => ({ ...previousState, [name]: value }));
  };

  const handle_submit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { etapa, descripcion } = form_data;
    submit_new_etapa(etapa, descripcion);
    set_form_data({ etapa: '', descripcion: ''});
    handle_close();
  };

  return (
    <Dialog
      open={open_etapa_modal}
      onClose={set_open_etapa_modal}
    >
      <Box component='form' onSubmit={handle_submit}>
      <Grid item xs={12} marginLeft={2} marginRight={2} marginTop={3}>
                    <Title title={`Crear Nueva Etapa `} />
                </Grid>
        <DialogTitle></DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="etapa"
                value={form_data.etapa}
                label='Etapa'
                helperText='Ingrese un nombre para la etapa'
                size="small"
                fullWidth
                onChange={handle_input_change}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="descripcion"
                value={form_data.descripcion}
                label='Descripción'
                helperText='Ingrese una descripción para la etapa'
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
            variant='contained'
            color="error"
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
            Crear
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};