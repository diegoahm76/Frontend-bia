/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState, useEffect } from 'react';
import { Grid, Button, TextField, FormControl, Select, InputLabel, MenuItem, ButtonGroup } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import { Title } from '../../../../components/Title';
import { ModalFlujoDeTrabajo } from '../components/ModalWorkflow/ModalWorkFLow';
import { api } from '../../../../api/axios';
import { BuscadorPersona } from '../../ventanilla/registroPersonas/BuscadorPersonaV';
import SearchIcon from '@mui/icons-material/Search';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import { DataTabla, Persona, initialData, initial_form } from '../interface/IwordFlow';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { BuscadorPerzonasStiven } from '../components/BuscadorPersonaPersonalizado/BuscadorPerzonas';

export const ConsultarWorkFlow = () => {
    const [data_table, set_data_tabla] = useState<DataTabla[]>(initialData);
    const [form, setForm] = useState(initial_form);
    const [choise_estado_data, set_choise_estado_data] = useState([]);
    const [choise_tipo_persona_data, set_choise_tipo_persona_data] = useState([]);
    const [persona, set_persona] = useState<Persona | undefined>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState<any>(null);

    const handleInputChange = (field: any, value: any) => {
        setForm({
            ...form,
            [field]: value,
        });
    };

    const {
        id_persona,
        primer_nombre,
        segundo_nombre,
        primer_apellido,
        segundo_apellido,
    } = persona ?? {};
    const nombre_completo = `${primer_nombre ?? ''} ${segundo_nombre ?? ''} ${primer_apellido ?? ''} ${segundo_apellido ?? ''}`;
    const nombre = nombre_completo ?? '';

    const handleOpenModal = (rowData: any) => {
        setModalData(rowData.Id_PQRSDF);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const columns = [
        { field: 'tipo_pqrsdf_descripcion', headerName: 'Tipo pqrsdf', flex: 1 },
        { field: 'Titular', headerName: 'Titular', flex: 1 },
        { field: 'Asunto', headerName: 'Asunto', flex: 1 },
        { field: 'Radicado', headerName: 'Radicado', flex: 1 },
        {
            field: 'Fecha de Radicado',
            headerName: 'Fecha de Radicado',
            flex: 1,
            renderCell: (params: any) => (
                <span>
                    {new Date(params.value).toLocaleDateString()}
                    {/* {' '} */}
                    {/* {new Date(params.value).toLocaleTimeString()} */}
                </span>
            ),
        }, { field: 'Persona Que Radicó', headerName: 'Persona que Radicó', flex: 1 },
        { field: 'Tiempo Para Respuesta', headerName: 'Tiempo Para Respuesta', flex: 1 },
        { field: 'Estado', headerName: 'Estado', flex: 1 },
        {
            field: 'acciones',
            headerName: 'Acciones',
            width: 150,
            renderCell: (params: any) => (
                <AccountTreeIcon onClick={() => handleOpenModal(params.row)}></AccountTreeIcon>
            ),
        },
    ];

    const Peticion_Busqueda_Avanzada = async (): Promise<void> => {
        try {
            let url = '/gestor/pqr/consulta-estado-pqrsdf/';
            url += `?tipo_pqrsdf=${form.tipoPqrsdf}`;
            url += `&nombre_titular=${id_persona}`;
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

    const choise_tipo = async (): Promise<void> => {
        try {
            let url = '/gestor/choices/tipo-pqrsdf/';
            const res = await api.get(url);
            const Data_consulta = res.data;
            set_choise_tipo_persona_data(Data_consulta);
        } catch (error) {
            console.error(error);
        }
    };

    const choise_estado = async (): Promise<void> => {
        try {
            let url = '/gestor/choices/estado-solicitud-pqrsdf/';
            const res = await api.get(url);
            const Data_consulta = res.data;
            set_choise_estado_data(Data_consulta);
        } catch (error) {
            console.error(error);
        }
    };

    const limpiar_formulario = () => {
        setForm(initial_form);
    };

    useEffect(() => {
        Peticion_Busqueda_Avanzada();
        choise_tipo();
        choise_estado();
    }, []);

    const on_result = async (info_persona: Persona): Promise<void> => {
        set_persona(info_persona);
    };
    // const handleResult = async (persona?: Persona): Promise<void> => {
    //     if (persona) {
    //         // Haz lo que necesites con la información de la persona
    //         set_persona(persona);

    //     } else {
    //         // Manejar el caso en el que la persona es undefined
    //         console.log("No se seleccionó ninguna persona.");
    //     }
    // };


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




                <Grid item xs={12} sm={2}>
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


                <Grid item xs={2} >
                    <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        label="Radicado"
                        value={form.Radicado}
                        onChange={(e) => handleInputChange("Radicado", e.target.value)}
                        style={{ marginTop: 15, width: "90%" }}
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
                                <MenuItem key={item[0]} value={item[1]}>
                                    {item[1]}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>


                <Grid item xs={3}>
                    <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        label="Nombre Titular"
                        value={nombre}
                        disabled
                        style={{ marginTop: 25, width: "95%" }}
                    />
                </Grid>

                <Grid item xs={9} style={{ marginTop: 25 }}  >

                    <BuscadorPersona
                        onResult={(data) => {
                            void on_result(data);
                        }}
                    />
                    {/* <BuscadorPerzonasStiven onResultt={handleResult} /> */}
                </Grid>




                <Grid container spacing={2} justifyContent="flex-end">



                    <Grid item xs={12} sm={4} md={2.4} lg={1.9}>
                        <Button
                            style={{ width: "90%" }}
                            variant="contained"
                            startIcon={<SearchIcon />}
                            color='primary'
                            fullWidth
                            onClick={Peticion_Busqueda_Avanzada}
                        >
                            Buscar
                        </Button>
                    </Grid>

                    <Grid item xs={12} sm={4} md={2.4} lg={1.9}>
                        <Button
                            color='primary'
                            style={{ width: "90%" }}
                            variant="outlined"
                            onClick={limpiar_formulario}
                            fullWidth
                            startIcon={<CleanIcon />}
                        >
                            Limpiar
                        </Button>
                    </Grid>

                </Grid>

                <Grid item xs={12} style={{ marginTop: 10 }}>

                    <ButtonGroup
                        style={{ margin: 7, display: 'flex', justifyContent: 'flex-end' }}
                    >
                        {download_xls({ nurseries: data_table, columns })}
                        {download_pdf({
                            nurseries: data_table,
                            columns,
                            title: 'WorkFlow  de una solicitud PQRSDF',
                        })}
                    </ButtonGroup>

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

                {isModalOpen && <ModalFlujoDeTrabajo data={modalData} onClose={handleCloseModal} />}
            </Grid>
        </>
    );
};
