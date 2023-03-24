/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from 'react';
import { Title } from '../../../../components/Title';
import jsPDF from 'jspdf';
import { Button } from '@mui/material';
import { api } from '../../../../api/axios';


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

    // Agregar título y datos al PDF
    const title = 'REPORTE BIA-ESTACIONES';
    const title_width = doc.getTextWidth(title);
    const x_pos = (doc.internal.pageSize.width - title_width) / 2;
    doc.text(title, x_pos, 10);
    doc.text(`Temperatura promedio: ${temp_avg.toFixed(2)} °C`, 10, 20);
    doc.text(`Temperatura mínima: ${temp_min.toFixed(2)} °C`, 10, 30);
    doc.text(`Temperatura máxima: ${temp_max.toFixed(2)} °C`, 10, 40);
    

    // Guardar el PDF
    doc.save('data.pdf');
  }

  const handle_download_pdf = async (): Promise<void> => {
    const data = await fetch_data();
    generate_pdf(data);
  }

  return (
    <>
      <Title title="REPORTES" />
      <form>
        <label>
          Fecha Inicial:
          <input type="date" value={fecha_inicial} onChange={handle_input_change} />
        </label>
      </form>
      <Button onClick={handle_download_pdf}>Descargar PDF</Button>
    </>
  );
};
