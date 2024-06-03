/* eslint-disable @typescript-eslint/naming-convention */
import React, { useContext, useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Switch from '@mui/material/Switch';
import { Button, Chip, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Tooltip } from '@mui/material';
import { StepperContext } from '../../../context/SteperContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { DownloadButton } from '../../../../../../utils/DownloadButton/DownLoadButton';
import { api } from '../../../../../../api/axios';
import { Title } from '../../../../../../components';
import { RenderDataGrid } from '../../../../tca/Atom/RenderDataGrid/RenderDataGrid';


interface AnexoTramite {
    id_anexo_tramite: number;
    id_solicitud_tramite: number;
    id_permiso_amb_solicitud_tramite: number;
    id_anexo: number;
    nombre: string | null;
    descripcion: string;
    numero_folios: number;
    cod_medio_almacenamiento: string;
    medio_almacenamiento: string;
    id_archivo_digital: number;
    formato: string;
    tamagno_kb: number;
    ruta_archivo: string;
}
// Definición del componente principal ControlledAccordions
export const ControlledAccordions = () => {

    // Estado inicial del formulario de búsqueda
    const initialDataBusqueda = {
        TipoMedio: '',
        folios: '',
        observacion: ''
    }


    const [form, setForm] = useState(initialDataBusqueda);
    const [expanded, setExpanded] = useState<string | false>('panel1');
    const [choicesPago, setChoicesPago] = useState([{ value: "", label: "" }]);
    const [form_data, set_form_data] = useState<AnexoTramite[]>([]);
    const { id, nombre_proyecto, setActiveStep, activeStep, activeDocuments, setActiveDocuments } = useContext(StepperContext);
    console.log(activeDocuments);

    // Función para manejar cambios en los campos de entrada del formulario
    const handleInputChange = (field: string, value: string) => {
        setForm({
            ...form,
            [field]: value,
        });
    };

    // Función para manejar cambios en la expansión de los acordeones
    const handleChange = (panel: string, id: number, name: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);

        // Si el acordeón se está expandiendo, añade el documento a la lista activa
        if (isExpanded) {
            // Si el documento no está en la lista activa, lo añade con observación y aprobación predeterminadas
            if (!activeDocuments.some(doc => doc.name === name)) {
                setActiveDocuments(prevState => [...prevState, { name, observation: '', aprobado: false }]);
            }
        } else {
            // Si el acordeón se está contrayendo, elimina el documento de la lista activa
            setActiveDocuments(prevState => prevState.filter(doc => doc.name !== name));
        }
    };

    // Función para manejar cambios en la observación de un documento
    const handleObservationChange = (name: string, observation: string) => {
        setActiveDocuments(prevState =>
            prevState.map(doc =>
                doc.name === name ? { ...doc, observation } : doc
            )
        );
    };

    // Función para manejar cambios en la aprobación de un documento
    const handleApprovalChange = (name: string, aprobado: boolean) => {
        setActiveDocuments(prevState =>
            prevState.map(doc =>
                doc.name === name ? { ...doc, aprobado } : doc
            )
        );
    };

    // Función para obtener las opciones de pago desde la API
    const choiseTipoPago = async () => {
        try {
            let url = 'gestor/choices/cod-tipo-consecutivo/';
            const res = await api.get(url);
            const dataConsulta = res.data.data;
            setChoicesPago(dataConsulta);
        } catch (error) {
            console.error(error);
        }
    };

    // Efecto para cargar las opciones de pago al montar el componente
    useEffect(() => {
        choiseTipoPago();
    }, []);


    const columns = [
        { field: "formato", headerName: "Formato", flex: 1 },
        { field: "numero_folios", headerName: "Numero de Folios", flex: 1 },
        { field: "descripcion", headerName: "descripcion", flex: 1 },
        {
            field: 'aprobado',
            headerName: 'Aprobado',
            flex:1,
            renderCell: (params: any) => (
                <Chip
                    label={activeDocuments.find(doc => doc.name === params.row.formato)?.aprobado ? 'Aprobado' : 'No aprobado'}
                    color={activeDocuments.find(doc => doc.name === params.row.formato)?.aprobado ? 'success' : 'error'}
                />
            )
        },
        {
            field: 'descargar',
            headerName: 'Ver',
            width: 90,
            renderCell: (params: any) => (
                <Tooltip title="Ver archivo">
                    <Grid item xs={0.5} md={0.5}>
                        <DownloadButton
                            fileUrl={params.row.ruta_archivo}
                            fileName={'exhibit_link'}
                            condition={false}
                        />
                    </Grid>
                </Tooltip>
            )
        }
    ];


    const consulta_informacion_opa = async () => {
        try {
            let url = `tramites/opa/tramites/anexos/get/${id}/`;
            const res = await api.get(url);
            const dataConsulta = res.data.data;
            set_form_data(dataConsulta);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        consulta_informacion_opa();
        choiseTipoPago();
    }, []);



    // Renderización del componente
    return (
        <Grid container
            sx={{
                position: 'relative',
                borderRadius: '15px',
                p: '20px',
                mb: '20px',
                background: "#fff",
                boxShadow: '0px 5px 7px #042F4A26',
            }}>

            <Grid container alignItems="center" justifyContent="center">
                <Grid item xs={10} style={{ marginTop: 10 }}>
                    <RenderDataGrid
                        title="Documentos proporcionados"
                        columns={columns ?? []}
                        rows={form_data ?? []}
                    />
                </Grid>

            </Grid>
            <Grid item xs={12} style={{ marginTop: 15 }}
                sx={{ boxShadow: '0px 5px 7px #042F4A26'}}
            >
                {form_data.map((item: any) => (
                    <Accordion
                        key={item.id_anexo_tramite}
                        expanded={expanded === `panel${item.id_anexo_tramite}`}
                        onChange={handleChange(`panel${item.id_anexo_tramite}`, item.id_anexo_tramite, item.formato)}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel${item.id}bh-descripcion`}
                            id={`panel${item.id}bh-header`}
                        >
                            <Grid item xs={5}>
                                <Typography sx={{ flexShrink: 0 }}>{item.formato}</Typography>
                            </Grid>

                            <Grid item xs={5}>
                                <Typography sx={{ color: 'text.secondary' }}>{item.descripcion}</Typography>
                            </Grid>

                            <Grid item xs={2}>
                                {/* Switch para controlar la aprobación del documento */}
                                <Switch
                                    checked={activeDocuments.find(doc => doc.name === item.formato)?.aprobado || false}
                                    onChange={(e) => handleApprovalChange(item.formato, e.target.checked)}
                                />
                            </Grid>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container>
                                <Grid item xs={4}>
                                    {/* Selector para elegir el tipo de medio */}
                                    <FormControl fullWidth style={{ marginTop: 15, width: "95%" }}>
                                        <InputLabel id="pago-formas-label">Tipo de Medio</InputLabel>
                                        <Select
                                            id="demo-simple-select"
                                            name="TipoMedio"
                                            size="small"
                                            label="Tipo de Medio"
                                            value={form.TipoMedio}
                                            onChange={(e) => handleInputChange("TipoMedio", e.target.value)}
                                        >
                                            {choicesPago.map((item) => (
                                                <MenuItem key={item.value} value={item.value}>
                                                    {item.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={5}>
                                    {/* Campo de texto para el nombre del proyecto */}
                                    <TextField
                                        fullWidth
                                        style={{ marginTop: 15, width: '90%' }}
                                        size="small"
                                        variant="outlined"
                                        value={nombre_proyecto}
                                        label="Nombre del Proyecto"
                                        disabled
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid>


                                <Grid item xs={2} style={{ marginTop: 20 }}>
                                    {/* Botón de descarga de archivo */}
                                    <DownloadButton
                                        fileUrl={"aaF"}
                                        fileName={'exhibit_link'}
                                        condition={false}
                                    />
                                </Grid>

                                <Grid item xs={12} >
                                    {/* Campo de texto para la observación */}
                                    <TextField
                                        fullWidth
                                        style={{ marginTop: 15, width: '90%' }}
                                        size="small"
                                        variant="outlined"
                                        label="Observación"
                                        value={activeDocuments.find(doc => doc.name === item.formato)?.observation || ''}
                                        onChange={(e) => handleObservationChange(item.formato, e.target.value)}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Grid>

            <Grid container alignItems="center" justifyContent="center">
                <Grid item xs={12} style={{ marginTop: 25 }} >
                    <Button startIcon={<ArrowForwardIcon />}
                        variant="contained"
                        color='primary'
                        onClick={() => setActiveStep(activeStep + 1)}
                    >
                        Continuar con Revisión
                    </Button>
                </Grid>

            </Grid>


            <Grid container justifyContent="flex-end">
                <Grid item xs={12} sm={4} md={2.4} lg={1.9}>
                    <Button
                        fullWidth
                        style={{ width: "90%", marginTop: 15 }}
                        variant="contained"
                        color="warning"
                        startIcon={<ArrowBackIcon />} // Agrega el icono de flecha hacia atrás
                        onClick={() => {
                            setActiveStep(activeStep - 1);
                        }}
                    >
                        Paso anterior
                    </Button>
                </Grid>
            </Grid>



        </Grid>
    );
};
