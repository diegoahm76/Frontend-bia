/* eslint-disable @typescript-eslint/naming-convention */
import React, { useContext, useEffect, useState } from "react";
import { Button, Grid, Dialog, Typography, Paper } from "@mui/material";
import ReceiptIcon from '@mui/icons-material/Receipt';
import CancelIcon from '@mui/icons-material/Cancel';
import { control_error } from "../../../../../seguridad/components/SucursalEntidad/utils/control_error_or_success";
import { api } from "../../../../../../api/axios";
import { useSelector } from "react-redux";
import { AuthSlice } from "../../../../../auth/interfaces/authModels";
import { PreciosContext } from "../../../context/PersonalContext";
import { LetraFormatoHumano } from "../../../utils/LetraFormatoHumano";
import { Respuesta } from "../../../interfaces/InterfacesLiquidacion";


export const ModalConfirmacionLiquidacion = () => {
    const { liquidacionState,precios } = useContext(PreciosContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [respuesta, setRespuesta] = useState<Respuesta | null>(null);

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
            const formData = new FormData();
            formData.append('id_persona', id_persona.toString());
            formData.append('fecha_actual', FechaElaboracion);
            formData.append('archivo', liquidacionState.archivo);
            //  formData.append('id_solicitud_tramite', liquidacionState.id_solicitud_tramite);

            const respuesta = await api.post(url, formData);

            if (respuesta && respuesta.data) {
                setRespuesta(respuesta.data.data);
            } else {
                console.error('Error en la solicitud:', respuesta ? respuesta.statusText : 'Response undefined');
            }
        } catch (error: any) {
            control_error(error.response?.data?.detail || 'Error desconocido, revisa que estés enviando todos los campos');
            setRespuesta(null);
        }
    };


    const data_send = {
        "fecha_liquidacion": "2024-04-30",
        "vencimiento": "2023-05-03",
        "periodo_liquidacion": 1,
        "valor": 10000,
        "id_deudor": null,
        "id_expediente": null,
        "ciclo_liquidacion": "test",
        "id_solicitud_tramite": 2069,
        "id_tipo_renta": null,
        "num_liquidacion": null,
        "agno": null,
        "periodo": null,
        "nit": null,
        "fecha": null,
        "valor_liq": null,
        "valor_pagado": null,
        "valor_prescripcion": null,
        "anulado": null,
        "num_resolucion": null,
        "agno_resolucion": null,
        "cod_origen_liq": null,
        "observacion": null,
        "cod_tipo_beneficio": null,
        "fecha_contab": null,
        "se_cobra": null,
        "fecha_en_firme": null,
        "nnum_origen_liq": null
    }

    const nuevoArreglo = precios.map((item, index) => {
        return {
          id_opcion_liq: 1,
          variables: {
            test: item.descripcion
          },
          valor: parseInt(item.valor),
          concepto: item.descripcion
        };
      });

      const blobToBase64 = (blob: Blob) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            if (typeof reader.result === 'string') {
              const base64Data = reader.result.split(',')[1];
              resolve(base64Data);
            } else {
              reject(new Error('Error al leer el archivo'));
            }
          };
          reader.onerror = (error) => {
            reject(error);
          };
        });
      };
      
    const Guardar_Liquidacion = async () => {
        try {
            const base64String = await blobToBase64(liquidacionState.archivo);
            const base64Blob = new Blob([base64String], { type: 'application/pdf' });


            const url = `recaudo/liquidaciones/liquidacion-tramite/`;
            const formData = new FormData();
            formData.append('data_liquidacion', JSON.stringify(data_send));
            formData.append('data_detalles', JSON.stringify(nuevoArreglo));
            formData.append('archivo_liquidacion', base64Blob);

            const respuesta = await api.post(url, formData)
            if (respuesta && respuesta.data) {
                console.log(respuesta)

            } else {
                console.error('Error en la solicitud:', respuesta ? respuesta.statusText : 'Response undefined');
            }
        } catch (error: any) {
            control_error(error.response?.data?.detail || 'Error desconocido, revisa que estés enviando todos los campos');
        }
    };










    useEffect(() => {
        if (isModalOpen) {
            fetch_Actualizar_archivo_digital();
        }
    }, [isModalOpen]);

    const renderContent = () => {
        if (!respuesta) {
            return (
                <Grid container spacing={0} justifyContent="center" alignItems="center">
                    <Typography variant="body1" style={{ textAlign: "center" }}>
                        Cargando...
                    </Typography>
                </Grid>
            );
        }

        if (respuesta) {
            return (
                <>
                    <Grid item xs={12}>
                        <Typography variant="h6" style={{ textAlign: "center" }}>
                            <span style={{ fontWeight: "bold", color: "#333" }}>Usuario:</span> {respuesta.nombre_completo}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" style={{ textAlign: "center" }}>
                            <span style={{ fontWeight: "bold", color: "#333" }}>Expediente:</span> {respuesta.consecutivo}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" style={{ textAlign: "center" }}>
                            <span style={{ fontWeight: "bold", color: "#333" }}>Radicado:</span> {respuesta.radicado_nuevo}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" style={{ textAlign: "center" }}>
                            <span style={{ fontWeight: "bold", color: "#333" }}>Proceso:</span> {respuesta.nro_consecutivo}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" style={{ textAlign: "center" }}>
                            <span style={{ fontWeight: "bold", color: "#333" }}>Fecha:</span> {LetraFormatoHumano(respuesta.fecha_consecutivo)}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" style={{ textAlign: "center" }}>
                            <span style={{ fontWeight: "bold", color: "#333" }}>Documento:</span> {respuesta.numero_documento}
                        </Typography>
                    </Grid>
                </>
            );
        } else {
            return (
                <Grid container spacing={0} justifyContent="center" alignItems="center">
                    <Typography variant="body1" style={{ textAlign: "center" }}>
                        Error al generar la liquidación. Por favor, inténtalo de nuevo.
                    </Typography>
                </Grid>
            );
        }
    };


    return (
        <>
            <Button
                style={{ marginTop: 15, backgroundColor: "green", color: "white", width: "95%" }}
                color="success"
                fullWidth
                variant="contained"
                startIcon={<ReceiptIcon />}
                onClick={openModal}
            >
                Generar Liquidacion
            </Button>

            <Dialog open={isModalOpen} onClose={closeModal} fullWidth maxWidth="sm" PaperComponent={Paper} scroll="body">
                <Grid container spacing={0} justifyContent="center" alignItems="center">
                    {renderContent()}
                    <Grid container alignItems="center" justifyContent="center">

                        <Button onClick={Guardar_Liquidacion}>xxxxx</Button>
                        <Grid item xs={4}>
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
                    </Grid>
                </Grid>
            </Dialog>
        </>
    );
};
