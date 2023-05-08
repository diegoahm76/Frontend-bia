import { Box, FormControl, Grid, InputLabel, Select, TextField } from "@mui/material"

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DatosRepresentanteLegalComponent:React.FC = () => {
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
                    <InputLabel>CC</InputLabel>
                    <Select
                        label="CC"
                        required
                    >
                        {/* //! TODO: REALIZAR EL SETEO DEL SELECT "CC" */}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                    label="Numero de documento"
                    size="small"
                    required
                    helperText="Ingrese numero de documento"
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                {/* //! TODO: REALIZAR EL BOTON DE "TIPO DOCUMENTO" */}
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                    label="Nombre del representante legal"
                    size="small"
                    required
                    helperText="Ingrese nombre del representante legal"
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                    label="Tipo documento"
                    size="small"
                    required
                    helperText="Ingrese tipo documento"
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                    label="Numero de documento"
                    size="small"
                    required
                    helperText="Ingrese numero de documento"
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                    label="Telefono movil"
                    size="small"
                    required
                    helperText="Ingrese telefono movil"
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                    label="Direccion"
                    size="small"
                    required
                    helperText="Ingrese direccion"
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                    label="Ciudad"
                    size="small"
                    required
                    helperText="Ingrese ciudad"
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                    label="Correo electronico"
                    size="small"
                    required
                    helperText="Ingrese correo electronico"
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                    type="date"
                    size="small"
                    required
                    helperText="Fecha en que inicio como representante legal en la empresa"
                    fullWidth
                />
            </Grid>
        </Grid>
    </Box>
  )
}
