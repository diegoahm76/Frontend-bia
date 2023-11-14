/* eslint-disable @typescript-eslint/naming-convention */

import React, { useContext } from "react";
import { Grid, Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
import { useNavigate } from "react-router-dom"; // Asumo que estás utilizando react-router
import { api } from "../../../../../../../../../api/axios";
import { control_error, control_success } from "../../../../../../../../seguridad/components/SucursalEntidad/utils/control_error_or_success";
import { Inicial_Formulario, TipodeCeaccionContext } from "../../context/CreacionTipologuia";
import CleanIcon from '@mui/icons-material/CleaningServices';

export const BotonesActionsFormulario = () => {
  const navigate = useNavigate();

  const { Formulario_Empresa, Set_Formulario_Empresa } = useContext(TipodeCeaccionContext);


  const crear_configuracion_expediente = async () => {
    try {
      const url = '/gestor/trd/configuracion-tipologia/configuracion-tipologia-empresa/';
      const postData = {
        "id_tipologia_doc": Formulario_Empresa.id_tipologia_documental,
        "maneja_consecutivo": Formulario_Empresa.maneja_consecutivo,
        "nivel_consecutivo": "EM",
        "valor_inicial": Formulario_Empresa.valor_inicial,
        "cantidad_digitos": Formulario_Empresa.cantidad_digitos
      };
      const res = await api.post(url, postData);
      const data_return = res.data.data;
      const {
         T246IdConfigTipologiaDocAgno,
        T247consecutivoActual,
        T247consecutivoActualAMostrar }= data_return;

        Set_Formulario_Empresa(data_return)

      control_success("se creo correctamente");
    } catch (error: any) {
      control_error(error.response.data.detail);
    }
  };



  const crear_configuracion_expediente_subseecion = async () => {
    try {
      const url = '/gestor/trd/configuracion-tipologia/configuracion-tipologia-ss/';
      const postData = {
        "id_tipologia_doc": Formulario_Empresa.id_tipologia_documental,
        "maneja_consecutivo": Formulario_Empresa.maneja_consecutivo,
        "nivel_consecutivo": "SS",
        "configuracion_por_unidad": Formulario_Empresa.configuracion_por_unidad
    }
    ;
    console.log(postData);
      // const res = await api.post(url, postData);
      // const numeroConsulta = res.data.data;

      control_success("se creo correctamente");
    } catch (error: any) {
      control_error(error.response.data.detail);
    }
  };




  const limpiar = () => {
    Set_Formulario_Empresa(Inicial_Formulario);
  }


  return (
    <Grid
      container

      justifyContent="flex-end"
      sx={{
        position: 'relative',
        background: '#FAFAFA',
        borderRadius: '15px',
        p: '20px',
        mb: '20px',
        boxShadow: '0px 3px 6px #042F4A26',
      }}
    >





      {Formulario_Empresa.opcion_seleccionada === "Empresa" && (
        <Grid item xs={12} sm={4} md={2.4} lg={1.9}>
          <Button
            startIcon={<SaveIcon />}
            style={{ width: "90%", marginTop: 15 }}
            onClick={crear_configuracion_expediente}
            color="success" // Cambia el color según si es una actualización o creación
            fullWidth
            variant="contained"
          >
            Guardar empresa
          </Button>
        </Grid>
      )}



      {Formulario_Empresa.opcion_seleccionada === "SecciónSubsección" && (
        <Grid item xs={12} sm={4} md={2.4} lg={1.9}>
          <Button
            startIcon={<SaveIcon />}
            style={{ width: "90%", marginTop: 15 }}
            onClick={crear_configuracion_expediente_subseecion}
            color="success" // Cambia el color según si es una actualización o creación
            fullWidth
            variant="contained"
          >
            Guardar seccon
          </Button>
        </Grid>
      )}


      {Formulario_Empresa.opcion_seleccionada === "" && (
        <Grid item xs={12} sm={4} md={2.4} lg={1.9}>
          <Button
            startIcon={<SaveIcon />}
            style={{ width: "90%", marginTop: 15 }}
            onClick={crear_configuracion_expediente}
            color="success" // Cambia el color según si es una actualización o creación
            fullWidth
            variant="contained"
          >
            Guardar sin nada
          </Button>
        </Grid>
      )}



      <Grid item xs={12} sm={4} md={2.4} lg={1.9}>
        <Button color='primary' style={{ width: "90%", marginTop: 15 }} variant="outlined" onClick={limpiar} fullWidth startIcon={<CleanIcon />}>
          Limpiar
        </Button>
      </Grid>

      <Grid item xs={12} sm={4} md={2.4} lg={1.9}>
        <Button
          startIcon={<ClearIcon />}
          fullWidth
          style={{ width: "90%", marginTop: 15 }}
          variant="contained"
          color="error"
          onClick={() => {
            navigate('/app/home');
          }}
        >
          Salir
        </Button>
      </Grid>
    </Grid>
  );
};