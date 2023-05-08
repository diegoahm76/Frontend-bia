import {
    Box,
    FormControl,
    Grid,
    InputLabel,
    Select,
    TextField
} from "@mui/material"

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DatosNotificacionNacional:React.FC = () => {
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
                        <InputLabel>Pais</InputLabel>
                        <Select
                            label="Pais"
                            required
                        >
                            {/* //! TODO: REALIZAR EL SETEO DEL SELECT "PAIS" */}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl required size="small" fullWidth>
                        <InputLabel>Departamento</InputLabel>
                        <Select
                            label="Departamento"
                            required
                        >
                            {/* //! TODO: REALIZAR EL SETEO DEL SELECT "DEPARTAMENTO" */}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl required size="small" fullWidth>
                        <InputLabel>Ciudad</InputLabel>
                        <Select
                            label="Ciudad"
                            required
                        >
                            {/* //! TODO: REALIZAR EL SETEO DEL SELECT "CIUDAD" */}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Direccion"
                        size="small"
                        required
                        helperText="Ingrese direccion de residencia"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Complemento direccion"
                        size="small"
                        helperText="Ingrese complemento de direccion"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        label="Correo electronico notificacion"
                        type="email"
                        size="small"
                        helperText="Ingrese correo electronico para notificacion"
                        required
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        label="Telefono movil notificacion"
                        type="tel"
                        size="small"
                        helperText="Ingrese telefono movil para notificacion"
                        fullWidth
                    />
                </Grid>
            </Grid>
        </Box>
  )
}
