/* eslint-disable @typescript-eslint/naming-convention */
import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";

interface PQRSDFDataa {
  valor_uno: any;
  valor_dos: any;
  tipo_porcentaje: any;
}

export const Graficapiegraficaindicadores: React.FC<PQRSDFDataa> = ({ valor_uno, valor_dos, tipo_porcentaje }: PQRSDFDataa) => {

  // Verificar si valor_uno y valor_dos están definidos
  if (valor_uno !== undefined && valor_dos !== undefined) {


    const porcentajeNoRespondidos = Math.trunc(valor_dos);
    const porcentajeRespondidos = Math.trunc(valor_uno);


    let colorNoRespondidos = "#ff0000"; // Por defecto, color rojo
    let colorRespondidos = "#a6a6a6"; // Por defecto, color verde

    // Cambia los colores según el tipo_porcentaje
    if (tipo_porcentaje === "Excelente") {
      colorRespondidos = "#2ecc71"; // Cambia el color a verde si es "Excelente"
    } else if (tipo_porcentaje === "Regular") {
      colorNoRespondidos = "#f39c12"; // Cambia el color a amarillo si es "Regular"
    }
    
    const chartData: ApexOptions = {
      chart: {
        width: 380,
        type: "pie",
      },
      labels: ["No Respondidas", "Respondidas"],
      series: [porcentajeNoRespondidos, porcentajeRespondidos],
      colors: [colorNoRespondidos, colorRespondidos], // Usa las variables de color aquí
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: "auto",
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    };

    return <ReactApexChart options={chartData} series={chartData.series} type="pie" height={280} />;
  } else {
    console.log("Los valores no están definidos correctamente.");
    // Puedes manejar este caso de otra manera o simplemente retornar null o un mensaje de error
    return null;
  }
};

 
