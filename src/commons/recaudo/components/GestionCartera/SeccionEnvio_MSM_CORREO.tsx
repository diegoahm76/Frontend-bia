/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Button, Grid, } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import { Title } from "../../../../components/Title";
import { EtapaProcesoConext, initial_Etapa_valores } from "./Context/EtapaProcesoContext";
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import CancelIcon from '@mui/icons-material/Cancel';
import { api } from "../../../../api/axios";
import { control_error, control_success } from "../../../seguridad/components/SucursalEntidad/utils/control_error_or_success";



interface IProps  {
    selected_proceso: {
        fecha_facturacion: string;
        numero_factura: string;
        codigo_contable: string;
        monto_inicial: string;
        dias_mora: string;
        valor_intereses: string;
        valor_sancion: string;
        etapa: string;
        data_complement: string
    },
}

interface primera {
    id_deudor: Segunda;
}


interface Segunda {
    telefono: string
    nombres: string
    apellidos: string
    email: string
    identificacion: string
}

export const SeccionEnvio_MSM_CORREO_F: React.FC<IProps> = ({ selected_proceso }: IProps) => {

    const valores_inicial: primera = {
        id_deudor: {
            telefono: "",
            nombres: "",
            apellidos: "",
            email: "",
            identificacion: "",
        }
    }

    const { etapa_proceso, set_etapa_proceso } = useContext(EtapaProcesoConext);
    const [datos_desestructurados, set_datos_desestructurados] = useState<primera>(valores_inicial);
    const data: any = selected_proceso.data_complement;


    const CrearNuevaSubSeccionEmpresa = async () => {
        try {
            const url = '/hidrico/zonas-hidricas/enviar_sms/';
            const postData = {
                "telefono": "573126459868",
                "mensaje": "Hola, este es un mensaje de prueba."
            };
            const res = await api.post(url, postData);
            const numeroConsulta = res.data.data;
            if (res.status === 200) {
                set_etapa_proceso(initial_Etapa_valores);
                control_success("Se Notificó a la persona correctamente");  // Mensaje de éxito
            } else {
                control_error("Hubo un problema al procesar la solicitud.");
            }
        } catch (error: any) {
            control_error(error.response.data.detail);
        }
    };



    useEffect(() => {
        set_etapa_proceso((prevEtapa: any) => ({
            ...prevEtapa,
            data_complement: datos_desestructurados.id_deudor || [],
            telefono: datos_desestructurados.id_deudor?.telefono || "",
            nombres: datos_desestructurados.id_deudor?.nombres || "",
            email: datos_desestructurados.id_deudor?.email || "",
            apellidos: datos_desestructurados.id_deudor?.apellidos || "",
            identificacion: datos_desestructurados.id_deudor?.identificacion || "",
        }));

    }, [datos_desestructurados]);



    useEffect(() => {
        set_datos_desestructurados(data);
    }, [data]);


    return (
        <>
            {etapa_proceso.mostrar_modal && (
                <>
                    <Grid
                        container
                        sx={{
                            position: 'relative',
                            background: '#FAFAFA',
                            borderRadius: '15px',
                            p: '20px',
                            mb: '20px',
                            boxShadow: '0px 3px 6px #042F4A26'
                        }}
                    >
                        <Grid item xs={12}>
                            <Title title={`Informacion a Enviar a ${etapa_proceso.nombres} ${etapa_proceso.apellidos}`}></Title>
                        </Grid>
                        <Grid item xs={12}>
                            <p style={{ fontSize: '1.2em', fontWeight: 'bold', color: 'black' }}>
                                Estimado(a) <span style={{ fontSize: '1.5em', fontWeight: 'bold', color: 'darkblue' }}>{etapa_proceso.nombres} {etapa_proceso.apellidos}</span>  Cc {etapa_proceso.identificacion},
                            </p>
                            <p>Le informamos que hemos enviado una notificación importante sobre el proceso en el que está involucrado(a).</p>
                            <p>Los detalles de la notificación son los siguientes:</p>
                            <ul>
                                <li><span style={{ fontWeight: 'bold' }}>Numero de Documento a notificar:</span> {etapa_proceso.identificacion}</li>
                                <li><span style={{ fontWeight: 'bold' }}>Número de teléfono a notificar:</span> {etapa_proceso.telefono}</li>
                                <li><span style={{ fontWeight: 'bold' }}>Correo electrónico a notificar:</span> {etapa_proceso.email}</li>
                            </ul>
                            <p>Por favor, revise su teléfono y correo electrónico para obtener más detalles y asegúrese de estar al tanto de los próximos pasos del proceso.</p>
                            <p>Gracias por su atención.</p>
                        </Grid>

                        <Grid container alignItems="center" justifyContent="center">


                            <Button
                                variant="outlined"
                                // color="error"
                                startIcon={<PermPhoneMsgIcon />}
                                style={{ width: 150, margin: 7 }}
                                disabled={etapa_proceso.disable}
                                onClick={CrearNuevaSubSeccionEmpresa}
                            >
                                Contactar
                            </Button>

                            <Button
                                variant="outlined"
                                color="error"
                                startIcon={<CancelIcon />}
                                style={{ width: 150, margin: 7 }}
                                onClick={() => set_etapa_proceso(initial_Etapa_valores)}
                            >
                                Cancelar
                            </Button>
                        </Grid>
                    </Grid>
                </>)}
        </>
    )
}

