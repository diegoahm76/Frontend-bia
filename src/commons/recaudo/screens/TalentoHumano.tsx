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
import { miEstilo } from '../../gestorDocumental/Encuesta/interfaces/types';
  interface Solicitud {
    id_medio_solicitud: any;
    nombre: any;
    aplica_para_pqrsdf: any;
    aplica_para_tramites: any;
    aplica_para_otros: any;
    registro_precargado: any;
    activo: any;
    item_ya_usado: any;
};
export interface SucursalEmpresa {
    id_sucursal_empresa: number;
    numero_sucursal: number;
    descripcion_sucursal: string;
    direccion: string;
  
}
// eslint-disable-next-line @typescript-eslint/naming-convention
interface Historico {
    radicado: any;
    id_documento: any;
    nombre_completo: any;
    ruta_archivo: {
        formato: any;
        ruta_archivo: string;
        fecha_creacion_doc: any;
    };
};
  interface pqrs {
    value: string;
    label: string;
};
  interface FormData {
    id_persona_alertar: any;
    organigrama: any;
    fecha_desde: any;
    fecha_hasta: any;
    radicado: any;
    estado_solicitud: any,
    pqrs: any,
    sucursal:any,
    solicitud: any,
    estado: any,
    asunto:any,
}
export const TalentoHumano: React.FC = () => {


    const initialFormData: FormData = {
        id_persona_alertar: null,
        pqrs: "",
        sucursal:"",
        solicitud: "",
        estado: "",
        radicado: "",
        organigrama: "",
        fecha_desde: "",
        fecha_hasta: "",
        estado_solicitud: "",
        asunto: "",
    };
    const [formData, setFormData] = useState(initialFormData);
    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };



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


    useEffect(() => {
        void fetchHistorico();
    }, []);
    const columns = [
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

    ];


    const [solicitud, set_solicitud] = useState<Solicitud[]>([]);
    const fetchsolicitud = async (): Promise<void> => {
        try {
            const url = "/gestor/pqr/medio-solicitud-pqrsdf/";
            const res = await api.get<{ data: Solicitud[] }>(url);
            set_solicitud(res.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchsolicitud();
    }, []);

    const [pqrss, setpqrs] = useState<pqrs[]>([]);
    const fetchSpqrs = async (): Promise<void> => {
        try {
            const url = "/gestor/choices/cod-tipo-pqrs/";
            const res = await api.get<{ data: pqrs[] }>(url);
            setpqrs(res.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchSpqrs();
    }, []);


    const [sucursal, set_sucursal] = useState<SucursalEmpresa[]>([]);
    const fetchsucursal = async (): Promise<void> => {
        try {
            const url = "/gestor/pqr/sucursales-pqrsdf/";
            const res = await api.get<{ data: SucursalEmpresa[] }>(url);
            set_sucursal(res.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchsucursal();
    }, []);

    return (
        <>
            <Grid container
                item xs={12} marginLeft={2} marginRight={2} marginTop={3} spacing={2}
                sx={miEstilo}
            >
                <Grid item xs={12} sm={12}>
                    <Title title="Talento humano   " />
                </Grid>

                <Grid item xs={12} sm={3}>
                    <FormControl size="small" fullWidth>
                        <InputLabel > GR    </InputLabel>
                        <Select
                            onChange={handleInputChange}
                            value={formData.pqrs}
                            name="pqrs"
                            label=" GR    "
                        >
                            {pqrss.map((pqrs) => (
                                <MenuItem key={pqrs.value} value={pqrs.value}>
                                    {pqrs.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                {/* solicitud */}
                <Grid item xs={12} sm={3}>
                    <FormControl size="small" fullWidth>
                        <InputLabel >Tipo    </InputLabel>
                        <Select
                            onChange={handleInputChange}
                            value={formData.solicitud}
                            name="solicitud"
                            label="Tipo      "
                        >
                            {solicitud.map((solicitud) => (
                                <MenuItem key={solicitud.id_medio_solicitud} value={solicitud.id_medio_solicitud}>
                                    {solicitud.nombre}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                {/* sucursal */}
                <Grid item xs={12} sm={3}>
                    <TextField
                        label="Valor de contratacion  "
                        variant="outlined"
                        size="small"
                        fullWidth

                        disabled
                        InputLabelProps={{
                            shrink: true,
                        }}
                
                    />
                </Grid>

            </Grid>


                <RenderDataGrid
                    title='    TalentoHumano'
                    columns={columns ?? []}
                    rows={Historico ?? []}
                />

        </>
    );
};