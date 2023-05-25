import { useEffect, type Dispatch, type SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Button,
  Box,
  Divider,
  Skeleton,
  type SelectChangeEvent,
  TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { Title } from '../../../../components/Title';
import { useAppDispatch } from '../../../../hooks';
import { get_ccds_posibles } from '../../ccd/store/thunks/ccdThunks';
import { type IList } from '../../../../interfaces/globalModels';
import { CustomSelect } from '../../../../components';
import { control_error } from '../../../../helpers';
import {
  cambio_organigrama_actual,
  get_organigramas_posibles,
  get_organigrama_actual,
} from '../store/thunks/organigramThunks';
import {
  organigramas_choise_adapter,
  ccds_choise_adapter,
} from '../adapters/organigrama_adapters';

interface OrgActual {
  actual: boolean;
  descripcion: string;
  fecha_puesta_produccion: string;
  fecha_retiro_produccion: string | null;
  fecha_terminado: string;
  id_organigrama: number;
  id_persona_cargo: number | null;
  justificacion_nueva_version: string | null;
  nombre: string;
  ruta_resolucion: string | null;
  version: string;
}

interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
}

interface FormValues {
  organigrama: number | string;
  ccd: number;
  trd: number;
  tca: number;
  justificación: string;
}

type keys_object = 'organigrama' | 'ccd' | 'trd' | 'tca' | 'justificación';

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const DialogElegirOrganigramaActual = ({
  is_modal_active,
  set_is_modal_active,
}: IProps) => {
  const dispatch = useAppDispatch();
  const [loading, set_loading] = useState<boolean>(false);
  const [organigrama_actual, set_organigrama_actual] = useState<OrgActual>();
  const [organigram_selected, set_organigram_selected] = useState<string>();
  const [list_organigrams, set_list_organigrams] = useState<IList[]>([
    {
      label: '',
      value: 0,
    },
  ]);
  const [data_ccds_posibles, set_data_ccds_posibles] = useState();
  const [ccd_selected, set_ccd_selected] = useState<string>();
  const [list_ccds, set_list_ccds] = useState<IList[]>([
    {
      label: '',
      value: 0,
    },
  ]);
  const [data_asociada_ccd, set_data_asociada_ccd] = useState();

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const {
    handleSubmit: handle_submit,
    register: register_elegir_organigrama_actual,
    getValues: get_values_elegir_organigrama_actual,
    setValue: set_value_elegir_organigrama_actual,
    formState: { errors: errors_elegir_organigrama_actual },
  } = useForm<FormValues>();

  const handle_close_crear_organigrama = (): void => {
    set_is_modal_active(false);
  };

  const on_submit = async (data: FormValues): Promise<void> => {
    const data_cambio = {
      justificacion: get_values_elegir_organigrama_actual('justificación'),
      organigrama: get_values_elegir_organigrama_actual('organigrama'),
      id_ccd: get_values_elegir_organigrama_actual('ccd'),
    };
    console.log(data_cambio);
    await dispatch(cambio_organigrama_actual(data_cambio));
    handle_close_crear_organigrama();
  };

  const get_data_selects = async (): Promise<void> => {
    set_loading(true);
    try {
      const response_org_actual = await dispatch(get_organigrama_actual());
      console.log(response_org_actual.data);
      set_organigrama_actual(response_org_actual.data);

      const response_orgs = await dispatch(get_organigramas_posibles());
      console.log('organigramas posibles', response_orgs);
      const res_organigramas_adapter: IList[] =
        await organigramas_choise_adapter(response_orgs.data);
      set_list_organigrams(res_organigramas_adapter);
    } catch (err) {
      control_error(err);
    } finally {
      set_loading(false);
    }
  };

  const get_list_ccds = async (
    id_organigram: string | number
  ): Promise<void> => {
    const response_ccds = await dispatch(get_ccds_posibles(id_organigram));
    console.log(response_ccds);
    set_data_ccds_posibles(response_ccds);
    const res_ccds_adapter: IList[] = await ccds_choise_adapter(response_ccds);
    set_list_ccds(res_ccds_adapter);
  };

  // const get_list_trds = async (id_cdd: string | number): Promise<void> => {
  //   const response_trds = await dispatch(get_trds_finished_x_ccd(id_cdd));
  //   console.log(response_trds);
  //   const res_trds_adapter: IList[] = await trds_choise_adapter(
  //     response_trds.data
  //   );
  //   set_list_trds(res_trds_adapter);
  // };

  // const get_list_tcas = async (id_trd: string | number): Promise<void> => {
  //   const response_tcas = await dispatch(get_tcas_finished_x_trd(id_trd));
  //   console.log(response_tcas);
  //   const res_tcas_adapter: IList[] = await tcas_choise_adapter(
  //     response_tcas.data
  //   );
  //   set_list_tcas(res_tcas_adapter);
  // };

  useEffect(() => {
    void get_list_ccds(organigram_selected ?? '');
  }, [organigram_selected]);

  useEffect(() => {
    const result_filter = data_ccds_posibles?.filter(
      (ccds: any) => ccds.id_ccd !== ccd_selected
    );
    set_data_asociada_ccd(result_filter);
  }, [ccd_selected]);

  // useEffect(() => {
  //   void get_list_tcas(trds ?? '');
  // }, [trds]);

  useEffect(() => {
    void get_data_selects();
  }, []);

  const on_change = (e: SelectChangeEvent<string>): void => {
    set_value_form(e.target.name, e.target.value);
  };

  // Establece los valores del formulario
  const set_value_form = (name: string, value: string): void => {
    switch (name) {
      case 'organigrama':
        set_organigram_selected(value);
        break;
      case 'ccd':
        set_ccd_selected(value);
        break;
      // case 'trd':
      //   set_trds(value);
      //   break;
      // case 'tca':
      //   set_tcas(value);
      //   break;
    }
    set_value_elegir_organigrama_actual(name as keys_object, value);
  };

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={is_modal_active}
      onClose={handle_close_crear_organigrama}
    >
      <Box
        component="form"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handle_submit(on_submit)}
      >
        <DialogTitle>
          Activación de organigrama
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
          <Title title="Organigrama actual" />
          <Grid container spacing={2} sx={{ mt: '5px', mb: '20px' }}>
            <Grid item xs={12} md={4}>
              {loading ? (
                <Skeleton variant="rectangular" width="100%" height={45} />
              ) : (
                <TextField
                  fullWidth
                  disabled
                  value={organigrama_actual?.nombre}
                  label="Nombre"
                  size="small"
                />
              )}
            </Grid>
            <Grid item xs={12} md={4}>
              {loading ? (
                <Skeleton variant="rectangular" width="100%" height={45} />
              ) : (
                <TextField
                  fullWidth
                  disabled
                  value={organigrama_actual?.version}
                  label="Versión"
                  size="small"
                />
              )}
            </Grid>
          </Grid>
          <Title title="Seleccione un organigrama para activación" />
          <Grid container spacing={2} sx={{ mt: '5px', mb: '20px' }}>
            <Grid item xs={12} md={4}>
              <CustomSelect
                onChange={on_change}
                label="Organigramas*"
                name="organigramas"
                value={organigram_selected?.toString()}
                options={list_organigrams}
                loading={loading}
                disabled={false}
                required={false}
                errors={errors_elegir_organigrama_actual}
                register={register_elegir_organigrama_actual}
              />
            </Grid>
          </Grid>
          {organigram_selected !== null && list_ccds.length > 0 && (
            <>
              <Title title="Cuadros de clasificación documental asociado" />
              <Grid container spacing={2} sx={{ mt: '5px', mb: '20px' }}>
                <Grid item xs={12} md={4}>
                  <CustomSelect
                    onChange={on_change}
                    label="Cuadros de clasificación documental*"
                    name="ccd"
                    value={ccd_selected?.toString()}
                    options={list_ccds}
                    loading={loading}
                    disabled={false}
                    required={false}
                    errors={errors_elegir_organigrama_actual}
                    register={register_elegir_organigrama_actual}
                  />
                </Grid>
              </Grid>
              {ccd_selected !== null && data_asociada_ccd !== null && (
                <>
                  <Title title="Tabla de retención asociada" />
                  <Grid container spacing={2} sx={{ mt: '5px', mb: '20px' }}>
                    <Grid item xs={12} md={4}>
                      {loading ? (
                        <Skeleton
                          variant="rectangular"
                          width="100%"
                          height={45}
                        />
                      ) : (
                        <TextField
                          fullWidth
                          value={data_asociada_ccd}
                          type="textarea"
                          rows="3"
                          label="Nombre"
                          size="small"
                        />
                      )}
                    </Grid>
                    <Grid item xs={12} md={4}>
                      {loading ? (
                        <Skeleton
                          variant="rectangular"
                          width="100%"
                          height={45}
                        />
                      ) : (
                        <TextField
                          fullWidth
                          type="textarea"
                          value={data_asociada_ccd}
                          rows="3"
                          label="Versión"
                          size="small"
                        />
                      )}
                    </Grid>
                  </Grid>
                  <Title title="Tabla de control de acceso asociada" />
                  <Grid container spacing={2} sx={{ mt: '5px', mb: '20px' }}>
                    <Grid item xs={12} md={4}>
                      {loading ? (
                        <Skeleton
                          variant="rectangular"
                          width="100%"
                          height={45}
                        />
                      ) : (
                        <TextField
                          fullWidth
                          value={data_asociada_ccd}
                          type="textarea"
                          rows="3"
                          label="Nombre"
                          size="small"
                        />
                      )}
                    </Grid>
                    <Grid item xs={12} md={4}>
                      {loading ? (
                        <Skeleton
                          variant="rectangular"
                          width="100%"
                          height={45}
                        />
                      ) : (
                        <TextField
                          fullWidth
                          value={data_asociada_ccd}
                          type="textarea"
                          rows="3"
                          label="Versión"
                          size="small"
                        />
                      )}
                    </Grid>
                  </Grid>
                </>
              )}
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
                  type="textarea"
                  rows="3"
                  label="Justicación*"
                  size="small"
                  {...register_elegir_organigrama_actual('justificación')}
                  error={
                    errors_elegir_organigrama_actual.justificación?.type ===
                    'required'
                  }
                  helperText={
                    errors_elegir_organigrama_actual.justificación?.type ===
                    'required'
                      ? 'Este campo es obligatorio'
                      : ''
                  }
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
              onClick={handle_close_crear_organigrama}
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
export default DialogElegirOrganigramaActual;
