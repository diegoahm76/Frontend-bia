import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
  Stack,
  TextField,
  FormHelperText
} from "@mui/material";
import { useState, type Dispatch, type SetStateAction, useEffect } from "react";
import { api } from "../../../../../api/axios";
import type { CategoriaAtributo, EtapaProceso } from "../../../interfaces/proceso";
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';

interface IProps {
  open_create_proceso_modal: boolean;
  set_open_create_proceso_modal: Dispatch<SetStateAction<boolean>>;
  create_new_proceso: (inicio: string, id_etapa: number, id_categoria: number) => void;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CreateProcesoModal = ({
  open_create_proceso_modal,
  set_open_create_proceso_modal,
  create_new_proceso,
}: IProps): JSX.Element => {
  const [categorias, set_categorias] = useState<CategoriaAtributo[]>([]);
  const [etapas, set_etapas] = useState<EtapaProceso[]>([]);
  const [form_data, set_form_data] = useState({
    inicio: '',
    id_etapa: '',
    id_categoria: ''
  });

  useEffect(() => {
    api.get('recaudo/procesos/categoria-atributos')
      .then((response) => {
        set_categorias(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

  useEffect(() => {
    api.get('recaudo/procesos/etapas')
      .then((response) => {
        set_etapas(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

  const handle_close = (): void => {
    set_open_create_proceso_modal(false);
  }

  const handle_select_change: (event: SelectChangeEvent) => void = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    set_form_data((prevState) => ({ ...prevState, [name]: value }));
  }

  const handle_input_change = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    set_form_data((prevState) => ({ ...prevState, [name]: value }));
  };

  const handle_submit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { inicio, id_etapa, id_categoria } = form_data;
    create_new_proceso(inicio, Number(id_etapa), Number(id_categoria));
    handle_close();
  };

  return (
    <Dialog
      open={open_create_proceso_modal}
      onClose={set_open_create_proceso_modal}
    >
      <Box
        component='form'
        onSubmit={handle_submit}
        sx={{
          width: '500px'
        }}
      >
        <DialogTitle>Crear Nuevo Proceso</DialogTitle>
        <DialogContent dividers>
          <Grid container direction='column'>
            <Grid item xs={11} md={5} margin={1}>
              <TextField
                name="inicio"
                label='Fecha de inicio'
                InputLabelProps={{ shrink: true }}
                value={form_data.inicio}
                type="date"
                size="small"
                helperText='Ingrese la fecha de inicio'
                fullWidth
                required
                onChange={handle_input_change}
              />
            </Grid>
            <Grid item xs={11} md={5} margin={1}>
              <FormControl size="small" fullWidth required>
                <InputLabel>Etapa</InputLabel>
                <Select
                  name="id_etapa"
                  label='Etapa'
                  value={form_data.id_etapa}
                  MenuProps={{
                    style: {
                      maxHeight: 224,
                    }
                  }}
                  onChange={handle_select_change}
                >
                  {etapas.map(({ id, etapa }) => (
                    <MenuItem key={id} value={id}>
                      {etapa}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Seleccione la etapa de proceso</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={11} md={5} margin={1}>
              <FormControl size="small" fullWidth required>
                <InputLabel>Categoría</InputLabel>
                <Select
                  name="id_categoria"
                  label='Categoria'
                  value={form_data.id_categoria}
                  MenuProps={{
                    style: {
                      maxHeight: 224,
                    }
                  }}
                  onChange={handle_select_change}
                >
                  {categorias.map(({ id, categoria }) => (
                    <MenuItem key={id} value={id}>
                      {categoria}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Seleccione la categoría de la etapa</FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Stack
            direction='row'
            spacing={2}
            sx={{ mr: '15px', mb: '10px', mt: '10px' }}
          >
            <Button
              type="button"
              variant="outlined"
              onClick={handle_close}
              startIcon={<CloseIcon />}
            >
              Cerrar
            </Button>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              startIcon={<SaveIcon />}
            // disabled={form_data.descripcion === '' || form_data.id_tipo === ''}
            >
              Crear
            </Button>
          </Stack>
        </DialogActions>
      </Box>
    </Dialog>
  );
};