/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormHelperText, Grid, InputLabel, MenuItem, TextField } from '@mui/material';
import type React from 'react';
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { Controller, useForm } from "react-hook-form";
import { crearPersona } from '../../requets/getRequest';
import Select from "react-select";
import { api } from '../../../../api/axios';
import { type PersonasEstacion } from '../interfaces/interfaces';

interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const NuevoUsuarioModal: React.FC<IProps> = ({ is_modal_active, set_is_modal_active }) => {
  const [estaciones_options, set_estaciones_options] = useState([]);

  const handle_close = (): void => {
    set_is_modal_active(false);
  }  
  const {
    register,
    control,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    handleSubmit,
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

  const on_sumbit_persona = (data: PersonasEstacion): void => {
    const nueva_persona = {

      cod_tipo_documento_id: data.cod_tipo_documento_id,
      numero_documento_id: data.numero_documento_id,
      primer_nombre: data.primer_nombre,
      segundo_nombre: data.segundo_nombre,
      primer_apellido: data.primer_apellido,
      segundo_apellido: data.segundo_apellido,
      entidad: data.entidad,
      cargo: data.cargo,
      email_notificacion: data.email_notificacion,
      nro_celular_notificacion: data.nro_celular_notificacion,
      observacion: data.observacion,
      id_estacion: data.estacion.value,
    };
    void crearPersona(nueva_persona);
    set_is_modal_active(!is_modal_active);
  };

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
      <DialogTitle>Nuevo usuario</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(on_sumbit_persona)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Tipo de Identificación"
                select
                fullWidth
                {...register("cod_tipo_documento_id", { required: true })}
                error={Boolean(errors.cod_tipo_documento_id)}
                helperText={(errors.cod_tipo_documento_id != null) ? "Este campo es obligatorio" : ""}
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
                {...register("numero_documento_id", { required: true })}
                error={Boolean(errors.numero_documento_id)}
                helperText={(errors.numero_documento_id != null) ? "Este campo es obligatorio" : ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Primer Nombre"
                fullWidth
                {...register("primer_nombre", { required: true })}
                error={Boolean(errors.primer_nombre)}
                helperText={(errors.primer_nombre != null) ? "Este campo es obligatorio" : ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Segundo Nombre"
                fullWidth
                {...register("segundo_nombre", { required: true })}
                error={Boolean(errors.segundo_nombre)}
                helperText={(errors.segundo_nombre != null) ? "Este campo es obligatorio" : ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Primer Apellido"
                fullWidth
                {...register("primer_apellido", { required: true })}
                error={Boolean(errors.primer_apellido)}
                helperText={(errors.primer_apellido != null) ? "Este campo es obligatorio" : ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Segundo Apellido"
                fullWidth
                {...register("segundo_apellido", { required: true })}
                error={Boolean(errors.segundo_apellido)}
                helperText={(errors.segundo_apellido != null) ? "Este campo es obligatorio" : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Entidad a la cual pertenece"
                fullWidth
                placeholder="Entidad a la cual pertenece"
                {...register("entidad", { required: true })}
                error={Boolean(errors.entidad)}
                helperText={(errors.entidad != null) ? "Este campo es obligatorio" : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Cargo"
                fullWidth
                {...register("cargo", { required: true })}
                error={Boolean(errors.cargo)}
                helperText={(errors.cargo != null) ? "Este campo es obligatorio" : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Correo Electronico"
                type="email"
                fullWidth
                {...register("email_notificacion", { required: true })}
                error={Boolean(errors.email_notificacion)}
                helperText={(errors.email_notificacion != null) ? "Este campo es obligatorio" : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Número Celular"
                type="number"
                fullWidth
                {...register("nro_celular_notificacion", { required: true })}
                error={Boolean(errors.nro_celular_notificacion)}
                helperText={
                  (errors.nro_celular_notificacion != null) ? "Este campo es obligatorio" : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Observación"
                multiline
                fullWidth
                {...register("observacion", { required: true })}
                error={Boolean(errors.observacion)}
                helperText={(errors.observacion != null) ? "Este campo es obligatorio" : ""}
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
              Guardar
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>

  );
};