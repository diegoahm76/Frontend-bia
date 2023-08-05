/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, InputLabel, Stack, TextField } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { useState, type Dispatch, type SetStateAction, type ChangeEvent } from 'react';
import type { OpcionLiquidacion } from "../../../interfaces/liquidacion";

interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
  opcion_liquidacion: OpcionLiquidacion;
  add_new_row: (valor: string, variables: Record<string, string>) => void;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DetalleModal: React.FC<IProps> = ({ is_modal_active, set_is_modal_active, opcion_liquidacion, add_new_row }: IProps) => {
  const [variables_datos, set_variables_datos] = useState<Record<string, string>>({});

  const handle_close = (): void => {
    set_is_modal_active(false);
  }

  const handle_input_change = (event: React.ChangeEvent<HTMLInputElement>, key: string): void => {
    const { value } = event.target;
    set_variables_datos((prevInputs) => ({
      ...prevInputs,
      [key]: value,
    }));
  };

  const handle_liquidar = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const re = new RegExp(Object.keys(variables_datos).join('|'), 'gi');
    const formula = opcion_liquidacion.funcion.replace(re, matched => variables_datos[matched]);
    add_new_row(formula, variables_datos);
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
        onSubmit={handle_liquidar}
        sx={{
          width: '500px'
        }}
      >
        <DialogTitle>Liquidar</DialogTitle>
        <Divider />

        <DialogContent sx={{ mb: '0px' }}>
          <Grid container direction='row'>
            <Grid item xs={11} md={5} margin={1}>
              <InputLabel sx={{ fontWeight: 'bold', p: '20px' }}>Parametros</InputLabel>
              {opcion_liquidacion && Object.keys(opcion_liquidacion?.variables).map((key, index) => (
                <div key={index}>
                  <Divider />
                  <InputLabel sx={{ p: '18.5px' }}>{key}</InputLabel>
                </div>
              ))}
            </Grid>

            <Grid item xs={11} md={5} margin={1}>
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
                    onChange={(event: ChangeEvent<HTMLInputElement>) => { handle_input_change(event, key) }}
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
            >
              Liquidar
            </Button>
          </Stack>
        </DialogActions>
      </Box>
    </Dialog>
  )
}
