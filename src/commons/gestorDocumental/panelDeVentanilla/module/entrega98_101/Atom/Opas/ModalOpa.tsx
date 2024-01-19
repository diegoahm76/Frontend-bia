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
import React, { useContext, useEffect, useState } from 'react';
import { Title } from '../../../../../../../components';
import { ModalAndLoadingContext } from '../../../../../../../context/GeneralContext';
import CloseIcon from '@mui/icons-material/Close';
import { RenderDataGrid } from '../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { columnsModalOpas } from './columns/columnsModalOpas';
import { DownloadButton } from '../../../../../../../utils/DownloadButton/DownLoadButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useAppSelector } from '../../../../../../../hooks';
import { formatDate } from '../../../../../../../utils/functions/formatDate';

export const ModalOpa = () => {
  // ? redux states use
  const { currentElementPqrsdComplementoTramitesYotros } = useAppSelector(
    (state) => state.PanelVentanillaSlice
  );

  // ? context necesario
  const { openModalOne, openModalTwo, handleOpenModalOne, handleOpenModalTwo } =
    useContext(ModalAndLoadingContext);

  // ? state para almacenar la informacion de los metadatos
  const [infoMetadatos, setInfoMetadatos] = useState<any>({});
  // ? state para almacenar la informacion de los anexos
  const [infoAnexos, setInfoAnexos] = useState<any>([]);

  //* use effect para cargar los datos de los anexos

  useEffect(() => {
    // ! PENDIENTE DE GENERAR LAS INTERACCIONES CON LOS SERVICIOS DE BACKEND
    // ? se obtiene la informacion de los anexos
    // ? se debe cambiar por la informacion de la opa
    const anexos = [
      {
        id: 1,
        nombre_archivo: 'archivo1',
        descripcion: 'descripcion1',
        fecha_creacion: 'fecha1',
        fecha_modificacion: 'fecha1',
        usuario_creacion: 'usuario1',
        usuario_modificacion: 'usuario1',
        tipo_archivo: 'tipo1',
        origen_archivo: 'origen1',
        nombre_tipologia_documental: 'tipologia1',
        asunto: 'asunto1',
        palabras_clave_doc: ['palabra1', 'palabra2'],
      },
      {
        id: 2,
        nombre_archivo: 'archivo2',
        descripcion: 'descripcion2',
        fecha_creacion: 'fecha2',
        fecha_modificacion: 'fecha2',
        usuario_creacion: 'usuario2',
        usuario_modificacion: 'usuario2',
        tipo_archivo: 'tipo2',
        origen_archivo: 'origen2',
        nombre_tipologia_documental: 'tipologia2',
        asunto: 'asunto2',
        palabras_clave_doc: ['palabra1', 'palabra2'],
      },
    ];
    setInfoAnexos(anexos);
  }, []);

  const columns = [
    ...columnsModalOpas,
    {
      headerName: 'Archivo',
      field: 'archivo',
      width: 110,
      renderCell: (params: any) => (
        //* revisar el nombre del archivo, y las demas opciones
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
              /* await getMetadatosByAnexo(params.row.id_anexo, handleOpenModalTwo).then((res) => {
                console.log(params.row)

                setInfoMetadatos(res);
              }).catch((err) => {
                console.log(err);
                handleOpenModalTwo(false);
              }
              );*/
              // handleOpenModalOne(true); //* open modal
              // await getInfoSolicitud(params);
              setInfoMetadatos(params.row);
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
        open={openModalOne}
        onClose={() => {
          handleOpenModalOne(false);
          handleOpenModalTwo(false);
        }}
      >
        <Box component="form">
          <DialogTitle>
            <Title title="Información de la OPA" />
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
                  label="Asunto"
                  disabled
                  size="small"
                  variant="outlined"
                  value={
                    currentElementPqrsdComplementoTramitesYotros?.asunto ??
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
                  label="Fecha de solicitud"
                  size="small"
                  variant="outlined"
                  //* se debe poner la condicional del reset
                  value={
                    formatDate(
                      currentElementPqrsdComplementoTramitesYotros?.fecha_ini_estado_actual
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
                  rows={3}
                  label="Tipo de permiso ambiental"
                  size="small"
                  variant="outlined"
                  value={
                    currentElementPqrsdComplementoTramitesYotros?.tipo_permiso_ambiental ??
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
                  mb: '.45rem',
                }}
              >
                <TextField
                  fullWidth
                  disabled
                  label="Radicado OPA"
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
                  label="Tipo de operación de trámite"
                  size="small"
                  variant="outlined"
                  value={
                    currentElementPqrsdComplementoTramitesYotros?.tipo_operacion_tramite ??
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

              {infoAnexos.length > 0 ? (
                <RenderDataGrid
                  title="Anexos de la OPA"
                  rows={[...infoAnexos]}
                  columns={columns ?? []}
                />
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
                    No hay anexos para esta OPA
                  </Typography>
                </Box>
              )}

              {/*tercera parte, metadatos de cada archivo establecido*/}

              {openModalTwo ? (
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
                      value={
                        'ejeje siuu' /*infoMetadatos?.origen_archivo ?? 'N/A'*/
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
                        'jejej siuu'
                        /* infoMetadatos?.nombre_tipologia_documental ?? 'N/A'*/
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
                      value={'jeje siuu' /*infoMetadatos?.asunto ?? 'N/A'*/}
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
                      value={
                        'jeje siuu ' /*infoMetadatos?.descripcion ?? 'N/A'*/
                      }
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
                      value={
                        [
                          'jajeje',
                        ] /*infoMetadatos?.palabras_clave_doc ?? ['N/A']*/
                      }
                      disabled
                      multiple
                      id="tags-filled"
                      options={
                        /*infoMetadatos?.palabras_clave_doc
                          ? infoMetadatos?.palabras_clave_doc
                          : */ []
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
