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

  // ! functions

  const handleCheckboxChange = (
    event: any,
    id_und_organizacional_actual: number
    // params: any
  ): void => {
    console.log(unidadActuales);
    const RESTRICCIONES_ACTUALIZADAS = unidadActuales.map((restriccion: any) =>
      restriccion.id_und_organizacional_actual === id_und_organizacional_actual
        ? {
            ...restriccion,
            crear_documentos_exps_no_propios: event.target.checked
          }
        : restriccion
    );
    // dispatch(get_unitys(newUnidadesActualizaciónActivo));
    dispatch(set_permisos_unidades_actuales_action(RESTRICCIONES_ACTUALIZADAS));
  };

  // ? este campo ""pertenece_seccion_actual_admin_serie": false,"    --- debe mandarse en TRUE para este caso

  const columns = [
    ...columnsAsignacionPer,

    // ? permisos --- LUEGO SE DEBE SEPARAR LA LÓGICA NECESARIA - SE DEJA ASÍ POR AHORA PARA VER COMO FUNCIONA
    //* --- dentro de cada fila de permisos van a coexsistir dos elementos renderizados (una guía de lo que marque en el checkbox y el respectivo checkbox )
    { field: 'crear_expedientes', headerName: 'Crear expediente', width: 150 },
    {
      field: 'crear_documentos_exps_no_propios',
      headerName: 'Crear documento',
      width: 150,
      renderCell: (params: any) => (
        <>
          <FormControl fullWidth>
            <FormControlLabel
              control={
                <Checkbox //* el title debe ir como un parametro que reciba el componente
                  checked={params.row.crear_documentos_exps_no_propios} //* debe ir como un parametro que reciba el componente
                  onChange={(event) => {
                    handleCheckboxChange(
                      event,
                      params.row.id_und_organizacional_actual
                    );
                    // ? la funcion onchange tambien debe ser un paramatro que reciba el componente con la lógica
                    console.log(event);
                  }}
                  inputProps={{ 'aria-label': 'Seleccionar item' }}
                />
              }
              label={
                params.row.crear_documentos_exps_no_propios ? (
                  <Tooltip title={`crear documento marcado`} placement="right">
                    <InfoIcon
                      sx={{
                        width: '1.2rem',
                        height: '1.2rem',
                        ml: '0.5rem',
                        color: 'green'
                      }}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip
                    title={`crear documento desmarcado`}
                    placement="right"
                  >
                    <InfoIcon
                      sx={{
                        width: '1.2rem',
                        height: '1.2rem',
                        ml: '0.5rem',
                        color: 'orange'
                      }}
                    />
                  </Tooltip>
                )
              }
            />
          </FormControl>
        </>
      )
    },
    {
      field: 'anular_documentos_exps_no_propios',
      headerName: 'Anular documento',
      width: 150
    },
    {
      field: 'borrar_documentos_exps_no_propios',
      headerName: 'Borrar documento',
      width: 150
    },
    {
      field: 'conceder_acceso_documentos_exps_no_propios',
      headerName: 'Conceder acceso a docs',
      width: 180
    },
    {
      field: 'conceder_acceso_expedientes_no_propios',
      headerName: 'Conceder acceso a exps',
      width: 180
    },
    {
      field: 'consultar_expedientes_no_propios',
      headerName: 'Consultar expedientes',
      width: 180
    },
    {
      field: 'descargar_expedientes_no_propios',
      headerName: 'Descargar expedientes',
      width: 180
    }

    //* revisar para que puede ser útil esta opción
    // { field: 'id_permisos_und_org_actual_serie_exp_ccd', headerName: 'ID de permisos' },

    // ! este campo ""pertenece_seccion_actual_admin_serie": false,"    --- debe mandarse en FALSE para este caso
    // { field: 'pertenece_seccion_actual_admin_serie', headerName: 'Pertenece a la sección actual' }
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

/*


esta funcion --- actualizar varios valores al tiempo, se debe analizar como integrar la respectiva funcion en el codigo del componente que se va a crear

const handleCheckboxChange = (
  event: any,
  id_und_organizacional_actual: number,
  propiedades: string[]
): void => {
  console.log(unidadActuales);
  const RESTRICCIONES_ACTUALIZADAS = unidadActuales.map((restriccion: any) => {
    if (restriccion.id_und_organizacional_actual === id_und_organizacional_actual) {
      const restriccionActualizada = { ...restriccion };
      for (const propiedad of propiedades) {
        restriccionActualizada[propiedad] = event.target.checked;
      }
      return restriccionActualizada;
    } else {
      return restriccion;
    }
  });
  dispatch(set_permisos_unidades_actuales_action(RESTRICCIONES_ACTUALIZADAS));
};


handleCheckboxChange(event, id_und_organizacional_actual, ['crear_documentos_exps_no_propios', 'editar_documentos_exps_no_propios']);

*/
