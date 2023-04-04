import {
    Avatar,
    Box,
    Button,
    Fab,
    FormControl,
    Grid,
    IconButton,
    MenuItem,
    Select,
    type SelectChangeEvent,
    Stack,
    TextField,
    InputLabel,
    // TextareaAutosize
} from "@mui/material"
import { Title } from "../../../components"
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useState } from 'react';
// import { PruebasLiquidacionModal } from "../components/modal/PruebasLiquidacionModal";
import FindInPageIcon from '@mui/icons-material/FindInPage';
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';


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

const tipo_articulo = [{ value: 'volprom', label: 'Volumen Promedio' }, { value: 'rural', label: 'Es Rural' }, { value: 'estrato', label: 'Estrato'},]
const tipo_logica = [{ value: 'igual', label: '=' }, { value: 'mayor_igual', label: '>=' }, { value: 'menor_igual', label: '<='}, { value: 'menor', label: '<'}, { value: 'mayor', label: '>'},]

// eslint-disable-next-line @typescript-eslint/naming-convention
export const LiquidacionScreen:React.FC = () => {

    // ONCHANGE SELECT TIPO DE PARAMETRO
    const [tipo, set_tipo] = useState("");

    const handle_change:(event:SelectChangeEvent) => void = (event: SelectChangeEvent) => {
        set_tipo(event.target.value);
    }

    // ONCHANGE SELECT LOGICA CALCULADORA
    const [logica, set_logica] = useState("");
    
    const handle_logica:(event:SelectChangeEvent) => void = (event: SelectChangeEvent) => {
        set_logica(event.target.value);
    }

    const [add_parametro, set_add_parametro] = useState<boolean>(false);
    const [modal_pruebas, set_modal_pruebas] = useState<boolean>(false);

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
                        {/* <Grid item>
                            <TextareaAutosize 
                                style={{ margin: '10px', width: '300px', height: '450px' }}
                            />
                        </Grid> */}
                        <Grid item>
                            <Stack
                                direction="column"
                                justifyContent="end"
                                spacing={2}
                                sx={{ p: '20px' }}
                            >
                                <Button
                                     variant="outlined"
                                     color="primary"
                                     onClick={() => {
                                         set_modal_pruebas(true);
                                     }}
                                >
                                    Pruebas de liquidacion
                                </Button>
                                <FormControl size='small' fullWidth>
                                    <InputLabel>Parametro</InputLabel>
                                    <Select
                                        label='Parametro'
                                        value={tipo}
                                        onChange={handle_change}
                                    >
                                        { tipo_articulo.map(({value, label}) => (
                                            <MenuItem key={value} value={value}>
                                                {label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <Fab variant="extended" size="small" color="info">
                                    +
                                </Fab>
                                <Fab variant="extended" size="small" color="info">
                                    -
                                </Fab>
                                <Fab variant="extended" size="small" color="info">
                                    /
                                </Fab>
                                <Fab variant="extended" size="small" color="info">
                                    *
                                </Fab>
                                <FormControl size='small' fullWidth>
                                    <Select
                                        value={logica}
                                        onChange={handle_logica}
                                    >
                                        { tipo_logica.map(({value, label}) => (
                                            <MenuItem key={value} value={value}>
                                                {label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <Fab variant="extended" size="small" color="info">
                                    Y
                                </Fab>
                                <Fab variant="extended" size="small" color="info">
                                    O
                                </Fab>
                                <Fab variant="extended" size="small" color="info">
                                    SI
                                </Fab>
                                <Fab variant="extended" size="small" color="info">
                                    SI NO
                                </Fab>
                            </Stack>
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
        
        {/* <PruebasLiquidacionModal
            is_modal_active={modal_pruebas}
            set_is_modal_active={set_modal_pruebas}
        /> */}
    </>
  )
}
