/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  Dialog,
  Switch,
  Chip,
  Typography,
} from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CreateIcon from '@mui/icons-material/Create';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import { ModalConfirmacionMail } from './ModalConfirmacionMail';
import { useState } from 'react';

export const VisorDocumentos: React.FC<any> = ({ file }: { file: any }) => {
  const [open, setOpen] = useState(false);

  return (
    <Grid item xs={12} sm={12}>
      {file && (
        <>
          <Grid
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem',
              mb: '1.5rem',
            }}
          >
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ width: '200px' }}
              href={file}
              download
              endIcon={<CloudDownloadIcon />}
            >
              Descargar
            </Button>
            {/* <Button
              fullWidth
              sx={{width: '250px'}}
              variant="contained"
              color="primary"
              endIcon={<CreateIcon />}
              onClick={() => setOpen(true)}
            >
              Firmar Documento
            </Button> */}
          </Grid>
          <DocViewer
            pluginRenderers={DocViewerRenderers}
            documents={[{ uri: file, fileType: 'docx' }]}
            style={{
              height: 800,
              width: '70%',
              display: 'flex',
              margin: 'auto',
            }}
          />
          <ModalConfirmacionMail open={open} setOpen={setOpen} />
        </>
      )}
    </Grid>
  );
};
