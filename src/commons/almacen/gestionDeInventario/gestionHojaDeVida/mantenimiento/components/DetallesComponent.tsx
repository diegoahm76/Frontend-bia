import { 
    Box, 
    Grid, 
    TextField 
} from "@mui/material"

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DetallesComponent:React.FC = () => {
  return (
    <>
        <Box
            component="form"
            sx={{ mt: '20px'}}
            noValidate
            autoComplete="off"
        >
        <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
                <TextField
                    label="Marca"
                    helperText="Seleccione Marca"
                    size="small"
                    required
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                    label="Serial/Placa"
                    helperText="Seleccione Serial/Placa"
                    size="small"
                    required
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                    label="Modelo"
                    helperText="Seleccione Modelo"
                    size="small"
                    required
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                    label="Kilometraje"
                    helperText="Seleccione Kilometraje"
                    size="small"
                    required
                    fullWidth
                />
            </Grid>
        </Grid>
        </Box>
    </>
  )
}
