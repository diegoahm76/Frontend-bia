/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { LoadingButton } from '@mui/lab';
import { Button, Grid, TextField } from '@mui/material';
import { Fragment, useContext, useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import type { Iprops } from './types/types';
import { DataContext } from '../../commons/recursoHidrico/Instrumentos/context/contextData';
import { control_warning } from '../../commons/almacen/configuracion/store/thunks/BodegaThunks';

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
export const AgregarArchivo = ({ multiple }: Iprops) => {
  const { archivos, nombres_archivos, set_archivos, set_nombres_archivos } =
    useContext(DataContext);

  const agregar_otro_archivo = (): void => {
    set_archivos([...archivos, null]);
    set_nombres_archivos([...nombres_archivos, '']);
  };

  const handle_file_select = (file: any, index: number): any => {
    // const file = e.target.files?.[0];
    const updated_archivos = [...archivos];
    if (file != null) {
      updated_archivos[index] = file;
      set_archivos(updated_archivos);
      const updated_nombres_archivos = [...nombres_archivos];
      updated_nombres_archivos[index] = file.name; // Guardar el nombre del archivo
      set_nombres_archivos(updated_nombres_archivos);
    }
  };

  const handle_nombre_archivo_change = (e: any, index: any): void => {
    const nombre_archivo = e.target.value;
    const updated_nombres_archivos = [...nombres_archivos];
    updated_nombres_archivos[index] = nombre_archivo;
    set_nombres_archivos(updated_nombres_archivos);
  };
  //   const [archivo, setArchivo] = useState<File | null>(null);
  const [nombreArchivo, setNombreArchivo] = useState('');

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file != null) {
      //   setArchivo(file);
      setNombreArchivo(file.name);
    }
  };

  const handleNombreArchivoChange = (e: any): void => {
    const nombreArchivo = e.target.value;
    setNombreArchivo(nombreArchivo);
  };
  return (
    <>
      {!multiple && (
        <>
          <Grid item xs={12} sm={6}>
            <Button
              variant="outlined"
              fullWidth
              component="label"
              startIcon={<CloudUploadIcon />}
            >
              {nombreArchivo !== '' ? nombreArchivo : 'Seleccione archivo'}
              <input
                hidden
                type="file"
                disabled={false}
                required={false}
                autoFocus
                style={{ opacity: 0 }}
                onChange={handleFileSelect}
              />
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nombre Archivo"
              fullWidth
              size="small"
              margin="dense"
              disabled={false}
              required={false}
              autoFocus
              value={nombreArchivo}
              onChange={handleNombreArchivoChange}
            />
          </Grid>
        </>
      )}
      {multiple &&
        archivos.map((_file: any, index: any) => (
          <Fragment key={index}>
            <Grid item xs={12} sm={6}>
              <Button
                variant="outlined"
                fullWidth
                component="label"
                startIcon={<CloudUploadIcon />}
              >
                {nombres_archivos[index] !== ''
                  ? nombres_archivos[index]
                  : 'Seleccione archivo'}
                <input
                  hidden
                  type="file"
                  disabled={false}
                  required={false}
                  accept="application/pdf"
                  autoFocus
                  style={{ opacity: 0 }}
                  onChange={(e) => {
                    // handle_file_select(e, index);
                    const files = (e.target as HTMLInputElement).files;
                    if (files && files.length > 0) {
                      const file = files[0];
                      if (file.type !== 'application/pdf') {
                        control_warning(
                          'Precaución: Solo es admitido archivos en formato pdf'
                        );
                      } else if (file.size > 1024 * 1024 * 5) {
                        const MAX_FILE_SIZE_MB = (
                          (1024 * 1024 * 5) /
                          (1024 * 1024)
                        ).toFixed(1);
                        control_warning(
                          `Precaución: El archivo es demasiado grande. El tamaño máximo permitido es ${MAX_FILE_SIZE_MB} MB.`
                        );
                      } else {
                        handle_file_select(file, index);
                      }
                    }
                  }}
                />
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Nombre Archivo"
                fullWidth
                size="small"
                margin="dense"
                disabled={false}
                required={false}
                autoFocus
                value={nombres_archivos[index]}
                onChange={(e) => {
                  handle_nombre_archivo_change(e, index);
                }}
              />
            </Grid>
          </Fragment>
        ))}
      {multiple && (
        <Grid item spacing={2} justifyContent="end" container>
          <Grid item>
            <LoadingButton
              variant="outlined"
              color="primary"
              size="large"
              onClick={agregar_otro_archivo}
            >
              Agregar archivo
            </LoadingButton>
          </Grid>
        </Grid>
      )}
    </>
  );
};
