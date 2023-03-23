import { useState } from 'react';
import { 
    Box, 
    Button, 
    FormControl, 
    Grid, 
    InputLabel, 
    MenuItem, 
    Select, 
    type SelectChangeEvent, 
    Stack, 
    TextField 
} from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';

const tipo_articulo = [{ value: 'Com', label: 'Computo' }, { value: 'Veh', label: 'Vehiculo' }, { value: 'OAc', label: 'Otro' }]

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ArticuloComponent:React.FC = () => {

    const [tipo, set_tipo] = useState("");

    const handle_change:(event:SelectChangeEvent) => void = (event: SelectChangeEvent) => {
        set_tipo(event.target.value);
    }

    return (
    <>
        <Box
            component="form"
            sx={{ mt: '20px'}}
            noValidate
            autoComplete="off"
        >
        <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
                <TextField
                    label="Código"
                    helperText="Seleccione Código"
                    size="small"
                    required
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                    label="Nombre"
                    helperText="Seleccione Nombre"
                    size="small"
                    required
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <FormControl required size='small' fullWidth>
                    <InputLabel>Tipo</InputLabel>
                    <Select
                        value={tipo}
                        label="Tipo"
                        onChange={handle_change}
                    >
                        { tipo_articulo.map(({value, label}) => (
                            <MenuItem key={value} value={value}>
                                {label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
        </Box>
        <Stack
            direction="row"
            justifyContent="flex-end"
            spacing={2}
            sx={{ mb: '20px' }}
        >
            <Button
                color='primary'
                variant='contained'
                startIcon={<SearchIcon />}
            >
                Buscar Articulo
            </Button>
        </Stack>
    </>
    )
}