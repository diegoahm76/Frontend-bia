/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
//! libraries or frameworks
import { useContext, useState } from 'react';
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
import { type GridColDef } from '@mui/x-data-grid';
import { Controller } from 'react-hook-form';
import { AvatarStyles } from '../../../../../../../../../gestorDocumental/ccd/componentes/crearSeriesCcdDialog/utils/constant';
import { Title } from '../../../../../../../../../../components';
import { RenderDataGrid } from '../../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../../../hooks';
import { ISeleccionLideresProps } from '../../../../../../../../../Transversales/modules/corporativo/screens/LideresXUnidadOrg/components/UnidadOrganizacional/components/SeleccionLider/types/seleccionLideres.types';
import { getTipoDocumento } from '../../../../../../../../../Transversales/modules/corporativo/screens/LideresXUnidadOrg/components/UnidadOrganizacional/components/SeleccionLider/services/getTipoDocumento.service';
import { ModalAndLoadingContext } from '../../../../../../../../../../context/GeneralContext';
import { choicesTipoPersona } from '../../../../utils/choices';
import { showAlert } from '../../../../../../../../../../utils/showAlert/ShowAlert';
import { setCurrentPersonaRespuestaUsuario } from '../../../../../../toolkit/slice/ResRequerimientoOpaSlice';
import { control_info } from '../../../../../../../../ccd/store/utils/success_errors';
import { getPersonasJuridicaService } from '../../../../services/getEmpresas.service';
import { columnsPersonaEmpresa } from './columns/columnsPersonaEmpresa';

export const ModalSeleccionEmpresa = ({
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

  //* -------- hook declaration -------- *//

  //* -------- use selector declaration -------- *//

  // ? ------- use states declarations -------
  const [listaPersonas, setListaPersonas] = useState([]);
  // ? useContext declaration
    //* context declarations
    const { generalLoading, handleGeneralLoading, secondLoading, handleSecondLoading} = useContext(ModalAndLoadingContext);

  // ? ------ FUNCTIONS ------------

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const {
      numero_documento,
      razon_social,
      nombre_comercial,
    } = watchExe;
    const personaData = {
      numero_documento: numero_documento ?? '',
      razon_social: razon_social ?? '',
      nombre_comercial: nombre_comercial ?? '',
    };

    try {
      const res = await getPersonasJuridicaService(
        personaData,
        handleSecondLoading
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
  };

  const closeModal = (): any => {
    handleGeneralLoading(false);
    resetFunction();
  };
  //* -------- columns declaration -------- *//
  const columns_busqueda_avanzada_persona: GridColDef[] = [
    ...columnsPersonaEmpresa,
    {
      headerName: 'Acción',
      field: 'accion',
      width: 80,
      renderCell: (params: any) => (
        <>
        <Tooltip
          title= "Seleccionar persona"
        >
          <IconButton
            onClick={() => {
              const persona = {
                tipo_documento: params?.row?.tipo_documento,
                numero_documento: params?.row?.numero_documento,
                nombre_comercial: params?.row?.nombre_comercial,
                razon_social: params?.row?.nombre_comercial,
                tipo_doc_rep: params?.row?.persona_representante?.tipo_documento,
                numero_documento_rep: params?.row?.persona_representante?.numero_documento,
                nombre_rep: params?.row?.persona_representante?.
                nombre_completo,
              };

              dispatch(setCurrentPersonaRespuestaUsuario(persona as any));
              control_info('Se ha seleccionado la persona correctamente');

              closeModal();
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
  ];

  return (
    <>
      <Dialog fullWidth maxWidth="lg" open={generalLoading} onClose={closeModal}>
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle>
            <Title title="Búsqueda de empresas (Personas jurídicas)" />
          </DialogTitle>
          <Divider />
          <DialogContent
            sx={{
              mb: '0px',
              justifyContent: 'center',
            }}
          >
            <Grid container spacing={2}>
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
                  loading={secondLoading}
                  variant="contained"
                  type="submit"
                  startIcon={<SearchIcon />}
                  color="primary"
                >
                  BUSCAR EMPRESA
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
