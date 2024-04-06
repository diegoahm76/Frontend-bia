import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { useState, type Dispatch, type SetStateAction } from "react";
import { BusquedaPersona } from "../../../../../../../../components/BusquedaPersona";
import { type InfoPersona } from "../../../../../../../../interfaces/globalModels";
interface IProps {
    is_modal_active: boolean,
    set_is_modal_active: Dispatch<SetStateAction<boolean>>,
    title: string,
    set_persona: any
}
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
export const BuscadorPersonaDialog: React.FC<IProps> = (props: IProps) => {
    const [seleccion_persona, set_seleccion_persona] = useState<any>({});

    const set_persona_modal = (data: InfoPersona): void => {
        set_seleccion_persona(data);
    };
    const boton_seleccionar: any = () => {
        console.log(seleccion_persona);
        props.set_persona(seleccion_persona);
        props.set_is_modal_active(false);
    }
    
    return (
        <Dialog
            fullWidth
            maxWidth="lg"
            open={props.is_modal_active}
            onClose={() => { props.set_is_modal_active(false); }}
        >
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    <BusquedaPersona set_persona={set_persona_modal} />
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    color='primary'
                    variant='contained'
                    onClick={boton_seleccionar}>Seleccionar</Button>
                <Button
                    color='inherit'
                    variant='contained'
                    onClick={() => { props.set_is_modal_active(false); }}>Salir</Button>
            </DialogActions>
        </Dialog>
    )
}


