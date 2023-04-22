/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect, useState } from 'react';
import { Autocomplete, Box, Button, Grid, TextField, Stack, Chip } from "@mui/material";
import { Title } from "../../../../components";
import { get_nurseries_closing_service, quarantine_nursery_service, get_nursery_service } from '../store/thunks/gestorViveroThunks';
// // Hooks
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { type IObjNursery } from "../interfaces/vivero";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';



// eslint-disable-next-line @typescript-eslint/naming-convention
export function CuarentenaViveroScreen(): JSX.Element {
  const { nurseries, current_nursery } = useAppSelector((state) => state.nursery);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [action, set_action] = useState<string>("");
  
  const [nursery, set_nursery] = useState<IObjNursery>(current_nursery);

  const { control: control_vivero, handleSubmit: handle_submit, reset: reset_nursery } =
    useForm<IObjNursery>();

  const on_submit = (data: IObjNursery): void => {
    
      const form_data = {
        justificacion_cuarentena: data.justificacion_cuarentena}
      
    void dispatch(quarantine_nursery_service(form_data, data.id_vivero));
    
  };

  useEffect(() => {
    void dispatch(get_nurseries_closing_service());
    console.log(id)
    if(id !== null && id !== undefined ){
      void dispatch(get_nursery_service(id))
    } else{
      set_nursery({...current_nursery, vivero_en_cuarentena: null})
    }
    
  }, []);

  useEffect(() => {
    set_nursery({...current_nursery, justificacion_cuarentena:""})
    console.log(current_nursery)
  }, [current_nursery]);

  useEffect(() => {
    reset_nursery({...nursery, justificacion_cuarentena:""});
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    set_action(nursery.id_vivero===null ? "": nursery.vivero_en_cuarentena?"Abrir" : "Cerrar")
  }, [nursery]);

  const nurseries_quarantine = {
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
          <Title title="Cuarentena de viveros"></Title>
          <Box
          sx={{ width: '100%' }}
            component="form"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={handle_submit(on_submit)}
            justifyItems="center"
          >
          <Grid item xs={11} md={12} margin={2} >
              <Autocomplete
                {...nurseries_quarantine}
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
          <Chip label="El vivero se encuentra en cuarentena" color="error" variant="outlined" />
          : action === "Cerrar" ? 
          <Chip label="El vivero no se encuentra en cuarentena" color="success" variant="outlined" /> 
          : 
          null
          }
        
         
          
        {action !== "" ? 
          <>
            <Grid item xs={11} md={12} marginTop={2} marginX={1}>
              <Controller
                name={"justificacion_cuarentena"}
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
                    label={nursery.vivero_en_cuarentena?"Justificación de finalizacion de cuarentena":"Justificacion ingreso a cuarentena"}
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
            
            <Stack
              direction="row"
              spacing={2}
              sx={{ mr: '15px', mb: '10px', mt: '10px' }}
            >
              {nursery.vivero_en_cuarentena ?
                <Button type="submit" variant="contained" startIcon={<LockOpenIcon />}>
                  Finalizar cuarentena
                </Button> :
                <Button type="submit" variant="contained" startIcon={<LockIcon />}>
                  Iniciar cuarentena
                </Button>
              }
            </Stack>
          </>
            :null
          }

          </Box>
        </Grid>
      </Grid>
    </>
  );
}
