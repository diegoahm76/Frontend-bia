/* eslint-disable @typescript-eslint/naming-convention */
import React, { FC } from 'react';
import { Avatar, IconButton, Tooltip } from '@mui/material';
import { RenderDataGrid } from '../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks';
import EditIcon from '@mui/icons-material/Edit';
import { render } from '@testing-library/react';
import { type GridValueGetterParams } from '@mui/x-data-grid';
import { setCurrentControlAccesoExpedientes, setVerModuloAutorizacioneGenerales } from '../../../toolkit/slice/CtrlAccesoExpSlice';

//! componente unidades organizacionales actuales de la sección responsable
export const BloqueAutorizacionCCD: FC<any> = (): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();

  const { controlAccesoExpedientesList } = useAppSelector(
    (state) => state.ctrlAccesoExpSlice
  );

  const columns = [
    {
      headerName: 'Clasificación / sección',
      field: 'clasificacion_seccion',
      headerAlign: 'center',
      width: 230,
      renderCell: (params: GridValueGetterParams) => (
        <>
          {params?.row?.cod_clasificacion_exp
            ? params?.row?.cod_clasificacion_exp
            : params?.row?.nombre_unidad_organizacional}
        </>
      ),
    },
    {
      headerName: 'Serie documental',
      field: 'serie_documental',
      headerAlign: 'center',
      width: 520,
      renderCell: (params: GridValueGetterParams) => (
        <>
          {params?.row?.cod_clasificacion_exp
            ? 'N/A'
            : `${params?.row?.codigo_serie} - ${params?.row?.nombre_serie} / ${params?.row?.codigo_subserie} - ${params?.row?.nombre_subserie}`}
        </>
      ),
    },
    {
      headerName: 'Acciones',
      field: 'accion',
      renderCell: (params: any) => (
        <>
          <Tooltip title="Actualizar control de acceso" placement="top" arrow>
            <IconButton
              onClick={() => {
                //  console.log('')(params?.row);
                dispatch(setCurrentControlAccesoExpedientes(params.row));
                dispatch(setVerModuloAutorizacioneGenerales(true));
                /* dispatch(get_trd_current(params.row));
              closeModalModalSearchTRD();
              dispatch(get_trds([]));
              const ccd_current = {
                id_ccd: params?.row?.id_ccd,
                id_organigrama: params?.row?.id_organigrama
              };
              dispatch(
                getServiceSeriesSubseriesXUnidadOrganizacional(ccd_current)
              ).then((res: any) => {
                dispatch(get_catalogo_trd(params.row.id_trd));
              }); */
              }}
            >
              <Avatar
                sx={{
                  width: 24,
                  height: 24,
                  background: '#fff',
                  border: '2px solid',
                }}
                variant="rounded"
              >
                <EditIcon
                  titleAccess="Ver TRD"
                  sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                />
              </Avatar>
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  /*
  "entidad_entera_consultar": false,
  "entidad_entera_descargar": false,
  "seccion_actual_respon_serie_doc_consultar": false,
  "seccion_actual_respon_serie_doc_descargar": false,
  "seccion_raiz_organi_actual_consultar": false,
  "seccion_raiz_organi_actual_descargar": false,
  "secciones_actuales_mismo_o_sup_nivel_respon_consulta": false,
  "secciones_actuales_mismo_o_sup_nivel_respon_descargar": false,
  "secciones_actuales_inf_nivel_respon_consultar": false,
  "secciones_actuales_inf_nivel_respon_descargar": false,
  "unds_org_sec_respon_mismo_o_sup_nivel_resp_exp_consultar": false,
  "unds_org_sec_respon_mismo_o_sup_nivel_resp_exp_descargar": false,
  "unds_org_sec_respon_inf_nivel_resp_exp_consultar": false,
  "unds_org_sec_respon_inf_nivel_resp_exp_descargar": false,
  */

  if (controlAccesoExpedientesList?.length === 0) return <></>;

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
        columns={columns ?? []}
        rows={controlAccesoExpedientesList ?? []}
        title="Listado bloque de autorización en el CCD"
      />
    </>
  );
};
