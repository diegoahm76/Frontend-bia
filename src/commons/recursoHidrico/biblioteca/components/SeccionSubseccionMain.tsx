/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type React from 'react';
import { useContext, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { DataContext } from '../context/contextData';
import { Title } from '../../../../components/Title';
import { control_success } from '../../requets/Request';
import { control_error } from '../../../../helpers';
import { post_seccion_subscción } from '../request/request';
import { EditarSeccion } from './EditarSeccion';
import { AgregarSeccion } from './AgregarSeccion';
import { SeleccionarSeccion } from './SeleccionarSeccion';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SeccionSubseccionMain: React.FC = () => {
  const {
    handleSubmit: handle_submit,
    reset,
    setValue: set_value,
    errors,
    id_seccion,
    is_editar_seccion,
    is_register_seccion,
    is_seleccionar_seccion,
    rows_resgister_subseccion,
    fetch_data_seccion,
    set_rows_register_subseccion,
    set_is_saving,
    set_mode,
  } = useContext(DataContext);

  const on_submit = handle_submit(async (form: any) => {
    try {
      set_is_saving(true);
      form.id_seccion = id_seccion;
      await post_seccion_subscción(form, rows_resgister_subseccion);
      control_success('Sección creada exitosamente');
      reset();
      set_rows_register_subseccion([]);
      await fetch_data_seccion();
      set_is_saving(false);
    } catch (error) {
      set_is_saving(false);
      control_error(error);
    }
  });
  return (
    <form
      onSubmit={(e) => {
        console.log(errors);
        void on_submit(e);
      }}
    >
      <Grid
        container
        spacing={2}
        m={2}
        p={2}
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          m: '10px 0 20px 0',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item xs={12}>
          <Title title="ADMINISTRACION SECCIONES BIBLIOTECA" />
        </Grid>
        {is_register_seccion && <AgregarSeccion />}
        {is_editar_seccion && <EditarSeccion />}
        {is_seleccionar_seccion && <SeleccionarSeccion />}
        {/* <Grid item spacing={2} justifyContent="end" container>
          <Grid item>
            <LoadingButton
              variant="outlined"
              color="primary"
              onClick={() => {
                reset();
              }}
              // startIcon={<SaveIcon />}
            >
              Limpiar
            </LoadingButton>
          </Grid>

          <Grid item>
            <LoadingButton
              type="submit"
              variant="contained"
              color="success"
              disabled={is_saving}
              loading={is_saving}
              // startIcon={<SaveIcon />}
            >
              Guardar
            </LoadingButton>
          </Grid>
        </Grid> */}
      </Grid>
    </form>
  );
};
