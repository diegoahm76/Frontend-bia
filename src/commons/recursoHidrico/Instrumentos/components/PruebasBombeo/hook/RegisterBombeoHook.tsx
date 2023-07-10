/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */

import { useState } from 'react';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
// import localizedFormat from 'dayjs/plugin/localizedFormat';

export const register_bombeo_hook = () => {
  // Datos generales

  const [fecha_prubea_bombeo, set_fecha_prubea_bombeo] = useState<Dayjs | null>(
    null
  );
  const [fechaPruebaBombeo, setFechaPruebaBombeo] = useState<Dayjs | null>(
    null
  );

  const handle_date_change = (fieldName: string, value: Dayjs | null): void => {
    switch (fieldName) {
      case 'fecha_prueba':
        set_fecha_prubea_bombeo(value);
        break;
      case 'fecha_prueba_bombeo':
        setFechaPruebaBombeo(value);
        break;
    }
  };

  // prueba de bombeo

  const [row_prueba, set_row_prueba] = useState<any[]>([]);

  const [pruebaBombeo, setPruebaBombeo] = useState('');
  const [caudal, setCaudal] = useState('');
  const [tiempoTranscurrido, setTiempoTranscurrido] = useState(0);
  const [nivelAgua, setNivelAgua] = useState('');
  const [abatimientoRecuperacion, setAbatimientoRecuperacion] = useState('');
  const [caudalAgua, setCaudalAgua] = useState('');

  const handlePruebaBombeoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPruebaBombeo(event.target.value);
  };

  const handleCaudalChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setCaudal(event.target.value);
  };

  const handle_agregar = () => {
    const horaInicioSesion = new Date(); // Reemplaza esto con la hora de inicio real de la sesión

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    const horaMedicion = fechaPruebaBombeo
      ? new Date(horaInicioSesion.getTime() + tiempoTranscurrido * 60000)
      : null;

    const formattedHoraMedicion =
      horaMedicion != null
        ? dayjs(horaMedicion).format('LT') // Aplica el formato de 12 horas
        : '';

    const newData = {
      tiempo: tiempoTranscurrido,
      hora: formattedHoraMedicion,
      nivel: nivelAgua,
      abatimiento_recuperacion: abatimientoRecuperacion,
      caudal: caudalAgua,
    };

    set_row_prueba([...row_prueba, newData]);

    // Reinicia los campos de entrada
    setFechaPruebaBombeo(null);
    setTiempoTranscurrido(0);
    setNivelAgua('');
    setAbatimientoRecuperacion('');
    setCaudalAgua('');
  };
  return {
    pruebaBombeo,
    caudal,
    fecha_prubea_bombeo,
    fechaPruebaBombeo,
    row_prueba,
    tiempoTranscurrido,
    nivelAgua,
    abatimientoRecuperacion,
    caudalAgua,
    setTiempoTranscurrido,
    setNivelAgua,
    setAbatimientoRecuperacion,
    setCaudalAgua,
    handle_agregar,
    handlePruebaBombeoChange,
    handleCaudalChange,
    handle_date_change,
  };
};
