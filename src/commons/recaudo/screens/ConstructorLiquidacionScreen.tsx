import {
    Avatar,
    Box,
    Button,
    Grid,
    IconButton,
    Stack,
    TextField,
} from "@mui/material"
import { Title } from "../../../components"
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useState } from 'react';
import { AddParametroModal } from '../components/constructorLiquidador/modal/AddParametroModal';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';
import { CalculadoraComponent } from '../components/constructorLiquidador/CalculadoraComponent';


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
    {
        field: 'acciones',
        headerName: 'Acciones',
        width: 100,
        renderCell: (params) => (
          <>
            <IconButton
              onClick={() => {}}
            >
              <Avatar
                sx={{
                  width: 24,
                  height: 24,
                  background: '#fff',
                  border: '2px solid',
                }}
                variant="rounded"
              >
                <RemoveCircleOutlinedIcon 
                    color="error"
                    sx={{ width: '18px', height: '18px' }}
                />
              </Avatar>
            </IconButton>
          </>
        ),
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
export const ConstructorLiquidacionScreen:React.FC = () => {


    const [add_parametro, set_add_parametro] = useState<boolean>(false);

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
                    <Title title="Constructor Liquidacion"></Title>
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
                            <Stack
                                direction="row"
                                justifyContent="end"
                                spacing={2}
                                sx={{ mb: '20px' }}
                            >
                                <Button
                                    variant="outlined"
                                    startIcon={<AddIcon />}
                                    onClick={() => {
                                        set_add_parametro(true);
                                    }}
                                >
                                    Añadir parametro
                                </Button>
                            </Stack>
                        </Grid>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <DataGrid
                                    density="compact"
                                    autoHeight
                                    rows={row}
                                    columns={column}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} justifyContent='end'>
                            {/* CALCULADORA COMPONENT */}
                            <CalculadoraComponent />
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
            <AddParametroModal
                is_modal_active={add_parametro}
                set_is_modal_active={set_add_parametro}
            />
        </>
    )
}
