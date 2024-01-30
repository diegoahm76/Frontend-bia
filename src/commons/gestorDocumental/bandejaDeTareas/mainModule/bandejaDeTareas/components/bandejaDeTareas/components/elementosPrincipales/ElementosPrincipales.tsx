/* eslint-disable @typescript-eslint/naming-convention */
import { useContext } from 'react';
import { ModalAndLoadingContext } from '../../../../../../../../../context/GeneralContext';
import { useAppSelector } from '../../../../../../../../../hooks';
import { ListaElementosPqrsdf } from './elementosPqrsdf/ElementosPqrsdf';
import { containerStyles } from './../../../../../../../tca/screens/utils/constants/constants';
import { Grid } from '@mui/material';
import { Loader } from '../../../../../../../../../utils/Loader/Loader';

export const ElementosPrincipales: React.FC = (): JSX.Element => {
  //* states from redux store
  const { listaTareasPqrsdfTramitesUotrosUopas } = useAppSelector(
    (state) => state.BandejaTareasSlice
  );

  //* context declaration
  const { secondLoading } = useContext(
    ModalAndLoadingContext
  );

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
    'Responder Trámite': <>hola trámites y servicios siuuuuuuuuuuuuuu</>,
    // Otros: <ElementosOtros />,
    // Opas: <ElementosOPAS/>,
  } as const;

  const tipoDeTarea = listaTareasPqrsdfTramitesUotrosUopas[0]?.tipo_tarea;
  const Componente: any = tipoTarea[tipoDeTarea];

  return (
    <>
      {Componente || <></>}
    </>
  );
};
