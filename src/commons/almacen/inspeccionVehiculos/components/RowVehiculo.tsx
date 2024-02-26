import { Button, FormLabel, Grid, Radio } from "@mui/material";
import { cambio_input_radio } from "../thunks/cambio_input_radio";
import { estilo_radio } from "../thunks/estilo_radio";
import { useState } from "react";
import SaveIcon from '@mui/icons-material/Save';

interface props {
  set_mostrar_view_inpeccion: React.Dispatch<React.SetStateAction<boolean>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
const RowVehiculo: React.FC<props> = ({set_mostrar_view_inpeccion}) => {
  const [esta_revisado, set_esta_revisado] = useState<string>('false');

  const enviar_revisado = () => {
    set_mostrar_view_inpeccion(true);
    //Pendiente hacer la lofgica para enviar a servicios, que ya se reviso este vehiculo
    //Por el momento queda solo visual el cambio
    set_esta_revisado('true');
  }

  return (
    <Grid container item sx={{
        width:'100%',
        display:'flex',
        alignItems:'center',
        background: '#FAFAFA',
        borderRadius: '15px',
        boxShadow: '0px 3px 6px #042F4A26',
        p: '20px',
        my: '20px',
      }}>
        <Grid item xs={9}>
          <FormLabel><b>Nombre y placa vehículo:</b> DSE-124 - HILUX</FormLabel>
        </Grid>
        <Grid item xs={1.5} sx={{display:'flex', flexDirection:'column', alignItems:'center'}}>
          <Grid item >¿Revisado?</Grid>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              disabled
              {...cambio_input_radio('true',esta_revisado,set_esta_revisado)}
                sx={estilo_radio('#27b355',28)}
            />
            <Radio
              disabled
              {...cambio_input_radio('false',esta_revisado,set_esta_revisado)}
                sx={estilo_radio('#e23a3a',28)}
            />
          </Grid>
        </Grid>
        <Grid item xs={1.5}>
          <Button
            fullWidth
            color='primary'
            variant='contained'
            startIcon={<SaveIcon/>}
            onClick={enviar_revisado}
            >
              Revisar
          </Button>
        </Grid>
    </Grid>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default RowVehiculo;