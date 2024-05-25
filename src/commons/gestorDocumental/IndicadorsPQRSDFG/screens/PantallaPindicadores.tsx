/* eslint-disable @typescript-eslint/naming-convention */

import { Button, Grid } from '@mui/material';
import { Title } from '../../../../components/Title';
import { Graficapiegraficaindicadores } from '../components/grafica';
import { api } from '../../../../api/axios';
import { useContext, useEffect, useState } from 'react';
import { BasicDemo, exportAll } from '../components/grafica_dos';
import { ConfiguracionFechas } from '../components/configuracionFechas';
import SearchIcon from '@mui/icons-material/Search';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import {
  PQRSDFDataAtencionaQqrsdf,
  AtencionDerechosPeticionData,
  AtencionQuejasData,
  AtencionReclamosData,
  SugerenciasRadicadasData,
  PqrsdfContestadasOportunamenteData,
  PeticionesContestadasOportunamenteData,
  QuejasContestadasOportunamenteData,
  ReclamosOportunamenteData,
  DenunciasContestadasOportunamenteData,
  PQRSDFVencidasData,
  PeriodicidadData,
  initialPQRSDFData,
  initialAtencionDerechosPeticionData,
  initialPQRSDFVencidasData,
  initialReclamosOportunamenteData,
  initialAtencionQuejasData,
  initialPqrsdfContestadasOportunamenteData,
  initialDenunciasContestadasOportunamenteData,
  initialAtencionReclamosData,
  initialPeticionesContestadasOportunamenteData,
  initialSugerenciasRadicadasData,
  initialQuejasContestadasOportunamenteData,
} from '../interface/interfacesIndicadores';
import { PorcentajeContext } from '../context/porcentasjesGraficas';

export const PantallaPindicadores = () => {
  const [P_AtencionAPQRSDF, SET_P_AtencionAPQRSDF] =
    useState<PQRSDFDataAtencionaQqrsdf>(initialPQRSDFData);
  const [dataAtencionDerechosPeticion, setDataAtencionDerechosPeticion] =
    useState<AtencionDerechosPeticionData>(initialAtencionDerechosPeticionData);
  const [dataAtencionQuejas, setDataAtencionQuejas] =
    useState<AtencionQuejasData>(initialAtencionQuejasData);
  const [dataAtencionReclamos, setDataAtencionReclamos] =
    useState<AtencionReclamosData>(initialAtencionReclamosData);
  const [dataSugerenciasRadicadas, setDataSugerenciasRadicadas] =
    useState<SugerenciasRadicadasData>(initialSugerenciasRadicadasData);
  const [
    dataPqrsdfContestadasOportunamente,
    setDataPqrsdfContestadasOportunamente,
  ] = useState<PqrsdfContestadasOportunamenteData>(
    initialPqrsdfContestadasOportunamenteData
  );
  const [
    dataPeticionesContestadasOportunamente,
    setDataPeticionesContestadasOportunamente,
  ] = useState<PeticionesContestadasOportunamenteData>(
    initialPeticionesContestadasOportunamenteData
  );
  const [
    dataQuejasContestadasOportunamente,
    setDataQuejasContestadasOportunamente,
  ] = useState<QuejasContestadasOportunamenteData>(
    initialQuejasContestadasOportunamenteData
  );
  const [dataReclamosOportunamente, setDataReclamosOportunamente] =
    useState<ReclamosOportunamenteData>(initialReclamosOportunamenteData);
  const [
    dataDenunciasContestadasOportunamente,
    setDataDenunciasContestadasOportunamente,
  ] = useState<DenunciasContestadasOportunamenteData>(
    initialDenunciasContestadasOportunamenteData
  );
  const [dataPQRSDFVencidas, setDataPQRSDFVencidas] =
    useState<PQRSDFVencidasData>(initialPQRSDFVencidasData);
  const [dataPeriodicidad, setDataPeriodicidad] =
    useState<PeriodicidadData | null>(null);
  const [activador, set_activador] = useState<boolean>(false);

  //constex
  const { porcentaje } = useContext(PorcentajeContext);

  const { fecha_radicado_desde, fecha_radicado_hasta } = porcentaje;

  const consultarDatosAtencionDerechosPeticion = async (): Promise<void> => {
    try {
      const url = `/gestor/pqr/indicadores/indicador-derechos-peticion/?fecha_radicado_desde=${fecha_radicado_desde}&fecha_radicado_hasta=${fecha_radicado_hasta}`;
      const res = await api.get(url);
      const dataConsulta = res.data.data;
      setDataAtencionDerechosPeticion(dataConsulta);
    } catch (error) {
      console.error(
        'Error al consultar datos de atención a derechos de petición:',
        error
      );
    }
  };

  const AtencionAPQRSDF = async (): Promise<void> => {
    try {
      let url = `/gestor/pqr/indicadores/indicador-atencion-pqrsdf/?fecha_radicado_desde=${fecha_radicado_desde}&fecha_radicado_hasta=${fecha_radicado_hasta}`;
      const res = await api.get(url);
      const Data_consulta = res.data.data;
      const titulo_unononono = res.data.detail;
      console.log(titulo_unononono);
      SET_P_AtencionAPQRSDF(Data_consulta);
    } catch (error) {
      console.error(error);
    }
  };

  const consultarDatosAtencionQuejas = async (): Promise<void> => {
    try {
      let url = `/gestor/pqr/indicadores/indicador-quejas/?fecha_radicado_desde=${fecha_radicado_desde}&fecha_radicado_hasta=${fecha_radicado_hasta}`;
      const res = await api.get(url);
      const dataConsulta = res.data.data;
      setDataAtencionQuejas(dataConsulta);
    } catch (error) {
      console.error(error);
    }
  };

  const consultarDatosAtencionReclamos = async (): Promise<void> => {
    try {
      let url = `/gestor/pqr/indicadores/indicador-reclamos/?fecha_radicado_desde=${fecha_radicado_desde}&fecha_radicado_hasta=${fecha_radicado_hasta}`;
      const res = await api.get(url);
      const dataConsulta = res.data.data;
      setDataAtencionReclamos(dataConsulta);
    } catch (error) {
      console.error(error);
    }
  };

  const consultarDatosSugerenciasRadicadas = async (): Promise<void> => {
    try {
      let url = `/gestor/pqr/indicadores/indicador-sugerencias/?fecha_radicado_desde=${fecha_radicado_desde}&fecha_radicado_hasta=${fecha_radicado_hasta}`;
      const res = await api.get(url); // Asegúrate de tener la función 'api.get()' definida
      const dataConsulta = res.data.data;
      setDataSugerenciasRadicadas(dataConsulta);
    } catch (error) {
      console.error(error);
    }
  };

  const consultarDatosPqrsdfContestadasOportunamente =
    async (): Promise<void> => {
      try {
        let url = `/gestor/pqr/indicadores/indicador-pqrsdf-contestadas-oportunamente/?fecha_radicado_desde=${fecha_radicado_desde}&fecha_radicado_hasta=${fecha_radicado_hasta}`;
        const res = await api.get(url); // Asegúrate de tener la función 'api.get()' definida
        const dataConsulta = res.data.data;
        setDataPqrsdfContestadasOportunamente(dataConsulta);
      } catch (error) {
        console.error(error);
      }
    };

  const consultarDatosPeticionesContestadasOportunamente =
    async (): Promise<void> => {
      try {
        let url = `/gestor/pqr/indicadores/indicador-peticiones-contestadas-oportunamente/?fecha_radicado_desde=${fecha_radicado_desde}&fecha_radicado_hasta=${fecha_radicado_hasta}`;
        const res = await api.get(url);
        const dataConsulta = res.data.data;
        setDataPeticionesContestadasOportunamente(dataConsulta);
      } catch (error) {
        console.error(error);
      }
    };

  const consultarDatosQuejasContestadasOportunamente =
    async (): Promise<void> => {
      try {
        let url = `/gestor/pqr/indicadores/indicador-quejas-contestadas-oportunamente/?fecha_radicado_desde=${fecha_radicado_desde}&fecha_radicado_hasta=${fecha_radicado_hasta}`;
        const res = await api.get(url);
        const dataConsulta = res.data.data;
        setDataQuejasContestadasOportunamente(dataConsulta);
      } catch (error) {
        console.error(error);
      }
    };

  const consultarDatosReclamosOportunamente = async (): Promise<void> => {
    try {
      let url = `/gestor/pqr/indicadores/indicador-reclamos-contestadas-oportunamente/?fecha_radicado_desde=${fecha_radicado_desde}&fecha_radicado_hasta=${fecha_radicado_hasta}`;
      const res = await api.get(url);
      const dataConsulta = res.data.data;
      setDataReclamosOportunamente(dataConsulta);
    } catch (error) {
      console.error(error);
    }
  };

  const consultarDatosDenunciasContestadasOportunamente =
    async (): Promise<void> => {
      try {
        let url = `/gestor/pqr/indicadores/indicador-denuncias-contestadas-oportunamente/?fecha_radicado_desde=${fecha_radicado_desde}&fecha_radicado_hasta=${fecha_radicado_hasta}`;
        const res = await api.get(url);
        const dataConsulta = res.data.data;
        setDataDenunciasContestadasOportunamente(dataConsulta);
      } catch (error) {
        console.error(error);
      }
    };

  const consultarDatosPQRSDFVencidas = async (): Promise<void> => {
    try {
      let url = `/gestor/pqr/indicadores/indicador-pqrsdf-vencidas/?fecha_radicado_desde=${fecha_radicado_desde}&fecha_radicado_hasta=${fecha_radicado_hasta}`;
      const res = await api.get(url);
      const dataConsulta = res.data.data;
      setDataPQRSDFVencidas(dataConsulta);
    } catch (error) {
      console.error(error);
    }
  };

  const consultarDatosPeriodicidad = async (): Promise<void> => {
    try {
      let url = `/gestor/pqr/indicadores/indicador-periocidad/?fecha_radicado_desde=${fecha_radicado_desde}&fecha_radicado_hasta=${fecha_radicado_hasta}`;
      const res = await api.get(url);
      const dataConsulta: PeriodicidadData = res.data.data;
      setDataPeriodicidad(dataConsulta);
    } catch (error) {
      console.error(error);
    }
  };
  const Activador_funciones = () => {
    consultarDatosAtencionQuejas();
    AtencionAPQRSDF();
    consultarDatosAtencionDerechosPeticion();
    consultarDatosAtencionReclamos();
    consultarDatosSugerenciasRadicadas();
    consultarDatosPqrsdfContestadasOportunamente();
    consultarDatosPeticionesContestadasOportunamente();
    consultarDatosQuejasContestadasOportunamente();
    consultarDatosReclamosOportunamente();
    consultarDatosDenunciasContestadasOportunamente();
    consultarDatosPQRSDFVencidas();
    consultarDatosPeriodicidad();
  };

  useEffect(() => {
    Activador_funciones();
  }, []);

  useEffect(() => {
    Activador_funciones();
  }, [activador]);

  // const primer_grafica =
  //   dataPeriodicidad?.indicadores_por_medio_solicitud[0]
  //     ?.nombre_medio_solicitud;
  const primer_grafica_nombre = dataPeriodicidad?.indicadores_por_medio_solicitud.find(indicador =>
    indicador.nombre_medio_solicitud === "Redes Sociales"
  )?.nombre_medio_solicitud || null;

  const segunda_grafica =
    dataPeriodicidad?.indicadores_por_medio_solicitud[2]
      ?.nombre_medio_solicitud;
  const tercera_grafica =
    dataPeriodicidad?.indicadores_por_medio_solicitud[4]
      ?.nombre_medio_solicitud;
  const cuarta_grafica =
    dataPeriodicidad?.indicadores_por_medio_solicitud[6]
      ?.nombre_medio_solicitud;
  const quinta_grafica =
    dataPeriodicidad?.indicadores_por_medio_solicitud[7]
      ?.nombre_medio_solicitud;

  const primer_grafica_value =
    dataPeriodicidad?.indicadores_por_medio_solicitud[0]?.cantidad_pqrsdf;
  const segunda_grafica_value =
    dataPeriodicidad?.indicadores_por_medio_solicitud[2]?.cantidad_pqrsdf;
  const tercera_grafica_value =
    dataPeriodicidad?.indicadores_por_medio_solicitud[4]?.cantidad_pqrsdf;
  const cuarta_grafica_value =
    dataPeriodicidad?.indicadores_por_medio_solicitud[6]?.cantidad_pqrsdf;
  const quinta_grafica_value =
    dataPeriodicidad?.indicadores_por_medio_solicitud[7]?.cantidad_pqrsdf;

  const total = dataPeriodicidad?.total_pqrsdf;

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
          {/* Si Title es un componente que deseas centrar, también puedes aplicar estilos aquí */}
          <Title title="Periocidad" />
        </Grid>

        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <h2>Total de PQRSDF: {total}</h2>
        </Grid>
        <div id="container-pdf-unico">
          <Grid container >

            <Grid item xs={2.4} sx={{ display: 'flex', alignItems: 'center' }}>
              <BasicDemo
                id={6}
                titulo={primer_grafica_nombre || ''}
                value={primer_grafica_value}
              />
            </Grid>

            <Grid item xs={2.4} sx={{ display: 'flex', alignItems: 'center' }}>
              <BasicDemo
                id={1}
                titulo={segunda_grafica || ''}
                value={segunda_grafica_value}
              />
            </Grid>

            <Grid item xs={2.4} sx={{ display: 'flex', alignItems: 'center' }}>
              <BasicDemo
                id={2}
                titulo={tercera_grafica || ''}
                value={tercera_grafica_value}
              />
            </Grid>

            <Grid item xs={2.4} sx={{ display: 'flex', alignItems: 'center' }}>
              <BasicDemo
                id={3}
                titulo={cuarta_grafica || ''}
                value={cuarta_grafica_value}
              />
            </Grid>

            <Grid item xs={2.4} sx={{ display: 'flex', alignItems: 'center' }}>
              <BasicDemo
                id={4}
                titulo={quinta_grafica || ''}
                value={quinta_grafica_value}
              />
            </Grid>

            {/* <Grid container justifyContent="flex-start" alignItems="center" spacing={3}> */}
            <Grid
              container
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={2}>
                <Button
                  startIcon={<PictureAsPdfIcon />}
                  variant='contained'
                  onClick={exportAll}
                  fullWidth
                >
                  Imprimir Todas
                </Button>
              </Grid>
            </Grid>



          </Grid>
        </div>
      </Grid>

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
          <Title title="Indicadores" />
        </Grid>

        <Grid item xs={12}>
          <ConfiguracionFechas />
        </Grid>

        <Grid item xs={12}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{ marginTop: 15, marginRight: 15 }}
          >
            <Button
              variant="contained"
              onClick={() => {
                set_activador(!activador);
              }}
              startIcon={<SearchIcon />}
            >
              Consultar
            </Button>
          </Grid>
        </Grid>

        <Grid item xs={4}>
          <Graficapiegraficaindicadores
            valor_uno={P_AtencionAPQRSDF.porcentaje_respondidos}
            valor_dos={P_AtencionAPQRSDF.porcentaje_no_respondidos}
            tipo_porcentaje={P_AtencionAPQRSDF.rango_cumplimiento}
            titulo="Atención a PQRSDF"
          />
        </Grid>

        <Grid item xs={4}>
          <Graficapiegraficaindicadores
            valor_uno={dataAtencionDerechosPeticion.porcentaje_respondidos}
            valor_dos={dataAtencionDerechosPeticion.porcentaje_no_respondidos}
            tipo_porcentaje={dataAtencionDerechosPeticion.rango_cumplimiento}
            titulo={'Derechos de Peticion'}
          />
        </Grid>

        <Grid item xs={4}>
          <Graficapiegraficaindicadores
            valor_uno={dataAtencionQuejas.num_quejas_respondidas}
            valor_dos={dataAtencionQuejas.porcentaje_no_respondidas}
            tipo_porcentaje={dataAtencionQuejas.rango_cumplimiento}
            titulo="Quejas"
          />
        </Grid>

        <Grid item xs={4}>
          <Graficapiegraficaindicadores
            valor_uno={dataAtencionReclamos.porcentaje_respondidos}
            valor_dos={dataAtencionReclamos.porcentaje_no_respondidos}
            tipo_porcentaje={dataAtencionReclamos.rango_cumplimiento}
            titulo="Reclamos"
          />
        </Grid>

        <Grid item xs={4}>
          <Graficapiegraficaindicadores
            valor_uno={
              dataSugerenciasRadicadas.porcentaje_sugerencias_radicadas
            }
            valor_dos={
              dataSugerenciasRadicadas.porcentaje_sugerencias_no_radicadas
            }
            tipo_porcentaje={dataSugerenciasRadicadas.rango_cumplimiento}
            titulo="Sugerencias"
          />
        </Grid>

        <Grid item xs={4}>
          <Graficapiegraficaindicadores
            valor_uno={
              dataPqrsdfContestadasOportunamente.porcentaje_contestados_oportunamente
            }
            valor_dos={
              dataPqrsdfContestadasOportunamente.porcentaje_contestados_inoportunamente
            }
            tipo_porcentaje={
              dataPqrsdfContestadasOportunamente.rango_cumplimiento
            }
            titulo="PQRSDF contestados Oportunamente"
          />
        </Grid>

        <Grid item xs={4}>
          <Graficapiegraficaindicadores
            valor_uno={
              dataPeticionesContestadasOportunamente.porcentaje_contestadas_oportunamente
            }
            valor_dos={
              dataPeticionesContestadasOportunamente.porcentaje_contestadas_inoportunamente
            }
            tipo_porcentaje={
              dataPeticionesContestadasOportunamente.rango_cumplimiento
            }
            titulo="Peticiones contestadas oportunamente"
          />
        </Grid>

        <Grid item xs={4}>
          <Graficapiegraficaindicadores
            valor_uno={
              dataQuejasContestadasOportunamente.porcentaje_contestadas_oportunamente
            }
            valor_dos={
              dataQuejasContestadasOportunamente.porcentaje_contestadas_inoportunamente
            }
            tipo_porcentaje={
              dataQuejasContestadasOportunamente.rango_cumplimiento
            }
            titulo="Quejas contestadas oportunamente"
          />
        </Grid>

        <Grid item xs={4}>
          <Graficapiegraficaindicadores
            valor_uno={
              dataReclamosOportunamente.porcentaje_contestados_oportunamente
            }
            valor_dos={
              dataReclamosOportunamente.porcentaje_no_contestados_inoportunamente
            }
            tipo_porcentaje={dataReclamosOportunamente.rango_cumplimiento}
            titulo="Reclamos Contestados oportunamente"
          />
        </Grid>

        <Grid item xs={4}>
          <Graficapiegraficaindicadores
            valor_uno={
              dataDenunciasContestadasOportunamente.porcentaje_contestadas_oportunamente
            }
            valor_dos={
              dataDenunciasContestadasOportunamente.porcentaje_no_contestadas_oportunamente
            }
            tipo_porcentaje={
              dataDenunciasContestadasOportunamente.rango_cumplimiento
            }
            titulo="Denuncias Contestadas oportunamente"
          />
        </Grid>

        <Grid item xs={4}>
          <Graficapiegraficaindicadores
            valor_uno={dataPQRSDFVencidas.porcentaje_oportunas}
            valor_dos={dataPQRSDFVencidas.porcentaje_vencidas}
            tipo_porcentaje={dataPQRSDFVencidas.rango_cumplimiento}
            titulo="PQRSDF Vencidas"
          />
        </Grid>

        <Grid item xs={4}>
          <Graficapiegraficaindicadores
            valor_uno={dataPQRSDFVencidas.porcentaje_oportunas}
            valor_dos={dataPQRSDFVencidas.porcentaje_vencidas}
            tipo_porcentaje={dataPQRSDFVencidas.rango_cumplimiento}
            titulo="estados vencidos"
          />
        </Grid>
      </Grid>
    </>
  );
};
