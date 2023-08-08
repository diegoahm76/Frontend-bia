import React from "react";
import SaveIcon from '@mui/icons-material/Save';
import { Dialog } from 'primereact/dialog';
import {
    Button,
    
    Grid
} from "@mui/material";


import ArchiveIcon from '@mui/icons-material/Archive';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ModalConfirmacionArchivar: React.FC= () => {


   

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const [visible, setVisible] = React.useState<boolean>(false);

    const footer_content = (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button style={{ margin: 3 }} color="primary" variant="contained" onClick={() => { setVisible(false) }} >No</Button>
            <Button style={{ margin: 3 }} type="submit" startIcon={<SaveIcon />} variant="contained" onClick={() => { setVisible(false) }} color="success" >Si</Button>
        </div>
    );



    // eslint-disable-next-line @typescript-eslint/naming-convention
    const handleClick = (): void => {
        setVisible(true);

    };

   

    return (
        <div>
            <Button
  
                onClick={handleClick}
            >
                <ArchiveIcon /> 
            </Button>
            <Dialog
                visible={visible}
                style={{ width: 420 }}
                closable={false}
                onHide={() => { setVisible(false) }}
                footer={footer_content}
                modal
            >
                <Grid container sx={{
                    background: '#FAFAFA',
                    borderRadius: '15px',
                    p: '20px',
                    boxShadow: '0px 3px 6px #042F4A26',
                }}>
                    <h4 style={{ marginBottom: '20px' }}>¿Estas seguro de suspender las repeticiones de esta alerta?</h4>
                </Grid>
            </Dialog>
        </div>
    );
};