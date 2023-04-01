import { useState } from "react"
import { Box, Button, FormControl, Grid, MenuItem, Select, type SelectChangeEvent, Stack } from "@mui/material"
import { DataGrid, type GridColDef } from "@mui/x-data-grid"
import { Title } from "../../../../components"
import { DetalleModal } from "./modal/DetalleModal"

const column_detalle: GridColDef[] = [
    {
        field: 'concepto',
        headerName: 'Concepto',
        width: 200
    },
    {
        field: 'valor_base_liquidacion',
        headerName: 'Valor base de liquidacion',
        width: 200
    },
    {
        field: 'formula_aplicada',
        headerName: 'Formula Aplicada',
        width: 200
    },
    {
        field: 'valor_liquidado',
        headerName: 'Valor Liquidado',
        width: 200
    },
]

const rows_detalle = [
    {
        id: 1,
        concepto: 'Interes por mora',
        valor_base_liquidacion: '465.402',
        formula_aplicada: 'valor*0.02*12',
        valor_liquidado: '65000'
    },
    {
        id: 2,
        concepto: 'Sancion',
        valor_base_liquidacion: '465.402',
        formula_aplicada: 'valor*0.1',
        valor_liquidado: '465540'
    },
]

const tipo_liquidacion = [{ value: 'liquidacion_mora_sancion', label: 'Liquidacion de mora con sancion' }]

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-redeclare, no-import-assign, @typescript-eslint/no-unused-vars
export const DetalleLiquidacion:React.FC = () => {

  const [modal_detalle, set_modal_detalle] = useState<boolean>(false);

  const [tipo, set_tipo] = useState("");

  const handle_change:(event:SelectChangeEvent) => void = (event: SelectChangeEvent) => {
      set_tipo(event.target.value);
  }

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
                boxShadow: '0px 3px 6px #042F4A26'
            }}
        >
            <Grid item xs={12}>
                <Title title="Detalle de liquidación"></Title>
                <Box
                    component='form'
                    sx={{ mt: '20px' }}
                    noValidate
                    autoComplete="off"
                >
                    <Stack
                        direction="column"
                        spacing={2}
                        sx={{ m: '20px 0' }}
                        justifyContent="flex-end"
                    >
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => {
                                set_modal_detalle(true);
                            }}
                        >
                            Modelo de Liquidacion
                        </Button>

                        <FormControl sx={{ pb:'10px' }}  size='small' fullWidth>
                            <Select
                                value={tipo}
                                onChange={handle_change}
                            >
                                { tipo_liquidacion.map(({value, label}) => (
                                    <MenuItem key={value} value={value}>
                                        {label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Stack>

                    <Box sx={{ width: '100%' }}>
                        <DataGrid
                            density="compact"
                            autoHeight
                            rows={rows_detalle}
                            columns={column_detalle}
                            getRowId={(row) => row.id}
                        />
                    </Box>
                </Box>
            </Grid>
        </Grid>
        <DetalleModal
            is_modal_active={modal_detalle}
            set_is_modal_active={set_modal_detalle} 
        />
    </>
  )
}
