import { Grid, Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import ClearIcon from '@mui/icons-material/Clear';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { BusquedaExpediente } from "./BusquedaExpediente";
import { InformacionExpediente } from "./InformacionExpediente";
import { DocumentosExpediente } from "./DocumentosExpediente";
dayjs.extend(dayOfYear);
const class_css = {
    position: 'relative',
    background: '#FAFAFA',
    borderRadius: '15px',
    p: '20px',
    mb: '20px',
    boxShadow: '0px 3px 6px #042F4A26',
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const ConsultaExpedientesDocScreen: React.FC = () => {
    const navigate = useNavigate();
    const [expediente, set_expediente] = useState<any>(null);
    const [documento, set_documento] = useState<any>(null);
    const [limpiar, set_limpiar] = useState<boolean>(false);

    useEffect(() => {
        if (limpiar) {
            set_expediente(null);
            set_documento(null);
            set_limpiar(false);
        }
    }, [limpiar]);

    const limpiar_formulario = (): void => {
        set_limpiar(true);
    }

    const salir_expediente: () => void = () => {
        navigate('/home');
    }

    return (
        <>
            <Grid
                container
                sx={class_css}
            >
                <BusquedaExpediente set_expediente={set_expediente} limpiar={limpiar} set_documento={set_documento}></BusquedaExpediente>
            </Grid>
            {expediente !== null && <Grid
                container
                sx={class_css}
            >
                <InformacionExpediente expediente={expediente}></InformacionExpediente>
            </Grid>}
            {documento !== null && <Grid
                container
                sx={class_css}
            >
                <DocumentosExpediente expediente={expediente} documento={documento} set_documento={set_documento}></DocumentosExpediente>
            </Grid>}
            <Grid container>
                <Grid item xs={12} sm={12}>
                    <Stack
                        direction="row"
                        justifyContent="flex-end"
                        spacing={2}
                        sx={{ mt: '10px' }}
                    >
                        <Button
                            // color='inherit'
                            variant="outlined"
                            startIcon={<CleanIcon />}
                            onClick={() => { limpiar_formulario() }}
                        >
                            Limpiar
                        </Button>
                        <Button
                            color="error"
                            variant='contained'
                            startIcon={<ClearIcon />}
                            onClick={() => { salir_expediente() }}
                        >
                            Salir
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </>
    )
}