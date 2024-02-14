/* eslint-disable @typescript-eslint/naming-convention */

import { Grid } from "@mui/material";
import { Title } from "../../../../components/Title";
import { CustomizedSteppers } from "../components/LineaDeTiempo/LineOfTime";
import { BotonesControlSteper } from "../components/BotonesControl/BotonesControl";
import { useContext } from "react";
import { StepperContext } from "../context/ContextControlSteper";
import { HistorialTranferencia } from "../components/Parte_Uno/HistorialTranferencia";
import { TransferenciaDocumental } from "../components/Parte_Dos/TransferencaiDocumental";

export const PantallaPrincipalTansferenciaDocumental = () => {

    const { activeStep } = useContext(StepperContext);

    return (
        <>
            <Grid
                container
                sx={{
                    position: "relative",
                    background: "#FAFAFA",
                    borderRadius: "15px",
                    p: "20px",
                    mb: "20px",
                    boxShadow: "0px 3px 6px #042F4A26",
                }}
            >
                <Grid item xs={12}>
                    <Title title="Proceso de Digitalizacion" />
                </Grid>

                <Grid item xs={12}>
                    <CustomizedSteppers />
                </Grid>
            </Grid>
            <Grid item xs={12}>
                {activeStep === 0 && (
                    <>
                        <HistorialTranferencia />
                    </>
                )}

                {activeStep === 1 && (
                    <>
                        <TransferenciaDocumental />
                    </>
                )}
            </Grid>

            <BotonesControlSteper />
        </>
    );
};
