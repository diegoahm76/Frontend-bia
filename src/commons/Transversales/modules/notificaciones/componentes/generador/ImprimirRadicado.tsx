/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useEffect, useState } from 'react';

import { api } from '../../../../../../api/axios';
import { type Persona } from '../../../../../../interfaces/globalModels';
import { useForm } from 'react-hook-form';
import { Box, Grid } from '@mui/material';
import BuscarModelo from '../../../../../../components/partials/getModels/BuscarModelo';
import { type GridColDef } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { type AuthSlice } from '../../../../../auth/interfaces';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks';

import PrimaryForm from '../../../../../../components/partials/form/PrimaryForm';

import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import logo_cormacarena_h from '../images/26_logocorma2_200x200.png';
import dayjs from 'dayjs';
import FormButton from '../../../../../../components/partials/form/FormButton';

interface IProps {
  visor: any;
  set_visor: any;
  get_values: any;
}
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const ImprimirRadicado = ({ visor, set_visor, get_values }: IProps) => {
  const dispatch = useAppDispatch();
  const { userinfo } = useSelector((state: AuthSlice) => state.auth);

  const [reporte, set_reporte] = useState<any[]>([]);
  const [doc, set_doc] = useState<jsPDF>(new jsPDF());
  const [doc_height, set_doc_height] = useState<number>(0);

  useEffect(() => {
    set_doc(new jsPDF());
    set_doc_height(doc.internal.pageSize.getHeight());
    const document = get_values('document');
    console.log(document);
    if (document === 1) {
      edicto();
    } else if (document === 2) {
      citacionV2();
    } else if (document === 3) {
      remisionAviso();
    } else if (document === 4) {
      constanciaCitacion();
    } else if (document === 5) {
      constanciaNotificacionPersonal();
    } else if (document === 6) {
      constanciaNotificacionAviso();
    } else if (document === 7) {
      constanciaPublicacionAviso();
    }
  }, []);
  const generarDocumento = () => {
    set_visor(doc.output('datauristring'));
    set_doc(new jsPDF('p', 'mm', 'letter'));
  };
  useEffect(() => {
    doc.setFont('Arial');
    doc.setFontSize(8);
    const document = get_values('document');
    console.log(document);
    if (document === 1) {
      edicto();
    } else if (document === 2) {
      citacionV2();
    } else if (document === 3) {
      remisionAviso();
    } else if (document === 4) {
      constanciaCitacion();
    } else if (document === 5) {
      constanciaNotificacionPersonal();
    } else if (document === 6) {
      constanciaNotificacionAviso();
    } else if (document === 7) {
      constanciaPublicacionAviso();
    }
  }, [doc]);

  const nueva_pagina: (
    doc: jsPDF,
    title: string,
    page_position: number
  ) => void = (doc: jsPDF, title: string, page_position: number) => {
    doc.addPage();
    doc.setPage(page_position);
    const document = get_values('document');
    console.log(document);
    if (document === 1) {
      edicto();
    } else if (document === 2) {
      citacionV2();
    } else if (document === 3) {
      remisionAviso();
    } else if (document === 4) {
      constanciaCitacion();
    } else if (document === 5) {
      constanciaNotificacionPersonal();
    } else if (document === 6) {
      constanciaNotificacionAviso();
    } else if (document === 7) {
      constanciaPublicacionAviso();
    }
  };

  const edicto: () => {
    title: string;
  } = () => {
    const fecha_aux = get_values('four') ?? '';
    const fecha_start = new Date(fecha_aux ?? ''); // Obtén el valor de fecha_start del objeto enviado por el formulario
    const year_start = fecha_start.getFullYear(); // Obtén el año
    const month_start = fecha_start.getMonth() + 1; // Obtén el mes (se suma 1 porque los meses comienzan en 0)
    const day_start = fecha_start.getDate(); // Obtén el día
    const fecha_desde = `${year_start}-${month_start
      .toString()
      .padStart(2, '0')}-${day_start.toString().padStart(2, '0')}`;

    const title = 'SE HACE SABER QUE:';
    let paragraphs = [
      `Que, ante la imposibilidad de notificar personalmente al señor (a) ${get_values(
        'five'
      )} Identificado (a) con número de cédula SIN IDENTIFICAR, el Art. 45 del Código Contencioso Administrativo se procede a fijar el presente Edicto de conformidad con fin de dar publicidad a Resolución No. ${get_values(
        'two'
      )} De fecha ${fecha_desde}, que obra dentro del expediente No 3.11.09.1151`,
      'CONSTANCIA DE FIJACIÓN: Se fija en un lugar visible de las oficinas de la Corporación para el desarrollo Sostenible del Área de manejo especial de Macarena CORMACARENA, por el término de (10) días, contados a partir del día 11 del mes OCTUBRE del año 2023 a la hora 08:00 AM.',
      'CONSTANCIA DE DESFIJACIÓN: Se desfija el presente EDICTO a las 06:00 PM del día 25 del mes de OCTUBRE del año 2023, después de haber permanecido por el término de (10) días legales.',
      'RESUELVE',
      'Artículo 1°.-. Declarar el CIERRE de todas las diligencias contenidas en el expediente N° PM-GA. 3.11.09.1151; y en consecuencia, el ARCHIVO del mismo, acorde con lo expuesto en precedencia.',
      'Artículo 2°. Los documentos que reposan en el presente expediente, podrán ser consultados en cualquier momento por parte de los funcionarios y/o contratistas de la Corporación que lo requieran, atendiendo al interés público y social que le asiste a lo resuelto en ellos.',
      `Artículo 3°.- Comisionar al grupo GEMA adscrito a la Subdirección de Autoridad Ambiental, para que realicen visita técnica de inspección ocular al inmueble de propiedad de la señora ${get_values(
        'five'
      )}, ubicado en ${get_values(
        'seven'
      )}, en esta ciudad, y culmine con la emisión del respectivo concepto técnico que permita esclarecer:`,
      'a) Si se han generado nuevas construcciones y/o modificaciones en el área del señalado inmueble.',
      'b) De ser así, se deberá identificar si estas confluyen en afectación y/o infracción ambiental y los presuntos responsables de su ejecución.',
      'c) El recaudo de cualquier elemento que reúna la condición de prueba y de mérito para el inicio de un procedimiento administrativo sancionatorio ambiental.',
      'Parágrafo único. - El concepto técnico que concluya lo observado en campo, deberá remitirse al grupo Archivo de la Subdirección Administrativa y Financiera, para que proceda a la apertura del nuevo expediente.',
      'Artículo 4°.-. Publíquese el contenido de la presente resolución en la página web de la Corporación.',
      `Artículo 5°.-. Notificar el contenido de la presente resolución a la señora ${get_values(
        'five'
      )}, en ${get_values('seven')}, en esta ciudad, ${
        get_values('six') || 'sin dirección electrónica'
      }, ni número telefónico, conforme a lo establecido en el artículo 44 del Decreto 01 de 1984, en caso de no realizarse la notificación personal, se notificará de conformidad con el artículo 45 del mismo Decreto.`,
      'Artículo 6°.-. Contra la presente Resolución procede el Recurso de Reposición, que podrá interponerse por escrito en la diligencia de notificación personal, o dentro de los cinco (05) días siguientes a ella, o a la notificación por edicto, o al vencimiento del término de publicación, según el caso, ante la Subdirección de Autoridad ambiental de la corporación de conformidad con el artículo 51 y 52 del decreto 01 de 1984',
      'NOTIFÍQUESE, PUBLÍQUESE Y CÚMPLASE',
      '',
      '',
      '',
      '____________________                                                                            ____________________',
      'Fija                                                                                                              Desfija',
      'JENNY MARGARITA GÓMEZ JARAMILLO	         	                     JENNY MARGARITA GÓMEZ JARAMILLO',
      'ABG. Notificaciones				        	                                    ABG. Notificaciones',
    ];
    autoTable(doc, {
      html: '#my-table',
    });
    autoTable(doc, {
      body: [
        ['', ''],
        ['', ''],
        ['', ''],
        // ...
      ],
      startY: 5,
      //headStyles: { fillColor: [255, 255, 255] }, // Estilo de la cabecera (en blanco para ocultarla)
      bodyStyles: { fillColor: [255, 255, 255] }, // Estilo del cuerpo (en blanco para ocultarla)
      alternateRowStyles: { fillColor: false },
      theme: 'grid', // Tema de la tabla (con bordes)
      styles: { lineColor: [0, 0, 0] },
      columnStyles: { 0: { cellWidth: 135 } },
      didParseCell: function (data) {
        if (data.row.index === 0 && data.column.index === 0) {
          data.cell.rowSpan = 2; // Combinar las celdas 1 y 2 de la primera columna
        }
      },
      didDrawCell: function (data) {
        // Ajustar el ancho de la primera columna
        if (data.column.index === 0 && data.row.index === 0) {
          const tableWidth = 180;
          const firstColumnWidth = tableWidth * 0.75; // 75% del ancho total de la tabla
          data.column.width = firstColumnWidth;
        }
        if (
          data.column.index === 0 &&
          (data.row.index === 0 || data.row.index === 1)
        ) {
          // Agregar la imagen a la celda
          //doc.addImage(logo_cormacarena_h, 'PNG', 160, 10, 40, 15);
          doc.addImage(
            logo_cormacarena_h,
            'JPEG',
            (180 * 0.75) / 2 - 50 / 4,
            data.cell.y,
            50,
            15
          ); // Ajusta los valores de posición y tamaño según sea necesario
        }
        if (data.column.index === 0 && data.row.index === 2) {
          const cellWidth = data.cell.width; // Ancho de la celda
          const cellHeight = data.cell.height; // Alto de la celda
          const text = 'EDÍCTO'; // Texto a dibujar
          const textWidth = doc.getStringUnitWidth(text) * 10; // Ancho del texto
          const textHeight = 5; // Alto del texto
          const xOffset = cellWidth / 2; // Desplazamiento horizontal para centrar el texto
          const yOffset = cellHeight / 2 + textHeight / 4; // Desplazamiento vertical para centrar el texto
          doc.setFont('Arial', 'bold');
          doc.text(text, data.cell.x + xOffset, data.cell.y + yOffset, {
            align: 'center',
          }); // Dibujar el texto centrado
        }
        if (data.column.index === 1 && data.row.index === 0) {
          const cellWidth = data.cell.width; // Ancho de la celda
          const cellHeight = data.cell.height; // Alto de la celda
          const text = 'Código: F-GJ-03'; // Texto a dibujar
          const textWidth = doc.getStringUnitWidth(text) * 10; // Ancho del texto
          const textHeight = 5; // Alto del texto
          const xOffset = cellWidth / 2; // Desplazamiento horizontal para centrar el texto
          const yOffset = cellHeight / 2 + textHeight / 4; // Desplazamiento vertical para centrar el texto
          doc.setFont('Arial', 'bold');
          doc.text(text, data.cell.x + xOffset, data.cell.y + yOffset, {
            align: 'center',
          }); // Dibujar el texto centrado
        }
        if (data.column.index === 1 && data.row.index === 1) {
          const cellWidth = data.cell.width; // Ancho de la celda
          const cellHeight = data.cell.height; // Alto de la celda
          const text = 'Versión: 04'; // Texto a dibujar
          const textWidth = doc.getStringUnitWidth(text) * 10; // Ancho del texto
          const textHeight = 5; // Alto del texto
          const xOffset = cellWidth / 2; // Desplazamiento horizontal para centrar el texto
          const yOffset = cellHeight / 2 + textHeight / 4; // Desplazamiento vertical para centrar el texto
          doc.setFont('Arial');
          doc.text(text, data.cell.x + xOffset, data.cell.y + yOffset, {
            align: 'center',
          }); // Dibujar el texto centrado
        }
        if (data.column.index === 1 && data.row.index === 2) {
          const cellWidth = data.cell.width; // Ancho de la celda
          const cellHeight = data.cell.height; // Alto de la celda
          const text = 'Fecha: 26/Abril/2021'; // Texto a dibujar
          const textWidth = doc.getStringUnitWidth(text) * 10; // Ancho del texto
          const textHeight = 5; // Alto del texto
          const xOffset = cellWidth / 2; // Desplazamiento horizontal para centrar el texto
          const yOffset = cellHeight / 2 + textHeight / 4; // Desplazamiento vertical para centrar el texto
          doc.setFont('Arial');
          doc.text(text, data.cell.x + xOffset, data.cell.y + yOffset, {
            align: 'center',
          }); // Dibujar el texto centrado
        }
      },
    });

    const lineHeight = 5;
    const linesPerPage = 55;
    let yPos = 35;
    doc.setFontSize(10);
    const titleWidth =
      (doc.getStringUnitWidth(title) * 10) / doc.internal.scaleFactor;
    const titleXPos = (doc.internal.pageSize.getWidth() - titleWidth) / 2;
    doc.text(title, titleXPos, yPos);
    yPos += lineHeight * 2;

    doc.setFontSize(10);
    paragraphs.forEach((paragraph, index) => {
      if (paragraph === '') {
        yPos += lineHeight * 2;
      } else {
        const paragraphLines = doc.splitTextToSize(paragraph, 180);
        const numLines = paragraphLines.length;
        const remainingLines = linesPerPage - yPos / lineHeight;
        if (numLines > remainingLines && index !== 0) {
          doc.addPage();
          yPos = 10;
        }
        console.log(paragraphLines);
        doc.text(paragraphLines, 10, yPos);
        yPos += lineHeight * numLines;
      }
    });
    const totalPages =
      Math.ceil(doc.internal.pageSize.height / lineHeight) / linesPerPage;
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.text(
        'Página ' + i + ' de ' + Math.floor(totalPages),
        170,
        doc.internal.pageSize.getHeight() - 10
      );
    }

    set_visor(doc.output('datauristring'));
    return { title };
  };

  const citacionV2: () => {
    title: string;
  } = () => {
    const fecha_aux = get_values('four') ?? '';
    const fecha_start = new Date(fecha_aux ?? ''); // Obtén el valor de fecha_start del objeto enviado por el formulario
    const year_start = fecha_start.getFullYear(); // Obtén el año
    const month_start = fecha_start.getMonth() + 1; // Obtén el mes (se suma 1 porque los meses comienzan en 0)
    const day_start = fecha_start.getDate(); // Obtén el día
    const fecha_desde = `${year_start}-${month_start
      .toString()
      .padStart(2, '0')}-${day_start.toString().padStart(2, '0')}`;

    const title = 'PS-GJ.1.2.23.13683';
    let paragraphs = [
      `En aplicación el artículo 44 CCA (  ) o artículo 68 CPACA (X), comedidamente lo citamos para que en el término de cinco (5) días, contados a partir de la fecha del recibo de esta citación, comparezca a la Corporación para el Desarrollo Sostenible del Área Especial de la Macarena “CORMACARENA” – Sede Barzal, para realizar diligencia de Notificación personal del Auto ( X) o Resolución ()  Nº PS-GJ 1.2.64.23.3841 de fecha 27/11/2023.`,
      `Se advierte que transcurrido dicho término sin realizarse notificación personal de la actuación, se procederá en fijación de Edicto (  ) o Notificación por aviso (X), en los términos del artículo 45 del CCA y artículo 69 del CPACA, respectivamente.`,
      `A su vez, solicitamos nos informe si autoriza recibir notificaciones y comunicaciones vía correo electrónico, en caso de ser afirmativo, por favor nos remita la dirección electrónica autorizada al correo notificaciones@cormacarena.gov.co, no obstante lo anterior, excepcionalmente podrá solicitar turno de lunes a viernes en el horario 8:00 a.m. a 12:00 m y 2:00 p.m. a 6:00 p.m. al celular 314 295 9086 , para asistir personalmente a la Entidad.`,
      `En caso de no autorizar la notificación electrónica, debe esperar a que se surta la notificación por aviso, para lo cual la Corporación le remitirá una copia del acto administrativo a su domicilio.`,
      'Cordialmente',
      '',
      '',
      '',
      '_______________________________',
      'JENNY MARGARITA GÓMEZ JARAMILLO',
      'ABG. Notificaciones',
    ];
    autoTable(doc, {
      html: '#my-table',
    });
    autoTable(doc, {
      body: [
        ['', ''],
        ['', ''],
        ['', ''],
        // ...
      ],
      startY: 5,
      //headStyles: { fillColor: [255, 255, 255] }, // Estilo de la cabecera (en blanco para ocultarla)
      bodyStyles: { fillColor: [255, 255, 255] }, // Estilo del cuerpo (en blanco para ocultarla)
      alternateRowStyles: { fillColor: false },
      theme: 'grid', // Tema de la tabla (con bordes)
      styles: { lineColor: [0, 0, 0] },
      columnStyles: { 0: { cellWidth: 135 } },
      didParseCell: function (data) {
        if (data.row.index === 0 && data.column.index === 0) {
          data.cell.rowSpan = 2; // Combinar las celdas 1 y 2 de la primera columna
        }
      },
      didDrawCell: function (data) {
        // Ajustar el ancho de la primera columna
        if (data.column.index === 0 && data.row.index === 0) {
          const tableWidth = 180;
          const firstColumnWidth = tableWidth * 0.75; // 75% del ancho total de la tabla
          data.column.width = firstColumnWidth;
        }
        if (
          data.column.index === 0 &&
          (data.row.index === 0 || data.row.index === 1)
        ) {
          // Agregar la imagen a la celda
          //doc.addImage(logo_cormacarena_h, 'PNG', 160, 10, 40, 15);
          doc.addImage(
            logo_cormacarena_h,
            'JPEG',
            (180 * 0.75) / 2 - 50 / 4,
            data.cell.y,
            50,
            15
          ); // Ajusta los valores de posición y tamaño según sea necesario
        }
        if (data.column.index === 0 && data.row.index === 2) {
          const cellWidth = data.cell.width; // Ancho de la celda
          const cellHeight = data.cell.height; // Alto de la celda
          const text = 'CITACIÓN'; // Texto a dibujar
          const textWidth = doc.getStringUnitWidth(text) * 10; // Ancho del texto
          const textHeight = 5; // Alto del texto
          const xOffset = cellWidth / 2; // Desplazamiento horizontal para centrar el texto
          const yOffset = cellHeight / 2 + textHeight / 4; // Desplazamiento vertical para centrar el texto
          doc.setFont('Arial', 'bold');
          doc.text(text, data.cell.x + xOffset, data.cell.y + yOffset, {
            align: 'center',
          }); // Dibujar el texto centrado
        }
        if (data.column.index === 1 && data.row.index === 0) {
          const cellWidth = data.cell.width; // Ancho de la celda
          const cellHeight = data.cell.height; // Alto de la celda
          const text = 'Código: F-GJ-01'; // Texto a dibujar
          const textWidth = doc.getStringUnitWidth(text) * 10; // Ancho del texto
          const textHeight = 5; // Alto del texto
          const xOffset = cellWidth / 2; // Desplazamiento horizontal para centrar el texto
          const yOffset = cellHeight / 2 + textHeight / 4; // Desplazamiento vertical para centrar el texto
          doc.setFont('Arial', 'bold');
          doc.text(text, data.cell.x + xOffset, data.cell.y + yOffset, {
            align: 'center',
          }); // Dibujar el texto centrado
        }
        if (data.column.index === 1 && data.row.index === 1) {
          const cellWidth = data.cell.width; // Ancho de la celda
          const cellHeight = data.cell.height; // Alto de la celda
          const text = 'Versión: 02'; // Texto a dibujar
          const textWidth = doc.getStringUnitWidth(text) * 10; // Ancho del texto
          const textHeight = 5; // Alto del texto
          const xOffset = cellWidth / 2; // Desplazamiento horizontal para centrar el texto
          const yOffset = cellHeight / 2 + textHeight / 4; // Desplazamiento vertical para centrar el texto
          doc.setFont('Arial');
          doc.text(text, data.cell.x + xOffset, data.cell.y + yOffset, {
            align: 'center',
          }); // Dibujar el texto centrado
        }
        if (data.column.index === 1 && data.row.index === 2) {
          const cellWidth = data.cell.width; // Ancho de la celda
          const cellHeight = data.cell.height; // Alto de la celda
          const text = 'Fecha: 07/jUL/2022'; // Texto a dibujar
          const textWidth = doc.getStringUnitWidth(text) * 10; // Ancho del texto
          const textHeight = 5; // Alto del texto
          const xOffset = cellWidth / 2; // Desplazamiento horizontal para centrar el texto
          const yOffset = cellHeight / 2 + textHeight / 4; // Desplazamiento vertical para centrar el texto
          doc.setFont('Arial');
          doc.text(text, data.cell.x + xOffset, data.cell.y + yOffset, {
            align: 'center',
          }); // Dibujar el texto centrado
        }
      },
    });

    const lineHeight = 5;
    const linesPerPage = 55;
    let yPos = 35;
    doc.setFontSize(10);
    const titleWidth =
      (doc.getStringUnitWidth(title) * 10) / doc.internal.scaleFactor;
    const titleXPos = (doc.internal.pageSize.getWidth() - titleWidth) / 2;
    doc.text(title, titleXPos, yPos);
    yPos += lineHeight;
    doc.text('Señores.', 10, yPos);
    yPos += lineHeight;
    doc.text(get_values('five') || '', 10, yPos);
    yPos += lineHeight;
    doc.text(get_values('six') || '', 10, yPos);
    yPos += lineHeight;
    doc.text('Teléfono: 3132574567', 10, yPos);
    yPos += lineHeight;
    doc.text(`E-mail: ${get_values('six') || 'No Registra'}`, 10, yPos);
    yPos += lineHeight;
    doc.text(`VILLAVICENCIO-META`, 10, yPos);
    yPos += lineHeight * 2;
    doc.setFont('Arial', 'bold');
    doc.text(
      `REF.: CITACIÓN PARA DILIGENCIAR DE NOTIFICACIÓN PERSONAL`,
      10,
      yPos
    );
    doc.setFont('Arial', 'normal');
    yPos += lineHeight;
    doc.text(`Expediente n° 3.372.5..4.3`, 10, yPos);
    yPos += lineHeight * 2;

    doc.setFontSize(10);
    paragraphs.forEach((paragraph, index) => {
      if (paragraph === '') {
        yPos += lineHeight * 2;
      } else {
        const paragraphLines = doc.splitTextToSize(paragraph, 180);
        const numLines = paragraphLines.length;
        const remainingLines = linesPerPage - yPos / lineHeight;
        if (numLines > remainingLines && index !== 0) {
          doc.addPage();
          yPos = 10;
        }
        console.log(paragraphLines);
        doc.text(paragraphLines, 10, yPos);
        yPos += lineHeight * numLines;
      }
    });
    const totalPages =
      Math.ceil(doc.internal.pageSize.height / lineHeight) / linesPerPage;
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.text(
        'Página ' + i + ' de ' + Math.floor(totalPages),
        170,
        doc.internal.pageSize.getHeight() - 10
      );
    }

    set_visor(doc.output('datauristring'));
    return { title };
  };

  const remisionAviso: () => {
    title: string;
  } = () => {
    const fecha_aux = get_values('four') ?? '';
    const fecha_start = new Date(fecha_aux ?? ''); // Obtén el valor de fecha_start del objeto enviado por el formulario
    const year_start = fecha_start.getFullYear(); // Obtén el año
    const month_start = fecha_start.getMonth() + 1; // Obtén el mes (se suma 1 porque los meses comienzan en 0)
    const day_start = fecha_start.getDate(); // Obtén el día
    const fecha_desde = `${year_start}-${month_start
      .toString()
      .padStart(2, '0')}-${day_start.toString().padStart(2, '0')}`;

    const title = 'PS-GJ.1.2.23.13683';
    let paragraphs = [
      `En aplicación del artículo 69 CPACA, comedidamente remitimos NOTIFICACIÓN POR AVISO del Auto (X) o Resolución ( )  Nº PS-GJ. 1.2.64.23.3165 de fecha  27/09/2023, expedido por SUBDIRECCIÓN DE AUTORIDAD AMBIENTAL, anexando a la presente copia informal de un ejemplar de la actuación administrativa, dejando expresa constancia que contra él SI ( X ) o NO (X) procede recurso de reposición dentro de los diez   (10) días siguientes a la fecha de surtida la presente notificación.`,
      `La presente notificación se considerará surtida al finalizar el día siguiente al de la entrega del aviso en el lugar de destino.`,
      `Se informa al usuario que cualquier solicitud, petición o descargos, puede ser enviada al correo de la Corporación: info@cormacarena.gov.co.`,
      'Cordialmente',
      '',
      '',
      '',
      '_______________________________',
      'JENNY MARGARITA GÓMEZ JARAMILLO',
      'ABG. Notificaciones',
    ];
    autoTable(doc, {
      html: '#my-table',
    });
    autoTable(doc, {
      body: [
        ['', ''],
        ['', ''],
        ['', ''],
        // ...
      ],
      startY: 5,
      //headStyles: { fillColor: [255, 255, 255] }, // Estilo de la cabecera (en blanco para ocultarla)
      bodyStyles: { fillColor: [255, 255, 255] }, // Estilo del cuerpo (en blanco para ocultarla)
      alternateRowStyles: { fillColor: false },
      theme: 'grid', // Tema de la tabla (con bordes)
      styles: { lineColor: [0, 0, 0] },
      columnStyles: { 0: { cellWidth: 135 } },
      didParseCell: function (data) {
        if (data.row.index === 0 && data.column.index === 0) {
          data.cell.rowSpan = 2; // Combinar las celdas 1 y 2 de la primera columna
        }
      },
      didDrawCell: function (data) {
        // Ajustar el ancho de la primera columna
        if (data.column.index === 0 && data.row.index === 0) {
          const tableWidth = 180;
          const firstColumnWidth = tableWidth * 0.75; // 75% del ancho total de la tabla
          data.column.width = firstColumnWidth;
        }
        if (
          data.column.index === 0 &&
          (data.row.index === 0 || data.row.index === 1)
        ) {
          // Agregar la imagen a la celda
          //doc.addImage(logo_cormacarena_h, 'PNG', 160, 10, 40, 15);
          doc.addImage(
            logo_cormacarena_h,
            'JPEG',
            (180 * 0.75) / 2 - 50 / 4,
            data.cell.y,
            50,
            15
          ); // Ajusta los valores de posición y tamaño según sea necesario
        }
        if (data.column.index === 0 && data.row.index === 2) {
          const cellWidth = data.cell.width; // Ancho de la celda
          const cellHeight = data.cell.height; // Alto de la celda
          const text = 'REMISIÓN POR AVISO'; // Texto a dibujar
          const textWidth = doc.getStringUnitWidth(text) * 10; // Ancho del texto
          const textHeight = 5; // Alto del texto
          const xOffset = cellWidth / 2; // Desplazamiento horizontal para centrar el texto
          const yOffset = cellHeight / 2 + textHeight / 4; // Desplazamiento vertical para centrar el texto
          doc.setFont('Arial', 'bold');
          doc.text(text, data.cell.x + xOffset, data.cell.y + yOffset, {
            align: 'center',
          }); // Dibujar el texto centrado
        }
        if (data.column.index === 1 && data.row.index === 0) {
          const cellWidth = data.cell.width; // Ancho de la celda
          const cellHeight = data.cell.height; // Alto de la celda
          const text = 'Código: F-GJ-02'; // Texto a dibujar
          const textWidth = doc.getStringUnitWidth(text) * 10; // Ancho del texto
          const textHeight = 5; // Alto del texto
          const xOffset = cellWidth / 2; // Desplazamiento horizontal para centrar el texto
          const yOffset = cellHeight / 2 + textHeight / 4; // Desplazamiento vertical para centrar el texto
          doc.setFont('Arial', 'bold');
          doc.text(text, data.cell.x + xOffset, data.cell.y + yOffset, {
            align: 'center',
          }); // Dibujar el texto centrado
        }
        if (data.column.index === 1 && data.row.index === 1) {
          const cellWidth = data.cell.width; // Ancho de la celda
          const cellHeight = data.cell.height; // Alto de la celda
          const text = 'Versión: 01'; // Texto a dibujar
          const textWidth = doc.getStringUnitWidth(text) * 10; // Ancho del texto
          const textHeight = 5; // Alto del texto
          const xOffset = cellWidth / 2; // Desplazamiento horizontal para centrar el texto
          const yOffset = cellHeight / 2 + textHeight / 4; // Desplazamiento vertical para centrar el texto
          doc.setFont('Arial');
          doc.text(text, data.cell.x + xOffset, data.cell.y + yOffset, {
            align: 'center',
          }); // Dibujar el texto centrado
        }
        if (data.column.index === 1 && data.row.index === 2) {
          const cellWidth = data.cell.width; // Ancho de la celda
          const cellHeight = data.cell.height; // Alto de la celda
          const text = 'Fecha: 26/Abril/2021'; // Texto a dibujar
          const textWidth = doc.getStringUnitWidth(text) * 10; // Ancho del texto
          const textHeight = 5; // Alto del texto
          const xOffset = cellWidth / 2; // Desplazamiento horizontal para centrar el texto
          const yOffset = cellHeight / 2 + textHeight / 4; // Desplazamiento vertical para centrar el texto
          doc.setFont('Arial');
          doc.text(text, data.cell.x + xOffset, data.cell.y + yOffset, {
            align: 'center',
          }); // Dibujar el texto centrado
        }
      },
    });

    const lineHeight = 5;
    const linesPerPage = 55;
    let yPos = 35;
    doc.setFontSize(10);
    const titleWidth =
      (doc.getStringUnitWidth(title) * 10) / doc.internal.scaleFactor;
    const titleXPos = (doc.internal.pageSize.getWidth() - titleWidth) / 2;
    doc.text(title, titleXPos, yPos);
    yPos += lineHeight;
    doc.text('Villavicencio,', 10, yPos);
    yPos += lineHeight * 2;
    doc.text('Señores.', 10, yPos);
    yPos += lineHeight;
    doc.text(get_values('five') || '', 10, yPos);
    yPos += lineHeight;
    doc.text(get_values('six') || '', 10, yPos);
    yPos += lineHeight;
    doc.text('Teléfono: 3132574567', 10, yPos);
    yPos += lineHeight;
    doc.text(`E-mail: ${get_values('six') || 'No Registra'}`, 10, yPos);
    yPos += lineHeight;
    doc.text(`VILLAVICENCIO-META`, 10, yPos);
    yPos += lineHeight * 2;
    doc.setFont('Arial', 'bold');
    doc.text(`REFERENCIA: REMISIÓN NOTIFICACIÓN POR AVISO`, 10, yPos);
    doc.setFont('Arial', 'normal');
    yPos += lineHeight;
    doc.text(`Expediente N° 3.372.5..4.3`, 10, yPos);
    yPos += lineHeight * 2;

    doc.setFontSize(10);
    paragraphs.forEach((paragraph, index) => {
      if (paragraph === '') {
        yPos += lineHeight * 2;
      } else {
        const paragraphLines = doc.splitTextToSize(paragraph, 180);
        const numLines = paragraphLines.length;
        const remainingLines = linesPerPage - yPos / lineHeight;
        if (numLines > remainingLines && index !== 0) {
          doc.addPage();
          yPos = 10;
        }
        console.log(paragraphLines);
        doc.text(paragraphLines, 10, yPos);
        yPos += lineHeight * numLines;
      }
    });
    const totalPages =
      Math.ceil(doc.internal.pageSize.height / lineHeight) / linesPerPage;
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.text(
        'Página ' + i + ' de ' + Math.floor(totalPages),
        170,
        doc.internal.pageSize.getHeight() - 10
      );
    }

    set_visor(doc.output('datauristring'));
    return { title };
  };

  const constanciaCitacion: () => {
    title: string;
  } = () => {
    const fecha_aux = get_values('four') ?? '';
    const fecha_start = new Date(fecha_aux ?? ''); // Obtén el valor de fecha_start del objeto enviado por el formulario
    const year_start = fecha_start.getFullYear(); // Obtén el año
    const month_start = fecha_start.getMonth() + 1; // Obtén el mes (se suma 1 porque los meses comienzan en 0)
    const day_start = fecha_start.getDate(); // Obtén el día
    const fecha_desde = `${year_start}-${month_start
      .toString()
      .padStart(2, '0')}-${day_start.toString().padStart(2, '0')}`;

    const title = 'PS-GJ.1.2.23.13683';
    let paragraphs = [
      `En Villavicencio, el día  04  del mes  AGOSTO del año  2023  se procede a realizar citación al señor(a) (X) empresa (  )  JOSÉ ROBERT TRIANA SÁNCHEZ, identificado (a) con cédula de ciudadanía (X) o NIT ( ) No.  1.123.140.854, para que en término de cinco (5) días siguientes a la fijación de la presente, comparezca a la Corporación para el Desarrollo Sostenible del Área Especial de la Macarena “CORMACARENA” para diligencia de Notificación personal de:`,
      `CONSTANCIA DE FIJACIÓN. Siendo las 08:00 (X) AM (  ) PM del día  04  del mes AGOSTO del año 2023, se fija la presente  citación en la página web de la Corporación o en un lugar de acceso al público.`,
      `SCONSTANCIA DE DESFIJACIÓN: Siendo las 06:00 (  ) AM (X) PM del día  11  del mes AGOSTO del año 2023, se desfija la presente citación, después de haber permanecido por el término de cinco (05) días legales.`,
      'Transcurrido dicho término sin realizarse notificación personal de la actuación, se procederá a la Notificación por aviso, en los términos del artículo 69 del CPACA.',
      '',
      '',
      '',
      '',
      '_______________________________',
      'JENNY MARGARITA GÓMEZ JARAMILLO',
      'ABG. Notificaciones',
    ];
    autoTable(doc, {
      html: '#my-table',
    });
    autoTable(doc, {
      body: [
        ['', ''],
        ['', ''],
        ['', ''],
        // ...
      ],
      startY: 5,
      //headStyles: { fillColor: [255, 255, 255] }, // Estilo de la cabecera (en blanco para ocultarla)
      bodyStyles: { fillColor: [255, 255, 255] }, // Estilo del cuerpo (en blanco para ocultarla)
      alternateRowStyles: { fillColor: false },
      theme: 'grid', // Tema de la tabla (con bordes)
      styles: { lineColor: [0, 0, 0] },
      columnStyles: { 0: { cellWidth: 135 } },
      didParseCell: function (data) {
        if (data.row.index === 0 && data.column.index === 0) {
          data.cell.rowSpan = 2; // Combinar las celdas 1 y 2 de la primera columna
        }
      },
      didDrawCell: function (data) {
        // Ajustar el ancho de la primera columna
        if (data.column.index === 0 && data.row.index === 0) {
          const tableWidth = 180;
          const firstColumnWidth = tableWidth * 0.75; // 75% del ancho total de la tabla
          data.column.width = firstColumnWidth;
        }
        if (
          data.column.index === 0 &&
          (data.row.index === 0 || data.row.index === 1)
        ) {
          // Agregar la imagen a la celda
          //doc.addImage(logo_cormacarena_h, 'PNG', 160, 10, 40, 15);
          doc.addImage(
            logo_cormacarena_h,
            'JPEG',
            (180 * 0.75) / 2 - 50 / 4,
            data.cell.y,
            50,
            15
          ); // Ajusta los valores de posición y tamaño según sea necesario
        }
        if (data.column.index === 0 && data.row.index === 2) {
          const cellWidth = data.cell.width; // Ancho de la celda
          const cellHeight = data.cell.height; // Alto de la celda
          const text = 'CONSTANCIA DE PUBLICACIÓN DE CITACIÓN'; // Texto a dibujar
          const textWidth = doc.getStringUnitWidth(text) * 10; // Ancho del texto
          const textHeight = 5; // Alto del texto
          const xOffset = cellWidth / 2; // Desplazamiento horizontal para centrar el texto
          const yOffset = cellHeight / 2 + textHeight / 4; // Desplazamiento vertical para centrar el texto
          doc.setFont('Arial', 'bold');
          doc.text(text, data.cell.x + xOffset, data.cell.y + yOffset, {
            align: 'center',
          }); // Dibujar el texto centrado
        }
        if (data.column.index === 1 && data.row.index === 0) {
          const cellWidth = data.cell.width; // Ancho de la celda
          const cellHeight = data.cell.height; // Alto de la celda
          const text = 'Código: F-GJ-05'; // Texto a dibujar
          const textWidth = doc.getStringUnitWidth(text) * 10; // Ancho del texto
          const textHeight = 5; // Alto del texto
          const xOffset = cellWidth / 2; // Desplazamiento horizontal para centrar el texto
          const yOffset = cellHeight / 2 + textHeight / 4; // Desplazamiento vertical para centrar el texto
          doc.setFont('Arial', 'bold');
          doc.text(text, data.cell.x + xOffset, data.cell.y + yOffset, {
            align: 'center',
          }); // Dibujar el texto centrado
        }
        if (data.column.index === 1 && data.row.index === 1) {
          const cellWidth = data.cell.width; // Ancho de la celda
          const cellHeight = data.cell.height; // Alto de la celda
          const text = 'Versión: 02'; // Texto a dibujar
          const textWidth = doc.getStringUnitWidth(text) * 10; // Ancho del texto
          const textHeight = 5; // Alto del texto
          const xOffset = cellWidth / 2; // Desplazamiento horizontal para centrar el texto
          const yOffset = cellHeight / 2 + textHeight / 4; // Desplazamiento vertical para centrar el texto
          doc.setFont('Arial');
          doc.text(text, data.cell.x + xOffset, data.cell.y + yOffset, {
            align: 'center',
          }); // Dibujar el texto centrado
        }
        if (data.column.index === 1 && data.row.index === 2) {
          const cellWidth = data.cell.width; // Ancho de la celda
          const cellHeight = data.cell.height; // Alto de la celda
          const text = 'Fecha: 26/Abril/2021'; // Texto a dibujar
          const textWidth = doc.getStringUnitWidth(text) * 10; // Ancho del texto
          const textHeight = 5; // Alto del texto
          const xOffset = cellWidth / 2; // Desplazamiento horizontal para centrar el texto
          const yOffset = cellHeight / 2 + textHeight / 4; // Desplazamiento vertical para centrar el texto
          doc.setFont('Arial');
          doc.text(text, data.cell.x + xOffset, data.cell.y + yOffset, {
            align: 'center',
          }); // Dibujar el texto centrado
        }
      },
    });

    const lineHeight = 5;
    const linesPerPage = 55;
    let yPos = 35;
    doc.setFontSize(10);

    doc.setFontSize(10);
    paragraphs.forEach((paragraph, index) => {
      if (paragraph === '') {
        yPos += lineHeight * 2;
      } else {
        const paragraphLines = doc.splitTextToSize(paragraph, 180);
        const numLines = paragraphLines.length;
        const remainingLines = linesPerPage - yPos / lineHeight;
        if (numLines > remainingLines && index !== 0) {
          doc.addPage();
          yPos = 10;
        }
        console.log(paragraphLines);
        doc.text(paragraphLines, 10, yPos);
        yPos += lineHeight * numLines;
      }
      if (index === 0) {
        doc.text('Auto (X) o Resolución (),', 10, yPos);
        yPos += lineHeight;
        doc.text('No. PS-GJ 1.2.64.23.25.34.', 10, yPos);
        yPos += lineHeight;
        doc.text(
          `Fecha del acto administrativo: ${fecha_desde || 'No Registra'}`,
          10,
          yPos
        );
        yPos += lineHeight;
        doc.text('Expediente No 3.47.2.016.037', 10, yPos);
        yPos += lineHeight;
        doc.text(
          'Emitido (a) por SUBDIRECCIÓN DE AUTORIDAD AMBIENTAL',
          10,
          yPos
        );
        yPos += lineHeight * 2;
      }
    });
    const totalPages =
      Math.ceil(doc.internal.pageSize.height / lineHeight) / linesPerPage;
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.text(
        'Página ' + i + ' de ' + Math.floor(totalPages),
        170,
        doc.internal.pageSize.getHeight() - 10
      );
    }

    set_visor(doc.output('datauristring'));
    return { title };
  };

  const constanciaNotificacionPersonal: () => {
    title: string;
  } = () => {
    const fecha_aux = get_values('four') ?? '';
    const fecha_start = new Date(fecha_aux ?? ''); // Obtén el valor de fecha_start del objeto enviado por el formulario
    const year_start = fecha_start.getFullYear(); // Obtén el año
    const month_start = fecha_start.getMonth() + 1; // Obtén el mes (se suma 1 porque los meses comienzan en 0)
    const day_start = fecha_start.getDate(); // Obtén el día
    const fecha_desde = `${year_start}-${month_start
      .toString()
      .padStart(2, '0')}-${day_start.toString().padStart(2, '0')}`;

    const title = 'PS-GJ.1.2.23.13683';
    let paragraphs = [
      `En Villavicencio, el día 17, del mes OCTUBRE, del año 2023, siendo las 09:30   AM (X) PM ( ) se procede a hacer notificación personal al señor(a) (X) empresa  ( ) JOSE ALEXANDER GONZALES MORILLO, identificado (a) con cédula de ciudadanía (X) o   NIT ( ) No.  13.553.983 de: VENEZUELA `,
      `Dejando  expresa  constancia  que  se  hace  entrega al interesado (a)  de una copia íntegra, auténtica y gratuita de la actuación administrativa, y que contra el acto procede SI ( ) o NO (X) recurso de reposición que deberá interponerse por escrito dentro de la presente diligencia, o dentro de los (-) días siguientes a esta notificación, el cual lo podrá interponer ante el ---.`,
      `Para constancia se firma: `,
      '',
      '',
      '',
      '',
      '_______________________________',
      'NOTIFICADOR',
      '',
      '',
      '',
      '',
      '_______________________________',
      'NOTIFICADO',
    ];
    autoTable(doc, {
      html: '#my-table',
    });
    autoTable(doc, {
      body: [
        ['', ''],
        ['', ''],
        ['', ''],
        // ...
      ],
      startY: 5,
      //headStyles: { fillColor: [255, 255, 255] }, // Estilo de la cabecera (en blanco para ocultarla)
      bodyStyles: { fillColor: [255, 255, 255] }, // Estilo del cuerpo (en blanco para ocultarla)
      alternateRowStyles: { fillColor: false },
      theme: 'grid', // Tema de la tabla (con bordes)
      styles: { lineColor: [0, 0, 0] },
      columnStyles: { 0: { cellWidth: 135 } },
      didParseCell: function (data) {
        if (data.row.index === 0 && data.column.index === 0) {
          data.cell.rowSpan = 2; // Combinar las celdas 1 y 2 de la primera columna
        }
      },
      didDrawCell: function (data) {
        // Ajustar el ancho de la primera columna
        if (data.column.index === 0 && data.row.index === 0) {
          const tableWidth = 180;
          const firstColumnWidth = tableWidth * 0.75; // 75% del ancho total de la tabla
          data.column.width = firstColumnWidth;
        }
        if (
          data.column.index === 0 &&
          (data.row.index === 0 || data.row.index === 1)
        ) {
          // Agregar la imagen a la celda
          //doc.addImage(logo_cormacarena_h, 'PNG', 160, 10, 40, 15);
          doc.addImage(
            logo_cormacarena_h,
            'JPEG',
            (180 * 0.75) / 2 - 50 / 4,
            data.cell.y,
            50,
            15
          ); // Ajusta los valores de posición y tamaño según sea necesario
        }
        if (data.column.index === 0 && data.row.index === 2) {
          const cellWidth = data.cell.width; // Ancho de la celda
          const cellHeight = data.cell.height; // Alto de la celda
          const text = 'CONSTANCIA DE NOTIFICACIÓN PERSONAL'; // Texto a dibujar
          const textWidth = doc.getStringUnitWidth(text) * 10; // Ancho del texto
          const textHeight = 5; // Alto del texto
          const xOffset = cellWidth / 2; // Desplazamiento horizontal para centrar el texto
          const yOffset = cellHeight / 2 + textHeight / 4; // Desplazamiento vertical para centrar el texto
          doc.setFont('Arial', 'bold');
          doc.text(text, data.cell.x + xOffset, data.cell.y + yOffset, {
            align: 'center',
          }); // Dibujar el texto centrado
        }
        if (data.column.index === 1 && data.row.index === 0) {
          const cellWidth = data.cell.width; // Ancho de la celda
          const cellHeight = data.cell.height; // Alto de la celda
          const text = 'Código: F-GJ-04'; // Texto a dibujar
          const textWidth = doc.getStringUnitWidth(text) * 10; // Ancho del texto
          const textHeight = 5; // Alto del texto
          const xOffset = cellWidth / 2; // Desplazamiento horizontal para centrar el texto
          const yOffset = cellHeight / 2 + textHeight / 4; // Desplazamiento vertical para centrar el texto
          doc.setFont('Arial', 'bold');
          doc.text(text, data.cell.x + xOffset, data.cell.y + yOffset, {
            align: 'center',
          }); // Dibujar el texto centrado
        }
        if (data.column.index === 1 && data.row.index === 1) {
          const cellWidth = data.cell.width; // Ancho de la celda
          const cellHeight = data.cell.height; // Alto de la celda
          const text = 'Versión: 07'; // Texto a dibujar
          const textWidth = doc.getStringUnitWidth(text) * 10; // Ancho del texto
          const textHeight = 5; // Alto del texto
          const xOffset = cellWidth / 2; // Desplazamiento horizontal para centrar el texto
          const yOffset = cellHeight / 2 + textHeight / 4; // Desplazamiento vertical para centrar el texto
          doc.setFont('Arial');
          doc.text(text, data.cell.x + xOffset, data.cell.y + yOffset, {
            align: 'center',
          }); // Dibujar el texto centrado
        }
        if (data.column.index === 1 && data.row.index === 2) {
          const cellWidth = data.cell.width; // Ancho de la celda
          const cellHeight = data.cell.height; // Alto de la celda
          const text = 'Fecha: 26/Abril/2021'; // Texto a dibujar
          const textWidth = doc.getStringUnitWidth(text) * 10; // Ancho del texto
          const textHeight = 5; // Alto del texto
          const xOffset = cellWidth / 2; // Desplazamiento horizontal para centrar el texto
          const yOffset = cellHeight / 2 + textHeight / 4; // Desplazamiento vertical para centrar el texto
          doc.setFont('Arial');
          doc.text(text, data.cell.x + xOffset, data.cell.y + yOffset, {
            align: 'center',
          }); // Dibujar el texto centrado
        }
      },
    });

    const lineHeight = 5;
    const linesPerPage = 55;
    let yPos = 35;
    doc.setFontSize(10);

    doc.setFontSize(10);
    paragraphs.forEach((paragraph, index) => {
      if (paragraph === '') {
        yPos += lineHeight * 2;
      } else {
        const paragraphLines = doc.splitTextToSize(paragraph, 180);
        const numLines = paragraphLines.length;
        const remainingLines = linesPerPage - yPos / lineHeight;
        if (numLines > remainingLines && index !== 0) {
          doc.addPage();
          yPos = 10;
        }
        console.log(paragraphLines);
        doc.text(paragraphLines, 10, yPos);
        yPos += lineHeight * numLines;
      }
      if (index === 0) {
        doc.text('Auto (X) o Resolución (),', 10, yPos);
        yPos += lineHeight;
        doc.text('No. PS-GJ 1.2.64.23.25.34.', 10, yPos);
        yPos += lineHeight;
        doc.text(
          `Fecha del acto administrativo: ${fecha_desde || 'No Registra'}`,
          10,
          yPos
        );
        yPos += lineHeight;
        doc.text('Expediente No 3.47.2.016.037', 10, yPos);
        yPos += lineHeight;
        doc.text(
          'Emitido (a) por SUBDIRECCIÓN DE AUTORIDAD AMBIENTAL',
          10,
          yPos
        );
        yPos += lineHeight * 2;
      }
    });
    const totalPages =
      Math.ceil(doc.internal.pageSize.height / lineHeight) / linesPerPage;
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.text(
        'Página ' + i + ' de ' + Math.floor(totalPages),
        170,
        doc.internal.pageSize.getHeight() - 10
      );
    }

    set_visor(doc.output('datauristring'));
    return { title };
  };

  const constanciaNotificacionAviso: () => {
    title: string;
  } = () => {
    const fecha_aux = get_values('four') ?? '';
    const fecha_start = new Date(fecha_aux ?? ''); // Obtén el valor de fecha_start del objeto enviado por el formulario
    const year_start = fecha_start.getFullYear(); // Obtén el año
    const month_start = fecha_start.getMonth() + 1; // Obtén el mes (se suma 1 porque los meses comienzan en 0)
    const day_start = fecha_start.getDate(); // Obtén el día
    const fecha_desde = `${year_start}-${month_start
      .toString()
      .padStart(2, '0')}-${day_start.toString().padStart(2, '0')}`;

    const title = 'PS-GJ.1.2.23.13683';
    let paragraphs = [
      `En Villavicencio, el día 26 del mes  OCTUBRE del año 2023 se procede a realizar la Notificación por Aviso al señor(a) (X) empresa ( )  GERMÁN CELY PALACIOS,  identificado (a) con cédula de ciudadanía (X) o NIT  ( ) No.  17.334.194,  de -------------`,
      `Dejando  expresa  constancia  que  contra él SI ( ) o NO (X) procede recurso de reposición, dentro de los (X) días siguientes a la fecha de surtida la presente notificación, el cual lo podrá interponer ante ----.`,
      `CONSTANCIA DE FIJACIÓN. Siendo las 08:00 (X) AM (  ) PM del día 26 del mes OCTUBRE del año 2023, se fija el presente  aviso en la página web de la Corporación y/o en un lugar de acceso al público.`,
      `Se advierte que la notificación se entiende surtida al finalizar el día siguiente de la desfijación del presente Aviso, es decir, se encuentra NOTIFICADO el día  02  del mes NOVIEMBRE del año 2023 conforme a lo establecido en el artículo 69 de la Ley 1437 de 2011.`,
      '',
      '',
      '',
      '',
      '_______________________________',
      'JENNY MARGARITA GÓMEZ JARAMILLO',
      'Abg. Notificaciones',
    ];
    autoTable(doc, {
      html: '#my-table',
    });
    autoTable(doc, {
      body: [
        ['', ''],
        ['', ''],
        ['', ''],
        // ...
      ],
      startY: 5,
      //headStyles: { fillColor: [255, 255, 255] }, // Estilo de la cabecera (en blanco para ocultarla)
      bodyStyles: { fillColor: [255, 255, 255] }, // Estilo del cuerpo (en blanco para ocultarla)
      alternateRowStyles: { fillColor: false },
      theme: 'grid', // Tema de la tabla (con bordes)
      styles: { lineColor: [0, 0, 0] },
      columnStyles: { 0: { cellWidth: 135 } },
      didParseCell: function (data) {
        if (data.row.index === 0 && data.column.index === 0) {
          data.cell.rowSpan = 2; // Combinar las celdas 1 y 2 de la primera columna
        }
      },
      didDrawCell: function (data) {
        // Ajustar el ancho de la primera columna
        if (data.column.index === 0 && data.row.index === 0) {
          const tableWidth = 180;
          const firstColumnWidth = tableWidth * 0.75; // 75% del ancho total de la tabla
          data.column.width = firstColumnWidth;
        }
        if (
          data.column.index === 0 &&
          (data.row.index === 0 || data.row.index === 1)
        ) {
          // Agregar la imagen a la celda
          //doc.addImage(logo_cormacarena_h, 'PNG', 160, 10, 40, 15);
          doc.addImage(
            logo_cormacarena_h,
            'JPEG',
            (180 * 0.75) / 2 - 50 / 4,
            data.cell.y,
            50,
            15
          ); // Ajusta los valores de posición y tamaño según sea necesario
        }
        if (data.column.index === 0 && data.row.index === 2) {
          const cellWidth = data.cell.width; // Ancho de la celda
          const cellHeight = data.cell.height; // Alto de la celda
          const text = 'CONSTANCIA DE PUBLICACIÓN DE NOTIFICACIÓN POR AVISO'; // Texto a dibujar
          const textWidth = doc.getStringUnitWidth(text) * 10; // Ancho del texto
          const textHeight = 5; // Alto del texto
          const xOffset = cellWidth / 2; // Desplazamiento horizontal para centrar el texto
          const yOffset = cellHeight / 2 + textHeight / 4; // Desplazamiento vertical para centrar el texto
          doc.setFont('Arial', 'bold');
          doc.text(text, data.cell.x + xOffset, data.cell.y + yOffset, {
            align: 'center',
          }); // Dibujar el texto centrado
        }
        if (data.column.index === 1 && data.row.index === 0) {
          const cellWidth = data.cell.width; // Ancho de la celda
          const cellHeight = data.cell.height; // Alto de la celda
          const text = 'Código: F-GJ-06'; // Texto a dibujar
          const textWidth = doc.getStringUnitWidth(text) * 10; // Ancho del texto
          const textHeight = 5; // Alto del texto
          const xOffset = cellWidth / 2; // Desplazamiento horizontal para centrar el texto
          const yOffset = cellHeight / 2 + textHeight / 4; // Desplazamiento vertical para centrar el texto
          doc.setFont('Arial', 'bold');
          doc.text(text, data.cell.x + xOffset, data.cell.y + yOffset, {
            align: 'center',
          }); // Dibujar el texto centrado
        }
        if (data.column.index === 1 && data.row.index === 1) {
          const cellWidth = data.cell.width; // Ancho de la celda
          const cellHeight = data.cell.height; // Alto de la celda
          const text = 'Versión: 02'; // Texto a dibujar
          const textWidth = doc.getStringUnitWidth(text) * 10; // Ancho del texto
          const textHeight = 5; // Alto del texto
          const xOffset = cellWidth / 2; // Desplazamiento horizontal para centrar el texto
          const yOffset = cellHeight / 2 + textHeight / 4; // Desplazamiento vertical para centrar el texto
          doc.setFont('Arial');
          doc.text(text, data.cell.x + xOffset, data.cell.y + yOffset, {
            align: 'center',
          }); // Dibujar el texto centrado
        }
        if (data.column.index === 1 && data.row.index === 2) {
          const cellWidth = data.cell.width; // Ancho de la celda
          const cellHeight = data.cell.height; // Alto de la celda
          const text = 'Fecha: 26/Abril/2021'; // Texto a dibujar
          const textWidth = doc.getStringUnitWidth(text) * 10; // Ancho del texto
          const textHeight = 5; // Alto del texto
          const xOffset = cellWidth / 2; // Desplazamiento horizontal para centrar el texto
          const yOffset = cellHeight / 2 + textHeight / 4; // Desplazamiento vertical para centrar el texto
          doc.setFont('Arial');
          doc.text(text, data.cell.x + xOffset, data.cell.y + yOffset, {
            align: 'center',
          }); // Dibujar el texto centrado
        }
      },
    });

    const lineHeight = 5;
    const linesPerPage = 55;
    let yPos = 35;
    doc.setFontSize(10);

    doc.setFontSize(10);
    paragraphs.forEach((paragraph, index) => {
      if (paragraph === '') {
        yPos += lineHeight * 2;
      } else {
        const paragraphLines = doc.splitTextToSize(paragraph, 180);
        const numLines = paragraphLines.length;
        const remainingLines = linesPerPage - yPos / lineHeight;
        if (numLines > remainingLines && index !== 0) {
          doc.addPage();
          yPos = 10;
        }
        console.log(paragraphLines);
        doc.text(paragraphLines, 10, yPos);
        yPos += lineHeight * numLines;
      }
      if (index === 0) {
        doc.text('Auto (X) o Resolución (),', 10, yPos);
        yPos += lineHeight;
        doc.text('No. PS-GJ 1.2.64.23.25.34.', 10, yPos);
        yPos += lineHeight;
        doc.text(
          `Fecha del acto administrativo: ${fecha_desde || 'No Registra'}`,
          10,
          yPos
        );
        yPos += lineHeight;
        doc.text('Expediente No 3.47.2.016.037', 10, yPos);
        yPos += lineHeight;
        doc.text(
          'Emitido (a) por SUBDIRECCIÓN DE AUTORIDAD AMBIENTAL',
          10,
          yPos
        );
        yPos += lineHeight * 2;
      }
    });
    const totalPages =
      Math.ceil(doc.internal.pageSize.height / lineHeight) / linesPerPage;
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.text(
        'Página ' + i + ' de ' + Math.floor(totalPages),
        170,
        doc.internal.pageSize.getHeight() - 10
      );
    }

    set_visor(doc.output('datauristring'));
    return { title };
  };
  const constanciaPublicacionAviso: () => {
    title: string;
  } = () => {
    const fecha_aux = get_values('four') ?? '';
    const fecha_start = new Date(fecha_aux ?? ''); // Obtén el valor de fecha_start del objeto enviado por el formulario
    const year_start = fecha_start.getFullYear(); // Obtén el año
    const month_start = fecha_start.getMonth() + 1; // Obtén el mes (se suma 1 porque los meses comienzan en 0)
    const day_start = fecha_start.getDate(); // Obtén el día
    const fecha_desde = `${year_start}-${month_start
      .toString()
      .padStart(2, '0')}-${day_start.toString().padStart(2, '0')}`;

    const title = 'PS-GJ.1.2.23.13683';
    let paragraphs = [
      `En Villavicencio, el día 26 del mes  OCTUBRE del año 2023 se procede a realizar la Notificación por Aviso al señor(a) (X) empresa ( )  GERMÁN CELY PALACIOS,  identificado (a) con cédula de ciudadanía (X) o NIT  ( ) No.  17.334.194,  de -------------`,
      `Dejando  expresa  constancia  que  contra él SI ( ) o NO (X) procede recurso de reposición, dentro de los (X) días siguientes a la fecha de surtida la presente notificación, el cual lo podrá interponer ante ----.`,
      `CONSTANCIA DE FIJACIÓN. Siendo las 08:00 (X) AM (  ) PM del día 26 del mes OCTUBRE del año 2023, se fija el presente  aviso en la página web de la Corporación y/o en un lugar de acceso al público.`,
      `CONSTANCIA DE DESFIJACIÓN: Siendo las 08:00 (X) AM () PM del día 01 del mes NOVIEMBRE del año 2023, se desfija el presente  aviso, después de haber permanecido por el término de cinco (05) días legales.`,
      `Se advierte que la notificación se entiende surtida al finalizar el día siguiente de la desfijación del presente Aviso, es decir, se encuentra NOTIFICADO el día  02  del mes NOVIEMBRE del año 2023 conforme a lo establecido en el artículo 69 de la Ley 1437 de 2011.`,
      '',
      '',
      '',
      '',
      '_______________________________',
      'JENNY MARGARITA GÓMEZ JARAMILLO',
      'Abg. Notificaciones',
    ];
    autoTable(doc, {
      html: '#my-table',
    });
    autoTable(doc, {
      body: [
        ['', ''],
        ['', ''],
        ['', ''],
        // ...
      ],
      startY: 5,
      //headStyles: { fillColor: [255, 255, 255] }, // Estilo de la cabecera (en blanco para ocultarla)
      bodyStyles: { fillColor: [255, 255, 255] }, // Estilo del cuerpo (en blanco para ocultarla)
      alternateRowStyles: { fillColor: false },
      theme: 'grid', // Tema de la tabla (con bordes)
      styles: { lineColor: [0, 0, 0] },
      columnStyles: { 0: { cellWidth: 135 } },
      didParseCell: function (data) {
        if (data.row.index === 0 && data.column.index === 0) {
          data.cell.rowSpan = 2; // Combinar las celdas 1 y 2 de la primera columna
        }
      },
      didDrawCell: function (data) {
        // Ajustar el ancho de la primera columna
        if (data.column.index === 0 && data.row.index === 0) {
          const tableWidth = 180;
          const firstColumnWidth = tableWidth * 0.75; // 75% del ancho total de la tabla
          data.column.width = firstColumnWidth;
        }
        if (
          data.column.index === 0 &&
          (data.row.index === 0 || data.row.index === 1)
        ) {
          // Agregar la imagen a la celda
          //doc.addImage(logo_cormacarena_h, 'PNG', 160, 10, 40, 15);
          doc.addImage(
            logo_cormacarena_h,
            'JPEG',
            (180 * 0.75) / 2 - 50 / 4,
            data.cell.y,
            50,
            15
          ); // Ajusta los valores de posición y tamaño según sea necesario
        }
        if (data.column.index === 0 && data.row.index === 2) {
          const cellWidth = data.cell.width; // Ancho de la celda
          const cellHeight = data.cell.height; // Alto de la celda
          const text = 'CONSTANCIA DE PUBLICACIÓN DE NOTIFICACIÓN POR AVISO'; // Texto a dibujar
          const textWidth = doc.getStringUnitWidth(text) * 10; // Ancho del texto
          const textHeight = 5; // Alto del texto
          const xOffset = cellWidth / 2; // Desplazamiento horizontal para centrar el texto
          const yOffset = cellHeight / 2 + textHeight / 4; // Desplazamiento vertical para centrar el texto
          doc.setFont('Arial', 'bold');
          doc.text(text, data.cell.x + xOffset, data.cell.y + yOffset, {
            align: 'center',
          }); // Dibujar el texto centrado
        }
        if (data.column.index === 1 && data.row.index === 0) {
          const cellWidth = data.cell.width; // Ancho de la celda
          const cellHeight = data.cell.height; // Alto de la celda
          const text = 'Código: F-GJ-06'; // Texto a dibujar
          const textWidth = doc.getStringUnitWidth(text) * 10; // Ancho del texto
          const textHeight = 5; // Alto del texto
          const xOffset = cellWidth / 2; // Desplazamiento horizontal para centrar el texto
          const yOffset = cellHeight / 2 + textHeight / 4; // Desplazamiento vertical para centrar el texto
          doc.setFont('Arial', 'bold');
          doc.text(text, data.cell.x + xOffset, data.cell.y + yOffset, {
            align: 'center',
          }); // Dibujar el texto centrado
        }
        if (data.column.index === 1 && data.row.index === 1) {
          const cellWidth = data.cell.width; // Ancho de la celda
          const cellHeight = data.cell.height; // Alto de la celda
          const text = 'Versión: 02'; // Texto a dibujar
          const textWidth = doc.getStringUnitWidth(text) * 10; // Ancho del texto
          const textHeight = 5; // Alto del texto
          const xOffset = cellWidth / 2; // Desplazamiento horizontal para centrar el texto
          const yOffset = cellHeight / 2 + textHeight / 4; // Desplazamiento vertical para centrar el texto
          doc.setFont('Arial');
          doc.text(text, data.cell.x + xOffset, data.cell.y + yOffset, {
            align: 'center',
          }); // Dibujar el texto centrado
        }
        if (data.column.index === 1 && data.row.index === 2) {
          const cellWidth = data.cell.width; // Ancho de la celda
          const cellHeight = data.cell.height; // Alto de la celda
          const text = 'Fecha: 26/Abril/2021'; // Texto a dibujar
          const textWidth = doc.getStringUnitWidth(text) * 10; // Ancho del texto
          const textHeight = 5; // Alto del texto
          const xOffset = cellWidth / 2; // Desplazamiento horizontal para centrar el texto
          const yOffset = cellHeight / 2 + textHeight / 4; // Desplazamiento vertical para centrar el texto
          doc.setFont('Arial');
          doc.text(text, data.cell.x + xOffset, data.cell.y + yOffset, {
            align: 'center',
          }); // Dibujar el texto centrado
        }
      },
    });

    const lineHeight = 5;
    const linesPerPage = 55;
    let yPos = 35;
    doc.setFontSize(10);

    doc.setFontSize(10);
    paragraphs.forEach((paragraph, index) => {
      if (paragraph === '') {
        yPos += lineHeight * 2;
      } else {
        const paragraphLines = doc.splitTextToSize(paragraph, 180);
        const numLines = paragraphLines.length;
        const remainingLines = linesPerPage - yPos / lineHeight;
        if (numLines > remainingLines && index !== 0) {
          doc.addPage();
          yPos = 10;
        }
        console.log(paragraphLines);
        doc.text(paragraphLines, 10, yPos);
        yPos += lineHeight * numLines;
      }
      if (index === 0) {
        doc.text('Auto (X) o Resolución (),', 10, yPos);
        yPos += lineHeight;
        doc.text('No. PS-GJ 1.2.64.23.25.34.', 10, yPos);
        yPos += lineHeight;
        doc.text(
          `Fecha del acto administrativo: ${fecha_desde || 'No Registra'}`,
          10,
          yPos
        );
        yPos += lineHeight;
        doc.text('Expediente No 3.47.2.016.037', 10, yPos);
        yPos += lineHeight;
        doc.text(
          'Emitido (a) por SUBDIRECCIÓN DE AUTORIDAD AMBIENTAL',
          10,
          yPos
        );
        yPos += lineHeight * 2;
      }
    });
    const totalPages =
      Math.ceil(doc.internal.pageSize.height / lineHeight) / linesPerPage;
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.text(
        'Página ' + i + ' de ' + Math.floor(totalPages),
        170,
        doc.internal.pageSize.getHeight() - 10
      );
    }

    set_visor(doc.output('datauristring'));
    return { title };
  };
  return (
    <>
      <Grid container direction="row" padding={2} borderRadius={2}>
        <Grid container direction="row" padding={2} spacing={2}>
          <Grid item xs={12} md={3}>
            <FormButton
              variant_button="contained"
              on_click_function={generarDocumento}
              icon_class={null}
              disabled={false}
              label={'Generar'}
              type_button="button"
              color_button="success"
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Box component="form" noValidate autoComplete="off">
            <embed
              src={visor}
              type="application/pdf"
              width="100%"
              height="1080px"
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default ImprimirRadicado;
