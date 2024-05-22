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


export const IncumplimientoFacilidadPagoDoc: React.FC<any> = ({
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
      doc.text('«Por medio de la cual se declara incumplida una Facilidad de pago»', doc.internal.pageSize.getWidth() / 2, 40, { align: 'center' });
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

      // doc.rect(xCuadro, yCuadro1, anchoCuadro, altoCuadro1);
      // doc.setFontSize(9);
      // doc.text('Al contestar cite el  número completo  de este oficio ', xCuadro + 5, yCuadro1 + 5);
3

      // Agregar texto dentro del cuadro
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
    let parrafo = `El funcionario ejecutor de Cobro Coactivo, en virtud de las facultades que le concede la Ley 6 de 1992, ley 1066 de 2006, Resolución No 170 de 1999 y 2.6.05112 de Febrero de 2005, y demás normas legales y complementarias,`;
    let lineas = doc.splitTextToSize(parrafo,  anchoPagina - 44);
    lineas.forEach((linea: any) => {
      doc.text(linea, margenIzquierdo, yTexto);
      yTexto += lineaAltura;
    });
    doc.text('CONSIDERANDO', anchoPagina / 2, yTexto + 8, { align: 'center' });
    yTexto += 18;
    parrafo = `Que con la entrada en vigencia de la ley 1066 de 2006, esta Corporación procederá el recaudo de cartera de Jurisdicción Coactiva por los lineamientos del Estatuto Tributario.`;
    lineas = doc.splitTextToSize(parrafo,  anchoPagina - 44);
    lineas.forEach((linea: any) => {
      doc.text(linea, margenIzquierdo, yTexto);
      yTexto += lineaAltura;
    });
    yTexto += 6;
    parrafo = `Que mediante resolución número PS-GJ.1.2.6.1.14.139 de fecha seis (06) de junio de 2014, CORMACARENA otorga una facilidad de pago a la empresa ${datos?.id_deudor?.nombres} ${datos?.id_deudor?.apellidos || ''}, identificada con el Nit. ${datos?.id_deudor?.identificacion}, en atención a la multa impuesta mediante la Resolución número PS-GJ.1.2.6.13.1858 de fecha veintitrés (23) de octubre de 2013.  Acto administrativo notificado de manera personal el día dos (02) de julio de 2014.`;
    lineas = doc.splitTextToSize(parrafo,  anchoPagina - 44);
    lineas.forEach((linea: any) => {
      doc.text(linea, margenIzquierdo, yTexto);
      yTexto += lineaAltura;
    });
    yTexto += 6;
    parrafo = `Que una vez revisado los Registros Contables de la Corporación, se verificó que la empresa ${datos?.id_deudor?.nombres} ${datos?.id_deudor?.apellidos || ''}, identificada con el Nit. ${datos?.id_deudor?.identificacion}, no cumplió con lo pactado en la facilidad de pago, y teniendo en cuenta lo establecido en el artículo cuarto de la Resolución número PS-GJ.1.2.6.1.14.139 de fecha seis (06) de junio de 2014, este despacho dispone la terminación anticipada de la facilidad de pago y se continuará con el trámite del proceso administrativo de cobro coactivo de la referencia.`;
    lineas = doc.splitTextToSize(parrafo,  anchoPagina - 44);
    lineas.forEach((linea: any) => {
      doc.text(linea, margenIzquierdo, yTexto);
      yTexto += lineaAltura;
    });
    yTexto += 6;
    doc.text("Por mérito de lo expuesto,", margenIzquierdo, yTexto);
    yTexto += 10;
    doc.text('RESUELVE', anchoPagina / 2, yTexto, { align: 'center' });
    yTexto += 8;
    parrafo = `ARTICULO PRIMERO: Declarar el incumplimiento de la facilidad de pago otorgada a la empresa ${datos?.id_deudor?.nombres} ${datos?.id_deudor?.apellidos || ''}, identificada con el Nit. ${datos?.id_deudor?.identificacion}, mediante la Resolución número PS-GJ.1.2.6.1.14.139 de fecha seis (06) de junio de 2014.`;
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
    parrafo = `ARTICULO SEGUNDO: Dejar sin efecto la Facilidad de pago otorgada a la empresa ${datos?.id_deudor?.nombres} ${datos?.id_deudor?.apellidos || ''}, identificada con el Nit.  ${datos?.id_deudor?.identificacion}, declarando sin vigencia el plazo concedido, por el no pago de las cuotas otorgadas.`;
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
    parrafo = `ARTICULO TERCERO: Reactivar los términos de prescripción de las obligaciones y reanudar el proceso administrativo de cobro coactivo de la referencia.`;
    lineas = doc.splitTextToSize(parrafo,  anchoPagina - 44);
    lineas.forEach((linea: any) => {
      doc.text(linea, margenIzquierdo, yTexto);
      yTexto += lineaAltura;
    });
    yTexto += 6;
    parrafo = `ARTICULO CUARTO: Contra la presente resolución procede el recurso de reposición ante el mismo funcionario que la profirió, dentro de los cinco (05) días hábiles siguientes a su notificación, quien deberá resolverlo dentro del mes siguiente a su interposición en debida forma, de conformidad al artículo 814-3 del Estatuto Tributario.  `;
    lineas = doc.splitTextToSize(parrafo,  anchoPagina - 44);
    lineas.forEach((linea: any) => {
      doc.text(linea, margenIzquierdo, yTexto);
      yTexto += lineaAltura;
    });
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