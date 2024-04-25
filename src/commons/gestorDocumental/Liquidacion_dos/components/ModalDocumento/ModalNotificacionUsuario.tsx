/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState } from "react";
import { Button, Grid, Dialog } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import { Title } from "../../../../../components/Title";
import { CorreoNotificacinSinPopos } from "./NotificacionContent/Notificacion";

export interface Persona {
    id_persona: number;
    primer_nombre: string;
    segundo_nombre: string;
    primer_apellido: string;
    segundo_apellido: string;
}
export const ModalNotificacionUsuario = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);


    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const selected_proceso = {
        fecha_facturacion: "2024-04-23",
        numero_factura: "123456789",
        codigo_contable: "ABC123",
        monto_inicial: "100.00",
        dias_mora: "5",
        valor_intereses: "20.00",
        valor_sancion: "10.00",
        etapa: "Etapa 1",
        data_complement: "Datos complementarios"
    };
    
    return (
        <>

            <Button
                style={{ marginTop: 15, backgroundColor: "green", color: "white", width: "95%" }}
                color="success" // Cambia el color según si es una actualización o creación
                fullWidth
                variant="contained"
                startIcon={<PaymentOutlinedIcon />} // Icono de PDF
                onClick={openModal}
            >
                Notificar
            </Button>

            <Grid container spacing={2}>


                <Grid item xs={12}>
                    <Dialog open={isModalOpen} fullWidth maxWidth="md">
                     
                            <Grid item xs={12}>
                              <CorreoNotificacinSinPopos  closeModal={closeModal}/>
                            </Grid>


                            {/* <Grid item xs={12} sm={4} md={2.4} lg={1.9}>
                                <Button
                                    fullWidth
                                    startIcon={<ClearIcon />}
                                    style={{ width: "90%", marginTop: 15, backgroundColor: "red", color: "white" }}
                                    variant="contained"
                                    color="error"
                                    onClick={closeModal}
                                >
                                    Salir
                                </Button>
                           
                        </Grid> */}
                    </Dialog >
                </Grid>
            </Grid>
        </>
    );
};
