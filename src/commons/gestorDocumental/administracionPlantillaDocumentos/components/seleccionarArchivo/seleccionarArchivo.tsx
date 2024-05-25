/* eslint-disable @typescript-eslint/naming-convention */
import React, { useContext, useEffect, useState } from 'react';
import { Grid, TextField, Button, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete'; // Icono para quitar el archivo
import { Title } from '../../../../../components/Title';
import { FormCreacionContext } from '../../context/CreaccionPlantillaContex';

export const SeleccionarArchivo: React.FC = () => {
  const [fileExtension, setFileExtension] = useState<string | null>(null);
  const [file_nombre, set_file_nombre] = useState<string | null>(null);
  const { form, set_form } = useContext(FormCreacionContext);

  const HandleCompletarDatos = (e: any) => {
    set_form({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const VisuallyHiddenInput = styled('input')`
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    left: 0;
    white-space: nowrap;
    width: 1px;
  `;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const fileInput = event.target;
    if (fileInput?.files?.length) {
      const fileName = fileInput.files[0].name;
      const selectedFile = fileInput.files[0];
      set_form({
        ...form,
        archivo: selectedFile,
        borrar_text: 1


      });
      const extension = fileName.split('.').pop();
      if (extension) {
        setFileExtension(extension);
        set_file_nombre(fileName);
      } else {
        console.error('No se pudo determinar la extensión del archivo.');
        setFileExtension('Desconocido');
        set_file_nombre('Desconocido');
      }
    } else {
      console.warn('Ningún archivo seleccionado.');
      setFileExtension(null);
      set_file_nombre(null);
    }
  };

  const handleRemoveFile = () => {
    // Limpia la selección actual del archivo
    set_form({
      ...form,
      archivo: null,
    });
    setFileExtension(null);
    set_file_nombre(null);
  };


  return (

      <Grid
        container
        spacing={2}
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          margin: '10px 0 20px 0',
          p: '20px',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item xs={12}>
          <Title title="Seleccionar Archivos" />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            margin="dense"
            size="small"
            variant="outlined"
            label="Nombre de la Plantilla"
            fullWidth
            name="nombre"
            value={form.nombre}
            onChange={HandleCompletarDatos}
          />
        </Grid>
        <Grid item  xs={12} md={8}>
          <TextField
            size="small"
            fullWidth
            margin='dense'
            multiline
            label="Descripción"
            name="descripcion"
            value={form.descripcion||""}
            onChange={HandleCompletarDatos}
          />
        </Grid>

        {file_nombre && form.borrar_text === 1 && (
          <Grid item xs={12} md={8} >
            <TextField
              variant="outlined"
              disabled
              size="small"
              label="Nombre de la plantilla"
              value={file_nombre ?? ''}
              fullWidth
              name="Numero identificación"
            />
          </Grid>
        )}

        {fileExtension && form.borrar_text === 1 && (
          <Grid item xs={12} md={4}>
            <TextField
              variant="outlined"
              disabled
              size="small"
              label="Extensión de la plantilla"
              value={fileExtension ?? ''}
              fullWidth
            />
          </Grid>
        )}
        <Grid
          container
          style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}
        >
          <Grid item xs={12} md={3}>
            <Button
              fullWidth
              size="medium"
              component="label"
              variant="outlined"
              startIcon={<CloudUploadIcon />}
              htmlFor="file-upload"
            >
              {form.archivo ? (
                <>
                  Quitar
                  <IconButton
                    size="small"
                    onClick={handleRemoveFile}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </>
              ) : (
                'Seleccionar Documento'
              )}
              <VisuallyHiddenInput
                type="file"
                id="file-upload"
                onChange={handleFileChange}
              />
            </Button>
          </Grid>

        </Grid>
      </Grid>
  );
};
