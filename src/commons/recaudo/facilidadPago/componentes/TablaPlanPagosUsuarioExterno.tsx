/* eslint-disable @typescript-eslint/no-misused-promises */
import { Grid, Box, TextField, Stack } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TablaPlanPagosUsuarioExterno: React.FC = () => {
  const [total, set_total] = useState(0);

  const total_cop = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "COP",
  }).format(total)

  const lista = [
    {
      cuota: 1,
      fecha_pago: '25 de enero de 2023',
      valor_total: '85000000',
      estado: 'Pagada',
    },
    {
      cuota: 2,
      fecha_pago: '25 de febrero de 2023',
      valor_total: '85000000',
      estado: 'Vencida',
    },
    {
      cuota: 3,
      fecha_pago: '25 de marzo de 2023',
      valor_total: '85000000',
      estado: 'Pendiente',
    }
  ]

  const columns: GridColDef[] = [
    {
      field: 'cuota',
      headerName: 'No Cuotas',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'fecha_pago',
      headerName: 'Fechas de Pago',
      width: 250,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'valor_total',
      headerName: 'Cuota',
      width: 200,
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
      field: 'recibo',
      headerName: 'Recibo',
      width: 150,
      renderCell: (params) => {
        return (
          <Link to='../recibo'>Ver / Generar</Link>
        )
      }
    },
    {
      field: 'pse',
      headerName: 'Pagar',
      width: 150,
      renderCell: (params) => {
        return (
          <Link to=''>Pagar en Linea</Link>
        )
      }
    },
    {
      field: 'estado',
      headerName: 'Estado',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
  ];

  useEffect(() => {
    let cuotas = 0
    for(let i=0; i< lista.length; i++){
      cuotas = cuotas + parseFloat(lista[i].valor_total)
      set_total(cuotas)
    }
  }, [lista])

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
                getRowId={(row) => row.cuota}
              />
            </Box>
          </Grid>
          <Stack
            direction="row"
            justifyContent="right"
            spacing={2}
            sx={{ mt: '30px' }}
          >
            <Grid item xs={12} sm={2}>
              <TextField
                label={<strong>Total Cuotas</strong>}
                size="small"
                fullWidth
                value={total_cop}
              />
            </Grid>
        </Stack>
        </Grid>
      </Grid>
    </>
  );
}
