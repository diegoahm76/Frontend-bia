/* eslint-disable @typescript-eslint/no-misused-promises */
import { Title } from '../../../../components/Title';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import { FileDownloadOutlined, FilterAltOffOutlined, SearchOutlined } from '@mui/icons-material';
import { type ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { get_cartera_edades, get_filtro_cartera_edades } from '../slices/ReportesSlice';
import { useEffect, useState } from 'react';
import { type event } from '../../facilidadPago/interfaces/interfaces';
import { type CarteraEdad } from '../interfaces/interfaces';
import { TablaCarteraEdad, TablaCarteraEdadProps } from '../componentes/TablaCarteraEdad';
import JsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface RootState {
  reportes_recaudo: {
    reportes_recaudo: CarteraEdad[];
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CarteraGeneralEdad: React.FC = () => {
  const [filter, set_filter] = useState('');
  const [visible_rows, set_visible_rows] = useState(Array<CarteraEdad>);
  const [values, set_values] = useState([]);
  const [total, set_total] = useState(0);
  const { reportes_recaudo } = useSelector((state: RootState) => state.reportes_recaudo);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const total_precio_cop = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "COP",
  }).format(total)


  const handle_export_excel = async (): Promise<void> => {
    try {
      const xlsx = await import('xlsx');
      const worksheet = xlsx.utils.json_to_sheet(visible_rows);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excel_buffer = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array'
      });
      save_as_excel_file(excel_buffer, 'Reporte General de Cartera por Edades');
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

  const handle_export_pdf = (): void => {
    const report = new JsPDF('l','pt','letter');
    report.text("Reporte General de Cartera por Edades", 40, 30);
    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    autoTable(report, {
      theme: 'grid',
      head: [['NIT', 'Expediente', 'Resolución', 'Edad', 'Total', 'Nombre Deudor']],
      body: values,
      foot:[['Total General', '', '', '', '', `${total_precio_cop}`]],
    })
    report.save('Reporte General de Cartera por Edades.pdf');
  }

  useEffect(() => {
    try {
      void dispatch(get_cartera_edades());
    } catch (error: any) {
      throw new Error(error);
    }
  }, [])

  useEffect(() => {
    set_visible_rows(reportes_recaudo)
  }, [reportes_recaudo])

  useEffect(() => {
    if(visible_rows.length !== 0){
      set_values(visible_rows.map((obj) => Object.values(obj)) as any)
    }
  }, [visible_rows])

  useEffect(() => {
    if(visible_rows.length !== 0) {
      let total = 0
      for(let i=0; i< visible_rows.length; i++){
        total = total + parseFloat(visible_rows[i].valor_sancion)
        set_total(total)
      }
    }
  }, [visible_rows])

  return (
    <>
      <Title title='Informe General de Cartera - Gestión por Edades'/>
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
              <FormControl sx={{ minWidth: 130 }}>
                <InputLabel>Seleccionar: </InputLabel>
                  <Select
                    label="Seleccionar: "
                    defaultValue={''}
                    onChange={(event: event)=>{
                      const { value } = event.target
                      set_filter(value)
                    }}
                  >
                    <MenuItem value='0 a 180 días'>0 a 180 Días</MenuItem>
                    <MenuItem value='181 a 360 días'>181 a 360 Días</MenuItem>
                    <MenuItem value='mayor a 361 días'>Mayor a 361 Días</MenuItem>
                  </Select>
              </FormControl>
              <Button
                color='primary'
                variant='contained'
                startIcon={<SearchOutlined />}
                onClick={() => {
                  try {
                    void dispatch(get_filtro_cartera_edades({ valor: filter}));
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
                    void dispatch(get_cartera_edades());
                    set_filter('');
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
            {
              filter === '' ? (
                <>
                  <Grid item mt='50px'>
                    <TablaCarteraEdadProps id_rango={1} />
                  </Grid>
                  <Grid item mt='50px'>
                    <TablaCarteraEdadProps id_rango={2} />
                  </Grid>
                  <Grid item mt='50px'>
                    <TablaCarteraEdadProps id_rango={3} />
                  </Grid>
                </>
              ) : (
                <TablaCarteraEdad filtro={filter} />
              )
            }
          </Box>
        </Grid>
      </Grid>
    </>
  )
}
