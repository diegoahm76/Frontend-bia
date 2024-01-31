/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

//! libraries or frameworks
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
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { type GridColDef, DataGrid } from '@mui/x-data-grid';
import { Controller } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

/*import { AvatarStyles } from '../../../../../../../../../gestorDocumental/ccd/componentes/crearSeriesCcdDialog/utils/constant';
import { Title } from '../../../../../../../../../../components';
import { useLideresXUnidadOrganizacional } from '../../../../hook/useLideresXUnidadOrg';*/
import Select from 'react-select';
import { useAppDispatch } from '../../../../../../../../hooks';
import { AvatarStyles } from '../../../../../../ccd/componentes/crearSeriesCcdDialog/utils/constant';
import { Title } from '../../../../../../../../components';
import { RenderDataGrid } from '../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { getTipoDocOptions } from '../../../../toolkit/services/modalBusquedaPersona/getOptionsDocumentos.service';
import { ModalColumns } from './columns/ModalColumns';
import { showAlert } from '../../../../../../../../utils/showAlert/ShowAlert';

/*import { getPersonaByFilter } from '../../../../toolkit/LideresThunks/UnidadOrganizacionalThunks';
import { ModalContextLideres } from '../../../../context/ModalContextLideres';
import {
  get_list_busqueda_avanzada_personas,
  set_asignacion_lideres_current
} from '../../../../toolkit/LideresSlices/LideresSlice';*/

export const BusquedaPersonas = ({
  controlHistorialTransferencias,
  resetHistorialTransferencias,
  watchHistorialTransferenciasExe,
}: {
  controlHistorialTransferencias: any;
  resetHistorialTransferencias: any;
  watchHistorialTransferenciasExe: any;
}): JSX.Element => {
  //* dispatch to use in the component * //
  const dispatch = useAppDispatch();
  //* use States declaration
  const [optionsDocuments, setoptionsDocuments] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      await getTipoDocOptions().then((data: any) => {
        setoptionsDocuments(data);
      });
    })();
  }, []);

  /*  USAR LA FUNCION DE LA BUSQUEDA AVANZADA DE LA PERSONA */
  /* export const search_avanzada = async ({
    tipo_documento,
    numero_documento,
    primer_nombre,
    primer_apellido,
    razon_social,
    nombre_comercial
  }: BusquedaAvanzada): Promise<AxiosResponse<ResponseServer<InfoPersona[]>>> => {
    return await api.get<ResponseServer<InfoPersona[]>>(
      `personas/get-personas-filters/?tipo_documento=${tipo_documento??''}&numero_documento=${numero_documento??''}&primer_nombre=${
        primer_nombre ?? ''
      }&primer_apellido=${primer_apellido ?? ''}&razon_social=${
        razon_social ?? ''
      }&nombre_comercial=${nombre_comercial ?? ''}`
    );
  };

  */

  // ? FUNCIONES ------------------

  const onSubmit = () => {
    const alertTitle = 'Opss!';
    const noOptionSelectedMsg =
      'No se ha seleccionado ninguna opción en los controles';
    const noDocTypeSelectedMsg = 'No se ha seleccionado el tipo de documento';
    const docNumberLengthMsg =
      'El número de documento debe tener al menos 4 caracteres para realizar la búsqueda.';
    const warning = 'warning';

    /*  if (!watchHistorialTransferenciasExe) {
      return showAlert(alertTitle, noOptionSelectedMsg, warning);
    }

    if (!watchHistorialTransferenciasExe?.tipo_documento?.value && !watchHistorialTransferenciasExe?.numero_documento) {
      return showAlert(alertTitle, noDocTypeSelectedMsg, warning);
    }

    if (watchHistorialTransferenciasExe?.numero_documento.length < 4) {
      return showAlert(alertTitle, docNumberLengthMsg, warning);
    }*/

    // Rest of your function logic here
    console.log('Im the submit function', watchHistorialTransferenciasExe);
  };
  const resetFunction = (): void => {
    console.log('Im the reset function');
  };

  const closeModal = (): any => {
    /*  closeModalBusquedaPersona();
    dispatch(get_list_busqueda_avanzada_personas([]));*/
    resetFunction();
    //  console.log('')('Im the close function');
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
          <IconButton
            onClick={() => {
              // dispatch(set_asignacion_lideres_current(params.row));
              closeModal();
            }}
          >
            <Avatar sx={AvatarStyles} variant="rounded">
              <HowToRegIcon
                titleAccess="Seleccionar Persona"
                sx={{ color: 'primary.main', width: '18px', height: '18px' }}
              />
            </Avatar>
          </IconButton>
        </>
      ),
    },
    ...ModalColumns,
  ];

  return (
    <>
      <Dialog fullWidth maxWidth="lg" open={true} onClose={closeModal}>
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
            /* void getPersonaByFilter(
              watch_asignaciones_lider_by_unidad_value?.tipo_documento,
              watch_asignaciones_lider_by_unidad_value?.numero_documento,
              watch_asignaciones_lider_by_unidad_value?.primer_nombre,
              watch_asignaciones_lider_by_unidad_value?.segundo_nombre,
              watch_asignaciones_lider_by_unidad_value?.primer_apellido,
              watch_asignaciones_lider_by_unidad_value?.segundo_apellido,
              watch_asignaciones_lider_by_unidad_value
                ?.id_unidad_organizacional_actual?.value
                ? unidad_current?.value ||
                    asignacion_lideres_current?.id_unidad_organizacional
                : '',
              setLoadingButton,
              resetFunction
            ).then((data: any) => {
              dispatch(get_list_busqueda_avanzada_personas(data));
            });*/
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
                  loading={false}
                  variant="contained"
                  type="submit"
                  startIcon={<SearchIcon />}
                  color="primary"
                >
                  BUSCAR PERSONA
                </LoadingButton>
              </Grid>
            </Grid>
            <RenderDataGrid
              title="Resultados de la búsqueda"
              rows={[] ?? []}
              columns={columnsBusquedaPersona ?? []}
            />
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
                onClick={closeModal}
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
