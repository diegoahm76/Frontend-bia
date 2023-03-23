import { Box, Button, Grid, IconButton, Stack, TextField, TextareaAutosize } from "@mui/material"
import { Title } from "../../../components"
import FindInPageIcon from '@mui/icons-material/FindInPage';
import { DataGrid, type GridColDef } from "@mui/x-data-grid";

const column:GridColDef[] = [
    { 
        field: 'parametros',
        headerName: 'Parametros',
        width: 200
    },
    {
        field: 'nombre',
        headerName: 'Nombre',
        width: 200
    },
    {
        field: 'tipo',
        headerName: 'Tipo',
        width: 200
    },
    {
        field: 'opciones',
        headerName: 'Opcion',
        width: 200
    },
]

const row = [
    {
        id: 1,
        parametros: 'Volumen Promedio',
        nombre: 'volprom',
        tipo: 'Número',
        opciones: '',

    },
    {
        id: 2,
        parametros: 'Es Rural',
        nombre: 'rural',
        tipo: 'Si/No',
        opciones: '',

    },
    {
        id: 3,
        parametros: 'Estrato',
        nombre: 'estrato',
        tipo: 'Número',
        opciones: '1.2.3.4.5',
    },
]

// eslint-disable-next-line @typescript-eslint/naming-convention
export const LiquidacionScreen:React.FC = () => {
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
                <Title title="Liquidacion"></Title>
                <Box
                    component='form'
                    sx={{ mt: '20px' }}
                    noValidate
                    autoComplete="off"
                >
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                placeholder="Liquidacion de intereses por mora"
                                size="small"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <IconButton size="large" color="primary">
                                <FindInPageIcon fontSize="inherit" />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={6}>
                            <DataGrid
                                density="compact"
                                autoHeight
                                rows={row}
                                columns={column}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <TextareaAutosize
                                style={{ margin: '10px', width: 500, height: 500 }}
                            />
                        </Grid>
                    </Grid>
                </Box>
                    <Stack
                        direction="row"
                        justifyContent="center"
                        spacing={2}
                        sx={{ mb: '20px' }}
                    >
                    <Button
                        color='success'
                        variant='contained'
                    >
                        Guardar
                    </Button>
                    <Button
                        color='info'
                        variant='contained'
                    >
                        Copiar
                    </Button>
                </Stack>
            </Grid>

        </Grid>
    </>
  )
}
