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
  Checkbox
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import type { TipoAtributo } from '../../interfaces/proceso';
import axios from "axios";

interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
  submit_new_atributo: (descripcion: string, obligatorio: number, id_tipo: number) => void;
  set_position_tab_organigrama: Dispatch<SetStateAction<string>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EstadosProcesoModal: React.FC<IProps> = ({ is_modal_active, set_is_modal_active, submit_new_atributo, set_position_tab_organigrama }: IProps) => {
  const [form_data, set_form_data] = useState({
    descripcion: '',
    obligatorio: false,
    id_tipo: ''
  });
  const [tipos_atributos, set_tipos_atributos] = useState<TipoAtributo[]>([]);

  useEffect(() => {
    axios.get('http://macarenia.bitpointer.co/api/recaudo/procesos/tipos-atributos')
      .then((response) => {
        set_tipos_atributos(response.data.data);
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

  const handle_submit_atributo = (): void => {
    const { descripcion, obligatorio, id_tipo } = form_data;
    submit_new_atributo(descripcion, obligatorio ? 1 : 0, Number(id_tipo));
    set_form_data({
      descripcion: '',
      obligatorio: false,
      id_tipo: ''
    });
    set_is_modal_active(false);
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
        sx={{
          width: '500px'
        }}
      >
        <DialogTitle>Nuevo Atributo</DialogTitle>
        <Divider />

        <DialogContent sx={{ mb: '0px' }}>
          <Grid container direction='column'>
            <Grid item xs={11} md={5} margin={1}>
              <TextField
                name="descripcion"
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
              <FormControl size='small' fullWidth>
                <InputLabel>Tipo de atributo</InputLabel>
                <Select
                  name="id_tipo"
                  value={form_data.id_tipo}
                  label='Tipo de atributo'
                  onChange={handle_select_change}
                >
                  {tipos_atributos.map(({ id, tipo }) => (
                    <MenuItem key={id} value={id}>
                      {tipo}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
              variant="outlined"
              onClick={handle_close}
              startIcon={<CloseIcon />}
            >
              Cerrar
            </Button>
            <Button
              color="primary"
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handle_submit_atributo}
              disabled={form_data.descripcion === '' || form_data.id_tipo === ''}
            >
              Crear
            </Button>
          </Stack>
        </DialogActions>
      </Box>
    </Dialog>
  )
}
