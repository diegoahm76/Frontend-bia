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
import { choicesTipoDeSolicitud } from '../../utils/choices';
import { getRequestStates } from './services/getRequestStates.service';
import { BuscadorPqrsdf } from './buscadorPqrsdf/BuscadorPqrsdf';
import { BuscadorTramitesYservicios } from './buscadorTramitesYServicios/BuscadorTramitesYServicios';

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
  // const [requestStatuses, setRequestStatuses] = useState<any[]>([]);

  //* se debe establecer un useEffect ya que cada vez que se recargeue el elemento se deben filtrar de diferente manera los elementos
  /* useEffect(() => {
    void getRequestStates().then((res: any) => {
      console.log(res);
      setRequestStatuses(res);
    });
  }, []);
*/
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
            {/* se va a establecer solo el primer input y en base a la información que se proveea ahí se mostrará la búsqueda de trámites y servicios o la búsqueda correspondiente a trámites y servicios */}
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

                        console.log(
                          control_busqueda_panel_ventanilla?._formValues
                            ?.tipo_de_solicitud?.label
                        );
                        console.log(watch_busqueda_panel_ventanilla);
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

            {control_busqueda_panel_ventanilla?._formValues?.tipo_de_solicitud
              ?.label === 'PQRSDF' ||
            !control_busqueda_panel_ventanilla?._formValues?.tipo_de_solicitud
              ?.label ? (
              <BuscadorPqrsdf
                control_busqueda_panel_ventanilla={
                  control_busqueda_panel_ventanilla
                }
              />
            ) : control_busqueda_panel_ventanilla?._formValues
                ?.tipo_de_solicitud?.label === 'Tramites y servicios' ? (
              <BuscadorTramitesYservicios
                control_busqueda_panel_ventanilla={
                  control_busqueda_panel_ventanilla
                }
              />
            ) : control_busqueda_panel_ventanilla?._formValues
                ?.tipo_de_solicitud?.label === 'Otros' ? (
              <>hola otros</>
            ) : (
              <>hola default</>
            )}

            {/* tambien se debe agregar la opción de otros */}

            {/* Otros */}
            {/* Tramites y servicios  */}
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
