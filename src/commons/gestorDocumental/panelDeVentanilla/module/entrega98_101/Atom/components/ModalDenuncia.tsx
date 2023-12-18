/* eslint-disable @typescript-eslint/naming-convention */

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Stack,
  TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Title } from '../../../../../../../components';
import { useContext, useEffect, useState } from 'react';
import { ModalAndLoadingContext } from '../../../../../../../context/GeneralContext';

export const ModalDenuncia = (): JSX.Element => {
  const [infoDenuncia, setInfoDenuncia] = useState<any>(null);

  useEffect(() => {
    console.log('infoDenuncia', infoDenuncia);


    return () => {
      console.log('cleaned up');
      setInfoDenuncia(null);
    }
  
  });

  const { generalLoading, handleGeneralLoading } = useContext(
    ModalAndLoadingContext
  );

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={generalLoading}
        onClose={() => {
          handleGeneralLoading(false);
          setInfoDenuncia(null);
        }}
      >
        <Box component="form">
          <DialogTitle>
            <Title title="Información de denuncia de la PQRSDF" />
          </DialogTitle>
          <Divider />

          <DialogContent
            sx={{
              mt: '1.2rem',
              mb: '1.2rem',
              justifyContent: 'center',
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="Municipio de localización del hecho"
                  disabled
                  size="small"
                  variant="outlined"
                  value={'Villavicencio' ?? 'N/A'}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ maxLength: 50 }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  disabled
                  type="text"
                  label="Zona de localización del hecho"
                  size="small"
                  variant="outlined"
                  //* se debe poner la condicional del reset
                  value={'Urbana' ?? 'N/A'}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  disabled
                  label="Vereda o barrio de localización del hecho"
                  size="small"
                  variant="outlined"
                  value={'Ciudad' ?? 'N/A'}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ maxLength: 255 }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  disabled
                  fullWidth
                  label="Dirección de localización del hecho"
                  size="small"
                  variant="outlined"
                  value={'CRA 26 A # 4B - 67' ?? 'N/A'}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ maxLength: 255 }}
                />
              </Grid>

              {/*SEGUNDA FILA DE INFORMACIÓN*/}

              <Grid
                item
                xs={12}
                sm={3}
                sx={{
                  mt: '1.2rem',
                  mb: '1.2rem',
                  zIndex: 5,
                }}
              >
                <TextField
                  disabled
                  fullWidth
                  label="Recurso afectado"
                  size="small"
                  variant="outlined"
                  value={'Suelo' ?? 'N/A'}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ maxLength: 255 }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={3}
                sx={{
                  mt: '1.2rem',
                  mb: '1.2rem',
                }}
              >
                <TextField
                  disabled
                  fullWidth
                  label="¿Es otro recurso afectado? ¿Cuál?"
                  size="small"
                  variant="outlined"
                  value={'NO' ?? 'N/A'}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ maxLength: 50 }}
                />
              </Grid>

              <Grid
                item
                xs={12}
                sm={3}
                sx={{
                  mt: '1.2rem',
                  mb: '1.2rem',
                }}
              >
                <TextField
                  disabled
                  fullWidth
                  label="Nombre del presunto infractor"
                  size="small"
                  variant="outlined"
                  value={'Pepe rojas' ?? 'N/A'}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ maxLength: 255 }}
                />
              </Grid>

              <Grid
                item
                xs={12}
                sm={3}
                sx={{
                  mt: '1.2rem',
                  mb: '1.2rem',
                }}
              >
                <TextField
                  disabled
                  fullWidth
                  label="Teléfono del presunto infractor"
                  size="small"
                  variant="outlined"
                  value={'Pepe rojas' ?? 'N/A'}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ maxLength: 255 }}
                />
              </Grid>

              {/*TERCERA FILA DE INFORMACIÓN*/}

              <Grid
                item
                xs={12}
                sm={4}
                sx={{
                  mt: '1.2rem',
                  mb: '1.2rem',
                }}
              >
                <TextField
                  disabled
                  fullWidth
                  label="Dirección del presunto infractor"
                  size="small"
                  variant="outlined"
                  value={'Urb x y z' ?? 'N/A'}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ maxLength: 255 }}
                />
              </Grid>

              <Grid
                item
                xs={12}
                sm={4}
                sx={{
                  mt: '1.2rem',
                  mb: '1.2rem',
                }}
              >
                <TextField
                  disabled
                  fullWidth
                  label="Ya se ha presentado denuncia ante la autoridad competente"
                  size="small"
                  variant="outlined"
                  value={'SI' ?? 'N/A'}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ maxLength: 255 }}
                />
              </Grid>

              <Grid
                item
                xs={12}
                sm={4}
                sx={{
                  mt: '1.2rem',
                  mb: '1.2rem',
                }}
              >
                <TextField
                  disabled
                  fullWidth
                  label="Ante qué autoridad"
                  size="small"
                  variant="outlined"
                  value={'Polica NAL' ?? 'N/A'}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ maxLength: 255 }}
                />
              </Grid>

              {/*CUARTA FILA DE INFORMACIÓN*/}

              <Grid
                item
                xs={12}
                sm={12}
                sx={{
                  mt: '1.2rem',
                  mb: '1.2rem',
                }}
              >
                <TextField
                  disabled
                  fullWidth
                  multiline
                  rows={3}
                  label="Evidencias que soportan la denuncia"
                  size="small"
                  variant="outlined"
                  value={
                    'En una zona verde cerca a la casa han estado talando arboles y cazando aves' ??
                    'N/A'
                  }
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ maxLength: 255 }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <Divider />
          <DialogActions>
            <Stack
              direction="row"
              spacing={2}
              sx={{ mr: '15px', mb: '10px', mt: '10px' }}
            >
              <Button
                color="error"
                variant="outlined"
                onClick={() => {
                  handleGeneralLoading(false);
                  setInfoDenuncia(null);
                }}
                startIcon={<CloseIcon />}
              >
                CERRAR
              </Button>
            </Stack>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};
