/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
//! libraries or frameworks
import { type FC, useEffect } from 'react';
import { Controller } from 'react-hook-form';
//* Components Material UI
import { Grid } from '@mui/material';
// * react select
import Select from 'react-select';

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
// import CleanIcon from '@mui/icons-material/CleaningServices';

export const ActualANuevo: FC = (): JSX.Element => {
  //* navigate declaration
  const navigate = useNavigate();
  //* dispatch declaration
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
        <Loader altura={120} />
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
                          //* dentro de esta seleccion, tambien debe existir una selección de modo
                          /*  dispatch(
                            getServiceSeriesSubseriesXUnidadOrganizacional(
                              selectedOption.item
                            )
                          ); */
                          // 1. se realiza la consuta del listado de personas del organigrama actual
                          void getListadoPersonasOrganigramaActual();
                          // 2. se realiza la consulta del listado de unidades del organigrama seleccioanado para traer las unidades de dicho organigrama que deben mostrarse en la tabla en la que se van a realizar las asignaciones del traslado

                          void getListaUnidadesOrganigramaSeleccionado(
                            selectedOption.value
                          );

                          console.log('selectedOption', selectedOption);
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
        </Grid>
      </Grid>
    </>
  );
};
