import { Grid } from '@mui/material';
import { Title } from '../../../../../components';
import { ArticuloComponent } from './components/ArticuloComponent';
import { DetallesComponent } from './components/DetallesComponent';
import { MantenimientoComponent } from './components/MantenimientoComponent';
import { FechasComponent } from './components/FechasComponent';
import { KilometrajeComponent } from './components/KilometrajeComponent';
import { PrevisualizacionComponent } from './components/PrevisualizacionComponent';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


// eslint-disable-next-line @typescript-eslint/naming-convention
export const ProgramacionMantenientoScreen:React.FC = () => {

    return (
        <>
            <h1>Programación Mantenimiento</h1>
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
                    <Title title="Articulo"/>
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
                    <Title title="Detalles del articulo"/>
                    <DetallesComponent />
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
                    <Title title='Articulo'/>
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
                    <Title title='Programar por fechas'/>
                    <FechasComponent />
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
                    <Title title='Programar por kilometraje'/>
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
                    <Title title='Previsualización'/>
                    <PrevisualizacionComponent />
                </Grid>
            </Grid>
        </>
    )
}
