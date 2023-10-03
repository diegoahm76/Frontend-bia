/* eslint-disable @typescript-eslint/naming-convention */
import * as XLSX from 'xlsx';
import Button from '@mui/material/Button';

interface DownloadXLSProps {
  nurseries: any[];
  columns: any[];
  filtrers: any;
  nombre_archivo: string,
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const download_xls_props: React.FC<DownloadXLSProps> = (props: DownloadXLSProps) => {
  const handle_download = (): void => {
    const data: any[][] = [];
    const headers1 = props.columns.map((column: any) => column.headerName);
    data.push(headers1);
    props.nurseries.forEach((nursery) => {
      const row_data: any[] = [];
      props.columns.forEach((column: any) => {
        row_data.push(nursery[column.field as keyof typeof nursery]);
      });

      data.push(row_data);
    });
    const workbook = XLSX.utils.book_new();
    if(props.filtrers.length != 0){
      const worksheet = XLSX.utils.json_to_sheet(props.filtrers);
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Filtros');
    }
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');

    const file_id = Math.floor(Math.random() * 99999);
    const file_name = `${props.nombre_archivo}_${file_id}.xlsx`;

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