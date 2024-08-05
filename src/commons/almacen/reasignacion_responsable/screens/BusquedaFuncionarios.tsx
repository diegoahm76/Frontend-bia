import { Button, Grid, TextField } from '@mui/material';
import React, { Dispatch, FC, SetStateAction } from 'react';
import FuncionarioResponsable from '../components/FuncionarioResponsable';
import { interface_busqueda_operario, interface_busqueda_responsable, interface_inputs_funcionarios, interface_inputs_operario, interface_inputs_responsable, interface_inputs_responsable_actual, interface_tipos_documentos } from '../interfaces/types';
import FuncionarioOperario from '../components/FuncionarioOperario';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';




interface props {
  set_tipo_funcionario: Dispatch<SetStateAction<string>>;
  inputs_funcionarios: interface_inputs_funcionarios;
  set_inputs_funcionarios: Dispatch<SetStateAction<interface_inputs_funcionarios>>;
  inputs_responsable: interface_inputs_responsable;
  set_inputs_responsable: Dispatch<SetStateAction<interface_inputs_responsable>>;
  inputs_operario: interface_inputs_operario;
  set_inputs_operario: Dispatch<SetStateAction<interface_inputs_operario>>;
  inputs_responsable_actual: interface_inputs_responsable_actual;
  set_inputs_responsable_actual: Dispatch<SetStateAction<interface_inputs_responsable_actual>>;
  tipos_documentos: interface_tipos_documentos[];
  set_mostrar_modal_busqueda_funcionarios: Dispatch<SetStateAction<boolean>>;
  set_funcionario_responsable_reasignado_seleccionado: Dispatch<SetStateAction<interface_busqueda_responsable>>;
  set_funcionario_operario_seleccionado: Dispatch<SetStateAction<interface_busqueda_operario>>;
  observacion: string;
  set_observacion: Dispatch<SetStateAction<string>>;
  set_data_anexo_opcional: Dispatch<any>;
  data_anexo_opcional: any;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
const BusquedaFuncionarios: FC<props> = ({
  set_tipo_funcionario,
  inputs_funcionarios,
  set_inputs_funcionarios,
  inputs_responsable,
  set_inputs_responsable,
  inputs_operario,
  set_inputs_operario,
  inputs_responsable_actual,
  set_inputs_responsable_actual,
  tipos_documentos,
  set_mostrar_modal_busqueda_funcionarios,
  set_funcionario_responsable_reasignado_seleccionado,
  set_funcionario_operario_seleccionado,
  observacion,
  set_observacion,
  set_data_anexo_opcional,
  data_anexo_opcional,
}) => {

  const handle_file_upload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selected_file = files[0];

      set_data_anexo_opcional(selected_file);
    } else {
      set_data_anexo_opcional({} as any);
    }
  };


  return (
    <>
      <Grid container spacing={2} item xs={12}>
        <FuncionarioResponsable
          tipo_funcionario={'reasignado'}
          set_tipo_funcionario={set_tipo_funcionario}
          inputs_funcionarios={inputs_funcionarios}
          set_inputs_funcionarios={set_inputs_funcionarios}
          inputs_responsable={inputs_responsable}
          set_inputs_responsable={set_inputs_responsable}
          inputs_responsable_actual={inputs_responsable_actual}
          set_inputs_responsable_actual={set_inputs_responsable_actual}
          tipos_documentos={tipos_documentos}
          set_mostrar_modal_busqueda_funcionarios={set_mostrar_modal_busqueda_funcionarios}
          set_funcionario_responsable_reasignado_seleccionado={set_funcionario_responsable_reasignado_seleccionado}
        />

        <FuncionarioOperario
          set_tipo_funcionario={set_tipo_funcionario}
          inputs_funcionarios={inputs_funcionarios}
          set_inputs_funcionarios={set_inputs_funcionarios}
          tipos_documentos={tipos_documentos}
          set_mostrar_modal_busqueda_funcionarios={set_mostrar_modal_busqueda_funcionarios}
          set_funcionario_operario_seleccionado={set_funcionario_operario_seleccionado}
        />

        <Grid item xs={12} lg={9}>
          <TextField
            fullWidth
            label='Observación'
            value={observacion}
            onChange={(e) => set_observacion(e.target.value)}
            size='small'
            required
          />
        </Grid>

        <Grid item xs={12} lg={3}>
          <Button
            fullWidth
            component="label"
            role={undefined}
            variant={('name' in data_anexo_opcional) ? 'contained' : 'outlined'}
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            {!('name' in data_anexo_opcional) ? 'Subir anexo' : 'Actualizar anexo'}
            <input
              type="file"
              style={{ display: "none" }}
              onChange={handle_file_upload}
              accept=".pdf, .doc, .docx" // Puedes ajustar las extensiones permitidas según tus necesidades
            />
          </Button>
        </Grid>


      </Grid>
    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default BusquedaFuncionarios;