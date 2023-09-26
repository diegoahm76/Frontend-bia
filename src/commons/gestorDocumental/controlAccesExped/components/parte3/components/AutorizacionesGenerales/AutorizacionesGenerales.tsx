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
  const { verModuloAutorizacioneGenerales } = useAppSelector(
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
                propiedad === 'consultar_expedientes_no_propios' &&
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
                propiedad === 'consultar_expedientes_no_propios'
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
    id_ctrl_acceso_clasif_exp_ccd: 1,
    id_serie_doc: null,
    nombre_serie: null,
    codigo_serie: null,
    id_subserie_doc: null,
    nombre_subserie: null,
    codigo_subserie: null,
    nombre_unidad_organizacional: null,
    codigo_unidad_organizacional: null,
    entidad_entera_consultar: true,
    entidad_entera_descargar: true,
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
    id_ccd: 174,
    cod_clasificacion_exp: 'C',
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
            handleChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleCheckboxChangePRUEBA(
                event,
                'id_und_organizacional_actual',
                params.row.id_und_organizacional_actual,
                [],
                ['entidad_entera_consultar'],
                dispatch,
                () => {}
              );
            }}
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
            handleChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleCheckboxChangePRUEBA(
                event,
                'id_und_organizacional_actual',
                params.row.id_und_organizacional_actual,
                [],
                ['entidad_entera_descargar', 'entidad_entera_consultar'],
                dispatch,
                () => {}
              );
            }}
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
            handleChange={(event: React.ChangeEvent<HTMLInputElement>) => {
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
            }}
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
            handleChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleCheckboxChangePRUEBA(
                event,
                'id_und_organizacional_actual',
                params.row.id_und_organizacional_actual,
                [],
                [
                  'seccion_actual_respon_serie_doc_descargar',
                  'consultar_expedientes_no_propios',
                ],
                dispatch,
                () => {}
              );
            }}
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
        columns={columns}
        rows={rows}
        title="Autorizaciones generales"
        /*aditionalElement={
          <Tooltip
            title={
              unidadActuales.filter((el) => !el.mostrar).length === 0
                ? 'No hay unidades disponibles para agregar'
                : 'Agregar unidades propias'
            }
          >
            <Grid
              item
              sx={{
                width: '100%',
                marginTop: '1rem'
              }}
            >
              <Button
                color="success"
                variant="contained"
                startIcon={<AddIcon />}
                // se debe luego habilitar el disabled
                onClick={() => {
                  setmodalUniProp(true);
                }}
              >
                AGREGAR UNIDADES PROPIAS
              </Button>
            </Grid>
          </Tooltip>
        }*/
      />
    </>
  );
};
