// Importamos componentes de libreria mui
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';

// Importamos componentes propios
import { Title } from '../../../../../../components/Title';
import { ArticuloComponent } from '../components/ArticuloComponent';
import { DetallesComponent } from '../components/DetallesComponent';
import { MantenimientoComponent } from '../components/MantenimientoComponent';
import { FechasComponent } from '../components/FechasComponent';
import { KilometrajeComponent } from '../components/KilometrajeComponent';
import { PrevisualizacionComponent } from '../components/PrevisualizacionComponent';


const style_sx =
{
    position: 'relative',
    background: '#FAFAFA',
    borderRadius: '15px',
    p: '20px',
    mb: '20px',
    boxShadow: '0px 3px 6px #042F4A26',
}


export function ProgramacionMantenientoScreen(): JSX.Element {

    return (

        <Box sx={{ flexGrow: 1 }}>
            <h1>Programación Mantenimiento</h1>

            <Grid
                container
                sx={style_sx}
            >
                <Grid item xs={12}>
                    {/* ARTICULO COMPONENT */}
                    <Title title="Articulo" />
                    <ArticuloComponent />
                </Grid>

            </Grid>

            <Grid
                container
                sx={style_sx}
            >
                <Grid item xs={12}>
                    {/* DETALLES COMPONENT */}
                    <Title title="Detalles del articulo" />
                    <DetallesComponent />
                </Grid>
            </Grid>

            <Grid
                container
                sx={style_sx}
            >
                <Grid item xs={12}>
                    {/* MANTENIMIENTO COMPONENT */}
                    <Title title='Articulo' />
                    <MantenimientoComponent />
                </Grid>
            </Grid>

            <Grid
                container
                sx={style_sx}
            >
                <Grid item xs={12}>
                    {/* FECHAS COMPONENT */}
                    <Title title='Programar por fechas' />
                    <FechasComponent />
                </Grid>
            </Grid>

            <Grid
                container
                sx={style_sx}
            >
                <Grid item xs={12}>
                    {/* KILOMETRAJE COMPONENT */}
                    <Title title='Programar por kilometraje' />
                    <KilometrajeComponent />
                </Grid>
            </Grid>

            <Grid
                container
                sx={style_sx}
            >
                <Grid item xs={12}>
                    {/* PREVISUALIZACION COMPONENT */}
                    <Title title='Previsualización' />
                    <PrevisualizacionComponent />
                </Grid>
            </Grid>

        </Box>
    )
}

