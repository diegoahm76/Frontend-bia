

/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable'
import { logo_cormacarena_h } from '../../../conservacion/Reportes/logos/logos';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Grid } from '@mui/material';




export const CobroPersuasivo: React.FC<any> = ({
  datos
}: {datos: any}) => {

  const [visor, setVisor] = useState('');
  let total1 = 0;
  let total2 = 0;
  let total3 = 0;

  const data = [
    ["G.R-2019-7975 - EXP: 97-3016 Periodo: 01 de Enero de 2018 al 31 de Diciembre de 2018", "205,411", "125,000", "330,411"],
    ["G.R-2019-7976 - EXP: 97-3017 Periodo: 01 de Enero de 2019 al 31 de Diciembre de 2019", "150,000", "75,000", "225,000"],
    ["G.R-2019-7977 - EXP: 97-3018 Periodo: 01 de Enero de 2020 al 31 de Diciembre de 2020", "180,000", "90,000", "270,000"],
    ["G.R-2019-7978 - EXP: 97-3019 Periodo: 01 de Enero de 2021 al 31 de Diciembre de 2021", "220,000", "110,000", "330,000"],
    ["G.R-2019-7979 - EXP: 97-3020 Periodo: 01 de Enero de 2022 al 31 de Diciembre de 2022", "190,000", "95,000", "285,000"],
    ["G.R-2019-7980 - EXP: 97-3021 Periodo: 01 de Enero de 2023 al 31 de Diciembre de 2023", "250,000", "125,000", "375,000"],
    ["G.R-2019-7981 - EXP: 97-3022 Periodo: 01 de Enero de 2024 al 31 de Diciembre de 2024", "280,000", "140,000", "420,000"],
    ["G.R-2019-7982 - EXP: 97-3023 Periodo: 01 de Enero de 2025 al 31 de Diciembre de 2025", "300,000", "150,000", "450,000"],
    ["G.R-2019-7983 - EXP: 97-3024 Periodo: 01 de Enero de 2026 al 31 de Diciembre de 2026", "270,000", "135,000", "405,000"],
    ["G.R-2019-7984 - EXP: 97-3025 Periodo: 01 de Enero de 2027 al 31 de Diciembre de 2027", "320,000", "160,000", "480,000"],
  ];

  data.forEach((fila) => {
    total1 += parseFloat(fila[1].replace(',', ''));
    total2 += parseFloat(fila[2].replace(',', ''));
    total3 += parseFloat(fila[3].replace(',', ''));
  });

  data.push([
    'TOTAL A PAGAR',
    total1.toLocaleString('es-CO'),
    total2.toLocaleString('es-CO'),
    total3.toLocaleString('es-CO')
  ]);

  const data2 = [
    ["FERNANDO RUEDA LONDOÑO", "Coordinador Grupo Rentas", ""],
    ["JUAN CARLOS GARCIA", "Profesional Universitario", ""],
    ["MARTHA LUCIA GOMEZ", "Profesional Universitario", ""],
    ["MARIA EUGENIA GOMEZ", "Profesional Universitario", ""],
  ];

  useEffect(() => {
    if(datos?.id_deudor)
    generarHistoricoBajas();
  }, []);

  useEffect(() => {
    console.log(datos)
  }, [datos])

  const generarHistoricoBajas = () => {
    const doc = new jsPDF();
    const anchoPagina = doc.internal.pageSize.width;
    const agregarEncabezado = () => {
      doc.setFontSize(22);
      doc.text('    ', anchoPagina / 2, 20, { align: 'center' });
      doc.setFontSize(12);
      doc.addImage(logo_cormacarena_h, 160, 10, 40, 10);

      const margenIzquierdo = 10;
      const margenSuperior = 30;
      const lineaAltura = 5;
      const textoEncabezado = [
        "PS-GJ.1.2.22.2276",
        "",
        "",
        "Villavicencio,",
        "",
        "",
        "Señores",
        `${datos.id_deudor.nombres} ${datos.id_deudor.apellidos}`,
        "CL 27 SUR 43-56",
        `Teléfono: ${datos.id_deudor.telefono}`,
        `E-mail: ${datos.id_deudor.email}`,
        "Villavicencio, Meta"
      ];

      textoEncabezado.forEach((linea, index) => {
        doc.text(linea, margenIzquierdo, margenSuperior + (index * lineaAltura));
      });

      let xCuadro = 120; // Ajusta según sea necesario
      let yCuadro1 = 25; // Ubicación justo debajo de la imagen
      let anchoCuadro = 80; // Ajusta según sea necesario
      let altoCuadro1 = 8; // Ajusta según sea necesari

      doc.rect(xCuadro, yCuadro1, anchoCuadro, altoCuadro1);
      doc.setFontSize(9);
      doc.text('Al contestar cite el  número completo  de este oficio ', xCuadro + 5, yCuadro1 + 5);


      let yCuadro = 40; // Ubicación justo debajo de la imagen
      let altoCuadro = 30; // Ajusta según sea necesari
      // Dibujar el cuadro
      doc.rect(xCuadro, yCuadro, anchoCuadro, altoCuadro);
      // Agregar texto dentro del cuadro
      doc.setFontSize(9);
      const espacioEntreLineas = 6; // Espacio entre líneas de texto
      let yTexto = yCuadro + 10; // Posición inicial del texto en Y
      doc.text('Cormacarena ', xCuadro + 30, yTexto);
      yTexto += espacioEntreLineas; // Aumentar Y para la siguiente línea
      doc.text(`Radicado:`, xCuadro + 10, yTexto);
      yTexto += espacioEntreLineas;

      doc.text(dayjs().format('DD/MM/YYYY'), xCuadro + 10, yTexto);
      yTexto += espacioEntreLineas; // Aumentar Y para la siguiente línea

      doc.text(`Nombre: `, xCuadro + 10, yTexto); // Reemplazar X con el número de hojas

        // doc.text(`Nombre: ${nombre}`, xCuadro + 10, yTexto); // Reemplazar X con el número de hojas
    };
    agregarEncabezado();
    // ${nombreSerieSeleccionada} - ${nombreSubserieSeleccionada}
    // Añadir información del usuario
    doc.setFontSize(12);
    const margenIzquierdo = 10;
    let inicioAsuntoY = 100;
    let lineaAltura = 6;
    let yTexto = inicioAsuntoY + 10;
    doc.text("ASUNTO: Cobro Tasa por Utilización de Agua y ofrecimiento de descuento de intereses.", margenIzquierdo, inicioAsuntoY);
    // doc.text("ASUNTO: Cobro persuasivo tasa retributiva.", margenIzquierdo, inicioAsuntoY);
    let parrafo = `En atención al asunto de la referencia y revisados los registros contables de nuestra entidad, se evidencia que ${datos.id_deudor.nombres} ${datos.id_deudor.apellidos}, identificad@ con cédula/NIT No. ${datos.id_deudor.identificacion} presenta incumplimiento en el pago de las siguientes obligaciones:`;
    let lineas = doc.splitTextToSize(parrafo,  anchoPagina - 20);
    lineas.forEach((linea: any) => {
      doc.text(linea, margenIzquierdo, yTexto);
      yTexto += lineaAltura; // Incrementamos la posición y para la siguiente línea
    });

    //Tabla
    const cabeceras = [
      { header: "CONCEPTO", dataKey: "concepto" },
      { header: "CAPITAL", dataKey: "capital" },
      { header: "INTERESES*", dataKey: "intereses" },
      { header: "TOTAL", dataKey: "total" }
    ];

    autoTable(doc, {
      head: [[{content: 'TASA USO DE AGUA', colSpan: 4 ,styles: {halign: 'center', fillColor: [160, 160, 160]}}],
      ['CONCEPTO', 'CAPITAL', 'INTERESES', 'TOTAL']],
      // columns: cabeceras,
      theme: 'grid',
      body: data,
      showHead: 'firstPage',
      headStyles: { fillColor: [140, 140, 140] }, // Estilo de las cabeceras de la tabla
      startY: 132, // Usa la nueva posición inicial para startY
      styles: {
        cellPadding: 3,
        fontSize: 10,
        valign: 'middle',
      },
      columnStyles: {
        0: { cellWidth: 'auto' }, // Concepto
        1: { cellWidth: 'auto' }, // Capital
        2: { cellWidth: 'auto' }, // Intereses
        3: { cellWidth: 'auto' }  // Total
      },
      margin: { left: 10, right: 10 }
    });
    doc.setFontSize(10);
    yTexto = (doc as any).lastAutoTable.finalY;
    doc.text('Intereses liquidados con corte a 28 de febrero de 2022 sin aplicar descuento del 80%', 10, yTexto + 4);
    doc.setFontSize(12);
    yTexto += 15;
    parrafo = `En este mismo sentido nos permitimos informarle que Cormacarena dando aplicación a  los artículos 46 y 47 de la ley 2155 del 14 de septiembre de 2021, adoptó beneficios para los usuarios con obligaciones pendientes por pagar que se generaron con anterioridad al 30 de junio del año 2021, por concepto de Tasas (Tasa por utilización de agua, tasa retributiva, tasa compensatoria por caza de fauna silvestre y tasa de aprovechamiento forestal) otorgando descuentos del 80% del valor de los intereses moratorios.`;
    lineas = doc.splitTextToSize(parrafo,  anchoPagina - 20);
    lineas.forEach((linea: any) => {
      doc.text(linea, margenIzquierdo, yTexto);
      yTexto += lineaAltura;
    });
    yTexto += 6;
    parrafo = `De acuerdo con lo anterior, comedidamente me permito invitarlos a que cancelen la suma adeudada antes de la fecha de corte de intereses aquí establecida, en caso de querer acogerse al beneficio de descuento  favor comunicarse al celular 310 206 1032 o al correo electrónico  gruporentas@cormacarena.gov.co manifestando su intención para generar la liquidación correspondiente.`;
    lineas = doc.splitTextToSize(parrafo,  anchoPagina - 20);
    lineas.forEach((linea: any) => {
      doc.text(linea, margenIzquierdo, yTexto);
      yTexto += lineaAltura;
    });
    yTexto += 6;
    parrafo = `Así mismo se le informa que pueden realizar el pago por concepto de Tasa por Utilización de Agua en la Cuenta de ahorros del banco BBVA No 854001633 ahorros convenio 33366.`;
    lineas = doc.splitTextToSize(parrafo,  anchoPagina - 20);
    lineas.forEach((linea: any) => {
      doc.text(linea, margenIzquierdo, yTexto);
      yTexto += lineaAltura;
    });
    yTexto += 6;
    parrafo = `También  puede efectuar su pago en línea o transferencia electrónica ingresando a la página web www.cormacarena.gov.co en el enlace «consulte y pague su obligación».`;
    lineas = doc.splitTextToSize(parrafo,  anchoPagina - 20);
    lineas.forEach((linea: any) => {
      doc.text(linea, margenIzquierdo, yTexto);
      yTexto += lineaAltura;
    });
    yTexto += 6;
    parrafo = `De no tener respuesta suya, entenderemos su renuencia al pago, y nos veremos avocados a iniciar el cobro por vía coactiva con la onerosidad que esto le ocasionaría.`;
    lineas = doc.splitTextToSize(parrafo,  anchoPagina - 20);
    lineas.forEach((linea: any) => {
      doc.text(linea, margenIzquierdo, yTexto);
      yTexto += lineaAltura;
    });
    yTexto += 6;
    parrafo = `En caso de haber efectuado ya el pago, favor haga caso omiso a la presente comunicación y allegue copia de la consignación al siguiente correo electrónico  gruporentas@cormacarena.gov.co, o en las  oficinas de CORMACARENA para que obre como prueba y dar por terminado este proceso de cobro persuasivo.`;
    lineas = doc.splitTextToSize(parrafo,  anchoPagina - 20);
    lineas.forEach((linea: any) => {
      doc.text(linea, margenIzquierdo, yTexto);
      yTexto += lineaAltura;
    });
    yTexto += 6;
    doc.text("Cualquier duda por favor comuníquese al celular 310 206 1032.", 10, yTexto);
    yTexto += 10;
    doc.text("Cordialmente,", 10, yTexto);
    yTexto += 15;
    doc.text("___________________________", 10, yTexto);
    doc.text("FERNANDO RUEDA LONDOÑO", 10, yTexto + 6);
    doc.text("Coordinador Grupo Rentas", 10, yTexto + 12);
    autoTable(doc, {
      head: [['NOMBRES Y APELLIDOS', 'CARGO', 'FIRMA']],
      theme: 'grid',
      body: data2,
      showHead: 'firstPage',
      headStyles: { fillColor: [140, 140, 140]}, // Estilo de las cabeceras de la tabla
      startY: yTexto + 18,
      styles: {
        cellPadding: 2,
        fontSize: 9,
        valign: 'middle',
      },
      columnStyles: {
        0: { cellWidth: 'auto' },
        1: { cellWidth: 'auto' },
        2: { cellWidth: 'auto' },
      },
      margin: { left: 10, right: 10 }
    });


//     doc.text(`${consecutivoActual}`, 10, y);
//     y += 6;

//     // doc.text(`Serie ${unidadSeleccionada} - Subserie ${selectedSerieSubserie}`, 10, y);
//     // y += 6;

//     doc.text(`Identificación: ${identificacion}`, 10, y);
//     y += 6;
//     doc.text(`Email: ${email}`, 10, y);
//     y += 6;
//     doc.text(`Tel.: ${telefono}`, 10, y);
//     y += 6;
//     doc.text(`Ciudad: ${ciudad}`, 10, y);

//     y += 6;
//     doc.text(``, 10, y);
//     y += 6;

//     let textoPersonalizado = `
//     Asunto: Solicitud de información requerida para llevar a cabo el proceso de liquidación de los documentos de cobro de la vigencia  ${
//       Fecha_vigencia ? Fecha_vigencia : '__________'
//     } de la tasa por utilización de agua.

// Cordial Saludo,
// Teniendo en cuenta el proceso de liquidación del instrumento económico tasa por utilización del agua, por medio de la presente solicito amablemente su colaboración para obtener la siguiente información:
// a) Usuarios cuyos expedientes fueron archivados en el periodo comprendido del ${
//       Fecha_a ? Fecha_a : '__________'
//     } .
// b) Nuevos usuarios a quienes se les haya otorgado permiso de concesión de agua durante el periodo comprendido del ${
//       Fecha_b ? Fecha_b : '__________'
//     } .
// Este reporte se deberá diligenciar en la matriz que se remite como adjunto y debe ser enviada al correo gruporentas@cormacarena.gov.co  y/o facturacion.rentas@cormacarena.gov.co. Es importante mencionar la prioridad de esta información, por lo que se requiere que sea entregada a más tardar el ${
//       Fecha_entrega ? Fecha_entrega : '__________'
//     } , con la finalidad de llevar a cabo un proceso eficiente en términos de tiempo y manejo adecuado de la información. Agradezco la atención prestada.


//      `;

//     let textoAMostrar: string;

//     if (opcionSeleccionada === '1') {
//       textoAMostrar = `
//   Asunto: Solicitud de información requerida para llevar a cabo el proceso de liquidación de los documentos de cobro de la vigencia  ${
//     Fecha_vigencia ? Fecha_vigencia : '__________'
//   } de la tasa por utilización de agua.

// Cordial Saludo,
// Teniendo en cuenta el proceso de liquidación del instrumento económico tasa por utilización del agua, por medio de la presente solicito amablemente su colaboración para obtener la siguiente información:
// a) Usuarios cuyos expedientes fueron archivados en el periodo comprendido del ${
//         Fecha_a ? Fecha_a : '__________'
//       } .
// b) Nuevos usuarios a quienes se les haya otorgado permiso de concesión de agua durante el periodo comprendido del ${
//         Fecha_b ? Fecha_b : '__________'
//       } .
// Este reporte se deberá diligenciar en la matriz que se remite como adjunto y debe ser enviada al correo gruporentas@cormacarena.gov.co  y/o facturacion.rentas@cormacarena.gov.co. Es importante mencionar la prioridad de esta información, por lo que se requiere que sea entregada a más tardar el ${
//         Fecha_entrega ? Fecha_entrega : '__________'
//       } , con la finalidad de llevar a cabo un proceso eficiente en términos de tiempo y manejo adecuado de la información. Agradezco la atención prestada.


//    `;
//     } else if (opcionSeleccionada === '2') {
//       textoAMostrar = `${remicion_viso(expediente_2, Fecha_2, opcionSiNo2)}  `;
//     } else if (opcionSeleccionada === '3') {
//       textoAMostrar = `${constancia_publicacion(
//         Fecha_3,
//         Fecha_acto_3,
//         expediente_3,
//         fijacion_3,
//         des_fijacion_3,
//         cc_3,
//         nombre_3,
//         empresa_3,
//         nombre_nit_3,
//         nombre_enpresa_3
//       )}`;
//     } else if (opcionSeleccionada === '4') {
//       textoAMostrar = ` ${plantila_4(
//         Fecha_4,
//         nombre_4,
//         cc_4,
//         constancia_4,
//         constancia_des_4,
//         opcionSiNo,
//         dias_4
//       )}`;
//     } else if (opcionSeleccionada === '5') {
//       textoAMostrar = `  ${constancia_publicaci5(email)}  `;
//     } else if (opcionSeleccionada === '6') {
//       textoAMostrar = `  ${citacion(opcion_6, numero_6)}  `;
//     } else if (opcionSeleccionada === '8') {
//       textoAMostrar = `  ${documento8(
//         Fecha_8,
//         Fecha_8remi,
//         empresa_8,
//         nit_8,
//         opcion_8,
//         dias_8
//       )}  `;
//     } else if (opcionSeleccionada === '9') {
//       textoAMostrar = ``;
//     } else {
//       textoAMostrar = ''; // Valor predeterminado o manejo del caso 'undefined'
//     }
//     // Configuraciones iniciales
//     const lineHeight = 6; // Altura de línea para el texto
//     const margin = 10; // Márgenes izquierdo y derecho
//     const pageHeight = doc.internal.pageSize.height; // Altura de la página

//     // let y = 30; // posición inicial para el texto

//     // Función para añadir texto con control de páginas
//     const addTextWithPageControl = (text: string) => {
//       let lines = doc.splitTextToSize(
//         text,
//         doc.internal.pageSize.width - 2 * margin
//       ); // Divide el texto en líneas

//       lines.forEach((line: string | string[]) => {
//         if (y > pageHeight - 20) {
//           // 20 es el margen inferior
//           doc.addPage();
//           y = 20; // Restablecer Y para la nueva página
//         }
//         doc.text(line, margin, y);
//         y += lineHeight;
//       });
//     };

//     // Añadir texto con control de páginas
//     addTextWithPageControl(textoAMostrar);

//     // y += 6; doc.text(textoAMostrar, 10, y);
//     //     y += 6;

//     const lineas = doc.splitTextToSize(asunto, anchoPagina - 20);
//     for (let i = 0; i < lineas.length; i++) {
//       if (y > 280) {
//         doc.addPage();
//         agregarEncabezado();
//         y = 30;
//       }
//       doc.text(lineas[i], 10, y);
//       y += 6;
//     }
//     let yFinal = doc.internal.pageSize.getHeight() - 30; // Ajusta esto según sea necesario
//     doc.setFontSize(12);
//     // doc.text(`Firma _____________________`, 10, yFinal);
//     doc.text(`Nombre: ${nombre}`, 10, yFinal);
//     yFinal += 10;
//     doc.text(`Contratista Grupo: ${nombre_unidad_organizacional}`, 10, yFinal);
    setVisor(doc.output('datauristring'));
  };


  return (
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