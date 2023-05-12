import { Box, Button, Grid, Stack, TextField } from "@mui/material";
import use_buscar_programacion from "../../mantenimientoGeneral/hooks/useBuscarProgramacion";
import SearchIcon from '@mui/icons-material/Search';
import BuscarProgramacionComponent from "../../mantenimientoGeneral/BuscarProgramacion";
import { useCallback, useEffect, useState } from "react";
import use_previsualizacion from "../../mantenimientoGeneral/hooks/usePrevisualizacion";
import dayjs from "dayjs";
interface IProps {
    tipo_articulo: string,
    set_prog_seleccion: any,
    parent_details: any,
    limpiar_formulario: boolean
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const BusquedaProgramacionComponent: React.FC<IProps> = ({tipo_articulo, set_prog_seleccion, parent_details, limpiar_formulario}: IProps) => {
    const [fecha_programada, set_fecha_programada] = useState<string | null>(dayjs().format("DD-MM-YYYY"));

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
    }, [set_prog_seleccion, programacion]);

    useEffect(() => {
        set_detalle_seleccionado(detalle_seleccionado);
    }, [set_detalle_seleccionado, detalle_seleccionado]);

    useEffect(() => {
        parent_details(detalle_seleccionado);
    }, [parent_details, detalle_seleccionado]);

    useEffect(() => {
        if (programacion !== undefined && programacion !== null) {
            set_fecha_programada(dayjs(programacion.fecha).format("DD-MM-YYYY"));
        }
    }, [programacion]);

    useEffect(() => {
        if (limpiar_formulario) {
            set_fecha_programada(dayjs().format("DD-MM-YYYY"));
        }
    }, [limpiar_formulario]);

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
                        <TextField
                            label="Fecha mantenimiento"
                            size="small"
                            fullWidth
                            value={fecha_programada}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Stack>
                </Grid>
            </Grid>
        </>
    )
}

