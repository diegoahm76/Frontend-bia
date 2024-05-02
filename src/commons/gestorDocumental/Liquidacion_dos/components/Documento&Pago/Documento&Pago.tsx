/* eslint-disable @typescript-eslint/naming-convention */

import { Button, Grid, TextField } from "@mui/material"
import { LiquidacionPlantilla } from "../plantillaHtml/Liquidacion"
import { Title } from "../../../../../components/Title"
import { useAppSelector } from "../../../../../hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Asumo que estás utilizando react-router
import { ArrowBack } from '@mui/icons-material';
import { ElementoPQRS } from "../../interfaces/InterfacesLiquidacion";

const initialData: ElementoPQRS = {
    costo_proyecto: "",
    estado_actual_solicitud: "",
    fecha_inicio: null,
    fecha_radicado: "",
    fecha_registro: "",
    medio_solicitud: "",
    nombre_completo_titular: "",
    nombre_proyecto: "",
    nombre_tramite: null,
    pago: false,
    radicado: "",
    tipo_solicitud: ""
};


export const DocumentoPagoLiquidacion = () => {

    const navigate = useNavigate();

    const [data_liquidacion, set_data_liquidacion] = useState<ElementoPQRS>(initialData);

    console.log("data_liquidacion", data_liquidacion);

    const currentElementPqrsdComplementoTramitesYotros = useAppSelector(
        (state) =>
            state.PanelVentanillaSlice.currentElementPqrsdComplementoTramitesYotros
    );

    useEffect(() => {
        if (currentElementPqrsdComplementoTramitesYotros) {
            set_data_liquidacion(currentElementPqrsdComplementoTramitesYotros);
        }
    }, [currentElementPqrsdComplementoTramitesYotros]);


    return (

        <Grid container alignItems="center" justifyContent="center">


            <Grid item xs={12}>
                <Title title="Documento Liquidacion" />
            </Grid>


            <Grid item xs={10}>
                <LiquidacionPlantilla data={data_liquidacion} />
            </Grid>



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
        </Grid>

    )
}
