/* eslint-disable @typescript-eslint/naming-convention */
//! libraries or frameworks
import { useContext, useState, useEffect, type FC } from 'react';
import { Controller } from 'react-hook-form';
//* Components Material UI
import { Grid, TextField, Stack, Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import SearchIcon from '@mui/icons-material/Search';
import { Title } from '../../../../components/Title';
import { LoadingButton } from '@mui/lab';
// * react select
import Select from 'react-select';

import { ModalContextTRD } from '../context/ModalsContextTrd';
import { ModalSearchTRD } from '../components/ModalBusqueda/ModalSearchTRD';
import { useAppDispatch, useAppSelector } from '../../../../hooks';

// Íconos
import SyncIcon from '@mui/icons-material/Sync';
import CleanIcon from '@mui/icons-material/CleaningServices';

//* personalized hook
import { use_trd } from '../hooks/use_trd';

//* thunks
import {
  create_trd_service,
  getServiceSeriesSubseriesXUnidadOrganizacional,
  update_trd_service
} from '../toolkit/TRDResources/thunks/TRDResourcesThunks';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ModalCCDUsados } from '../components/ModalCCDSUsados/ModalCCDSUsados';
import { control_error } from '../../../../helpers';
import { CCDSeleccionadoCatalogo } from '../components/CCDSeleccionadoCatalogo/CCDSeleccionadoCatalogo';

export const TrdScreen: FC = (): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();
  // ? redux toolkit - values
  const { trd_current } = useAppSelector((state: any) => state.trd_slice);

  //! use_trd hook
  const {
    // ? create_trd_modal - ccd, name and version
    control_create_trd_modal,
    // handle_submit_create_trd_modal,
    data_create_trd_modal,

    // ? list of finished ccd
    list_finished_ccd,

    // ? clean searched trd
    // reset_create_trd_modal,

    // ? reset all
    reset_all_trd
  } = use_trd();
  // const dispatch = useDispatch();

  //* neccesary hook useState for the code

  const [flag_finish_or_or_edit_trd, set_flag_finish_or_edit_trd] =
    useState<boolean>(false);

  //* neccesary hook useEffect for the code in this module or component

  useEffect(() => {
    set_flag_finish_or_edit_trd(
      trd_current?.fecha_terminado !== null &&
        trd_current?.fecha_terminado !== '' &&
        trd_current?.fecha_terminado !== undefined
    );
    console.log(
      '🚀 CcdScreen.tsx ~ 45 ~ useEffect ~ trd_current?.fecha_terminado',
      trd_current?.fecha_terminado
    );
  }, [trd_current?.fecha_terminado]);

  // ? modal context
  const { openModalModalSearchTRD, openModalCCDUsados } =
    useContext(ModalContextTRD);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const onSubmit = () => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!data_create_trd_modal.nombre) {
      control_error('datos requeridos');
      return;
    }
    trd_current != null
      ? dispatch(update_trd_service(data_create_trd_modal))
      : dispatch(create_trd_service(data_create_trd_modal));
  };

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
          boxShadow: '0px 3px 6px #042F4A26'
        }}
      >
        <Grid item xs={12}>
          <Title title="TRD - ( Tabla de retención documental )" />
          <form
            onSubmit={(w) => {
              w.preventDefault();
              onSubmit();
            }}
            style={{
              marginTop: '20px'
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}
                sx={{
                  zIndex: 2
                }}
              >
                {/* <label className="text-terciary">
                  Lista de ccds terminadoss
                  <samp className="text-danger">*</samp>
                </label> */}
                {/* In this selection, I want to select the cdd id to make the post request to create a TRD */}
                <Controller
                  name="id_ccd"
                  control={control_create_trd_modal}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <div>
                      <Select
                        value={value}
                        // name="id_ccd"
                        onChange={(selectedOption) => {
                          dispatch(
                            getServiceSeriesSubseriesXUnidadOrganizacional(
                              selectedOption.item
                            )
                          );
                          onChange(selectedOption);
                        }}
                        isDisabled={trd_current != null}
                        options={list_finished_ccd}
                        placeholder="Seleccionar"
                      />
                      <label>
                        <small
                          style={{
                            color: 'rgba(0, 0, 0, 0.6)',
                            fontWeight: 'thin',
                            fontSize: '0.75rem',
                            marginTop: '0.25rem',
                            marginLeft: '0.25rem'
                          }}
                        >
                          {trd_current != null
                            ? `CCD seleccionado`
                            : `CDD's no usados en otro TRD`}
                        </small>
                      </label>
                    </div>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Controller
                  name="nombre"
                  control={control_create_trd_modal}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <TextField
                      margin="dense"
                      fullWidth
                      // name="nombre"
                      label="Nombre del TRD"
                      helperText={
                        trd_current != null
                          ? 'Actualice el nombre'
                          : 'Ingrese nombre'
                      }
                      size="small"
                      variant="outlined"
                      value={value}
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => {
                        onChange(e.target.value);
                        console.log(e.target.value);
                      }}
                      // error={!!error}
                      /* helperText={
                        error
                          ? 'Es obligatorio subir un archivo'
                          : 'Seleccione un archivo'
                      } */
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Controller
                  name="version"
                  control={control_create_trd_modal}
                  defaultValue=""
                  // rules={{ required: false }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <TextField
                      margin="dense"
                      fullWidth
                      // name="version"
                      label="Versión del TRD"
                      helperText={
                        trd_current != null
                          ? 'Actualice la versión'
                          : 'Ingrese versión'
                      }
                      size="small"
                      variant="outlined"
                      value={value}
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => {
                        onChange(e.target.value);
                        console.log(e.target.value);
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
              <Button
                color="warning"
                variant="contained"
                startIcon={<VisibilityIcon />}
                onClick={openModalCCDUsados}
              >
                {`VER CCD'S USADOS`}
              </Button>
              <Button
                color="primary"
                variant="outlined"
                startIcon={<SearchIcon />}
                onClick={openModalModalSearchTRD}
              >
                BUSCAR TRD
              </Button>
              <LoadingButton
                // loading={loadingButton}
                type="submit"
                color="primary"
                variant="contained"
                startIcon={trd_current != null ? <SyncIcon /> : <SaveIcon />}
              >
                {trd_current != null ? 'ACTUALIZAR TRD' : 'CREAR TRD'}
              </LoadingButton>

              <Button
                color="success"
                variant="contained"
                startIcon={<CleanIcon />}
                onClick={() => {
                  reset_all_trd();
                  console.log('reset_create_trd_modal');
                  // setTrdCurrent(null);
                }}
              >
                LIMPIAR CAMPOS
              </Button>
            </Stack>
          </form>

          {/* data table with the "catalogo de series y subseries por unidad organizacional" */}
          <CCDSeleccionadoCatalogo />
          {/* finish data table with the "catalogo de series y subseries por unidad organizacional" */}
          <Stack
            direction="row"
            justifyContent="flex-end"
            spacing={2}
            sx={{ m: '20px 0' }}
          >
            <Button
              color="success"
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={() => {
                if (flag_finish_or_or_edit_trd) {
                  set_flag_finish_or_edit_trd(false);
                  console.log('TRD reanudado');
                } else {
                  set_flag_finish_or_edit_trd(true);
                  console.log('TRD finalizado');
                }
              }}
            >
              {
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                flag_finish_or_or_edit_trd ? 'REANUDAR TRD' : 'FINALIZAR TRD'
              }
            </Button>
          </Stack>
        </Grid>
      </Grid>
      {/* -- this modal allow us to do the TRD search  -- */}
      <ModalSearchTRD />
      {/* -- this modal allow us to do the TRD search -- */}

      {/* -- this modal allow us to see the ccds used in other TRD -- */}
      <ModalCCDUsados />
      {/* -- this modal allow us to see the ccds used in other TRD -- */}
    </>
  );
};
