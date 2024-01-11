/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import 'leaflet/dist/leaflet.css';
import { Chip } from '@mui/material';
import Grid from '@mui/material/Grid';
import { CrearRios } from './CrearRios';
import { Typography } from '@mui/material';
import { api } from '../../../../api/axios';
import Divider from '@mui/material/Divider';
import AddIcon from "@mui/icons-material/Add";
import { Title } from '../../../../components';
import Accordion from '@mui/material/Accordion';
import EditIcon from '@mui/icons-material/Edit';
import { Button, IconButton } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { CuencaActualizar } from './CuencaActualizar';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { control_error, control_success } from '../../../../helpers';

const customStyles = {
  p: '20px',
  mb: '20px',
  m: '10px 0 20px 0',
  borderRadius: '15px',
  position: 'relative',
  background: '#FAFAFA',
  boxShadow: '0px 3px 6px #042F4A26',
};
const custom = {
  p: '20px',
  mb: '20px',
  m: '10px 0 20px 0',
  borderRadius: '15px',
  position: 'relative',
  background: '#ECECEC', boxShadow: '0px 3px 6px #042F4A26',
};

interface CuencaData {
  id_macro_cuenca: number;
  nombre_macro_cuenca: string;
}

interface MacroCuenca {
  id_zona_hidrica: number;
  id_macro_cuenca: string;
  nombre_zona_hidrica: string;
  id_zona_hidrografica: string;
}

interface ZonaHidrica {
  codigo_rio: string;
  id_zona_hidrica: number;
  id_sub_zona_hidrica: number;
  id_tipo_zona_hidrica: number;
  id_tipo_agua_zona_hidrica: any;
  nombre_sub_zona_hidrica: string;
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


  //2
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
  const [selectedSubZonaHidricaId, setSelectedSubZonaHidricaId] = useState<number | null>(null);
  const handleSelectSubZonaHidrica = (zonaHidrica: ZonaHidrica) => {
    setSelectedSubZonaHidrica(zonaHidrica);
    handleAbrirActualizarModal();
    setSelectedSubZonaHidricaId(zonaHidrica.id_sub_zona_hidrica);
  };
  const handleEliminarSubZonaHidrica = async (idSubZonaHidrica: number) => {
    try {
      const url = `/hidrico/zonas-hidricas/sub_zona_hidrica/delete/${idSubZonaHidrica}/`;
      const response = await api.delete(url);
      //  console.log('')("Sub-zona hídrica eliminada con éxito", response.data);
      control_success("Eliminado axitosamente ");
      // Agregar aquí cualquier lógica adicional post-eliminación, como actualizar la lista
      fetchZonasHidricas();
    } catch (error: any) {
      control_error(error.response.data.detail);
      fetchZonasHidricas();
    }
  };
  const renderZonasHidricas = () => {
    return zonasHidricas.map((zonaHidrica, index) => (
      <div key={index}>
        <Grid container item xs={12} sx={custom} spacing={2} marginLeft={3} marginTop={2}>
          <Grid container item xs={6} spacing={2} marginTop={2} >


             
                        <h3>  {zonaHidrica.codigo_rio}:</h3>
                        <ul>
                            <li> {zonaHidrica.nombre_sub_zona_hidrica}</li>
                            
                        </ul>
                   
          

           

          </Grid>
          <Grid container item xs={5} spacing={2} marginTop={0} justifyContent="flex-end">
            {zonaHidrica.id_tipo_agua_zona_hidrica === 1 && (
              <Grid item xs={12} sm={2} marginTop={-1}>

                <Chip size="small" label="Subterránea" color="success" variant="outlined" />
              </Grid>


            )}
            {zonaHidrica.id_tipo_agua_zona_hidrica === 2 && (
              <Grid item xs={12} sm={2} marginTop={-1}>
                <Chip size="small" label="Superficial" color="warning" variant="outlined" />
              </Grid>
            )}
            <IconButton onClick={() => handleSelectSubZonaHidrica(zonaHidrica)}>
              <EditIcon />
            </IconButton>
            <IconButton color="error" onClick={() => handleEliminarSubZonaHidrica(zonaHidrica.id_sub_zona_hidrica)}>
              <DeleteForeverIcon />
            </IconButton>
            {/* {zonaHidrica.codigo_rio} */}

          </Grid>
        </Grid>
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
        <AccordionDetails >
          <Typography></Typography>
          {expandedPanel === `panel${index}` && renderZonasHidricas()}
        </AccordionDetails>
      </Accordion>
    ));
  };
  const [is_modal_active, set_is_buscar] = useState<boolean>(false);
  const handle_open_buscar = (): void => {
    set_is_buscar(true);
  };
  //modal de actulizar 
  const [isActualizarModalActivo, setIsActualizarModalActivo] = useState<boolean>(false);

  const handleAbrirActualizarModal = (): void => {
    setIsActualizarModalActivo(true);
  };
  const [selectedSubZonaHidrica, setSelectedSubZonaHidrica] = useState<ZonaHidrica | null>(null);
  return (
    <>
      <CrearRios
        is_modal_active={is_modal_active}
        set_is_modal_active={set_is_buscar}
        fetchZonasHidricas={fetchZonasHidricas}
      />
      <CuencaActualizar
        selectedSubZonaHidricaId={selectedSubZonaHidricaId}
        selectedSubZonaHidrica={selectedSubZonaHidrica}
        isActualizarModalActivo={isActualizarModalActivo}
        setIsActualizarModalActivo={setIsActualizarModalActivo}
        selectedMacroCuenca={selectedMacroCuenca}
        fetchZonasHidricas={fetchZonasHidricas}
      />
      <Grid container spacing={2} m={2} p={2} item sx={customStyles}>
        <Grid item xs={12}>
          <Title title=" Cuencas " />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button startIcon={<AddIcon />} onClick={handle_open_buscar} fullWidth variant="outlined"    >
            Crear
          </Button>
        </Grid>
        <Divider
          style={{
            width: '98%',
            marginTop: '8px',
            marginBottom: '8px',
            marginLeft: 'auto',
          }}
        />
        <Grid item marginTop={0} xs={12} sm={12}>
          <Grid item xs={12}>
            {renderAccordions()}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};