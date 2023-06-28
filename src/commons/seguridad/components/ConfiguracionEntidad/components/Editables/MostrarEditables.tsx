import { InputText } from "primereact/inputtext";


import { Box, Grid, Typography } from "@mui/material";
import { ModalEditarCargo } from "./ModalEditable/MotadlEditable";


// eslint-disable-next-line @typescript-eslint/naming-convention
export const MostrarEditables: React.FC = () => {




    return (
        <Grid container sx={{
            position: 'relative',
            background: '#FAFAFA',
            borderRadius: '15px',
            p: '20px',
            mb: '20px',
            boxShadow: '0px 3px 6px #042F4A26',

        }}
        >
            <Box component="form" sx={{ mt: '5px', padding: 3 }} noValidate autoComplete="off">
                <Grid item container spacing={7}>

                    <Grid item xs={12} sm={6} >
                        <Typography variant="subtitle1" fontWeight="bold">Director</Typography>
                        <InputText aria-describedby="username-help" disabled placeholder="Nombre completo" />
                        <ModalEditarCargo />
                        <br /> <br />
                        <label>Registrado desde</label>
                        <InputText type="text" className="p-inputtext-sm" placeholder="19/08/2000" style={{ margin: 3, height: 10, width: "30%" }} />
                    </Grid>

                    <Grid item xs={12} sm={6} >
                        <Typography variant="subtitle1" fontWeight="bold">Coordinador de Almacen</Typography>
                        <InputText aria-describedby="username-help" disabled placeholder="Nombre completo" />
                        <ModalEditarCargo />
                        <br /> <br />
                        <label>Registrado desde</label>
                        <InputText type="text" className="p-inputtext-sm" placeholder="19/08/2000" style={{ margin: 3, height: 10, width: "30%" }} />
                    </Grid>


                    <Grid item xs={12} sm={6} >
                        <Typography variant="subtitle1" fontWeight="bold">Coordinador de Viveros</Typography>
                        <InputText aria-describedby="username-help" disabled placeholder="Nombre completo" />
                        <ModalEditarCargo />
                        <br /> <br />
                        <label>Registrado desde</label>
                        <InputText type="text" className="p-inputtext-sm" placeholder="19/08/2000" style={{ margin: 3, height: 10, width: "30%" }} />
                    </Grid>


                    <Grid item xs={12} sm={6} >
                        <Typography variant="subtitle1" fontWeight="bold">Coordinador de Transporte</Typography>
                        <InputText aria-describedby="username-help" disabled placeholder="Nombre completo" />
                        <ModalEditarCargo />
                        <br /> <br />
                        <label>Registrado desde</label>
                        <InputText type="text" className="p-inputtext-sm" placeholder="19/08/2000" style={{ margin: 3, height: 10, width: "30%" }} />
                    </Grid>


                    <Grid item xs={12} sm={6} >
                        <Typography variant="subtitle1" fontWeight="bold">Almacenista</Typography>
                        <InputText aria-describedby="username-help" disabled placeholder="Nombre completo" />
                        <ModalEditarCargo />
                        <br /> <br />
                        <label>Registrado desde</label>
                        <InputText type="text" className="p-inputtext-sm" placeholder="19/08/2000" style={{ margin: 3, height: 10, width: "30%" }} />
                    </Grid>



                </Grid>
            </Box>

        </Grid>
    );
};