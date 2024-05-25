/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { Title } from "../../../../components";
import { Grid, FormControl, Select, Button, MenuItem, InputLabel } from "@mui/material";
import { miEstilo } from "../../Encuesta/interfaces/types";
import { api } from "../../../../api/axios";
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate } from 'react-router-dom';



import ClearIcon from '@mui/icons-material/Clear';




export interface IProps {
    handleBack: any;
    activeStep: any;
    handleExit: any;
}

export const Radicacion: React.FC<IProps> = ({ handleExit, activeStep, handleBack }) => {

    const [opcionesRadicacion, setOpcionesRadicacion] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const fetchOpcionesRadicacion = async () => {
        try {
            const response = await api.get('/gestor/choices/radicacion-correos/');
            setOpcionesRadicacion(response.data);
        } catch (error) {
            console.error('Error al obtener las opciones de radicación:', error);
        }
    };


    useEffect(() => {
        fetchOpcionesRadicacion();
    }, []);

    const handleInputChange = (event: any) => {
        setSelectedOption(event.target.value);
    };

    const navigate = useNavigate();


    return (
        <>
            <Grid container
                spacing={2} m={2} p={2}
                sx={miEstilo}
            >
                <Grid item xs={12} sm={12}>
                    <Title title="Proceso de radicación" />
                </Grid>

                <Grid direction="row"
                    justifyContent="center"
                    alignItems="center" container item xs={12} spacing={2} marginTop={2}>
                    <Grid item xs={12} sm={4}>
                        <FormControl required size="small" fullWidth>
                            <InputLabel id="select-radicacion-label">Tipo de Radicación</InputLabel>
                            <Select
                                labelId="select-radicacion-label"
                                id="id_tipo_radicacion"
                                value={selectedOption}
                                label="Tipo de Radicación"
                                name="id_tipo_radicacion"
                                onChange={handleInputChange}
                            >
                                {opcionesRadicacion.map((opcion) => (
                                    <MenuItem key={opcion[0]} value={opcion[0]}>
                                        {opcion[1]}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    {/* {selectedOption} */}
                    <Grid item xs={12} sm={12}>

                    </Grid>
                    <Grid item xs={4} sm={2}>
                        <Button
                            color='error'
                            fullWidth
                            variant='contained'
                            disabled={activeStep === 0}
                            onClick={handleExit}
                            startIcon={<ClearIcon />}
                        >

                            salir
                        </Button>

                    </Grid>
                    {/* <Grid item xs={4} sm={2}>
                        <Button
                            color='success'
                            variant='contained'
                            startIcon={<SaveIcon />}
                            fullWidth
                            onClick={() => {
                                navigate('/app/gestor_documental/pqrsdf/crear_pqrsdf/');
                                navigate(' /gestor_documental/solicitudes_otros');

                               
                            }} >
                            aceptar
                        </Button>
                    </Grid> */}
                    <Grid item xs={4} sm={2}>
                        <Button
                            color='success'
                            variant='contained'
                            startIcon={<SaveIcon />}
                            fullWidth
                            onClick={() => {
                                if (selectedOption === 'PQ') {
                                    navigate('/app/gestor_documental/pqrsdf/crear_pqrsdf/');
                                } else if (selectedOption === 'OT') {
                                    navigate('/app/gestor_documental/solicitudes_otros');
                                }
                            }}
                        >
                            aceptar
                        </Button>

                    </Grid>





                </Grid>
            </Grid>



        </>
    );
};