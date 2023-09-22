/* eslint-disable @typescript-eslint/naming-convention */
import React, { FC } from 'react';
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  Tooltip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
// import { Loader } from '../../../../../../../utils/Loader/Loader';

import InfoIcon from '@mui/icons-material/Info';
import { RenderDataGrid } from '../../../../tca/Atom/RenderDataGrid/RenderDataGrid';

//! componente unidades organizacionales actuales de la sección responsable
export const BloqueAutorizacionCCD: FC<any> = (): JSX.Element => {

/* const columns = [
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
        title="Listado bloque de autorización en el CCD"
      />
    </>
  );
};
