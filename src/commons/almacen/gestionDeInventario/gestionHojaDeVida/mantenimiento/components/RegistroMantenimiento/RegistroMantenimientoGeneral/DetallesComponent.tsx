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
import SearchIcon from '@mui/icons-material/Search';
import { BuscadorPersonaDialog } from './BuscadorPersonaDialog';

interface IProps {
    limpiar_formulario: boolean,
    user_info: any,
    detalles: any,
    fecha_dias: any,
    accion_guardar: boolean
}
const estados_mantenimiento = [{ value: "O", label: "óptimo" }, { value: "D", label: "Defectuoso" }, { value: "A", label: "Averiado" }];
// eslint-disable-next-line @typescript-eslint/naming-convention
export const DetallesComponent: React.FC<IProps> = ({ limpiar_formulario, user_info, detalles, accion_guardar, fecha_dias }: IProps) => {
    const [dias_empleados, set_dias_empleados] = useState<string>("1");
    const [contrato, set_contrato] = useState<string | null>(null);
    const [valor, set_valor] = useState<string | null>(null);
    const [estado, set_estado] = useState("");
    const [observaciones, set_observaciones] = useState<string | null>("");
    const [diligenciado, set_diligenciado] = useState<string | null>("");
    const [realizado, set_realizado] = useState<any | null>({ nombre_completo: "" });
    const [abrir_modal_persona, set_abrir_modal_persona] = useState<boolean>(false);
    // Errors
    const [mensaje_error_dias, set_mensaje_error_dias] = useState<string>("");
    const [mensaje_error_estado, set_mensaje_error_estado] = useState<string>("");
    const [mensaje_error_realizado, set_mensaje_error_realizado] = useState<string>("");
    const [mensaje_error_diligenciado, set_mensaje_error_diligenciado] = useState<string>("");

    const env_cambios: () => void = () => {
        if (estado !== "" && dias_empleados !== null && realizado !== "" && diligenciado !== "") {
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

        useEffect(() => {
            if (user_info !== null && user_info !== undefined) {
                set_diligenciado(user_info.nombre);
            }
        }, [user_info]);

        useEffect(() => {
            if (limpiar_formulario) {
                set_estado("");
                set_observaciones("");
                set_dias_empleados("1");
                set_valor("");
                set_contrato("");
                set_realizado({ nombre_completo: "" });
                set_mensaje_error_dias("");
                set_mensaje_error_estado("");
                set_mensaje_error_realizado("");
                set_mensaje_error_diligenciado("");
            }
        }, [limpiar_formulario]);

        useEffect(() => {
            if (accion_guardar && valida_formulario()) {
                env_cambios();
            }
        }, [accion_guardar]);

        const valida_formulario: () => boolean = () => {
            if (dias_empleados === "")
                set_mensaje_error_dias("El campo Días empleados es obligatorio.");
            if (parseInt(dias_empleados) > 1)
                set_mensaje_error_dias("El campo Días empleados es mayor a los dias disponibles.");
            if (estado === "")
                set_mensaje_error_estado("El campo Estado final es obligatorio.");
            if (realizado.nombre_completo === "")
                set_mensaje_error_realizado("El campo Realizado por es obligatorio.");
            if (diligenciado === "")
                set_mensaje_error_diligenciado("El campo Diligenciado por es obligatorio.");

            return (mensaje_error_dias === "" && mensaje_error_estado === "" && mensaje_error_realizado === "" && mensaje_error_diligenciado === "")
        }

        const handle_change: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
            set_estado(e.target.value);
            if (e.target.value !== null && e.target.value !== ""){
                set_mensaje_error_estado("");
                env_cambios();
            }
        }

        const on_change_contrato: any = (e: React.ChangeEvent<HTMLInputElement>) => {
            set_contrato(e.target.value);
            env_cambios();
        };

        const on_change_valor: any = (e: React.ChangeEvent<HTMLInputElement>) => {
            set_valor(e.target.value);
            env_cambios();
        };

        const on_change_dias_empleados: any = (e: React.ChangeEvent<HTMLInputElement>) => {
            set_dias_empleados(e.target.value);
            if (e.target.value !== null && e.target.value !== "") {
                set_mensaje_error_dias("");
                validar_dias_empleados(parseInt(e.target.value));
                env_cambios();
            }
        };

        function validar_dias_empleados(dias_empleados: number): void {
            //TODO: Comentado el 30MAY, revisar
            // if (dias_empleados > fecha_dias.dias_posibles)
            //     set_mensaje_error_dias("Los dias empleados superan los dias disponibles.");
            // else
            //     set_mensaje_error_dias("");
        }

        useEffect(() => {
            validar_dias_empleados(parseInt(dias_empleados));
        }, [fecha_dias])

        useEffect(() => {
            if (realizado.nombre_completo !== ""){
                set_mensaje_error_realizado("");
                env_cambios();
            }
        }, [realizado])

        const on_change_observacion: any = (e: React.ChangeEvent<HTMLInputElement>) => {
            set_observaciones(e.target.value);
            env_cambios();
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
                                    error={mensaje_error_dias !== ""}
                                />
                                {(mensaje_error_dias !== "") && (<FormHelperText error id="dias-error">{mensaje_error_dias}</FormHelperText>)}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl required size='small' fullWidth>
                                    <InputLabel>Estado final</InputLabel>
                                    <Select
                                        value={estado}
                                        label="Estado final"
                                        onChange={handle_change}
                                        error={mensaje_error_estado !== ""}
                                    >
                                        {estados_mantenimiento.map(({ value, label }) => (
                                            <MenuItem key={value} value={value}>
                                                {label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                {(mensaje_error_estado !== "") && (<FormHelperText error id="estado-error">{mensaje_error_estado}</FormHelperText>)}
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
                                    disabled
                                    fullWidth
                                    value={realizado.nombre_completo}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    error={mensaje_error_realizado !== ""}
                                />
                                {(mensaje_error_realizado !== "") && (<FormHelperText error id="realizado-error">{mensaje_error_realizado}</FormHelperText>)}
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
                                    error={mensaje_error_diligenciado !== ""}
                                />
                                {(mensaje_error_diligenciado !== "") && (<FormHelperText error id="diligenciado-error">{mensaje_error_diligenciado}</FormHelperText>)}
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
                {abrir_modal_persona && (
                    <BuscadorPersonaDialog
                        is_modal_active={abrir_modal_persona}
                        set_is_modal_active={set_abrir_modal_persona}
                        title={"Busqueda de persona"}
                        set_persona={set_realizado} />
                )}
            </>
        )
    }
