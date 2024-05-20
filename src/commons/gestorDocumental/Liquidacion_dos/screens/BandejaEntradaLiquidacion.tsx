/* eslint-disable @typescript-eslint/naming-convention */
import { Grid } from "@mui/material";
import { GenerarLiquidacion } from '../components/GenerarLiquidacion/GenerarLiquidacion';
import { BotonesFinales } from '../components/BotonesFinales/BotonesFinales';

export const ProcesoLiquidacionScreen: React.FC = () => {

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
                    boxShadow: '0px 3px 6px #042F4A26'
                }}
            >
                <GenerarLiquidacion />
            </Grid>
            <BotonesFinales />
        </>
    );
};
