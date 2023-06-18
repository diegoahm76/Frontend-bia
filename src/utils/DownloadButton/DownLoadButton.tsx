/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useRef } from 'react';
import type { DownloadButtonProps } from './types/types';

export const DownloadButton = ({
  fileUrl,
  fileName,
  condition
}: DownloadButtonProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);

  const handleDownload = () => {
    if (linkRef.current != null) {
      linkRef.current.click();
    }
  };

  return (
    <>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={fileUrl}
        ref={linkRef}
        style={{ display: 'none' }}
        download={fileName}
      />
      <Button variant="contained" disabled={condition} onClick={handleDownload}>
        <FileDownloadIcon />
      </Button>
    </>
  );
};
