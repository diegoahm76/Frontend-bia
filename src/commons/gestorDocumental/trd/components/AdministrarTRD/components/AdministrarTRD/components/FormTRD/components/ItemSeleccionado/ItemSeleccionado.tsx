/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { Grid, Box, TextField } from '@mui/material';

import { useAppSelector } from '../../../../../../../../../../../hooks';
import { Title } from '../../../../../../../../../../../components';
export const ItemSeleccionado = (): JSX.Element => {
  // * state from trd_slice
  const { selected_item_from_catalogo_trd } = useAppSelector(
    (state) => state.trd_slice
  );

  return (
    <Grid xs={12}>
      <Box sx={{ width: '100%', justifyContent: 'center' }}>
        <Title title="Item seleccionado" />
        <Grid
          container
          spacing={2}
          sx={{
            marginTop: '.5rem',
            justifyContent: 'center'
          }}
        >
          {/* codigo unidad organizacional || id unidad organizacional */}
          <Grid item xs={12} sm={3}>
            <TextField
              // margin="dense"
              fullWidth
              size="small"
              label="Cód. Unidad Organizacional"
              variant="outlined"
              value={
                selected_item_from_catalogo_trd?.cod_unidad_org ?? 'N/A'
              }
              disabled
            />
            <label htmlFor="">
              <small
                style={{
                  color: 'rgba(0, 0, 0, 0.6)',
                  fontWeight: 'thin',
                  fontSize: '0.75rem'
                }}
              >
                UNIDAD ORGANIZACIONAL
              </small>
            </label>
          </Grid>

          {/* nombre unidad organizacional */}
          <Grid item xs={12} sm={3}>
            <TextField
              // margin="dense"
              fullWidth
              // disabled={ccd_current?.actual}
              size="small"
              label="Nombre Unidad Organizacional"
              variant="outlined"
              value={
                selected_item_from_catalogo_trd?.nombre_unidad ||
                selected_item_from_catalogo_trd?.nombreUnidad
              }
              disabled
            />
            <label htmlFor="">
              <small
                style={{
                  color: 'rgba(0, 0, 0, 0.6)',
                  fontWeight: 'thin',
                  fontSize: '0.75rem'
                }}
              >
                UNIDAD ORGANIZACIONAL
              </small>
            </label>
          </Grid>

          {/* codigo serie */}
          <Grid item xs={12} sm={3}>
            <TextField
              // margin="dense"
              fullWidth
              // disabled={ccd_current?.actual}
              size="small"
              label="Cod. Serie"
              variant="outlined"
              value={
                selected_item_from_catalogo_trd?.cod_serie ||
                selected_item_from_catalogo_trd?.codigo_serie
              }
              disabled
            />
            <label htmlFor="">
              <small
                style={{
                  color: 'rgba(0, 0, 0, 0.6)',
                  fontWeight: 'thin',
                  fontSize: '0.75rem'
                }}
              >
                SERIE
              </small>
            </label>
          </Grid>

          {/* nombre serie */}
          <Grid item xs={12} sm={3}>
            <TextField
              // margin="dense"
              fullWidth
              // disabled={ccd_current?.actual}
              size="small"
              label="Nombre Serie"
              variant="outlined"
              value={
                selected_item_from_catalogo_trd?.nombre_serie ||
                selected_item_from_catalogo_trd?.nombre_serie
              }
              disabled
            />
            <label htmlFor="">
              <small
                style={{
                  color: 'rgba(0, 0, 0, 0.6)',
                  fontWeight: 'thin',
                  fontSize: '0.75rem'
                }}
              >
                SERIE
              </small>
            </label>
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              // margin="dense"
              fullWidth
              // disabled={ccd_current?.actual}
              size="small"
              label="Cod. Subserie"
              variant="outlined"
              value={
                (selected_item_from_catalogo_trd?.codigo_subserie ||
                  selected_item_from_catalogo_trd?.cod_subserie) ??
                '----'
              }
              disabled
            />
            <label htmlFor="">
              <small
                style={{
                  color: 'rgba(0, 0, 0, 0.6)',
                  fontWeight: 'thin',
                  fontSize: '0.75rem'
                }}
              >
                SUBSERIE
              </small>
            </label>
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              // margin="dense"
              fullWidth
              // disabled={ccd_current?.actual}
              size="small"
              label="Nombre Subserie"
              variant="outlined"
              value={selected_item_from_catalogo_trd?.nombre_subserie ?? '----'}
              disabled
            />
            <label htmlFor="">
              <small
                style={{
                  color: 'rgba(0, 0, 0, 0.6)',
                  fontWeight: 'thin',
                  fontSize: '0.75rem'
                }}
              >
                SUBSERIE
              </small>
            </label>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};
