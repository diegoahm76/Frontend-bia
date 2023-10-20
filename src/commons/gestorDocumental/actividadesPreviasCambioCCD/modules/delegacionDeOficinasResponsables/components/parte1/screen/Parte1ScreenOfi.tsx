/* eslint-disable @typescript-eslint/naming-convention */
import { Grid } from '@mui/material';
import React, { useState } from 'react';
import { containerStyles } from '../../../../../../tca/screens/utils/constants/constants';
import { Title } from '../../../../../../../../components';
import { ModalBusquedaCcdOrganigrama } from '../components/modalBusqueda/ModalBusqueda';
import { SeleccionCcdVista } from '../components/seleccionCcdOrganigrama/seleccionCcdVista/SeleccionCcdVista';
import { SeleccionOrgVista } from '../components/seleccionCcdOrganigrama/seleccionOrgVista/SeleccionOrgVista';

export const Parte1ScreenOfi = () => {
  // ! use States busqueda de ccds oficinas responsables
  const [ccdList, setccdList] = useState<any[]>([]);
  return (
    <>
      <Grid container sx={containerStyles}>
        <Title title="Delegación de oficinas responsables de expedientes del CCD" />

        {/* se agrega la vista donde se muestra el nombre y versión del ccd que se ha seleccionado */}
        <Grid
          container
          spacing={3}
          sx={{
            justifyContent: 'center',
          }}
        >
          <SeleccionCcdVista setccdList={setccdList} />
        </Grid>
        {/* se agrega la vista donde se muestta el nombre y versión del organigrama que se busca consecuencia del Ccd seleccionado, su visualización va a ser condicionada a la búsqueda tras la selección del CCD */}
        <Grid
          container
          spacing={3}
          sx={{
            justifyContent: 'center',
          }}
        >
          <SeleccionOrgVista />
        </Grid>
        {/* Se agrega el modal de búsqueda de los ccd para la homologación de las series documentales */}
        <ModalBusquedaCcdOrganigrama
          setccdList={setccdList}
          ccdList={ccdList}
        />
      </Grid>
    </>
  );
};
