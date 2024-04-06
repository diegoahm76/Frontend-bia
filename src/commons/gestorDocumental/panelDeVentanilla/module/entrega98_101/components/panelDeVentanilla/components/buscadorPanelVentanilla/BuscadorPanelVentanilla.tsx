/* eslint-disable @typescript-eslint/naming-convention */
import { useContext } from 'react';
import { Button, Grid, Stack, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { usePanelVentanilla } from '../../../../../../hook/usePanelVentanilla';
import Select from 'react-select';
import { LoadingButton } from '@mui/lab';
import SearchIcon from '@mui/icons-material/Search';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { Title } from '../../../../../../../../../components';
import { choicesTipoDeSolicitud } from '../../utils/choices';
import { BuscadorPqrsdf } from './buscadorPqrsdf/BuscadorPqrsdf';
import { BuscadorTramitesYservicios } from './buscadorTramitesYServicios/BuscadorTramitesYServicios';
import { BuscadorOtros } from './buscadorOtros/buscadorOtros';
import Swal from 'sweetalert2';
import { getGrilladoPqrsdfPanelVentanilla } from '../../../../../../toolkit/thunks/PqrsdfyComplementos/getPqrsdfPanVen.service';
import {
  setCurrentElementPqrsdComplementoTramitesYotros,
  setListaElementosComplementosRequerimientosOtros,
  setListaElementosPqrsfTramitesUotrosBusqueda,
} from '../../../../../../toolkit/store/PanelVentanillaStore';
import { useAppDispatch } from '../../../../../../../../../hooks';
import { ModalAndLoadingContext } from '../../../../../../../../../context/GeneralContext';
import { BuscadorOpas } from './buscadorOpas/BuscadorOpas';
import { getOpasPanVen } from '../../../../../../toolkit/thunks/opas/getOpasPanVen.service';
import { showAlert } from '../../../../../../../../../utils/showAlert/ShowAlert';
import { getGrilladoSolicitudesOtrosfPanelVentanilla } from '../../../../../../toolkit/thunks/otros/getOtrosGridPanel.service';
import { getGrilladoTramitesPanelVentanilla } from '../../../../../../toolkit/thunks/TramitesyServiciosyRequerimientos/getGrilladoTramServicios.service';

export const BuscadorPanelVentanilla = (): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();

  //* context declaration
  const { handleSecondLoading } = useContext(ModalAndLoadingContext);

  //* hooks
  const {
    control_busqueda_panel_ventanilla,
    watch_busqueda_panel_ventanilla,
    reset_search_form,
  } = usePanelVentanilla();

  // ? ----- FUNCIONES A USAR DENTRO DEL MODULO DEL BUSCADOR DEL PANEL DE VENTANILLA-----
  const searchSubmitPqrsdf = async () => {
    const {
      radicado,
      estado_actual_solicitud,
      fecha_inicio,
      fecha_fin,
      tipo_pqrsdf,
    } = watch_busqueda_panel_ventanilla;
    const res = await getGrilladoPqrsdfPanelVentanilla(
      estado_actual_solicitud?.label,
      radicado,
      '', //* va marcado manualmente como PQRSDF (tipo_de_solicitud)
      fecha_inicio,
      fecha_fin,
      tipo_pqrsdf?.value,
      handleSecondLoading
    );

    dispatch(setListaElementosPqrsfTramitesUotrosBusqueda(res));

    //* se limpian los otros controles para no crear conflictos
    dispatch(setCurrentElementPqrsdComplementoTramitesYotros(null));
    dispatch(setListaElementosComplementosRequerimientosOtros([]));
  };
  const searchSubmitTramitesYservicios = async () => {
    const {
      radicado,
      fecha_inicio,
      fecha_fin,
      nombre_titular,
      asunto_proyecto,
      pago_tramite,
      expediente,
      estado_actual_solicitud,
    } = watch_busqueda_panel_ventanilla;
    const res = await getGrilladoTramitesPanelVentanilla(
      handleSecondLoading,
      radicado,
      fecha_inicio,
      fecha_fin,
      nombre_titular,
      asunto_proyecto,
      pago_tramite?.value,
      expediente,
      estado_actual_solicitud?.label
    );
    console.log('res listado de tramites', res);
    dispatch(setListaElementosPqrsfTramitesUotrosBusqueda(res));

    //* se limpian los otros controles para no crear conflictos
    dispatch(setCurrentElementPqrsdComplementoTramitesYotros(null));
    dispatch(setListaElementosComplementosRequerimientosOtros([]));
  };

  const searchSubmitOtros = async () => {
    const { radicado, estado_actual_solicitud, fecha_inicio, fecha_fin } =
      watch_busqueda_panel_ventanilla;

    const res = await getGrilladoSolicitudesOtrosfPanelVentanilla(
      estado_actual_solicitud?.label,
      radicado,
      fecha_inicio,
      fecha_fin,
      handleSecondLoading
    );
    dispatch(setListaElementosPqrsfTramitesUotrosBusqueda(res));
    //* se limpian los otros controles para no crear conflictos
    dispatch(setCurrentElementPqrsdComplementoTramitesYotros(null));
    dispatch(setListaElementosComplementosRequerimientosOtros([]));
  };

  const searchSubmitopas = async () => {
    const {
      nombre_titular,
      radicado,
      nombre_proyecto,
      estado_actual_solicitud,
      fecha_inicio,
      fecha_fin,
    } = watch_busqueda_panel_ventanilla;

    const res = await getOpasPanVen(
      handleSecondLoading,
      fecha_inicio,
      fecha_fin,
      nombre_proyecto,
      estado_actual_solicitud?.label,
      radicado,
      nombre_titular
    );

    dispatch(setListaElementosPqrsfTramitesUotrosBusqueda(res));

    //* se limpian los otros controles para no crear conflictos
    dispatch(setCurrentElementPqrsdComplementoTramitesYotros(null));
    dispatch(setListaElementosComplementosRequerimientosOtros([]));
  };

  const handleSubmit = () => {
    const tipoDeSolicitud:
      | 'PQRSDF'
      | 'Tramites y servicios'
      | 'Otros'
      | 'OPAS'
      | undefined =
      control_busqueda_panel_ventanilla?._formValues?.tipo_de_solicitud?.label;

    if (!tipoDeSolicitud) {
      Swal.fire({
        title: 'Opps...',
        text: 'Debe seleccionar un tipo de solicitud para realizar la búsqueda',
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

    const searchAction = searchActions[tipoDeSolicitud];

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
                name="tipo_de_solicitud"
                control={control_busqueda_panel_ventanilla}
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
                      options={choicesTipoDeSolicitud as any[]}
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
                        Tipo de solicitud
                      </small>
                    </label>
                  </div>
                )}
              />
            </Grid>

            {control_busqueda_panel_ventanilla?._formValues?.tipo_de_solicitud
              ?.label === 'PQRSDF' ||
            !control_busqueda_panel_ventanilla?._formValues?.tipo_de_solicitud
              ?.label ? (
              <BuscadorPqrsdf
                control_busqueda_panel_ventanilla={
                  control_busqueda_panel_ventanilla
                }
              />
            ) : control_busqueda_panel_ventanilla?._formValues
                ?.tipo_de_solicitud?.label === 'Tramites y servicios' ? (
              <BuscadorTramitesYservicios
                control_busqueda_panel_ventanilla={
                  control_busqueda_panel_ventanilla
                }
              />
            ) : control_busqueda_panel_ventanilla?._formValues
                ?.tipo_de_solicitud?.label === 'Otros' ? (
              <BuscadorOtros
                control_busqueda_panel_ventanilla={
                  control_busqueda_panel_ventanilla
                }
              />
            ) : control_busqueda_panel_ventanilla?._formValues
                ?.tipo_de_solicitud?.label === 'OPAS' ? (
              <BuscadorOpas
                control_busqueda_panel_ventanilla={
                  control_busqueda_panel_ventanilla
                }
              />
            ) : (
              <>No hay elemento</>
            )}

            <Grid item xs={12} sm={4}>
              <Controller
                name="fecha_inicio"
                control={control_busqueda_panel_ventanilla}
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
                control={control_busqueda_panel_ventanilla}
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
              BUSCAR ELEMENTO
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
