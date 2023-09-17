/* eslint-disable @typescript-eslint/naming-convention */
import { useContext, type FC } from 'react';
import { RenderDataGrid } from '../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { useAppDispatch, useAppSelector } from '../../../../../../../hooks';
import { Checkbox, Chip, Grid, Tooltip } from '@mui/material';
import { set_restricciones_para_todas_las_unidades_organizacionales_action } from '../../../../toolkit/slice/PSDSlice';
import { ModalContextPSD } from '../../../../context/ModalContextPSD';
import { containerStyles } from './../../../../../tca/screens/utils/constants/constants';
import { Loader } from '../../../../../../../utils/Loader/Loader';
// componente restricción para todas las unidades organizacionales (dentro de denegación de permisos sobre expedientes propios)
export const RestriccionTodUnidOrg: FC<any> = (): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();

  //* redux states
  const { restriccionesParaTodasLasUnidadesOrganizacionales } = useAppSelector(
    (state) => state.PsdSlice
  );

  // ? context necesarios
  const { loadingRestricciones } = useContext(ModalContextPSD);

  //* función de chequeo
  const handleCheckboxChange = (
    event: any,
    id_restriccion: number
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
            onChange={(event) => handleCheckboxChange(event, params.row.id)}
            inputProps={{ 'aria-label': 'Seleccionar item' }}
          />
        </Tooltip>
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

  return (
    <RenderDataGrid
      columns={columns || []}
      rows={restriccionesParaTodasLasUnidadesOrganizacionales || []}
      title="Restricción para todas las unidades organizacionales"
    />
  );
};
