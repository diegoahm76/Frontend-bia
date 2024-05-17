/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable'
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { logo_cormacarena_h } from '../../../conservacion/Reportes/logos/logos';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Grid } from '@mui/material';


export const DocumentoEstadoCuenta: React.FC<any> = ({
  datos,
  id_deudor,
  id_subetapa,
  dataClean,
  is_generate_resolucion,
  resolucion_url
}: {datos: any, is_generate_resolucion: boolean, resolucion_url: any, id_deudor: number, id_subetapa: string, currentDeudor: any, dataClean: any}) => {

  let data: any[] = [];
  let sumaTotal: string | number = 0;


  const [visor, setVisor] = useState('');
  const [currentConsecutivo, setCurrentConsecutivo] = useState(0);

  useEffect(() => {
    if(datos?.id_deudor && is_generate_resolucion){
      data = []
      dataClean.forEach((item: any) => {
      if(item.id_deudor){
        data.push([item.nombre, item.monto_inicial, item.valor_intereses, (Number(item.monto_inicial) + Number(item.valor_intereses)).toLocaleString('es-CO')])
      }
      });
      const total1 = data.reduce((acc, curr) => acc + parseFloat(curr[1].replace(',', '')), 0);
      const total2 = data.reduce((acc, curr) => acc + parseFloat(curr[2].replace(',', '')), 0);
      data.push(['TOTAL', total1.toLocaleString('es-CO'), total2.toLocaleString('es-CO'), (total1 + total2).toLocaleString('es-CO')]);
      sumaTotal = (total1 + total2).toLocaleString('es-CO');
      generateEstadoCuenta();
    }
  }, [is_generate_resolucion, dataClean, datos]);


  const generateEstadoCuenta = () => {
    const anchoPagina = 595.28;
    const docDefinition = {
      pageSize: 'A4',
      pageMargins: [60, 125, 60, 80], // Márgenes de la página: [izquierda, arriba, derecha, abajo]
      header: function(currentPage: any, pageCount: any) { // Función de encabezado
        return [
          {
            image: logo_cormacarena_h, // Aquí deberías tener el logo en formato base64
            width: 120,
            height: 30,
            alignment: 'right',
            margin: [0, 20, 15, 0] // Margen para posicionar el logo en la esquina superior derecha
          },
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
          columns: [
            {
              width: '50%',
              text: [
                { text: `${currentConsecutivo}\n`, fontSize: 12, margin: [0, 10, 0, 0]},
                { text: `\n`},
                { text: `\n`},
                { text: `Villavicencio,\n`, fontSize: 12 },
                { text: `\n`},
                { text: `\n`},
                { text: 'Señores\n', fontSize: 12 },
                { text: `${datos?.id_deudor?.nombres || ''} ${datos?.id_deudor?.apellidos || ''}\n`, fontSize: 12 },
                { text: `CL 27 SUR 43-56\n`, fontSize: 12 },
                { text: `Teléfono: ${datos?.id_deudor?.telefono || ''}\n`, fontSize: 12 },
                { text: [
                    { text: `E-mail: `, fontSize: 12 },
                    { text: `${datos?.id_deudor?.email || ''}\n`, decoration: 'underline', color: 'blue', link: `emailto: ${datos?.id_deudor?.email || ''}` }
                  ]
                },
                { text: `Villavicencio, Meta\n`, fontSize: 12 },
              ],
            },
            {
              width: '50%',
              stack: [
                {
                  canvas: [
                    { type: 'rect', x: anchoPagina/2 - 290, y: 0, w: 230, h: 22 },
                    { type: 'rect', x: anchoPagina/2 - 290, y: 35, w: 230, h: 100}
                  ],
                },
                {
                  absolutePosition: {x: 0, y: 87},
                  stack: [
                    { text: 'Al contestar cite el número completo de este oficio', alignment: 'right', fontSize: 9, margin: [ 0, 0, 15, 0 ] },
                    { text: 'Cormacarena', alignment: 'right', fontSize: 9, margin: [ 0, 30, 90, 10 ] },
                    { text: `Radicado: 123421421412`, alignment: 'left', fontSize: 9, margin: [ anchoPagina/2 + 30, 0, 0, 10 ]  },
                    { text: `Fecha: ${dayjs().format('DD/MM/YYYY')}`, alignment: 'left', fontSize: 9, margin: [ anchoPagina/2 + 30, 0, 0, 10 ] },
                    { text: `Nombre: ${datos?.id_deudor?.nombres || ''} ${datos?.id_deudor?.apellidos || ''}`, alignment: 'left', fontSize: 9, margin: [ anchoPagina/2 + 30, 0, 0, 10 ] }
                  ],
                }
              ]
            }
          ],
        },
        { text: `Asunto: Respuesta al radicado interno de CORMACARENA número 7678 de fecha primero (01) de abril y 9127 de fecha dieciséis (16) de abril de 2024 `, alignment: 'justify', fontSize: 12, margin: [0, 20, 0, 0]},
        { text: `En atención al asunto de la referencia, a través del cual el municipio de PUERTO GAITAN identificado con Nit 800.079.035-1, solicita se realice un estado de cuenta con corte al día 31 de mayo de 2024, por todas las obligaciones que a la fecha tenga pendiente por pagar a CORMACARENA, nos permitimos enviar la siguiente liquidación, así:`, alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0]},
        {
          table: {
            headerRows: 2,
            widths: ['*', '*', '*', '*'],
            body: [
              [{text: 'TASA USO DE AGUA', colSpan: 4, alignment: 'center', fontSize: 11, bold: true}, {}, {}, {}],
              [{text: 'CONCEPTO', alignment: 'center'}, {text: 'CAPITAL', alignment: 'center'}, {text: 'INTERESES*', alignment: 'center'}, {text: 'TOTAL', alignment: 'center'}],
              ...data,
              [{text: 'TOTAL A PAGAR', colSpan: 3, fillColor: '#C8C8C8', fontSize: 11, bold: true}, '', '', sumaTotal]
            ]
          },
          layout: {
            paddingLeft: function(i: any, node: any) { return 4; },
            paddingRight: function(i: any, node: any) { return 4; },
            paddingTop: function(i: any, node: any) { return 2; },
            paddingBottom: function(i: any, node: any) { return 2; },
          },
          fontSize: 10,
          margin: [20, 15, 20, 0]
        },
        {
          table: {
            headerRows: 1,
            widths: ['auto', '*', '*', '*'],
            body: [
              [{text: 'Nombre y apellidos completos', colSpan: 2, alignment: 'center'}, {}, {text: 'Cargo', alignment: 'center'}, {text: 'Firma', alignment: 'center'}],
              ['Proyectó', {text: 'Nombre'}, {text: 'Nombre'}, {text: 'Nombre'}],
              ['Revisó', {}, {}, {}],
              ['Aprobó', {}, {}, {}],
              // ... más filas de datos
            ]
          },
          fontSize: 9,
          margin: [0, 15, 0, 0]
        }
      ]
    };
    pdfMake.createPdf(docDefinition).getDataUrl((dataUrl: any) => {
      setVisor(dataUrl);
    });
  }

  return(
    <>
      <Grid
        container
        spacing={2}
        m={2}
        p={2}        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          m: '10px 0 20px 0',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item xs={12} sm={12}>
          <embed
            src={visor}
            type="application/pdf"
            width="100%"
            height="1080px"
          />
        </Grid>
      </Grid>
    </>
  )
}