/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import {
  Box,
  ButtonGroup,
  Chip,
  Divider,
  Grid,
  Typography,
} from '@mui/material';

import { Title } from '../../../../../../components/Title';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import { download_pdf } from '../../../../../../documentos-descargar/PDF_descargar';
import { download_xls } from '../../../../../../documentos-descargar/XLS_descargar';
import React from 'react';
import { useConsultaMetasHook } from '../../../hooks/useConsultaMetasHook';
import { Bar, Line } from 'react-chartjs-2';
// import { Doughnut, Radar } from 'react-chartjs-2';
import 'chart.js/auto';
import { columsActividades } from './colums';
// eslint-disable-next-line @typescript-eslint/naming-convention
export const ConsultarActividades: React.FC = () => {
  const columns_actividades: GridColDef[] = [
    ...columsActividades,
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
  const { rows_actividades } = useConsultaMetasHook();

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
    const cumplidoTrue = rows_actividades.filter(
      (row: { cumplio: boolean }) => row.cumplio === true
    ).length;
    const cumplidoFalse = rows_actividades.filter(
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
  }, [rows_actividades]);

  return (
    <>
      {rows_actividades.length > 0 ? (
        <>
          <Grid item xs={12}>
            <Title title="Actividades " />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold">
              Cumplimiento por actividades
            </Typography>
            <Divider />
          </Grid>

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
                  nurseries: rows_actividades,
                  columns: columns_actividades,
                })}
                {download_pdf({
                  nurseries: rows_actividades,
                  columns: columns_actividades,
                  title: 'CREAR PLAN',
                })}
              </ButtonGroup>
              <DataGrid
                density="compact"
                autoHeight
                rows={rows_actividades}
                columns={columns_actividades}
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
  );
};
