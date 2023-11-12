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
import { columnsAtom, rowsEJEMPLO } from './columnsAtom/columnsAtom';
import { useContext } from 'react';
import { ModalAndLoadingContext } from '../../../../../../context/GeneralContext';
import { DownloadButton } from '../../../../../../utils/DownloadButton/DownLoadButton';
import { containerStyles } from '../../../../tca/screens/utils/constants/constants';

export const ModalAtomInfoElement = (props: any): JSX.Element => {
  // ! debe recibir una cantidad de props aprox de 10

  //* navigate declaration
  const navigate = useNavigate();

  const { infoTitle } = props;

  //* se debe traer de un context el estado de los anexos y de los metadatos
  const { openModalOne: infoAnexos, openModalTwo: infoMetadatos } = useContext(
    ModalAndLoadingContext
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
                // value={value}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => {
                  // onChange(e.target.value);
                  console.log(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                disabled
                label="Títular"
                size="small"
                variant="outlined"
                // value={value}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => {
                  // onChange(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                disabled
                label="Cantidad de anexos"
                size="small"
                variant="outlined"
                // value={value}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => {
                  // onChange(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                disabled
                label="Asunto"
                size="small"
                variant="outlined"
                // value={value}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => {
                  // onChange(e.target.value);
                  console.log(e.target.value);
                  // console.log(e.target.value);
                }}
              />
            </Grid>
          </Grid>
        </Grid>

        <RenderDataGrid
          rows={rowsEJEMPLO || []}
          columns={colums || []}
          title="Listado de anexos"
          // ? se debe reemplazar ese button por el ojito que aparecere dentro de las columnas de la tabla para así ver los anexos
        />

        {/* ------------------------------------------------------------------------- */}
        {/* ------------------------------------------------------------------------- */}
        {/* --- se procede a insertar los campos de la información de los anexos ---  */}
        <Title title={'Anexo:  # 1 , Nombre de anexo : anexo X'} />
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
              // value={value}
              InputLabelProps={{ shrink: true }}
              onChange={(e) => {
                // onChange(e.target.value);
                console.log(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Tooltip title="Archivo adjunto">
              <DownloadButton
                fileName="prueba"
                fileUrl="https://back-end-bia-beta.up.railway.app/api/v1/documentos/1/download"
                condition={false}
              />
            </Tooltip>
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
                // ? al cerrar la infromación del anexo se debe cerrar el elemento del anexo y del metadato si estuviera abierto
                console.log('cerrando información de anexo');
              }}
              startIcon={<CloseIcon />}
            >
              CERRAR INFORMACIÓN DE ANEXO
            </Button>
          </Stack>
        </Grid>
        {/* --- se procede a insertar los campos de la información de los anexos ---  */}
        {/* ------------------------------------------------------------------------- */}
        {/* ------------------------------------------------------------------------- */}

        {/* --- se procede a insertar los campos de la información de los METADATOS ---  */}
        {/* ------------------------------------------------------------------------- */}
        {/* ------------------------------------------------------------------------- */}

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
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              label="Observación"
              size="small"
              disabled
              variant="outlined"
              // value={value}
              InputLabelProps={{ shrink: true }}
              onChange={(e) => {
                // onChange(e.target.value);
                console.log(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Tooltip title="Archivo adjunto">
              <DownloadButton
                fileName="prueba"
                fileUrl="https://back-end-bia-beta.up.railway.app/api/v1/documentos/1/download"
                condition={false}
              />
            </Tooltip>
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
                console.log('cerrando información de METADATO');
              }}
              startIcon={<CloseIcon />}
            >
              CERRAR INFORMACIÓN DE METADATO
            </Button>
          </Stack>
        </Grid>

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
