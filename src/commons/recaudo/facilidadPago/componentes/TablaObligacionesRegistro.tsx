/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState, useEffect, useCallback } from 'react';
import { Grid, Box, IconButton, TextField } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { type Obligacion } from '../interfaces/interfaces';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import { TenerEncuenta } from './TenerEncuenta';
import InfoIcon from '@mui/icons-material/Info';

interface RootState {
  obligaciones: {
    obligaciones: Obligacion[];
  }
}

interface Props {
  updateTotalSum: (sum: number) => void; // Definimos el tipo de la función de devolución de llamada
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TablaObligacionesRegistro: React.FC<Props> = ({ updateTotalSum }) => {
  const { obligaciones } = useSelector((state: RootState) => state.obligaciones);
  const [is_modal_active, set_is_buscar] = useState<boolean>(true);
  const [sumaCapital, setSumaCapital] = useState<number>(0);
  const [sumaIntereses, setSumaIntereses] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [abonoEsperado, setAbonoEsperado] = useState<number>(0);

  const columns: GridColDef[] = [
    {
      field: 'nombre',
      headerName: 'Nombre Obligación',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'inicio',
      headerName: 'Fecha Inicio',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {dayjs(params.value).format('DD/MM/YYYY')}
        </div>
      ),
    },
    {
      field: 'expediente',
      headerName: 'Expediente',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'num_resolucion',
      headerName: 'Nro Resolución',
      width: 150,
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
        }).format(params.value);
        return (
          <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
            {precio_cop}
          </div>
        );
      },
    },
    {
      field: 'valor_intereses',
      headerName: 'Valor Intereses',
      width: 150,
      renderCell: (params) => {
        const precio_cop = new Intl.NumberFormat("es-ES", {
          style: "currency",
          currency: "COP",
        }).format(params.value);
        return (
          <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
            {precio_cop}
          </div>
        );
      },
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
  ];

  useEffect(() => {
    if (!obligaciones) return;

    const sumaCapital = obligaciones.reduce((acc: number, obligacion: Obligacion) => {
      return acc + (parseFloat(obligacion.monto_inicial) || 0);
    }, 0);

    const sumaIntereses = obligaciones.reduce((acc: number, obligacion: Obligacion) => {
      return acc + (parseFloat(obligacion.valor_intereses) || 0);
    }, 0);

    const total = sumaCapital + sumaIntereses;
    const abonoEsperado = total * 0.3;

    setSumaCapital(sumaCapital);
    setSumaIntereses(sumaIntereses);
    setTotal(total);
    setAbonoEsperado(abonoEsperado);

    updateTotalSum(total);
  }, [obligaciones]);

  const handleClick = useCallback(() => {
    set_is_buscar(true);
  }, []);

  return (
    <>
      <TenerEncuenta is_modal_active={is_modal_active} set_is_modal_active={set_is_buscar} />
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
        <Grid item >
          <IconButton color='primary' onClick={handleClick}>
            <InfoIcon />
          </IconButton>
        </Grid>

        <Grid item xs={12}>
          <Grid item>
            <Box sx={{ width: '100%' }}>
              {obligaciones ? (
                <DataGrid
                  autoHeight
                  disableSelectionOnClick
                  rows={obligaciones}
                  columns={columns}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  experimentalFeatures={{ newEditingApi: true }}
                  getRowId={(row) => faker.database.mongodbObjectId()}
                />
              ) : (
                <div>No hay obligaciones para mostrar</div>
              )}
            </Box>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={3}  >
          <TextField
            size="small"
            style={{marginTop:15,width:"95%"}}
            label="Suma Capital"
            disabled
            value={new Intl.NumberFormat("es-ES", { style: "currency", currency: "COP" }).format(sumaCapital)}
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} sm={3} >
          <TextField
            label="Suma Intereses"
            size="small"
            style={{marginTop:15,width:"95%"}}
            disabled
            value={new Intl.NumberFormat("es-ES", { style: "currency", currency: "COP" }).format(sumaIntereses)}
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} sm={3} >
          <TextField
            label="Total"
            value={new Intl.NumberFormat("es-ES", { style: "currency", currency: "COP" }).format(total)}
            fullWidth
            style={{marginTop:15,width:"95%"}}
            disabled
            size="small"
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} sm={3} >
          <TextField
            label="Abono Esperado"
            size="small"
            style={{marginTop:15,width:"95%"}}
            disabled
            value={new Intl.NumberFormat("es-ES", { style: "currency", currency: "COP" }).format(abonoEsperado)}
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
          />
        </Grid>
      </Grid>
    </>
  );
}
