/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
  TextField,
  FormLabel,
  ToggleButton,
  Stack,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { type Dayjs } from 'dayjs';
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';
import { Title } from '../../../../../components/Title';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import { showAlert } from '../../../../../utils/showAlert/ShowAlert';
interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
  title: string;
  persona_vinculacion: any;
  vinculacion: any;
  tipos_cargos: any;
  lista_unidad_org: any;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const CargoUnidadOrganizacionalComponent = (props: IProps) => {
  const [cargo, set_cargo] = useState<string>('');
  const [cargo_desc, set_cargo_desc] = useState<string>('');
  const [msj_error_cargo, set_msj_error_cargo] = useState<string>('');
  const [unidad_organizacional, set_unidad_organizacional] =
    useState<string>('');
  const [unidad_org_desc, set_unidad_org_desc] = useState<string>('');
  const [msj_error_unidad_org, set_msj_error_unidad_org] = useState<string>('');
  const [fecha_inicio, set_fecha_inicio] = useState<Dayjs>(dayjs());
  const [fecha_asignacion, set_fecha_asignacion] = useState<Dayjs>(dayjs());
  const [fecha_desvinculacion, set_fecha_desvinculacion] = useState<Dayjs>(
    dayjs()
  );
  const [fecha_finaliza, set_fecha_finaliza] = useState<Dayjs>(dayjs());
  const [msj_error_fecha_finaliza, set_msj_error_fecha_finaliza] =
    useState<string>('');
  const [obs_vin_cargo, set_obs_vin_cargo] = useState<string>('');
  const [msj_error_obs_vin_cargo, set_msj_error_obs_vin_cargo] =
    useState<string>('');
  const [justificacion, set_justificacion] = useState<string>('');
  const [msj_error_justificacion, set_msj_error_justificacion] =
    useState<string>('');
  const [desvincular, set_desvincular] = useState<boolean>(false);
  const [obs_desvincula, set_obs_desvincula] = useState<string>('');
  const [msj_error_obs_desvincula, set_msj_error_obs_desvincula] =
    useState<string>('');

  useEffect(() => {
    try {
      if (props.persona_vinculacion) {
        set_cargo(
          props?.persona_vinculacion.cargo === 0
            ? obtener_id_cargo()
            : props.persona_vinculacion?.cargo
        );
        set_cargo_desc(props?.persona_vinculacion?.cargo_desc ?? '');
        set_unidad_organizacional(
          props?.persona_vinculacion.unidad_organizacional === 0
            ? obtener_id_unidad_org()
            : props.persona_vinculacion?.unidad_org_desc
        );
        set_unidad_org_desc(props.persona_vinculacion?.unidad_org_desc ?? '');
        set_fecha_inicio(props.persona_vinculacion?.fecha_inicio ?? '');
        set_fecha_asignacion(props.persona_vinculacion?.fecha_asignacion ?? '');
        set_fecha_finaliza(props.persona_vinculacion?.fecha_finaliza ?? '');
        set_fecha_desvinculacion(
          props.persona_vinculacion?.fecha_desvinculacion ?? ''
        );
        set_obs_vin_cargo(props.persona_vinculacion?.obs_vin_cargo ?? '');
        set_justificacion(props.persona_vinculacion?.justificacion ?? '');
        set_desvincular(props.persona_vinculacion?.desvincular ?? false);
        set_obs_desvincula(props.persona_vinculacion?.obs_desvincula ?? '');
      }
    } catch (error) {
      showAlert(
        'Error',
        'Ocurrió un error inesperado, porfavor intente de nuevo ',
        'error'
      );
    }
  }, [props?.persona_vinculacion]);

  const obtener_id_cargo = (): number => {
    return props.tipos_cargos.find(
      (tc: any) => tc.nombre === props.persona_vinculacion.cargo_actual
    ).id_cargo;
  };

  const obtener_id_unidad_org = (): number | void => {
    const data_to_return = props.lista_unidad_org.find(
      (luo: any) => luo.nombre === props.persona_vinculacion.unidad_org_desc
    );

    if (data_to_return) {
      return data_to_return.id_unidad_organizacional;
    }

    showAlert(
      'Error',
      'La unidad organizacional especificada no fue encontrada, y/o la persona que se intenta vincular no está asociada con ninguna unidad en el organigrama actual. Por favor, verifique y/o realice el traslado de la persona a una unidad dentro del organigrama actual.',
      'error'
    );
  };

  const cambio_cargo: (event: SelectChangeEvent) => void = (
    e: SelectChangeEvent
  ) => {
    set_cargo_desc(
      props.tipos_cargos.find((tc: any) => tc.id_cargo === e.target.value)
        .nombre
    );
    set_cargo(e.target.value);
    if (e.target.value !== null && e.target.value !== '')
      set_msj_error_cargo('');
  };

  const cambio_unidad_organizacional: (event: SelectChangeEvent) => void = (
    e: SelectChangeEvent
  ) => {
    set_unidad_org_desc(
      props.lista_unidad_org.find(
        (uo: any) => uo.id_unidad_organizacional === e.target.value
      ).nombre
    );
    set_unidad_organizacional(e.target.value);
    if (e.target.value !== null && e.target.value !== '')
      set_msj_error_unidad_org('');
  };

  const cambio_obs_vin_cargo: any = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    set_obs_vin_cargo(e.target.value);
    if (e.target.value !== '') set_msj_error_obs_vin_cargo('');
  };

  const cambio_obs_desvincula: any = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    set_obs_desvincula(e.target.value);
    if (e.target.value !== '') set_msj_error_obs_desvincula('');
  };

  const cambio_justificacion: any = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    set_justificacion(e.target.value);
    if (e.target.value !== '') set_msj_error_justificacion('');
  };

  const cambio_fecha_finaliza = (date: Dayjs | null): void => {
    if (date !== null) {
      set_fecha_finaliza(date);
      set_msj_error_fecha_finaliza('');
    } else {
      set_msj_error_fecha_finaliza(
        'El campo Fecha a finalizar es obligatorio.'
      );
    }
  };

  const guardar_car_uni_org = (): void => {
    if (valida_formulario()) {
      const formulario_cargo_unidad: any = {
        cargo,
        cargo_desc,
        fecha_inicio,
        fecha_finaliza,
        obs_vin_cargo,
        unidad_organizacional,
        unidad_org_desc,
        fecha_asignacion,
        justificacion,
        desvincular,
        fecha_desvinculacion,
        obs_desvincula,
      };
      props.vinculacion(formulario_cargo_unidad);
      props.set_is_modal_active(false);
    }
  };

  const valida_formulario = (): boolean => {
    let validador = true;
    if (cargo === '') {
      set_msj_error_cargo('El campo Cargo es obligatorio.');
      validador = false;
    }
    if (fecha_finaliza === null) {
      set_msj_error_fecha_finaliza(
        'El campo Fecha a finalizar es obligatorio.'
      );
      validador = false;
    }
    if (obs_vin_cargo === '') {
      set_msj_error_obs_vin_cargo(
        'El campo Observación de la vinculación al cargo es obligatorio.'
      );
      validador = false;
    }
    if (unidad_organizacional === '') {
      set_msj_error_unidad_org(
        'El campo Unidad orgranizacional nueva es obligatorio.'
      );
      validador = false;
    }
    if (justificacion === '') {
      set_msj_error_justificacion('El campo Justificación es obligatorio.');
      validador = false;
    }
    if (desvincular && obs_desvincula === '') {
      set_msj_error_obs_desvincula(
        'El campo Observación de la desvinculación es obligatorio.'
      );
      validador = false;
    }
    return validador;
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <Dialog
      fullWidth
      maxWidth="md"
      open={props.is_modal_active}
      onClose={() => {
        props.set_is_modal_active(false);
      }}
    >
      <Grid
        container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          width: '95%',
          margin: '0 auto',
          mt: '20px',
          p: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item xs={12}>
          <Title title={props?.title} />
        </Grid>
      </Grid>

      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
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
            <Grid item md={12} xs={12}>
              <Title title="Cargo" />
              <Box
                component="form"
                sx={{ mt: '20px' }}
                noValidate
                autoComplete="off"
              >
                <Grid item container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <FormControl required size="small" fullWidth>
                      <InputLabel>Cargo</InputLabel>
                      <Select
                        value={cargo}
                        label="Cargo"
                        onChange={cambio_cargo}
                        error={msj_error_cargo !== ''}
                      >
                        {props.tipos_cargos.map((tipos: any) => (
                          <MenuItem key={tipos.id_cargo} value={tipos.id_cargo}>
                            {tipos.nombre}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {msj_error_cargo !== '' && (
                      <FormHelperText error>{msj_error_cargo}</FormHelperText>
                    )}
                  </Grid>
                  {/* <Grid item xs={12} sm={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Fecha inicio"
                        value={fecha_inicio}
                        onChange={() => {}}
                        renderInput={(params) => (
                          <TextField fullWidth size="small" {...params} />
                        )}
                        readOnly={true}
                      />
                    </LocalizationProvider>
                  </Grid> */}
                  {/* ll */}
                  <Grid item xs={12} sm={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Fecha inicio"
                        value={fecha_inicio}
                        // onChange={(newValue) => {
                        //   set_fecha_inicio(newValue);
                        // }}
                        onChange={(newValue) => {
                          set_fecha_inicio(newValue ?? dayjs());
                        }}

                        renderInput={(params) => (
                          <TextField fullWidth size="small" {...params} />
                        )}
                        readOnly={false} // Cambiado a false para permitir la edición, o simplemente quitar esta línea ya que el valor por defecto es editable
                      />
                    </LocalizationProvider>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Fecha a finalizar"
                        value={fecha_finaliza}
                        onChange={(newValue) => {
                          cambio_fecha_finaliza(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            required
                            fullWidth
                            size="small"
                            {...params}
                            error={msj_error_fecha_finaliza !== ''}
                          />
                        )}
                        minDate={fecha_inicio}
                      />
                    </LocalizationProvider>
                    {msj_error_fecha_finaliza !== '' && (
                      <FormHelperText error>
                        {msj_error_fecha_finaliza}
                      </FormHelperText>
                    )}
                  </Grid>
                </Grid>
              </Box>
              <Box
                component="form"
                sx={{ mt: '20px' }}
                noValidate
                autoComplete="off"
              >
                <Grid item container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      multiline
                      rows={2}
                      value={obs_vin_cargo}
                      label="Observación de la vinculación al cargo"
                      size="small"
                      fullWidth
                      required
                      onChange={cambio_obs_vin_cargo}
                      error={msj_error_obs_vin_cargo !== ''}
                    />
                    {msj_error_obs_vin_cargo !== '' && (
                      <FormHelperText error>
                        {msj_error_obs_vin_cargo}
                      </FormHelperText>
                    )}
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
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
            <Grid item md={12} xs={12}>
              <Title title="Unidad organizacional" />
              <Box
                component="form"
                sx={{ mt: '20px' }}
                noValidate
                autoComplete="off"
              >
                <Grid item container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormControl required size="small" fullWidth>
                      <InputLabel>Unidad organizacional nueva</InputLabel>
                      <Select
                        value={unidad_organizacional}
                        label="Unidad organizacional nueva"
                        required
                        onChange={cambio_unidad_organizacional}
                        error={msj_error_unidad_org !== ''}
                      >
                        {props.lista_unidad_org.map((tipos: any) => (
                          <MenuItem
                            key={tipos.id_unidad_organizacional}
                            value={tipos.id_unidad_organizacional}
                          >
                            {tipos.nombre}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {msj_error_unidad_org !== '' && (
                      <FormHelperText error>
                        {msj_error_unidad_org}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Fecha asignación"
                        value={fecha_asignacion}
                        onChange={() => { }}
                        renderInput={(params) => (
                          <TextField fullWidth size="small" {...params} />
                        )}
                        readOnly={true}
                      />
                    </LocalizationProvider>
                  </Grid>
                </Grid>
              </Box>
              <Box
                component="form"
                sx={{ mt: '20px' }}
                noValidate
                autoComplete="off"
              >
                <Grid item container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      multiline
                      rows={2}
                      value={justificacion}
                      label="justificación"
                      required
                      size="small"
                      fullWidth
                      onChange={cambio_justificacion}
                      error={msj_error_justificacion !== ''}
                    />
                  </Grid>
                  {msj_error_justificacion !== '' && (
                    <FormHelperText error>
                      {msj_error_justificacion}
                    </FormHelperText>
                  )}
                </Grid>
              </Box>
            </Grid>
          </Grid>
          {props?.persona_vinculacion !== null && (
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
              <Grid item md={12} xs={12}>
                <Title title="Desvincular" />
                <Box
                  component="form"
                  sx={{ mt: '20px' }}
                  noValidate
                  autoComplete="off"
                >
                  <Grid item container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Stack direction="row" justifyContent="center">
                        <FormLabel sx={{ mt: '9px', mx: '10px' }}>
                          Desvincular:{' '}
                        </FormLabel>
                        <ToggleButton
                          value="check"
                          selected={desvincular}
                          onChange={() => {
                            set_desvincular(!desvincular);
                          }}
                          size="small"
                        >
                          <CheckIcon /> {desvincular ? 'Si' : 'No'}
                        </ToggleButton>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Fecha desvinculación"
                          value={fecha_desvinculacion}
                          onChange={() => { }}
                          renderInput={(params) => (
                            <TextField
                              required
                              fullWidth
                              size="small"
                              {...params}
                            />
                          )}
                          readOnly={true}
                        />
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                </Box>
                <Box
                  component="form"
                  sx={{ mt: '20px' }}
                  noValidate
                  autoComplete="off"
                >
                  <Grid item container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        multiline
                        rows={2}
                        value={obs_desvincula}
                        label="Observaciones de la desvinculación"
                        size="small"
                        fullWidth
                        required
                        onChange={cambio_obs_desvincula}
                        error={msj_error_obs_desvincula !== ''}
                        disabled={!desvincular}
                      />
                    </Grid>
                  </Grid>
                  {msj_error_obs_desvincula !== '' && (
                    <FormHelperText error>
                      {msj_error_obs_desvincula}
                    </FormHelperText>
                  )}
                </Box>
              </Grid>
            </Grid>
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color="error"
          variant="contained"
          startIcon={<CancelIcon />}
          onClick={() => {
            props.set_is_modal_active(false);
          }}
        >
          Cancelar
        </Button>
        <Button
          color="success"
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={guardar_car_uni_org}
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
// eslint-disable-next-line no-restricted-syntax
export default CargoUnidadOrganizacionalComponent;
