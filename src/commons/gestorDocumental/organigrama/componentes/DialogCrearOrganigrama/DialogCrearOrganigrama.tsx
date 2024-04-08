/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Controller } from 'react-hook-form';
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
import { Title } from '../../../../../components';
import { useFiles } from '../../../../../hooks/useFiles/useFiles';

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

  const {controlar_tamagno_archivos} = useFiles()

  const handle_close_crear_organigrama = (): void => {
    set_is_modal_active(false);
  };

  const on_submit = (data: FormValues): void => {
    //  console.log('')(creacion_organigrama_values);

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
        setLoadingButton
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
          <Title title="Crear organigrama" />
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
                  // //  console.log('')(e.target.value);
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
                  // //  console.log('')(e.target.value);
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
                inputProps={{
                  maxLength: 255
                }}
                onChange={(e: any) => {
                  if (e.target.value.length === 255)
                    control_warning('máximo 255 caracteres');

                  onChange(e.target.value);
                  // //  console.log('')(e.target.value);
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
                    onChange={(e) => {
                      const files = (e.target as HTMLInputElement).files;
                      if (files && files.length > 0) {
                        const file = files[0];
                        controlar_tamagno_archivos(file, onChange)
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
                    {control_organigrama_creacion?._formValues?.ruta_resolucion
                      ? control_organigrama_creacion?._formValues?.ruta_resolucion
                          .name ??
                        control_organigrama_creacion?._formValues?.ruta_resolucion.replace(
                          /https?:\/\/back-end-bia-beta\.up\.railway\.app\/media\//,
                          ''
                        )
                      : 'Seleccione archivo'}
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
              variant="outlined"
              color="primary"
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
              color="error"
              onClick={handle_close_crear_organigrama}
              startIcon={<CloseIcon />}
            >
              CERRAR
            </Button>
            <LoadingButton
              loading={loadingButton}
              type="submit"
              variant="contained"
              color="success"
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
