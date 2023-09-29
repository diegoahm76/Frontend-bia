/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { type FC, useState, useEffect } from 'react';
import { Button, Grid, Stack } from '@mui/material';
import CleanIcon from '@mui/icons-material/CleaningServices';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import { Title } from '../../../../../components';
import {
  getOutModule,
  reset_all,
} from '../../../../../utils/functions/getOutOfModule';
import { containerStyles } from '../../../tca/screens/utils/constants/constants';
import {
  resetStatesCtrlAccesoExp,
  setControlAccesoExpedientesList,
  setVerModuloAutorizacioneGenerales,
} from '../../toolkit/slice/CtrlAccesoExpSlice';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { rowsDataGrid } from './../parte3/components/AutorizacionesGenerales/utils/initialState';
import {
  getControlAccesoExpedientes,
  putControlAccesoExpedientes,
} from '../../toolkit/thunks/controlAccesoThunks';

export const Acciones: FC<any> = (params: any): JSX.Element | null => {
  const { setRowsControlInicial, rowsControlInicial } = params;

  //* dispatch declaration
  const dispatch = useAppDispatch();
  //* navigate declaration
  const navigate = useNavigate();
  // ? loading  para los botones guardar y proceder respectivamente
  const [loadingButton, setLoadingButton] = useState<boolean>(false);

  const { currentCcdCtrlAccesoExp } = useAppSelector(
    (state) => state.ctrlAccesoExpSlice
  );

  // ! states from redux
  const {
    controlAccesoExpedientesList,
    currentControlAccesoExpedientes,
    currentSerieSubserie,
  } = useAppSelector((state) => state.ctrlAccesoExpSlice);

  const handleSubmit = () => {
    controlAccesoExpedientesList.length > 0
      ? console.log(
          controlAccesoExpedientesList.map((el: any) => {
            if (
              el?.id_ctrl_acceso_clasif_exp_ccd ===
              currentControlAccesoExpedientes?.id_ctrl_acceso_clasif_exp_ccd
            ) {
              return {
                ...el,
                id_cat_serie_und_org_ccd:
                  currentSerieSubserie?.id_cat_serie_und,
              };
            }
            return el;
          })[0]
        )
      : console.log(
          rowsControlInicial.map((el: any) => ({
            ...el,
            id_cat_serie_und_org_ccd: currentSerieSubserie?.id_cat_serie_und,
          }))[0]
        );

    void putControlAccesoExpedientes(
      setLoadingButton,
      controlAccesoExpedientesList.length > 0
        ? controlAccesoExpedientesList.map((el: any) => {
            if (
              el?.id_ctrl_acceso_clasif_exp_ccd ===
              currentControlAccesoExpedientes?.id_ctrl_acceso_clasif_exp_ccd
            ) {
              return {
                ...el,
                id_cat_serie_und_org_ccd:
                  currentSerieSubserie?.id_cat_serie_und,
              };
            }
            return el;
          })[0]
        : rowsControlInicial.map((el: any) => ({
            ...el,
            id_cat_serie_und_org_ccd: currentSerieSubserie?.id_cat_serie_und,
          }))[0]
    ).then(() => {
      getControlAccesoExpedientes({
        setLoading: setLoadingButton,
        idCcd: currentCcdCtrlAccesoExp?.id_ccd,
        codClasificacionExp:
          currentControlAccesoExpedientes?.cod_clasificacion_exp ||
          rowsControlInicial[0]?.cod_clasificacion_exp,
        idCatSerieUnidad: currentSerieSubserie?.id_cat_serie_und,
      }).then((res) => {
        console.log(res);
        if (res?.length > 0) {
          dispatch(setControlAccesoExpedientesList(res));
          dispatch(setVerModuloAutorizacioneGenerales(false));
        } else {
          dispatch(setVerModuloAutorizacioneGenerales(true));
          dispatch(setControlAccesoExpedientesList([]));
        }
      });
    });
  };

  if (!currentCcdCtrlAccesoExp) return null;

  return (
    <>
      <Grid container sx={containerStyles}>
        <Grid item xs={12}>
          <Title title="Acciones" />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
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
                    color="primary"
                    variant="outlined"
                    startIcon={<CleanIcon />}
                    onClick={() => {
                      reset_all([
                        () => dispatch(resetStatesCtrlAccesoExp()),
                        () =>
                          setRowsControlInicial(
                            rowsDataGrid.map((row: any) => ({
                              ...row,
                              id_ccd: currentCcdCtrlAccesoExp?.id_ccd,
                            }))
                          ),
                      ]);
                    }}
                  >
                    LIMPIAR CAMPOS
                  </Button>

                  <LoadingButton
                    loading={loadingButton}
                    color="success"
                    variant="contained"
                    type="submit"
                    startIcon={<SaveIcon />}
                  >
                    GUARDAR
                  </LoadingButton>

                  <Button
                    color="error"
                    variant="contained"
                    startIcon={<CloseIcon />}
                    onClick={() => {
                      getOutModule(navigate, [
                        () => dispatch(resetStatesCtrlAccesoExp()),
                        () => setRowsControlInicial([]),
                      ]);
                    }}
                  >
                    SALIR DEL MÓDULO
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  );
};
