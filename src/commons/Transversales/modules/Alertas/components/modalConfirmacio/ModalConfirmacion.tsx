import React, { useEffect, useState } from "react";
import SaveIcon from '@mui/icons-material/Save';
import { Dialog } from 'primereact/dialog';
import { Button, Grid, Tooltip } from "@mui/material";
import { control_success } from '../../../../../../helpers/controlSuccess';
import { control_error } from '../../../../../../helpers/controlError';
import ArchiveIcon from '@mui/icons-material/Archive';
import { api } from "../../../../../../api/axios";
import type { AlertaBandejaAlertaPersona, Alerta_update } from "../../interfaces/interfacesAlertas";



interface SuspenderAlertaProps {
    dat: number; // o el tipo adecuado para id_alerta_bandeja_alerta_persona
    marcador: boolean;
    activate_suspender_alerta: () => void;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const ModalConfirmacionArchivar: React.FC<SuspenderAlertaProps> = (dat) => {




    // eslint-disable-next-line @typescript-eslint/naming-convention
    const handleClick = (): void => {

        set_contador_icono(dat.marcador);
        handle_suspender_alerta_click();
        setVisible(false);
        dat.activate_suspender_alerta();
    };


    // eslint-disable-next-line @typescript-eslint/naming-convention
    const [visible, setVisible] = React.useState<boolean>(false);

    const footer_content = (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button style={{ margin: 3 }} color="primary" variant="contained" onClick={() => { setVisible(false) }} >No</Button>
            <Button style={{ margin: 3 }} type="submit" startIcon={<SaveIcon />} variant="contained" onClick={handleClick} color="success" >Si</Button>
        </div>
    );






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
    };


    const [data_entidad, set_data_entidad] = useState<AlertaBandejaAlertaPersona[]>([alerta_inicial]); // Inicialización con un elemento inicial

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const [alerta_idTo_find, set_alerta_idTo_find] = useState<number>(dat.dat);


 
    const handle_suspender_alerta_click= () : void  => {
        void handle_change_suspender().catch((error) => {
            console.error(error);
            set_alerta_idTo_find(dat.dat);
             set_contador_icono(dat.marcador);
        }).then(async () => {
             dat.activate_suspender_alerta();
        })
    };



    const fetch_data_get = async (): Promise<void> => {
        try {
            const url = '/transversal/alertas/alertas_bandeja_Alerta_persona/get-alerta_bandeja-by-bandeja/8/';
            const res = await api.get(url); // Utiliza Axios para realizar la solicitud GET
            const facilidad_pago_data = res.data.data;
            console.log(facilidad_pago_data)
            set_data_entidad(facilidad_pago_data);
            //  control_success('Datos actualizados correctamente');
        } catch (error) {
            console.error(error);
        }
    };


    const handle_change_suspender = async (): Promise<void> => {


        if (data_entidad.length > 0) {
            // Buscar el índice del objeto en el array data_entidad con el mismo id_alerta_bandeja_alerta_persona
            const updatedata_entidad_index = data_entidad.findIndex(alerta => alerta.id_alerta_bandeja_alerta_persona === alerta_idTo_find);


            if (updatedata_entidad_index !== -1) {
                try {
                    const first_alert = data_entidad[updatedata_entidad_index];
                    const archivado_value = first_alert.archivado;
                    console.log(archivado_value);

                    if (archivado_value) {
                        const updateddata_entidad: Alerta_update = {
                            ...first_alert,
                            archivado: !archivado_value,
                        };

                        const response = await api.put(`/transversal/alertas/alertas_bandeja_Alerta_persona/update/${alerta_idTo_find}/`, updateddata_entidad);

                        set_data_entidad(response.data.data);
                        control_success('Campo "leido" actualizado correctamente');
                    }
                } catch (error: any) {
                    control_error(error.response.data.detail);
                }
            } else {
                // control_error(`No se encontró el objeto con id_alerta_bandeja_alerta_persona ${alerta_idTo_find}.`);
            }
        }
    };










    const [contador_icono, set_contador_icono] = useState<boolean>(dat.marcador);


    // const [cerrar_modal, set_cerrar_modal] = useState<any>(null);










    // Efecto para obtener los datos de la sucursal de la empresa al cargar el componente
    useEffect(() => {
        fetch_data_get().catch((error) => {
            console.error(error);
        });
    }, []);



    useEffect(() => {
        handle_change_suspender().catch((error) => {
            console.error(error);
        });
    }, [contador_icono]);




    return (
        <div>
            <Tooltip title="Archivar alerta" placement="right">
                <Button
                    onClick={() => { setVisible(true); }}
                // onClick={}   
                >
                    <ArchiveIcon sx={{ color: !contador_icono ? undefined : 'rgba(0, 0, 0, 0.3)' }} />
                </Button>
            </Tooltip>
            <Dialog
                visible={visible}
                style={{ width: 420 }}
                closable={false}
                onHide={() => { setVisible(false) }}
                footer={footer_content}
                modal
            >
                <Grid container sx={{
                    background: '#FAFAFA',
                    borderRadius: '15px',
                    p: '20px',
                    boxShadow: '0px 3px 6px #042F4A26',
                }}>
                    <h4 style={{ marginBottom: '20px' }}>¿Estas seguro de suspender las repeticiones de esta alerta?</h4>
                </Grid>
            </Dialog>
        </div>
    );
};