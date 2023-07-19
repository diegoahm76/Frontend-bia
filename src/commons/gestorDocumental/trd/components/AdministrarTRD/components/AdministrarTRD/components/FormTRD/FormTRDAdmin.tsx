/* eslint-disable @typescript-eslint/naming-convention */

import { Box, Grid, Select, TextField } from '@mui/material';
import { Title } from '../../../../../../../../../components';
import { useContext } from 'react';
import { ModalContextTRD } from '../../../../../../context/ModalsContextTrd';
import { Controller } from 'react-hook-form';
import { use_trd } from '../../../../../../hooks/use_trd';

export const FormTRDAdmin = (): JSX.Element => {
  //* define show or no show component
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { closeModalAdministracionTRD } = useContext(ModalContextTRD);

  const {
    control_administrar_trd,
    // handleSubmit: handleSubmitBusquedaTipologiasDocumentales,
    // formState: { errors },
    // reset_administrar_trd,
    // watch_administrar_trd
  } = use_trd();

  return (
    <>
      <Grid xs={12} md={12}>
        <Box sx={{ width: '100%' }}>
          <Title title="Agregrar Características" />

          <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sm={3}
                sx={{
                  zIndex: 2
                }}
              >
                <Controller
                  name="cod_disposicion_final"
                  rules={{ required: true }}
                  control={control_administrar_trd}
                  render={({ field }) => (
                    <div>
                      <Select
                        {...field}
                        // isDisabled={ccd_current != null || ccd_current?.actual}
                        value={field.value}
                       /* options={[
                          { value: 1, label: '1' },
                          { value: 2, label: '2' },
                          { value: 3, label: '3' },
                        ]} */
                        placeholder="Seleccionar"
                      />
                      <label htmlFor={field.name}>
                        <small
                          style={{
                            color: 'rgba(0, 0, 0, 0.6)',
                            fontWeight: 'thin',
                            fontSize: '0.75rem'
                          }}
                        >
                          {/* {ccd_current
                            ? `
                              Organigrama Seleccionado
                            `
                            : `Seleccionar Organigrama`} */}
                            hola 
                        </small>
                      </label>
                    </div>
                  )}
                />
               {/* {errors_create_ccd.organigrama != null && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Este campo es obligatorio
                    </small>
                  </div>
                )} */}
              </Grid>
             {/* <Grid
                item
                xs={12}
                sm={3}
                sx={{
                  zIndex: 2
                }}
              >
                <Controller
                  name="unidades_organigrama"
                  control={control_administrar_trd}
                  render={({ field }) => (
                    <div>
                      <Select
                        {...field}
                        // isDisabled={ccd_current != null || ccd_current?.actual}
                        value={field.value}
                        options={[]}
                        placeholder="Seleccionar"
                      />
                      <label htmlFor={field.name}>
                        <small
                          style={{
                            color: 'rgba(0, 0, 0, 0.6)',
                            fontWeight: 'thin',
                            fontSize: '0.75rem'
                          }}
                        >
                          {ccd_current
                            ? `Unidad Seleccionada`
                            : `Seleccionar Unidad`}
                            hola
                        </small>
                      </label>
                    </div>
                  )}
                />
              </Grid> */}
              <Grid item xs={12} sm={3}>
                <Controller
                  name="nombre_ccd"
                  control={control_administrar_trd}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <TextField
                      // margin="dense"
                      fullWidth
                     // disabled={ccd_current?.actual}
                      size="small"
                      label="Nombre CCD"
                      variant="outlined"
                      value={value}
                      onChange={onChange}
                      error={!(error == null)}
                      helperText={
                        error != null
                          ? 'Es obligatorio ingresar un nombre'
                          : 'Ingrese nombre'
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Controller
                  name="nombre_ccd"
                  control={control_administrar_trd}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <TextField
                      // margin="dense"
                      fullWidth
                     // disabled={ccd_current?.actual}
                      size="small"
                      label="Nombre CCD"
                      variant="outlined"
                      value={value}
                      onChange={onChange}
                      error={!(error == null)}
                      helperText={
                        error != null
                          ? 'Es obligatorio ingresar un nombre'
                          : 'Ingrese nombre'
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Controller
                  name="version"
                  control={control_administrar_trd}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <TextField
                      // margin="dense"
                      fullWidth
                     //  disabled={ccd_current?.actual}
                      size="small"
                      label="Versión CCD"
                      variant="outlined"
                      value={value}
                      onChange={onChange}
                      error={!(error == null)}
                      helperText={
                        error != null
                          ? 'Es obligatorio ingresar una versión'
                          : 'Ingrese versión'
                      }
                    />
                  )}
                />
              </Grid>
              {/* new spaces */}
              <Grid item xs={12} sm={3}>
                <Controller
                  name="valor_aumento_serie"
                  control={control_administrar_trd}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <TextField
                      // margin="dense"
                      fullWidth
                      size="small"
                      label="Valor aumento series CCD"
                      /* sx={{
                        color: series_ccd.length > 0 || ccd_current?.fecha_terminado ? 'red' : 'blue'
                      }} */
                      
                      disabled={
                        false
                      }
                      variant="outlined"
                      value={value}
                      onChange={onChange}
                      error={!(error == null)}
                      helperText={
                        error != null
                          ? 'Es obligatorio ingresar un valor de aumento de serie'
                          : 'Ingrese valor aumento series'
                      }
                    />
                  )}
                />
              </Grid>
              {/* second new space */}
             {/* <Grid item xs={12} sm={3}>
                <Controller
                  name="valor_aumento_subserie"
                  control={control_create_ccd}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <TextField
                      // margin="dense"
                      fullWidth
                      size="small"
                      label="valor aumento subseries CCD"
                      variant="outlined"
                      disabled={subseries_ccd.length > 0 || ccd_current?.fecha_terminado || ccd_current?.actual}
                      value={value}
                      onChange={onChange}
                      error={!(error == null)}
                      helperText={
                        error != null
                          ? 'Es obligatorio ingresar un valor de aumento de subserie'
                          : 'Ingrese valor aumento subseries'
                      }
                    />
                  )}
                />
              </Grid> */}
              {/* third new spaces  */}
              {/* fourth new spaces, optional for the support route  */}
             {/* <Grid item xs={12} sm={3}>
                <Controller
                  name="ruta_soporte"
                  control={control_create_ccd}
                  defaultValue=""
                  rules={{ required: false }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <>
                      <Button
                        variant={
                          value === '' || value === null
                            ? 'outlined'
                            : 'contained'
                        }
                        component="label"
                        style={{
                          marginTop: '.15rem',
                          width: '100%'
                        }}
                        startIcon={<CloudUploadIcon />}
                      >
                        {value === '' || value === null
                          ? 'Subir archivo'
                          : 'Archivo subido'}
                        <input
                          style={{ display: 'none' }}
                          type="file"
                          disabled={ccd_current?.actual}
                          onChange={(e) => {
                            // console.log('valueeee', value);
                            const files = (e.target as HTMLInputElement).files;
                            if (files && files.length > 0) {
                              onChange(files[0]);
                              // console.log(files[0]);
                            }
                          }}
                        />
                      </Button>
                      <label htmlFor="">
                        <small
                          style={{
                            color: 'rgba(0, 0, 0, 0.6)',
                            fontWeight: 'thin',
                            fontSize: '0.75rem'
                          }}
                        >
                          {control_create_ccd._formValues.ruta_soporte
                            ? control_create_ccd._formValues.ruta_soporte
                                .name ??
                              control_create_ccd._formValues.ruta_soporte.replace(
                                /https?:\/\/back-end-bia-beta\.up\.railway\.app\/media\//,
                                ''
                              )
                            : 'Seleccione archivo'}
                        </small>
                      </label>
                    </>
                  )}
                />
              </Grid> */}

            {/*  <Grid item xs={12} sm={2} sx={{ marginTop: '.15rem' }}>
                <DownloadButton
                  fileName="ruta_soporte"
                  condition={
                    ccd_current === null ||
                    ccd_current?.ruta_soporte === null ||
                    ccd_current?.ruta_soporte === ''
                  }
                  fileUrl={ccd_current?.ruta_soporte}
                />
              </Grid>
*/}
              {/* end new spaces */}
            </Grid>







        </Box>
      </Grid>
    </>
  );
};
