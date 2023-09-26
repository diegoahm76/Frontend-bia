/* eslint-disable @typescript-eslint/naming-convention */
import { Grid, TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Title } from '../../../../../components/Title';
import { useContext, useState } from 'react';
import { FormCreacionContext } from '../../context/CreaccionPlantillaContex';

export const SeleccionarArchivo: React.FC = () => {

  const [fileExtension, setFileExtension] = useState<string | null>(null);

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
      const extension = fileName.split('.').pop();
      if (extension) {
        setFileExtension(extension);
      } else {
        console.error("No se pudo determinar la extensión del archivo.");
        setFileExtension("Desconocido");
      }
    } else {
      console.warn("Ningún archivo seleccionado.");
      setFileExtension(null);
    }
  };


  const { form, set_form } = useContext(FormCreacionContext);

  const HandleCompletarDatos = (e: any) => {
    set_form({
      ...form,
      [e.target.name]: e.target.value
    });
  }





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
            size="small"
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
            label="Descripccion"
            
            name = "descripcion"
            value={form.descripcion}
            onChange={HandleCompletarDatos}
          // error={emailMismatch}
          // helperText={emailMismatch ? "El campo de observaciones esta vacio " : ""}
          />
        </Grid>
        <Grid item xs={12} sm={4.5} md={3}>
          <Button
            style={{ marginTop: 10 }}
            component="label"
            variant="outlined"
            startIcon={<CloudUploadIcon />}
            htmlFor="file-upload" // Usa htmlFor en lugar de href para relacionar con el input
          >
            Seleccionar Documento
            <VisuallyHiddenInput
              type="file"
              id="file-upload" // Usa el mismo id que el atributo htmlFor
              onChange={handleFileChange} // Maneja el cambio de archivo
            />
          </Button>
        </Grid>

        <Grid item xs={12} sm={4} md={3}>
          <TextField
            style={{ marginTop: 10 }}
            variant="outlined"
            disabled
            size="small"
            label="Extensión de la plantilla"
            value={fileExtension ?? ''}
            fullWidth
            name="Numero identificación"
          />
        </Grid>
      </Grid>
    </>
  );
};
