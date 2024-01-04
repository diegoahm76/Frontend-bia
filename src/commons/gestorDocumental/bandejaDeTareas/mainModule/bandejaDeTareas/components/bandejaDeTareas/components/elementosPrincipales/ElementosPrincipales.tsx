/* eslint-disable @typescript-eslint/naming-convention */
import { useContext } from 'react';
import { ModalAndLoadingContext } from '../../../../../../../../../context/GeneralContext';
import { useAppSelector } from '../../../../../../../../../hooks';
import { ListaElementosPqrsdf } from './elementosPqrsdf/ElementosPqrsdf';
import { containerStyles } from './../../../../../../../tca/screens/utils/constants/constants';
import { Grid } from '@mui/material';
import { Loader } from '../../../../../../../../../utils/Loader/Loader';
import { ModalRejectTask } from '../../utils/tareaPqrsdf/ModalRejectTask';
import { ModalSeeRejectedTask } from '../../utils/tareaPqrsdf/ModalSeeRejectedTask';

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
    'Responder PQRSDF': <ListaElementosPqrsdf />,
    'Responder Trámite': <>hola trámites y servicios siuuuuuuuuuuuuuu</>,
    // Otros: <ElementosOtros />,
    // Opas: <ElementosOPAS/>,
  } as const;

  const tipoDeTarea = listaTareasPqrsdfTramitesUotrosUopas[0]?.tipo_tarea;
  const Componente: any = tipoTarea[tipoDeTarea];

  return (
    <>
    {/*<ModalRejectTask/>*/}
    <ModalSeeRejectedTask/>
      {/*  se va a manejar el grillado con guia en el primer elemento del array con base al tipo de tarea, tal vez de la misma manera se podra manejar la lógica y actualización de los botones sin necesidad de esperar a darle click a alguno de los elementos de la lista   */}
      {Componente || <></>}
    </>
  );
};
