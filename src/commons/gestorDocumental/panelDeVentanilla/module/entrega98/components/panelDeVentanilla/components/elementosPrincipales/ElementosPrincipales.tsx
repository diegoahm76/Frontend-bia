/* eslint-disable @typescript-eslint/naming-convention */
import { useContext } from 'react';
import { ModalAndLoadingContext } from '../../../../../../../../../context/GeneralContext';
import { useAppSelector } from '../../../../../../../../../hooks';
import { ListaElementosPqrsdf } from './elementosPqrsdf/ElementosPqrsdf';

export const ElementosPrincipales = (): JSX.Element => {
  //* states from redux store

  const { listaElementosPqrsfTramitesUotros } = useAppSelector(
    (state) => state.PanelVentanillaSlice
  );

  //* context declaration
  const { secondLoading, handleSecondLoading } = useContext(
    ModalAndLoadingContext
  );

  {
    /* aquí se deberá manejar el loader y la no muestra de elementos cuando el array no tiene datos  */
  }

  /*  if (secondLoading)
  return (
    <Grid
      container
      sx={{
        ...containerStyles,
        position: 'static',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <Loader altura={270} />
    </Grid>
  );*/

  if (!listaElementosPqrsfTramitesUotros.length) return <></>;

  return (
    <>
      {/*  se va a manjear el grillado con guia en el primer elemento del array con base al tipo de solicitud, tal vez de la misma manera se podra manejar la lógica y actualización de los botones sin necesidad de esperar a darle click a alguno de los elementos de la lista   */}
      {listaElementosPqrsfTramitesUotros[0]?.tipo_solicitud === 'PQRSDF' ? (
        <ListaElementosPqrsdf />
      ) : listaElementosPqrsfTramitesUotros[0]?.tipo_solicitud ===
        'Tramites y Servicios' ? (
        <>hola trámites y servicios</>
      ) : listaElementosPqrsfTramitesUotros[0]?.tipo_solicitud === 'Otros' ? (
        <>hola otros</>
      ) : (
        <></>
      )}
    </>
  );
};
