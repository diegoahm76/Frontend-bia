/* eslint-disable @typescript-eslint/naming-convention */
import { useLideresXUnidadOrganizacional } from '../../hook/useLideresXUnidadOrganizacional';
import {
  Button,
  Chip,
  // FormControl,
  Grid,
  // InputLabel,
  Stack,
  TextField
  // Typography
  // TextareaAutosize
} from '@mui/material';
import { Controller } from 'react-hook-form';

//* icons
import SearchIcon from '@mui/icons-material/Search';
import { Title } from '../../../../../../../../components';
import { control_warning } from '../../../../../../../almacen/configuracion/store/thunks/BodegaThunks';


//* icons
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
export const OrganigramaLideres = (): JSX.Element => {
  const { control_organigrama_lideres_por_unidad } =
    useLideresXUnidadOrganizacional();

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
        <Grid item xs={12}>
          <Title title="Líderes por Unidad Organizacional - (Organigrama)" />
          <form
            onSubmit={(w) => {
              w.preventDefault();
              console.log('submit');
            }}
            style={{
              marginTop: '20px'
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3.4}>
                <Controller
                  name="nombre"
                  control={control_organigrama_lideres_por_unidad}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <TextField
                      // margin="dense"
                      fullWidth
                      // name="nombre"
                      label="Nombre del Organigrama"
                      /* helperText={
                      trd_current != null
                        ? 'Actualice el nombre'
                        : 'Ingrese nombre'
                    } */
                      size="small"
                      variant="outlined"
                      value={value}
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => {
                        onChange(e.target.value);
                        e.target.value.length === 50 &&
                          control_warning('máximo 50 caracteres');
                        // console.log(e.target.value);
                      }}
                      inputProps={{ maxLength: 50 }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4.2}>
                <Controller
                  name="descripcion"
                  control={control_organigrama_lideres_por_unidad}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <TextField
                      fullWidth
                      label="Descripción"
                      /* helperText={
                      trd_current != null
                        ? 'Actualice el nombre'
                        : 'Ingrese nombre'
                    } */
                      size="small"
                      variant="outlined"
                      value={value}
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => {
                        onChange(e.target.value);
                        e.target.value.length === 50 &&
                          control_warning('máximo 50 caracteres');
                        // console.log(e.target.value);
                      }}
                      inputProps={{ maxLength: 50 }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={2.7}>
                <Controller
                  name="fecha_puesta_produccion"
                  control={control_organigrama_lideres_por_unidad}
                  defaultValue=""
                  // rules={{ required: false }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <TextField
                      // margin="dense"
                      fullWidth
                      // name="version"
                      label="Fecha Puesta en Producción"
                      /* helperText={
                      trd_current != null
                        ? 'Actualice la versión'
                        : 'Ingrese versión'
                    } */
                      size="small"
                      variant="outlined"
                      value={value}
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => {
                        onChange(e.target.value);
                        e.target.value.length === 10 &&
                          control_warning('máximo 10 carácteres');
                        // console.log(e.target.value);
                      }}
                      inputProps={{ maxLength: 10 }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={1.7}>
                <Controller
                  name="verison"
                  control={control_organigrama_lideres_por_unidad}
                  defaultValue=""
                  // rules={{ required: false }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <TextField
                      fullWidth
                      label="Versión"
                      /* helperText={
                      trd_current != null
                        ? 'Actualice la versión'
                        : 'Ingrese versión'
                    } */
                      size="small"
                      variant="outlined"
                      value={value}
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => {
                        onChange(e.target.value);
                        e.target.value.length === 10 &&
                          control_warning('máximo 10 carácteres');
                        // console.log(e.target.value);
                      }}
                      inputProps={{ maxLength: 10 }}
                    />
                  )}
                />
              </Grid>

              {/* <Grid item xs={12} sm={2}>
                <Button
                  color="primary"
                  variant="outlined"
                  sx={{ border: 'none' }}
                  startIcon={<SearchIcon />}
                  // onClick={(openModalModalAdvancedOrganigrama) => {
                  //   console.log('openModalModalAdvancedOrganigrama');
                  // }}
                >
                  ACTUAL
                </Button>
              </Grid> */}
            </Grid>

            <Stack
              direction="row"
              justifyContent="flex-end"
              spacing={2}
              sx={{ mb: '20px', mt: '20px', alignItems: 'center' }}
            >
              <Chip
                size="small"
                label="Actual"
                color="info"
                variant="outlined"
                icon={<TipsAndUpdatesIcon />}
              />

              <Button
                color="primary"
                variant="outlined"
                startIcon={<SearchIcon />}
                // onClick={(openModalModalAdvancedOrganigrama) => {
                //   console.log('openModalModalAdvancedOrganigrama');
                // }}
              >
                BÚSQUEDA AVANZADA ORGANIGRAMA
              </Button>
            </Stack>
          </form>
        </Grid>
      </Grid>
    </>
  );
};
