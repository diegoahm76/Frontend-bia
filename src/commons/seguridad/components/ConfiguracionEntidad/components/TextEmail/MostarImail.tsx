import { InputText } from "primereact/inputtext";


import {Box, Grid } from "@mui/material";


// eslint-disable-next-line @typescript-eslint/naming-convention
export const MostrarEmail: React.FC = () => {


    return (
        <Grid container sx={{
            position: 'relative',
            background: '#FAFAFA',
            borderRadius: '15px',
            p: '10px',
            mb: '10px',
            boxShadow: '0px 3px 6px #042F4A26',
        }}
        >

            <Grid item xs={12}>
              
                <Box component="form" sx={{  padding: 3 }} noValidate autoComplete="off">
                    <Grid item container spacing={7}>

                        <Grid item xs={12} sm={6} >
                            <label>Email Corporativo :</label>
                            <InputText aria-describedby="username-help" disabled placeholder="email" style={{ marginLeft: 14 }} />
                           
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <label>Confirmar Email :</label>
                            <InputText aria-describedby="username-help" disabled placeholder="confi email" style={{ marginLeft:14}} />
                           
                        </Grid>
                       

                    </Grid>
                </Box>
            </Grid>
        </Grid>
    );
};