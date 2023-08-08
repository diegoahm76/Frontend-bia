import  {useState } from "react";
import { Dialog } from 'primereact/dialog';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
    Button,
    Grid, TextField
} from "@mui/material";

import { Title } from "../../../../../../components/Title";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ModalInfoAlerta: React.FC = () => {


    // eslint-disable-next-line @typescript-eslint/naming-convention
    const handleGuardarYPoner = (): void => {
        setVisible(false)
      
    };



    // eslint-disable-next-line @typescript-eslint/naming-convention
    const [visible, setVisible] = useState<boolean>(false);

    const footer_content = (
        <div>
            <Button style={{ margin: 3 }} color="primary" variant="contained" onClick={() => { handleGuardarYPoner() }} >Salir</Button>

        </div>
    );

    const title = (<Title title="Cambiar " />);


    // eslint-disable-next-line @typescript-eslint/naming-convention
    const handleClick = (): void => {
        setVisible(true);

    };




    return (
        <div>

            <Button
            
                onClick={handleClick}
            >
              <VisibilityIcon/>
            </Button>
            <Dialog header={title} visible={visible} style={{ width: '60%' }} closable={false} onHide={() => { setVisible(false) }} footer={footer_content}>
                <Grid container sx={{
                    background: '#FAFAFA',
                    borderRadius: '15px',
                    p: '20px',
                    mb: '20px',
                    boxShadow: '0px 3px 6px #042F4A26',
                }}
                >


                    <Grid item xs={12}  >

                        <TextField
                            style={{ width: "95%",margin:6 }}
                            label="Clase Alerta"
                            variant="outlined"
                            size="small"
                            disabled
                            fullWidth
                     
                        />
                    </Grid>

                    <Grid item xs={12} sm={4} >

                        <TextField
                            style={{ width: "85%", margin: 6 }}
                            label="Tipo de Alerta"
                            variant="outlined"
                            size="small"
                            disabled
                            fullWidth
                           
                        />
                    </Grid>
                    <Grid item xs={12} sm={4} >

                        <TextField
                            style={{ width: "85%", margin: 6 }}
                            label="Fecha/Hora"
                            variant="outlined"
                            size="small"
                            disabled
                            fullWidth

                        />
                    </Grid>
                    <Grid item xs={12} sm={4} >

                        <TextField
                            style={{ width: "85%", margin: 6 }}
                            label="Responsable Directo"
                            variant="outlined"
                            size="small"
                            disabled
                            fullWidth

                        />
                    </Grid>

                    <Grid item xs={12} sm={4} >

                        <TextField
                            style={{ width: "85%", margin: 6 }}
                            label="Fecha Envio a Email"
                            variant="outlined"
                            size="small"
                            disabled
                            fullWidth

                        />
                    </Grid>
                    <Grid item xs={12} sm={4} >

                        <TextField
                            style={{ width: "85%", margin: 6 }}
                            label=" Envio a Email"
                            variant="outlined"
                            size="small"
                            disabled
                            fullWidth

                        />
                    </Grid>
                    <Grid item xs={12} sm={4} >

                        <TextField
                            style={{ width: "85%", margin: 6 }}
                            label="Modulo Destino"
                            variant="outlined"
                            size="small"
                            disabled
                            fullWidth

                        />
                    </Grid>
              

              
              
                  

                <Grid item xs={12} sm={3} >

                        <TextField
                            style={{ margin: 6, width: "85%" }}
                            label="Suspendido"
                            variant="outlined"
                            size="small"
                            disabled
                            fullWidth
                           
                        />
                    </Grid>
                <Grid item xs={12} sm={3} >

                    <TextField
                        style={{ margin: 6 , width: "85%"}}
                        label="Prioridad"
                        variant="outlined"
                        size="small"
                        disabled
                        fullWidth

                    />
                </Grid>


                    <Grid item xs={12}>
                        <TextField
                            style={{ margin: 6, width: "100%" }}
                            label="Mensaje"
                            id="description"
                        />

                    </Grid>
                </Grid>
            </Dialog>
        </div>
    );
};