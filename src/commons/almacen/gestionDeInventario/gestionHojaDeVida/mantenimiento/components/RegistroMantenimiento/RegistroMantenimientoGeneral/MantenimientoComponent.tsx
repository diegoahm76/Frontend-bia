import { useEffect, useState } from 'react';
import {
    Box,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    type SelectChangeEvent,
    TextField
} from "@mui/material"

interface IProps {
    limpiar_formulario: boolean,
    programacion: any,
    mantenimiento: any,
    accion_guardar: boolean
}
const tipo_mantenimiento = [{ value: "P", label: "Preventivo" }, { value: "C", label: "Correctivo" }];

// eslint-disable-next-line @typescript-eslint/naming-convention
export const MantenimientoComponent: React.FC<IProps> = ({ limpiar_formulario, programacion, mantenimiento, accion_guardar }: IProps) => {

    const [tipo, set_tipo] = useState("");
    const [acciones, set_acciones] = useState("");

    useEffect(() => {
        if (limpiar_formulario) {
            set_tipo("");
            set_acciones("");
        }
    }, [limpiar_formulario]);

    useEffect(() => {
        if (accion_guardar) {
            if (tipo !== "") {
                mantenimiento({
                    tipo,
                    acciones
                })
            }
        }
    }, [mantenimiento, accion_guardar]);

    useEffect(() => {
        if (programacion !== null && programacion !== undefined) {
            set_tipo(programacion.tipo);
        }
    }, [programacion]);

    const handle_change: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
        set_tipo(e.target.value);
    }

    const on_change_acciones: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_acciones(e.target.value);
    };

    return (
        <>
            <Box
                component="form"
                sx={{ mt: '20px' }}
                noValidate
                autoComplete="off"
            >
                <Grid container spacing={2} direction='column'>
                    <Grid item xs={12} sm={4}>
                        <FormControl required size='small' fullWidth>
                            <InputLabel>Tipo de mantenimiento</InputLabel>
                            <Select
                                value={tipo}
                                label="Tipo de mantenimiento"
                                onChange={handle_change}
                            >
                                {tipo_mantenimiento.map(({ value, label }) => (
                                    <MenuItem key={value} value={value}>
                                        {label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            multiline
                            rows={4}
                            value={acciones}
                            label="Acciones realizadas"
                            helperText="Ingresar acciones realizadas"
                            size="small"
                            required
                            fullWidth
                            onChange={on_change_acciones} />
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
