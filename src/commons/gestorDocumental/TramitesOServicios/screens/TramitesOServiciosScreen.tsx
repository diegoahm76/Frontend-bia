import { Grid, Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClearIcon from '@mui/icons-material/Clear';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { SeccionGeneral } from "./SeccionGeneral";
import { obtener_usuario_logueado } from "../../Expedientes/aperturaExpedientes/thunks/aperturaExpedientes";
import { useAppDispatch } from "../../../../hooks";
import { get_info_persona } from "../thunks/TramitesOServicios";
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
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [usuario, set_usuario] = useState<any>(null);
    const [usuario_cache, set_usuario_cache] = useState<any>(null);
    const [limpiar, set_limpiar] = useState<boolean>(false);

    useEffect(() => {
        obtener_usuario_logueado_fc();
    }, []);

    const obtener_usuario_logueado_fc: () => void = () => {
        dispatch(obtener_usuario_logueado()).then((response: any) => {
            console.log(response)
            set_usuario_cache(response);
            dispatch(get_info_persona(response.id_persona)).then((user: any) => {
                set_usuario(user.data);
            })
        })
    }
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
                <SeccionGeneral usuario={usuario} usuario_cache={usuario_cache}></SeccionGeneral>
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