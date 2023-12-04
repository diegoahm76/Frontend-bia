/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/naming-convention */
import { useContext } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Stack,
  TextField,
} from '@mui/material';
import { Title } from '../../../../../../../components';
import CloseIcon from '@mui/icons-material/Close';
import { Controller } from 'react-hook-form';
import CleanIcon from '@mui/icons-material/CleaningServices';
import Select from 'react-select';
import SaveIcon from '@mui/icons-material/Save';
import { ModalAndLoadingContext } from '../../../../../../../context/GeneralContext';
import { usePanelVentanilla } from '../../../../../panelDeVentanilla/hook/usePanelVentanilla';

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
];
export const ModalMetadatos = (): JSX.Element => {
  //* hooks
  const { controlManejoMetadatosModal, watchExeManejoModalMetadatos } =
    usePanelVentanilla();

  //* context
  const { modalAgregarMetadatos, handleModalAgregarMetadatos } = useContext(
    ModalAndLoadingContext
  );

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="md"
        open={modalAgregarMetadatos}
        onClose={() => {
          handleModalAgregarMetadatos(false);
          //* tambien se deben limpiar los datos que se recojan en el modal
        }}
      >
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            console.log(watchExeManejoModalMetadatos);
            //? va a ser necesario almacenar los datos de los metadatos que se establezcan
          }}
        >
          <DialogTitle>
            <Title title="Metadatos del archivo seleccionado" />
          </DialogTitle>
          <Divider />
          <DialogContent
            sx={{
              mb: '0px',
              justifyContent: 'center',
            }}
          >
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sm={4}
                sx={{
                  mt: '1.2rem',
                  mb: '1.2rem',
                }}
              >
                <Controller
                  name="id_ccd"
                  control={controlManejoMetadatosModal}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <div>
                      <Select
                        value={value}
                        // name="id_ccd"
                        onChange={(selectedOption) => {
                          console.log(selectedOption);
                          /*dispatch(
                            getServiceSeriesSubseriesXUnidadOrganizacional(
                              selectedOption.item
                            )
                          );*/
                          onChange(selectedOption);
                        }}
                        // isDisabled={trd_current != null}
                        options={[]}
                        placeholder="Seleccionar"
                      />
                      <label>
                        <small
                          style={{
                            color: 'rgba(0, 0, 0, 0.6)',
                            fontWeight: 'thin',
                            fontSize: '0.75rem',
                            marginTop: '0.25rem',
                            marginLeft: '0.25rem',
                          }}
                        >
                          Categoría del archivo
                        </small>
                      </label>
                    </div>
                  )}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={4}
                sx={{
                  mt: '1.2rem',
                  mb: '1.2rem',
                }}
              >
                <Controller
                  name="id_ccd"
                  control={controlManejoMetadatosModal}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <div>
                      <Select
                        value={value}
                        // name="id_ccd"
                        onChange={(selectedOption) => {
                          console.log(selectedOption);
                          /* dispatch(
                            getServiceSeriesSubseriesXUnidadOrganizacional(
                              selectedOption.item
                            )
                          ); */
                          onChange(selectedOption);
                        }}
                        // isDisabled={trd_current != null}
                        options={[]}
                        placeholder="Seleccionar"
                      />
                      <label>
                        <small
                          style={{
                            color: 'rgba(0, 0, 0, 0.6)',
                            fontWeight: 'thin',
                            fontSize: '0.75rem',
                            marginTop: '0.25rem',
                            marginLeft: '0.25rem',
                          }}
                        >
                          Tiene réplica física
                        </small>
                      </label>
                    </div>
                  )}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={4}
                sx={{
                  mt: '1.2rem',
                  mb: '1.2rem',
                }}
              >
                <Controller
                  name="id_ccd"
                  control={controlManejoMetadatosModal}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <div>
                      <Select
                        value={value}
                        // name="id_ccd"
                        onChange={(selectedOption) => {
                          console.log(selectedOption);
                          /* dispatch(
                            getServiceSeriesSubseriesXUnidadOrganizacional(
                              selectedOption.item
                            )
                          );*/
                          onChange(selectedOption);
                        }}
                        // isDisabled={trd_current != null}
                        options={[]}
                        placeholder="Seleccionar"
                      />
                      <label>
                        <small
                          style={{
                            color: 'rgba(0, 0, 0, 0.6)',
                            fontWeight: 'thin',
                            fontSize: '0.75rem',
                            marginTop: '0.25rem',
                            marginLeft: '0.25rem',
                          }}
                        >
                          Origen del archivo
                        </small>
                      </label>
                    </div>
                  )}
                />
              </Grid>

              {/*Inicio de segunda fila*/}
              <Grid
                item
                xs={12}
                sm={4}
                sx={{
                  mt: '1.2rem',
                  mb: '1.2rem',
                }}
              >
                <Controller
                  name="id_ccd"
                  control={controlManejoMetadatosModal}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <div>
                      <Select
                        value={value}
                        // name="id_ccd"
                        onChange={(selectedOption) => {
                          console.log(selectedOption);
                          /* dispatch(
                            getServiceSeriesSubseriesXUnidadOrganizacional(
                              selectedOption.item
                            )
                          );*/
                          {
                            /* si se selcciona el si se debe mostrar el select de las tipologías documentales que se van a establecer */
                          }
                          onChange(selectedOption);
                        }}
                        // isDisabled={trd_current != null}
                        options={[]}
                        placeholder="Seleccionar"
                      />
                      <label>
                        <small
                          style={{
                            color: 'rgba(0, 0, 0, 0.6)',
                            fontWeight: 'thin',
                            fontSize: '0.75rem',
                            marginTop: '0.25rem',
                            marginLeft: '0.25rem',
                          }}
                        >
                          ¿Tiene tipología relacionada?
                        </small>
                      </label>
                    </div>
                  )}
                />
              </Grid>
              {/* se debe revisar en que momento mostrar este combo de select */}
              <Grid
                item
                xs={12}
                sm={4}
                sx={{
                  mt: '1.2rem',
                  mb: '1.2rem',
                }}
              >
                <Controller
                  name="id_ccd"
                  control={controlManejoMetadatosModal}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <div>
                      <Select
                        value={value}
                        // name="id_ccd"
                        onChange={(selectedOption) => {
                          console.log(selectedOption);
                          /* dispatch(
                            getServiceSeriesSubseriesXUnidadOrganizacional(
                              selectedOption.item
                            )
                          );*/
                          onChange(selectedOption);
                        }}
                        // isDisabled={trd_current != null}
                        options={[]}
                        placeholder="Seleccionar"
                      />
                      <label>
                        <small
                          style={{
                            color: 'rgba(0, 0, 0, 0.6)',
                            fontWeight: 'thin',
                            fontSize: '0.75rem',
                            marginTop: '0.25rem',
                            marginLeft: '0.25rem',
                          }}
                        >
                          Tipología documental
                        </small>
                      </label>
                    </div>
                  )}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={4}
                sx={{
                  mt: '1.2rem',
                  mb: '1.2rem',
                }}
              >
                <Controller
                  name="nombre"
                  control={controlManejoMetadatosModal}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      required
                      // margin="dense"
                      fullWidth
                      // name="nombre"
                      label="¿Cual?"
                      size="small"
                      variant="outlined"
                      value={value}
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => {
                        onChange(e.target.value);
                        /*e.target.value.length === 50 &&
                          control_warning('máximo 50 caracteres');*/
                        // console.log(e.target.value);
                      }}
                      inputProps={{ maxLength: 50 }}
                    />
                  )}
                />
              </Grid>

              <Grid
                item
                xs={12}
                sm={12}
                sx={{
                  mt: '1.2rem',
                  mb: '1.2rem',
                }}
              >
                <Controller
                  name="nombre"
                  control={controlManejoMetadatosModal}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      required
                      // margin="dense"
                      fullWidth
                      // name="nombre"
                      label="Asunto"
                      size="small"
                      variant="outlined"
                      value={value}
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => {
                        onChange(e.target.value);
                        /*e.target.value.length === 50 &&
                          control_warning('máximo 50 caracteres');*/
                        // console.log(e.target.value);
                      }}
                      inputProps={{ maxLength: 50 }}
                    />
                  )}
                />
              </Grid>

              <Grid
                item
                xs={12}
                sm={12}
                sx={{
                  mt: '1.2rem',
                  mb: '1.2rem',
                }}
              >
                <Controller
                  name="nombre"
                  control={controlManejoMetadatosModal}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      required
                      multiline
                      rows={4}
                      // margin="dense"
                      fullWidth
                      // name="nombre"
                      label="Descripción"
                      size="small"
                      variant="outlined"
                      value={value}
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => {
                        onChange(e.target.value);
                        /*e.target.value.length === 50 &&
                          control_warning('máximo 50 caracteres');*/
                        // console.log(e.target.value);
                      }}
                      inputProps={{ maxLength: 50 }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={12} sx={{ mt: '1.2rem', mb: '1.2rem' }}>
                <Controller
                  name="autocomplete"
                  control={controlManejoMetadatosModal}
                  // defaultValue={[top100Films[13].title]}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <Autocomplete
                      onChange={(event, newValue) => {
                        onChange(newValue);
                      }}
                      value={value}
                      multiple
                      id="tags-filled"
                      options={[]}
                      freeSolo
                      renderTags={(value: readonly string[], getTagProps) =>
                        value.map((option: string, index: number) => (
                          <Chip
                            variant="outlined"
                            label={option}
                            {...getTagProps({ index })}
                          />
                        ))
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Palabras claves"
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <Divider />
          <DialogActions>
            <Stack
              direction="row"
              spacing={2}
              sx={{ mr: '15px', mb: '10px', mt: '10px' }}
            >
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  console.log('limpiando campos del modal de metadatos');
                }}
                startIcon={<CleanIcon />}
              >
                DESCARTAR
              </Button>
              <Button
                color="error"
                variant="contained"
                onClick={() => {
                  console.log('cerrando modal');
                }}
                startIcon={<CloseIcon />}
              >
                CANCELAR
              </Button>
              <Button
                color="success"
                type="submit"
                variant="contained"
                onClick={() => {
                  console.log('cerrando modal');
                }}
                startIcon={<SaveIcon />}
              >
                GUARDAR
              </Button>
              <Button
                color="error"
                variant="outlined"
                onClick={() => {
                  //* en la cerrada tambien se deben limpiar los campos para que no se tienda a producir errrores
                  console.log('cerrando modal');
                  handleModalAgregarMetadatos(false);
                }}
                startIcon={<CloseIcon />}
              >
                CERRAR
              </Button>
            </Stack>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};
