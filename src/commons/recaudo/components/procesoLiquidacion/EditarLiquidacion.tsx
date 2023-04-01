import { Button, Grid, Stack, TextField, Typography } from "@mui/material"

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EditarLiquidacion:React.FC = () => {
  return (
    <>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
                <TextField
                    label='Deudor'
                    helperText='Ingrese Deudor'
                    size="small"
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                    label='Factura'
                    helperText='Ingrese Factura'
                    size="small"
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                    label='Monto Inicial'
                    helperText='Ingrese Monto Inicial'
                    size="small"
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                    type="date"
                    helperText='Ingrese Año'
                    size="small"
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                    type="date"
                    helperText='Ingrese Periodo'
                    size="small"
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                    label='Concepto'
                    helperText='Ingrese Concepto'
                    size="small"
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                    label='Codigo Contable'
                    helperText='Ingrese Codigo Contable'
                    size="small"
                    fullWidth
                />
            </Grid>
        </Grid>

        <Grid
            container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignContent: 'center',
                pb: '10px'
            }}
        >
            <Typography color='#00ACFF'>Total de la obligacion</Typography>
            <Typography variant="h4">$576.942</Typography>
        </Grid>

        <Stack
            direction="row"
            justifyContent="center"
            spacing={2}
        >
            <Button
                color="success"
                variant="contained"
            >
                Guardar
            </Button>
        </Stack>
    </>
  )
}
