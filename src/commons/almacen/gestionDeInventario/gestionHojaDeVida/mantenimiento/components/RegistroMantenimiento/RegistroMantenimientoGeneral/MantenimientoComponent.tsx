import { useEffect, useState } from 'react';
import {
    Box,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    type SelectChangeEvent,
    TextField,
    FormHelperText
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
    const [tipo, set_tipo] = useState<string>("");
    const [motivo, set_motivo] = useState<string>("");
    const [acciones, set_acciones] = useState<string>("");
    // Errors
    const [mensaje_error_tipo, set_mensaje_error_tipo] = useState<string>("");
    const [mensaje_error_acciones, set_mensaje_error_acciones] = useState<string>("");

    const env_cambios: () => void = () => {
        if (tipo !== "" && acciones !== "") {
            mantenimiento({
                tipo,
                acciones
            })
        }
    }
    useEffect(() => {
        if (limpiar_formulario) {
            set_tipo("");
            set_acciones("");
            set_mensaje_error_tipo("");
            set_mensaje_error_acciones("");
        }
    }, [limpiar_formulario]);

    useEffect(() => {
        if (accion_guardar && valida_formulario()) {
            env_cambios();
        }
    }, [mantenimiento, accion_guardar]);

    const valida_formulario: () => boolean = () => {
        if (tipo === "")
            set_mensaje_error_tipo("El campo Tipo de mantenimiento es obligatorio.");
        if (acciones === "")
            set_mensaje_error_acciones("El campo Acciones realizadas es obligatorio.");

            return (mensaje_error_tipo === "" && mensaje_error_acciones === "")
    }

    useEffect(() => {
        if (programacion !== undefined && programacion !== null) {
            set_tipo(programacion.tipo);
            set_motivo(programacion?.motivo);
            set_mensaje_error_tipo("");
        }
    }, [programacion]);

    const handle_change: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
        set_tipo(e.target.value);
        if (e.target.value !== null && e.target.value !== "") {
            set_mensaje_error_tipo("");
            env_cambios();
        }
    }

    const on_change_acciones: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_acciones(e.target.value);
        if (e.target.value !== null && e.target.value !== "") {
            set_mensaje_error_acciones("");
            env_cambios();
        }
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
                                disabled
                                onChange={handle_change}
                                error={mensaje_error_tipo !== ""}
                            >
                                {tipo_mantenimiento.map(({ value, label }) => (
                                    <MenuItem key={value} value={value}>
                                        {label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {(mensaje_error_tipo !== "") && (<FormHelperText error id="tipo-error">{mensaje_error_tipo}</FormHelperText>)}
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            multiline
                            value={motivo}
                            label="Motivo"
                            size="small"
                            disabled
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            multiline
                            rows={4}
                            value={acciones}
                            label="Acciones realizadas"
                            size="small"
                            required
                            fullWidth
                            onChange={on_change_acciones}
                            error={mensaje_error_acciones !== ""}
                        />
                        {(mensaje_error_acciones !== "") && (<FormHelperText error id="acciones-error">{mensaje_error_acciones}</FormHelperText>)}
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
