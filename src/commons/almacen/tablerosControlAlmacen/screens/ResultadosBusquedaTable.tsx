/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { Grid, Box, Typography, Divider, TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Paper, IconButton, Collapse } from "@mui/material";
import { Title } from "../../../../components";
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from "react";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
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

    useEffect(() => {
        if (props.resultado_busqueda.length > 0) {
            switch (props.seleccion_tablero_control) {
                case 'EI':
                    set_columnas_mp([
                        {
                            field: 'nombre_bodega',
                            headerName: 'Bodega',
                            width: 300,
                            valueGetter: (params) => params.row.nombre_bodega
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
                            field: 'responsable_bodega',
                            headerName: 'Responsable bodega',
                            width: 300,
                            valueGetter: (params) => params.row.responsable_bodega
                        }
                    ]);
                    break;
                default:
                    break;
            }

        }
    }, [props.resultado_busqueda, props.seleccion_presentacion]);

    function createData(
        id_bodega: number,
        nombre_bodega: string,
        id_bien: number,
        nombre_bien: string,
        codigo_bien: string,
        cantidad_ingresada_total: number,
        responsable_bodega: string,
        detalle: any[],
      ) {
        return {
        id_bodega: 20,
        nombre_bodega: "Bodega Granada",
        id_bien: 274,
        nombre_bien: "vivero test subcarpeta 3",
        codigo_bien: "400100100007",
        cantidad_ingresada_total: 1000,
        responsable_bodega: "Juan Fajardo",
        detalle: [
            {
                cantidad: 1000,
                entrada: "Resarcimiento - 88",
                fecha_entrada: "2023-09-27T18:05:00"
            }
        ]  
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
              <TableCell>{row.nombre_bodega}</TableCell>
              <TableCell>{row.nombre_bien}</TableCell>
              <TableCell>{row.cantidad_ingresada_total}</TableCell>
              <TableCell>{row.responsable_bodega}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <Box sx={{ margin: 1 }}>
                    <Table size="small" aria-label="purchases">
                      <TableHead>
                        <TableRow>
                          <TableCell>Entrada</TableCell>
                          <TableCell>Bien</TableCell>
                          <TableCell>Cantidad ingresada</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {row.detalle.map((historyRow) => (
                          <TableRow key={historyRow.fecha_entrada}>
                            <TableCell component="th" scope="row">
                              {historyRow.entrada}
                            </TableCell>
                            <TableCell>{dayjs(historyRow.fecha_entrada).format('DD/MM/YYYY')}</TableCell>
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
                        <ExportDocs cols={columnas_mp} resultado_busqueda={props.resultado_busqueda} filtros={props.filtros} nombre_archivo={props.nombre_archivo} filtros_pdf={props.filtros_pdf}></ExportDocs>

                        <TableContainer component={Paper}>
                            <Table aria-label="collapsible table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell />
                                        <TableCell>Bodega</TableCell>
                                        <TableCell>Bien&nbsp;(g)</TableCell>
                                        <TableCell>Cantidad ingresada total&nbsp;(g)</TableCell>
                                        <TableCell>Responsable bodega&nbsp;(g)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {props.resultado_busqueda.map((row) => (
                                        <Row key={row.name} row={row} />
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

