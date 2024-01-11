/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */

import { Grid, TextField } from '@mui/material';
import { Title } from '../../../../../../../../../components';
import { useContext } from 'react';
import { ResSolicitudUsuarioContext } from '../../../../context/ResSolicitudUsarioContext';
import { useSelector } from 'react-redux';
import { api } from '../../../../../../../../../api/axios';


interface DataRegistePortal {
  auth: {
    userinfo: {
      tipo_documento: string;
      numero_documento: string;
      nombre_de_usuario: string;
    
    };  
  };

}


export const PerSolicitaRequerimiento = (): JSX.Element => {
  //* context declaration
  const { infoInicialUsuario } = useContext(ResSolicitudUsuarioContext);

  const { userinfo:{numero_documento, nombre_de_usuario,tipo_documento} } = useSelector((state: DataRegistePortal) => state.auth);




  return (
    <Grid
      item
      xs={12}
      sx={{
        mt: '2rem',
        justifyContent: 'center',
      }}
    >
      <Title title="Persona que realiza la respuesta" />
      <form
        style={{
          marginTop: '3rem',
          justifyContent: 'center',
        }}
      >
        <Grid
          sx={{
            justifyContent: 'center',
          }}
          container
          spacing={2}
        >
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              disabled
              size="small"
              label="Nombres"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              value={nombre_de_usuario ?? 'N/A'}
              inputProps={{
                maxLength: 50,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              disabled
              size="small"
              label="Apellidos"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              value={nombre_de_usuario?? 'N/A'}
              inputProps={{
                maxLength: 10,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size="small"
              label="Tipo de documento"
              disabled
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              value={
                tipo_documento?? 'N/A'
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size="small"
              label="Número de documento"
              variant="outlined"
              disabled
              InputLabelProps={{ shrink: true }}
              value={
                numero_documento?? 'N/A'
              }
            />
          </Grid>

        </Grid>
      </form>
    </Grid>
  );
};
