/* eslint-disable @typescript-eslint/no-misused-promises */

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  type SelectChangeEvent,
  Skeleton,
  Stack,
  TextField,
} from '@mui/material';
import { Title } from '../../../../../components/Title';
import { CustomSelect } from '../../../../../components';
import { useAppDispatch } from '../../../../../hooks';
import {
  cambio_ccd_actual,
  get_ccds_posibles,
} from '../../../ccd/store/thunks/ccdThunks';
import { type IList } from '../../../../../interfaces/globalModels';
import { ccds_choise_adapter } from '../../adapters/organigrama_adapters';
import { initial_state } from './utils/constants';
import type { CCD, FormValues, IProps, keys_object } from './types/types';
import { control_error } from '../../../../../helpers';
import { get_organigrama_actual } from '../../store/thunks/organigramThunks';

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const DialogCcdActual = ({ is_modal_active, set_is_modal_active }: IProps) => {
  const fecha_actual = dayjs().format('YYYY-MM-DD');

  const dispatch = useAppDispatch();

  const [loading, set_loading] = useState<boolean>(false);
  const [data_ccds_posibles, set_data_ccds_posibles] = useState<CCD[]>([]);
  const [ccd_selected, set_ccd_selected] = useState<string>('');
  const [list_ccds, set_list_ccds] = useState<IList[]>([
    {
      label: '',
      value: 0,
    },
  ]);
  const [data_asociada_ccd, set_data_asociada_ccd] = useState<CCD | undefined>(
    initial_state
  );

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const {
    handleSubmit: handle_submit,
    register: register_elegir_organigrama_actual,
    getValues: get_values_elegir_organigrama_actual,
    setValue: set_value_elegir_organigrama_actual,
    reset: reset_elegir_organigrama_actual,
    formState: { errors: errors_elegir_organigrama_actual },
  } = useForm<FormValues>();

  const handle_close_dialog = (): void => {
    reset_elegir_organigrama_actual();
    set_ccd_selected('');
    set_data_asociada_ccd(initial_state);
    set_is_modal_active(false);
  };

  const on_submit = async (data: FormValues): Promise<void> => {
    const data_cambio = {
      justificacion: get_values_elegir_organigrama_actual('justificacion'),
      id_ccd: get_values_elegir_organigrama_actual('ccd'),
    };
    await dispatch(cambio_ccd_actual(data_cambio));
    handle_close_dialog();
  };

  // 1.0 Ejecutar funcion para traer data organigramas posibles y organigrama actual
  useEffect(() => {
    if (is_modal_active) {
      void get_list_ccds();
    }
  }, [is_modal_active]);

 
 // 1.1 Traer data
const get_list_ccds = async (): Promise<void> => {
    set_loading(true);
    try {
      const { data } = await dispatch(get_organigrama_actual());
      // console.log(typeof data.id_organigrama, 'organigramaActualData');
  
      const response_ccds = await dispatch(get_ccds_posibles(String(data.id_organigrama /* 54   */)));
      //* se realiza prueba con el organigrama 54 ya que el organigrama con id 58 no tiene CCD's disponibles
      // console.log('response_ccds', response_ccds);
  
      if (Array.isArray(response_ccds.data) && response_ccds.data.length > 0) {
        set_data_ccds_posibles(response_ccds.data);
        const res_ccds_adapter: IList[] = await ccds_choise_adapter(response_ccds.data);
        // console.log('res_ccds_adapter', res_ccds_adapter);
        set_list_ccds(res_ccds_adapter);
      } else {
        control_error("Sin CCD's disponibles para activación en el organigrama actual");
      }
    } catch (err) {
      control_error(err);
    } finally {
      set_loading(false);
    }
  };
  // 4. Filtrar ccd seleccionado para mostrar datos de trd y tca
  useEffect(() => {
    if (ccd_selected !== undefined && ccd_selected !== '') {
      const result_filter = data_ccds_posibles.find(
        (ccds: CCD) => ccds.id_ccd === ccd_selected
      );
      set_data_asociada_ccd(result_filter);
    }
  }, [ccd_selected]);

  const on_change = (e: SelectChangeEvent<string>): void => {
    set_value_form(e.target.name, e.target.value);
  };

  // Establece los valores del formulario
  const set_value_form = (name: string, value: string): void => {
    if (name === 'ccd') {
      set_ccd_selected(value);
    }
    set_value_elegir_organigrama_actual(name as keys_object, value);
  };

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={is_modal_active}
      onClose={handle_close_dialog}
    >
      <Box component="form" onSubmit={handle_submit(on_submit)}>
        <DialogTitle>
          Activación de Cuadro clasificación documental e instrumentos
          archivisticos
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
          <Title title="Cuadros de clasificación documental asociado" />
          <Grid container spacing={2} sx={{ mt: '5px', mb: '20px' }}>
            <Grid item xs={12} md={4}>
              <CustomSelect
                onChange={on_change}
                label="Cuadros de clasificación documental*"
                name="ccd"
                value={ccd_selected}
                options={list_ccds}
                disabled={false}
                required={true}
                errors={errors_elegir_organigrama_actual}
                register={register_elegir_organigrama_actual}
              />
            </Grid>
          </Grid>
          {ccd_selected !== undefined && ccd_selected !== '' && (
            <>
              <Title title="Tabla de retención asociada" />
              <Grid container spacing={2} sx={{ mt: '5px', mb: '20px' }}>
                <Grid item xs={12} md={4}>
                  {loading ? (
                    <Skeleton variant="rectangular" width="100%" height={45} />
                  ) : (
                    data_asociada_ccd !== undefined && (
                      <TextField
                        disabled
                        fullWidth
                        value={data_asociada_ccd.trd.nombre}
                        type="textarea"
                        rows="3"
                        label="Nombre"
                        size="small"
                      />
                    )
                  )}
                </Grid>
                <Grid item xs={12} md={4}>
                  {loading ? (
                    <Skeleton variant="rectangular" width="100%" height={45} />
                  ) : (
                    data_asociada_ccd !== undefined && (
                      <TextField
                        disabled
                        fullWidth
                        type="textarea"
                        value={data_asociada_ccd.trd.version}
                        rows="3"
                        label="Versión"
                        size="small"
                      />
                    )
                  )}
                </Grid>
              </Grid>
              <Title title="Tabla de control de acceso asociada" />
              <Grid container spacing={2} sx={{ mt: '5px', mb: '20px' }}>
                <Grid item xs={12} md={4}>
                  {loading ? (
                    <Skeleton variant="rectangular" width="100%" height={45} />
                  ) : (
                    data_asociada_ccd !== undefined && (
                      <TextField
                        disabled
                        fullWidth
                        value={data_asociada_ccd.tca.nombre}
                        type="textarea"
                        rows="3"
                        label="Nombre"
                        size="small"
                      />
                    )
                  )}
                </Grid>
                <Grid item xs={12} md={4}>
                  {loading ? (
                    <Skeleton variant="rectangular" width="100%" height={45} />
                  ) : (
                    data_asociada_ccd !== undefined && (
                      <TextField
                        disabled
                        fullWidth
                        value={data_asociada_ccd.tca.version}
                        type="textarea"
                        rows="3"
                        label="Versión"
                        size="small"
                      />
                    )
                  )}
                </Grid>
              </Grid>
            </>
          )}
          <Title title="Datos de activación" />
          <Grid container spacing={2} sx={{ mt: '5px', mb: '20px' }}>
            <Grid item xs={12} md={4}>
              {loading ? (
                <Skeleton variant="rectangular" width="100%" height={45} />
              ) : (
                <TextField
                  disabled
                  fullWidth
                  value={fecha_actual}
                  label="Fecha de activación"
                  size="small"
                />
              )}
            </Grid>
            <Grid item xs={12} sx={{ mt: '5px' }}>
              {loading ? (
                <Skeleton variant="rectangular" width="100%" height={45} />
              ) : (
                <TextField
                  fullWidth
                  required
                  type="textarea"
                  rows="3"
                  label="Justicación"
                  size="small"
                  error={Boolean(
                    errors_elegir_organigrama_actual.justificacion
                  )}
                  helperText={
                    errors_elegir_organigrama_actual.justificacion?.message
                  }
                  {...register_elegir_organigrama_actual('justificacion', {
                    required: 'Este campo es obligatorio',
                  })}
                />
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Stack
            direction="row"
            spacing={2}
            sx={{ mr: '15px', mb: '10px', mt: '10px' }}
          >
            <Button
              variant="outlined"
              onClick={handle_close_dialog}
              startIcon={<CloseIcon />}
            >
              CERRAR
            </Button>
            <Button type="submit" variant="contained" startIcon={<SaveIcon />}>
              GUARDAR
            </Button>
          </Stack>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default DialogCcdActual;
