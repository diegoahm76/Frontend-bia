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

  const { control: control_cierre_expediente, getValues: get_values, reset: reset_cierre_expediente, handleSubmit: handle_cierre_expediente } = useForm<IObjExpedientes>();
  const [open_modal, set_open_modal] = useState(false);
  const [selected_expediente, set_selected_expediente] = useState<IObjExpedientes>();

  const handle_close_buscar = () => {
    set_open_modal(false);
  };
  
  const handle_selected_expediente = (expediente: IObjExpedientes) => {
    set_selected_expediente(expediente);
  };
  const handle_buscar = () => {
    set_open_modal(true);
  };

  useEffect(() => {
    //  console.log('')(selected_expediente)
    reset_cierre_expediente(selected_expediente);
  }, [selected_expediente]);




  return (
    <>
      <Grid container
        item xs={12} spacing={2} marginLeft={2} marginRight={2} marginTop={3}
        sx={miEstilo}
      >
        <Title title="Reubicación de expedientes " />
      </Grid>
      <Grid container
        item xs={12} spacing={2} marginLeft={2} marginRight={2} marginTop={3}
        sx={miEstilo}
      >
        <Title title="Selección de expediente" />
        <Grid item xs={12} sm={6}>
          <FormInputController
            xs={0}
            md={0}
            margin={0}
            control_form={control_cierre_expediente}
            control_name="titulo_expediente"
            default_value=''
            rules={{}}
            type="text"
            disabled={false}
            helper_text=""
            hidden_text={null}
            label={"Expediente"}
          />


        </Grid>

        <Grid item xs={12} sm={6}>
        <FormInputController
            xs={0}
            md={0}
            margin={0}
            control_form={control_cierre_expediente}
            control_name="nombre_unidad_org"
            default_value=''
            rules={{}}
            type="text"
            disabled={false}
            helper_text=""
            hidden_text={null}
            label={"Unidad organizacional"}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormInputController
            xs={0}
            md={0}
            margin={0}
            control_form={control_cierre_expediente}
            control_name="codigo_exp_und_serie_subserie"
            default_value=''
            rules={{}}
            type="text"
            disabled={false}
            helper_text=""
            hidden_text={null}
            label={"Código Und. Serie. Subserie"}
          />

        </Grid>
        <Grid item xs={12} sm={4}>
        <FormInputController
            xs={0}
            md={0}
            margin={0}
            control_form={control_cierre_expediente}
            control_name="nombre_serie_origen"
            default_value=''
            rules={{}}
            type="text"
            disabled={false}
            helper_text=""
            hidden_text={null}
            label={"Serie"}
          />

        </Grid>
        <Grid item xs={12} sm={4}>
        <FormInputController
            xs={0}
            md={0}
            margin={0}
            control_form={control_cierre_expediente}
            control_name="nombre_subserie_origen"
            default_value=''
            rules={{}}
            type="text"
            disabled={false}
            helper_text=""
            hidden_text={null}
            label={"Subserie "}
          />
        </Grid>

       
        <Grid item xs={12} sm={12}>
          
          <TextField
            variant="outlined"
            size="small"
            
            label="Descripción de expediente"
            fullWidth
            multiline
            rows={3}
            name="descripcion_clase_alerta"
          />
        </Grid>

        <Grid item xs={12} sm={2}>
          <Button onClick={handle_buscar} variant="contained" color='primary' fullWidth startIcon={<SearchIcon />} >
            Buscar
          </Button>
        </Grid>
      </Grid>



      <ActualizarExpediente  />






      {open_modal && (
        <BuscarExpediente
        open={open_modal}
        get_values={get_values}
        handle_close_buscar={handle_close_buscar}
        control_cierre_expediente={control_cierre_expediente}
          handle_selected_expediente={handle_selected_expediente}

        />
      )}

    </>
  );
};
