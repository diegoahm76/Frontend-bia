import JsPDF from 'jspdf';
import 'jspdf-autotable'; // Importa la librería jspdf-autotable para habilitar la función autoTable

// eslint-disable-next-line @typescript-eslint/naming-convention
export const download_pdf = ({ nurseries, columns }: any): JSX.Element => {


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

    const doc = new JsPDF();

    const header_img_data = '../image/imagenes/PDF2.jpg'; // Reemplaza con la ruta de la imagen que deseas utilizar
    const img_width = 50; // Ancho de la imagen en unidades mm
    const img_height = 50; // Alto de la imagen en unidades mm
    const page_width = doc.internal.pageSize.getWidth(); // Ancho de la página en unidades mm

    const img_x = (page_width - img_width) / 2; // Posición horizontal centrada
    const img_y = 10; // Posición vertical en la parte superior

    doc.addImage(header_img_data, 'jpg', img_x, img_y, img_width, img_height);

    const start_y = img_y + img_height + 10; // Posición vertical para iniciar los encabezados y datos

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

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const handleClick = (): void => {
        doc.save(file_name);
    };

    return (
        <button style={button_style} onClick={handleClick}>
            PDF
        </button>
    );
};










// import JsPDF from 'jspdf';

// // eslint-disable-next-line @typescript-eslint/naming-convention
// export const download_pdf = ({ nurseries, columns }: any): JSX.Element => {

//     const doc = new JsPDF();


//      const header_img_data = '../image/imagenes/PDF.jpg'; // Reemplaza con la ruta de la imagen que deseas utilizar
//     const img_width = 50; // Ancho de la imagen en unidades mm
//     const img_height = 50; // Alto de la imagen en unidades mm
//     const page_width = doc.internal.pageSize.getWidth(); // Ancho de la página en unidades mm

//     const img_x = (page_width - img_width) / 2; // Posición horizontal centrada
//     const img_y = 10; // Posición vertical en la parte superior

//     doc.addImage(header_img_data, 'jpg', img_x, img_y, img_width, img_height);


//  const start_y = img_y + img_height + 10; // Posición vertical para iniciar los encabezados y datos


//     const data: any[][] = [];
//     const headers: any[] = [];

//     const button_style = {
//         color: 'white',
//         backgroundColor: 'red',
//         // border: '3px solid black',
//         borderRadius: '50%',
//         width: '40px',
//         height: '40px',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginRight: '10px'
//     };

//     // Obtener los nombres de las columnas de la cuadrícula
//     columns.forEach((column: any) => {
//         headers.push(column.headerName);
//     });

//     // Obtener los datos de las filas de la cuadrícula
//     nurseries.forEach((row: any) => {
//         const row_data: any[] = [];

//         columns.forEach((column: any) => {
//             const cell_data = row[column.field as keyof typeof row];
//             row_data.push(cell_data);
//         });

//         data.push(row_data);
//     });

//     (doc as any).autoTable({
//         head: [headers],
//         body: data,
//     });

//     const file_id = Math.random();
//     const file_name = `Resultados_de_la_busqueda_${file_id}.pdf`;

// // eslint-disable-next-line @typescript-eslint/naming-convention
//   const handleClick = ():void => {
//         doc.save(file_name);
//     };

//     return (
//         <button style={button_style} onClick={handleClick}>
//          PDF
//         </button>
//     );
// };

    // const doc = new JsPDF();

    // const header_img_data = '../image/imagenes/PDF.jpg'; // Reemplaza con la ruta de la imagen que deseas utilizar
    // const img_width = 50; // Ancho de la imagen en unidades mm
    // const img_height = 50; // Alto de la imagen en unidades mm
    // const page_width = doc.internal.pageSize.getWidth(); // Ancho de la página en unidades mm

    // const img_x = (page_width - img_width) / 2; // Posición horizontal centrada
    // const img_y = 10; // Posición vertical en la parte superior

    // doc.addImage(header_img_data, 'jpg', img_x, img_y, img_width, img_height);

    // const start_y = img_y + img_height + 10; // Posición vertical para iniciar los encabezados y datos

    // const data: any[][] = [];

    // // Obtener la longitud máxima de filas para determinar la cantidad de veces que se repetirán los datos de las columnas
    // const max_rows = Math.max(...columns.map((column: any) => nurseries.length));

    // // Obtener los nombres de las columnas de la cuadrícula y sus datos repetidos
    // columns.forEach((column: any) => {
    //     const header = column.headerName;
    //     const column_data = nurseries.map((nursery: any) => nursery[column.field as keyof typeof nursery]);

    //     const repeated_column_data: any[] = [];
    //     for (let i = 0; i < max_rows; i++) {
    //         repeated_column_data.push(...column_data);
    //     }

    //     const column_data_with_header = [header, ...repeated_column_data];
    //     data.push(column_data_with_header);
    // });

    // // Obtener la longitud máxima de datos en las columnas
    // const max_data_length = Math.max(...data.map((column_data: any[]) => column_data.length));

    // // Imprimir los encabezados y datos en cada línea
    // for (let i = 0; i < max_data_length; i++) {
    //     const line_data = data.map((column_data: any[]) => (Boolean(column_data[i])) || '');
    //     const line_text = line_data.join(' - '); // Concatenar los datos separados por '-'
    //     const text_x = 10; // Posición horizontal del texto
    //     const text_y = start_y + (i * 10); // Posición vertical del texto
    //     doc.text(line_text, text_x, text_y);
    // }

    // const file_id = Math.random(); // Reemplaza con la variable que contenga el ID
    // const file_name = `products_${file_id}.pdf`; // Nombre del archivo con el ID concatenado

    // doc.save(file_name);



