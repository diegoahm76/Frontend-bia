/* eslint-disable @typescript-eslint/naming-convention */

import { useContext } from 'react';
import { useAppSelector } from '../../../../../../../../../hooks';
import { ModalAndLoadingContext } from '../../../../../../../../../context/GeneralContext';
import { ComplementosPqrsdf } from './ComplementosPqrsd/ComplementosPqrsdf';
import { Grid } from '@mui/material';
import { Loader } from '../../../../../../../../../utils/Loader/Loader';
import { containerStyles } from './../../../../../../../tca/screens/utils/constants/constants';
import { RequerimientosTramites } from './requerimientosTramites/RequerimientosTramites';
import { RequerimientosOpas } from './requerimientosOPas/RequerimientosOpas';

export const SubElementoPrincipales: React.FC = (): JSX.Element => {
  //* states from redux store
  const { listaComplementosRequerimientosOtros } = useAppSelector(
    (state) => state.VitalSlice
  );
  //* context declaration
  const { thirdLoading } = useContext(ModalAndLoadingContext);

  // ? se debe definir el loading
  if (thirdLoading)
    return (
      <Grid
        container
        sx={{
          ...containerStyles,
          position: 'static',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Loader altura={270} />
      </Grid>
    );

  // if (!listaComplementosRequerimientosOtros?.length) return <></>;

  // ? se debe modificar en la en consecuencia de la nueva propiedad "clasificacion" que se va a establecer en el servicio por parte de backend
  const complementosPqrsdfKeys: any = [
    'Complemento de PQRSDF',
    'Complemento de PQRSD – Respuesta a requerimiento',
    'Complementos PQRSDF – Respuestas a solicitudes',
  ] as any;

  const complementosTramitesKeys: any = [
    'Complemento de trámite',
    'Complemento de Trámite - Respuesta a Requerimiento',
    'Complementos trámite – Respuestas a solicitudes',
    412,
  ] as any;

  const complementosOpasKeys: any = [
    'Respuesta Requerimiento',
    'Respuesta Solicitud',
    'Respuesta Trámite',
  ] as any;

  const tipoSolicitudComponentMap = {
    ...complementosPqrsdfKeys.reduce((map: any, key: number) => {
      map[key] = <ComplementosPqrsdf />;
      return map;
    }, {}) as any,
    ...complementosTramitesKeys.reduce((map: any, key: number) => {
      map[key] = <RequerimientosTramites />;
      return map;
    }, {}) as any,
    ...complementosOpasKeys.reduce((map: any, key: number) => {
      map[key] = <RequerimientosOpas/>;
      return map;
    }, {}) as any,
  };
  //* la propiedad va a ser tipo por ahora pero se debe asignar a traves de una nueva propiedad que se va a llamar clasificacions
  const clasificacion = listaComplementosRequerimientosOtros[0]?.tipo || listaComplementosRequerimientosOtros[0]?.id_anexo;
  const Componente: any = tipoSolicitudComponentMap[clasificacion];

  return <>{Componente || <></>}</>;
};
