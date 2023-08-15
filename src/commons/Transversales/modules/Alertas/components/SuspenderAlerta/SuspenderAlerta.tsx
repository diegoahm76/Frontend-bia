import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import { useEffect, useState } from 'react';
import { Button } from "@mui/material";
import { control_success } from '../../../../../../helpers/controlSuccess';
import { control_error } from '../../../../../../helpers/controlError';
import { api } from '../../../../../../api/axios';

export interface AlertaBandejaAlertaPersona {
    id_alerta_bandeja_alerta_persona: number;
    nivel_prioridad: number;
    tipo_alerta: string;
    fecha_hora: string;
    nombre_clase_alerta: string;
    id_modulo: number;
    nombre_modulo: string;
    ultima_repeticion: boolean;
    leido: boolean;
    fecha_leido: string | null;
    archivado: boolean;
    fecha_archivado: string | null;
    repeticiones_suspendidas: boolean;
    fecha_suspencion_repeticion: string | null;
    fecha_envio_email: string | null;
    email_usado: string;
    responsable_directo: boolean;
    id_bandeja_alerta_persona: number;
    id_alerta_generada: number;
}

export interface Alerta_update {
    id_alerta_bandeja_alerta_persona: number;
    leido: string | boolean;
    fecha_leido: string | null;
    archivado: boolean;
    fecha_archivado: string | null;
    repeticiones_suspendidas: boolean;
    fecha_suspencion_repeticion: string | null;
    fecha_envio_email: string | null;
    email_usado: string;
    responsable_directo: boolean;
    id_bandeja_alerta_persona: number;
    id_alerta_generada: number;
}
    // eslint-disable-next-line @typescript-eslint/naming-convention
export const SuspenderAlerta: React.FC = () => {


















    // eslint-disable-next-line @typescript-eslint/naming-convention
    const [visible, setVisible] = useState<boolean>(false);
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const visibleIcon = visible;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const asdfff = (): void => { setVisible(true) }


    // eslint-disable-next-line @typescript-eslint/naming-convention
    const alertaInicial: AlertaBandejaAlertaPersona = {
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


    // eslint-disable-next-line @typescript-eslint/naming-convention
    const [dataEntidad, setDataEntidad] = useState<Alerta_update[]>([alertaInicial]); // Inicialización con un elemento inicial
    console.log(dataEntidad);
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const fetchDataGet = async (): Promise<void> => {
        try {
            const url = '/transversal/alertas/alertas_bandeja_Alerta_persona/get-alerta_bandeja-by-bandeja/8/';
            const res = await api.get(url); // Utiliza Axios para realizar la solicitud GET
            const facilidad_pago_data = res.data.data;
            setDataEntidad(facilidad_pago_data);
            control_success('Datos actualizados correctamente');
        } catch (error) {
            console.error(error);
        }
    };

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const handleChangeLeido = async (): Promise<void> => {

        // eslint-disable-next-line @typescript-eslint/naming-convention
        const alertaIdToFind = 22;
        if (dataEntidad.length > 0) {
            // Buscar el índice del objeto en el array dataEntidad con el mismo id_alerta_bandeja_alerta_persona
            // eslint-disable-next-line @typescript-eslint/naming-convention
            const updatedDataEntidadIndex = dataEntidad.findIndex(alerta => alerta.id_alerta_bandeja_alerta_persona === alertaIdToFind);

            if (updatedDataEntidadIndex !== -1) {
                try {
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    const firstAlert = dataEntidad[updatedDataEntidadIndex];
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    const updatedDataEntidad: Alerta_update = {
                        ...firstAlert,
                        leido: true,
                    };

                    const payload = {
                        ...updatedDataEntidad,
                    };

                    const response = await api.put(`/transversal/alertas/alertas_bandeja_Alerta_persona/update/${alertaIdToFind}/`, payload);

                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    const updatedLeido = response.data.leido;

                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    const updatedDataEntidadCopy = [...dataEntidad];
                    updatedDataEntidadCopy[updatedDataEntidadIndex] = {
                        ...updatedDataEntidadCopy[updatedDataEntidadIndex],
                        leido: updatedLeido,
                    };

                    setDataEntidad(updatedDataEntidadCopy);
                    control_success('Campo "leido" actualizado correctamente');
                } catch (error: any) {
                    control_error(error.response.data.detail);
                }
            } else {
                control_error(`No se encontró el objeto con id_alerta_bandeja_alerta_persona ${alertaIdToFind}.`);
            }
        }
    };




    // Efecto para obtener los datos de la sucursal de la empresa al cargar el componente
    useEffect(() => {
        fetchDataGet().catch((error) => {
            console.error(error);
        });
    }, []);

    
    useEffect(() => {
        handleChangeLeido().catch((error) => {
      console.error(error);
    });
    }, [visible]);
    return (
        <div>
            <Button onClick={asdfff}>
                <DoNotDisturbOnIcon sx={{ color: visibleIcon ? undefined : 'rgba(0, 0, 0, 0.3)' }} />
            </Button>
        </div>
    );
};






