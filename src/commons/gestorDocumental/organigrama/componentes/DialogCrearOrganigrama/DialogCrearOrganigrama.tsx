/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Controller } from 'react-hook-form';
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Button,
  Box,
  Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { add_organigrams_service } from '../../store/thunks/organigramThunks';
import { useAppDispatch } from '../../../../../hooks';
import type { FormValues, IProps } from './types/type';
import { control_warning } from '../../../../almacen/configuracion/store/thunks/BodegaThunks';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { FILEWEIGHT } from '../../../../../fileWeight/fileWeight';
import use_editar_organigrama from '../../hooks/useEditarOrganigrama';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const DialogCrearOrganigrama = ({
  is_modal_active,
  set_is_modal_active,
  set_position_tab_organigrama
}: IProps) => {
  const dispatch = useAppDispatch();

  // eslint-disable-next-line @typescript-eslint/naming-convention

  const [loadingButton, setLoadingButton] = useState(false);

  //* hook
  const {
    control_organigrama_creacion,
    handle_submit,
    reset_creacion_organigrama,
    creacion_organigrama_values
  } = use_editar_organigrama();

  const handle_close_crear_organigrama = (): void => {
    set_is_modal_active(false);
  };

  const on_submit = (data: FormValues): void => {
    console.log(creacion_organigrama_values);

    // Convertir el objeto new_ccd en un objeto FormData
    const formData: any = new FormData();

    formData.append('nombre', creacion_organigrama_values.nombre);
    formData.append('version', creacion_organigrama_values.version);
    formData.append('descripcion', creacion_organigrama_values.descripcion);
    if (
      creacion_organigrama_values.ruta_resolucion !== '' &&
      creacion_organigrama_values.ruta_resolucion !== null
    ) {
      formData.append(
        'ruta_resolucion',
        creacion_organigrama_values.ruta_resolucion
      );
    }

    void dispatch(
      add_organigrams_service(
        formData,
        set_position_tab_organigrama,
        handle_close_crear_organigrama,
        setLoadingButton,
      )
    );
  };

  return (
    <Dialog
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
          Crear organigrama
          <IconButton
            aria-label="close"
            onClick={() => {
              set_is_modal_active(false);
            }}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500]
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ mb: '0px' }}>
          <Controller
            name="nombre"
            control={control_organigrama_creacion}
            defaultValue=""
            rules={{ required: true }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                // margin="dense"
                fullWidth
                size="small"
                label="Nombre"
                variant="outlined"
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
          <Controller
            name="version"
            control={control_organigrama_creacion}
            defaultValue=""
            rules={{ required: true }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                // margin="dense"
                fullWidth
                size="small"
                label="Versión"
                variant="outlined"
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
          <Controller
            name="descripcion"
            control={control_organigrama_creacion}
            defaultValue=""
            rules={{ required: true }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                // margin="dense"
                fullWidth
                size="small"
                label="Descripción"
                variant="outlined"
                value={value}
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
          {/*   ruta para soporte de organigrama */}
          <Controller
            name="ruta_resolucion"
            control={control_organigrama_creacion}
            defaultValue=""
            rules={{ required: false }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <Button
                  variant={
                    value === '' || value === null ? 'outlined' : 'contained'
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
                    Archivo Soporte Organigrama
                  </small>
                </label>
              </>
            )}
          />
        </DialogContent>
        <Divider />
        <DialogActions>
          <Stack
            direction="row"
            spacing={2}
            sx={{ mr: '15px', mb: '10px', mt: '10px' }}
          >
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                reset_creacion_organigrama({
                  nombre: '',
                  version: '',
                  descripcion: '',
                  ruta_resolucion: ''
                });
              }}
              startIcon={<CleanIcon />}
            >
              LIMPIAR
            </Button>
            <Button
              variant="outlined"
              onClick={handle_close_crear_organigrama}
              startIcon={<CloseIcon />}
            >
              CERRAR
            </Button>
            <LoadingButton
              loading={loadingButton}
              type="submit"
              variant="contained"
              startIcon={<SaveIcon />}
            >
              CREAR
            </LoadingButton>
          </Stack>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default DialogCrearOrganigrama;
