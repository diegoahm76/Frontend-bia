import { Grid } from "@mui/material";
import SeleccionarPersona from "../../../../components/partials/SeleccionarPersona";

// eslint-disable-next-line @typescript-eslint/naming-convention
export function AsignarResponsableViveroScreen(): JSX.Element {
   

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
        <SeleccionarPersona/>

            </Grid>
        </>
    );
}
