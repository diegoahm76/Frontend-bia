import {
    Button,
    Fab,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    type SelectChangeEvent,
    Stack
} from "@mui/material";
import { useState } from "react";
import { PruebasLiquidacionModal } from "./modal/PruebasLiquidacionModal";


const tipo_articulo = [{ value: 'volprom', label: 'Volumen Promedio' }, { value: 'rural', label: 'Es Rural' }, { value: 'estrato', label: 'Estrato'},]
const tipo_logica = [
    { 
        value: 'igual',
        label: '='
    },
    { 
        value: 'mayor_igual',
        label: '>='
    },
    { 
        value: 'menor_igual',
        label: '<='
    },
    { 
        value: 'menor',
        label: '<'
    }, 
    { 
        value: 'mayor',
        label: '>'
    },
]

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CalculadoraComponent:React.FC = () => {

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

    // MODAL PRUEBAS DE LIQUIDACION
    const [modal_pruebas, set_modal_pruebas] = useState<boolean>(false);


  return (
    <>
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
        <PruebasLiquidacionModal
            is_modal_active={modal_pruebas}
            set_is_modal_active={set_modal_pruebas}
        />
    </>
  )
}
