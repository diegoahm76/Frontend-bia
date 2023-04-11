import { Grid, List, ListItem, Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { type Props } from '../../interfaces/Props';


// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
export const CuadroComparacion:React.FC<Props> = ({ titulo, precio, porcentaje, color, icono }) => {
    return (
        <Grid 
            item 
            sx={{
                m: '10px',
            }} 
        >

            <Box 
                sx={{ 
                    position: 'relative',
                    background: '#FAFAFA',
                    borderRadius: '15px',
                    p: '15px',
                    boxShadow: '0px 3px 6px #042F4A26',
                }}
            >

                <List>
                <ListItem disablePadding>
                    <Typography variant='subtitle2' color='gray'>{ titulo }</Typography>
                </ListItem>
                </List>

                <Divider />

                <List>
                    <ListItem disablePadding>

                        <Box flexDirection='column'>
                            <Typography variant='h5'>
                                { precio }
                            </Typography>
                            <Typography variant="body2" color={ color } alignContent='end'>
                                { porcentaje }
                            </Typography>
                        </Box>

                        <Box sx={{ pl: '100px' }}>
                            { icono }
                        </Box>

                    </ListItem>

                </List>
            </Box>
        </Grid>
  )
}
