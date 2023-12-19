/* eslint-disable @typescript-eslint/naming-convention */
import { useContext } from 'react';
import { Button, Grid, Stack, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { LoadingButton } from '@mui/lab';
import SearchIcon from '@mui/icons-material/Search';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { Title } from '../../../../../../../../../components';
import { choicesTipoDeTarea } from '../../utils/choices';
import { BuscadorPqrsdf } from './buscadorPqrsdf/BuscadorPqrsdf';
import { BuscadorTramitesYservicios } from './buscadorTramitesYServicios/BuscadorTramitesYServicios';
import { BuscadorOtros } from './buscadorOtros/buscadorOtros';
import Swal from 'sweetalert2';
//import { getGrilladoPqrsdfPanelVentanilla } from '../../../../../../toolkit/thunks/PqrsdfyComplementos/getPqrsdfPanVen.service';

import { useAppDispatch } from '../../../../../../../../../hooks';
import { ModalAndLoadingContext } from '../../../../../../../../../context/GeneralContext';
import { BuscadorOpas } from './buscadorOpas/BuscadorOpas';
import { useBandejaTareas } from '../../../../../hook/useBandejaTareas';

export const BuscadorBandejaDeTareas = (): JSX.Element => {
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
  const searchSubmitPqrsdf = () => {
    const {
      tipo_de_tarea,
      estado_asignacion_de_tarea,
      estado_de_la_tarea,
      fecha_inicio,
      fecha_fin,
    } = watchBusquedaBandejaDeTareas;

    /*  void getGrilladoPqrsdfPanelVentanilla(
      estado_actual_solicitud?.label,
      radicado,
      '' tipo_de_solicitud?.label,
      fecha_inicio,
      fecha_fin,
      tipo_pqrsdf?.label,
      //* se debe poner la busqueda por unidad organizacional
      // * se debe poner la bsqueda por tipo de pqrs
      handleSecondLoading
    ).then((res: any) => {
      dispatch(setListaElementosPqrsfTramitesUotrosBusqueda(res));

      //* se limpian los otros controles para no crear conflictos
      dispatch(setCurrentElementPqrsdComplementoTramitesYotros(null));
      dispatch(setListaElementosComplementosRequerimientosOtros([]));
    });*/
  };

  const searchSubmitTramitesYservicios = () => {
    console.log('submit , buscando coincidencias de tramites y servicios');

    //* se limpian los otros controles para no crear conflictos
    //dispatch(setCurrentElementPqrsdComplementoTramitesYotros(null));
    //dispatch(setListaElementosComplementosRequerimientosOtros([]));
  };

  const searchSubmitOtros = () => {
    console.log('submit , buscando coincidencias de otros');

    //* se limpian los otros controles para no crear conflictos
    // dispatch(setCurrentElementPqrsdComplementoTramitesYotros(null));
    // dispatch(setListaElementosComplementosRequerimientosOtros([]));
  };

  const searchSubmitopas = () => {
    console.log('submit , buscando coincidencias de opas');
    // dispatch(setCurrentElementPqrsdComplementoTramitesYotros(null));
    // dispatch(setListaElementosComplementosRequerimientosOtros([]));
  };

  const handleSubmit = () => {
    //* los tipos de tareas, van a cambiar en definicion, pero mientras tanto se establece de esta manera
    const tipoDeTarea:
      | 'PQRSDF'
      | 'Tramites y servicios'
      | 'Otros'
      | 'OPAS'
      | undefined =
      controlBusquedaBandejaTareas?._formValues?.tipo_de_tarea?.label;

    if (!tipoDeTarea) {
      Swal.fire({
        title: 'Opps...',
        text: 'Debe seleccionar un tipo de tarea para realizar la búsqueda',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    const searchActions = {
      PQRSDF: searchSubmitPqrsdf,
      'Tramites y servicios': searchSubmitTramitesYservicios,
      Otros: searchSubmitOtros,
      OPAS: searchSubmitopas,
    };

    const searchAction = searchActions[tipoDeTarea];

    //* se debe pasar el tema del loading
    if (searchAction) {
      searchAction();
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
            handleSubmit();
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
              'PQRSDF' ||
            !controlBusquedaBandejaTareas?._formValues?.tipo_de_tarea?.label ? (
              <BuscadorPqrsdf
                controlBusquedaBandejaTareas={controlBusquedaBandejaTareas}
              />
            ) : controlBusquedaBandejaTareas?._formValues?.tipo_de_tarea
                ?.label === 'Tramites y servicios' ? (
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
