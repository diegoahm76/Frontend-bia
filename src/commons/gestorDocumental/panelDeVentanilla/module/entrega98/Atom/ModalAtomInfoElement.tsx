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
import { Title } from '../../../../../../components';
import { RenderDataGrid } from '../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  columnsAtom,
  rowsEJEMPLO,
  rowsEjemploAnexosDePqrsdf,
} from './columnsAtom/columnsAtom';
import { useContext } from 'react';
import { ModalAndLoadingContext } from '../../../../../../context/GeneralContext';
import { DownloadButton } from '../../../../../../utils/DownloadButton/DownLoadButton';
import { containerStyles } from '../../../../tca/screens/utils/constants/constants';
import InfoIcon from '@mui/icons-material/Info';
import { PanelVentanillaContext } from '../../../context/PanelVentanillaContext';
import { useAppSelector } from '../../../../../../hooks';

/* complementos:
            "nombre_completo_titular": "SUPERUSUARIO 1er NOMBRE SUPERUSUARIO 1er APELL",
            "asunto": "AAAA",
            "cantidad_anexos": 0,
            "radicado": "ABC123-2023-R12345",

*/

/* pqrsdf 
            "nombre_completo_titular": "SUPERUSUARIO 1er NOMBRE SUPERUSUARIO 1er APELL",
            "asunto": "SIN IDENTIFICAR",
            "cantidad_anexos": 3,
            "radicado": "XYZ789-2023-R67890",
*/

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
    openModalOne: infoAnexos,
    openModalTwo: infoMetadatos,
    handleOpenModalOne: handleOpenInfoAnexos,
    handleOpenModalTwo: handleOpenInfoMetadatos,
  } = useContext(ModalAndLoadingContext);

  //* datos que se setean dentro de los anexos y los metadatos
  const { anexos, metadatos, setAnexos, setMetadatos } = useContext(
    PanelVentanillaContext
  );

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
                onClick={() => {
                  console.log('ver anexo');
                  console.log(params.row);
                  setAnexos(params.row);
                  //* se debe analizar si el estado persiste al abrir el modal se anexan los metadatos desde acá problablemente
                  handleOpenInfoAnexos(true);
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
                label="Asunto"
                size="small"
                variant="outlined"
                value={
                  currentElementPqrsdComplementoTramitesYotros?.asunto ?? ''
                }
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </Grid>

        <RenderDataGrid
          rows={rowsEjemploAnexosDePqrsdf || []}
          columns={colums || []}
          title={titleOpcion}
          // ? se debe reemplazar ese button por el ojito que aparecere dentro de las columnas de la tabla para así ver los anexos
        />

        {/* ------------------------------------------------------------------------- */}
        {/* ------------------------------------------------------------------------- */}
        {/* --- se procede a insertar los campos de la información de los anexos ---  */}

        {/* condicional para mostrar los anexos después de seleccionar el respecivo anexo */}
        {infoAnexos ? (
          <>
            <Title
              title={`Anexo:  ${anexos?.radicado ?? ''} , Nombre de anexo : ${
                anexos?.nombre ?? ''
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
                  value={anexos?.observacion ?? ''}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <DownloadButton
                  fileName="prueba"
                  fileUrl="https://back-end-bia-beta.up.railway.app/api/v1/documentos/1/download"
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
                    console.log('cerrando información de anexo');
                  }}
                  startIcon={<CloseIcon />}
                >
                  CERRAR INFORMACIÓN DE ANEXO
                </Button>
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={() => {
                    // ? al cerrar la infromación del anexo se debe cerrar el elemento del anexo y del metadato si estuviera abierto
                    console.log('cerrando información de anexo');
                    // handleOpenInfoAnexos(false);

                    //* se debe hacer la petición del anexo así mostrarlo
                    setMetadatos([]); //* seguramente será un objeto
                    handleOpenInfoMetadatos(true);
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
                  value={'5'}
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
                  value={'Metadatos asunto'}
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
                  value={'11/05/2023'}
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
                  value={'Cédula de ciudadanía'}
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
                  value={'Origen de archivo'}
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
                  value={'Digital'}
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
                  value={'SI'}
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
                  value={'Clave1, Clave2. Clave3'}
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
                    console.log('cerrando información de METADATO');
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
            }}
            startIcon={<ArrowBackIcon />}
          >
            VOLVER A PANEL DE VENTANILLA
          </Button>
        </Stack>
      </Grid>
    </>
  );
};
