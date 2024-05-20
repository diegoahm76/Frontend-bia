/* eslint-disable @typescript-eslint/naming-convention */
import { Grid } from '@mui/material';
import { SeleccionarArchivo } from '../components/seleccionarArchivo/seleccionarArchivo';
import { TipologiaDocumental } from '../components/tipologiaDocumental/tipologiaDocumental';
import { FormatoCalidadAsociado } from '../components/formatoCalidadAsociado/formatoCalidadAsociado';
import { UnidadesOrganizacionalesAutorizadas } from '../components/unidadesOrganizacionalesAutorizadas/unidadesOrganizacionalesAutorizadas';
import { ObservacionesAdministradorPlantillas } from '../components/observaciones/observaciones';

export const PantallaPrincipalAdministracionPlantillaDocumentos: React.FC =
  () => {
    return (
      <>
      <Grid container p={2} pr={4}>
        <Grid item xs={12}>
          <SeleccionarArchivo />
        </Grid>

        <Grid item xs={12}>
          <TipologiaDocumental />
        </Grid>
        <Grid item xs={12}>
          <FormatoCalidadAsociado />
        </Grid>
        <Grid item xs={12}>
          <UnidadesOrganizacionalesAutorizadas />
        </Grid>
        <Grid item xs={12}>
          <ObservacionesAdministradorPlantillas />
        </Grid>
        </Grid>
      </>
    );
  };
