/* eslint-disable @typescript-eslint/naming-convention */
import React, { useContext } from 'react';
import { Button, Divider, Grid, Stack, TextField } from '@mui/material';
import CleanIcon from '@mui/icons-material/CleaningServices';
import SearchIcon from '@mui/icons-material/Search';
import Select from 'react-select';
import { useAppDispatch, useAppSelector } from '../../../../../../../../../../../../hooks';
import { ModalAndLoadingContext } from '../../../../../../../../../../../../context/GeneralContext';
import { containerStyles } from '../../../../../../../../../../tca/screens/utils/constants/constants';
import { Title } from '../../../../../../../../../../../../components';
import { setCurrentPersonaRespuestaUsuario } from '../../../../../../../../../respuestaRequerimientoOpa/toolkit/slice/ResRequerimientoOpaSlice';
import { control_info } from '../../../../../../../../../../alertasgestor/utils/control_error_or_success';
import { ModalSeleccionEmpresa } from './ModalSeleccionEm';

export const EmpresaComponent = ({
  control_seleccionar_persona,
  watchExe,
  reset_seleccionar_persona,
}: {
  control_seleccionar_persona: any;
  watchExe: any;
  reset_seleccionar_persona: any;
}): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();

  //* context declarations
  const {
    generalLoading,
    handleGeneralLoading,
    secondLoading,
    handleSecondLoading,
  } = useContext(ModalAndLoadingContext);

  // ? con esta variable se va a manejar la actualización de la persona seleccionada para no generar conflicsot con use form
  const { currentPersonaRespuestaUsuario } = useAppSelector(
    (state) => state.ResRequerimientoOpaSlice
  );
  return (
    <>
      <Grid container sx={containerStyles}>
        <Grid item xs={12}>
          <Title title="A nombre de una empresa" />
          <form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
            }}
            style={{
              marginTop: '20px',
            }}
          >
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sm={3}
                sx={{
                  zIndex: 2,
                }}
              >
                <div>
                  <Select
                    value={{
                      value:
                        currentPersonaRespuestaUsuario?.tipo_documento ?? 'N/A',
                      label:
                        currentPersonaRespuestaUsuario?.tipo_documento ?? '...',
                    }}
                    isDisabled={true}
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
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Número de documento"
                  size="small"
                  variant="outlined"
                  value={
                    currentPersonaRespuestaUsuario?.numero_documento ?? '...'
                  }
                  InputLabelProps={{ shrink: true }}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  fullWidth
                  label="Nombre comercial de la empresa"
                  size="small"
                  multiline
                  rows={1}
                  maxRows={2}
                  variant="outlined"
                  value={
                    currentPersonaRespuestaUsuario?.nombre_comercial ?? '...'
                  }
                  InputLabelProps={{ shrink: true }}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="Razón social de la empresa"
                  size="small"
                  multiline
                  rows={1}
                  maxRows={2}
                  variant="outlined"
                  value={currentPersonaRespuestaUsuario?.razon_social ?? '...'}
                  InputLabelProps={{ shrink: true }}
                  disabled
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={3}
                sx={{
                  zIndex: 2,
                }}
              >
                <div>
                  <Select
                    value={{
                      value:
                        currentPersonaRespuestaUsuario?.tipo_doc_rep ?? 'N/A',
                      label:
                        currentPersonaRespuestaUsuario?.tipo_doc_rep ?? '...',
                    }}
                    isDisabled={true}
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
                      Tipo de documento del representante
                    </small>
                  </label>
                </div>
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="Documento representante de la empresa"
                  size="small"
                  multiline
                  rows={1}
                  maxRows={2}
                  variant="outlined"
                  value={
                    currentPersonaRespuestaUsuario?.numero_documento_rep ??
                    '...'
                  }
                  InputLabelProps={{ shrink: true }}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="Nombre representante de la empresa"
                  size="small"
                  multiline
                  rows={1}
                  maxRows={2}
                  variant="outlined"
                  value={currentPersonaRespuestaUsuario?.nombre_rep ?? '...'}
                  InputLabelProps={{ shrink: true }}
                  disabled
                />
              </Grid>
              {currentPersonaRespuestaUsuario?.nombre_rep && (
                  <>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        fullWidth
                        label="ESTADO DE LA OPA"
                        size="small"
                        multiline
                        rows={1}
                        maxRows={2}
                        variant="outlined"
                        value={'EXISTENTE SIN RESPONDER'}
                        disabled
                      />
                    </Grid>
                  </>
                )}
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
                  dispatch(setCurrentPersonaRespuestaUsuario(null as any));
                  control_info('Se ha quitado la selección de la persona');
                }}
              >
                QUITAR SELECCIÓN DE EMPRESA
              </Button>

              <Button
                color="primary"
                variant="contained"
                startIcon={<SearchIcon />}
                onClick={() => {
                  handleGeneralLoading(true);
                }}
              >
                BÚSQUEDA DE EMPRESA
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
      <ModalSeleccionEmpresa
        {...{
          control_seleccionar_persona,
          watchExe,
          reset_seleccionar_persona,
        }}
      />
      {/* modal selección persona */}
    </>
  );
};
