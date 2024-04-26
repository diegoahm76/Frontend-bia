/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState, useEffect, useContext } from "react";
import { Button, Grid, TextField } from "@mui/material";
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import CancelIcon from '@mui/icons-material/Cancel';
import { control_error, control_success } from "../../../../alertasgestor/utils/control_error_or_success";
import { api } from "../../../../../../api/axios";
import { Title } from "../../../../../../components/Title";
import { PreciosContext } from "../../../context/PersonalContext";


export const CorreoNotificacinSinPopos = ({ closeModal }: any) => {

    const { usuario } = useContext(PreciosContext)
    
    const data_initial = {
        mostrar_modal: true,
        nombres: usuario.nombres,
        apellidos:usuario.apellidos,
        identificacion:usuario.identificacion,
        telefono: usuario.telefono,
        email: usuario.email,
        nombreCategoria: usuario.nombreCategoria
    };

    const [observacion, set_observacion] = useState('');

    const [etapa_proceso, set_etapa_proceso] = useState(data_initial);




    // const EnviarSolicitudMSM = async () => {
    //     try {
    //         const url = '/hidrico/zonas-hidricas/enviar_sms/';
    //         const postData = {
    //             "telefono": "573126459868",
    //             "mensaje": "Hola, este es un mensaje de prueba."
    //         };
    //         const res = await api.post(url, postData);
    //         const numeroConsulta = res.data.data;
    //         if (res.status === 200) {
    //             control_success("Se Notificó a la persona correctamente");  // Mensaje de éxito
    //         } else {
    //             control_error("Hubo un problema al procesar la solicitud.");
    //         }
    //     } catch (error: any) {
    //         control_error(error.response?.data?.detail);
    //     }

    //     CrearNuevaSubSeccionEmpresa();
    // };


    const CrearNuevaSubSeccionEmpresa = async () => {
        try {
            const url = '/hidrico/zonas-hidricas/enviar_correo/';
            const postData = {
                "correo": "vigoyahector90@gmail.com",
                "nombre": etapa_proceso.nombres,
                "asunto": etapa_proceso.nombreCategoria,
                "mensaje": observacion
            };
            const res = await api.post(url, postData);
            if (res.status === 200) {
                control_success("Se Notificó a la persona correo correctamente");  // Mensaje de éxito
            } else {
                control_error("Hubo un problema al procesar la solicitud.");
            }
        } catch (error: any) {
            control_error(error.response?.data?.detail);
        }
    };


    return (
        <>
            {etapa_proceso.mostrar_modal && (
                <>
                    <Grid
                        container
                        alignItems="center" justifyContent="center"
                        sx={{
                            position: 'relative',
                            background: '#FAFAFA',
                            borderRadius: '15px',
                            p: '20px',
                            mb: '20px',
                            boxShadow: '0px 3px 6px #042F4A26'
                        }}
                    >
                        <Grid item xs={12}>
                            <Title title={`Informacion a Enviar a ${etapa_proceso.nombres} ${etapa_proceso.apellidos}`} />
                        </Grid>
                        <Grid item xs={12}>
                            <p style={{ fontSize: '1.2em', fontWeight: 'bold', color: 'black' }}>
                                Estimado(a) <span style={{ fontSize: '1.5em', fontWeight: 'bold', color: 'darkblue' }}>{etapa_proceso.nombres} {etapa_proceso.apellidos}</span>  Cc {etapa_proceso.identificacion},
                            </p>

                            {etapa_proceso.nombreCategoria && (<> <Grid item xs={5}>
                                <TextField
                                    style={{ width: '95%', marginTop: 10 }}
                                    variant="outlined"
                                    label="Asunto"
                                    fullWidth
                                    name="Asunto"
                                    value={etapa_proceso.nombreCategoria}
                                    disabled
                                />

                            </Grid> </>)}

                            <p>Le informamos que hemos enviado una notificación importante sobre el proceso en el que está involucrado(a).</p>
                            <p>Los detalles de la notificación son los siguientes:</p>
                            <ul>
                                <li><span style={{ fontWeight: 'bold' }}>Numero de Documento a notificar:</span> {etapa_proceso.identificacion}</li>
                                <li><span style={{ fontWeight: 'bold' }}>Número de teléfono a notificar:</span> {etapa_proceso.telefono}</li>
                                <li><span style={{ fontWeight: 'bold' }}>Correo electrónico a notificar:</span> {etapa_proceso.email}</li>
                            </ul>
                            <p>Por favor, revise su teléfono y correo electrónico para obtener más detalles y asegúrese de estar al tanto de los próximos pasos del proceso.</p>


                            <Grid item xs={12}>
                                <TextField
                                    style={{ width: '85%', marginTop: 10, marginLeft: 20, marginRight: 20 }}
                                    variant="outlined"
                                    label="Observacion"
                                    fullWidth
                                    name="Observacion Adicional"
                                    value={observacion}
                                    onChange={(e: any) => set_observacion(e.target.value)}
                                />

                            </Grid>
                            <p>Gracias por su atención.</p>
                        </Grid>

                        <Grid container alignItems="center" justifyContent="center">
                            <Button
                                variant="outlined"
                                // color="error"
                                startIcon={<PermPhoneMsgIcon />}
                                style={{ width: 150, margin: 7 }}
                                // disabled={etapa_proceso.disable}
                                onClick={CrearNuevaSubSeccionEmpresa}
                            >
                                Notificar
                            </Button>

                            <Button
                                variant="outlined"
                                color="error"
                                startIcon={<CancelIcon />}
                                style={{ width: 150, margin: 7 }}
                                onClick={closeModal}
                            >
                                Cancelar
                            </Button>
                        </Grid>
                    </Grid >
                </>)}
        </>
    );
};
