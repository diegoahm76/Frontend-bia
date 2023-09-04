import { Grid, Box, Stack } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { get_facilidad_general } from '../requests/requests';
import { type FacilidadGeneral } from '../interfaces/interfaces';
import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { faker } from '@faker-js/faker';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const FacilidadPagoGeneral: React.FC = () => {
  const [totales, set_totales] = useState<FacilidadGeneral>();
  const [total_coactivo, set_total_coactivo] = useState(0);
  const [total_persuasivo, set_total_persuasivo] = useState(0);
  const [total_general, set_total_general] = useState(0);

  const get_totales_generales = async (): Promise<void> => {
    try {
      const { data: { data: res_totales } } = await get_facilidad_general();
      set_totales(res_totales ?? {});
    } catch (error: any) {
      throw new Error(error);
    }
  }

  useEffect(() => {
    void get_totales_generales();
  }, [])

  useEffect(() => {
    if(totales !== undefined){
      set_total_coactivo(totales.total_sanciones_coactivo);
      set_total_persuasivo(totales.total_sanciones_persuasivo);
      set_total_general(totales.total_general);
    }
  }, [totales])

  const options = { labels: ['Cobro Coactivo', 'Cobro Persuasivo'] };
  const series = [total_coactivo, total_persuasivo];

  const series_bar = [{
    data: [total_coactivo, total_persuasivo]
  }]

  const visible_rows = [
    {
      tipo_cobro: 'Cobro Coactivo',
      total: total_coactivo,
    },
    {
      tipo_cobro: 'Cobro Persuasivo',
      total: total_persuasivo,
    },
    {
      tipo_cobro: <strong>Total General</strong>,
      total: <strong>{total_general}</strong>,
    },
  ]

  const columns: GridColDef[] = [
    {
      field: 'tipo_cobro',
      headerName: 'Tipo Cobro',
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
      width: 100,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'nombre_deudor',
      headerName: 'Nombre Deudor',
      width: 140,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'concepto_deudo',
      headerName: 'Concepto de Deuda',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'expediente',
      headerName: 'Expediente',
      width: 120,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'resolucion',
      headerName: 'Resolución',
      width: 120,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'numero_factura',
      headerName: '# Factura',
      width: 120,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'total',
      headerName: 'Total',
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
    <Box sx={{ width: '100%' }}>
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
        </Grid>
      </Grid>
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
              <Stack
                direction="row"
                justifyContent="space-around"
                sx={{ mb: '20px' }}
                spacing={2}
              >
                {
                  totales !== undefined ? (
                    <>
                      <ReactApexChart options={options} series={series} type='pie' width={470} />
                      <ReactApexChart options={options} series={series_bar} type='bar' width={470} />
                    </>
                  ) : null
                }
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
