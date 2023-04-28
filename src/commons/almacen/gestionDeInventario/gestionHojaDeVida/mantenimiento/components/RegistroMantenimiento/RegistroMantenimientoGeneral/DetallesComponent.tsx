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
    parent_type_maintenance: any,
    parent_esp_maintenance: any,
    limpiar_formulario: boolean
}
const tipo_mantenimiento = [{ value: "P", label: "Preventivo" }, { value: "C", label: "Correctivo" }];
// eslint-disable-next-line @typescript-eslint/naming-convention
export const DetallesComponent: React.FC<IProps> = ({ parent_type_maintenance, parent_esp_maintenance, limpiar_formulario }: IProps) => {
    const [dias_empleados, set_dias_empleados] = useState<string | null>("");
    const [estado, set_estado] = useState("");
    const [observaciones, set_observaciones] = useState("");

    useEffect(() => {
        parent_type_maintenance(estado);
    }, [parent_type_maintenance, estado]);

    useEffect(() => {
        parent_esp_maintenance(observaciones);
    }, [parent_esp_maintenance, observaciones]);

    useEffect(() => {
        if (limpiar_formulario) {
            set_estado("");
            set_observaciones("");
            set_dias_empleados("");
        }
    }, [limpiar_formulario]);

    const handle_change: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
        set_estado(e.target.value);
    }

    const on_change_observacion: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_observaciones(e.target.value);
    };

    return (
        <>
            <Box
                component="form"
                sx={{ mt: '20px' }}
                noValidate
                autoComplete="off"
            >
                <Grid container spacing={2}>
                    <Grid item container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Días empleados"
                                size="small"
                                required
                                fullWidth
                                value={dias_empleados}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl required size='small' fullWidth>
                                <InputLabel>Estado final</InputLabel>
                                <Select
                                    value={estado}
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
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            multiline
                            rows={4}
                            value={observaciones}
                            label="Especificaciones tecnicas"
                            helperText="Ingresar especificaciones tecnicas"
                            size="small"
                            required
                            fullWidth
                            onChange={on_change_observacion} />
                    </Grid>
                    <Grid item container spacing={2}>
                        <Grid item xs={12} sm={6} direction="column">
                            <TextField
                                label="Valor mantenimiento"
                                size="small"
                                required
                                fullWidth
                                value={dias_empleados}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid item container spacing={2}>
                        <Grid item xs={12} sm={6} direction="column">
                            <TextField
                                label="Contrato mantenimiento"
                                size="small"
                                required
                                fullWidth
                                value={dias_empleados}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid item container spacing={2}>
                        <Grid item xs={12} sm={6} direction="column">
                            <TextField
                                label="Realizado por"
                                size="small"
                                required
                                fullWidth
                                value={dias_empleados}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid item container spacing={2}>
                        <Grid item xs={12} sm={6} direction="column">
                            <TextField
                                label="Diligenciado por"
                                size="small"
                                required
                                fullWidth
                                value={dias_empleados}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
