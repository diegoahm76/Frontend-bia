import { Button, Chip, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { Dispatch, FC, SetStateAction } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { interface_busqueda_responsable, interface_inputs_funcionarios, interface_tipos_documentos, response_busqueda_responsable } from '../interfeces/types';
import { useDispatch } from 'react-redux';
import { control_error, control_success } from '../../../../helpers';
import { get_obtener_responsables } from '../thunks/despacho_solicitudes';
import { Title } from '../../../../components';


interface props {
  set_tipo_funcionario: Dispatch<SetStateAction<string>>;
  inputs_funcionarios: interface_inputs_funcionarios;
  set_inputs_funcionarios: Dispatch<SetStateAction<interface_inputs_funcionarios>>;
  tipos_documentos: interface_tipos_documentos[];
  set_mostrar_modal_busqueda_funcionarios: Dispatch<SetStateAction<boolean>>;
  set_funcionario_responsable_seleccionado: Dispatch<SetStateAction<interface_busqueda_responsable>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const FuncionarioResponsable: FC<props> = ({
  set_tipo_funcionario,
  inputs_funcionarios,
  set_inputs_funcionarios,
  tipos_documentos,
  set_mostrar_modal_busqueda_funcionarios,
  set_funcionario_responsable_seleccionado,
}) => {
  const dispatch = useDispatch();

  const get_obtener_responsables_fc = () => {
    dispatch(get_obtener_responsables(
      inputs_funcionarios.tp_documento_funcionario_responsable ?? '',
      inputs_funcionarios.documento_funcionario_responsable ?? '',
      '',
      '',
      '',
      '',
    )).then((response: response_busqueda_responsable) => {
      if (Object.keys(response).length !== 0) {
        if (response.data.length !== 0) {
          set_funcionario_responsable_seleccionado(response.data[0]);
          control_success('Funcionario encontrado');
        } else {
          set_funcionario_responsable_seleccionado({} as interface_busqueda_responsable);
          control_error('No se encontraron funcionarios');
        }
      } else {
        control_error('Error en el servidor al obtener los responsables de la solicitud de activos');
      }
    });
  }

  const buscar_funcionario = () => {
    if (!('tp_documento_funcionario_responsable' in inputs_funcionarios) ||
      !('documento_funcionario_responsable' in inputs_funcionarios)
    ) {
      control_error('Debe ingresar el tipo y número de documento');
    } else {
      get_obtener_responsables_fc();
    }
  }

  return (
    <Grid container spacing={2} item xs={12}>
      <Grid item mt={3} xs={12}>
        <Title title='Funcionario responsable' />
      </Grid>

      <Grid item xs={12} lg={3}>
        <FormControl required size="small" fullWidth>
          <InputLabel >Tipo documento:</InputLabel>
          <Select
            label='Tipo documento:'
            value={inputs_funcionarios.tp_documento_funcionario_responsable ?? ''}
            onChange={(e) => set_inputs_funcionarios({
              ...inputs_funcionarios,
              tp_documento_funcionario_responsable: e.target.value
            })
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
          value={inputs_funcionarios.documento_funcionario_responsable ?? ''}
          onChange={(e) => set_inputs_funcionarios({
            ...inputs_funcionarios,
            documento_funcionario_responsable: e.target.value
          })
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
            set_tipo_funcionario('responsable');
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
          value={inputs_funcionarios.nombres_funcionario_responsable ?? ''}
          onChange={(e) => set_inputs_funcionarios({ ...inputs_funcionarios, nombres_funcionario_responsable: e.target.value })}
          size='small'
        />
      </Grid>

      <Grid item xs={12} lg={6}>
        <TextField
          fullWidth
          disabled
          label='Apellidos: '
          value={inputs_funcionarios.apellidos_funcionario_responsable ?? ''}
          onChange={(e) => set_inputs_funcionarios({ ...inputs_funcionarios, apellidos_funcionario_responsable: e.target.value })}
          size='small'
        />
      </Grid>
    </Grid>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default FuncionarioResponsable;