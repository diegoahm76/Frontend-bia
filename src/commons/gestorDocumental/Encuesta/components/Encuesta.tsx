/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type React from "react";
import { useEffect, useState } from "react";
import { Title } from "../../../../components";
import SaveIcon from '@mui/icons-material/Save';
import { api, baseURL } from "../../../../api/axios";
import { InputLabel, MenuItem, Select, SelectChangeEvent, } from "@mui/material";
import { Button, FormControl, Grid, TextField } from "@mui/material";
import { ButtonSalir } from "../../../../components/Salir/ButtonSalir";
import { RadioGroup, FormControlLabel, Radio, Typography, } from "@mui/material";
import { Departamento, EncuestaDetalle, Municipios, Paises, miEstilo } from "../interfaces/types";
import { fetch_data_dptos_encuestas, fetch_data_municipio_encuestas, fetch_data_pais_encuestas } from "../services/encuestas.service";

export const Encuesta: React.FC = () => {

    const initialFormData = {
        email: "ichardbejarano29@gmail.com",
        cod_sexo: "H",
        telefono: "4524123",
        rango_edad: "A",
        id_encuesta: 98,
        _id_persona: 277,
        tipo_usuario: "I",
        nombre_completo: "miguel",
        nro_documento_id: "124122",
        id_pais_para_extranjero: "CO",
        id_municipio_para_nacional: "50001",
        id_tipo_documento_usuario: "CC",
        ids_opciones_preguntas_encuesta: []
    };

    const [formData, setFormData] = useState(initialFormData);
    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) => {
        const target = event.target as HTMLInputElement;
        const { name, value } = target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };






    const preguntas = [];
    const [respuestas, setRespuestas] = useState(Array(preguntas.length).fill(""));
    // const handleRespuestaChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const newRespuestas = [...respuestas];
    //     newRespuestas[index] = event.target.value;
    //     setRespuestas(newRespuestas);
    // };
    const [paises, setpaises] = useState<Paises[]>([]);
    useEffect(() => {

        void fetch_data_pais_encuestas({
            setpaises,
            baseURL,
        });
    }, []);
    const [link, set_link] = useState('');
    const [selected_pais, setselected_pais] = useState('');

    useEffect(() => {
        set_link(`${baseURL}listas/departamentos/?pais=${selected_pais}`);
    }, [selected_pais]);

    ///////////////// Departamentos de encuestas 
    const [departamentos, set_departamentos] = useState<Departamento[]>([]);
    const [selected_departamento, setselected_departamento] = useState('');
    useEffect(() => {
        void fetch_data_dptos_encuestas({
            url: link,
            callbackState: set_departamentos
        });
    }, [link]);


    /////////////////////// Municipios de encuestas 
    const [municipios, setmunicipios] = useState<Municipios[]>([]);
    useEffect(() => {
        void fetch_data_municipio_encuestas({
            baseURL,
            setmunicipios,
            selected_departamento,
        });
    }, [selected_departamento]);

    const [encuestaData, setEncuestaData] = useState<EncuestaDetalle['data'] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const fetchEncuestaDetalle = async (): Promise<void> => {
            try {
                const url = "/gestor/encuestas/encabezado_encuesta/get/detalle/104/";
                const res = await api.get<EncuestaDetalle>(url); // Asumiendo que ya tienes configurada una instancia de axios llamada "api"
                setEncuestaData(res.data.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchEncuestaDetalle();
    }, []);
    const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
    const handleRespuestaChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSelectedOptions = [...selectedOptions];
        const selectedOptionId = encuestaData?.preguntas[index].opciones_rta.find(
            opcion => opcion.opcion_rta === event.target.value
        )?.id_opcion_rta;

        if (selectedOptionId) {
            newSelectedOptions[index] = selectedOptionId;
            setSelectedOptions(newSelectedOptions);
        }
    };
    const sendEncuestaResponse = async (): Promise<void> => {
        const dataToSend = {
            ...formData,
            ids_opciones_preguntas_encuesta: selectedOptions.map(optionId => ({
                id_opcion_pregunta_encuesta: optionId
            }))
        };


        try {
            const response = await api.post("/gestor/encuestas/datos_encuestas_resueltas/create/", dataToSend);
            if (response.data.success) {
                console.log("Encuesta enviada exitosamente.");
            } else {
                console.log(response.data.detail);
            }
        } catch (error) {
            console.error("Error al enviar la encuesta:", error);
        }
    };

    return (
        <>
            <Grid container
                spacing={2} m={2} p={2}
                sx={miEstilo}
            ><Button onClick={sendEncuestaResponse} variant="contained" color="primary">
                    Enviar Respuestas
                </Button>


                <Title title="Encuesta satisfacción al usuario" />
            </Grid>
            <Grid container
                spacing={2} m={2} p={2}
                sx={miEstilo}
            >
                <Title title="Datos de usuario " />
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth size="small">
                        <InputLabel  >Tipo de documento </InputLabel>
                        <Select
                            required
                            label="Tipo de documento "
                        >
                            <MenuItem value="encuesta 1" >encuesta 1</MenuItem>
                            <MenuItem value="encuesta 2">encuesta 2</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <TextField
                        value={formData.nro_documento_id}
                        label="Numero identificación "
                        onChange={handleInputChange}
                        name="nro_documento_id"
                        variant="outlined"
                        size="small"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        value={formData.nombre_completo}
                        onChange={handleInputChange}
                        label="Nombre completo"
                        name="nombre_completo"
                        variant="outlined"
                        size="small"
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth size="small">
                        <InputLabel  >Sexo</InputLabel>
                        <Select
                            label="sexo"
                            required
                        >
                            <MenuItem value="encuesta 1" >encuesta 1</MenuItem>
                            <MenuItem value="encuesta 2">encuesta 2</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth size="small">
                        <InputLabel  >Rango de edad </InputLabel>
                        <Select
                            required
                            label="rango de edad "
                        >
                            <MenuItem value="encuesta 1" >encuesta 1</MenuItem>
                            <MenuItem value="encuesta 2">encuesta 2</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        onChange={handleInputChange}
                        value={formData.email}
                        variant="outlined"
                        label="Email"
                        size="small"
                        name="email"
                        fullWidth
                    />
                </Grid> <Grid item xs={12} sm={4}>
                    <TextField
                        variant="outlined"
                        size="small"
                        label="Telefono  "
                        fullWidth
                        onChange={handleInputChange}
                        value={formData.telefono}
                        name="telefono"
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl size="small" fullWidth>
                        <InputLabel shrink={true}>pais</InputLabel>
                        <Select
                            label="país"
                            name="id_pais_para_extranjero"
                            value={formData.id_pais_para_extranjero}
                            onChange={(event) => {
                                const selectedValue = event.target.value as string;
                                setselected_pais(selectedValue);
                                handleInputChange(event);
                            }}
                        >
                            {paises.map((Paises) => (
                                <MenuItem key={Paises.value} value={Paises.value}>
                                    {Paises.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>


                <Grid item xs={12} sm={4}>
                    <FormControl required size="small" fullWidth>
                        <InputLabel shrink={true}>Departamento</InputLabel>
                        <Select
                            label="Departamento"
                            onChange={(event) => {
                                const selectedValue = event.target.value as string;
                                setselected_departamento(selectedValue);
                            }}

                        >
                            {departamentos.map((departamento) => (
                                <MenuItem key={departamento.value} value={departamento.value}>
                                    {departamento.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl required size="small" fullWidth>
                        <InputLabel shrink={true}>Municipio</InputLabel>
                        <Select
                            label="Municipio"
                            name="id_municipio_para_nacional"
                            onChange={handleInputChange}
                            value={formData.id_municipio_para_nacional}
                            inputProps={{ shrink: true }}
                        >
                            {municipios.map((municipio) => (
                                <MenuItem key={municipio.value} value={municipio.value}>
                                    {municipio.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <>
                {loading ? (
                    <p>Cargando...</p>
                ) : (
                    encuestaData?.preguntas.map((pregunta, index) => (
                        <Grid
                            key={pregunta.id_pregunta_encuesta}
                            container
                            spacing={2}
                            m={2}
                            p={2}
                            sx={{
                                position: 'relative',
                                background: '#FAFAFA',
                                borderRadius: '15px',
                                p: '20px',
                                m: '10px 0 20px 0',
                                mb: '20px',
                                boxShadow: '0px 3px 6px #042F4A26',
                                borderLeft: '6px solid blue',
                            }}
                        >
                            <Grid item xs={12}>
                                <h2>{pregunta.redaccion_pregunta}</h2>
                            </Grid>
                            <Typography variant="h6" gutterBottom></Typography>
                            <FormControl component="fieldset">
                                <RadioGroup
                                    aria-label={`respuesta${index + 1}`}
                                    name={`respuesta${index + 1}`}
                                    value={respuestas[index]}
                                    onChange={handleRespuestaChange(index)}
                                >
                                    {pregunta.opciones_rta.map((opcion, opcionIndex) => (
                                        <FormControlLabel
                                            key={opcion.id_opcion_rta}
                                            value={opcion.opcion_rta}
                                            control={<Radio />}
                                            label={opcion.opcion_rta}
                                        />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    ))
                )}
            </>
            <Grid container
                spacing={2} m={2} p={2}
                sx={miEstilo}
            >
                <Grid item xs={12} sm={1.2}>
                    <Button startIcon={<SaveIcon />} color='success' fullWidth variant="contained"    >
                        guardar
                    </Button>
                </Grid>
                <Grid item xs={12} sm={1}>
                    <ButtonSalir />
                </Grid>
            </Grid>

        </>
    );
};