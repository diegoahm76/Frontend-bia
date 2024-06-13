/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, capitalize } from '@mui/material';
import 'jspdf-autotable'; // Importa la librería jspdf-autotable para habilitar la función autoTable
import { useSelector } from 'react-redux';
import { AuthSlice } from '../commons/auth/interfaces';
import { useEffect } from 'react';
import pdfMake from "pdfmake/build/pdfmake";
import { new_logo_corma_h } from '../commons/conservacion/Reportes/logos/logos';

interface DownloadPDFProps {
    isEI?: boolean,
    nurseries: any[];
    columns: any[];
    filtrers: any;
    nombre_archivo: string,
    title: string,
  }

export const download_new_pdf_props : React.FC<DownloadPDFProps> = (props: DownloadPDFProps) => {

    const {
        userinfo
      } = useSelector((state: AuthSlice) => state.auth);

    useEffect(() => console.log(userinfo, props), [props])

    const titulo:any = props.title;
    // //  console.log('')(titulo);
    const button_style = {
        color: 'white',
        backgroundColor: 'red',
        // border: '3px solid black',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '10px'
    };

    const buildTableBody = (data: any, columns: any) => {
      const body = [];

      // Cabeceras
      const headers = columns.map((column: any) => ({
        text: column.headerName,
        style: 'tableHeader',
        alignment: 'center'
      }));
      body.push(headers);

      // Datos de las filas
      data.forEach((row: any) => {
        const rowData = columns.map((column: any) => {
          const cellData = row[column.field];
          return { text: cellData ? cellData.toString() : '', alignment: 'center', noWrap: false };
        });
        body.push(rowData);
      });

      return body;
    };

  const handleClick = (): void => {
    const anchoPagina = 595.28;
    const docDefinition = {
      extend: 'pdfHtml5',
      pageSize: 'A2',
      pageOrientation: 'landscape',
      pageMargins: [30, 250, 30, 80], // Márgenes de la página: [izquierda, arriba, derecha, abajo]
      header: function(currentPage: any, pageCount: any) {
        return [
          {
            margin: [30, 30, 30, 0], // Márgenes: izquierdo, superior, derecho, inferior
            table: {
              widths: ['auto', '*', 'auto', 'auto'],
              body: [
                [
                  {
                    text: 'Cormacarena',
                    fontSize: 20,
                    bold: true,
                    colSpan: 4,
                    alignment: 'center',
                    border: [true, true, true, true],
                    margin: [0, 5, 0, 5] // Márgenes internos
                  },
                  {},
                  {},
                  {}
                ],
                [
                  {
                    image: new_logo_corma_h,
                    width: 270,
                    height: 70,
                    alignment: 'left',
                    border: [true, false, true, true], // Bordes excepto el derecho
                    margin: [5, 5, 5, 5] // Márgenes internos
                  },
                  {
                    fontSize: 18,
                    text: titulo,
                    alignment: 'center',
                    border: [true, false, true, true], // Bordes excepto el derecho
                    margin: [5, 5, 5, 5] // Márgenes internos
                  },
                  {
                    fontSize: 16,
                    text: 'Fecha: ' + new Date().toLocaleDateString(),
                    alignment: 'right',
                    border: [true, false, true, true], // Bordes excepto el derecho
                    margin: [5, 5, 5, 5] // Márgenes internos
                  },
                  {
                    fontSize: 16,
                    text: 'Versión: 1',
                    alignment: 'right',
                    border: [true, false, true, true], // Bordes completos
                    margin: [5, 5, 5, 5] // Márgenes internos
                  }
                ]
              ]
            },
            layout: {
              paddingLeft: function(i: any, node: any) { return 5; },
              paddingRight: function(i: any, node: any) { return 5; },
              paddingTop: function(i: any, node: any) { return 5; },
              paddingBottom: function(i: any, node: any) { return 5; },
            }
          },
          { text: `Identificación: ${userinfo.numero_documento}`, alignment: 'justify', fontSize: 16, margin: [30, 15, 30, 0]},
          { text: `Generado por: ${userinfo.nombre}`, alignment: 'justify', fontSize: 16, margin: [30, 4, 30, 0]},
        ];
      },

      footer: function(currentPage: any, pageCount: any) { // Función de pie de página
        return [
          {
            columns: [
              {
                width: '50%',
                text: [
                  { text: 'AUTORIDAD AMBIENTAL EN EL DEPARTAMENTO DEL META - NIT 822000091-2\n', bold: true, fontSize: 7, color: '#808080' },
                  { text: 'Carrera 44C No33B-24 barrio Barzal Villavicencio (Meta) - Colombia\n', fontSize: 7, color: '#808080' },
                  { text: 'PBX 6730420 - 6730417 - 6730418 PQR 6730420 Ext. 105\n', fontSize: 7, color: '#808080' },
                  { text: 'Linea Gratuita: 018000117177\n', fontSize: 7, color: '#808080' },
                  { text: 'www.cormacarena.gov.co  info@cormacarena.gov.co\n', bold: true, fontSize: 7, color: '#808080' },
                ],
              },
              {
                width: '50%',
                text: [
                  { text: 'Corporación para el\n', alignment: 'right', fontSize: 9, color: '#808080', bold: true },
                  { text: 'Desarrollo sostenible\n', alignment: 'right', fontSize: 9, color: '#808080', bold: true },
                  { text: 'del Área de Manejo\n', alignment: 'right', fontSize: 9, color: '#808080', bold: true },
                  { text: 'Especial La Macarena\n', alignment: 'right', fontSize: 9, color: '#808080', bold: true }
                ],
              }
            ],
            margin: [20, 20, 20, 10] // Margen para posicionar el texto en la parte inferior de la página
          }
        ];
      },
      content: [
        {
          table: {
            headerRows: 1,
            widths: props.isEI ? props.columns.map(() => '*') : props.columns.map(column => column.width || 'auto'),
            // widths: props.columns.map(column => column.width || 'auto'),
            body: buildTableBody(props.nurseries, props.columns)
          },
          layout: {
            paddingLeft: function(i: any, node: any) { return 4; },
            paddingRight: function(i: any, node: any) { return 4; },
            paddingTop: function(i: any, node: any) { return 2; },
            paddingBottom: function(i: any, node: any) { return 2; },
            hLineWidth: function(i: any, node: any) { return 0.5; },
            vLineWidth: function(i: any, node: any) { return 0.5; }
          }, // Esto añade líneas horizontales ligeras
          fontSize: 8,
        }
      ],
      styles: {
        tableHeader: {
          bold: true,
          capitalize: true,
          fontSize: 10,
          color: 'black'
        }
      }
    };
    const file_id = Math.floor(Math.random() * 99999);
    const file_name = `${props.nombre_archivo}_${file_id}.pdf`;
    pdfMake.createPdf(docDefinition).download(file_name);
    };

    return (
        <Button style={button_style} onClick={handleClick}>
            <img style={{ width: 45 }} src="../image/botones/PDF.png" alt="XLS Button" />
        </Button>
    );
};




