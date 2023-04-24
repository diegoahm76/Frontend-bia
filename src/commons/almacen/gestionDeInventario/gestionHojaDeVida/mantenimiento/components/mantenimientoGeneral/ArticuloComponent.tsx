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
interface IProps {
    tipo_articulo: string
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const ArticuloComponent: React.FC<IProps> = ({tipo_articulo}: IProps) => {
    const {        // States
        title,
        consulta_buscar_articulo_is_active,
        // Edita States
        set_title,
        set_buscar_articulo_is_active } = use_buscar_articulo();

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
                            helperText="Ingresar Código"
                            size="small"
                            required
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <TextField
                            label="Nombre"
                            helperText="Nombre"
                            size="small"
                            fullWidth
                            disabled={true}
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
                                    set_title('Buscar '+ tipo_articulo);
                                  }}
                            >
                                Buscar {tipo_articulo}
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