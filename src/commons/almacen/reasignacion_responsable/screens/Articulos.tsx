import { Grid } from '@mui/material';
import React, { Dispatch, FC, SetStateAction } from 'react';
import FuncionarioResponsable from '../components/FuncionarioResponsable';
import { interface_activos_asociados, interface_busqueda_responsable, interface_inputs_funcionarios, interface_tipos_documentos } from '../interfaces/types';
import { Title } from '../../../../components';
import TablaActivosAsociados from '../tables/TablaActivosAsociados';
import TablaActivosAsociadosAgregados from '../tables/TablaActivosAsociadosAgregados';



interface props {
  set_tipo_funcionario: Dispatch<SetStateAction<string>>;
  inputs_funcionarios: interface_inputs_funcionarios;
  set_inputs_funcionarios: Dispatch<SetStateAction<interface_inputs_funcionarios>>;
  tipos_documentos: interface_tipos_documentos[];
  set_mostrar_modal_busqueda_funcionarios: Dispatch<SetStateAction<boolean>>;
  set_funcionario_responsable_actual_seleccionado: Dispatch<SetStateAction<interface_busqueda_responsable>>;
  loadding_tabla_activos_asociados: boolean;
  data_activos_asociados: interface_activos_asociados[];
  set_data_activos_asociados: Dispatch<SetStateAction<interface_activos_asociados[]>>;
  data_activos_asociados_agregados: interface_activos_asociados[];
  set_data_activos_asociados_agregados: Dispatch<SetStateAction<interface_activos_asociados[]>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
const Articulos: FC<props> = ({
  set_tipo_funcionario,
  inputs_funcionarios,
  set_inputs_funcionarios,
  tipos_documentos,
  set_mostrar_modal_busqueda_funcionarios,
  set_funcionario_responsable_actual_seleccionado,
  loadding_tabla_activos_asociados,
  data_activos_asociados,
  set_data_activos_asociados,
  data_activos_asociados_agregados,
  set_data_activos_asociados_agregados,
}) => {

  return (
    <>
      <Grid container spacing={2} item xs={12}>
        <FuncionarioResponsable
          tipo_funcionario={'actual'}
          set_tipo_funcionario={set_tipo_funcionario}
          inputs_funcionarios={inputs_funcionarios}
          set_inputs_funcionarios={set_inputs_funcionarios}
          tipos_documentos={tipos_documentos}
          set_mostrar_modal_busqueda_funcionarios={set_mostrar_modal_busqueda_funcionarios}
          set_funcionario_responsable_actual_seleccionado={set_funcionario_responsable_actual_seleccionado}
        />
      </Grid>

      <Grid container xs={12} my={5} sx={{
        position: "relative",
        background: "#FAFAFA",
        borderRadius: "15px",
        p: "30px",
        mb: "20px",
        boxShadow: "0px 3px 6px #042F4A26",
      }}>
        <Title title='Activos asociados' />

        <TablaActivosAsociados
          data_activos_asociados={data_activos_asociados}
          set_data_activos_asociados={set_data_activos_asociados}
          set_data_activos_asociados_agregados={set_data_activos_asociados_agregados}
          loadding_tabla_activos_asociados={loadding_tabla_activos_asociados}
        />
      </Grid>

      <Grid container xs={12} sx={{
        position: "relative",
        background: "#FAFAFA",
        borderRadius: "15px",
        p: "30px",
        mb: "20px",
        boxShadow: "0px 3px 6px #042F4A26",
      }}>
        <Title title='Activos asociados agregados' />

        <TablaActivosAsociadosAgregados
          data_activos_asociados_agregados={data_activos_asociados_agregados}
          set_data_activos_asociados_agregados={set_data_activos_asociados_agregados}
          set_data_activos_asociados={set_data_activos_asociados}
        />
      </Grid>
    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default Articulos;