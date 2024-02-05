/* eslint-disable @typescript-eslint/naming-convention */

import { Button, Grid, TextField } from "@mui/material";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { useNavigate } from "react-router-dom";

export const BotonesDigitalizacion = () => {
    const navigate = useNavigate();

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


                <Grid item xs={12}>
                    <TextField
                        style={{ marginTop: 25, width: '100%' }}
                        label={`Observacion`}
                        id="description"
                        value={"Esto te permitirá mantener el valor del switch en el estado local switchValue. Si necesitas enviar este valor"}
                        name="observacion"
                        multiline
                        rows={2}

                    // error={emailMismatch}
                    // helperText={emailMismatch ? "El campo de observaciones esta vacio " : ""}
                    />
                </Grid>


                <Grid item xs={3} sx={{textAlign: 'right'}} >
                    <Button
                        style={{ margin: 8 }}
                        color="success"
                        variant="contained"
                        startIcon={<ArrowOutwardIcon />}
                       
                    >
                        Responder Digitalizacion
                    </Button>
                </Grid>


                <Grid item xs={3} sx={{textAlign: 'right'}} >
                    <Button
                        style={{ margin: 8 }}
                        color="error"
                        variant="contained"
                        startIcon={<ArrowOutwardIcon />}
                        onClick={() => {
                            navigate(
                                '/app/gestor_documental/central_digitalizacion_otros/principal'
                            );
                        }}
                    >
                        Volver
                    </Button>
                </Grid>


            </Grid>


        </>
    )
}
