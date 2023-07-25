/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Grid, Box, Stack, TextField } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { type FacilidadDetallada } from '../interfaces/interfaces';
import { useSelector } from 'react-redux';
import { faker } from '@faker-js/faker';

interface RootState {
  reportes_recaudo: {
    reportes_recaudo: FacilidadDetallada[];
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TablaFacilidadPagoDetallada: React.FC = () => {
  const [visible_rows, set_visible_rows] = useState(Array<FacilidadDetallada>);
  const [total, set_total] = useState(0);
  const [total_coactivo, set_total_coactivo] = useState(0);
  const [total_persuasivo, set_total_persuasivo] = useState(0);
  const { reportes_recaudo } = useSelector((state: RootState) => state.reportes_recaudo);

  useEffect(() => {
    if(visible_rows.length !== 0) {
      let total_coactivo = 0
      let total_persuasivo = 0
      for(let i=0; i< visible_rows.length; i++){
        if(visible_rows[i].tipo_cobro === 'coactivo') {
          total_coactivo = total_coactivo + parseFloat(visible_rows[i].valor_sancion)
        }
        if(visible_rows[i].tipo_cobro === 'persuasivo') {
          total_persuasivo = total_persuasivo + parseFloat(visible_rows[i].valor_sancion)
        }
        set_total_coactivo(total_coactivo)
        set_total_persuasivo(total_persuasivo)
      }
      set_total(total_coactivo + total_persuasivo)
    }
  }, [visible_rows])

  const total_cop = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "COP",
  }).format(total)

  const total_coactivo_cop = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "COP",
  }).format(total_coactivo)

  const total_persuasivo_cop = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "COP",
  }).format(total_persuasivo)

  const columns: GridColDef[] = [
    {
      field: 'tipo_cobro',
      headerName: 'Tipo Cobro',
      width: 150,
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
      field: 'codigo_expediente',
      headerName: 'Expediente',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'numero_resolucion',
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
    set_visible_rows(reportes_recaudo)
  }, [reportes_recaudo])

  return (
    <Box sx={{ width: '100%' }}>
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
                <Grid item xs={12} sm={2.5} mt='30px'>
                  <TextField
                    label={<strong>Total Cobro Coactivo</strong>}
                    size="small"
                    fullWidth
                    value={total_coactivo_cop}
                  />
                </Grid>
                <Grid item xs={12} sm={2.5} mt='30px'>
                  <TextField
                    label={<strong>Total Cobro Persuasivo</strong>}
                    size="small"
                    fullWidth
                    value={total_persuasivo_cop}
                  />
                </Grid>
                <Grid item xs={12} sm={2.5} mt='30px'>
                  <TextField
                    label={<strong>Total General</strong>}
                    size="small"
                    fullWidth
                    value={total_cop}
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
