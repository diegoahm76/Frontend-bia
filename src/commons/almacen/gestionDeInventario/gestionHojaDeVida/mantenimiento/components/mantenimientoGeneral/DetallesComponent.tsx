import {
    Box,
    Grid,
    TextField
} from "@mui/material"
import { useEffect, useState } from "react";
interface IProps {
    detalle_seleccionado_prop: any,
    tipo_articulo: string
}
// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
export const DetallesComponent: React.FC<IProps> = ({ detalle_seleccionado_prop, tipo_articulo}: IProps) => {
    const [marca, set_marca] = useState<string | null>("");
    const [codigo_bien, set_codigo_bien] = useState<string | null>("");
    const [descripcion, set_descripcion] = useState<string | null>("");
    const [porcentaje_iva, set_porcentaje_iva] = useState<string | null>("");
    const [tipo_columna, set_tipo_columna] = useState<string>("");

    useEffect(() => {
        if(detalle_seleccionado_prop !== undefined && detalle_seleccionado_prop !== null){
            set_marca(detalle_seleccionado_prop.marca);
            set_codigo_bien(detalle_seleccionado_prop.codigo_bien);
            set_descripcion(detalle_seleccionado_prop.descripcion);
            set_porcentaje_iva(detalle_seleccionado_prop.porcentaje_iva);
        }
    },[detalle_seleccionado_prop]);

    useEffect(()=>{
        tipo_articulo === 'vehículos' ? set_tipo_columna("Placa") : set_tipo_columna("Serial")
        console.log(tipo_columna)
    },[tipo_articulo]);

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
                            fullWidth
                            value={codigo_bien}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            label="Modelo"
                            size="small"
                            required
                            fullWidth
                            value={descripcion}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            label="Kilometraje"
                            helperText="Seleccione Kilometraje"
                            size="small"
                            required
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
