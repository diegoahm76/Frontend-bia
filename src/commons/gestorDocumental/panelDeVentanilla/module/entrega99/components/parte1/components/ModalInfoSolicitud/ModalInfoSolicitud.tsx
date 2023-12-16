/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/naming-convention */
import {
  Autocomplete,
  Box,
  Button,
  Chip,
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
import { Title } from '../../../../../../../../../components';
import { ModalAndLoadingContext } from '../../../../../../../../../context/GeneralContext';
import { useContext } from 'react';
import { SolicitudAlUsuarioContext } from '../../../../context/SolicitudUsarioContext';
import { formatDate } from '../../../../../../../../../utils/functions/formatDate';
import { RenderDataGrid } from '../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { columnsAnexos } from './columnsAnexos/columnsAnexos';
import { DownloadButton } from '../../../../../../../../../utils/DownloadButton/DownLoadButton';

export const ModalInfoSolicitud: React.FC = (): JSX.Element => {
  //* se debe manejar un loader ya que a través de ello se consultatá un servicio para los metadatos que están asociados a un archivo

  const { openModalOne, handleOpenModalOne } = useContext(
    ModalAndLoadingContext
  );
  const { currentSolicitudUsuario } = useContext(SolicitudAlUsuarioContext);

  const colums = [
    ...columnsAnexos,
    {
      headerName: 'Acciones',
      field: 'acciones',
      width: 200,
      renderCell: (params: any) => (
        <DownloadButton
          fileUrl={params.row.archivo}
          fileName={params.row.nombre_archivo}
          condition={false}
        />
      ),
    },
  ];

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={openModalOne}
        onClose={() => {
          handleOpenModalOne(false);
        }}
      >
        <Box component="form">
          <DialogTitle>
            <Title title="Información de la solicitud" />
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
              <Grid item xs={12} sm={8}>
                <TextField
                  fullWidth
                  label="Asunto"
                  disabled
                  size="small"
                  variant="outlined"
                  value={
                    currentSolicitudUsuario?.detalleSolicitud?.asunto ?? 'N/A'
                  }
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ maxLength: 50 }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  disabled
                  type="text"
                  label="Fecha de solicitud"
                  size="small"
                  variant="outlined"
                  //* se debe poner la condicional del reset
                  value={
                    formatDate(
                      currentSolicitudUsuario?.detalleSolicitud?.fecha_solicitud
                    ) ?? 'N/A'
                  }
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

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
                  fullWidth
                  disabled
                  multiline
                  rows={5}
                  label="Descripción de la solicitud"
                  size="small"
                  variant="outlined"
                  value={
                    currentSolicitudUsuario?.detalleSolicitud?.descripcion ??
                    'N/A'
                  }
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ maxLength: 255 }}
                />
              </Grid>

              {/*segund parte - anexos que sse han puesto en la solicitud */}

              <RenderDataGrid
                title="Anexos de la solicitud"
                rows={currentSolicitudUsuario?.anexos ?? []}
                columns={colums ?? []}
              />

              {/*tercera parte, anexos de cada metadato*/}

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
                  label="Origen del archivo"
                  size="small"
                  variant="outlined"
                  value={'jeje siuu'}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ maxLength: 255 }}
                />
              </Grid>

              {/*Inicio de segunda fila*/}
              <Grid
                item
                xs={12}
                sm={4}
                sx={{
                  mt: '1.2rem',
                  mb: '1.2rem',
                  zIndex: 5,
                }}
              >
                {/* aqui se dispne a unir los campos en los que está si o no (la tipología relacionada y la que no (cuando es cual)) */}
                <TextField
                  disabled
                  fullWidth
                  label="Tipología relacionada"
                  size="small"
                  variant="outlined"
                  value={'jeje siuu'}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ maxLength: 255 }}
                />
              </Grid>
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
                  label="Asunto"
                  size="small"
                  variant="outlined"
                  value={'jeje siuu'}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ maxLength: 50 }}
                />
              </Grid>

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
                  multiline
                  rows={4}
                  fullWidth
                  label="Descripción"
                  size="small"
                  variant="outlined"
                  value={'jeje siuu'}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ maxLength: 255 }}
                />
              </Grid>

              <Grid item xs={12} sm={12} sx={{ mt: '1.2rem', mb: '1.2rem' }}>
                <Autocomplete
                  value={['jeje siuu', 'jeje siuusdds', 'jeje ssdsdfsdiuu']}
                  disabled
                  multiple
                  id="tags-filled"
                  options={[]}
                  freeSolo
                  renderTags={(value: readonly string[], getTagProps) =>
                    value.map((option: string, index: number) => (
                      <Chip
                        variant="outlined"
                        label={option}
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Palabras claves"
                      placeholder="Seleccionar"
                    />
                  )}
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
                  handleOpenModalOne(false);
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
