/* eslint-disable @typescript-eslint/naming-convention */
import { type FC } from 'react';
import { RenderDataGrid } from '../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { Checkbox, Chip, Tooltip } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../../../../hooks';
import { set_restricciones_para_unidades_diferentes_al_a_seccion_o_subseccion_actual_responsable_action } from '../../../../toolkit/slice/PSDSlice';

// componente restricción para todas las unidades organizacionales (dentro de denegación de permisos sobre expedientes propios)
export const ResUniDifSecSubAct: FC<any> = (): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();

  //* redux states
  const {
    restriccionesParaUnidadesDiferentesAlaSeccionOsubseccionActualResponsable
  } = useAppSelector((state) => state.PsdSlice);

  //* función de chequeo
  const handleCheckboxChange = (
    event: any,
    id_restriccion: number
    // params: any
  ): void => {
    console.log(
      restriccionesParaUnidadesDiferentesAlaSeccionOsubseccionActualResponsable
    );
    const RESTRICCIONES_ACTUALIZADAS =
      restriccionesParaUnidadesDiferentesAlaSeccionOsubseccionActualResponsable.map(
        (restriccion: any) =>
          restriccion.id === id_restriccion
            ? { ...restriccion, checked: event.target.checked }
            : restriccion
      );
    // dispatch(get_unitys(newUnidadesActualizaciónActivo));
    dispatch(
      set_restricciones_para_unidades_diferentes_al_a_seccion_o_subseccion_actual_responsable_action(
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
          {params.row.id === 'denegar_conceder_acceso_doc_na_resp_series' ? (
            'Denegar conceder acceso a documentos'
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
            onChange={(event) => handleCheckboxChange(event, params.row.id)}
            inputProps={{ 'aria-label': 'Seleccionar item' }}
          />
        </Tooltip>
      )
    }
  ];

  return (
    <RenderDataGrid
      columns={columns}
      rows={
        restriccionesParaUnidadesDiferentesAlaSeccionOsubseccionActualResponsable
      }
      title="Restricción a unidades diferentes a la sección o subsección actual responsable de la serie documental"
    />
  );
};
