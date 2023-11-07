/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState, useEffect, useRef } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import Swal from 'sweetalert2';
import { control_success } from '../../../../../../helpers';
import { BuscadorSolicitudes } from '../buscador/BuscadorSolicitudes';
import {
  accordionData,
  consultaColumns,
  infoSolicitudColumns,
  stylesTypography,
} from './accordionData'; // Import your accordion data from a separate file
import { Grid } from '@mui/material';
import { RenderDataGrid } from '../../../../tca/Atom/RenderDataGrid/RenderDataGrid';

export const AcordeonPqrsdf = () => {
  const [expanded, setExpanded] = useState<string | boolean>(false);
  const [radicado, setRadicado] = useState<string>('');

  const accordionRef = useRef<any>(null);

  useEffect(() => {
    // Scroll to the expanded accordion panel when `expanded` changes
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
      setExpanded(isExpanded ? panel : false);
    };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setRadicado(event.target.value);

  const onSubmit = () => {
    const searchElement = accordionData.find(
      (element) => element?.id_radicado === radicado
    );

    if (searchElement) {
      setExpanded(radicado);
      control_success(
        'Se ha encontrado un elemento que coincide con el radicado ingresado'
      );
    } else {
      void Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'No se ha encontrado un elemento que coincida con el radicado ingresado',
      });
      setExpanded(false);
    }
  };

  return (
    <>
      {/* Search input component */}
      <BuscadorSolicitudes
        setRadicado={setRadicado}
        radicado={radicado}
        onChange={onChange}
        onSubmit={onSubmit}
      />

      {accordionData.map((item) => (
        <Accordion
          ref={expanded === item.id_radicado ? accordionRef : null}
          style={{ marginBottom: '1rem' }}
          key={item.id_radicado}
          expanded={expanded === item.id_radicado}
          onChange={handleChange(item.id_radicado)}
        >
          <AccordionSummary
            expandIcon={
              <ExpandCircleDownIcon
                sx={{
                  color: 'primary.main',
                }}
              />
            }
            aria-controls={`${item.id_radicado}-content`}
            id={`${item.id_radicado}-header`}
          >
            <Typography>
              <b>Radicado:</b> {item.nombre_pqr}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography sx={stylesTypography}>
                  <b>Titular:</b> {item.titular}
                </Typography>
                <Typography sx={stylesTypography}>
                  <b>Cantidad de anexos: </b>
                  {item.titular}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography sx={stylesTypography}>
                  <b>Estado actual:</b> {item.estado_actual_radicado}
                </Typography>
                <Typography sx={stylesTypography}>
                  <b>Asunto: </b>
                  {item.asunto}
                </Typography>
              </Grid>
            </Grid>
            <RenderDataGrid
              title="Información inicial de la solicitud"
              columns={infoSolicitudColumns}
              rows={item.info_solicitud}
            />
            <RenderDataGrid
              title="Acerca de la consulta"
              columns={consultaColumns}
              rows={item.solicitud}
            />
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};
