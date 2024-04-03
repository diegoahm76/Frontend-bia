/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useState, useEffect } from 'react';
import { Button, Grid, IconButton } from '@mui/material';
import { Title } from '../../../../components/Title';
import FormSelectController from '../../../../components/partials/form/FormSelectController';
import DeleteIcon from '@mui/icons-material/Delete';
import type { IFechaProgramada, IObjConfiguracionAlerta } from '../interfaces/alerta';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { eliminar_fecha_alerta, get_fecha, programar_fecha, } from '../store/thunks/alertas';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const meses_en_espanol = [
  { label: 'Enero', value: '1' },
  { label: 'Febrero', value: '2' },
  { label: 'Marzo', value: '3' },
  { label: 'Abril', value: '4' },
  { label: 'Mayo', value: '5' },
  { label: 'Junio', value: '6' },
  { label: 'Julio', value: '7' },
  { label: 'Agosto', value: '8' },
  { label: 'Septiembre', value: '9' },
  { label: 'Octubre', value: '10' },
  { label: 'Noviembre', value: '11' },
  { label: 'Diciembre', value: '12' },
];

// eslint-disable-next-line @typescript-eslint/naming-convention
const ProgramacionFechas = () => {
  const { control: control_fecha_programacion, handleSubmit: handle_submit } = useForm<IObjConfiguracionAlerta>();
  const { current_configuracion, fecha_alerta } = useAppSelector((state: { alerta: any; }) => state.alerta);

  const [selected_month, set_selected_month] = useState<string>('1');
  const [days_options, set_days_options] = useState<Array<{ label: string; value: string }>>([]);

  const colums_alerta_programada: GridColDef[] = [
    {
      field: 'mes_cumplimiento',
      headerName: 'MES',
      width: 100,
      renderCell: (params) => meses_en_espanol[params.value - 1]?.label || params.value,
    },
    {
      field: 'dia_cumplimiento',
      headerName: 'DIA',
      width: 100,
    },
    {
      field: 'Action',
      headerName: 'ACCIONES',
      width: 100,
      renderCell: (params) => {
        return (
          <>
            <IconButton
              aria-label="delete"
              size="small"
              onClick={() => {
                dispatch(eliminar_fecha_alerta(params.row.id_fecha, current_configuracion.cod_clase_alerta ?? ''))
                //  console.log('')(params.row)
              }}
            >
              <DeleteIcon
                titleAccess="Eliminar fecha"
                sx={{
                  color: 'red',
                  width: '18px',
                  height: '18px',
                }}
              />
            </IconButton>
          </>
        );
      },
    },

  ];

  const generate_days_options = (month: string) => {
    const current_year = new Date().getFullYear();
    const days_in_month = new Date(current_year, Number(month) - 1, 0).getDate(); // Resta 1 al mes para obtener el mes correcto
    const days_options = Array.from({ length: days_in_month }, (_, index) => ({
      label: (index + 1).toString(),
      value: (index + 1).toString(),
    }));
    return days_options;
  };

  useEffect(() => {
    if (selected_month) {
      const new_days_options = generate_days_options(selected_month);
      set_days_options(new_days_options);
    }
  }, [selected_month]);

  useEffect(() => {
    if (current_configuracion.cod_clase_alerta !== null && current_configuracion.cod_clase_alerta !== undefined) {
      void dispatch(get_fecha(current_configuracion.cod_clase_alerta))
    }

  }, [current_configuracion.cod_clase_alerta])

  const dispatch = useAppDispatch();

  //  console.log('')(fecha_alerta)
  const on_submit_programar = (data: IObjConfiguracionAlerta): void => {
    //  console.log('')(data);
    const data_programar = {
      ...data,
      cod_clase_alerta: current_configuracion.cod_clase_alerta
    };

    dispatch(programar_fecha(data_programar));
    void dispatch(get_fecha(current_configuracion.cod_clase_alerta))

  };


  return (
    <Grid
      container
      spacing={2}
      m={2}
      p={2}
      sx={{
        position: 'relative',
        background: '#FAFAFA',
        borderRadius: '15px',
        p: '20px',
        m: '10px 0 20px 0',
        mb: '20px',
        boxShadow: '0px 3px 6px #042F4A26',
      }}
    >
      <Grid item xs={12}>
        <Title title="Programación de Fecha fija" />
      </Grid>

      <FormSelectController
        xs={12}
        md={2}
        control_form={control_fecha_programacion}
        control_name={'mes_cumplimiento'}
        default_value={selected_month}
        rules={{}}
        disabled={false}
        helper_text=''
        select_options={meses_en_espanol}
        option_label='label'
        option_key='value'
        multiple={false}
        hidden_text={false}
        auto_focus={false}
        label={'Seleccione un Mes'}
      />

      <FormSelectController
        xs={12}
        md={2}
        control_form={control_fecha_programacion}
        control_name={'dia_cumplimiento'}
        default_value=''
        rules={{}}
        disabled={false}
        helper_text=''
        select_options={days_options}
        option_label='label'
        option_key='value'
        multiple={false}
        hidden_text={false}
        auto_focus={false}
        label={'Seleccione un día'}
      />
      <Grid item xs={12} >
        <DataGrid
          autoHeight
          rows={fecha_alerta}
          columns={colums_alerta_programada}
          getRowId={(row) => uuidv4()}
          pageSize={10}
          rowsPerPageOptions={[10]} />|
      </Grid>

      <Grid container justifyContent="flex-end">
        <Grid item>
          <Button variant="contained"
            color="success"
            onClick={handle_submit(on_submit_programar)}>
            Guardar
          </Button>
        </Grid>
      </Grid>


    </Grid>





  );
};

// eslint-disable-next-line no-restricted-syntax
export default ProgramacionFechas;
