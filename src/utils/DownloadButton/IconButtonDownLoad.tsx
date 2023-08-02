/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { Avatar, IconButton } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useRef } from 'react';
import type { DownloadButtonProps } from './types/types';
import { baseURL } from '../../api/axios';

export const IconButtonDownLoad = ({
  fileUrl,
  fileName,
  condition,
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
        href={
          fileUrl &&
          fileUrl.includes(baseURL)
            ? fileUrl
            : `https://back-end-bia-beta.up.railway.app${fileUrl}`
        }
        ref={linkRef}
        style={{ display: 'none' }}
        download={fileName}
      />
      <IconButton size="small" disabled={condition} onClick={handleDownload}>
        <Avatar
          sx={{
            width: 24,
            height: 24,
            background: '#fff',
            border: '2px solid',
          }}
          variant="rounded"
        >
          <FileDownloadIcon
            titleAccess="Ver o descargar"
            sx={{
              color: 'primary.main',
              width: '18px',
              height: '18px',
            }}
          />
        </Avatar>
      </IconButton>
    </>
  );
};

/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/naming-convention */
/*  import { render, screen, fireEvent } from '@testing-library/react';
  import { DownloadButton } from '../DownLoadButton';
  
  
  describe('DownloadButton', () => {
    test('renders button and triggers download', () => {
      const fileUrl = 'https://example.com/file.pdf';
      const fileName = 'example.pdf';
      const condition = false;
  
      render(
        <DownloadButton fileUrl={fileUrl} fileName={fileName} condition={condition} />
      );
  
      const button = screen.getByRole('button');
      fireEvent.click(button);
  
      const downloadLink = screen.getByRole('link', { hidden: true }) as HTMLAnchorElement;
      expect(downloadLink.href).toBe(fileUrl);
      expect(downloadLink.download).toBe(fileName);
    });
  }); */
