import { Grid } from '@mui/material';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { open_drawer_desktop } from '../../../../store/layoutSlice';


// eslint-disable-next-line @typescript-eslint/naming-convention
const PrintResumenPDF: FC = () => {
  const dispatch = useDispatch();

  const imprimir_pdf = async() => {
    // Cerrar el drawer para que no se vea en el PDF
    await dispatch(open_drawer_desktop(false));
    // Imprimir el PDF
    await window.print();
    // Volver a abrir el drawer
    dispatch(open_drawer_desktop(true));
  }

  return (
    <>
      <Grid item xs={12} sx={{
        display: 'flex',
        justifyContent: 'end'
      }}>
        <button style={{
          color: 'white',
          backgroundColor: 'red',
          // border: '3px solid black',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: '10px',
          cursor: 'pointer'
        }} onClick={imprimir_pdf}>
          <img style={{ width: 45 }} src="../image/botones/PDF.png" alt="XLS Button" />
        </button>
      </Grid>
    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default PrintResumenPDF;