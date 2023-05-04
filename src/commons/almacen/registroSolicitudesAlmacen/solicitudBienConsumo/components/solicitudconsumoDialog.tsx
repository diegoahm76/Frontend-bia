
import "react-datepicker/dist/react-datepicker.css";
import { Grid, } from '@mui/material';
// import { Title } from '../../../../../components/Title';
import PersonaResponsable from './componenteBusqueda/PersonaResponsable';
import SeleccionarSolicitud from './componenteBusqueda/SeleccionarSolicitud';



// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SolicitudConsumoDialog = () => {


    return (


        <Grid
            container
            spacing={2}
            sx={{
                position: 'relative',
                background: '#FAFAFA',
                borderRadius: '15px',
                p: '20px',
                mb: '20px',
                boxShadow: '0px 3px 6px #042F4A26',

            }}
        >
            <Grid item xs={12} marginY={2}>
                <SeleccionarSolicitud />
                <PersonaResponsable />
            </Grid>
        </Grid>

    )



};


// eslint-disable-next-line no-restricted-syntax
export default SolicitudConsumoDialog;
