/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/naming-convention */
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Title } from '../../../../../../../../../components';
import { ModalAndLoadingContext } from '../../../../../../../../../context/GeneralContext';
import { useContext, useState } from 'react';
import { RequerimientoAlUsuarioContext } from '../../../../context/RequerimientoUsarioContext';
import { formatDate } from '../../../../../../../../../utils/functions/formatDate';
import { RenderDataGrid } from '../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { columnsAnexos } from './columnsAnexos/columnsAnexos';
import { DownloadButton } from '../../../../../../../../../utils/DownloadButton/DownLoadButton';
import { Loader } from '../../../../../../../../../utils/Loader/Loader';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { getMetadatosByAnexo } from '../../../../services/afterCreatedUserRequest.service';

export const ModalInfoSolicitud: React.FC = (): JSX.Element => {
  //* se debe manejar un loader ya que a través de ello se consultatá un servicio para los metadatos que están asociados a un archivo

  const {
    openModalOne,
    handleOpenModalOne,
    openModalTwo,
    handleOpenModalTwo,
    fifthLoading,
  } = useContext(ModalAndLoadingContext);
  const { currentSolicitudUsuario } = useContext(RequerimientoAlUsuarioContext);

  const [infoMetadatos, setInfoMetadatos] = useState<any>({});

  const colums = [
    ...columnsAnexos,
    {
      headerName: 'Archivo',
      field: 'archivo',
      width: 110,
      renderCell: (params: any) => (
        <DownloadButton
          fileUrl={params.row.archivo}
          fileName={params.row.nombre_archivo}
          condition={false}
        />
      ),
    },
    {
      headerName: 'Ver metadatos anexo',
      field: 'Detalle',
      width: 200,
      renderCell: (params: any) => (
        <Tooltip title="Ver metadatos del anexo">
          <IconButton
            onClick={async () => {
              handleOpenModalTwo(true);
              await getMetadatosByAnexo(params.row.id_anexo_PQR, handleOpenModalTwo).then((res) => {
                setInfoMetadatos(res);
              }).catch((err) => {
                console.log(err);
                handleOpenModalTwo(false);
              }
              );
              // handleOpenModalOne(true); //* open modal
              // await getInfoSolicitud(params);
            }}
          >
            <Avatar
              sx={{
                width: 24,
                height: 24,
                background: '#fff',
                border: '2px solid',
              }}
              variant="rounded"
            >
              <VisibilityIcon
                sx={{ color: 'primary.main', width: '18px', height: '18px' }}
              />
            </Avatar>
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  if (fifthLoading) {
    return (
      <Grid
        container
        sx={{
          position: 'relative',
          justifyContent: 'center',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '2rem',
          mt: '1.2rem',
          mb: '1.2rem',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Loader altura={600} />
      </Grid>
    );
  }

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={openModalOne}
        onClose={() => {
          handleOpenModalOne(false);
          handleOpenModalTwo(false);
        }}
      >
        <Box component="form">
          <DialogTitle>
            <Title title="Información de la solicitud" />
          </DialogTitle>
          <Divider />

          {fifthLoading ? (
            <Grid
              container
              sx={{
                position: 'relative',
                justifyContent: 'center',
                background: '#FAFAFA',
                borderRadius: '15px',
                p: '2rem',
                mt: '1.2rem',
                mb: '1.2rem',
                boxShadow: '0px 3px 6px #042F4A26',
              }}
            >
              <Loader altura={600} />
            </Grid>
          ) : (
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
                        currentSolicitudUsuario?.detalleSolicitud
                          ?.fecha_solicitud
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

                {openModalTwo && (
                  <>
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
                        value={infoMetadatos?.origen_archivo ?? 'N/A'}
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
                        zIndex: 5,
                      }}
                    >
                      <TextField
                        disabled
                        fullWidth
                        label="Tipología relacionada"
                        size="small"
                        variant="outlined"
                        value={
                          infoMetadatos?.nombre_tipologia_documental ?? 'N/A'
                        }
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
                        value={infoMetadatos?.asunto ?? 'N/A'}
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
                        value={infoMetadatos?.descripcion ?? 'N/A'}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ maxLength: 255 }}
                      />
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      sm={12}
                      sx={{ mt: '1.2rem', mb: '1.2rem' }}
                    >
                      <Autocomplete
                        value={infoMetadatos?.palabras_clave_doc ?? ['N/A']}
                        disabled
                        multiple
                        id="tags-filled"
                        options={
                          infoMetadatos?.palabras_clave_doc
                            ? infoMetadatos?.palabras_clave_doc
                            : []
                        }
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
                           // placeholder="Seleccionar"
                          />
                        )}
                      />
                    </Grid>
                  </>
                )}
              </Grid>
            </DialogContent>
          )}
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
                  handleOpenModalTwo(false);
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
