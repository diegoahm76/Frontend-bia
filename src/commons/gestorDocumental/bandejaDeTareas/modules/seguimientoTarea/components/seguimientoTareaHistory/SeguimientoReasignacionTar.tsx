/* eslint-disable @typescript-eslint/naming-convention */

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from '@mui/material';
import { containerStyles } from '../../../../../tca/screens/utils/constants/constants';
import { useContext, useEffect, useRef, useState } from 'react';
import { ModalAndLoadingContext } from '../../../../../../../context/GeneralContext';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import { RenderDataGrid } from '../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { Loader } from '../../../../../../../utils/Loader/Loader';
import { useAppSelector } from '../../../../../../../hooks';
import { getSeguimientoTarea } from '../../services/getSeguimientoTarea.service';
import { Title } from '../../../../../../../components';
import { formatDate } from '../../../../../../../utils/functions/formatDate';
import { columnsTarea } from './columns/columnsTarea';
import { showAlert } from '../../../../../../../utils/showAlert/ShowAlert';
import { useNavigate } from 'react-router-dom';

export const SeguimientoReasignacionTar = (): JSX.Element => {
  //* redux states
  const { currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas } =
    useAppSelector((state) => state.BandejaTareasSlice);
  const { sixthLoading, handleSixthLoading } = useContext(
    ModalAndLoadingContext
  );

  const navigate = useNavigate();

  const [expanded, setExpanded] = useState<string | boolean>(false);
  //* lista para el seguimiento de las reasignaciones
  const [listaReasigna, setlistaReasigna] = useState<any[]>([]);
  //* lista para el seguimiento de la respuesta

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
            const dataSeguimientos = await getSeguimientoTarea(
              currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.id_tarea_asignada,
              handleSixthLoading
            );
            setlistaReasigna(dataSeguimientos);
            break;
            case 'RESPONDER OPA':
              case 'Responder Opa':
              case 'Responder OPA':

              showAlert('Advertencia', 'No se puede hacer seguimiento de la atre aún', 'warning');
              setlistaReasigna([])
              break;
          default:
            // Manejo por defecto si es necesario
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
          <Title title="Histórico de reasignaciones a la tarea" />

          <section
            style={{
              marginTop: '1.2rem',
            }}
          >
            {listaReasigna && listaReasigna.length > 0 ? (
              [
                ...listaReasigna,
              ].map((item: any) => {
                return (
                  <Accordion
                    ref={
                      expanded === item?.id_reasignacion_tarea
                        ? accordionRef
                        : null
                    }
                    style={{ marginBottom: '1rem' }}
                    key={item?.id_reasignacion_tarea}
                    expanded={expanded === item?.id_reasignacion_tarea}
                    onChange={handleChange(item?.id_reasignacion_tarea)}
                  >
                    <AccordionSummary
                      expandIcon={
                        <ExpandCircleDownIcon
                          sx={{
                            color: 'primary.main',
                          }}
                        />
                      }
                      aria-controls={`${item?.fecha_reasignacion}-content`}
                      id={`${item?.id_reasignacion_tarea}-header`}
                    >
                      <Typography>
                        <b>Fecha de reasignación:</b>{' '}
                        {formatDate(item?.fecha_reasignacion)}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <RenderDataGrid
                        title="Información de la reasignación hecha"
                        columns={columnsTarea ?? []}
                        rows={
                         /* [
                            ...listaReasigna,
                            ...listaReasigna,
                            ...listaReasigna,
                            ...listaReasigna,
                            ...listaReasigna,
                          ]*/
                          listaReasigna.filter(
                            (el) => el.id_reasignacion_tarea === expanded
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
                No se han realizado reasignaciones a la tarea
              </Typography>
            )}
          </section>
        </Grid>
      </Grid>
    </>
  );
};
