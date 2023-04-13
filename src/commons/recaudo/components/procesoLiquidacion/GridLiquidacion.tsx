import { Avatar, Box, Grid, IconButton, TextField } from "@mui/material"
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { DataGrid, type GridColDef, type GridRenderCellParams } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import { type SetStateAction, type ReactNode, type Dispatch } from "react";


const rows = [
    {
        id: 1,
        deudor: 'Leonardo Midas',
        factura: '2-4324-35-435-23',
        monto_inicial: "$23'430.000",
        anio: '2021',
        periodo: '12/12/2021 a 12/01/2022',
        concepto: 'TASA TUA',
        codigo_contable: '2432142'
    },
    {
        id: 2,
        deudor: 'Leonardo Midas',
        factura: '2-4324-35-435-23',
        monto_inicial: "$23'430.000",
        anio: '2021',
        periodo: '12/12/2021 a 12/01/2022',
        concepto: 'TASA TUA',
        codigo_contable: '2432142'
    },
    {
        id: 3,
        deudor: 'Leonardo Midas',
        factura: '2-4324-35-435-23',
        monto_inicial: "$23'430.000",
        anio: '2021',
        periodo: '12/12/2021 a 12/01/2022',
        concepto: 'TASA TUA',
        codigo_contable: '2432142'
    },
    {
        id: 4,
        deudor: 'Leonardo Midas',
        factura: '2-4324-35-435-23',
        monto_inicial: "$23'430.000",
        anio: '2021',
        periodo: '12/12/2021 a 12/01/2022',
        concepto: 'TASA TUA',
        codigo_contable: '2432142'
    },
    {
        id: 5,
        deudor: 'Leonardo Midas',
        factura: '2-4324-35-435-23',
        monto_inicial: "$23'430.000",
        anio: '2021',
        periodo: '12/12/2021 a 12/01/2022',
        concepto: 'TASA TUA',
        codigo_contable: '2432142'
    },
]

interface IProps {
    set_position_tab_organigrama: Dispatch<SetStateAction<string>>
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const GridLiquidacion:React.FC<IProps> = ({ set_position_tab_organigrama }:IProps) => {

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'ID',
            width: 20
        },
        {
            field: 'deudor',
            headerName: 'Deudor',
            width: 200
        },
        {
            field: 'factura',
            headerName: 'Factura',
            width: 200
        },
        {
            field: 'monto_inicial',
            headerName: 'Monto Inicial',
            width: 200
        },
        {
            field: 'anio',
            headerName: 'Año',
            width: 100
        },
        {
            field: 'periodo',
            headerName: 'Periodo',
            width: 200
        },
        {
            field: 'concepto',
            headerName: 'Concepto',
            width: 200
        },
        {
            field: 'codigo_contable',
            headerName: 'Condigo Contable',
            width: 200
        },
        {
            field: 'acciones',
            headerName: 'Acciones',
            width: 100,
            renderCell: (params: GridRenderCellParams<any, any, any>):ReactNode => (
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

  return (
    <>
        <Grid container spacing={1} sx={{ pb: '30px' }}>
            <Grid item xs={12} sm={4}>
                <TextField
                    placeholder="Buscar"
                    size="small"
                    fullWidth
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
                    rows={rows}
                    columns={columns}
                />
            </Box>
        </Grid>
    </>
  )
}
