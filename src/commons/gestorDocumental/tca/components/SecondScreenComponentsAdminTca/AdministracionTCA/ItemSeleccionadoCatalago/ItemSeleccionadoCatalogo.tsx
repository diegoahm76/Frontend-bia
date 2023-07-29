/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { Grid, Box, TextField } from '@mui/material';
import { useAppSelector } from '../../../../../../../hooks';
import { Title } from '../../../../../../../components';
import { styles } from './utils/style';

export const ItemSeleccionadoCatalogo = (): JSX.Element => {
  // * state from trd_slice
  const { selected_item_from_catalogo } = useAppSelector(
    (state) => state.tca_slice
  );

  const {
    cod_unidad_org,
    nombre_unidad,
    cod_serie,
    nombre_serie,
    cod_subserie,
    nombre_subserie
  } = selected_item_from_catalogo;

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
          {/* codigo unidad organizacional */}
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              size="small"
              label="Cód. Unidad Organizacional"
              variant="outlined"
              value={cod_unidad_org}
              disabled
            />
            <label htmlFor="">
              <small style={styles}>UNIDAD ORGANIZACIONAL</small>
            </label>
          </Grid>

          {/* nombre unidad organizacional */}
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              size="small"
              label="Nombre Unidad Organizacional"
              variant="outlined"
              value={nombre_unidad}
              disabled
            />
            <label htmlFor="">
              <small style={styles}>UNIDAD ORGANIZACIONAL</small>
            </label>
          </Grid>

          {/* codigo serie */}
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              size="small"
              label="Cod. Serie"
              variant="outlined"
              value={cod_serie}
              disabled
            />
            <label htmlFor="">
              <small style={styles}>SERIE</small>
            </label>
          </Grid>

          {/* nombre serie */}
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              size="small"
              label="Nombre Serie"
              variant="outlined"
              value={nombre_serie}
              disabled
            />
            <label htmlFor="">
              <small style={styles}>SERIE</small>
            </label>
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              size="small"
              label="Cod. Subserie"
              variant="outlined"
              value={cod_subserie ?? '----'}
              disabled
            />
            <label htmlFor="">
              <small style={styles}>SUBSERIE</small>
            </label>
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              size="small"
              label="Nombre Subserie"
              variant="outlined"
              value={nombre_subserie ?? '----'}
              disabled
            />
            <label htmlFor="">
              <small style={styles}>SUBSERIE</small>
            </label>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};
