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
import use_previsualizacion from "./hooks/usePrevisualizacion";
import { useCallback, useEffect, useState } from "react";

// const tipo_articulo = [{ value: 'Com', label: 'Computo' }, { value: 'Veh', label: 'Vehiculo' }, { value: 'OAc', label: 'Otro' }]
interface IProps {
    tipo_articulo: string,
    parent_details: any,
    user_info_prop: any,
    limpiar_formulario: boolean
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const ArticuloComponent: React.FC<IProps> = ({ tipo_articulo, parent_details, user_info_prop, limpiar_formulario }: IProps) => {
    const {        // States
        title,
        consulta_buscar_articulo_is_active,
        // Edita States
        set_title,
        set_buscar_articulo_is_active } = use_buscar_articulo();

    const {
        detalle_seleccionado,
        user_info,
        set_detalle_seleccionado,
        set_user_info
    } = use_previsualizacion();

    const [id_bien, set_id_bien] = useState<string | null>("");
    const [nombre, set_nombre] = useState<string | null>("");

    const set_details_state = useCallback((val: any) => {
        set_detalle_seleccionado(val);
    }, [set_detalle_seleccionado]);

    useEffect(() => {
        set_detalle_seleccionado(detalle_seleccionado);
    }, [set_detalle_seleccionado]);

    useEffect(() => {
        parent_details(detalle_seleccionado);
    }, [parent_details, detalle_seleccionado]);

    useEffect(() => {
        const data = localStorage.getItem('persist:macarenia_app');
        if (data !== null) {
            const data_json = JSON.parse(data);
            const data_auth = JSON.parse(data_json.auth);
            set_user_info(data_auth.userinfo);
        }
    }, []);

    useEffect(() => {
        user_info_prop(user_info);
    }, [user_info]);

    useEffect(() => {
        if (limpiar_formulario) {
            set_id_bien('');
            set_nombre('');
        }
    }, [limpiar_formulario]);

    useEffect(() => {
        if (detalle_seleccionado !== undefined && detalle_seleccionado !== null) {
            set_id_bien(detalle_seleccionado.id_bien);
            set_nombre(detalle_seleccionado.nombre);
        }
    }, [detalle_seleccionado]);

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
                            value={id_bien}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <TextField
                            label="Nombre"
                            helperText="Nombre"
                            size="small"
                            value={nombre}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
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
                                    set_title('Buscar ' + tipo_articulo);
                                }}
                            >
                                Buscar {tipo_articulo}
                            </Button>
                            {consulta_buscar_articulo_is_active && (
                                <BuscarArticuloComponent
                                    is_modal_active={consulta_buscar_articulo_is_active}
                                    set_is_modal_active={set_buscar_articulo_is_active}
                                    title={title} parent_details={set_details_state} />
                            )}
                        </Stack>
                    </Grid>
                </Grid>
            </Box>

        </>
    )
}