import { Box, Button, FormHelperText, Grid, Stack, TextField } from "@mui/material";
import use_buscar_programacion from "../../mantenimientoGeneral/hooks/useBuscarProgramacion";
import SearchIcon from '@mui/icons-material/Search';
import BuscarProgramacionComponent from "../../mantenimientoGeneral/BuscarProgramacion";
import { useEffect, useState } from "react";
import use_previsualizacion from "../../mantenimientoGeneral/hooks/usePrevisualizacion";
import dayjs, { type Dayjs } from "dayjs";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers/';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
interface IProps {
    tipo_articulo: string,
    set_prog_seleccion: any,
    emit_dias_posibles: any,
    parent_details: any,
    limpiar_formulario: boolean,
    accion_guardar: boolean
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const BusquedaProgramacionComponent: React.FC<IProps> = ({ tipo_articulo, set_prog_seleccion, parent_details, limpiar_formulario, emit_dias_posibles, accion_guardar }: IProps) => {
    const [fecha_registro, set_fecha_registro] = useState<Dayjs | null>(dayjs());
    const [mensaje_error_fecha, set_mensaje_error_fecha] = useState<string>("");

    const {
        programacion,
        detalle_seleccionado,
        set_programacion,
        set_detalle_seleccionado,
    } = use_previsualizacion();
    const {
        title_programacion,
        buscar_programacion_is_active,
        set_title_programacion,
        set_buscar_programacion_is_active
    } = use_buscar_programacion();

    useEffect(() => {
        set_prog_seleccion(programacion);
    }, [set_prog_seleccion, programacion]);

    useEffect(() => {
        set_detalle_seleccionado(detalle_seleccionado);
    }, [set_detalle_seleccionado, detalle_seleccionado]);

    useEffect(() => {
        parent_details(detalle_seleccionado);
    }, [parent_details, detalle_seleccionado]);

    useEffect(() => {
        if (limpiar_formulario) {
            set_fecha_registro(dayjs());
        }
    }, [limpiar_formulario]);

    useEffect(() => {
        if (accion_guardar) {
            valida_formulario();
        }
    }, [accion_guardar]);

    const valida_formulario: () => void = () => {
        if(fecha_registro !== null)
            emit_dias_posibles({dias_posibles:(dayjs().diff(fecha_registro,'days')+1), fecha_mantenimiento: fecha_registro});
        else
            set_mensaje_error_fecha("El campo Fecha mantenimiento es obligatorio.");
    }

    const handle_change_fecha_programada = (date: Dayjs | null): void => {
        set_fecha_registro(date);
        if(date !== null)
            set_mensaje_error_fecha("");
        else
            set_mensaje_error_fecha("El campo Fecha mantenimiento es obligatorio.");
    };

    useEffect(()=>{
        valida_formulario();
    },[fecha_registro])
    return (
        <>
            <Grid container>
                <Grid item xs={9}>
                    <Box
                        component="form"
                        sx={{ mt: '20px', mb: '20px' }}
                        noValidate
                        autoComplete="off"
                    >
                        <Stack
                            direction="row"
                            justifyContent="flex-start"
                            spacing={2}
                            sx={{ mt: '20px' }}
                        >
                            <Button
                                color='primary'
                                variant='contained'
                                startIcon={<SearchIcon />}
                                onClick={() => {
                                    set_buscar_programacion_is_active(true);
                                    set_title_programacion('Buscar programación');
                                }}
                            >
                                Buscar programación
                            </Button>
                            {buscar_programacion_is_active && (
                                <BuscarProgramacionComponent
                                    is_modal_active={buscar_programacion_is_active}
                                    set_is_modal_active={set_buscar_programacion_is_active}
                                    title={title_programacion}
                                    prog_details={set_programacion}
                                    parent_details={set_detalle_seleccionado}
                                    tipo_articulo={tipo_articulo} />
                            )}
                        </Stack>
                    </Box>
                </Grid>
                <Grid item xs={3}>
                    <Stack
                        direction="row"
                        justifyContent="flex-end"
                        spacing={2}
                        sx={{ mt: '20px' }}
                    >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Fecha mantenimiento"
                                value={fecha_registro}
                                onChange={(newValue) => { handle_change_fecha_programada(newValue); }}
                                renderInput={(params) => (
                                    <TextField
                                        required
                                        fullWidth
                                        size="small"
                                        {...params}
                                        error={mensaje_error_fecha !== ""}
                                    />
                                )}
                                maxDate={dayjs()}
                            />
                        </LocalizationProvider>
                    </Stack>
                    {(mensaje_error_fecha !== "") && (<FormHelperText error id="dias-error">{mensaje_error_fecha}</FormHelperText>)}
                </Grid>
            </Grid>
        </>
    )
}

