import { Box, Grid, TextField } from "@mui/material"

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Encabezado: React.FC = () => {
  return(
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
                label="Deudor"
                size="small"
                fullWidth
                value={`9007400212 - Aguas de Castilla`}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                disabled
                label="Año"
                size="small"
                fullWidth
                value={`2014`}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                disabled
                label="Proceso"
                size="small"
                fullWidth
                value={`EXP-2039212`}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                disabled
                label="Última Actualización"
                size="small"
                fullWidth
                value={`21-02-2023`}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                disabled
                label="Valor"
                size="small"
                fullWidth
                value={`$ 465.402,00`}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                disabled
                label="Funcionario"
                size="small"
                fullWidth
                value={`Luis Perez Gonzalez`}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
                <TextField
                  label="Etapa Actual"
                  size="small"
                  fullWidth
                  value={`EMBARGO`}
                  disabled
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      WebkitTextFillColor: "red",
                    },
                  }}
                />
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  )
}
