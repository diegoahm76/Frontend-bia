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
  Typography,
  Tooltip,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import HailIcon from '@mui/icons-material/Hail';
import CleanIcon from '@mui/icons-material/CleaningServices';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import { type GridColDef } from '@mui/x-data-grid';
import { Controller } from 'react-hook-form';
import { getPersonasService } from '../../../../services/getPersonas.service';
import { choicesTipoPersona } from '../../../../utils/choices';
import { columnsPersona } from '../propiaComponent/columns/columnsPersona';
import { getAttorneys } from '../../../../services/getApoderados.service';
import { useAppDispatch, useAppSelector } from '../../../../../../../../../../../../hooks';
import { ISeleccionLideresProps } from '../../../../../../../../../../../Transversales/modules/corporativo/screens/LideresXUnidadOrg/components/UnidadOrganizacional/components/SeleccionLider/types/seleccionLideres.types';
import { ModalAndLoadingContext } from '../../../../../../../../../../../../context/GeneralContext';
import { getTipoDocumento } from '../../../../../../../../../../../Transversales/modules/corporativo/screens/LideresXUnidadOrg/components/UnidadOrganizacional/components/SeleccionLider/services/getTipoDocumento.service';
import { showAlert } from '../../../../../../../../../../../../utils/showAlert/ShowAlert';
import { setCurrentPersonaRespuestaUsuario } from '../../../../../../../../../respuestaRequerimientoOpa/toolkit/slice/ResRequerimientoOpaSlice';
import { AvatarStyles } from '../../../../../../../../../../ccd/componentes/crearSeriesCcdDialog/utils/constant';
import { control_info } from '../../../../../../../../../../alertasgestor/utils/control_error_or_success';
import { Title } from '../../../../../../../../../../../../components';
import Select from 'react-select';
import { RenderDataGrid } from '../../../../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { columnsApoderado } from './columns/columnsApo';

export const ModalSeleccionPersonaApoderado = ({
  control_seleccionar_persona,
  watchExe,
  reset_seleccionar_persona,
}: {
  control_seleccionar_persona: any;
  watchExe: any;
  reset_seleccionar_persona: any;
}): JSX.Element => {
  // * dispatch to use in the component * //
  const dispatch = useAppDispatch();

  //* states from redux
  const { currentPersonaRespuestaUsuario } = useAppSelector((state) => state.ResRequerimientoOpaSlice);

  // ? ------- use states declarations -------
  const [tiposDocumentos, setTiposDocumentos] = useState<ISeleccionLideresProps[]>([]);

  const [listaPersonas, setListaPersonas] = useState([]);
  const [apoderados, setApoderados] = useState([]);
  // ? useContext declaration
  const {
    openModalOne,
    handleOpenModalOne,
    openModalNuevoNumero2,
    handleOpenModalNuevoNumero2,
  } = useContext(ModalAndLoadingContext);

  useEffect(() => {
    if (openModalOne) {
      (async () => {
        try {
          const res = await getTipoDocumento();
          setTiposDocumentos(res);
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [openModalOne]);

  // ? ------ FUNCTIONS ------------

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!watchExe.tipo_documento || !watchExe.tipo_persona) {
      showAlert('Opss!', 'Debe seleccionar un tipo de persona y documento', 'warning');
      return;
    }

    const {
      tipo_documento,
      numero_documento,
      primer_nombre,
      segundo_nombre,
      primer_apellido,
      segundo_apellido,
      razon_social,
      nombre_comercial,
    } = watchExe;
    const personaData = {
      tipo_documento: tipo_documento?.value ?? '',
      numero_documento: numero_documento ?? '',
      primer_nombre: primer_nombre ?? '',
      segundo_nombre: segundo_nombre ?? '',
      primer_apellido: primer_apellido ?? '',
      segundo_apellido: segundo_apellido ?? '',
      razon_social: razon_social ?? '',
      nombre_comercial: nombre_comercial ?? '',
    };

    try {
      const res = await getPersonasService(
        personaData,
        handleOpenModalNuevoNumero2
      );
      setListaPersonas(res);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const resetFunction = (): void => {
    reset_seleccionar_persona({
      ...watchExe,
      tipo_persona: null,
      numero_documento: '',
      primer_nombre: '',
      primer_apellido: '',
      razon_social: '',
      nombre_comercial: '',
    });
    setListaPersonas([]);
    setApoderados([]);
  };

  const closeModal = (hasSelectedApoderado?: boolean): any => {
    if (!hasSelectedApoderado) {
      dispatch(setCurrentPersonaRespuestaUsuario(null as any));
      showAlert('Opss!', 'No se ha seleccionado una representación legal. No podemos proceder sin esta designación. Por favor, intente como titular o empresa.', 'info')
    }
    handleOpenModalOne(false);
    resetFunction();
  };
  //* -------- columns declaration -------- *//
  const columns_busqueda_avanzada_persona: GridColDef[] = [
    ...columnsPersona,
    {
      headerName: 'Acción',
      field: 'accion',
      width: 80,
      renderCell: (params: any) => (
        <>
        <Tooltip
          title= "Buscar apoderado"
        >
          <IconButton
            onClick={async () => {
              const persona = {
                id_persona: params.row.id_persona,
                tipo_documento: params.row.tipo_documento,
                numero_documento: params.row.numero_documento,
                nombre_completo:
                  params.row.nombre_completo ||
                  params.row.nombre_comercial ||
                  params.row.razon_social,
              };

              //* funcion de búsqueda de apdoerados para la persona seleccioanda
              await getAttorneys(params.row.id_persona).then((res: any) => {
                // ? lista de apoderados
                dispatch(setCurrentPersonaRespuestaUsuario({
                  titular: persona,
                  apoderado: null,
                } as any));
                setApoderados(res);
              })
            }}
          >
            <Avatar sx={AvatarStyles} variant="rounded">
              <HailIcon
                sx={{ color: 'primary.main', width: '18px', height: '18px' }}
              />
            </Avatar>
          </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  const columnsApoderadoList: GridColDef[] = [
    ...columnsApoderado,
    {
      headerName: 'Acción',
      field: 'accion',
      width: 80,
      renderCell: (params: any) => (
        <>
        <Tooltip
          title= "Seleccionar persona y apoderado"
        >
          <IconButton
            onClick={async () => {
              const personaApoderado = {
                id_apoderado: params.row.id_persona,
                tipo_documento: params.row.tipo_documento,
                numero_documento: params.row.numero_documento,
                nombre_completo: params.row.nombre_completo
              };

              dispatch(setCurrentPersonaRespuestaUsuario({
                ...currentPersonaRespuestaUsuario,
                apoderado: personaApoderado,
              } as any));

              control_info('Se ha seleccionado la persona y el apoderado correctamente');

              closeModal(true);
            }}
          >
            <Avatar sx={AvatarStyles} variant="rounded">
              <PeopleOutlineIcon
                sx={{ color: 'primary.main', width: '18px', height: '18px' }}
              />
            </Avatar>
          </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <>
      <Dialog fullWidth maxWidth="lg" open={openModalOne} onClose={() => {
        closeModal(false)
      }}>
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle>
            <Title title="Búsqueda de personas ( jurídicas y naturales )" />
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
                  zIndex: 50,
                }}
              >
                <Controller
                  name="tipo_persona"
                  control={control_seleccionar_persona}
                  defaultValue=""
                  render={({
                    field: { onChange, value, ref },
                    fieldState: { error },
                  }) => (
                    <div>
                      <Select
                        options={choicesTipoPersona ?? []} // options should be an array of objects with 'value' and
                        value={value} // set selected value
                        onChange={(e) => {
                          onChange(e);
                          reset_seleccionar_persona({
                            ...watchExe,
                            tipo_persona: e,
                            tipo_documento: '',
                            numero_documento: '',
                            primer_nombre: '',
                            segundo_nombre: '',
                            primer_apellido: '',
                            segundo_apellido: '',
                            razon_social: '',
                            nombre_comercial: '',
                          });
                        }}
                        isSearchable
                        placeholder="Tipo de persona"
                      />
                      <label>
                        <small
                          style={{
                            color: 'rgba(0, 0, 0, 0.6)',
                            fontWeight: 'thin',
                            fontSize: '0.75rem',
                            marginTop: '0.25rem',
                            marginLeft: '0.25rem',
                          }}
                        >
                          Tipo de persona
                        </small>
                      </label>
                    </div>
                  )}
                />
              </Grid>

              {/* se realiza la division entre persona natural y jurídica */}

              <Grid
                item
                xs={12}
                sm={3}
                sx={{
                  zIndex: 5,
                }}
              >
                <Controller
                  name="tipo_documento"
                  control={control_seleccionar_persona}
                  defaultValue=""
                  render={({
                    field: { onChange, value, ref },
                    fieldState: { error },
                  }) => (
                    <div>
                      <Select
                        options={
                          watchExe.tipo_persona?.label === 'NATURAL'
                            ? tiposDocumentos.filter(
                                (item) => item.value !== 'NT'
                              )
                            : tiposDocumentos.filter(
                                (item) => item.value === 'NT'
                              ) ?? []
                        } // options should be an array of objects with 'value' and
                        value={value} // set selected value
                        onChange={onChange} // update value when option is selected
                        isSearchable
                        placeholder="Tipo de documento"
                        styles={{
                          control: (provided, state) => ({
                            ...provided,
                            borderColor: error ? 'red' : provided.borderColor,
                          }),
                        }}
                      />
                      <label>
                        <small
                          style={{
                            color: 'rgba(0, 0, 0, 0.6)',
                            fontWeight: 'thin',
                            fontSize: '0.75rem',
                            marginTop: '0.25rem',
                            marginLeft: '0.25rem',
                          }}
                        >
                          Tipo de documento
                        </small>
                      </label>
                    </div>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Controller
                  name="numero_documento"
                  control={control_seleccionar_persona}
                  defaultValue=""
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
                    />
                  )}
                />
              </Grid>

              {watchExe.tipo_persona?.label === 'NATURAL' ? (
                <>
                  <Grid item xs={12} sm={3}>
                    <Controller
                      name="primer_nombre"
                      control={control_seleccionar_persona}
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
                      control={control_seleccionar_persona}
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
              ) : (
                <>
                  <Grid item xs={12} sm={3}>
                    <Controller
                      name="razon_social"
                      control={control_seleccionar_persona}
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
                      control={control_seleccionar_persona}
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
              <Grid
                item
                xs={12}
                sm={3}
                sx={{
                  mb: '1.5rem',
                }}
              >
                <LoadingButton
                  loading={openModalNuevoNumero2}
                  variant="contained"
                  type="submit"
                  startIcon={<SearchIcon />}
                  color="primary"
                >
                  BUSCAR PERSONA
                </LoadingButton>
              </Grid>
            </Grid>

            {listaPersonas.length === 0 ? (
              <>
                <Box>
                  <Typography
                    variant="body2"
                    align="center"
                    sx={{ mt: '2.8rem', mb: '2.8rem' }}
                  >
                    No se encontraron resultados y/o no se ha realizado la
                    búsqueda
                  </Typography>
                </Box>
              </>
            ) : (
              <RenderDataGrid
                title="Resultados de la búsqueda (personas que coinciden)"
                rows={listaPersonas ?? []}
                columns={columns_busqueda_avanzada_persona ?? []}
              />
            )}

            {apoderados.length === 0 ? (
              <>
                <Box>
                  <Typography
                    variant="body2"
                    align="center"
                    sx={{ mt: '3.2rem', mb: '3.2rem' }}
                  >
                    No se encontraron apoderados y/o no se ha realizado la búsqueda
                  </Typography>
                </Box>
              </>
            ) : (
              <RenderDataGrid
                title="Resultados de la búsqueda (apoderados)"
                rows={apoderados ?? []}
                columns={columnsApoderadoList ?? []}
              />
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
                onClick={resetFunction}
                startIcon={<CleanIcon />}
              >
                LIMPIAR CAMPOS
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  closeModal(false)
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
