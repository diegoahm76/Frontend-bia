/* eslint-disable @typescript-eslint/naming-convention */
import { type FC } from 'react';
import { RenderDataGrid } from '../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { useAppDispatch, useAppSelector } from '../../../../../../../hooks';
import { Checkbox, Chip, Tooltip } from '@mui/material';
import { set_restricciones_para_todas_las_unidades_organizacionales_action } from '../../../../toolkit/slice/PSDSlice';
// componente restricción para todas las unidades organizacionales (dentro de denegación de permisos sobre expedientes propios)
export const RestriccionTodUnidOrg: FC<any> = (): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();

  //* redux states
  const { restriccionesParaTodasLasUnidadesOrganizacionales } = useAppSelector(
    (state) => state.PsdSlice
  );

  //* función de chequeo
  const handleCheckboxChange = (
    event: any,
    id_restriccion: number,
    // params: any
  ): void => {
    console.log(restriccionesParaTodasLasUnidadesOrganizacionales);
    const RESTRICCIONES_ACTUALIZADAS =
      restriccionesParaTodasLasUnidadesOrganizacionales.map(
        (restriccion: any) =>
          restriccion.id === id_restriccion
            ? { ...restriccion, checked: event.target.checked }
            : restriccion
      );
    // dispatch(get_unitys(newUnidadesActualizaciónActivo));
    dispatch(
      set_restricciones_para_todas_las_unidades_organizacionales_action(
        RESTRICCIONES_ACTUALIZADAS
      )
    );
  };

  const columns = [
    {
      field: 'id',
      headerName: 'Configuración de restricciones',
      width: 480,

      renderCell: (params: any) => (
        <div
          onClick={() => {
            console.log('se hace click');
            console.log(params.row);
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            wordWrap: 'break-word'
          }}
        >
          {params.row.id === 'denegar_borrado_docs' ? (
            'Denegar el borrado de documentos'
          ) : params.row.id === 'denegar_anulacion_docs' ? (
            'Denegar la anulación de documentos'
          ) : params.row.id ===
            'excluir_und_actual_respon_series_doc_restriccion' ? (
            <div
              style={{
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-all'
              }}
            >
              Excluir a sección o subsección actual responsable de la serie
              documental, de las restricción de anulacion y borrado
            </div>
          ) : (
            ''
          )}
        </div>
      )
    },
    {
      field: 'checked',
      headerName: 'Marcado',
      width: 130,
      renderCell: (params: any) =>
        params.row.checked ? (
          <Chip label="SI" color="success" variant="outlined" />
        ) : (
          <Chip label="NO" color="error" variant="outlined" />
        )
    },
    {
      headerName: 'Marcar',
      headerAlign: 'center',
      field: 'acciones',
      width: 130,
      // hide: organigram_current.fecha_terminado !== null,
      renderCell: (params: any) => (
        <Tooltip title="Marcar / desmarcar restricción">
          <Checkbox
            checked={params.row.checked}
            onChange={(event) =>
              handleCheckboxChange(event, params.row.id)
            }
            inputProps={{ 'aria-label': 'Seleccionar item' }}
          />
        </Tooltip>
      )
    }
  ];

  return (
    <RenderDataGrid
      columns={columns || []}
      rows={restriccionesParaTodasLasUnidadesOrganizacionales || []}
      title="Restricción para todas las unidades organizacionales"
    />
  );
};

/*

  ----- funcion de cambio de estado
    const handleCheckboxChange = (
    event: any,
    id_unidad_organizacional: number,
    params: any
  ): void => {
    console.log(params.row, 'params.row');
    const newUnidadesActualizaciónActivo = unity_organigram.map((unidad: any) =>
      unidad.id_unidad_organizacional === id_unidad_organizacional
        ? { ...unidad, activo: event.target.checked }
        : unidad
    );
    dispatch(get_unitys(newUnidadesActualizaciónActivo));
  };
  -----------------------------------


  -----------------








  const edit_prop_activo_unidad_org = (newObject: any) => {
    console.log(newObject, 'newObject');

    dispatch(
      update_unitys_service(
        organigram_current?.id_organigrama,
        newObject,
        clean_unitys,
        setloadingLevels,
        setDataloading
      )
    );
  };

-----------------

  export const update_unitys_service: any = (
  id: string | number,
  new_unitys: any,
  clean_unitys: any,
  setloadingLevels: Dispatch<SetStateAction<boolean>>,
  setDataloading: Dispatch<SetStateAction<boolean>>
) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      setloadingLevels(true);
      const { data } = await api.put(
        `transversal/organigrama/unidades/update/${id}/`,
        new_unitys
      );
      dispatch(get_unitys_service(id, setDataloading));
      control_success('Proceso Exitoso');
      clean_unitys();
      return data;
    } catch (error: any) {
      // console.log('update_unitys_service fail');
      control_error(error.response.data.detail);
      return error as AxiosError;
    } finally {
      clean_unitys();
      setloadingLevels(false);
    }
  };
};

*/
