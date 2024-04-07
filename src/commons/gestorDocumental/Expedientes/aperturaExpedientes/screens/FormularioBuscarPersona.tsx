import { Grid, TextField, Box, Button, Stack, FormHelperText, ToggleButton, FormLabel, InputLabel, FormControl, Select, MenuItem, type SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import { BuscadorPersonaDialog } from "../../../../almacen/gestionDeInventario/gestionHojaDeVida/mantenimiento/components/RegistroMantenimiento/RegistroMantenimientoGeneral/BuscadorPersonaDialog";
import SearchIcon from '@mui/icons-material/Search';
import { get_tipo_documento } from "../../../../../request";
import { control_error } from "../../../../../helpers";

interface IProps {
    seccion: boolean,
    set_persona_titular?: any
    expediente?: any
    set_persona_responsable?: any
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const FormularioBuscarPersona: React.FC<IProps> = (props: IProps) => {
    const [abrir_modal_persona, set_abrir_modal_persona] = useState<boolean>(false);
    useEffect(() => {
        //  console.log('')(props.expediente?.expediente);
    }, [props.expediente]);
    return (
        <>
            {props.seccion && <Grid item xs={12} sm={3}>
                <Button
                    color='primary'
                    variant='contained'
                    startIcon={<SearchIcon />}
                    onClick={() => { set_abrir_modal_persona(true); }}
                    disabled={props.expediente?.expediente.length !== 0 && props.expediente?.expediente !== undefined}
                >
                    Buscar persona
                </Button>
                {abrir_modal_persona && (
                    <BuscadorPersonaDialog
                        is_modal_active={abrir_modal_persona}
                        set_is_modal_active={set_abrir_modal_persona}
                        title={"Busqueda de persona titular"}
                        set_persona={props.set_persona_titular} />
                )}
            </Grid>}
            {!props.seccion &&
                <Grid item xs={12} sm={3}>
                    <Button
                        color='primary'
                        variant='contained'
                        startIcon={<SearchIcon />}
                        onClick={() => { set_abrir_modal_persona(true); }}
                        disabled={props.expediente?.expediente.length !== 0 && props.expediente?.expediente !== undefined}
                    >
                        Buscar persona
                    </Button>
                    {abrir_modal_persona && (
                        <BuscadorPersonaDialog
                            is_modal_active={abrir_modal_persona}
                            set_is_modal_active={set_abrir_modal_persona}
                            title={"Busqueda de persona responsable"}
                            set_persona={props.set_persona_responsable} />
                    )}
                </Grid>}
        </>
    )
}