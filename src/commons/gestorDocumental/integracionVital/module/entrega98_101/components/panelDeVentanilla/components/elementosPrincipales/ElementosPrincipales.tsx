/* eslint-disable @typescript-eslint/naming-convention */
import { useContext } from 'react';
import { ModalAndLoadingContext } from '../../../../../../../../../context/GeneralContext';
import { useAppSelector } from '../../../../../../../../../hooks';
import { ListaElementosPqrsdf } from './elementosPqrsdf/ElementosPqrsdf';
import { containerStyles } from './../../../../../../../tca/screens/utils/constants/constants';
import { Grid } from '@mui/material';
import { Loader } from '../../../../../../../../../utils/Loader/Loader';
import { ElementosOtros } from './elementosOtros/ElementosOtros';
import { ElementoOPAS } from './elementosOPAS/ElementoOPAS';
import { ListaElementosTramites } from './elementosTramYServicios/ElementoTramYServcios';

export const ElementosPrincipales: React.FC = (): JSX.Element => {
  //* states from redux store
  const { listaElementosPqrsfTramitesUotros } = useAppSelector(
    (state) => state.VitalSlice
  );

  //* context declaration
  const { secondLoading } = useContext(ModalAndLoadingContext);

  if (secondLoading)
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

  if (!listaElementosPqrsfTramitesUotros?.length) return <></>;

  const tipoSolicitudComponentMap: any = {
    PQRSDF: <ListaElementosPqrsdf />,
    TRAMITE: <ListaElementosTramites />,
    OTROS: <ElementosOtros />,
    OPA: <ElementoOPAS />,
  } as any;

  const tipoSolicitud = listaElementosPqrsfTramitesUotros[0]?.tipo_solicitud;
  const Componente: any = tipoSolicitudComponentMap[tipoSolicitud];

  return (
    <>
      {/*  se va a manejar el grillado con guia en el primer elemento del array con base al tipo de solicitud, tal vez de la misma manera se podra manejar la lógica y actualización de los botones sin necesidad de esperar a darle click a alguno de los elementos de la lista   */}
      {Componente || <></>}
    </>
  );
};
