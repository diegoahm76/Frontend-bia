/* eslint-disable @typescript-eslint/naming-convention */

import { useContext } from 'react';
import { useAppSelector } from '../../../../../../../../../hooks';
import { ModalAndLoadingContext } from '../../../../../../../../../context/GeneralContext';
import { ComplementosPqrsdf } from './ComplementosPqrsd/ComplementosPqrsdf';
import { Grid } from '@mui/material';
import { Loader } from '../../../../../../../../../utils/Loader/Loader';
import { containerStyles } from './../../../../../../../tca/screens/utils/constants/constants';
import { RequerimientosTramites } from './requerimientosTramites/RequerimientosTramites';

export const SubElementoPrincipales: React.FC = (): JSX.Element => {
  //* states from redux store
  const { listaComplementosRequerimientosOtros } = useAppSelector(
    (state) => state.PanelVentanillaSlice
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
  const complementosPqrsdfKeys = [
    'Complemento de PQRSDF',
    'Complemento de PQRSD – Respuesta a requerimiento',
    'Complementos PQRSDF – Respuestas a solicitudes',
  ];

  const tipoSolicitudComponentMap = complementosPqrsdfKeys.reduce(
    (map, key) => {
      map[key] = <ComplementosPqrsdf />;
      return map;
    },
    {
      TRAMITE: <RequerimientosTramites />,
    } as any
  );
  //* la propiedad va a ser tipo por ahora pero se debe asignar a traves de una nueva propiedad que se va a llamar clasificacions
  const clasificacion = listaComplementosRequerimientosOtros[0]?.tipo;
  const Componente: any = tipoSolicitudComponentMap[clasificacion];

  return <>{Componente || <></>}</>;
};
