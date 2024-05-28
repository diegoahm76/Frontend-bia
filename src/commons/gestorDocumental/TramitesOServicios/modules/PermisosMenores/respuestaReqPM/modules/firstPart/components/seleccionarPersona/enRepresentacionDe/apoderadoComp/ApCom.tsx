/* eslint-disable @typescript-eslint/naming-convention */
import React, { useContext } from 'react';
import { Button, Divider, Grid, Stack, TextField } from '@mui/material';
import Select from 'react-select';
import SearchIcon from '@mui/icons-material/Search';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { LoadingButton } from '@mui/lab';
import { ModalSeleccionPersonaApoderado } from './ModalSeleccionPersonaApoderado';
import { useAppDispatch, useAppSelector } from '../../../../../../../../../../../../hooks';
import { ModalAndLoadingContext } from '../../../../../../../../../../../../context/GeneralContext';
import { containerStyles } from '../../../../../../../../../../tca/screens/utils/constants/constants';
import { Title } from '../../../../../../../../../../../../components';
import { control_info } from '../../../../../../../../../../alertasgestor/utils/control_error_or_success';
import { setCurrentPersonaRespuestaUsuario } from '../../../../../../../../../respuestaRequerimientoOpa/toolkit/slice/ResRequerimientoOpaSlice';

export const ApoderadoComponent = ({
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
  const { handleOpenModalOne } = useContext(ModalAndLoadingContext);

  // ? con esta variable se va a manejar la actualización de la persona seleccionada para no generar conflicsot con use form
  const { currentPersonaRespuestaUsuario } = useAppSelector(
    (state) => state.ResRequerimientoOpaSlice
  );

  return (
    <>
      <Grid container sx={containerStyles}>
        <Grid item xs={12}>
          <Title title="A nombre propio - ( títular - apoderado )" />
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
                        currentPersonaRespuestaUsuario?.titular?.tipo_documento,
                      label:
                        currentPersonaRespuestaUsuario?.titular
                          ?.tipo_documento ?? '...',
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
                    currentPersonaRespuestaUsuario?.titular?.numero_documento ??
                    '...'
                  }
                  InputLabelProps={{ shrink: true }}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  fullWidth
                  label="Nombre de la persona"
                  size="small"
                  multiline
                  rows={1}
                  maxRows={2}
                  variant="outlined"
                  value={
                    currentPersonaRespuestaUsuario?.titular?.nombre_completo ??
                    '...'
                  }
                  InputLabelProps={{ shrink: true }}
                  disabled
                />
              </Grid>
              {/*-----------------------*/}
              {/*-----------------------*/}
              {/*-----------------------*/}
              {/*SELECCIÓN DE APODERADO*/}
              {/*-----------------------*/}
              {/*-----------------------*/}
              {/*-----------------------*/}

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
                        currentPersonaRespuestaUsuario?.apoderado
                          ?.tipo_documento,
                      label:
                        currentPersonaRespuestaUsuario?.apoderado
                          ?.tipo_documento ?? '...',
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
                      Tipo de documento del apoderado
                    </small>
                  </label>
                </div>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Número de documento del apoderado"
                  size="small"
                  variant="outlined"
                  value={
                    currentPersonaRespuestaUsuario?.apoderado
                      ?.numero_documento ?? '...'
                  }
                  InputLabelProps={{ shrink: true }}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  fullWidth
                  label="Nombre del apoderado"
                  size="small"
                  multiline
                  rows={1}
                  maxRows={2}
                  variant="outlined"
                  value={
                    currentPersonaRespuestaUsuario?.apoderado
                      ?.nombre_completo ?? '...'
                  }
                  InputLabelProps={{ shrink: true }}
                  disabled
                />
              </Grid>
              {currentPersonaRespuestaUsuario?.apoderado &&
                currentPersonaRespuestaUsuario?.titular && (
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
                  control_info(
                    'Se ha quitado la selección de la persona y del apoderado'
                  );
                }}
              >
                QUITAR SELECCIÓN
              </Button>

              <Button
                color="primary"
                variant="contained"
                startIcon={<SearchIcon />}
                onClick={() => {
                  handleOpenModalOne(true);
                }}
              >
                BÚSQUEDA PERSONA Y SELECCION DE APODERADO
              </Button>
            </Stack>
            <Divider />
          </form>
        </Grid>
      </Grid>

      {/* modal selección persona */}
      <ModalSeleccionPersonaApoderado
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
