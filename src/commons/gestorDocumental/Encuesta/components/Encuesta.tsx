/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable import/no-duplicates */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormControl, Grid, TextField } from "@mui/material";
import { Title } from "../../../../components";
import { InputLabel, MenuItem, Select, } from "@mui/material";
import type React from "react";
import { useState } from "react";
import {
    RadioGroup,
    FormControlLabel,
    Radio,
    Typography,
} from "@mui/material";

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
                    <FormControl fullWidth size="small">
                        <InputLabel  >pais  </InputLabel>
                        <Select

                            required
                            label="pais  "

                        >
                            <MenuItem value="encuesta 1" >encuesta 1</MenuItem>
                            <MenuItem value="encuesta 2">encuesta 2</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth size="small">
                        <InputLabel  >departamento  </InputLabel>
                        <Select
                            required
                            label="departamento  "

                        >
                            <MenuItem value="encuesta 1" >encuesta 1</MenuItem>
                            <MenuItem value="encuesta 2">encuesta 2</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth size="small">
                        <InputLabel  >Ciudad </InputLabel>
                        <Select
                            required
                            label="Ciudad "

                        >
                            <MenuItem value="encuesta 1" >encuesta 1</MenuItem>
                            <MenuItem value="encuesta 2">encuesta 2</MenuItem>
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

        </>
    );
};