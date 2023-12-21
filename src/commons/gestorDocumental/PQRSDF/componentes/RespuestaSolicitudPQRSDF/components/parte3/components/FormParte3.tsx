/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Grid, TextField } from '@mui/material';
import React, { useContext } from 'react';
import { Controller } from 'react-hook-form';
import { control_warning } from '../../../../../../../almacen/configuracion/store/thunks/BodegaThunks';
import { FILEWEIGHT } from '../../../../../../../../fileWeight/fileWeight';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CleanIcon from '@mui/icons-material/CleaningServices';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BuildIcon from '@mui/icons-material/Build';
import { ModalMetadatos } from './../../modalMetadatos/ModalMetadatos';
import { ModalAndLoadingContext } from '../../../../../../../../context/GeneralContext';
import { usePanelVentanilla } from '../../../../../../panelDeVentanilla/hook/usePanelVentanilla';

export const FormParte3 = ({
  controlFormulario,
  handleSubmitFormulario,
  errorsFormulario,
  resetFormulario,
  watchFormulario,
}: any): JSX.Element => {


  //* context
  const { handleModalAgregarMetadatos } = useContext(
    ModalAndLoadingContext
  );

  return (
    <>
      <form
        style={{
          marginTop: '3rem',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Controller
              name="ruta_soporte"
              control={controlFormulario}
              defaultValue=""
              rules={{ required: false }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <>
                  <Button
                    variant={
                      value === '' || value === null ? 'outlined' : 'contained'
                    }
                    component="label"
                    style={{
                      marginTop: '.15rem',
                      width: '100%',
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
                      // disabled={ccd_current?.actual}
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
                        fontSize: '0.75rem',
                      }}
                    >
                      Archivo
                      {/*{control_create_ccd._formValues.ruta_soporte
                            ? control_create_ccd._formValues.ruta_soporte
                                .name ??
                              control_create_ccd._formValues.ruta_soporte.replace(
                                /https?:\/\/back-end-bia-beta\.up\.railway\.app\/media\//,
                                ''
                              )
                            : 'Seleccione archivo'}*/}
                    </small>
                  </label>
                </>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controller
              name="nombre_archivo"
              control={controlFormulario}
              defaultValue=""
              rules={{ required: true }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  required
                  fullWidth
                  label="Nombre del archivo"
                  helperText={error ? 'Es obligatorio subir un archivo' : ''}
                  size="small"
                  variant="outlined"
                  value={value}
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => {
                    onChange(e.target.value);
                    e.target.value.length === 50 &&
                      control_warning('máximo 50 caracteres');
                  }}
                  inputProps={{ maxLength: 50 }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controller
              name="medio_alamacenamiento"
              control={controlFormulario}
              defaultValue=""
              rules={{ required: true }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  required
                  fullWidth
                  disabled
                  label="Medio de almacenamiento"
                  helperText={error ? 'Es obligatorio subir un archivo' : ''}
                  size="small"
                  variant="outlined"
                  value={value || 'No aplica'}
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </Grid>

          {/* Inicio de la segunda fila de elementos */}

          <Grid item xs={12} sm={4}>
            <Controller
              name="numero_folios"
              control={controlFormulario}
              defaultValue=""
              rules={{ required: true }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  required
                  fullWidth
                  type="number"
                  // name="nombre"
                  label="Número de folios"
                  helperText={error ? 'Es obligatorio subir un archivo' : ''}
                  size="small"
                  variant="outlined"
                  value={value}
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => {
                    if (+e.target.value >= 255) {
                      control_warning('máximo 255 caracteres');
                      return;
                    }
                    onChange(e.target.value);
                  }}
                  inputProps={{ maxLength: 255 }}
                />
              )}
            />
          </Grid>

          {/*  modal de metadatos */}
          <Grid item xs={12} sm={4}>
            <Button
              sx={{
                width: '100%',
              }}
              variant="contained"
              color="primary"
              startIcon={<BuildIcon />}
              onClick={() => {
                //  console.log('')('click siuuu');
                //  console.log('')('abriendo modal de metadatos');
                handleModalAgregarMetadatos(true);
              }}
            >
              AGREGAR METADATOS
            </Button>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Button
              sx={{
                width: '100%',
              }}
              variant="contained"
              color="success"
              type="submit"
              startIcon={<AddIcon />}
              onClick={() => {
                //  console.log('')('click siuuu');
                //  console.log('')('soy el submit');
              }}
            >
              AGREGAR ANEXO
            </Button>
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          sx={{
            width: '100%',
            maxWidth: '100%',
            mt: '2rem',
            textAlign: 'center',
            paddingBottom: '2rem',
          }}
        >
          <Button
            variant="contained"
            color="warning"
            startIcon={<ArrowBackIcon />}
            onClick={() => {
              //  console.log('')('click siuuu');
            }}
            sx={{
              width: '60%',
            }}
          >
            ATRÁS
          </Button>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<CleanIcon />}
            onClick={() => {
              //  console.log('')('click siuuu');
            }}
            sx={{
              mt: '1rem',
              width: '60%',
            }}
          >
            Limpiar campos
          </Button>
        </Grid>
      </form>

      {/* espacio para el modal de agregar metadatos */}
      <ModalMetadatos />
      {/* espacio para el modal de agregar metadatos */}
    </>
  );
};
