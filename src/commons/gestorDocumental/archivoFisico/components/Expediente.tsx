/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogContent,
  Grid,
  MenuItem,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { Title } from '../../../../components';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { IObjBandejas, IObjExpediente } from '../interface/archivoFisico';
import { IList } from '../../configuracionMetadatos/interfaces/Metadatos';
import { api } from '../../../../api/axios';
import { get_expediente } from '../store/thunks/thunksArchivoFisico';

import { initial_state_carpeta } from '../../deposito/store/slice/indexDeposito';
import { ButtonAdminCarpetas } from './BotonCarpetas';
interface IProps {
  open: any;
  handle_close_exp: any;
  selected_arbol: any;
}

const VerExpediente = ({ open, handle_close_exp, selected_arbol }: IProps) => {
  const { control: control_exp, reset: reset_exp } = useForm<IObjExpediente>();

  const { expediente } = useAppSelector((state) => state.archivo_fisico);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(get_expediente(selected_arbol.id_carpeta));
  }, []);

  useEffect(() => {
    reset_exp(expediente);
  }, [expediente]);
  console.log(selected_arbol);

  return (
    <>
      <Dialog fullWidth maxWidth="lg" open={open} onClose={handle_close_exp}>
        <DialogContent>
          <Grid
            container
            spacing={2}
            sx={{
              position: 'relative',
              background: '#FAFAFA',
              borderRadius: '15px',
              p: '20px',
              mb: '20px',
              boxShadow: '0px 3px 6px #042F4A26',
              marginLeft: '-5px',
            }}
          >
            <Title title="INFORMACIÓN DEL EXPEDIENTE" />

            <Grid container justifyContent="center">
              <Grid item xs={12} sm={3} margin={2}>
                <Controller
                  name="titulo_expediente"
                  control={control_exp}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      autoFocus
                      margin="dense"
                      fullWidth
                      size="small"
                      label="Titulo"
                      variant="outlined"
                      disabled={true}
                      defaultValue={value}
                      value={value}
                      onChange={onChange}
                      error={!(error == null)}
                      sx={{
                        backgroundColor: 'white',
                      }}
                      InputLabelProps={{ shrink: true }}
                    ></TextField>
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={3} marginTop={2} margin={2}>
                <Controller
                  name="descripcion_expediente"
                  control={control_exp}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      autoFocus
                      margin="dense"
                      fullWidth
                      size="small"
                      label="Descripción"
                      variant="outlined"
                      disabled={true}
                      defaultValue={value}
                      value={value}
                      onChange={onChange}
                      error={!(error == null)}
                      sx={{
                        backgroundColor: 'white',
                      }}
                      InputLabelProps={{ shrink: true }}
                    ></TextField>
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={3} marginTop={2} margin={2}>
                <Controller
                  name="nombre_serie"
                  control={control_exp}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      autoFocus
                      margin="dense"
                      fullWidth
                      size="small"
                      label="Serie"
                      variant="outlined"
                      disabled={true}
                      defaultValue={value}
                      value={value}
                      onChange={onChange}
                      error={!(error == null)}
                      sx={{
                        backgroundColor: 'white',
                      }}
                      InputLabelProps={{ shrink: true }}
                    ></TextField>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={3} marginTop={2} margin={2}>
                <Controller
                  name="nombre_subserie"
                  control={control_exp}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      autoFocus
                      margin="dense"
                      fullWidth
                      size="small"
                      label="Subserie"
                      variant="outlined"
                      disabled={true}
                      defaultValue={value}
                      value={value}
                      onChange={onChange}
                      error={!(error == null)}
                      sx={{
                        backgroundColor: 'white',
                      }}
                      InputLabelProps={{ shrink: true }}
                    ></TextField>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={3} marginTop={2} margin={2}>
                <Controller
                  name="Nombre_Persona_titular"
                  control={control_exp}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      autoFocus
                      margin="dense"
                      fullWidth
                      size="small"
                      label="Persona Titular"
                      variant="outlined"
                      disabled={true}
                      defaultValue={value}
                      value={value}
                      onChange={onChange}
                      error={!(error == null)}
                      sx={{
                        backgroundColor: 'white',
                      }}
                      InputLabelProps={{ shrink: true }}
                    ></TextField>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={3} marginTop={2} margin={2}>
                <Controller
                  name="estado_expediente"
                  control={control_exp}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      autoFocus
                      margin="dense"
                      fullWidth
                      size="small"
                      label="Estado"
                      variant="outlined"
                      disabled={true}
                      defaultValue={value}
                      value={value}
                      onChange={onChange}
                      error={!(error == null)}
                      sx={{
                        backgroundColor: 'white',
                      }}
                      InputLabelProps={{ shrink: true }}
                    ></TextField>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={3} marginTop={2} margin={2}>
                <Controller
                  name="fecha_folio_inicial"
                  control={control_exp}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      autoFocus
                      margin="dense"
                      fullWidth
                      size="small"
                      label="Fecha Inicial"
                      variant="outlined"
                      disabled={true}
                      defaultValue={value}
                      value={value}
                      onChange={onChange}
                      error={!(error == null)}
                      sx={{
                        backgroundColor: 'white',
                      }}
                      InputLabelProps={{ shrink: true }}
                    ></TextField>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={3} marginTop={2} margin={2}>
                <Controller
                  name="fecha_folio_final"
                  control={control_exp}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      autoFocus
                      margin="dense"
                      fullWidth
                      size="small"
                      label="Fecha Final"
                      variant="outlined"
                      disabled={true}
                      defaultValue={value}
                      value={value}
                      onChange={onChange}
                      error={!(error == null)}
                      sx={{
                        backgroundColor: 'white',
                      }}
                      InputLabelProps={{ shrink: true }}
                    ></TextField>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={3} marginTop={2} margin={2}>
                <Controller
                  name="etapa_de_archivo"
                  control={control_exp}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      autoFocus
                      margin="dense"
                      fullWidth
                      size="small"
                      label="Etapa del Archivo"
                      variant="outlined"
                      disabled={true}
                      defaultValue={value}
                      value={value}
                      onChange={onChange}
                      error={!(error == null)}
                      sx={{
                        backgroundColor: 'white',
                      }}
                      InputLabelProps={{ shrink: true }}
                    ></TextField>
                  )}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} marginTop={2} justifyContent="flex-end"  marginRight={14}>
            
              <Button
                variant="outlined"
                color="error"
                onClick={handle_close_exp}
              >
                Salir
              </Button>
           
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VerExpediente;
