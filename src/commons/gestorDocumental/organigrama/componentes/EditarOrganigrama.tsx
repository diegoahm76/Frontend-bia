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
import { Title } from '../../../../components';
import { OrganigramVisualizerDialog } from './OrganigramVisualizerDialog';
import { type ILevelUnity } from '../interfaces/organigrama';
import useEditarOrganigrama from '../hooks/useEditarOrganigrama';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { to_finalize_organigram_service } from '../store/thunks/organigramThunks';

interface IProps {
  set_position_tab_organigrama: Dispatch<SetStateAction<string>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EditarOrganigrama = ({
  set_position_tab_organigrama,
}: IProps): JSX.Element => {
  const dispatch = useAppDispatch();

  // Estado global
  const [view_organigram, set_view_organigram] = useState(false);
  const {
    organigram_current,
    levels_organigram,
    unity_organigram,
    mold_organigram,
  } = useAppSelector((state) => state.organigram);

  // Hooks
  const {
    control_organigrama,
    handle_submit_organigrama,
    onsubmit_edit_organigrama,
    // default_col_def_organigrama,
    // errors_organigrama,
    columns_nivel,
    orden_nivel,
    title_nivel,
    control_nivel,
    handle_submit_nivel,
    submit_nivel,
    // errors_nivel,
    title_unidades,
    columns_unidades,
    option_nivel,
    control_unidades,
    option_raiz,
    options_agrupacion_d,
    options_tipo_unidad,
    option_unidad_padre,
    submit_unidades,
    handle_submit_unidades,
    set_value_unidades,
    // errors_unidades,
    // onGridReady,
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
    set_position_tab_organigrama('1');
  };

  useEffect(() => {
    console.log(organigram_current.fecha_terminado);
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
            {organigram_current.fecha_terminado !== null ? (
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
                    margin="dense"
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
                        : 'Ingrese nombre'
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
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
                    margin="dense"
                    fullWidth
                    size="small"
                    label="Versión"
                    variant="outlined"
                    disabled={organigram_current.fecha_terminado !== null}
                    value={value}
                    onChange={onChange}
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
            <Grid item xs={12} sm={4}>
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
                    margin="dense"
                    fullWidth
                    size="small"
                    label="Descripcion"
                    variant="outlined"
                    value={value}
                    disabled={organigram_current.fecha_terminado !== null}
                    onChange={onChange}
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
          </Grid>
          <Stack direction="row" justifyContent="flex-end" spacing={2}>
            <Button
              type="submit"
              color="primary"
              variant="outlined"
              disabled={organigram_current.fecha_terminado !== null}
              startIcon={<SaveIcon />}
            >
              EDITAR
            </Button>
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
                      fieldState: { error },
                    }) => (
                      <TextField
                        margin="dense"
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
              onSubmit={handle_submit_unidades(submit_unidades)}
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
                      fieldState: { error },
                    }) => (
                      <TextField
                        margin="dense"
                        fullWidth
                        size="small"
                        label="Código"
                        variant="outlined"
                        disabled={organigram_current.fecha_terminado !== null}
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
                      fieldState: { error },
                    }) => (
                      <TextField
                        margin="dense"
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
                sx={{ mb: '20px' }}
              >
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
        </Stack>

        <OrganigramVisualizerDialog
          is_modal_active={view_organigram}
          set_is_modal_active={set_view_organigram}
        />
      </Grid>
    </>
  );
};
