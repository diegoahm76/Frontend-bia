import { Box, Button, Grid, Stack } from '@mui/material';
import { Title } from '../../../../../../../components';
import { KilometrajeComponent } from './KilometrajeComponent';
import { useCallback } from 'react';
import { type crear_mantenimiennto } from '../../interfaces/IProps';
import { type IcvVehicles } from '../../../hojaDeVidaVehiculo/interfaces/CvVehiculo';
import { ArticuloComponent } from '../mantenimientoGeneral/ArticuloComponent';
import { DetallesComponent } from '../mantenimientoGeneral/DetallesComponent';
import { MantenimientoComponent } from '../mantenimientoGeneral/MantenimientoComponent';
import { FechasComponent } from '../mantenimientoGeneral/FechasComponent';
import { PrevisualizacionComponent } from '../mantenimientoGeneral/PrevisualizacionComponent';
import use_previsualizacion from '../mantenimientoGeneral/hooks/usePrevisualizacion';
import AnularMantenimientoComponent from '../mantenimientoGeneral/AnularMantenimiento';
import use_anular_mantenimiento from '../mantenimientoGeneral/hooks/useAnularMantenimiento';
import CleanIcon from '@mui/icons-material/CleaningServices';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ProgramacionMantenientoVehiculosScreen: React.FC = () => {

    const {
        rows,
        detalle_vehiculo,
        tipo_mantenimiento,
        especificacion,
        set_rows,
        set_detalle_vehiculo,
        set_tipo_mantenimiento,
        set_especificacion,
    } = use_previsualizacion();

    const {
        title,
        anular_mantenimiento_is_active,
        set_title,
        set_anular_mantenimiento_is_active
    } = use_anular_mantenimiento();

    // make wrapper function to give child
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const wrapperSetParentState = useCallback((val: crear_mantenimiennto[]) => {
        set_rows(val);
    }, [set_rows]);
    console.log(rows)
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const set_details_state = useCallback((val: IcvVehicles) => {
        set_detalle_vehiculo(val);
    }, [set_detalle_vehiculo]);

    const set_type_maintenance_state = useCallback((val: string) => {
        set_tipo_mantenimiento(val);
    }, [set_tipo_mantenimiento]);

    const set_esp_maintenance_state = useCallback((val: string) => {
        set_especificacion(val);
    }, [set_especificacion]);

    return (
        <>
            <h1>Programación mantenimiento vehículos</h1>
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
                    <Title title="Búsqueda de vehículo" />
                    <ArticuloComponent tipo_articulo={"vehículos"} />
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
                    <Title title="Datos del vehículo" />
                    <DetallesComponent parent_details_veh={set_details_state} />
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
                    <FechasComponent parent_state_setter={wrapperSetParentState} detalle_vehiculo={detalle_vehiculo} tipo_matenimiento={tipo_mantenimiento} especificacion={especificacion} />
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
                    {/* KILOMETRAJE COMPONENT */}
                    <Title title='Programar por kilometraje' />
                    <KilometrajeComponent parent_state_setter={wrapperSetParentState} detalle_vehiculo={detalle_vehiculo} tipo_matenimiento={tipo_mantenimiento} especificacion={especificacion} />
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
                    <PrevisualizacionComponent data_grid={rows} />
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
                                    title={title} />
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
                            >
                                Guardar
                            </Button>
                            <Button
                                color='inherit'
                                variant='contained'
                                startIcon={<ClearIcon />}
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
