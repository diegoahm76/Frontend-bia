/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Button, Grid, TextField, } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import { Title } from "../../../../../components/Title";
import { EtapaProcesoConext, initial_Etapa_valores } from "../Context/EtapaProcesoContext";
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import CancelIcon from '@mui/icons-material/Cancel';
import { api } from "../../../../../api/axios";
import { control_error, control_success } from "../../../../seguridad/components/SucursalEntidad/utils/control_error_or_success";
import { IProps, NombreTipoVaraible, primera, valores_inicial } from "../../../interfaces/seccionNotificacion";
import { BottonPayPalFuncion } from "./Botton-PayPal";


export const SeccionEnvio_MSM_CORREO_F: React.FC<IProps> = ({ selected_proceso }: IProps) => {


    const [observacion, set_observacion] = useState();
    const { etapa_proceso, set_etapa_proceso } = useContext(EtapaProcesoConext);
    const [tipos_categorias, set_tipos_categorias] = useState<any[]>([]);
    const [datos_desestructurados, set_datos_desestructurados] = useState<primera>(valores_inicial);
    const data: any = selected_proceso.data_complement;
    const categoriaEncontrada: NombreTipoVaraible = tipos_categorias.find(item => item.id === etapa_proceso.nuevo_proceso);
    const categoriaEncontrada2: NombreTipoVaraible = tipos_categorias.find(item => item.id === etapa_proceso.tipo_cambio);
    // const nombreCategoria = categoriaEncontrada ? categoriaEncontrada.categoria : null;
    const nombreCategoria2 = categoriaEncontrada2 ? categoriaEncontrada2.categoria : null;





    // console.log("nombreCategoria", nombreCategoria)
    console.log("nombreCategoria2", nombreCategoria2)
    const EnviarSolicitudMSM = async () => {
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

        CrearNuevaSubSeccionEmpresa()
    };


    const CrearNuevaSubSeccionEmpresa = async () => {
        try {
            const url = '/hidrico/zonas-hidricas/enviar_correo/';
            const postData = {
                "correo": "ppplopez93@gmail.com",
                "nombre": etapa_proceso.nombres,
                "asunto": nombreCategoria2,
                "mensaje": observacion
            };
            const res = await api.post(url, postData);
            if (res.status === 200) {

                control_success("Se Notificó a la persona correo correctamente");  // Mensaje de éxito
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
            data_complement: datos_desestructurados || [],
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


    useEffect(() => {
        api.get('recaudo/procesos/categoria-atributos/')
            .then((response) => {
                set_tipos_categorias(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

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
                            <Title title={`Información a Enviar a ${etapa_proceso.nombres} ${etapa_proceso.apellidos}`}></Title>
                        </Grid>
                        <Grid item xs={12}>
                            <p style={{ fontSize: '1.2em', fontWeight: 'bold', color: 'black' }}>
                                Estimado(a) <span style={{ fontSize: '1.5em', fontWeight: 'bold', color: 'darkblue' }}>{etapa_proceso.nombres} {etapa_proceso.apellidos}</span>  Cc {etapa_proceso.identificacion},
                            </p>

                            {nombreCategoria2 && (<> <Grid item xs={5}>
                                <TextField
                                    style={{ width: '95%', marginTop: 10 }}
                                    variant="outlined"
                                    label="Asunto"
                                    fullWidth
                                    name="Asunto"
                                    value={nombreCategoria2 || ""}
                                    disabled
                                />

                            </Grid> </>)}



                            <p>Le informamos que hemos enviado una notificación importante sobre el proceso en el que está involucrado(a).</p>
                            <p>Los detalles de la notificación son los siguientes:</p>
                            <ul>
                                <li><span style={{ fontWeight: 'bold' }}>Numero de Documento a notificar:</span> {etapa_proceso.identificacion}</li>
                                <li><span style={{ fontWeight: 'bold' }}>Número de teléfono a notificar:</span> {etapa_proceso.telefono}</li>
                                <li><span style={{ fontWeight: 'bold' }}>Correo electrónico a notificar:</span> {etapa_proceso.email}</li>
                            </ul>
                            <p>Por favor, revise su teléfono y correo electrónico para obtener más detalles y asegúrese de estar al tanto de los próximos pasos del proceso.</p>


                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    label="Observación"
                                    fullWidth
                                    name="Observacion Adicional"
                                    value={observacion}
                                    rows={3}
                                    multiline
                                    onChange={(e: any) => set_observacion(e.target.value)}
                                />
                            </Grid>
                            <p>Gracias por su atención.</p>
                        </Grid>

                        <Grid container alignItems="center" justifyContent="center">


                            <Button
                                variant="outlined"
                                // color="error"
                                startIcon={<PermPhoneMsgIcon />}
                                style={{ width: 150, margin: 7 }}
                                // disabled={etapa_proceso.disable}
                                onClick={EnviarSolicitudMSM}
                            >
                                Notificar
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
                    </Grid >



               <BottonPayPalFuncion/>


                </>)}


        </>
    )
}
