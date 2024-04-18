/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState, useEffect } from "react";
import { Button, Container, Grid, FormControl, InputLabel, MenuItem, Select, FormHelperText, Dialog } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from '@mui/icons-material/Search';
import { Title } from "../../../../../components/Title";
import { LiquidacionPlantilla } from "../plantillaHtml/Liquidacion";
import { api } from "../../../../../api/axios";

export const ModalDocumentoLiquidacionDetalle = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataChoise, setDataChoise] = useState<any[]>([]);
    const [form, setForm] = useState({ id_expediente: '' }); // Agregar estado para el formulario

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

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
        setForm({ ...form, [event.target.name || '']: event.target.value as string });
    };

    useEffect(() => {
        fetchDatosChoises();
    }, []);

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Button
                        startIcon={<SearchIcon />}
                        fullWidth
                        style={{ width: "90%", marginTop: 15, backgroundColor: "orange" }}
                        variant="contained"
                        onClick={openModal}
                    >
                        Consultar
                    </Button>
                </Grid>

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
                                <Title title="Consultar Años Anteriores" />
                            </Grid>



                            <Grid item xs={4} style={{ marginTop: 15 }}>

                                <FormControl size="small" fullWidth>
                                    <InputLabel>Tipo Pago</InputLabel>
                                    <Select
                                        label='Expediente'
                                        name="id_expediente"
                                        value={form.id_expediente}
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


                            <Grid container alignItems="center" justifyContent="center">
                                <Grid item xs={10}>
                                    <LiquidacionPlantilla />
                                </Grid>
                            </Grid>

                            <Grid item xs={12} sm={4} md={2.4} lg={1.9}>
                                <Button
                                    startIcon={<ClearIcon />}
                                    fullWidth
                                    style={{ width: "90%", marginTop: 15 }}
                                    variant="contained"
                                    color="error"
                                    onClick={closeModal}
                                >
                                    Salir
                                </Button>
                            </Grid>
                        </Grid>
                    </Dialog >
                </Grid>
            </Grid>
        </Container>
    );
};
