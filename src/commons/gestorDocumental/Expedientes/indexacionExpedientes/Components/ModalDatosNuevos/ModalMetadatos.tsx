/* eslint-disable @typescript-eslint/naming-convention */
import { Button, FormControl, Grid, InputLabel, MenuItem, Dialog, Select, Tooltip, TextField } from "@mui/material";
import { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import CleanIcon from '@mui/icons-material/CleaningServices';
import SearchIcon from '@mui/icons-material/Search';
import { Title } from "../../../../../../components/Title";

export const ModalMetadatos = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formValues, setFormValues] = useState({
        id_rango: '',
        id_codigo_contable: '',
        nombre: '',
        monto_inicial: '',
        tipo_cobro: '',
        id_etapa: '',
        id_subestapa: '',
        id_tipo: ''
    });

    const handleChange = (e:any) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const form = (
        <>
            <Grid item xs={12} sm={6}>
                <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    label="ID Rango"
                    name="id_rango"
                    value={formValues.id_rango}
                    onChange={handleChange}
                    style={{ marginTop: 15 }}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    label="ID Código Contable"
                    name="id_codigo_contable"
                    value={formValues.id_codigo_contable}
                    onChange={handleChange}
                    style={{ marginTop: 15 }}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    label="Nombre"
                    name="nombre"
                    value={formValues.nombre}
                    onChange={handleChange}
                    style={{ marginTop: 15 }}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    label="Monto Inicial"
                    name="monto_inicial"
                    value={formValues.monto_inicial}
                    onChange={handleChange}
                    style={{ marginTop: 15 }}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    label="Tipo Cobro"
                    name="tipo_cobro"
                    value={formValues.tipo_cobro}
                    onChange={handleChange}
                    style={{ marginTop: 15 }}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    label="ID Etapa"
                    name="id_etapa"
                    value={formValues.id_etapa}
                    onChange={handleChange}
                    style={{ marginTop: 15 }}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    label="ID Subetapa"
                    name="id_subestapa"
                    value={formValues.id_subestapa}
                    onChange={handleChange}
                    style={{ marginTop: 15 }}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    label="ID Tipo"
                    name="id_tipo"
                    value={formValues.id_tipo}
                    onChange={handleChange}
                    style={{ marginTop: 15 }}
                />
            </Grid>
        </>
    );

    return (
        <>
            <Grid item xs={12}>
                <Button
                    startIcon={<SearchIcon />}
                    fullWidth
                    style={{ width: "90%", marginTop: 15, backgroundColor: "orange" }}
                    variant="contained"
                    onClick={openModal}
                >
                    Mas Datos
                </Button>
            </Grid>

            <Dialog open={isModalOpen} fullWidth maxWidth="md">
                <>
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
                            <Title title="Mas datos" />
                        </Grid>
                        
                        {form}

                        <Grid item xs={12} sm={4} md={2.4} lg={1.9}>
                            <Button color='primary' style={{ width: "90%", marginTop: 15 }} variant="outlined" fullWidth startIcon={<CleanIcon />}>
                                Limpiar
                            </Button>
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
                </>
            </Dialog>
        </>
    );
};
