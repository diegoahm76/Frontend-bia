/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { useContext, useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import SaveIcon from '@mui/icons-material/Save';
import { useCierreExpedientes } from '../hook/useCierreExpedientes';
import { Title } from '../../../../../components/Title';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/es'; // Importar localización en español
import { DataContext } from '../context/context';
import {
  categorias_archivo,
  consecutivo_documento,
  tipo_archivo,
} from '../utils/choices';
import { LoadingButton } from '@mui/lab';

dayjs.locale('es');
// eslint-disable-next-line @typescript-eslint/naming-convention
interface IProps {
  open_dialog: boolean;
  set_open_dialog: (value: boolean) => void;
}

export const ArchivosSoporte: React.FC<IProps> = ({
  open_dialog,
  set_open_dialog,
}: IProps) => {
  const {
    errors_archivo_soporte,
    control_archivo_soporte,
    // select
    tiene_consecutivo_documento,
    set_tiene_consecutivo_documento,
    // *año
    set_agno_archivo,
    // * palabras clave
    palabrasClave,
    handlePalabrasClaveChange,

    // onSubmit_archivo_soporte,
    onSubmit_archivo_soporte,
    is_saving,
  } = useCierreExpedientes();

  const { tipos_tipoligia_selected, fetch_data_tipos_tipoligia_selected } =
    useContext(DataContext);

  const handle_close = (): void => {
    set_open_dialog(false);
  };

  // * useEffect
  useEffect(() => {
    fetch_data_tipos_tipoligia_selected();
  }, []);

  return (
    <>
      <Dialog open={open_dialog} onClose={handle_close} fullWidth maxWidth="lg">
        <form
          onSubmit={(e) => {
            onSubmit_archivo_soporte(e);
            e.preventDefault();
            e.stopPropagation();
            console.log('submit');
          }}
        >
          {/* Contenido del formulario */}
          <DialogContent>
            <Grid
              container
              spacing={2}
              m={2}
              p={2}
              sx={{
                position: 'relative',
                background: '#FAFAFA',
                borderRadius: '15px',
                p: '20px',
                m: '10px 0 20px 0',
                mb: '20px',
                boxShadow: '0px 3px 6px #042F4A26',
              }}
            >
              <Grid item xs={12}>
                <Title title="Consulta de años cerrados" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="nombre_asignado_documento"
                  control={control_archivo_soporte}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      label="Nombre documento"
                      size="small"
                      margin="dense"
                      disabled={false}
                      fullWidth
                      required={true}
                      value={value}
                      onChange={onChange}
                      error={!!errors_archivo_soporte.nombre_asignado_documento}
                      helperText={
                        errors_archivo_soporte.nombre_asignado_documento
                          ? 'Este campo es requerido'
                          : 'Ingresa un nombre de documento'
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs} locale="es">
                  <Controller
                    name="fecha_creacion_doc"
                    control={control_archivo_soporte}
                    rules={{ required: true }}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <DatePicker
                        label="Fecha de creación del documento"
                        value={value || null}
                        onChange={(newValue) => {
                          onChange(newValue);
                          const valor = dayjs(newValue).format(
                            'DD/MM/YYYY'
                          ) as any;
                        }}
                        renderInput={(params: any) => (
                          <TextField
                            {...params}
                            fullWidth
                            size="small"
                            autoComplete="off" // Desactivar el autocompletado
                            error={!!error}
                            helperText={
                              error
                                ? 'Es obligatorio seleccionar una fecha de creación del documento'
                                : 'Seleccione una fecha de creación del documento'
                            }
                          />
                        )}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="tipologia_documental"
                  control={control_archivo_soporte}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      label="Tipología documental"
                      select
                      size="small"
                      margin="dense"
                      disabled={false}
                      fullWidth
                      required={true}
                      value={value}
                      onChange={(e) => {
                        onChange(e.target.value);
                      }}
                      error={
                        !!errors_archivo_soporte.tipologia_documental
                      }
                      helperText={
                        errors_archivo_soporte.tipologia_documental
                          ? 'Este campo es requerido'
                          : 'Selecciona una tipología de documental'
                      }
                    >
                      {tipos_tipoligia_selected.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />{' '}
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="nro_folios_del_doc"
                  control={control_archivo_soporte}
                  rules={{ required: false }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      label="Número de folios"
                      size="small"
                      margin="dense"
                      disabled={false}
                      fullWidth
                      required={false}
                      value={value}
                      onChange={onChange}
                      error={!!errors_archivo_soporte.nro_folios_del_doc}
                      helperText={
                        errors_archivo_soporte.nro_folios_del_doc
                          ? 'Este campo es requerido'
                          : 'Ingresa un nombre de documento'
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="tiene_consecutivo"
                  control={control_archivo_soporte}
                  rules={{ required: false }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      label="Tipo consecutivo de documento"
                      select
                      size="small"
                      margin="dense"
                      disabled={false}
                      fullWidth
                      required={false}
                      value={value}
                      onChange={(e) => {
                        onChange(e.target.value);
                        set_tiene_consecutivo_documento(e.target.value);
                      }}
                    >
                      {consecutivo_documento.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />{' '}
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="cod_origen_archivo"
                  control={control_archivo_soporte}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      label="Tipo consecutivo de documento"
                      select
                      size="small"
                      margin="dense"
                      disabled={false}
                      fullWidth
                      required={true}
                      value={value}
                      onChange={(e) => {
                        onChange(e.target.value);
                      }}
                      error={!!errors_archivo_soporte.cod_origen_archivo}
                      helperText={
                        errors_archivo_soporte.cod_origen_archivo
                          ? 'Este campo es requerido'
                          : 'Selecciona origen de archivo'
                      }
                    >
                      {tipo_archivo.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />{' '}
              </Grid>
              {tiene_consecutivo_documento === '1' ? (
                <>
                  <Grid item xs={12} sm={6} md={4}>
                    <Controller
                      name="codigo_tipologia_doc_prefijo"
                      control={control_archivo_soporte}
                      rules={{ required: tiene_consecutivo_documento === '1' }}
                      render={({ field: { onChange, value } }) => (
                        <TextField
                          label="Prefijo"
                          size="small"
                          margin="dense"
                          disabled={false}
                          fullWidth
                          required={tiene_consecutivo_documento === '1'}
                          value={value}
                          onChange={onChange}
                          error={
                            !!errors_archivo_soporte.codigo_tipologia_doc_prefijo
                          }
                          helperText={
                            errors_archivo_soporte.codigo_tipologia_doc_prefijo
                              ? 'Este campo es requerido'
                              : 'Ingresa un prefijo'
                          }
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Controller
                        name="codigo_tipologia_doc_agno"
                        control={control_archivo_soporte}
                        rules={{
                          required: tiene_consecutivo_documento === '1',
                        }}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <DatePicker
                            label="Seleccione año"
                            value={value || null}
                            onChange={(newValue) => {
                              onChange(newValue);
                              const valor = dayjs(newValue).format(
                                'YYYY'
                              ) as any;
                              set_agno_archivo(Number(valor));
                            }}
                            renderInput={(params: any) => (
                              <TextField
                                {...params}
                                fullWidth
                                size="small"
                                autoComplete="off" // Desactivar el autocompletado
                                error={!!error}
                                helperText={
                                  error
                                    ? 'Es obligatorio seleccionar una fecha'
                                    : 'Seleccione un año'
                                }
                              />
                            )}
                            views={['year']}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Controller
                      name="codigo_tipologia_doc_consecutivo"
                      control={control_archivo_soporte}
                      rules={{ required: false }}
                      render={({ field: { onChange, value } }) => (
                        <TextField
                          label="Consecutivo"
                          size="small"
                          margin="dense"
                          disabled={false}
                          fullWidth
                          required={false}
                          value={value}
                          onChange={onChange}
                          error={
                            !!errors_archivo_soporte.codigo_tipologia_doc_consecutivo
                          }
                          helperText={
                            errors_archivo_soporte.codigo_tipologia_doc_consecutivo
                              ? 'Este campo es requerido'
                              : 'Ingresa un consecutivo'
                          }
                        />
                      )}
                    />
                  </Grid>
                </>
              ) : null}
              <Grid item xs={12} sm={6}>
                <Controller
                  name="cod_categoria_archivo"
                  control={control_archivo_soporte}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      label="Tipo de recurso"
                      select
                      size="small"
                      margin="dense"
                      disabled={false}
                      fullWidth
                      required={true}
                      value={value}
                      onChange={(e) => {
                        onChange(e.target.value);
                      }}
                      error={!!errors_archivo_soporte.cod_categoria_archivo}
                      helperText={
                        errors_archivo_soporte.cod_categoria_archivo
                          ? 'Este campo es requerido'
                          : 'Selecciona un tipo de recurso'
                      }
                    >
                      {categorias_archivo.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />{' '}
              </Grid>
              <Grid
                sx={{
                  marginBottom: '10px',
                  width: 'auto',
                }}
                item
                xs={12}
                sm={6}
              >
                <Controller
                  name="tiene_replica_fisica"
                  control={control_archivo_soporte}
                  // defaultValue=""
                  rules={{
                    required: true,
                  }}
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
                              <strong>Tiene réplica física</strong>
                              <Tooltip
                                title="SI tiene réplica física"
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
                              <strong>No Tiene réplica física</strong>
                              <Tooltip
                                title="NO tiene réplica física"
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
              <Grid container item spacing={2} justifyContent="center">
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="asunto"
                    control={control_archivo_soporte}
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        label="Asunto"
                        size="small"
                        margin="dense"
                        disabled={false}
                        multiline={true}
                        fullWidth
                        required={true}
                        value={value}
                        onChange={onChange}
                        error={!!errors_archivo_soporte.asunto}
                        helperText={
                          errors_archivo_soporte.asunto
                            ? 'Este campo es requerido'
                            : 'Ingresa un asunto'
                        }
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="descripcion"
                  control={control_archivo_soporte}
                  rules={{ required: false }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      label="descripcion"
                      size="small"
                      margin="dense"
                      disabled={false}
                      multiline={true}
                      fullWidth
                      required={false}
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="palabras_clave_documento"
                  control={control_archivo_soporte}
                  rules={{ required: false }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      label="Palabras clave del documento"
                      size="small"
                      margin="dense"
                      disabled={false}
                      multiline={true}
                      fullWidth
                      required={false}
                      value={palabrasClave || value} // Usar el estado de "palabrasClave" si está definido, de lo contrario usar el valor de "value"
                      onChange={(event) => {
                        handlePalabrasClaveChange(event as any); // Llamar a la función "handlePalabrasClaveChange" para actualizar el estado de "palabrasClave"
                        onChange(event); // Llamar a la función "onChange" para actualizar el valor del campo de texto
                      }}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <LoadingButton
              color="success"
              variant="outlined"
              startIcon={<SaveIcon />}
              type="submit"
              loading={is_saving}
              disabled={is_saving}
            >
              Aceptar
            </LoadingButton>{' '}
            <Button
              color="error"
              variant="outlined"
              startIcon={<CloseIcon />}
              onClick={() => {
                handle_close();
                // reset();
              }}
            >
              Cerrar
            </Button>{' '}
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
