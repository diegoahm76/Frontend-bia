/* eslint-disable @typescript-eslint/naming-convention */
import { Grid, Box, TextField } from '@mui/material';

import { useAppSelector } from '../../../../../../../../../../../hooks';
import { Title } from '../../../../../../../../../../../components';
export const ItemSeleccionado = (): JSX.Element => {
  // * state from trd_slice
  const { trd_current } = useAppSelector((state)  => state.trd_slice);

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
          <Grid item xs={12} sm={3}>
            <TextField
              // margin="dense"
              fullWidth
              // disabled={ccd_current?.actual}
              size="small"
              label="Cód. Unidad Organizacional"
              variant="outlined"
              value={trd_current?.nombre}
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

          <Grid item xs={12} sm={3}>
            <TextField
              // margin="dense"
              fullWidth
              // disabled={ccd_current?.actual}
              size="small"
              label="Nombre Unidad Organizacional"
              variant="outlined"
              value={trd_current?.nombre}
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

          <Grid item xs={12} sm={3}>
            <TextField
              // margin="dense"
              fullWidth
              // disabled={ccd_current?.actual}
              size="small"
              label="Cod. Serie"
              variant="outlined"
              value={trd_current?.version}
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
              label="Nombre Serie"
              variant="outlined"
              value={trd_current?.version}
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
              value={trd_current?.version}
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
              value={trd_current?.version}
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
