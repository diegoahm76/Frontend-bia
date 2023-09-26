/* eslint-disable @typescript-eslint/naming-convention */
import { useContext, type FC, useState } from 'react';
import { RenderDataGrid } from '../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  Tooltip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch, useAppSelector } from '../../../../../../../hooks';
import { containerStyles } from './../../../../../tca/screens/utils/constants/constants';
import { Loader } from '../../../../../../../utils/Loader/Loader';

import InfoIcon from '@mui/icons-material/Info';
import { CheckboxComponent } from '../../../../../../../utils/Checkbox/CheckboxComponent';
import { handleCheckboxChange } from '../../../../../../../utils/Checkbox/functions/handleCheckbox';
import { type GridValueGetterParams } from '@mui/x-data-grid';
import { columnsControlAcceso } from './columns/columns';
import { ModalAndLoadingContext } from '../../../../../../../context/GeneralContext';

//! componente unidades organizacionales actuales de la sección responsable
export const AutorizacionesGenerales: FC<any> = (): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();
  //* get states from redux store
  const { verModuloAutorizacioneGenerales, controlAccesoExpedientesList } = useAppSelector(
    (state) => state.ctrlAccesoExpSlice
  );

  // ? context necesarios
  const { generalLoading, handleGeneralLoading } = useContext(
    ModalAndLoadingContext
  );

  // ! --- PRUEBA ANULAR ----
  const handleCheckboxChangePRUEBA = (
    { target: { checked } }: React.ChangeEvent<HTMLInputElement>,
    compararPor: string,
    valorComparar: any,
    arrayComparacion: any[],
    propiedades: string[],
    guiaConsultar: string, // con eso  se guia para el nuevo consultar al desmarcar
    dispatch: React.Dispatch<any>,
    callback: Function
  ): void => {
    const DATOS_ACTUALIZADOS = arrayComparacion.map((elemento: any) =>
      elemento.hasOwnProperty(compararPor) &&
      elemento[compararPor] === valorComparar
        ? {
            ...elemento,
            ...Object.fromEntries(
              propiedades.map((propiedad) => [
                propiedad,
                propiedad === guiaConsultar &&
                elemento[propiedad]
                  ? true
                  : checked,
              ])
            ),
          }
        : elemento
    );
    console.log(DATOS_ACTUALIZADOS);
    dispatch(callback(DATOS_ACTUALIZADOS));
  };

  const handleCheckboxChangeConsulta = (
    { target: { checked } }: React.ChangeEvent<HTMLInputElement>,
    compararPor: string,
    valorComparar: any,
    arrayComparacion: any[],
    propiedades: string[],
    guiaConsultar: string, // con eso  se guia para el nuevo consultar al desmarcar
    dispatch: React.Dispatch<any>,
    callback: Function
  ): void => {
    const DATOS_ACTUALIZADOS = arrayComparacion.map((elemento: any) =>
      elemento.hasOwnProperty(compararPor) &&
      elemento[compararPor] === valorComparar
        ? {
            ...elemento,
            ...Object.fromEntries(
              propiedades.map((propiedad) => [
                propiedad,
                // guia consultar debe reemplazar el string
                propiedad === guiaConsultar
                  ? checked
                  : false,
              ])
            ),
          }
        : elemento
    );
    console.log(DATOS_ACTUALIZADOS);
    dispatch(callback(DATOS_ACTUALIZADOS));
  };

  const data = {
    id_ctrl_acceso_clasif_exp_ccd: null, // se debe configurar el id del control de acceso respectivamente en la edición de los checkbox, pero si es la primer creación no debe llevar ningún valor así que no debe ser editables
    id_serie_doc: null, // ?  camino 2 ? lleva valor : no lleva valor
    nombre_serie: null, // ?  camino 2 ? lleva valor : no lleva valor
    codigo_serie: null, // ?  camino 2 ? lleva valor : no lleva valor
    id_subserie_doc: null, // ?  camino 2 y id_subserie_doc existe ? lleva valor : no lleva valor
    nombre_subserie: null, // ?  camino 2 y  subserie existe ? lleva valor : no lleva valor
    codigo_subserie: null, // ?  camino 2 codigo subserie existe ? lleva valor : no lleva valor
    nombre_unidad_organizacional: null, // ? camino 2 ? lleva valor : no lleva valor
    codigo_unidad_organizacional: null, // ? camino 2 ? lleva valor : no lleva valor

    //! este es el paquete de restricciones que inicialmente se debe enviar y plantear todo en false si es apenas la creación del control de acceso de expedientes
    entidad_entera_consultar: false,
    entidad_entera_descargar: false,
    seccion_actual_respon_serie_doc_consultar: false,
    seccion_actual_respon_serie_doc_descargar: false,
    seccion_raiz_organi_actual_consultar: false,
    seccion_raiz_organi_actual_descargar: false,
    secciones_actuales_mismo_o_sup_nivel_respon_consulta: false,
    secciones_actuales_mismo_o_sup_nivel_respon_descargar: false,
    secciones_actuales_inf_nivel_respon_consultar: false,
    secciones_actuales_inf_nivel_respon_descargar: false,
    unds_org_sec_respon_mismo_o_sup_nivel_resp_exp_consultar: false,
    unds_org_sec_respon_mismo_o_sup_nivel_resp_exp_descargar: false,
    unds_org_sec_respon_inf_nivel_resp_exp_consultar: false,
    unds_org_sec_respon_inf_nivel_resp_exp_descargar: false,

    //! este es el paquete de restricciones que inicialmente se debe enviar y plantear todo en false si es apenas la creación del control de acceso de expedientes


    id_ccd: null, // se debe poner el id del ccd respectivamente
    cod_clasificacion_exp: '', // se debe de igual manera configurar el cod. clasificacion de expediente en la edición de los checkbox
    id_cat_serie_und_org_ccd: null,
  };

  const columns = [
    // ! datos iniciales
    ...columnsControlAcceso,
    // ! datos iniciales

    // ? datos a los cuales se les debe configurar el respectivo checkbox para realizar las validaciones
    {
      field: 'entidad_entera_consultar',
      headerName: 'Entidad Entera Consultar',
      width: 200,
      renderCell: (params: GridValueGetterParams) => (
        <>
          <CheckboxComponent
            checked={params.row.entidad_entera_consultar}
            title1="Entidad Entera - CONSULTAR"
            title2="Entidad Entera - CONSULTAR"
            handleChange={
              () => {}
           /*
              (event: React.ChangeEvent<HTMLInputElement>) => {
              handleCheckboxChangePRUEBA(
                event,
                'id_und_organizacional_actual',
                params.row.id_und_organizacional_actual,
                [],
                [
                  'seccion_actual_respon_serie_doc_consultar',
                  'consultar_expedientes_no_propios',
                ],
                dispatch,
                () => {}
              );
            } */}
          />
        </>
      ),
    },
    {
      field: 'entidad_entera_descargar',
      headerName: 'Entidad Entera Descargar',
      width: 200,
      renderCell: (params: GridValueGetterParams) => (
        <>
          <CheckboxComponent
            checked={params.row.entidad_entera_descargar}
            title1="Entidad Entera - DESCARGAR"
            title2="Entidad Entera - DESCARGAR"
            handleChange={
              () => {}
           /*
              (event: React.ChangeEvent<HTMLInputElement>) => {
              handleCheckboxChangePRUEBA(
                event,
                'id_und_organizacional_actual',
                params.row.id_und_organizacional_actual,
                [],
                [
                  'seccion_actual_respon_serie_doc_consultar',
                  'consultar_expedientes_no_propios',
                ],
                dispatch,
                () => {}
              );
            } */}
          />
        </>
      ),
    },

    {
      field: 'seccion_actual_respon_serie_doc_consultar',
      headerName: 'Sección Actual Responsable de la serie documental',
      width: 350,

      renderCell: (params: GridValueGetterParams) => (
        <>
          <CheckboxComponent
            checked={params.row.seccion_actual_respon_serie_doc_consultar}
            title1="Sección Actual Responsable de la serie documental - CONSULTAR"
            title2="Sección Actual Responsable de la serie documental - CONSULTAR"
            handleChange={
              () => {}
           /*   
              (event: React.ChangeEvent<HTMLInputElement>) => {
              handleCheckboxChangePRUEBA(
                event,
                'id_und_organizacional_actual',
                params.row.id_und_organizacional_actual,
                [],
                [
                  'seccion_actual_respon_serie_doc_consultar',
                  'consultar_expedientes_no_propios',
                ],
                dispatch,
                () => {}
              );
            } */}
          />
        </>
      ),
    },

    {
      field: 'seccion_actual_respon_serie_doc_descargar',
      headerName: 'Sección Actual Responsable de la serie documental',
      width: 350,
      renderCell: (params: GridValueGetterParams) => (
        <>
          <CheckboxComponent
            checked={params.row.seccion_actual_respon_serie_doc_descargar}
            title1="Sección Actual Responsable de la serie documental - DESCARGAR"
            title2="Sección Actual Responsable de la serie documental - DESCARGAR"
            handleChange={
              () => {}
           /*   
              (event: React.ChangeEvent<HTMLInputElement>) => {
              handleCheckboxChangePRUEBA(
                event,
                'id_und_organizacional_actual',
                params.row.id_und_organizacional_actual,
                [],
                [
                  'seccion_actual_respon_serie_doc_consultar',
                  'consultar_expedientes_no_propios',
                ],
                dispatch,
                () => {}
              );
            } */}
          />
        </>
      ),
    },
    {
      field: 'seccion_raiz_organi_actual_consultar',
      headerName: 'Sección Raíz Consultar',
      width: 150,
    },
    {
      field: 'seccion_raiz_organi_actual_descargar',
      headerName: 'Sección Raíz Descargar',
      width: 150,
    },
    {
      field: 'secciones_actuales_mismo_o_sup_nivel_respon_consulta',
      headerName: 'Secciones Actuales Consultar',
      width: 150,
    },
    {
      field: 'secciones_actuales_mismo_o_sup_nivel_respon_descargar',
      headerName: 'Secciones Actuales Descargar',
      width: 150,
    },
    {
      field: 'secciones_actuales_inf_nivel_respon_consultar',
      headerName: 'Secciones Actuales Inf Consultar',
      width: 150,
    },
    {
      field: 'secciones_actuales_inf_nivel_respon_descargar',
      headerName: 'Secciones Actuales Inf Descargar',
      width: 150,
    },
    {
      field: 'unds_org_sec_respon_mismo_o_sup_nivel_resp_exp_consultar',
      headerName: 'Unidades Org Consultar',
      width: 150,
    },
    {
      field: 'unds_org_sec_respon_mismo_o_sup_nivel_resp_exp_descargar',
      headerName: 'Unidades Org Descargar',
      width: 150,
    },
    {
      field: 'unds_org_sec_respon_inf_nivel_resp_exp_consultar',
      headerName: 'Unidades Org Inf Consultar',
      width: 150,
    },
    {
      field: 'unds_org_sec_respon_inf_nivel_resp_exp_descargar',
      headerName: 'Unidades Org Inf Descargar',
      width: 150,
    },
    { field: 'id_ccd', headerName: 'ID CCD', width: 150 },
    {
      field: 'cod_clasificacion_exp',
      headerName: 'Código Clasificación',
      width: 150,
    },
    {
      field: 'id_cat_serie_und_org_ccd',
      headerName: 'ID Cat Serie',
      width: 150,
    },
  ];

  const rows = [
    {
      id: 1,
      ...data,
    },
  ];

  if (!verModuloAutorizacioneGenerales) return <></>;

  if (generalLoading) {
    return (
      <Grid
        container
        sx={{
          ...containerStyles,
          position: 'static',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Loader altura={270} />
      </Grid>
    );
  }

  return (
    <>
      <RenderDataGrid
        columns={columns ?? []}
        rows={controlAccesoExpedientesList.length > 0 ? controlAccesoExpedientesList : rows ?? []}
        title="Autorizaciones generales"
      />
    </>
  );
};
