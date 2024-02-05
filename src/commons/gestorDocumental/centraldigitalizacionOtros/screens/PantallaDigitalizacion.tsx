/* eslint-disable @typescript-eslint/naming-convention */

import { Button, Grid, TextField } from "@mui/material"
import { Title } from "../../../../components/Title"
import { useNavigate, useParams } from "react-router-dom";
import { InformacionSolicitud } from "../components/InformacionSolicitud";
import { Metadatos } from "../components/metadatos/Metadatos";
import { BotonesDigitalizacion } from "../components/BotonesFinales/BotonesDigitalizacion";

export const PantallaDigitalizacion = () => {

  const { id } = useParams<{ id: string }>();

  return (
    <>
      <Grid
        container
        // sx={{
        //   position: 'relative',
        //   background: '#FAFAFA',
        //   borderRadius: '15px',
        //   p: '20px',
        //   mb: '20px',
        //   boxShadow: '0px 3px 6px #042F4A26',
        // }}
      >
        <Grid item xs={12}>
          <Title title="Proceso de Digitalizacion" />
        </Grid>
{/* 
        <Grid item xs={12}>
          <h1>{id}</h1>
        </Grid>
 */}


        <Grid item xs={12}>
          <InformacionSolicitud />
        </Grid>




        <Grid item xs={12}>
          <Metadatos />
        </Grid>


     


        <Grid item xs={12} >
        
<BotonesDigitalizacion/>

      </Grid>
      </Grid>

    </>
  )
}

