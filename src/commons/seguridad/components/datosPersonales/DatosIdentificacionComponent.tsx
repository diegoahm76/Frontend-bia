import {
    Box,
    FormControl,
    Grid,
    InputLabel,
    Select,
    TextField
} from "@mui/material"

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DatosIdentificacionComponent:React.FC = () => {
  return (
        <Box
            component='form'
            sx={{ mt: '20px' }}
            noValidate
            autoComplete="off"
        >
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <FormControl required size="small" fullWidth>
                        <InputLabel>Tipo de Persona</InputLabel>
                        <Select
                            label="Tipo de Persona"
                            required
                        >
                            {/* //! TODO: REALIZAR EL SETEO DEL SELECT "TIPO PERSONA" */}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl required size="small" fullWidth>
                        <InputLabel>Tipo de documento</InputLabel>
                        <Select
                            label="Tipo de documento"
                            required
                        >
                            {/* //! TODO: REALIZAR EL SETEO DEL SELECT "TIPO DOCUMENTO" */}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        label="Numero de documento"
                        size="small"
                        helperText="Ingrese numero de identificacion"
                        required
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
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
  )
}
