/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useContext, type FC, useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import {
  Avatar,
  Box,
  Button,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
  Tooltip,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { type GridColDef, DataGrid } from '@mui/x-data-grid';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { useAppDispatch } from '../../../../../../../../hooks';
import { AvatarStyles } from '../../../../../../ccd/componentes/crearSeriesCcdDialog/utils/constant';
import { Title } from '../../../../../../../../components';
import { RenderDataGrid } from '../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { getTipoDocOptions } from '../../../../toolkit/services/modalBusquedaPersona/getOptionsDocumentos.service';
import { ModalColumns } from './columns/ModalColumns';
import { showAlert } from '../../../../../../../../utils/showAlert/ShowAlert';
import { busquedaAvanzadaPersona } from '../../../../toolkit/services/modalBusquedaPersona/getGrilladoPersonas.service';
import { ModalAndLoadingContext } from '../../../../../../../../context/GeneralContext';

export const BusquedaPersonas = ({
  controlHistorialTransferencias,
  resetHistorialTransferencias,
  watchHistorialTransferenciasExe,
}: {
  controlHistorialTransferencias: any;
  resetHistorialTransferencias: any;
  watchHistorialTransferenciasExe: any;
}): JSX.Element => {
  //* use context declarations
  const { generalLoading, handleGeneralLoading } = useContext(
    ModalAndLoadingContext
  );
  //* use States declaration
  const [optionsDocuments, setoptionsDocuments] = useState<any[]>([]);
  const [resultadosPersona, setResultadosPersona] = useState<any[]>([]);
  const [loadingGrid, setLoadingGrid] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const tiposDoc = await getTipoDocOptions();
      setoptionsDocuments(tiposDoc);
    })();
  }, []);

  // ? FUNCIONES ------------------

  const onSubmit = async () => {
    const alertTitle = 'Opss!';
    const noOptionSelectedMsg =
      'No se ha seleccionado ninguna opción en los controles';
    const noDocTypeSelectedMsg = 'No se ha seleccionado el tipo de documento';
    const docNumberLengthMsg =
      'El número de documento debe tener al menos 3 caracteres para realizar la búsqueda.';
    const warning = 'warning';
    const errorMsg = 'Ha ocurrido un error al realizar la búsqueda';

    if (!watchHistorialTransferenciasExe) {
      return showAlert(alertTitle, noOptionSelectedMsg, warning);
    }

    if (
      !watchHistorialTransferenciasExe?.tipo_documento?.value &&
      !watchHistorialTransferenciasExe?.numero_documento
    ) {
      return showAlert(alertTitle, noDocTypeSelectedMsg, warning);
    }

    if (watchHistorialTransferenciasExe?.numero_documento.length < 3) {
      return showAlert(alertTitle, docNumberLengthMsg, warning);
    }

    const data = {
      setLoading: setLoadingGrid,
      tipo_documento: watchHistorialTransferenciasExe?.tipo_documento?.value,
      numero_documento: watchHistorialTransferenciasExe?.numero_documento,
      primer_nombre: watchHistorialTransferenciasExe?.primer_nombre,
      primer_apellido: watchHistorialTransferenciasExe?.primer_apellido,
      razon_social: watchHistorialTransferenciasExe?.razon_social,
      nombre_comercial: watchHistorialTransferenciasExe?.nombre_comercial,
    };

    try {
      const response = await busquedaAvanzadaPersona(data);
      setResultadosPersona(response);
    } catch (err) {
      showAlert(alertTitle, errorMsg, warning);
    }
  };

  const resetFunction = (): void => {
    resetHistorialTransferencias();
    setResultadosPersona([]);
    setLoadingGrid(false);
  };

  // ? FUNCIONES ------------------

  //* -------- columns declaration -------- *//
  const columnsBusquedaPersona: GridColDef[] = [
    {
      headerName: 'Acción',
      field: 'accion',
      width: 80,
      renderCell: (params: any) => (
        <>
          <Tooltip title="Seleccionar Persona">
            <IconButton
              onClick={() => {
                resetHistorialTransferencias({
                  ...watchHistorialTransferenciasExe,
                  id_persona: params.row.id_persona,
                  persona_tranfirio: params.row.nombre_completo,
                });
                handleGeneralLoading(false);
                setResultadosPersona([]);
              }}
            >
              <Avatar sx={AvatarStyles} variant="rounded">
                <HowToRegIcon
                  sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                />
              </Avatar>
            </IconButton>
          </Tooltip>
        </>
      ),
    },
    ...ModalColumns,
  ];

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={generalLoading}
        onClose={() => {
          resetFunction();
          handleGeneralLoading(false);
        }}
      >
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <DialogTitle>
            <Title title="Búsqueda avanzada de personas" />
          </DialogTitle>
          <Divider />
          <DialogContent
            sx={{
              mb: '0px',
              justifyContent: 'center',
            }}
          >
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sm={3}
                sx={{
                  zIndex: 8,
                }}
              >
                <Controller
                  name="tipo_documento"
                  control={controlHistorialTransferencias}
                  defaultValue=""
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <Select
                      isClearable
                      value={value}
                      onChange={onChange}
                      options={optionsDocuments ?? []}
                      placeholder="Tipo de documento"
                      styles={{
                        control: (provided, state) => ({
                          ...provided,
                          borderColor: error ? 'red' : provided.borderColor,
                        }),
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Controller
                  name="numero_documento"
                  control={controlHistorialTransferencias}
                  defaultValue=""
                  rules={{
                    required: 'Campo requerido',
                    minLength: {
                      value: 4,
                      message: 'Mínimo 4 caracteres',
                    },
                  }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      fullWidth
                      label="Número de documento"
                      size="small"
                      variant="outlined"
                      value={value}
                      InputLabelProps={{ shrink: true }}
                      onChange={onChange}
                      error={!!error}
                      // required
                    />
                  )}
                />
              </Grid>

              {watchHistorialTransferenciasExe?.tipo_documento?.label ===
                'NIT' && (
                <>
                  <Grid item xs={12} sm={3}>
                    <Controller
                      name="razon_social"
                      control={controlHistorialTransferencias}
                      defaultValue=""
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <TextField
                          fullWidth
                          label="Razón social"
                          size="small"
                          variant="outlined"
                          value={value}
                          InputLabelProps={{ shrink: true }}
                          onChange={onChange}
                          error={!!error}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Controller
                      name="nombre_comercial"
                      control={controlHistorialTransferencias}
                      defaultValue=""
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <TextField
                          fullWidth
                          label="Nombre comercial"
                          size="small"
                          variant="outlined"
                          value={value}
                          InputLabelProps={{ shrink: true }}
                          onChange={onChange}
                          error={!!error}
                        />
                      )}
                    />
                  </Grid>
                </>
              )}

              {watchHistorialTransferenciasExe?.tipo_documento?.label !==
                'NIT' && (
                <>
                  <Grid item xs={12} sm={3}>
                    <Controller
                      name="primer_nombre"
                      control={controlHistorialTransferencias}
                      defaultValue=""
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <TextField
                          fullWidth
                          label="Primer nombre"
                          size="small"
                          variant="outlined"
                          value={value}
                          InputLabelProps={{ shrink: true }}
                          onChange={onChange}
                          error={!!error}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <Controller
                      name="primer_apellido"
                      control={controlHistorialTransferencias}
                      defaultValue=""
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <TextField
                          fullWidth
                          label="Primer apellido"
                          size="small"
                          variant="outlined"
                          value={value}
                          InputLabelProps={{ shrink: true }}
                          onChange={onChange}
                          error={!!error}
                        />
                      )}
                    />
                  </Grid>
                </>
              )}

              <Grid
                item
                xs={12}
                sm={3}
                sx={{
                  marginBottom: '1.2rem',
                }}
              >
                <LoadingButton
                  loading={loadingGrid}
                  variant="contained"
                  type="submit"
                  startIcon={<SearchIcon />}
                  color="primary"
                >
                  BUSCAR PERSONA
                </LoadingButton>
              </Grid>
            </Grid>

            {resultadosPersona.length > 0 ? (
              <RenderDataGrid
                title="Resultados de la búsqueda"
                rows={resultadosPersona ?? []}
                columns={columnsBusquedaPersona ?? []}
              />
            ) : (
              <Typography
                variant="subtitle2"
                sx={{ my: '7rem', textAlign: 'center', fontWeight: 'bold' }}
              >
                No se han encontrado resultados y/o no se ha realizado la
                búsqueda
              </Typography>
            )}
          </DialogContent>
          <Divider />
          <DialogActions>
            <Stack
              direction="row"
              spacing={2}
              sx={{ mr: '15px', mb: '10px', mt: '10px' }}
            >
              <Button
                variant="outlined"
                onClick={() => {
                  resetFunction();
                }}
                startIcon={<CleanIcon />}
              >
                LIMPIAR BÚSQUEDA
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  resetFunction();
                  handleGeneralLoading(false);
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
