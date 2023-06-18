/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

interface DownloadButtonProps {
  fileUrl: string;
  fileName: string;
  ccd_current: any;
}
export const DownloadButton = ({ fileUrl, fileName, ccd_current }: DownloadButtonProps) => {
  const handleDownload = () => {
    console.log(ccd_current)
    const link = document.createElement('a');
    link.href = fileUrl;
    link.target = '_blank';
    link.download = fileName;
    link.click();
  };

  return (
    <Button
    variant="contained"

    disabled={ccd_current === null || ccd_current?.ruta_soporte === null || ccd_current?.ruta_soporte === ''}
    onClick={handleDownload}>
      <FileDownloadIcon
       /* sx={{
          color: ccd_current?.ruta_soporte === null || ccd_current?.ruta_soporte === '' ? 'disabled' : 'primary',
          backgroundColor: ccd_current?.ruta_soporte === null || ccd_current?.ruta_soporte === '' ? 'red' : 'primary',
        }} */
      />
    </Button>
  );
};
