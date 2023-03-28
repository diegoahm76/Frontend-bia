
import { useEffect, useState } from 'react';
import { Autocomplete, Box, Button, Grid, TextField, Stack, Chip } from "@mui/material";
import { Title } from "../../../../components";
import { get_nurseries_closing_service, closing_nursery_service } from '../store/thunks/gestorViveroThunks';
// // Hooks
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { type IObjNursery } from "../interfaces/vivero";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import { Controller, useForm } from 'react-hook-form';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function AperturaCierreViveroScreen(): JSX.Element {
  const { nurseries, current_nursery } = useAppSelector((state) => state.nursery);
  const dispatch = useAppDispatch();

  const [action, set_action] = useState<string>("");
  const [nursery, set_nursery] = useState<IObjNursery>(current_nursery);

  const { control: control_vivero, handleSubmit: handle_submit, reset: reset_nursery } =
    useForm<IObjNursery>();

  const on_submit = (data: IObjNursery): void => {

    const form_data = {
      accion: action,
      justificacion_apertura: action === "Abrir" ? data.justificacion_apertura : null,
      justificacion_cierre: action === "Abrir" ? null : data.justificacion_cierre,
      en_funcionamiento: action === "Abrir",
      item_ya_usado: action === "Abrir" ? true : data.item_ya_usado
    }
    void dispatch(closing_nursery_service(form_data, data.id_vivero));
    set_nursery({...data, 
      justificacion_apertura: "",
      justificacion_cierre: "",
      en_funcionamiento: form_data.en_funcionamiento,
      item_ya_usado: form_data.item_ya_usado
    })


  };

  useEffect(() => {
    void dispatch(get_nurseries_closing_service());
    set_nursery(current_nursery)
  }, []);

  useEffect(() => {
    set_nursery(current_nursery)
  }, [current_nursery]);

  useEffect(() => {
    set_action(nursery.id_vivero===null ? "": nursery.en_funcionamiento?"Cerrar" : "Abrir")
    reset_nursery(nursery);
  }, [nursery]);

  const nurseries_closing = {
    options: nurseries,
    getOptionLabel: (option: IObjNursery) => option.nombre,
  };


  return (
    <>
      <Grid
        container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid container>
          <Title title="Apertura y cierre de viveros"></Title>
          <Box
          sx={{ width: '100%' }}
            component="form"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={handle_submit(on_submit)}
            justifyItems="center"
          >
          <Grid item xs={11} md={12} margin={2} >
              <Autocomplete
                {...nurseries_closing}
                id="controlled-demo"
                value={nursery}
                onChange={(event: any, newValue: any) => {
                  set_nursery(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Seleccione vivero" variant="standard" />
                )}
              />
          </Grid>
          {action === "Abrir" ? 
          <Chip label="El vivero se encuentra cerrado" color="error" variant="outlined" />
          : action === "Cerrar" ? 
          <Chip label="El vivero se encuentra abierto" color="success" variant="outlined" /> 
          : 
          <Chip label="Seleccione vivero" color="warning" variant="outlined" />
          }
          
          
            <Grid item xs={11} md={12} marginTop={2} marginX={1}>
              <Controller
                name={action === "Abrir" ? "justificacion_cierre" :"justificacion_apertura"}
                control={control_vivero}
                defaultValue=""
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    margin="dense"
                    fullWidth
                    multiline
                    rows={4}
                    size="small"
                    label={action === "Abrir" ? "Justificación de apertura" : action === "Cerrar" ? "Justificación de cierre" : "Justificación"}
                    variant="outlined"
                    disabled={action===""}
                    value={value}
                    onChange={onChange}
                    error={!(error == null)}
                    helperText={
                      error != null
                        ? 'Es obligatorio ingresar justificación'
                        : 'Ingrese justificación'
                    }
                  />
                )}
              />
            </Grid>
            <Stack
              direction="row"
              spacing={2}
              sx={{ mr: '15px', mb: '10px', mt: '10px' }}
            >
              {action === "Abrir" ?
                <Button type="submit" variant="contained" startIcon={<LockOpenIcon />}>
                  Realizar Apertura
                </Button> :
                 action === "Cerrar" ?
                <Button type="submit" variant="contained" startIcon={<LockIcon />}>
                  Realizar cierre
                </Button>:
                null
              }
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
