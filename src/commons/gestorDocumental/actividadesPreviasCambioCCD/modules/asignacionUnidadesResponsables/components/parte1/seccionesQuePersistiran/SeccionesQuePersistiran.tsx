/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import { RenderDataGrid } from '../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { useAppSelector } from '../../../../../../../../hooks';
import { Title } from '../../../../../../../../components';
import { Avatar, Box, Grid, IconButton, Tooltip } from '@mui/material';
import { containerStyles } from '../../../../../../tca/screens/utils/constants/constants';
import { columnsCoincidencias as columnsPersistenciasConfirmadas } from '../../../../homologacionDeSeccionesPersistentes/components/parte2/components/coincidenciasHalladasCCD/columnsCoincidencias/columnsCoincidencia';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { AvatarStyles } from '../../../../../../ccd/componentes/crearSeriesCcdDialog/utils/constant';

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
/*
  const hola = [
    {
      id_unidad_seccion_temporal: 32,
      id_unidad_actual: 5381,
      cod_unidad_actual: '1000',
      nom_unidad_actual: 'Dirección general',
      id_organigrama_unidad_actual: 158,
      id_unidad_nueva: 5385,
      cod_unidad_nueva: '1000',
      nom_unidad_nueva: 'Dirección general',
      id_organigrama_unidad_nueva: 159,
      tiene_agrupaciones: true,
    },
    {
      id_unidad_seccion_temporal: 33,
      id_unidad_actual: 5383,
      cod_unidad_actual: '101',
      nom_unidad_actual: 'Asesoria juridcia',
      id_organigrama_unidad_actual: 158,
      id_unidad_nueva: 5387,
      cod_unidad_nueva: '101',
      nom_unidad_nueva: 'Asesoria juridcia',
      id_organigrama_unidad_nueva: 159,
      tiene_agrupaciones: true,
    },
  ]; */

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
