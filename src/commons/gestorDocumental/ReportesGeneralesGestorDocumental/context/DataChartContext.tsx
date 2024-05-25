/* eslint-disable @typescript-eslint/naming-convention */
import React, { createContext, useState } from 'react';

// Define el tipo de tu estado aquí
/*interface State {
  data: string;
}*/

// Define el tipo de tu contexto aquí
/*interface ContextType {
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
}
*/
// Crea el contexto con un estado inicial
const initialState: any = {
  data: '',
};

const ChartDataContext = createContext<any | undefined>(undefined);

const ChartDataProvider = ({ children }: any) => {
  const [chartDataViewOne, setChartDataViewOne] = useState({
    series: [
      {
        name: 'CREADOS',
        data: [44, 95],
        total: 139,
      },
      {
        name: 'ABIERTOS',
        data: [76, 120],
        total: 196,
      },
      {
        name: 'CERRADOS',
        data: [55, 370],
        total: 425,
      },
      {
        name: 'REAPERTURADOS',
        data: [320, 90],
        total: 410,
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 500,
        stacked: false,
        zoom: {
          enabled: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '80%',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: ['Simples', 'Complejos'],
        labels: {
          formatter: function (val: any) {
            return val;
          },
        },
      },
      yaxis: {
        title: {
          text: 'Cantidad de carpetas / expedientes',
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val: any) {
            return val + ' expedientes';
          },
        },
      },
    },
  });

  const [chartDataViewTwo, setChartDataViewTwo] = useState({
    series: [
      {
        name: 'CREADOS',
        data: [13, 23, 20, 8],
        total: 64,
      },
      {
        name: 'ABIERTOS',
        data: [21, 7, 25, 13],
        total: 66,
      },
      {
        name: 'CERRADOS',
        data: [44, 55, 41, 67],
        total: 207,
      },
      {
        name: 'REAPERTURADOS',
        data: [11, 17, 15, 15],
        total: 58,
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 500,
        stacked: true,
        /*toolbar: {
          show: true,
        },*/
        zoom: {
          enabled: false,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 10,
          dataLabels: {
            total: {
              enabled: true,
              style: {
                fontSize: '13px',
                fontWeight: 900,
                marginBotton: '5rem',
              },
            },
          },
        },
      },
      xaxis: {
        type: 'text',
        categories: [
          'SEDE VILLAVICENCIO',
          'SEDE RÍO ARIARI',
          'SEDE MACARENA',
          'SEDE RÍO META',
        ],
        labels: {
          formatter: function (val: any) {
            return val;
          },
        },
      },
      legend: {
        position: 'right',
        offsetY: 40,
      },
      fill: {
        opacity: 1,
      },
    },
  });

  const [chartDataViewThree, setChartDataViewThree] = useState({
    series: [
      {
        name: 'CREADOS',
        data: [13, 23, 20, 8, 13, 27, 0],
      },
      {
        name: 'ABIERTOS',
        data: [21, 7, 25, 13, 22, 8, 0],
      },
      {
        name: 'CERRADOS',
        data: [44, 55, 41, 67, 22, 43, 0],
      },
      {
        name: 'REAPERTURADOS',
        data: [11, 17, 15, 15, 21, 14, 8],
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 500,
        stacked: true,
        /*toolbar: {
          show: true,
        },*/
        zoom: {
          enabled: false,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 10,
          dataLabels: {
            total: {
              enabled: true,
              style: {
                fontSize: '13px',
                fontWeight: 900,
                marginBotton: '5rem',
              },
            },
          },
        },
      },
      xaxis: {
        type: 'text',
        categories: [
          'Suelos',
          'Agua',
          'Bióticos',
          'Aire Urbano',
          'Minería',
          'Hidrocarburos',
        ],
        labels: {
          formatter: function (val: any) {
            return val;
          },
        },
      },
      legend: {
        position: 'right',
        offsetY: 40,
      },
      fill: {
        opacity: 1,
      },
    },
  });

  const [chartDataViewFour, setChartDataViewFour] = useState({
    series: [
      {
        name: 'CREADOS',
        data: [14],
      },
      {
        name: 'ABIERTOS',
        data: [76],
      },
      {
        name: 'CERRADOS',
        data: [55],
      },
      {
        name: 'REAPERTURADOS',
        data: [35],
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 500,
        stacked: false,
        zoom: {
          enabled: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '80%',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: ['Grupo aguas'],
        labels: {
          formatter: function (val: any) {
            return val;
          },
        },
      },
      yaxis: {
        title: {
          text: 'Cantidad de carpetas / expedientes',
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val: any) {
            return val + ' expedientes';
          },
        },
      },
    },
  });

  const [isReporteReady, setIsReportReady] = useState(false)

  return (
    <ChartDataContext.Provider
      value={{
        chartDataViewOne,
        setChartDataViewOne,
        chartDataViewTwo,
        setChartDataViewTwo,
        chartDataViewThree,
        setChartDataViewThree,
        chartDataViewFour,
        setChartDataViewFour,
        isReporteReady,
        setIsReportReady
      }}
    >
      {children}
    </ChartDataContext.Provider>
  );
};

export { ChartDataContext, ChartDataProvider };
