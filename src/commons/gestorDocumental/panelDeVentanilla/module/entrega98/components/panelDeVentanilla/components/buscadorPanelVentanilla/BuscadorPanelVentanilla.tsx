/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Grid, Stack, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { usePanelVentanilla } from '../../../../../../hook/usePanelVentanilla';
import Select from 'react-select';
import { LoadingButton } from '@mui/lab';
import SearchIcon from '@mui/icons-material/Search';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { Title } from '../../../../../../../../../components';
import {
  choicesEstadoActual,
  choicesTipoDeSolicitud,
} from '../../utils/choices';
import { getRequestStates } from './services/getRequestStates.service';

export const BuscadorPanelVentanilla = (): JSX.Element => {
  //* hooks
  const {
    control_busqueda_panel_ventanilla,
    watch_busqueda_panel_ventanilla,
    reset_search_form,
  } = usePanelVentanilla();

  // ? ----- FUNCIONES A USAR DENTRO DEL MODULO DEL BUSCADOR DEL PANEL DE VENTANILLA PARA LAS PQRSDF -----
  const handleSubmit = () => {
    console.log(
      'submit , buscando coincidencias',
      watch_busqueda_panel_ventanilla
    );
  };

  const resetForm = () => reset_search_form();

  // ? useState Necesario
  const [requestStatuses, setRequestStatuses] = useState<any[]>([]);

  //* se debe establecer un useEffect ya que cada vez que se recargeue el elemento se deben filtrar de diferente manera los elementos
  useEffect(() => {
    console.log('bienvenido al módulo de ventanilla');

    getRequestStates();
  }, []);

  // ?

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
        <Title title="Buscar elemento" />
        <form
          onSubmit={(w) => {
            w.preventDefault();
            handleSubmit();
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
                zIndex: 2,
              }}
            >
              <Controller
                //* estos names de los controllers deben ser modificiado para que sirvan a la busqueda del panel de ventanilla
                name="tipo_de_solicitud"
                control={control_busqueda_panel_ventanilla}
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <div>
                    <Select
                      value={value}
                      onChange={(selectedOption) => {
                        console.log(selectedOption);
                        onChange(selectedOption);
                      }}
                      options={choicesTipoDeSolicitud as any[]}
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
            <Grid item xs={12} sm={4}>
              <Controller
                name="radicado"
                control={control_busqueda_panel_ventanilla}
                defaultValue=""
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    required
                    fullWidth
                    label="Radicado"
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
            <Grid
              item
              xs={12}
              sm={4}
              sx={{
                zIndex: 2,
              }}
            >
              <Controller
                //* estos names de los controllers deben ser modificiado para que sirvan a la busqueda del panel de ventanilla
                name="estado_actual"
                control={control_busqueda_panel_ventanilla}
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <div>
                    <Select
                      value={value}
                      onChange={(selectedOption) => {
                        console.log(selectedOption);
                        onChange(selectedOption);
                      }}
                      options={choicesEstadoActual as any[]}
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
                        Estado actual
                      </small>
                    </label>
                  </div>
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
              BUSCAR ELEMENTO
            </LoadingButton>
            <Button
              color="primary"
              variant="outlined"
              startIcon={<CleanIcon />}
              onClick={resetForm}
            >
              LIMPIAR CAMPOS
            </Button>
          </Stack>
        </form>
      </Grid>
    </Grid>
  );
};
