import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { type Props } from '../../interfaces/Props';


// eslint-disable-next-line @typescript-eslint/naming-convention
export const CuadroInformacion:React.FC<Props> = ({ titulo, numero_principal, porcentaje, color, icono }:any) => {
  return (
    <Grid 
        item 
        sx={{
            position: 'relative',
            background: '#FAFAFA',
            borderRadius: '15px',
            p: '8.09px',
            m: '10px',
            boxShadow: '0px 3px 6px #042F4A26',
        }}
    >
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            {icono}
                <Box sx={{ display: 'flex', flexDirection: 'column', pl: '20px' }}>
                    <Typography variant="subtitle2" color='gray'>
                        { titulo }
                    </Typography>
                    <Typography variant="h5">
                        { numero_principal }
                    </Typography>
                </Box>
            <Typography sx={{ pl: '40px' }} variant="body2" color={color} alignContent='end'>
                { porcentaje }
            </Typography>
        </Box>
    </Grid>
  )
}
