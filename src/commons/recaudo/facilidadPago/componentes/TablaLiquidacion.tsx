import { Grid, Box, TextField, Stack } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TablaLiquidacion: React.FC = () => {
  const [capital, set_capital] = useState(0);
  const [intereses, set_intereses] = useState(0);
  const [total, set_total] = useState(0);
  const [saldo_capital, set_saldo_capital] = useState(0);

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

  const saldo_capital_cop = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "COP",
  }).format(saldo_capital)

  const lista = [
    {
      item: 1,
      numero_resolucion: 'EXP 3.11.016 RESOLUCIÓN PS-GJ 1.2.6',
      monto_inicial: '300000',
      fecha_mora: '18/09/2019',
      dias_mora: '503',
      valor_intereses: '150000',
      valor_total: '450000',
      valor_abonado: '100000',
      porcentaje_abonado: '20%',
      abono_capital: '200000',
      abono_intereses: '50000',
      saldo_capital: '120000',
    },
    {
      item: 2,
      numero_resolucion: 'EXP 6.11.06 RESOLUCIÓN PS-GJ 8.2.6',
      monto_inicial: '300000',
      fecha_mora: '11/03/2022',
      dias_mora: '323',
      valor_intereses: '150000',
      valor_total: '450000',
      valor_abonado: '100000',
      porcentaje_abonado: '20%',
      abono_capital: '200000',
      abono_intereses: '50000',
      saldo_capital: '120000',
    }
  ]

  const columns: GridColDef[] = [
    {
      field: 'item',
      headerName: 'Item',
      width: 50,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'numero_resolucion',
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
      field: 'fecha_mora',
      headerName: 'Fecha Cons. Mora',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
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
      field: 'valor_total',
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
    let capital_final = 0
    for(let i=0; i< lista.length; i++){
      sub_capital = sub_capital + parseFloat(lista[i].monto_inicial)
      sub_intereses = sub_intereses + parseFloat(lista[i].valor_intereses)
      capital_final = capital_final + parseFloat(lista[i].saldo_capital)
      set_capital(sub_capital)
      set_intereses(sub_intereses)
      set_saldo_capital(capital_final)
    }

    set_total(capital + intereses)
  }, [capital, intereses, saldo_capital])

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
              <DataGrid
                autoHeight
                disableSelectionOnClick
                rows={lista}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                experimentalFeatures={{ newEditingApi: true }}
                getRowId={(row) => row.item}
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
                value={saldo_capital_cop}
              />
            </Grid>
        </Stack>
        </Grid>
      </Grid>
    </>
  );
}
