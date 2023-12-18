import { Grid, Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClearIcon from '@mui/icons-material/Clear';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { SeccionGeneral } from "./SeccionGeneral";
const class_css = {
    position: 'relative',
    background: '#FAFAFA',
    borderRadius: '15px',
    p: '20px',
    mb: '20px',
    boxShadow: '0px 3px 6px #042F4A26',
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const TramitesOServiciosScreen: React.FC = () => {
    const navigate = useNavigate();
    const [expediente, set_expediente] = useState<any>(null);
    const [documento, set_documento] = useState<any>(null);
    const [limpiar, set_limpiar] = useState<boolean>(false);

    useEffect(() => {
        if (limpiar) {
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
                <SeccionGeneral></SeccionGeneral>
            </Grid>
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