import { Box, Button, Grid, Stack } from "@mui/material"
import { DataGrid, type GridColDef } from "@mui/x-data-grid"
import { Title } from "../../../../components"

const column_detalle: GridColDef[] = [
    {
        field: 'atributo',
        headerName: 'Atributo',
        width: 200
    },
    {
        field: 'a',
        headerName: '',
        width: 500
    },
    {
        field: 'b',
        headerName: '',
        width: 200
    },
]

const rows_detalle = [
    {
        id: 1,
        atributo: 'Acto administrativo',
        a: '',
        b: 'File_00002284741132.pdd'
    },
    {
        id: 2,
        atributo: 'Fecha de ejecutoriado',
        a: '',
        b: '21-11-2022'
    },
    {
        id: 3,
        atributo: 'Resolución',
        a: '',
        b: 'Resolucion_482104112022'
    },
    {
        id: 4,
        atributo: 'Observaciones',
        a: 'No se evidencia voluntad de pago',
    },
    {
        id: 5,
        atributo: 'Estudio de credito',
        a: 'Si',
    },
]

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-redeclare, no-import-assign, @typescript-eslint/no-unused-vars
export const CobroCoactivo:React.FC = () => {

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
                <Title title="Nuevo estado de Cartera: Cobro Coactivo"></Title>
                <Box
                    component='form'
                    sx={{ mt: '20px' }}
                    noValidate
                    autoComplete="off"
                >
                    <DataGrid
                        density="compact"
                        autoHeight
                        rows={rows_detalle}
                        columns={column_detalle}
                        getRowId={(row) => row.id}
                    />
                     <Stack
                        direction="row"
                        justifyContent="center"
                        sx={{
                            pt: '20px'
                        }}
                    >
                        <Button
                            color="info"
                            variant="contained"
                        >
                            Guardar
                        </Button>
                    </Stack>
                </Box>
            </Grid>
        </Grid>
    </>
  )
}
