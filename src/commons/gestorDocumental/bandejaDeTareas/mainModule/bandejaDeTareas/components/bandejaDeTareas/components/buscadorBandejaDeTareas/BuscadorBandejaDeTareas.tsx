/* eslint-disable @typescript-eslint/naming-convention */
import { useContext } from 'react';
import { Button, Grid, Stack, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { LoadingButton } from '@mui/lab';
import SearchIcon from '@mui/icons-material/Search';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { Title } from '../../../../../../../../../components';
import { choicesTipoDeTarea } from '../../utils/tareaPqrsdf/choices';
import { BuscadorPqrsdf } from './buscadorPqrsdf/BuscadorPqrsdf';
import { BuscadorTramitesYservicios } from './buscadorTramitesYServicios/BuscadorTramitesYServicios';
import { BuscadorOtros } from './buscadorOtros/buscadorOtros';

import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../../hooks';
import { ModalAndLoadingContext } from '../../../../../../../../../context/GeneralContext';
import { BuscadorOpas } from './buscadorOpas/BuscadorOpas';
import { useBandejaTareas } from '../../../../../../hook/useBandejaTareas';
import { AuthSlice } from '../../../../../../../../auth/interfaces';
import { getListadoTareasByPerson } from '../../../../../../toolkit/thunks/Pqrsdf/getListadoTareasByPerson.service';
import {
  setCurrentTareaPqrsdfTramitesUotrosUopas,
  setListaTareasPqrsdfTramitesUotrosUopas,
} from '../../../../../../toolkit/store/BandejaDeTareasStore';
import { showAlert } from '../../../../../../../../../utils/showAlert/ShowAlert';
import { getListadoTareaasOtrosByPerson } from '../../../../../../toolkit/thunks/otros/getListadoTareasOtros.service';
import { control_info } from '../../../../../../../alertasgestor/utils/control_error_or_success';
import { getListadoTramitesByPerson } from '../../../../../../toolkit/thunks/tramitesServicios/getListadoTramitesByPerson.service';
import { getListadoTareasOpasByPerson } from '../../../../../../toolkit/thunks/opas/getListadoDeOpasByPerson.service';

export const BuscadorBandejaDeTareas = (): JSX.Element => {
  //* redux states
  const {
    userinfo: { id_persona },
  } = useAppSelector((state: AuthSlice) => state.auth);

  //* dispatch declaration
  const dispatch = useAppDispatch();

  //* context declaration
  const { handleSecondLoading } = useContext(ModalAndLoadingContext);

  //* hooks
  const {
    controlBusquedaBandejaTareas,
    watchBusquedaBandejaDeTareas,
    reset_search_form,
  } = useBandejaTareas();

  // ? ----- FUNCIONES A USAR DENTRO DEL MODULO DEL BUSCADOR DEL PANEL DE VENTANILLA-----
  const searchPqrsdf = async () => {
    try {
      const {
        tipo_de_tarea,
        estado_asignacion_de_tarea,
        estado_de_la_tarea,
        fecha_inicio,
        fecha_fin,
        mostrar_respuesta_con_req_pendientes,
        radicado,
      } = watchBusquedaBandejaDeTareas;

      const res = await getListadoTareasByPerson(
        id_persona,
        handleSecondLoading,
        tipo_de_tarea?.value,
        estado_asignacion_de_tarea?.value,
        estado_de_la_tarea?.value,
        fecha_inicio,
        fecha_fin,
        mostrar_respuesta_con_req_pendientes?.value,
        radicado
      );

      console.log(res);
      dispatch(setListaTareasPqrsdfTramitesUotrosUopas(res));
      dispatch(setCurrentTareaPqrsdfTramitesUotrosUopas(null));
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const searchTramitesYservicios = async () => {
    try {
      const {
        estado_asignacion_de_tarea,
        fecha_inicio,
        fecha_fin,
        radicado,
        estado_de_la_tarea,
        mostrar_respuesta_con_req_pendientes,
      } = watchBusquedaBandejaDeTareas;
      console.log;

      const res = await getListadoTramitesByPerson(
        id_persona,
        handleSecondLoading,
        estado_asignacion_de_tarea?.value,
        fecha_inicio,
        fecha_fin,
        radicado,
        estado_de_la_tarea?.value,
        mostrar_respuesta_con_req_pendientes?.value
      );

      console.log(res);
      dispatch(setListaTareasPqrsdfTramitesUotrosUopas(res));
      dispatch(setCurrentTareaPqrsdfTramitesUotrosUopas(null));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const searchOtros = async () => {
    try {
      const {
        tipo_de_tarea,
        estado_asignacion_de_tarea,
        estado_de_la_tarea,
        fecha_inicio,
        fecha_fin,
        radicado,
      } = watchBusquedaBandejaDeTareas;

      const res = await getListadoTareaasOtrosByPerson(
        id_persona,
        handleSecondLoading,
        tipo_de_tarea?.value,
        estado_asignacion_de_tarea?.value,
        estado_de_la_tarea?.value,
        fecha_inicio,
        fecha_fin,
        radicado
      );

      dispatch(setListaTareasPqrsdfTramitesUotrosUopas(res));
      dispatch(setCurrentTareaPqrsdfTramitesUotrosUopas(null));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const searchOpas = async () => {
    try {
      const {
        estado_asignacion_de_tarea,
        estado_de_la_tarea,
        fecha_inicio,
        fecha_fin,
        mostrar_respuesta_con_req_pendientes,
        radicado,
      } = watchBusquedaBandejaDeTareas;

      const res = await getListadoTareasOpasByPerson(
        id_persona,
        handleSecondLoading,
        estado_asignacion_de_tarea?.value,
        estado_de_la_tarea?.value,
        fecha_inicio,
        fecha_fin,
        mostrar_respuesta_con_req_pendientes?.value,
        radicado
      );

      dispatch(setListaTareasPqrsdfTramitesUotrosUopas(res));
      dispatch(setCurrentTareaPqrsdfTramitesUotrosUopas(null));


    } catch (error) {
      console.error('Error:', error);
    }
  };

  const unifiedSearchSubmit = async () => {
    const tipoDeTarea =
      controlBusquedaBandejaTareas?._formValues?.tipo_de_tarea?.label;

    if (!tipoDeTarea) {
      showAlert(
        'Opps...',
        'Debe seleccionar un tipo de tarea para realizar la búsqueda',
        'warning'
      );
      return;
    }

    switch (tipoDeTarea) {
      case 'Responder PQRSDF':
      case 'RESPONDER PQRSDF':
        await searchPqrsdf();
        break;

      case 'RESPONDER TRÁMITE':
      case 'Responder Trámite':
      case 'RESPONDER TRAMITE':
        await searchTramitesYservicios();
        break;

      case 'Responder Otro':
        await searchOtros();
        break;

      case 'RESPONDER OPA':
      case 'Responder OPA':
        await searchOpas();
        break;

      default:
        showAlert(
          'Opss...',
          'Esta tarea no está registrada en el sistema, por favor comuníquese con el administrador del BIA',
          'warning'
        );
        break;
    }
  };

  const resetForm = () => {
    dispatch(setCurrentTareaPqrsdfTramitesUotrosUopas(null));
    // dispatch(setListaTareasPqrsdfTramitesUotrosUopas([]));
    reset_search_form();
    control_info('Se han limpiado los campos de búsqueda y se ha deseleccionado la tarea actual');
  };

  return (
    <>
      <Grid
        container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          mb: '20px',
          mt: '2rem',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item xs={12}>
          <Title title="Buscar elemento" />
          <form
            onSubmit={(w) => {
              w.preventDefault();
              unifiedSearchSubmit();
            }}
            style={{
              marginTop: '2.2rem',
            }}
          >
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sm={4}
                sx={{
                  zIndex: 20,
                }}
              >
                <Controller
                  //* estos names de los controllers deben ser modificiado para que sirvan a la busqueda del panel de ventanilla
                  name="tipo_de_tarea"
                  control={controlBusquedaBandejaTareas}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <div>
                      <Select
                        required
                        value={value}
                        onChange={(selectedOption) => {
                          //  console.log('')(selectedOption);
                          onChange(selectedOption);
                        }}
                        options={choicesTipoDeTarea ?? []}
                        placeholder="Seleccionar"
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
                          Tipo de tarea
                        </small>
                      </label>
                    </div>
                  )}
                />
              </Grid>

              {/* ------------------------*/}

              {/* se debe entrar a definir si esos van a ser los tipos de tareas o si se manejará de una manera disinta */}

              {/* ------------------------*/}

              {controlBusquedaBandejaTareas?._formValues?.tipo_de_tarea
                ?.label === 'Responder PQRSDF' ||
              !controlBusquedaBandejaTareas?._formValues?.tipo_de_tarea
                ?.label ||
              controlBusquedaBandejaTareas?._formValues?.tipo_de_tarea
                ?.label === 'RESPONDER PQRSDF' ? (
                <BuscadorPqrsdf
                  controlBusquedaBandejaTareas={controlBusquedaBandejaTareas}
                />
              ) : controlBusquedaBandejaTareas?._formValues?.tipo_de_tarea
                  ?.label === 'Responder Trámite' ? (
                <BuscadorTramitesYservicios
                  controlBusquedaBandejaTareas={controlBusquedaBandejaTareas}
                />
              ) : controlBusquedaBandejaTareas?._formValues?.tipo_de_tarea
                  ?.label === 'Responder Otro' ? (
                <BuscadorOtros
                  controlBusquedaBandejaTareas={controlBusquedaBandejaTareas}
                />
              ) : controlBusquedaBandejaTareas?._formValues?.tipo_de_tarea
                  ?.label === 'Responder OPA' ? (
                <BuscadorOpas
                  controlBusquedaBandejaTareas={controlBusquedaBandejaTareas}
                />
              ) : (
                <>No hay elemento</>
              )}

              <Grid item xs={12} sm={4}>
                <Controller
                  name="radicado"
                  control={controlBusquedaBandejaTareas}
                  defaultValue=""
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      label="Radicado"
                      type="text"
                      size="small"
                      variant="outlined"
                      value={value}
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => {
                        onChange(e.target.value);
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Controller
                  name="fecha_inicio"
                  control={controlBusquedaBandejaTareas}
                  defaultValue=""
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      label="Fecha inicio"
                      type="date"
                      size="small"
                      variant="outlined"
                      value={value}
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => {
                        onChange(e.target.value);
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Controller
                  name="fecha_fin"
                  control={controlBusquedaBandejaTareas}
                  defaultValue=""
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      label="Fecha final"
                      type="date"
                      size="small"
                      variant="outlined"
                      value={value}
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => {
                        onChange(e.target.value);
                      }}
                    />
                  )}
                />
              </Grid>
              {/* tambien se debe agregar la opción de otros */}
              {/* Otros */}
              {/* Tramites y servicios  */}
            </Grid>

            <Stack
              direction="row"
              justifyContent="flex-end"
              spacing={2}
              sx={{ mb: '20px', mt: '20px' }}
            >
              <LoadingButton
                loading={false}
                type="submit"
                color="primary"
                variant="contained"
                startIcon={<SearchIcon />}
              >
                BUSCAR TAREA
              </LoadingButton>
              <Button
                color="primary"
                variant="outlined"
                startIcon={<CleanIcon />}
                onClick={resetForm}
              >
                LIMPIAR CAMPOS
              </Button>
            </Stack>
          </form>
        </Grid>
      </Grid>
    </>
  );
};
