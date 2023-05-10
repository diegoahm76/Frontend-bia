import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  Select,
  TextField,
} from '@mui/material';
// import { type ISeguridadInfo } from '../../interfaces';
// import { type DataPersonas } from '../../../../interfaces/globalModels';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DatosIdentificacionComponent: ({
  legal_person,
}: any) => JSX.Element = ({ legal_person }: any) => {
  return (
    <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <FormControl required size="small" fullWidth>
            <InputLabel>Tipo de Persona</InputLabel>
            <Select label="Tipo de Persona" required>
              {/* //! TODO: REALIZAR EL SETEO DEL SELECT "TIPO PERSONA" */}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl required size="small" fullWidth>
            <InputLabel>Tipo de documento</InputLabel>
            <Select label="Tipo de documento" required>
              {/* //! TODO: REALIZAR EL SETEO DEL SELECT "TIPO DOCUMENTO" */}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            value={legal_person.numero_documento}
            label="Numero de documento"
            size="small"
            helperText="Ingrese numero de identificacion"
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            value={legal_person.digito_verificacion}
            label="Digito de verificacion"
            type="number"
            size="small"
            helperText="Ingrese digito de verificacion"
            required
            fullWidth
          />
        </Grid>
      </Grid>
    </Box>
  );
};
