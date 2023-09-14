/* eslint-disable @typescript-eslint/naming-convention */
import { type FC } from 'react';
import { RenderDataGrid } from '../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { useAppSelector } from '../../../../../../../hooks';
import { Chip } from '@mui/material';
// componente restricción para todas las unidades organizacionales (dentro de denegación de permisos sobre expedientes propios)
export const RestriccionTodUnidOrg: FC<any> = (): JSX.Element => {
  //* redux states
  const { restriccionesParaTodasLasUnidadesOrganizacionales } = useAppSelector(
    (state) => state.PsdSlice
  );

  const columns = [
    {
      field: 'id',
      headerName: 'Configuración de restricciones',
      width: 380,

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
      width: 100,
      renderCell: (params: any) =>
        params.row.checked ? (
          <Chip label="SI" color="primary" variant="outlined" />
        ) : (
          <Chip label="NO" color="error" variant="outlined" />
        )
    }
  ];

  return (
    <RenderDataGrid
      columns={columns ?? []}
      rows={restriccionesParaTodasLasUnidadesOrganizacionales ?? []}
      title="Restricción para todas las unidades organizacionales"
    />
  );
};



/*
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