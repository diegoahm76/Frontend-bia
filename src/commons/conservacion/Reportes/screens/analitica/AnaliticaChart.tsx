/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { type ApexOptions } from "apexcharts";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);
const meses = [{ name: 'Ene', month: 0 }, { name: 'Feb', month: 1 }, { name: 'Mar', month: 2 }, { name: 'Abr', month: 3 }, { name: 'May', month: 4 }, { name: 'Jun', month: 5 }, { name: 'Jul', month: 6 }, { name: 'Aug', month: 7 }, { name: 'Sep', month: 8 }, { name: 'Oct', month: 9 }, { name: 'Nov', month: 10 }, { name: 'Dic', month: 12 }];
interface IProps {
  axis: any[];
  tipo_axis: string;
  resumen: any;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const AnaliticaChart: React.FC<IProps> = (props: IProps) => {
  const [valores, set_valores] = useState<any>([]);
  const [titulo, set_titulo] = useState<string>("");
  useEffect(() => {
    if (props.axis.length > 0)
      json_data_result();
  }, [props.axis]);


  const chart_data: ApexOptions = {
    chart: {
      height: 400,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          position: 'top',
        },
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    title: {
      text: titulo,
      align: 'center'
    },
    markers: {
      size: 5
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
    xaxis: {
      categories: props.axis,
      title: {
        text: 'Tiempo'
      }
    },
    yaxis: {
      title: {
        text: 'Cantidad'
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'center',
      floating: true,
      offsetY: -15,
      offsetX: -5
    },
    series: valores
  }

  const json_data_result: () => void = () => {
    const test =
    {
      "id_bien": 309,
      "nombre_bien": "planta test",
      "cantidades_tiempo": [
        {
          "id_vivero": 96,
          "nombre_vivero": "Vivero Guejar",
          "fechas": [
            {
              "fecha_baja": "2023-08-01",
              "cantidad": 5
            },
            {
              "fecha_baja": "2023-08-07",
              "cantidad": 10
            },
            {
              "fecha_baja": "2023-08-09",
              "cantidad": 25
            },
            {
              "fecha_baja": "2023-09-13",
              "cantidad": 35
            },
            {
              "fecha_baja": "2023-09-17",
              "cantidad": 25
            },
            {
              "fecha_baja": "2023-09-25",
              "cantidad": 35
            },
          ]
        },
        {
          "id_vivero": 97,
          "nombre_vivero": "Vivero Guejar 2",
          "fechas": [
            {
              "fecha_baja": "2023-08-08",
              "cantidad": 15
            },
            {
              "fecha_baja": "2023-08-09",
              "cantidad": 12
            },
            {
              "fecha_baja": "2023-08-12",
              "cantidad": 20
            },
            {
              "fecha_baja": "2023-08-13",
              "cantidad": 45
            },
          ]
        },
        {
          "id_vivero": 98,
          "nombre_vivero": "Vivero Guejar 3",
          "fechas": [
            {
              "fecha_baja": "2023-08-01",
              "cantidad": 0
            },
            {
              "fecha_baja": "2023-08-02",
              "cantidad": 10
            },
            {
              "fecha_baja": "2023-08-03",
              "cantidad": 20
            },
            {
              "fecha_baja": "2023-08-04",
              "cantidad": 35
            },
            {
              "fecha_baja": "2023-08-05",
              "cantidad": 50
            },
            {
              "fecha_baja": "2023-08-06",
              "cantidad": 70
            },
          ]
        }
      ]
    };
    set_titulo(test.nombre_bien);
    const points_data_return: any = [];
    test.cantidades_tiempo.forEach((data: any) => {
      const points_data: any = [];
      props.axis.forEach(() => { points_data.push(0); });
      data.fechas.forEach((data_tiempo: any) => {
        let index_point = -1;
        // dias
        if (props.tipo_axis === 'dias') {
          const point = dayjs(data_tiempo.fecha_baja).format('DD/MMM/YYYY');
          index_point = props.axis.findIndex((pa: any) => pa === point);
          if (index_point !== -1)
            points_data[index_point] = data_tiempo.cantidad;
        }
        // rango_dias
        if (props.tipo_axis === 'rango_dias') {
          index_point = props.axis.findIndex((pa: any) => {
            const rango = pa.split('-');
            const rango_desde = rango[0].replace(' ', '');
            const rango_hasta = rango[1].replace(' ', '');
            return dayjs(data_tiempo.fecha_baja).isBetween(dayjs(rango_desde), dayjs(rango_hasta), 'day', '[]');
          });
          if (index_point !== -1)
            points_data[index_point] = points_data[index_point] + data_tiempo.cantidad;
          console.log('index_2: ', index_point, ' rango: ', props.axis[index_point], ' fecha_validacion: ', data_tiempo.fecha_baja);
        }
        // mes_año
        if (props.tipo_axis === 'mes_año') {
          index_point = props.axis.findIndex((pa: any) => {
            const rango = pa.split('-');
            const mes = meses.find((m: any) => m.name === rango[0])?.month ?? 0;
            const año = Number(rango[1]);
            return dayjs(data_tiempo.fecha_baja).isBetween(dayjs().month(mes).year(año).startOf('month'), dayjs().month(mes).year(año).endOf('month'), 'day', '[]');
          });
          if (index_point !== -1)
            points_data[index_point] = points_data[index_point] + data_tiempo.cantidad;
        }
        // año
        if (props.tipo_axis === 'año') {
          index_point = props.axis.findIndex((pa: any) => {
            const año = Number(pa);
            return dayjs(data_tiempo.fecha_baja).isBetween(dayjs().month(0).year(año).startOf('month'), dayjs().month(11).year(año).endOf('month'), 'day', '[]');
          });
          if (index_point !== -1)
            points_data[index_point] = points_data[index_point] + data_tiempo.cantidad;
        }
      });
      points_data_return.push({ name: data.nombre_vivero, data: points_data });
    });
    console.log(JSON.stringify(points_data_return));
    set_valores(points_data_return);
  }

  return (
    <>
      <ReactApexChart options={chart_data ?? null} series={chart_data?.series} type='line' height={chart_data?.chart?.height} />
    </>
  );
}