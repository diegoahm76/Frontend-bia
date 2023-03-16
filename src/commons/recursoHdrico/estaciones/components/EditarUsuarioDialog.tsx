import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import type React from 'react';
import { type Dispatch, type SetStateAction } from 'react';

interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EditarUsuarioDialog: React.FC<IProps> = ({ is_modal_active, set_is_modal_active }) => {

  // const edit_model_estacion = {
  //   nombre_estacion: "", 
  //   cod_tipo_estacion: "",
  //   latitud: 0,
  //   longitud: 0,
  //   cod_municipio: "",
  //   indicaciones_ubicacion: "",
  // };  

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/naming-convention
  const handleClose = ()=> {
    set_is_modal_active(false);
  }

  return (
    <Dialog open={is_modal_active} onClose={handleClose}>
      <DialogTitle>Crear Estación</DialogTitle>
      <DialogContent>
        <div>Aquí va el contenido del diálogo</div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button variant="contained" color="primary" onClick={handleClose}>Guardar</Button>
      </DialogActions>
    </Dialog>
  );
}
