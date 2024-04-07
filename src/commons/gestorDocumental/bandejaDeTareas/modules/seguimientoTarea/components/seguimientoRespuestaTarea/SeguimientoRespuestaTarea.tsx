/* eslint-disable @typescript-eslint/naming-convention */

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { containerStyles } from '../../../../../tca/screens/utils/constants/constants';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useContext, useEffect, useRef, useState } from 'react';
import { ModalAndLoadingContext } from '../../../../../../../context/GeneralContext';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import { RenderDataGrid } from '../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { Loader } from '../../../../../../../utils/Loader/Loader';
import { useAppSelector } from '../../../../../../../hooks';
import { Title } from '../../../../../../../components';
import { formatDate } from '../../../../../../../utils/functions/formatDate';
import { getRespuestaTarea } from '../../services/pqrsdf/getRespuestaTarea.service';
import { columnsRespuesta } from './columnsRespuesta';
import { showAlert } from '../../../../../../../utils/showAlert/ShowAlert';
export const SeguimientoRespuestaTarea = (): JSX.Element => {
  //* redux states
  const { currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas } =
    useAppSelector((state) => state.BandejaTareasSlice);

  const navigate = useNavigate();

  const { sixthLoading, handleSixthLoading } = useContext(
    ModalAndLoadingContext
  );

  const [expanded, setExpanded] = useState<string | boolean>(false);
  //* lista para el seguimiento de las reasignaciones
  //* lista para el seguimiento de la respuesta
  const [listaRespuesta, setListaRespuesta] = useState<any[]>([]);

  const accordionRef = useRef<any>(null);

  useEffect(() => {
    if (expanded && accordionRef.current) {
      accordionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  }, [expanded]);

  //* useEffe ct para traer las reasignaciones de la tarea
  useEffect(() => {
    (async () => {
      if (!currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas) {
        showAlert('Advertencia', 'No se ha seleccionado una tarea', 'warning');
        navigate('/app/gestor_documental/bandeja_tareas/');
        return;
      }

      const tipo =
        currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.tipo_tarea ||
        currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.tipo;

      try {
        switch (tipo) {
          case 'RESPONDER PQRSDF':
          case 'Responder PQRSDF':
            const dataSeguimientos = await getRespuestaTarea(
              currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.id_pqrsdf,
              handleSixthLoading
            );
            setListaRespuesta(dataSeguimientos);
            /* void getReAsignacionesTareasPqrsdf(
            currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.id_tarea_asignada,
            handleGeneralLoading
          ).then((res) => {
            setListaAsignaciones(res);
          });*/
            break;
          case 'RESPONDER OPA':
          case 'Responder Opa':
          case 'Responder OPA':

          showAlert('Advertencia', 'El seguimiento de la opa no está incorporado aún', 'warning');
          setListaRespuesta([])



            // Call the service for OPA
            break;
          default:
            // Default service call or no service call
            break;
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded?.(isExpanded ? panel : false);
    };

  //* loading
  if (sixthLoading)
    return (
      <Grid
        container
        sx={{
          ...containerStyles,
          mt: '2.5rem',
          position: 'static',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Loader altura={300} />
      </Grid>
    );

  return (
    <>
      <Grid
        container
        sx={{
          position: 'relative',
          justifyContent: 'center',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item xs={12}>
          <Title title="Tarea respondida - respuesta a la tarea relacionada" />

          <section
            style={{
              marginTop: '1.2rem',
            }}
          >
            {listaRespuesta && listaRespuesta.length > 0 ? (
              [...listaRespuesta].map((item: any) => {
                return (
                  <Accordion
                    ref={
                      expanded === item?.id_respuesta_pqr || 0 /* poner id opa */ ? accordionRef : null
                    }
                    style={{ marginBottom: '1rem' }}
                    key={item?.id_respuesta_pqr ?? 0 /* poner el id opa*/}
                    expanded={expanded === item?.id_respuesta_pqr ?? 0 /*poner el id opa*/}
                    onChange={handleChange(item?.id_respuesta_pqr ?? 0 /*poner el id opa*/)}
                  >
                    <AccordionSummary
                      expandIcon={
                        <ExpandCircleDownIcon
                          sx={{
                            color: 'primary.main',
                          }}
                        />
                      }
                      aria-controls={`${item?.fecha_respuesta}-content`}
                      id={`${item?.id_respuesta_pqr ?? 0 /* poner id opa */}-header`}
                    >
                      <Typography>
                        <b>Fecha de respuesta de la tarea:</b>{' '}
                        {formatDate(item?.fecha_respuesta)}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <RenderDataGrid
                        title="Información de la respuesta de tarea"
                        columns={columnsRespuesta ?? []}
                        rows={
                          /*[
                            ...listaRespuesta,
                            ...listaRespuesta,
                            ...listaRespuesta,
                            ...listaRespuesta,
                            ...listaRespuesta,
                            ...listaRespuesta,
                          ]*/
                          listaRespuesta.filter(
                            (el) => el.id_respuesta_pqr === expanded
                          ) ?? []
                        }
                      />
                    </AccordionDetails>
                  </Accordion>
                );
              })
            ) : (
              <Typography
                variant="body1"
                color="text.primary"
                sx={{
                  textAlign: 'center',
                  justifyContent: 'center',
                  mt: '2rem',
                  fontSize: '1.25rem',
                }}
              >
                No se ha encontrado información relacionada a la respuesta de la
                tarea
              </Typography>
            )}
          </section>
        </Grid>
      </Grid>
      <Grid container sx={containerStyles}>
        <Stack
          direction="row"
          justifyContent="center"
          spacing={2}
          sx={{ mb: '20px', mt: '20px' }}
        >
          <Button
            color="error"
            variant="contained"
            onClick={() => {
              navigate('/app/gestor_documental/bandeja_tareas/');
            }}
            startIcon={<ArrowBackIcon />}
          >
            VOLVER A LA BANDEJA DE TAREAS
          </Button>
        </Stack>
      </Grid>
    </>
  );
};
