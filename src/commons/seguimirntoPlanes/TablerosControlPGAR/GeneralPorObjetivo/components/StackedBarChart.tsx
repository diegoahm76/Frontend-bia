import { Button, Grid } from '@mui/material';
import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const StackedBarChart = (data: any) => {
  const percents = [
    "Porcentaje A. FIS",
    "Porcentaje A. FIS AC",
    "Porcentaje A. FIN",
    "Porcentaje A. REC OBL"
  ]

  const [selected_percent, set_selected_percent] = useState(percents[0]);
  const [resultado, set_resultado] = useState<any>({});
  const [categories, set_categories] = useState<any>([]);

  useEffect(() => {
    if(data.data.length){
      handle_data(data.data);
    }
  }, [data]);

  useEffect(() => {
    if(resultado){
      generate_series(selected_percent);
    }
  }, [resultado, categories, selected_percent])

  const handle_data = (data: any) => {
    let resultado: any = {};
    let categories: any = [];
    let nombres: any = {
      "pvance_fisico": "Porcentaje A. FIS",
      "pavance_fisico_acomulado": "Porcentaje A. FIS AC",
      "pavance_financiero": "Porcentaje A. FIN",
      "pavance_recursos_obligados": "Porcentaje A. REC OBL"
    };
    data.forEach((eje: any) => {
      const words = eje.nombre.split(' ');
      const grouped_words = [];

      for (let i = 0; i < words.length; i += 2) {
        grouped_words.push(words.slice(i, i + 2).join(' '));
      }

      categories.push(grouped_words);
      if(eje.porcentajes.length){
        eje.porcentajes.forEach((porcentaje: any) => {
          let avances = Object.keys(nombres);
          avances.forEach(avance => {
            let nombre_avance = nombres[avance];
            let año = 'Año ' + porcentaje.año;
            if (!resultado[nombre_avance]) {
              resultado[nombre_avance] = {};
            }
            if (!resultado[nombre_avance][año]) {
              resultado[nombre_avance][año] = [];
            }
            resultado[nombre_avance][año].push(porcentaje[avance]);
          });
        });
      }
    });
    console.log(resultado)
    set_resultado(resultado);
    set_categories(categories);
  };

  const generate_series = (percent: string) => {
    let series = [];
    for (let año in resultado[percent]) {
      series.push({
        name: año,
        data: resultado[percent][año]
      });
    }

    set_chart_data({
      ...chart_data,
      series,
      options: {
        ...chart_data.options,
        xaxis: {
          ...chart_data.options.xaxis,
          categories
        },
      }
    });
  };

  const [chart_data, set_chart_data] = useState<{
    series: ApexAxisChartSeries | ApexNonAxisChartSeries;
    options: ApexOptions;
  }>({
    options: {
      chart: {
        type: 'bar',
        stacked: true,
        toolbar: {
          show: true
        }
      },
      colors: ['#47B9F6', '#45F7BC', '#91F647', '#C447F6'],
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function(val) {
          return val + '%';
        }
      },
      theme: {
        mode: 'light',
      },
      xaxis:{
        categories: [],
      },
      legend: {
        position: 'top',
        fontSize: '16px',
      },
      yaxis: {
        labels: {
          formatter: function(value) {
            return value + '%';
          }
        }
      }
    },
    series: []
  });

  return (
    <>
      <ReactApexChart options={chart_data.options} series={chart_data.series} type="bar" height={500} />
      <Grid container spacing={3}>
        {percents.map((percent, index) => (
          <Grid item xs={5} mx={'auto'} key={index}>
            <Button
              sx={{marginLeft: '3rem'}}
              onClick={() => set_selected_percent(percent)}
              variant="contained"
              color={selected_percent === percent ? "primary" : "secondary"}
            >
              {percent}
            </Button>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
