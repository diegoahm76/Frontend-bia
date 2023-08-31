/* eslint-disable @typescript-eslint/no-misused-promises */
import { Grid, Box, TextField, Stack, Tooltip, IconButton, Avatar } from '@mui/material';
import { Preview } from '@mui/icons-material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { type ThunkDispatch } from '@reduxjs/toolkit';
import { type CuotaPlanPagoValidacion } from '../interfaces/interfaces';
import { get_cuota_recibo } from '../slices/DeudoresSlice';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import pse from '../assets/pse.png';
import './Estilos/PlanPagos.css';

interface RootStateValidacionPlanPagos {
  plan_pagos: {
    plan_pagos: {
      data: {
        cuotas: CuotaPlanPagoValidacion[];
      }
    }
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TablaPlanPagosUsuario: React.FC = () => {
  const [total, set_total] = useState(0);
  const [lista, set_lista] = useState(Array<CuotaPlanPagoValidacion>);
  const { plan_pagos } = useSelector((state: RootStateValidacionPlanPagos) => state.plan_pagos);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const navigate = useNavigate();

  const total_cop = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "COP",
  }).format(total)

  const columns: GridColDef[] = [
    {
      field: 'nro_cuota',
      headerName: 'No Cuotas',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'fecha_vencimiento',
      headerName: 'Fechas de Pago',
      width: 250,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {dayjs(params.value).format('DD/MM/YYYY')}
        </div>
      ),
    },
    {
      field: 'monto_cuota',
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
          <Tooltip title="Ver / Generar">
            <IconButton
              onClick={() => {
                try {
                  void dispatch(get_cuota_recibo(params.row.id));
                  navigate('../recibo');
                } catch (error: any) {
                  throw new Error(error);
                }
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
                <Preview
                  sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                />
              </Avatar>
            </IconButton>
          </Tooltip>
        )
      }
    },
    {
      field: 'pse',
      headerName: 'Pagar',
      width: 150,
      renderCell: (params) => {
        return (
          <Tooltip title="Pagar en Línea">
            <IconButton
              onClick={() => {}}
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
                <img className='pse_icon' alt='logo_pse' src={pse} />
              </Avatar>
            </IconButton>
          </Tooltip>
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
    set_lista(plan_pagos.data.cuotas)
  }, [plan_pagos])

  useEffect(() => {
    let cuotas = 0
    for(let i=0; i< lista.length; i++){
      cuotas = cuotas + parseFloat(lista[i].monto_cuota)
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
