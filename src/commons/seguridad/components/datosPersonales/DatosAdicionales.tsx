import { Box, Grid, TextField } from "@mui/material"

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DatosAdicionales:React.FC = () => {
  return (
        <Box
            component="form"
            sx={{ mt: '20px' }}
            noValidate
            autoComplete="off"
        >
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <TextField
                        label="Telefono fijo"
                        size="small"
                        helperText="Telefono fijo de la empresa"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        label="Telefono movil"
                        size="small"
                        helperText="Telefono movil complementario"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        type="email"
                        label="Correo electronico complementario"
                        size="small"
                        helperText="Ingrese email complementario"
                        fullWidth
                    />
                </Grid>
            </Grid>
        </Box>
  )
}
