/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useRef } from 'react';
import type { DownloadButtonProps } from './types/types';
import {
  DEFAULT_BETA_DOWNLOAD_FILES_URL,
  DEFAULT_PROD_DOWNLOAD_FILES_URL,
} from '../../api/axios';

export const DownloadButton = ({
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
          fileUrl.includes(
            process.env.NODE_ENV === 'development'
              ? process.env.REACT_APP_DOWNLOAD_FILES_BETA ||
                  `${DEFAULT_BETA_DOWNLOAD_FILES_URL}`
              : process.env.REACT_APP_DOWNLOAD_FILES_PROD ||
                  `${DEFAULT_PROD_DOWNLOAD_FILES_URL}`
          )
            ? fileUrl
            : `${
                process.env.NODE_ENV === 'development'
                  ? process.env.REACT_APP_DOWNLOAD_FILES_BETA ||
                    `${DEFAULT_BETA_DOWNLOAD_FILES_URL}`
                  : process.env.REACT_APP_DOWNLOAD_FILES_PROD ||
                    `${DEFAULT_PROD_DOWNLOAD_FILES_URL}`
              }${fileUrl}`
        }
        ref={linkRef}
        style={{ display: 'none' }}
        download={fileName}
      />
      <Button
        // fullWidth
        variant="contained"
        disabled={condition}
        onClick={handleDownload}
      >
        <FileDownloadIcon />
      </Button>
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