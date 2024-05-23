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
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';

export const VisorDocumentos: React.FC<any> = ({file}: {file: any}) => {
  return (
    <Grid item xs={12} sm={12}>
      {(file) && (
        <>
          <Grid sx={{display: 'flex', m: 'auto', width: '200px', mb: '1.5rem'}}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              href={file}
              download
              endIcon={<CloudDownloadIcon />}
            >
              Descargar
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              endIcon={<CloudDownloadIcon />}
            >
              Firmar Documento
            </Button>
          </Grid>
          <DocViewer
            pluginRenderers={DocViewerRenderers}
            documents={[{ uri: file, fileType: 'docx' }]}
            style={{height: 800, width: '70%', display: 'flex', margin: 'auto'}}
          />
        </>
      )}
    </Grid>
  );
}