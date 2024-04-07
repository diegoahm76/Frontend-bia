/* eslint-disable @typescript-eslint/naming-convention */
import React, { useContext, useState } from 'react'
import { stylesGrid } from './../../../../../../permisosSeriesDoc/utils/styles';
import { Grid } from '@mui/material';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { useAppDispatch, useAppSelector } from '../../../../../../../../hooks';
import { setControlAccesoExpedientesList, setTipoDeClasificacion, setVerModuloAutorizacioneGenerales, set_mood_module } from '../../../../../toolkit/slice/CtrlAccesoExpSlice';
import { optionsSelect } from './utils/choices';
import { getControlAccesoExpedientes } from '../../../../../toolkit/thunks/controlAccesoThunks';
import { ModalAndLoadingContext } from '../../../../../../../../context/GeneralContext';
import { rowsDataGrid } from '../../../../parte3/components/AutorizacionesGenerales/utils/initialState';

export const Clasificacion = (params: any): JSX.Element | null => {
  const { setRowsControlInicial, rowsControlInicial } = params;
  //* get states from the redux store
  const { tipoDeClasificacion, moodConfig, currentCcdCtrlAccesoExp, currentUnidadOrganizacional, currentSerieSubserie } = useAppSelector((state) => state.ctrlAccesoExpSlice);
  //*dispatch declarations
    const dispatch = useAppDispatch();
      // ? context necesarios
  const { handleGeneralLoading } = useContext(
    ModalAndLoadingContext
  );


  const handleChange = (selectedOption: any) => {
    //  console.log('')(selectedOption)
    dispatch(setTipoDeClasificacion(selectedOption));
    setRowsControlInicial(rowsDataGrid.map((row: any) => ({
      ...row,
      id_ccd: currentCcdCtrlAccesoExp?.id_ccd,
      id_serie_doc: currentSerieSubserie?.id_serie_doc, 
      nombre_serie: currentSerieSubserie?.nombre_serie,
      codigo_serie: currentSerieSubserie?.codigo_serie,
      id_subserie_doc: currentSerieSubserie?.id_subserie_doc,
      nombre_subserie: currentSerieSubserie?.nombre_subserie,
      codigo_subserie: currentSerieSubserie?.codigo_subserie,
      nombre_unidad_organizacional: currentUnidadOrganizacional?.nombre_unidad_org_actual_admin_series,
      codigo_unidad_organizacional: currentUnidadOrganizacional?.codigo_unidad_org_actual_admin_series,
      cod_clasificacion_exp: selectedOption?.value,
    })))

    void getControlAccesoExpedientes({
      setLoading: handleGeneralLoading,
      idCcd: currentCcdCtrlAccesoExp?.id_ccd,
      codClasificacionExp: selectedOption?.value,
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
    //* se debe realizar la petición al servicio de control de acceso de expedientes
  };

  if(moodConfig?.value !== 1) return null;

  return (
    <>
    <Grid
      item
      xs={12}
      sm={6.5}
      sx={{
        ...stylesGrid,
        mt: '10px',
        mb: '10px',
        zIndex: 5
      }}
    >
          <div>
            <Select
              value={tipoDeClasificacion}
              onChange={(selectedOption: any) => {
             /*  dispatch(setListaSeriesSubseries([]));
                dispatch(setCurrentSerieSubserie(null));
                dispatch(set_restricciones_para_todas_las_unidades_organizacionales_action(null));
                dispatch(set_restricciones_para_unidades_diferentes_al_a_seccion_o_subseccion_actual_responsable_action(null));
                dispatch(set_permisos_unidades_actuales_action([]));
                dispatch(set_permisos_unidades_actuales_externas_action([]));
                dispatch(
                  set_current_unidad_organizacional_action(
                    selectedOption?.item
                  )
                );
                void get_series_documentales_unidad_organizacional_psd(
                  selectedOption?.item?.id_unidad_organizacional,
                  ccd_current_busqueda?.id_ccd,
                  setloadingSeriesSubseries
                ).then((res) => {
                  //  console.log('')(res);
                  dispatch(setListaSeriesSubseries(res));
                }); */
                handleChange(selectedOption);
              }}
              options={optionsSelect as any}
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
                Tipo de clasificación
              </small>
            </label>
          </div>
      {/*  )}
      /> */}
    </Grid>
  </>
  )
}
