/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from 'react';
import { Title } from '../../../../components/Title';
import jsPDF from 'jspdf';
import { Button, Grid } from '@mui/material';
import { api } from '../../../../api/axios';
// import macarenia from '../../';
// eslint-disable-next-line @typescript-eslint/naming-convention
export const ReportesScreen: React.FC = () => {
  const [fecha_inicial, set_fecha_inicial] = useState('');

  const handle_input_change = (event: React.ChangeEvent<HTMLInputElement>) => {
    set_fecha_inicial(event.target.value);
  }

  const fetch_data = async (): Promise<any> => {
    const response = await api.get(`https://backend-bia-beta-production.up.railway.app/api/estaciones/datos/consultar-datos-reporte/${fecha_inicial}`);
    return response.data;
  }

  const generate_pdf = (data: any): void => {
    // eslint-disable-next-line new-cap
    const doc: jsPDF = new jsPDF();

    // Establecer la fuente y tamaño de letra
    const font_props = {
      size: 12
    };
    doc.setFont('Arial', 'normal');
    doc.setFontSize(font_props.size);

    // Calcular la temperatura promedio, mínima y máxima
    const temps = data.data.map((item: any) => parseFloat(item.temperatura_ambiente));
    const temp_avg = temps.reduce((acc: number, cur: number) => acc + cur, 0) / temps.length;
    const temp_min = Math.min(...temps);
    const temp_max = Math.max(...temps);
    // Calcular la humedad promedio, mínima y máxima
    const hum = data.data.map((item: any) => parseFloat(item.humedad_ambiente));
    const hum_avg = hum.reduce((acc: number, cur: number) => acc + cur, 0) / hum.length;
    const hum_min = Math.min(...hum);
    const hum_max = Math.max(...hum);
    // Calcular el nivel de agua promedio, mínima y máxima
    const nivel = data.data.map((item: any) => parseFloat(item.nivel_agua));
    const nivel_avg = nivel.reduce((acc: number, cur: number) => acc + cur, 0) / nivel.length;
    const nivel_min = Math.min(...nivel);
    const nivel_max = Math.max(...nivel);

    // Calcular el velocidad del agua promedio, mínima y máxima
    const velocidad = data.data.map((item: any) => parseFloat(item.velocidad_agua));
    const velocidad_avg = velocidad.reduce((acc: number, cur: number) => acc + cur, 0) / velocidad.length;
    const velocidad_min = Math.min(...velocidad);
    const velocidad_max = Math.max(...velocidad);

    // Calcular presion del aire promedio, minima y maxima

    const presion = data.data.map((item: any) => parseFloat(item.presion_barometrica));
    const presion_avg = presion.reduce((acc: number, cur: number) => acc + cur, 0) / presion.length;
    const presion_min = Math.min(...presion);
    const presion_max = Math.max(...presion);

    // Calcular luminosidad promedio, minima y maxima

    const luminosidad = data.data.map((item: any) => parseFloat(item.luminosidad));
    const luminosidad_avg = luminosidad.reduce((acc: number, cur: number) => acc + cur, 0) / luminosidad.length;
    const luminosidad_min = Math.min(...luminosidad);
    const luminosidad_max = Math.max(...luminosidad);

    // Calcular precipitacion promeido, minima y maxima

    const precipitacion = data.data.map((item: any) => parseFloat(item.precipitacion));
    const precipitacion_avg = precipitacion.reduce((acc: number, cur: number) => acc + cur, 0) / precipitacion.length;
    const precipitacion_min = Math.min(...precipitacion);
    const precipitacion_max = Math.max(...precipitacion);


    // const notrans = data.data.map((item: any) => (item.fecha_registro));
    // const notrasn_fecha = notrans

    // eslint-disable-next-line @typescript-eslint/naming-convention
    // const imgData = macarenia;
    // doc.addImage(
    //   imgData,
    //   'JPEG',
    //   10, // posición en x
    //   10, // posición en y
    //   50, // ancho de la imagen
    //   50 // alto de la imagen
    // );

    // Agregar título y datos al PDF
    const title = 'CERTIFICADO DE DISPONIBILIDAD MENSUAL';
    const title_width = doc.getTextWidth(title);
    const x_pos = (doc.internal.pageSize.width - title_width) / 2;
    doc.setFont("Arial", "bold");
    doc.text(title, x_pos, 4,);
    doc.text(`Temperatura promedio: ${temp_avg.toFixed(2)} °C`, 10, 20);
    doc.text(`Temperatura mínima: ${temp_min.toFixed(2)} °C`, 10, 30);
    doc.text(`Temperatura máxima: ${temp_max.toFixed(2)} °C`, 10, 40);


    doc.text(`Humedad promedio: ${hum_avg.toFixed(2)} %`, 10, 50);
    doc.text(`Humedad mínima: ${hum_min.toFixed(2)} %`, 10, 60);
    doc.text(`Humedad máxima: ${hum_max.toFixed(2)} %`, 0, 70);

    doc.text(`Nivel de agua promedio: ${nivel_avg.toFixed(2)} m`, 10, 80);
    doc.text(`Nivel de agua mínima: ${nivel_min.toFixed(2)} m`, 10, 90);
    doc.text(`Nivel de agua máxima: ${nivel_max.toFixed(2)} m`, 10, 100);

    doc.text(`Velocidad del agua promedio: ${velocidad_avg.toFixed(2)} m/s`, 10, 110);
    doc.text(`Velocidad del agua mínima: ${velocidad_min.toFixed(2)} m/s`, 10, 120);
    doc.text(`Velocidad del agua máxima: ${velocidad_max.toFixed(2)} m/s`, 10, 130);

    doc.text(`Presion del aire promedio: ${presion_avg.toFixed(2)} Hpa`, 10, 140);
    doc.text(`Presion del aire mínima: ${presion_min.toFixed(2)} Hpa`, 10, 150);
    doc.text(`Presion del aire máxima: ${presion_max.toFixed(2)} Hpa`, 10, 160);

    doc.text(`Luminosidad promedio: ${luminosidad_avg.toFixed(2)} Lux`, 10, 170);
    doc.text(`Luminosidad mínima: ${luminosidad_min.toFixed(2)} Lux`, 10, 180);
    doc.text(`Luminosidad máxima: ${luminosidad_max.toFixed(2)} Lux`, 10, 190);

    doc.text(`Precipitacion promedio: ${precipitacion_avg.toFixed(2)} mm`, 10, 200);
    doc.text(`Precipitacion mínima: ${precipitacion_min.toFixed(2)} mm`, 10, 210);
    doc.text(`Precipitacion máxima: ${precipitacion_max.toFixed(2)} mm`, 10, 220);



    // Guardar el PDF
    doc.save('data.pdf');
  }

  const handle_download_pdf = async (): Promise<void> => {
    const data = await fetch_data();
    generate_pdf(data);
  }

  return (
    <>
      <Title title="REPORTE MENSUAL ESTACIONES" />
      <Grid container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }} >
        <label>
          Fecha Inicial:
          <input type="date" value={fecha_inicial} onChange={handle_input_change} />
        </label>
        <Button onClick={handle_download_pdf}>Descargar PDF</Button>
      </Grid>
    </>
  );
};
