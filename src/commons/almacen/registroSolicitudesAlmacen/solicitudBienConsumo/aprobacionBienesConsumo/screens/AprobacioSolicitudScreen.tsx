import { Grid, } from "@mui/material";

import { Title } from '../../../../../../components/Title';
import SolicitudPorAprobar from "../components/SolicitudesPorAprobar";


// import CheckIcon from '@mui/icons-material/Check';





// eslint-disable-next-line @typescript-eslint/naming-convention
export function AprobacionSolicitudScreen(): JSX.Element {



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
                <Grid item xs={12} marginY={2}>
                    <Title title="Aprobación de soliitudes"></Title>
                </Grid>
                < SolicitudPorAprobar />




            </Grid>

        </>

    );

}

