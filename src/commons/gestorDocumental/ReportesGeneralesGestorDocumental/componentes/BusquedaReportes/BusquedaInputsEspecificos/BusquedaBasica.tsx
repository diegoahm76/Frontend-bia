/* eslint-disable @typescript-eslint/naming-convention */
import { Button } from '@mui/material';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { LoadingButton } from '@mui/lab';
import { Grid, Stack, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { Title } from '../../../../../../components';
import { useAppSelector } from '../../../../../../hooks';
import GrainIcon from '@mui/icons-material/Grain';
import { control_info } from '../../../../alertasgestor/utils/control_error_or_success';
import { BusquedaReporteTipoUno } from './busquedaTipoReporteUno/BusquedaReporteTipoUno';
import { BusquedaReporteTipoTres } from './busquedaTipoReporteTres/BusquedaReporteTipoTres';
import { BusquedaReporteTipoCuatro } from './busquedaTipoReporteCuatro/BusquedaReporteTipoCuatro';

export const BusquedaBasicaGeneradoraReporte = (): JSX.Element => {
  //* redux states
  const { currentBusquedaReporte } = useAppSelector(
    (state) => state.ReportesGeneralesGestorSlice
  );

  const {
    control: controlBusquedaGeneradoraReporte,
    handleSubmit: handleSubmitBusquedaGeneradoraReporte,
    reset: resetBusquedaGeneradoraReporte,
    watch: watchBusquedaGeneradoraReporte,
  } = useForm({
    defaultValues: {
      fecha_inicio: '',
      fecha_fin: '',
      sede: 'TODAS',
      numero_expediente: 'TODOS',
      grupos: 'TODOS',
      seccion_subseccion: '',
      serie_subserie: '',
      grupo: '',
    },
  });

  const watchBusquedaGeneradoraReporteExe = watchBusquedaGeneradoraReporte();

  /*  const searchSubmitPqrsdf = async () => {
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
  };*/

  /*  const handleSubmit = () => {
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
*/

  const handleSubmit = () => {
    console.log(watchBusquedaGeneradoraReporteExe, 'siuu');
  };

  if (!currentBusquedaReporte) {
    return <></>;
  }

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
        <Title
          title={`Búsqueda generadora de reporte ${currentBusquedaReporte?.label}`}
        />
        <form
          onSubmit={(w) => {
            w.preventDefault();
            console.log('busvando elemento');
            handleSubmit();
          }}
          style={{
            marginTop: '2.2rem',
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Controller
                name="fecha_inicio"
                control={controlBusquedaGeneradoraReporte}
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
                control={controlBusquedaGeneradoraReporte}
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

            {currentBusquedaReporte?.value === 1 ? (
              <BusquedaReporteTipoUno
                controlBusquedaGeneradoraReporte={
                  controlBusquedaGeneradoraReporte
                }
              />
            ) : currentBusquedaReporte?.value === 2 ? (
              <BusquedaReporteTipoUno
                controlBusquedaGeneradoraReporte={
                  controlBusquedaGeneradoraReporte
                }
              />
            ) : currentBusquedaReporte?.value === 3 ? (
              <BusquedaReporteTipoTres
                controlBusquedaGeneradoraReporte={
                  controlBusquedaGeneradoraReporte
                }
              />
            ) : currentBusquedaReporte?.value === 4 ? (
              <BusquedaReporteTipoCuatro
              controlBusquedaGeneradoraReporte={
                controlBusquedaGeneradoraReporte
              }
            />
            ) : (
              <>No hay elemento</>
            )}
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
              startIcon={<GrainIcon />}
            >
              GENERAR REPORTE
            </LoadingButton>
            <Button
              color="primary"
              variant="outlined"
              startIcon={<CleanIcon />}
              onClick={() => {
                console.log('limpiar campos');
                control_info(
                  'Se han limpiado los campos de generación de reporte'
                );
              }}
            >
              LIMPIAR CAMPOS
            </Button>
          </Stack>
        </form>
      </Grid>
    </Grid>
  );
};
