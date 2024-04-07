import { Chip, Divider, Grid } from '@mui/material';
import React, { useState } from 'react';
import TablaEntradasEspeciales from '../tables/TablaEntradasEspeciales';
import { Title } from '../../../../components';
import { interface_activos_asociados, interface_entradas_relacionadas } from '../interfaces/types';
import TablaActivosAsociados from '../tables/TablaActivosAsociados';
import TablaActivosAsociadosAgregados from '../tables/TablaActivosAsociadosAgregados';

interface props {
  data_entradas_relacionadas: interface_entradas_relacionadas[];
  set_entrada_relacionada_seleccionada: React.Dispatch<React.SetStateAction<interface_entradas_relacionadas>>;
  loadding_tabla_activos_asociados: boolean;
  data_activos_asociados: interface_activos_asociados[];
  set_data_activos_asociados: React.Dispatch<React.SetStateAction<interface_activos_asociados[]>>;
  data_activos_asociados_agregados: interface_activos_asociados[];
  set_data_activos_asociados_agregados: React.Dispatch<React.SetStateAction<interface_activos_asociados[]>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const DetallesActivos: React.FC<props> = ({
  set_entrada_relacionada_seleccionada,
  data_entradas_relacionadas,
  data_activos_asociados,
  set_data_activos_asociados,
  data_activos_asociados_agregados,
  set_data_activos_asociados_agregados,
  loadding_tabla_activos_asociados,
  }) => {

  return (
    <>
      <Grid container xs={12} sx={{
          position: "relative",
          background: "#FAFAFA",
          borderRadius: "15px",
          p: "30px",
          mb: "20px",
          boxShadow: "0px 3px 6px #042F4A26",
        }}>
        <Title title='Entradas especiales' />
        
        <TablaEntradasEspeciales 
          data_entradas_relacionadas={data_entradas_relacionadas}
          set_entrada_relacionada_seleccionada={set_entrada_relacionada_seleccionada}
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
        <Title title='Activos asociados' />
        
        <TablaActivosAsociados 
          data_activos_asociados={data_activos_asociados}
          loadding_tabla_activos_asociados={loadding_tabla_activos_asociados}
          set_data_activos_asociados_agregados={set_data_activos_asociados_agregados}
          set_data_activos_asociados={set_data_activos_asociados}
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
export default DetallesActivos;