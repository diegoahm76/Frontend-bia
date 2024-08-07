/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import 'leaflet/dist/leaflet.css';

import { Title } from '../../../../components';
import {
  Dialog,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { api } from '../../../../api/axios';
import { RenderDataGrid } from '../../../gestorDocumental/tca/Atom/RenderDataGrid/RenderDataGrid';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import CleanIcon from '@mui/icons-material/CleaningServices';
import SaveIcon from '@mui/icons-material/Save';
import { control_error, control_success } from '../../../../helpers';
import comaImage from './coma.jpg';

import {
  Planes,
  Programa,
  Proyecto,
  Producto,
  Actividad,
  Indicador,
  metas,
  EjeEstrategico,
} from '../../Seguimientopoai/interface/types';
import {
  fetplames,
  fetmetas,
  fetproyecto,
  fetactividad,
  fetejeplan,
  fetproducto,
  fetprogramas,
  fetindicador,
} from '../../Seguimientopoai/services/select.service';
import { ButtonSalir } from '../../../../components/Salir/ButtonSalir';
import { control_warning } from '../../../almacen/configuracion/store/thunks/BodegaThunks';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

interface Historico {
  descripcion: any;
  nombre: any;
  nivel: any;
  valor: any;
  año: any;
}
export interface FormData {
  plan: any;
  tablero: any;
  fecha_inicia: any;
  fecha_fin: any;
}
export const ControlPoai: React.FC = () => {
  const initialFormData: FormData = {
    plan: '',
    tablero: '',
    fecha_inicia: '',
    fecha_fin: '',
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleInputSelect = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const [ConsultarSeguimiento, setconsultarSeguimiento] = useState<any[]>([]);

  const ejesData = ConsultarSeguimiento[0];
  const total = ConsultarSeguimiento[1];
  const [abrir1, setabrir1] = useState(false);

  const consultarSeguimiento = async (): Promise<void> => {
    try {
      const url = `seguimiento-planes/tablero-control-poai-general-grafica/1/?id_plan=${formData.plan}&fecha_inicio=${formData.fecha_inicia}&fecha_fin=${formData.fecha_fin}`;
      const res = await api.get(url);
      const HistoricoData: any[] = res.data?.data || [];
      setconsultarSeguimiento(HistoricoData);
      control_success('Dato encontrados');
      setabrir1(true);
    } catch (error: any) {
      setconsultarSeguimiento([]);
      setChartOptions((prevOptions: any) => ({
        ...prevOptions,
        series: [{ data: [] }],
        xaxis: { categories: [] },
      }));
      setChartOptions2((prevOptions: any) => ({
        ...prevOptions,
        series: [{ data: [] }],
        xaxis: { categories: [] },
      }));
      control_error(error.response.data.detail);
    }
  }; 
 

  useEffect(() => {
    if (ConsultarSeguimiento.length > 2) {
      setChartOptions((prevOptions: any) => ({
        ...prevOptions,
        series: [
          {
            data: ConsultarSeguimiento[2].valor.map((v: number) => v), // Assuming you want to show values in thousands
          },
        ],
        xaxis: {
          categories: ConsultarSeguimiento[2].numero_programa,
        },
      }));
    } else {
      setChartOptions((prevOptions: any) => ({
        ...prevOptions,
        series: [{ data: [] }],
        xaxis: { categories: [] },
      }));
    }
  
    if (ConsultarSeguimiento.length > 3) {
      setChartOptions2((prevOptions: any) => ({
        ...prevOptions,
        series: [
          {
            name: 'Valor',
            data: ConsultarSeguimiento[3].valor,
          },
          {
            name: 'Valor2',
            data: ConsultarSeguimiento[3].valor2,
          },
        ],
        xaxis: {
          categories: ConsultarSeguimiento[3].numero_proyecto,
        },
      }));
    } else {
      setChartOptions2((prevOptions: any) => ({
        ...prevOptions,
        series: [{ data: [] }],
        xaxis: { categories: [] },
      }));
    }
  }, [ConsultarSeguimiento, abrir1]);

  const [chartOptions, setChartOptions] = useState<any>({
    series: [
      {
        data: [],
      },
    ],
    chart: {
      height: 350,
      type: 'bar' as const,
      events: {
        click: function (chart: any, w: any, e: any) {
          // console.log(chart, w, e)
        },
      },
    },
    colors: [
      '#00E396',
      '#00E396',
      '#00E396',
      '#00E396',
      '#00E396',
      '#00E396',
      '#00E396',
      '#00E396',
    ],
    plotOptions: {
      bar: {
        columnWidth: '45%',
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: [],
      labels: {
        style: {
          colors: [
            '#000000',
            '#000000',
            '#000000',
            '#000000',
            '#000000',
            '#000000',
            '#000000',
            '#000000',
          ],
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      labels: {
        formatter: function (value: number) {
          return value !== undefined ? value.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }) : '';
        },
      },
    },
  });
  // segundo grafico
  const [chartOptions2, setChartOptions2] = useState<any>({
    series: [
      {
        name: 'Valor',
        data: [],
      },
    ],
    chart: {
      type: 'area' as const,
      stacked: false,
      height: 350,
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [20, 100, 100, 100],
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#8e8da4',
        },
        offsetX: 0,
        formatter: function (val: number | undefined) {
          return val !== undefined ? val.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }) : '';
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    xaxis: {
      categories: [],
      labels: {
        rotate: -15,
        rotateAlways: true,
        style: {
          fontWeight: 'bold',
          fontSize: '12px',
          colors: '#000 y y000',
        },
      },
    },
  
    title: {
      text: ' ',
      align: 'left',
      offsetX: 14,
    },
    tooltip: {
      shared: true,
      y: {
        formatter: function (val: number | undefined) {
          return val !== undefined ? val.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }) : '';
        },
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      offsetX: -10,
    },
  });
  
  // const [chartOptions2, setChartOptions2] = useState<any>({
  //   series: [
  //     {
  //       name: 'Valor',
  //       data: [],
  //     },
  //   ],
  //   chart: {
  //     type: 'area' as const,
  //     stacked: false,
  //     height: 350,
  //     zoom: {
  //       enabled: false,
  //     },
  //   },
  //   dataLabels: {
  //     enabled: false,
  //   },
  //   markers: {
  //     size: 0,
  //   },
  //   fill: {
  //     type: 'gradient',
  //     gradient: {
  //       shadeIntensity: 1,
  //       inverseColors: false,
  //       opacityFrom: 0.45,
  //       opacityTo: 0.05,
  //       stops: [20, 100, 100, 100],
  //     },
  //   },
  //   yaxis: {
  //     labels: {
  //       style: {
  //         colors: '#8e8da4',
  //       },
  //       offsetX: 0,
  //       formatter: function (val: number) {
  //         return val.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
  //       },
  //     },
  //     axisBorder: {
  //       show: false,
  //     },
  //     axisTicks: {
  //       show: false,
  //     },
  //   },
  //   xaxis: {
  //     categories: [],
  //     labels: {
  //       rotate: -15,
  //       rotateAlways: true,
  //       style: {
  //         fontWeight: 'bold',
  //         fontSize: '12px',
  //         colors: '#000 y y000',
  //       },
  //     },
  //   },
  
  //   title: {
  //     text: ' ',
  //     align: 'left',
  //     offsetX: 14,
  //   },
  //   tooltip: {
  //     shared: true,
  //     y: {
  //       formatter: function (val: number) {
  //         return val.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
  //       },
  //     },
  //   },
  //   legend: {
  //     position: 'top',
  //     horizontalAlign: 'right',
  //     offsetX: -10,
  //   },
  // });
   
  const [planes, setPlanes] = useState<Planes[]>([]);
  useEffect(() => {
    fetplames({ setPlanes });
  }, []);

  const columns = [
    { field: 'id_programa', headerName: 'Id proyecto', flex: 1 },
    { field: 'nombre_programa', headerName: 'Programa  ', flex: 1 },
    { field: 'nombre_proyecto', headerName: 'Proyecto  ', flex: 1 },
    { field: 'numero_proyecto', headerName: 'Número de proyecto  ', flex: 1 },
    {
      field: 'valor_meta',
      headerName: 'Valor meta      ',
      flex: 1,
      renderCell: (params: any) => {
        // Formatear el valor a pesos colombianos
        const valorFormateado = new Intl.NumberFormat('es-CO', {
          style: 'currency',
          currency: 'COP',
          minimumFractionDigits: 0, // Ajusta según la precisión deseada
        }).format(params.value);

        return <>{valorFormateado}</>;
      },
    },
  ];

  const [Historico, setHistorico] = useState<Historico[]>([]);
  const fetchHistorico = async (): Promise<void> => {
    try {
      const url = `/seguimiento-planes/tablero-control-poai-general/1/?id_plan=${formData.plan}&fecha_inicio=${formData.fecha_inicia}&fecha_fin=${formData.fecha_fin}`;
      const res = await api.get(url);
      const HistoricoData: Historico[] = res.data?.data || [];

      setHistorico(HistoricoData);
    } catch (error: any) {
      console.error(error);
      control_error(error.response.data.detail);
      setHistorico([]);
    }
  };

  const handleCerrar = () => {
    setabrir1(false);
    setChartOptions((prevOptions: any) => ({
      ...prevOptions,
      series: [{ data: [] }],
      xaxis: { categories: [] },
    }));
    setChartOptions2((prevOptions: any) => ({
      ...prevOptions,
      series: [{ data: [] }],
      xaxis: { categories: [] },
    }));
  };
  return (
    <>
      <Grid
        container
        item
        xs={12}
        spacing={2}
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          m: '10px 0 20px 0',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item xs={12} sm={12}>
          <Title title="Tableros de Control POAI " />
        </Grid>
      
        <Grid item xs={12} sm={12}>
          <FormControl fullWidth size="small">
            <InputLabel id="si-no-select-label"> Nombre del plan</InputLabel>
            <Select
              name="plan"
              // disabled
              label="Nombre de plan"
              value={formData.plan}
              onChange={handleInputSelect}
            >
              {planes.map((unidad: any) => (
                <MenuItem key={unidad.id_plan} value={unidad.id_plan}>
                  {unidad.nombre_plan}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

    

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="date"
            size="small"
            variant="outlined"
            label="Fecha de registro  "
            name="fecha_inicia"
            InputLabelProps={{ shrink: true }}
            value={formData.fecha_inicia}
            onChange={handleInputSelect}
          />
        </Grid>
        {/* {formData.inicio} */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="date"
            size="small"
            variant="outlined"
            label="Fecha fin "
            name="fecha_fin"
            InputLabelProps={{ shrink: true }}
            value={formData.fecha_fin}
            onChange={handleInputSelect}
          />
        </Grid>
        {/* {formData.fin} */}
        <Grid
          container
          spacing={2}
          marginTop={2}
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Grid item>
            <Button
              startIcon={<SearchOutlined />}
              variant="contained"
              fullWidth
              disabled={!formData.plan}
              onClick={() => {
                consultarSeguimiento(), fetchHistorico();
              }}
            >
              Buscar
            </Button>
          </Grid>
          <Grid item xs={12} sm={1}>
            <ButtonSalir />
          </Grid>
        </Grid>
      </Grid>

      {abrir1 && (
        <>
          <Grid
            container
            item
            xs={12}
            spacing={2}
            sx={{
              position: 'relative',
              background: '#FAFAFA',
              borderRadius: '15px',
              p: '20px',
              m: '10px 0 20px 0',
              mb: '20px',
              boxShadow: '0px 3px 6px #042F4A26',
            }}
          >
            <Grid
              item
              xs={1.2}
              spacing={2}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                background: '#FAFAFA',
                borderRadius: '15px',
                p: '20px',
                m: '10px 0 20px 0',
                mb: '20px',
                height: '100px',
                ml: '60px',
                boxShadow: '0px 6px 12px #042F4A40', // Aumentando la sombra
              }}
            >
              {/* <div style={{ marginRight: '20px' }}>EJES</div> */}
              <div style={{ marginRight: '-20px', fontWeight: 'bold' }}>
                EJES
              </div>
              <div style={{ marginRight: '-10px' }}>{ejesData?.ejes}</div>
            </Grid>

            <Grid
              item
              xs={1.2}
              spacing={2}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                background: '#FAFAFA',
                borderRadius: '15px',
                p: '20px',
                m: '10px 0 20px 0',
                mb: '20px',
                height: '100px',
                ml: '60px',
                boxShadow: '0px 6px 12px #042F4A40', // Aumentando la sombra
              }}
            >
              {/* <div style={{ marginRight: '20px' }}>PROGRAMAS</div> */}

              <div style={{ marginRight: '-20px', fontWeight: 'bold' }}>
                PROGRAMAS
              </div>
              <div style={{ marginRight: '-10px' }}>{ejesData?.programas}</div>
            </Grid>
            <Grid
              item
              xs={1.2}
              spacing={2}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                background: '#FAFAFA',
                borderRadius: '15px',
                p: '20px',
                m: '10px 0 20px 0',
                mb: '20px',
                height: '100px',
                ml: '60px',
                boxShadow: '0px 6px 12px #042F4A40', // Aumentando la sombra
              }}
            >
              <div style={{ marginRight: '-20px', fontWeight: 'bold' }}>
                PROYECTO
              </div>
              <div style={{ marginRight: '-10' }}>{ejesData?.proyectos}</div>
            </Grid>
            <Grid
              item
              xs={1.2}
              spacing={2}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                background: '#FAFAFA',
                borderRadius: '15px',
                p: '20px',
                m: '10px 0 20px 0',
                mb: '20px',
                height: '100px',
                ml: '60px',
                boxShadow: '0px 6px 12px #042F4A40', // Aumentando la sombra
              }}
            >
              <div style={{ marginRight: '-20px', fontWeight: 'bold' }}>
                PRODUCTOS
              </div>
              <div style={{ marginRight: '-10' }}>{ejesData?.productos}</div>
            </Grid>
            <Grid
              item
              xs={1.2}
              spacing={2}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                background: '#FAFAFA',
                borderRadius: '15px',
                p: '20px',
                m: '10px 0 20px 0',
                mb: '20px',
                height: '100px',
                ml: '60px',
                boxShadow: '0px 6px 12px #042F4A40', // Aumentando la sombra
              }}
            >
              <div style={{ marginRight: '-20px', fontWeight: 'bold' }}>
                ACTIVIDAD
              </div>
              <div style={{ marginRight: '-10' }}>{ejesData?.actividades}</div>
            </Grid>
            <Grid
              item
              xs={1.2}
              spacing={2}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                background: '#FAFAFA',
                borderRadius: '15px',
                p: '20px',
                m: '10px 0 20px 0',
                mb: '20px',
                height: '100px',
                ml: '60px',
                boxShadow: '0px 6px 12px #042F4A40', // Aumentando la sombra
              }}
            >
              <div style={{ marginRight: '-20px', fontWeight: 'bold' }}>
                INDICADOR
              </div>
              <div style={{ marginRight: '-10' }}>{ejesData?.indicadores}</div>
            </Grid>
            <Grid
              item
              xs={1.2}
              spacing={2}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                background: '#FAFAFA',
                borderRadius: '15px',
                p: '20px',
                m: '10px 0 20px 0',
                mb: '20px',
                height: '100px',
                ml: '60px',
                boxShadow: '0px 6px 12px #042F4A40', // Aumentando la sombra
              }}
            >
              <div style={{ marginRight: '-20px', fontWeight: 'bold' }}>
                META
              </div>
              <div style={{ marginRight: '-10px' }}>{ejesData?.metas}</div>
            </Grid>
          </Grid>

          <Grid
            container
            item
            xs={12}
            spacing={2}
            sx={{
              position: 'relative',
              background: '#FAFAFA',
              borderRadius: '15px',
              p: '20px',
              m: '10px 0 20px 0',
              mb: '20px',
              boxShadow: '0px 3px 6px #042F4A26',
            }}
          >
            <Grid item xs={12} sm={12}>
              <Title title="Resultado de búsqueda " />
            </Grid>
            <Grid container item xs={12} spacing={2}>
              <Grid
                item
                xs={12}
                sm={2.2}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  borderRadius: '15px',
                  p: '20px',
                  m: '10px 0 20px 0',
                  mb: '20px',
                  height: '100px',
                  ml: '60px',
                  // Aumentando la sombra
                }}
              >
                {' '}
              </Grid>
              <Grid
                item
                xs={1.3}
                spacing={2}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  background: 'linear-gradient(to right, #cce7ff, #49a2ff)',
                  borderRadius: '15px',
                  p: '20px',
                  m: '10px 0 20px 0',
                  mb: '20px',
                  height: '100px',
                  ml: '60px',
                  boxShadow: '0px 6px 12px #042F4A40', // Aumentando la sombra
                }}
              >
                <div style={{ marginRight: '-19px', fontWeight: 'bold' }}>
                  PRESUPUESTO POAI
                </div>
                <div style={{ marginRight: '-10px' }}>
                  {total?.total_presupuesto}
                </div>
              </Grid>

              <Grid
                item
                xs={1.3}
                spacing={2}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  background: 'linear-gradient(to right, #3afbd6, #4894ff)',
                  borderRadius: '15px',
                  p: '20px',
                  m: '10px 0 20px 0',
                  mb: '20px',
                  height: '100px',
                  ml: '60px',
                  boxShadow: '0px 6px 12px #042F4A40', // Aumentando la sombra
                }}
              >
                <div style={{ marginRight: '-19px', fontWeight: 'bold' }}>
                DISPONIBILIDAD POAI
                </div>
                <div style={{ marginRight: '-10px' }}>
                  {total?.total_disponible}
                </div>
              </Grid>

              <Grid
                item
                xs={1.3}
                spacing={2}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  background: 'linear-gradient(to right, #ffdc9a, #ff7c7c)',
                  borderRadius: '15px',
                  p: '20px',
                  m: '10px 0 20px 0',
                  mb: '20px',
                  height: '100px',
                  ml: '60px',
                  boxShadow: '0px 6px 12px #042F4A40', // Aumentando la sombra
                }}
              >
                <div style={{ marginRight: '-19px', fontWeight: 'bold' }}>
                  REGISTRO POAI
                </div>
                <div style={{ marginRight: '-10px' }}>
                  {total?.total_registro}
                </div>
              </Grid>

              <Grid
                item
                xs={1.3}
                spacing={2}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  background: 'linear-gradient(to right, #fba1ff, #6c63ff)',
                  borderRadius: '15px',
                  p: '20px',
                  m: '10px 0 20px 0',
                  mb: '20px',
                  height: '100px',
                  ml: '60px',
                  boxShadow: '0px 6px 12px #042F4A40', // Aumentando la sombra
                }}
              >
                <div style={{ marginRight: '-2', fontWeight: 'bold' }}>
                OBLIGACIONES POAI
                </div>
                <div style={{ marginRight: '-10px' }}>
                  {total?.total_obligado}
                </div>
              </Grid>
            </Grid>

            <Grid
              container
              item
              xs={6}
              spacing={2}
              sx={{
                position: 'relative',
                background: '#FAFAFA',
                borderRadius: '15px',
                p: '20px',
                m: '10px 0 20px 0',
                mb: '20px',
                boxShadow: '0px 3px 6px #042F4A26',
              }}
            >
              <Grid
                item
                xs={12}
                sm={12}
                sx={{
                  background: `url(${comaImage}) no-repeat center center, #FFFFFF`,
                }}
              >
                <ReactApexChart
                  options={chartOptions}
                  series={chartOptions.series}
                  type="bar"
                  height={350}
                />
              </Grid>
            </Grid>

            <Grid
              container
              item
              xs={5.5}
              spacing={2}
              sx={{
                p: '20px',
                mb: '20px',
                spacing: '2px',
                m: '10px 0 20px 0',
                borderRadius: '15px',
                position: 'relative',
                background: '#FAFAFA',
                boxShadow: '0px 3px 6px #042F4A26',
                ml: '20px',
              }}
            >
              {' '}
              <Grid
                item
                xs={12}
                sm={12}
                sx={{
                  background: `url(${comaImage}) no-repeat center center, #FFFFFF`,
                }}
              >
                <div id="chart2">
                  <ReactApexChart
                    options={chartOptions2}
                    series={chartOptions2.series}
                    type="area"
                    height={350}
                  />
                </div>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            container
            item
            xs={12}
            spacing={2}
            sx={{
              position: 'relative',
              background: '#FAFAFA',
              borderRadius: '15px',
              p: '20px',
              m: '10px 0 20px 0',
              mb: '20px',
              boxShadow: '0px 3px 6px #042F4A26',
            }}
          >
            <RenderDataGrid
              title="Resultados Plan Operativo Anual de Inversión - POAI"
              columns={columns ?? []}
              rows={Historico ?? []}
            />
            <Grid
              container
              spacing={2}
              marginTop={2}
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              <Grid item>
                <Button
                  color="error"
                  variant="outlined"
                  fullWidth
                  startIcon={<ClearIcon />}
                  onClick={() => handleCerrar()}
                >
                  cerrar
                </Button>
              </Grid>
              <Grid item>
                <Button
                  startIcon={<SearchOutlined />}
                  variant="contained"
                  fullWidth
                  onClick={() => {
                    consultarSeguimiento(), fetchHistorico();
                  }}
                >
                  Buscar
                </Button>
              </Grid>
              <Grid item xs={12} sm={1}>
                <ButtonSalir />
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};
