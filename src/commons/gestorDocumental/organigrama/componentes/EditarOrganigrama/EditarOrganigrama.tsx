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
  Chip
  // MenuItem,
  // InputLabel,
  // FormControl,
} from '@mui/material';

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
  to_resume_organigram_service
} from '../../store/thunks/organigramThunks';
import { control_warning } from '../../../../almacen/configuracion/store/thunks/BodegaThunks';
import { set_special_edit } from '../../store/slices/organigramSlice';
import { FILEWEIGHT } from '../../../../../fileWeight/fileWeight';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import { DownloadButton } from '../../../../../utils/DownloadButton/DownLoadButton';
import { LoadingButton } from '@mui/lab';
import SyncIcon from '@mui/icons-material/Sync';
interface IProps {
  set_position_tab_organigrama: Dispatch<SetStateAction<string>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EditarOrganigrama = ({
  set_position_tab_organigrama
}: IProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const [view_organigram, set_view_organigram] = useState(false);
  const {
    organigram_current,
    levels_organigram,
    unity_organigram,
    mold_organigram,
    specialEdit
  } = useAppSelector((state) => state.organigram);

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
    create_unidad,
    edit_unidad,
    loadingEdicionOrgan,
    // submit_unidades,
    title_unidades
  } = useEditarOrganigrama();

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const set_unity_root = (option: SingleValue<any>) => {
    set_value_unidades(
      'unidad_raiz',
      option?.orden === 1
        ? {
            label: 'Si',
            value: true
          }
        : {
            label: 'No',
            value: false
          }
    );
    set_value_unidades('nivel_unidad', option);
  };

  const handle_to_go_back = (): void => {
    dispatch(set_special_edit(false));
    set_position_tab_organigrama('1');
  };

  useEffect(() => {
    // console.log(organigram_current.fecha_terminado);
    if (organigram_current.id_organigrama === null) {
      set_position_tab_organigrama('1');
    }
  }, []);

  return (
    <>
      <Grid item xs={12}>
        <Box sx={{ m: '0 0 20px 0' }}>
          <Typography>
            Estado del organigrama:{' '}
            {organigram_current.fecha_terminado ? (
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
                  fieldState: { error }
                }) => (
                  <TextField
                    // margin="dense"
                    fullWidth
                    size="small"
                    label="Nombre"
                    variant="outlined"
                    disabled={organigram_current.fecha_terminado !== null}
                    value={value}
                    inputProps={{
                      maxLength: 50
                    }}
                    onChange={(e) => {
                      if (e.target.value.length === 50)
                        control_warning('máximo 50 caracteres');

                      onChange(e.target.value);
                      // console.log(e.target.value);
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
                  fieldState: { error }
                }) => (
                  <TextField
                    // margin="dense"
                    fullWidth
                    size="small"
                    label="Versión"
                    variant="outlined"
                    disabled={organigram_current.fecha_terminado !== null}
                    value={value}
                    inputProps={{
                      maxLength: 10
                    }}
                    onChange={(e) => {
                      if (e.target.value.length === 10)
                        control_warning('máximo 10 caracteres');

                      onChange(e.target.value);
                      // console.log(e.target.value);
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
                  fieldState: { error }
                }) => (
                  <TextField
                    // margin="dense"
                    fullWidth
                    size="small"
                    label="Descripcion"
                    variant="outlined"
                    value={value}
                    disabled={organigram_current.fecha_terminado !== null}
                    inputProps={{
                      maxLength: 255
                    }}
                    onChange={(e: any) => {
                      if (e.target.value.length === 255)
                        control_warning('máximo 255 caracteres');

                      onChange(e.target.value);
                      // console.log(e.target.value);
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
                  fieldState: { error }
                }) => (
                  <>
                    <Button
                      disabled={organigram_current.fecha_terminado !== null}
                      variant={
                        value === '' || value === null
                          ? 'outlined'
                          : 'contained'
                      }
                      component="label"
                      style={{
                        marginTop: '.15rem',
                        width: '100%'
                      }}
                      startIcon={<CloudUploadIcon />}
                    >
                      {value === '' || value === null
                        ? 'Subir archivo'
                        : 'Archivo subido'}
                      <input
                        style={{ display: 'none' }}
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => {
                          const files = (e.target as HTMLInputElement).files;
                          if (files && files.length > 0) {
                            const file = files[0];
                            if (file.type !== 'application/pdf') {
                              control_warning(
                                'Precaución: Solo es admitido archivos en formato pdf'
                              );
                            } else if (file.size > FILEWEIGHT.PDF) {
                              const MAX_FILE_SIZE_MB = (
                                FILEWEIGHT.PDF /
                                (1024 * 1024)
                              ).toFixed(1);
                              control_warning(
                                `Precaución: El archivo es demasiado grande. El tamaño máximo permitido es ${MAX_FILE_SIZE_MB} MB.`
                              );
                            } else {
                              onChange(file);
                            }
                          }
                        }}
                      />
                    </Button>
                    <label htmlFor="">
                      <small
                        style={{
                          color: 'rgba(0, 0, 0, 0.6)',
                          fontWeight: 'thin',
                          fontSize: '0.75rem'
                        }}
                      >
                        {control_organigrama._formValues.ruta_resolucion
                          ? control_organigrama._formValues.ruta_resolucion
                              .name ??
                            control_organigrama._formValues.ruta_resolucion.replace(
                              /https?:\/\/back-end-bia-beta\.up\.railway\.app\/media\//,
                              ''
                            )
                          : 'Seleccione archivo'}
                      </small>
                    </label>
                  </>
                )}
              />
            </Grid>

            {/* <Grid item xs={12} sm={2} sx={{ marginTop: '.15rem' }}>
              <DownloadButton
                fileName="ruta_soporte"
                condition={
                  organigram_current?.ruta_resolucion === null ||
                  organigram_current?.ruta_resolucion === ''
                }
                fileUrl={control_organigrama._formValues.ruta_resolucion}
              />
            </Grid> */}
          </Grid>

          <Stack direction="row" justifyContent="flex-end" spacing={2}>
            <LoadingButton
              loading={loadingEdicionOrgan}
              type="submit"
              color="primary"
              variant="outlined"
              disabled={organigram_current.fecha_terminado !== null}
              startIcon={<SyncIcon />}
            >
              EDITAR
            </LoadingButton>
          </Stack>
        </Box>
      </Grid>

      <Grid item xs={12} sx={{ m: '20px 0' }}>
        <Title title="Niveles organizacionales" />
        <Box sx={{ mt: '20px' }}>
          <Grid container spacing={2}>
            {organigram_current.fecha_terminado === null && (
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
                      fieldState: { error }
                    }) => (
                      <TextField
                        // margin="dense"
                        fullWidth
                        size="small"
                        label="Nombre de nivel"
                        variant="outlined"
                        disabled={organigram_current.fecha_terminado !== null}
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
                    <Button
                      type="submit"
                      color="primary"
                      disabled={organigram_current.fecha_terminado !== null}
                      variant="outlined"
                      startIcon={
                        title_nivel === 'Agregar' ? <AddIcon /> : <EditIcon />
                      }
                    >
                      {title_nivel === 'Agregar' ? 'AGREGAR' : 'EDITAR'}
                    </Button>
                  </Stack>
                </Box>
              </Grid>
            )}
            <Grid
              item
              xs={12}
              sm={organigram_current.fecha_terminado !== null ? 12 : 8}
            >
              <Grid item>
                <Box sx={{ width: '100%' }}>
                  <DataGrid
                    density="compact"
                    autoHeight
                    rows={levels_organigram}
                    columns={columns_nivel}
                    pageSize={10}
                    rowsPerPageOptions={[5]}
                    experimentalFeatures={{ newEditingApi: true }}
                    getRowId={(row) => row.id_nivel_organigrama}
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Title title="Unidades organizacionales" />
        <Box sx={{ mt: '20px' }}>
          {organigram_current.fecha_terminado === null && (
            <Box
              component="form"
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onSubmit={(e) => {
                e.preventDefault();
                console.log(e)
                title_unidades === 'Agregar'
                  ? void handle_submit_unidades(create_unidad)(e)
                  : void handle_submit_unidades(edit_unidad)(e);
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                  <Controller
                    name="codigo"
                    control={control_unidades}
                    defaultValue=""
                    rules={{ required: true }}
                    render={({
                      field: { onChange, value },
                      fieldState: { error }
                    }) => (
                      <TextField
                        // margin="dense"
                        fullWidth
                        size="small"
                        label="Código"
                        variant="outlined"
                        // eslint-disable-next-line eqeqeq
                        disabled={
                          organigram_current.fecha_terminado !== null
                        }
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
                <Grid item xs={12} sm={3}>
                  <Controller
                    name="nombre"
                    control={control_unidades}
                    defaultValue=""
                    rules={{ required: true }}
                    render={({
                      field: { onChange, value },
                      fieldState: { error }
                    }) => (
                      <TextField
                        // margin="dense"
                        fullWidth
                        size="small"
                        label="Nombre"
                        variant="outlined"
                        disabled={organigram_current.fecha_terminado !== null}
                        value={value}
                        onChange={onChange}
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
                <Grid item xs={12} sm={3}>
                  <Controller
                    name="tipo_unidad"
                    control={control_unidades}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        value={field.value}
                        onChange={(option: SingleValue<any>) => {
                          console.log(option);
                          console.log('value', field.value);
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
                <Grid item xs={12} sm={3}>
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
                        options={options_agrupacion_d}
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
              <Stack
                direction="row"
                justifyContent="flex-end"
                spacing={2}
                sx={{ mb: '20px', mt: '20px' }}
              >
                <Button
                  // type="submit"
                  color="success"
                  variant="contained"
                  // disabled={organigram_current.fecha_terminado !== null}
                  onClick={clean_unitys}
                  startIcon={<CleanIcon />}
                >
                  LIMPIAR CAMPOS
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  variant="outlined"
                  startIcon={
                    title_unidades === 'Agregar' ? <AddIcon /> : <EditIcon />
                  }
                >
                  {title_unidades === 'Agregar' ? 'AGREGAR' : 'EDITAR'}
                </Button>
              </Stack>
            </Box>
          )}
        </Box>

        {organigram_current.actual && specialEdit && (
          <Box
            component="form"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={(e) => {
              e.preventDefault();
              void handle_submit_unidades(create_unidad)(e)
             /* title_unidades === 'Agregar'
                ? void handle_submit_unidades(create_unidad)(e)
                : void handle_submit_unidades(edit_unidad)(e); */
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <Controller
                  name="codigo"
                  control={control_unidades}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <TextField
                      // margin="dense"

                      fullWidth
                      size="small"
                      label="Código"
                      variant="outlined"
                      // eslint-disable-next-line eqeqeq
                      /*  disabled={
                          organigram_current.fecha_terminado !== null ||
                          title_unidades !== 'Agregar'
                        } */
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
              <Grid item xs={12} sm={3}>
                <Controller
                  name="nombre"
                  control={control_unidades}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <TextField
                      // margin="dense"

                      fullWidth
                      size="small"
                      label="Nombre"
                      variant="outlined"
                      // disabled={organigram_current.fecha_terminado !== null}
                      value={value}
                      onChange={onChange}
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
              <Grid item xs={12} sm={3}>
                <Controller
                  name="tipo_unidad"
                  control={control_unidades}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={field.value}
                      onChange={(option: SingleValue<any>) => {
                        console.log(option);
                        console.log('value', field.value);
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
              <Grid item xs={12} sm={3}>
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
            <Stack
              direction="row"
              justifyContent="flex-end"
              spacing={2}
              sx={{ mb: '20px', mt: '20px' }}
            >
              <Button
                // type="submit"
                color="success"
                variant="contained"
                // disabled={organigram_current.fecha_terminado !== null}
                onClick={clean_unitys}
                startIcon={<CleanIcon />}
              >
                LIMPIAR CAMPOS
              </Button>
              <Button
                type="submit"
                color="primary"
                variant="outlined"
                startIcon={
                  title_unidades === 'Agregar' ? <AddIcon /> : <EditIcon />
                }
              >
                {title_unidades === 'Agregar' ? 'AGREGAR' : 'EDITAR'}
              </Button>
            </Stack>
          </Box>
        )}

        <Grid item>
          <Box sx={{ width: '100%' }}>
            <DataGrid
              density="compact"
              autoHeight
              rows={unity_organigram}
              columns={columns_unidades}
              pageSize={10}
              rowsPerPageOptions={[5]}
              experimentalFeatures={{ newEditingApi: true }}
              getRowId={(row) => row.id_unidad_organizacional}
            />
          </Box>
        </Grid>
        <Stack
          direction="row"
          justifyContent="flex-end"
          spacing={2}
          sx={{ mt: '20px' }}
        >
          <Button
            color="primary"
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={handle_to_go_back}
          ></Button>
          <Button
            disabled={mold_organigram.length === 0}
            color="primary"
            variant="contained"
            startIcon={<VisibilityIcon />}
            onClick={() => {
              dispatch(set_special_edit(false));
              set_view_organigram(true);
            }}
          >
            VER
          </Button>
          {organigram_current.fecha_terminado === null && (
            <Button
              color="success"
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={() => {
                void dispatch(
                  to_finalize_organigram_service(
                    String(organigram_current.id_organigrama),
                    set_position_tab_organigrama
                  )
                );
              }}
            >
              FINALIZAR
            </Button>
          )}
          {organigram_current.fecha_terminado !== null &&
            organigram_current.id_persona_cargo === null &&
            !organigram_current.usado && (
              <Button
                color="success"
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={() => {
                  void dispatch(
                    to_resume_organigram_service(
                      String(organigram_current.id_organigrama)
                    )
                  );
                }}
              >
                REANUDAR
              </Button>
            )}
        </Stack>

        <OrganigramVisualizerDialog
          is_modal_active={view_organigram}
          set_is_modal_active={set_view_organigram}
        />
      </Grid>
    </>
  );
};
