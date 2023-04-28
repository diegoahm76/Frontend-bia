import { Box, Button, Grid, Stack } from "@mui/material";
import { useCallback, useState } from "react";
import use_previsualizacion from "../mantenimientoGeneral/hooks/usePrevisualizacion";
import { BusquedaProgramacionComponent } from "./RegistroMantenimientoGeneral/BusquedaProgramacion";
import { Title } from "../../../../../../../components";
import { BusquedaArticuloComponent } from "./RegistroMantenimientoGeneral/BusquedaArticulo";
import { MantenimientoComponent } from "./RegistroMantenimientoGeneral/MantenimientoComponent";
import { DetallesComponent } from "./RegistroMantenimientoGeneral/DetallesComponent";
import CleanIcon from '@mui/icons-material/CleaningServices';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line @typescript-eslint/naming-convention
export const RegistroMantenimientoComComponent: React.FC = () => {
    const navigate = useNavigate();
    const [limpiar_formulario, set_limpiar_formulario] = useState<boolean>(false);
    const {
        detalle_seleccionado,
        set_detalle_seleccionado,
        set_tipo_mantenimiento,
        set_user_info,
        set_especificacion
    } = use_previsualizacion();

    const set_details_state = useCallback((val: any) => {
        set_detalle_seleccionado(val);
        console.log(detalle_seleccionado);
    }, [set_detalle_seleccionado]);

    const set_user_info_state = useCallback((val: string) => {
        set_user_info(val);
    }, [set_user_info]);

    const set_type_maintenance_state = useCallback((val: string) => {
        set_tipo_mantenimiento(val);
    }, [set_tipo_mantenimiento]);

    const set_esp_maintenance_state = useCallback((val: string) => {
        set_especificacion(val);
    }, [set_especificacion]);

    const crear_mantenimiento: () => void = () => {
        limpiar();
    }

    const salir_mantenimiento: () => void = () => {
        navigate('/home');
    }

    const limpiar: () => void = () => {
        set_limpiar_formulario(true);
    }
    return (
        <>
            <h1>Registro mantenimiento de computadores</h1>
            <Grid
                container
                sx={{
                    position: 'relative',
                    background: '#FAFAFA',
                    borderRadius: '15px',
                    p: '20px',
                    mb: '20px',
                    boxShadow: '0px 3px 6px #042F4A26',
                }}
            >
                <Grid item xs={12}>
                    <Title title="Búsqueda de programación" />
                    <BusquedaProgramacionComponent />
                </Grid>
            </Grid>
            <Grid
                container
                sx={{
                    position: 'relative',
                    background: '#FAFAFA',
                    borderRadius: '15px',
                    p: '20px',
                    mb: '20px',
                    boxShadow: '0px 3px 6px #042F4A26',
                }}
            >
                <Grid item xs={12}>
                    <Title title="Búsqueda de computadores" />
                    <BusquedaArticuloComponent tipo_articulo={"computadores"} parent_details={set_details_state} user_info_prop={set_user_info_state} limpiar_formulario={limpiar_formulario} />
                </Grid>
            </Grid>
            <Grid container
                sx={{
                    position: 'relative',
                    background: '#FAFAFA',
                    borderRadius: '15px',
                    p: '20px',
                    mb: '20px',
                    boxShadow: '0px 3px 6px #042F4A26',
                }}>
                <Grid item xs={12}>
                    <Title title='Mantenimiento'/>
                    <MantenimientoComponent parent_type_maintenance={set_type_maintenance_state} parent_esp_maintenance={set_esp_maintenance_state} limpiar_formulario={limpiar_formulario} />
                </Grid>
            </Grid>
            <Grid container
                sx={{
                    position: 'relative',
                    background: '#FAFAFA',
                    borderRadius: '15px',
                    p: '20px',
                    mb: '20px',
                    boxShadow: '0px 3px 6px #042F4A26',
                }}>
                <Grid item xs={12}>
                    <Title title='Detalles'/>
                    <DetallesComponent parent_type_maintenance={set_type_maintenance_state} parent_esp_maintenance={set_esp_maintenance_state} limpiar_formulario={limpiar_formulario} />
                </Grid>
            </Grid>
            <Grid container>
                <Grid item md={12} xs={12}>
                    <Box
                        component="form"
                        sx={{ mt: '20px', mb: '20px' }}
                        noValidate
                        autoComplete="off"
                    >
                        <Stack
                            direction="row"
                            justifyContent="flex-end"
                            spacing={2}
                            sx={{ mt: '20px' }}
                        >
                            <Button
                                color='inherit'
                                variant="contained"
                                startIcon={<CleanIcon />}
                                onClick={limpiar}
                            >
                                Limpiar
                            </Button>
                            <Button
                                color='primary'
                                variant='contained'
                                startIcon={<SaveIcon />}
                                onClick={crear_mantenimiento}
                            >
                                Guardar
                            </Button>
                            <Button
                                color='inherit'
                                variant='contained'
                                startIcon={<ClearIcon />}
                                onClick={salir_mantenimiento}
                            >
                                Salir
                            </Button>
                        </Stack>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

