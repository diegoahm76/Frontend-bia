/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Grid, Box, Stack, TextField, Button, FormControl } from '@mui/material';
import { FileDownloadOutlined, SearchOutlined } from '@mui/icons-material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import esLocale from 'dayjs/locale/es';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import ReactApexChart from 'react-apexcharts';
import JsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { get_cartera_general } from '../requests/requests';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CarteraGeneralFecha: React.FC = () => {
  const [total, set_total] = useState(0);
  const [date, set_date] = useState<Date | null>(new Date());
  const [arr_label, set_arr_label] = useState(Array<string>);
  const [arr_data, set_arr_data] = useState(Array<number>);
  const [values, set_values] = useState([]);
  const options = { labels: arr_label };
  const series = arr_data;

  const visible_rows = [
    {
      codigo_contable: 1,
      concepto_deuda: 'Tasa Retributiva',
      valor_sancion: '30300000.05',
    },
    {
      codigo_contable: 2,
      concepto_deuda: 'Tasa Uso de Agua',
      valor_sancion: '12000000.10',
    },
    {
      codigo_contable: 3,
      concepto_deuda: 'Intereses Multas y Sanciones',
      valor_sancion: '75000000.00',
    },
    {
      codigo_contable: 4,
      concepto_deuda: 'Transferencia de Sector Eléctrico',
      valor_sancion: '13400000.00',
    },
  ];

  const handle_change_date = (date: Date | null) => {
    set_date(date);
  };

  const handle_export_excel = async (): Promise<void> => {
    const fecha_seleccionada =  dayjs(date).format('YYYY-MM-DD');
    try {
      const xlsx = await import('xlsx');
      const worksheet = xlsx.utils.json_to_sheet(visible_rows);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excel_buffer = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array'
      });
      save_as_excel_file(excel_buffer, `Reporte General de Cartera Fecha de Corte ${fecha_seleccionada}`);
    } catch (error) {
      console.error(error);
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
      .catch((error) => {
        console.error(error);
      });
  };

  const handle_export_pdf = () => {
    const fecha_seleccionada =  dayjs(date).format('YYYY-MM-DD');
    const report = new JsPDF('l','pt','letter');
    report.text(`Reporte General de Cartera Fecha de Corte ${fecha_seleccionada}`, 40, 30);
    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    autoTable(report, {
      theme: 'grid',
      head: [['Código Contable', 'Concepto Deuda', 'Total']],
      body: values,
      foot:[['Total General', '', `${total.toFixed(2)}`]],
    })
    report.save(`Reporte General de Cartera Fecha de Corte ${fecha_seleccionada}.pdf`);
  }

  useEffect(() => {
    if(visible_rows.length !== 0) {
      let total = 0
      for(let i=0; i< visible_rows.length; i++){
        total = total + parseFloat(visible_rows[i].valor_sancion)
        set_total(total)
      }
    }
  }, [visible_rows])

  useEffect(() => {
    if(visible_rows.length !== 0){
      set_values(visible_rows.map((obj) => Object.values(obj)) as any)
    }
  }, [visible_rows])

  useEffect(() => {
    const arr_labels = []
    for(let i=0; i<visible_rows.length; i++){
      arr_labels.push(`${visible_rows[i].codigo_contable} ${visible_rows[i].concepto_deuda}`)
    }
    set_arr_label(arr_labels)
  }, [])

  useEffect(() => {
    const arr_series = []
    for(let i=0; i<visible_rows.length; i++){
      arr_series.push(parseFloat(visible_rows[i].valor_sancion))
    }
    set_arr_data(arr_series)
  }, [])

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
      width: 300,
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

  return (
    <Grid
      container
      sx={{
        position: 'relative',
        background: '#FAFAFA',
        borderRadius: '15px',
        mb: '20px',
        mt: '20px',
        p: '20px',
        boxShadow: '0px 3px 6px #042F4A26',
      }}
    >
      <Grid item xs={12}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
        >
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
              <FormControl>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={esLocale}>
                  <DatePicker
                    label="Fecha Corte"
                    inputFormat="YYYY/MM/DD"
                    openTo="day"
                    views={[ 'day', 'month', 'year' ]}
                    value={date}
                    onChange={handle_change_date}
                    renderInput={(params) => (
                      <TextField
                        required
                        {...params}
                      />
                    )}
                  />
                </LocalizationProvider>
              </FormControl>
              <Button
                color='primary'
                variant='contained'
                startIcon={<SearchOutlined />}
                onClick={() => {
                  const fecha_seleccionada =  dayjs(date).format('YYYY-MM-DD')
                  void get_cartera_general(fecha_seleccionada)
                }}
              >
                Consultar
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
                onClick={handle_export_excel}
              >
                Exportar Excel
              </Button>
              <Button
                color='primary'
                variant='outlined'
                startIcon={<FileDownloadOutlined />}
                onClick={handle_export_pdf}
              >
                Exportar PDF
              </Button>
            </Stack>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ mb: '20px', mt: '40px' }}
          >
            <Box sx={{ width: '55%' }}>
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
                        label={<strong>Total General</strong>}
                        size="small"
                        fullWidth
                        value={total.toFixed(2)}
                      />
                    </Grid>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ width: '43%' }}>
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
                      <ReactApexChart options={options} series={series} type='pie' width={470} />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Stack>
        </Box>
      </Grid>
    </Grid>
  );
}
