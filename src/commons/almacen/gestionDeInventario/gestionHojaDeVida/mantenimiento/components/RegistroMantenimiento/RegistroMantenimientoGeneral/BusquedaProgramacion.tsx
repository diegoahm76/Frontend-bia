import { Box, Button, Grid, Stack, TextField } from "@mui/material";
import use_buscar_programacion from "../../mantenimientoGeneral/hooks/useBuscarProgramacion";
import SearchIcon from '@mui/icons-material/Search';
import BuscarProrgamacionComponent from "../../mantenimientoGeneral/BuscarProgramacion";
import { useCallback, useEffect, useState } from "react";
import use_previsualizacion from "../../mantenimientoGeneral/hooks/usePrevisualizacion";
import { get_cv_vehicle_service } from "../../../../hojaDeVidaVehiculo/store/thunks/cvVehiclesThunks";
import { get_cv_computer_service } from "../../../../hojaDeVidaComputo/store/thunks/cvComputoThunks";
import { get_cv_others_service } from "../../../../hojaDeVidaOtrosActivos/store/thunks/cvOtrosActivosThunks";
import { useAppDispatch } from "../../../../../../../../hooks";
interface IProps {
    tipo_articulo: string,
    set_prog_seleccion: any,
    parent_details: any
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const BusquedaProgramacionComponent: React.FC<IProps> = ({tipo_articulo, set_prog_seleccion, parent_details}: IProps) => {
  const dispatch = useAppDispatch();
    const [fecha_programada, set_fecha_programada] = useState<string | null>("");

    const {
        programacion,
        // detalle_seleccionado,
        set_programacion,
        set_detalle_seleccionado
    } = use_previsualizacion();
    const {
        title_programacion,
        buscar_programacion_is_active,
        set_title_programacion,
        set_buscar_programacion_is_active
    } = use_buscar_programacion();

    const set_prog_seleccionada = useCallback((val: any) => {
        set_programacion(val);
    }, [set_programacion]);

    const set_details_state = useCallback((val: any) => {
        set_detalle_seleccionado(val);
    }, [set_detalle_seleccionado]);

    useEffect(() => {
        set_prog_seleccion(programacion);
    }, [set_prog_seleccion, programacion]);

    useEffect(() => {
        if (programacion !== undefined && programacion !== null) {
            if(tipo_articulo ==='vehículos'){
                dispatch(get_cv_vehicle_service(programacion.articulo)).then((response: any) => {
                    parent_details(response.data);
                })
            }else if(tipo_articulo ==='computadores'){
                dispatch(get_cv_computer_service(programacion.articulo)).then((response: any) => {
                    parent_details(response.data);
                })
            }else{
                dispatch(get_cv_others_service(programacion.articulo)).then((response: any) => {
                    parent_details(response.data);
                })
            }
        }
    }, [parent_details,programacion]);

    useEffect(() => {
        if (programacion !== undefined && programacion !== null) {
            set_fecha_programada(programacion.fecha);
        }
    }, [programacion]);

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
                                <BuscarProrgamacionComponent
                                    is_modal_active={buscar_programacion_is_active}
                                    set_is_modal_active={set_buscar_programacion_is_active}
                                    title={title_programacion} 
                                    parent_details={set_prog_seleccionada} 
                                    prog_details={set_details_state} 
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

