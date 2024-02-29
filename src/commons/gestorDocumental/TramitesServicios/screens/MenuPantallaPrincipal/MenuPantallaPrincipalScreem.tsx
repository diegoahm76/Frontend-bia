/* eslint-disable @typescript-eslint/naming-convention */
import React from "react";
import { Grid } from "@mui/material";
import { Title } from "../../../../../components/Title";
import { useNavigate } from "react-router-dom";
import { BotonInformativo } from "../../utils/BotonInformativo";
import { BuscarTramitesProcesoScreen } from "../../components/BuscarTramitesProceso/BuscarTramitesProcesoScreen";

export const MenuPantallaPrincipalScreem = () => {

  // Hook para la navegación
  const navigate = useNavigate();

  // Función para redirigir a la página de Nuevo Trámite
  const RedirigirNuevoTramite = () => {
    navigate("/app/gestor_documental/tramites/nuevotramite");
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
          <Title title="Juridica de OpAS" />
        </Grid>

        {/* Botón informativo */}
        <Grid container justifyContent="flex-end" alignItems="center">
          <Grid item xs={1}>
            <BotonInformativo texto={data_informacion} />
          </Grid>
        </Grid>
      </Grid>

      <BuscarTramitesProcesoScreen />


    </>
  );
};
