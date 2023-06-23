import JsPDF from 'jspdf';

export const download_pdf = ({ nurseries, columns }: any): void => {
    const doc = new JsPDF();

    const header_img_data = '../image/imagenes/PDF.jpg'; // Reemplaza con la ruta de la imagen que deseas utilizar
    const img_width = 50; // Ancho de la imagen en unidades mm
    const img_height = 50; // Alto de la imagen en unidades mm
    const page_width = doc.internal.pageSize.getWidth(); // Ancho de la página en unidades mm

    const img_x = (page_width - img_width) / 2; // Posición horizontal centrada
    const img_y = 10; // Posición vertical en la parte superior

    doc.addImage(header_img_data, 'jpg', img_x, img_y, img_width, img_height);

    const start_y = img_y + img_height + 10; // Posición vertical para iniciar los encabezados y datos

    const data: any[][] = [];

    // Obtener la longitud máxima de filas para determinar la cantidad de veces que se repetirán los datos de las columnas
    const max_rows = Math.max(...columns.map((column: any) => nurseries.length));

    // Obtener los nombres de las columnas de la cuadrícula y sus datos repetidos
    columns.forEach((column: any) => {
        const header = column.headerName;
        const column_data = nurseries.map((nursery: any) => nursery[column.field as keyof typeof nursery]);

        const repeated_column_data: any[] = [];
        for (let i = 0; i < max_rows; i++) {
            repeated_column_data.push(...column_data);
        }

        const column_data_with_header = [header, ...repeated_column_data];
        data.push(column_data_with_header);
    });

    // Obtener la longitud máxima de datos en las columnas
    const max_data_length = Math.max(...data.map((column_data: any[]) => column_data.length));

    // Imprimir los encabezados y datos en cada línea
    for (let i = 0; i < max_data_length; i++) {
        const line_data = data.map((column_data: any[]) => column_data[i] || '');
        const line_text = line_data.join(' - '); // Concatenar los datos separados por '-'
        const text_x = 10; // Posición horizontal del texto
        const text_y = start_y + (i * 10); // Posición vertical del texto
        doc.text(line_text, text_x, text_y);
    }

    const file_id = Math.random(); // Reemplaza con la variable que contenga el ID
    const file_name = `products_${file_id}.pdf`; // Nombre del archivo con el ID concatenado

    doc.save(file_name);
};