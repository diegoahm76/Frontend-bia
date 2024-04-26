/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState } from "react";
import { Button, Grid, Dialog } from "@mui/material";
import { CorreoNotificacinSinPopos } from "./NotificacionContent/Notificacion";
import EmailIcon from "@mui/icons-material/Email";


export const ModalNotificacionUsuario = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);


    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

 
    return (
        <>

            <Button
                style={{ marginTop: 15, backgroundColor: "green", color: "white", width: "95%" }}
                color="success" // Cambia el color según si es una actualización o creación
                fullWidth
                variant="contained"
                startIcon={<EmailIcon/>} 
                onClick={openModal}
            >
                Notificar Usuario
            </Button>

            <Grid container spacing={2}>


                <Grid item xs={12}>
                    <Dialog open={isModalOpen} fullWidth maxWidth="md">
                     
                            <Grid item xs={12}>
                              <CorreoNotificacinSinPopos  closeModal={closeModal}/>
                            </Grid>
                    </Dialog >
                </Grid>
            </Grid>
        </>
    );
};
