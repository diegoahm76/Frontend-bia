

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
  datos,
  id_deudor,
  id_subetapa,
  currentDeudor,
  dataClean,
  is_generate_resolucion,
  resolucion_url
}: {datos: any, is_generate_resolucion: boolean, resolucion_url: any, id_deudor: number, id_subetapa: number, currentDeudor: any, dataClean: any}) => {

  const [visor, setVisor] = useState('');
  const [altura, setAltura] = useState(0);
  const [currentConsecutivo, setCurrentConsecutivo] = useState(0);
  let data: any[] = [];

  let sumaTotal: string | number = 0;

  const columns = [
    { header: 'Acción', dataKey: 'accion' },
    { header: 'Nombres y apellidos completos', dataKey: 'nombre' },
    { header: 'Cargo', dataKey: 'cargo' },
    { header: 'Firma', dataKey: 'firma' }
  ];

  const data2 = [
    { accion: 'Proyectó:', nombre: 'DIANA PATRICIA LADINO LADINO', cargo: 'ABOGADA GRUPO RENTAS', firma: '' },
    { accion: 'Revisó', nombre: 'FERNANDO RUEDA LONDOÑO', cargo: 'COORDINADOR GRUPO RENTAS', firma: '' },
    { accion: 'Aprobó', nombre: 'FERNANDO RUEDA LONDOÑO', cargo: 'COORDINADOR GRUPO RENTAS', firma: '' } // Ajustar según los datos necesarios
  ];

  useEffect(() => {
    if(datos?.id_deudor && is_generate_resolucion){
      data = []
      if(data.length === 0){
        data.push([datos.nombre, datos.monto_inicial, datos.valor_intereses, Number(datos.monto_inicial) + Number(datos.valor_intereses)])
        sumaTotal = (Number(datos.monto_inicial) + Number(datos.valor_intereses)).toLocaleString('es-CO');
      }
      generarResolucion();
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
      generarResolucion();
    }
  }, [is_generate_resolucion, currentDeudor, dataClean, datos, altura]);


  const generarResolucion = () => {
    const doc = new jsPDF();
    const anchoPagina = doc.internal.pageSize.width;
    const alturaPagina = doc.internal.pageSize.height;
    const header = () => {
      doc.text('    ', anchoPagina / 2, 20, { align: 'center' });
      doc.setFontSize(12);
      doc.addImage(logo_cormacarena_h, 160, 10, 40, 10);
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
      const margenSuperior = 30;
      const lineaAltura = 5;
      const textoEncabezado = [
        `${currentConsecutivo}`,
        "",
        "",
        "Villavicencio,",
        "",
        "",
        "Señores",
        `${datos?.id_deudor?.nombres || currentDeudor.nombre_completo} ${datos?.id_deudor?.apellidos || ''}`,
        "CL 27 SUR 43-56",
        `Teléfono: ${datos?.id_deudor?.telefono || ''}`,
        `E-mail: ${datos?.id_deudor?.email || currentDeudor.email}`,
        "Villavicencio, Meta"
      ];

      const anchoMaximo = 80;
      let yPosition = margenSuperior;

      textoEncabezado.forEach((linea) => {
        const texto = doc.splitTextToSize(linea, anchoMaximo);
        doc.text(texto, margenIzquierdo, yPosition);
        yPosition += (texto.length * lineaAltura);
        setAltura(yPosition);
      });

      let xCuadro = 108;
      let yCuadro1 = 25;
      let anchoCuadro = 80;
      let altoCuadro1 = 8;

      doc.rect(xCuadro, yCuadro1, anchoCuadro, altoCuadro1);
      doc.setFontSize(9);
      doc.text('Al contestar cite el  número completo  de este oficio ', xCuadro + 5, yCuadro1 + 5);


      let yCuadro = 40;
      // Dibujar el cuadro
      doc.setFontSize(9);
      const espacioEntreLineas = 6;
      let yTexto = yCuadro + 10;
      doc.text('Cormacarena ', xCuadro + 30, yTexto);
      yTexto += espacioEntreLineas;
      doc.text(`Radicado:`, xCuadro + 10, yTexto);
      yTexto += espacioEntreLineas;

      doc.text(`Fecha: ${dayjs().format('DD/MM/YYYY')}`, xCuadro + 10, yTexto);
      yTexto += espacioEntreLineas;
      const anchoMaximo2 = 60;
      const nombre = `Nombre: ${datos?.id_deudor?.nombres || currentDeudor.nombre_completo} ${datos?.id_deudor?.apellidos || ''}`;
      let lineas = doc.splitTextToSize(nombre,  anchoPagina - 44);
      lineas.forEach((linea: any) => {
        const texto = doc.splitTextToSize(linea, anchoMaximo2);
        doc.text(texto, xCuadro + 10, yTexto);
        yTexto += (texto.length * lineaAltura);
      });
      let altoCuadro = yTexto - 38;
      doc.rect(xCuadro, yCuadro, anchoCuadro, altoCuadro);
      // doc.text(`Nombre: ${datos?.id_deudor?.nombres || currentDeudor.nombre_completo} ${datos?.id_deudor?.apellidos || ''}`, xCuadro + 10, yTexto); // Reemplazar X con el número de hojas
        // doc.text(`Nombre: ${nombre}`, xCuadro + 10, yTexto); // Reemplazar X con el número de hojas
    };
    agregarEncabezado();
    // ${nombreSerieSeleccionada} - ${nombreSubserieSeleccionada}
    // Añadir información del usuario
    doc.setFontSize(12);
    const margenIzquierdo = 22;
    let inicioAsuntoY = altura + 10;
    let lineaAltura = 6;
    let yTexto = inicioAsuntoY + 10;
    const nextPage = (): void => {
      if (yTexto > (alturaPagina - 40)) {
        doc.addPage();
        yTexto = 30;
      }
    }
    doc.text("ASUNTO: Cobro Tasa por Utilización de Agua y ofrecimiento de descuento de intereses.", margenIzquierdo, inicioAsuntoY);
    // doc.text("ASUNTO: Último Cobro Tasa por Utilización de Agua y ofrecimiento de descuento de intereses.", margenIzquierdo, inicioAsuntoY);
    // doc.text("ASUNTO: Último Cobro Tasa Retributiva y ofrecimiento de descuento de intereses.", margenIzquierdo, inicioAsuntoY);
    // doc.text("ASUNTO: Cobro persuasivo tasa retributiva.", margenIzquierdo, inicioAsuntoY);
    let parrafo = `En atención al asunto de la referencia y revisados los registros contables de nuestra entidad, se evidencia que ${datos?.id_deudor?.nombres || currentDeudor.nombre_completo} ${datos?.id_deudor?.apellidos || ''}, identificado con cédula/NIT No. ${datos?.id_deudor?.identificacion || currentDeudor.numero_identificacion} presenta incumplimiento en el pago de las siguientes obligaciones:`;
    let lineas = doc.splitTextToSize(parrafo,  anchoPagina - 44);
    lineas.forEach((linea: any) => {
      doc.text(linea, margenIzquierdo, yTexto);
      yTexto += lineaAltura; // Incrementamos la posición y para la siguiente línea
    });

    const content = true ? 'TASA USO DE AGUA' : 'TASA RETRIBUTIVA';

    //Tabla
    autoTable(doc, {
      head: [[{content, colSpan: 4 ,styles: {halign: 'center', fillColor: [160, 160, 160]}}],
      ['CONCEPTO', 'CAPITAL', 'INTERESES', 'TOTAL']],
      theme: 'grid',
      body: data,
      foot: [["", "TOTAL A PAGAR", sumaTotal]],
      footStyles: { fillColor: [200, 200, 200], fontSize: 12, fontStyle: 'bold'},
      showFoot: 'lastPage',
      showHead: 'firstPage',
      headStyles: { fillColor: [140, 140, 140] },
      startY: yTexto + 6,
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
      margin: { horizontal: 22, bottom: 40},
    });
    doc.setFontSize(10);
    yTexto = (doc as any).lastAutoTable.finalY;
    nextPage();
    doc.text('Intereses liquidados con corte a 28 de febrero de 2022 sin aplicar descuento del 80%', 22, yTexto + 4);
    doc.setFontSize(12);
    yTexto += 15;
    parrafo = `En este mismo sentido nos permitimos informarle que Cormacarena dando aplicación a  los artículos 46 y 47 de la ley 2155 del 14 de septiembre de 2021, adoptó beneficios para los usuarios con obligaciones pendientes por pagar que se generaron con anterioridad al 30 de junio del año 2021, por concepto de Tasas (Tasa por utilización de agua, tasa retributiva, tasa compensatoria por caza de fauna silvestre y tasa de aprovechamiento forestal) otorgando descuentos del 80% del valor de los intereses moratorios.`;
    lineas = doc.splitTextToSize(parrafo,  anchoPagina - 44);
    lineas.forEach((linea: any) => {
      nextPage();
      doc.text(linea, margenIzquierdo, yTexto);
      yTexto += lineaAltura;
    });
    yTexto += 6;
    parrafo = `De acuerdo con lo anterior, comedidamente me permito invitarlos a que cancelen la suma adeudada antes de la fecha de corte de intereses aquí establecida, en caso de querer acogerse al beneficio de descuento  favor comunicarse al celular 310 206 1032 o al correo electrónico  gruporentas@cormacarena.gov.co manifestando su intención para generar la liquidación correspondiente.`;
    lineas = doc.splitTextToSize(parrafo,  anchoPagina - 44);
    lineas.forEach((linea: any) => {
      nextPage();
      doc.text(linea, margenIzquierdo, yTexto);
      yTexto += lineaAltura;
    });
    yTexto += 6;
    parrafo = `Así mismo se le informa que pueden realizar el pago por concepto de Tasa por Utilización de Agua en la Cuenta de ahorros del banco BBVA No 854001633 ahorros convenio 33366.`;
    // parrafo = `Así mismo se le informa que puede realizar el pago por concepto de Tasa Retributiva en la Cuenta del banco BBVA No 854001641 ahorros convenio 33365.`;
    lineas = doc.splitTextToSize(parrafo,  anchoPagina - 44);
    lineas.forEach((linea: any) => {
      nextPage();
      doc.text(linea, margenIzquierdo, yTexto);
      yTexto += lineaAltura;
    });
    yTexto += 6;
    parrafo = `También  puede efectuar su pago en línea o transferencia electrónica ingresando a la página web www.cormacarena.gov.co en el enlace «consulte y pague su obligación».`;
    lineas = doc.splitTextToSize(parrafo,  anchoPagina - 44);
    lineas.forEach((linea: any) => {
      nextPage();
      doc.text(linea, margenIzquierdo, yTexto);
      yTexto += lineaAltura;
    });
    yTexto += 6;
    parrafo = `De no tener respuesta suya, entenderemos su renuencia al pago, y nos veremos avocados a iniciar el cobro por vía coactiva con la onerosidad que esto le ocasionaría.`;
    lineas = doc.splitTextToSize(parrafo,  anchoPagina - 44);
    lineas.forEach((linea: any) => {
      nextPage();
      doc.text(linea, margenIzquierdo, yTexto);
      yTexto += lineaAltura;
    });
    yTexto += 6;
    parrafo = `En caso de haber efectuado ya el pago, favor haga caso omiso a la presente comunicación y allegue copia de la consignación al siguiente correo electrónico  gruporentas@cormacarena.gov.co, o en las  oficinas de CORMACARENA para que obre como prueba y dar por terminado este proceso de cobro persuasivo.`;
    lineas = doc.splitTextToSize(parrafo,  anchoPagina - 44);
    lineas.forEach((linea: any) => {
      nextPage();
      doc.text(linea, margenIzquierdo, yTexto);
      yTexto += lineaAltura;
    });
    yTexto += 6;
    nextPage();
    doc.text("Cualquier duda por favor comuníquese al celular 310 206 1032.", margenIzquierdo, yTexto);
    yTexto += 10;
    if (yTexto > (alturaPagina - 40)) {
      doc.addPage();
      yTexto = 30;
    }
    doc.text("Cordialmente,", margenIzquierdo, yTexto);
    yTexto += 15;
    nextPage();
    doc.text("___________________________", margenIzquierdo, yTexto);
    doc.text("FERNANDO RUEDA LONDOÑO", margenIzquierdo, yTexto + 6);
    doc.text("Coordinador Grupo Rentas", margenIzquierdo, yTexto + 12);
    autoTable(doc, {
      columns: columns,
      body: data2,
      theme: 'grid',
      styles: {
        cellPadding: 2,
        fontSize: 9,
        valign: 'middle',
        halign: 'left',
      },
      headStyles: {
        fillColor: [140, 140, 140],
        fontStyle: 'bold'
      },
      startY: yTexto + 18,
      margin: { horizontal: 22, bottom: 40 },
      tableWidth: 'auto',
      columnStyles: {
        nombre: { cellWidth: 'auto' },
        cargo: { cellWidth: 'auto' },
        firma: { cellWidth: 'auto' }
      },
      willDrawCell: (data) => {
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
            src={resolucion_url || visor}
            type="application/pdf"
            width="100%"
            height="1080px"
          />
        </Grid>
      </Grid>
    </>
  )
}