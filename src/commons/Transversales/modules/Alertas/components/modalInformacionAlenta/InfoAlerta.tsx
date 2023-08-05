import  {useState } from "react";
import SaveIcon from '@mui/icons-material/Save';
import { Dialog } from 'primereact/dialog';
import {
    Button,
    Grid, TextField
} from "@mui/material";

import EditIcon from '@mui/icons-material/Edit';
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
            <Button style={{ margin: 3 }} type="submit" startIcon={<SaveIcon />}  variant="contained"  color="success" >Guardar   </Button>

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
                style={{ margin: 3, marginTop: 10, marginRight: 10 }}
                color="primary"
                startIcon={<EditIcon />}
                variant="contained"
                onClick={handleClick}
            >
                Cambiar
            </Button>
            <Dialog header={title} visible={visible} style={{ width: '50%' }} closable={false} onHide={() => { setVisible(false) }} footer={footer_content}>
                <Grid container sx={{
                    background: '#FAFAFA',
                    borderRadius: '15px',
                    p: '20px',
                    mb: '20px',
                    boxShadow: '0px 3px 6px #042F4A26',
                }}
                >


                    <Grid item xs={12} sm={6} >

                        <TextField
                            style={{ width: "85%" }}
                            label="Director Actual"
                            variant="outlined"
                            size="small"
                            disabled
                            fullWidth
                     
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} >

                        <TextField
                            style={{ width: "85%" }}
                            label="Fecha de registro"
                            variant="outlined"
                            size="small"
                            disabled
                            fullWidth
                           
                        />
                    </Grid>
                </Grid>

                <Title title="Nuevo " />
                <Grid container sx={{
                    background: '#FAFAFA',
                    borderRadius: '15px',
                    p: '20px',
                    mb: '20px',
                    boxShadow: '0px 3px 6px #042F4A26',
                }}
                >
                  

                    <Grid item xs={12} >

                        <TextField
                            style={{ margin: 6 }}
                            label="Nombre Completo"
                            variant="outlined"
                            size="small"
                            disabled
                            fullWidth
                           
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            style={{ margin: 6, width: "100%" }}
                            label="Observaciones del cambio de el"
                            id="description"
                        />

                    </Grid>
                </Grid>
            </Dialog>
        </div>
    );
};