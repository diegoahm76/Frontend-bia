import {
    Box,
    Grid,
    Typography
} from "@mui/material";
import { InputText } from "primereact/inputtext";
import { Title } from "../../../../../../components/Title";


// eslint-disable-next-line @typescript-eslint/naming-convention
export const MostrarEntidad: React.FC = () => {
    return (
         <Grid   container sx={{
                position: 'relative',
                background: '#FAFAFA',
                borderRadius: '15px',
                p: '20px',
                mb: '20px',
                boxShadow: '0px 3px 6px #042F4A26',
            }}
        >
        
            <Grid item md={12} xs={12}>
                <Title title="Entidad" />
                <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                    <Grid item container spacing={5}>


                    <Grid  item xs={12} sm={6} md={3}>
                            <Typography variant="subtitle1" fontWeight="bold">Tipo Documento ID</Typography>
                    
                    <InputText aria-describedby="username-help" disabled placeholder="NIT" />

                    </Grid>

                        <Grid   item xs={12} sm={6} md={3}>
                            <Typography variant="subtitle1" fontWeight="bold">Num Documento ID</Typography>
                
                    <InputText aria-describedby="username-help" disabled placeholder="21346793" />

                    </Grid>

                        <Grid   item xs={12} sm={6} md={3}>
                            <Typography variant="subtitle1" fontWeight="bold">DV</Typography>
                   
                    <InputText aria-describedby="username-help" disabled placeholder="2" />

                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="subtitle1" fontWeight="bold">Nombre</Typography>
                    
                    <InputText aria-describedby="username-help" disabled placeholder="Cormacarena" />
                    </Grid>



                </Grid>
            </Box>

            </Grid>
        </Grid>

       

    );
}