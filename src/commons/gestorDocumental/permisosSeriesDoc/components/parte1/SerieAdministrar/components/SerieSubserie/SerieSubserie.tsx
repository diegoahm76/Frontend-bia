/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { Grid } from '@mui/material';
import { /* useContext, */ type FC } from 'react';
import { stylesGrid } from '../../../../../utils/styles';
import Select from 'react-select';
import { Controller, useForm } from 'react-hook-form';
import { useAppSelector } from '../../../../../../../../hooks';
// import { ModalContextPSD } from '../../../../../context/ModalContextPSD';
import { Loader } from '../../../../../../../../utils/Loader/Loader';

export const SeleccionSeccion: FC<any> = (): JSX.Element => {
  // ! states from redux
  const { ccd_current_busqueda, unidadesOrganizacionales } = useAppSelector(
    (state) => state.PsdSlice
  );

  // ? context necesarios
  // const { loadingButtonPSD } = useContext(ModalContextPSD);

  //* useForm
  const {
    control: seleccionar_seccion_control,
    watch: seleccionar_seccion_watch
    // reset: seleccionar_seccion_reset
  } = useForm({
    defaultValues: {
      //* se debe revisar porque valor se hace la busqueda de la respectiva serie o subserie asociadas a la unidad organizacional del ccd
      id_trd: ''
    }
  });

  // ? ejecución del watch
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const values_watch_seleccionar_seccion = seleccionar_seccion_watch();

  if (!ccd_current_busqueda) return <></>;

  if (unidadesOrganizacionales.length === 0) {
    return (
      <div
        style={{
          marginTop: '3rem',
          marginBottom: '3rem'
        }}
      >
        <Loader altura={50} />
      </div>
    );
  }

  return (
    <>
      <Grid
        item
        xs={12}
        sm={6}
        sx={{
          ...stylesGrid,
          zIndex: 2
        }}
      >
        {/* En esta seleccion quiero tomar la seccion o subseccion asociada al ccd para realizar la respectiva busqueda de la serie - subserie respectivamente asociada */}
        <Controller
          name="id_trd"
          control={seleccionar_seccion_control}
          rules={{ required: true }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div>
              <Select
                value={value}
                onChange={(selectedOption) => {
                  console.log(selectedOption);

                  // ! se deben llamar las respectivas series - subseries que estan asociadas a la unidad organizacional seleccionada
                  /* void get_catalogo_TRD_service(selectedOption.value).then(
                    (res) => {
                      console.log(res);
                      dispatch(set_catalog_trd_action(res));
                    }
                  );

                  onChange(selectedOption); */
                }}
                // isDisabled={tca_current != null}
                options={
                  [...unidadesOrganizacionales]
                    .sort((a, b) => a.nombre.localeCompare(b.nombre))
                    .map((item) => ({
                      item,
                      value: item.id_unidad_organizacional,
                      label: `${item.codigo} - ${item.nombre}`
                    })) as any
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
                  Serie - subserie (unidad organizacional elegida)
                </small>
              </label>
            </div>
          )}
        />
      </Grid>
    </>
  );
};
