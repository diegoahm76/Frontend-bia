import { useState, useEffect } from "react";
import { Dialog } from 'primereact/dialog';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Button, Grid, TextField, Tooltip } from "@mui/material";
import { Title } from "../../../../../../components/Title";
import { ModificadorFormatoFecha } from "../../utils/ModificaforFecha";
import type { AlertaBandejaAlertaPersona, Alerta_update, InterfazMostarAlerta } from '../../interfaces/interfacesAlertas';
import { api } from '../../../../../../api/axios';
import { control_success } from '../../../../../../helpers/controlSuccess';
import { control_error } from '../../../../../../helpers/controlError';



// eslint-disable-next-line @typescript-eslint/naming-convention
export const ModalInfoAlerta: React.FC<InterfazMostarAlerta> = ({ dat, marcador, activate_suspender_alerta, columnnns }: InterfazMostarAlerta) => {

    const alerta_inicial: AlertaBandejaAlertaPersona = {
        documento: "",
        mensaje: "",
        id_alerta_bandeja_alerta_persona: 0,
        nivel_prioridad: 0,
        tipo_alerta: "",
        fecha_hora: "",
        nombre_clase_alerta: "",
        id_modulo: 0,
        nombre_modulo: "",
        ultima_repeticion: false,
        leido: false,
        fecha_leido: null,
        archivado: false,
        fecha_archivado: null,
        repeticiones_suspendidas: false,
        fecha_suspencion_repeticion: null,
        fecha_envio_email: null,
        email_usado: "",
        responsable_directo: false,
        id_bandeja_alerta_persona: 0,
        id_alerta_generada: 0,
    };



    const [visible, set_visible] = useState<boolean>(false);
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const [alerta_idTo_findd, set_alerta_idTo_findd] = useState<number>(dat);
    const [contador_icono, set_contador_icono] = useState<boolean>(marcador);
    const [data_entidad, set_data_entidad] = useState<AlertaBandejaAlertaPersona[]>([alerta_inicial]); // Inicialización con un elemento inicial
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const [alerta_idTo_find, set_alerta_idTo_find] = useState<any>(columnnns);



    const title = (<Title title="Informacion de alerta " />);

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const {
        nombre_clase_alerta,
        tipo_alerta,
        mensaje,
        fecha_hora,
        responsable_directo,
        fecha_envio_email,
        email_usado,
        nombre_modulo,
        repeticiones_suspendidas,
        nivel_prioridad
    } = alerta_idTo_find;



    // eslint-disable-next-line @typescript-eslint/naming-convention
    const handleGuardarYPoner = (): void => {
        set_visible(false);
        doble_funcion();

    };


    const footer_content = (
        <div>
            <Button style={{ margin: 3 }} color="primary" variant="contained" onClick={() => { handleGuardarYPoner() }} >Salir</Button>

        </div>
    );


    const handle_suspender_alerta_click: () => Promise<void> = async () => {
        try {
            set_alerta_idTo_find(columnnns);

        } catch (error) {

        }
    };


    // eslint-disable-next-line @typescript-eslint/naming-convention
    const handleClick = (): void => {
        set_visible(true);
        handle_suspender_alerta_click().catch((error) => {
            console.error(error);
        });;

    };



    const handle_suspender_alerta_clickk: () => Promise<void> = async () => {
        try {
            await handle_change_leido(); // Llamar a la función sin argumentos
            // //  console.log('')(`ID de alerta suspendida: ${dat.dat}`);
            set_alerta_idTo_findd(dat);
            set_contador_icono(marcador);
        } catch (error) {
            // Manejo de errores si es necesario
        }
    };


    const doble_funcion = (): void => {

        void handle_suspender_alerta_clickk().catch((error) => {
            console.error(error);
        }).then(async () => {
            activate_suspender_alerta();
        })

    }



    const fetch_data_get = async (): Promise<void> => {
        try {
            const url = '/transversal/alertas/alertas_bandeja_Alerta_persona/get-alerta_bandeja-by-bandeja/8/';
            const res = await api.get(url); // Utiliza Axios para realizar la solicitud GET
            const facilidad_pago_data = res.data.data;
            set_data_entidad(facilidad_pago_data);
            //  control_success('Datos actualizados correctamente');
        } catch (error) {
            console.error(error);
        }
    };

    const handle_change_leido = async (): Promise<void> => {


        if (data_entidad.length > 0) {
            // Buscar el índice del objeto en el array data_entidad con el mismo id_alerta_bandeja_alerta_persona
            const updatedata_entidad_index = data_entidad.findIndex(alerta => alerta.id_alerta_bandeja_alerta_persona === alerta_idTo_findd);


            if (updatedata_entidad_index !== -1) {
                try {

                    const elemento_buscado_en_array = data_entidad[updatedata_entidad_index];
                    const leido_value = elemento_buscado_en_array.leido;
                    if (!leido_value) {
                        const updateddata_entidad: Alerta_update = {
                            ...elemento_buscado_en_array,
                            leido: !leido_value,
                        };



                        const response = await api.put(`/transversal/alertas/alertas_bandeja_Alerta_persona/update/${alerta_idTo_findd}/`, updateddata_entidad);


                        set_data_entidad(response.data.data);
                        control_success('La notificación actual ha sido revisada');
                    }

                } catch (error: any) {
                    control_error(error.response.data.detail);
                }
            } else {
                // control_error(`No se encontró el objeto con id_alerta_bandeja_alerta_persona ${alerta_idTo_findd}.`);
            }
        }
    };




    // Efecto para obtener los datos de la sucursal de la empresa al cargar el componente
    useEffect(() => {
        fetch_data_get().catch((error) => {
            console.error(error);
        });
    }, []);

    useEffect(() => {
        handle_change_leido().catch((error) => {
            console.error(error);
        });
    }, [contador_icono]);



    return (
        <div>
            <Tooltip title="Informacion de alerta" placement="right">
                <Button
                    onClick={handleClick}

                >
                    <VisibilityIcon

                    />
                </Button>
            </Tooltip>
            <Dialog header={title} visible={visible} style={{ width: '60%' }} closable={false} onHide={() => { set_visible(false) }} footer={footer_content}>
                <Grid container sx={{
                    background: '#FAFAFA',
                    borderRadius: '15px',
                    p: '20px',
                    mb: '20px',
                    boxShadow: '0px 3px 6px #042F4A26',
                }}
                >


                    <Grid item xs={12}  >

                        <TextField
                            style={{ width: "95%", margin: 6 }}
                            label="Clase Alerta"
                            variant="outlined"
                            size="small"
                            disabled
                            fullWidth
                            value={nombre_clase_alerta}

                        />
                    </Grid>

                    <Grid item xs={12} sm={4} >

                        <TextField
                            style={{ width: "85%", margin: 6 }}
                            label="Tipo de Alerta"
                            variant="outlined"
                            size="small"
                            disabled
                            fullWidth
                            value={tipo_alerta}


                        />
                    </Grid>
                    <Grid item xs={12} sm={4} >

                        <TextField
                            style={{ width: "85%", margin: 6 }}
                            label="Fecha/Hora"
                            variant="outlined"
                            size="small"
                            disabled
                            fullWidth
                            value={ModificadorFormatoFecha(fecha_hora)}

                        />
                    </Grid>
                    <Grid item xs={12} sm={4} >

                        <TextField
                            style={{ width: "85%", margin: 6 }}
                            label="Responsable Directo"
                            variant="outlined"
                            size="small"
                            disabled
                            fullWidth
                            value={responsable_directo === true ? "Sí" : "No"}

                        />
                    </Grid>

                    <Grid item xs={12} sm={4} >

                        <TextField
                            style={{ width: "85%", margin: 6 }}
                            label="Fecha Envio a Email"
                            variant="outlined"
                            size="small"
                            disabled
                            fullWidth
                            value={fecha_envio_email}

                        />
                    </Grid>
                    <Grid item xs={12} sm={4} >

                        <TextField
                            style={{ width: "85%", margin: 6 }}
                            label=" Envio a Email"
                            variant="outlined"
                            size="small"
                            disabled
                            fullWidth
                            value={email_usado}

                        />
                    </Grid>
                    <Grid item xs={12} sm={4} >

                        <TextField
                            style={{ width: "85%", margin: 6 }}
                            label="Modulo Destino"
                            variant="outlined"
                            size="small"
                            disabled
                            fullWidth
                            value={nombre_modulo ? nombre_modulo.split('/#/app/') : ""}
                        />
                    </Grid>




                    <Grid item xs={12} sm={4} >

                        <TextField
                            style={{ margin: 6, width: "85%" }}
                            label="Suspendido"
                            variant="outlined"
                            size="small"
                            disabled
                            fullWidth
                            value={repeticiones_suspendidas === true ? "Sí" : "No"}

                        />
                    </Grid>
                    <Grid item xs={12} sm={2} >

                        <TextField
                            style={{ margin: 6, width: "85%" }}
                            label="Prioridad"
                            variant="outlined"
                            size="small"
                            disabled
                            fullWidth
                            value={nivel_prioridad}
                        />
                    </Grid>


                    <Grid item xs={12}>
                        <TextField
                            style={{ margin: 6, width: "100%" }}
                            label="Mensaje"
                            multiline
                            value={mensaje}
                            // id="description" 
                            disabled
                        />

                    </Grid>
                </Grid>
            </Dialog>
        </div>
    );
};