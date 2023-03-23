/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/naming-convention */
import { Title } from '../../../../components/Title';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import jsPDF, { jsPDFOptions } from 'jspdf';
import { Button } from '@mui/material';
import { api } from '../../../../api/axios';

export const ReportesScreen: React.FC = () => {
  const fetch_data = async (): Promise<any> => {
    const response = await api.get('https://backend-bia-beta-production.up.railway.app/api/estaciones/consultar-estaciones/');
    return response.data;
  }

  const generate_pdf = (data: any): void => {
    // eslint-disable-next-line new-cap
    const doc: jsPDF = new jsPDF();

    // Agregar contenido al PDF
    doc.text('Datos:', 10, 10);
    doc.text(JSON.stringify(data), 10, 20);

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
      <Button onClick={handle_download_pdf}>Descargar PDF</Button>
    </>
  );
};