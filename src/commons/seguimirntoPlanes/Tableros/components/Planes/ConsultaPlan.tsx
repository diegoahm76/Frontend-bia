/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { Divider, Grid, TextField, Typography } from '@mui/material';

//* FECHAS
// import type { Dayjs } from 'dayjs';
// import dayjs from 'dayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { Title } from '../../../../../components/Title';
import { useContext, useEffect } from 'react';
import React from 'react';
import { containerStyles } from '../../../../gestorDocumental/tca/screens/utils/constants/constants';
import { useConsultaMetasHook } from '../../hooks/useConsultaMetasHook';
import Swal from 'sweetalert2';
import { LoadingButton } from '@mui/lab';
import 'chart.js/auto';
import { ConsultarProyecto } from './Proyectos/ConsultarProyecto';
import { ConsultarProgramasPlanes } from './Programas/ConsultarProgramasPlanes';
import { ConsultarActividades } from './Actividades/ConsultarActividades';
import { ConsultarProductos } from './Productos/ConsultarProductos';
import { ConsultarIndicadores } from './Indicadores/ConsultarIndicadores';
import { ConsultarMetas } from './Metas/ConsultarMetas';
import { DataContextConsulas } from '../../context/context';
// eslint-disable-next-line @typescript-eslint/naming-convention
export const ConsultaPlan: React.FC = () => {
  const {
    errors_consulta_metas,
    register_consulta_metas,
    fecha_inicio,
    fecha_fin,
    // funciones de fechas
    handle_change_fecha_inicio,
    handle_change_fecha_fin,
    // funciones de consulta
    fetch_data_programas,
    fetch_data_proyectos,
    fetch_data_productos,
    fetch_data_actividades,
    fetch_data_indicadores,
    fetch_data_metas_id_plan,
    loading,
  } = useConsultaMetasHook();

  const {
    id_plan,
    ver_programas,
    ver_proyectos,
    ver_productos,
    ver_actividades,
    ver_indicadores,
    ver_metas,
  } = useContext(DataContextConsulas);

  // validacion la fecha de inicio no sea mayor a la fecha de fin

  useEffect(() => {
    console.log('useEffect');
    console.log(fecha_inicio, 'fecha inicio');
    console.log(fecha_fin, 'fecha fin');
    if (fecha_inicio > fecha_fin) {
      void Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'la fecha de inicio no puede ser mayor a la fecha de fin',
      });
      // alert('la fecha de inicio no puede ser mayor a la fecha de fin');
    }
  }, [fecha_inicio, fecha_fin]);

  return (
    <>
      {id_plan ? (
        <>
          <Grid
            container
            spacing={2}
            sx={{
              ...containerStyles,
              mt: '2.5rem',
              position: 'static',
              display: 'flex',
              // justifyContent: 'center',
            }}
          >
            <Grid item xs={12}>
              <Title title="Parametrizacion de la consulta " />
            </Grid>
            <Grid item xs={12}>
              <Divider />
              <Typography variant="subtitle1" fontWeight="bold">
                Ingrese rango de fechas{' '}
              </Typography>
            </Grid>{' '}
            <Grid item xs={12} sm={6} md={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Fecha de inicio"
                  value={fecha_inicio}
                  onChange={(value) => {
                    handle_change_fecha_inicio(value);
                  }}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      fullWidth
                      size="small"
                      {...register_consulta_metas('fecha_inicio', {
                        required: true,
                      })}
                      error={!!errors_consulta_metas.fecha_inicio}
                      helperText={
                        errors_consulta_metas.fecha_inicio
                          ? 'Es obligatorio la fecha de inicio del proyecto'
                          : ''
                      }
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Fecha de fin"
                  value={fecha_fin}
                  onChange={(value) => {
                    handle_change_fecha_fin(value);
                  }}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      fullWidth
                      size="small"
                      {...register_consulta_metas('fecha_fin', {
                        required: true,
                      })}
                      error={!!errors_consulta_metas.fecha_fin}
                      helperText={
                        errors_consulta_metas.fecha_fin
                          ? 'Es obligatorio la fecha de fin del proyecto'
                          : ''
                      }
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <LoadingButton
                variant="contained"
                color="primary"
                onClick={() => {
                  fetch_data_programas();
                  fetch_data_proyectos();
                  fetch_data_productos();
                  fetch_data_actividades();
                  fetch_data_indicadores();
                  fetch_data_metas_id_plan();
                }}
                loading={loading ?? false}
                disabled={loading ?? false}
              >
                Consultar
              </LoadingButton>
            </Grid>
            {ver_programas ? <ConsultarProgramasPlanes /> : null}
            {ver_proyectos ? <ConsultarProyecto /> : null}
            {ver_productos ? <ConsultarProductos /> : null}
            {ver_actividades ? <ConsultarActividades /> : null}
            {ver_indicadores ? <ConsultarIndicadores /> : null}
            {ver_metas ? <ConsultarMetas /> : null}
          </Grid>
        </>
      ) : null}
    </>
  );
};
