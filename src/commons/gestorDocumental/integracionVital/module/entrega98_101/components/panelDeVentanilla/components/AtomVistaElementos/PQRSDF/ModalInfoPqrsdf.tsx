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
import { ModalAndLoadingContext } from '../../../../../../../../../../context/GeneralContext';
import { useAppSelector } from '../../../../../../../../../../hooks';
import { getArchivoAnexoTramite } from '../../../../../../../../panelDeVentanilla/toolkit/thunks/TramitesyServiciosyRequerimientos/archivo/getArchivoTramite.service';
import { getMetadatosArchivoTramite } from '../../../../../../../../panelDeVentanilla/toolkit/thunks/TramitesyServiciosyRequerimientos/metadatos/getMetadatosAnexoTramite.service';
import { columnsModalOpas } from '../../../../../../../../panelDeVentanilla/module/entrega98_101/Atom/Opas/columns/columnsModalOpas';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { RenderDataGrid } from '../../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { Title } from '../../../../../../../../../../components';
import { DownloadButton } from '../../../../../../../../../../utils/DownloadButton/DownLoadButton';
import CloseIcon from '@mui/icons-material/Close';
import { getAnexosTramite } from '../../../../../../../../panelDeVentanilla/toolkit/thunks/TramitesyServiciosyRequerimientos/anexos/getAnexosTramites.service';
import { getAnexosPqrsdf } from '../../../../../../../../panelDeVentanilla/toolkit/thunks/PqrsdfyComplementos/anexos/getAnexosPqrsdf.service';
import { getArchivoAnexoPqrsdf } from '../../../../../../../../panelDeVentanilla/toolkit/thunks/PqrsdfyComplementos/anexos/archivo/getArchiAnexoPqr.service';
import { getAnexosOpa } from '../../../../../../../../panelDeVentanilla/toolkit/thunks/opas/anexos/getAnexoByIdOpa.service';
import { getArchivoAnexoOpa } from '../../../../../../../../panelDeVentanilla/toolkit/thunks/opas/archivo/getArchivoAnexoOpas.service';
import { getAnexosOtros } from '../../../../../../../../panelDeVentanilla/toolkit/thunks/otros/anexos/getAnexosOtros.service';
import { getAnexosComplemento } from '../../../../../../../../panelDeVentanilla/toolkit/thunks/PqrsdfyComplementos/anexos/getAnexosComplementos.service';
import { getArchivoAnexoComplemento } from '../../../../../../../../panelDeVentanilla/toolkit/thunks/PqrsdfyComplementos/anexos/archivo/getArchiAneComp.service';

export const ModalInfoElementos = ({
  openModalOne,
  openModalTwo,
  handleOpenModalOne,
  handleOpenModalTwo,
}: any): JSX.Element => {
  // ? redux states use
  const { currentElementPqrsdComplementoTramitesYotros } = useAppSelector(
    (state) => state.VitalSlice
  );
  // ? state para almacenar la informacion de los metadatos
  const [infoMetadatos, setInfoMetadatos] = useState<any>({});
  // ? state para almacenar la informacion de los anexos
  const [infoAnexos, setInfoAnexos] = useState<any>([]);

  //* use effect para cargar los datos de los anexos
  useEffect(() => {
    if (!openModalOne) return;

    (async () => {
      //* para pqrsdf
      if (currentElementPqrsdComplementoTramitesYotros?.id_PQRSDF) {
        try {
          const res = await getAnexosPqrsdf(
            currentElementPqrsdComplementoTramitesYotros?.id_PQRSDF
          );
          setInfoAnexos(res);
          console.log(res);
        } catch (error) {
          console.error(error);
        }
        return;
      }
      //* para tramites
      if (currentElementPqrsdComplementoTramitesYotros?.id_solicitud_tramite && currentElementPqrsdComplementoTramitesYotros?.tipo_solicitud != 'OPA') {
        try {
          const res = await getAnexosTramite(
            currentElementPqrsdComplementoTramitesYotros?.id_solicitud_tramite
          );
          setInfoAnexos(res);
          console.log(res);
        } catch (error) {
          console.error(error);
        }
        return;
      }

      //* para opas
     if (currentElementPqrsdComplementoTramitesYotros?.id_solicitud_tramite && currentElementPqrsdComplementoTramitesYotros?.tipo_solicitud == 'OPA') {
        try {
          const res = await getAnexosOpa(
            currentElementPqrsdComplementoTramitesYotros?.id_solicitud_tramite
          );
          setInfoAnexos(res);
          console.log(res);
        } catch (error) {
          console.error(error);
        }
        return;
      }
      //* para otros
      if (currentElementPqrsdComplementoTramitesYotros?.id_otros) {
        try {
          const res = await getAnexosOtros(
            currentElementPqrsdComplementoTramitesYotros?.id_otros
          );
          setInfoAnexos(res);
          console.log(res);
        } catch (error) {
          console.error(error);
        }
        return;
      }


      if (currentElementPqrsdComplementoTramitesYotros?.idComplementoUsu_PQR) {
        try {
          const res = await getAnexosComplemento(
            currentElementPqrsdComplementoTramitesYotros?.idComplementoUsu_PQR
          );
          setInfoAnexos(res);
          console.log(res);
        } catch (error) {
          console.error(error);
        }
        return;
      }
    })();
  }, [openModalOne]);

  const columns = [
    ...columnsModalOpas,
    {
      headerName: 'Ver archivo',
      field: 'Detalle',
      width: 200,
      renderCell: (params: any) => (
        <Tooltip title="Ver archivo">
          <IconButton
            onClick={async () => {

              if(currentElementPqrsdComplementoTramitesYotros?.id_PQRSDF){

              try {
                handleOpenModalTwo(true);
                const resArchivoTramite = await getArchivoAnexoPqrsdf(
                  params.row.id_anexo
                );
                console.log('resByAnexo', resArchivoTramite);
                setInfoMetadatos({ ...resArchivoTramite });
              } catch (err) {
                console.log(err);
                handleOpenModalTwo(false);
              }
              return;
            }

            if(currentElementPqrsdComplementoTramitesYotros?.id_solicitud_tramite && currentElementPqrsdComplementoTramitesYotros?.tipo_solicitud != 'OPA'){
              try {
                handleOpenModalTwo(true);
                const resArchivoTramite = await getArchivoAnexoTramite(
                  params.row.id_anexo
                );
                console.log('resByAnexo', resArchivoTramite);
                setInfoMetadatos({ ...resArchivoTramite });
              } catch (err) {
                console.log(err);
                handleOpenModalTwo(false);
              }
              return;
            }
            if(currentElementPqrsdComplementoTramitesYotros?.id_solicitud_tramite && currentElementPqrsdComplementoTramitesYotros?.tipo_solicitud == 'OPA'){
              try {
                handleOpenModalTwo(true);
                const resArchivoTramite = await getArchivoAnexoOpa(
                  params.row.id_anexo
                );
                console.log('resByAnexo', resArchivoTramite);
                setInfoMetadatos({ ...resArchivoTramite });
              } catch (err) {
                console.log(err);
                handleOpenModalTwo(false);
              }
              return;
            }

            if(currentElementPqrsdComplementoTramitesYotros?.id_otros){
              try {
                handleOpenModalTwo(true);
                const resArchivoTramite = await getArchivoAnexoOpa(
                  params.row.id_anexo
                );
                console.log('resByAnexo', resArchivoTramite);
                setInfoMetadatos({ ...resArchivoTramite });
              } catch (err) {
                console.log(err);
                handleOpenModalTwo(false);
              }
              return;
            }

            if(currentElementPqrsdComplementoTramitesYotros?.idComplementoUsu_PQR){
              try {
                handleOpenModalTwo(true);
                const resArchivoTramite = await getArchivoAnexoComplemento(
                  params.row.id_anexo
                );
                console.log('resByAnexo', resArchivoTramite);
                setInfoMetadatos({ ...resArchivoTramite });
              } catch (err) {
                console.log(err);
                handleOpenModalTwo(false);
              }
              return;
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
        open={openModalOne}
        onClose={() => {
          handleOpenModalOne(false);
          handleOpenModalTwo(false);
        }}
      >
        <Box component="form">
          <DialogTitle>
            <Title title="Información del elemento seleccionado" />
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
              {infoAnexos.length > 0 && (
                <RenderDataGrid
                  title="Anexos"
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
                          label="Nombre del archivo"
                          size="small"
                          variant="outlined"
                          value={infoMetadatos?.nombre_de_Guardado ?? 'N/A'}
                          InputLabelProps={{ shrink: true }}
                          inputProps={{ maxLength: 255 }}
                        />
                      </Grid>
                    </Grid>
                  </>
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
                  ></Typography>
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
