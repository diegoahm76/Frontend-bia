import {
    Box,
    Button,
    FormHelperText,
    Grid,
    Stack,
    TextField
} from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from "react";
import use_buscar_articulo from "../../mantenimientoGeneral/hooks/useBuscarArticulo";
import use_previsualizacion from "../../mantenimientoGeneral/hooks/usePrevisualizacion";
import BuscarArticuloComponent from "../../mantenimientoGeneral/BuscarArticulo";

// const tipo_articulo = [{ value: 'Com', label: 'Computo' }, { value: 'Veh', label: 'Vehiculo' }, { value: 'OAc', label: 'Otro' }]
interface IProps {
    tipo_articulo: string,
    parent_details: any,
    limpiar_formulario: boolean,
    detalle_programacion: any,
    accion_guardar: boolean
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const BusquedaArticuloComponent: React.FC<IProps> = ({ tipo_articulo, parent_details, limpiar_formulario, detalle_programacion, accion_guardar }: IProps) => {
    const {        // States
        title,
        consulta_buscar_articulo_is_active,
        // Edita States
        set_title,
        set_buscar_articulo_is_active } = use_buscar_articulo();

    const {
        detalle_seleccionado,
        set_detalle_seleccionado,
    } = use_previsualizacion();

    const [id_bien, set_id_bien] = useState<string | null>("");
    const [nombre, set_nombre] = useState<string | null>("");
    // Errors
    const [mensaje_error_codigo, set_mensaje_error_codigo] = useState<string>("");

    useEffect(() => {
        parent_details(detalle_seleccionado);
    }, [parent_details, detalle_seleccionado]);

    useEffect(() => {
        if (limpiar_formulario) {
            set_id_bien('');
            set_nombre('');
            set_mensaje_error_codigo("");
        }
    }, [limpiar_formulario]);

    useEffect(() => {
        if (detalle_seleccionado !== undefined && detalle_seleccionado !== null) {
            set_id_bien(detalle_seleccionado.codigo_bien);
            set_nombre(detalle_seleccionado.nombre);
            if(detalle_seleccionado.codigo_bien !== null && detalle_seleccionado.codigo_bien !== "")
                set_mensaje_error_codigo("");
        }
    }, [detalle_seleccionado]);

    useEffect(() => {
        set_detalle_seleccionado(detalle_programacion);
    }, [detalle_programacion]);

    useEffect(() => {
        if (accion_guardar) {
            if (id_bien === "")
                set_mensaje_error_codigo("El campo Código es obligatorio.");
        }
    }, [accion_guardar]);

    return (
        <>
            <Box
                component="form"
                sx={{ mt: '20px' }}
                noValidate
                autoComplete="off"
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Código"
                            size="small"
                            required
                            value={id_bien}
                            fullWidth
                            error={mensaje_error_codigo !== ""}
                            disabled 
                            InputLabelProps={{
                              shrink: true,
                            }}
                        />
                        {(mensaje_error_codigo !== "") && (<FormHelperText error id="tipo-error">{mensaje_error_codigo}</FormHelperText>)}
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Nombre"
                            size="small"
                            value={nombre}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                            disabled 
                            InputLabelProps={{
                              shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
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
                                    set_title(tipo_articulo);
                                }}
                            >
                                Buscar {tipo_articulo}
                            </Button>
                            {consulta_buscar_articulo_is_active && (
                                <BuscarArticuloComponent
                                    is_modal_active={consulta_buscar_articulo_is_active}
                                    set_is_modal_active={set_buscar_articulo_is_active}
                                    title={title} parent_details={set_detalle_seleccionado} />
                            )}
                        </Stack>
                    </Grid>
                </Grid>
            </Box>

        </>
    )
}