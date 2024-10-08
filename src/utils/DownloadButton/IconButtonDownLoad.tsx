/* eslint-disable @typescript-eslint/naming-convention */
import { Avatar, IconButton } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useRef } from 'react';
import type { DownloadButtonProps } from './types/types';
import { DEFAULT_BETA_DOWNLOAD_FILES_URL, DEFAULT_PROD_DOWNLOAD_FILES_URL, baseURL } from '../../api/axios';

export const IconButtonDownLoad = ({
  fileUrl = '', // default value if null or undefined
  fileName = '', // default value if null or undefined
  condition = true, // default value if null or undefined
}: DownloadButtonProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);

  const handleDownload = () => {
    if (linkRef.current) {
      linkRef.current.click();
    }
  };

  const getDownloadUrl = () => {
    const baseUrl =
      process.env.NODE_ENV === 'development'
        ? process.env.REACT_APP_DOWNLOAD_FILES_BETA || DEFAULT_BETA_DOWNLOAD_FILES_URL
        : process.env.REACT_APP_DOWNLOAD_FILES_PROD || DEFAULT_PROD_DOWNLOAD_FILES_URL;

    return fileUrl ? `${baseUrl}${fileUrl}` : ''; // return empty string if fileUrl is null or undefined
  };

  return (
    <>
      <a
        target="_blank"
        rel="noopener noreferrer"

        href={getDownloadUrl()}

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