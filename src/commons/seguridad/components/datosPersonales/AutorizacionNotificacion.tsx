import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  Select,
  Stack,
} from '@mui/material';
import { useState } from 'react';
import { AutorizacionNotificacionConfiguracion } from '../../screens/AutorizacionNotificacionConfiguracion';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AutorizacionNotificacion: React.FC = () => {
  const [modal_notificacion, set_modal_notificacion] = useState<boolean>(false);

  return (
    <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
      <Grid container>
        <Grid item container spacing={2} xs={12} sm={4}>
          <Grid item xs={12} sm={12}>
            <FormControl required size="small" fullWidth>
              <InputLabel>¿Autoriza?</InputLabel>
              <Select label="¿Autoriza?" required>
                {/* //! TODO: REALIZAR EL SETEO DEL SELECT */}
              </Select>
              <FormHelperText>
                Autoriza notificaciones judiciales por correo electronico
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormControl required size="small" fullWidth>
              <InputLabel>¿Autoriza?</InputLabel>
              <Select label="¿Autoriza?" required>
                {/* //! TODO: REALIZAR EL SETEO DEL SELECT */}
              </Select>
              <FormHelperText>
                Autoriza notificaciones informativas a traves de mensajes de
                texto
              </FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
        <Stack justifyContent="center" spacing={2} sx={{ pl: '40px' }}>
          <Button
            color="info"
            variant="contained"
            onClick={() => {
              set_modal_notificacion(true);
            }}
          >
            Cambiar
          </Button>
        </Stack>
      </Grid>
      {modal_notificacion && (
        <AutorizacionNotificacionConfiguracion
          is_modal_active={modal_notificacion}
          set_is_modal_active={set_modal_notificacion}
        />
      )}
    </Box>
  );
};
