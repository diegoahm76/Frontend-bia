/* eslint-disable @typescript-eslint/naming-convention */

import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { DetalleLiquidacion } from "../DetalleLiquidacion/DetalleLiquidacion";
import { api } from "../../../../../api/axios";
import { Persona } from "../../../WorkFlowPQRSDF/interface/IwordFlow";
import { BuscadorPerzonasStiven } from "../../../WorkFlowPQRSDF/components/BuscadorPersonaPersonalizado/BuscadorPerzonas";
import { useSelector } from "react-redux";
import type { AuthSlice } from '../../../../auth/interfaces/authModels';
import { Title } from "../../../../../components/Title";
import { PreciosContext } from "../../context/PersonalContext";
import { useAppSelector } from "../../../../../hooks/hooks";

export interface ElementoPQRS {
  costo_proyecto: string;
  estado_actual_solicitud: string;
  fecha_inicio: string | null;
  fecha_radicado: string;
  fecha_registro: string;
  medio_solicitud: string;
  nombre_completo_titular: string;
  nombre_proyecto: string;
  nombre_tramite: string | null;
  pago: boolean;
  radicado: string;
  tipo_solicitud: string;
  // Agrega más propiedades según sea necesario
}



export const GenerarLiquidacion = () => {

  const { userinfo: { id_persona, email, telefono_celular, numero_documento } } = useSelector((state: AuthSlice) => state.auth);
  const { form, setForm } = useContext(PreciosContext);
  const [data_liquidacion, set_data_liquidacion] = useState<ElementoPQRS | null>(null);

  
  const currentElementPqrsdComplementoTramitesYotros = useAppSelector(
    (state) =>
    state.PanelVentanillaSlice.currentElementPqrsdComplementoTramitesYotros
    );
    
  
// console.log("currentElementPqrsdComplementoTramitesYotros",currentElementPqrsdComplementoTramitesYotros)
const fetch_datos_choises = async (): Promise<void> => {
  try {
    const url = `/tramites/general/get/?radicado=${currentElementPqrsdComplementoTramitesYotros?.radicado}`;
    const res = await api.get(url); // Utiliza Axios para realizar la solicitud GET
    const data_consulta = res.data.data;
    console.log("data_consulta",data_consulta);
    // control_success('Datos actualizados correctamente');
  } catch (error) {
    console.error(error);
  }
};


`tramites/general/get/?radicado=${currentElementPqrsdComplementoTramitesYotros?.radicado}`

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

        <Grid container justifyContent="center">
          <Grid item xs={12} >
            <Grid container alignItems="center" justifyContent="center">
              <Title title="Solicitante" />
            </Grid>
          </Grid>
        </Grid>

<button onClick={fetch_datos_choises}> xxxxx</button>

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


      </Grid >


      <DetalleLiquidacion />
    </>
  );
};
