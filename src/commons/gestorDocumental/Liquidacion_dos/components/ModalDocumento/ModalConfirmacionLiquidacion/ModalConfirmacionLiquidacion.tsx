/* eslint-disable @typescript-eslint/naming-convention */
import React, { useContext, useEffect, useState } from "react";
import { Button } from "@mui/material";
import ReceiptIcon from '@mui/icons-material/Receipt';
import { control_error } from "../../../../../seguridad/components/SucursalEntidad/utils/control_error_or_success";
import { api } from "../../../../../../api/axios";
import { useSelector } from "react-redux";
import { AuthSlice } from "../../../../../auth/interfaces/authModels";
import { PreciosContext } from "../../../context/PersonalContext";
import { LetraFormatoHumano } from "../../../utils/LetraFormatoHumano";
import { Respuesta } from "../../../interfaces/InterfacesLiquidacion";
import Swal from 'sweetalert2';
import { useAppSelector } from "../../../../../../hooks/hooks";


export const ModalConfirmacionLiquidacion = () => {
    const { liquidacionState,precios } = useContext(PreciosContext);
    const [respuesta, setRespuesta] = useState<Respuesta | null>(null);


    const fechaActual = new Date();
    const FechaElaboracion = fechaActual.toISOString();

    const {
        userinfo: { id_persona },
    } = useSelector((state: AuthSlice) => state.auth);

    const currentElementPqrsdComplementoTramitesYotros = useAppSelector(
        (state) =>
          state.PanelVentanillaSlice.currentElementPqrsdComplementoTramitesYotros
      );
      console.log(currentElementPqrsdComplementoTramitesYotros?.id_solicitud_tramite)

      


    const fetch_Actualizar_archivo_digital = async () => {
        try {
            const url = `recaudo/configuracion_referencia/referencia/crear/`;
            const formData = new FormData();
            formData.append('id_persona', id_persona.toString());
            formData.append('fecha_actual', FechaElaboracion);
            formData.append('archivo-create-Nombre anexo', liquidacionState.archivo);
            formData.append('id_solicitud_tramite',currentElementPqrsdComplementoTramitesYotros?.id_solicitud_tramite);

            const respuesta = await api.post(url, formData);

            if (respuesta && respuesta.data) {
                setRespuesta(respuesta.data.data);
            } else {
                console.error('Error en la solicitud:', respuesta ? respuesta.statusText : 'Response undefined');
            }
        } catch (error: any) {
            control_error(error.response?.data?.detail || 'Error desconocido, revisa que estés enviando todos los campos');
            setRespuesta(null);
        }
    };


   
    const nuevoArreglo = precios.map((item, index) => {
        return {
          id_opcion_liq: 1,
          variables: {
            test: item.descripcion
          },
          valor: parseInt(item.valor),
          concepto: item.descripcion
        };
      });


    const Guardar_Liquidacion = async () => {
        try {


            const url = `recaudo/liquidaciones/liquidacion-tramite/`;
            const formData = new FormData();
            formData.append('data_liquidacion', JSON.stringify(liquidacionState));
            formData.append('data_detalles', JSON.stringify(nuevoArreglo));
            formData.append('archivo_liquidacion', liquidacionState.archivo);
            const respuesta = await api.post(url, formData)
            if (respuesta && respuesta.data) {
                console.log(respuesta)

            } else {
                console.error('Error en la solicitud:', respuesta ? respuesta.statusText : 'Response undefined');
            }
        } catch (error: any) {
            control_error(error.response?.data?.detail || 'Error desconocido, revisa que estés enviando todos los campos');
        }
    };




    useEffect(() => {
        if (respuesta) {
            Swal.fire({
                icon: 'success',
                title: 'Detalle de la liquidación',
                html: `
                    <div>
                        <p><strong>Usuario:</strong> ${respuesta.nombre_completo}</p>
                        <p><strong>Expediente:</strong> ${respuesta.consecutivo}</p>
                        <p><strong>Radicado:</strong> ${respuesta.radicado_nuevo}</p>
                        <p><strong>Proceso:</strong> ${respuesta.nro_consecutivo}</p>
                        <p><strong>Fecha:</strong> ${LetraFormatoHumano(respuesta.fecha_consecutivo)}</p>
                        <p><strong>Documento:</strong> ${respuesta.numero_documento}</p>
                    </div>
                `,
                showConfirmButton: true,
            });
        }
    }, [respuesta]);


    return (
        <>
            <Button
                style={{ marginTop: 15, backgroundColor: "green", color: "white", width: "95%" }}
                color="success"
                fullWidth
                variant="contained"
                startIcon={<ReceiptIcon />}
                onClick={fetch_Actualizar_archivo_digital}
            >
                Generar Liquidacion
            </Button>

        </>
    );
};
