import { useState } from "react";
import { Dialog } from 'primereact/dialog';
import {
    Box, Button,
    Grid,
    Typography
} from "@mui/material";
import { Title } from "../../../../../../../components/Title";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ModalEditarCargo: React.FC = () => {
     // eslint-disable-next-line @typescript-eslint/naming-convention
    const [visible, setVisible] = useState<boolean>(false);
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const footercontent = (
        <div>
            <Button style={{ margin: 3 }} color="primary" variant="contained" onClick={() => { setVisible(false) }} >holal</Button>
            <Button style={{ margin: 3 }} color="primary" variant="contained" onClick={() => {setVisible(false)}} >chao</Button>
        </div>
    );

    const title = <Title title="Entidad" />;



    return (
        <div>
           
            <Button style={{ margin: 3 }} color="primary" variant="contained"  onClick={() => {setVisible(true)}}>Cambiar</Button>
            <Dialog header={title} visible={visible} style={{ width: '50%' }} onHide={() => {setVisible(false)}} footer={footercontent}>
                <Grid container sx={{
                  
                    background: '#FAFAFA',
                    borderRadius: '15px',
                    p: '20px',
                    mb: '20px',
                    boxShadow: '0px 3px 6px #042F4A26',
                }}
                >

                   
                
                        <Box component="form"  noValidate autoComplete="off">
                        
                            <Grid item container xs={12}>
                                <Grid item xs={12} sm={6} md={2}>
                                    <Typography variant="subtitle1" fontWeight="bold">Tipo ID</Typography>
                                    <InputText style={{ width: '80%' }} aria-describedby="username-help" disabled placeholder="NIT" />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Typography variant="subtitle1" fontWeight="bold">Num Documento ID</Typography>
                                    <InputText style={{ width: '80%' }} aria-describedby="username-help" disabled placeholder="21346793" />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Typography variant="subtitle1" fontWeight="bold">Num Documento ID</Typography>
                                    <InputText style={{ width: '80%' }} aria-describedby="username-help" disabled placeholder="21346793" />
                                </Grid>
                            
                            <Grid item xs={12} sm={6} md={2} sx={{ alignSelf: 'flex-end' }}>
                                <Button color="primary" variant="contained" onClick={() => { setVisible(false) }}>p</Button>
                            </Grid>
                        </Grid>
                        </Box>
                 </Grid>
                        
                    <Grid container sx={{
                        position: 'relative',
                        background: '#FAFAFA',
                        borderRadius: '15px',
                        p: '20px',
                        mb: '20px',
                        boxShadow: '0px 3px 6px #042F4A26',
                    }}
                    >

                        <Grid item xs={12} sm={6} >
                            <Typography variant="subtitle1" fontWeight="bold">Tipo Documento ID</Typography>

                            <InputText aria-describedby="username-help" disabled placeholder="NIT" />

                        </Grid>

                        <Grid item xs={12} sm={6} >
                            <Typography variant="subtitle1" fontWeight="bold">Num Documento ID</Typography>

                            <InputText aria-describedby="username-help" disabled placeholder="21346793" />
                        </Grid>


                    <Grid item xs={12}  >
                        <InputTextarea style={{padding:2,width:"80%"}}keyfilter="int" placeholder="Observaciones" rows={5} cols={30} />

                    </Grid>
                   
                    </Grid>
                
            </Dialog>
        </div>
    );
};
