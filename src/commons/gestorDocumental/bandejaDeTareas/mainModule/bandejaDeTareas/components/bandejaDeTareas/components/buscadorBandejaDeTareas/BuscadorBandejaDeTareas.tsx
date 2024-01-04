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
    showAlert(
      'Estimado usuario!',
      'Esta funcionalidad de Bandeja De tareas (Responder PQRSDF) se encuentra en construcción',
      'warning'
    );
    try {
      const {
        tipo_de_tarea,
        estado_asignacion_de_tarea,
        estado_de_la_tarea,
        fecha_inicio,
        fecha_fin,
        mostrar_respuesta_con_req_pendientes,
      } = watchBusquedaBandejaDeTareas;

      const res = await getListadoTareasByPerson(
        id_persona,
        handleSecondLoading,
        tipo_de_tarea?.value,
        estado_asignacion_de_tarea?.value,
        estado_de_la_tarea?.value,
        fecha_inicio,
        fecha_fin,
        mostrar_respuesta_con_req_pendientes?.value
      );

      console.log(res);
      dispatch(setListaTareasPqrsdfTramitesUotrosUopas(res));
      dispatch(setCurrentTareaPqrsdfTramitesUotrosUopas(null));
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const searchTramitesYservicios = () => {
    try {
      console.log('submit , buscando coincidencias de tramites y servicios');
      showAlert(
        'Estimado usuario!',
        'Esta funcionalidad de Responder trámite no está disponible ',
        'warning'
      );
    } catch (error) {
      console.error('Error:', error);
    }
  };

  //* se deben agregar las funciones para los demas tipos de tareas (otros y opas)

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
        await searchPqrsdf();
        break;

      case 'Responder Trámite':
        await searchTramitesYservicios();
        break;

      // case 'Otros':
      //   console.log('submit , buscando coincidencias de otros');
      //   break;

      // case 'OPAS':
      //   console.log('submit , buscando coincidencias de opas');
      //   break;

      default:
        showAlert(
          'Opss...',
          'Esta tarea no está registrada en el sistema, por favor comuníquese con el administrador del BIA',
          'warning'
        );
        break;
    }
  };

  const resetForm = () => reset_search_form();

  return (
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
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
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

            {controlBusquedaBandejaTareas?._formValues?.tipo_de_tarea?.label ===
              'Responder PQRSDF' ||
            !controlBusquedaBandejaTareas?._formValues?.tipo_de_tarea?.label ? (
              <BuscadorPqrsdf
                controlBusquedaBandejaTareas={controlBusquedaBandejaTareas}
              />
            ) : controlBusquedaBandejaTareas?._formValues?.tipo_de_tarea
                ?.label === 'Responder Trámite' ? (
              <BuscadorTramitesYservicios
                controlBusquedaBandejaTareas={controlBusquedaBandejaTareas}
              />
            ) : controlBusquedaBandejaTareas?._formValues?.tipo_de_tarea
                ?.label === 'Otros' ? (
              <BuscadorOtros
                controlBusquedaBandejaTareas={controlBusquedaBandejaTareas}
              />
            ) : controlBusquedaBandejaTareas?._formValues?.tipo_de_tarea
                ?.label === 'OPAS' ? (
              <BuscadorOpas
                controlBusquedaBandejaTareas={controlBusquedaBandejaTareas}
              />
            ) : (
              <>No hay elemento</>
            )}

            <Grid item xs={12} sm={4}>
              <Controller
                name="fecha_inicio"
                control={controlBusquedaBandejaTareas}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
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
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
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
  );
};
