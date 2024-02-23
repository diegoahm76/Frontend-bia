import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Stack,
} from '@mui/material';
import { Title } from '../../../../../components';
import { RenderDataGrid } from '../../../../gestorDocumental/tca/Atom/RenderDataGrid/RenderDataGrid';
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useState } from 'react';
import { api } from '../../../../../api/axios';
import { showAlert } from '../../../../../utils/showAlert/ShowAlert';
import { columns_historico_vinculaciones } from './columns/columnsHistorico';
import { control_success } from '../../../../../helpers';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ModalVinculacionesAnteriores = ({
  nombre_completo = '',
  id_persona = 0,
  set_modal_vinculaciones_anteriores = () => {},
  modal_vinculaciones_anteriores = false,
}: {
  nombre_completo: string;
  id_persona: number;
  set_modal_vinculaciones_anteriores: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  modal_vinculaciones_anteriores: boolean;
}): JSX.Element => {
  const [historico_persona, set_historico_persona] = useState<any[]>([]);

  useEffect(() => {
    if (!modal_vinculaciones_anteriores) {
      return;
    }

    if (id_persona === 0) {
      showAlert('Atención!', 'No se ha seleccionado una persona', 'warning');
      return;
    }

    (async () => {
      try {
        const url = `transversal/vinculacion/get-historico-cargo-und/${id_persona}/`;
        const response = await api.get(url);
        set_historico_persona(response?.data?.data);
        control_success('Historico de vinculaciones obtenido');
      } catch (error: any) {
        showAlert(
          'Atención!',
          `${error?.response?.data?.detail}, se cerrará el modal`,
          'warning',
          false
        );
        setTimeout(() => {
          set_modal_vinculaciones_anteriores(false);
        }, 3000);
        set_historico_persona([]);
      }
    })();

    return () => {
      set_modal_vinculaciones_anteriores(false);
    };
  }, [modal_vinculaciones_anteriores]);

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={modal_vinculaciones_anteriores}
        onClose={() => {
          set_modal_vinculaciones_anteriores(false);
        }}
      >
        <Box component="form">
          <DialogTitle>
            <Title
              title={`Histórico de vinculaciones asociadas a: ${nombre_completo}`}
            />
          </DialogTitle>
          <DialogContent
            sx={{
              mt: '1.3rem',
              mb: '1.3rem',
              justifyContent: 'center',
            }}
          >
            <Grid
              container
              spacing={2}
              sx={{
                justifyContent: 'center',
              }}
            >
              {/*segund parte - anexos que sse han puesto en la solicitud */}

              <RenderDataGrid
                rows={historico_persona ?? []}
                columns={columns_historico_vinculaciones ?? []}
              />
            </Grid>
          </DialogContent>
          <DialogActions>
            <Stack
              direction="row"
              spacing={2}
              sx={{ mr: '15px', mb: '10px', mt: '10px' }}
            >
              <Button
                color="error"
                variant="outlined"
                onClick={() => {
                  set_modal_vinculaciones_anteriores(false);
                }}
                startIcon={<CloseIcon />}
              >
                CERRAR
              </Button>
            </Stack>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};
