import { Box, Button, Grid, Stack } from '@mui/material';
import { Title } from '../../../../../../../components';
import { useCallback } from 'react';
import { type crear_mantenimiennto } from '../../interfaces/IProps';
import { FechasComponent } from '../mantenimientoGeneral/FechasComponent';
import { PrevisualizacionComponent } from '../mantenimientoGeneral/PrevisualizacionComponent';
import { MantenimientoComponent } from '../mantenimientoGeneral/MantenimientoComponent';
import { DetallesComponent } from '../mantenimientoGeneral/DetallesComponent';
import { ArticuloComponent } from '../mantenimientoGeneral/ArticuloComponent';
import use_previsualizacion from '../mantenimientoGeneral/hooks/usePrevisualizacion';
import use_anular_mantenimiento from '../mantenimientoGeneral/hooks/useAnularMantenimiento';
import AnularMantenimientoComponent from '../mantenimientoGeneral/AnularMantenimiento';
import CleanIcon from '@mui/icons-material/CleaningServices';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { create_maintenance_service } from '../mantenimientoGeneral/thunks/maintenanceThunks';
import { useAppDispatch } from '../../../../../../../hooks';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line @typescript-eslint/naming-convention
export const ProgramacionMantenientoOtrosScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
    const {
        rows,
        detalle_seleccionado,
        tipo_mantenimiento,
        especificacion,
        user_info,
        set_rows,
        set_detalle_seleccionado,
        set_tipo_mantenimiento,
        set_especificacion,
        set_user_info
    } = use_previsualizacion();

    const {
        title,
        anular_mantenimiento_is_active,
        set_title,
        set_anular_mantenimiento_is_active
    } = use_anular_mantenimiento();

    const wrapper_set_parent_state = useCallback((val: crear_mantenimiennto[]) => {
        set_rows(val);
    }, [set_rows]);
    
    const set_details_state = useCallback((val: any) => {
        set_detalle_seleccionado(val);
    }, [set_detalle_seleccionado]);

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
        dispatch(create_maintenance_service(rows)).then((response: any) => {
            console.log('Se creo el mantenimiento: ',response)
        });
    }

    const salir_mantenimiento: () => void = () => {
        navigate('/home');
    }

    return (
        <>
            <h1>Programación mantenimiento otros activos</h1>
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
                    <Title title="Búsqueda de artículo" />
                    <ArticuloComponent tipo_articulo={"otros activos"} parent_details={set_details_state} user_info_prop={set_user_info_state}/>
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
                    <Title title="Datos del artículo" />
                    <DetallesComponent detalle_seleccionado_prop={detalle_seleccionado} tipo_articulo={"otros activos"}/>
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
                    <MantenimientoComponent parent_type_maintenance={set_type_maintenance_state} parent_esp_maintenance={set_esp_maintenance_state} />
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
                    <FechasComponent parent_state_setter={wrapper_set_parent_state} detalle_seleccionado={detalle_seleccionado} tipo_matenimiento={tipo_mantenimiento} especificacion={especificacion} user_info={user_info} />
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
                    <PrevisualizacionComponent data_grid={rows}/>
                </Grid>
            </Grid>
            <Grid item xs={12}>
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
                                set_title('Anular mantenimiento');
                            }}
                        >
                            Anular
                        </Button>
                        {anular_mantenimiento_is_active && (
                            <AnularMantenimientoComponent
                                is_modal_active={anular_mantenimiento_is_active}
                                set_is_modal_active={set_anular_mantenimiento_is_active}
                                title={title}
                                user_info={user_info} />
                        )}
                        <Button
                            color='inherit'
                            variant="contained"
                            startIcon={<CleanIcon />}
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
        </>
    )
}
