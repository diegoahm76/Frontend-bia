/* eslint-disable @typescript-eslint/naming-convention */
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { Title } from '../../../../components/Title';
import { Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { api } from '../../../../api/axios';
import ClearIcon from '@mui/icons-material/Clear';

export const  ReporteGeneralCarteraDeudayEdad: React.FC = () => {



  const initialFormData = {
    fecha_facturacion_desde: '',
    fecha_facturacion_hasta: '',
    codigo_contable: ''
  };

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [choiseConcepto, setChoiseConcepto] = useState([]);




  const [chartData, setChartData] = useState<{
    series: ApexAxisChartSeries | ApexNonAxisChartSeries;
    options: ApexOptions;
  }>({
    series: [],
    options: {
      chart: {
        type: 'bar' as const,
        height: 1500,
        stacked: true,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            total: {
              enabled: true,
              offsetX: 0,
              style: {
                fontSize: '13px',
                fontWeight: 900,
              },
            },
          },
        },
      },
      stroke: {
        width: 1,
        colors: ['#fff'],
      },
      title: {
        text: 'Reporte General de Cartera Por Deuda y Edad',
      },
      xaxis: {
        labels: {
          formatter: function (val: string) {
            return val + "K";
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            fontSize: '9px',
          },
        },
      },
      tooltip: {
        y: {
          formatter: function (val: any) {
            return val + "K";
          },
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetX: 40,
      },
    },
  });


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };




  const fetchData = async () => {
    try {
      const url = `/recaudo/reportes/reporte-general-cartera-deuda-y-edad/`;
      const res = await api.get(url, { params: formData });
      const data = res.data.detalles_por_codigo_contable;

      const categories: string[] = [];
      const seriesData: { name: string, data: number[] }[] = [];

      // Obtener todos los nombres de categoría únicos
      const uniqueCategories: string[] = Object.keys(data).reduce((acc: string[], categoria: string) => {
        const item = data[categoria];
        Object.keys(item).forEach((key: string) => {
          if (key !== 'codigo_contable' && !acc.includes(key)) {
            acc.push(key);
          }
        });
        return acc;
      }, []);

      // Iterar sobre cada categoría única
      uniqueCategories.forEach((key: string) => {
        // Para cada categoría, obtener los valores correspondientes de todos los elementos
        const values: number[] = [];
        Object.keys(data).forEach((categoria: string) => {
          const item = data[categoria];
          if (key in item) {
            values.push(item[key]);
          } else {
            values.push(0);
          }
        });
        seriesData.push({ name: key, data: values });
      });

      // Obtener los nombres de las categorías
      const categoryNames = Object.keys(data).map((categoria: string) => categoria);

      setChartData({
        series: seriesData,
        options: {
          ...chartData.options,
          xaxis: {
            categories: categoryNames,
          },
        },
      });
    } catch (error) {
      console.error(error);
    }
  };



  const fetchChoiseConcepto = async (): Promise<void> => {
    setLoading(true);
    try {
      const url = `/recaudo/reportes/reporte-concepto-contable/`;
      const res = await api.get(url);
      setChoiseConcepto(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };




  useEffect(() => {
    fetchChoiseConcepto();
    fetchData();
  }, []);

  return (
    <>
      <Grid container item xs={12} marginLeft={2} marginRight={2} spacing={2} marginTop={3}
        sx={{
          position: 'relative',
          borderRadius: '15px',
          background: '#FAFAFA',
          boxShadow: '0px 3px 6px #042F4A26',
          p: '20px', m: '10px 0 20px 0', mb: '20px',
        }}>
        <Grid item xs={12} sm={12}>
          <Title title="Reporte General de Cartera Por Deuda y Edad" />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="Fecha Desde"
            type="date"
            size="small"
            name="fecha_facturacion_desde"
            variant="outlined"
            value={formData.fecha_facturacion_desde}
            InputLabelProps={{ shrink: true }}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="Fecha hasta"
            type="date"
            size="small"
            name="fecha_facturacion_hasta"
            variant="outlined"
            value={formData.fecha_facturacion_hasta}
            InputLabelProps={{ shrink: true }}
            onChange={handleInputChange}
          />
        </Grid>


        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel id="choise-label">Concepto</InputLabel>
            <Select
              id="demo-simple-select-2"
              size="small"
              name="codigo_contable"
              style={{ width: "95%" }}
              label="Concepto"
              value={formData.codigo_contable || ""}
              onChange={(e: any) => handleInputChange(e)}
            >
              {choiseConcepto.map((item: any, index: number) => (
                <MenuItem key={index} value={item.id}>
                  {item.descripcion}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>





        <Grid item>
          <Button color="primary" variant="contained" startIcon={<SearchIcon />} onClick={fetchData}>
            Buscar
          </Button>
        </Grid>

        <Grid item xs={2} sm={2}>
          <Button
            color="primary"
            variant="outlined"
            startIcon={<ClearIcon />}
            onClick={() => { setFormData(initialFormData) }}
            disabled={loading}
          >
            Limpiar
          </Button>
        </Grid>


        <Grid item xs={12} sm={12} sx={{ background: `url('https://api.gbif.org/v1/image/unsafe/https%3A%2F%2Fraw.githubusercontent.com%2FSIB-Colombia%2Flogos%2Fmain%2Fsocio-SiB-cormacarena.png') no-repeat center center, #FFFFFF ` }}>
          <div id="chart">
            <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={1500} />
          </div>
        </Grid>
      </Grid>
    </>
  );
};


