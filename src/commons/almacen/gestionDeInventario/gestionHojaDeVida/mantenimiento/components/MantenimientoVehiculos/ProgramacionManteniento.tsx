import { Button, Grid } from '@mui/material';
import { Title } from '../../../../../../../components';
import { DetallesComponent } from './DetallesComponent';
import { MantenimientoComponent } from './MantenimientoComponent';
import { FechasComponent } from './FechasComponent';
import { KilometrajeComponent } from './KilometrajeComponent';
import { PrevisualizacionComponent } from './PrevisualizacionComponent';
import { useCallback, useState } from 'react';
import { type detalle_articulo, type row } from '../../interfaces/IProps';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ProgramacionMantenientoVehiculosScreen: React.FC = () => {
    // the parentState will be set by its child slider component
    const [rows, set_rows] = useState<row[]>([]);
    const [details, set_details] = useState<detalle_articulo>({ marca: '', serial_placa: '', modelo: '', kilometraje: '' });

    // make wrapper function to give child
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const wrapperSetParentState = useCallback((val: row[]) => {
        set_rows(val);
    }, [set_rows]);

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const set_details_state = useCallback((val: detalle_articulo) => {
        set_details(val);
    }, [set_details]);

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
                    {/* DETALLES COMPONENT */}
                    <Title title="Detalles del articulo" />
                    <DetallesComponent parent_state_setter={set_details_state} />
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
                    <Title title='Articulo' />
                    <MantenimientoComponent />
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
                    <FechasComponent parent_state_setter={wrapperSetParentState} detalle_vehiculo={details} />
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
