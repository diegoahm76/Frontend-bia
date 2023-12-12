/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Button, Dialog, DialogContent, DialogActions } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { AgregarPaa_Codigos } from './AgregarPaa_Codigos';
import { ListarPaaCodigos } from './ListarPaaCodigos';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { set_current_mode_paa_codigos } from '../../../store/slice/indexPlanes';
import CloseIcon from '@mui/icons-material/Close';

interface IProps {
  open_dialog: boolean;
  set_open_dialog: Dispatch<SetStateAction<boolean>>;
}

export const DialogPaaCodigos: React.FC<IProps> = ({
  open_dialog,
  set_open_dialog,
}) => {
  //   const handle_click_open = (): void => {
  //     set_open_dialog(true);
  //   };

  const handle_close = (): void => {
    set_open_dialog(false);
  };

  const { mode_paa_codigos } = useAppSelector((state) => state.planes);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      set_current_mode_paa_codigos({
        ver: false,
        crear: false,
        editar: false,
      })
    );
  }, []);

  return (
    <>
      <Dialog open={open_dialog} onClose={handle_close} fullWidth maxWidth="lg">
        <DialogContent>
          {/* <Title title="Búsqueda avanzada" /> */}
          <ListarPaaCodigos />
          {mode_paa_codigos.crear || mode_paa_codigos.editar ? (
            <AgregarPaa_Codigos />
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button
            color="error"
            variant="outlined"
            startIcon={<CloseIcon />}
            onClick={() => {
              handle_close();
            }}
          >
            Cerrar
          </Button>{' '}
        </DialogActions>
      </Dialog>
    </>
  );
};
