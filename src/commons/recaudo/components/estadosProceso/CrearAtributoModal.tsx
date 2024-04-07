/* eslint-disable @typescript-eslint/naming-convention */
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
import type { CategoriaAtributo, FormDataAtributo, TipoAtributo } from '../../interfaces/proceso';
import { api } from "../../../../api/axios";
import { Title } from "../../../../components";

interface IProps {
  form_data_atributo: FormDataAtributo;
  actualizar_atributo: boolean;
  is_modal_active: boolean;
  id_etapa:any;
  set_form_data_atributo: Dispatch<SetStateAction<FormDataAtributo>>;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
  submit_create_update_atributo: () => void;

}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CrearAtributoModal: React.FC<IProps> = ({
  form_data_atributo,
  actualizar_atributo,
  is_modal_active,
  id_etapa,
  set_form_data_atributo,
  set_is_modal_active,
  submit_create_update_atributo
}: IProps) => {
  const [tipos_atributos, set_tipos_atributos] = useState<TipoAtributo[]>([]);
  const [categorias_atributos, set_categorias_atributos] = useState<CategoriaAtributo[]>([]);

  useEffect(() => {
    api.get('recaudo/procesos/tipos-atributos')
      .then((response) => {
        set_tipos_atributos(response.data.data);
      })
      .catch((error) => {
        //  console.log('')(error);
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
    set_form_data_atributo((prevState) => ({ ...prevState, [name]: value }));
  }

  const handle_input_change = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    set_form_data_atributo((prevState) => ({ ...prevState, [name]: value }));
  };

  const handle_checkbox_change = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, checked } = event.target;
    set_form_data_atributo((prevState) => ({ ...prevState, [name]: checked }));
  };

  const handle_submit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    submit_create_update_atributo();
    handle_close();
  };
  const categoriasFiltradas = categorias_atributos.filter(
    (categoria) => categoria.id_etapa === id_etapa
  );
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
        <Grid item xs={12} marginLeft={2} marginRight={2} marginTop={3}>
          <Title title={actualizar_atributo ? 'Editar Atributo' : 'Crear Nuevo Atributo'} />
        </Grid>
        <DialogTitle></DialogTitle>
        <Divider />

        <DialogContent sx={{ mb: '0px' }}>
          <Grid container direction='column'>
            {/* {id_etapa} */}
            <Grid item xs={11} md={5} margin={1}>
              <FormControl size='small' fullWidth required>
                <InputLabel>Categoría del atributo</InputLabel>
                <Select
                  name="id_categoria"
                  label='Categoría del atributo'
                  value={form_data_atributo.id_categoria}
                  MenuProps={{
                    style: {
                      maxHeight: 224,
                    }
                  }}
                  onChange={handle_select_change}
                >
                  {categoriasFiltradas.map(({ id, categoria }) => (
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
                  value={form_data_atributo.id_tipo}
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
                value={form_data_atributo.descripcion}
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
                      checked={form_data_atributo.obligatorio}
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
              variant="contained"
              color="error"
              onClick={handle_close}
              startIcon={<CloseIcon />}
            >
              Cerrar
            </Button>
            <Button
              type="submit"
              color="success"
              variant="contained"
              startIcon={<SaveIcon />}
            // disabled={form_data_atributo.descripcion === '' || form_data_atributo.id_tipo === ''}
            >
              {actualizar_atributo ? 'Editar' : 'Crear'}
            </Button>
          </Stack>
        </DialogActions>
      </Box>
    </Dialog>
  )
}
