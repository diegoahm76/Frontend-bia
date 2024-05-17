/* eslint-disable @typescript-eslint/naming-convention */

import { useContext, useEffect, useState } from "react";
import { Avatar, Button, ButtonGroup, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Tooltip } from "@mui/material";
import CleanIcon from '@mui/icons-material/CleaningServices';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { v4 as uuidv4 } from 'uuid';
import { DataGrid } from "@mui/x-data-grid";
import { PaymentChip, formatDate } from "../../utils/FormatoFecha";
import { Title } from "../../../../../../components";
import { download_xls } from "../../../../../../documentos-descargar/XLS_descargar";
import { download_pdf } from "../../../../../../documentos-descargar/PDF_descargar";
import { api } from "../../../../../../api/axios";
import { RenderDataGrid } from "../../../../tca/Atom/RenderDataGrid/RenderDataGrid";
import { StepperContext } from "../../../context/SteperContext";


interface ItiposSolicitud {
    id_estado_solicitud: number;
    nombre: string;
}

interface SolicitudJuridica {
    id_solicitud_de_juridica: number;
    id_solicitud_tramite: number;
    nombre_proyecto: string;
    radicado: string;
    fecha_radicado: string;
    cod_tipo_operacion_tramite: string;
    tipo_operacion_tramite: string;
    id_expediente: number | null;
    expediente: any | null; // Puedes ajustar el tipo según la estructura real
    pago: boolean;
    id_sucursal_recepcion_fisica: number | null;
    sucursal_recepcion_fisica: any | null; // Puedes ajustar el tipo según la estructura real
    id_persona_solicita_revision: number;
    persona_solicita_revision: string;
    id_estado_solicitud: number;
    estado_solicitud: string;
    cod_estado_tipo_solicitud_juridica: string;
    estado_tipo_solicitud_juridica: string;
}

export const BuscarTramitesProcesoScreen = () => {
    // Estado inicial y funciones para manejar cambios en el formulario
    const initialDataBusqueda = {
        estado: '',
        Radicado: '',
        tiposSolicitud: '',
        NombrePeticionario: '',
        Expediente: '',
        NombreProyecto: '',
        pago: "",
    }

    const [data, set_data] = useState<SolicitudJuridica[]>([]);
    const [form, setForm] = useState(initialDataBusqueda);
    const [choise_tiposSolicitud, set_choise_tiposSolicitud] = useState<ItiposSolicitud[]>([]);
    const { set_id, activeStep, setActiveStep } = useContext(StepperContext);



    const handleInputChange = (field: string, value: string) => {
        setForm({
            ...form,
            [field]: value,
        });
    };


    // Consulta las opciones de tipo de pago
    const choiseTipoPago = async () => {
        try {
            let url = '/gestor/panel_ventanilla/opas/estados_solicitudes/get/';
            const res = await api.get(url);
            const dataConsulta = res.data.data;
            set_choise_tiposSolicitud(dataConsulta);
        } catch (error) {
            console.error(error);
        }
    };

    console.log(data)
    // Consulta las opciones de tipo de pago
    const BusquedaAvanzadaTramitesProceso = async () => {
        try {
            let url = 'gestor/panel_juridica/opas/solicitudes/get/';
            // Construir la URL con los parámetros del formulario
            const queryParams = new URLSearchParams();
            if (form.NombrePeticionario) {
                queryParams.append('id_persona_solicita_revision', form.NombrePeticionario.toString());
            }
            if (form.NombreProyecto) {
                queryParams.append('nombre_proyecto', form.NombreProyecto);
            }
            if (form.Expediente) {
                queryParams.append('expediente', form.Expediente);
            }
            if (form.pago) {

                queryParams.append('pago', form.pago);
            }
            if (form.estado) {
                queryParams.append('id_estado_actual_solicitud', form.estado);
            }
            if (form.Radicado) {
                queryParams.append('radicado', form.Radicado);
            }
            // Agregar los demás parámetros aquí según sea necesario

            // Concatenar los parámetros de la URL
            url += '?' + queryParams.toString();

            // Hacer la solicitud HTTP a la URL construida
            const res = await api.get(url);
            const dataConsulta = res.data.data;
            set_data(dataConsulta);
        } catch (error) {
            console.error(error);
        }
    };

    const procesoVistaTramiete = (params: any) => {
        console.log(params.row, 'vamos al paso 1')
        setActiveStep(activeStep + 1);
        set_id(data[0].id_solicitud_tramite)

    };

    //?  Definición de columnas y datos para el DataGrid
    const columns = [
        { field: "nombre_proyecto", headerName: "Nombre del Proyecto" , width: 500 },
        { field: "radicado", headerName: "Radicado", width: 250},
        {
            field: "fecha_radicado",
            headerName: "Fecha de Radicado",
            renderCell: (params: any) => formatDate(params.value),
            width: 220,
        },
        // { field: "cod_tipo_operacion_tramite", headerName: "Código Tipo Operación Trámite", flex: 1 },
        { field: "tipo_operacion_tramite", headerName: "Tipo Operación Trámite",width: 300 },
        {
            field: "pago",
            headerName: "Pago",
            width: 180,
            renderCell: (params:any) => <PaymentChip paid={params.value} />,
        },
        {
            field: "acciones",
            headerName: "Acciones",
            renderCell: (params: any) => (
                <>
                 <Tooltip title= "Vista proceso trámites">
              <IconButton
                onClick={() => procesoVistaTramiete(params)}
              >
                <Avatar
                  sx={{
                    width: 24,
                    height: 24,
                    background: '#fff',
                    border: '2px solid',
                  }}
                  variant="rounded"
                >
                  <VisibilityIcon
                    sx={{
                      color: 'primary.main',
                      width: '18px',
                      height: '18px',
                    }}
                  />
                </Avatar>
              </IconButton>
            </Tooltip>
                </>
            ),
        },
    ];


    // Limpia el formulario
    const limpiarFormulario = () => {
        setForm(initialDataBusqueda);
    };



    const choicesPago = [
        { value: "true", label: 'Sí' },
        { value: "false", label: 'No' }
    ];


    // Efecto secundario para cargar las opciones al cargar el componente
    useEffect(() => {
        choiseTipoPago();
        // ? se debe quitar búsqueda inicial de los trámites en proceso
        BusquedaAvanzadaTramitesProceso();
    }, []);


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
                    display: 'flex',
                    justifyContent: 'center',
                }}>

                {/* Título */}
                <Grid item xs={12}>
                    <Title title="Buscar Trámites en Proceso" />
                </Grid>

                {/* Campos de búsqueda */}

                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth style={{ marginTop: 30, width: "95%" }}>
                        <InputLabel id="pago-formas-label">Estado</InputLabel>
                        <Select
                            id="demo-simple-select"
                            name="estado"
                            size="small"
                            label="Formas de Pago"
                            value={form.estado}
                            onChange={(e) => handleInputChange("estado", e.target.value)}
                        >
                            {choise_tiposSolicitud.map((item) => (
                                <MenuItem key={item.id_estado_solicitud} value={item.id_estado_solicitud}>
                                    {item.nombre}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>




                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        style={{ marginTop: 30, width: '95%' }}
                        size="small"
                        variant="outlined"
                        value={form.NombrePeticionario}
                        label="Nombre del Peticionario"
                        onChange={(e) => handleInputChange('NombrePeticionario', e.target.value)}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>


                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        style={{ marginTop: 30, width: '95%' }}
                        size="small"
                        variant="outlined"
                        value={form.Radicado}
                        label="Radicado"
                        onChange={(e) => handleInputChange('Radicado', e.target.value)}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>


                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        style={{ marginTop: 15, width: '95%' }}
                        size="small"
                        variant="outlined"
                        value={form.NombreProyecto}
                        label="NombreProyecto"
                        onChange={(e) => handleInputChange('NombreProyecto', e.target.value)}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>


                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        style={{ marginTop: 15, width: '95%' }}
                        size="small"
                        variant="outlined"
                        value={form.Expediente}
                        label="Expediente"
                        onChange={(e) => handleInputChange('Expediente', e.target.value)}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>



                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth style={{ marginTop: 15, width: "95%" }}>
                        <InputLabel id="estado-solicitud-label">Pago</InputLabel>
                        <Select
                            id="demo-simple-select"
                            name="Pago"
                            size="small"
                            label="Pago"
                            value={form.pago}
                            onChange={(e) => handleInputChange("pago", e.target.value)}
                        >
                            {choicesPago.map((item) => (
                                <MenuItem key={item.label} value={item.value}>
                                    {item.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>





                {/* Botones de búsqueda y limpieza */}

                <Grid item xs={12} sm={4}>
                    <Button
                        style={{ width: '90%', marginTop: 32, }}
                        variant="contained"
                        startIcon={<SearchIcon />}
                        color="primary"
                        onClick={BusquedaAvanzadaTramitesProceso}
                        fullWidth
                    >
                        Buscar
                    </Button>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Button
                        color="primary"
                        style={{ width: '90%', marginTop: 32, marginBottom: '2.8rem'  }}
                        variant="outlined"
                        onClick={limpiarFormulario}
                        fullWidth
                        startIcon={<CleanIcon />}
                    >
                        Limpiar campos
                    </Button>
                </Grid>


                {/* DataGrid */}

                <RenderDataGrid
                    title="Resultados de la búsqueda"
                    columns={columns || []}
                    rows={data || []}
                />







            </Grid>



        </>
    );
}