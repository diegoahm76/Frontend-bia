/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type React from 'react';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  IconButton,
  Grid,
  Divider,
  Alert,
  Button,
  Skeleton,
  type SelectChangeEvent,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import SaveIcon from '@mui/icons-material/Save';
import { CustomSelect, Title } from '../../../../../components';
import DialogBusquedaAvanzadaUserOrganigrama from '../DialogBusquedaAvanzadaUserOrganigrama/DialogBusquedaAvanzadaUserOrganigrama';
import { useAppSelector } from '../../../../../hooks';
import { get_tipo_documento } from '../../../../../request';
import { control_error } from '../../../../../helpers';
import { type IList } from '../../../../../interfaces/globalModels';
import { type UserDelegacionOrganigrama } from '../../interfaces/organigrama';
import CleanIcon from '@mui/icons-material/CleaningServices';

import {
  delegar_organigrama_persona,
  get_nuevo_user_organigrama,
  get_organigrams_service,
} from '../../store/thunks/organigramThunks';
import type { FormValues, IProps, keys_object } from './types/types';

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const DialogDelegarOrganigrama = ({
  is_modal_active,
  set_is_modal_active,
}: IProps) => {
  const dispatch = useDispatch();
  const { organigram_current } = useAppSelector((state) => state.organigram);
  const [
    modal_busqueda_avanzada_user_organigram,
    set_modal_busqueda_avanzada_user_organigram,
  ] = useState<boolean>(false);
  const [tipo_documento, set_tipo_documento] = useState('');
  const [tipo_documento_opt, set_tipo_documento_opt] = useState<IList[]>([]);
  const [loading, set_loading] = useState<boolean>(false);
  const [data_user_por_asignar, set_data_user_por_asignar] =
    useState<UserDelegacionOrganigrama>();
  const {
    handleSubmit: handle_submit_search_for_delegation,
    watch: watch_search_for_delegation,
    setValue: set_value_search_for_delegation,
    register: register_search_for_delegation,
    formState: { errors: errors_search_for_delegation },
    reset: reset_search_for_delegation,
  } = useForm<FormValues>();

  const handle_close_delegar_organigrama = (): void => {
    set_is_modal_active(false);
  };

  const on_submit = async (data: FormValues): Promise<void> => {
    set_loading(true);
    try {
      const response = await dispatch(
        get_nuevo_user_organigrama(data.tipo_documento, data.numero_documento)
      );
      set_data_user_por_asignar(response.data);
    } catch (err) {
      control_error(err);
    } finally {
      set_loading(false);
    }
  };

  const handle_submit_delegacion_organigrama = async (): Promise<void> => {
    if (data_user_por_asignar?.id_persona !== null && data_user_por_asignar?.id_persona !== undefined) {
      await dispatch(
        delegar_organigrama_persona(
          data_user_por_asignar?.id_persona,
          organigram_current?.id_organigrama
        )
      );
      handle_close_delegar_organigrama();
      void dispatch(get_organigrams_service());
      reset_search_for_delegation();
    } else {
      control_error('Selecciona usuario para delegación de organigrama');
    }
  };

  const handle_search_result = (data: UserDelegacionOrganigrama): void => {
    set_loading(true);
    reset_search_for_delegation();
    set_data_user_por_asignar(data);
    set_tipo_documento(data.tipo_documento);
    set_loading(false);
  };

  // Establece los valores del formulario
  const set_value_form = (name: string, value: string): void => {
    set_value_search_for_delegation(name as keys_object, value);
  };

  // Cambio inputs
  const handle_change = (e: React.ChangeEvent<HTMLInputElement>): void => {
    set_value_form(e.target.name, e.target.value);
  };

  const on_change = (e: SelectChangeEvent<string>): void => {
    set_value_form(e.target.name, e.target.value);
  };

  const cleaningForm = () => {
    reset_search_for_delegation({
      tipo_documento: '',
      numero_documento: '',
      nombre: '',
    });
    set_value_form('numero_documento', '');
    set_value_form('nombre', '');
    set_data_user_por_asignar(undefined);
    set_tipo_documento('');
  }

  useEffect(() => {
    set_value_form('tipo_documento', tipo_documento);
    set_value_form('numero_documento', '');
  }, [tipo_documento]);

  useEffect(() => {
    if (watch_search_for_delegation('tipo_documento') !== undefined) {
      set_tipo_documento(watch_search_for_delegation('tipo_documento'));
    }
  }, [watch_search_for_delegation('tipo_documento')]);

  const get_selects_options = async (): Promise<void> => {
    set_loading(true);
    try {
      const {
        data: { data: res_tipo_documento },
      } = await get_tipo_documento();
      set_tipo_documento_opt(res_tipo_documento ?? []);
    } catch (err) {
      control_error(err);
    } finally {
      set_loading(false);
    }
  };

  useEffect(() => {
    void get_selects_options();
  }, []);

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="md"
        open={is_modal_active}
        onClose={handle_close_delegar_organigrama}
      >

        <DialogTitle>
          <Grid item xs={12}     >
            <Title title={` Delegación de organigrama `} />
          </Grid>

          <IconButton
            aria-label="close"
            onClick={() => {
              set_is_modal_active(false);
            }}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ mb: '0px' }}>
          <Box>
            <Box>
              <Typography sx={{ mb: '10px' }}>
                Información de organigrama
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  {loading ? (
                    <Skeleton variant="rectangular" width="100%" height={45} />
                  ) : (
                    <TextField
                      fullWidth
                      label="Organigrama"
                      size="small"
                      value={organigram_current?.nombre}
                      disabled={true}
                    />
                  )}
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    fullWidth
                    label="Versión"
                    size="small"
                    value={organigram_current?.version}
                    disabled={true}
                  />
                </Grid>
                <Alert severity="info" sx={{ ml: '15px', mt: '20px' }}>
                  Al seleccionar un nuevo encargado para este organigrama
                  automaticamente ya no tendrá acceso a los permisos para
                  modificar el mismo
                </Alert>
              </Grid>
            </Box>
            <Box sx={{ p: 2, border: '1px dashed grey', mt: '20px' }}>
              <Typography sx={{ mb: '10px' }}>Encargado actual</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <CustomSelect
                    onChange={on_change}
                    label="Tipo de documento *"
                    name="tipo_documento"
                    value={organigram_current?.tipo_documento?.toString() ?? ''}
                    options={tipo_documento_opt}
                    disabled={true}
                    required={false}
                    errors={errors_search_for_delegation}
                    register={register_search_for_delegation}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  {loading ? (
                    <Skeleton variant="rectangular" width="100%" height={45} />
                  ) : (
                    <TextField
                      fullWidth
                      autoFocus
                      label="Número de documento"
                      value={organigram_current?.numero_documento}
                      size="small"
                      disabled={true}
                    />
                  )}
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  {loading ? (
                    <Skeleton variant="rectangular" width="100%" height={45} />
                  ) : (
                    <TextField
                      fullWidth
                      label="Nombre de usuario"
                      size="small"
                      value={organigram_current?.nombre_completo}
                      disabled={true}
                    />
                  )}
                </Grid>
              </Grid>
            </Box>
            <Box
              component="form"
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onSubmit={handle_submit_search_for_delegation(on_submit)}
              sx={{ p: 2, border: '1px dashed grey', mt: '20px' }}
              autoComplete="off"
            >
              <Typography sx={{ mb: '10px' }}>Nuevo encargado</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <CustomSelect
                    onChange={on_change}
                    label="Tipo de documento *"
                    name="tipo_documento"
                    value={tipo_documento}
                    options={tipo_documento_opt}
                    disabled={false}
                    required={false}
                    errors={errors_search_for_delegation}
                    register={register_search_for_delegation}
                  />



                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  {loading ? (
                    <Skeleton variant="rectangular" width="100%" height={45} />
                  ) : (
                    <TextField
                      fullWidth
                      label="Número de documento *"
                      size="small"
                      name='numero_documento'
                      value={data_user_por_asignar?.numero_documento}
                      disabled={false}
                      inputProps={{
                        inputMode: 'numeric',
                        pattern: '[0-9]*',
                      }}
                      error={
                        errors_search_for_delegation.numero_documento?.type ===
                        'required'
                      }
                      helperText={
                        errors_search_for_delegation.numero_documento?.type ===
                          'required'
                          ? 'Este campo es obligatorio'
                          : ''
                      }
                      onChange={handle_change}
                    />
                  )}
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                  <LoadingButton
                    loading={loading}
                    type="submit"
                    fullWidth
                    // loading={false}
                    color="primary"
                    variant="contained"
                    startIcon={<SearchIcon />}
                  >
                    {'BUSCAR'}
                  </LoadingButton>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  {loading ? (
                    <Skeleton variant="rectangular" width="100%" height={45} />
                  ) : (
                    <TextField
                      fullWidth
                      value={data_user_por_asignar?.nombre_completo}
                      // label="Nombre de usuario"
                      size="small"
                      disabled={true}
                    />
                  )}
                </Grid>
              </Grid>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Stack
            direction="row"
            spacing={2}
            sx={{ mr: '15px', mb: '10px', mt: '10px' }}
          >
            <Button
              type="button"
              color="primary"
              variant="outlined"
              onClick={() => {
                // void handle_submit_delegacion_organigrama();
                //  console.log('')('limpiando formulario de datos de asignación de usuario')
                cleaningForm()
              }}
              startIcon={<CleanIcon />}
            >
              LIMPIAR FORMULARIO
            </Button>
            <Button
              color="error"
              variant="contained"
              onClick={handle_close_delegar_organigrama}
              startIcon={<CloseIcon />}
            >
              CERRAR
            </Button>
            <Button
              type="button"
              color="primary"
              variant="contained"
              onClick={() => {
                set_modal_busqueda_avanzada_user_organigram(true);
              }}
              startIcon={<SearchIcon />}
            >
              BUSQUEDA AVANZADA DE USUARIO
            </Button>
            <Button
              type="button"
              variant="contained"
              color="success"
              onClick={() => {
                void handle_submit_delegacion_organigrama();
              }}
              startIcon={<SaveIcon />}
            >
              GUARDAR
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
      <DialogBusquedaAvanzadaUserOrganigrama
        is_modal_active={modal_busqueda_avanzada_user_organigram}
        set_is_modal_active={set_modal_busqueda_avanzada_user_organigram}
        search_result={handle_search_result}
      />
    </>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default DialogDelegarOrganigrama;
