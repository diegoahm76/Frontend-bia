/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { Grid, Box, TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Paper, IconButton, Collapse, TablePagination } from "@mui/material";
import { Title } from "../../../../components";
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import ExportDocs from "../../controlDeInventario/screens/ExportDocs";
import clsx from 'clsx';
import dayjs from "dayjs";
import React from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

interface IProps {
  resultado_busqueda: any[],
  seleccion_presentacion: string,
  seleccion_tablero_control: string,
  discriminar: boolean,
  titulo: string,
  nombre_archivo: string,
  filtros: any,
  filtros_pdf: any
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const ResultadosBusquedaTable: React.FC<IProps> = (props: IProps) => {
  const [columnas_mp, set_columnas_mp] = useState<GridColDef[]>([]);
  const [reporte, set_reporte] = useState<any[]>([]);
  const [data_tabla, set_data_tabla] = useState<any[]>([]);
  const [page, set_page] = React.useState(0);
  const [rows_per_page, set_rows_per_page] = React.useState(5);

  const handle_change_page = (event: unknown, newPage: number) => {
    set_page(newPage);
  };

  const handle_change_rows_per_page = (event: React.ChangeEvent<HTMLInputElement>) => {
    set_rows_per_page(+event.target.value);
    set_page(0);
  };

  useEffect(() => {
    if (props.resultado_busqueda.length > 0) {
      switch (props.seleccion_tablero_control) {
        case 'EI':
          reporte_unificado();
          const data_tabla = ordenar(props.resultado_busqueda, props.seleccion_presentacion === 'BD' ? 'nombre_bodega':'nombre_bien','asc');
          set_data_tabla(data_tabla);
          set_columnas_mp([
            {
              field: 'consecutivo',
              headerName: 'Consecutivo',
              minWidth: 120,
              flex: 1,
          },
            {
              field: 'nombre_bodega',
              headerName: 'Bodega',
              width: 300,
              valueGetter: (params) => params.row.nombre_bodega
            },
            {
              field: 'codigo_bien',
              headerName: 'Código bien',
              minWidth: 140,
              flex: 1,
            },
            {
              field: 'nombre_bien',
              headerName: 'Bien',
              width: 300,
              valueGetter: (params) => params.row.nombre_bien,
            },
            {
              field: 'cantidad_ingresada_total',
              headerName: 'Cantidad ingresada total',
              width: 300,
              valueGetter: (params) => params.row.cantidad_ingresada_total
            },
            {
              field: 'placa_serial',
              headerName: 'Placa / Serial',
              minWidth: 140,
              flex: 1,
            },
            {
              field: 'cod_tipo_activo',
              headerName: 'Tipo Activo',
              minWidth: 140,
              flex: 1,
            },
            {
              field: 'responsable_bodega',
              headerName: 'Responsable bodega',
              width: 300,
              valueGetter: (params) => params.row.responsable_bodega
            },
            {
              field: 'nombre_proveedor',
              headerName: 'Nombre proveedor',
              width: 300,
              valueGetter: (params) => params.row.nombre_proveedor
            },
            {
              field: 'entrada',
              headerName: 'Entrada',
              width: 300,
              valueGetter: (params) => params.row.entrada
            },
            {
              field: 'fecha_entrada',
              headerName: 'Fecha de ingreso',
              width: 300,
              valueGetter: (params) => params.row.fecha_entrada
            },

            {
              field: 'cantidad',
              headerName: 'Cantidad ingresada',
              width: 300,
              valueGetter: (params) => params.row.cantidad
            },
          ]);
          break;
        default:
          break;
      }
    }
  }, [props.resultado_busqueda, props.seleccion_presentacion]);

  const reporte_unificado: () => void = () => {
    let push_data: any = [];
    props.resultado_busqueda.forEach((rb: any) =>{
      rb.detalle.forEach((dt: any) => {
        push_data.push({...rb,...dt})
      });
    });
    const data_retorno = ordenar(push_data, props.seleccion_presentacion === 'BD' ? 'nombre_bodega':'nombre_bien','asc');
    set_reporte(data_retorno);
  }

  const ordenar: (data: any, parametro: string, tipo: string) => any = (data: any, parametro: string, tipo: string) => {
    if (data.length > 0) {
      data.sort(function (a: any, b: any) {
        if (tipo === 'desc') {
          if (a[parametro] < b[parametro])
            return 1;
          if (a[parametro] > b[parametro])
            return -1;
          return 0;
        } else {
          if (a[parametro] > b[parametro])
            return 1;
          if (a[parametro] < b[parametro])
            return -1;
          return 0;
        }
      });
    }
    return data;
  }

  function createData(
    consecutivo: string,
    id_bodega: number,
    nombre_bodega: string,
    id_bien: number,
    nombre_bien: string,
    codigo_bien: string,
    placa_serial: string,
    cod_tipo_activo: string,
    cod_tipo_bien: string,
    cantidad_ingresada_total: number,
    responsable_bodega: string,
    nombre_proveedor: string,
    detalle: [{ cantidad: number, entrada: string, fecha_entrada: string }],
  ) {
    return {
      consecutivo,
      id_bodega,
      nombre_bodega,
      id_bien,
      nombre_bien,
      codigo_bien,
      placa_serial,
      cod_tipo_activo,
      cod_tipo_bien,
      cantidad_ingresada_total,
      responsable_bodega,
      nombre_proveedor,
      detalle
    }
  }
  function Row(props: { row: ReturnType<typeof createData> }) {
    const { row } = props;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell>{row.consecutivo}</TableCell>
          <TableCell>{row.nombre_bodega}</TableCell>
          <TableCell>{row.codigo_bien}</TableCell>
          <TableCell>{row.nombre_bien}</TableCell>
          <TableCell>{row.cantidad_ingresada_total}</TableCell>
          <TableCell>{row.placa_serial}</TableCell>
          <TableCell>{row.cod_tipo_activo}</TableCell>
          <TableCell>{row.cod_tipo_bien}</TableCell>
          <TableCell>{row.responsable_bodega}</TableCell>
          <TableCell>{row.nombre_proveedor}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Entrada</TableCell>
                      <TableCell>Fecha de ingreso</TableCell>
                      <TableCell>Cantidad ingresada</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.detalle.map((historyRow) => (
                      <TableRow key={uuidv4()}>
                        <TableCell component="th" scope="row">
                          {historyRow.entrada}
                        </TableCell>
                        <TableCell>{dayjs(historyRow.fecha_entrada).format('DD/MM/YYYY HH:mm:ss')}</TableCell>
                        <TableCell >{historyRow.cantidad}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  return (
    <>
      <Title title={props.titulo} />
      <Box component="form" sx={{ mt: '20px', '& .super-app.positive_green': { backgroundColor: '#C4DFAA' }, '& .super-app.positive': { backgroundColor: '#fdfd96' }, '& .super-app.warning': { backgroundColor: '#ffa07a' }, '& .super-app.danger': { backgroundColor: '#ff6961' } }} noValidate autoComplete="off">
        <Grid item container spacing={2}>
          <Grid item xs={12} sm={12}>
            <ExportDocs cols={columnas_mp} resultado_busqueda={reporte} filtros={props.filtros} nombre_archivo={props.nombre_archivo} filtros_pdf={props.filtros_pdf}></ExportDocs>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell>Consecutivo</TableCell>
                    <TableCell>Bodega</TableCell>
                    <TableCell>Código bien</TableCell>
                    <TableCell>Bien&nbsp;</TableCell>
                    <TableCell>Cantidad ingresada total&nbsp;</TableCell>
                    <TableCell>Placa / Serial&nbsp;</TableCell>
                    <TableCell>Tipo Activo&nbsp;</TableCell>
                    <TableCell>Tipo bien&nbsp;</TableCell>
                    <TableCell>Responsable bodega&nbsp;</TableCell>
                    <TableCell>Nombre proveedor&nbsp;</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data_tabla.slice(page * rows_per_page, page * rows_per_page + rows_per_page).map((row) => (
                    <Row key={row.name} row={row} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={data_tabla.length}
            rowsPerPage={rows_per_page}
            page={page}
            onPageChange={handle_change_page}
            onRowsPerPageChange={handle_change_rows_per_page}
      />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

