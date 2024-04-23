/* eslint-disable @typescript-eslint/naming-convention */

import { Grid, InputLabel, MenuItem, Select, Switch, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { DetalleLiquidacion } from "../DetalleLiquidacion/DetalleLiquidacion";
import { api } from "../../../../../api/axios";
import { useSelector } from "react-redux";
import type { AuthSlice } from '../../../../auth/interfaces/authModels';
import { Title } from "../../../../../components/Title";
import { useAppSelector } from "../../../../../hooks/hooks";
import { DatosConsulta, ElementoPQRS } from "../../interfaces/InterfacesLiquidacion";




export const GenerarLiquidacion = () => {


  const [datosConsulta, setDatosConsulta] = useState<DatosConsulta>(DatosConsulta);
  const { userinfo: { id_persona, email, telefono_celular, numero_documento } } = useSelector((state: AuthSlice) => state.auth);
  const [data_liquidacion, set_data_liquidacion] = useState<ElementoPQRS | null>(null);
  const [mostrarMasInfo, setMostrarMasInfo] = useState(false);


  const currentElementPqrsdComplementoTramitesYotros = useAppSelector(
    (state) =>
      state.PanelVentanillaSlice.currentElementPqrsdComplementoTramitesYotros
  );


  const fetch_datos_choises = async (): Promise<void> => {
    try {
      const url = `/tramites/general/get/?radicado=${currentElementPqrsdComplementoTramitesYotros?.radicado}`;
      const res = await api.get(url); // Utiliza Axios para realizar la solicitud GET
      const data_consulta = res.data.data;
      setDatosConsulta(data_consulta);
    } catch (error) {
      console.error(error);
    }
  };

  
  const handleSwitchChange = () => {
    setMostrarMasInfo(!mostrarMasInfo);
  };


  useEffect(() => {
    if (currentElementPqrsdComplementoTramitesYotros) {
      set_data_liquidacion(currentElementPqrsdComplementoTramitesYotros);
      fetch_datos_choises();
    }
  }, [currentElementPqrsdComplementoTramitesYotros]);




  return (
    <>
      {/* Maquetación de los componentes */}
      <Grid container spacing={2}>


        <Grid item xs={12}>
          <Title title="Solicitante" />
        </Grid>


        {/* <button onClick={fetch_datos_choises}> xxxxx</button> */}

        <Grid item xs={12} sm={4}>
          <TextField
            label='Email'
            name="Email"
            value={email || ""}
            size="small"
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label='Telefono Celular'
            name="telefono_celular"
            value={telefono_celular || ""}
            size="small"
            fullWidth
            disabled
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            label='Numero Documento'
            name="numero_documento"
            value={numero_documento || ""}
            size="small"
            fullWidth
            disabled
          />
        </Grid>








        <Grid item xs={12} >
          <Title title="Datos de el Tramite" />
        </Grid>


        <Grid item xs={12} sm={4}>
          <TextField
            label='Nombre Completo del Titular'
            name="nombre_completo_titular"
            value={data_liquidacion?.nombre_completo_titular || ""}
            size="small"
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label='Nombre del Proyecto'
            name="nombre_proyecto"
            value={data_liquidacion?.nombre_proyecto || ""}
            size="small"
            fullWidth
            disabled
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            label='Costo del Proyecto'
            name="costo_proyecto"
            value={data_liquidacion?.costo_proyecto || ""}
            size="small"
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label='Estado Actual de la Solicitud'
            name="estado_actual_solicitud"
            value={data_liquidacion?.estado_actual_solicitud || ""}
            size="small"
            fullWidth
            disabled
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            label='Radicado'
            name="radicado"
            value={data_liquidacion?.radicado || ""}
            size="small"
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label='Tipo de Solicitud'
            name="tipo_solicitud"
            value={data_liquidacion?.tipo_solicitud || ""}
            size="small"
            fullWidth
            disabled
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            label='Fecha de Inicio'
            name="fecha_inicio"
            value={data_liquidacion?.fecha_inicio || ""}
            size="small"
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label='Fecha de Radicado'
            name="fecha_radicado"
            value={data_liquidacion?.fecha_radicado ? new Date(data_liquidacion.fecha_radicado).toLocaleDateString() : ""}
            size="small"
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label='Fecha de Registro'
            name="fecha_registro"
            value={data_liquidacion?.fecha_registro ? new Date(data_liquidacion.fecha_registro).toLocaleDateString() : ""}
            size="small"
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label='Medio de Solicitud'
            name="medio_solicitud"
            value={data_liquidacion?.medio_solicitud || ""}
            size="small"
            fullWidth
            disabled
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            label='Nombre del Trámite'
            name="nombre_tramite"
            value={data_liquidacion?.nombre_tramite || ""}
            size="small"
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label='Pago Realizado'
            name="pago"
            value={data_liquidacion?.pago ? "Sí" : "No"}
            size="small"
            fullWidth
            disabled
          />
        </Grid>


        <Grid container justifyContent="center">
          <Grid item xs={4} style={{ marginTop: 15 }}>
            <Grid container alignItems="center" justifyContent="center">

              <Switch
                checked={mostrarMasInfo}
                onChange={handleSwitchChange}
                color={mostrarMasInfo ? "success" : "info"}
                name="mostrarMasInfo"
                inputProps={{ 'aria-label': 'toggle mostrar más información' }}
              />
              {mostrarMasInfo ? "Mostrar menos información" : "Mostrar más información"}

            </Grid>
          </Grid>
        </Grid>



        {mostrarMasInfo && (<>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Tipo Identificación"
              name="TIdentificacion"
              value={datosConsulta.TIdentificacion || ""}
              size="small"
              fullWidth
              disabled
            />
          </Grid>


          <Grid item xs={12} sm={4}>
            <TextField
              label="Número Identificación"
              name="NIdenticion"
              value={datosConsulta.NIdenticion || ""}
              size="small"
              fullWidth
              disabled
            />
          </Grid>


          <Grid item xs={12} sm={4}>
            <TextField
              label="Número Teléfono"
              name="Ntelefono"
              value={datosConsulta.Ntelefono || ""}
              size="small"
              fullWidth
              disabled
            />
          </Grid>


          <Grid item xs={12} sm={4}>
            <TextField
              label="Correo"
              name="Correo"
              value={datosConsulta.Correo || ""}
              size="small"
              fullWidth
              disabled
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              label="Departamento"
              name="Departamento"
              value={datosConsulta.Departamento || ""}
              size="small"
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Dirección"
              name="Direccion"
              value={datosConsulta.Direccion || ""}
              size="small"
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Depósito Predio"
              name="Dep_Predio"
              value={datosConsulta.Dep_Predio || ""}
              size="small"
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Municipio"
              name="Municipio"
              value={datosConsulta.Municipio || ""}
              size="small"
              fullWidth
              disabled
            />
          </Grid>


          <Grid item xs={12} sm={4}>
            <TextField
              label="Zon"
              name="Zon"
              value={datosConsulta.Zon || ""}
              size="small"
              fullWidth
              disabled
            />
          </Grid>


        </>)}

      </Grid >
      <DetalleLiquidacion />
    </>
  );
};
