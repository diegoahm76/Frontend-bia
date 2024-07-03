/* eslint-disable @typescript-eslint/naming-convention */
import { Grid, TextField } from '@mui/material';
import { Title } from '../../../../../../../../../components';
import { useContext, useEffect } from 'react';
import { ResSolicitudUsuarioContext } from '../../../../context/ResSolicitudUsarioContext';

export const PersonaTitular = (): JSX.Element => {

  //* context declaration
  const {respuestaPqrsdfMade, respuestaPqrs} = useContext(ResSolicitudUsuarioContext);

  return (
    <Grid
      item
      xs={12}
      sx={{
        mt: '2rem',
      }}
    >
      <Title title="Persona titular del PQRSDF" />
      <form
        style={{
          marginTop: '3rem',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              disabled
              size="small"
              label="Nombres"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              value={`${respuestaPqrs?.info_persona_titular?.primer_nombre || ''} ${respuestaPqrs?.info_persona_titular?.segundo_nombre || ''}` || 'N/A'}
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
              value={`${respuestaPqrs?.info_persona_titular?.primer_apellido || ''} ${respuestaPqrs?.info_persona_titular?.segundo_apellido || ''}` || 'N/A'}
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
              value={respuestaPqrsdfMade?.tipo_documento_persona_titular || `${respuestaPqrs?.info_persona_titular?.tipo_documento}` || 'N/A'}
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
              value={respuestaPqrsdfMade?.numero_documento_persona_titular || `${respuestaPqrs?.info_persona_titular?.numero_documento}` || 'N/A'}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="Email"
              variant="outlined"
              disabled
              InputLabelProps={{ shrink: true }}
              value={respuestaPqrs?.info_persona_titular?.email || 'N/A'}
            />
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};
