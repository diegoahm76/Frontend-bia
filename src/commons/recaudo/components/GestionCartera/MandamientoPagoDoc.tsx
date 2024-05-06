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


export const MandamientoPagoDoc: React.FC<any> = ({
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
    if(datos?.id_deudor) generarDocIncumplimiento()
  }, [datos])

  useEffect(() => {
    if(datos?.id_deudor && altura) generarDocIncumplimiento()
  }, [altura])

  const generarDocIncumplimiento = () => {
    const doc = new jsPDF();
    const anchoPagina = doc.internal.pageSize.width;
    const alturaPagina = doc.internal.pageSize.height;
    const header = () => {
      doc.setFont('times', 'normal');
      doc.setTextColor(128, 128, 128);
      doc.setFontSize(22);
      doc.text('    ', doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });
      doc.setFontSize(11);
      doc.text('Resolución No. PS-GJ.1.2.6.1.22.042', doc.internal.pageSize.getWidth() / 2, 25, { align: 'center' });
      doc.text('Fecha 25/02/2022', doc.internal.pageSize.getWidth() / 2, 30, { align: 'center' });
      doc.text('«Por medio del cual se expide un mandamiento de pago»', doc.internal.pageSize.getWidth() / 2, 40, { align: 'center' });
      doc.setFontSize(12);
      doc.addImage(logo_cormacarena_h, 160, 10, 40, 10);
      doc.setTextColor(0, 0, 0);
    };

    const footer = () => {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(128, 128, 128);
      const pageSize = doc.internal.pageSize;
      const pageHeight = pageSize.getHeight();
      doc.setFontSize(7);
      doc.text('AUTORIDAD AMBIENTAL EN EL DEPARTAMENTO DEL META - NIT 822000091-2', 10, pageHeight - 20);
      doc.setFont('times', 'normal');
      doc.text('Carrera 44C No33B-24 barrio Barzal Villavicencio (Meta) - Colombia', 10, pageHeight - 17);
      doc.text('PBX 6730420 - 6730417 - 6730418 PQR 6730420 Ext. 105', 10, pageHeight - 14);
      doc.text('Linea Gratuita: 018000117177', 10, pageHeight - 11);
      doc.setFont('helvetica', 'bold');
      doc.text('www.cormacarena.gov.co  info@cormacarena.gov.co', 10, pageHeight - 8);
      doc.setFont('times', 'normal');
      doc.setFontSize(10);
      doc.text('Corporación para el', pageSize.getWidth() - 10, pageHeight - 20, { align: 'right' });
      doc.text('Desarrollo sostenible', pageSize.getWidth() - 10, pageHeight - 16, { align: 'right' });
      doc.text('del Área de Manejo', pageSize.getWidth() - 10, pageHeight - 12, { align: 'right' });
      doc.text('Especial La Macarena', pageSize.getWidth() - 10, pageHeight - 8, { align: 'right' });
      doc.setTextColor(0, 0, 0);
    };
    const agregarEncabezado = () => {
      doc.setFontSize(12);
      const margenIzquierdo = 22;
      const margenSuperior = 55;
      const lineaAltura = 5;
      const textoEncabezado = [
        `Proceso No. ${currentConsecutivo}`,
        "Concepto: Sanción",
        `Contra: ${datos?.id_deudor?.nombres} ${datos?.id_deudor?.apellidos || ''}`,
        `cédula/NIT No. ${datos?.id_deudor?.identificacion}`,
      ];

      const anchoMaximo = 80;
      let yPosition = margenSuperior;

      textoEncabezado.forEach((linea) => {
        const texto = doc.splitTextToSize(linea, anchoMaximo);
        doc.text(texto, margenIzquierdo, yPosition);
        yPosition += (texto.length * lineaAltura);
        setAltura(yPosition);
      });

      let xCuadro = 108; // Ajusta según sea necesario
      let yCuadro = 50; // Ubicación justo debajo de la imagen
      let anchoCuadro = 80; // Ajusta según sea necesario
3
      // Agregar texto dentro del cuadro
      doc.setFontSize(9);
      const espacioEntreLineas = 5; // Espacio entre líneas de texto
      let yTexto = yCuadro + 7; // Posición inicial del texto en Y
      doc.text('Cormacarena ', xCuadro + 30, yTexto);
      yTexto += espacioEntreLineas;
      doc.text(`Radicado:`, xCuadro + 10, yTexto);
      yTexto += espacioEntreLineas;

      doc.text(`Fecha: ${dayjs().format('DD/MM/YYYY')}`, xCuadro + 10, yTexto);
      yTexto += espacioEntreLineas;
      const anchoMaximo2 = 60;
      const nombre = `Nombre: ${datos?.id_deudor?.nombres || ''} ${datos?.id_deudor?.apellidos || ''}`;
      let lineas = doc.splitTextToSize(nombre,  anchoPagina - 44);
      lineas.forEach((linea: any) => {
        const texto = doc.splitTextToSize(linea, anchoMaximo2);
        doc.text(texto, xCuadro + 10, yTexto);
        yTexto += (texto.length * lineaAltura);
      });
      let altoCuadro = yTexto - 48;
      doc.rect(xCuadro, yCuadro, anchoCuadro, altoCuadro);

        // doc.text(`Nombre: ${nombre}`, xCuadro + 10, yTexto); // Reemplazar X con el número de hojas
    };
    agregarEncabezado();
    // // ${nombreSerieSeleccionada} - ${nombreSubserieSeleccionada}
    // // Añadir información del usuario
    doc.setFontSize(12);
    const margenIzquierdo = 22;
    let inicio = altura + 10;
    let lineaAltura = 6;
    let yTexto = inicio + 10;
    console.log(yTexto)
    doc.text('CONSIDERANDO', anchoPagina / 2, yTexto, { align: 'center' });
    yTexto += 10;
    let parrafo = `Que de conformidad con el artículo 23 del Decreto 1768 de 1994, compilado por el artículo 2.2.8.4.1.23 del decreto 1076 de 2015, que señala: «Las corporaciones tienen jurisdicción coactiva para hacer efectivos los créditos exigibles a su favor, de acuerdo con las normas establecidas para las entidades públicas del sector nacional, en la Ley 6ª de 1992 o la norma que la modifique o sustituya».`;
    let lineas = doc.splitTextToSize(parrafo,  anchoPagina - 44);
    lineas.forEach((linea: any) => {
      doc.text(linea, margenIzquierdo, yTexto);
      yTexto += lineaAltura;
    });
    yTexto += 6;
    parrafo = `Que dentro del expediente número 5.37.2.07.165, mediante resolución número PS-GJ.1.2.6.015.1167 de fecha seis (06) de julio de 2015, CORMACARENA otorga a ${datos?.id_deudor?.nombres} ${datos?.id_deudor?.apellidos || ''}, identificada con el Nit. ${datos?.id_deudor?.identificacion}, el permiso ambiental de concesión de aguas superficiales de la fuente rio Guamal, por un caudal de 600 Lts/seg., a captarse en las coordenadas E1079806 – N905625, para uso agrícola en el riego de palma de aceite y arroz, única y exclusivamente en época de estiaje comprendida entre los meses de diciembre a marzo de cada año, en beneficio del predio la Grama, ubicado en el Municipio de San Carlos de Guaroa – Meta, identificado con matricula inmobiliaria número 236-28818.  Acto administrativo notificado de manera personal el día veintinueve (29) de julio de 2015.  `;
    lineas = doc.splitTextToSize(parrafo,  anchoPagina - 44);
    lineas.forEach((linea: any) => {
      doc.text(linea, margenIzquierdo, yTexto);
      yTexto += lineaAltura;
    });
    yTexto += 6;
    parrafo = `Que en cumplimiento al artículo noveno de la resolución número PS-GJ.1.2.6.015.1167 de fecha seis (06) de julio de 2015, la Corporación como autoridad ambiental expide documento de cobro por concepto de Tasa por uso de agua.`;
    lineas = doc.splitTextToSize(parrafo,  anchoPagina - 44);
    lineas.forEach((linea: any) => {
      doc.text(linea, margenIzquierdo, yTexto);
      yTexto += lineaAltura;
    });
    yTexto += 6;
    parrafo = `Que el grupo Rentas de la oficina Jurídica de esta Corporación, emitió los siguientes documentos de cobro por concepto de tasa por uso de agua, señalándose como una obligación pendiente de pago por parte de ${datos?.id_deudor?.nombres} ${datos?.id_deudor?.apellidos || ''}, identificada con el Nit. ${datos?.id_deudor?.identificacion}:`;
    lineas = doc.splitTextToSize(parrafo,  anchoPagina - 44);
    lineas.forEach((linea: any) => {
      doc.text(linea, margenIzquierdo, yTexto);
      yTexto += lineaAltura;
    });
    yTexto += 6;
    doc.text("- G.R.2016 - 5969 de fecha 29 de abril de 2016", margenIzquierdo, yTexto);
    if (yTexto > (alturaPagina - 40)) {
      doc.addPage();
      yTexto = 50;
    }
    yTexto += lineaAltura;
    doc.text("- G.R.2017 - 6038 de fecha 29 de abril de 2017", margenIzquierdo, yTexto);
    if (yTexto > (alturaPagina - 40)) {
      doc.addPage();
      yTexto = 50;
    }
    yTexto += lineaAltura;
    doc.text("- G.R.2019 - 7870 de fecha 30 de abril de 2019", margenIzquierdo, yTexto);
    if (yTexto > (alturaPagina - 40)) {
      doc.addPage();
      yTexto = 50;
    }
    yTexto += lineaAltura;
    doc.text("- G.R.2021 - 010538 de fecha 15 de abril de 2021", margenIzquierdo, yTexto);
    if (yTexto > (alturaPagina - 40)) {
      doc.addPage();
      yTexto = 50;
    }
    yTexto += 10;
    parrafo = `Que mediante oficio radicado en la Corporación con el número 014699 de fecha diez (10) de agosto de 2017, el gerente de la empresa AGRO INDUSTRIA SAN JOSE S.A.S., solicitó facilidad de pago de la obligación pendiente en la factura número G.R.-2016-5969, la cual fue otorgada por la corporación mediante el oficio número PS-GJ.1.2.17.7665 de fecha veinticuatro (24) de agosto de 2017.`;
    lineas = doc.splitTextToSize(parrafo,  anchoPagina - 44);
    lineas.forEach((linea: any) => {
      doc.text(linea, margenIzquierdo, yTexto);
      yTexto += lineaAltura;
    });
    yTexto += 6;
    parrafo = `Que revisados los registros contables de la Corporación, se verificó que ${datos?.id_deudor?.nombres} ${datos?.id_deudor?.apellidos || ''}, no cumplió con el pago total de las cuotas otorgadas en la facilidad de pago, quedando un saldo pendiente de valor capital por UN MILLON SEISCIENTOS OCHENTA Y NUEVE MIL CUATROCIENTOS OCHENTA Y SIETE PESOS ($1.689.487), y de intereses la suma de SEISCIENTOS CINCUENTA Y SIETE MIL QUINIENTOS PESOS ($657.500), para un total adeudado con corte al día veinticinco (25) de agosto de 2017, de DOS MILLONES TRESCIENTOS CUARENTA Y SEIS MIL NOVECIENTOS OCHENTA Y SIETE PESOS ($2.346.987).`;
    lineas = doc.splitTextToSize(parrafo,  anchoPagina - 44);
    lineas.forEach((linea: any) => {
      if (yTexto > (alturaPagina - 40)) {
        doc.addPage();
        yTexto = 50;
      }
      doc.text(linea, margenIzquierdo, yTexto);
      yTexto += lineaAltura;
    });
    yTexto += 6;
    parrafo = `Que mediante oficio radicado en la Corporación con el número 014698 de fecha diez (10) de agosto de 2017, la EMPRESA AGRO INDUSTRIA SAN JOSE S.A.S., solicita el no cobro de la factura número G.R.2017-6038, por concepto de tasa por uso de agua, solicitud respondida por CORMACARENA mediante oficio número PM-GA 3.17.7732 de fecha diecinueve (19) de septiembre de 2017, donde la Corporación anula la factura número G.R.2017-6038 de fecha 29 de abril de 2017 y genera la factura número G.R.-2017-6890 de fecha tres (03) de noviembre de 2017, por valor de DOCE MILLONES QUINIENTOS NOVENTA Y SIETE MIL CIENTO VEINTE PESOS ($12.597.120).`;
    lineas = doc.splitTextToSize(parrafo,  anchoPagina - 44);
    lineas.forEach((linea: any) => {
      doc.text(linea, margenIzquierdo, yTexto);
      yTexto += lineaAltura;
    });
    yTexto += 6;
    parrafo = `Y mediante oficio radicado en la Corporación con el número 009915 de fecha dieciséis (16) de mayo de 2019, ${datos?.id_deudor?.nombres} ${datos?.id_deudor?.apellidos || ''}, solicita revisión de la facturación del periodo 2018, es decir de la factura número G.R.2019-7870, por concepto de tasa por uso de agua, en la mediante oficio número PM-GA 3.19.5335 de fecha trece (13) de junio de 2019, CORMACARENA anula la factura número G.R.2019-7870 de fecha 30 de abril de 2019 y genera la factura número G.R.-2019-8645 de fecha trece (13) de junio de 2019, por valor de CUATRO MILLONES TREINTA MIL CUARENTA Y DOS PESOS ($4.030.042).`;
    lineas = doc.splitTextToSize(parrafo,  anchoPagina - 44);
    lineas.forEach((linea: any) => {
      if (yTexto > (alturaPagina - 40)) {
        doc.addPage();
        yTexto = 50;
      }
      doc.text(linea, margenIzquierdo, yTexto);
      yTexto += lineaAltura;
    });
    yTexto += 6;
    parrafo = `Que Revisado el expediente número 5.37.2.07.165 en la Intranet Docunet de la corporación no se encontró reclamación efectuada por el usuario contra el documento de cobro número G.R.2021-010538 de fecha 15 de abril de 2021, por concepto de Tasa por uso de agua.  La mencionada factura es primera copia, presta merito ejecutivo como una obligación clara, expresa y exigible, siendo procedente librar mandamiento de pago de acuerdo a los trámites que señale la ley.`;
    lineas = doc.splitTextToSize(parrafo,  anchoPagina - 44);
    lineas.forEach((linea: any) => {
      if (yTexto > (alturaPagina - 40)) {
        doc.addPage();
        yTexto = 50;
      }
      doc.text(linea, margenIzquierdo, yTexto);
      yTexto += lineaAltura;
    });
    yTexto += 6;
    parrafo = `Que el título ejecutivo comprendido dentro de este proceso coactivo es un título complejo compuesto por dos (2) diferentes actos administrativos:`;
    lineas = doc.splitTextToSize(parrafo,  anchoPagina - 44);
    lineas.forEach((linea: any) => {
      doc.text(linea, margenIzquierdo, yTexto);
      yTexto += lineaAltura;
    });
    yTexto += 6;
    parrafo = `1.  Resolución número PS-GJ.1.2.6.015.1167 de fecha seis (06) de julio de 2015.`;
    lineas = doc.splitTextToSize(parrafo,  anchoPagina - 48);
    lineas.forEach((linea: any) => {
      doc.text(linea, margenIzquierdo + 8, yTexto);
      yTexto += lineaAltura;
    });
    yTexto += 6;
    parrafo = `2.	 Documentos de cobro números G.R.2016-5969 de fecha 29 de abril de 2016, G.R.-2017-6890 de fecha tres (03) de noviembre de 2017, G.R.-2019-8645 de fecha trece (13) de junio de 2019 y G.R.2021 - 010538 de fecha 15 de abril de 2021`;
    lineas = doc.splitTextToSize(parrafo,  anchoPagina - 48);
    lineas.forEach((linea: any) => {
      doc.text(linea, margenIzquierdo + 8, yTexto);
      yTexto += lineaAltura;
    });
    yTexto += 6;
    parrafo = `Que dando aplicabilidad a la Ley 1066 de fecha 29 de Julio de 2006, el procedimiento de jurisdicción coactiva que se tramitaba bajo los lineamientos del Código de procedimiento Civil se efectuará bajo los esquemas del Estatuto Tributario.`;
    lineas = doc.splitTextToSize(parrafo,  anchoPagina - 44);
    lineas.forEach((linea: any) => {
      doc.text(linea, margenIzquierdo, yTexto);
      yTexto += lineaAltura;
    });
    yTexto += 6;
    parrafo = `Que el suscrito funcionario es competente para conocer del proceso, de acuerdo a la Resolución 170 de fecha 28 de Julio de 1999, modificada por el acto administrativo No. 2.6.05.112 de fecha 08 de Febrero de 2005, expedidas por el Director de CORMACARENA.`;
    lineas = doc.splitTextToSize(parrafo,  anchoPagina - 44);
    lineas.forEach((linea: any) => {
      doc.text(linea, margenIzquierdo, yTexto);
      yTexto += lineaAltura;
    });
    yTexto += 6;
    doc.text("Por mérito de lo expuesto,", margenIzquierdo, yTexto);
    yTexto += 10;
    doc.text('RESUELVE', anchoPagina / 2, yTexto, { align: 'center' });
    yTexto += 10;
    parrafo = `ARTICULO PRIMERO: Librar mandamiento de pago a favor de la Corporación para el Desarrollo Sostenible del Área de Manejo Especial la Macarena CORMACARENA, para que en el término de quince (15) días hábiles siguientes a la notificación del presente, la EMPRESA AGROINDUSTRIA SAN JOSE S.A.S., identificada con el Nit. 892.002.602-1, cancele en la cuenta de depósitos judiciales del Banco Agrario No. 500019196301 sucursal Villavicencio a nombre de C.A.R. CORMACARENA C. COACTIVO, los siguientes valores:`;
    lineas = doc.splitTextToSize(parrafo,  anchoPagina - 44);
    lineas.forEach((linea: any) => {
      if (yTexto > (alturaPagina - 40)) {
        doc.addPage();
        yTexto = 50;
      }
      doc.text(linea, margenIzquierdo, yTexto);
      yTexto += lineaAltura;
    });
    yTexto += 6;
    parrafo = `1.  La suma de UN MILLON SEISCIENTOS OCHENTA Y NUEVE MIL CUATROCIENTOS OCHENTA Y SIETE PESOS ($1.689.487), de saldo capital por concepto de tasa por uso de agua, según factura número G.R.2016-5969 de fecha 29 de abril de 2016.   2. La suma de SEISCIENTOS CINCUENTA Y SIETE MIL QUINIENTOS PESOS ($657.500), de saldo intereses moratorios con fecha de corte veinticinco (25) de agosto de 2017 de la factura número G.R.2016-5969 de fecha 29 de abril de 2016.   3. La suma de DOCE MILLONES QUINIENTOS NOVENTA Y SIETE MIL CIENTO VEINTE PESOS ($12.597.120), de valor capital por concepto de tasa por uso de agua, según factura número G.R.2017-6890 de fecha 3 de noviembre de 2017.   4. La suma de CUATRO MILLONES TREINTA MIL CUARENTA Y DOS PESOS ($4.030.042), de valor capital por concepto de tasa por uso de agua, según factura número G.R.2019-8645 de fecha 13 de junio de 2019.   5. La suma de TRES MILLONES SEISCIENTOS SESENTA Y OCHO MIL QUINIENTOS TREINTA PESOS ($3.668.530), de valor capital por concepto de tasa por uso de agua, según factura número G.R.2021-010538 de fecha 15 de abril de 2021.   6. Los intereses moratorios que se causen sobre los valores citados a la tasa efectiva de usura certificada por la Superintendencia Financiera de Colombia para el respectivo mes de mora (Art. 635 E.T); desde que se hace exigible la obligación hasta cuando se verifique el pago en su totalidad.   7. Por los gastos que demande el trámite pertinente para hacer efectiva la deuda y las costas del presente proceso, las cuales se liquidaran en su oportunidad.`;
    lineas = doc.splitTextToSize(parrafo,  anchoPagina - 54);
    lineas.forEach((linea: any) => {
      doc.text(linea, margenIzquierdo + 8, yTexto);
      yTexto += lineaAltura;
    });
    yTexto += 6;
    parrafo = `ARTICULO SEGUNDO: Notificar este mandamiento de pago personalmente, previa citación para que comparezca el ejecutado y/o apoderado o representante legal, dentro de los diez (10) días siguientes a la misma. En caso contrario notificar por correo conforme lo dispuesto en el artículo 826 Estatuto Tributario, concordante con el artículo 566-1 del mismo Estatuto Tributario.`;
    lineas = doc.splitTextToSize(parrafo,  anchoPagina - 44);
    lineas.forEach((linea: any) => {
      doc.text(linea, margenIzquierdo, yTexto);
      yTexto += lineaAltura;
    });
    yTexto += 6;
    parrafo = `ARTICULO TERCERO: Advertir al deudor que dispone de quince (15) días, después de notificada esta providencia, para cancelar la deuda o proponer excepciones legales que estime pertinentes conforme a lo reglado en el artículo 830 del Estatuto Tributario. `;
    lineas = doc.splitTextToSize(parrafo,  anchoPagina - 44);
    lineas.forEach((linea: any) => {
      if (yTexto > (alturaPagina - 40)) {
        doc.addPage();
        yTexto = 50;
      }
      doc.text(linea, margenIzquierdo, yTexto);
      yTexto += lineaAltura;
    });
    if (yTexto > (alturaPagina - 40)) {
      doc.addPage();
      yTexto = 50;
    }
    yTexto += 10;
    doc.text('Notifíquese y Cúmplase', anchoPagina / 2, yTexto, { align: 'center' });
    yTexto += 25;
    doc.text('JUAN CARLOS MEDINA GONZALES', anchoPagina / 2, yTexto, { align: 'center' });
    yTexto += 6;
    doc.text('Jefe Oficina Asesora Jurídica', anchoPagina / 2, yTexto, { align: 'center' });
    yTexto += 10;
    autoTable(doc, {
      columns: columns,
      body: data,
      theme: 'grid',
      styles: {
        cellPadding: 2,
        fontSize: 9,
        valign: 'middle',
        halign: 'left',
      },
      headStyles: {
        fillColor: [221, 221, 221],
        textColor: [0, 0, 0],
        fontStyle: 'bold'
      },
      startY: yTexto,
      margin: { horizontal: 22 },
      tableWidth: 'auto',
      columnStyles: {
        nombre: { cellWidth: 'auto' },
        cargo: { cellWidth: 'auto' },
        firma: { cellWidth: 'auto' }
      },
      willDrawCell: (data) => {
        // Código para manejar eventos como dibujar firmas si es necesario
      }
    });
    const pageCount = doc.internal.pages.length;
    for(let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      header();
      footer();
    }
    setVisor(doc.output('datauristring'));
  };

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