/* eslint-disable @typescript-eslint/naming-convention */
import { useContext, type FC, useState } from 'react';
import { RenderDataGrid } from '../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  Tooltip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch, useAppSelector } from '../../../../../../../hooks';
import { containerStyles } from './../../../../../tca/screens/utils/constants/constants';
import { Loader } from '../../../../../../../utils/Loader/Loader';

import { ModalContextPSD } from '../../../../context/ModalContextPSD';
import { set_permisos_unidades_actuales_action } from '../../../../toolkit/slice/PSDSlice';
import InfoIcon from '@mui/icons-material/Info';
import { columnsAsignacionPer } from '../../utils/columnsAsignacionPer/columnsAsignacionPer';
import { ModalActSecResp } from './ModalUnidadActSecResp/ModalActSecResp';
import { CheckboxComponent } from '../../../../../../../utils/Checkbox/CheckboxComponent';
import { handleCheckboxChange } from '../../../../../../../utils/Checkbox/functions/handleCheckbox';

//! componente unidades organizacionales actuales de la sección responsable
export const UnidadActSecResp: FC<any> = (): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();
  //* get states from redux store
  const { unidadActuales } = useAppSelector((state) => state.PsdSlice);

  // ? context necesarios
  const { loadingRestricciones } = useContext(ModalContextPSD);

  // ? useStates necesarios
  const [modalUniProp, setmodalUniProp] = useState<boolean>(false);

  // ? este campo ""pertenece_seccion_actual_admin_serie": false,"    --- debe mandarse en TRUE para este caso

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
      elemento.hasOwnProperty(compararPor) && elemento[compararPor] === valorComparar
        ? {
            ...elemento,
            ...Object.fromEntries(
              propiedades.map((propiedad) => [
                propiedad,
                propiedad === 'consultar_expedientes_no_propios' && elemento[propiedad] ? true : checked,
              ])
            ),
          }
        : elemento
    );
    //  console.log('')(DATOS_ACTUALIZADOS);
    dispatch(callback(DATOS_ACTUALIZADOS));
  };


  const handleCheckboxChangeConsulta = (
    { target: { checked } }: React.ChangeEvent<HTMLInputElement>,
    compararPor: string,
    valorComparar: any,
    arrayComparacion: any[],
    propiedades: string[],
    dispatch: React.Dispatch<any>,
    callback: Function
  ): void => {
    const DATOS_ACTUALIZADOS = arrayComparacion.map((elemento: any) =>
      elemento.hasOwnProperty(compararPor) && elemento[compararPor] === valorComparar
        ? {
            ...elemento,
            ...Object.fromEntries(
              propiedades.map((propiedad) => [
                propiedad,
                propiedad === 'consultar_expedientes_no_propios' ? checked : false,
              ])
            ),
          }
        : elemento
    );
    //  console.log('')(DATOS_ACTUALIZADOS);
    dispatch(callback(DATOS_ACTUALIZADOS));
  };


  const columns = [
    ...columnsAsignacionPer,
    {
      field: 'crear_expedientes',
      headerName: 'Crear expediente',
      width: 135,
      renderCell: (params: any) => (
        <CheckboxComponent
          checked={params.row.crear_expedientes}
          handleChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleCheckboxChange(
              event,
              'id_und_organizacional_actual',
              params.row.id_und_organizacional_actual,
              unidadActuales,
              ['crear_expedientes'],
              dispatch,
              set_permisos_unidades_actuales_action
            );
          }}
        />
      )
    },
    {
      field: 'crear_documentos_exps_no_propios',
      headerName: 'Crear documento',
      width: 135,
      renderCell: (params: any) => (
        <CheckboxComponent
          checked={params.row.crear_documentos_exps_no_propios}
          handleChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleCheckboxChange(
              event,
              'id_und_organizacional_actual',
              params.row.id_und_organizacional_actual,
              unidadActuales,
              ['crear_documentos_exps_no_propios'],
              dispatch,
              set_permisos_unidades_actuales_action
            );
          }}
        />
      )
    },
    {
      // ! ------- ANULAR ----
      field: 'anular_documentos_exps_no_propios',
      headerName: 'Anular documento',
      width: 135,
      renderCell: (params: any) => (
        <CheckboxComponent
          checked={params.row.anular_documentos_exps_no_propios}


         handleChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          handleCheckboxChangePRUEBA(
              event,
              'id_und_organizacional_actual',
              params.row.id_und_organizacional_actual,
              unidadActuales,
              ['anular_documentos_exps_no_propios', 'consultar_expedientes_no_propios'],
              dispatch,
              set_permisos_unidades_actuales_action
            );
          }}
        />
      )
    },
    {
      // ! ------- BORRAR DOCUMENTO ----
      field: 'borrar_documentos_exps_no_propios',
      headerName: 'Borrar documento',
      width: 135,
      renderCell: (params: any) => (
        <CheckboxComponent
          checked={params.row.borrar_documentos_exps_no_propios}
          handleChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleCheckboxChangePRUEBA(
              event,
              'id_und_organizacional_actual',
              params.row.id_und_organizacional_actual,
              unidadActuales,
              ['borrar_documentos_exps_no_propios','consultar_expedientes_no_propios'],
              dispatch,
              set_permisos_unidades_actuales_action
            );
          }}
        />
      )
    },
    {
      // ! ------- CONCEDER ACCESO A EXPEDIENTE ----
      field: 'conceder_acceso_documentos_exps_no_propios',
      headerName: 'Conceder acceso a docs',
      width: 165,
      renderCell: (params: any) => (
        <CheckboxComponent
          checked={params.row.conceder_acceso_documentos_exps_no_propios}
          handleChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleCheckboxChangePRUEBA(
              event,
              'id_und_organizacional_actual',
              params.row.id_und_organizacional_actual,
              unidadActuales,
              ['conceder_acceso_documentos_exps_no_propios', 'consultar_expedientes_no_propios'],
              dispatch,
              set_permisos_unidades_actuales_action
            );
          }}
        />
      )
    },
    {
      // ! ------- CONCEDER ACCESO A EXPEDIENTES ----
      field: 'conceder_acceso_expedientes_no_propios',
      headerName: 'Conceder acceso a exps',
      width: 165,
      renderCell: (params: any) => (
        <CheckboxComponent
          checked={params.row.conceder_acceso_expedientes_no_propios}
          handleChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleCheckboxChangePRUEBA(
              event,
              'id_und_organizacional_actual',
              params.row.id_und_organizacional_actual,
              unidadActuales,
              ['conceder_acceso_expedientes_no_propios','consultar_expedientes_no_propios'],
              dispatch,
              set_permisos_unidades_actuales_action
            );
          }}
        />
      )
    },
    {
      field: 'consultar_expedientes_no_propios',
      headerName: 'Consultar expedientes',
      width: 165,
      renderCell: (params: any) => (
        <CheckboxComponent
          checked={params.row.consultar_expedientes_no_propios}
          handleChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleCheckboxChangeConsulta(
              event,
              'id_und_organizacional_actual',
              params.row.id_und_organizacional_actual,
              unidadActuales,
              ['consultar_expedientes_no_propios',
              'descargar_expedientes_no_propios',
              'anular_documentos_exps_no_propios',
              'borrar_documentos_exps_no_propios',
              'conceder_acceso_documentos_exps_no_propios',
              'conceder_acceso_expedientes_no_propios',
            ],
              dispatch,
              set_permisos_unidades_actuales_action
            );
          }}
        />
      )
    },
    {
      field: 'descargar_expedientes_no_propios',
      headerName: 'Descargar expedientes',
      width: 165,
      renderCell: (params: any) => (
        <CheckboxComponent
          checked={params.row.descargar_expedientes_no_propios}
          handleChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleCheckboxChangePRUEBA(
              event,
              'id_und_organizacional_actual',
              params.row.id_und_organizacional_actual,
              unidadActuales,
              ['descargar_expedientes_no_propios','consultar_expedientes_no_propios'],
              dispatch,
              set_permisos_unidades_actuales_action
            );
          }}
        />
      )
    }
  ];

  if (loadingRestricciones)
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
        <Loader altura={270} />
      </Grid>
    );

  // ! solo se renderizaran en este componente aquellos objetos con la propiedad mostrar en TRUE, los demas irán en el modal

  return (
    <>
      <RenderDataGrid
        columns={columns || []}
        rows={unidadActuales.filter((el) => el.mostrar) || []}
        title="Unidades organizacionales actuales de la sección responsable"
        aditionalElement={
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
                /* disabled={
                  unidadActuales.filter((el) => !el.mostrar).length === 0
                } */
                onClick={() => {
                  setmodalUniProp(true);
                }}
              >
                AGREGAR UNIDADES PROPIAS
              </Button>
            </Grid>
          </Tooltip>
        }
      />

      {/*modal agregar unidades propias*/}
      <ModalActSecResp
        modalUniProp={modalUniProp}
        setmodalUniProp={setmodalUniProp}
      />
      {/*modal agregar unidades propias*/}
    </>
  );
};
