import { Button, Grid } from '@mui/material';
import { Title } from '../../../../../../../components';
import { useCallback } from 'react';
import { type crear_mantenimiennto } from '../../interfaces/IProps';
import { type IcvVehicles } from '../../../hojaDeVidaVehiculo/interfaces/CvVehiculo';
import { FechasComponent } from '../mantenimientoGeneral/FechasComponent';
import { PrevisualizacionComponent } from '../mantenimientoGeneral/PrevisualizacionComponent';
import { MantenimientoComponent } from '../mantenimientoGeneral/MantenimientoComponent';
import { DetallesComponent } from '../mantenimientoGeneral/DetallesComponent';
import { ArticuloComponent } from '../mantenimientoGeneral/ArticuloComponent';
import use_previsualizacion from '../mantenimientoGeneral/hooks/usePrevisualizacion';
import use_anular_mantenimiento from '../mantenimientoGeneral/hooks/useAnularMantenimiento';
import AnularMantenimientoComponent from '../mantenimientoGeneral/AnularMantenimiento';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ProgramacionMantenientoOtrosScreen: React.FC = () => {
    // the parentState will be set by its child slider component
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
                    <ArticuloComponent tipo_articulo={"otros activos"}/>
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
                    <MantenimientoComponent parent_type_maintenance = {set_type_maintenance_state} parent_esp_maintenance = {set_esp_maintenance_state}/>
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
                    <FechasComponent parent_state_setter={wrapperSetParentState} detalle_vehiculo={detalle_vehiculo} tipo_matenimiento = {tipo_mantenimiento} especificacion = {especificacion} />
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
                 <Grid item xs={7}></Grid>
                <Grid item xs={1} textAlign="end">
                    <Button
                        color='primary'
                        variant='contained'
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
                </Grid>
                <Grid item xs={1} textAlign="center">
                    <Button
                        color='primary'
                        variant='contained'
                    >
                        Limpiar
                    </Button>
                </Grid>
                <Grid item xs={1} textAlign="center">
                    <Button
                        color='primary'
                        variant='contained'
                    >
                        Guardar
                    </Button>
                </Grid>
                <Grid item xs={1} textAlign="center">
                    <Button
                        color='primary'
                        variant='contained'
                    >
                        Salir
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}
