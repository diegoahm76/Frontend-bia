/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState, useEffect } from 'react';
import { Grid, Box, IconButton } from '@mui/material';
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
        }).format(params.value)
        return (
          <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
            {precio_cop}
          </div>
        )
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
        }).format(params.value)
        return (
          <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
            {precio_cop}
          </div>
        )
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
    const sum = obligaciones.reduce((acc: number, obligacion: Obligacion) => {
      const montoInicial = parseFloat(obligacion.monto_inicial) || 0;
      const valorIntereses = parseFloat(obligacion.valor_intereses) || 0;
      return acc + montoInicial + valorIntereses;
    }, 0);
    updateTotalSum(sum);
  }, [obligaciones]);

  const handleClick = () => {
    set_is_buscar(true);
  };

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
            </Box>
          </Grid>
        </Grid>
      </Grid>
   
    </>
  );
}
