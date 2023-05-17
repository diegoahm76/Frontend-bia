import { Box, Dialog, DialogContent, DialogTitle, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField, type SelectChangeEvent, DialogActions, Stack, Button } from "@mui/material";
import { type Dispatch, type SetStateAction } from 'react';
import type { EtapaProceso } from "../../../interfaces/proceso";
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';

interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
  etapas_proceso: EtapaProceso[];
  form_data_flujo: {
    id_etapa_origen: string;
    id_etapa_destino: string;
    fecha_flujo: string;
    descripcion: string;
    requisitos: string;
  },
  handle_input_change: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handle_select_change: (event: SelectChangeEvent) => void;
  handle_submit: () => void;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AddFlujoProcesoModal: React.FC<IProps> = ({
  is_modal_active,
  set_is_modal_active,
  etapas_proceso,
  form_data_flujo,
  handle_input_change,
  handle_select_change,
  handle_submit
}: IProps) => {

  const handle_close = (): void => {
    set_is_modal_active(false);
  };

  const handle_agregar_flujo = (): void => {
    handle_submit();
    handle_close();
  };

  return (
    <Dialog
      maxWidth='xl'
      open={is_modal_active}
      onClose={handle_close}
    >
      <Box
        component='form'
        sx={{
          width: '500px'
        }}
      >
        <DialogTitle>Agregar nuevo flujo de procesos</DialogTitle>
        <Divider />
        <DialogContent sx={{ mb: '0px' }}>
          <Grid container direction='column'>
            <Grid item xs={11} md={5} margin={1}>
              <FormControl required size='small' fullWidth>
                <InputLabel>Seleccione etapa origen</InputLabel>
                <Select
                  label='Seleccione etapa origen'
                  name="id_etapa_origen"
                  value={form_data_flujo.id_etapa_origen}
                  onChange={handle_select_change}
                >
                  {etapas_proceso.map(({ id, etapa }) => (
                    <MenuItem key={id} value={id}>
                      {etapa}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={11} md={5} margin={1}>
              <FormControl required size='small' fullWidth>
                <InputLabel>Seleccione etapa destino</InputLabel>
                <Select
                  label='Seleccione etapa destino'
                  name="id_etapa_destino"
                  value={form_data_flujo.id_etapa_destino}
                  onChange={handle_select_change}
                >
                  {etapas_proceso.map(({ id, etapa }) => (
                    <MenuItem key={id} value={id}>
                      {etapa}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={11} md={5} margin={1}>
              <TextField
                required
                type="date"
                helperText='Ingrese la fecha del flujo de proceso'
                margin='dense'
                fullWidth
                size='small'
                name="fecha_flujo"
                value={form_data_flujo.fecha_flujo}
                onChange={handle_input_change}
              />
            </Grid>
            <Grid item xs={11} md={5} margin={1}>
              <TextField
                required
                helperText='Ingrese la descripción'
                margin='dense'
                fullWidth
                size='small'
                label='Descripción'
                name="descripcion"
                value={form_data_flujo.descripcion}
                onChange={handle_input_change}
              />
            </Grid>
            <Grid item xs={11} md={5} margin={1}>
              <TextField
                required
                helperText='Ingrese los requisitos'
                margin='dense'
                fullWidth
                size='small'
                label='Requisitos'
                name="requisitos"
                value={form_data_flujo.requisitos}
                onChange={handle_input_change}
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
              onClick={handle_close}
              startIcon={<CloseIcon />}
            >
              Cerrar
            </Button>
            <Button variant="contained" startIcon={<SaveIcon />} onClick={handle_agregar_flujo}>
              Agregar
            </Button>
          </Stack>
        </DialogActions>
      </Box>
    </Dialog>
  );
};