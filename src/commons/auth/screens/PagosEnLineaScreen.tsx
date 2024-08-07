/* eslint-disable @typescript-eslint/naming-convention */
// import logo_bia from '.../../../assets/logos/logo_bia.png';
import { Button, Grid, TextField } from '@mui/material';
import { LoginForm } from '../components/LoginForm/LoginForm';
import { AuthLayout } from '../layouts/AuthLayout';
import { Title } from '../../../components';
import { Footer } from '../components/PagosEnLinea/Footer';
import { api } from '../../../api/axios';
import { useState } from 'react';
import { control_error, control_success } from '../../../helpers';
export interface FormData {
  identificacion: any;
  referencia: any;
}

export const PagosEnLineaScreen: React.FC = () => {
  const initialFormData: FormData = {
    identificacion: '',
    referencia: '',
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleInputSelect = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const [historico, setHistorico] = useState<any | null>(null);
  const fetchHistorico = async (): Promise<void> => {
    try {
      const url = `/recaudo/liquidaciones/liquidacion-tramite/get-document/?numero_documento=${formData.identificacion}&ref_pago=${formData.referencia}`;
      const res = await api.get(url, { responseType: 'arraybuffer' });
  
      if (res.headers['content-type'] === 'application/json') {
        const errorData = JSON.parse(Buffer.from(res.data).toString('utf8'));
        throw new Error(errorData.detail);
      }
  
      control_success("Documento encontrado");
      const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(pdfBlob);
  
      setHistorico(pdfUrl);
    } catch (error: any) {
      console.error(error);
      
      const errorMessage = error.response?.data?.detail || "No se encontraron datos";
      control_error(errorMessage);
      setHistorico(null);
    }
  };
  const isButtonDisabled = !formData.identificacion || !formData.referencia;

  
  

  return (
    <>
      <Grid
        container
        direction={'column'}
        padding={2}
        sx={{
          minHeight: '100vh',
          backgroundColor: '#042f4a',
          backgroundImage: `linear-gradient(269deg, rgba(20, 146, 230, 0.7) 0%, rgba(6, 47, 72, 0.7) 34%, rgba(54, 89, 22, 0.7) 100%), url(../image/imagenes/FondoCormaca.jpg)`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Grid
          container
          sx={{
            position: 'relative',
            background: '#FAFAFA',
            borderRadius: '15px',
            p: '20px',
            mb: '20px',
            boxShadow: '0px 3px 6px #042F4A26',
          }}
        >
          
          <Grid item xs={12} marginY={2}>
            
            <Title title="Pagos en Línea"></Title>
          </Grid>
          <Grid container xs={12} spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                size="small"
                label="Número de identificación"
                variant="outlined"
                fullWidth
                 name="identificacion" 
                value={formData.identificacion}
                onChange={handleInputSelect}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                size="small"
                label="Referencia de Pago"
                variant="outlined"
                fullWidth
                name="referencia" 
                value={formData.referencia}
                onChange={handleInputSelect}
                
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                // disabled={isButtonDisabled}
                onClick={() => {
                  fetchHistorico();
                }}
              >
                Consultar
              </Button>
            </Grid>
           
          </Grid>
        </Grid> 
        {historico && (
           <Grid
           container
           sx={{
             position: 'relative',
             background: '#FAFAFA',
             borderRadius: '15px',
             p: '20px',
             mb: '20px',
             boxShadow: '0px 3px 6px #042F4A26',
           }}
         >
              <Grid item xs={12} marginTop={2}>
                <iframe
                  src={historico}
                  width="100%"
                  height="1000px"
                  style={{ border: 'none' }}
                ></iframe>
              </Grid>
              </Grid>
            )} 
      </Grid>
      {/* <Footer /> */}
    </>
  );
};
