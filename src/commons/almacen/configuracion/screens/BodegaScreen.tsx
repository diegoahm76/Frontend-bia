import { Grid, } from "@mui/material";
import SeleccionarBodega, { } from "../components/SeleccionarBodega";
import { Title } from '../../../../components/Title';
import PersonaResponsable from "../components/PersonaResponsable";




// eslint-disable-next-line @typescript-eslint/naming-convention
export function BodegaScreen(): JSX.Element {




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
          <Title title="Bodegas"></Title>
        </Grid>
        < SeleccionarBodega />
        < PersonaResponsable />

      </Grid>
    </>
  );
}
