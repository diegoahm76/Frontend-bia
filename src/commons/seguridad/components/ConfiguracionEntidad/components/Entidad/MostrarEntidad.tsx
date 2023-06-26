import {
    Box,
    Grid
} from "@mui/material";
import { InputText } from "primereact/inputtext";
import { Title } from "../../../../../../components/Title";


// eslint-disable-next-line @typescript-eslint/naming-convention
export const MostrarEntidad: React.FC = () => {
    return (

      
            
        <Grid
            container
            sx={{
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
                    <Grid item container spacing={2}>


                    <Grid item xs={12} sm={6} md={3}>
                    <label htmlFor="username">Tipo Documento ID</label>
                    <InputText aria-describedby="username-help" disabled placeholder="ID" />

                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                    <label htmlFor="username">Num Documento ID</label>
                    <InputText aria-describedby="username-help" disabled placeholder="Num" />

                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                    <label htmlFor="username">Num Documento ID</label>
                    <InputText aria-describedby="username-help" disabled placeholder="Num Id" />

                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                    <label htmlFor="username">Tipo Documento ID</label>
                    <InputText aria-describedby="username-help" disabled placeholder="Tipo ID" />
                    </Grid>



                </Grid>
            </Box>

            </Grid>
        </Grid>

       

    );
}