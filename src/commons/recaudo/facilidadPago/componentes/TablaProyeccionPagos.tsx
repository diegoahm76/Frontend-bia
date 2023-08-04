/* eslint-disable @typescript-eslint/no-misused-promises */
import { Grid, Box, TextField, Stack, Button } from '@mui/material';
import { FileDownloadOutlined, Visibility } from '@mui/icons-material';
import SaveIcon from '@mui/icons-material/Save';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TablaProyeccionPagos: React.FC = () => {
  const [capital, set_capital] = useState(0);
  const [intereses, set_intereses] = useState(0);
  const [total, set_total] = useState(0);
  const navigate = useNavigate();

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

  const lista = [
    {
      cuota: '',
      fecha_pago: 'Abono Inicial',
      monto_inicial: '417000',
      valor_intereses: '150000',
      valor_total: '567000',
    },
    {
      cuota: 1,
      fecha_pago: '25 de febrero de 2023',
      monto_inicial: '50000',
      valor_intereses: '35000',
      valor_total: '85000',
    },
    {
      cuota: 2,
      fecha_pago: '25 de marzo de 2023',
      monto_inicial: '50000',
      valor_intereses: '35000',
      valor_total: '85000',
    }
  ]

  const columns: GridColDef[] = [
    {
      field: 'cuota',
      headerName: 'No Cuota',
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
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'monto_inicial',
      headerName: 'Capital',
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
      headerName: 'Cuota',
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

  const handle_export_excel = async (): Promise<void> => {
    try {
      const xlsx = await import('xlsx');
      const worksheet = xlsx.utils.json_to_sheet(lista);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excel_buffer = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array'
      });
      save_as_excel_file(excel_buffer, 'Proyección de Pagos');
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const save_as_excel_file = (buffer: Buffer, fileName: string): void => {
    import('file-saver')
      .then((module) => {
        const save_as_fn = module.default.saveAs;
        const excel_type =
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const excel_extension = '.xlsx';
        const data = new Blob([buffer], {
          type: excel_type
        });
        save_as_fn(data, fileName + excel_extension);
      })
      .catch((error: any) => {
        throw new Error(error);
      });
  };

  useEffect(() => {
    let sub_capital = 0
    let sub_intereses = 0
    for(let i=0; i< lista.length; i++){
      sub_capital = sub_capital + parseFloat(lista[i].monto_inicial)
      sub_intereses = sub_intereses + parseFloat(lista[i].valor_intereses)
      set_capital(sub_capital)
      set_intereses(sub_intereses)
    }

    set_total(capital + intereses)
  }, [capital, intereses])

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
              <h3>4. Proyección de Pagos</h3>
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
                label="Total Cuotas"
                size="small"
                fullWidth
                value={total_cop}
              />
            </Grid>
        </Stack>
        <Stack
          direction="row"
          justifyContent="right"
          spacing={2}
          sx={{ mb: '20px', mt: '40px' }}
        >
          <Grid item xs={12} sm={3}>
            <Button
              fullWidth
              color='primary'
              variant='contained'
              startIcon={<Visibility />}
              onClick={() => {
                navigate('../seguimiento')
              }}
            >
              Ver como Usuario Externo
            </Button>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button
              fullWidth
              color='primary'
              variant='contained'
              startIcon={<FileDownloadOutlined />}
              onClick={handle_export_excel}
            >
              Exportar Proyección de Pagos
            </Button>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button
              fullWidth
              color='primary'
              variant='contained'
              startIcon={<SaveIcon />}
              onClick={() => {}}
            >
              Guardar Plan de Pagos
            </Button>
          </Grid>
        </Stack>
        </Grid>
      </Grid>
    </>
  );
}
