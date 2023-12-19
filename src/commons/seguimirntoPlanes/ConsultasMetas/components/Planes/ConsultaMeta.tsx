/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import {
  Box,
  ButtonGroup,
  Chip,
  Divider,
  Grid,
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
import { DataContextConsularMetas } from '../../context/context';
import { Controller, useForm } from 'react-hook-form';
import React from 'react';
import { containerStyles } from '../../../../gestorDocumental/tca/screens/utils/constants/constants';
import { useConsultaMetasHook } from '../../hooks/useConsultaMetasHook';
import Swal from 'sweetalert2';
import { LoadingButton } from '@mui/lab';
import { Bar, Line } from 'react-chartjs-2';
// import { Doughnut, Radar } from 'react-chartjs-2';
import 'chart.js/auto';
// eslint-disable-next-line @typescript-eslint/naming-convention
export const ConsultaMeta: React.FC = () => {
  const columns_metas: GridColDef[] = [
    {
      field: 'nombre_indicador',
      headerName: 'NOMBRE INDICADOR',
      sortable: true,
      width: 350,
    },
    {
      field: 'nombre_meta',
      headerName: 'NOMBRE META',
      sortable: true,
      width: 350,
    },
    {
      field: 'porcentaje_meta',
      headerName: 'PORCENTAJE META',
      sortable: true,
      width: 100,
    },
    {
      field: 'valor_meta',
      headerName: 'VALOR META',
      sortable: true,
      width: 200,
    },
    {
      field: 'agno_1',
      headerName: 'AÑO 1',
      sortable: true,
      width: 100,
    },
    {
      field: 'agno_2',
      headerName: 'AÑO 2',
      sortable: true,
      width: 100,
    },
    {
      field: 'agno_3',
      headerName: 'AÑO 3',
      sortable: true,
      width: 100,
    },
    {
      field: 'agno_4',
      headerName: 'AÑO 4',
      sortable: true,
      width: 100,
    },
    {
      field: 'valor_ejecutado_compromiso',
      headerName: 'VALOR EJECUTADO COMPROMISO',
      sortable: true,
      width: 200,
    },
    {
      field: 'valor_ejecutado_obligado',
      headerName: 'VALOR EJECUTADO OBLIGADO',
      sortable: true,
      width: 200,
    },
    {
      field: 'avance_fisico',
      headerName: 'AVANCE FISICO',
      sortable: true,
      width: 200,
    },
    {
      field: 'cumplio',
      headerName: 'CUMPLIO',
      sortable: true,
      width: 200,
      renderCell: (params) => {
        return params.row.cumplio === true ? (
          <Chip size="small" label="Si" color="success" variant="outlined" />
        ) : (
          <Chip size="small" label="No" color="error" variant="outlined" />
        );
      },
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
    rows_metas,
  } = useConsultaMetasHook();

  const {
    id_plan,
    id_programa,
    id_proyecto,
    id_producto,
    id_actividad,
    id_inidicador,
    planes_selected,
    programas_selected,
    proyectos_selected,
    productos_selected,
    actividades_selected,
    indicadores_selected,
    set_id_plan,
    set_id_programa,
    set_id_proyecto,
    set_id_producto,
    set_id_actividad,
    set_id_inidicador,
    fetch_data_planes_selected,
    fetch_data_programas_selected,
    fetch_data_proyectos_selected,
    fetch_data_productos_selected,
    fetch_data_actividades_selected,
    fetch_data_indicadores_selected,
  } = useContext(DataContextConsularMetas);

  useEffect(() => {
    console.log('useEffect');
    void fetch_data_planes_selected();
  }, []);

  useEffect(() => {
    console.log('useEffect');
    if (id_plan) {
      void fetch_data_programas_selected();
    }
  }, [id_plan]);

  useEffect(() => {
    console.log('useEffect');
    if (id_programa) {
      void fetch_data_proyectos_selected();
    }
  }, [id_programa]);

  useEffect(() => {
    console.log('useEffect');
    if (id_proyecto) {
      void fetch_data_productos_selected();
    }
  }, [id_proyecto]);

  useEffect(() => {
    console.log('useEffect');
    if (id_producto) {
      void fetch_data_actividades_selected();
    }
  }, [id_producto]);

  useEffect(() => {
    console.log('useEffect');
    if (id_actividad) {
      void fetch_data_indicadores_selected();
    }
  }, [id_actividad]);

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

  // Estado para almacenar la información de cumplimiento
  const [cumplidoData, setCumplidoData] = useState<{
    labels: string[];
    datasets: any[];
  }>({
    labels: [],
    datasets: [
      {
        label: 'Cumplido',
        data: [],
        backgroundColor: 'rgba(75,192,192,0.4)', // Color de barras para cumplido
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
      {
        label: 'No Cumplido',
        data: [],
        backgroundColor: 'rgba(255,99,132,0.4)', // Color de barras para no cumplido
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
      },
    ],
  });

  // Efecto para actualizar el estado de las gráficas cuando cambia la información
  useEffect(() => {
    const cumplidoTrue = rows_metas.filter(
      (row: { cumplio: boolean }) => row.cumplio === true
    ).length;
    const cumplidoFalse = rows_metas.filter(
      (row: { cumplio: boolean }) => row.cumplio === false
    ).length;

    setCumplidoData({
      labels: ['Cumplido', 'No Cumplido'],
      datasets: [
        {
          label: 'Cumplido',
          data: [cumplidoTrue, 0],
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1,
        },
        {
          label: 'No Cumplido',
          data: [0, cumplidoFalse],
          backgroundColor: 'rgba(255,99,132,0.4)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
        },
      ],
    });
  }, [rows_metas]);

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
          <Title title="Consulta por metas " />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Controller
            name="id_programa"
            control={control_consulta_metas}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Seleccione un plan"
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
                {planes_selected.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Controller
            name="id_proyecto"
            control={control_consulta_metas}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Seleccione un programa"
                size="small"
                margin="dense"
                disabled={false}
                fullWidth
                required
                onChange={(event) => {
                  field.onChange(event);
                  set_id_programa(Number(event.target.value));
                }}
              >
                {programas_selected.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Controller
            name="id_producto"
            control={control_consulta_metas}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Seleccione un proyecto"
                size="small"
                margin="dense"
                disabled={false}
                fullWidth
                required
                onChange={(event) => {
                  field.onChange(event);
                  set_id_producto(Number(event.target.value));
                }}
              >
                {proyectos_selected.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Controller
            name="id_actividad"
            control={control_consulta_metas}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Seleccione un producto"
                size="small"
                margin="dense"
                disabled={false}
                fullWidth
                required
                onChange={(event) => {
                  field.onChange(event);
                  set_id_actividad(Number(event.target.value));
                }}
              >
                {productos_selected.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Controller
            name="id_indicador"
            control={control_consulta_metas}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Seleccione una actividad"
                size="small"
                margin="dense"
                disabled={false}
                fullWidth
                required
                onChange={(event) => {
                  field.onChange(event);
                  set_id_inidicador(Number(event.target.value));
                }}
              >
                {actividades_selected.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Controller
            name="id_indicador"
            control={control_consulta_metas}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Seleccione un indicador"
                size="small"
                margin="dense"
                disabled={false}
                fullWidth
                required
                onChange={(event) => {
                  field.onChange(event);
                  set_id_inidicador(Number(event.target.value));
                }}
              >
                {indicadores_selected.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        {id_inidicador ? (
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
                          ? 'Es obligatorio la fecha de inicio de la meta'
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
            {rows_metas.length > 0 ? (
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
                        title: 'CREAR PLAN',
                      })}
                    </ButtonGroup>
                    <DataGrid
                      density="compact"
                      autoHeight
                      rows={rows_metas}
                      columns={columns_metas}
                      pageSize={10}
                      rowsPerPageOptions={[10]}
                      getRowId={(row) => uuidv4()}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <Bar data={cumplidoData} />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <Line data={cumplidoData} />
                  </Box>
                </Grid>
              </>
            ) : (
              <></>
              // <Loader />
            )}
          </>
        ) : (
          <></>
        )}
      </Grid>
    </>
  );
};
