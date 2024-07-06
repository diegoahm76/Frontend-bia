/* eslint-disable @typescript-eslint/naming-convention */
import { Button, FormControl, Grid, InputLabel, MenuItem, Dialog, Select, TextField, FormControlLabel, Switch } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import CleanIcon from '@mui/icons-material/CleaningServices';
import SearchIcon from '@mui/icons-material/Search';
import { Title } from "../../../../../../components/Title";
import { api } from "../../../../../../api/axios";
import { MetadatosContexIndexacionDocumentos } from "../Context/MetadatosContexIndexacionDocumentos";
import { form_initial } from "../../interfaces/InterfacesIndexacion";

interface ISubEtapas {
    id: number;
    orden: string;
    categoria: string;
}

interface IConceptosContables {
    id: number;
    codigo_contable: string;
    descripcion: string;
}


interface IEtapasDeProceso {
    id: number;
    etapa: string;
    descripcion: string;
}

interface ITiposAtributos {
    id: number;
    tipo: string;
    notificacion: string;
}

interface IRangosEdad {
    id: number;
    rango: string;
    descripcion: string;
}

export const ModalMetadatos = () => {



    const { formValues, setFormValues } = useContext(MetadatosContexIndexacionDocumentos);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rangosEdad, setRangosEdad] = useState<IRangosEdad[]>([]);
    const [subEtapas, setSubEtapas] = useState<ISubEtapas[]>([]);
    const [etapasDeProceso, setEtapasDeProceso] = useState<IEtapasDeProceso[]>([]);
    const [conceptosContables, setConceptosContables] = useState<IConceptosContables[]>([]);
    const [tiposAtributos, setTiposAtributos] = useState<ITiposAtributos[]>([]);



    console.log("formValues", formValues);




    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setFormValues({
            ...formValues,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    const fetchDataGet = async (): Promise<void> => {
        try {
            const url = `/recaudo/cobros/conceptos-contables/`;
            const res: any = await api.get(url);
            const consulta: IConceptosContables[] = res.data.data;
            setConceptosContables(consulta);
        } catch (error) {
            console.error(error);
        }
    };


    const fetchEtapasDeProceso = async (): Promise<void> => {
        try {
            const url = '/recaudo/cobros/etapas-proceso/';
            const res: any = await api.get(url);
            const consulta: IEtapasDeProceso[] = res.data.data;
            setEtapasDeProceso(consulta);
        } catch (error) {
            console.error(error);
        }
    };


    const fetchTiposAtributos = async (): Promise<void> => {
        try {
            const url = '/recaudo/cobros/tipos-atributos/';
            const res: any = await api.get(url);
            const consulta: ITiposAtributos[] = res.data.data;
            setTiposAtributos(consulta);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchRangosEdad = async (): Promise<void> => {
        try {
            const url = '/recaudo/cobros/rangos-edad/';
            const res: any = await api.get(url);
            const consulta: IRangosEdad[] = res.data.data;
            setRangosEdad(consulta);
        } catch (error) {
            console.error(error);
        }
    };


    const fetchSubEtapas = async (): Promise<void> => {
        try {
            const url = `/recaudo/cobros/sub-etapas/${formValues.id_etapa}/`;
            const res: any = await api.get(url);
            const consulta: ISubEtapas[] = res.data.data;
            setSubEtapas(consulta);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchSubEtapas();
    }, [formValues.id_etapa]);


    useEffect(() => {
        fetchEtapasDeProceso();
        fetchDataGet();
        fetchTiposAtributos();
        fetchRangosEdad();
        fetchSubEtapas();
    }, []);


    useEffect(() => {
        if (formValues.agregar_documento === true) {
            openModal();
        }
    }, [formValues.agregar_documento]);


    return (
        <>
            <Grid container spacing={0} justifyContent="center" alignItems="center">

                <Grid item >
                    <FormControlLabel
                        control={
                            <Switch
                                checked={formValues.agregar_documento}
                                onChange={handleChange}
                                name="agregar_documento"
                                color="primary"
                            />
                        }
                        label="Agregar Documentos"
                    // style={{ width: "90%", marginTop: 15 }}
                    />
                </Grid>
            </Grid>

            <Dialog open={isModalOpen} fullWidth maxWidth="md">
                <Grid
                    spacing={2}
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
                        <Title title="Detalle Archivado" />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormControl size='small' fullWidth>
                            <InputLabel>Concepto Contable</InputLabel>
                            <Select
                                label="Concepto Contable"
                                value={formValues.id_codigo_contable}
                                onChange={handleChange}
                                name="id_codigo_contable"
                            >
                                {conceptosContables.map((m) => (
                                    <MenuItem key={m.id} value={m.id}>
                                        {`${m.descripcion} - ${m.codigo_contable}`}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormControl size='small' fullWidth>
                            <InputLabel>Etapa de Proceso</InputLabel>
                            <Select
                                label="Etapa de Proceso"
                                value={formValues.id_etapa}
                                onChange={handleChange}
                                name="id_etapa"
                            >
                                {etapasDeProceso.map((m) => (
                                    <MenuItem key={m.id} value={m.id}>
                                        {`${m.descripcion} - ${m.etapa}`}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>


                    <Grid item xs={12} sm={6}>
                        <FormControl size='small' fullWidth>
                            <InputLabel>Sub Etapas</InputLabel>
                            <Select
                                label="Sub Etapas"
                                value={formValues.subEtapas}
                                onChange={handleChange}
                                name="subEtapas"
                            >
                                {subEtapas.map((m) => (
                                    <MenuItem key={m.id} value={m.id}>
                                        {`${m.categoria} - ${m.orden}`}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>





                    <Grid item xs={12} sm={6}>
                        <FormControl size='small' fullWidth>
                            <InputLabel>Tipo de Atributo</InputLabel>
                            <Select
                                label="Tipo de Atributo"
                                value={formValues.id_tipo_atributo}
                                onChange={handleChange}
                                name="id_tipo_atributo"
                            >
                                {tiposAtributos.map((m) => (
                                    <MenuItem key={m.id} value={m.id}>
                                        {`${m.tipo} - ${m.notificacion}`}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormControl size='small' fullWidth>
                            <InputLabel>Rango de Edad</InputLabel>
                            <Select
                                label="Rango de Edad"
                                value={formValues.id_rango_edad}
                                onChange={handleChange}
                                name="id_rango_edad"
                            >
                                {rangosEdad.map((m) => (
                                    <MenuItem key={m.id} value={m.id}>
                                        {`${m.descripcion} - ${m.rango}`}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>



                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="nombre"
                            size='small'
                            variant="outlined"
                            name="nombre"
                            fullWidth
                            value={formValues.nombre}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Valor"
                            variant="outlined"
                            size='small'
                            fullWidth
                            name="valor"
                            type="number"
                            value={formValues.valor}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Tipo de Texto"
                            variant="outlined"
                            size='small'
                            name="tipoTexto"
                            fullWidth
                            value={formValues.tipoTexto}
                            onChange={handleChange}
                        />
                    </Grid>


                    <Grid container justifyContent="flex-end" spacing={2}>
                        <Grid item xs={12} sm={4} md={2.4} lg={1.9}>
                            <Button color='primary' onClick={() => setFormValues(form_initial)} style={{ width: "90%", marginTop: 15 }} variant="outlined" fullWidth startIcon={<CleanIcon />}>
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
                                Guardar y Cerrar
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>
        </>
    );
};
