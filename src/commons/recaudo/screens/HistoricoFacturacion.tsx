/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import 'leaflet/dist/leaflet.css';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { Divider, Button, Grid, TextField, FormControl, InputLabel, Select, MenuItem, } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { control_error, control_success } from '../../../helpers';
import { Title } from '../../../components/Title';
import { api } from '../../../api/axios';
import { RenderDataGrid } from '../../gestorDocumental/tca/Atom/RenderDataGrid/RenderDataGrid';
import { DownloadButton } from '../../../utils/DownloadButton/DownLoadButton';
import Chip from '@mui/material/Chip';


// eslint-disable-next-line @typescript-eslint/naming-convention
interface Historico {
    id_documento: any;
    nombre_completo: any;
    radicado: any;
    ruta_archivo: {
        ruta_archivo: string;
        fecha_creacion_doc: any;
        formato: any;
    };
}
export const HistoricoFacturacion: React.FC = () => {
    const [Historico, setHistorico] = useState<Historico[]>([]);
    const fetchHistorico = async (): Promise<void> => {
        try {
            const url = "/recaudo/formulario/documento_formulario_recuado_get/";
            const res = await api.get(url);
            const HistoricoData: Historico[] = res.data?.data || [];
            setHistorico(HistoricoData);
        } catch (error) {
            console.error(error);
        }
    };

    const formatDate = (dateString: string | number | Date) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        //   / ${hours}:${minutes}
        return `${year}-${month}-${day}`;
    };

    // function formatDateTime(dateTimeStr) {
    //     const date = new Date(dateTimeStr);
    //     const year = date.getFullYear();
    //     const month = (date.getMonth() + 1).toString().padStart(2, '0');
    //     const day = date.getDate().toString().padStart(2, '0');
    //     let hours = date.getHours();
    //     const minutes = date.getMinutes().toString().padStart(2, '0');
    //     const ampm = hours >= 12 ? 'PM' : 'AM';
    //     hours = hours % 12;
    //     hours = hours ? hours : 12; // si la hora es 0, la convertimos en 12
    //     const formattedTime = hours + ':' + minutes + ' ' + ampm;

    //     return `${day}/${month}/${year} ${formattedTime}`;
    // };


    useEffect(() => {
        void fetchHistorico();
    }, []);
    const columns = [
        // { field: 'id_documento', headerName: ' Numero ', width: 130, flex: 1 },
        { field: 'nombre_completo', headerName: 'Nombre completo', width: 130, flex: 1 },
        { field: 'radicado', headerName: 'Radicado', width: 130, flex: 1 },

        {
            field: 'fecha_creacion_doc',
            headerName: 'Fecha Creación',
            width: 180,
            flex: 1,
            valueGetter: (params: any) => formatDate(params.row.ruta_archivo.fecha_creacion_doc),
        },
        {
            field: 'formato',
            headerName: 'Formato',
            width: 180,
            flex: 1,
            valueGetter: (params: any) => (params.row.ruta_archivo.formato),
        }, 
        {
            field: 'ruta_archivo',
            headerName: 'Archivo',
            width: 200,
            flex: 1,
            renderCell: (params: any) => (
                <DownloadButton
                    condition={false}
                    fileUrl={params.value.ruta_archivo}
                    fileName={params.value.id_documento}
                />
            )
        }, 
    ];
    return (
        <>
            <RenderDataGrid
                title='Histórico de archivos'
                columns={columns ?? []}
                rows={Historico ?? []}
            />
        </>
    );
};