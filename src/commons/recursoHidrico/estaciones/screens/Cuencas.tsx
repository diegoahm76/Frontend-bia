/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import 'leaflet/dist/leaflet.css';
import Grid from '@mui/material/Grid';
import { TextField } from '@mui/material';
import { Typography } from '@mui/material';
import { api } from '../../../../api/axios';
import Divider from '@mui/material/Divider';
import { Title } from '../../../../components';
import Accordion from '@mui/material/Accordion';
import React, { useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
const customStyles = {
  position: 'relative',
  background: '#FAFAFA',
  borderRadius: '15px',
  p: '20px',
  m: '10px 0 20px 0',
  mb: '20px',
  boxShadow: '0px 3px 6px #042F4A26',
};
interface CuencaData {
  id_macro_cuenca: number;
  nombre_macro_cuenca: string;
}

interface MacroCuenca {
  id_zona_hidrica: number;
  nombre_zona_hidrica: string;
  id_zona_hidrografica: string;
  id_macro_cuenca: string;
}

interface ZonaHidrica {
  id_sub_zona_hidrica: number;
  nombre_sub_zona_hidrica: string;
  codigo_rio: string;
  id_zona_hidrica: number;
  id_tipo_zona_hidrica: number;
}
// eslint-disable-next-line @typescript-eslint/no-var-requires
// eslint-disable-next-line @typescript-eslint/naming-convention
export const Cuencas: React.FC = () => {
  const [selectedMacroCuenca, setSelectedMacroCuenca] = useState(null);
  const [selectedZonaHidrica, setSelectedZonaHidrica] = useState<number | null>(null); // El tipo de dato puede variar según tus necesidades

  const [cuencas, setCuencas] = useState<CuencaData[]>([]);
  const fetchCuencas = async (): Promise<void> => {
    try {
      const url = "/hidrico/zonas-hidricas/macro-cuencas/get/";
      const res = await api.get(url);
      const cuencasData: CuencaData[] = res.data?.data || [];
      setCuencas(cuencasData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    void fetchCuencas();
  }, []);

  const [macroCuencas, setMacroCuencas] = useState<MacroCuenca[]>([]);

  const fetchMacroCuencas = async (): Promise<void> => {
    try {
      const url = `/hidrico/zonas-hidricas/zona_hidrica/get/${selectedMacroCuenca}/`;
      const res = await api.get(url);
      const macroCuencasData: MacroCuenca[] = res.data?.data || [];
      setMacroCuencas(macroCuencasData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    void fetchMacroCuencas();
  }, [selectedMacroCuenca]);



  const [zonasHidricas, setZonasHidricas] = useState<ZonaHidrica[]>([]);
  const fetchZonasHidricas = async (): Promise<void> => {
    try {
      if (selectedZonaHidrica !== null) {
        const url = `/hidrico/zonas-hidricas/subZonahidrica/get/${selectedZonaHidrica}/`;
        const res = await api.get(url);
        const zonasHidricasData: ZonaHidrica[] = res.data?.data || [];
        setZonasHidricas(zonasHidricasData);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
  void fetchZonasHidricas();
}, [selectedZonaHidrica]);




  const [expanded, setExpanded] = useState<string | false>(false);

  // Inicializado en null, cámbialo al tipo de dato que sea apropiado para tu caso
  const handleChange = (panel: string, idMacroCuenca: any) => (
    event: React.ChangeEvent<{}>,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false);
    setSelectedMacroCuenca(idMacroCuenca); // Guarda el valor de id_macro_cuenca
  };


  const renderAccordions = () => {
    return cuencas.map((cuenca, index) => (
      <Accordion
        key={index}
        expanded={expanded === `panel${index + 1}`}
        onChange={handleChange(`panel${index + 1}`, cuenca.id_macro_cuenca)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel${index + 1}-content`}
          id={`panel${index + 1}-header`}
        >
          <Typography>{cuenca.nombre_macro_cuenca}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography></Typography>
          {expanded === `panel${index + 1}` && renderMacroCuencas()}
        </AccordionDetails>
      </Accordion>
    ));
  };


  const renderZonasHidricas = () => {
    return zonasHidricas.map((zonaHidrica, index) => (
      <div key={index}>
        {/* Aquí puedes agregar la estructura que prefieras para mostrar los detalles de zonaHidrica */}
        <Typography>{zonaHidrica.nombre_sub_zona_hidrica}</Typography>
        {index !== zonasHidricas.length - 1 && (
          <Divider
            style={{
              width: '98%',
              marginTop: '8px',
              marginBottom: '8px',
              marginLeft: 'auto',
            }}
          />
        )}
      </div>
    ));
  };
  

  
  const [expandedPanel, setExpandedPanel] = useState<string | false>(false);
  const renderMacroCuencas = () => {
    return macroCuencas.map((macroCuenca, index) => (
      <Accordion
        key={index}
        expanded={expandedPanel === `panel${index}`}
        onChange={(event, isExpanded) => {
          setExpandedPanel(isExpanded ? `panel${index}` : false);
          setSelectedZonaHidrica(isExpanded ? macroCuenca.id_zona_hidrica : null);
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{macroCuenca.nombre_zona_hidrica}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography></Typography>
          {expandedPanel === `panel${index}` && renderZonasHidricas()}
        </AccordionDetails>
      </Accordion>
    ));
  };




  return (

    <>


     
      <Grid container spacing={2} m={2} p={2} item sx={customStyles}>
        <Grid item xs={12}>
          <Title title=" Cuencas " />
        </Grid>
        <Grid item xs={12} sm={12}>

          <Grid item xs={12}>
            {renderAccordions()}

          </Grid>

        </Grid>
      </Grid>






    </>
  );
};