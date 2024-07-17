
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import JsBarcode from 'jsbarcode';
import { Button, Grid } from '@mui/material';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
interface IProps {
    variable:any; 
    configData:any;
  }
export const Barras: React.FC<IProps> = ({variable,configData}) => {
  // Variables estáticas
  
  const IDENTIFICADOR_BIEN = variable;

  const [codigoGenerado, setCodigoGenerado] = useState<string>('');

  const handleGenerarCodigo = () => {
    const canvas = document.createElement('canvas');
    JsBarcode(canvas, IDENTIFICADOR_BIEN, {
      
      displayValue: true,
      margin: 2,
      width: -2, // Ajusta el ancho del código de barras
      height: 80, // Ajusta la altura del código de barras
    });
    const imageDataUrl = canvas.toDataURL('image/png');
    setCodigoGenerado(imageDataUrl);
  };
  
  useEffect(() => {
    handleGenerarCodigo();
  }, [configData?.referencia_actual]);
  
  return (
    <>
      {/* <Grid item xs={12} lg={4}>
        <Button
          fullWidth
          type="button"
          onClick={handleGenerarCodigo}
          variant="contained"
          color="success"
          startIcon={<QrCodeScannerIcon />}
        >
          Generar Código
        </Button>
      </Grid> */}
      
        <Grid item xs={12}>
      
        </Grid>
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          {codigoGenerado && (
            <img src={codigoGenerado} alt="Código de Barras" style={{ border: '1px solid #d6d6d6', borderRadius: '5px' }} />
          )}
        </Grid>
      
    </>
  );
};
