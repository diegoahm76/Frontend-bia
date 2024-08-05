/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  Grid,
  Box,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Stack,
  Button,
  TextField,
  ButtonGroup,
} from '@mui/material';
import {
  SearchOutlined,
  FilterAltOffOutlined,
  FileDownloadOutlined,
} from '@mui/icons-material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { type event } from '../../facilidadPago/interfaces/interfaces';
import { type CarteraDetallada } from '../interfaces/interfaces';
import { useSelector, useDispatch } from 'react-redux';
import { type ThunkDispatch } from '@reduxjs/toolkit';
import {
  get_filtro_cartera_detallada,
  get_cartera_detallada,
} from '../slices/ReportesSlice';
import { faker } from '@faker-js/faker';
import JsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import Swal from 'sweetalert2';
import { api } from '../../../../api/axios';

interface RootState {
  reportes_recaudo: {
    reportes_recaudo: CarteraDetallada[];
  };
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TablaCarteraDetallada: React.FC = () => {
  const [visible_rows, set_visible_rows] = useState(Array<CarteraDetallada>);
  const [filter, set_filter] = useState('');
  const [search, set_search] = useState('');
  const [total, set_total] = useState(0);
  const [values, set_values] = useState([]);
  const { reportes_recaudo } = useSelector(
    (state: RootState) => state.reportes_recaudo
  );
  const [data, set_data] = useState<CarteraDetallada[]>([]);
  const [page, set_page] = useState(0);
  const [pages, set_pages] = useState<number[]>([]);
  const [total_pages, set_total_pages] = useState(1);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  // eslint-disable-next-line @typescript-eslint/naming-convention
  /*  const fetchData = (page_number: number) => {
    // Realiza la solicitud HTTP utilizando la página especificada
    fetch(`https://bia-backend-beta-dev.up.railway.app/api/recaudo/reportes/reporte-general-detallado/?page=${page_number + 1}`)
      .then((response) => response.json())
      .then((responseData) => {
        // Extrae la propiedad "data" de la respuesta JSON
        const data = responseData.results.data;
        const total_pages = Math.ceil(responseData.count / 10); // Supongo 10 elementos por página
        const number = page_number + 1
        //  console.log('')(number, pages)
        if (pages.length === 0) {
          set_pages([...pages, number])
          set_data(data);
          set_total_pages(total_pages);

        } else {
          if (pages.indexOf(number) === -1) {
            set_pages([...pages, number])
            set_data((prevRows) => [...prevRows, ...data]);
            set_total_pages(total_pages);

          }
        }

      })
      .catch((error) => {
        console.error('Error al obtener los datos:', error);
      });

  };*/

  const fetchData = async (page_number: number) => {
    try {
      const response = await api.get(
        `recaudo/reportes/reporte-general-detallado/?page=${page_number + 1}`
      );
      const responseData = response.data;
      const data = responseData.results.data;
      const total_pages = Math.ceil(responseData.count / 10); // Supongo 10 elementos por página
      const number = page_number + 1;
      //  console.log('')(number, pages);
      if (pages.length === 0) {
        set_pages([...pages, number]);
        set_data(data);
        set_total_pages(total_pages);
      } else {
        if (pages.indexOf(number) === -1) {
          set_pages([...pages, number]);
          set_data((prevRows) => [...prevRows, ...data]);
          set_total_pages(total_pages);
        }
      }
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al obtener los datos:',
        footer: `<p>${error}</p>`,
      });
    }
  };
  useEffect(() => {
    if (visible_rows && visible_rows.length !== undefined) {
      let total = 0;
      for (let i = 0; i < visible_rows.length; i++) {
        if (visible_rows[i].valor_sancion) {
          total = total + parseFloat(visible_rows[i].valor_sancion);
        }
      }
      set_total(total);
    }
  }, [visible_rows]);

  // useEffect(() => {
  //   if(visible_rows.length !== 0) {
  //     let total = 0
  //     for(let i=0; i< visible_rows.length; i++){
  //       total = total + parseFloat(visible_rows[i].valor_sancion)
  //       set_total(total)
  //     }
  //   }
  // }, [visible_rows])

  const total_cop = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'COP',
  }).format(total);

  const handle_export_excel = async (): Promise<void> => {
    try {
      const xlsx = await import('xlsx');
      const worksheet = xlsx.utils.json_to_sheet(visible_rows);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excel_buffer = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      save_as_excel_file(
        excel_buffer,
        'Reporte General de Cartera con Detalle'
      );
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
          type: excel_type,
        });
        save_as_fn(data, fileName + excel_extension);
      })
      .catch((error: any) => {
        throw new Error(error);
      });
  };

  const handle_export_pdf = (): void => {
    const report = new JsPDF('l', 'pt', 'letter');
    report.text('Reporte General de Cartera con Detalle', 40, 30);
    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    autoTable(report, {
      theme: 'grid',
      head: [
        [
          'Código Contable',
          'Concepto Deuda',
          'Nombre Deudor',
          'NIT',
          'Expediente',
          'Resolución',
          '#Factura',
          'Total',
        ],
      ],
      body: values,
      foot: [['Total General', '', '', '', '', '', '', `${total_cop}`]],
    });
    report.save('Reporte General de Cartera con Detalle.pdf');
  };

  const columns: GridColDef[] = [
    // {
    //   field: 'id',
    //   headerName: 'id',
    //   width: 150,
    //   renderCell: (params) => (
    //     <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
    //       {params.value}
    //     </div>
    //   ),
    // },
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
      renderCell: (params) => {
        const precio_cop = new Intl.NumberFormat('es-ES', {
          style: 'currency',
          currency: 'COP',
        }).format(params.value);
        return (
          <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
            {precio_cop}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    set_visible_rows(reportes_recaudo);
  }, [reportes_recaudo]);

  useEffect(() => {
    if (visible_rows && visible_rows.length !== undefined) {
      set_values(visible_rows.map((obj) => Object.values(obj)) as any);
    }
  }, [visible_rows]);

  // useEffect(() => {
  //   if(visible_rows.length !== 0){
  //     set_values(visible_rows.map((obj) => Object.values(obj)) as any)
  //   }
  // }, [visible_rows])
  useEffect(() => {
    set_visible_rows(reportes_recaudo);
  }, [reportes_recaudo]);
  const [searchId, setSearchId] = useState('');

  const handleSearch = () => {
    let filteredData = [...reportes_recaudo];
    if (search) {
      filteredData = filteredData.filter((facilidad) =>
        facilidad.nombre_deudor.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (searchId) {
      filteredData = filteredData.filter((facilidad) =>
        facilidad.identificacion.toLowerCase().includes(searchId.toLowerCase())
      );
    }
    set_visible_rows(filteredData);
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Stack
        direction="row"
        justifyContent="left"
        spacing={2}
        sx={{ mb: '20px' }}
      >
        <Grid item xs={12} sm={3}>
          <TextField
            style={{ marginTop: '10px' }}
            value={search}
            onChange={(e) => set_search(e.target.value)}
            label="Buscar por nombre de deudor"
            variant="outlined"
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            value={searchId}
            style={{ marginTop: '10px' }}
            onChange={(e) => setSearchId(e.target.value)}
            label="Buscar por identificación"
            variant="outlined"
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button
            variant="contained"
            style={{ marginTop: '10px' }}
            color="primary"
            fullWidth
            startIcon={<SearchOutlined />}
            onClick={handleSearch}
          >
            Buscar
          </Button>
        </Grid>
        {/* <Stack
          direction="row"
          justifyContent="left"
          spacing={2}
        >
          <FormControl sx={{ minWidth: 130 }}>
            <InputLabel>Filtrar por: </InputLabel>
            <Select
              label="Filtrar por: "
              defaultValue={''}
              onChange={(event: event) => {
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
            onChange={(event: event) => {
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
                void dispatch(get_filtro_cartera_detallada({ parametro: filter, valor: search }));
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
        </Stack> */}
        {/* <Stack
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
        </Stack> */}
        <Grid item xs={12} sm={2}></Grid>
        <Grid item xs={12} sm={1}>
          <ButtonGroup fullWidth>
            {download_xls({ nurseries: visible_rows, columns })}
            {download_pdf({
              nurseries: visible_rows,
              columns,
              title: 'Mis alertas',
            })}
          </ButtonGroup>
        </Grid>
      </Stack>

      {visible_rows && visible_rows.length !== undefined ? (
        // <Grid
        //   container
        //   sx={{
        //     position: 'relative',
        //     background: '#FAFAFA',
        //     borderRadius: '15px',
        //     p: '20px',
        //     mb: '20px',
        //     boxShadow: '0px 3px 6px #042F4A26',
        //   }}
        // >
        <Grid item xs={12}>
          <Grid item>
            {/* <Box sx={{ width: '100%', height: '400px' }}> */}
            <DataGrid
              autoHeight
              disableSelectionOnClick
              rows={visible_rows || []}
              columns={columns}
              pageSize={10}
              page={page}
              rowCount={total_pages}
              pagination
              onPageChange={(params) => set_page(params)}
            />

            {/* </Box> */}
          </Grid>
          <Stack direction="row" display="flex" justifyContent="flex-end">
            <Grid item xs={12} sm={2.5} mt="30px">
              <TextField
                label={<strong>Total General</strong>}
                size="small"
                fullWidth
                value={total_cop}
              />
            </Grid>
          </Stack>
        </Grid>
      ) : // </Grid>
      null}
    </Box>
  );
};
