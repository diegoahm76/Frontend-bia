/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoadingButton } from '@mui/lab';
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Title } from '../../../../../components/Title';
import { Controller, useForm } from 'react-hook-form';
import { control_error } from '../../../../../helpers';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import EditIcon from '@mui/icons-material/Edit';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import SearchIcon from '@mui/icons-material/Search';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { control_warning } from '../../../../almacen/configuracion/store/thunks/BodegaThunks';
import Select from 'react-select';
import { getExpedientesByFiltro } from '../services/getExpedientes.service';

export const BuscarExpedienteIndicesElectronicos = (
  props: any
): JSX.Element => {
  const { setData, setXmlToJsonisTrue, setDataIndice } = props;


  const [loading, setLoadingButton] = useState<boolean>(false)
  // const { expedientes } = useAppSelector((state) => state.cierre_expedientes);
  // const dispatch = useAppDispatch();

  /*
    useEffect(() => {
        void dispatch(get_trd())
        void dispatch(get_tipologias())
    }, [])*/


  // ! use form declaration
  const {
    control: controlBusquedaExpediente,
    reset: resetBusquedaExpediente,
    watch: watchBusquedaExpediente,
  } = useForm({});

  const exeWatch = watchBusquedaExpediente();

  const onSubmitElectronicIndex: any = async (): Promise<any> => {
    try {
      const getExpedientes = await getExpedientesByFiltro(setLoadingButton);
      setData(getExpedientes);
      console.log('getExpedientes', getExpedientes);
    } catch (error) {
      console.error(error);
      control_error('No se ha encontrado un expediente que coincida');
    }
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
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item xs={12}>
          <Title title="Buscar expediente" />
          <form
            onSubmit={(w) => {
              w.preventDefault();
              // onSubmit();
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
                  mt: '.7rem',
                  mb: '.7rem',
                }}
              >
                <Controller
                  name="titulo_expediente"
                  control={controlBusquedaExpediente}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      required
                      fullWidth
                      label="Titulo del expediente"
                      size="small"
                      variant="outlined"
                      value={value}
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => {
                        onChange(e.target.value);
                        e.target.value.length === 50 &&
                          control_warning('máximo 50 caracteres');
                      }}
                      inputProps={{ maxLength: 50 }}
                    />
                  )}
                />
              </Grid>

              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  mt: '.7rem',
                  mb: '.7rem',
                }}
              >
                <Controller
                  name="fecha_apertura_expediente"
                  control={controlBusquedaExpediente}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      required
                      fullWidth
                      label="Año de apertura del expediente"
                      size="small"
                      variant="outlined"
                      value={value}
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => {
                        onChange(e.target.value);
                        e.target.value.length === 50 &&
                          control_warning('máximo 50 caracteres');
                        // //  console.log('')(e.target.value);
                      }}
                      inputProps={{ maxLength: 50 }}
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

              <Grid
                item
                xs={12}
                sm={4}
                sx={{
                  zIndex: 2,
                  mt: '.7rem',
                  mb: '.7rem',
                }}
              >
                {/* In this selection, I want to select the cdd id to make the post request to create a TRD */}
                <Controller
                  name="id_trd_origen"
                  control={controlBusquedaExpediente}
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
                          /* dispatch(
                            getServiceSeriesSubseriesXUnidadOrganizacional(
                              selectedOption.item
                            )
                          );*/
                          onChange(selectedOption);
                        }}
                        options={[]}
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
                          TRD origen
                        </small>
                      </label>
                    </div>
                  )}
                />
              </Grid>

              <Grid
                item
                xs={12}
                sm={4}
                sx={{
                  zIndex: 2,
                  mt: '.7rem',
                  mb: '.7rem',
                }}
              >
                {/* In this selection, I want to select the cdd id to make the post request to create a TRD */}
                <Controller
                  name="id_serie_origen"
                  control={controlBusquedaExpediente}
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
                          /* dispatch(
                            getServiceSeriesSubseriesXUnidadOrganizacional(
                              selectedOption.item
                            )
                          );*/
                          onChange(selectedOption);
                        }}
                        options={[]}
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
                          Serie origen
                        </small>
                      </label>
                    </div>
                  )}
                />
              </Grid>

              <Grid
                item
                xs={12}
                sm={4}
                sx={{
                  zIndex: 2,
                  mt: '.7rem',
                  mb: '.7rem',
                }}
              >
                {/* In this selection, I want to select the cdd id to make the post request to create a TRD */}
                <Controller
                  name="id_subserie_origen"
                  control={controlBusquedaExpediente}
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
                          /* dispatch(
                            getServiceSeriesSubseriesXUnidadOrganizacional(
                              selectedOption.item
                            )
                          );*/
                          onChange(selectedOption);
                        }}
                        options={[]}
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
                          Subserie origen
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
              sx={{ mb: '1.5rem', mt: '1.5rem' }}
            >
              <LoadingButton
                loading={loading}
                color="primary"
                variant="contained"
                startIcon={<SearchIcon />}
                onClick={() => {
                  onSubmitElectronicIndex()
                }}
              >
                BUSCAR EXPEDIENTE
              </LoadingButton>

              <Button
                color="primary"
                variant="outlined"
                startIcon={<CleanIcon />}
                onClick={() => {
                  resetBusquedaExpediente({});
                  setData([]);
                  setDataIndice([]);
                  setXmlToJsonisTrue({});
                }}
              >
                LIMPIAR CAMPOS
              </Button>
            </Stack>
          </form>
        </Grid>
      </Grid>
    </>
  );
};
