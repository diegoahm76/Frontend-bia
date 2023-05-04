import { Button, Grid, Stack } from "@mui/material"
import { Title } from "../../../components"
import { DatosIdentificacionComponent } from "../components/datosPersonales/DatosIdentificacionComponent"
import { DatosEmpresarialesComponent } from "../components/datosPersonales/DatosEmpresarialesComponent"
import { DatosNotificacionNacional } from "../components/datosPersonales/DatosNotificacionNacional"
import { DatosRepresentanteLegalComponent } from "../components/datosPersonales/DatosRepresentanteLegalComponent"
import { AutorizacionNotificacion } from "../components/datosPersonales/AutorizacionNotificacion"
import { DatosAdicionales } from "../components/datosPersonales/DatosAdicionales"

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DatosPersonalesScreen:React.FC = () => {
  return (
    <>
        <Grid
            container
            sx={{
                position: 'relative',
                background: '#FAFAFA',
                borderRadius: '15px',
                p: '20px',
                mb: '20px',
                boxShadow: '0px 3px 6px #042F4A26',
            }}
        >
            <Grid item xs={12}>
                <Title title="Datos de identificacion"></Title>
                <DatosIdentificacionComponent />
            </Grid>
        </Grid>

        <Grid
            container
            sx={{
                position: 'relative',
                background: '#FAFAFA',
                borderRadius: '15px',
                p: '20px',
                mb: '20px',
                boxShadow: '0px 3px 6px #042F4A26',
            }}
        >
            <Grid item xs={12}>
                <Title title="Datos empresariales"></Title>
                <DatosEmpresarialesComponent />
            </Grid>
        </Grid>

        <Grid
            container
            sx={{
                position: 'relative',
                background: '#FAFAFA',
                borderRadius: '15px',
                p: '20px',
                mb: '20px',
                boxShadow: '0px 3px 6px #042F4A26',
            }}
        >
            <Grid item xs={12}>
                <Title title="Datos de notificacion nacional"></Title>
                <DatosNotificacionNacional />
            </Grid>
        </Grid>

        <Grid
            container
            sx={{
                position: 'relative',
                background: '#FAFAFA',
                borderRadius: '15px',
                p: '20px',
                mb: '20px',
                boxShadow: '0px 3px 6px #042F4A26',
            }}
        >
            <Grid item xs={12}>
                <Title title="Datos de notificacion nacional"></Title>
                <DatosRepresentanteLegalComponent />
            </Grid>
        </Grid>

        <Grid
            container
            sx={{
                position: 'relative',
                background: '#FAFAFA',
                borderRadius: '15px',
                p: '20px',
                mb: '20px',
                boxShadow: '0px 3px 6px #042F4A26',
            }}
        >
            <Grid item xs={12}>
                <Title title="Autorizacion de notificacion y tratamiento de datos"></Title>
                <AutorizacionNotificacion />
            </Grid>
        </Grid>

        <Grid
            container
            sx={{
                position: 'relative',
                background: '#FAFAFA',
                borderRadius: '15px',
                p: '20px',
                mb: '20px',
                boxShadow: '0px 3px 6px #042F4A26',
            }}
        >
            <Grid item xs={12}>
                <Title title="Datos adicionales"></Title>
                <DatosAdicionales />
            </Grid>
        </Grid>
        
        <Stack
            direction="row"
            justifyContent="center"
            spacing={2}
            sx={{ p: '40px' }}
        >
            <Button
                color="success"
                variant="contained"
            >
                Actualizar
            </Button>
            <Button
                color="error"
                variant="contained"
            >
                Cancelar
            </Button>
        </Stack>
    </>
  )
}
