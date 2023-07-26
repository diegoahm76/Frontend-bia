import { Box, Grid, TextField } from "@mui/material"
import type { Proceso } from "../../interfaces/proceso"

interface IProps {
  proceso: Proceso;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Encabezado = ({ proceso }: IProps): JSX.Element => {
  return (
    <Grid
      container
      sx={{
        position: 'relative',
        background: '#FAFAFA',
        borderRadius: '15px',
        mb: '20px',
        mt: '20px',
        p: '20px',
        boxShadow: '0px 3px 6px #042F4A26',
      }}
    >
      <Grid item xs={12}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <TextField
                disabled
                label="Fecha facturación"
                size="small"
                fullWidth
                value={proceso?.id_cartera?.fecha_facturacion ?? ''}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                disabled
                label="Número factura"
                size="small"
                fullWidth
                value={proceso?.id_cartera?.numero_factura ?? ''}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                disabled
                label="Código contable"
                size="small"
                fullWidth
                value={proceso?.id_cartera?.codigo_contable ?? ''}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                disabled
                label="Estado actual"
                size="small"
                fullWidth
                value={proceso?.id_etapa?.etapa ?? ''}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "red",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                disabled
                label="Monto inicial"
                size="small"
                fullWidth
                value={proceso?.id_cartera?.monto_inicial ?? ''}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                disabled
                label="Días de mora"
                size="small"
                fullWidth
                value={proceso?.id_cartera?.dias_mora ?? ''}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                disabled
                label="Valor intereses"
                size="small"
                fullWidth
                value={proceso?.id_cartera?.valor_intereses ?? ''}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                disabled
                label="Valor sanción"
                size="small"
                fullWidth
                value={proceso?.id_cartera?.valor_sancion ?? ''}
              />
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  )
}
