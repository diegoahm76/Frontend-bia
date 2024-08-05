/* eslint-disable @typescript-eslint/naming-convention */

import { Button, Grid } from "@mui/material";
import { LiquidacionPlantilla } from "../plantillaHtml/Liquidacion";
import { Title } from "../../../../../components/Title";
import { useAppSelector } from "../../../../../hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from '@mui/icons-material';
import { ElementoPQRS, initialData } from "../../interfaces/InterfacesLiquidacion";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// Componente DocumentoPagoLiquidacion
export const DocumentoPagoLiquidacion = () => {
    const navigate = useNavigate();
    const [data_liquidacion, set_data_liquidacion] = useState<ElementoPQRS>(initialData);

    // Obtener el elemento actual de PQRSd complemento tramites y otros desde el estado de Redux
    const currentElementPqrsdComplementoTramitesYotros = useAppSelector(
        (state) =>
            state.PanelVentanillaSlice.currentElementPqrsdComplementoTramitesYotros
    );

    // Actualizar el estado de data_liquidacion cuando cambie el elemento actual de PQRSd
    useEffect(() => {
        if (currentElementPqrsdComplementoTramitesYotros) {
            set_data_liquidacion(currentElementPqrsdComplementoTramitesYotros);
        }
    }, [currentElementPqrsdComplementoTramitesYotros]);

    return (
        <Grid container alignItems="center" justifyContent="center">
            {/* Título del documento */}
            <Grid item xs={12}>
                <Title title="Documento Liquidacion" />
            </Grid>

            {/* Plantilla de liquidación */}
            <Grid item xs={10}>
                <LiquidacionPlantilla data={data_liquidacion} />
            </Grid>

            {/* Botón para regresar */}
            <Grid item xs={12} sm={4} md={2.4} lg={1.9}>
                <Button
                    fullWidth
                    style={{ width: "90%", marginTop: 15, color: "white", backgroundColor: "red" }}
                    variant="contained"
                    startIcon={<ArrowBack />}
                    color="error"
                    onClick={() => {
                        navigate('/app/gestor_documental/liquidacion/activacion');
                    }}
                >
                    Regresar
                </Button>
            </Grid>

            {/* Botón para continuar */}
            <Grid item xs={12} sm={4} md={2.4} lg={1.9}>
                <Button
                    fullWidth
                    style={{ width: "90%", marginTop: 15, color: "white", backgroundColor: "orange" }}
                    variant="contained"
                    endIcon={<ArrowForwardIcon />}
                    onClick={() => {
                        navigate('/app/gestor_documental/liquidacion/finalizar_liquidacion');
                    }}
                >
                    Continuar
                </Button>
            </Grid>
        </Grid >
    );
};
