/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { type FC, useContext } from 'react';
import { containerStyles } from '../../../../../../../gestorDocumental/tca/screens/utils/constants/constants';
import { Button, Grid, Stack } from '@mui/material';
import { Title } from '../../../../../../../../components';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { ContextUnidadxEntidad } from '../../context/ContextUnidadxEntidad';
import { ModalHistoricoTraslados } from '../ModalHistoricoTraslado/screen/ModalHistoricoTraslados';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import ForwardIcon from '@mui/icons-material/Forward';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../../../../../../hooks';
import SaveIcon from '@mui/icons-material/Save';
import { putCrearRegistrosTemporalesT026 } from '../../toolkit/UxE_thunks/UxE_thunks';

export const CleanData: FC<any> = (): JSX.Element => {
  //* states from redux
  const {
    controlModoTrasladoUnidadXEntidad,
    unidadesSeleccionadas,
    organigrama_current
    /* controlFaseEntrada */
  } = useAppSelector((state) => state.u_x_e_slice);

  //* elements from context

  const { handleModalHistoricos } = useContext(ContextUnidadxEntidad);

  const guardarRegistrosT026 = (): void => {
    const unidadesSeleccionadasArray =
      unidadesSeleccionadas &&
      Object?.entries(unidadesSeleccionadas)
        .filter(
          // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
          ([key, value]) => {
            return value
              ? value?.idPersona && value?.label && value?.value
              : null;
          }
        )
        .map(([key, value]) => ({
          id_persona: value?.idPersona,
          // label: value.label,
          id_nueva_unidad_organizacional: value?.value
        }));

    console.log('unidadesSeleccionadasArray', unidadesSeleccionadasArray);
    console.log(organigrama_current, 'organigrama_current');

    // ? almacenamiento de datos en tabla temporal
    /* void putCrearRegistrosTemporalesT026(
      organigrama_current?.id_organigrama,
      unidadesSeleccionadasArray
    ); */
  };

  const procederACambioMasivoUxE = (): void => {
    console.log('procediendo a cambio masivo UxE');
  };

  return (
    <>
      <Grid container sx={containerStyles}>
        <Grid item xs={12}>
          <Title title="Acciones" />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              controlModoTrasladoUnidadXEntidad ===
              'modo_entrada_con_validacion_organigrama_actual_a_nuevo'
                ? guardarRegistrosT026()
                : procederACambioMasivoUxE();
            }}
            style={{
              textAlign: 'center',
              justifyContent: 'center',
              marginTop: '20px'
            }}
          >
            <Grid
              container
              sx={{
                justifyContent: 'center'
              }}
              spacing={2}
            >
              <Grid
                item
                xs={12}
                sm={12}
                sx={{
                  zIndex: 2,
                  justifyContent: 'center'
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="center"
                  spacing={2}
                  sx={{ m: '20px 0' }}
                >
                  {/* la verdadera validación se da con este state
                  controlFaseEntrada !== 1
                  */}
                  {controlModoTrasladoUnidadXEntidad ===
                    'modo_entrada_con_validacion_organigrama_anterior_a_actual' && (
                    <Button
                      color="warning"
                      variant="contained"
                      startIcon={<VisibilityIcon />}
                      onClick={handleModalHistoricos}
                    >
                      HISTÓRICO TRASLADOS MASIVOS
                    </Button>
                  )}

                  <Button
                    color="primary"
                    variant="outlined"
                    startIcon={<CleanIcon />}
                    onClick={() => {
                      console.log('cleaning fields');
                    }}
                  >
                    REINICIAR CAMPOS
                  </Button>

                  <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    // DEBE HABILITARSE LA CONDICIONAL DE GUARDAR O PROCEDER DEPENDIENDO EL ESCENARIO (MODE)
                    startIcon={
                      controlModoTrasladoUnidadXEntidad ===
                      'modo_entrada_con_validacion_organigrama_actual_a_nuevo' ? (
                        <SaveIcon />
                      ) : (
                        <ForwardIcon />
                      )
                    }
                  >
                    {/* guardar en la primera opción, proceder en la segunda opción */}

                    {controlModoTrasladoUnidadXEntidad ===
                    'modo_entrada_con_validacion_organigrama_actual_a_nuevo'
                      ? 'GUARDAR'
                      : 'PROCEDER'}
                  </Button>

                  <Link
                    to="/app/home"
                    onClick={() => {
                      console.log('closing module');
                    }}
                  >
                    <Button
                      color="error"
                      variant="outlined"
                      startIcon={<CloseIcon />}
                    >
                      SALIR DEL MÓDULO
                    </Button>
                  </Link>
                </Stack>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>

      {/*  modal historico traslados masivos, solo debe estar en la opción numero 2
        Traslado de unidades organizacionales de organigrama anterior a actual
      
                    SE DEBE HABILITAR LA CONDICIONAL DE MUESTRA O NO DEPDENDIENDO EL ESCENARIO (MODE)

      */}

      <ModalHistoricoTraslados />
    </>
  );
};
