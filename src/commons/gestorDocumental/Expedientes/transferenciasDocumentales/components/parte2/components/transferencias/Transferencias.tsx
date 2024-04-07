/* eslint-disable @typescript-eslint/naming-convention */
import React, { useContext } from 'react';
import { useTransferenciasDocumentales } from '../../../../hook/useTransferenciasDocumentales';
import { Button, Grid, Stack, TextField } from '@mui/material';
import { ModalAndLoadingContext } from '../../../../../../../../context/GeneralContext';
import SearchIcon from '@mui/icons-material/Search';
import CleanIcon from '@mui/icons-material/CleaningServices';
import ReplyIcon from '@mui/icons-material/Reply';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import { Title } from '../../../../../../../../components';
import { Controller } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import Select from 'react-select';
import { RenderDataGrid } from '../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { choicesTipoTransferencia } from '../../../parte1/components/historicoTransferenciasDoc/choices/choices';
import {
  choicesDispocisionFinal,
  choicesValueToTransfer,
} from './choices/choicesTransferencias';

export const Transferencias = ({
  controlHistorialTransferencias,
  resetHistorialTransferencias,
  watchHistorialTransferenciasExe,
}: {
  controlHistorialTransferencias: any;
  resetHistorialTransferencias: any;
  watchHistorialTransferenciasExe: any;
}): JSX.Element => {
  //* use Hooks
  const { handleBack } = useTransferenciasDocumentales();

  //* use context declarations
  const { generalLoading, handleGeneralLoading } = useContext(
    ModalAndLoadingContext
  );

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
          <Title title="Buscar expedientes para transferir" />
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
                          resetHistorialTransferencias({
                            ...watchHistorialTransferenciasExe,
                            tipo_transferencia: selectedOption,
                            dispocision_final: '',
                          });
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
                  name="fecha"
                  control={controlHistorialTransferencias}
                  defaultValue=""
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      label="Fecha"
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

              {watchHistorialTransferenciasExe.tipo_transferencia?.value ===
                'S' ||
              !watchHistorialTransferenciasExe.tipo_transferencia?.value ? (
                <></>
              ) : (
                <Grid
                  item
                  xs={12}
                  sm={4}
                  sx={{
                    zIndex: 20,
                  }}
                >
                  <Controller
                    //* estos names de los controllers deben ser modificiado para que sirvan a la busqueda del panel de ventanilla
                    name="unidad"
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
                          options={[] as any[]}
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
                            Unidad organizacional que transfirió
                          </small>
                        </label>
                      </div>
                    )}
                  />
                </Grid>
              )}

              {watchHistorialTransferenciasExe.tipo_transferencia?.value ===
                'P' ||
              !watchHistorialTransferenciasExe.tipo_transferencia?.value ? (
                <></>
              ) : (
                <>
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    sx={{
                      zIndex: 20,
                    }}
                  >
                    <Controller
                      //* estos names de los controllers deben ser modificiado para que sirvan a la busqueda del panel de ventanilla
                      name="dispocision_final"
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
                            options={choicesDispocisionFinal as any[]}
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
                              Dispocisión final
                            </small>
                          </label>
                        </div>
                      )}
                    />
                  </Grid>

                  {watchHistorialTransferenciasExe.dispocision_final?.value ===
                    'S' &&
                  watchHistorialTransferenciasExe.dispocision_final?.value ? (
                    <Grid
                      item
                      xs={12}
                      sm={4}
                      sx={{
                        zIndex: 20,
                      }}
                    >
                      <Controller
                        //* estos names de los controllers deben ser modificiado para que sirvan a la busqueda del panel de ventanilla
                        name="porcentaje_transferencia"
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
                              options={choicesValueToTransfer as any[]}
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
                                Porcentaje que quiere transferir
                              </small>
                            </label>
                          </div>
                        )}
                      />
                    </Grid>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </Grid>

            <Stack
              direction="row"
              justifyContent="flex-end"
              spacing={2}
              sx={{ my: '1.5rem' }}
            >
              <LoadingButton
                loading={false}
                type="submit"
                color="primary"
                variant="contained"
                startIcon={<SearchIcon />}
              >
                BUSCAR EXPEDIENTES
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
                color="warning"
                variant="contained"
                startIcon={<ReplyIcon />}
                onClick={handleBack}
              >
                VOLVER
              </Button>
              <Button
                color="warning"
                variant="outlined"
                startIcon={<KeyboardTabIcon />}
                onClick={() => {
                  console.log('ir al módulo de eliminación documental');
                }}
              >
                IR AL MÓDULO DE ELIMINACIÓN DOCUMENTAL
              </Button>
            </Stack>
          </form>
        </Grid>
      </Grid>
      {/*se debe crear la variable para almacenar los resultados del que mostrará el grillado*/}
      {10 < 5 && (
        <RenderDataGrid title="Resultado búsqueda" rows={[]} columns={[]} />
      )}
    </>
  );
};
