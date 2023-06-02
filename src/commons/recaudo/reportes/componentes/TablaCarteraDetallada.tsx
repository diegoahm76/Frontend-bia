/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Grid, Box, FormControl, Select, InputLabel, MenuItem, Stack, Button, TextField } from '@mui/material';
import { SearchOutlined, FilterAltOffOutlined, FileDownloadOutlined } from '@mui/icons-material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { type event } from '../../facilidadPago/interfaces/interfaces';
import { type CarteraDetallada } from '../interfaces/interfaces';
import { useSelector, useDispatch } from 'react-redux';
import { type ThunkDispatch } from '@reduxjs/toolkit';
import { get_filtro_cartera_detallada, get_cartera_detallada } from '../slices/ReportesSlice';
import { faker } from '@faker-js/faker';

interface RootState {
  reportes_recaudo: {
    reportes_recaudo: CarteraDetallada[];
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TablaCarteraDetallada: React.FC = () => {
  const [visible_rows, set_visible_rows] = useState(Array<CarteraDetallada>);
  const [filter, set_filter] = useState('');
  const [search, set_search] = useState('');
  const [total, set_total] = useState(0);
  const { reportes_recaudo } = useSelector((state: RootState) => state.reportes_recaudo);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    if(visible_rows.length !== 0) {
      let total = 0
      for(let i=0; i< visible_rows.length; i++){
        total = total + parseFloat(visible_rows[i].valor_sancion)
        set_total(total)
      }
    }
  }, [visible_rows])

  const columns: GridColDef[] = [
    {
      field: 'codigo_contable',
      headerName: 'Código Contable',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'concepto_deuda',
      headerName: 'Concepto Deuda',
      width: 170,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'nombre_deudor',
      headerName: 'Nombre Deudor',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'identificacion',
      headerName: 'NIT',
      width: 170,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
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
      field: 'resolucion',
      headerName: 'Resolución',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'numero_factura',
      headerName: '# Factura',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'valor_sancion',
      headerName: 'Total',
      width: 170,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
  ];

  useEffect(() => {
    set_visible_rows(reportes_recaudo)
  }, [reportes_recaudo])

  return (
    <Box sx={{ width: '100%' }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ mb: '20px' }}
      >
        <Stack
          direction="row"
          justifyContent="left"
          spacing={2}
        >
          <FormControl sx={{ minWidth: 130 }}>
            <InputLabel>Filtrar por: </InputLabel>
              <Select
                label="Filtrar por: "
                defaultValue={''}
                onChange={(event: event)=>{
                  const { value } = event.target
                  set_filter(value)
                }}
              >
                <MenuItem value='codigo_contable'>Código Contable</MenuItem>
                <MenuItem value='nombre_deudor'>Nombre Deudor</MenuItem>
              </Select>
          </FormControl>
          <TextField
            required
            label="Búsqueda"
            size="medium"
            onChange={(event: event)=>{
              const { value } = event.target
              set_search(value)
            }}
          />
          <Button
            color='primary'
            variant='contained'
            startIcon={<SearchOutlined />}
            onClick={() => {
              try {
                void dispatch(get_filtro_cartera_detallada({parametro: filter, valor: search}));
              } catch (error: any) {
                throw new Error(error);
              }
            }}
          >
            Consultar
          </Button>
          <Button
            color='primary'
            variant='outlined'
            startIcon={<FilterAltOffOutlined />}
            onClick={() => {
              try {
                void dispatch(get_cartera_detallada());
              } catch (error: any) {
                throw new Error(error);
              }
            }}
          >
            Mostrar Todo
          </Button>
        </Stack>
        <Stack
          direction="row"
          justifyContent="right"
          spacing={2}
        >
          <Button
            color='primary'
            variant='outlined'
            startIcon={<FileDownloadOutlined />}
            onClick={() => {
            }}
          >
            Exportar Excel
          </Button>
          <Button
            color='primary'
            variant='outlined'
            startIcon={<FileDownloadOutlined />}
            onClick={() => {
            }}
          >
            Exportar PDF
          </Button>
        </Stack>
      </Stack>
      {
        visible_rows.length !== 0 ? (
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
                    rows={visible_rows}
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
                display='flex'
                justifyContent='flex-end'
              >
                <Grid item xs={12} sm={2} mt='30px'>
                  <TextField
                    label={<strong>Total General</strong>}
                    size="small"
                    fullWidth
                    value={total}
                  />
                </Grid>
            </Stack>
            </Grid>
          </Grid>
        ) : null
      }
    </Box>
  );
}
