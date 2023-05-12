import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { type Dispatch, type SetStateAction } from "react";
import { BuscadorPersona } from "../../../../../../../../components/BuscadorPersona"
import { type InfoPersona } from "../../../../../../../../interfaces/globalModels";
interface IProps {
    is_modal_active: boolean,
    set_is_modal_active: Dispatch<SetStateAction<boolean>>,
    title: string
}
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
export const BuscadorPersonaDialog: React.FC<IProps> = (props: IProps) => {
    const on_result = (data: InfoPersona): void => {
        console.log(data);
    };
    const seleccion_persona: any = () => {
        
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
                            <BuscadorPersona onResult={on_result} />
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    color='primary'
                    variant='contained'
                    onClick={seleccion_persona}>Seleccionar</Button>
                <Button
                    color='inherit'
                    variant='contained'
                    onClick={() => { props.set_is_modal_active(false); }}>Salir</Button>
            </DialogActions>
        </Dialog>
    )
}


