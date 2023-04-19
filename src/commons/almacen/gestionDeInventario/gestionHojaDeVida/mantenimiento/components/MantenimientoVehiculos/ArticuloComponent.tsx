import { useState } from 'react';
import {
    Box,
    Button,
    Grid,
    Stack,
    TextField
} from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import BuscarArticuloComponent from './BuscarArticulo';
import use_buscar_articulo from './hooks/useBuscarArticulo';

// const tipo_articulo = [{ value: 'Com', label: 'Computo' }, { value: 'Veh', label: 'Vehiculo' }, { value: 'OAc', label: 'Otro' }]

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ArticuloComponent: React.FC = () => {
    const {        // States
        title,
        consulta_buscar_articulo_is_active,
        // Edita States
        set_title,
        set_buscar_articulo_is_active } = use_buscar_articulo();

    const [tipo] = useState("Veh");
    console.log(tipo);
    return (
        <>
            <Box
                component="form"
                sx={{ mt: '20px' }}
                noValidate
                autoComplete="off"
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={5}>
                        <TextField
                            label="Código"
                            helperText="Seleccione Código"
                            size="small"
                            required
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <TextField
                            label="Nombre"
                            helperText="Seleccione Nombre"
                            size="small"
                            required
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={2}>
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
                                onClick={() => {
                                    set_buscar_articulo_is_active(true);
                                    set_title('Buscar vehículo');
                                  }}
                            >
                                Buscar Vehículo
                            </Button>
                            {consulta_buscar_articulo_is_active && (
                                <BuscarArticuloComponent 
                                is_modal_active={consulta_buscar_articulo_is_active} 
                                set_is_modal_active={set_buscar_articulo_is_active} 
                                title={title} />
                            )}
                        </Stack>
                    </Grid>
                </Grid>
            </Box>

        </>
    )
}