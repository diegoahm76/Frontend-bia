import { Button, Grid } from '@mui/material';
import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';


// eslint-disable-next-line @typescript-eslint/naming-convention
export const LineChart = (data: any) => {
  const percents = [
    "Porcentaje A. FIS",
    "Porcentaje A. FIS AC",
    "Porcentaje A. FIN",
    "Porcentaje A. REC OBL"
  ]

  const [selected_percent, set_selected_percent] = useState(percents[0]);

  const [result, set_result] = useState<any>({});

  useEffect(() => {
    console.log(data)
    if(data.data.length && data.data[0]?.nombre_objetivo){
      handle_data(data.data);
    }
  }, [data]);

  useEffect(() => {
    if(result){
      generate_series(selected_percent);
    }
  }, [result, selected_percent])

  const handle_data = (data: any) => {
    let nombres: any = {
      "pvance_fisico": "Porcentaje A. FIS",
      "pavance_fisico_acomulado": "Porcentaje A. FIS AC",
      "pavance_financiero": "Porcentaje A. FIN",
      "pavance_recursos_obligados": "Porcentaje A. REC OBL"
    };

    let result: any = {};

    for (let nombre in nombres) {
      result[nombres[nombre]] = {};
    }

    data.forEach((objetivo: any) => {
      let nombre_objetivo = objetivo.nombre_objetivo;
      for (let nombre in nombres) {
        result[nombres[nombre]][nombre_objetivo] = objetivo.años.map((año: any) => año[nombre]);
      }
    });

    set_result(result);
    console.log(result)
  };

  const generate_series = (percent: string) => {
    let series = [];
    for (let obj in result[percent]) {
      series.push({
        name: obj,
        data: result[percent][obj]
      });
    }

    set_chart_data({
      ...chart_data,
      series,
      options: {
        ...chart_data.options,
        xaxis: {
          ...chart_data.options.xaxis,
        }
      }
    });
  };

  const [chart_data, set_chart_data] = useState<{
    series: ApexAxisChartSeries | ApexNonAxisChartSeries;
    options: ApexOptions;
  }>({
    options: {
      chart: {
        type: 'line',
        toolbar: {
          show: true
        }
      },
      colors: ['#47B9F6', '#45F7BC', '#91F647', '#C447F6', '#F6A447', '#F64747', '#47F6A4', '#4747F6'],
      stroke: {
        curve: 'smooth'
      },
      markers: {
        size: 6,
      },
      theme: {
        mode: 'light',
      },
      legend: {
        position: 'top',
        fontSize: '14px',
      },
      dataLabels: {
        formatter: function(val: any) {
          return val.toFixed(2) + '%';
        }
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return val.toFixed(2) + '%';
          }
        }
      },
      xaxis:{
        categories: ['Año 1', 'Año 2', 'Año 3', 'Año 4'],
      },
      yaxis: {
        labels: {
          formatter: function(value) {
            return value.toFixed(2) + '%';
          }
        }
      },
    },
    series: [],
  });

  return (
    <>
      <ReactApexChart options={chart_data.options} series={chart_data.series} type="line" height={500} />
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
