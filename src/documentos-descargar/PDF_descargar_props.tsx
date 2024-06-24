import { Button } from '@mui/material';
import JsPDF from 'jspdf';
import 'jspdf-autotable'; // Importa la librería jspdf-autotable para habilitar la función autoTable
import { useSelector } from 'react-redux';
import { AuthSlice } from '../commons/auth/interfaces';
import { useEffect } from 'react';

interface DownloadPDFProps {
    nurseries: any[];
    columns: any[];
    filtrers: any;
    nombre_archivo: string,
    title: string,
  }
// eslint-disable-next-line @typescript-eslint/naming-convention
export const download_pdf_props : React.FC<DownloadPDFProps> = (props: DownloadPDFProps) => {

    const {
        userinfo
      } = useSelector((state: AuthSlice) => state.auth);

    useEffect(() => console.log(userinfo, props), [props])

    const titulo:any = props.title;
    // //  console.log('')(titulo);
    const button_style = {
        color: 'white',
        backgroundColor: 'red',
        // border: '3px solid black',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '10px'
    };
      // eslint-disable-next-line @typescript-eslint/naming-convention
  const handleClick = (): void => {
    const doc = new JsPDF();

    const header_img_data = '../image/imagenes/PDF3.png'; // Reemplaza con la ruta de la imagen que deseas utilizar
    const img_width = 200; // Ancho de la imagen en unidades mm
    const img_height = 80; // Alto de la imagen en unidades mm
    const page_width = doc.internal.pageSize.getWidth(); // Ancho de la página en unidades mm

    const img_x = (page_width - img_width) / 2; // Posición horizontal centrada
    const img_y = 0; // Posición vertical en la parte superior

    doc.addImage(header_img_data, 'jpg', img_x, img_y, img_width, img_height);

    // Agregar la palabra "CARRETERA" en medio y por encima de la imagen
    const text_x = page_width / 2;
    const text_y =( img_y + img_height / 2)-5;
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text(titulo, text_x, text_y, { align: 'center' });

    const gato_text = 'Fecha: ' + new Date().toLocaleDateString() ;
    const gato_text_width = doc.getStringUnitWidth(gato_text) * 16; // Calcula el ancho del texto en mm
    const gato_x = text_x + gato_text_width / 2+8; // Calcula la posición x para centrar el texto
    const gato_y = text_y; // Mantiene la misma posición y que la palabra "CARRETERA"

    doc.text(gato_text, gato_x, gato_y, { align: 'center' });
    if(props.filtrers.length !== 0){
        doc.setFontSize(12);
        doc.text('Filtros', ((doc.internal.pageSize.width - doc.getTextWidth('Filtros')) / 2), 47);
        doc.setFontSize(11);
        doc.text('Tipo despacho: ' + props.filtrers[0].tipo_despacho, 15, 52);
        doc.text('Bien: ' + props.filtrers[0].nombre_bien, 70,52);
        doc.text('Unidad organizacional: ' + props.filtrers[0].nombre_unidad_org, 140, 52);
        doc.text('Discriminar: ' + props.filtrers[0].discriminar, 15, 57);
        doc.text('Fecha desde: ' + props.filtrers[0].fecha_desde, 70, 57);
        doc.text('Fecha hasta: ' + props.filtrers[0].fecha_hasta, 140, 57);
        doc.setFontSize(16);
    }


    const start_y = img_y + 5 + img_height -25; // Posición vertical para iniciar los encabezados y datos
    doc.setFontSize(12);
    doc.text(`Tercero: ${userinfo.numero_documento}`, img_x, start_y);
    doc.text(`Nombre: ${userinfo.nombre}`, img_x, start_y + 6);


    const data: any[][] = [];
    const headers: any[] = [];

    // Obtener los nombres de las columnas de la cuadrícula
    props.columns.forEach((column: any) => {
        headers.push(column.headerName);
    });

    // Obtener los datos de las filas de la cuadrícula
    props.nurseries.forEach((row: any) => {
        const row_data: any[] = [];

        props.columns.forEach((column: any) => {
            const cell_data = row[column.field as keyof typeof row];
            row_data.push(cell_data);
        });

        data.push(row_data);
    });

    // Utiliza la variable start_y como posición vertical de inicio en autoTable
    (doc as any).autoTable({
        head: [headers],
        body: data,
        startY: start_y + 40, // Utiliza la variable start_y para la posición vertical de inicio
    });

    const file_id = Math.floor(Math.random() * 99999);
    const file_name = `${props.nombre_archivo}_${file_id}.pdf`;
    doc.save(file_name);
    };

    return (
        <Button style={button_style} onClick={handleClick}>
            <img style={{ width: 45 }} src="../image/botones/PDF.png" alt="XLS Button" />
        </Button>
    );
};




