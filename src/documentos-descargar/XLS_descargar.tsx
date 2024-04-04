/* eslint-disable @typescript-eslint/naming-convention */
import * as XLSX from 'xlsx';
import Button from '@mui/material/Button';

interface DownloadXLSProps {
  nurseries: any[];
  columns: any[];
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const download_xls: React.FC<DownloadXLSProps> = ({ nurseries, columns }) => {


  // console.log(columns);
  // console.log('')("---------------------------------");
  // console.log('filas',nurseries);  
  const handle_download = (): void => {
    const data: any[][] = [];

     const headers1 = columns.map((column: any) => column.headerName);
  
    // const headers2 = columns.map((column: any) => column.header);
      data.push(headers1);






    nurseries.forEach((nursery) => {
      const row_data: any[] = [];
      columns.forEach((column: any) => {
        row_data.push(nursery[column.field as keyof typeof nursery]);
      });

      data.push(row_data);
    });

    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');

    const file_id = Math.random();
    const file_name = `productos_${file_id}.xlsx`;

    XLSX.writeFile(workbook, file_name);
  };

  const button_style = {
    color: 'white',
    backgroundColor: '#335B1E',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '10px'
  };

  return (
    <Button style={button_style} onClick={handle_download}>
      <img style={{ width: 45 }} src="../image/botones/xlsboton.png" alt="XLS Button" />
    </Button>
  );
};




export const download_xls_dos: React.FC<DownloadXLSProps> = ({ nurseries, columns }) => {

    const handle_download = (): void => {
      const data: any[][] = [];
  
      //  const headers1 = columns.map((column: any) => column.headerName);
    
       const headers2 = columns.map((column: any) => column.header);
        data.push(headers2);
  
  
  
  
  
  
      nurseries.forEach((nursery) => {
        const row_data: any[] = [];
        columns.forEach((column: any) => {
          row_data.push(nursery[column.field as keyof typeof nursery]);
        });
  
        data.push(row_data);
      });
  
      const worksheet = XLSX.utils.aoa_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');
  
      const file_id = Math.random();
      const file_name = `productos_${file_id}.xlsx`;
  
      XLSX.writeFile(workbook, file_name);
    };
  
    const button_style = {
      color: 'white',
      backgroundColor: '#335B1E',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '10px'
    };
  
    return (
      <Button style={button_style} onClick={handle_download}>
        <img style={{ width: 45 }} src="../image/botones/xlsboton.png" alt="XLS Button" />
      </Button>
    );
  };