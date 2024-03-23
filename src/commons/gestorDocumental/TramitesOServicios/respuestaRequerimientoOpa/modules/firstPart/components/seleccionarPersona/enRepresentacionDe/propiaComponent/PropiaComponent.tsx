/* eslint-disable @typescript-eslint/naming-convention */
import React, { useContext } from 'react';
import { containerStyles } from '../../../../../../../../tca/screens/utils/constants/constants';
import { Controller } from 'react-hook-form';
import { Button, Divider, Grid, Stack, TextField } from '@mui/material';
import Select from 'react-select';
import { Title } from '../../../../../../../../../../components';
import SearchIcon from '@mui/icons-material/Search';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { LoadingButton } from '@mui/lab';
import { ModalSeleccionPersona } from './ModalSeleccionPersona';
import { ModalAndLoadingContext } from '../../../../../../../../../../context/GeneralContext';

export const PropiaComponent = ({
  control_seleccionar_persona,
  watchExe,
  reset_seleccionar_persona,
}: {
  control_seleccionar_persona: any;
  watchExe: any;
  reset_seleccionar_persona: any;
}): JSX.Element => {

  //* context declarations
  const { handleOpenModalOne} = useContext(ModalAndLoadingContext);

  return (
    <>
      <Grid container sx={containerStyles}>
        <Grid item xs={12}>
          <Title title="A nombre propio - títular" />
          <form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
            }}
            style={{
              marginTop: '20px',
            }}
          >
            <Grid
              container
              spacing={2}
              sx={{ mb: '20px', zIndex: 9999 }}
            ></Grid>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sm={3}
                sx={{
                  zIndex: 2,
                }}
              >
                <Controller
                  name="tipo_documento"
                  control={control_seleccionar_persona}
                  rules={{ required: true }}
                  render={({ field: { value } }) => (
                    <div>
                      <Select
                        value={value}
                        isDisabled={true}
                        options={[] ?? []}
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
                          Tipo de documento
                        </small>
                      </label>
                    </div>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Controller
                  name="numero_documento"
                  control={control_seleccionar_persona}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field: { onChange, value }, fieldState: {} }) => (
                    <TextField
                      fullWidth
                      label="Número de documento"
                      size="small"
                      variant="outlined"
                      value={value}
                      onChange={onChange}
                      InputLabelProps={{ shrink: true }}
                      disabled
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <Controller
                  name="nombre_completo"
                  control={control_seleccionar_persona}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field: { onChange, value }, fieldState: {} }) => (
                    <TextField
                      fullWidth
                      label="Nombre de la persona"
                      size="small"
                      multiline
                      rows={1}
                      maxRows={2}
                      variant="outlined"
                      value={value}
                      onChange={onChange}
                      InputLabelProps={{ shrink: true }}
                      disabled
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Stack
              direction="row"
              justifyContent="flex-end"
              spacing={2}
              sx={{ mb: '20px', mt: '20px', alignItems: 'center' }}
            >
              <Button
                color="primary"
                variant="outlined"
                startIcon={<CleanIcon />}
                onClick={() => {
                  // cleanElementComponent();
                  console.log('limpiar campos');
                }}
              >
                LIMPIAR CAMPOS
              </Button>

              <Button
                color="primary"
                variant="contained"
                startIcon={<SearchIcon />}
                onClick={() => {
                  handleOpenModalOne(true)
                }}
              >
                BÚSQUEDA DE PERSONAS
              </Button>
            </Stack>
            <Divider />
            {/* <Grid container spacing={2} sx={{ mt: '15px' }}>
              <Stack
                direction="row"
                justifyContent="flex-start"
                spacing={2}
                sx={{
                  mb: '20px',
                  mt: '20px',
                  alignItems: 'center',
                  ml: '20px'
                }}
              >
                <LoadingButton
                  loading={loadingButton}
                  color="success"
                  type="submit"
                  variant="contained"
                  disabled={
                    false
                  }
                  startIcon={
                    asignacion_lideres_current?.observaciones_asignacion ? (
                      <SyncIcon />
                    ) : (
                      <SaveIcon />
                    )
                  }
                >
                  {asignacion_lideres_current?.observaciones_asignacion
                    ? 'ACTUALIZAR LÍDER'
                    : 'GUARDAR LÍDER'}
                </LoadingButton>
              </Stack>
            </Grid>*/}
          </form>
        </Grid>
      </Grid>

      {/* modal selección persona */}
      <ModalSeleccionPersona
        {
          ...{
            control_seleccionar_persona,
            watchExe,
            reset_seleccionar_persona,

          }
        }
      />
      {/* modal selección persona */}
    </>
  );
};
