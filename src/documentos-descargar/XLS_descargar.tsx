import 'jspdf-autotable';
import * as XLSX from 'xlsx';

export const Dowlade_Xls = ({ nurseries: nurseries, columns: columns }: any): void => {
  
    const rows = document.querySelectorAll('.MuiDataGrid-row');
    const header_cells = document.querySelectorAll('.MuiDataGrid-cell--header');
    const data: any[][] = [];

    const headers = Array.from(header_cells).map((cell) => cell.textContent);

    rows.forEach((row) => {
      const row_data: any[] = [];
      const cells = row.querySelectorAll('.MuiDataGrid-cell');

      cells.forEach((cell) => {
        row_data.push(cell.textContent);
      });

      data.push(row_data);
    });

    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]); // Combina headers con los subarreglos de data
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');

    const file_i = Math.random(); // Reemplaza con la variable que contenga el ID
    const file_nnn = `productos_${file_i}.xlsx`; // Nombre del archivo con el ID concatenado

    XLSX.writeFile(workbook, file_nnn);
  
  
  };


