/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Title } from '../../../../components/Title';
import { type ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { get_facilidad_detallada, get_filtro_facilidad_detallada } from '../slices/ReportesSlice';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { FileDownloadOutlined, FilterAltOffOutlined, SearchOutlined } from '@mui/icons-material';
import { type event } from '../../facilidadPago/interfaces/interfaces';
import { type FacilidadDetallada } from '../interfaces/interfaces';
import { FacilidadPagoGeneral } from '../componentes/FacilidadPagoGeneral';
import { TablaFacilidadPagoDetallada } from '../componentes/TablaFacilidadPagoDetallada';
import JsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface RootState {
  reportes_recaudo: {
    reportes_recaudo: FacilidadDetallada[];
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const FacilidadPago: React.FC = () => {
  const [visible_rows, set_visible_rows] = useState(Array<FacilidadDetallada>);
  const [filter, set_filter] = useState('');
  const [type, set_type] = useState('');
  const [search, set_search] = useState('');
  const [modal, set_modal] = useState(false);
  const [total, set_total] = useState(0);
  const [total_coactivo, set_total_coactivo] = useState(0);
  const [total_persuasivo, set_total_persuasivo] = useState(0);
  const [values, set_values] = useState([]);
  const { reportes_recaudo } = useSelector((state: RootState) => state.reportes_recaudo);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

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

  const handle_export_excel = async (): Promise<void> => {
    try {
      const xlsx = await import('xlsx');
      const worksheet = xlsx.utils.json_to_sheet(visible_rows);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excel_buffer = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array'
      });
      save_as_excel_file(excel_buffer, 'Reporte Facilidades de Pago con Detalle');
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

  const handle_export_pdf = () => {
    const report = new JsPDF('l','pt','letter');
    report.text("Reporte Facilidades de Pago con Detalle", 40, 30);
    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    autoTable(report, {
      theme: 'grid',
      head: [['Tipo Cobro', 'NIT', 'Nombre Deudor', 'Concepto Deuda', 'Expediente', 'Resolución', '#Factura', 'Total']],
      body: values,
      foot:[['', '', 'Total Cobro Coactivo:', `${total_coactivo_cop}`, 'Total Cobro Persuasivo:', `${total_persuasivo_cop}`, 'Total General:', `${total_cop}`]],
    })
    report.save('Reporte Facilidades de Pago con Detalle.pdf');
  }

  useEffect(() => {
    if(visible_rows.length !== 0){
      set_values(visible_rows.map((obj) => Object.values(obj)) as any)
    }
  }, [visible_rows])

  useEffect(() => {
    set_visible_rows(reportes_recaudo)
  }, [reportes_recaudo])

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

  return (
    <>
      <Title title='Reporte Facilidades de Pago con Detalle'/>
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
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>Seleccionar Estado del Cobro: </InputLabel>
                  <Select
                    required
                    label="Seleccionar Estado del Cobro: "
                    defaultValue={''}
                    onChange={(event: event)=>{
                      const { value } = event.target
                      set_type(value)
                    }}
                  >
                    <MenuItem value='coactivo'>Coactivo</MenuItem>
                    <MenuItem value='persuasivo'>Persuasivo</MenuItem>
                  </Select>
              </FormControl>
              <FormControl sx={{ minWidth: 130 }}>
                <InputLabel>Filtrar por: </InputLabel>
                  <Select
                    required
                    label="Filtrar por: "
                    defaultValue={''}
                    onChange={(event: event)=>{
                      const { value } = event.target
                      set_filter(value)
                    }}
                  >
                    <MenuItem value='identificacion'>NIT</MenuItem>
                    <MenuItem value='nombre_deudor'>Nombre Deudor</MenuItem>
                    <MenuItem value='codigo_expediente'>Expediente</MenuItem>
                    <MenuItem value='numero_resolucion'>Resolución</MenuItem>
                    <MenuItem value='numero_factura'># Factura</MenuItem>
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
                    void dispatch(get_filtro_facilidad_detallada({tipo: type, parametro: filter, valor: search}));
                    set_modal(true);
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
                    void dispatch(get_facilidad_detallada());
                    set_modal(true);
                  } catch (error: any) {
                    throw new Error(error);
                  }
                }}
              >
                Mostrar Todo
              </Button>
            </Stack>
            {
              modal ? (
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
              ) : null
            }
            </Stack>
            {
              modal ? <TablaFacilidadPagoDetallada /> : (
                <FacilidadPagoGeneral />
              )
            }
          </Box>
        </Grid>
      </Grid>
    </>
  )
}
