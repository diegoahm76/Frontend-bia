/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Grid, Stack, TextField } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';
import { usePanelVentanilla } from '../../../../../../hook/usePanelVentanilla';
import Select from 'react-select';
import { LoadingButton } from '@mui/lab';
import SearchIcon from '@mui/icons-material/Search';
import CleanIcon from '@mui/icons-material/CleaningServices';

export const BuscadorPanelVentanilla = (): JSX.Element => {
  //* hooks
  const { control_busqueda_panel_ventanilla } = usePanelVentanilla();

  // ? handleSubmit
  const handleSubmit = () => {
    console.log('submit , buscando coincidencias');
  };

  return (
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
      <Grid item xs={12}>
        {/* <Title title="TRD - ( Tabla de retención documental )" />*/}
        <form
          onSubmit={(w) => {
            w.preventDefault();
            handleSubmit();
          }}
          style={{
            marginTop: '20px',
          }}
        >
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                zIndex: 2,
              }}
            >
              {/* <label className="text-terciary">
                  Lista de ccds terminadoss
                  <samp className="text-danger">*</samp>
                </label> */}
              {/* In this selection, I want to select the cdd id to make the post request to create a TRD */}
              <Controller
                //* estos names de los controllers deben ser modificiado para que sirvan a la busqueda del panel de ventanilla
                name="id_ccd"
                control={control_busqueda_panel_ventanilla}
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
                        /*dispatch(
                          getServiceSeriesSubseriesXUnidadOrganizacional(
                            selectedOption.item
                          )
                        );*/
                        console.log(selectedOption);
                        onChange(selectedOption);
                      }}
                      // isDisabled={trd_current != null}
                      options={[] as any}
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
                        Tipo de solicitud
                      </small>
                    </label>
                  </div>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Controller
                name="nombre"
                control={control_busqueda_panel_ventanilla}
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
                    label="Nombre del TRD"
                    /* helperText={
                      trd_current != null
                        ? 'Actualice el nombre'
                        : 'Ingrese nombre'
                    }*/
                    size="small"
                    variant="outlined"
                    value={value}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => {
                      onChange(e.target.value);
                    }}
                    inputProps={{ maxLength: 50 }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Controller
                name="version"
                control={control_busqueda_panel_ventanilla}
                defaultValue=""
                // rules={{ required: false }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    required
                    fullWidth
                    // name="version"
                    label="Versión del TRD"
                    /* helperText={
                      trd_current != null
                        ? 'Actualice la versión'
                        : 'Ingrese versión'
                    }*/
                    size="small"
                    variant="outlined"
                    value={value}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => {
                      onChange(e.target.value);
                    }}
                    inputProps={{ maxLength: 10 }}
                  />
                )}
              />
            </Grid>
          </Grid>

          <Stack
            direction="row"
            justifyContent="flex-end"
            spacing={2}
            sx={{ mb: '20px', mt: '20px' }}
          >
            <LoadingButton
              loading={false}
              color="primary"
              variant="contained"
              startIcon={<SearchIcon />}
              onClick={() => {
                console.log('se están buscando los elementos');
              }}
            >
              BUSCAR TRD
            </LoadingButton>
            <Button
              color="primary"
              variant="outlined"
              startIcon={<CleanIcon />}
              onClick={() => {
                console.log('limpiando todos los campos ');
              }}
            >
              LIMPIAR CAMPOS
            </Button>
          </Stack>
        </form>
      </Grid>
    </Grid>
  );
};
