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
  // Select,
  // MenuItem,
  type SelectChangeEvent,
  TextField,
  // FormControl,
  // InputLabel,
  // FormHelperText,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
// import { add_organigrams_service } from '../store/thunks/organigramThunks';
import { useAppDispatch } from '../../../../hooks';
import { get_finished_ccd_service } from '../../ccd/store/thunks/ccdThunks';
import { type IList } from '../../../../interfaces/globalModels';
import { CustomSelect } from '../../../../components';
import { control_error } from '../../../../helpers';
import { get_finished_organigrams_service } from '../store/thunks/organigramThunks';
// import { get_finished_trd_service } from '../../trd/store/thunks/trdThunks';
import {
  organigramas_choise_adapter,
  ccds_choise_adapter,
  trds_choise_adapter,
  tcas_choise_adapter,
} from '../adapters/organigrama_adapters';
import { get_finished_tca_service } from '../../tca/store/thunks/tcaThunks';
import { get_finished_trd_service } from '../../trd/store/thunks/trdThunks';

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
  const [organigrams, set_organigrams] = useState<string>();
  const [list_organigrams, set_list_organigrams] = useState<IList[]>([
    {
      label: '',
      value: 0,
    },
  ]);
  const [ccds, set_ccds] = useState<string>();
  const [list_ccds, set_list_ccds] = useState<IList[]>([
    {
      label: '',
      value: 0,
    },
  ]);
  const [trds, set_trds] = useState<string>();
  const [list_trds, set_list_trds] = useState<IList[]>([
    {
      label: '',
      value: 0,
    },
  ]);
  const [tcas, set_tcas] = useState<string>();
  const [list_tcas, set_list_tcas] = useState<IList[]>([
    {
      label: '',
      value: 0,
    },
  ]);
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const {
    handleSubmit: handle_submit,
    register: register_elegir_organigrama_actual,
    setValue: set_value_elegir_organigrama_actual,
    formState: { errors: errors_elegir_organigrama_actual },
  } = useForm<FormValues>();

  const handle_close_crear_organigrama = (): void => {
    set_is_modal_active(false);
  };

  const on_submit = (data: FormValues): void => {
    // void dispatch(add_organigrams_service(data, set_position_tab_organigrama));
    handle_close_crear_organigrama();
  };

  const get_data_selects = async (): Promise<void> => {
    set_loading(true);
    try {
      const response_orgs = await dispatch(get_finished_organigrams_service());
      const res_organigramas_adapter: IList[] =
        await organigramas_choise_adapter(response_orgs);
      set_list_organigrams(res_organigramas_adapter);

      const response_ccds = await dispatch(get_finished_ccd_service());
      console.log(response_ccds);
      const res_ccds_adapter: IList[] = await ccds_choise_adapter(
        response_ccds
      );
      set_list_ccds(res_ccds_adapter);

      const response_trds = await dispatch(get_finished_trd_service());
      console.log(response_trds);
      const res_trds_adapter: IList[] = await trds_choise_adapter(
        response_trds.data
      );
      set_list_trds(res_trds_adapter);

      const response_tcas = await dispatch(get_finished_tca_service());
      console.log(response_tcas);
      const res_tcas_adapter: IList[] = await tcas_choise_adapter(
        response_tcas.data
      );
      set_list_tcas(res_tcas_adapter);
    } catch (err) {
      control_error(err);
    } finally {
      set_loading(false);
    }
  };

  useEffect(() => {
    console.log(list_organigrams);
  }, [list_organigrams]);

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
        set_organigrams(value);
        break;
      case 'ccd':
        set_ccds(value);
        break;
      case 'trd':
        set_trds(value);
        break;
      case 'tca':
        set_tcas(value);
        break;
    }
    set_value_elegir_organigrama_actual(name as keys_object, value);
  };

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={is_modal_active}
      onClose={handle_close_crear_organigrama}
    >
      <Box
        component="form"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handle_submit(on_submit)}
      >
        <DialogTitle>
          Elegir organigrama actual
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
          <Grid container sx={{ mb: '0px' }}>
            <Grid item xs={12} sx={{ mb: '20px' }}>
              <CustomSelect
                onChange={on_change}
                label="Organigramas*"
                name="organigramas"
                value={organigrams?.toString()}
                options={list_organigrams}
                loading={loading}
                disabled={false}
                required={false}
                errors={errors_elegir_organigrama_actual}
                register={register_elegir_organigrama_actual}
              />
            </Grid>
            <Grid item xs={12} sx={{ mb: '20px' }}>
              <CustomSelect
                onChange={on_change}
                label="Cuadros de clasificación documental*"
                name="ccd"
                value={ccds?.toString()}
                options={list_ccds}
                loading={loading}
                disabled={false}
                required={false}
                errors={errors_elegir_organigrama_actual}
                register={register_elegir_organigrama_actual}
              />
            </Grid>
            <Grid item xs={12} sx={{ mb: '20px' }}>
              <CustomSelect
                onChange={on_change}
                label="Retención documental*"
                name="trd"
                value={trds}
                options={list_trds}
                loading={loading}
                disabled={false}
                required={false}
                errors={errors_elegir_organigrama_actual}
                register={register_elegir_organigrama_actual}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomSelect
                onChange={on_change}
                label="Control de acceso*"
                name="tca"
                value={tcas}
                options={list_tcas}
                loading={loading}
                disabled={false}
                required={false}
                errors={errors_elegir_organigrama_actual}
                register={register_elegir_organigrama_actual}
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: '20px' }}>
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
