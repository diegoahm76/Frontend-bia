

/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unused-vars */
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { logo_cormacarena_h } from '../../../conservacion/Reportes/logos/logos';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Grid } from '@mui/material';
import { AprobadoresProps } from "./models/interfaces";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const CobroPersuasivo: React.FC<any> = ({
  datos,
  id_deudor,
  id_subetapa,
  currentDeudor,
  dataClean,
  is_generate_resolucion,
  resolucion_url,
  aprobadores_data,
  set_form_table_values,
}: {datos: any,
    is_generate_resolucion: boolean,
    resolucion_url: any,
    id_deudor: number, id_subetapa: number,
    currentDeudor: any,
    dataClean: any,
    aprobadores_data: AprobadoresProps,
    set_form_table_values: (value: any) => void,
  }) => {

  const [visor, setVisor] = useState('');
  const [currentConsecutivo, setCurrentConsecutivo] = useState(0);
  const [localForm, setLocalForm] = useState<AprobadoresProps>({
    nombre_aprobador: '',
    cargo_aprobador: '',
    nombre_proyector: '',
    cargo_proyector: '',
    send_data: false,
  });
  let data: any[] = [];

  let sumaTotal: string | number = 0;

  useEffect(() => {
    if(datos?.id_deudor && is_generate_resolucion){
      data = []
      if(data.length === 0){
        data.push([datos.nombre, datos.monto_inicial, datos.valor_intereses, Number(datos.monto_inicial) + Number(datos.valor_intereses)])
        sumaTotal = (Number(datos.monto_inicial) + Number(datos.valor_intereses)).toLocaleString('es-CO');
      }
      generatePDF();
    }

    if(currentDeudor?.id_deudor && is_generate_resolucion && dataClean.length && !datos?.id_deudor){
      data = []
      dataClean.forEach((item: any) => {
      if(item.id_deudor === currentDeudor.id_deudor){
        data.push([item.nombre, item.monto_inicial, item.valor_intereses, (Number(item.monto_inicial) + Number(item.valor_intereses)).toLocaleString('es-CO')])
      }
      });
      const total1 = data.reduce((acc, curr) => acc + parseFloat(curr[1].replace(',', '')), 0);
      const total2 = data.reduce((acc, curr) => acc + parseFloat(curr[2].replace(',', '')), 0);
      data.push(['TOTAL', total1.toLocaleString('es-CO'), total2.toLocaleString('es-CO'), (total1 + total2).toLocaleString('es-CO')]);
      sumaTotal = (total1 + total2).toLocaleString('es-CO');
      if(aprobadores_data?.send_data){
        set_form_table_values({
          ...aprobadores_data,
          send_data: false
        })
      }
      generatePDF();
    }
  }, [is_generate_resolucion, currentDeudor, dataClean, datos, aprobadores_data]);

  const generatePDF = () => {
    const anchoPagina = 595.28;
    const content = true ? 'TASA USO DE AGUA' : 'TASA RETRIBUTIVA';
    const docDefinition = {
      pageSize: 'A4',
      pageMargins: [60, 80, 60, 80], // Márgenes de la página: [izquierda, arriba, derecha, abajo]
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
                { text: `${datos?.id_deudor?.nombres || currentDeudor.nombre_completo} ${datos?.id_deudor?.apellidos || ''}\n`, fontSize: 12 },
                { text: `CL 27 SUR 43-56\n`, fontSize: 12 },
                { text: `Teléfono: ${datos?.id_deudor?.telefono || ''}\n`, fontSize: 12 },
                { text: [
                    { text: `E-mail: `, fontSize: 12 },
                    { text: `${datos?.id_deudor?.email || currentDeudor.email}\n`, decoration: 'underline', color: 'blue', link: `emailto: ${datos?.id_deudor?.email || currentDeudor.email}` }
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
                    { text: `Nombre: ${datos?.id_deudor?.nombres || currentDeudor.nombre_completo} ${datos?.id_deudor?.apellidos || ''}`, alignment: 'left', fontSize: 9, margin: [ anchoPagina/2 + 30, 0, 0, 10 ] }
                  ],
                }
              ]
            }
          ],
        },
        { text: `ASUNTO: Cobro persuasivo visita de control y seguimiento expediente 3.37.1.014.016`, alignment: 'justify', fontSize: 12, margin: [0, 25, 0, 0] },
        // { text: `ASUNTO: Cobro Tasa por Utilización de Agua y ofrecimiento de descuento de intereses`, alignment: 'justify', fontSize: 12, margin: [0, 25, 0, 0] },
        // { text: `ASUNTO: Cobro Tasa Retributiva y ofrecimiento de descuento de intereses`, alignment: 'justify', fontSize: 12, margin: [0, 25, 0, 0] },
        { text: `En atención al asunto de la referencia y revisados los registros contables de nuestra entidad, se evidencia que ${datos?.id_deudor?.nombres || currentDeudor.nombre_completo} ${datos?.id_deudor?.apellidos || ''}, identificado con C.C./NIT No. ${datos?.id_deudor?.identificacion || currentDeudor.numero_identificacion} no ha cumplido con en el pago de las siguientes obligaciones:`, alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0] },
        {
          table: {
            headerRows: 2,
            widths: ['*', '*', '*', '*'],
            body: [
              [{text: content, colSpan: 4, alignment: 'center', fontSize: 11, bold: true}, {}, {}, {}],
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
        { text: `Intereses liquidados con corte a 28 de febrero de 2022 sin aplicar descuento del 80%`, alignment: 'center', fontSize: 9, margin: [0, 2, 0, 0] },
        { text: 'De acuerdo con lo anterior, comedidamente me permito invitarlo para que cancele la suma adeudada antes de la fecha de corte de intereses aquí establecida, o se comunique con la oficina del Grupo Rentas de CORMACARENA en donde le brindaremos la posibilidad de una facilidad de pago. De no tener respuesta suya, entenderemos su renuencia al pago, y nos veremos avocados a iniciar el cobro por vía coactiva con la onerosidad que esto le ocasionaría. ', alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0] },
        // { text: 'En este mismo sentido nos permitimos informarle que Cormacarena dando aplicación a  los artículos 46 y 47 de la ley 2155 del 14 de septiembre de 2021, adoptó beneficios para los usuarios con obligaciones pendientes por pagar que se generaron con anterioridad al 30 de junio del año 2021, por concepto de Tasas (Tasa por utilización de agua, tasa retributiva, tasa compensatoria por caza de fauna silvestre y tasa de aprovechamiento forestal) otorgando descuentos del 80% del valor de los intereses moratorios.', alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0] },
        // {
        //   text: [
        //     'De acuerdo con lo anterior, comedidamente me permito invitarlos a que cancelen la suma adeudada antes de la fecha de corte de intereses aquí establecida, ',
        //     { text: 'en caso de querer acogerse al beneficio de descuento', decoration: 'underline' },
        //     ' favor comunicarse al celular 310 206 1032 o al correo electrónico',
        //     { text: 'gruporentas@cormacarena.gov.co', decoration: 'underline', color: 'blue', link: 'mailto:gruporentas@cormacarena.gov.co'},
        //     ' manifestando su intención para generar la liquidación correspondiente.',
        //   ],
        //   alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0]
        // },
        {
          text: [
            'Así mismo se le informa que puede realizar el pago por concepto de ',
            { text: `Tasa por Utilización de Agua`, decoration: 'underline' },
            ' en las oficinas del banco BBVA - ahorros 854001674 convenio 33283, o en las oficinas de BANCOLOMBIA – ahorros 36400028723 convenio 87321.',
          ],
          alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0]
        },
        {
          text: [
            'También  puede efectuar su pago en línea o transferencia electrónica ingresando a la página web ',
            { text: 'www.cormacarena.gov.co', decoration: 'underline', color: 'blue', link: 'www.cormacarena.gov.co' },
            ' en el enlace «consulta y pagos, en el ítem recaudo de visitas de control y seguimiento, diligenciar el formulario».',
          ],
          alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0]
        },
        {
          text: [
            'En caso de realizar el pago, allegue copia de la consignación a los siguientes correos electrónicos ',
            { text: 'gruporentas@cormacarena.gov.co, ', decoration: 'underline', color: 'blue', link: 'mailto: gruporentas@cormacarena.gov.co' },
            { text: 'info@cormacarena.gov.co, ', decoration: 'underline', color: 'blue', link: 'mailto: info@cormacarena.gov.co' },
            ' o en las oficinas de CORMACARENA para que obre como prueba y dar por terminado este proceso.',
          ],
          alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0]
        },
        { text: 'Cualquier duda por favor comunicarse al teléfono 608-6730420 extensión 504', alignment: 'justify', fontSize: 12, margin: [0, 15, 0, 0] },
        { text: 'Cordialmente, ', alignment: 'justify', fontSize: 12, margin: [0, 20, 0, 0] },
        { text: '__________________________________', alignment: 'justify', fontSize: 12, margin: [0, 40, 0, 0] },
        { text: 'FERNANDO RUEDA LONDOÑO', alignment: 'justify', fontSize: 12, margin: [0, 2, 0, 0] },
        { text: 'Coordinador Grupo Rentas', alignment: 'justify', fontSize: 12, margin: [0, 2, 0, 0] },
        {
          table: {
            headerRows: 3,
            widths: ['auto', '*', '*', '*'],
            body: [
              [{text: 'Nombre y apellidos completos', colSpan: 2, alignment: 'center'}, {}, {text: 'Cargo', alignment: 'center'}, {text: 'Firma', alignment: 'center'}],
              ['Aprobó', {text: aprobadores_data?.nombre_aprobador, rowSpan: 2}, {text: aprobadores_data?.cargo_aprobador, rowSpan: 2}, {text: '', rowSpan: 2}],
              ['Revisó', {}, {}, {}],
              ['Proyectó', {text: aprobadores_data?.nombre_proyector}, {text: aprobadores_data?.cargo_proyector}, {}],
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

  return (
    <>
      <Grid
        container
        spacing={2}
        m={2}
        p={2}
      >
        <Grid item xs={12} sm={12}>
          <embed
            src={resolucion_url || visor}
            type="application/pdf"
            style={{display: 'flex', margin: 'auto'}}
            width="80%"
            height="900px"
          />
        </Grid>
      </Grid>
    </>
  )
}