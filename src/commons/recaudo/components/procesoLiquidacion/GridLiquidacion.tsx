import { Avatar, Box, Grid, IconButton, TextField } from "@mui/material"
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { DataGrid, type GridColDef, type GridRenderCellParams } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import { type SetStateAction, type ReactNode, type Dispatch, useState, useEffect } from "react";
import type { Liquidacion } from "../../interfaces/liquidacion";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Search } from "@mui/icons-material";

// const rows = [
//     {
//         id: 1,
//         deudor: 'Leonardo Midas',
//         factura: '2-4324-35-435-23',
//         monto_inicial: "$23'430.000",
//         anio: '2021',
//         periodo: '12/12/2021 a 12/01/2022',
//         concepto: 'TASA TUA',
//         codigo_contable: '2432142'
//     },
//     {
//         id: 2,
//         deudor: 'Leonardo Midas',
//         factura: '2-4324-35-435-23',
//         monto_inicial: "$23'430.000",
//         anio: '2021',
//         periodo: '12/12/2021 a 12/01/2022',
//         concepto: 'TASA TUA',
//         codigo_contable: '2432142'
//     },
//     {
//         id: 3,
//         deudor: 'Leonardo Midas',
//         factura: '2-4324-35-435-23',
//         monto_inicial: "$23'430.000",
//         anio: '2021',
//         periodo: '12/12/2021 a 12/01/2022',
//         concepto: 'TASA TUA',
//         codigo_contable: '2432142'
//     },
//     {
//         id: 4,
//         deudor: 'Leonardo Midas',
//         factura: '2-4324-35-435-23',
//         monto_inicial: "$23'430.000",
//         anio: '2021',
//         periodo: '12/12/2021 a 12/01/2022',
//         concepto: 'TASA TUA',
//         codigo_contable: '2432142'
//     },
//     {
//         id: 5,
//         deudor: 'Leonardo Midas',
//         factura: '2-4324-35-435-23',
//         monto_inicial: "$23'430.000",
//         anio: '2021',
//         periodo: '12/12/2021 a 12/01/2022',
//         concepto: 'TASA TUA',
//         codigo_contable: '2432142'
//     },
// ]

interface IProps {
  set_position_tab_organigrama: Dispatch<SetStateAction<string>>;
  liquidaciones: Liquidacion[];
}

interface Rows {
  id: number;
  // liquidacion: string;
  deudor: string;
  identificacion: string;
  monto_inicial: number;
  fecha_liquidacion: string;
  periodo: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const GridLiquidacion: React.FC<IProps> = ({ set_position_tab_organigrama, liquidaciones }: IProps) => {
  const [rows, set_rows] = useState<Rows[]>([]);
  const [search_deudor, set_search_deudor] = useState('');

  useEffect(() => {
    const new_rows = liquidaciones.map((liquidacion) => ({
      id: liquidacion.id,
      // liquidacion: liquidacion.id_opcion_liq.nombre,
      deudor: liquidacion.cod_deudor.nombres.concat(' ', liquidacion.cod_deudor.apellidos),
      identificacion: liquidacion.cod_deudor.identificacion,
      monto_inicial: liquidacion.valor,
      fecha_liquidacion: liquidacion.fecha_liquidacion,
      periodo: liquidacion.periodo_liquidacion,
    }));
    set_rows(new_rows);
  }, [liquidaciones]);

  // const rows = liquidaciones.map((liquidacion) => ({
  //     id: liquidacion.id,
  //     liquidacion: liquidacion.id_opcion_liq.nombre,
  //     deudor: liquidacion.cod_deudor.nombres.concat(' ', liquidacion.cod_deudor.apellidos),
  //     identificacion: liquidacion.cod_deudor.identificacion,
  //     monto_inicial: liquidacion.valor,
  //     fecha_liquidacion: liquidacion.fecha_liquidacion,
  //     periodo: liquidacion.periodo_liquidacion,
  // }));

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 20
    },
    // {
    //   field: 'liquidacion',
    //   headerName: 'Liquidación',
    //   width: 200
    // },
    {
      field: 'deudor',
      headerName: 'Deudor',
      width: 200
    },
    {
      field: 'identificacion',
      headerName: 'Identificación',
      width: 200
    },
    {
      field: 'monto_inicial',
      headerName: 'Monto Inicial',
      width: 200
    },
    {
      field: 'fecha_liquidacion',
      headerName: 'Fecha liquidación',
      width: 200
    },
    {
      field: 'periodo',
      headerName: 'Periodo',
      width: 200
    },
    // {
    //     field: 'concepto',
    //     headerName: 'Concepto',
    //     width: 200
    // },
    // {
    //     field: 'codigo_contable',
    //     headerName: 'Condigo Contable',
    //     width: 200
    // },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 100,
      renderCell: (params: GridRenderCellParams<any, any, any>): ReactNode => (
        <>
          <IconButton
            onClick={() => {
              set_position_tab_organigrama('2')
            }}
          >
            <Avatar
              sx={{
                width: 24,
                height: 24,
                background: '#fff',
                border: '2px solid'
              }}
              variant="rounded"
            >
              <EditIcon
                sx={{ color: 'primary.main', width: '18px', height: '18px' }}
              />
            </Avatar>
          </IconButton>
        </>
      )
    }
  ]

  const handle_search_change: (event: any) => void = (event: any) => {
    set_search_deudor(event.target.value);
  };

  // const filter_deudor: (identificacion: string) => void = (identificacion: string) => {
  //     const filtered_deudor = liquidaciones.filter((liquidacion) => {
  //         return liquidacion.cod_deudor.identificacion.includes(identificacion);
  //     });
  //     set_liquidaciones(filtered_deudor);
  // };

  const filter_deudor: (query: string, data: Rows[]) => Rows[] = (query: string, data: Rows[]) => {
    if (!query) {
      return data;
    } else {
      return data.filter((liq) => liq.identificacion.includes(query));
    }
  };

  const deudor_filtered = filter_deudor(search_deudor, rows);

  return (
    <>
      <Grid container spacing={1} sx={{ pb: '30px' }}>
        <Grid item xs={12} sm={4}>
          <TextField
            type="search"
            placeholder="Buscar"
            size="small"
            fullWidth
            value={search_deudor}
            onInput={handle_search_change}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <IconButton size="large" color="primary">
            <PersonSearchIcon fontSize="inherit" />
          </IconButton>
        </Grid>
      </Grid>
      <Grid item>
        <Box sx={{ width: '100%' }}>
          <DataGrid
            density="compact"
            autoHeight
            rows={deudor_filtered}
            columns={columns}
          />
        </Box>
      </Grid>
    </>
  )
}
