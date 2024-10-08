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


export const FormatoResolverExcepciones: React.FC<any> = ({
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
    // if(datos?.id_deudor){
      generatePDF();
    // }
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
        { text: 'El funcionario Ejecutor o Juez de Ejecuciones Fiscales de La Corporación para el Desarrollo sostenible del área manejo especial la macarena – CORMACARENA  de conformidad con la Resolución No 2.6.05.112 de fecha 08 de Febrero de 2006, en uso de la Facultades de la ley 6 de 1992 y ley 1066 de 2006,', alignment: 'justify', fontSize: 12, margin: [0, 20, 0, 0] },
        { text: 'CONSIDERANDO', alignment: 'center', fontSize: 12, margin: [0, 15, 0, 0] },
        { text: `Que mediante resolución número PS-GJ.1.2.6.1.23.00171 de fecha treinta y uno (31) de marzo de 2023, se expide un mandamiento de pago a favor de CORMACARENA y en contra de la sociedad de ENERGIA ELECTRICA DEL DEPARTAMENTO DEL GUAVIARE - ENERGUAVIARE S.A E.S.P, identificada con Nit 822.004.680-9, en atención a la visita técnica de control y seguimiento ordenada mediante auto número PS-GJ.1.2.64.19.1084 de fecha veinte (20) de marzo de 2019.  Mandamiento de pago notificado por correo el día trece (13) de diciembre de 2023.`, alignment: 'justify', fontSize: 12, margin: [0, 25, 0, 0]},
        { text: `Que mediante oficio radicado en la corporación con el número 31591 de fecha veintisiete (27) de diciembre de 2023, la sociedad de ENERGIA ELECTRICA DEL DEPARTAMENTO DEL GUAVIARE - ENERGUAVIARE S.A E.S.P, a través de su apoderada judicial ARLENY AGUILAR HURTADO presento escrito de excepciones contra la resolución número PS-GJ.1.2.6.1.23.00171 de fecha treinta y uno (31) de marzo de 2023, por medio de la cual se expide un mandamiento de pago, a lo que me permito indicar lo siguiente:`, alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0]},
        { text: `Que conforme a lo señalado en el artículo 831 del Estatuto Tributario: Contra el mandamiento de pago procederán las siguientes excepciones:`, alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0]},
        { text: '1. Pago efectivo', alignment: 'justify', fontSize: 12, italics: true, underline: true, margin: [20, 15, 0, 0]},
        { text: '2. La existencia de acuerdo de pago', alignment: 'justify', fontSize: 12, italics: true, margin: [20, 0, 0, 0]},
        { text: '3. La falta de ejecutoria del título', alignment: 'justify', fontSize: 12, italics: true, margin: [20, 0, 0, 0]},
        { text: '4. La pérdida de ejecutoria del título por revocación o suspensión provisional del acto administrativo, hecha por autoridad competente.', alignment: 'justify', fontSize: 12, italics: true, margin: [20, 0, 0, 0]},
        { text: '5. Interposición de demanda de restablecimiento del derecho o de proceso de revisión de impuestos ante la jurisdicción de lo contencioso administrativo.', alignment: 'justify', fontSize: 12, italics: true, margin: [20, 0, 0, 0]},
        { text: '6. La prescripción de la acción de cobro.', alignment: 'justify', fontSize: 12, italics: true, margin: [20, 0, 0, 0]},
        { text: '7. La falta de título ejecutivo o incompetencia del funcionario que lo profirió.', alignment: 'justify', fontSize: 12, italics: true, margin: [20, 0, 0, 0]},
        { text: `Así las cosas y teniendo en cuenta el escrito de fecha veintisiete (27) de diciembre de 2023, donde mencionan el pago efectivo por la suma de NUEVE MILLONES CIENTO CINCUENTA Y DOS MIL DOSCIENTOS NOVENTA Y OCHO PESOS MCTE ($9.152.298) el día diez (10) de octubre de 2019, se procedió a verificar en el sistema contable de la corporación y se confirmó dicho pago en la fecha mencionada.`, alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0]},
        { text: `Conforme a lo anterior, se desprende del estudio del presente expediente, que la obligación que dio origen al proceso administrativo de cobro coactivo en contra la sociedad de ENERGIA ELECTRICA DEL DEPARTAMENTO DEL GUAVIARE - ENERGUAVIARE S.A E.S. P, identificada con Nit. 822.004.680-9, se encuentra paga en su totalidad, por lo que ha desaparecido la causa para proseguir el proceso.`, alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0]},
        { text: 'Conforme a lo anterior, esta Corporación', alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0] },
        { text: 'RESUELVE', alignment: 'center', fontSize: 12, margin: [0, 15, 0, 0] },
        { text: `ARTÍCULO PRIMERO: Declarar probada la excepción interpuesta por la sociedad de ENERGIA ELECTRICA DEL DEPARTAMENTO DEL GUAVIARE - ENERGUAVIARE S.A E.S.P, identificada con Nit. 822.004.680-9, contra la resolución número PS-GJ.1.2.6.1.23.00171 de fecha treinta y uno (31) de marzo de 2023, por medio de la cual se expide un mandamiento de pago, y conforme a las razones expuestas en el considerando del presente acto administrativo.`, alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0] },
        { text: `ARTÍCULO SEGUNDO: Decretar terminado el presente proceso administrativo de cobro coactivo en contra de la sociedad de ENERGIA ELECTRICA DEL DEPARTAMENTO DEL GUAVIARE - ENERGUAVIARE S.A E.S. P, identificada con Nit. 822.004.680-9, en atención a la visita técnica de control y seguimiento ordenada mediante auto número PS-GJ.1.2.64.19.1084 de fecha veinte (20) de marzo de 2019.`, alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0] },
        { text: `ARTÍCULO TERCERO: Notificar la presente Resolución, previa citación para que comparezca el ejecutado y/o apoderado o representante legal, dentro de los diez (10) siguientes a la misma. En caso contrario notificar conforme lo establece el Estatuto Tributario.`, alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0] },
        { text: `ARTÍCULO CUARTO: Contra la presente Resolución procede el recurso de reposición, conforme a lo dispuesto en el artículo 834 del Estatuto Tributario. `, alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0] },
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