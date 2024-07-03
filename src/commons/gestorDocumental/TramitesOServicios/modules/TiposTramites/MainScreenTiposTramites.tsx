/* eslint-disable @typescript-eslint/naming-convention */
import {
  Avatar,
  Box,
  Button,
  Chip,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Stack,
  Switch,
  TextField,
  Tooltip,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Title } from '../../../../../components';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { LoadingButton } from '@mui/lab';
import SearchIcon from '@mui/icons-material/Search';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { getCodigosTramites } from './services/getCodigosTramites.service';
import { getTramitesCreados } from './services/getTramitesCreados.service';
import { ModalAndLoadingContext } from '../../../../../context/GeneralContext';
import { RenderDataGrid } from '../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { columnsTramitesU } from './utils/columnsTramites';
import { control_warning } from '../../../../almacen/configuracion/store/thunks/BodegaThunks';
import EditIcon from '@mui/icons-material/Edit';
import { AvatarStyles } from '../../../ccd/componentes/crearSeriesCcdDialog/utils/constant';
import DeleteIcon from '@mui/icons-material/Delete';
import { handleApiError } from '../../../../../utils/functions/errorManage';
import { api } from '../../../../../api/axios';
import { control_success } from '../../../../../helpers';
import  SaveIcon  from '@mui/icons-material/Save';
import  SyncIcon  from '@mui/icons-material/Sync';
import { control_info } from '../../../alertasgestor/utils/control_error_or_success';

// http://localhost:3000/#/app/gestor_documental/tramites/tipos_tramites/
export const MainScreenTiposTramites = (): JSX.Element => {
  //* context
  const {
    handleGeneralLoading,
    generalLoading,
    secondLoading: isEditionMode,
    handleSecondLoading: handleEditionMode,
  } = useContext(ModalAndLoadingContext);

  const [optionsTiposTramites, setOptionsTiposTramites] = useState([]);
  const [listaTramites, setListaTramites] = useState([]);

  useEffect(() => {
    getCodigosTramites().then((data) => {
      console.log(data);
      setOptionsTiposTramites(data);
    });
  }, []);

  const {
    control: controlAdministrarTiposTramites,
    reset: resetAdministrarTiposTramites,
  } = useForm();

  // ? ------------------- FUNCTIONS -------------------

  const createTramite = async () => {
    try {
      handleGeneralLoading(true);
      const url = `tramites/tipos/create/`;
      const dataToSend = {
        cod_tipo_permiso_ambiental:
          controlAdministrarTiposTramites._formValues.cod_tipo_permiso_ambiental
            .value,
        nombre: controlAdministrarTiposTramites._formValues.nombre,
        tiene_pago: controlAdministrarTiposTramites._formValues.tiene_pago ? true : false,
      };

      console.log(dataToSend);

      const { data } = await api.post(url, dataToSend);

      if (data.success) {
        control_success(data.detail);
        getTramitesCreados(
          '',
          controlAdministrarTiposTramites._formValues.tiene_pago ? true : false,
          '',
          handleGeneralLoading
        ).then((data) => {
          console.log(data);
          setListaTramites(data);
          handleEditionMode(false);
          resetAdministrarTiposTramites({
            nombre: '',
            cod_tipo_permiso_ambiental: '',
            tiene_pago: false,
          });
        });
      }
    } catch (err) {
      handleApiError(err);
    } finally {
      handleGeneralLoading(false);
    }
  };

  const editTramite = async (idTramite: number) => {
    try {
      handleGeneralLoading(true);
      const url = `tramites/tipos/update/${idTramite}/`;
      const dataToSend = {
        cod_tipo_permiso_ambiental:
          controlAdministrarTiposTramites._formValues.cod_tipo_permiso_ambiental
            .value,
        nombre: controlAdministrarTiposTramites._formValues.nombre,
        tiene_pago: controlAdministrarTiposTramites._formValues.tiene_pago,
      };

      const { data } = await api.put(url, dataToSend);
      if (data.success) {
        control_success(data.detail);
        getTramitesCreados(
          '',
          controlAdministrarTiposTramites._formValues.tiene_pago,
          '',
          handleGeneralLoading
        ).then((data) => {
          console.log(data);
          setListaTramites(data);
          handleEditionMode(false);
          resetAdministrarTiposTramites({
            nombre: '',
            cod_tipo_permiso_ambiental: '',
            tiene_pago: false,
          });
        });
      }
    } catch (err) {
      handleApiError(err);
    } finally {
      handleGeneralLoading(false);
    }
  };

  // ? ------------------- COLUMNS -------------------
  const columns = [
    ...columnsTramitesU,
    {
      headerName: 'Usado',
      field: 'item_ya_usado',
      minWidth: 100,
      maxWidth: 115,
      flex: 1,
      renderCell: (params: any) =>
        params.row.item_ya_usado === true ? (
          <Chip label="Si" color="error" variant="outlined" />
        ) : (
          <Chip label="No" color="info" variant="outlined" />
        ),
    },
    {
      headerName: 'Registro precargado',
      field: 'registro_precargado',
      minWidth: 130,
      maxWidth: 135,
      flex: 1,
      renderCell: (params: any) =>
        params.row.registro_precargado ? (
          <Chip label="Si" color="error" variant="outlined" />
        ) : (
          <Chip label="No" color="info" variant="outlined" />
        ),
    },
    {
      headerName: 'Acciones',
      field: 'accion',
      minWidth: 150,
      maxWidth: 170,
      flex: 1,
      renderCell: (params: any) => (
        <>
          <Tooltip title="Editar formato tipo de medio">
            <IconButton
              onClick={() => {
                if (
                  params.row.registro_precargado ||
                  params.row.item_ya_usado
                ) {
                  control_warning(
                    'No se puede editar un registro precargado o que ya esta siendo usado'
                  );
                  return;
                }

                resetAdministrarTiposTramites({
                  nombre: params.row.nombre,
                  cod_tipo_permiso_ambiental: {
                    label: params.row.tipo_permiso_ambiental,
                    value: params.row.cod_tipo_permiso_ambiental,
                  },
                  tiene_pago: params.row.tiene_pago,
                  idTramite: params.row.id_permiso_ambiental,
                });

                handleEditionMode(true);
              }}
            >
              <Avatar sx={AvatarStyles} variant="rounded">
                <EditIcon
                  sx={{
                    color:
                      params.row.registro_precargado || params.row.item_ya_usado
                        ? 'gray'
                        : 'orange',
                    width: '18px',
                    height: '18px',
                  }}
                />
              </Avatar>
            </IconButton>
          </Tooltip>

          <Tooltip title="Eliminar trámite">
            <IconButton
              onClick={() => {
                if (
                  params.row.registro_precargado ||
                  params.row.item_ya_usado
                ) {
                  control_warning(
                    'No se puede eliminar un registro precargado o que ya esta siendo usado'
                  );
                  return;
                }

                const deleteFormat = async (params: any) => {
                  try {
                    handleGeneralLoading(true);

                    const url = `tramites/tipos/delete/${params.row.id_permiso_ambiental}/`;
                    const { data } = await api.delete(url);

                    if (data.success) {
                      control_success(data.detail);
                      getTramitesCreados(
                        '',
                        controlAdministrarTiposTramites._formValues.tiene_pago,
                        '',
                        handleGeneralLoading
                      ).then((data) => {
                        console.log(data);
                        setListaTramites(data);
                      });
                    }
                  } catch (err) {
                    handleApiError(err);
                  } finally {
                    handleGeneralLoading(false);
                  }
                };

                void deleteFormat(params);
              }}
            >
              <Avatar sx={AvatarStyles} variant="rounded">
                <DeleteIcon
                  sx={{
                    color:
                      params.row.registro_precargado || params.row.item_ya_usado
                        ? 'gray'
                        : 'red',
                    width: '18px',
                    height: '18px',
                  }}
                />
              </Avatar>
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  // ? ------------------- RENDER -------------------

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
      <Box
        component="form"
        sx={{
          width: '100%',
        }}
        onSubmit={(e: any) => {
          e.preventDefault();
          isEditionMode
            ? editTramite(
                controlAdministrarTiposTramites?._formValues?.idTramite
              )
            : createTramite();
        }}
      >
        <Title title="Administrar tipo de trámites" />
        <DialogContent
          sx={{
            height: '235px',
            mb: '0px',
            justifyContent: 'center',
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="nombre"
                control={controlAdministrarTiposTramites}
                defaultValue=""
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    fullWidth
                    label="Nombre del trámite"
                    size="small"
                    variant="outlined"
                    value={value}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => {
                      onChange(e.target.value);
                    }}
                    error={!!error}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="cod_tipo_permiso_ambiental"
                control={controlAdministrarTiposTramites}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <div>
                    <Select
                      value={value}
                      onChange={(value) => {
                        onChange(value);
                      }}
                      options={optionsTiposTramites}
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
                        Tipo de trámite
                      </small>
                    </label>
                  </div>
                )}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              /*sx={{
                marginBottom: listaTramites?.length === 0 ? '8rem' : '0'
              }}*/
              container
              justifyContent="center"
              alignItems="center"
            >
              <h5>¿Tiene pago?</h5>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Controller
                  name="tiene_pago"
                  control={controlAdministrarTiposTramites}
                  defaultValue=""
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <FormControl fullWidth>
                      <FormControlLabel
                        style={{ marginLeft: 10 }}
                        control={
                          <Switch
                            checked={value}
                            onChange={onChange}
                          />
                        }
                        label={
                          controlAdministrarTiposTramites._formValues
                            .tiene_pago === true
                            ? 'Sí'
                            : 'No'
                        }
                      />
                    </FormControl>
                  )}
                />
              </div>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              justifyContent: 'center',
              //mr: '15px',
              mt: listaTramites?.length === 0 ? '4rem' : '0',
              mb: '10px',
            }}
          >
            <LoadingButton
              loading={generalLoading}
              variant="contained"
              type="submit"
              color="success"
              startIcon={
                isEditionMode ? <SyncIcon /> : <SaveIcon />
              }
            >
              {isEditionMode ? 'ACTUALIZAR TRÁMITE' : 'GUARDAR TRÁMITE'}
            </LoadingButton>
            <LoadingButton
              loading={generalLoading}
              variant="contained"
              startIcon={<SearchIcon />}
              color="primary"
              onClick={async () => {
                await getTramitesCreados(
                  controlAdministrarTiposTramites._formValues.nombre,
                  controlAdministrarTiposTramites._formValues.tiene_pago,
                  controlAdministrarTiposTramites._formValues
                    .cod_tipo_permiso_ambiental.value,
                  handleGeneralLoading
                ).then((data) => {
                  console.log(data);
                  setListaTramites(data);
                });
              }}
            >
              BUSCAR TRÁMITE
            </LoadingButton>
            <Button
              variant="outlined"
              startIcon={<CleanIcon />}
              color="primary"
              onClick={() => {
                resetAdministrarTiposTramites({
                  nombre: '',
                  cod_tipo_permiso_ambiental: '',
                  tiene_pago: false,
                });
                handleEditionMode(false);
                setListaTramites([]);
                control_info('Se han limpiando los campos y se ha reiniciado la búsqueda')
              }}
            >
              LIMPIAR CAMPOS Y REINICAR
            </Button>
          </Stack>
        </DialogActions>

        {listaTramites?.length > 0 && (
          <RenderDataGrid
            title="Trámites encontrados"
            columns={columns ?? []}
            rows={listaTramites ?? []}
          />
        )}
      </Box>
    </Grid>
  );
};
