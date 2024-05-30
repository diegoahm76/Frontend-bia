import {
    Box,
    Grid,
    TextField
} from "@mui/material"
import { useEffect, useState } from "react";
interface IProps {
    detalle_seleccionado_prop: any,
    tipo_articulo: string,
    limpiar_formulario: boolean
}
// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
export const DetallesComponent: React.FC<IProps> = ({ detalle_seleccionado_prop, tipo_articulo, limpiar_formulario }: IProps) => {
    const [marca, set_marca] = useState<string | null>("");
    const [codigo_bien, set_codigo_bien] = useState<string | null>("");
    const [descripcion, set_descripcion] = useState<string | null>("");
    const [porcentaje_iva, set_porcentaje_iva] = useState<string | null>("");
    const [tipo_columna, set_tipo_columna] = useState<string>("");

    useEffect(() => {
        if (detalle_seleccionado_prop !== undefined && detalle_seleccionado_prop !== null) {
            set_marca(detalle_seleccionado_prop.marca ?? 'Sin Marca');
            set_codigo_bien(detalle_seleccionado_prop.doc_identificador_nro?.toUpperCase() ?? 'Sin Placa');
            set_descripcion(detalle_seleccionado_prop.descripcion ?? 'N/A');
            set_porcentaje_iva(detalle_seleccionado_prop.estado ?? 'Sin Estado');
        }
    }, [detalle_seleccionado_prop]);

    useEffect(() => {
        tipo_articulo === 'vehículos' ? set_tipo_columna("Placa") : set_tipo_columna("Serial")
    }, [tipo_articulo]);

    useEffect(() => {
        if (limpiar_formulario) {
            set_marca('');
            set_codigo_bien('');
            set_descripcion('');
            set_porcentaje_iva('');
        }
    }, [limpiar_formulario]);

    return (
        <>
            <Box
                component="form"
                sx={{ mt: '20px' }}
                noValidate
                autoComplete="off"
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            label="Marca"
                            size="small"
                            required
                            disabled
                            fullWidth
                            value={marca}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            label={tipo_columna}
                            size="small"
                            required
                            disabled
                            fullWidth
                            value={codigo_bien}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            label="Descripción"
                            size="small"
                            required
                            disabled
                            fullWidth
                            value={descripcion}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            label="Estado"
                            size="small"
                            required
                            disabled
                            fullWidth
                            value={porcentaje_iva}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
