/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-void */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { useState, useEffect, type SetStateAction, type Dispatch } from 'react';
import Select, { type SingleValue } from 'react-select';
import { Controller } from 'react-hook-form';
import {
  Grid,
  Box,
  Stack,
  Button,
  TextField,
  Typography,
  Chip,
} from '@mui/material';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';

import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Title } from '../../../../../components';
import { OrganigramVisualizerDialog } from '../OrganigramVisualizerDialog/OrganigramVisualizerDialog';
import { type ILevelUnity } from '../../interfaces/organigrama';
import useEditarOrganigrama from '../../hooks/useEditarOrganigrama';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import CleanIcon from '@mui/icons-material/CleaningServices';
import {
  to_finalize_organigram_service,
  to_resume_organigram_service,
} from '../../store/thunks/organigramThunks';
import { control_warning } from '../../../../almacen/configuracion/store/thunks/BodegaThunks';
import { set_special_edit } from '../../store/slices/organigramSlice';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { LoadingButton } from '@mui/lab';
import SyncIcon from '@mui/icons-material/Sync';
import { v4 as uuidv4 } from 'uuid';
import { DownloadButton } from '../../../../../utils/DownloadButton/DownLoadButton';
import { Loader } from '../../../../../utils/Loader/Loader';
import { useFiles } from '../../../../../hooks/useFiles/useFiles';
interface IProps {
  set_position_tab_organigrama: Dispatch<SetStateAction<string>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EditarOrganigrama = ({
  set_position_tab_organigrama,
}: IProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const [view_organigram, set_view_organigram] = useState(false);
  const {
    organigram_current,
    levels_organigram,
    unity_organigram,
    mold_organigram,
    specialEdit,
  } = useAppSelector((state) => state.organigram);

  const { controlar_tamagno_archivos } = useFiles();

  const {
    control_organigrama,
    handle_submit_organigrama,
    onsubmit_edit_organigrama,
    columns_nivel,
    orden_nivel,
    title_nivel,
    control_nivel,
    handle_submit_nivel,
    submit_nivel,
    columns_unidades,
    option_nivel,
    control_unidades,
    option_raiz,
    options_agrupacion_d,
    options_tipo_unidad,
    option_unidad_padre,
    handle_submit_unidades,
    set_value_unidades,
    clean_unitys,
    create_unidad_org_actual,
    create_unidad,
    edit_unidad,
    loadingEdicionOrgan,
    // submit_unidades,
    title_unidades,
    edit_prop_activo_unidad_org,
    loadingLevels,
    dataloading,
  } = useEditarOrganigrama();

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const set_unity_root = (option: SingleValue<any>) => {
    set_value_unidades(
      'unidad_raiz',
      option?.orden === 1
        ? {
            label: 'Si',
            value: true,
          }
        : {
            label: 'No',
            value: false,
          }
    );
    set_value_unidades('nivel_unidad', option);
  };

  const handle_to_go_back = (): void => {
    dispatch(set_special_edit(false));
    set_position_tab_organigrama('1');
  };

  useEffect(() => {
    // //  console.log('')(organigram_current.fecha_terminado);
    if (organigram_current?.id_organigrama === null) {
      set_position_tab_organigrama('1');
    }
  }, []);

  const getFileName = () => {
    const rutaResolucion = control_organigrama._formValues?.ruta_resolucion;

    console.log('------------------RUTAAAA BRO--------------', control_organigrama?._formValues);
    if (!rutaResolucion) {
      return 'Seleccione archivo';
    }

    if (rutaResolucion.name) {
      return rutaResolucion.name;
    }

    const baseUrl =
      process.env.NODE_ENV === 'development'
        ? process.env.REACT_APP_DOWNLOAD_FILES_BETA
        : process.env.REACT_APP_DOWNLOAD_FILES_PROD;

    return rutaResolucion?.replace(new RegExp(`^${baseUrl}/`), '');
  };

  // ...

  return (
    <>
      <Grid item xs={12}>
        <Box sx={{ m: '0 0 20px 0' }}>
          <Typography>
            Estado del organigrama:{' '}
            {organigram_current?.fecha_terminado ? (
              <Chip
                size="small"
                label="Terminado"
                color="success"
                variant="outlined"
              />
            ) : (
              <Chip
                size="small"
                label="En proceso"
                color="warning"
                variant="outlined"
              />
            )}
          </Typography>
        </Box>
        <Box
          component="form"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handle_submit_organigrama(onsubmit_edit_organigrama)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Controller
                name="nombre"
                control={control_organigrama}
                defaultValue=""
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    // margin="dense"
                    fullWidth
                    size="small"
                    label="Nombre"
                    variant="outlined"
                    disabled={organigram_current?.fecha_terminado}
                    value={value}
                    inputProps={{
                      maxLength: 50,
                    }}
                    onChange={(e) => {
                      if (e.target.value.length === 50)
                        control_warning('máximo 50 caracteres');

                      onChange(e.target.value);
                      // //  console.log('')(e.target.value);
                    }}
                    error={!(error == null)}
                    helperText={
                      error != null
                        ? 'Es obligatorio ingresar un nombre'
                        : 'Ingrese nombre'
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <Controller
                name="version"
                control={control_organigrama}
                defaultValue=""
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    // margin="dense"
                    fullWidth
                    size="small"
                    label="Versión"
                    variant="outlined"
                    disabled={organigram_current?.fecha_terminado}
                    value={value}
                    inputProps={{
                      maxLength: 10,
                    }}
                    onChange={(e) => {
                      if (e.target.value.length === 10)
                        control_warning('máximo 10 caracteres');

                      onChange(e.target.value);
                      // //  console.log('')(e.target.value);
                    }}
                    error={!(error == null)}
                    helperText={
                      error != null
                        ? 'Es obligatorio ingresar una versión'
                        : 'Ingrese versión'
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="descripcion"
                control={control_organigrama}
                defaultValue=""
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    // margin="dense"
                    fullWidth
                    size="small"
                    label="Descripcion"
                    variant="outlined"
                    value={value}
                    disabled={organigram_current?.fecha_terminado}
                    inputProps={{
                      maxLength: 255,
                    }}
                    onChange={(e: any) => {
                      if (e.target.value.length === 255)
                        control_warning('máximo 255 caracteres');

                      onChange(e.target.value);
                      // //  console.log('')(e.target.value);
                    }}
                    error={!(error == null)}
                    helperText={
                      error != null
                        ? 'Es obligatorio ingresar una descripción'
                        : 'Ingrese descripción'
                    }
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={3.28}>
              <Controller
                name="ruta_resolucion"
                control={control_organigrama}
                defaultValue=""
                rules={{ required: false }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <>
                    <Button
                      disabled={organigram_current?.fecha_terminado}
                      variant={
                        value === '' || value === null
                          ? 'outlined'
                          : 'contained'
                      }
                      component="label"
                      style={{
                        marginTop: '.15rem',
                        width: '100%',
                      }}
                      startIcon={<CloudUploadIcon />}
                    >
                      {value === '' || value === null
                        ? 'Subir archivo'
                        : 'Archivo subido'}
                      <input
                        style={{ display: 'none' }}
                        type="file"
                        onChange={(e) => {
                          const files = (e.target as HTMLInputElement).files;
                          if (files && files.length > 0) {
                            const file = files[0];
                            controlar_tamagno_archivos(file, onChange);
                          }
                        }}
                      />
                    </Button>
                    <label htmlFor="">
                      <small
                        style={{
                          color: 'rgba(0, 0, 0, 0.6)',
                          fontWeight: 'thin',
                          fontSize: '0.75rem',
                        }}
                      >
                        {getFileName()}
                      </small>
                    </label>
                  </>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={2} sx={{ marginTop: '.15rem' }}>
              {/*<QRCode
                value={`${
                  process.env.NODE_ENV === 'development'
                    ? process.env.REACT_APP_DOWNLOAD_FILES_BETA ||
                      'https://back-end-bia-beta.up.railway.app'
                    : process.env.REACT_APP_DOWNLOAD_FILES_PROD ||
                      'https://bia.cormacarena.gov.co'
                }${organigram_current?.ruta_resolucion}`}
              />*/}
              <DownloadButton
                fileName="ruta_soporte"
                condition={
                  !(
                    control_organigrama._formValues?.ruta_resolucion &&
                    organigram_current?.ruta_resolucion
                  )
                }
                fileUrl={organigram_current?.ruta_resolucion || ''} // default value if null or undefined
              />
            </Grid>
          </Grid>

          <Stack direction="row" justifyContent="flex-end" spacing={2}>
            <LoadingButton
              loading={loadingEdicionOrgan}
              type="submit"
              color="success"
              variant="contained"
              disabled={organigram_current?.fecha_terminado}
              startIcon={<SyncIcon />}
            >
              ACTUALIZAR
            </LoadingButton>
          </Stack>
        </Box>
      </Grid>

      <Grid item xs={12} sx={{ m: '20px 0' }}>
        <Title title="Niveles organizacionales" />
        <Box sx={{ mt: '20px' }}>
          <Grid container spacing={2}>
            {!organigram_current?.fecha_terminado && (
              <Grid item xs={12} sm={4}>
                <Box
                  component="form"
                  // eslint-disable-next-line @typescript-eslint/no-misused-promises
                  onSubmit={handle_submit_nivel(submit_nivel)}
                >
                  <Typography>Nivel {orden_nivel}</Typography>
                  <Controller
                    name="nombre"
                    control={control_nivel}
                    defaultValue=""
                    rules={{ required: true }}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <TextField
                        fullWidth
                        size="small"
                        label="Nombre de nivel"
                        variant="outlined"
                        disabled={organigram_current?.fecha_terminado}
                        value={value}
                        onChange={onChange}
                        error={!(error == null)}
                        helperText={
                          error != null
                            ? 'Es obligatorio ingresar un nombre'
                            : 'Ingrese nombre del nivel'
                        }
                      />
                    )}
                  />
                  <Stack direction="row" justifyContent="flex-end" spacing={2}>
                    <LoadingButton
                      loading={loadingLevels}
                      type="submit"
                      color="success"
                      disabled={organigram_current?.fecha_terminado}
                      variant="contained"
                      startIcon={
                        title_nivel === 'Agregar' ? <AddIcon /> : <EditIcon />
                      }
                    >
                      {title_nivel === 'Agregar'
                        ? 'AGREGAR NIVEL'
                        : 'EDITAR NIVEL'}
                    </LoadingButton>
                  </Stack>
                </Box>
              </Grid>
            )}
            <Grid
              item
              xs={12}
              sm={organigram_current?.fecha_terminado ? 12 : 8}
            >
              <Grid item>
                <Box sx={{ width: '100%' }}>
                  {dataloading ? (
                    <Loader altura={200} />
                  ) : (
                    <DataGrid
                      density="compact"
                      autoHeight
                      rows={levels_organigram}
                      columns={columns_nivel}
                      pageSize={10}
                      rowsPerPageOptions={[5]}
                      experimentalFeatures={{ newEditingApi: true }}
                      getRowId={(row) => row?.id_nivel_organigrama}
                    />
                  )}
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Title title="Unidades organizacionales" />
        <Box sx={{ mt: '20px' }}>
          {!organigram_current?.fecha_terminado && (
            <Box
              component="form"
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onSubmit={(e) => {
                e.preventDefault();
                //  console.log('')(e);
                //  console.log('')('hola sjeje');
                title_unidades === 'Agregar'
                  ? void handle_submit_unidades(create_unidad)(e)
                  : void handle_submit_unidades(edit_unidad)(e);
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={2}>
                  <Controller
                    name="codigo"
                    control={control_unidades}
                    defaultValue=""
                    rules={{ required: true }}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <TextField
                        // margin="dense"
                        fullWidth
                        size="small"
                        label="Código"
                        variant="outlined"
                        inputProps={{
                          maxLength: 10,
                        }}
                        // eslint-disable-next-line eqeqeq
                        disabled={organigram_current?.fecha_terminado}
                        value={value}
                        onChange={onChange}
                        error={!(error == null)}
                        helperText={
                          error != null
                            ? 'Es obligatorio ingresar un código'
                            : 'Ingrese código'
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="nombre"
                    control={control_unidades}
                    defaultValue=""
                    rules={{ required: true }}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <TextField
                        fullWidth
                        size="small"
                        label="Nombre"
                        inputProps={{
                          maxLength: 120,
                        }}
                        variant="outlined"
                        disabled={organigram_current?.fecha_terminado}
                        value={value}
                        onChange={(e) => {
                          onChange(e.target.value);
                          e.target.value.length === 120 &&
                            control_warning('máximo 120 caracteres');
                        }}
                        error={!(error == null)}
                        helperText={
                          error != null
                            ? 'Es obligatorio ingresar un nombre'
                            : 'Ingrese un nombre'
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Controller
                    name="tipo_unidad"
                    control={control_unidades}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        value={field.value}
                        onChange={(option: SingleValue<any>) => {
                          //  console.log('')(option);
                          //  console.log('')('value', field.value);
                          set_value_unidades('tipo_unidad', option);
                        }}
                        options={options_tipo_unidad.map((item) =>
                          item.value !== 'LI' && unity_organigram.length === 0
                            ? { ...item, isDisabled: true }
                            : { ...item, isDisabled: false }
                        )}
                        placeholder="Seleccionar"
                      />
                    )}
                  />
                  <Typography className="label_selects">
                    Tipo de unidad{' '}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Controller
                    name="nivel_unidad"
                    control={control_unidades}
                    rules={{ required: true }}
                    defaultValue={option_nivel[0]}
                    render={({ field }) => (
                      <Select
                        {...field}
                        value={field.value}
                        onChange={(option: SingleValue<ILevelUnity>) => {
                          set_unity_root(option);
                        }}
                        options={option_nivel}
                        placeholder="Seleccionar"
                      />
                    )}
                  />
                  <Typography className="label_selects">
                    Nivel unidad
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Controller
                    name="unidad_raiz"
                    control={control_unidades}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isDisabled={true}
                        value={field.value}
                        options={option_raiz}
                        placeholder="Seleccionar unidad raiz"
                      />
                    )}
                  />
                  <Typography className="label_selects">Unidad raiz</Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Controller
                    name="agrupacion_documental"
                    control={control_unidades}
                    render={({ field }) => (
                      <Select
                        {...field}
                        value={field.value}
                        onChange={(option: SingleValue<any>) => {
                          set_value_unidades('agrupacion_documental', option);
                        }}
                        options={[
                          ...options_agrupacion_d,
                          {
                            label: 'Sin agrupación documental',
                            value: '',
                            isDisabled: false,
                          },
                        ]}
                        placeholder="Seleccionar"
                      />
                    )}
                  />
                  <Typography className="label_selects">
                    Agrupación documental{' '}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Controller
                    name="nivel_padre"
                    control={control_unidades}
                    render={({ field }) => (
                      <Select
                        {...field}
                        value={field.value}
                        onChange={(option: SingleValue<any>) => {
                          set_value_unidades('nivel_padre', option);
                        }}
                        options={option_unidad_padre}
                        placeholder="Seleccionar"
                      />
                    )}
                  />
                  <Typography className="label_selects">Nivel padre</Typography>
                </Grid>
              </Grid>
              <Grid
                container
                justifyContent="flex-end"
                spacing={2}
                sx={{ mb: '20px', mt: '20px' }}
              >
                <Grid item xs={12} sm={4}>
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={clean_unitys}
                    startIcon={<CleanIcon />}
                    fullWidth
                  >
                    LIMPIAR CAMPOS
                  </Button>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <LoadingButton
                    loading={loadingLevels}
                    type="submit"
                    color="success"
                    variant="contained"
                    startIcon={
                      title_unidades === 'Agregar' ? <AddIcon /> : <EditIcon />
                    }
                    fullWidth
                  >
                    {title_unidades === 'Agregar'
                      ? 'AGREGAR UNIDAD'
                      : 'EDITAR UNIDAD'}
                  </LoadingButton>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Button
                    onClick={() => {
                      edit_prop_activo_unidad_org(unity_organigram);
                    }}
                    color="success"
                    variant="outlined"
                    startIcon={<ToggleOnIcon />}
                    fullWidth
                  >
                    DESACTIVAR-ACTIVAR UNIDADES
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>

        {organigram_current?.actual && specialEdit && (
          <Box
            sx={{ mt: '20px' }}
            component="form"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={(e) => {
              e.preventDefault();
              //  console.log('')('jejej siuuuu');
              void handle_submit_unidades(create_unidad_org_actual)(e);
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={2}>
                <Controller
                  name="codigo"
                  control={control_unidades}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      fullWidth
                      size="small"
                      label="Código"
                      variant="outlined"
                      value={value}
                      onChange={onChange}
                      inputProps={{
                        maxLength: 10,
                      }}
                      error={!(error == null)}
                      helperText={
                        error != null
                          ? 'Es obligatorio ingresar un código'
                          : 'Ingrese código'
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="nombre"
                  control={control_unidades}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      fullWidth
                      size="small"
                      label="Nombre"
                      variant="outlined"
                      value={value}
                      onChange={(e) => {
                        onChange(e.target.value);
                        e.target.value.length === 120 &&
                          control_warning('máximo 120 caracteres');
                      }}
                      inputProps={{
                        maxLength: 120,
                      }}
                      error={!(error == null)}
                      helperText={
                        error != null
                          ? 'Es obligatorio ingresar un nombre'
                          : 'Ingrese un nombre'
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <Controller
                  name="tipo_unidad"
                  control={control_unidades}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={field.value}
                      onChange={(option: SingleValue<any>) => {
                        //  console.log('')(option);
                        //  console.log('')('value', field.value);
                        set_value_unidades('tipo_unidad', option);
                      }}
                      options={options_tipo_unidad.map((item) =>
                        item.value !== 'LI' && unity_organigram.length === 0
                          ? { ...item, isDisabled: true }
                          : { ...item, isDisabled: false }
                      )}
                      placeholder="Seleccionar"
                    />
                  )}
                />
                <Typography className="label_selects">
                  Tipo de unidad{' '}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Controller
                  name="nivel_unidad"
                  control={control_unidades}
                  rules={{ required: true }}
                  defaultValue={option_nivel[0]}
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={field.value}
                      onChange={(option: SingleValue<ILevelUnity>) => {
                        set_unity_root(option);
                      }}
                      options={option_nivel}
                      placeholder="Seleccionar"
                    />
                  )}
                />
                <Typography className="label_selects">Nivel unidad</Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Controller
                  name="unidad_raiz"
                  control={control_unidades}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isDisabled={true}
                      value={field.value}
                      options={[{ label: 'No', value: false }]}
                      placeholder="Seleccionar unidad raiz"
                    />
                  )}
                />
                <Typography className="label_selects">Unidad raiz</Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Controller
                  name="agrupacion_documental"
                  control={control_unidades}
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={field.value}
                      onChange={(option: SingleValue<any>) => {
                        // //  console.log('')(option);
                        set_value_unidades('agrupacion_documental', option);
                      }}
                      options={options_agrupacion_d}
                      placeholder="Seleccionar"
                      isDisabled={true}
                    />
                  )}
                />
                <Typography className="label_selects">
                  Agrupación documental{' '}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Controller
                  name="nivel_padre"
                  control={control_unidades}
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={field.value}
                      onChange={(option: SingleValue<any>) => {
                        set_value_unidades('nivel_padre', option);
                      }}
                      options={option_unidad_padre}
                      placeholder="Seleccionar"
                    />
                  )}
                />
                <Typography className="label_selects">Nivel padre</Typography>
              </Grid>
            </Grid>
            <Grid
              container
              justifyContent="flex-end"
              spacing={2}
              sx={{ mb: '20px', mt: '20px' }}
            >
              <Grid item xs={12} sm={4}>
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={clean_unitys}
                  startIcon={<CleanIcon />}
                  fullWidth
                >
                  LIMPIAR CAMPOS
                </Button>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  type="submit"
                  color="success"
                  variant="contained"
                  startIcon={<AddIcon />}
                  fullWidth
                >
                  AGREGAR UNIDAD (GRUPO)
                </Button>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  onClick={() => {
                    edit_prop_activo_unidad_org(unity_organigram);
                  }}
                  color="success"
                  variant="outlined"
                  startIcon={<ToggleOnIcon />}
                  fullWidth
                >
                  DESACTIVAR / ACTIVAR UNIDADES (GRUPO)
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}
        <Grid item>
          <Box sx={{ width: '100%' }}>
            {dataloading ? (
              <Loader altura={150} />
            ) : (
              <DataGrid
                density="compact"
                autoHeight
                rows={unity_organigram}
                columns={columns_unidades}
                pageSize={10}
                rowsPerPageOptions={[5]}
                experimentalFeatures={{ newEditingApi: true }}
                getRowId={(row) => uuidv4()}
              />
            )}
          </Box>
        </Grid>

        <Grid item>
          <Box sx={{ width: '100%' }}></Box>
        </Grid>
        <Grid
          container
          justifyContent="flex-end"
          spacing={2}
          sx={{ mt: '20px' }}
        >
          <Grid item xs={12} sm={3}>
            <Button
              color="primary"
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={handle_to_go_back}
              fullWidth
            >
              VOLVER
            </Button>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button
              disabled={mold_organigram.length === 0}
              color="warning"
              variant="contained"
              startIcon={<VisibilityIcon />}
              onClick={() => {
                dispatch(set_special_edit(false));
                set_view_organigram(true);
              }}
              fullWidth
            >
              VISUALIZAR ORGANIGRAMA
            </Button>
          </Grid>
          {!organigram_current?.fecha_terminado && (
            <Grid item xs={12} sm={3}>
              <Button
                color="success"
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={() => {
                  void dispatch(
                    to_finalize_organigram_service(
                      String(organigram_current?.id_organigrama),
                      set_position_tab_organigrama
                    )
                  );
                }}
                fullWidth
              >
                FINALIZAR
              </Button>
            </Grid>
          )}
          {organigram_current?.fecha_terminado !== null &&
            organigram_current?.id_persona_cargo === null &&
            !organigram_current?.usado && (
              <Grid item xs={12} sm={3}>
                <Button
                  color="success"
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={() => {
                    void dispatch(
                      to_resume_organigram_service(
                        String(organigram_current?.id_organigrama),
                        set_position_tab_organigrama,
                        clean_unitys
                      )
                    );
                  }}
                  fullWidth
                >
                  REANUDAR
                </Button>
              </Grid>
            )}
        </Grid>

        <OrganigramVisualizerDialog
          is_modal_active={view_organigram}
          set_is_modal_active={set_view_organigram}
        />
      </Grid>
    </>
  );
};
