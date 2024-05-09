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


export const MandamientoPagoDoc: React.FC<any> = ({
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
      generatePDF();
    }
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
          { text: '«Por medio de la cual se expide un mandamiento de pago»', alignment: 'center', fontSize: 11, color: '#BBBBBB', italics: true, margin: [0, 12, 0, 0]}
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
                    { type: 'rect', x: anchoPagina/2 - 290, y: 0, w: 230, h: 22 },
                    { type: 'rect', x: anchoPagina/2 - 290, y: 35, w: 230, h: 85}
                  ],
                },
                {
                  absolutePosition: {x: 0, y: 132},
                  stack: [
                    { text: 'Al contestar cite el número completo de este oficio', alignment: 'right', fontSize: 9, margin: [ 0, 0, 15, 0 ] },
                    { text: 'Cormacarena', alignment: 'right', fontSize: 9, margin: [ 0, 30, 90, 10 ] },
                    { text: `Radicado: 123421421412`, alignment: 'left', fontSize: 9, margin: [ anchoPagina/2 + 30, 0, 0, 5 ]  },
                    { text: `Fecha: ${dayjs().format('DD/MM/YYYY')}`, alignment: 'left', fontSize: 9, margin: [ anchoPagina/2 + 30, 0, 0, 5 ] },
                    { text: `Nombre: ${datos?.id_deudor?.nombres || ''} ${datos?.id_deudor?.apellidos || ''}`, alignment: 'left', fontSize: 9, margin: [ anchoPagina/2 + 30, 0, 0, 5 ] }
                  ],
                }
              ]
            }
          ],
        },
        { text: 'CONSIDERANDO', alignment: 'center', fontSize: 12, margin: [0, 20, 0, 0] },
        isSancionFormat
          ? { text: [
                'De conformidad con el numeral 7 del artículo 150 y 269 de la Constitución Política de Colombia, que por remisión normativa preside en el artículo 23 del decreto 1768 de 1994, compilado por el artículo 2.2.8.4.1.23 del decreto 1076 de 2015, que señala: ',
                { text: '«Las corporaciones tienen jurisdicción coactiva para hacer efectivos los créditos exigibles a su favor, de acuerdo con las normas establecidas para las entidades públicas del sector nacional, en la Ley 6ª de 1992 o la norma que modifique o sustituya»', italics: true },
                ' y la resolución 2.6.07.0073 del 15 de febrero de 2007',
                { text: '«Por medio del cual se establece el Reglamento interno de cartera de la Corporación para el Desarrollo Sostenible del Área de Manejo Especial La Macarena»', italics: true },
                ' proferida por esta Corporación, se dispone lo siguiente:',
              ],
              alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0]
            }
          : { text: 'Que de conformidad con el artículo 23 del decreto 1768 de 1994, compilado por el artículo 2.2.8.4.1.23 del decreto 1076 de 2015, que señala «las corporaciones tienen jurisdicción coactiva para hacer efectivos los créditos exigibles su favor, de acuerdo con las normas establecidas para las entidades públicas del sector nacional, en la Ley 6ª de 1992 o la norma que la modifique o sustituya»', alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0]},

        isSancionFormat
          ? { text: `Que con el fin de vigilar y efectuar un seguimiento oportuno y eficaz de las acreencias que por cualquier concepto se adeuden a la Corporación, el jefe de la Oficina Asesora Jurídica a través del grupo rentas podrá adelantar el presente procedimiento de cobro coactivo de conformidad con lo establecido en el Estatuto Tributario Nacional Colombiano -en adelante ET-`, alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0] }
          : {text: `Que dentro del expediente número 3.37.2.3.016.005, mediante resolución número PS-GJ.1.2.6.17.2164 de fecha veintiocho (28) de noviembre de 2017, CORMACARENA otorga al señor WILMER ALEJANDRO GARAVITO MEDINA   identificado con cedula de ciudadanía No. 86.083.859, concesión de aguas superficiales, por un caudal concesionado de 6.68 lts/seg para uso pecuario.`, alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0] },

        isSancionFormat
          ? { text: 'Que forman parte del patrimonio y rentas de la Corporación, las descritas en los artículos 42 al 46 de la ley 99 de 1993, como lo son, el recaudo de las contribuciones por concepto de tasas retributivas, tasas por utilización de aguas, derechos, tarifas, sanciones y multas impuestas, entre otras, que forman parte de nuestra jurisdicción.', alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0] }
          : { text: `Que en cumplimiento a la resolución número PS-GJ.1.2.6.17.2164 de fecha veintiocho (28) de noviembre de 2017, el beneficiario de la concesión de aguas superficiales deberá contribuir por el uso del recurso hídrico.`,  alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0]},

        isSancionFormat
          ? { text: [
                'Que para efectos de liquidar los intereses moratorios de las obligaciones descritas anteriormente, la resolución 2.6.07.0073 del 15 de febrero de 2007, dispuso reglamentar su tasación bajo las siguientes condiciones: ',
                { text: 'i) Sanciones y otras obligaciones diferentes a impuestos tasas y contribuciones fiscales continuará con el 12% anual conforme lo establece la Ley 68 de 1923, ii) La no transferencia oportuna del porcentaje ambiental, regirá los establecidos en el Código Civil de conformidad con el artículo 5 del Decreto 1339 de 1994, y iii) Tasa retributiva o compensatoria y Tasa por uso de Agua, interés compuesto supeditado a la usura certificada por la Superintendencia Financiera para el respectivo mes (Ley 1066 de 2006)', italics: true },
              ],
              alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0]
            }
          : {text: `Que el grupo Rentas de la oficina Jurídica de esta Corporación, emitió los siguientes documentos de cobro por concepto de tasa por utilización de aguas, señalándose como obligaciones pendientes de pago por parte del señor WILMER ALEJANDRO GARAVITO MEDINA identificado con cédula de ciudadanía número 86.083.859:`, alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0]},

        isSancionFormat && { text: [
            'Que en el Artículo 826 del ET establece ',
            { text: '«El funcionario competente para exigir el cobro coactivo, producirá el mandamiento de pago ordenando la cancelación de las obligaciones pendientes más los intereses respectivos. Este mandamiento se notificará personalmente al deudor, previa citación para que comparezca en un término de diez (10) días. Si vencido el término no comparece, el mandamiento ejecutivo se notificará por correo. En la misma forma se notificará el mandamiento ejecutivo a los herederos del deudor y a los deudores solidarios.\n', italics: true },
            {text: '(...)\n', italics: true},
            { text: 'PARAGRAFO. El mandamiento de pago podrá referirse a más de un título ejecutivo del mismo deudor.»', italics: true, underline: true },

          ],
          alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0]
        },

        isSancionFormat
          ? { text: `Por lo anterior, y en el marco de legalidad del presente acto, se procederá a ejecutar a favor de la corporación y en contra de la empresa 5 EXPRESS SERVICIOS S.A.S identificada con Nit. 892.100.110-8, las siguientes obligaciones:  `, alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0] }
          : { text: `- G.R-2022-011414 de fecha veintinueve (29) de abril de 2022.`, alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0] },

        !isSancionFormat && { text: 'Que los títulos ejecutivos comprendidos dentro de este proceso coactivo es un título complejo compuesto por dos (2) diferentes actos administrativos:', alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0] },

        isSancionFormat
          ? { text: [
                '1.\tLa suma de SIETE  MILLONES SESENTA Y UN MIL SETECIENTOS CINCUENTA Y TRES PESOS M/CTE ($7.061.753), de valor capital por concepto de visita de control y seguimiento ordenada mediante auto número PS-GJ.1.2.64.22.0362 de fecha veintiocho (28) de febrero de 2022, dentro del expediente número 3.5.2.11.016.006 por medio del cual la Corporación dispone ',
                { text: '«Ordenar la práctica de evaluación de control y seguimiento para el año 2022 con el objeto de verificar el cumplimiento de las obligaciones contenidas en la resolución N° PS-GJ.2.6.016.1294 de 21 de septiembre de 2016, el plan de contingencia para el transporte terrestre de hidrocarburos, derivados y sustancias nocivas» ', italics: true },
                'Acto administrativo notificado por aviso el día dieciocho (18) de marzo de 2022.',
              ],
              alignment: 'justify', fontSize: 12, margin: [20, 15, 0, 0]
            }
          : { text: '1. Resolución número PS-GJ.1.2.6.17.2164 de fecha veintiocho (28) de noviembre de 2017', alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0] },

        isSancionFormat
          ? { text: `Revisados los registros contables de la Corporación se verificó que la empresa 5 EXPRESS SERVICIOS S.A.S identificada con Nit. 892.100.110-8, no realizó el pago total de la citada visita de control y seguimiento.`, alignment: 'justify', fontSize: 12, margin: [20, 15, 0, 0] }
          : {text: `2. Documentos de cobro número G.R-2022-011414 de fecha veintinueve (29) de abril de 2022`, alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0]},

        isSancionFormat
          ? { text: `Que la mencionada obligación se encuentra en firme y ejecutoriada desde el día veintidós (22) de marzo de 2022, constituyéndose en mora desde el día seis (06) de abril de 2022, prestando mérito ejecutivo como una obligación clara, expresa y exigible, por lo cual, es procedente librar mandamiento de pago en los trámites que señale la ley.`, alignment: 'justify', fontSize: 12, margin: [20, 15, 0, 0] }
          : { text: `Que dando aplicabilidad a la ley 1066 de fecha 29 de julio de 2006, el procedimiento de jurisdicción coactiva que se tramitaba bajo los lineamientos del código de procedimiento civil se efectuara bajo los esquemas del estatuto tributario.`, alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0]},

        isSancionFormat
          ? { text: `Conforme a lo anterior, los intereses moratorios están ajustados conforme a las leyes preexistentes y al reglamento interno establecido por esta Corporación, habida cuenta que sus parámetros aritméticos quedan liquidados a partir del día en que se hizo exigible, hasta el día en que sea verificado el pago total de las pretéritas obligaciones.`, alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0] }
          : { text: `Que el suscrito funcionario es competente para conocer del proceso, de acuerdo con la resolución No. 170 de fecha 28 de Julio de 1999, modificada por el acto administrativo No 2.6.05.112 de fecha 08 de febrero de 2005, expedidas por el director de CORMACARENA.`, alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0]},

        { text: 'Por mérito de lo expuesto,', alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0] },
        { text: 'RESUELVE', alignment: 'center', fontSize: 12, margin: [0, 15, 0, 0] },
        { text: 'ARTÌCULO PRIMERO: Librar mandamiento de pago a favor de la Corporación para el Desarrollo Sostenible del Área de Manejo Especial la Macarena CORMACARENA para que en el término de quince (15) días siguientes a la notificación del presente mandamiento de pago, que la empresa 5 EXPRESS SERVICIOS S.A.S identificada con Nit. 892.100.110-8, cancele en la cuenta de depósitos judiciales del Banco Agrario No. 500019196301 sucursal Villavicencio a nombre de C.A.R. CORMACARENA C. COACTIVO, los siguientes valores:', alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0] },

        isSancionFormat
          ? { text:
              '1.\tLa suma de SIETE MILLONES SESENTA Y UN MIL SETECIENTOS CINCUENTA Y TRES PESOS M/CTE ($7.061.753), de valor capital por concepto de visita de control y seguimiento ordenada mediante auto número PS-GJ.1.2.64.22.0362 de fecha veintiocho (28) de febrero de 2022, dentro del expediente número 3.5.2.11.016.006      2. La suma de los intereses moratorios causados desde el día en que se hizo exigible la obligación hasta la fecha en que se efectúe el pago total sobre el valor capital citado, conforme a la tasa correspondiente de acuerdo la resolución 2.6.07.0073 del 15 de febrero de 2007 i) Sanciones y otras obligaciones diferentes a impuestos tasas y contribuciones fiscales continuará con el 12% anual conforme lo establece la Ley 68 de 1923. proferida por esta Corporación. ', alignment: 'justify', fontSize: 12, margin: [20, 15, 0, 0]
            }
          : { text: '1.\tLa suma de CIENTO DIEZ MIL CUATROCIENTOS CUARENTA Y DOS PESOS MCTE ($110.442) de valor capital por concepto de tasa por uso de agua, según documento de cobro número G.R-2022-011414 de fecha veintinueve (29) de abril de 2022.   2. Los intereses moratorios que se causen sobre los valores citados a la tasa efectiva de usura certificada por la Superintendencia Financiera de Colombia para el respectivo mes de mora (Art. 635 E.T); desde que se hicieron exigibles las obligaciones hasta que se verifiquen los pagos en su totalidad.  ', alignment: 'justify', fontSize: 12, margin: [20, 15, 0, 0] },
        { text: 'ARTÍCULO SEGUNDO: Notificar este mandamiento de pago personalmente, previa citación para que comparezca el ejecutado y/o apoderado o representante legal, dentro de los diez (10) días siguientes a la misma. En caso contrario notificar por correo conforme lo dispuesto en el artículo 826 del estatuto tributario, o en su defecto lo señalado al artículo 566-1 del Estatuto Tributario, modificado por el artículo 105 de la ley 2010 de 2019.', alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0] },
        { text: 'ARTÌCULO TERCERO: Advertir al deudor que dispone de quince (15) días después de notificada esta providencia, para cancelar la deuda o proponer excepciones legales que estimen pertinentes conforme a lo reglado en el artículo 830 del Estatuto Tributario', alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0] },
        { text: 'NOTIFÍQUESE Y CÚMPLASE,', alignment: 'center', fontSize: 12, margin: [0, 15, 0, 0] },
        { text: '__________________________________', alignment: 'center', fontSize: 12, margin: [0, 40, 0, 0] },
        { text: 'JUAN CARLOS MEDINA GONZALES', alignment: 'center', fontSize: 12, margin: [0, 2, 0, 0] },
        { text: 'Jefe Oficina Asesora Jurídica', alignment: 'center', fontSize: 12, margin: [0, 2, 0, 0] },
        {
          table: {
            headerRows: 3,
            widths: ['auto', '*', '*', '*'],
            body: [
              [{text: 'Nombre y apellidos completos', colSpan: 2, alignment: 'center'}, {}, {text: 'Cargo', alignment: 'center'}, {text: 'Firma', alignment: 'center'}],
              ['Aprobó', {text: 'Nombre', rowSpan: 2}, {text: 'Nombre', rowSpan: 2}, {text: 'Nombre', rowSpan: 2}],
              ['Revisó', {}, {}, {}],
              ['Proyectó', {}, {}, {}],
              // ... más filas de datos
            ]
          },
          fontSize: 9,
          margin: [40, 15, 40, 0]
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