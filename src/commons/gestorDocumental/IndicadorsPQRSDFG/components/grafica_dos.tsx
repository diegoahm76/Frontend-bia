/* eslint-disable @typescript-eslint/naming-convention */
// ... (código anterior)

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useState } from "react";
import { Knob } from 'primereact/knob';
import { Button } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

interface Props {
  titulo?: string; // Hacer el título opcional
  value?: number;
}
export const BasicDemo: React.FC<Props> = ({ titulo = '', value }: Props) => {



  const exportToPDF = () => {
    const content = document.getElementById('basic-demo-container');

    if (content) {
      html2canvas(content).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 10, 10, 190, 120);
        pdf.save('grafica.pdf');
        console.log("value", imgData);
      });
      console.log("content",content);
    }
  };


  return (
    <div id="basic-demo-container" style={{ textAlign: 'center' }}>
      <h2>{titulo ? titulo.toString() : ''}</h2>
      <Knob
        value={value || 0}
        size={200}
        disabled
      />
      <Button
        onClick={exportToPDF}
        variant="contained"
        color="primary"
      >
  <PictureAsPdfIcon />
      </Button>
          </div>
  );
};
