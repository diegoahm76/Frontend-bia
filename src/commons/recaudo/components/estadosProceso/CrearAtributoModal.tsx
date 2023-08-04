import { type SetStateAction, type Dispatch, useState, useEffect } from "react";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  MenuItem,
  Select,
  Stack,
  type SelectChangeEvent,
  Button,
  InputLabel,
  Grid,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormHelperText
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import type { CategoriaAtributo, TipoAtributo } from '../../interfaces/proceso';
import { api } from "../../../../api/axios";

interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
  submit_new_atributo: (descripcion: string, obligatorio: number, id_tipo: number, id_categoria: number) => void;
  set_position_tab_organigrama: Dispatch<SetStateAction<string>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CrearAtributoModal: React.FC<IProps> = ({ is_modal_active, set_is_modal_active, submit_new_atributo, set_position_tab_organigrama }: IProps) => {
  const [form_data, set_form_data] = useState({
    descripcion: '',
    obligatorio: false,
    id_tipo: '',
    id_categoria: '',
  });
  const [tipos_atributos, set_tipos_atributos] = useState<TipoAtributo[]>([]);
  const [categorias_atributos, set_categorias_atributos] = useState<CategoriaAtributo[]>([]);

  useEffect(() => {
    api.get('recaudo/procesos/tipos-atributos')
      .then((response) => {
        set_tipos_atributos(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    api.get('recaudo/procesos/categoria-atributos')
    .then((response) => {
      set_categorias_atributos(response.data.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  const handle_close = (): void => {
    set_is_modal_active(false);
  }

  const handle_select_change: (event: SelectChangeEvent) => void = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    set_form_data((prevState) => ({ ...prevState, [name]: value }));
  }

  const handle_input_change = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    set_form_data((prevState) => ({ ...prevState, [name]: value }));
  };

  const handle_checkbox_change = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, checked } = event.target;
    set_form_data((prevState) => ({ ...prevState, [name]: checked }));
  };

  const handle_submit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { descripcion, obligatorio, id_tipo, id_categoria } = form_data;
    submit_new_atributo(descripcion, obligatorio ? 1 : 0, Number(id_tipo), Number(id_categoria));
    set_form_data({
      descripcion: '',
      obligatorio: false,
      id_tipo: '',
      id_categoria: '',
    });
    handle_close();
    set_position_tab_organigrama('1');
  };

  return (
    <Dialog
      maxWidth="xl"
      open={is_modal_active}
      onClose={handle_close}
    >
      <Box
        component="form"
        onSubmit={handle_submit}
        sx={{
          width: '500px'
        }}
      >
        <DialogTitle>Crear Nuevo Atributo</DialogTitle>
        <Divider />

        <DialogContent sx={{ mb: '0px' }}>
          <Grid container direction='column'>
            <Grid item xs={11} md={5} margin={1}>
              <FormControl size='small' fullWidth required>
                <InputLabel>Categoría del atributo</InputLabel>
                <Select
                  name="id_categoria"
                  label='Categoría del atributo'
                  value={form_data.id_categoria}
                  MenuProps={{
                    style: {
                      maxHeight: 224,
                    }
                  }}
                  onChange={handle_select_change}
                >
                  {categorias_atributos.map(({ id, categoria }) => (
                    <MenuItem key={id} value={id}>
                      {categoria}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Seleccione la categoría del atributo</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={11} md={5} margin={1}>
              <FormControl size='small' fullWidth required>
                <InputLabel>Tipo de atributo</InputLabel>
                <Select
                  name="id_tipo"
                  label='Tipo de atributo'
                  value={form_data.id_tipo}
                  onChange={handle_select_change}
                >
                  {tipos_atributos.map(({ id, tipo }) => (
                    <MenuItem key={id} value={id}>
                      {tipo}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Seleccione el tipo de atributo</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={11} md={5} margin={1}>
              <TextField
                name="descripcion"
                label='Descipción'
                value={form_data.descripcion}
                helperText="Ingrese la descripción del atributo"
                margin="dense"
                fullWidth
                size="small"
                required
                onChange={handle_input_change}
              />
            </Grid>
            <Grid item xs={11} md={5} margin={1}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="obligatorio"
                      checked={form_data.obligatorio}
                      onChange={handle_checkbox_change}
                    />
                  }
                  label="Obligatorio"
                />
              </FormGroup>
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
  )
}
