/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect, useState } from 'react';
import { Autocomplete, Box, Button, Grid, TextField, Stack, Chip } from "@mui/material";
import { Title } from "../../../../components";
import { get_nurseries_closing_service, closing_nursery_service, get_nursery_service } from '../store/thunks/gestorViveroThunks';
// // Hooks
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { type IObjNursery } from "../interfaces/vivero";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';



// eslint-disable-next-line @typescript-eslint/naming-convention
export function AperturaCierreViveroScreen(): JSX.Element {
  const { nurseries, current_nursery } = useAppSelector((state) => state.nursery);
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const [action, set_action] = useState<string>("");
  const [nursery, set_nursery] = useState<IObjNursery>(current_nursery);

  const { control: control_vivero, handleSubmit: handle_submit, reset: reset_nursery } =
    useForm<IObjNursery>();

  const on_submit = (data: IObjNursery): void => {
    if(action === "Abrir"){
      const form_data = {
        accion: action,
        justificacion_apertura: data.justificacion_apertura,
        fecha_cierre_actual: null,
        en_funcionamiento: true,
        item_ya_usado: true,
      }
      void dispatch(closing_nursery_service(form_data, data.id_vivero));
    } else{
      const form_data = {
        accion: action,
        justificacion_cierre: data.justificacion_cierre,
        fecha_cierre_actual: null,
        en_funcionamiento: false,
        item_ya_usado: data.item_ya_usado
      }
    void dispatch(closing_nursery_service(form_data, data.id_vivero));
    }
  };

  useEffect(() => {
    void dispatch(get_nurseries_closing_service());
    if(id !== null && id !== undefined ){
      void dispatch(get_nursery_service(id))
    } else(
      set_nursery(current_nursery)
    )
  }, []);

  useEffect(() => {
    set_nursery({...current_nursery, justificacion_apertura:"", justificacion_cierre:""})
    console.log(current_nursery)
  }, [current_nursery]);

  useEffect(() => {
    reset_nursery({...nursery, justificacion_apertura:"", justificacion_cierre:""});
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    set_action(nursery.id_vivero===null ? "": nursery.en_funcionamiento?"Cerrar" : "Abrir")
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
          null
          }
          
          {action === "Abrir" ? 
            <Grid item xs={11} md={12} marginTop={2} marginX={1}>
              <Controller
                name={"justificacion_apertura"}
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
                    label={"Justificación de apertura"}
                    variant="outlined"
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
            : action === "Cerrar" ?
            <Grid item xs={11} md={12} marginTop={2} marginX={1}>
            <Controller
              name={"justificacion_cierre"}
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
                  label={"Justificación de cierre"}
                  variant="outlined"
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
          :null
          }
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
