/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { Grid } from '@mui/material';
import { useContext, type FC } from 'react';
import Select from 'react-select';
import { Controller } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../../../../../../hooks';
import { Loader } from '../../../../../../../../utils/Loader/Loader';
import { stylesGrid } from './../../../../../../permisosSeriesDoc/utils/styles';
import { useControlClasificacionExp } from '../../../../../hook/useControlClasificacionExp';
import { ModalAndLoadingContext } from '../../../../../../../../context/GeneralContext';
import { containerStyles } from './../../../../../../tca/screens/utils/constants/constants';
import { setControlAccesoExpedientesList, setCurrentSerieSubserie, setVerModuloAutorizacioneGenerales } from '../../../../../toolkit/slice/CtrlAccesoExpSlice';
import { getControlAccesoExpedientes } from '../../../../../toolkit/thunks/controlAccesoThunks';
import { rowsDataGrid } from '../../../../parte3/components/AutorizacionesGenerales/utils/initialState';

export const SeleccionSerieSubserie: FC<any> = (params: any): JSX.Element => {
  const { rowsControlInicial, setRowsControlInicial } = params;
  //* dispatch declaration
  const dispatch = useAppDispatch();
  // ! states from redux
  const { currentUnidadOrganizacional, seriesSubseriesList, currentCcdCtrlAccesoExp } = useAppSelector(
    (state) => state.ctrlAccesoExpSlice
  );

  // ? context necesarios
  const { isLoadingSerieSubserie, handleGeneralLoading } = useContext(ModalAndLoadingContext);

  //* usePSD
  const { control_seleccionar_seccion_control } = useControlClasificacionExp();

  //! se debe realizar la validación, si no hay series que mostrar el respecivo elemento no debe aparecer en la pantalla

  if (!currentUnidadOrganizacional) return <></>;

  if (isLoadingSerieSubserie) {
    return (
      <Grid
      container
      sx={{
        ...containerStyles,
        boxShadow: 'none',
        background: 'none',
        position: 'static',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <Loader altura={50} />
    </Grid>
    );
  }

  return (
    <>
      <Grid
        item
        xs={12}
        sm={7}
        sx={{
          ...stylesGrid,
          mt: '10px',
          mb: '10px',
          zIndex: 2
        }}
      >
        {/* Se realiza la seleccion de la serie subserie respectiva para poder trabajar con ella */}
        <Controller
          name="id_serie_subserie"
          control={control_seleccionar_seccion_control}
          rules={{ required: true }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div>
              <Select
                value={value}
                onChange={(selectedOption) => {
                  //* se debe modificar el nombre del estado, ya que se debe almacenar la series o subserie que se haya seleccionado
                  //  console.log('')(selectedOption);
                  dispatch(setCurrentSerieSubserie(selectedOption?.item));

                  //
                  setRowsControlInicial(
                    rowsDataGrid.map((row: any) => ({
                      ...row,
                      id_ccd: currentCcdCtrlAccesoExp?.id_ccd,
                      id_serie_doc: selectedOption?.item?.id_serie_doc,
                      nombre_serie: selectedOption?.item?.nombre_serie,
                      codigo_serie: selectedOption?.item?.codigo_serie,
                      id_subserie_doc: selectedOption?.item?.id_subserie_doc,
                      nombre_subserie: selectedOption?.item?.nombre_subserie,
                      codigo_subserie: selectedOption?.item?.codigo_subserie,
                      nombre_unidad_organizacional: currentUnidadOrganizacional?.nombre_unidad_org_actual_admin_series,
                      codigo_unidad_organizacional: currentUnidadOrganizacional?.codigo_unidad_org_actual_admin_series,
                    }))
                  );

                  void getControlAccesoExpedientes({
                    setLoading: handleGeneralLoading,
                    idCcd: currentCcdCtrlAccesoExp?.id_ccd,
                    codClasificacionExp: '',
                    idCatSerieUnidad: selectedOption?.value,
                  }).then((res) => {
                    //  console.log('')(res);
                    if(res?.length > 0){
                      dispatch(setVerModuloAutorizacioneGenerales(false));
                      dispatch(setControlAccesoExpedientesList(res));
                  }else{
                    dispatch(setVerModuloAutorizacioneGenerales(true));
                    dispatch(setControlAccesoExpedientesList([]));
                  }
                  });
 

                  // ? se debe entrar a realizar la validación sobre si mostrar las autorizaciones generales o si por el contrario no se debe mostrar dependiendo si el servicio de control de acceso de expedientes trae datos o no!

                  onChange(selectedOption);
                }}
                options={
                 [...seriesSubseriesList]
                    .sort((a, b) =>
                      a.nombre_serie.localeCompare(b.nombre_serie)
                    )
                    .map((item) => ({
                      item,
                      value: item.id_cat_serie_und,
                      label: `${item?.codigo_serie} - ${item?.nombre_serie} / ${
                        item?.codigo_subserie ? item.codigo_subserie : ''
                      }  - ${
                        item?.nombre_subserie ? item?.nombre_subserie : ''
                      } `
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
