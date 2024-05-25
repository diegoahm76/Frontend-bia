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
  Typography,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Title } from '../../../../../../../components';
import { ModalAndLoadingContext } from '../../../../../../../context/GeneralContext';
import CloseIcon from '@mui/icons-material/Close';
import { RenderDataGrid } from '../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { DownloadButton } from '../../../../../../../utils/DownloadButton/DownLoadButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useAppSelector } from '../../../../../../../hooks';
import { formatDate } from '../../../../../../../utils/functions/formatDate';
import { columnsModalOpas } from '../Opas/columns/columnsModalOpas';
import { getAnexosComplementosTramite } from '../../../../toolkit/thunks/TramitesyServiciosyRequerimientos/anexos/getAnexosTramites.service';
import { getArchivoAnexoTramite } from '../../../../toolkit/thunks/TramitesyServiciosyRequerimientos/archivo/getArchivoTramite.service';
import { getMetadatosArchivoTramite } from '../../../../toolkit/thunks/TramitesyServiciosyRequerimientos/metadatos/getMetadatosAnexoTramite.service';

export const ModalComplementoTraSer = (): JSX.Element => {
  // ? redux states use
  const { currentElementPqrsdComplementoTramitesYotros } = useAppSelector(
    (state) => state.PanelVentanillaSlice
  );

  // ? context necesario
  const { fifthLoading, openModalTwo, handleFifthLoading , handleOpenModalTwo } =
    useContext(ModalAndLoadingContext);

  // ? state para almacenar la informacion de los metadatos
  const [infoMetadatos, setInfoMetadatos] = useState<any>({});
  // ? state para almacenar la informacion de los anexos
  const [infoAnexos, setInfoAnexos] = useState<any>([]);

  //* use effect para cargar los datos de los anexos
  useEffect(() => {
    if (!fifthLoading) return;

    (async () => {
      try {
        const res = await getAnexosComplementosTramite(
          currentElementPqrsdComplementoTramitesYotros.idComplementoUsu_PQR
        );
        setInfoAnexos(res);
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [fifthLoading]);

  const columns = [
    ...columnsModalOpas,
    {
      headerName: 'Ver metadatos anexo',
      field: 'Detalle',
      width: 200,
      renderCell: (params: any) => (
        <Tooltip title="Ver metadatos del anexo">
          <IconButton
            onClick={async () => {
              try {
                handleOpenModalTwo(true);
                const [resArchivoTramite, resMetadataTramite] = await Promise.all([
                  getArchivoAnexoTramite(params.row.id_anexo),
                  getMetadatosArchivoTramite(params.row.id_anexo),
                ]);
                console.log('resByAnexo', resArchivoTramite);
                console.log('resPqrsdf', resMetadataTramite);
                setInfoMetadatos({
                  ...resArchivoTramite,
                  ...resMetadataTramite,
                }); // or use resPqrsdf based on your requirement
              } catch (err) {
                console.log(err);
                handleOpenModalTwo(false);
              }
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

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={fifthLoading}
        onClose={() => {
          handleFifthLoading(false);
          handleOpenModalTwo(false);
        }}
      >
        <Box component="form">
          <DialogTitle>
            <Title title="Información del complemento seleccionado" />
          </DialogTitle>
          <Divider />
          <DialogContent
            sx={{
              mt: '1.2rem',
              mb: '1.2rem',
              justifyContent: 'center',
            }}
          >
            <Grid
              container
              spacing={2}
              sx={{
                justifyContent: 'center',
              }}
            >
              <Grid item xs={12} sm={8}>
                <TextField
                  fullWidth
                  label="Nombre completo del titular"
                  disabled
                  size="small"
                  variant="outlined"
                  value={
                    currentElementPqrsdComplementoTramitesYotros?.nombre_completo_titular ??
                    'N/A'
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
                  label="Fecha de radicado de trámite"
                  size="small"
                  variant="outlined"
                  value={
                    formatDate(
                      currentElementPqrsdComplementoTramitesYotros?.fecha_radicado
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
                  mb: '.45rem',
                }}
              >
                <TextField
                  fullWidth
                  disabled
                  label="Radicado"
                  size="small"
                  variant="outlined"
                  value={
                    currentElementPqrsdComplementoTramitesYotros?.radicado ??
                    'N/A'
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
                  mt: '.45rem',
                  mb: '.45rem',
                }}
              >
                <TextField
                  fullWidth
                  disabled
                  label="Cantidad de anexos"
                  size="small"
                  variant="outlined"
                  value={
                    currentElementPqrsdComplementoTramitesYotros?.cantidad_anexos ??
                    'N/A'
                  }
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ maxLength: 255 }}
                />
              </Grid>

              {/*segund parte - anexos que sse han puesto en la solicitud */}

              {infoAnexos.length > 0 && (
                <RenderDataGrid
                  title="Anexos del trámite"
                  rows={[...infoAnexos]}
                  columns={columns ?? []}
                />
              )}

              {/*tercera parte, metadatos de cada archivo establecido*/}

              {openModalTwo ? (
                <>
                  <>
                    <Title title={`Archivo anexo`} />
                    <Grid
                      container
                      spacing={2}
                      sx={{
                        mt: '1.5rem',
                        mb: '2rem',
                        justifyContent: 'center',
                        textAlign: 'center',
                      }}
                    >
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        sx={{
                          textAlign: 'center',
                        }}
                      >
                        <DownloadButton
                          fileName={`archivo anexo ${infoMetadatos?.nombre_de_Guardado}}`}
                          fileUrl={infoMetadatos?.ruta_archivo ?? ''}
                          condition={false}
                        />
                      </Grid>
                    </Grid>
                  </>

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
                          : ['N/A']
                      }
                      freeSolo
                      renderTags={(value: readonly string[], getTagProps) =>
                        value.map((option: string, index: number) => (
                          // eslint-disable-next-line react/jsx-key
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
              ) : (
                <Box
                  sx={{
                    justifyContent: 'center',
                    display: 'flex',
                  }}
                >
                  <Typography
                    sx={{
                      mt: '1.5rem',
                      mb: '1.5rem',
                    }}
                    variant="h6"
                    align="center"
                  >
                    Sin metadatos y/o archivo
                  </Typography>
                </Box>
              )}
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
                variant="contained"
                onClick={() => {
                  handleFifthLoading(false);
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
