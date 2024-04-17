import { Grid, Box, Stack } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { type TablasAmortizacion } from '../interfaces/interfaces';
import { faker } from '@faker-js/faker';
import { useEffect, useState } from 'react';
import { Title } from '../../../../components';

interface RootState {
  plan_pagos: {
    plan_pagos: TablasAmortizacion;
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ResumenLiquidacionFacilidad: React.FC = () => {
  const [capital_total, set_capital_total] = useState(0);
  const [abono_facilidad, set_abono_facilidad] = useState(0);
  const [saldo_capital, set_saldo_capital] = useState(0);
  const [intereses_mora, set_intereses_mora] = useState(0);
  const [deuda_total, set_deuda_total] = useState(0);
  const [capital_cuotas, set_capital_cuotas] = useState(0);
  const [intereses_cuotas, set_intereses_cuotas] = useState(0);
  const [total_cuotas, set_total_cuotas] = useState(0);
  const { plan_pagos } = useSelector((state: RootState) => state.plan_pagos);

  useEffect(() => {
    if(plan_pagos.resumen_inicial !== undefined){

      // set_capital_total(plan_pagos.resumen_inicial.capital_total);
      set_abono_facilidad(plan_pagos.resumen_inicial.abono_facilidad);
      set_saldo_capital(plan_pagos.resumen_facilidad.saldo_total);
      set_intereses_mora(plan_pagos.resumen_facilidad.intreses_mora);
      set_deuda_total(plan_pagos.resumen_facilidad.deuda_total);
      set_capital_cuotas(plan_pagos.distribucion_cuota.capital_cuotas);
      set_intereses_cuotas(plan_pagos.distribucion_cuota.interes_cuotas);
      set_total_cuotas(plan_pagos.distribucion_cuota.total_cuota);
    }
  }, [plan_pagos])

  const rows_resumen_inicial = [
    {
      parametro: 'Capital Total Inicial',
      valor: capital_total,
    },
    {
      parametro: 'Abono Facilidad',
      valor: abono_facilidad,
    },
  ]

  const rows_resumen_facilidad = [
    {
      parametro: 'Saldo Capital',
      valor: saldo_capital,
    },
    {
      parametro: 'Intereses de Mora',
      valor: intereses_mora,
    },
    {
      parametro: <strong>Deuda Total</strong>,
      valor: deuda_total,
    },
  ]

  const rows_abono = [
    {
      parametro: 'Abono a Capital',
      valor: '',
    },
    {
      parametro: 'Abono a Intereses',
      valor: '',
    },
    {
      parametro: <strong>Total Abono</strong>,
      valor: '',
    },
  ]

  const rows_cuota = [
    {
      parametro: 'Capital Distribuidos en Cuotas',
      valor: capital_cuotas,
    },
    {
      parametro: 'Intereses Distribuidos en Cuotas',
      valor: intereses_cuotas,
    },
    {
      parametro: <strong>Total Cuota</strong>,
      valor: total_cuotas,
    },
  ]

  const columns_resumen_inicial: GridColDef[] = [
    {
      field: 'parametro',
      headerName: 'Resumen Inicial',
      width: 300,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'valor',
      headerName: '',
      width: 150,
      renderCell: (params) => {
        const precio_cop = new Intl.NumberFormat("es-ES", {
          style: "currency",
          currency: "COP",
        }).format(params.value)
        return (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {precio_cop}
        </div>
        )
      },
    },
  ];

  const columns_resumen_facilidad: GridColDef[] = [
    {
      field: 'parametro',
      headerName: 'Resumen para la Facilidad de Pago',
      width: 300,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'valor',
      headerName: '',
      width: 150,
      renderCell: (params) => {
        const precio_cop = new Intl.NumberFormat("es-ES", {
          style: "currency",
          currency: "COP",
        }).format(params.value)
        return (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {precio_cop}
        </div>
        )
      },
    },
  ];

  const columns_abono: GridColDef[] = [
    {
      field: 'parametro',
      headerName: 'Aplicación del Abono',
      width: 300,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'valor',
      headerName: '',
      width: 150,
      renderCell: (params) => {
        const precio_cop = new Intl.NumberFormat("es-ES", {
          style: "currency",
          currency: "COP",
        }).format(params.value)
        return (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {precio_cop}
        </div>
        )
      },
    },
  ];

  const columns_cuota: GridColDef[] = [
    {
      field: 'parametro',
      headerName: 'Distribución Cuota Mensual',
      width: 300,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'valor',
      headerName: '',
      width: 150,
      renderCell: (params) => {
        const precio_cop = new Intl.NumberFormat("es-ES", {
          style: "currency",
          currency: "COP",
        }).format(params.value)
        return (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {precio_cop}
        </div>
        )
      },
    },
  ];

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
        <Grid item xs={12}>
          <Grid item>
            <Box sx={{ width: '100%' }}>
              {/* <h3>3. Resumen de la Facilidad</h3> */}
              <Title title="3. Resumen de la Facilidad " />

              <Stack
                direction="row"
                justifyContent="space-around"
                spacing={2}
                sx={{ mt: '30px' }}
              >
                
                <DataGrid
                  autoHeight
                  disableSelectionOnClick
                  rows={rows_resumen_inicial}
                  columns={columns_resumen_inicial}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  experimentalFeatures={{ newEditingApi: true }}
                  getRowId={(row) => faker.database.mongodbObjectId()}
                />
                <DataGrid
                  autoHeight
                  disableSelectionOnClick
                  rows={rows_abono}
                  columns={columns_abono}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  experimentalFeatures={{ newEditingApi: true }}
                  getRowId={(row) => faker.database.mongodbObjectId()}
                />
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-around"
                spacing={2}
                sx={{ mt: '30px' }}
              >
                <DataGrid
                  autoHeight
                  disableSelectionOnClick
                  rows={rows_resumen_facilidad}
                  columns={columns_resumen_facilidad}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  experimentalFeatures={{ newEditingApi: true }}
                  getRowId={(row) => faker.database.mongodbObjectId()}
                />
                <DataGrid
                  autoHeight
                  disableSelectionOnClick
                  rows={rows_cuota}
                  columns={columns_cuota}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  experimentalFeatures={{ newEditingApi: true }}
                  getRowId={(row) => faker.database.mongodbObjectId()}
                />
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
