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
  reporte: any;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const AnaliticaChart: React.FC<IProps> = (props: IProps) => {
  const [valores, set_valores] = useState<any>([]);
  const [titulo, set_titulo] = useState<string>("");
  // useEffect(() => {
  //   if (props.axis.length > 0)
  //     json_data_result();
  // }, [props.axis]);
  useEffect(() => {
      json_data_result();
  }, []);


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
    set_titulo(props.reporte.nombre_bien);
    const points_data_return: any = [];
    props.reporte.cantidades_tiempo.forEach((data: any) => {
      const points_data: any = [];
      props.axis.forEach(() => { points_data.push(0); });
      data.fechas.forEach((data_tiempo: any) => {
        const fecha_reporte = data_tiempo.fecha_baja !== undefined ? data_tiempo.fecha_baja : data_tiempo.fecha_cuarentena_date !== undefined ? data_tiempo.fecha_cuarentena_date : data_tiempo.fecha_solicitud !== undefined ? data_tiempo.fecha_solicitud : data_tiempo.fecha_despachos !== undefined ? data_tiempo.fecha_despachos : undefined;
        let index_point = -1;
        // dias
        if (props.tipo_axis === 'dias') {
          const point = dayjs(fecha_reporte).format('DD/MMM/YYYY');
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
            return dayjs(fecha_reporte).isBetween(dayjs(rango_desde), dayjs(rango_hasta), 'day', '[]');
          });
          if (index_point !== -1)
            points_data[index_point] = points_data[index_point] + data_tiempo.cantidad;
        }
        // mes_año
        if (props.tipo_axis === 'mes_año') {
          index_point = props.axis.findIndex((pa: any) => {
            const rango = pa.split('-');
            const mes = meses.find((m: any) => m.name === rango[0])?.month ?? 0;
            const año = Number(rango[1]);
            return dayjs(fecha_reporte).isBetween(dayjs().month(mes).year(año).startOf('month'), dayjs().month(mes).year(año).endOf('month'), 'day', '[]');
          });
          if (index_point !== -1)
            points_data[index_point] = points_data[index_point] + data_tiempo.cantidad;
        }
        // año
        if (props.tipo_axis === 'año') {
          index_point = props.axis.findIndex((pa: any) => {
            const año = Number(pa);
            return dayjs(fecha_reporte).isBetween(dayjs().month(0).year(año).startOf('month'), dayjs().month(11).year(año).endOf('month'), 'day', '[]');
          });
          if (index_point !== -1)
            points_data[index_point] = points_data[index_point] + data_tiempo.cantidad;
        }
      });
      points_data_return.push({ name: data.nombre_vivero, data: points_data });
    });
    set_valores(points_data_return);
  }

  return (
    <>
      <ReactApexChart options={chart_data ?? null} series={chart_data?.series} type='line' height={chart_data?.chart?.height} />
    </>
  );
}