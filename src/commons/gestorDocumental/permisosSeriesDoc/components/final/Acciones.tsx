/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { type FC, useState, useEffect, useContext } from 'react';
import { Button, Grid, Stack } from '@mui/material';
import CleanIcon from '@mui/icons-material/CleaningServices';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { containerStyles } from '../../../tca/screens/utils/constants/constants';
import { Title } from '../../../../../components';
import { usePSD } from '../../hook/usePSD';
import { get_restricciones_series_documentales, putPSD } from '../../toolkit/thunks/thunksPartThree';
import { ModalContextPSD } from '../../context/ModalContextPSD';
import { reset_states, set_permisos_unidades_actuales_action, set_permisos_unidades_actuales_externas_action, set_restricciones_para_todas_las_unidades_organizacionales_action, set_restricciones_para_unidades_diferentes_al_a_seccion_o_subseccion_actual_responsable_action } from '../../toolkit/slice/PSDSlice';
import { GET_PERMISOS_UNIDADES_EXTERNAS_SECCION_RESPONSABLE, GET_PERMISOS_UNIDADES_ORGANIZACIONALES_ACTUALES_SECCION_RESPONSABLE } from '../../toolkit/thunks/psdThunks';

import { useNavigate } from 'react-router-dom';
import { getOutModule, reset_all } from '../../../../../utils/functions/getOutOfModule';

export const Acciones: FC<any> = (): JSX.Element | null => {
  //* dispatch declaration
  const dispatch = useAppDispatch();

  //* navigate declaration
  const navigate = useNavigate();

  // ? loading  para los botones guardar y proceder respectivamente
  const [loadingButton, setLoadingButton] = useState<boolean>(false);

  //* context declaration
  const { setLoadingRestricciones } =
  useContext(ModalContextPSD);

  // ! states from redux
  const {
    current_unidad_organizacional,
    currentSeriesSubseries,

    //* info necesaria,
    restriccionesParaTodasLasUnidadesOrganizacionales,
    restriccionesParaUnidadesDiferentesAlaSeccionOsubseccionActualResponsable,


    //* arrays de permisos
    unidadActuales,
    unidadesActualesExternas,
  } = useAppSelector((state) => state.PsdSlice);

  //* usePSD
  const {
    seleccionar_serie_subserie_reset,
     seleccionar_seccion_reset,
      reset_search_ccd_psd, } = usePSD();

  // ? validaciones de renderizado
  if (!current_unidad_organizacional || !currentSeriesSubseries) return null;

  const handleSubmit = () => {
    try {
      const restricciones = restriccionesParaTodasLasUnidadesOrganizacionales
        .concat(restriccionesParaUnidadesDiferentesAlaSeccionOsubseccionActualResponsable)
        .reduce((obj: any, item: any) => {
          obj[item.id] = item.checked;
          return obj;
        }, {});

      if (Object.values(restricciones).some((checked) => checked)) {
        restricciones.id_cat_serie_und_org_ccd = currentSeriesSubseries.id_cat_serie_und;
      } else {
        restricciones.id_cat_serie_und_org_ccd = null;
      }
          //* se recibe la información de ambos arrays de permisos para mandar un único objeto de información

         const unidades_permisos = [
          ...unidadActuales.map((unidad) => ({
            ...unidad,
            pertenece_seccion_actual_admin_serie: true,
            id_cat_serie_und_org_ccd: +unidad.id_cat_serie_und_org_ccd
          })),
          ...unidadesActualesExternas.map((unidad) => ({
            ...unidad,
            pertenece_seccion_actual_admin_serie: false,
            id_cat_serie_und_org_ccd: +unidad.id_cat_serie_und_org_ccd
          }))
         ]

     const objetoToSend ={
        unidades_permisos,
        restricciones
     }

     void putPSD(
      currentSeriesSubseries.id_cat_serie_und,
      objetoToSend,
      setLoadingButton,
     ).then((res) => {
      //  console.log('')(res);
      void get_restricciones_series_documentales(
        currentSeriesSubseries.id_cat_serie_und,
        setLoadingRestricciones
      ).then((_res) => {
        dispatch(
          set_restricciones_para_todas_las_unidades_organizacionales_action(
            _res.arrayRestriccionesParaTodasLasUnidades
          )
        );
        dispatch(
          set_restricciones_para_unidades_diferentes_al_a_seccion_o_subseccion_actual_responsable_action(
            _res.arrayRestriccionesOtros
          )
        );
      });

      // ? de igual manera al seleccionar la respectiva serie se debe buscar los permisos de las unidades para poder configurarlos
      void GET_PERMISOS_UNIDADES_ORGANIZACIONALES_ACTUALES_SECCION_RESPONSABLE(
        currentSeriesSubseries.id_cat_serie_und,
        setLoadingRestricciones
      ).then((_res) => {
        dispatch(set_permisos_unidades_actuales_action(_res));
      });

      // ! Unidades organizacionales actuales de la sección responsable

      void GET_PERMISOS_UNIDADES_EXTERNAS_SECCION_RESPONSABLE(
        currentSeriesSubseries.id_cat_serie_und,
        setLoadingRestricciones
      ).then((_res) => {
        dispatch(
          set_permisos_unidades_actuales_externas_action(_res)
        );
      });





      });

      //  console.log('')('objetoToSend', objetoToSend);
      //  console.log('')(restricciones);
    } catch (error) {
      //  console.log('')(error);
    }
  };
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
                  // zIndex: 2,
                  justifyContent: 'center'
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
                      reset_all( [() => reset_search_ccd_psd({
                        nombre: '',
                        version: ''
                      }),
                      () => seleccionar_seccion_reset({
                        id_cdd_unidad_organizacional: ''
                      }),
                      () => seleccionar_serie_subserie_reset({
                        id_unidad_organizacional: ''
                      }),
                      () => dispatch(reset_states())]);
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
                        getOutModule(
                          navigate,
                          [
                            () => reset_search_ccd_psd({
                              nombre: '',
                              version: ''
                            }),
                            () => seleccionar_seccion_reset({
                              id_cdd_unidad_organizacional: ''
                            }),
                            () => seleccionar_serie_subserie_reset({
                              id_unidad_organizacional: ''
                            }),
                            () => dispatch(reset_states())
                          ]
                        );
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
