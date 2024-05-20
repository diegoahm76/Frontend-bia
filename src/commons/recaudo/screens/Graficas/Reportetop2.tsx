/* eslint-disable @typescript-eslint/naming-convention */
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import { Title } from '../../../../components/Title';
import SearchIcon from '@mui/icons-material/Search';
import { Grid, TextField, Button } from '@mui/material';
import { api } from '../../../../api/axios';

export interface FormData {
  edad: any,
  fecha_hasta: any;
  fecha_desde: any;
  deuda: any;
  top: any;
};



export const Reportetop2: React.FC = () => {

  const [chartData, setChartData] = useState<{
    series: ApexAxisChartSeries | ApexNonAxisChartSeries,
    options: ApexOptions
  }>({
    series: [],
    options: {
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        }
      },
      responsive: [{
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0
          }
        }
      }],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 10,
          dataLabels: {
            position: 'top',
          }
        },
      },
      xaxis: {
        categories: [],
      },
      legend: {
        position: 'right',
        offsetY: 40
      },
      fill: {
        opacity: 1
      }
    },
  });

  const initialFormData: FormData = {
    fecha_desde: '',
    fecha_hasta: '',
    edad: '',
    deuda: '',
    top: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const carteraDeudaTop = async (): Promise<void> => {
    try {
      const url = `/recaudo/reportes/reporte-general-cartera-deuda-y-edad-top/`;
      const res = await api.get(url);
      const data_consulta = res.data.detalles_por_codigo_contable;
      console.log("data_consulta", data_consulta);

      const categorias = Object.keys(data_consulta);
      const seriesData = [
        {
          name: '0 A 180',
          data: categorias.map(categoria => data_consulta[categoria]["RANGO DE 0 - 180"] || 0),
        },
        {
          name: '181 A 360',
          data: categorias.map(categoria => data_consulta[categoria]["RANGO DE 181 - 360"] || 0),
        },
        {
          name: 'MAS DE 360',
          data: categorias.map(categoria => data_consulta[categoria]["RANGO DE 361 - EN ADELANTE"] || 0),
        }
      ];

      setChartData({
        series: seriesData,
        options: {
          ...chartData.options,
          xaxis: {
            categories: categorias,
          },
        },
      });

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    carteraDeudaTop();
  }, []);

  return (
    <>
      <Grid container
        item xs={12} marginLeft={2} marginRight={2} spacing={2} marginTop={3}
        sx={{
          position: 'relative',
          borderRadius: '15px',
          background: '#FAFAFA',
          boxShadow: '0px 3px 6px #042F4A26',
          p: '20px', m: '10px 0 20px 0', mb: '20px',
        }}
      >
        <Grid item xs={12} sm={12}>
          <Title title="Reporte General de Cartera Por Deuda y Edad –Top 2" />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="Fecha desde  "
            type="date"
            size="small"
            name="fecha_desde"
            variant="outlined"
            value={formData.fecha_desde}
            InputLabelProps={{ shrink: true }}
            onChange={(e) => {
              handleInputChange(e);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label=" Fecha hasta  "
            type="date"
            size="small"
            name="fecha_hasta"
            variant="outlined"
            value={formData.fecha_hasta}
            InputLabelProps={{ shrink: true }}
            onChange={(e) => {
              handleInputChange(e);
            }}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            label="Concepto edad"
            name="edad"
            disabled
            variant="outlined"
            size="small"
            fullWidth
            onChange={handleInputChange}
            value={'TODOS'}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Concepto deuda"
            name="deuda"
            disabled
            variant="outlined"
            size="small"
            fullWidth
            onChange={handleInputChange}
            value={'TODOS'}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Concepto "
            name="top"
            disabled
            variant="outlined"
            size="small"
            fullWidth
            onChange={handleInputChange}
            value={'Top 5'}
          />
        </Grid>
        <Grid item>
          <Button
            color="primary"
            variant="contained"
            startIcon={<SearchIcon />}
            onClick={() => {
              // Add functionality for the search button if needed
            }}
          >
            Buscar
          </Button>
        </Grid>
        <Grid item xs={12} sm={12} sx={{
          background: `url('https://api.gbif.org/v1/image/unsafe/https%3A%2F%2Fraw.githubusercontent.com%2FSIB-Colombia%2Flogos%2Fmain%2Fsocio-SiB-cormacarena.png') no-repeat center center, #FFFFFF `,
        }}  >
          <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} />
        </Grid>
      </Grid>
    </>
  );
};