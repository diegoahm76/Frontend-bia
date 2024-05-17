/* eslint-disable @typescript-eslint/naming-convention */
import { useContext } from 'react';
import { ModalAndLoadingContext } from '../../../../../../../../../context/GeneralContext';
import { useAppSelector } from '../../../../../../../../../hooks';
import { ListaElementosPqrsdf } from './elementosPqrsdf/ElementosPqrsdf';
import { containerStyles } from './../../../../../../../tca/screens/utils/constants/constants';
import { Grid } from '@mui/material';
import { Loader } from '../../../../../../../../../utils/Loader/Loader';
import { ElementosOtros } from './elementosOtros/ElementosOtros';
import { ElementosTramitesYServicios } from './elementosTramYServicios/ElementosTramitesYServicios';
import { ElementoOPAS } from './elementosOPAS/ElementoOPAS';
import { ElementosDocumentos } from './elementosDocumentos/ElementosDocumentos';

export const ElementosPrincipales: React.FC = (): JSX.Element => {
  //* states from redux store
  const { listaTareasPqrsdfTramitesUotrosUopas } = useAppSelector(
    (state) => state.BandejaTareasSlice
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

  if (!listaTareasPqrsdfTramitesUotrosUopas?.length) return <></>;

  const tipoTarea: any = {
    'RESPONDER PQRSDF': <ListaElementosPqrsdf />,
    'Responder PQRSDF': <ListaElementosPqrsdf />,
    'Responder Trámite': <ElementosTramitesYServicios/>,
    'RESPONDER TRÁMITE': <ElementosTramitesYServicios/>,
    'RESPONDER TRAMITE': <ElementosTramitesYServicios/>,
    'RESPONDER OTRO': <ElementosOtros />,
    'Responder Otro': <ElementosOtros />,
    'RESPONDER OPA': <ElementoOPAS/>,
    'Responder OPA': <ElementoOPAS/>,
    'Documentos': <ElementosDocumentos/>,
    'documentos': <ElementosDocumentos/>
  } as const;

  const tipoDeTarea = listaTareasPqrsdfTramitesUotrosUopas[0]?.tipo_tarea;
  const Componente: any = tipoTarea[tipoDeTarea];

  return <>{Componente || <></>}</>;
};
