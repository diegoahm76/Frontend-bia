import { Button, Grid } from '@mui/material';
import { Title } from '../../../../../../../components';
import { ArticuloComponent } from './ArticuloComponent';
import { DetallesComponent } from './DetallesComponent';
import { MantenimientoComponent } from './MantenimientoComponent';
import { FechasComponent } from './FechasComponent';
import { KilometrajeComponent } from './KilometrajeComponent';
import { PrevisualizacionComponent } from './PrevisualizacionComponent';
import { useCallback } from 'react';
import { type crear_mantenimiennto } from '../../interfaces/IProps';
import use_previsualizacion from './hooks/usePrevisualizacion';
import { type IcvVehicles } from '../../../hojaDeVidaVehiculo/interfaces/CvVehiculo';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ProgramacionMantenientoVehiculosScreen: React.FC = () => {
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
            <h1>Programación Mantenimiento VEHÍCULOS</h1>
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
                    <ArticuloComponent />
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
                    {/* KILOMETRAJE COMPONENT */}
                    <Title title='Programar por kilometraje' />
                    <KilometrajeComponent />
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
                    >
                        Anular
                    </Button>
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
