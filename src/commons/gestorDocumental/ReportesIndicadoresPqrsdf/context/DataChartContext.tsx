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
        name: 'RESUELTOS',
        data: [1260],
        total: 425,
      },
      {
        name: 'EN TRÁMITE',
        data: [2605],
        total: 196,
      },
      {
        name: 'VENCIDOS',
        data: [820],
        total: 458,
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
        labels: {
          formatter: function (val: any) {
            return val;
          },
        },
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
            return val + ' pqrsdf';
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
        name: 'RESUELTOS',
        data: [44, 55, 41, 67],
      },
      {
        name: 'EN TRÁMITE',
        data: [21, 7, 25, 13],
      },
      {
        name: 'VENCIDOS',
        data: [10, 15, 11, 9],
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
        data: [
          44,
          55,
          41,
          37,
          22,
          43,
          21,
          ...new Array(20)
            .fill(null)
            .map(() => Math.floor(Math.random() * 100)),
        ],
      },
      {
        name: 'RESULTADOS',
        data: [
          12,
          17,
          11,
          9,
          15,
          11,
          20,
          ...new Array(20)
            .fill(null)
            .map(() => Math.floor(Math.random() * 100)),
        ],
      },
      {
        name: 'EN TRÁMITE',
        data: [
          53,
          32,
          33,
          52,
          13,
          43,
          32,
          ...new Array(20)
            .fill(null)
            .map(() => Math.floor(Math.random() * 100)),
        ],
      },
      {
        name: 'VENCIDOS',
        data: [
          12,
          17,
          11,
          9,
          15,
          11,
          20,
          ...new Array(20)
            .fill(null)
            .map(() => Math.floor(Math.random() * 100)),
        ],
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
        text: 'Número de PQRSDF por grupo',
      },
      xaxis: {
        categories: [
          'RENTAS',
          'ACCIONES JURÍDICAS',
          'CONTRATACIÓN',
          'GESTIÓN DOCUMENTAL',
          'PQRSDF',
          'SISTEMAS',
          'TIC',
          'AIRE Y URBANO',
          'BIÓTICOS',
          'SUELOS',
          'AGUA',
          'FAUNA',
          'FLORA',
          'ECOSISTEMAS',
          'GENÉTICA',
          'ECOLOGÍA',
          'ECOSISTEMAS',
          'GENÉTICA',
          'ECOLOGÍA',
          'ECOSISTEMAS',
          'GENÉTICA',
          'ECOLOGÍA',
          'ECOSISTEMAS',
          'GENÉTICA',
          'ECOLOGÍA',
          'ECOSISTEMAS',
          'GENÉTICA',
        ],
        labels: {
          formatter: function (val: any) {
            return val;
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
            return val;
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

  const [chartDataViewFour, setChartDataViewFour] = useState({
    series: [
      {
        name: 'SEDE PRINCIPAL',
        data: [44, 95, 10, 58, 78, 6],
      },
      {
        name: 'SEDE RÍO ARIARI',
        data: [76, 100, 78, 54, 21, 65],
      },
      {
        name: 'SEDE MACARENA',
        data: [55, 37, 85, 45, 23, 45],
      },
      {
        name: 'SEDE RÍO META',
        data: [30, 90, 45, 78, 65, 45],
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
        categories: [
          'Peticiones',
          'Quejas',
          'Reclamos',
          'Solicitudes',
          'Denuncias',
          'Felicitaciones',
        ],
        labels: {
          formatter: function (val: any) {
            return val;
          },
        },
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
            return val + ' PQRSDF';
          },
        },
      },
    },
  });

  const [chartDataViewFifth, setChartDataViewFifth] = useState({
    series: [
      {
        name: 'PETICIONES',
        data: [44, 95, 10, 58 ],
      },
      {
        name: 'QUEJAS',
        data: [76, 100, 78, 54],
      },
      {
        name: 'RECLAMOS',
        data: [55, 37, 85, 45],
      },
      {
        name: 'SOLICITUDES',
        data: [30, 90, 45, 78],
      },
      {
        name: 'DENUNCIAS',
        data: [10, 90, 45, 78],
      },
      {
        name: 'FELICITACIONES',
        data: [30, 90, 45, 78],
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
        categories: [
          'VILLAVICECIO',
          'ARIARI',
          'PTO LOPEZ',
          'RESTREPO',
        ],
        labels: {
          formatter: function (val: any) {
            return val;
          },
        },
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
            return val + ' PQRSDF';
          },
        },
      },
    },
  });

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
        chartDataViewFour,
        setChartDataViewFour,
        chartDataViewFifth,
        setChartDataViewFifth,
        isReporteReady,
        setIsReportReady,
      }}
    >
      {children}
    </ChartDataContextPQRSDF.Provider>
  );
};

export { ChartDataContextPQRSDF, ChartDataProviderPQRSDF };
