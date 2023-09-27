/* eslint-disable @typescript-eslint/naming-convention */
import React, { FC } from 'react';
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  Tooltip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
// import { Loader } from '../../../../../../../utils/Loader/Loader';

import InfoIcon from '@mui/icons-material/Info';
import { RenderDataGrid } from '../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { useAppSelector } from '../../../../../../hooks';
import { columnsBloqueAutorizacionCCD } from './columns/columnsBloqueAutorizacionCCD';
import { EditIcon } from '@mui/icons-material/Edit';

//! componente unidades organizacionales actuales de la sección responsable
export const BloqueAutorizacionCCD: FC<any> = (): JSX.Element => {
  const { controlAccesoExpedientesList } = useAppSelector(
    (state) => state.ctrlAccesoExpSlice
  );

  const columns = [
    ...columnsBloqueAutorizacionCCD,
    {
      headerName: 'Acciones',
      field: 'accion',
      renderCell: (params: any) => (
        <>
          <IconButton
            onClick={() => {
              console.log(params?.row)
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
                border: '2px solid'
              }}
              variant="rounded"
            >
              <EditIcon
                titleAccess="Ver TRD"
                sx={{ color: 'primary.main', width: '18px', height: '18px' }}
              />
            </Avatar>
          </IconButton>
        </>
      )
    }
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
        columns={[]}
        rows={controlAccesoExpedientesList ?? []}
        title="Listado bloque de autorización en el CCD"
      />
    </>
  );
};
