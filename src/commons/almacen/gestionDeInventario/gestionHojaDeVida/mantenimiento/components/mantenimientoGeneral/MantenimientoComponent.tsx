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
    limpiar_formulario: boolean,
    clean_form?: boolean,
    programacion: any
}
const tipo_mantenimiento = [{ value: "P", label: "Preventivo" }, { value: "C", label: "Correctivo" }];

// eslint-disable-next-line @typescript-eslint/naming-convention
export const MantenimientoComponent: React.FC<IProps> = ({ parent_type_maintenance, parent_esp_maintenance, limpiar_formulario, clean_form, programacion }: IProps) => {

    const [tipo, set_tipo] = useState("");
    const [especificacion, set_especificacion] = useState("");

    useEffect(() => {
        parent_type_maintenance(tipo);
    }, [parent_type_maintenance, tipo]);

    // useEffect(() => {
    //     if(programacion?.id_programacion_mantenimiento){
    //         console.log(programacion);
    //         set_tipo(programacion?.tipo);
    //         // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    //         set_especificacion( programacion?.motivo);
    //     }
    // }, [programacion]);

    useEffect(() => {
        parent_esp_maintenance(especificacion);
    }, [parent_esp_maintenance, especificacion]);

    useEffect(() => {
        if (limpiar_formulario || clean_form) {
            set_tipo("");
            set_especificacion("");
        }
    }, [limpiar_formulario, clean_form]);

    const handle_change: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
        set_tipo(e.target.value);
    }

    const on_change_especificacion: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_especificacion(e.target.value);
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
                                // disabled={programacion?.id_programacion_mantenimiento}
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
                            value={especificacion}
                            label="Especificaciones tecnicas"
                            helperText="Ingresar especificaciones tecnicas"
                            size="small"
                            required
                            // disabled={programacion?.id_programacion_mantenimiento}
                            fullWidth
                            onChange={on_change_especificacion} />
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
