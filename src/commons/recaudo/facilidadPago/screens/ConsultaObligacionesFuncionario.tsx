import { useEffect } from 'react';
// import { Title } from '../../../../components/Title';
import { TablaDeudores } from '../componentes/TablaDeudores';
import { get_deudores } from '../slices/DeudoresSlice';
import { type ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ConsultaObligacionesFuncionario: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    try {
      void dispatch(get_deudores());
    } catch (error: any) {
      throw new Error(error);
    }
  }, [])

  return (
    <>
      {/* <Title title='Listado de Deudores - Usuario Interno Cormacarena'/> */}
      <TablaDeudores />
    </>
  )
}
