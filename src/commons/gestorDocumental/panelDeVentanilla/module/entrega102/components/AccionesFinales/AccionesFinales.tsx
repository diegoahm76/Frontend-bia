/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Grid, Stack } from '@mui/material';
import { containerStyles } from '../../../../../tca/screens/utils/constants/constants';
import { Title } from '../../../../../../../components';
import {
  getOutModule,
  reset_all,
} from '../../../../../../../utils/functions/getOutOfModule';
import { resetPanelVentanillaFull } from '../../../../toolkit/store/PanelVentanillaStore';
import CloseIcon from '@mui/icons-material/Close';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../../../hooks';
import { useContext } from 'react';
import { AsignacionGrupoContext } from '../../context/AsignacionGrupoContext';
import SaveIcon from '@mui/icons-material/Save';
import { control_warning } from '../../../../../../almacen/configuracion/store/thunks/BodegaThunks';
import Swal from 'sweetalert2';
import { LoadingButton } from '@mui/lab';
import { ModalAndLoadingContext } from '../../../../../../../context/GeneralContext';
import { postAsignacionGrupo } from '../../services/postAsignacionGrupo.service';
import { getAsignaciones } from '../../services/getAsignaciones.service';

export const AccionesFinales = (): JSX.Element => {
  //* conetxt declaration
  const { listaAsignaciones, liderAsignado, currentGrupo, setListaAsignaciones } = useContext(
    AsignacionGrupoContext
  );
  const { secondLoading, handleSecondLoading, handleGeneralLoading } = useContext(
    ModalAndLoadingContext
  );
  //* dispatch declaration
  const dispatch = useAppDispatch();

  //* navigate declaration
  const navigate = useNavigate();

  //* redux states
  const currentElementPqrsdComplementoTramitesYotros = useAppSelector(
    (state) =>
      state.PanelVentanillaSlice.currentElementPqrsdComplementoTramitesYotros
  );

  return (
    <Grid container sx={containerStyles}>
      <Grid item xs={12}>
        <Title title="Acciones" />
        <section
          style={{
            textAlign: 'center',
            justifyContent: 'center',
            marginTop: '20px',
          }}
        >
          <Grid
            container
            sx={{
              justifyContent: 'center',
            }}
            spacing={2}
          >
            <Grid
              item
              xs={12}
              sm={12}
              sx={{
                // zIndex: 2,
                justifyContent: 'center',
              }}
            >
              <Stack
                direction="row"
                justifyContent="center"
                spacing={2}
                sx={{ m: '20px 0' }}
              >
                <Button
                  color="error"
                  variant="contained"
                  startIcon={<CloseIcon />}
                  onClick={() => {
                    getOutModule(navigate, [
                      () => console.log('haz salido del módulo'),
                    ]);
                  }}
                >
                  SALIR DEL MÓDULO
                </Button>

                <Button
                  color="primary"
                  variant="outlined"
                  startIcon={<CleanIcon />}
                  onClick={() => {
                    reset_all([() => dispatch(resetPanelVentanillaFull())]);
                  }}
                >
                  REINICIAR Y VOLVER A PANEL DE VENTANILLA
                </Button>

                <LoadingButton
                  loading={secondLoading}
                  color="success"
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={() => {
                    const item = listaAsignaciones.find(
                      (item: any) =>
                        item.estado_asignado === 'EN ESPERA' ||
                        item.estado_asignado === 'ACEPTADA'
                    );
                    if (item) {
                      void Swal.fire({
                        icon: 'warning',
                        title: 'Atención',
                        text: `Hay asignaciones pendientes por aceptar o rechazar, por favor verifique`,
                        confirmButtonText: 'Entendido',
                      });
                      return;
                    }

                    void postAsignacionGrupo(
                      {
                        id_pqrsdf:
                          currentElementPqrsdComplementoTramitesYotros?.id_PQRSDF,
                        id_persona_asignada: liderAsignado?.id_persona,
                        id_und_org_seccion_asignada: currentGrupo?.value,
                      },
                      handleSecondLoading
                    ).then(async (res) => {
                      if (res) {
                        void Swal.fire({
                          icon: 'success',
                          title: 'Éxito',
                          text: `Se ha asignado el grupo correctamente`,
                          confirmButtonText: 'Entendido',
                        });

                       await getAsignaciones(
                          currentElementPqrsdComplementoTramitesYotros?.id_PQRSDF,
                          handleGeneralLoading
                        ).then((res) => {
                          setListaAsignaciones(res);
                        }
                       )
                      }
                    });
                  }}
                >
                  ASIGNAR A GRUPO
                </LoadingButton>
              </Stack>
            </Grid>
          </Grid>
        </section>
      </Grid>
    </Grid>
  );
};
