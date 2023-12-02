/* eslint-disable @typescript-eslint/naming-convention */

import { useContext } from "react";
import { Grid, Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
import { useNavigate } from "react-router-dom"; // Asumo que estás utilizando react-router
import { api } from "../../../../../../../../../api/axios";
import { control_error, control_success } from "../../../../../../../../seguridad/components/SucursalEntidad/utils/control_error_or_success";
import {  TipodeCeaccionContext } from "../../context/CreacionTipologuia";
import CleanIcon from '@mui/icons-material/CleaningServices';
import { ConsultaAñosAnteriores } from "../ConsultaAñosAnteriores/ConsultaAñosAnteriores";
import { Inicial_Formulario } from "../../interfaces/ConfiguracionTipologuias";

export const BotonesActionsFormulario = () => {
  const navigate = useNavigate();

  const { Formulario_Empresa, Set_Formulario_Empresa, Set_Datos_Return } = useContext(TipodeCeaccionContext);


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

      Set_Datos_Return(data_return);
      control_success("se creo correctamente la configuracion de Empresa");
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
      const res = await api.post(url, postData);
      const numeroConsulta = res.data.data;
      Set_Datos_Return(numeroConsulta);
      control_success("se creo correctamente  la configuracion de Sub-Seccion");
    } catch (error: any) {
      control_error(error.response.data.detail);

    }
  };


  const crear_configuracion_expediente_simple = async () => {
    try {
      const url = '/gestor/trd/configuracion-tipologia/configuracion-tipologia-actual/';
      const postData = {

        "tipologia": Formulario_Empresa.id_tipologia_documental,
        "maneja_consecutivo": Formulario_Empresa.maneja_consecutivo,
      };
      const res = await api.post(url, postData);
      const numeroConsulta = res.data.data;
      Set_Datos_Return(numeroConsulta);
      control_success("se creo correctamente");
    } catch (error: any) {
      control_error(error.response.data.detail);

    }
  };




  //FUNCIONES PARA ACTUALIZAR 





  const ActualizarNingunoEmpresa = async () => {
    try {
      const url = `/gestor/trd/configuracion-tipologia/actualizar-tipologia-no-a-em/${Formulario_Empresa.id_tipologia_documental}/`;
      const putData = {
        "maneja_consecutivo": Formulario_Empresa.maneja_consecutivo,
        "nivel_consecutivo": "EM",
        "valor_inicial": Formulario_Empresa.valor_inicial,
        "cantidad_digitos": Formulario_Empresa.cantidad_digitos
      };
      const res = await api.put(url, putData);
      const numeroConsulta = res.data.data;
      Set_Datos_Return(numeroConsulta);
      control_success("se actualizó correctamente");
    } catch (error: any) {
      control_error(error.response.data.detail);
    }
  };


  const ActualizarNingunoSubSecccion = async () => {
    try {
      const url = `/gestor/trd/configuracion-tipologia/actualizar-tipologia-no-a-ss/${Formulario_Empresa.id_tipologia_documental}/`;
      const putData = {
        "maneja_consecutivo": Formulario_Empresa.maneja_consecutivo,
        "nivel_consecutivo": "SS",
        "configuracion_por_unidad": Formulario_Empresa.configuracion_por_unidad

      };
      const res = await api.put(url, putData);
      const numeroConsulta = res.data.data;
      Set_Datos_Return(numeroConsulta);
      control_success("se actualizó correctamente");
    } catch (error: any) {
      control_error(error.response.data.detail);
    }
  };



  const ActualizarEmpresaUnico = async () => {
    try {
      const url = `/gestor/trd/configuracion-tipologia/actualizar-tipologia-em/${Formulario_Empresa.id_tipologia_documental}/`;
      const putData = {
        "valor_inicial": Formulario_Empresa.valor_inicial,
        "cantidad_digitos": Formulario_Empresa.cantidad_digitos
      };
      const res = await api.put(url, putData);
      const numeroConsulta = res.data.data;
      Set_Datos_Return(numeroConsulta);
      control_success("se actualizó correctamente");
    } catch (error: any) {
      control_error(error.response.data.detail);
    }
  };



  const ActualizarEmpresaNinguno = async () => {
    try {
      const url = `/gestor/trd/configuracion-tipologia/actualizar-tipologia-si-a-no-em/${Formulario_Empresa.id_tipologia_documental}/`;
      const putData = {
        "maneja_consecutivo": false
      };
      const res = await api.put(url, putData);
      const numeroConsulta = res.data.data;
      Set_Datos_Return(numeroConsulta);
      control_success("se actualizó correctamente");
    } catch (error: any) {
      control_error(error.response.data.detail);
    }
  };



  const ActualizarEmpresaSubSeccion = async () => {
    try {
      const url = `/gestor/trd/configuracion-tipologia/actualizar-tipologia-em-a-ss/${Formulario_Empresa.id_tipologia_documental}/`;
      const putData = {
        "maneja_consecutivo": Formulario_Empresa.maneja_consecutivo,
        "nivel_consecutivo": "SS",
        "configuracion_por_unidad": Formulario_Empresa.configuracion_por_unidad
      };
      const res = await api.put(url, putData);
      const numeroConsulta = res.data.data;
      Set_Datos_Return(numeroConsulta);
      control_success("se actualizó correctamente");
    } catch (error: any) {
      control_error(error.response.data.detail);
    }
  };




  const ActualizarSubSeccionNinguno = async () => {
    try {
      const url = `/gestor/trd/configuracion-tipologia/actualizar-tipologia-si-a-no-ss/${Formulario_Empresa.id_tipologia_documental}/`;
      const putData = {
        "maneja_consecutivo": false
      };
      const res = await api.put(url, putData);
      const numeroConsulta = res.data.data;
      Set_Datos_Return(numeroConsulta);
      control_success("se actualizó correctamente");
    } catch (error: any) {
      control_error(error.response.data.detail);
    }
  };



  const ActualizarSubSecciomEmpresa = async () => {
    try {
      const url = `/gestor/trd/configuracion-tipologia/actualizar-tipologia-ss-a-em/${Formulario_Empresa.id_tipologia_documental}/`;
      const putData = {
        "maneja_consecutivo": Formulario_Empresa.maneja_consecutivo,
        "nivel_consecutivo": "EM",
        "valor_inicial": Formulario_Empresa.valor_inicial,
        "cantidad_digitos": Formulario_Empresa.cantidad_digitos
      };
      const res = await api.put(url, putData);
      const numeroConsulta = res.data.data;
      Set_Datos_Return(numeroConsulta);
      control_success("se actualizó correctamente");
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


      {/* NINGUNO A OTROS */}

      {Formulario_Empresa.actualizar === false && Formulario_Empresa.opcion_seleccionada === "Ninguno" && (
        <Grid item xs={12} sm={5} md={3.4} lg={2.9}>
          <Button
            startIcon={<SaveIcon />}
            style={{ width: "90%", marginTop: 15 }}
            onClick={crear_configuracion_expediente_simple}
            color="success" // Cambia el color según si es una actualización o creación
            fullWidth
            variant="contained"
          >
            Guardar Sin Tipología
          </Button>
        </Grid>
      )}



      {Formulario_Empresa.variables_iniciales.tipo_configuracion === "Ninguno" && (
        <>
          {Formulario_Empresa.actualizar === true && (
            <>
              {Formulario_Empresa.opcion_seleccionada === "Ninguno" && (
                
                  <Grid item xs={12} sm={5} md={3.4} lg={2.9}>
                    <Button
                      startIcon={<SaveIcon />}
                      style={{ width: "90%", marginTop: 15 }}
                      color="success" // Cambia el color según si es una actualización o creación
                      fullWidth
                      variant="contained"   >
                      Actualizar de ninguno solito (sin funicon)
                    </Button>
                  </Grid>
              )}


              {Formulario_Empresa.opcion_seleccionada === "EM" && (
                <>
                  <Grid item xs={12} sm={5} md={3.4} lg={2.9}>
                    <Button
                      startIcon={<SaveIcon />}
                      style={{ width: "90%", marginTop: 15 }}
                      color="success" // Cambia el color según si es una actualización o creación
                      fullWidth
                      variant="contained"
                      onClick={ActualizarNingunoEmpresa} >
                      Actualizar de Ninguno a Empresa
                    </Button>
                  </Grid>
                </>
              )}

              {Formulario_Empresa.opcion_seleccionada === "SS" && (
                <>
                  <Grid item xs={12} sm={5} md={3.4} lg={2.9}>
                    <Button
                      startIcon={<SaveIcon />}
                      style={{ width: "90%", marginTop: 15 }}
                      color="success" // Cambia el color según si es una actualización o creación
                      fullWidth
                      variant="contained"
                      onClick={ActualizarNingunoSubSecccion}  >
                      Actualizar de Ninguno a de U.Organizacional
                    </Button>
                  </Grid>
                </>
              )}
            </>
          )}
        </>
      )}


      {Formulario_Empresa.actualizar === false && Formulario_Empresa.opcion_seleccionada === "EM" && (
        <Grid item xs={12} sm={5} md={3.4} lg={2.9}>
          <Button
            startIcon={<SaveIcon />}
            style={{ width: "90%", marginTop: 15 }}
            onClick={crear_configuracion_expediente}
            color="success" // Cambia el color según si es una actualización o creación
            fullWidth
            variant="contained"
          >
            Guardar configuracion Empresa
          </Button>
        </Grid>
      )}


      {/* CONFIGURAR EMPRESA  */}

      {Formulario_Empresa.variables_iniciales.tipo_configuracion === "EM" && (
        <>
          {Formulario_Empresa.actualizar === true && (
            <>
              {Formulario_Empresa.opcion_seleccionada === "Ninguno" && (
                <>
                  <Grid item xs={12} sm={5} md={3.4} lg={2.9}>
                    <Button
                      startIcon={<SaveIcon />}
                      style={{ width: "90%", marginTop: 15 }}
                      color="success" // Cambia el color según si es una actualización o creación
                      fullWidth
                      variant="contained"
                      onClick={ActualizarEmpresaNinguno} >
                      Actualizar de Empresa  A  Ninguno
                    </Button>
                  </Grid>
                </>
              )}


              {Formulario_Empresa.opcion_seleccionada === "EM" && (
                <>
                  <Grid item xs={12} sm={5} md={3.4} lg={2.9}>
                    <Button
                      startIcon={<SaveIcon />}
                      style={{ width: "90%", marginTop: 15 }}
                      color="success" // Cambia el color según si es una actualización o creación
                      fullWidth
                      variant="contained"
                      onClick={ActualizarEmpresaUnico}  >
                      Actualizar Configuracion  Empresa
                    </Button>
                  </Grid>
                </>
              )}


              {Formulario_Empresa.opcion_seleccionada === "SS" && (
                <>
                  <Grid item xs={12} sm={5} lg={2.9}>
                    <Button
                      startIcon={<SaveIcon />}
                      style={{ width: "90%", marginTop: 15 }}
                      color="success" // Cambia el color según si es una actualización o creación
                      fullWidth
                      variant="contained"
                      onClick={ActualizarEmpresaSubSeccion} >
                      Actualizar de Empresa a  U.Organizacional
                    </Button>
                  </Grid>
                </>
              )}
            </>
          )}
        </>
      )}


      {Formulario_Empresa.actualizar === false && Formulario_Empresa.opcion_seleccionada === "SS" && (
        <Grid item xs={12} sm={5} md={3.4} lg={2.9}>
          <Button
            startIcon={<SaveIcon />}
            style={{ width: "90%", marginTop: 15 }}
            onClick={crear_configuracion_expediente_subseecion}
            color="success" // Cambia el color según si es una actualización o creación
            fullWidth
            variant="contained"
          >
            Guardar Configuracion U.Organizacional
          </Button>
        </Grid>
      )}



      {Formulario_Empresa.variables_iniciales.tipo_configuracion === "SS" && (
        <>
          {Formulario_Empresa.actualizar === true && (
            <>
              {Formulario_Empresa.opcion_seleccionada === "Ninguno" && (
                <>
                  <Grid item xs={12} sm={5} md={3.4} lg={2.9}>
                    <Button
                      startIcon={<SaveIcon />}
                      style={{ width: "90%", marginTop: 15 }}
                      color="success" // Cambia el color según si es una actualización o creación
                      fullWidth
                      variant="contained"
                      onClick={ActualizarSubSeccionNinguno}
                    >
                      Actualizar de U.Organizacional A Ninguno
                    </Button>
                  </Grid>
                </>
              )}

              {Formulario_Empresa.opcion_seleccionada === "EM" && (
                <>
                  <Grid item xs={12} sm={4} md={2.4} lg={1.9}>
                    <Button
                      startIcon={<SaveIcon />}
                      style={{ width: "90%", marginTop: 15 }}
                      color="success" // Cambia el color según si es una actualización o creación
                      fullWidth
                      variant="contained"
                      onClick={ActualizarSubSecciomEmpresa}>
                      Actualizar de U.Organizacional A Empresa
                    </Button>
                  </Grid>
                </>
              )}


              {Formulario_Empresa.opcion_seleccionada === "SS" && (
                <>
                  <Grid item xs={12} sm={4} md={2.4} lg={1.9}>
                    <Button
                      startIcon={<SaveIcon />}
                      style={{ width: "90%", marginTop: 15 }}
                      color="success" // Cambia el color según si es una actualización o creación
                      fullWidth
                      variant="contained"   >
                      Actualizar U.Organizacional  (falta)
                    </Button>
                  </Grid>
                </>
              )}
            </>
          )}
        </>
      )}



      <Grid item xs={12} sm={4} md={2.4} lg={1.9}>
        <Button color='primary' style={{ width: "90%", marginTop: 15 }} variant="outlined" onClick={limpiar} fullWidth startIcon={<CleanIcon />}>
          Limpiar
        </Button>
      </Grid>


      <ConsultaAñosAnteriores />

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