/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, FormControl, Grid, TextField } from "@mui/material";
import { Title } from "../../../../components";
import { InputLabel, MenuItem, Select, } from "@mui/material";
import type React from "react";
import { useEffect, useState } from "react";
import {
    RadioGroup,
    FormControlLabel,
    Radio,
    Typography,
} from "@mui/material";
import { ButtonSalir } from "../../../../components/Salir/ButtonSalir";
import SaveIcon from '@mui/icons-material/Save';
// import { Opcion_Genero } from "../interfaces/types";
import { api, baseURL } from "../../../../api/axios";
import { Departamento, DepartamentoResponse, Municipios, MunicipiosResponse, Paises, PaisesResponse } from "../interfaces/types";
export interface Opcion_Genero {
    value: string;
    label: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Encuesta: React.FC = () => {
    const miEstilo = {
        position: 'relative',
        background: '#FAFAFA',
        borderRadius: '15px',
        p: '20px',
        m: '10px 0 20px 0',
        mb: '20px',
        boxShadow: '0px 3px 6px #042F4A26',
    };
    const preguntas = [
        {
            id: 1,
            pregunta: "¿Cómo calificaría su experiencia?",
            opciones: ["Excelente", "Muy bueno", "Bueno", "Regular", "Malo"],
            respuesta: "",
        },
        {
            id: 2,
            pregunta: "¿Fue satisfactorio el servicio ?",
            opciones: ["Excelente", "Muy bueno", "Bueno", "Regular", "Malo"],
            respuesta: "",
        },
        // Puedes agregar más preguntas aquí
    ];
    const [respuestas, setRespuestas] = useState(Array(preguntas.length).fill(""));
    const handleRespuestaChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newRespuestas = [...respuestas];
        newRespuestas[index] = event.target.value;
        setRespuestas(newRespuestas);
    };
    const [genero, set_genero] = useState<Opcion_Genero[]>([]);
    useEffect(() => {
        const fetch_perfil = async (): Promise<void> => {
            try {
                const url = `/choices/sexo/`;
                const res_genero = await api.get(url);
                const alertas_genero = res_genero.data;
                set_genero(alertas_genero);
                console.log("222222222222");
                console.log(alertas_genero);
                console.log("111111111111");
            } catch (error) {
                console.error(error);
            }
        };
        void fetch_perfil();
    }, []);

    const [paises, setpaises] = useState<Paises[]>([]);
    useEffect(() => {
        const fetch_data = async (): Promise<any> => {
            try {
                const response = await fetch(`${baseURL}listas/paises/`);
                const data: PaisesResponse = await response.json();
                if (data.success) {
                    setpaises(data.data);

                } else {
                    console.log(data.detail);
                }
            } catch (error) {
                console.log('Error fetching paises:', error);
            }
        };
        void fetch_data();
    }, []);
    const [link, set_link] = useState('');
    const [selected_pais, setselected_pais] = useState('');

    useEffect(() => {
        set_link(`${baseURL}listas/departamentos/?pais=${selected_pais}`);
    }, [selected_pais]);
    const [departamentos, set_departamentos] = useState<Departamento[]>([]);

    useEffect(() => {
        const fetch_data = async (): Promise<any> => {
            try {
                const response = await fetch(link);
                const data: DepartamentoResponse = await response.json();
                if (data.success) {
                    set_departamentos(data.data);
                } else {
                    console.log(data.detail);
                }
            } catch (error) {
                console.log('Error fetching departamentos:', error);
            }
        };
        void fetch_data();
    }, [link]);
    const [selected_departamento, setselected_departamento] = useState('');
    const [municipios, setmunicipios] = useState<Municipios[]>([]);

    useEffect(() => {
        const fetch_data = async (): Promise<any> => {
            try {
                const response = await fetch(`${baseURL}listas/municipios/?cod_departamento=${selected_departamento}`);
                const data: MunicipiosResponse = await response.json();
                if (data.success) {
                    setmunicipios(data.data);
                } else {
                    console.log(data.detail);
                }
            } catch (error) {
                console.log('Error fetching municipios:', error);
            }
        };
        void fetch_data();
    }, [selected_departamento]);

    return (
        <>
            <Grid container
                spacing={2} m={2} p={2}
                sx={miEstilo}
            >


                <Title title="Encuesta satisfaccion al usuario" />
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
                        variant="outlined"
                        size="small"
                        // InputLabelProps={{
                        //     shrink: true,
                        // }}
                        label="Numero identificación "
                        fullWidth
                        name="Numero identificación "
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        variant="outlined"
                        size="small"
                        // InputLabelProps={{
                        //     shrink: true,
                        // }}
                        label="Nombre completo "
                        fullWidth
                        name="Nombre completo "
                    />
                </Grid>

                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth size="small">
                        <InputLabel  >sexo</InputLabel>
                        <Select

                            required
                            label="sexo"

                        >
                            <MenuItem value="encuesta 1" >encuesta 1</MenuItem>
                            <MenuItem value="encuesta 2">encuesta 2</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth size="small">
                        <InputLabel  >rango de edad </InputLabel>
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
                        variant="outlined"
                        size="small"
                        // InputLabelProps={{
                        //     shrink: true,
                        // }}
                        label="Email"
                        fullWidth
                        name="Email"
                    />
                </Grid> <Grid item xs={12} sm={4}>
                    <TextField
                        variant="outlined"
                        size="small"
                        // InputLabelProps={{
                        //     shrink: true,
                        // }}
                        label="telefono  "
                        fullWidth
                        name="telefono  "
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl size="small" fullWidth>
                        <InputLabel shrink={true}>pais</InputLabel>
                        <Select
                            label="país"


                            name="pais_sucursal_exterior"
                            onChange={(event) => {
                                const selectedValue = event.target.value as string; // Conversión de tipo a cadena
                                setselected_pais(selectedValue);
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
                            name="municipio"
                            // value={form_values.municipio}
                            // onChange={handleinput_change}
                            // onChange={(event) => {
                            //     const new_valor = event.target.value !== null ? event.target.value : '';
                            //     setselected_municipio(new_valor);
                            //     handleinput_change(event);
                            // }}
                            inputProps={{ shrink: true }}
                        /* eslint-disable-next-line @typescript-eslint/strict-boolean-expressions */
                        // disabled={!selected_departamento && departamentos_retur.length !== 1}
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
                {preguntas.map((pregunta, index) => (
                    <Grid
                        key={pregunta.id}
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
                            <h2>{pregunta.pregunta}</h2>
                        </Grid>
                        <Typography variant="h6" gutterBottom></Typography>
                        <FormControl component="fieldset">
                            <RadioGroup
                                aria-label={`respuesta${index + 1}`}
                                name={`respuesta${index + 1}`}
                                value={respuestas[index]}
                                onChange={handleRespuestaChange(index)}
                            >
                                {pregunta.opciones.map((opcion, opcionIndex) => (
                                    <FormControlLabel
                                        key={opcionIndex}
                                        value={opcion}
                                        control={<Radio />}
                                        label={opcion}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                ))}
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