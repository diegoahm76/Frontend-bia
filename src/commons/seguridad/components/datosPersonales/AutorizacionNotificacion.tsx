import { Box, FormControl, FormHelperText, Grid, InputLabel, Select } from "@mui/material"

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AutorizacionNotificacion:React.FC = () => {
  return (
    <Box
        component="form"
        sx={{ mt: '20px' }}
        noValidate
        autoComplete="off"
    >
        <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
                <FormControl required size="small" fullWidth>
                    <InputLabel>¿Autoriza?</InputLabel>
                    <Select
                        label="¿Autoriza?"
                        required
                    >
                        {/* //! TODO: REALIZAR EL SETEO DEL SELECT */}
                    </Select>
                    <FormHelperText>Autoriza notificaciones judiciales por correo electronico</FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
                <FormControl required size="small" fullWidth>
                    <InputLabel>¿Autoriza?</InputLabel>
                    <Select
                        label="¿Autoriza?"
                        required
                    >
                        {/* //! TODO: REALIZAR EL SETEO DEL SELECT */}
                    </Select>
                    <FormHelperText>Autoriza notificaciones informativas a traves de mensajes de texto</FormHelperText>
                </FormControl>
            </Grid>
        </Grid>
    </Box>
  )
}
