/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState, useEffect, useRef, useContext, useCallback } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import Swal from 'sweetalert2';

import { BuscadorSolicitudes } from '../../buscador/BuscadorSolicitudes';
import {
  accordionData,
  consultaColumns,
  infoSolicitudColumns,
  stylesTypography,
} from '../accordionData'; // Import your accordion data from a separate file
import { Button, Grid, Skeleton } from '@mui/material';
import { RenderDataGrid } from '../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { control_success } from '../../../../../../../../helpers';
import { PanelVentanillaContext } from '../../../../../context/PanelVentanillaContext';
import { ModalAndLoadingContext } from '../../../../../../../../context/GeneralContext';
import { useAppSelector } from '../../../../../../../../hooks';
import { containerStyles } from '../../../../../../tca/screens/utils/constants/constants';
import { VisaulTexto } from '../../../../../../actividadesPreviasCambioCCD/modules/asignacionUnidadesResponsables/components/parte2/components/unidadesSeries/visualTexto/VisualTexto';
import UnfoldMoreDoubleIcon from '@mui/icons-material/UnfoldMoreDouble';
import UnfoldLessDoubleIcon from '@mui/icons-material/UnfoldLessDouble';

export const AcordeonPqrsdf = () => {
  //* context declaration
  const { radicado, setRadicado, expanded, setExpanded } = useContext(
    PanelVentanillaContext
  );
  const { generalLoading } = useContext(ModalAndLoadingContext);

  const [displayCount, setDisplayCount] = useState(10);

  // ...rest of your code

  //* redux states
  const { listaHistoricoSolicitudes } = useAppSelector(
    (state) => state.PanelVentanillaSlice
  );

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

  const handleChange = useCallback(
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded?.(isExpanded ? panel : false);
    },
    [setExpanded]
  );
  
  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRadicado(event.target.value);
    },
    [setRadicado]
  );

  const onSubmit = () => {
    if (!radicado) {
      void Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'El campo de radicado no puede estar vacío',
      });
      return;
    }

    const searchElement = listaHistoricoSolicitudes.find(
      (element: any, index: any) => {
        if (index > displayCount) {
          return;
        }

        return element?.cabecera?.radicado === radicado;
      }
    );
    console.log(searchElement);
    if (searchElement) {
      setExpanded?.(radicado);
      control_success(
        'Se ha encontrado un elemento que coincide con el radicado ingresado, en la lista actual'
      );
    } else {
      void Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'No se ha encontrado un elemento que coincida con el radicado ingresado',
      });
      setExpanded?.(false);
    }
  };
  const loadMore = () => {
    setDisplayCount((prevCount) => prevCount + 10);
    console.log('displayCount', displayCount);
  };

  const showLess = () => {
    setDisplayCount((prevCount) => prevCount - 10 ? prevCount - 10 : 10);
  };

  if (generalLoading)
    return (
      <Grid
        container
        sx={{
          ...containerStyles,
          mt: '2.5rem',
          position: 'static',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {[...Array(15)].map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            width="100%"
            height={40}
            style={{ marginBottom: '1rem' }}
          />
        ))}
      </Grid>
    );

  return (
    <>
      <BuscadorSolicitudes
        setRadicado={setRadicado}
        radicado={radicado}
        onChange={onChange}
        onSubmit={onSubmit}
      />
      {listaHistoricoSolicitudes && listaHistoricoSolicitudes.length > 0 ? (
        [...listaHistoricoSolicitudes]
          .slice(0, displayCount)
          .map((item: any, index: number) => {
            if (!item?.cabecera?.radicado) {
              return null;
            }

            return (
              <Accordion
                ref={
                  expanded === item?.cabecera?.radicado ? accordionRef : null
                }
                style={{ marginBottom: '1rem' }}
                key={item?.cabecera?.id_PQRSDF}
                expanded={expanded === item?.cabecera?.radicado}
                onChange={handleChange(item?.cabecera?.radicado)}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandCircleDownIcon
                      sx={{
                        color: 'primary.main',
                      }}
                    />
                  }
                  aria-controls={`${item?.cabecera?.radicado}-content`}
                  id={`${item?.cabecera?.radicado}-header`}
                >
                  <Typography>
                    <b>Radicado:</b> {item?.cabecera?.radicado}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography sx={stylesTypography}>
                        <b>Titular:</b> {item?.detalle?.titular}
                      </Typography>
                      <Typography sx={stylesTypography}>
                        <b>Cantidad de anexos: </b>
                        {item?.detalle?.cantidad_anexos}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography sx={stylesTypography}>
                        <b>Estado actual:</b>{' '}
                        {item?.detalle?.estado_actual_solicitud}
                      </Typography>
                      <Typography sx={stylesTypography}>
                        <b>Asunto: </b>
                        {item?.detalle?.asunto}
                      </Typography>
                    </Grid>
                  </Grid>

                  {!item?.detalle?.solicitud_actual.length ? (
                    <section
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '1.7rem',
                      }}
                    >
                      <VisaulTexto
                        elements={[
                          'No se ha encontrado información relacionada a la respuesta de la solicitud',
                        ]}
                      />
                    </section>
                  ) : (
                    <RenderDataGrid
                      title="Información de la respuesta"
                      columns={infoSolicitudColumns ?? []}
                      rows={[...item?.detalle?.solicitud_actual] ?? []}
                    />
                  )}

                  {!item?.detalle?.registros.length ? (
                    <section
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '1.7rem',
                      }}
                    >
                      <VisaulTexto
                        elements={[
                          'No se ha encontrado información de los registros',
                        ]}
                      />
                    </section>
                  ) : (
                    <RenderDataGrid
                      title="Información de la respuesta"
                      columns={consultaColumns ?? []}
                      rows={[...item?.detalle?.registros] ?? []}
                    />
                  )}
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
          No hay solicitudes para mostrar
        </Typography>
      )}
      {displayCount < listaHistoricoSolicitudes.length && (
        <Button
        color="primary"
        variant="contained"
        startIcon={<UnfoldMoreDoubleIcon />}
        onClick={loadMore}>Cargar más</Button>
      )}
      {displayCount > 10 && (
        <Button
        sx={{
          marginLeft: '1rem'
        }}
        color="secondary"
        startIcon={<UnfoldLessDoubleIcon />}
        variant="contained"
        onClick={showLess}>Mostrar menos</Button>
      )}
    </>
  );
};
