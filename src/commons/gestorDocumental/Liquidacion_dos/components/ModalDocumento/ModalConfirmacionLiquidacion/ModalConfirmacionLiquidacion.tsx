/* eslint-disable @typescript-eslint/naming-convention */
import React, { useContext, useState } from "react";
import { Button, Grid, Dialog, Typography, IconButton, Paper } from "@mui/material";
import ReceiptIcon from '@mui/icons-material/Receipt';
import CancelIcon from '@mui/icons-material/Cancel';
import { control_error, control_success } from "../../../../../seguridad/components/SucursalEntidad/utils/control_error_or_success";
import { api } from "../../../../../../api/axios";
import { useSelector } from "react-redux";
import { AuthSlice } from "../../../../../auth/interfaces/authModels";
import { PreciosContext } from "../../../context/PersonalContext";

export const ModalConfirmacionLiquidacion = () => {
    const { liquidacionState } = useContext(PreciosContext);
    console.log(liquidacionState)
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const fechaActual = new Date();
    const FechaElaboracion = fechaActual.toISOString();
    
    const {
        userinfo: { id_persona },
    } = useSelector((state: AuthSlice) => state.auth);


    const fetch_Actualizar_archivo_digital = async () => {
        try {
            const url = `recaudo/configuracion_referencia/referencia/crear/`;

            // Crear un objeto FormData
            const formData = new FormData();

            // Agregar los campos necesarios al objeto FormData
            formData.append('id_persona', id_persona.toString()); // Corregido el nombre del campo
            formData.append('fecha_actual', FechaElaboracion); // Corregido el nombre del campo
            formData.append('archivo', liquidacionState.archivo); // Suponiendo que 'form.archivo' contiene el archivo que deseas enviar

            // Enviar la solicitud POST
            const respuesta = await api.post(url, formData);

            // Manejar la respuesta aquí
            if (respuesta && respuesta.data) {
                // La solicitud fue exitosa
                console.log("Respuesta:", respuesta.data);
                // Agregar cualquier manejo de éxito adicional aquí
            } else {
                // La solicitud falló
                console.error('Error en la solicitud:', respuesta ? respuesta.statusText : 'Response undefined');
            }
        } catch (error: any) {
            // Manejar la excepción aquí
            control_error(error.response?.data?.detail || 'Error desconocido, revisa que estés enviando todos los campos');
        }
    };







    return (
        <>
            <Button
                style={{ marginTop: 15, backgroundColor: "green", color: "white", width: "95%" }}
                color="success" // Cambia el color según si es una actualización o creación
                fullWidth
                variant="contained"
                startIcon={<ReceiptIcon />} // Icono para generar liquidación
                onClick={openModal}
            >
                Generar Liquidacion
            </Button>


            <Dialog open={isModalOpen} onClose={closeModal} fullWidth maxWidth="sm" PaperComponent={Paper} scroll="body">
                <Grid container spacing={0} justifyContent="center" alignItems="center">
                    <Grid item xs={12}>
                        <Typography variant="h6" style={{ textAlign: "center" }}>
                            <span style={{ fontWeight: "bold", color: "#333" }}>Usuario:</span> Nombre de ejemplo
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" style={{ textAlign: "center" }}>
                            <span style={{ fontWeight: "bold", color: "#333" }}>Expediente:</span> 123456789
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" style={{ textAlign: "center" }}>
                            <span style={{ fontWeight: "bold", color: "#333" }}>Radicado:</span> 123456789
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" style={{ textAlign: "center" }}>
                            <span style={{ fontWeight: "bold", color: "#333" }}>Proceso:</span> 23
                        </Typography>
                    </Grid>

                    <Button
                        variant="outlined"
                        color="error"
                        startIcon={<CancelIcon />}
                        style={{ width: 150, margin: 7, color: "white", backgroundColor: "red" }}
                        onClick={fetch_Actualizar_archivo_digital}
                    >
                        Cerrar 222
                    </Button>

                    <Grid container alignItems="center" justifyContent="center">
                        <Button
                            variant="outlined"
                            color="error"
                            startIcon={<CancelIcon />}
                            style={{ width: 150, margin: 7, color: "white", backgroundColor: "red" }}
                            onClick={closeModal}
                        >
                            Cerrar
                        </Button>
                    </Grid>
                </Grid >
            </Dialog >

        </>
    );
};
