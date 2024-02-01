/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState, useEffect, useRef, useContext } from 'react';
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
import { Grid } from '@mui/material';
import { RenderDataGrid } from '../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { control_success } from '../../../../../../../../helpers';
import { PanelVentanillaContext } from '../../../../../context/PanelVentanillaContext';
import { ModalAndLoadingContext } from '../../../../../../../../context/GeneralContext';
import { Loader } from '../../../../../../../../utils/Loader/Loader';
import { useAppSelector } from '../../../../../../../../hooks';
import { containerStyles } from '../../../../../../tca/screens/utils/constants/constants';
import { VisaulTexto } from '../../../../../../actividadesPreviasCambioCCD/modules/asignacionUnidadesResponsables/components/parte2/components/unidadesSeries/visualTexto/VisualTexto';

export const AcordeonOpas = (): JSX.Element => {
  //* context declaration
  const { radicado, setRadicado, expanded, setExpanded } = useContext(
    PanelVentanillaContext
  );
  const { generalLoading } = useContext(ModalAndLoadingContext);

  //* redux states
  const { listaHistoricoSolicitudes } = useAppSelector(
    (state) => state.PanelVentanillaSlice
  );

  const accordionRef = useRef<any>(null);

  useEffect(() => {
    //  console.log('')(listaHistoricoSolicitudes)
    if (expanded && accordionRef.current) {
      accordionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  }, [expanded]);

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded?.(isExpanded ? panel : false);
    };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setRadicado(event.target.value);

  const onSubmit = () => {
    const searchElement = listaHistoricoSolicitudes.find(
      (element: any) => element?.cabecera?.radicado === radicado
    );

    if (searchElement) {
      setExpanded?.(radicado);
      control_success(
        'Se ha encontrado un elemento que coincide con el radicado ingresado'
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
        }}
      >
        <Loader altura={800} />
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
        [...listaHistoricoSolicitudes].map((item: any) => {
          if (!item?.cabecera?.radicado) {
            return null;
          }

          return (
            <Accordion
              ref={expanded === item?.cabecera?.radicado ? accordionRef : null}
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
                  <b>Estado actual:</b> {item?.detalle?.estado_actual_solicitud}
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
            sx={{ textAlign: 'center', justifyContent: 'center', mt: '2rem', fontSize: '1.25rem' }}
          >
            No hay solicitudes para mostrar
          </Typography>
      )}
    </>
  );
};
