/* eslint-disable @typescript-eslint/naming-convention */
import React, { useContext } from 'react';
import { useTransferenciasDocumentales } from '../../../../hook/useTransferenciasDocumentales';
import { Button, Grid, Stack, TextField, Typography } from '@mui/material';
import { ModalAndLoadingContext } from '../../../../../../../../context/GeneralContext';
import SearchIcon from '@mui/icons-material/Search';
import CleanIcon from '@mui/icons-material/CleaningServices';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import { Title } from '../../../../../../../../components';
import { Controller } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import Select from 'react-select';
import { choicesTipoTransferencia } from './choices/choices';
import { RenderDataGrid } from '../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';

export const HistoricoTransferenciasDoc = ({
  controlHistorialTransferencias,
  resetHistorialTransferencias,
  watchHistorialTransferenciasExe,
}: {
  controlHistorialTransferencias: any;
  resetHistorialTransferencias: any;
  watchHistorialTransferenciasExe: any;
}): JSX.Element => {
  //* use Hooks
  const { handleNext } = useTransferenciasDocumentales();

  //* use context declarations
  const { generalLoading, handleGeneralLoading } = useContext(
    ModalAndLoadingContext
  );

  const onSubmit = () => {
    console.log(watchHistorialTransferenciasExe);
  }

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
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item xs={12}>
          <Title title="Buscar histórico de transferencias documentales" />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // handleSubmit();
            }}
            style={{
              marginTop: '2.2rem',
            }}
          >
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sm={4}
                sx={{
                  zIndex: 25,
                }}
              >
                <Controller
                  //* estos names de los controllers deben ser modificiado para que sirvan a la busqueda del panel de ventanilla
                  name="tipo_transferencia"
                  control={controlHistorialTransferencias}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <div>
                      <Select
                        required
                        value={value}
                        onChange={(selectedOption) => {
                          //  console.log('')(selectedOption);
                          onChange(selectedOption);
                        }}
                        options={choicesTipoTransferencia as any[]}
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
                          Tipo de transferencia
                        </small>
                      </label>
                    </div>
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Controller
                  name="persona_tranfirio"
                  control={controlHistorialTransferencias}
                  defaultValue=""
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      disabled
                      label="Persona que transfirió"
                      type="text"
                      size="small"
                      variant="outlined"
                      value={value}
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => {
                        onChange(e.target.value);
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Controller
                  name="fecha_transferencia"
                  control={controlHistorialTransferencias}
                  defaultValue=""
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      label="Fecha de transferencia"
                      type="date"
                      size="small"
                      variant="outlined"
                      value={value}
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => {
                        onChange(e.target.value);
                      }}
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
                type="submit"
                color="primary"
                variant="contained"
                startIcon={<SearchIcon />}
              >
                BUSCAR HISTÓRICO DE TRANSFERENCIAS
              </LoadingButton>
              <Button
                color="primary"
                variant="outlined"
                startIcon={<CleanIcon />}
                onClick={() => {
                  resetHistorialTransferencias({
                    tipo_transferencia: '',
                    persona_tranfirio: '',
                    fecha_transferencia: '',
                    unidad_que_transfirio: '',
                  });
                }}
              >
                LIMPIAR CAMPOS
              </Button>
              <Button
                color="primary"
                variant="contained"
                startIcon={<PersonSearchIcon />}
                onClick={() => {
                  handleGeneralLoading(true);
                }}
              >
                BÚSQUEDA DE PERSONA
              </Button>
              <Button
                color="warning"
                variant="contained"
                startIcon={<KeyboardTabIcon />}
                onClick={() => {
                  //* resetHistorialTransferencias
                  resetHistorialTransferencias({
                    tipo_transferencia: '',
                    persona_tranfirio: '',
                    fecha_transferencia: '',
                    unidad_que_transfirio: '',
                  });
                  //* tambien se debe limpiar el grillado cuando se ponga, como si se reninciiara el proceso, tanto para pasar a la siguiente parte como para volver a la anterior
                  handleNext();
                }}
              >
                SIGUIENTE PASO
              </Button>
            </Stack>
          </form>
        </Grid>
      </Grid>
      {/*se debe crear la variable para almacenar los resultados del que mostrará el grillado*/}
      {10 < 5 && (
        <RenderDataGrid
          title="Resultado búsqueda histórico de transferencias documentales"
          rows={[]}
          columns={[]}
        />
      )}
    </>
  );
};
