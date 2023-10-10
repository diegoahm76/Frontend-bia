/* eslint-disable @typescript-eslint/naming-convention */
import { Grid } from '@mui/material';
import React, { useState } from 'react';
import { Title } from '../../../../../../../../components';
import { containerStyles } from '../../../../../../tca/screens/utils/constants/constants';
import { ModalBusquedaCcdOrganigrama } from '../ModalOrganigramaCcd/ModalBusquedaOrgCcd';
import { VistaOrgSeccionesResp } from '../SeleccionCcdOrg/vistaOrganigrama/VistaOrgSeccionesResp';
import { VistaCcdSeccionesResp } from '../SeleccionCcdOrg/vistaCCD/VistaCCDSeccionesResp';
import { SeccionesQuePersistiranNuevoCcd } from '../seccionesQuePersistiran/SeccionesQuePersistiran';

export const Parte1Screen = (): JSX.Element => {
  // ! use States busqueda de ccds homologaciones
  const [ccdList, setccdList] = useState<any[]>([]);
  return (
    <Grid container sx={containerStyles}>
      <Title title="Asignación de secciones responsables del CCD" />

      {/* se agrega la vista donde se muestra el nombre y versión del ccd que se ha seleccionado */}
      <Grid
        container
        spacing={3}
        sx={{
          justifyContent: 'center',
        }}
      >
        <VistaCcdSeccionesResp setccdList={setccdList} />
      </Grid>
      {/* se agrega la vista donde se muestta el nombre y versión del organigrama que se busca consecuencia del Ccd seleccionado, su visualización va a ser condicionada a la búsqueda tras la selección del CCD */}
      <Grid
        container
        spacing={3}
        sx={{
          justifyContent: 'center',
        }}
      >
        <VistaOrgSeccionesResp />
      </Grid>

      {/* se agrega la tabla de las secciones que persistirán, secciones que vienen del módulo deh homologación de secciones persistentes */}
      <SeccionesQuePersistiranNuevoCcd />

      {/* Se agrega el modal de búsqueda de los ccd para la homologación de las series documentales */}
      <ModalBusquedaCcdOrganigrama setccdList={setccdList} ccdList={ccdList} />
    </Grid>
  );
};
