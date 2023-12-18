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

export const ModalDenuncia = (props: any): JSX.Element => {
  const { infoDenuncia, setInfoDenuncia } = props;

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
                  value={infoDenuncia?.municipio_localizacion_hecho ?? 'N/A'}
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
                  value={infoDenuncia?.nombre_zona_localizacion ?? 'N/A'}
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
                  value={infoDenuncia?.barrio_vereda_localizacion ?? 'N/A'}
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
                  value={infoDenuncia?.direccion_localizacion ?? 'N/A'}
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
                  value={infoDenuncia?.cod_recursos_fectados_presuntos ?? 'N/A'}
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
                  value={infoDenuncia?.otro_recurso_Afectado_cual ?? 'N/A'}
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
                  value={
                    infoDenuncia?.nombre_completo_presunto_infractor ?? 'N/A'
                  }
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
                  value={infoDenuncia?.telefono_presunto_infractor ?? 'N/A'}
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
                  value={infoDenuncia?.direccion_presunto_infractor ?? 'N/A'}
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
                  value={
                    infoDenuncia?.ya_habia_puesto_en_conocimiento ? 'SI' : 'NO'
                  }
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
                  value={infoDenuncia?.ante_que_autoridad_había_interpuesto ?? 'N/A'}
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
