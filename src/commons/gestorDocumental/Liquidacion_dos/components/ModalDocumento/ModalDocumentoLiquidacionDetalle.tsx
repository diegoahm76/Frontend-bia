/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState, useEffect, useContext } from "react";
import { Grid, FormControl, InputLabel, MenuItem, Select, FormHelperText, Dialog, TextField } from "@mui/material";
import { api } from "../../../../../api/axios";
import { BuscadorPerzonasStiven } from "../../../WorkFlowPQRSDF/components/BuscadorPersonaPersonalizado/BuscadorPerzonas";
import { PreciosContext } from "../../context/PersonalContext";
import { control_error, control_success } from "../../../../seguridad/components/SucursalEntidad/utils/control_error_or_success";
import { useNavigate } from "react-router-dom";
import { Title } from "../../../../../components/Title";

// Definición de la interfaz Persona
export interface Persona {
    id_persona: number;
    primer_nombre: string;
    segundo_nombre: string;
    primer_apellido: string;
    segundo_apellido: string;
}

export const ModalDocumentoLiquidacionDetalle = () => {
    // Estado para almacenar las opciones de tipo de pago
    const [dataChoise, setDataChoise] = useState<any[]>([]);
    
    // Estado para el formulario de tipo de pago
    const [form_tipo, set_tipo] = useState({ id_expediente: '' });
    
    // Estado para almacenar la información de la persona seleccionada
    const [persona, set_persona] = useState<Persona | undefined>();
    
    // Contexto para manejar el formulario y precios
    const { form, setForm, precios } = useContext(PreciosContext);
    const navigate = useNavigate();

    // Concatenar descripciones de precios para el pago
    const descripcionConcatenada = precios.map(precio => `Servicio de ${precio.descripcion}`).join(',');

    // Función para iniciar el pago
    const iniciarpago = async () => {
        try {
            const url = '/recaudo/pagos/iniciar/';
            const postData = {
                "descripcion_pago": descripcionConcatenada,
                "email": "zona@prueba.com.co",
                "id_persona_pago": 1,
                "id_cliente": "123456789",
                "tipo_id": 1,
                "nombre_cliente": "Cormacarena",
                "apellido_cliente": "Pruebas",
                "telefono_cliente": "123456789",
                "id_liquidacion": 16
            };
            const res = await api.post(url, postData);
            const numeroConsulta = res.data && res.data.data;
            window.location.href = numeroConsulta?.redirect_url;
            control_success("Se creó correctamente");
        } catch (error: any) {
            control_error(error.response.data.detail);
        }
    };

    // Función para obtener los datos de las opciones de pago
    const fetchDatosChoises = async (): Promise<void> => {
        try {
            const url = '/recaudo/choices/pagos-tipo-id/';
            const res = await api.get(url); // Utiliza Axios para realizar la solicitud GET
            const dataConsulta = res.data.data;
            setDataChoise(dataConsulta);
        } catch (error) {
            console.error(error);
        }
    };

    // Manejadores de cambio para los selectores de formulario
    const handleSelectChange = (event: any) => {
        set_tipo({ ...form_tipo, [event.target.name || '']: event.target.value as string });
    };

    const handleSelectChangeBasico = (event: any) => {
        setForm({ ...form, [event.target.name || '']: event.target.value as string });
    };

    // Concatenar nombres y apellidos de la persona seleccionada
    const { primer_nombre, segundo_nombre, primer_apellido, segundo_apellido } = persona ?? {};
    const nombres_concatenados = `${primer_nombre ?? ''} ${segundo_nombre ?? ''}`;
    const apellidos_concatenados = `${primer_apellido ?? ''} ${segundo_apellido ?? ''}`;

    // Función para manejar el resultado de la búsqueda de personas
    const handleResult = async (persona?: Persona): Promise<void> => {
        if (persona) {
            set_persona(persona);
        } else {
            console.log("No se seleccionó ninguna persona.");
        }
    };

    // Obtener datos de opciones de pago al montar el componente
    useEffect(() => {
        fetchDatosChoises();
    }, []);

    // Estilo para el botón de pago
    const button_style = {
        marginTop: '15px',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    return (
        <>
            <Grid container alignItems="center" justifyContent="center">
                <Grid item xs={12}>
                    <Title title="Iniciar Pago PSE"></Title>
                </Grid>

                <Grid item xs={6} style={{ marginTop: 15 }}>
                    <FormControl size="small" fullWidth>
                        <InputLabel>Tipo Pago</InputLabel>
                        <Select
                            label='Expediente'
                            name="id_expediente"
                            value={form_tipo.id_expediente}
                            onChange={handleSelectChange}
                            variant="standard"
                            MenuProps={{
                                PaperProps: {
                                    style: {
                                        maxHeight: 48 * 4.5, // Ajusta la altura máxima del menú desplegable
                                        width: 100, // Ajusta el ancho del menú desplegable
                                    },
                                },
                            }}
                        >
                            {dataChoise.map((option, index) => (
                                <MenuItem key={option[0]} value={option[0]} style={{ minWidth: 120 }}>
                                    {option[1]}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>Seleccione el Pago</FormHelperText>
                    </FormControl>
                </Grid>
            </Grid>

            <Grid container justifyContent="center">
                <Grid container justifyContent="center" style={{ marginTop: 15 }}>
                    {nombres_concatenados && (
                        <>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    label="Nombre Titular"
                                    value={nombres_concatenados}
                                    disabled
                                    style={{ width: '95%' }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={5}>
                                <TextField
                                    label='Apellido Cliente'
                                    name="apellido_cliente"
                                    value={apellidos_concatenados}
                                    size="small"
                                    style={{ width: '95%' }}
                                    disabled
                                    fullWidth
                                />
                            </Grid>
                        </>
                    )}

                    <Grid item xs={1}>
                        <BuscadorPerzonasStiven onResultt={handleResult} />
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        label='Email'
                        name="Email"
                        value={form.Email}
                        style={{ width: '95%', marginTop: 15 }}
                        size="small"
                        fullWidth
                        onChange={handleSelectChangeBasico}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        label='Teléfono Cliente'
                        name="telefono_cliente"
                        value={form.telefono_cliente}
                        size="small"
                        style={{ width: '95%', marginTop: 15 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                        onChange={handleSelectChangeBasico}
                    />
                </Grid>
            </Grid>

            <Grid container alignItems="center" justifyContent="center">
                <button
                    style={button_style}
                    onClick={iniciarpago}
                >
                    <img style={{ width: 65 }} src="../image/botones/Boton_pse.webp" alt="PSE Button" />
                </button>
            </Grid>
        </>
    );
};
