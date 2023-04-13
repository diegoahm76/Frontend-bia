import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { type Dispatch, type SetStateAction } from "react";

interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
  title: string;
}
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const BuscarArticuloComponent = ({
  is_modal_active,
  set_is_modal_active,
  title,
}: IProps) => {
    return (
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        <Dialog
        fullWidth
        maxWidth="sm"
        open={is_modal_active}
        onClose={() => { set_is_modal_active(false); }}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { set_is_modal_active(false); }}>Cerrar</Button>
          <Button onClick={() => { set_is_modal_active(false); }}>Agregar</Button>
        </DialogActions>
      </Dialog>
    )
}
// eslint-disable-next-line no-restricted-syntax
export default BuscarArticuloComponent;