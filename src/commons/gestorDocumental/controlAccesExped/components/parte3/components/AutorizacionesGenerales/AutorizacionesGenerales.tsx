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

import InfoIcon from '@mui/icons-material/Info';
import { CheckboxComponent } from '../../../../../../../utils/Checkbox/CheckboxComponent';
import { handleCheckboxChange } from '../../../../../../../utils/Checkbox/functions/handleCheckbox';

//! componente unidades organizacionales actuales de la sección responsable
export const AutorizacionesGenerales: FC<any> = (): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();
  //* get states from redux store
  const { unidadActuales } = useAppSelector((state) => state.PsdSlice);

  // ? context necesarios
  // const { loadingRestricciones } = useContext(ModalContextPSD);

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
    console.log(DATOS_ACTUALIZADOS);
    dispatch(callback(DATOS_ACTUALIZADOS));
  };


/*  const columns = [
    ...columnsAsignacionPer,
    {
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
  ]; */

/*
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
*/
  // ! solo se renderizaran en este componente aquellos objetos con la propiedad mostrar en TRUE, los demas irán en el modal

  return (
    <>
      <RenderDataGrid
        columns={[]}
        rows={[]}
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
