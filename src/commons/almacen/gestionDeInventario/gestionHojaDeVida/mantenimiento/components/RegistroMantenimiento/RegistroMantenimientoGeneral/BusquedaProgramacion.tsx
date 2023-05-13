import { Box, Button, Grid, Stack, TextField } from "@mui/material";
import use_buscar_programacion from "../../mantenimientoGeneral/hooks/useBuscarProgramacion";
import SearchIcon from '@mui/icons-material/Search';
import BuscarProgramacionComponent from "../../mantenimientoGeneral/BuscarProgramacion";
import { useCallback, useEffect, useState } from "react";
import use_previsualizacion from "../../mantenimientoGeneral/hooks/usePrevisualizacion";
import dayjs, { type Dayjs } from "dayjs";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers/';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
interface IProps {
    tipo_articulo: string,
    set_prog_seleccion: any,
    emit_dias_posibles: any,
    parent_details: any,
    limpiar_formulario: boolean
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const BusquedaProgramacionComponent: React.FC<IProps> = ({ tipo_articulo, set_prog_seleccion, parent_details, limpiar_formulario, emit_dias_posibles }: IProps) => {
    const [fecha_registro, set_fecha_registro] = useState<Dayjs | null>(dayjs());

    const {
        programacion,
        detalle_seleccionado,
        set_programacion,
        set_detalle_seleccionado
    } = use_previsualizacion();
    const {
        title_programacion,
        buscar_programacion_is_active,
        set_title_programacion,
        set_buscar_programacion_is_active
    } = use_buscar_programacion();

    const set_details_state = useCallback((val: any) => {
        set_detalle_seleccionado(val);
    }, [set_detalle_seleccionado]);

    const set_prog_details = useCallback((val: any) => {
        set_programacion(val);
    }, [set_programacion]);

    useEffect(() => {
        set_prog_seleccion(programacion);
    }, [set_prog_seleccion]);

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

    const handle_change_fecha_programada = (date: Dayjs | null): void => {
        set_fecha_registro(date);
    };
    
    useEffect(()=>{
        if(fecha_registro !== null)
            emit_dias_posibles(dayjs().diff(fecha_registro,'days')+1);
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
                                    prog_details={set_prog_details}
                                    parent_details={set_details_state}
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
                                    />
                                )}
                                maxDate={dayjs()}
                            />
                        </LocalizationProvider>
                    </Stack>
                </Grid>
            </Grid>
        </>
    )
}

