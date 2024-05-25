/* eslint-disable @typescript-eslint/naming-convention */
import {
  Avatar,
  Button,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
} from '@mui/material';

// ? icons
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// ? components
import { Title } from '../../../../../../../components';
import { RenderDataGrid } from '../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { columnsAtom } from './columnsAtom/columnsAtom';
import { useContext, useState } from 'react';
import { ModalAndLoadingContext } from '../../../../../../../context/GeneralContext';
import { DownloadButton } from '../../../../../../../utils/DownloadButton/DownLoadButton';
import { containerStyles } from '../../../../../tca/screens/utils/constants/constants';
import InfoIcon from '@mui/icons-material/Info';
import { PanelVentanillaContext } from '../../../../context/PanelVentanillaContext';
import { useAppSelector } from '../../../../../../../hooks';
import { getArchivoAnexoPqrsdf } from '../../../../toolkit/thunks/PqrsdfyComplementos/anexos/archivo/getArchiAnexoPqr.service';
import { getArchivoAnexoComplemento } from '../../../../toolkit/thunks/PqrsdfyComplementos/anexos/archivo/getArchiAneComp.service';
import { getMetadatosPqrsdf } from '../../../../toolkit/thunks/PqrsdfyComplementos/metadatos/getMetadatosPqrsdf.service';
import { getMetadatoComplemento } from '../../../../toolkit/thunks/PqrsdfyComplementos/metadatos/getMetadatosComplemento.service';
import { formatDate } from '../../../../../../../utils/functions/formatDate';
import { ModalDenuncia } from '../modalDenuncia/ModalDenuncia';
import { getInfoDenuncia } from '../../../../toolkit/thunks/PqrsdfyComplementos/denuncia/getInfoDenuncia.service';

export const ModalAtomInfoElement = (props: any): JSX.Element => {
  // ! debe recibir una cantidad de props aprox de 10
  const { currentElementPqrsdComplementoTramitesYotros } = useAppSelector(
    (state) => state.PanelVentanillaSlice
  );
  //* navigate declaration
  const navigate = useNavigate();

  //* destructuring props
  const { infoTitle, titleOpcion } = props;

  //* se debe traer de un context el estado de los anexos y de los metadatos
  const {
    handleGeneralLoading,
    openModalOne: infoAnexos,
    openModalTwo: infoMetadatos,
    handleOpenModalOne: handleOpenInfoAnexos,
    handleOpenModalTwo: handleOpenInfoMetadatos,
  } = useContext(ModalAndLoadingContext);

  //* datos que se setean dentro de los anexos y los metadatos
  const {
    anexos,
    metadatos,
    setMetadatos,
    archivoAnexos,
    setArchivoAnexos,
  } = useContext(PanelVentanillaContext);

  // ? useState declaration
  const [infoDenuncia, setInfoDenuncia] = useState<any>(null);

  const colums = [
    ...columnsAtom,
    {
      headerName: 'Acciones',
      field: 'Acciones',
      minWidth: 150,
      renderCell: (params: any) => {
        return (
          <>
            <Tooltip title="Ver anexo">
              <IconButton
                onClick={async () => {
                  let archivo;
                  if (params.row.pqrsdf) {
                    archivo = await getArchivoAnexoPqrsdf(
                      params.row.id_anexo,
                      handleOpenInfoAnexos,
                      handleOpenInfoMetadatos
                    );
                  } else {
                    archivo = await getArchivoAnexoComplemento(
                      params.row.id_anexo,
                      handleOpenInfoAnexos,
                      handleOpenInfoMetadatos
                    );
                  }

                  setArchivoAnexos({
                    anexoActual: params.row,
                    archivo: archivo?.ruta_archivo,
                    infoArchivo: archivo,
                  });
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
                    sx={{
                      color: 'primary.main',
                      width: '18px',
                      height: '18px',
                    }}
                  />
                </Avatar>
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Grid container sx={containerStyles}>
        <Grid item xs={12}>
          <Title title={infoTitle || 'Información'} />

          {/* condicional sobre esto para añadir campos diferentes para el complemento o para la pqrsdf */}

          <Grid
            container
            spacing={2}
            sx={{
              mt: '1.5rem',
              mb: '2rem',
            }}
          >
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                disabled
                label="Radicado"
                size="small"
                variant="outlined"
                value={
                  currentElementPqrsdComplementoTramitesYotros?.radicado ?? ''
                }
                InputLabelProps={{ shrink: true }}
                style={{ textTransform: 'uppercase', fontSize: '1.2rem' }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                disabled
                label="Títular"
                size="small"
                variant="outlined"
                value={
                  currentElementPqrsdComplementoTramitesYotros?.nombre_completo_titular ??
                  ''
                }
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                disabled
                label="Cantidad de anexos"
                size="small"
                variant="outlined"
                value={
                  currentElementPqrsdComplementoTramitesYotros?.cantidad_anexos ??
                  ''
                }
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                disabled
                multiline
                rows={2}
                label="Asunto"
                size="small"
                variant="outlined"
                value={
                  currentElementPqrsdComplementoTramitesYotros?.asunto ?? ''
                }
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            {/*se procede a añadir los nuevos campos para el renderizado de los elementos*/}
            {currentElementPqrsdComplementoTramitesYotros?.es_pqrsdf && (
              <>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={{
                    mt: '.5rem',
                    mb: '.5rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                  }}
                >
                  <TextField
                    fullWidth
                    disabled
                    label="Tipo de PQRSDF"
                    size="small"
                    variant="outlined"
                    value={
                      currentElementPqrsdComplementoTramitesYotros?.tipo_PQRSDF ??
                      'N/A'
                    }
                    InputLabelProps={{ shrink: true }}
                    style={{ textTransform: 'uppercase', fontSize: '1.2rem' }}
                  />
                  {(currentElementPqrsdComplementoTramitesYotros?.tipo_PQRSDF ===
                    'Denuncia' ||
                    currentElementPqrsdComplementoTramitesYotros?.cod_tipo_PQRSDF ===
                      'D') && (
                    <Button
                      sx={{
                        mt: '.8rem',
                      }}
                      color="primary"
                      variant="outlined"
                      onClick={async () => {
                        handleGeneralLoading(true);
                        const GET_DENUNCIA_INFO = await getInfoDenuncia(
                          currentElementPqrsdComplementoTramitesYotros?.id_PQRSDF,
                          handleGeneralLoading
                        );
                        console.log(GET_DENUNCIA_INFO);
                        setInfoDenuncia(GET_DENUNCIA_INFO);
                      }}
                      startIcon={<InfoIcon />}
                    >
                      ver información de denuncia
                    </Button>
                  )}
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={{
                    mt: '.5rem',
                    mb: '.5rem',
                  }}
                >
                  <TextField
                    fullWidth
                    disabled
                    label="Fecha de registro"
                    size="small"
                    variant="outlined"
                    value={
                      formatDate(
                        currentElementPqrsdComplementoTramitesYotros?.fecha_registro
                      ) ?? 'N/A'
                    }
                    InputLabelProps={{ shrink: true }}
                    style={{ textTransform: 'uppercase', fontSize: '1.2rem' }}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={{
                    mt: '.5rem',
                    mb: '.5rem',
                  }}
                >
                  <TextField
                    fullWidth
                    disabled
                    label="Medio de solicitud"
                    size="small"
                    variant="outlined"
                    value={
                      currentElementPqrsdComplementoTramitesYotros?.medio_solicitud ??
                      'N/A'
                    }
                    InputLabelProps={{ shrink: true }}
                    style={{ textTransform: 'uppercase', fontSize: '1.2rem' }}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={{
                    mt: '.5rem',
                    mb: '.5rem',
                  }}
                >
                  <TextField
                    fullWidth
                    disabled
                    label="Forma de presentación"
                    size="small"
                    variant="outlined"
                    value={
                      currentElementPqrsdComplementoTramitesYotros?.forma_presentacion ??
                      'N/A'
                    }
                    InputLabelProps={{ shrink: true }}
                    style={{ textTransform: 'uppercase', fontSize: '1.2rem' }}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={{
                    mt: '.5rem',
                    mb: '.5rem',
                  }}
                >
                  <TextField
                    fullWidth
                    disabled
                    label="Número de folios totales"
                    size="small"
                    variant="outlined"
                    value={
                      currentElementPqrsdComplementoTramitesYotros?.numero_folios ??
                      'N/A'
                    }
                    InputLabelProps={{ shrink: true }}
                    style={{ textTransform: 'uppercase', fontSize: '1.2rem' }}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={{
                    mt: '.5rem',
                    mb: '.5rem',
                  }}
                >
                  <TextField
                    fullWidth
                    disabled
                    label="persona que recibe la solicitud"
                    size="small"
                    variant="outlined"
                    value={
                      currentElementPqrsdComplementoTramitesYotros?.persona_recibe ??
                      'N/A'
                    }
                    InputLabelProps={{ shrink: true }}
                    style={{ textTransform: 'uppercase', fontSize: '1.2rem' }}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={{
                    mt: '.5rem',
                    mb: '.5rem',
                  }}
                >
                  <TextField
                    fullWidth
                    disabled
                    label="Sucursal implicada"
                    size="small"
                    variant="outlined"
                    value={
                      currentElementPqrsdComplementoTramitesYotros?.nombre_sucursal_implicada ??
                      'N/A'
                    }
                    InputLabelProps={{ shrink: true }}
                    style={{ textTransform: 'uppercase', fontSize: '1.2rem' }}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={{
                    mt: '.5rem',
                    mb: '.5rem',
                  }}
                >
                  <TextField
                    fullWidth
                    disabled
                    label="Sucursal de recepción física"
                    size="small"
                    variant="outlined"
                    value={
                      currentElementPqrsdComplementoTramitesYotros?.nombre_sucursal_recepcion_fisica ??
                      'N/A'
                    }
                    InputLabelProps={{ shrink: true }}
                    style={{ textTransform: 'uppercase', fontSize: '1.2rem' }}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={{
                    mt: '.5rem',
                    mb: '.5rem',
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
                    style={{ textTransform: 'uppercase', fontSize: '1.2rem' }}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={{
                    mt: '.5rem',
                    mb: '.5rem',
                  }}
                >
                  <TextField
                    fullWidth
                    disabled
                    label="Fecha de radicado"
                    size="small"
                    variant="outlined"
                    value={
                      currentElementPqrsdComplementoTramitesYotros?.fecha_radicado &&
                      !isNaN(
                        new Date(
                          currentElementPqrsdComplementoTramitesYotros.fecha_radicado
                        ).getTime()
                      )
                        ? formatDate(
                            currentElementPqrsdComplementoTramitesYotros.fecha_radicado
                          )
                        : 'N/A'
                    }
                    InputLabelProps={{ shrink: true }}
                    style={{ textTransform: 'uppercase', fontSize: '1.2rem' }}
                  />
                </Grid>
              </>
            )}

            {/*definicion de elemento cuando es complemento*/}

            {currentElementPqrsdComplementoTramitesYotros?.es_complemento && (
              <>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={{
                    mt: '.5rem',
                    mb: '.5rem',
                  }}
                >
                  <TextField
                    fullWidth
                    disabled
                    label="Fecha complemento"
                    size="small"
                    variant="outlined"
                    value={
                      formatDate(
                        currentElementPqrsdComplementoTramitesYotros?.fecha_complemento
                      ) ?? 'N/A'
                    }
                    InputLabelProps={{ shrink: true }}
                    style={{ textTransform: 'uppercase', fontSize: '1.2rem' }}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={{
                    mt: '.5rem',
                    mb: '.5rem',
                  }}
                >
                  <TextField
                    fullWidth
                    disabled
                    label="Número de folios totales"
                    size="small"
                    variant="outlined"
                    value={
                      currentElementPqrsdComplementoTramitesYotros?.nro_folios_totales ??
                      '0'
                    }
                    InputLabelProps={{ shrink: true }}
                    style={{ textTransform: 'uppercase', fontSize: '1.2rem' }}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={{
                    mt: '.5rem',
                    mb: '.5rem',
                  }}
                >
                  <TextField
                    fullWidth
                    disabled
                    label="Descripción del complemento"
                    size="small"
                    variant="outlined"
                    value={
                      currentElementPqrsdComplementoTramitesYotros?.descripcion ??
                      'N/A'
                    }
                    InputLabelProps={{ shrink: true }}
                    style={{ textTransform: 'uppercase', fontSize: '1.2rem' }}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={{
                    mt: '.5rem',
                    mb: '.5rem',
                  }}
                >
                  <TextField
                    fullWidth
                    disabled
                    label="Nombre completo de quien recibe"
                    size="small"
                    variant="outlined"
                    value={
                      currentElementPqrsdComplementoTramitesYotros?.nombre_completo_recibe ??
                      'N/A'
                    }
                    InputLabelProps={{ shrink: true }}
                    style={{ textTransform: 'uppercase', fontSize: '1.2rem' }}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </Grid>

        {/*arriba*/}
        {/* condicional sobre esto para añadir campos diferentes para el complemento o para la pqrsdf */}

        {anexos.length > 0 && (
          <RenderDataGrid
            rows={anexos || []}
            columns={colums || []}
            title={titleOpcion}
            // ? se debe reemplazar ese button por el ojito que aparecere dentro de las columnas de la tabla para así ver los anexos
          />
        )}

        {/* ------------------------------------------------------------------------- */}
        {/* ------------------------------------------------------------------------- */}
        {/* --- se procede a insertar los campos de la información de los anexos ---  */}

        {/* condicional para mostrar los anexos después de seleccionar el respecivo anexo */}
        {infoAnexos ? (
          <>
            <Title
              title={`Anexo:  ${
                archivoAnexos?.anexoActual?.nombre_anexo ?? ''
              }`}
            />
            <Grid
              container
              spacing={2}
              sx={{
                mt: '1.5rem',
                mb: '2rem',
                justifyContent: 'center',
              }}
            >
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  label="Observación"
                  size="small"
                  disabled
                  variant="outlined"
                  value={
                    archivoAnexos?.anexoActual?.observacion_digitalizacion ?? ''
                  }
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <DownloadButton
                  fileName={`archivo anexo ${archivoAnexos?.anexoActual?.nombre_anexo}`}
                  fileUrl={archivoAnexos?.archivo}
                  condition={false}
                />
              </Grid>

              <Stack
                direction="column"
                justifyContent="center"
                spacing={2}
                sx={{ mb: '20px', mt: '20px' }}
              >
                <Button
                  color="warning"
                  variant="contained"
                  onClick={() => {
                    // ? --- al cerrar la infromación del anexo se debe cerrar el elemento del anexo y del metadato si estuviera abierto
                    handleOpenInfoAnexos(false);
                    handleOpenInfoMetadatos(false);
                  }}
                  startIcon={<CloseIcon />}
                >
                  CERRAR INFORMACIÓN DE ANEXO
                </Button>
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={async () => {
                    let metadatos;
                    if (archivoAnexos?.anexoActual?.pqrsdf) {
                      metadatos = await getMetadatosPqrsdf(
                        archivoAnexos?.anexoActual?.id_anexo,
                        handleOpenInfoMetadatos
                      );
                    } else {
                      metadatos = await getMetadatoComplemento(
                        archivoAnexos?.anexoActual?.id_anexo,
                        handleOpenInfoMetadatos
                      );
                    }
                    setMetadatos(metadatos);
                    //  console.log('')(infoMetadatos);
                    // handleOpenInfoMetadatos(true);
                  }}
                  startIcon={<InfoIcon />}
                >
                  ver información de metadato
                </Button>
              </Stack>
            </Grid>
          </>
        ) : null}

        {/* --- se procede a insertar los campos de la información de los anexos ---  */}
        {/* ------------------------------------------------------------------------- */}
        {/* ------------------------------------------------------------------------- */}

        {/* --- se procede a insertar los campos de la información de los METADATOS ---  */}
        {/* ------------------------------------------------------------------------- */}
        {/* ------------------------------------------------------------------------- */}

        {/* condicional para mostrar los metadatos después de seleccionar el respecivo anexo */}

        {infoMetadatos && infoAnexos ? (
          <>
            <Title title="Metadatos" />
            <Grid
              container
              spacing={2}
              sx={{
                mt: '1.5rem',
                mb: '2rem',
                justifyContent: 'center',
              }}
            >
              {/* primera fila de elementos de los metadatos */}

              <Grid item xs={12} sm={3.5}>
                <TextField
                  fullWidth
                  label="Número de folios"
                  size="small"
                  disabled
                  variant="outlined"
                  value={metadatos?.numero_folios ?? ''}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  fullWidth
                  label="Asunto"
                  size="small"
                  disabled
                  variant="outlined"
                  value={metadatos?.asunto ?? ''}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={3.5}>
                <TextField
                  fullWidth
                  label="Fecha creación de archivo"
                  size="small"
                  disabled
                  variant="outlined"
                  value={metadatos?.fecha_creacion_archivo ?? ''}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              {/* segunda fila de elementos de los metadatos */}

              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="Archivo origen en el sistema"
                  size="small"
                  disabled
                  variant="outlined"
                  value={metadatos?.archivo_origen_sistema ?? ''}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="Origen de archivo"
                  size="small"
                  disabled
                  variant="outlined"
                  value={metadatos?.origen_archivo ?? ''}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="Categoría de archivo"
                  size="small"
                  disabled
                  variant="outlined"
                  value={metadatos?.categoria_archivo ?? ''}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="¿Tiene copia física?"
                  size="small"
                  disabled
                  variant="outlined"
                  value={metadatos?.tiene_replica_fisica ? 'SI' : 'NO'}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              {/* tercera fila de los metadatos */}

              {/* revisar si se debe cambiar a un select, ya que las palabras clave pueden terminar siendo mas de una */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Palabras clave"
                  size="small"
                  disabled
                  variant="outlined"
                  value={/*metadatos?.tiene_replica_fisica?.join(', ') ??*/ ''}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nombre de tipología documental"
                  size="small"
                  disabled
                  variant="outlined"
                  value={'Tipología documental'}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              {/* botones es los metadatos */}
              <Stack
                direction="column"
                justifyContent="center"
                spacing={2}
                sx={{ mb: '20px', mt: '20px' }}
              >
                <Button
                  color="warning"
                  variant="contained"
                  onClick={() => {
                    handleOpenInfoMetadatos(false);
                    // handleOpenInfoAnexos(false);
                  }}
                  startIcon={<CloseIcon />}
                >
                  CERRAR INFORMACIÓN DE METADATO
                </Button>
              </Stack>
            </Grid>
          </>
        ) : null}

        {/* --- se procede a insertar los campos de la información de los complementos ---  */}
        {/* ------------------------------------------------------------------------- */}
        {/* ------------------------------------------------------------------------- */}

        {/* ------ ACCIONES FINALES SOBRE EL ATOM ---- CERRAR Y VOLVER AL MÓDULO DE VENTANILLA -------  */}
        <Stack
          direction="row"
          justifyContent="flex-end"
          spacing={2}
          sx={{ mb: '20px', mt: '20px' }}
        >
          <Button
            color="error"
            variant="outlined"
            onClick={() => {
              navigate('/app/gestor_documental/panel_ventanilla/');
              handleOpenInfoMetadatos(false);
              handleOpenInfoAnexos(false);
              setMetadatos([]);
            }}
            startIcon={<ArrowBackIcon />}
          >
            VOLVER A PANEL DE VENTANILLA
          </Button>
        </Stack>
      </Grid>

      {/* modal de la denuncia */}
      <ModalDenuncia
        setInfoDenuncia={setInfoDenuncia}
        infoDenuncia={infoDenuncia}
      />
      {/* modal de la denuncia */}
    </>
  );
};
