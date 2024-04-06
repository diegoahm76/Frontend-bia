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
import { rowsDataGrid } from './utils/initialState';
import { control } from 'leaflet';
import { setControlAccesoExpedientesList, setCurrentControlAccesoExpedientes } from '../../../../toolkit/slice/CtrlAccesoExpSlice';

//! componente unidades organizacionales actuales de la sección responsable
export const AutorizacionesGenerales: FC<any> = (params: any): JSX.Element => {
  const { rowsControlInicial, setRowsControlInicial } = params;
  //* dispatch declaration
  const dispatch = useAppDispatch();
  //* get states from redux store
  const {
    verModuloAutorizacioneGenerales,
    controlAccesoExpedientesList,
    currentControlAccesoExpedientes,
  } = useAppSelector((state) => state.ctrlAccesoExpSlice);

  // ? context necesarios
  const { generalLoading } = useContext(
    ModalAndLoadingContext
  );

  // ? use states necesarios para el manejo inicial del control de expedientes cuando aún no se ha creado una respectiva configuración inicial
  /* const [rowsControlInicial, setRowsControlInicial] = useState(rowsDataGrid.map((row) => ({ ...row, id_ccd: currentCcdCtrlAccesoExp?.id_ccd })));
   */
  // ! --- PRUEBA ANULAR ----
  const handleCheckboxChangePRUEBA = (
    { target: { checked } }: React.ChangeEvent<HTMLInputElement>,
    compararPor: string,
    valorComparar: any,
    arrayComparacion: any[],
    propiedades: string[],
    valorConsulta: string,
    dispatch: React.Dispatch<any>,
    callback: Function
  ): void => {
    //  console.log('')(arrayComparacion)
    //  console.log('')(callback)
    const DATOS_ACTUALIZADOS = arrayComparacion.map((elemento: any) =>
      elemento.hasOwnProperty(compararPor) &&
      elemento[compararPor] === valorComparar
        ? {
            ...elemento,
            ...Object.fromEntries(
              propiedades.map((propiedad) => [
                propiedad,
                propiedad === valorConsulta && elemento[propiedad]
                  ? true
                  : checked,
              ])
            ),
          }
        : elemento
    );
    // //  console.log('')(DATOS_ACTUALIZADOS);
    controlAccesoExpedientesList.length > 0
      ? dispatch(callback(DATOS_ACTUALIZADOS))
      : callback(DATOS_ACTUALIZADOS);
  };

  const handleCheckboxChangeConsulta = (
    { target: { checked } }: React.ChangeEvent<HTMLInputElement>,
    compararPor: string,
    valorComparar: any,
    arrayComparacion: any[],
    propiedades: string[],
    valorConsulta: string,
    dispatch: React.Dispatch<any>,
    callback: Function
  ): void => {

    //  console.log('')(arrayComparacion)
    //  console.log('')(callback)

    const DATOS_ACTUALIZADOS = arrayComparacion.map((elemento: any) =>
      elemento.hasOwnProperty(compararPor) &&
      elemento[compararPor] === valorComparar
        ? {
            ...elemento,
            ...Object.fromEntries(
              propiedades.map((propiedad) => [
                propiedad,
                propiedad === valorConsulta ? checked : false,
              ])
            ),
          }
        : elemento
    );
    // //  console.log('')(DATOS_ACTUALIZADOS);
    controlAccesoExpedientesList.length > 0
      ? dispatch(callback(DATOS_ACTUALIZADOS))
      : callback(DATOS_ACTUALIZADOS);
  };

  const columns = [
    // ? ------------- ENTIDAD ENTERA ------------
    {
      field: 'entidad_entera_consultar',
      headerName: 'Entidad Entera',
      width: 210,
      headerAlign: 'center',
      renderCell: (params: GridValueGetterParams) => (
        <>
          <CheckboxComponent
            checked={params.row.entidad_entera_consultar}
            title1="CONSULTAR"
            title2="CONSULTAR"
            handleChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleCheckboxChangeConsulta(
                event,
                'id_ccd',
                params.row.id_ccd,
                controlAccesoExpedientesList.length > 0
                  ? controlAccesoExpedientesList
                  : rowsControlInicial,
                ['entidad_entera_consultar', 'entidad_entera_descargar'],
                'entidad_entera_consultar',
                dispatch,
                controlAccesoExpedientesList.length > 0
                  ? setControlAccesoExpedientesList
                  : setRowsControlInicial
              );
            }}
          />

          <CheckboxComponent
            checked={params.row.entidad_entera_descargar}
            title1=" DESCARGAR"
            title2="DESCARGAR"
            handleChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleCheckboxChangePRUEBA(
                event,
                'id_ccd',
                params.row.id_ccd,
                controlAccesoExpedientesList.length > 0
                  ? controlAccesoExpedientesList
                  : rowsControlInicial,
                ['entidad_entera_consultar', 'entidad_entera_descargar'],
                'entidad_entera_consultar',
                dispatch,
                controlAccesoExpedientesList.length > 0
                  ? setControlAccesoExpedientesList
                  : setRowsControlInicial
              );
            }}
          />
        </>
      ),
    },
    // ? ------------- ENTIDAD ENTERA ------------

    {
      field: 'seccion_actual_respon_serie_doc_consultar',
      headerName: 'Sección Actual Responsable de la serie documental',
      width: 450,
      headerAlign: 'center',
      renderCell: (params: GridValueGetterParams) => (
        <>
          <CheckboxComponent
            checked={params.row.seccion_actual_respon_serie_doc_consultar}
            title1="CONSULTAR"
            title2="CONSULTAR"
            handleChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleCheckboxChangeConsulta(
                event,
                'id_ccd',
                params.row.id_ccd,
                controlAccesoExpedientesList.length > 0
                  ? controlAccesoExpedientesList
                  : rowsControlInicial,
                [
                  'seccion_actual_respon_serie_doc_consultar',
                  'seccion_actual_respon_serie_doc_descargar',
                ],
                'seccion_actual_respon_serie_doc_consultar',
                dispatch,
                controlAccesoExpedientesList.length > 0
                  ? setControlAccesoExpedientesList
                  : setRowsControlInicial
              );
            }}
          />
          <CheckboxComponent
            checked={params.row.seccion_actual_respon_serie_doc_descargar}
            title1="DESCARGAR"
            title2="DESCARGAR"
            handleChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleCheckboxChangePRUEBA(
                event,
                'id_ccd',
                params.row.id_ccd,
                controlAccesoExpedientesList.length > 0
                  ? controlAccesoExpedientesList
                  : rowsControlInicial,
                [
                  'seccion_actual_respon_serie_doc_consultar',
                  'seccion_actual_respon_serie_doc_descargar',
                ],
                'seccion_actual_respon_serie_doc_consultar',
                dispatch,
                controlAccesoExpedientesList.length > 0
                  ? setControlAccesoExpedientesList
                  : setRowsControlInicial
              );
            }}
          />
        </>
      ),
    },

    // ? seccion raiz del organigrama actual
    {
      field: 'seccion_raiz_organi_actual_consultar',
      headerName: 'Sección Raíz de organigrama actual',
      width: 350,
      headerAlign: 'center',
      renderCell: (params: GridValueGetterParams) => (
        <>
          <CheckboxComponent
            checked={params.row.seccion_raiz_organi_actual_consultar}
            title1="CONSULTAR"
            title2="CONSULTAR"
            handleChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleCheckboxChangeConsulta(
                event,
                'id_ccd',
                params.row.id_ccd,
                controlAccesoExpedientesList.length > 0
                  ? controlAccesoExpedientesList
                  : rowsControlInicial,
                [
                  'seccion_raiz_organi_actual_consultar',
                  'seccion_raiz_organi_actual_descargar',
                ],
                'seccion_raiz_organi_actual_consultar',
                dispatch,
                controlAccesoExpedientesList.length > 0
                  ? setControlAccesoExpedientesList
                  : setRowsControlInicial
              );
            }}
          />
          <CheckboxComponent
            checked={params.row.seccion_raiz_organi_actual_descargar}
            title1="DESCARGAR"
            title2="DESCARGAR"
            handleChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleCheckboxChangePRUEBA(
                event,
                'id_ccd',
                params.row.id_ccd,
                controlAccesoExpedientesList.length > 0
                  ? controlAccesoExpedientesList
                  : rowsControlInicial,
                [
                  'seccion_raiz_organi_actual_consultar',
                  'seccion_raiz_organi_actual_descargar',
                ],
                'seccion_raiz_organi_actual_consultar',
                dispatch,
                controlAccesoExpedientesList.length > 0
                  ? setControlAccesoExpedientesList
                  : setRowsControlInicial
              );
            }}
          />
        </>
      ),
    },

    // ? seccion raiz del organigrama actual FIN
    // ! secciones que son del mismo nivel o uno superior al de la unidad responsable de la serie documental
    {
      field: 'secciones_actuales_mismo_o_sup_nivel_respon_consulta',
      headerName:
        'Secciones de nivel igual o superior a la unidad responsable de la serie',
      width: 550,
      headerAlign: 'center',
      renderCell: (params: GridValueGetterParams) => (
        <>
          <CheckboxComponent
            checked={
              params.row.secciones_actuales_mismo_o_sup_nivel_respon_consulta
            }
            title1="CONSULTAR"
            title2="CONSULTAR"
            handleChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleCheckboxChangeConsulta(
                event,
                'id_ccd',
                params.row.id_ccd,
                controlAccesoExpedientesList.length > 0
                  ? controlAccesoExpedientesList
                  : rowsControlInicial,
                [
                  'secciones_actuales_mismo_o_sup_nivel_respon_consulta',
                  'secciones_actuales_mismo_o_sup_nivel_respon_descargar',
                ],
                'secciones_actuales_mismo_o_sup_nivel_respon_consulta',
                dispatch,
                controlAccesoExpedientesList.length > 0
                  ? setControlAccesoExpedientesList
                  : setRowsControlInicial
              );
            }}
          />
          <CheckboxComponent
            checked={
              params.row.secciones_actuales_mismo_o_sup_nivel_respon_descargar
            }
            title1="DESCARGAR"
            title2="DESCARGAR"
            handleChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleCheckboxChangePRUEBA(
                event,
                'id_ccd',
                params.row.id_ccd,
                controlAccesoExpedientesList.length > 0
                  ? controlAccesoExpedientesList
                  : rowsControlInicial,
                [
                  'secciones_actuales_mismo_o_sup_nivel_respon_consulta',
                  'secciones_actuales_mismo_o_sup_nivel_respon_descargar',
                ],
                'secciones_actuales_mismo_o_sup_nivel_respon_consulta',
                dispatch,
                controlAccesoExpedientesList.length > 0
                  ? setControlAccesoExpedientesList
                  : setRowsControlInicial
              );
            }}
          />
        </>
      ),
    },

    // ! secciones que son del mismo nivel o uno superior al de la unidad responsable de la serie documental
    //* secciones que son de niveles inferiores al de la unidad responsable de la serie documental
    {
      field: 'secciones_actuales_inf_nivel_respon_consultar',
      headerName:
        'Secciones de niveles inferiores a la unidad responsable de la serie',
      width: 550,
      headerAlign: 'center',
      renderCell: (params: GridValueGetterParams) => (
        <>
          <CheckboxComponent
            checked={params.row.secciones_actuales_inf_nivel_respon_consultar}
            title1="CONSULTAR"
            title2="CONSULTAR"
            handleChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleCheckboxChangeConsulta(
                event,
                'id_ccd',
                params.row.id_ccd,
                controlAccesoExpedientesList.length > 0
                  ? controlAccesoExpedientesList
                  : rowsControlInicial,
                [
                  'secciones_actuales_inf_nivel_respon_consultar',
                  'secciones_actuales_inf_nivel_respon_descargar',
                ],
                'secciones_actuales_inf_nivel_respon_consultar',
                dispatch,
                controlAccesoExpedientesList.length > 0
                  ? setControlAccesoExpedientesList
                  : setRowsControlInicial
              );
            }}
          />
          <CheckboxComponent
            checked={params.row.secciones_actuales_inf_nivel_respon_descargar}
            title1="DESCARGAR"
            title2="DESCARGAR"
            handleChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleCheckboxChangePRUEBA(
                event,
                'id_ccd',
                params.row.id_ccd,
                controlAccesoExpedientesList.length > 0
                  ? controlAccesoExpedientesList
                  : rowsControlInicial,
                [
                  'secciones_actuales_inf_nivel_respon_consultar',
                  'secciones_actuales_inf_nivel_respon_descargar',
                ],
                'secciones_actuales_inf_nivel_respon_consultar',
                dispatch,
                controlAccesoExpedientesList.length > 0
                  ? setControlAccesoExpedientesList
                  : setRowsControlInicial
              );
            }}
          />
        </>
      ),
    },

    //* secciones que son de niveles inferiores al de la unidad responsable de la serie documental
    //! unidades organizacionales dentro de la unidad responsable de la serie documental del mismo nivel o SUPERIOR al de la unidad responsable del expediente.
    {
      field: 'unds_org_sec_respon_mismo_o_sup_nivel_resp_exp_consultar',
      headerName:
        'Unidades dentro de la responsable de la serie del mismo nivel o superior al de la unidad responsable del expediente',
      width: 750,
      headerAlign: 'center',
      renderCell: (params: GridValueGetterParams) => (
        <>
          <CheckboxComponent
            checked={
              params.row
                .unds_org_sec_respon_mismo_o_sup_nivel_resp_exp_consultar
            }
            title1="CONSULTAR"
            title2="CONSULTAR"
            handleChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleCheckboxChangeConsulta(
                event,
                'id_ccd',
                params.row.id_ccd,
                controlAccesoExpedientesList.length > 0
                  ? controlAccesoExpedientesList
                  : rowsControlInicial,
                [
                  'unds_org_sec_respon_mismo_o_sup_nivel_resp_exp_consultar',
                  'unds_org_sec_respon_mismo_o_sup_nivel_resp_exp_descargar',
                ],
                'unds_org_sec_respon_mismo_o_sup_nivel_resp_exp_consultar',
                dispatch,
                controlAccesoExpedientesList.length > 0
                  ? setControlAccesoExpedientesList
                  : setRowsControlInicial
              );
            }}
          />
          <CheckboxComponent
            checked={
              params.row
                .unds_org_sec_respon_mismo_o_sup_nivel_resp_exp_descargar
            }
            title1="DESCARGAR"
            title2="DESCARGAR"
            handleChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleCheckboxChangePRUEBA(
                event,
                'id_ccd',
                params.row.id_ccd,
                controlAccesoExpedientesList.length > 0
                  ? controlAccesoExpedientesList
                  : rowsControlInicial,
                [
                  'unds_org_sec_respon_mismo_o_sup_nivel_resp_exp_consultar',
                  'unds_org_sec_respon_mismo_o_sup_nivel_resp_exp_descargar',
                ],
                'unds_org_sec_respon_mismo_o_sup_nivel_resp_exp_consultar',
                dispatch,
                controlAccesoExpedientesList.length > 0
                  ? setControlAccesoExpedientesList
                  : setRowsControlInicial
              );
            }}
          />
        </>
      ),
    },

    //! unidades organizacionales dentro de la unidad responsable de la serie documental del mismo nivel o SUPERIOR al de la unidad responsable del expediente.
    // ? unidades organizacionales dentro de la unidad responsable de la serie documental de niveles INFERIORES al de la unidad responsable del expediente.
    {
      field: 'unds_org_sec_respon_inf_nivel_resp_exp_consultar',
      headerName:
        'Unidades dentro de la unidad responsable de la serie de niveles inferiores al de la unidad responsable del expediente',
      width: 750,
      headerAlign: 'center',
      renderCell: (params: GridValueGetterParams) => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <CheckboxComponent
            checked={
              params.row.unds_org_sec_respon_inf_nivel_resp_exp_consultar
            }
            title1="CONSULTAR"
            title2="CONSULTAR"
            handleChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleCheckboxChangeConsulta(
                event,
                'id_ccd',
                params.row.id_ccd,
                controlAccesoExpedientesList.length > 0
                  ? controlAccesoExpedientesList
                  : rowsControlInicial,
                [
                  'unds_org_sec_respon_inf_nivel_resp_exp_consultar',
                  'unds_org_sec_respon_inf_nivel_resp_exp_descargar',
                ],
                'unds_org_sec_respon_inf_nivel_resp_exp_consultar',
                dispatch,
                controlAccesoExpedientesList.length > 0
                  ? setControlAccesoExpedientesList
                  : setRowsControlInicial
              );
            }}
          />
          <CheckboxComponent
            checked={
              params.row.unds_org_sec_respon_inf_nivel_resp_exp_descargar
            }
            title1="DESCARGAR"
            title2="DESCARGAR"
            handleChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleCheckboxChangePRUEBA(
                event,
                'id_ccd',
                params.row.id_ccd,
                controlAccesoExpedientesList.length > 0
                  ? controlAccesoExpedientesList
                  : rowsControlInicial,
                [
                  'unds_org_sec_respon_inf_nivel_resp_exp_consultar',
                  'unds_org_sec_respon_inf_nivel_resp_exp_descargar',
                ],
                'unds_org_sec_respon_inf_nivel_resp_exp_consultar',
                dispatch,
                controlAccesoExpedientesList.length > 0
                  ? setControlAccesoExpedientesList
                  : setRowsControlInicial
              );
            }}
          />
        </div>
      ),
    },

    // ? unidades organizacionales dentro de la unidad responsable de la serie documental de niveles INFERIORES al de la unidad responsable del expediente.

    // ! datos iniciales
    ...columnsControlAcceso,
    // ! datos iniciales
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
        rows={
          controlAccesoExpedientesList.length > 0
            ?  controlAccesoExpedientesList.filter(el => el?.id_ctrl_acceso_clasif_exp_ccd === currentControlAccesoExpedientes?.id_ctrl_acceso_clasif_exp_ccd)
            : rowsControlInicial ?? []
        }
        title="Autorizaciones generales"
      />
    </>
  );
};
