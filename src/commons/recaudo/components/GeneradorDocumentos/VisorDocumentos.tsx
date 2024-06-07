/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Grid,
  Button,
} from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CreateIcon from '@mui/icons-material/Create';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import { ModalConfirmacionMail } from './ModalConfirmacionMail';
import { useState } from 'react';
import { api } from '../../../../api/axios';
import { control_error, control_success } from '../../../../helpers';
import swal from 'sweetalert2';

export const VisorDocumentos: React.FC<any> = ({file, current_borrador, uplock_firma, set_uplock_firma, clean_template}: {file: any, current_borrador: any, uplock_firma: boolean, set_uplock_firma: (b: boolean) => void, clean_template: () => void}) => {
  const [open, setOpen] = useState(false);
  const [resetTime, setResetTime] = useState(false);

  const obtenerExtension = (url: any) => {
    return url.split('.').pop();
  }

  const new_firma_code = async () => {
    try {
      const url = `gestor/trd/codigo-verificacion-create/`;
      const response = await api.post(url, {id_consecutivo: current_borrador?.id_consecutivo_tipologia});
      control_success('Código de verificación enviado correctamente');
      setOpen(true);
      setResetTime(true)
    } catch (error: any) {
      control_error(error.response.data.detail);
    }
  }

  const put_firma_code = async (code: string) => {
    try {
      const url = `gestor/trd/codigo-verificacion-validacion/`;
      const response = await api.put(url, {id_consecutivo: current_borrador?.id_consecutivo_tipologia, codigo: code });
      control_success('Documento firmado correctamente');
      setOpen(false);
      set_uplock_firma(false);
      if(response.data && response?.data?.finalizo){
        setTimeout(() => {
          control_success('El documento ha sido finalizado. Todas las firmas se han validado correctamente.')
        }, 500)
      }
    } catch (error: any) {
      control_error(error.response.data.detail);
    }
  }

  const alert_firma = () => {
    swal.fire({
      title: 'Firma de Documento',
      text: 'Al enviar recibirá el código de verificación en su dirección de correo asociada',
      icon: 'warning',
      confirmButtonText: 'Enviar código',
      confirmButtonColor: '#3085d6',
    }).then((result) => {
      if (result.isConfirmed) {
        new_firma_code();
      }
    });
  }

  const handle_firma = () => {
    alert_firma();
    // new_firma_code();
  }

  return (
    <Grid item xs={12} sm={12}>
      {(file) && (
        <>
          <Grid sx={{display: 'flex', justifyContent: 'center', gap: '1rem', mb: '1.5rem'}}>
            <a href={file} target="_blank" rel="noopener noreferrer">
              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{width: '200px'}}
                endIcon={<CloudDownloadIcon />}
              >
                Descargar
              </Button>
            </a>
            <Button
              fullWidth
              sx={{width: '250px'}}
              variant="contained"
              color="primary"
              endIcon={<CreateIcon />}
              onClick={handle_firma}
              disabled={!uplock_firma}
            >
              Firmar Documento
            </Button>
            <Button
              fullWidth
              sx={{width: '250px'}}
              variant="outlined"
              color="primary"
              endIcon={<CleaningServicesIcon />}
              onClick={clean_template}
            >
              Limpiar Pantalla
            </Button>
          </Grid>
          {(obtenerExtension(file) == 'docx' || obtenerExtension(file) == 'doc') && <DocViewer
            pluginRenderers={DocViewerRenderers}
            documents={[{ uri: file, fileType: obtenerExtension(file) }]}
            style={{height: 1000, width: '70%', display: 'flex', margin: 'auto'}}
          />}
          {(obtenerExtension(file) !== 'docx' && obtenerExtension(file) !== 'doc') && <embed
            style={{display: 'flex', margin: 'auto'}}
            src={file}
            type="application/pdf"
            width="70%"
            height="1080px"
          />}
          <ModalConfirmacionMail
            open={open}
            resetTime={resetTime}
            setOpen={setOpen}
            setResetTime={setResetTime}
            put_firma_code={put_firma_code}
            new_firma_code={new_firma_code}
          />
        </>
      )}
    </Grid>
  );
}