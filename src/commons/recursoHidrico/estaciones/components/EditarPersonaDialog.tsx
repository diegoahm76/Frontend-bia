import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormHelperText, Grid, InputLabel, MenuItem, TextField } from '@mui/material';
import type React from 'react';
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { api } from '../../../../api/axios';
import Select from "react-select";

interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EditarPersonaDialog: React.FC<IProps> = ({ is_modal_active, set_is_modal_active }) => {

  const [estaciones_options, set_estaciones_options] = useState([]);

  const handle_close = (): void => {
    set_is_modal_active(false);
  }
  const {
    control,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    formState: { errors },
  } = useForm();

  const get_data_initial = async (): Promise<void> => {
    try {
      const { data } = await api.get('/estaciones/consultar-estaciones/');
      const estaciones_maped = data.data.map((estacion: { nombre_estacion: string; id_estacion: number | string; }) => ({
        label: estacion.nombre_estacion,
        value: estacion.id_estacion,
      }));
      set_estaciones_options(estaciones_maped);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    void get_data_initial();
  }, []);

  const tiposdoc = [
    {
      value: 'CC',
      label: 'Cédula de ciudadanía'
    },
    {
      value: 'CE',
      label: 'Cédula extranjería',
    },
    {
      value: 'TI',
      label: 'Tarjeta de identidad',
    },
    {
      value: 'RC',
      label: 'Registro civil',
    },
    {
      value: 'NU',
      label: 'NUIP'
    },
    {
      value: 'PA',
      label: 'Pasaporte',
    },
    {
      value: 'PE',
      label: 'Permiso especial de permanencia',
    },
    {
      value: 'NT',
      label: 'NIT',
    },
  ];


  return (
    <Dialog
      open={is_modal_active}
      onClose={handle_close}
    >
      <DialogTitle>Editar Parte Interesada</DialogTitle>
      <DialogContent>
        <form>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Tipo de Identificación"
                select
                fullWidth
              >
                {tiposdoc.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Número Identificación"
                type="number"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Primer Nombre"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Segundo Nombre"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Primer Apellido"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Segundo Apellido"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Entidad a la cual pertenece"
                fullWidth
                placeholder="Entidad a la cual pertenece"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Cargo"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Correo Electronico"
                type="email"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Número Celular"
                type="number"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Observación"
                multiline
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel>Estación</InputLabel>
              <Controller
                name="estacion"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={estaciones_options}
                    placeholder="Seleccionar"
                  />
                )}
              />
              {(errors.estacion != null) && (
                <FormHelperText error>Este campo es obligatorio</FormHelperText>
              )}
            </Grid>
          </Grid>
          <DialogActions>
            <Button
              variant="text"
              color="primary"
              onClick={handle_close}
            >
              Cancelar
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Actializar
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>

  );
};
