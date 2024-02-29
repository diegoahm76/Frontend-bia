/* eslint-disable @typescript-eslint/naming-convention */

import { useEffect, useState } from "react";
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { RenderDataGrid } from "../../../tca/Atom/RenderDataGrid/RenderDataGrid";
import { api } from "../../../../../api/axios";
import { Title } from "../../../../../components/Title";
import CleanIcon from '@mui/icons-material/CleaningServices';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { VistaCompleta } from "../VIistaCompleta/VistaCompleta";

export const BuscarTramitesProcesoScreen = () => {
    // Estado inicial y funciones para manejar cambios en el formulario
    const initialDataBusqueda = {
        Radicado: '',
        FormaPago: '',
        NombreProyecto: '',
        Expediente: '',
        Estado: '',
    }

    const [form, setForm] = useState(initialDataBusqueda);
    const [choicesPago, setChoicesPago] = useState([{ value: "", label: "" }]);
    const [choicesEstado, setChoicesEstado] = useState([{ value: "", label: "" }]);

    const handleInputChange = (field: string, value: string) => {
        setForm({
            ...form,
            [field]: value,
        });
    };

    // Limpia el formulario
    const limpiarFormulario = () => {
        setForm(initialDataBusqueda);
    };

    // Consulta las opciones de tipo de pago
    const choiseTipoPago = async () => {
        try {
            let url = '/gestor/choices/cod-tipo-consecutivo/';
            const res = await api.get(url);
            const dataConsulta = res.data.data;
            setChoicesPago(dataConsulta);
        } catch (error) {
            console.error(error);
        }
    };

    // Consulta las opciones de estado
    const choiseEstado = async () => {
        try {
            let url = '/gestor/choices/cod-tipo-consecutivo/';
            const res = await api.get(url);
            const dataConsulta = res.data.data;
            setChoicesEstado(dataConsulta);
        } catch (error) {
            console.error(error);
        }
    };

    // Efecto secundario para cargar las opciones al cargar el componente
    useEffect(() => {
        choiseTipoPago();
        choiseEstado();
    }, []);

    // Definición de columnas y datos para el DataGrid
    const columns = [
        { field: "orden_documento", headerName: "Orden de documento", flex: 1 },
        { field: "nombre", headerName: "Nombre", flex: 1 },
        { field: "medio_almacenamiento", headerName: "Medio de almacenamiento", flex: 1 },
        { field: "digitalizacion", headerName: "Digitalización", flex: 1 },
        { field: "observacion", headerName: "Observación", flex: 1 },
        {
            field: "acciones",
            headerName: "Acciones",
            flex: 1,
            renderCell: (params: any) => (
                <>
                    <Button>
                        <VisibilityIcon />
                    </Button>
                    <Button>
                        <EditIcon />
                    </Button>
                    <Button>
                        <DeleteIcon />
                    </Button>
                </>
            ),
        },
    ];

    // Genera datos aleatorios para el DataGrid
    const listadoDeAsignaciones = Array.from({ length: 4 }, (_, index) => ({
        id: index + 1,
        orden_documento: `Orden ${index + 1}`,
        nombre: `Nombre ${index + 1}`,
        medio_almacenamiento: `Medio ${index + 1}`,
        digitalizacion: `Digitalizado ${index + 1}`,
        observacion: `Observación ${index + 1}`,
    }));

    return (
        <>
            <Grid container
                sx={{
                    position: 'relative',
                    background: '#FAFAFA',
                    borderRadius: '15px',
                    p: '20px',
                    mb: '20px',
                    boxShadow: '0px 3px 6px #042F4A26',
                }}>

                {/* Título */}
                <Grid item xs={12}>
                    <Title title="Buscar Trámites en Proceso" />
                </Grid>

                {/* Campos de búsqueda */}
                <Grid item xs={12} sm={5}>
                    <TextField
                        fullWidth
                        style={{ marginTop: 15, width: '90%' }}
                        size="small"
                        variant="outlined"
                        value={form.NombreProyecto}
                        label="Nombre del Proyecto"
                        onChange={(e) => handleInputChange('NombreProyecto', e.target.value)}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        style={{ marginTop: 15, width: '90%' }}
                        size="small"
                        variant="outlined"
                        value={form.Radicado}
                        label="Radicado"
                        onChange={(e) => handleInputChange('Radicado', e.target.value)}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <FormControl fullWidth style={{ marginTop: 15, width: "95%" }}>
                        <InputLabel id="pago-formas-label">Formas de Pago</InputLabel>
                        <Select
                            id="demo-simple-select"
                            name="FormaPago"
                            size="small"
                            label="Formas de Pago"
                            value={form.FormaPago}
                            onChange={(e) => handleInputChange("FormaPago", e.target.value)}
                        >
                            {choicesPago.map((item) => (
                                <MenuItem key={item.value} value={item.value}>
                                    {item.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField
                        fullWidth
                        style={{ marginTop: 15, width: '90%' }}
                        size="small"
                        variant="outlined"
                        value={form.Expediente}
                        label="Expediente"
                        onChange={(e) => handleInputChange('Expediente', e.target.value)}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <FormControl fullWidth style={{ marginTop: 15, width: "95%" }}>
                        <InputLabel id="estado-solicitud-label">Estado</InputLabel>
                        <Select
                            id="demo-simple-select"
                            name="Estado"
                            size="small"
                            label="Estado"
                            value={form.Estado}
                            onChange={(e) => handleInputChange("Estado", e.target.value)}
                        >
                            {choicesEstado.map((item) => (
                                <MenuItem key={item.value} value={item.value}>
                                    {item.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                {/* Botones de búsqueda y limpieza */}
                <Grid item xs={12} sm={3}>
                    <Button
                        style={{ width: '90%', marginTop: 25 }}
                        variant="contained"
                        startIcon={<SearchIcon />}
                        color="primary"
                        fullWidth
                    >
                        Buscar
                    </Button>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Button
                        color="primary"
                        style={{ width: '90%', marginTop: 25 }}
                        variant="outlined"
                        onClick={limpiarFormulario}
                        fullWidth
                        startIcon={<CleanIcon />}
                    >
                        Limpiar
                    </Button>
                </Grid>

                {/* DataGrid */}
                <Grid container alignItems="center" justifyContent="center">
                    <Grid item xs={10}>
                        <RenderDataGrid
                            title="Resultados"
                            columns={columns ?? []}
                            rows={listadoDeAsignaciones ?? []}
                        />
                    </Grid>
                </Grid>

            </Grid>

            <VistaCompleta />
        </>
    );
}