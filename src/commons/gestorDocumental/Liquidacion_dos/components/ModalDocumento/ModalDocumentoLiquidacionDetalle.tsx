/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState, useEffect, useContext } from "react";
import { Button, Container, Grid, FormControl, InputLabel, MenuItem, Select, FormHelperText, Dialog, TextField } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import { Title } from "../../../../../components/Title";
import { api } from "../../../../../api/axios";
import { DescriptionOutlined } from '@mui/icons-material';
import { BuscadorPerzonasStiven } from "../../../WorkFlowPQRSDF/components/BuscadorPersonaPersonalizado/BuscadorPerzonas";
import { Persona } from "../../../WorkFlowPQRSDF/interface/IwordFlow";
import { PreciosContext } from "../../context/PersonalContext";
import PaymentIcon from '@mui/icons-material/Payment';

export const ModalDocumentoLiquidacionDetalle = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataChoise, setDataChoise] = useState<any[]>([]);
    const [form_tipo, set_tipo] = useState({ id_expediente: '' }); // Agregar estado para el formulario
    const [persona, set_persona] = useState<Persona | undefined>();
    const { form, setForm } = useContext(PreciosContext);



    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const iniciarpago=()=>{
        console.log("iniciar pago")
    }

    const fetchDatosChoises = async (): Promise<void> => {
        try {
            const url = '/recaudo/choices/pagos-tipo-id/';
            const res = await api.get(url); // Utiliza Axios para realizar la solicitud GET
            const dataConsulta = res.data.data;
            setDataChoise(dataConsulta);
            // control_success('Datos actualizados correctamente');
        } catch (error) {
            console.error(error);
        }
    };

    const handleSelectChange = (event: any) => {
        set_tipo({ ...form_tipo, [event.target.name || '']: event.target.value as string });
    };
    const handleSelectChangeBasico = (event: any) => {
        setForm({ ...form, [event.target.name || '']: event.target.value as string });
    };


    useEffect(() => {
        fetchDatosChoises();
    }, []);


    const {

        primer_nombre,
        segundo_nombre,
        primer_apellido,
        segundo_apellido,
    } = persona ?? {};
    const nombres_concatenados = `${primer_nombre ?? ''} ${segundo_nombre ?? ''}`;
    const apellidos_concatenados = `${primer_apellido ?? ''} ${segundo_apellido ?? ''}`;



    const handleResult = async (persona?: Persona): Promise<void> => {
        if (persona) {
            // Haz lo que necesites con la información de la persona
            set_persona(persona);

        } else {
            // Manejar el caso en el que la persona es undefined
            console.log("No se seleccionó ninguna persona.");
        }
    };


    return (
        <>

            <Button
                style={{ marginTop: 15, backgroundColor: "green", color: "white" }}
                color="success" // Cambia el color según si es una actualización o creación
                fullWidth
                variant="contained"
                startIcon={<PaymentOutlinedIcon />} // Icono de PDF
                onClick={openModal}
            >
                Iniciar Pago
            </Button>

            <Grid container spacing={2}>


                <Grid item xs={12}>
                    <Dialog open={isModalOpen} fullWidth maxWidth="md">
                        <Grid
                            container
                            sx={{
                                position: 'relative',
                                background: '#FAFAFA',
                                borderRadius: '15px',
                                p: '20px',
                                mb: '20px',
                                boxShadow: '0px 3px 6px #042F4A26',
                            }}
                        >
                            <Grid item xs={12}>
                                <Title title="Tipo Pago" />
                            </Grid>


                            <Grid container alignItems="center" justifyContent="center">

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
                                                        width: 250, // Ajusta el ancho del menú desplegable
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
                                <Grid item xs={12} >
                                    <Grid container alignItems="center" justifyContent="center">
                                        <Title title="Beneficiario" />
                                    </Grid>
                                </Grid>


                                <Grid container justifyContent="center" style={{ marginTop: 15 }}>


                                    {nombres_concatenados && (
                                        <>
                                            <Grid item xs={12} sm={5}>
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
                                                    label='Apeliido Cliente'
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

                                    <Grid item xs={1} >

                                        <BuscadorPerzonasStiven onResultt={handleResult} />
                                    </Grid>

                                </Grid>




                                <Grid item xs={12} sm={4}>
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



                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        label='Telefono Cliente'
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
                                <Grid item xs={12} sm={4} md={2.4} lg={1.9}>
                                    <Button
                                        startIcon={<ClearIcon />}
                                        fullWidth
                                        style={{ width: "90%", marginTop: 15, backgroundColor: "green ", color: "white" }}
                                        variant="contained"
                                        color="error"
                                        onClick={iniciarpago}
                                    >
                                        Iniciar Pago
                                    </Button>
                                </Grid>





                                <Grid item xs={12} sm={4} md={2.4} lg={1.9}>
                                    <Button
                                        startIcon={<PaymentIcon />}
                                        fullWidth
                                        style={{ width: "90%", marginTop: 15, backgroundColor: "red", color: "white" }}
                                        variant="contained"
                                        color="error"
                                        onClick={closeModal}
                                    >
                                        Salir
                                    </Button>
                                </Grid>
                            </Grid>




                        </Grid>
                    </Dialog >
                </Grid>
            </Grid>
        </>
    );
};
