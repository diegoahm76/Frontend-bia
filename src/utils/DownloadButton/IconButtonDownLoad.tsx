/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { Avatar, IconButton } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useRef } from 'react';
import type { DownloadButtonProps } from './types/types';
import { DEFAULT_BETA_DOWNLOAD_FILES_URL, DEFAULT_PROD_DOWNLOAD_FILES_URL, baseURL } from '../../api/axios';

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
          fileUrl && fileUrl.includes(baseURL)
            ? fileUrl
            : `${
                process.env.NODE_ENV === 'production'
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
