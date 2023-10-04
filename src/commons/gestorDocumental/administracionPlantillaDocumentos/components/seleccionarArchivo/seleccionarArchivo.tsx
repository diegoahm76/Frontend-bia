/* eslint-disable @typescript-eslint/naming-convention */
import React, { useContext, useState } from 'react';
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
    <>
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
        <Grid item xs={12}>
          <Title title="Seleccionar Archivos" />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <TextField
            style={{ marginTop: 20 }}
            variant="outlined"
            label="Nombre de la Plantilla"
            fullWidth
            name="nombre"
            value={form.nombre}
            onChange={HandleCompletarDatos}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            style={{ width: '100%', marginTop: 10 }}
            label="Descripción"
            name="descripcion"
            value={form.descripcion}
            onChange={HandleCompletarDatos}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <Button
            style={{ marginTop: 10, width: '90%' }}
            fullWidth
            component="label"
            variant="outlined"
            startIcon={<CloudUploadIcon />}
            htmlFor="file-upload"
          >
            {form.archivo ? ( // Muestra el botón "Quitar" si hay un archivo seleccionado
              <>
                Quitar
                <IconButton
                  size="small"
                  onClick={handleRemoveFile}
                  sx={{ marginLeft: '8px' }}
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
        {file_nombre && (
          <Grid item xs={12} sm={4} md={3}>
            <TextField
              style={{ marginTop: 10, width: '90%' }}
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
        {fileExtension && (
          <Grid item xs={12} sm={4} md={3}>
            <TextField
              style={{ marginTop: 10, width: '90%' }}
              variant="outlined"
              disabled
              size="small"
              label="Extensión de la plantilla"
              value={fileExtension ?? ''}
              fullWidth
            />
          </Grid>
        )}
      </Grid>
    </>
  );
};
