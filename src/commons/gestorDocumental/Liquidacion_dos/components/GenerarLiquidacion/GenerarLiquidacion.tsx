/* eslint-disable @typescript-eslint/naming-convention */

import { Button, Grid, TextField } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { DetalleLiquidacion } from "../DetalleLiquidacion/DetalleLiquidacion";
import { api } from "../../../../../api/axios";
import { useSelector } from "react-redux";
import type { AuthSlice } from '../../../../auth/interfaces/authModels';
import { Title } from "../../../../../components/Title";
import { useAppSelector } from "../../../../../hooks/hooks";
import { DatosConsulta, ElementoPQRS } from "../../interfaces/InterfacesLiquidacion";
import { PreciosContext } from "../../context/PersonalContext";
import { ModalInfoCategoriaCostoProyecto } from "../ModalDocumento/ModalInfoCategoria/ModalInfoCategoriaCostoProyecto";


interface ValoresProyectoPorcentajes {
  valorMinimo: number;
  capacidad: string;
  valor: string;
}

const valoresInicialesProyectoPorcentaje: ValoresProyectoPorcentajes = {
  valorMinimo: 0, // Asigna un valor numérico aquí
  capacidad: "", // Asigna un valor de cadena aquí
  valor: "" // Asigna un valor de cadena aquí
};


interface Registro {
  id: number;
  capacidad: string;
  valor: string;
  editable: boolean;
  formula: string;
}





export const GenerarLiquidacion = () => {


  const [datosConsulta, setDatosConsulta] = useState<DatosConsulta>(DatosConsulta);
  const { userinfo: { id_persona, email, telefono_celular, numero_documento } } = useSelector((state: AuthSlice) => state.auth);
  const [data_liquidacion, set_data_liquidacion] = useState<ElementoPQRS | null>(null);
  const { usuario, setUsuario } = useContext(PreciosContext);
  const [valores_porcentaje, set_valores_porcentaje] = useState<Registro[]>([])
  const [logs, setLogs] = useState<ValoresProyectoPorcentajes>(valoresInicialesProyectoPorcentaje);
  const fechaActual = new Date().toLocaleDateString(); // Obtiene la fecha actual en formato de cadena de texto


  const currentElementPqrsdComplementoTramitesYotros = useAppSelector(
    (state) =>
      state.PanelVentanillaSlice.currentElementPqrsdComplementoTramitesYotros
  );


  const fetch_datos_choises = async (): Promise<void> => {
    try {
      const url = `/tramites/general/get/?radicado=${currentElementPqrsdComplementoTramitesYotros?.radicado}`;
      const res = await api.get(url); // Utiliza Axios para realizar la solicitud GET
      const data_consulta: DatosConsulta = res.data.data;
      setDatosConsulta(data_consulta);
      console.log(data_consulta)
      setUsuario({
        ...usuario,
        nombres: data_consulta.Nombre,
        apellidos: "",
        identificacion: data_consulta.NIdenticion,
        telefono: data_consulta.Ntelefono,
        email: data_consulta.Correo,
        nombreCategoria: data_consulta.subject
      });
    } catch (error) {
      console.error(error);
    }
  };





  const ComprobarInteresCobro = async (): Promise<void> => {
    try {
      const url = `/recaudo/configuracion_baisca/sueldo_minimo/get/`;
      const res = await api.get(url); // Utiliza Axios para realizar la solicitud GET
      const data_consulta = res.data.data;
      set_valores_porcentaje(data_consulta)

    } catch (error) {
      console.error(error);
    }
  };

  interface ConfiguracionBasica {
    valor: any;
    fecha_fin: any;
    variables: any;
    fecha_inicio: any;
    descripccion: any;
    nombre_variable: any;
    nombre_tipo_cobro: any;
    nombre_tipo_rentaany: any;
    id_valores_variables: any;
  }



  const [configuraciones, setConfiguraciones] = useState<ConfiguracionBasica[]>([]);


  // Filtrar las configuraciones básicas que tengan el nombre de variable "SMMV"
  const configuracionSMMV = configuraciones.find(configuracion => configuracion.nombre_variable === "SMMV");

  // Obtener el valor si se encontró la configuración correspondiente
  const valorSMMV = configuracionSMMV ? configuracionSMMV.valor : undefined;

  console.log("Valor del salario mínimo mensual vigente:", valorSMMV)

  const TraerValorSalirioMinimoMensual = async (): Promise<void> => {
    try {
      const url = `/recaudo/configuracion_baisca/valoresvariables/get/`;
      const res = await api.get(url); // Utiliza Axios para realizar la solicitud GET
      const configuracionesData: ConfiguracionBasica[] = res.data?.data || [];
      setConfiguraciones(configuracionesData);
    } catch (error) {
      console.error(error);
    }
  }



  //sacar el porcentaje con la varaible de el sueldo minimo

  const valor_minimo = parseInt(data_liquidacion?.costo_proyecto || "0") / parseInt(logs.valor);



  const calcular = () => {
    valores_porcentaje.forEach(registro => {
      try {
        // Reemplazar 'minimo' en la fórmula con el valor correspondiente
        const formula = registro.formula.replace(/minimo/g, valor_minimo.toString());

        // Evaluar la fórmula
        if (eval(formula)) {
          const logData = { valorMinimo: valor_minimo, capacidad: registro.capacidad, valor: registro.valor };

          console.log(`El valor mínimo ${valor_minimo} coincide con la capacidad: ${registro.capacidad}  y ${registro.valor}`);
          setLogs(logData);


        }
      } catch (error) {
        // console.error(`Error al evaluar la fórmula para el registro con ID ${registro.id}: ${error}`);
      }
    });
  }


  useEffect(() => {
    ComprobarInteresCobro();
    TraerValorSalirioMinimoMensual();

  }, [])

  useEffect(() => {
    calcular();
  }, [valores_porcentaje])


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

        <Button onClick={calcular}>xxxx</Button>
        <Grid item xs={12}>
          <Title title="Solicitante" />
        </Grid>

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


        <Grid item xs={12} >
          <Title title="Cobro" />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            label="Categoria de Cobro"
            name="Categoria de Cobro"
            value={logs.capacidad || ""}
            size="small"
            fullWidth
            disabled
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            label="Sueldo Minimo Actual"
            name="Sueldo Minimo Actual"
            value={valorSMMV || ""}
            size="small"
            fullWidth
            disabled
          />
        </Grid>

        <Grid item xs={12} sm={2.5}>
          <TextField
            label="Valor a Cobrar"
            name="Valor a Cobrar"
            value={logs.valor || ""}
            size="small"
            fullWidth
            disabled
          />
        </Grid>


        <Grid item xs={12} sm={2.5}>
          <TextField
            label="Fecha de Liquidacion"
            name="Fecha de Liquidacion"
            value={fechaActual}
            size="small"
            fullWidth
            disabled
          />
        </Grid>


        <Grid item xs={12} sm={1}>
          <ModalInfoCategoriaCostoProyecto />
        </Grid>




      </Grid >
      <DetalleLiquidacion />
    </>
  );
};
