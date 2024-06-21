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


export const SeguirAdelanteDoc: React.FC<any> = ({
  datos,
  id_deudor,
  id_subetapa,
  dataClean,
  is_generate_resolucion,
  resolucion_url
}: {datos: any, is_generate_resolucion: boolean, resolucion_url: any, id_deudor: number, id_subetapa: number, currentDeudor: any, dataClean: any}) => {

  const [visor, setVisor] = useState('');
  const [altura, setAltura] = useState(0);
  const [currentConsecutivo, setCurrentConsecutivo] = useState(0);

  const columns = [
    { header: 'Acción', dataKey: 'accion' },
    { header: 'Nombres y apellidos completos', dataKey: 'nombre' },
    { header: 'Cargo', dataKey: 'cargo' },
    { header: 'Firma', dataKey: 'firma' }
  ];

  const data = [
    { accion: 'Proyectó:', nombre: 'DIANA PATRICIA LADINO LADINO', cargo: 'ABOGADA GRUPO RENTAS', firma: '' },
    { accion: 'Revisó', nombre: 'FERNANDO RUEDA LONDOÑO', cargo: 'COORDINADOR GRUPO RENTAS', firma: '' },
    { accion: 'Aprobó', nombre: 'FERNANDO RUEDA LONDOÑO', cargo: 'COORDINADOR GRUPO RENTAS', firma: '' } // Ajustar según los datos necesarios
  ];

  useEffect(() => {
    // if(datos?.id_deudor) generatePDF();
    generatePDF();
  }, [datos])

  const generatePDF = () => {
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
          { text: '«Por medio de la cual se ordena seguir adelante la ejecución»', alignment: 'center', fontSize: 11, color: '#BBBBBB', italics: true, margin: [0, 12, 0, 0]}
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
        { text: 'El funcionario ejecutor de Cobro Coactivo, en virtud de las facultades que le concede la Ley 6 de 1992, Ley 1066 de 2006, Resolucion No 170 de 1999 y 2.6.05112 de febrero de 2005 , y demas normas legales complematarios,', alignment: 'justify', fontSize: 12, margin: [0, 20, 0, 0] },
        { text: 'CONSIDERANDO', alignment: 'center', fontSize: 12, margin: [0, 15, 0, 0] },
        { text: `Que con la entrada en vigencia de la Ley 1066 de 2006,  esta Corporacion procederá al recuado  de cartera de Jurisdicción Coactiva por los lineamientos del Estatuto Tributario.`, alignment: 'justify', fontSize: 12, margin: [0, 25, 0, 0]},
        { text: `Que mediante resolución número PS-GJ.1.2.6.1.13.352 de fecha 	trece (13) de diciembre de 2013, se expide un mandamiento de pago a favor de CORMACARENA y en contra de la señora LAURA YENNY ANGARITA URIBE identificada con cédula de ciudadanía número 40.418.869, en atención a la multa impuesta mediante resolución número PS-GJ.1.2.6.10.1759 de fecha cuatro (04) de octubre de 2010. Ante la imposibilidad de notificar personalmente, se procede a notificar por publicado en la pagina web de la corporación el dia treinta y uno (31) de julio de 2015.`, alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0]},
        { text: `Que vencidos los quince (15) días sin que el deudor propusiese excepciones y sin que hubiere pagado la obligación en su totalidad, de conformidad con el artículo 836 del Estatuto Tributario, se ordena seguir adelante la ejecución y se ordena se continúe la investigación de bienes del deudor a efectos de satisfacer el pago de la obligación.`, alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0]},
        { text: `Por lo anterior y de conformidad con el artículo 836 del Estatuto Tributario, se ordena seguir adelante la ejecución.`, alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0]},
        { text: 'Por mérito de lo expuesto,', alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0] },
        { text: 'RESUELVE', alignment: 'center', fontSize: 12, margin: [0, 15, 0, 0] },
        { text: `ARTÍCULO PRIMERO: Ordenar seguir adelante la ejecución del mandamiento de pago número PS-GJ.1.2.6.1.13.352 de fecha 	trece (13) de diciembre de 2013, contra de la señora LAURA YENNY ANGARITA URIBE identificada con cédula de ciudadanía número 40.418.869, en atención a la multa impuesta mediante resolución número PS-GJ.1.2.6.10.1759 de fecha cuatro (04) de octubre de 2010.`, alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0] },
        { text: `ARTÍCULO SEGUNDO: Notificar la presente resolución, previa citación para que comparezca el ejecutado y/o apoderado o representante legal, dentro de los diez (10) siguientes a la misma. En caso contrario notificar conforme lo establece el Estatuto Tributario.`, alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0] },
        { text: `ARTÍCULO TERCERO: Una vez ejecutoriada la presente resolución, efectúese liquidación de crédito dentro del proceso administrativo de cobro coactivo referenciado.`, alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0] },
        { text: `ARTÍCULO CUARTO: Ordenar la investigación de bienes del deudor, objeto de medida cautelar y materialización de las mismas. `, alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0] },
        { text: `ARTICULO QUINTO: Contra el presente acto administrativo no procede recurso alguno, de conformidad con lo previsto en el artículo 833-1 del Estatuto Tributario.`, alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0] },
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
        p={2}
        sx={{
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