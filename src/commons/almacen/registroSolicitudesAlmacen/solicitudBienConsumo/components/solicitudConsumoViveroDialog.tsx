
import "react-datepicker/dist/react-datepicker.css";
import { Grid, } from '@mui/material';
// import { Title } from '../../../../../components/Title';
import PersonaResponsable from './componenteBusqueda/PersonaResponsable';

import SeleccionarSolicitudVivero from "./componenteBusqueda/SeleccionarSolicitudVivero";



// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SolicitudConsumoViveroDialog = () => {


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
                <SeleccionarSolicitudVivero />
                <PersonaResponsable />
            </Grid>
        </Grid>

    )



};


// eslint-disable-next-line no-restricted-syntax
export default SolicitudConsumoViveroDialog;
