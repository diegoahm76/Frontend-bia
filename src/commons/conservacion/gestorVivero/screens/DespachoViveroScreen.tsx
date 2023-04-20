import { Grid } from "@mui/material";
import SeleccionarDespacho from "../componentes/SeleccionarDespacho";
import { Title } from '../../../../components/Title';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function DespachoViveroScreen(): JSX.Element {

  
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
          <Title title="Distribucion de despachos entrantes"></Title>
        </Grid>
        <SeleccionarDespacho />


      </Grid>
    </>
  );
}
