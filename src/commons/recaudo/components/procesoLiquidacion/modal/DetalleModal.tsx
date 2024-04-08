/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, Grid, InputLabel, MenuItem, Select, type SelectChangeEvent, Stack, TextField, Typography } from "@mui/material"
import { useState, type Dispatch, type SetStateAction, type ChangeEvent, useEffect, useMemo } from 'react';
import type { OpcionLiquidacion } from "../../../interfaces/liquidacion";
import { api } from "../../../../../api/axios";
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
  add_new_row: (valor: string, variables: Record<string, string>, opcion_liquidacion: OpcionLiquidacion, id_opcion_liquidacion: string, concepto: string) => void;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DetalleModal: React.FC<IProps> = ({ is_modal_active, set_is_modal_active, add_new_row }: IProps) => {
  const [opciones_liquidacion, set_opciones_liquidacion] = useState<OpcionLiquidacion[]>([]);
  const [id_opcion_liquidacion, set_id_opcion_liquidacion] = useState("");
  const [concepto, set_concepto] = useState('');
  const [variables_datos, set_variables_datos] = useState<Record<string, string>>({});

  const opcion_liquidacion: OpcionLiquidacion = useMemo(() => opciones_liquidacion.filter(opcion_liquidacion => opcion_liquidacion.id === Number(id_opcion_liquidacion))[0], [id_opcion_liquidacion]);

  useEffect(() => {
    api.get('recaudo/liquidaciones/opciones-liquidacion-base/')
      .then((response) => {
        set_opciones_liquidacion(response.data.data);
      })
      .catch((error) => {
        //  console.log('')(error);
      });
  }, []);

  const handle_close = (): void => {
    set_is_modal_active(false);
  }

  const handle_variables_change = (event: React.ChangeEvent<HTMLInputElement>, key: string): void => {
    const { value } = event.target;
    set_variables_datos((prevInputs) => ({
      ...prevInputs,
      [key]: value,
    }));
  };

  const handle_select_change: (event: SelectChangeEvent) => void = (event: SelectChangeEvent) => {
    set_id_opcion_liquidacion(event.target.value);
  }

  const handle_input_change = (event: React.ChangeEvent<HTMLInputElement>): void => {
    set_concepto(event.target.value);
  };

  const handle_agregar_detalle = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const regex = new RegExp(Object.keys(variables_datos).map((propiedad) => `\\b${propiedad}\\b`).join('|'), 'g');
    const formula = opcion_liquidacion.funcion.replace(regex, matched => variables_datos[matched]);
    add_new_row(formula, variables_datos, opcion_liquidacion, id_opcion_liquidacion, concepto);
    set_id_opcion_liquidacion('');
    set_concepto('');
    set_variables_datos({});
    handle_close();
  };

  return (
    <Dialog
      maxWidth="xl"
      open={is_modal_active}
      onClose={handle_close}
    >
      <Box
        component="form"
        onSubmit={handle_agregar_detalle}
        sx={{
          width: '500px'
        }}
      >
        <DialogTitle>Liquidar</DialogTitle>
        <Divider />

        <DialogContent sx={{ mb: '0px' }}>

          <Grid container direction='column'>
            <Grid item xs={11} md={5} margin={1}>
              <FormControl sx={{ pb: '10px' }} size='small' fullWidth required>
                <InputLabel>Selecciona opción liquidación</InputLabel>
                <Select
                  label='Selecciona opción liquidación'
                  value={id_opcion_liquidacion}
                  MenuProps={{
                    style: {
                      maxHeight: 224,
                    }
                  }}
                  onChange={handle_select_change}
                >
                  {opciones_liquidacion.map((opc_liquidacion) => (
                    <MenuItem key={opc_liquidacion.id} value={opc_liquidacion.id}>
                      {opc_liquidacion.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={11} md={5} margin={1}>
              <TextField
                label='Concepto'
                size="small"
                fullWidth
                value={concepto}
                onChange={handle_input_change}
                required
              />
            </Grid>
          </Grid>

          <Grid container direction='row'>
            <Grid item xs={6}>
              <InputLabel sx={{ fontWeight: 'bold', p: '20px' }}>Parametros</InputLabel>
              {opcion_liquidacion && Object.keys(opcion_liquidacion?.variables).map((key, index) => (
                <div key={index}>
                  <Divider />
                  <InputLabel sx={{ p: '18.5px' }}>{key}</InputLabel>
                </div>
              ))}
            </Grid>

            <Grid item xs={6}>
              <InputLabel sx={{ fontWeight: 'bold', p: '20px' }}>Valor</InputLabel>
              {opcion_liquidacion && Object.keys(opcion_liquidacion?.variables).map((key, index) => (
                <div key={index}>
                  <Divider />
                  <TextField
                    type="number"
                    sx={{ p: '10px' }}
                    size="small"
                    value={variables_datos[key] || ''}
                    required
                    onChange={(event: ChangeEvent<HTMLInputElement>) => { handle_variables_change(event, key) }}
                  />
                </div>
              ))}
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
              startIcon={<CloseIcon />}
              onClick={handle_close}
            >
              Cerrar
            </Button>
            <Button
              type="submit"
              variant="contained"
              startIcon={<AddIcon />}
            >
              Agregar
            </Button>
          </Stack>
        </DialogActions>
      </Box>
    </Dialog>
  )
}
