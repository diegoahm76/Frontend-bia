import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import { useEffect, useState } from 'react';
import { Button } from "@mui/material";
import { control_success } from '../../../../../../helpers/controlSuccess';
import { control_error } from '../../../../../../helpers/controlError';
import { api } from '../../../../../../api/axios';
import type { AlertaBandejaAlertaPersona, Alerta_update, InterfazMostarAlerta2 } from '../../interfaces/interfacesAlertas';



// eslint-disable-next-line @typescript-eslint/naming-convention
export const SuspenderAlerta: React.FC<InterfazMostarAlerta2> = ({  dat,  marcador,  activate_suspender_alerta}: InterfazMostarAlerta2) => {


    const alerta_inicial: AlertaBandejaAlertaPersona = {

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
        mensaje: "",
    };


    // eslint-disable-next-line @typescript-eslint/naming-convention
    const [alerta_idTo_find, set_alerta_idTo_find] = useState<number>(dat);

    const [contador_icono, set_contador_icono] = useState<boolean>(marcador);

    const [data_entidad, set_data_entidad] = useState<AlertaBandejaAlertaPersona[]>([alerta_inicial]); // Inicialización con un elemento inicial


    const handle_suspender_alerta_click: () => Promise<void> = async () => {
        try {
            await handle_change_leido(); // Llamar a la función sin argumentos
            // console.log(`ID de alerta suspendida: ${dat.dat}`);
            set_alerta_idTo_find(dat);
            set_contador_icono(marcador);
        } catch (error) {
            // Manejo de errores si es necesario
        }
    };


    const doble_funcion =  ():void => {

        void handle_suspender_alerta_click().catch((error) => {
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
            const updatedata_entidad_index = data_entidad.findIndex(alerta => alerta.id_alerta_bandeja_alerta_persona === alerta_idTo_find);

            if (updatedata_entidad_index !== -1) {
                try {
                    const elemento_buscado_en_array = data_entidad[updatedata_entidad_index];
                    const repe = elemento_buscado_en_array.repeticiones_suspendidas;

                    if (repe) {
                       
                    
                        const updateddata_entidad: Alerta_update = {
                            ...elemento_buscado_en_array,
                            repeticiones_suspendidas: false,
                        };

                        const response = await api.put(`/transversal/alertas/alertas_bandeja_Alerta_persona/update/${alerta_idTo_find}/`, updateddata_entidad);

                        set_data_entidad(response.data.data);
                        control_success('Campo "repeticiones_suspendidas" modificado correctamente');
                    }
                    control_error(`el campo ya esta suspendido`);
                } catch (error: any) {
                    control_error(error.response.data.detail);
                }
            } else {
                // control_error(`No se encontró el objeto con id_alerta_bandeja_alerta_persona ${alerta_idTo_find}.`);
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

            <Button onClick={doble_funcion}>
                <DoNotDisturbOnIcon sx={{ color: !contador_icono ? undefined : 'rgba(0, 0, 0, 0.3)' }} />
            </Button>

        </div>
    );
};



