/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
import { type FC, useEffect, useState } from 'react';
import { type ProcesoTypes } from '../types/procesoTraslado.types';
import { useAppSelector } from '../../../../../../../../../hooks';
import { type AuthSlice } from '../../../../../../../../auth/interfaces';
import dayjs from 'dayjs';
import { Traslado } from '../components/Traslado/Traslado';
import { InfoProcesoTraslado } from '../components/InfoProcesoTraslado/InfoProcesoTraslado';

export const ProcesoTrasladoScreen: FC<ProcesoTypes> = ({
  setmModalHistoricoTraslados,
  setModalTotalPersonas
}: ProcesoTypes): JSX.Element => {
  const { userinfo } = useAppSelector((state: AuthSlice) => state.auth);
  //  console.log('')(userinfo);

  // ? use state to set the currentDate
  const [_currentDate, setCurrentDate] = useState(dayjs().format('DD-MM-YYYY'));

  // ? useEffect to update the current date each day

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(dayjs().format('DD-MM-YYYY'));
    }, dayjs().endOf('day').diff(dayjs(), 'millisecond'));

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <Traslado />
      <InfoProcesoTraslado
        setModalTotalPersonas={setModalTotalPersonas}
        setmModalHistoricoTraslados={setmModalHistoricoTraslados}
      />
    </>
  );
};
