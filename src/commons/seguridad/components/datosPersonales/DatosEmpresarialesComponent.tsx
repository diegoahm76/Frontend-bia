import {
    Box,
    FormControl,
    Grid,
    InputLabel,
    Select,
    TextField
} from "@mui/material"

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DatosEmpresarialesComponent:React.FC = () => {
  return (
        <Box
            component="form"
            sx={{ mt:'20px' }}
            noValidate
            autoComplete="off"
        >
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Razon Social"
                        size="small"
                        helperText="Ingrese la razon social"
                        required
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Nombre Comercial"
                        size="small"
                        helperText="Ingrese el nombre comercial"
                        required
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl required size="small" fullWidth>
                        <InputLabel>Naturaleza de la empresa</InputLabel>
                        <Select
                            label="Naturaleza de la empresa"
                            required
                        >
                            {/* //! TODO: REALIZAR EL SETEO DEL SELECT "NATURALEZA EMPRESA" */}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl required size="small" fullWidth>
                        <InputLabel>Nacionalidad empresa</InputLabel>
                        <Select
                            label="Nacionalidad empresa"
                            required
                        >
                            {/* //! TODO: REALIZAR EL SETEO DEL SELECT "NACIONALIDAD EMPRESA" */}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </Box>
  )
}
