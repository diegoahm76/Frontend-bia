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
import { DataContextConsulas } from '../../context/context';
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
export const ConsultaProyecto: React.FC = () => {
  const columns_proyecto: GridColDef[] = [
    {
      field: 'nombre_programa',
      headerName: 'NOMBRE DEL PROGRAMA',
      sortable: true,
      width: 300,
    },
    {
      field: 'nombre_proyecto',
      headerName: 'NOMBRE DEL PROYECTO',
      sortable: true,
      width: 300,
    },
    {
      field: 'numero_proyecto',
      headerName: 'NUMERO DEL PROYECTO',
      sortable: true,
      width: 200,
    },
    {
      field: 'pondera_1',
      headerName: 'AÑO 1',
      sortable: true,
      width: 130,
    },
    {
      field: 'pondera_2',
      headerName: 'AÑO 2',
      sortable: true,
      width: 130,
    },
    {
      field: 'pondera_3',
      headerName: 'AÑO 3',
      sortable: true,
      width: 130,
    },
    {
      field: 'pondera_4',
      headerName: 'AÑO 4',
      sortable: true,
      width: 130,
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
    fetch_data_proyectos,
    loading,
    rows_proyectos,
  } = useConsultaMetasHook();

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
    const cumplidoTrue = rows_proyectos.filter(
      (row: { cumplio: boolean }) => row.cumplio === true
    ).length;
    const cumplidoFalse = rows_proyectos.filter(
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
  }, [rows_proyectos]);

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
          <Title title="Consulta por proyectos " />
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
            onClick={fetch_data_proyectos}
            loading={loading ?? false}
            disabled={loading ?? false}
          >
            Consultar
          </LoadingButton>
        </Grid>
        {rows_proyectos.length > 0 ? (
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
                  rows={rows_proyectos}
                  columns={columns_proyecto}
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
      </Grid>
    </>
  );
};
