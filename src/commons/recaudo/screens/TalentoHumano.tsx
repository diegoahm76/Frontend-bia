/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import 'leaflet/dist/leaflet.css';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { Divider, Button, Grid, TextField, Dialog, InputLabel, Select, MenuItem, } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { control_error, control_success } from '../../../helpers';
import { Title } from '../../../components/Title';
import { api } from '../../../api/axios';
import { RenderDataGrid } from '../../gestorDocumental/tca/Atom/RenderDataGrid/RenderDataGrid';
import { DownloadButton } from '../../../utils/DownloadButton/DownLoadButton';
import AddIcon from "@mui/icons-material/Add";
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
    id: number;
    nivel: number;
    director: string;
    tecnicos: string;
    asesor: string;
    profesional: string;
    asistencial: string;
};

interface pqrs {
    value: string;
    label: string;
};
interface editar {
    asistencial: any,
    profesional: any,
    asesor: any,
    tecnicos: any,
    director: any,
    nivel: any,
    id: any
};
interface FormData {
    asistencial: any,
    profesional: any,
    asesor: any,
    tecnicos: any,
    director: any,
    nivel: any,
}
export const TalentoHumano: React.FC = () => {
    const [modo, setModo] = useState<"crear" | "editar" | null>(null);


    const initialFormData: FormData = {

        asistencial: "",
        profesional: "",
        asesor: "",
        tecnicos: "",
        director: "",
        nivel: "",
    };
    const [formData, setFormData] = useState(initialFormData);
    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // const [editar, seteditar] = useState<editar | null>(null);


    const [Historico, setHistorico] = useState<Historico[]>([]);
    const fetchHistorico = async (): Promise<void> => {
        try {
            const url = "/recaudo/configuracion_baisca/administracionpersonal/";
            const res = await api.get(url);
            const HistoricoData: Historico[] = res.data?.data || [];
            setHistorico(HistoricoData);
        } catch (error) {
            console.error(error);
        }
    };




    useEffect(() => {
        void fetchHistorico();
    }, []);
    const [selectid, setselectid] = useState('');

    const seteditar = (rowData: any) => {
        set_is_tasa(true);
        setModo("editar");
        setselectid(rowData.id)
        setFormData({
            asistencial: rowData.asistencial,
            profesional: rowData.profesional,
            asesor: rowData.asesor,
            tecnicos: rowData.tecnicos,
            director: rowData.director,
            nivel: rowData.nivel,
        });
    };

    const columns = [

        // { field: 'id', headerName: 'id  ', width: 130, flex: 1 },
        { field: 'nivel', headerName: 'nivel  ', width: 130, flex: 1 },
        { field: 'director', headerName: 'director', width: 130, flex: 1 },
        { field: 'tecnicos', headerName: 'tecnicos', width: 130, flex: 1 },
        { field: 'asesor', headerName: 'asesor', width: 130, flex: 1 },
        { field: 'profesional', headerName: 'profesional', width: 130, flex: 1 },
        { field: 'asistencial', headerName: 'asistencial', width: 130, flex: 1 },

        {
            field: 'Acciones',
            headerName: 'Acciones',
            width: 200,
            flex: 1,
            renderCell: (params: any) => (
                <>
                    <IconButton
                        color="primary"
                        onClick={() => seteditar(params.row)}
                    >
                        <EditIcon />
                    </IconButton>
                </>
            )
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


    const [is_tasa, set_is_tasa] = useState<boolean>(false);

    const handle_open_tasa = (): void => {
        set_is_tasa(true);
        setModo("crear");
    };
    const handle_close = (): void => {
        set_is_tasa(false);
        setFormData(initialFormData)
    };


    const handleSubmitCrear = async () => {
        try {
            const url = "/recaudo/configuracion_baisca/administracionpersonal/post/";
            const response = await api.post(url, formData);
            control_success("Guardado exitosamente");
            handle_close();
            fetchHistorico();
        } catch (error: any) {
            //  console.log('')(error.response.data.detail.detail);
            control_error(error.response.data.detail?.error);
        }
    };


    // Editar  
    const handleSubmit = async () => {
        try {
            const url = `/recaudo/configuracion_baisca/administracionpersonal/put/${selectid}/`;

            await api.put(url, formData);
            control_success("Editado  exitosamente");
            handle_close();
            fetchHistorico();
        } catch (error: any) {
            console.error("Error al actualizar la configuración", error);
            control_error(error.response.data.detail);
        }
    };
    return (
        <>


            <Dialog open={is_tasa} onClose={handle_close}   >
                <Grid container xs={12}
                    sx={miEstilo}
                >

                    <Grid container xs={12} spacing={2}    >

                        <Grid item xs={12}>
                            <Title title={`${modo} profecionales`} />
                        </Grid>
                        {/* {modo} */}
                        <Grid item xs={6}>
                            <TextField
                                label="nivel"
                                variant="outlined"
                                size="small"
                                fullWidth
                                required
                                name="nivel"
                                value={formData.nivel}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="director"
                                variant="outlined"
                                size="small"
                                fullWidth
                                required
                                name="director"
                                value={formData.director}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="tecnicos"
                                name="tecnicos"
                                variant="outlined"
                                size="small"
                                fullWidth
                                required
                                value={formData.tecnicos}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="asesor"
                                name="asesor"
                                variant="outlined"
                                size="small"
                                fullWidth
                                required
                                value={formData.asesor}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="profesional"
                                name="profesional"
                                variant="outlined"
                                size="small"
                                fullWidth
                                required
                                value={formData.profesional}
                                onChange={handleInputChange}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                label="asistencial"
                                name="asistencial"
                                variant="outlined"
                                size="small"
                                fullWidth
                                required
                                value={formData.asistencial}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item  >
                            <Button
                                color='success'
                                variant='contained'
                                startIcon={<SaveIcon />}
                                fullWidth
                                onClick={() => {
                                    if (modo === 'crear') {
                                        handleSubmitCrear();
                                    } else if (modo === 'editar') {
                                        handleSubmit();
                                    }
                                }}
                            >
                                {modo} profecionales
                            </Button>

                        </Grid>
                    </Grid>

                </Grid>

            </Dialog>






            <Grid container
                item xs={12} marginLeft={2} marginRight={2} marginTop={3} spacing={2}
                sx={miEstilo}
            >
                <Grid item xs={12} sm={12}>
                    <Title title="Profecionales" />
                </Grid>
                <Grid item   >
                    <Button startIcon={<AddIcon />} onClick={handle_open_tasa} fullWidth variant="outlined"    >
                        Crear
                    </Button>
                </Grid>
                {/* <Grid item xs={12} sm={3}>
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
                </Grid> */}


                {/* sucursal */}
            

            </Grid>


            <RenderDataGrid
                title='Profecionales'
                columns={columns ?? []}
                rows={Historico ?? []}
            />

        </>
    );
};