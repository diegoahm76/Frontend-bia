/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Button, Grid, TextField, } from '@mui/material';
import { Title } from '../../../../components';
import React, { useEffect, useState } from 'react';
import { miEstilo } from '../interfaces/types';
import SearchIcon from '@mui/icons-material/Search';
import { ActualizarExpediente } from './ActualizarExpediente';
import { useForm } from 'react-hook-form';
import { IObjCierreExpediente, IObjExpedientes, } from '../../Expedientes/cierreExpediente/interfaces/cierreExpedientes';
import BuscarExpediente from '../../Expedientes/cierreExpediente/components/buscarExpediente';
import { LoadingButton } from '@mui/lab';
import FormInputController from '../../../../components/partials/form/FormInputController';




export const ReubicacionExpediente: React.FC = () => {

  // const { control: control_cierre_expediente, getValues: get_values, reset: reset_cierre_expediente, handleSubmit: handle_cierre_expediente } = useForm<IObjExpedientes>();
  // const [open_modal, set_open_modal] = useState(false);
  // const [selected_expediente, set_selected_expediente] = useState<IObjExpedientes>();

  // const handle_close_buscar = () => {
  //   set_open_modal(false);
  // };
  
  // const handle_selected_expediente = (expediente: IObjExpedientes) => {
  //   set_selected_expediente(expediente);
  // };
  // const handle_buscar = () => {
  //   set_open_modal(true);
  // };

  // useEffect(() => {
  //   console.log(selected_expediente)
  //   reset_cierre_expediente(selected_expediente);
  // }, [selected_expediente]);




  return (
    <>
 

      <ActualizarExpediente  />







    </>
  );
};
