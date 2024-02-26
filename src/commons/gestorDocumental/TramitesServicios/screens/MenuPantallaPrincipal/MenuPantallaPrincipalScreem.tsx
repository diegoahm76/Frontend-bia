/* eslint-disable @typescript-eslint/naming-convention */
import React from "react";
import { Button, Grid } from "@mui/material";
import { Title } from "../../../../../components/Title";
import { useNavigate } from "react-router-dom";
import { BuscarTramitesProcesoScreen } from "../../components/screens/BuscarTramitesProceso/BuscarTramitesProcesoScreen";
import { BotonInformativo } from "../../utils/BotonInformativo";
import AddIcon from '@mui/icons-material/Add';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import AssignmentIcon from '@mui/icons-material/Assignment';


export const MenuPantallaPrincipalScreem = () => {
  
  // Hook para la navegación
  const navigate = useNavigate();

  // Función para redirigir a la página de Nuevo Trámite
  const RedirigirNuevoTramite = () => {
    navigate("/app/gestor_documental/configuracion_datos_basicos/configuracion/tipologuia_siguiente");
  };

  // Función para redirigir a la página de Trámites en Proceso
  const RedirigirTramitesProceso = () => {
    navigate("/app/gestor_documental/configuracion_datos_basicos/configuracion/tipologuia_siguiente");
  };

  // Función para redirigir a la página de Trámites Otorgados/Negados
  const RedirigirTramitesOtorgadosNegados = () => {
    navigate("/app/gestor_documental/configuracion_datos_basicos/configuracion/tipologuia_siguiente");
  };

  // Mensaje informativo para el botón informativo
  const data_informacion = "En esta sección podrás consultar los trámites en proceso y redirigirte a los respectivos módulos de tramitación.";



  return (
    <>
      {/* Contenedor principal */}
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
        {/* Título */}
        <Grid item xs={12}>
          <Title title="Trámites y Servicios" />
        </Grid>

        {/* Botón informativo */}
        <Grid container justifyContent="flex-end" alignItems="center">
          <Grid item xs={1}>
            <BotonInformativo texto={data_informacion} />
          </Grid>
        </Grid>

        {/* Contenedor de botones */}
        <Grid container spacing={1} style={{ margin: 1 }}>
          {/* Botón de configuración 1 - Nuevo Trámite */}
          <Grid item xs={12} sm={4}>
            <Button
              startIcon={<AddIcon />}
              fullWidth
              style={{ width: "90%", marginTop: 15, backgroundColor: "green" }}
              variant="contained"
              onClick={RedirigirNuevoTramite}
            >
              Nuevo Trámite
            </Button>
          </Grid>

          {/* Botón de configuración 2 - Trámites en Proceso */}
          <Grid item xs={12} sm={4}>
            <Button
              fullWidth
              color="success"
              style={{ width: "90%", marginTop: 15 }}
              variant="outlined"
              onClick={RedirigirTramitesProceso}
              startIcon={<HourglassTopIcon />}
            >
              Trámites en Proceso
            </Button>
          </Grid>

          {/* Botón de configuración 3 - Trámites Otorgados/Negados */}
          <Grid item xs={12} sm={4}>
            <Button
              fullWidth
              variant="outlined"
              color="warning"
              style={{ width: "90%", marginTop: 15 }}
              onClick={RedirigirTramitesOtorgadosNegados}
              startIcon={<AssignmentIcon />}
            >
              Trámites Otorgados/Negados
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {/* Componente de búsqueda de trámites y procesos */}
      <Grid item xs={12}>
        <BuscarTramitesProcesoScreen />
      </Grid>
    </>
  );
};
