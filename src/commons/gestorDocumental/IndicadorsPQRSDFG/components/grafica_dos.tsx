/* eslint-disable @typescript-eslint/naming-convention */
import { v4 as uuidv4 } from 'uuid';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Knob } from 'primereact/knob';
import { Button } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';



export const exportAll = () => {
  const content = document.getElementById('container-pdf-unico');

  if (content) {
    html2canvas(content).then((canvas: any) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 10, 10, 200, 100, `grafica-report`);
      pdf.save(`grafica-.pdf`);
    });
  }
};
export const BasicDemo = ({ id = uuidv4(), titulo = '', value }: any) => {


 

  const exportToPDF = () => {
    const content = document.getElementById(id);

    if (content) {
      html2canvas(content).then((canvas: any) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 10, 10, 100, 100, `grafica_${id}-report`);
        pdf.save(`grafica-${titulo}-${id}.pdf`);
      });
      console.log("content",content);
    }
  };


  return (
    <>
      <div id={id} style={{ textAlign: 'center' }} >
        <h2>{titulo ? titulo.toString() : ''}</h2>
        <Knob value={value || 0} size={200} disabled />
        <Button onClick={exportToPDF} variant="contained" color="primary">
          <PictureAsPdfIcon />
        </Button>
      </div>
      {/* <Button onClick={exportAll} variant="contained" color="primary">
        <PictureAsPdfIcon />
      </Button> */}
    </>
  );
};
