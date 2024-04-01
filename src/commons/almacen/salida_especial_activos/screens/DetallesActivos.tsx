import { Chip, Divider, Grid } from '@mui/material';
import React, { useState } from 'react';
import TablaEntradasEspeciales from '../tables/TablaEntradasEspeciales';
import { Title } from '../../../../components';

// eslint-disable-next-line @typescript-eslint/naming-convention
const DetallesActivos = () => {

  const [loadding_tabla, set_loadding_tabla] = useState(false);
  const [data_funcionarios_terceros, set_data_funcionarios_terceros] = useState([]);



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

        <Title title='Detalles de activos' />
        
        <TablaEntradasEspeciales 
          data_funcionarios_terceros={data_funcionarios_terceros}
          set_funcionario_tercero_temp={set_data_funcionarios_terceros}
          loadding_tabla={false}
        />
      </Grid>
    </>
  );
}
 
// eslint-disable-next-line no-restricted-syntax
export default DetallesActivos;