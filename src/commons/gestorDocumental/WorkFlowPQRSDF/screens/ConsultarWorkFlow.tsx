/* eslint-disable @typescript-eslint/naming-convention */
import { Grid, Button, TextField, FormControl, Select, InputLabel, MenuItem } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import { Title } from '../../../../components/Title';
import { ModalFlujoDeTrabajo } from '../components/ModalWorkflow/ModalWorkFLow';
import { api } from '../../../../api/axios';
import { useState, useEffect } from 'react';
import { BuscadorPersona } from '../../ventanilla/registroPersonas/BuscadorPersonaV';
import SearchIcon from '@mui/icons-material/Search';

import CleanIcon from '@mui/icons-material/CleaningServices';

// interface Persona{id_persona: number} 
interface DataTabla {
    "Id_PQRSDF": number;
    "Tipo de Solicitud": string;
    "Tipo de PQRSDF": string;
    "tipo_pqrsdf_descripcion": string;
    "Titular": string;
    "Asunto": string;
    "Radicado": string;
    "Fecha de Radicado": string | null;
    "Persona Que Radicó": string | null;
    "Tiempo Para Respuesta": string | null;
    "Id_estado": number;
    "Estado": string;
    "Ubicacion en la corporacion": string;
    "Documento": string;
    "URL_Documento": string | null;
    "Archivo": {
        "id_archivo_digital": number;
        "nombre_de_Guardado": string;
        "formato": string;
        "tamagno_kb": number;
        "ruta_archivo": string;
        "fecha_creacion_doc": string;
        "es_Doc_elec_archivo": boolean;
    };
}

export const ConsultarWorkFlow = () => {
    // Datos quemados para las columnas y la data
    const columns = [
        { field: "Tipo de PQRSDF", headerName: "Tipo de PQRSDF", flex: 1 },
        { field: "Titular", headerName: "Titular", flex: 1 },
        { field: "Asunto", headerName: "Asunto", flex: 1 },
        { field: "Radicado", headerName: "Radicado", flex: 1 },
        { field: "Fecha de Radicado", headerName: "Fecha de Radicado", flex: 1 },
        { field: "Persona Que Radicó", headerName: "Persona que Radicó", flex: 1 },
        { field: "Tiempo Para Respuesta", headerName: "Tiempo Para Respuesta", flex: 1 },
        { field: "Estado", headerName: "Estado", flex: 1 },
        {
            field: 'acciones',
            headerName: 'Acciones',
            width: 150,
            renderCell: () => <ModalFlujoDeTrabajo />,
        },
    ];





    const initialData: DataTabla[] = [{
        "Id_PQRSDF": 0,
        "Tipo de Solicitud": "",
        "Tipo de PQRSDF": "",
        "tipo_pqrsdf_descripcion": "",
        "Titular": "",
        "Asunto": "",
        "Radicado": "",
        "Fecha de Radicado": null,
        "Persona Que Radicó": null,
        "Tiempo Para Respuesta": null,
        "Id_estado": 0,
        "Estado": "",
        "Ubicacion en la corporacion": "",
        "Documento": "",
        "URL_Documento": null,
        "Archivo": {
            "id_archivo_digital": 0,
            "nombre_de_Guardado": "",
            "formato": "",
            "tamagno_kb": 0,
            "ruta_archivo": "",
            "fecha_creacion_doc": "",
            "es_Doc_elec_archivo": false,
        },
    }];

    const [data_table, set_data_tabla] = useState<DataTabla[]>(initialData);

    const initial_form = {
        tipoPqrsdf: "",
        nombreTitular: "",
        Radicado: "",
        fecha_desde: "",
        fecha_hasta: "",
        estado_solicitud: "",

    }

    const [form, setForm] = useState(initial_form);
    console.log("form", form)
    const handleInputChange = (field: any, value: any) => {
        setForm({
            ...form,
            [field]: value,
        });
    };

    const Peticion_Busqueda_Avanzada = async (): Promise<void> => {
        try {
            let url = "/gestor/pqr/consulta-estado-pqrsdf/";

            url += `?tipo_pqrsdf=${form.tipoPqrsdf}`;
            url += `&nombre_titular=${form.nombreTitular}`;
            url += `&radicado=${form.Radicado}`;
            url += `&fecha_radicado_desde=${form.fecha_desde}`;
            url += `&fecha_radicado_hasta=${form.fecha_hasta}`;
            url += `&estado_solicitud=${form.estado_solicitud}`;

            const res = await api.get(url);
            const Data_consulta = res.data.data;
            set_data_tabla(Data_consulta);
        } catch (error) {
            console.error(error);
        }
    };

    const [choise_estado_data, set_choise_estado_data] = useState([]);
    const [choise_tipo_persona_data, set_choise_tipo_persona_data] = useState([]);

    const choise_tipo = async (): Promise<void> => {
        try {
            let url = "/gestor/choices/tipo-pqrsdf/";
            const res = await api.get(url);
            const Data_consulta = res.data;
            set_choise_tipo_persona_data(Data_consulta);
        } catch (error) {
            console.error(error);
        }
    };

    const choise_estado = async (): Promise<void> => {
        try {
            let url = "/gestor/choices/estado-solicitud-pqrsdf/";
            const res = await api.get(url);
            const Data_consulta = res.data;
            set_choise_estado_data(Data_consulta);
        } catch (error) {
            console.error(error);
        }
    };

    const limpiar_formulario = () => {

        setForm(initial_form)
    }


    useEffect(() => {
        Peticion_Busqueda_Avanzada()
        choise_tipo()
        choise_estado()
    }, [])

    const [persona, set_persona] = useState<{ id_persona: number }>();
    console.log("persona", persona?.id_persona)
    const on_result = async (info_persona: { id_persona: number }): Promise<void> => {
        set_persona(info_persona);
    }


    return (
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
                <Grid item xs={12} >
                    <Title title="Consultar WorkFlow de una solicitud PQRSDF" />
                </Grid>


                <Grid item xs={3}>
                    <FormControl fullWidth style={{ marginTop: 15, width: "90%" }}>
                        <InputLabel id="tipo-pqrsdf-label">Tipo de PQRSDF</InputLabel>
                        <Select
                            id="demo-simple-select"
                            name="tipoPqrsdf"
                            size="small"
                            label="Tipo de PQRSDF"
                            value={form.tipoPqrsdf}
                            onChange={(e) => handleInputChange("tipoPqrsdf", e.target.value)}
                        >
                            {choise_tipo_persona_data && choise_tipo_persona_data.map((item: string[]) => (
                                <MenuItem key={item[0]} value={item[0]}>
                                    {item[1]}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>


                <Grid item xs={12} sm={2}>
                    <TextField
                        fullWidth
                        style={{ marginTop: 15, width: "90%" }}
                        type="date"
                        size="small"
                        variant="outlined"
                        value={form.fecha_desde}
                        label=" Fecha desde "
                        onChange={(e) => handleInputChange("fecha_desde", e.target.value)}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>




                <Grid item xs={12} sm={3}>
                    <TextField
                        fullWidth
                        type="date"
                        size="small"
                        variant="outlined"
                        value={form.fecha_hasta}
                        label=" Fecha hasta"
                        onChange={(e) => handleInputChange("fecha_hasta", e.target.value)}
                        style={{ marginTop: 15, width: "90%" }} InputLabelProps={{ shrink: true }}
                    />
                </Grid>









                <Grid item xs={3}>
                    <FormControl fullWidth style={{ marginTop: 15, width: "100%" }}>
                        <InputLabel id="estado-solicitud-label">Estado Solicitud</InputLabel>
                        <Select
                            id="demo-simple-select"
                            name="estado_solicitud"
                            size="small"
                            label="Estado Solicitud"
                            value={form.estado_solicitud}
                            onChange={(e) => handleInputChange("estado_solicitud", e.target.value)}
                        >
                            {choise_estado_data.map((item: string[]) => (
                                <MenuItem key={item[0]} value={item[0]}>
                                    {item[1]}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>




                <Grid item xs={7}>
                    <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        label="Nombre Titular"
                        value={form.nombreTitular}
                        onChange={(e) => handleInputChange("nombreTitular", e.target.value)}
                        style={{ marginTop: 15, width: "95%" }}
                    />
                </Grid>




                <Grid item xs={4} >
                    <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        label="Radicado"
                        value={form.Radicado}
                        onChange={(e) => handleInputChange("Radicado", e.target.value)}
                        style={{ marginTop: 15, width: "100%" }}
                    />
                </Grid>

                <Grid item xs={11} style={{marginTop:-5}}  >

                    <BuscadorPersona
                        onResult={(data) => {
                            void on_result(data);
                        }}
                    />

                </Grid>



                <Grid item xs={12} sm={4} md={2.4} lg={1.9}>
                    <Button
                        style={{  width: "90%" }}
                        variant="contained"
                        startIcon={<SearchIcon />}
                        color='success'
                        fullWidth
                        onClick={Peticion_Busqueda_Avanzada}
                    >
                        Buscar
                    </Button>
                </Grid>


                <Grid item xs={12} sm={4} md={2.4} lg={1.9}>
                    <Button color='primary' style={{ width: "90%" }} variant="outlined" onClick={limpiar_formulario} fullWidth startIcon={<CleanIcon />}>
                        Limpiar
                    </Button>
                </Grid>




                <Grid item xs={12} style={{ marginTop: 10 }}>
                    <DataGrid
                        density="compact"
                        autoHeight
                        columns={columns}
                        rows={data_table || []}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        getRowId={() => uuidv4()}
                    />
                </Grid>
            </Grid>
        </>
    );
};
