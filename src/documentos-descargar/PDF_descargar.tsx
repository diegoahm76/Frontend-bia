
import 'jspdf-autotable';
import JsPDF from 'jspdf';

export const  download_pdf = ({ nurseries, columns }: any): void => {
    const doc = new JsPDF();

    const data: any[][] = [];
    const headers: any[] = [];

    // Obtener los nombres de las columnas de la cuadrícula
    columns.forEach((column: any) => {
        headers.push(column.headerName);
    });

    // Obtener los datos de las filas de la cuadrícula
    nurseries.forEach((nursery: any) => {
        const row_data: any[] = [];

        columns.forEach((column: any) => {
            const cell_data = nursery[column.field as keyof typeof nursery];
            row_data.push(cell_data);
        });

        data.push(row_data);
    });

    (doc as any).autoTable({
        head: [headers],
        body: data,
    });

    const file_id = Math.random(); // Reemplaza con la variable que contenga el ID
    const file_name = `products_${file_id}.pdf`; // Nombre del archivo con el ID concatenado

    doc.save(file_name);
};