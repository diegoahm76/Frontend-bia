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


export const LiquidacionCredito: React.FC<any> = ({
  datos,
  id_deudor,
  id_subetapa,
  dataClean,
  is_generate_resolucion,
  resolucion_url
}: {datos: any, is_generate_resolucion: boolean, resolucion_url: any, id_deudor: number, id_subetapa: number, currentDeudor: any, dataClean: any}) => {

  const [visor, setVisor] = useState('');
  const [isSancionFormat, setIsSancionFormat] = useState(false);
  const [currentConsecutivo, setCurrentConsecutivo] = useState(0);

  useEffect(() => {
    if(datos?.id_deudor){
      generateAprobacion();
    }
  }, [datos])

  const generateLiquidacion = () => {
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
          { text: 'Resolución No. PS-GJ.1.2.6.1.24.012', alignment: 'center', color: '#BBBBBB', italics: true, fontSize: 11, margin: [0, 2, 0, 0]},
          { text: 'Fecha 23/01/2024', alignment: 'center', fontSize: 11, color: '#BBBBBB', italics: true, margin: [0, 2, 0, 0]},
          { text: '«Por medio de la cual se resuelven unas excepciones»', alignment: 'center', fontSize: 11, color: '#BBBBBB', italics: true, margin: [0, 12, 0, 0]}
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
                { text: `Proceso No. ${currentConsecutivo}\n`, fontSize: 12, margin: [0, 10, 0, 0]},
                { text: 'Asunto: Visita técnica de control y seguimiento\n', fontSize: 12 },
                { text: `Contra:  ${datos?.id_deudor?.nombres || ''}\n`, fontSize: 12 },
                { text: `.\t\t\tCC/Nit. ${datos?.id_deudor?.identificacion || ''}\n`, fontSize: 12 },
              ],
            },
            {
              width: '50%',
              stack: [
                {
                  canvas: [
                    { type: 'rect', x: anchoPagina/2 - 290, y: 0, w: 230, h: 85}
                  ],
                },
                {
                  absolutePosition: {x: 0, y: 132},
                  stack: [
                    { text: 'Cormacarena', alignment: 'right', fontSize: 9, margin: [ 0, 0, 90, 10 ] },
                    { text: `Radicado: 123421421412`, alignment: 'left', fontSize: 9, margin: [ anchoPagina/2 + 30, 0, 0, 5 ]  },
                    { text: `Fecha: ${dayjs().format('DD/MM/YYYY')}`, alignment: 'left', fontSize: 9, margin: [ anchoPagina/2 + 30, 0, 0, 5 ] },
                    { text: `Nombre: ${datos?.id_deudor?.nombres || ''} ${datos?.id_deudor?.apellidos || ''}`, alignment: 'left', fontSize: 9, margin: [ anchoPagina/2 + 30, 0, 0, 5 ] }
                  ],
                }
              ]
            }
          ],
        },
        { text: 'CONSIDERANDO', alignment: 'center', fontSize: 12, margin: [0, 15, 0, 0] },
        { text: `Que con la entrada en vigencia de la ley 1066 de 2006, esta Corporación procederá al recaudo de cartera de Jurisdicción Coactiva por los lineamientos del Estatuto Tributario.`, alignment: 'justify', fontSize: 12, margin: [0, 25, 0, 0]},
        { text: `Que mediante Resolución número PS-GJ.1.2.6.1.14.045 de fecha tres (03) de marzo de 2014, se expide un mandamiento de pago a favor de CORMACARENA y en contra del señor LUIS VICENTE MORENO  identificado con cédula de ciudadania número 17.307.299, en atención a la multa impuesta mediante resolución número PS-GJ.1.2.6.12.1069 de fecha diecisiete (17) de agosto de 2012. Acto adminitrativo notificado de manera personal el dia veintiseis (26) de marzo de 2014.`, alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0]},
        { text: `Que mediante resolucion numero PS-GJ.1.2.6.1.14.291 de fecha dieciseis (16) de diciembre de 2014 se ordena seguir adelante la ejecucion del mandamiento de pago número PS-GJ.1.2.6.1.14.045 de fecha tres (03) de marzo de 2014.`, alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0]},
        { text: `Conforme a lo anterior y en concordancia con el literal c del artículo 446 de la ley 1564 de 2012, Código General de Proceso. Éste grupo de cobro procede a realizar la liquidación de crédito que se adelanta dentro del proceso administrativo de cobro coactivo de la referencia.`, alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0]},
        { text: 'Por merito de lo expuesto,', alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0] },
        { text: 'RESUELVE', alignment: 'center', fontSize: 12, margin: [0, 15, 0, 0] },
        { text: `ARTICULO PRIMERO: Expedir una liquidación de crédito en los siguientes términos:`, alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0] },
        { text: `Resolución número PS-GJ.1.2.6.12.1069 de fecha diecisiete (17) de agosto de 2012`, alignment: 'justify', fontSize: 12, margin: [0, 25, 0, 0] },
        { text: `Capital\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t $\t\t\t3.173.520.00`, alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0] },
        { text: `Intereses con corte al 22/08/2023\t\t\t\t\t $\t\t\t3.173.520.00`, alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0] },
        { text: `Total adeudado\t\t\t\t\t\t\t\t\t\t\t\t\t   $\t\t\t3.173.520.00`, alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0] },
        { text: `Paragrafo Pimero: Que el señor LUIS VICENTE MORENO  identificado con cédula de ciudadania número 17.307.299, adeuda a CORMACARENA la suma de SIETE MILLONES DOSCIENTOS SETENTA Y CINCO MIL OCHOCIENTOS VEINTICUATRO PESOS MCTE ($7.275.824) de valor capital e intereses con corte al dia veintidos (22) de agosto de 2023 en atención a la multa impuesta mediante resolución número PS-GJ.1.2.6.12.1069 de fecha diecisiete (17) de agosto de 2012.`, alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0] },
        { text: `ARTÍCULO SEGUNDO: Notificar personalmente la presente, previa citación para que comparezca el ejecutado y/o apoderado o representante legal, dentro de los diez (10) días siguientes a la misma. En caso contrario notificar conforme lo establece el Estatuto Tributario.`, alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0] },
        { text: `ARTÍCULO TERCERO: La presente corrrerá traslado a la parte demandada dentro de los tres (03) días siguientes a su notificación, a efectos que se formulen las objeciones a que haya lugar.`, alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0] },
        { text: `PARÁGRAFO ÚNICO: De acuerdo a lo establecido en el artículo 446 del Código General del Proceso, a la presentación de las objeciones, se le debe anexar una liquidación alternativa en la que se precisen los errores puntuales que le atribuye a la liquidación objetada, so pena de rechazo. `, alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0] },
        { text: `ARTICULO CUARTO: Contra la presente actuación no procede recurso alguno, de acuerdo a lo establecido en el artículo 833-1 del Estatuto Tributario Nacional.`, alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0] },
        { text: `ARTICULO QUINTO: Remitir copia de la presente Resolución a la Subdirección Administrativa y Financiera para su conocimiento pertinente.`, alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0] },
        { text: 'NOTIFÍQUESE Y CÚMPLASE,', alignment: 'center', fontSize: 12, margin: [0, 15, 0, 0] },
        { text: '__________________________________', alignment: 'center', fontSize: 12, margin: [0, 40, 0, 0] },
        { text: 'JUAN CARLOS MEDINA GONZALES', alignment: 'center', fontSize: 12, margin: [0, 2, 0, 0] },
        { text: 'Jefe Oficina Asesora Jurídica', alignment: 'center', fontSize: 12, margin: [0, 2, 0, 0] },
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
  const generateAprobacion = () => {
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
          { text: 'Resolución No. PS-GJ.1.2.6.1.24.012', alignment: 'center', color: '#BBBBBB', italics: true, fontSize: 11, margin: [0, 2, 0, 0]},
          { text: 'Fecha 23/01/2024', alignment: 'center', fontSize: 11, color: '#BBBBBB', italics: true, margin: [0, 2, 0, 0]},
          { text: '«Por medio de la cual se resuelven unas excepciones»', alignment: 'center', fontSize: 11, color: '#BBBBBB', italics: true, margin: [0, 12, 0, 0]}
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
                { text: `Proceso No. ${currentConsecutivo}\n`, fontSize: 12, margin: [0, 10, 0, 0]},
                { text: 'Asunto: Visita técnica de control y seguimiento\n', fontSize: 12 },
                { text: `Contra:  ${datos?.id_deudor?.nombres || ''}\n`, fontSize: 12 },
                { text: `.\t\t\tCC/Nit. ${datos?.id_deudor?.identificacion || ''}\n`, fontSize: 12 },
              ],
            },
            {
              width: '50%',
              stack: [
                {
                  canvas: [
                    { type: 'rect', x: anchoPagina/2 - 290, y: 0, w: 230, h: 85}
                  ],
                },
                {
                  absolutePosition: {x: 0, y: 132},
                  stack: [
                    { text: 'Cormacarena', alignment: 'right', fontSize: 9, margin: [ 0, 0, 90, 10 ] },
                    { text: `Radicado: 123421421412`, alignment: 'left', fontSize: 9, margin: [ anchoPagina/2 + 30, 0, 0, 5 ]  },
                    { text: `Fecha: ${dayjs().format('DD/MM/YYYY')}`, alignment: 'left', fontSize: 9, margin: [ anchoPagina/2 + 30, 0, 0, 5 ] },
                    { text: `Nombre: ${datos?.id_deudor?.nombres || ''} ${datos?.id_deudor?.apellidos || ''}`, alignment: 'left', fontSize: 9, margin: [ anchoPagina/2 + 30, 0, 0, 5 ] }
                  ],
                }
              ]
            }
          ],
        },
        { text: 'CONSIDERANDO', alignment: 'center', fontSize: 12, margin: [0, 15, 0, 0] },
        { text: `Que mediante Resolución número 2.6.1.08.0050 de fecha veintiseis (26) de noviembre de 2008, se expide un mandamiento de pago a favor de CORMACARENA y encontra del señor EDGAR EDUARDO RAMIREZ ARDILA, identificado con cédula de ciudadanía número 17.343.773, en atención a la multa impuesta mediante resolución número 2.6.07.0404 de fecha veintinueve (29) de mayo de 2007. Mandamiento de pago notificado por correo el día cinco (05) de marzo de 2009.`, alignment: 'justify', fontSize: 12, margin: [0, 25, 0, 0]},
        { text: `Que mediante resolución número PM-GJ.1.2.6.1.09.0054 de fecha primero (01) de abril de 2009, se ordena seguir adelante la ejecución del mandamiento de pago. Ante la imposibilidad de notificar personalmente al señor EDGAR EDUARDO RAMIREZ ARDILA, se notifico con la publicación en el periódico de circulación nacional, la Republica, el día once (11) de marzo de 2010 en el acápite de asuntos legales/judiciales.`, alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0]},
        { text: `Que mediante resolución número PS-GJ.1.2.6.1.23.00421 de fecha doce (12) de julio de 2023, se expide una liquidación de crédito.  Acto administrativo notificado por aviso publicado en la página de la Corporación el día diecinueve (19) de octubre de 2023.`, alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0]},
        { text: `Que vencido los tres (03) días siguientes a la notificación, sin que se hubieren presentado objeciones, este despacho,`, alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0]},
        { text: 'RESUELVE', alignment: 'center', fontSize: 12, margin: [0, 15, 0, 0] },
        { text: `ARTÍCULO PRIMERO: Aprobar la liquidación de crédito expedida mediante la Resolución número PS-GJ.1.2.6.1.23.00421 de fecha doce (12) de julio de 2023.`, alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0] },
        { text: `ARTÍCULO SEGUNDO: Notificar la presente, previa citación para que comparezca el ejecutado y/o apoderado o representante legal, dentro de los diez (10) siguientes a la misma. En caso contrario notificar conforme lo establece el Estatuto Tributario.`, alignment: 'justify', fontSize: 12, margin: [0, 25, 0, 0] },
        { text: `ARTÍCULO TERCERO: Remitir copia de la aprobación a la Subdirección Administrativa y Financiera para el área de Contabilidad.`, alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0] },
        { text: `ARTICULO CUARTO: Notificar personalmente la presente, previa citación para que comparezca el ejecutado y/o apoderado o representante legal, dentro de los diez (10) días siguientes a la misma. En caso contrario notificar conforme lo establece el Estatuto Tributario. `, alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0] },
        { text: `PARÁGRAFO ÚNIKNTO: Remitir copia de la presente Resolución a la Subdirección Administrativa y Financiera para su conocimiento pertinente.`, alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0] },
        { text: 'NOTIFÍQUESE Y CÚMPLASE,', alignment: 'center', fontSize: 12, margin: [0, 15, 0, 0] },
        { text: '__________________________________', alignment: 'center', fontSize: 12, margin: [0, 40, 0, 0] },
        { text: 'JUAN CARLOS MEDINA GONZALES', alignment: 'center', fontSize: 12, margin: [0, 2, 0, 0] },
        { text: 'Jefe Oficina Asesora Jurídica', alignment: 'center', fontSize: 12, margin: [0, 2, 0, 0] },
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
  const generateTerminacion = () => {
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
          { text: 'Resolución No. PS-GJ.1.2.6.1.24.012', alignment: 'center', color: '#BBBBBB', italics: true, fontSize: 11, margin: [0, 2, 0, 0]},
          { text: 'Fecha 23/01/2024', alignment: 'center', fontSize: 11, color: '#BBBBBB', italics: true, margin: [0, 2, 0, 0]},
          { text: '«Por medio de la cual se resuelven unas excepciones»', alignment: 'center', fontSize: 11, color: '#BBBBBB', italics: true, margin: [0, 12, 0, 0]}
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
                { text: `Proceso No. ${currentConsecutivo}\n`, fontSize: 12, margin: [0, 10, 0, 0]},
                { text: 'Asunto: Visita técnica de control y seguimiento\n', fontSize: 12 },
                { text: `Contra:  ${datos?.id_deudor?.nombres || ''}\n`, fontSize: 12 },
                { text: `.\t\t\tCC/Nit. ${datos?.id_deudor?.identificacion || ''}\n`, fontSize: 12 },
              ],
            },
            {
              width: '50%',
              stack: [
                {
                  canvas: [
                    { type: 'rect', x: anchoPagina/2 - 290, y: 0, w: 230, h: 85}
                  ],
                },
                {
                  absolutePosition: {x: 0, y: 132},
                  stack: [
                    { text: 'Cormacarena', alignment: 'right', fontSize: 9, margin: [ 0, 0, 90, 10 ] },
                    { text: `Radicado: 123421421412`, alignment: 'left', fontSize: 9, margin: [ anchoPagina/2 + 30, 0, 0, 5 ]  },
                    { text: `Fecha: ${dayjs().format('DD/MM/YYYY')}`, alignment: 'left', fontSize: 9, margin: [ anchoPagina/2 + 30, 0, 0, 5 ] },
                    { text: `Nombre: ${datos?.id_deudor?.nombres || ''} ${datos?.id_deudor?.apellidos || ''}`, alignment: 'left', fontSize: 9, margin: [ anchoPagina/2 + 30, 0, 0, 5 ] }
                  ],
                }
              ]
            }
          ],
        },
        { text: `El funcionario ejecutor de cobro coactivo, en virtud de las facultades que le concede la Ley 6 de 1992, ley 1066 de 2006, resolución número 170 de 1999 y 2.6.05112 de febrero de 2005, y demás normas legales y complementarias,`, alignment: 'justify', fontSize: 12, margin: [0, 25, 0, 0]},
        { text: 'CONSIDERANDO', alignment: 'center', fontSize: 12, margin: [0, 15, 0, 0] },
        { text: `Que con la entrada en vigencia de la ley 1066 de 2006, esta corporación procederá el recaudo de cartera de jurisdicción coactiva por los lineamientos del estatuto tributario.`, alignment: 'justify', fontSize: 12, margin: [0, 25, 0, 0]},
        { text: `Que mediante Resolución número PS-GJ.1.2.6.1.23.722 de fecha veintinueve (29) de noviembre de 2023, se expide un mandamiento de pago a favor de CORMACARENA y en contra de la empresa PETROMOVIL DE COLOMBIA S.A.S, identificada con Nit. 900.233.700-2. `, alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0]},
        { text: `Que la empresa PETROMOVIL DE COLOMBIA S.A.S el día veintidós (22) de noviembre de 2023 realizó consignación por la suma de SEIS MILLONES CUATROCIENTOS SESENTA MIL CUATROCIENTOS CUARENTA Y SEIS PESOS MCTE ($6.460.446) de valor capital e intereses en atención a la visita técnica de control y seguimiento ordenada mediante resolución número PS-GJ.1.2.6.20.0583 de fecha catorce (14) de agosto de 2020; quedando un saldo por la suma de CUATROCIENTOS SESENTA Y SIETE MIL OCHOCIENTOS SESENTA PESOS MCTE ($467.860) el cual fue consignado el día cuatro (04) de enero de 2024.`, alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0]},
        { text: `Conforme a lo anterior, se desprende del estudio del presente expediente, que la obligación que dio origen al proceso administrativo de cobro coactivo en contra de la empresa PETROMOVIL DE COLOMBIA S.A.S, identificada con Nit. 900.233.700-2, se encuentra paga en su totalidad, por lo que ha desaparecido la causa para proseguir el proceso.`, alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0]},
        { text: `Por lo anterior,`, alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0]},
        { text: 'RESUELVE', alignment: 'center', fontSize: 12, margin: [0, 15, 0, 0] },
        { text: `ARTICULO PRIMERO: Decretar terminado el presente proceso administrativo de cobro coactivo en contra de la empresa PETROMOVIL DE COLOMBIA S.A.S, identificada con Nit. 900.233.700-2 en atención a la visita técnica de control y seguimiento ordenada mediante resolución número PS-GJ.1.2.6.20.0583 de fecha catorce (14) de agosto de 2020.`, alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0] },
        { text: `ARTICULO SEGUNDO: Notificar la presente Resolución, previa citación para que comparezca el ejecutado y/o apoderado o representante legal, dentro de los diez (10) siguientes a la misma. En caso contrario notificar conforme lo establece el estatuto tributario.`, alignment: 'justify', fontSize: 12, margin: [0, 25, 0, 0] },
        { text: 'NOTIFÍQUESE Y CÚMPLASE,', alignment: 'center', fontSize: 12, margin: [0, 15, 0, 0] },
        { text: '__________________________________', alignment: 'center', fontSize: 12, margin: [0, 40, 0, 0] },
        { text: 'JUAN CARLOS MEDINA GONZALES', alignment: 'center', fontSize: 12, margin: [0, 2, 0, 0] },
        { text: 'Jefe Oficina Asesora Jurídica', alignment: 'center', fontSize: 12, margin: [0, 2, 0, 0] },
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