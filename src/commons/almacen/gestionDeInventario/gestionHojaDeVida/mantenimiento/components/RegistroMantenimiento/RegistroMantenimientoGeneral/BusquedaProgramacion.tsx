import { Box, Button, Grid, Stack, TextField } from "@mui/material";
import use_buscar_programacion from "../../mantenimientoGeneral/hooks/useBuscarProgramacion";
import SearchIcon from '@mui/icons-material/Search';
import BuscarProrgamacionComponent from "../../mantenimientoGeneral/BuscarProgramacion";
import { useCallback, useEffect } from "react";
import use_previsualizacion from "../../mantenimientoGeneral/hooks/usePrevisualizacion";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const BusquedaProgramacionComponent: React.FC = () => {

    const {
        detalle_seleccionado,
        set_detalle_seleccionado,
    } = use_previsualizacion();
    const {
        title_programacion,
        buscar_programacion_is_active,
        set_title_programacion,
        set_buscar_programacion_is_active
    } = use_buscar_programacion();


    const set_details_state = useCallback((val: any) => {
        set_detalle_seleccionado(val);
        console.log(detalle_seleccionado);
    }, [set_detalle_seleccionado]);


    useEffect(() => {
        if (detalle_seleccionado !== undefined && detalle_seleccionado !== null) {
            console.log('if');
        }
    }, [detalle_seleccionado]);

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
                                    title={title_programacion} parent_details={set_details_state} />
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
                            value={"07/04/2023"}
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

