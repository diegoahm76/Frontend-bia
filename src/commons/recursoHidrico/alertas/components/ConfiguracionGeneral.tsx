/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

// ? libraries
import { type FC } from 'react';
import {
  /* Box , */ Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  Tooltip,
  Typography,
} from '@mui/material';
import Select from 'react-select';
import { Controller } from 'react-hook-form';

//* icons
import InfoIcon from '@mui/icons-material/Info';
import { containerStyles } from '../../../gestorDocumental/tca/screens/utils/constants/constants';
import { useAlertaHook } from '../utils/useAlertaHook';
import { Title } from '../../../../components/Title';
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from '@mui/lab';

export const ConfiguracionGeneral: FC<any> = ({ title }: any): JSX.Element => {
  const {
    controlConfiguracionGeneralAlertas,
    is_loading_configuracion_general_alertas,
    options,
    onSubmit_configuracion_general_alertas,
  } = useAlertaHook();

  return (
    <>
      <form
        onSubmit={(data) => {
          void onSubmit_configuracion_general_alertas(data);
        }}
        style={{
          width: '100%',
          height: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Grid container sx={containerStyles}>
          <Grid item xs={12}>
            <Title title='Configuración de alerta' />
            {/*  <Box sx={{ mt: '20px', mb: '20px' }}> */}
            {/* select alertas  */}
            <Grid
              item
              xs={12}
              sm={12}
              sx={{
                marginTop: '25px',
                marginBottom: '10px',
              }}
            >
              <Controller
                name="prioridadAlerta"
                control={controlConfiguracionGeneralAlertas}
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <div>
                    <Select
                      styles={{
                        control: (base) => ({
                          ...base,
                          height: '45px',
                          minHeight: '45px',
                        }),
                      }}
                      value={value}
                      onChange={(value) => {
                        //  console.log('')(value);
                        onChange(value);
                      }}
                      // isDisabled={!control_format_documental_type._formValues.item.value}
                      options={options}
                      placeholder="Seleccionar"
                    />
                    <label>
                      <small
                        style={{
                          color: 'rgba(0, 0, 0, 0.6)',
                          fontWeight: 'thin',
                          fontSize: '0.75rem',
                          marginTop: '0.25rem',
                          // marginLeft: '0.25rem'
                        }}
                      >
                        Prioridad de alertas
                        {/* {trd_current != null
                            ? `CCD seleccionado`
                            : `CDD's no usados en otro TRD`} */}
                      </small>
                    </label>
                  </div>
                )}
              />
            </Grid>
            <Grid
             
            >
            <Grid
              sx={{
                marginBottom: '10px',
                width: 'auto',
              }}
              item
              xs={6}
              sm={6}
            >
              <Controller
                name="notificacionEmail"
                control={controlConfiguracionGeneralAlertas}
                // defaultValue=""
                // rules={{ required: false }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <FormControl>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={value}
                          onChange={(e) => {
                            onChange(e.target.checked);
                          }}
                          // name="checkedB"
                          color="primary"
                        />
                      }
                      label={
                        value ? (
                          <Typography variant="body2">
                            <strong>
                              Notificar por correo electrónico a los
                              destinatarios
                            </strong>
                            <Tooltip
                              title="SI notifiación por correo electrónico"
                              placement="right"
                            >
                              <InfoIcon
                                sx={{
                                  width: '1.2rem',
                                  height: '1.2rem',
                                  ml: '0.5rem',
                                  color: 'green',
                                }}
                              />
                            </Tooltip>
                          </Typography>
                        ) : (
                          <Typography variant="body2">
                            <strong>
                              No Notificar por correo electrónico a los
                              destinatarios
                            </strong>
                            <Tooltip
                              title="NO Notificación por correo electrónico"
                              placement="right"
                            >
                              <InfoIcon
                                sx={{
                                  width: '1.2rem',
                                  height: '1.2rem',
                                  ml: '0.5rem',
                                  color: 'orange',
                                }}
                              />
                            </Tooltip>
                          </Typography>
                        )
                      }
                    />
                  </FormControl>
                )}
              />
            </Grid>
            </Grid>
            {/* estado actual de la alerta */}

            <Grid
              sx={{
                marginBottom: '10px',
              }}
              item
              xs={12}
              sm={6}
            >
              <Controller
                name="estadoAlerta"
                control={controlConfiguracionGeneralAlertas}
                // defaultValue=""
                // rules={{ required: false }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <FormControl>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={value}
                          onChange={(e) => {
                            onChange(e.target.checked);
                          }}
                          // name="checkedB"
                          color="primary"
                        />
                      }
                      label={
                        value ? (
                          <Typography variant="body2">
                            <strong>Alerta activa</strong>
                            <Tooltip title="Alerta activa" placement="right">
                              <InfoIcon
                                sx={{
                                  width: '1.2rem',
                                  height: '1.2rem',
                                  ml: '0.5rem',
                                  color: 'green',
                                }}
                              />
                            </Tooltip>
                          </Typography>
                        ) : (
                          <Typography variant="body2">
                            <strong>Alerta inactiva</strong>
                            <Tooltip title="Alerta inactiva" placement="right">
                              <InfoIcon
                                sx={{
                                  width: '1.2rem',
                                  height: '1.2rem',
                                  ml: '0.5rem',
                                  color: 'orange',
                                }}
                              />
                            </Tooltip>
                          </Typography>
                        )
                      }
                    />
                  </FormControl>
                )}
              />
            </Grid>
            <Grid container item justifyContent="flex-end" spacing={2}>
              <Grid item>
                <LoadingButton
                  variant="contained"
                  color="success"
                  fullWidth
                  startIcon={<SaveIcon />}
                  type="submit"
                  disabled={is_loading_configuracion_general_alertas}
                  loading={is_loading_configuracion_general_alertas}
                >
                  Guardar
                </LoadingButton>
              </Grid>
            </Grid>

            {/* </Box> */}
          </Grid>
        </Grid>
      </form>
    </>
  );
};
