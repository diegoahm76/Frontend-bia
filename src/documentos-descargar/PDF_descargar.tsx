import JsPDF from 'jspdf';
import 'jspdf-autotable'; // Importa la librería jspdf-autotable para habilitar la función autoTable

// eslint-disable-next-line @typescript-eslint/naming-convention
export const download_pdf = ({ nurseries, columns, title }: any): JSX.Element => {

    const titulo:any = title;
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

    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text(gato_text, gato_x, gato_y, { align: 'center' });


    const start_y = img_y + img_height -25; // Posición vertical para iniciar los encabezados y datos

    const data: any[][] = [];
    const headers: any[] = [];

    // Obtener los nombres de las columnas de la cuadrícula
    columns.forEach((column: any) => {
        headers.push(column.headerName);
    });

    // Obtener los datos de las filas de la cuadrícula
    nurseries.forEach((row: any) => {
        const row_data: any[] = [];

        columns.forEach((column: any) => {
            const cell_data = row[column.field as keyof typeof row];
            row_data.push(cell_data);
        });

        data.push(row_data);
    });

    // Utiliza la variable start_y como posición vertical de inicio en autoTable
    (doc as any).autoTable({
        head: [headers],
        body: data,
        startY: start_y, // Utiliza la variable start_y para la posición vertical de inicio
    });

    const file_id = Math.random();
    const file_name = `Resultados_de_la_busqueda_${file_id}.pdf`;

 
        doc.save(file_name);
    };

    return (
        <button style={button_style} onClick={handleClick}>
            <img style={{ width: 45 }} src="../image/botones/PDF.png" alt="XLS Button" />
        </button>
    );
};



export const download_pdf_dos = ({ nurseries, columns, title }: any): JSX.Element => {

    const titulo:any = title;
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

    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text(gato_text, gato_x, gato_y, { align: 'center' });


    const start_y = img_y + img_height -25; // Posición vertical para iniciar los encabezados y datos

    const data: any[][] = [];
    const headers: any[] = [];

    // Obtener los nombres de las columnas de la cuadrícula
    columns.forEach((column: any) => {
        headers.push(column.header);
    });

    // Obtener los datos de las filas de la cuadrícula
    nurseries.forEach((row: any) => {
        const row_data: any[] = [];

        columns.forEach((column: any) => {
            const cell_data = row[column.field as keyof typeof row];
            row_data.push(cell_data);
        });

        data.push(row_data);
    });

    // Utiliza la variable start_y como posición vertical de inicio en autoTable
    (doc as any).autoTable({
        head: [headers],
        body: data,
        startY: start_y, // Utiliza la variable start_y para la posición vertical de inicio
    });

    const file_id = Math.random();
    const file_name = `Resultados_de_la_busqueda_${file_id}.pdf`;

 
        doc.save(file_name);
    };

    return (
        <button style={button_style} onClick={handleClick}>
            <img style={{ width: 45 }} src="../image/botones/PDF.png" alt="XLS Button" />
        </button>
    );
};




