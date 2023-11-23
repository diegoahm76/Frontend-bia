/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import 'leaflet/dist/leaflet.css';
import Grid from '@mui/material/Grid';
import { TextField } from '@mui/material';
import { Typography } from '@mui/material';
import { api } from '../../../../api/axios';
import { Title } from '../../../../components';
import Accordion from '@mui/material/Accordion';
import React, { useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

export interface Select_Alerta {
  cod_clase_alerta: string;
  nombre_subsistema: string;
  nombre_clase_alerta: string;
  descripcion_clase_alerta: string;
  cod_tipo_clase_alerta: string;
  cod_categoria_clase_alerta: string;
  cant_dias_previas: number | null;
  frecuencia_previas: string | null;
  cant_dias_post: number | null;
  frecuencia_post: string | null;
  envios_email: boolean;
  mensaje_base_dia: string;
  mensaje_base_previo: string | null;
  mensaje_base_vencido: string | null;
  nivel_prioridad: string;
  activa: boolean;
  asignar_responsable: boolean;
  nombre_funcion_comple_mensaje: string;
  id_modulo_destino: number;
  id_modulo_generador: number;
  cod_categoria_clase_alerta_display: string;
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
// eslint-disable-next-line @typescript-eslint/naming-convention
export const Cuencas: React.FC = () => {
  const [cuencas, set_cuencas] = useState<Select_Alerta[]>([]);
  const fetch_cuencas = async (): Promise<void> => {
    try {
      const url = "/transversal/alertas/configuracion_clase_alerta/get-by-subsistema/GEST/";
      const res = await api.get(url);
      const cuencas_data = res.data.data;
      set_cuencas(cuencas_data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    void fetch_cuencas();
  }, []);

  const handleButtonClick = () => {
    console.log(cuencas);
  };

  const customStyles = {
    position: 'relative',
    background: '#FAFAFA',
    borderRadius: '15px',
    p: '20px',
    m: '10px 0 20px 0',
    mb: '20px',
    boxShadow: '0px 3px 6px #042F4A26',
  };
  return (

    <>


      <Grid container spacing={2} m={2} p={2} item sx={customStyles}>
        <button onClick={handleButtonClick}>Mostrar cuencas</button>

        <Grid item xs={12}>
          <Title title=" Creacion de cuencas " />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            variant="outlined"
            size="small"
            required
            label="Macro cuenca"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            name="Macro cuenca"
          />
        </Grid>



        <Grid item xs={12} sm={3}>
          <TextField
            variant="outlined"
            size="small"
            required
            label="Zona hidrica "
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            name="Zona hidrica "
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            variant="outlined"
            size="small"
            required
            label="sup Zona hidrica "
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            name="sup Zona hidrica "
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            variant="outlined"
            size="small"
            required
            label="tipo de zona hidrica  "
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            name="tipo de zona hidrica  "
          />
        </Grid>





      </Grid>
      <Grid container spacing={2} m={2} p={2} item sx={customStyles}>
        <Grid item xs={12}>
          <Title title=" Cuencas " />
        </Grid>
        <Grid item xs={12} sm={12}>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Accordion 1</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Accordion 1.1</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>Accordion 1.1.1</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </AccordionDetails>
              </Accordion>
            </AccordionDetails>
          </Accordion>



        </Grid>
      </Grid>






    </>
  );
};