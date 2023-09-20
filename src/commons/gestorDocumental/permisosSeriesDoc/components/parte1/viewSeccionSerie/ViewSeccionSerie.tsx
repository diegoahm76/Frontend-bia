/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { type FC } from 'react';
import { useAppSelector } from '../../../../../../hooks';
import { Grid, TextField } from '@mui/material';
import { stylesGrid } from '../../../utils/styles';

// componente unidad organizacional - serie - subserie disabilitado
export const ViewSeccionSerie: FC<any> = (): JSX.Element => {
  // ! states from redux
  const { current_unidad_organizacional, currentSeriesSubseries } =
    useAppSelector((state) => state.PsdSlice);

  // ? validaciones de renderizado

  if (!current_unidad_organizacional || !currentSeriesSubseries) return <></>;

  return (
    <>
      <Grid item xs={12} sm={8} sx={stylesGrid}>
        <TextField
          fullWidth
          label="Serie documental a administrar"
          size="small"
          variant="outlined"
          disabled={true}
          // nombre_unidad_org_actual_admin_series
          value={`
            ${currentSeriesSubseries?.codigo_serie} -
            ${currentSeriesSubseries?.nombre_serie} -
            ${
              currentSeriesSubseries?.codigo_subserie
                ? currentSeriesSubseries?.codigo_subserie
                : ''
            } -
            ${
              currentSeriesSubseries?.nombre_subserie
                ? currentSeriesSubseries?.nombre_subserie
                : ''
            }
            `}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} sm={8} sx={stylesGrid}>
        <TextField
          fullWidth
          label="Sección o subsección actual responsable de la serie documental"
          size="small"
          variant="outlined"
          disabled={true}
          value={
            current_unidad_organizacional?.nombre_unidad_org_actual_admin_series
          }
          InputLabelProps={{ shrink: true }}
        />
      </Grid>

      {/* <Grid item xs={12} sm={1} sx={stylesGrid}>
        <Button
          color="primary"
          variant="contained"
          startIcon={<SearchIcon />}
          onClick={() => {
            handleSeleccionCCD_PSD(true);
          }}
        >
          BUSCAR
        </Button>
      </Grid> */}
    </>
  );
};
