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
import type { CategoriaAtributo, EtapaFiltrada, EtapaProceso } from "../../../interfaces/proceso";
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { type Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

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
  const [etapas, set_etapas] = useState<EtapaProceso[]>([]);
  const [categorias, set_categorias] = useState<CategoriaAtributo[]>([]);
  const [etapas_categorias, set_etapas_categorias] = useState<EtapaFiltrada[]>([]);
  const [fecha_inicio, set_fecha_inicio] = useState<Dayjs>(dayjs());
  const [form_data, set_form_data] = useState({
    id_etapa: '',
    id_categoria: ''
  });

  useEffect(() => {
    api.get('recaudo/procesos/etapas')
      .then((response) => {
        set_etapas(response.data.data);
      })
      .catch((error) => {
        //  console.log('')(error);
      })
  }, []);

  useEffect(() => {
    api.get('recaudo/procesos/etapas-filtrado')
      .then((response) => {
        filter_subetapas(response.data.data);
      })
      .catch((error) => {
        //  console.log('')(error);
      });
  }, []);

  useEffect(() => {
    set_filtered_categorias(form_data.id_etapa);
  }, [form_data.id_etapa]);

  const are_objects_equals = (obj1: EtapaProceso, obj2: EtapaProceso): boolean => {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  };

  const filter_subetapas = (etapas_categorias: EtapaFiltrada[]): void => {
    const etapas_filtradas: EtapaFiltrada[] = [];
    etapas_categorias.forEach((item) => {
      const found = etapas_filtradas.some((current_item) => are_objects_equals(current_item.etapa, item.etapa));
      if (!found) {
        etapas_filtradas.push(item);
      }
    });
    const new_etapas_filtradas = etapas_filtradas.map((etapa) => ({ ...etapa, subetapas: take_duplicated_objects(etapa.subetapas) }));
    set_etapas_categorias(new_etapas_filtradas);
  };

  const take_duplicated_objects = (categorias: CategoriaAtributo[]): CategoriaAtributo[] => {
    const unique_categorias: CategoriaAtributo[] = categorias.filter((value, index, self) => index === self.findIndex((element) => (
      element.id === value.id
    )));
    return unique_categorias;
  };

  const set_filtered_categorias = (id_etapa: string): void => {
    if (id_etapa) {
      const selected_categorias = etapas_categorias.find((etapa_categoria) => etapa_categoria.etapa.id === Number(id_etapa));
      set_categorias(selected_categorias?.subetapas ?? []);
    }
  };

  const cambio_fecha_inicio = (date: Dayjs | null): void => {
    if (date !== null) {
      set_fecha_inicio(date);
    }
  };

  const handle_close = (): void => {
    set_open_create_proceso_modal(false);
  };

  const handle_select_change: (event: SelectChangeEvent) => void = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    set_form_data((prevState) => ({ ...prevState, [name]: value }));
  };

  const handle_submit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { id_etapa, id_categoria } = form_data;
    create_new_proceso(fecha_inicio.format('YYYY-MM-DD'), Number(id_etapa), Number(id_categoria));
    set_fecha_inicio(dayjs(new Date()));
    set_form_data({ id_etapa: '', id_categoria: '' });
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
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Fecha de inicio"
                  value={fecha_inicio}
                  onChange={(newValue) => { cambio_fecha_inicio(newValue); }}
                  inputFormat="DD/MM/YYYY"
                  renderInput={(params) => (
                    <TextField
                      fullWidth
                      size="small"
                      helperText='Ingrese la fecha de inicio'
                      required
                      {...params}
                    />
                  )}
                  maxDate={dayjs()}
                />
              </LocalizationProvider>
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
                <InputLabel>Subetapa</InputLabel>
                <Select
                  name="id_categoria"
                  label='Subetapa'
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
                <FormHelperText>Seleccione la subetapa</FormHelperText>
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