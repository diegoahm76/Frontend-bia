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

// eslint-disable-next-line @typescript-eslint/no-var-requires
// eslint-disable-next-line @typescript-eslint/naming-convention
export const CrearRios: React.FC = () => {
  

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



    
  return (

    <>


     
      <Grid container spacing={2} m={2} p={2} item sx={customStyles}>
        <Grid item xs={12}>
          <Title title=" crear rios  " />
        </Grid>
        <Grid item xs={12} sm={12}>

          
        </Grid>
      </Grid>






    </>
  );
};