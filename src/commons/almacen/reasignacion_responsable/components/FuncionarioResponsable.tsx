import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { Dispatch, FC, SetStateAction } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from 'react-redux';
import { control_error, control_success } from '../../../../helpers';
import { get_obtener_responsables } from '../thunks/reasignacion_responsable';
import { interface_busqueda_responsable, interface_inputs_funcionarios, interface_inputs_responsable, interface_inputs_responsable_actual, interface_tipos_documentos, response_busqueda_responsable } from '../interfaces/types';
import { Title } from '../../../../components';


interface props {
  tipo_funcionario: string;
  set_tipo_funcionario: Dispatch<SetStateAction<string>>;
  inputs_funcionarios: interface_inputs_funcionarios;
  set_inputs_funcionarios: Dispatch<SetStateAction<interface_inputs_funcionarios>>;
  inputs_responsable: interface_inputs_responsable;
  set_inputs_responsable: Dispatch<SetStateAction<interface_inputs_responsable>>;
  inputs_responsable_actual: interface_inputs_responsable_actual;
  set_inputs_responsable_actual: Dispatch<SetStateAction<interface_inputs_responsable_actual>>;
  tipos_documentos: interface_tipos_documentos[];
  set_mostrar_modal_busqueda_funcionarios: Dispatch<SetStateAction<boolean>>;
  set_funcionario_responsable_reasignado_seleccionado?: Dispatch<SetStateAction<interface_busqueda_responsable>>;
  set_funcionario_responsable_actual_seleccionado?: Dispatch<SetStateAction<interface_busqueda_responsable>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const FuncionarioResponsable: FC<props> = ({
  tipo_funcionario,
  set_tipo_funcionario,
  inputs_funcionarios,
  set_inputs_funcionarios,
  inputs_responsable,
  set_inputs_responsable,
  inputs_responsable_actual,
  set_inputs_responsable_actual,
  tipos_documentos,
  set_mostrar_modal_busqueda_funcionarios,
  set_funcionario_responsable_reasignado_seleccionado,
  set_funcionario_responsable_actual_seleccionado,
}) => {
  const dispatch = useDispatch();

  const get_obtener_responsables_fc = () => {
    dispatch(get_obtener_responsables(
      tipo_funcionario === 'reasignado' ?
        (inputs_responsable.tp_documento_funcionario_responsable_reasignado ?? '')
        :
        (inputs_responsable_actual.tp_documento_funcionario_responsable_actual ?? ''),

      tipo_funcionario === 'reasignado' ?
        (inputs_responsable.documento_funcionario_responsable_reasignado ?? '')
        :
        (inputs_responsable_actual.documento_funcionario_responsable_actual ?? ''),
      '',
      '',
      '',
      '',
    )).then((response: response_busqueda_responsable) => {
      if (Object.keys(response).length !== 0) {
        if (response.data.length !== 0) {

          if (tipo_funcionario === 'actual' && set_funcionario_responsable_actual_seleccionado) {
            // Si el tipo de funcionario es actual, se setea el funcionario responsable actual seleccionado
            set_funcionario_responsable_actual_seleccionado(response.data[0]);
          } else if (tipo_funcionario === 'reasignado' && set_funcionario_responsable_reasignado_seleccionado) {
            // Si el tipo de funcionario es reasignado, se setea el funcionario responsable reasignado seleccionado
            set_funcionario_responsable_reasignado_seleccionado(response.data[0]);
          }

          control_success('Funcionario encontrado');
        } else {
          if (tipo_funcionario === 'actual' && set_funcionario_responsable_actual_seleccionado) {
            set_funcionario_responsable_actual_seleccionado({} as interface_busqueda_responsable);
          } else if (tipo_funcionario === 'reasignado' && set_funcionario_responsable_reasignado_seleccionado) {
            set_funcionario_responsable_reasignado_seleccionado({} as interface_busqueda_responsable);
          }

          control_error('No se encontraron funcionarios');
        }
      } else {
        control_error('Error en el servidor al obtener los responsables de la solicitud de activos');
      }
    });
  }

  const buscar_funcionario = () => {
    if (tipo_funcionario === 'reasignado') {
      if (!('tp_documento_funcionario_responsable_reasignado' in inputs_responsable) ||
        !('documento_funcionario_responsable_reasignado' in inputs_responsable)
      ) {
        control_error('Debe ingresar el tipo y número de documento');
      } else {
        get_obtener_responsables_fc();
      }
    } else if (tipo_funcionario === 'actual') {
      if (!('tp_documento_funcionario_responsable_actual' in inputs_responsable_actual) ||
        !('documento_funcionario_responsable_actual' in inputs_responsable_actual)
      ) {
        control_error('Debe ingresar el tipo y número de documento');
      } else {
        get_obtener_responsables_fc();
      }
    }
  }

  return (
    <Grid container spacing={2} item xs={12}>

      <Grid item mt={3} xs={12}>
        <Title title={tipo_funcionario === 'actual' ? 'Funcionario responsable actual' : 'Funcionario responsable reasignado'} />
      </Grid>

      <Grid item xs={12} lg={3}>
        <FormControl required size="small" fullWidth>
          <InputLabel >Tipo documento:</InputLabel>
          <Select
            label='Tipo documento:'
            value={
              tipo_funcionario === 'reasignado' ?
                (inputs_responsable.tp_documento_funcionario_responsable_reasignado ?? '')
                :
                (inputs_responsable_actual.tp_documento_funcionario_responsable_actual ?? '')
            }
            onChange={(e) => {
                if (tipo_funcionario === 'reasignado') {
                  set_inputs_responsable(prevState => ({
                    ...prevState,
                    tp_documento_funcionario_responsable_reasignado: e.target.value
                  }));
                } else {
                  set_inputs_responsable_actual(prevState => ({
                    ...prevState,
                    tp_documento_funcionario_responsable_actual: e.target.value
                  }));
                }
              }
            }
          >
            {tipos_documentos.length !== 0 ?
              tipos_documentos?.map((item: interface_tipos_documentos) => (
                <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
              ))
              :
              <MenuItem value={''}>Cargando...</MenuItem>
            }
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} lg={3}>
        <TextField
          fullWidth
          label='Documento:'
          value={
            tipo_funcionario === 'reasignado' ?
              (inputs_responsable.documento_funcionario_responsable_reasignado ?? '')
              :
              (inputs_responsable_actual.documento_funcionario_responsable_actual ?? '')
          }
          onChange={(e) => {
              if (tipo_funcionario === 'reasignado') {
                set_inputs_responsable(prevState => ({
                  ...prevState,
                  tp_documento_funcionario_responsable_reasignado: e.target.value
                }));
              } else {
                set_inputs_responsable_actual(prevState => ({
                  ...prevState,
                  tp_documento_funcionario_responsable_actual: e.target.value
                }));
              }
            }
          }
          size='small'
        />
      </Grid>

      <Grid item xs={12} lg={3}>
        <Button
          fullWidth
          color="primary"
          variant="contained"
          startIcon={<SearchIcon />}
          onClick={buscar_funcionario}
        >
          Buscar
        </Button>
      </Grid>

      <Grid item xs={12} lg={3}>
        <Button
          fullWidth
          color="primary"
          variant="contained"
          startIcon={<SearchIcon />}
          onClick={() => {
            set_tipo_funcionario(tipo_funcionario === 'reasignado' ? 'reasignado' : 'actual');
            set_mostrar_modal_busqueda_funcionarios(true);
          }}
        >
          Búsqueda avanzada
        </Button>
      </Grid>

      <Grid item xs={12} lg={6}>
        <TextField
          fullWidth
          disabled
          label='Nombres: '
          value={
            tipo_funcionario === 'reasignado' ?
              (inputs_responsable.nombres_funcionario_responsable_reasignado ?? '')
              :
              (inputs_responsable_actual.nombres_funcionario_responsable_actual ?? '')
          }
          onChange={(e) => {
              if (tipo_funcionario === 'reasignado') {
                set_inputs_responsable(prevState => ({
                  ...prevState,
                  tp_documento_funcionario_responsable_reasignado: e.target.value
                }));
              } else {
                set_inputs_responsable_actual(prevState => ({
                  ...prevState,
                  tp_documento_funcionario_responsable_actual: e.target.value
                }));
              }
            }
          }
          size='small'
        />
      </Grid>

      <Grid item xs={12} lg={6}>
        <TextField
          fullWidth
          disabled
          label='Apellidos: '
          value={
            tipo_funcionario === 'reasignado' ?
              (inputs_responsable.apellidos_funcionario_responsable_reasignado ?? '')
              :
              (inputs_responsable_actual.apellidos_funcionario_responsable_actual ?? '')
          }
          onChange={(e) => {
              if (tipo_funcionario === 'reasignado') {
                set_inputs_responsable(prevState => ({
                  ...prevState,
                  tp_documento_funcionario_responsable_reasignado: e.target.value
                }));
              } else {
                set_inputs_responsable_actual(prevState => ({
                  ...prevState,
                  tp_documento_funcionario_responsable_actual: e.target.value
                }));
              }
            }
          }
          size='small'
        />
      </Grid>
    </Grid>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default FuncionarioResponsable;