/* eslint-disable @typescript-eslint/naming-convention */

import { Button, Grid } from "@mui/material"
import { Title } from "../../../../components/Title"
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { useNavigate, useParams } from "react-router-dom";

export const PantallaDigitalizacion = () => {

  const navigate = useNavigate();
  const {id}=useParams<{id:string}>();
  
  return (
    <>
      <Grid
        container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item xs={12}>
          <Title title="Proceso de Digitalizacion" />
        </Grid>

        <Grid item xs={12}>
      <h1>{id}</h1>
        </Grid>


        <Grid item xs={12} >
        <Button
          style={{ margin: 8 }}
          color="primary"
          variant="contained"
          startIcon={<ArrowOutwardIcon />}
          onClick={() => {
            navigate(
              '/app/gestor_documental/central_digitalizacion_otros/principal'
            );
          }}
        >
        Central de Digitalizacion
        </Button>
        </Grid>

      
      </Grid>


    </>
  )
}

