import { Grid, Box, TextField, Stack } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { type TablasAmortizacion, type Obligacion } from '../interfaces/interfaces';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';

interface RootState {
  plan_pagos: {
    plan_pagos: TablasAmortizacion;
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TablaLiquidacion: React.FC = () => {
  const [capital, set_capital] = useState(0);
  const [intereses, set_intereses] = useState(0);
  const [total, set_total] = useState(0);
  const [lista, set_lista] = useState(Array<Obligacion>);
  const { plan_pagos } = useSelector((state: RootState) => state.plan_pagos);

  const total_cop = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "COP",
  }).format(total)

  const capital_cop = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "COP",
  }).format(capital)

  const intereses_cop = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "COP",
  }).format(intereses)

  useEffect(() => {
    if(plan_pagos.data_cartera !== undefined){
      set_lista(plan_pagos.data_cartera.obligaciones)
    }
  }, [plan_pagos])

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Item',
      width: 50,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'nombre',
      headerName: 'Resolución',
      width: 300,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'monto_inicial',
      headerName: 'Valor Capital',
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
    {
      field: 'inicio',
      headerName: 'Fecha Cons. Mora',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {dayjs(params.value).format('DD/MM/YYYY')}
        </div>
      ),
    },
    {
      field: 'dias_mora',
      headerName: 'Días Mora',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'valor_intereses',
      headerName: 'Intereses',
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
    {
      field: 'valor_capital_intereses',
      headerName: 'Capital + Intereses',
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
    {
      field: 'valor_abonado',
      headerName: 'Valor Abonado',
      width: 150,
      renderCell: (params) => {
        return (
          <Grid item xs={11} sm={150}>
            <TextField
              required
              label="Valor Abonado"
              size="small"
              fullWidth
              onChange={() => {
              }}
              name='valor_abonado'
              type='number'
            />
          </Grid>
        )
      },
    },
    {
      field: 'porcentaje_abonado',
      headerName: '% del Abono',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'abono_capital',
      headerName: 'Abono Capital',
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
    {
      field: 'abono_intereses',
      headerName: 'Abono Intereses',
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
    {
      field: 'saldo_capital',
      headerName: 'Saldo Capital',
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

  useEffect(() => {
    let sub_capital = 0
    let sub_intereses = 0
    for(let i=0; i<lista.length; i++){
      sub_capital = sub_capital + parseFloat(lista[i].monto_inicial)
      sub_intereses = sub_intereses + parseFloat(lista[i].valor_intereses)
      set_capital(sub_capital)
      set_intereses(sub_intereses)
    }
    set_total(capital + intereses)
  }, [lista, capital, intereses])

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
        {
          lista.length !== 0 ? (
            <Grid item xs={12}>
              <Grid item>
                <Box sx={{ width: '100%' }}>
                  <DataGrid
                    autoHeight
                    disableSelectionOnClick
                    rows={lista}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    experimentalFeatures={{ newEditingApi: true }}
                    getRowId={(row) => faker.database.mongodbObjectId()}
                  />
                </Box>
              </Grid>
              <Stack
                direction="row"
                justifyContent="right"
                spacing={2}
                sx={{ mt: '30px' }}
              >
                <Grid item xs={12} sm={2.5}>
                  <TextField
                    label="Total Capital"
                    size="small"
                    fullWidth
                    value={capital_cop}
                  />
                </Grid>
                <Grid item xs={12} sm={2.5}>
                  <TextField
                    label="Total Intereses"
                    size="small"
                    fullWidth
                    value={intereses_cop}
                  />
                </Grid>
                <Grid item xs={12} sm={2.5}>
                  <TextField
                    label="Capital + Intereses"
                    size="small"
                    fullWidth
                    value={total_cop}
                  />
                </Grid>
                <Grid item xs={12} sm={2.5}>
                  <TextField
                    label="Saldo Capital"
                    size="small"
                    fullWidth
                    value={''}
                  />
                </Grid>
              </Stack>
            </Grid>
          ) : null
        }
      </Grid>
    </>
  );
}
