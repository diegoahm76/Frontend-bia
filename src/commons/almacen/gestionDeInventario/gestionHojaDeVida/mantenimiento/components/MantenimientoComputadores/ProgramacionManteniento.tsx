import { Box, Button, Grid, Stack } from '@mui/material';
import { Title } from '../../../../../../../components';
import { useCallback, useEffect, useState } from 'react';
import { type crear_mantenimiento } from '../../interfaces/IProps';
import { type IcvVehicles } from '../../../hojaDeVidaVehiculo/interfaces/CvVehiculo';
import { FechasComponent } from '../mantenimientoGeneral/FechasComponent';
import { PrevisualizacionComponent } from '../mantenimientoGeneral/PrevisualizacionComponent';
import { MantenimientoComponent } from '../mantenimientoGeneral/MantenimientoComponent';
import { DetallesComponent } from '../mantenimientoGeneral/DetallesComponent';
import { ArticuloComponent } from '../mantenimientoGeneral/ArticuloComponent';
import use_previsualizacion from '../mantenimientoGeneral/hooks/usePrevisualizacion';
import AnularMantenimientoComponent from '../mantenimientoGeneral/AnularMantenimiento';
import use_anular_mantenimiento from '../mantenimientoGeneral/hooks/useAnularMantenimiento';
import CleanIcon from '@mui/icons-material/CleaningServices';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useAppDispatch } from '../../../../../../../hooks';
import { useNavigate } from 'react-router-dom';
import { create_maintenance_service } from '../mantenimientoGeneral/thunks/maintenanceThunks';
import BuscarProgramacionComponent from '../mantenimientoGeneral/BuscarProgramacion';
import use_buscar_programacion from '../mantenimientoGeneral/hooks/useBuscarProgramacion';
import SearchIcon from '@mui/icons-material/Search';
// eslint-disable-next-line @typescript-eslint/naming-convention
export const ProgramacionMantenientoComputadoresScreen: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [limpiar_formulario, set_limpiar_formulario] = useState<boolean>(false);
    // const [id_programado, set_id_programado] = useState<string | null>(null);

    const {
        rows,
        detalle_seleccionado,
        tipo_mantenimiento,
        especificacion,
        user_info,
        programacion,
        set_rows,
        set_detalle_seleccionado,
        set_tipo_mantenimiento,
        set_especificacion,
        set_user_info,
        set_programacion
    } = use_previsualizacion();

    const {
        title,
        anular_mantenimiento_is_active,
        set_title,
        set_anular_mantenimiento_is_active
    } = use_anular_mantenimiento();

    const {
        title_programacion,
        buscar_programacion_is_active,
        set_title_programacion,
        set_buscar_programacion_is_active
    } = use_buscar_programacion();

    const wrapper_set_parent_state = useCallback((val: crear_mantenimiento[]) => {
        set_rows(val);
    }, [set_rows]);

    const set_details_state = useCallback((val: IcvVehicles) => {
        set_detalle_seleccionado(val);
    }, [set_detalle_seleccionado]);

    const set_prog_details = useCallback((val: any) => {
        set_programacion(val);
    }, [set_programacion]);

    const set_type_maintenance_state = useCallback((val: string) => {
        set_tipo_mantenimiento(val);
    }, [set_tipo_mantenimiento]);

    const set_esp_maintenance_state = useCallback((val: string) => {
        set_especificacion(val);
    }, [set_especificacion]);

    const set_user_info_state = useCallback((val: string) => {
        set_user_info(val);
    }, [set_user_info]);

    const crear_mantenimiento: () => void = () => {
        dispatch(create_maintenance_service(rows)).then(() => {
            limpiar();
        });
    }

    const salir_mantenimiento: () => void = () => {
        navigate('/home');
    }

    const limpiar: () => void = () => {
        set_limpiar_formulario(true);
    }

    useEffect(() => {
        setTimeout(() => {
            set_limpiar_formulario(false);
        }, 1000);
    }, [limpiar_formulario])

    return (
        <>
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
                    {/* ARTICULO COMPONENT */}
                    <Title title="Programación mantenimiento computadores" />
                    <ArticuloComponent detalle_seleccionado_prop={detalle_seleccionado} tipo_articulo={"computadores"} parent_details={set_details_state} user_info_prop={set_user_info_state} limpiar_formulario={limpiar_formulario} />
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
                    {/* DETALLES COMPONENT */}
                    <Title title="Datos del computador" />
                    <DetallesComponent detalle_seleccionado_prop={detalle_seleccionado} tipo_articulo={"computadores"} limpiar_formulario={limpiar_formulario} />
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
                    {/* MANTENIMIENTO COMPONENT */}
                    <Title title='Detalles' />
                    <MantenimientoComponent programacion={programacion} parent_type_maintenance={set_type_maintenance_state} parent_esp_maintenance={set_esp_maintenance_state} limpiar_formulario={limpiar_formulario} />
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
                    {/* FECHAS COMPONENT */}
                    <Title title='Programar por fechas' />
                    <FechasComponent programacion={programacion} parent_state_setter={wrapper_set_parent_state} detalle_seleccionado={detalle_seleccionado} tipo_matenimiento={tipo_mantenimiento} especificacion={especificacion} user_info={user_info} limpiar_formulario={limpiar_formulario} />
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
                    {/* PREVISUALIZACION COMPONENT */}
                    <Title title='Previsualización' />
                    <PrevisualizacionComponent data_grid={rows} limpiar_formulario={limpiar_formulario} />
                    <Grid container>
                        <Grid item xs={6}>
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
                                            set_title_programacion('Buscar programación de computadores');
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
                                            tipo_articulo={"computadores"} />
                                    )}
                                </Stack>
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
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
                                        color='error'
                                        variant='contained'
                                        startIcon={<DeleteForeverIcon />}
                                        onClick={() => {
                                            set_anular_mantenimiento_is_active(true);
                                            set_title('Anular mantenimiento de computadores');
                                        }}
                                        disabled={programacion == null}
                                    >
                                        Anular
                                    </Button>
                                    {anular_mantenimiento_is_active && (
                                        <AnularMantenimientoComponent
                                            is_modal_active={anular_mantenimiento_is_active}
                                            set_is_modal_active={set_anular_mantenimiento_is_active}
                                            title={title}
                                            user_info={user_info}
                                            id_programado={programacion.id_programacion_mantenimiento} />
                                    )}
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
                </Grid>
            </Grid>

        </>
    )
}
