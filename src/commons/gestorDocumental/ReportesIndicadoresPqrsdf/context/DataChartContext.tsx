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

const ChartDataContextPQRSDF = createContext<any | undefined>(undefined);

const ChartDataProviderPQRSDF = ({ children }: any) => {
  const [chartDataViewOne, setChartDataViewOne] = useState({
    series: [
      {
        name: 'RADICADOS',
        data: [1780],
        total: 750,
      },
      {
        name: 'EN TRÁMITE',
        data: [2605],
        total: 196,
      },
      {
        name: 'RESUELTOS',
        data: [1260],
        total: 425,
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
        categories: ['TOTAL'],
      },
      yaxis: {
        title: {
          text: 'Cantidad de PQRSDF',
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
        name: 'RADICADOS',
        data: [13, 23, 20, 8],
      },
      {
        name: 'EN TRÁMITE',
        data: [21, 7, 25, 13],
      },
      {
        name: 'RESUELTOS',
        data: [44, 55, 41, 67],
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 500,
        stacked: true,
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
        name: 'RADICADOS',
        data: [44, 55, 41, 37, 22, 43, 21],
      },
      {
        name: 'EN TRÁMITE',
        data: [53, 32, 33, 52, 13, 43, 32],
      },
      {
        name: 'RESULTADOS',
        data: [12, 17, 11, 9, 15, 11, 20],
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
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
        text: 'Fiction Books Sales',
      },
      xaxis: {
        categories: ['RENTAS', 'ACCIONES JURÍDICAS', 'CONTRATACIÓN', 'GESTIÓN DOCUMENTAL', 'PQRSDF', 'SISTEMAS', 'TIC'],
        labels: {
          formatter: function (val: any) {
            return val + 'K';
          },
        },
      },
      yaxis: {
        title: {
          text: undefined,
        },
      },
      tooltip: {
        y: {
          formatter: function (val: any) {
            return val + 'K';
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

  /* const [chartDataViewOne, setChartDataViewOne] = useState({
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
  });*/


  const [isReporteReady, setIsReportReady] = useState(false);

  return (
    <ChartDataContextPQRSDF.Provider
      value={{
        chartDataViewOne,
        setChartDataViewOne,
        chartDataViewTwo,
        setChartDataViewTwo,
        chartDataViewThree,
        setChartDataViewThree,
        isReporteReady,
        setIsReportReady,
      }}
    >
      {children}
    </ChartDataContextPQRSDF.Provider>
  );
};

export { ChartDataContextPQRSDF, ChartDataProviderPQRSDF };
