/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
//! libraries or frameworks
import { type FC, useEffect, useContext } from 'react';
import { Controller } from 'react-hook-form';
//* Components Material UI
import { Button, Grid, Stack } from '@mui/material';
// * react select
import Select from 'react-select';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import { Title } from '../../../../../../../../components';
import { containerStyles } from '../../../../../../../gestorDocumental/tca/screens/utils/constants/constants';
import { use_u_x_entidad } from '../../hooks/use_u_x_entidad';
import {
  getListaUnidadesOrganigramaSeleccionado,
  getListadoPersonasOrganigramaActual,
  getOrganigramasDispobibles,
  get_organigrama_acual
} from '../../toolkit/UxE_thunks/UxE_thunks';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../../../../../../../../utils/Loader/Loader';
import { filtrarOrganigramas } from './utils/function/filterOrganigramas';
import { GridActualANuevo } from '../../components/GridActualANuevo/GridActualANuevo';
import { ContextUnidadxEntidad } from '../../context/ContextUnidadxEntidad';
import { useAppDispatch } from '../../../../../../../../hooks';
import { setGridActualANuevo } from '../../toolkit/UxE_slice/UxE_slice';
// import CleanIcon from '@mui/icons-material/CleaningServices';

export const ActualANuevo: FC = (): JSX.Element => {
  //* navigate declaration
  const navigate = useNavigate();
  //* dispatch declaration
  const dispatch = useAppDispatch();
  // ? redux toolkit - values

  //! use_u_x_entidad hooks

  const {
    control_opcion_actual_a_nuevo,
    organigramaActual,
    setOrganigramaActual,
    organigramasDisponibles,
    setOrganigramasDisponibles
  } = use_u_x_entidad();

  //* context necesario

  const { gridActualANuevo, handleGridActualANuevo } = useContext(
    ContextUnidadxEntidad
  );

  // ! use effects necesarios para el manejo del módulo
  useEffect(() => {
    const obtenerOrganigramas = async (): Promise<any> => {
      const organigramasActuales = await get_organigrama_acual(navigate);
      console.log('res', organigramasActuales);
      setOrganigramaActual(
        organigramasActuales?.map((item: any) => ({
          label: item?.nombre,
          value: item?.id_organigrama
        }))
      );

      const organigramasDisponibles = await getOrganigramasDispobibles();
      setOrganigramasDisponibles(filtrarOrganigramas(organigramasDisponibles));
    };

    void obtenerOrganigramas();
  }, []);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const onSubmit = () => {
    console.log('hello from submit');
  };

  if (!organigramaActual[0]?.label || organigramasDisponibles.length === 0)
    return (
      <Grid
        container
        sx={{
          ...containerStyles,
          position: 'static',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Loader altura={150} />
      </Grid>
    );

  return (
    <>
      <Grid container sx={containerStyles}>
        <Grid item xs={12}>
          <Title title="Traslado masivo unidad organizacional por entidad" />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
            style={{
              marginTop: '20px'
            }}
          >
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  zIndex: 2
                }}
              >
                <Controller
                  name="organigrama_actual_opcion_1" // posiblemenete se deba modificar el nombre
                  control={control_opcion_actual_a_nuevo}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <div>
                      <Select
                        isDisabled={true}
                        value={
                          organigramaActual?.length > 0
                            ? {
                                label: organigramaActual[0]?.label,
                                value: organigramaActual[0]?.value
                              }
                            : null
                        }
                        placeholder="Seleccionar"
                      />
                      <label>
                        <small
                          style={{
                            color: 'rgba(0, 0, 0, 0.6)',
                            fontWeight: 'thin',
                            fontSize: '0.75rem',
                            marginTop: '0.25rem',
                            marginLeft: '0.25rem'
                          }}
                        >
                          Organigrama Actual
                        </small>
                      </label>
                    </div>
                  )}
                />
              </Grid>

              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  zIndex: 8
                }}
              >
                <Controller
                  name="organigrama_nuevo_opcion_1" // posiblemenete se deba modificar el nombre
                  control={control_opcion_actual_a_nuevo}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <div>
                      <Select
                        value={value}
                        // el value también debe venir preselccionado cuando ya exista datos en la tabla T026 y no se haya realizado la puesta en producción del organigrama que he seleccionado

                        onChange={(selectedOption) => {
                          handleGridActualANuevo(true);
                          //* dentro de esta seleccion, tambien debe existir una selección de modo que se pueda realizar la consulta de las unidades que se deben mostrar en la tabla de asignaciones
                          //! 1. se realiza la consuta del listado de personas del organigrama actual
                          void getListadoPersonasOrganigramaActual().then(
                            (resListaPersonas: any) => {
                              void getListaUnidadesOrganigramaSeleccionado(
                                selectedOption.value
                              ).then((resListaUnidades) => {
                                const dataMixed = resListaPersonas?.data?.map(
                                  (item: any) => {
                                    return {
                                      ...item,
                                      unidadesDisponiblesParaTraslado:
                                        resListaUnidades?.data
                                    };
                                  }
                                );
                                // ! realizo la asignaciónde la dataMixed
                                dispatch(setGridActualANuevo(dataMixed));
                                console.log('data mixed', dataMixed);
                              });
                            }
                          );
                          // 2. se realiza la consulta del listado de unidades del organigrama seleccioanado para traer las unidades de dicho organigrama que deben mostrarse en la tabla en la que se van a realizar las asignaciones del traslado

                          // console.log('selectedOption', selectedOption);
                          onChange(selectedOption);
                        }}
                        /* isDisabled={
                            debe ir dehabilitado cuando ya se ha realizado una preselección de los datos de traslado que me permite generar un registro en la tabla temporal T026
                        } */
                        // se debe llegar a deshabilitar dependiendo la circunstancia en base a los resultados de la T026
                        options={organigramasDisponibles} // deben ir seleccionado por defecto el org Actual
                        placeholder="Seleccionar"
                      />
                      <label>
                        <small
                          style={{
                            color: 'rgba(0, 0, 0, 0.6)',
                            fontWeight: 'thin',
                            fontSize: '0.75rem',
                            marginTop: '0.25rem',
                            marginLeft: '0.25rem'
                          }}
                        >
                          Organigrama Nuevo
                        </small>
                      </label>
                    </div>
                  )}
                />
              </Grid>
            </Grid>
          </form>
          {
            // ! se debe tener en cuenta que en este button tambien se deben limpiar todos los datos de la tabla para comodidad del usuario y para buen funcionamiento del módulo

            gridActualANuevo ? (
              <Stack
                direction="row"
                justifyContent="center"
                spacing={3}
                sx={{ mt: '25px' }}
              >
                <Button
                  startIcon={<CloseFullscreenIcon />}
                  // endIcon={<CloseFullscreenIcon />}
                  variant="contained"
                  color="warning"
                  onClick={() => {
                    // se debe tener en cuenta que en este button tambien se deben limpiar todos los datos de la tabla para comodidad del usuario y para buen funcionamiento del módulo
                    handleGridActualANuevo(false);
                  }}
                >
                  Contraer tabla
                </Button>
              </Stack>
            ) : (
              <></>
            )
          }
        </Grid>
      </Grid>

      {/* data grid traslado masico organigrama actual a nuevo */}
      {gridActualANuevo ? <GridActualANuevo /> : <></>}
      {/*  <GridActualANuevo /> */}
      {/* data grid traslado masico organigrama actual a nuevo */}
    </>
  );
};
