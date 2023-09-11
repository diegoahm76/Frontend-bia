/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { Grid } from '@mui/material';
import { /* useContext, */ type FC } from 'react';
import { stylesGrid } from '../../../../../utils/styles';
import Select from 'react-select';
import { Controller } from 'react-hook-form';
import { usePSD } from '../../../../../hook/usePSD';
// import { useAppSelector } from '../../../../../../../../hooks';
// import { ModalContextPSD } from '../../../../../context/ModalContextPSD';
// import { Loader } from '../../../../../../../../utils/Loader/Loader';

export const SeleccionSerieSubserie: FC<any> = (): JSX.Element => {
  // ! states from redux
  /* const { ccd_current_busqueda, unidadesOrganizacionales } = useAppSelector(
    (state) => state.PsdSlice
  );
*/
  // ? context necesarios
  // const { loadingButtonPSD } = useContext(ModalContextPSD);

  //* usePSD
  const { seleccionar_serie_subserie_control } = usePSD();

  //! se debe realizar la validación, si no hay series que mostrar el respecivo elemento no debe aparecer en la pantalla

  /* if (!ccd_current_busqueda) return <></>; */
  /*
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
  } */

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
        {/* En esta seleccion quiero tomar la serie o subserue asociada al  la respectiva unidad org del ccd para iniciar el proceso de asignación de permisos */}
        <Controller
          name="id_serie_subserie"
          control={seleccionar_serie_subserie_control}
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
                options={
                  []
                  /* [...unidadesOrganizacionales] // la idea va a ser reemplazarlos por las series - subseries asociadas a la unidad organizacional del ccd
                    .sort((a, b) => a.nombre.localeCompare(b.nombre))
                    .map((item) => ({
                      item,
                      value: item.id_unidad_organizacional,
                      label: `${item.codigo} - ${item.nombre}`
                    })) as any */
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
