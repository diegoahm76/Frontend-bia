import * as XLSX from 'xlsx';
import Button from '@mui/material/Button';

interface DownloadXLSProps {
  nurseries: any[];
  columns: any;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const download_xls: React.FC<DownloadXLSProps> = ({ nurseries, columns }) => {

  const button_style = {
    color: 'white',
    backgroundColor: '#335B1E',
    // border: '3px solid black',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '10px'
  };
  const handle_download = (): void => {
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

    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');

    const file_id = Math.random();
    const file_name = `productos_${file_id}.xlsx`;

    XLSX.writeFile(workbook, file_name);
  };

  return (
    <Button style={button_style} onClick={handle_download}>
      <img style={{width:45}} src='../image/botones/xlsboton.png'></img>
    </Button>
  );
};