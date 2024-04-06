/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import {
  Avatar,
  Box,
  ButtonGroup,
  Chip,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';

//* FECHAS
// import type { Dayjs } from 'dayjs';
// import dayjs from 'dayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { Title } from '../../../../../components/Title';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import { useContext, useEffect, useState } from 'react';
import { download_pdf } from '../../../../../documentos-descargar/PDF_descargar';
import { download_xls } from '../../../../../documentos-descargar/XLS_descargar';
import { DataContextConsularSeguiminetoPAI } from '../../context/context';
import { Controller, useForm } from 'react-hook-form';
import React from 'react';
import { containerStyles } from '../../../../gestorDocumental/tca/screens/utils/constants/constants';
import { useConsultaMetasHook } from '../../hooks/useConsultaMetasHook';
import Swal from 'sweetalert2';
import { LoadingButton } from '@mui/lab';
// import { Bar, Line } from 'react-chartjs-2';
// import { Doughnut, Radar } from 'react-chartjs-2';
import 'chart.js/auto';
import CheckIcon from '@mui/icons-material/Check';
import {
  set_current_mode_planes,
  set_current_seguimiento_pai,
} from '../../../store/slice/indexPlanes';
import { useAppDispatch } from '../../../../../hooks';
// eslint-disable-next-line @typescript-eslint/naming-convention
export const ConsultaSeguimientoPAI: React.FC = () => {
  const columns_seguimiento_pai: GridColDef[] = [
    {
      field: 'razagada',
      headerName: 'REZAGADA',
      sortable: true,
      width: 150,
      renderCell: (params) => {
        return params.row.razagada === true ? (
          <Chip size="small" label="SI" color="success" variant="outlined" />
        ) : (
          <Chip size="small" label="No" color="error" variant="outlined" />
        );
      },
    },
    {
      field: 'fecha_registro_avance',
      headerName: 'FECHA REGISTRO AVANCE',
      sortable: true,
      width: 150,
    },
    {
      field: 'porcentaje_avance',
      headerName: 'PORCENTAJE AVANCE',
      sortable: true,
      width: 150,
    },
    {
      field: 'mes',
      headerName: 'MES',
      sortable: true,
      width: 150,
    },
    {
      field: 'nombre_meta',
      headerName: 'NOMBRE META',
      sortable: true,
      width: 250,
    },
    {
      field: 'acciones',
      headerName: 'ACCIONES',
      sortable: true,
      width: 200,
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton
            size="small"
            onClick={() => {
              dispatch(
                set_current_mode_planes({
                  ver: true,
                  crear: false,
                  editar: false,
                })
              );
              dispatch(set_current_seguimiento_pai(params.row));
            }}
          >
            <Avatar
              sx={{
                width: 24,
                height: 24,
                background: '#fff',
                border: '2px solid',
              }}
              variant="rounded"
            >
              <CheckIcon
                titleAccess="Seleccionar seguimiento PAI"
                sx={{
                  color: 'primary.main',
                  width: '18px',
                  height: '18px',
                }}
              />
            </Avatar>
          </IconButton>
        </>
      ),
    },
  ];

  const {
    control_consulta_metas,
    errors_consulta_metas,
    register_consulta_metas,
    fecha_inicio,
    fecha_fin,
    // funciones de fechas
    handle_change_fecha_inicio,
    handle_change_fecha_fin,
    // funciones de consulta
    fetch_data_metas,
    loading,
    rows_seguimiento_pai,
  } = useConsultaMetasHook();

  const dispatch = useAppDispatch();

  const {
    id_plan,
    pai_selected,
    set_id_plan,
    fetch_data_seguimiento_pai_selected,
  } = useContext(DataContextConsularSeguiminetoPAI);

  useEffect(() => {
    console.log('useEffect');
    void fetch_data_seguimiento_pai_selected();
  }, []);

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
          <Title title="Consulta seguimiento técnico PAI " />
        </Grid>
        {/* <Grid item xs={12} sm={6} md={4}>
          <Controller
            name="id_plan"
            control={control_consulta_metas}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Seleccione un seguimiento"
                size="small"
                margin="dense"
                disabled={false}
                fullWidth
                required
                onChange={(event) => {
                  field.onChange(event);
                  set_id_plan(Number(event.target.value));
                }}
              >
                {pai_selected.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid> */}
        <>
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
                        ? 'Es obligatorio la fecha de inicio del seguimiento PAI'
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
                        ? 'Es obligatorio la fecha de fin de la meta'
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
              onClick={fetch_data_metas}
              loading={loading ?? false}
              disabled={loading ?? false}
            >
              Consultar
            </LoadingButton>
          </Grid>
          {rows_seguimiento_pai.length > 0 ? (
            <>
              <Grid item xs={12}>
                <Box sx={{ width: '100%' }}>
                  <ButtonGroup
                    style={{
                      margin: 7,
                      display: 'flex',
                      justifyContent: 'flex-end',
                    }}
                  >
                    {download_xls({
                      nurseries: [],
                      columns: [],
                    })}
                    {download_pdf({
                      nurseries: [],
                      columns: [],
                      title: 'PAI',
                    })}
                  </ButtonGroup>
                  <DataGrid
                    density="compact"
                    autoHeight
                    rows={rows_seguimiento_pai}
                    columns={columns_seguimiento_pai}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    getRowId={(row) => uuidv4()}
                  />
                </Box>
              </Grid>
            </>
          ) : (
            <></>
            // <Loader />
          )}
        </>
      </Grid>
    </>
  );
};
