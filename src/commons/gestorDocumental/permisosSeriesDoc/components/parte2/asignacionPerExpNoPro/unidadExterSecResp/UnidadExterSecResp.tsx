/* eslint-disable @typescript-eslint/naming-convention */
import { useContext, type FC, useState } from 'react';
import { RenderDataGrid } from '../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import AddIcon from '@mui/icons-material/Add';
import { Button, Grid, Tooltip } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../../../../hooks';
import { containerStyles } from './../../../../../tca/screens/utils/constants/constants';
import { Loader } from '../../../../../../../utils/Loader/Loader';
import { columnsAsignacionPer } from '../../utils/columnsAsignacionPer/columnsAsignacionPer';
import { ModalContextPSD } from '../../../../context/ModalContextPSD';
import { ModalUniExterSecResp } from './ModalUniExterSecResp/ModalUniExterSecResp';
import { CheckboxComponent } from '../../../../../../../utils/Checkbox/CheckboxComponent';
import { handleCheckboxChange } from '../../../../../../../utils/Checkbox/functions/handleCheckbox';
import { set_permisos_unidades_actuales_externas_action } from '../../../../toolkit/slice/PSDSlice';

// ! Unidades organizacionales actuales EXTERNAS a la sección responsable
export const UnidadExterSecResp: FC<any> = (): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();
  //* get states from redux store
  const { unidadesActualesExternas } = useAppSelector(
    (state) => state.PsdSlice
  );

  // ? context necesarios
  const { loadingRestricciones } = useContext(ModalContextPSD);

  // ? useState necesarios
  const [modalUniExt, setmodalUniExt] = useState<boolean>(false);

  // ? este campo ""pertenece_seccion_actual_admin_serie": false,"    --- debe mandarse en FALSE para este caso

  const handleCheckboxChangePRUEBA = (
    { target: { checked } }: React.ChangeEvent<HTMLInputElement>,
    compararPor: string,
    valorComparar: any,
    arrayComparacion: any[],
    propiedades: string[],
    dispatch: React.Dispatch<any>,
    callback: Function
  ): void => {
    const DATOS_ACTUALIZADOS = arrayComparacion.map((elementos: any) => {
      if (
        elementos.hasOwnProperty(compararPor) &&
        elementos[compararPor] === valorComparar
      ) {
        const DATA_ACTUALIZADA = { ...elementos };
        for (const propiedad of propiedades) {
          if (propiedad === 'consultar_expedientes_no_propios' && DATA_ACTUALIZADA[propiedad]) {
            DATA_ACTUALIZADA[propiedad] = true;
          } else {
            DATA_ACTUALIZADA[propiedad] = checked;
          }
        }
        return DATA_ACTUALIZADA;
      } else {
        return elementos;
      }
    });
    console.log(DATOS_ACTUALIZADOS);
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
    const DATOS_ACTUALIZADOS = arrayComparacion.map((elementos: any) => {
      if (
        elementos.hasOwnProperty(compararPor) &&
        elementos[compararPor] === valorComparar
      ) {
        const DATA_ACTUALIZADA = { ...elementos };
        for (const propiedad of propiedades) {
          if (propiedad === 'consultar_expedientes_no_propios') {
            DATA_ACTUALIZADA[propiedad] = checked;
          } else {
            DATA_ACTUALIZADA[propiedad] = false;
          }
        }
        return DATA_ACTUALIZADA;
      } else {
        return elementos;
      }
    });
    console.log(DATOS_ACTUALIZADOS);
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
              unidadesActualesExternas,
              ['crear_expedientes'],
              dispatch,
              set_permisos_unidades_actuales_externas_action
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
              unidadesActualesExternas,
              ['crear_documentos_exps_no_propios'],
              dispatch,
              set_permisos_unidades_actuales_externas_action
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
              unidadesActualesExternas,
              ['anular_documentos_exps_no_propios', 'consultar_expedientes_no_propios'],
              dispatch,
              set_permisos_unidades_actuales_externas_action
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
              unidadesActualesExternas,
              ['borrar_documentos_exps_no_propios','consultar_expedientes_no_propios'],
              dispatch,
              set_permisos_unidades_actuales_externas_action
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
              unidadesActualesExternas,
              ['conceder_acceso_documentos_exps_no_propios', 'consultar_expedientes_no_propios'],
              dispatch,
              set_permisos_unidades_actuales_externas_action
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
              unidadesActualesExternas,
              ['conceder_acceso_expedientes_no_propios','consultar_expedientes_no_propios'],
              dispatch,
              set_permisos_unidades_actuales_externas_action
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
              unidadesActualesExternas,
              ['consultar_expedientes_no_propios',
              'descargar_expedientes_no_propios',
              'anular_documentos_exps_no_propios',
              'borrar_documentos_exps_no_propios',
              'conceder_acceso_documentos_exps_no_propios',
              'conceder_acceso_expedientes_no_propios',
            ],
              dispatch,
              set_permisos_unidades_actuales_externas_action
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
              unidadesActualesExternas,
              ['descargar_expedientes_no_propios','consultar_expedientes_no_propios'],
              dispatch,
              set_permisos_unidades_actuales_externas_action
            );
          }}
        />
      )
    }
  ];


    //* revisar para que puede ser útil esta opción
    // { field: 'id_permisos_und_org_actual_serie_exp_ccd', headerName: 'ID de permisos' },

    // ! este campo ""pertenece_seccion_actual_admin_serie": false,"    --- debe mandarse en FALSE para este caso
    // { field: 'pertenece_seccion_actual_admin_serie', headerName: 'Pertenece a la sección actual' }

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
        rows={unidadesActualesExternas.filter((el) => el.mostrar) || []}
        title="Unidades organizacionales actuales externas a la sección responsable"
        aditionalElement={
          <Tooltip
            title={
              unidadesActualesExternas.filter((el) => !el.mostrar).length === 0
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
              unidadesActualesExternas.filter((el) => !el.mostrar).length === 0
            } */
                onClick={() => {
                  setmodalUniExt(true);
                }}
              >
                AGREGAR UNIDADES EXTERNAS
              </Button>
            </Grid>
          </Tooltip>
        }
      />

      {/*modal agregar unidades externas*/}
      <ModalUniExterSecResp
        modalUniExt={modalUniExt}
        setmodalUniExt={setmodalUniExt}
      />
      {/*modal agregar unidades externas*/}
    </>
  );
};
