/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import { RenderDataGrid } from '../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { useAppSelector } from '../../../../../../../../hooks';
import { Title } from '../../../../../../../../components';
import { Avatar, Box, Grid, IconButton, Tooltip } from '@mui/material';
import { containerStyles } from '../../../../../../tca/screens/utils/constants/constants';
import { columnsCoincidencias as columnsPersistenciasConfirmadas } from '../../../../homologacionDeSeccionesPersistentes/components/parte2/components/coincidenciasHalladasCCD/columnsCoincidencias/columnsCoincidencia';

export const SeccionesQuePersistiranNuevoCcd = (): JSX.Element => {
  //* redux states neccesaries
  const { seccionesPersistentesCcdNuevo } = useAppSelector(
    (state) => state.AsigUniRespSlice
  );

  const columns = [
    ...columnsPersistenciasConfirmadas,
  ];

  //* se debe poner luego la condicional para que funcione de manera de adecuada (deben ir las condicionales necesarias para manejar lo componentes)
  /* if (
    ccdOrganigramaCurrentBusqueda &&
    Object.keys(ccdOrganigramaCurrentBusqueda).length === 0
  )
    return <></>; */

  return (
    <>
      <Grid container sx={containerStyles}>
        <Title title="Secciones que persistirán en CCD nuevo" />
        <RenderDataGrid
          title="Éstas secciones continuarán con los consecutivos y permisos de su predecesor ( CCD ACTUAL / CCD NUEVO )"
          columns={columns || []}
          rows={seccionesPersistentesCcdNuevo || []}
        />
      </Grid>
    </>
  );
};
