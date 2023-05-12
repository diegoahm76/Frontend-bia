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
import SearchIcon from '@mui/icons-material/Search';
import { BuscadorPersonaDialog } from './BuscadorPersonaDialog';

interface IProps {
    limpiar_formulario: boolean,
    user_info: any,
    detalles: any,
    accion_guardar: boolean
}
const estados_mantenimiento = [{ value: "O", label: "óptimo" }, { value: "D", label: "Defectuoso" }, { value: "A", label: "Averiado" }];
// eslint-disable-next-line @typescript-eslint/naming-convention
export const DetallesComponent: React.FC<IProps> = ({ limpiar_formulario, user_info, detalles, accion_guardar }: IProps) => {
    const [dias_empleados, set_dias_empleados] = useState<string | null>("1");
    const [contrato, set_contrato] = useState<string | null>(null);
    const [valor, set_valor] = useState<string | null>(null);
    const [estado, set_estado] = useState("");
    const [observaciones, set_observaciones] = useState<string | null>("");
    const [diligenciado, set_diligenciado] = useState<string | null>("");
    const [realizado, set_realizado] = useState<string | null>("");
    const [abrir_modal_persona, set_abrir_modal_persona] = useState<boolean>(false);

    useEffect(() => {
        if (user_info !== null && user_info !== undefined) {
            set_diligenciado(user_info.nombre);
            set_realizado(user_info.nombre); // Temporal
        }
    }, [user_info]);

    useEffect(() => {
        if (limpiar_formulario) {
            set_estado("");
            set_observaciones("");
            set_dias_empleados("1");
            set_valor("");
            set_contrato("");
        }
    }, [limpiar_formulario]);

    useEffect(() => {
        if (accion_guardar) {
            if (estado !== "" && dias_empleados !== "" && realizado !== "" && diligenciado !== "") {
                detalles({
                    dias_empleados,
                    estado,
                    realizado,
                    diligenciado,
                    observaciones,
                    valor,
                    contrato
                })
            }
        }
    }, [detalles, accion_guardar]);

    const handle_change: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
        set_estado(e.target.value);
    }

    const on_change_contrato: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_contrato(e.target.value);
    };

    const on_change_valor: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_valor(e.target.value);
    };

    const on_change_dias_empleados: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_dias_empleados(e.target.value);
    };

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
                                type={'number'}
                                required
                                fullWidth
                                value={dias_empleados}
                                onChange={on_change_dias_empleados}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl required size='small' fullWidth>
                                <InputLabel>Estado final</InputLabel>
                                <Select
                                    value={estado}
                                    label="Estado final"
                                    onChange={handle_change}
                                >
                                    {estados_mantenimiento.map(({ value, label }) => (
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
                            label="Observaciones"
                            helperText="Ingresar observaciones"
                            size="small"
                            fullWidth
                            onChange={on_change_observacion} />
                    </Grid>
                    <Grid item container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Valor mantenimiento"
                                type={'number'}
                                size="small"
                                fullWidth
                                value={valor}
                                onChange={on_change_valor}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Contrato mantenimiento"
                                size="small"
                                fullWidth
                                value={contrato}
                                onChange={on_change_contrato}
                            />
                        </Grid>
                    </Grid>

                    <Grid item container spacing={2}>
                        <Grid item xs={12} sm={5}>
                            <TextField
                                label="Realizado por"
                                size="small"
                                required
                                fullWidth
                                value={realizado}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={1} sx={{ mt: '10px' }}>
                            <SearchIcon style={{ cursor: 'pointer' }} onClick={() => { set_abrir_modal_persona(true) }} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Diligenciado por"
                                size="small"
                                required
                                fullWidth
                                value={diligenciado}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            {abrir_modal_persona && (
                <BuscadorPersonaDialog
                    is_modal_active={abrir_modal_persona}
                    set_is_modal_active={set_abrir_modal_persona}
                    title={"Busqueda de persona"} />
            )}
        </>
    )
}
