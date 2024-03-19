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
import { AvatarStyles } from '../../../../../../../../../gestorDocumental/ccd/componentes/crearSeriesCcdDialog/utils/constant';
import { Title } from '../../../../../../../../../../components';
import Select from 'react-select';
import { RenderDataGrid } from '../../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { columnsModalBusAvanLider } from '../../../../../../../../../Transversales/modules/corporativo/screens/LideresXUnidadOrg/components/UnidadOrganizacional/components/ModalBusAvanLider/columns/columsBusAvanLider';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../../../hooks';
import { ISeleccionLideresProps } from '../../../../../../../../../Transversales/modules/corporativo/screens/LideresXUnidadOrg/components/UnidadOrganizacional/components/SeleccionLider/types/seleccionLideres.types';
import { getTipoDocumento } from '../../../../../../../../../Transversales/modules/corporativo/screens/LideresXUnidadOrg/components/UnidadOrganizacional/components/SeleccionLider/services/getTipoDocumento.service';
import { getPersonasService } from '../../../../services/getPersonas.service';
import { columnsPersona } from './columns/columnsPersona';
import { ModalAndLoadingContext } from '../../../../../../../../../../context/GeneralContext';

export const ModalSeleccionPersona = ({
  control_seleccionar_persona,
  watchExe,
  reset_seleccionar_persona,
}:
{
  control_seleccionar_persona: any;
  watchExe: any;
  reset_seleccionar_persona: any;
}): JSX.Element => {
  // * dispatch to use in the component * //
  const dispatch = useAppDispatch();

  //* -------- hook declaration -------- *//

  //* -------- use selector declaration -------- *//
/*  const {
    organigrama_lideres_current,
    unidad_current,
    busqueda_avanzada_personas_list,
    asignacion_lideres_current,
  } = useAppSelector((state) => state.lideres_slice);*/

  // ? ------- use states declarations -------
  const [tiposDocumentos, setTiposDocumentos] = useState<
    ISeleccionLideresProps[]
  >([]);

  const [listaPersonas, setListaPersonas] = useState([])

  useEffect(() => {
    void getTipoDocumento()
      .then((res) => {
        const filterDocumentos = res?.filter(
          (item: ISeleccionLideresProps) => item.value !== 'NT'
        );
        setTiposDocumentos(filterDocumentos);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // ? useContext declaration
  const {openModalOne,  handleOpenModalOne} = useContext(ModalAndLoadingContext);

   const resetFunction = (): void => {
    reset_seleccionar_persona({
      ...watchExe,
      primer_nombre: '',
      segundo_nombre: '',
      primer_apellido: '',
      segundo_apellido: '',
    });
  };

  const closeModal = (): any => {
    handleOpenModalOne(false);
    setListaPersonas([]);
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
          <IconButton
            onClick={() => {
              console.log(params.row);

              reset_seleccionar_persona({
                ...watchExe,
                ...params.row,
                tipo_documento: {
                  label: params.row.tipo_documento,
                  value: params.row.tipo_documento,
                },
              });

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
  ];

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={openModalOne}
        onClose={closeModal}
        sx={{
          minHeight: '600px',
        }}
      >
        <Box
          component="form"
          onSubmit={async (e) => {
            e.preventDefault();
            console.log('submit');
            try {
              await getPersonasService({
                tipo_documento: watchExe.tipo_documento?.value ?? '',
                numero_documento:
                watchExe.numero_documento,
                primer_nombre: watchExe.primer_nombre,
                segundo_nombre: watchExe.segundo_nombre,
                primer_apellido:
                watchExe.primer_apellido,
                segundo_apellido:
                watchExe.segundo_apellido,
                razon_social: '',
                nombre_comercial: '',
              }).then((res) => {
                console.log('res', res);
                setListaPersonas(res);
              })
            } catch (error) {
              console.error('Error fetching data:', error);
            }
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
                        options={tiposDocumentos} // options should be an array of objects with 'value' and
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
                  name="segundo_nombre"
                  control={control_seleccionar_persona}
                  defaultValue=""
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      fullWidth
                      label="Segundo Nombre"
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
              <Grid item xs={12} sm={3}>
                <Controller
                  name="segundo_apellido"
                  control={control_seleccionar_persona}
                  defaultValue=""
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      fullWidth
                      label="Segundo apellido"
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

              <Grid item xs={12} sm={3}
                sx={{
                  mb: '1.5rem',
                }}
              >
                <LoadingButton
                  loading={false}
                  variant="contained"
                  type="submit"
                  startIcon={<SearchIcon />}
                  color="primary"
                >
                  BUSCAR
                </LoadingButton>
              </Grid>
            </Grid>

            <RenderDataGrid
              title="Resultados de la búsqueda (personas que coinciden)"
              rows={listaPersonas ?? []}
              columns={columns_busqueda_avanzada_persona ?? []}
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
                onClick={resetFunction}
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
