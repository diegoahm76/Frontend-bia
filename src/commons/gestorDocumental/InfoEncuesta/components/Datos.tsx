/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApexOptions } from "apexcharts";
import { GraficaBar } from "./GraficaBar";
import { Graficapie } from "./Graficapie";
import { DataGrid } from '@mui/x-data-grid';
import { GraficaArea } from "./GraficaArea";
import { useState, useEffect } from 'react';
import { api } from '../../../../api/axios';
import ReactApexChart from "react-apexcharts";
import { Title } from "../../../../components";
import PrintIcon from '@mui/icons-material/Print';
import DownloadIcon from '@mui/icons-material/Download';
import { FormControl, Grid, Button, ButtonGroup } from "@mui/material";
import { InputLabel, MenuItem, Select, } from "@mui/material";
import { ConteoEncuesta, Encuesta, miEstilo } from "../interfaces/types";
import { download_xls } from "../../../../documentos-descargar/XLS_descargar";
import { download_pdf } from "../../../../documentos-descargar/PDF_descargar";
import { ButtonSalir } from "./Salir";
import Logou from "./logo";

export const Datos: React.FC = () => {
  const [selectedEncuestaId, setSelectedEncuestaId] = useState<number | null>(null);
  interface ReporteTiposUsuario {
    success: boolean;
    detail: string;
    data: {
      registros: {
        nombre: string;
        total: number;
      }[];
      total: number;
    };
  }
  const [reporteTiposUsuario, setReporteTiposUsuario] = useState<ReporteTiposUsuario | null>(null);
  const fetchReporteTiposUsuario = async (): Promise<void> => {
    try {
      const url = `/gestor/encuestas/reporte_tipos_usuario/get/${selectedEncuestaId}/`;
      const res = await api.get<ReporteTiposUsuario>(url);
      setReporteTiposUsuario(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  
  useEffect(() => {
    fetchReporteTiposUsuario();
  }, [selectedEncuestaId]);
  const categoriesTiposUsuario = reporteTiposUsuario?.data.registros.map(registro => registro.nombre) || [];
  const dataTotalsTiposUsuario = reporteTiposUsuario?.data.registros.map(registro => registro.total) || [];
  const chartDataTiposUsuario: ApexOptions = {
    chart: {
      type: 'bar',
      height: 430
    },
    plotOptions: {
      bar: {
        horizontal: false,  // Hazlo vertical
        dataLabels: {
          position: 'top',
        },
      }
    },
    dataLabels: {
      enabled: true,
      offsetX: -6,
      style: {
        fontSize: '14px',
        colors: ['#fff']
      }
    },
    stroke: {
      show: true,
      colors: ['#fff']
    },
    tooltip: {
      shared: true,
      intersect: false
    },
    xaxis: {
      categories: categoriesTiposUsuario,
    }
  };
  const seriesTiposUsuario = [
    {
      name: 'Total por Tipo de Usuario',
      data: dataTotalsTiposUsuario,

    }
  ];
  const [encuestas, setEncuestas] = useState<Encuesta[]>([]);
  useEffect(() => {
    const fetchEncuestas = async (): Promise<void> => {
      try {
        const url = "/gestor/encuestas/encuesta_realizadas/get/";
        const res = await api.get<{ data: Encuesta[] }>(url);
        setEncuestas(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEncuestas();
  }, []);
  const [conteoEncuesta, setConteoEncuesta] = useState<ConteoEncuesta | null>(null);

  const fetchConteoEncuesta = async (): Promise<void> => {
    try {
      const url = `/gestor/encuestas/conteo_encuesta/get/${selectedEncuestaId}/`;
      const res = await api.get<ConteoEncuesta>(url);
      setConteoEncuesta(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {

    fetchConteoEncuesta();
  }, [selectedEncuestaId]);

  const generateRows = (): any[] => {
    let rows: any[] = [];

    if (conteoEncuesta?.data && Array.isArray(conteoEncuesta.data.preguntas)) {
      conteoEncuesta.data.preguntas.forEach((pregunta) => {
        if (pregunta.opciones && Array.isArray(pregunta.opciones)) {
          pregunta.opciones.forEach((opcion) => {
            rows.push({
              id: opcion.id_opcion_rta,
              ordenamiento: pregunta.ordenamiento,
              redaccion_pregunta: pregunta.redaccion_pregunta,
              opcion_rta: opcion.opcion_rta,
              total: opcion.total,
            });
          });
        }
      });
    }

    return rows;
  };


  const rows = generateRows();
  const columns = [
    { field: "ordenamiento", headerName: "Pregunta Numero", width: 150 },
    { field: "redaccion_pregunta", headerName: "Redacción de Pregunta", flex: 1 },
    { field: "opcion_rta", headerName: "Opción de Respuesta", width: 200 },
    { field: "total", headerName: "Total", width: 120 },
  ];
  const [showHeader, setShowHeader] = useState(false); // Controla la visualización del h1 "Hola Mundo"
  const [showButton, setShowButton] = useState(true); // Controla la visualización del botón

  const handlePrint = () => {
    setShowHeader(true);// Mostrar el h1 "Hola Mundo"

    setTimeout(() => {
      window.print(); // Inicia la impresión

      setTimeout(() => {
        setShowHeader(false);
        // setShowButton(false); // Oculta el botón después de 2 segundos
      }, 150);
    }, 1000); // Se utiliza un timeout para dar tiempo al re-renderizado de React
  };
  return (
    <>
      <Grid container
        spacing={2} m={2} p={2}
        sx={miEstilo}
      >
        <>
          {showHeader && <Logou />}

        </>
        {/* {showMessage &&  <Logou/> } */}
        <Grid item xs={12}  >
          <Title title="Informe de encuesta" />
        </Grid>
        {/* <h1>{selectedEncuestaId}</h1> */}
        <Grid item xs={12} sm={4}>
          <FormControl required size="small" fullWidth>
            <InputLabel>Encuesta</InputLabel>
            <Select
              label="Encuesta"
              name="nombre_encuesta"
              value={selectedEncuestaId}
              onChange={(e) => setSelectedEncuestaId(Number(e.target.value))}
            >
              {encuestas.map((encuesta) => (
                <MenuItem key={encuesta.id_encabezado_encuesta} value={encuesta.id_encabezado_encuesta}>
                  {encuesta.nombre_encuesta}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container
        spacing={2} m={2} p={2}
        sx={miEstilo}
      >
        <Grid item xs={12}  >
          <Title title="Datos generales  " />
        </Grid>
        <Grid item xs={12} sm={10} ></Grid>
        <Grid item xs={12} sm={2} >
          <ButtonGroup style={{ margin: 5, }}>
            {download_xls({ nurseries: rows, columns })}
            {download_pdf({
              nurseries: rows,
              columns,
              title: 'Mis alertas',
            })}
          </ButtonGroup>
        </Grid>

        <Grid item xs={12}>
          <DataGrid density="compact"
            autoHeight
            rows={rows}
            columns={columns}
            getRowId={(row) => row.id}
            pageSize={5} />
        </Grid>

      </Grid>
      {selectedEncuestaId ? (
        <Grid container
          spacing={2} m={2} p={2}
          sx={miEstilo}
        >
          <Grid item xs={12} marginTop={2} sm={6}>
            < ReactApexChart options={chartDataTiposUsuario} series={seriesTiposUsuario} type="bar" height={330} />
          </Grid>
          <Grid item xs={12} marginTop={4} sm={6}>
            <Graficapie selectedEncuestaId={selectedEncuestaId} />            {/* Renderiza la gráfica torta */}
          </Grid>
          <Grid item xs={12} marginTop={2} sm={6}>
            <GraficaBar selectedEncuestaId={selectedEncuestaId} />            {/* Renderiza la gráfica barras */}
          </Grid>
          
          <Grid item xs={12} marginTop={4} sm={6}>
            <GraficaArea selectedEncuestaId={selectedEncuestaId} />           {/* Renderiza la gráfica area */}
          </Grid>

        </Grid>
      ) : null}
      <Grid container
        spacing={2} m={2} p={2}
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px', m: '10px 0 20px 0', mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      > <Grid item xs={12} sm={9}></Grid>
        <Grid item xs={12} sm={1.5}>
          {showButton && (
            <Button startIcon={<PrintIcon />} onClick={handlePrint} fullWidth variant="outlined">
              imprimir
            </Button>
          )}
        </Grid>
        <Grid item xs={12} sm={1.5}>
          <ButtonSalir />
        </Grid>
      </Grid>
    </>
  );
};