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
import { FormControl } from '@mui/material';

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
    descripcion: any,
    nombre: any,
    nivel: any,
    valor: any,

};

interface pqrs {
    value: string;
    label: string;
};
interface Editar {
    asistencial: any,
    profesional: any,
    asesor: any,
    tecnicos: any,
    director: any,
    nivel: any,
    id: any
};
interface FormData {
    descripcion: any,
    nombre: any,
    nivel: any,
    valor: any,
}
export const TalentoHumano: React.FC = () => {
    const [modo, setModo] = useState<"Crear" | "Editar" | null>(null);


    const initialFormData: FormData = {

        descripcion: "",
        nombre: "",
        valor: "",
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

    // const [Editar, seteditar] = useState<Editar | null>(null);


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
        setModo("Editar");
        setselectid(rowData.id)
        setFormData({
            descripcion: rowData.descripcion,
            nombre: rowData.nombre,
            nivel: rowData.nivel,
            valor: rowData.valor,
        });
    };

    const seteliminar = (rowData: any) => {

        setselectid(rowData.id)

    };

    const columns = [
        { field: 'nivel', headerName: 'Nivel',  flex: 1 },
        { field: 'nombre', headerName: 'Nombre',   flex: 1 },
        {
            field: 'valor',
            headerName: 'Valor',
          
            flex: 1,
            renderCell: (params:any) => {
                // Formatear el valor a pesos colombianos
                const valorFormateado = new Intl.NumberFormat('es-CO', {
                    style: 'currency',
                    currency: 'COP',
                    minimumFractionDigits: 0, // Ajusta según la precisión deseada
                }).format(params.value);
                
                return <>{valorFormateado}</>;
            },
        },
        { field: 'descripcion', headerName: 'Descripcion',  flex: 1 },
        {
            field: 'Acciones',
            headerName: 'Acciones',
           
            flex: 1,
            renderCell: (params: any) => (
                <>
                    <IconButton
                        color="primary"
                        onClick={() => seteditar(params.row)}
                    >
                        <EditIcon />
                    </IconButton>

                    {/* <IconButton
                        color="error"
                        onClick={() => handleEliminarConfiguracion(params.row.id)}
                    >
                        <DeleteIcon />
                    </IconButton> */}
                </>
            )
        },

    ];
    const handleEliminarConfiguracion = async (id: number) => {
        try {
            const url = `/recaudo/configuracion_baisca/tiporenta/delete/${id}/`;
            const response = await api.delete(url);
            control_error("eliminado exitosamente ");

        } catch (error: any) {
            console.error("Error al eliminar la configuración", error);

            // Manejar el error
        }
    };




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
        setModo("Crear");
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



    const [selectedOption, setSelectedOption] = useState('');
    const [otherValue, setOtherValue] = useState('');

    const handleSelectChange = (event: { target: { value: any; }; }) => {
        const value = event.target.value;
        setSelectedOption(value);

        if (value !== 'otro') {
            setFormData({ ...formData, nombre: value });
        }
    };
    const handleOtherInputChange = (event: { target: { value: any; }; }) => {
        const value = event.target.value;
        setOtherValue(value);
        setFormData({ ...formData, nombre: value });
    };
    return (
        <>


            <Dialog open={is_tasa} onClose={handle_close}   >
                <Grid container xs={12}
                    sx={miEstilo}
                >

                    <Grid container xs={12} spacing={2}    >

                        <Grid item xs={12}>
                            <Title title={`${modo} Profesionales`} />
                        </Grid>
                        {/* {modo} */}

                        {/* <Grid container xs={12}   spacing={2}   >
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
                        </Grid> */}



                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="si-no-select-label">Grado</InputLabel>
                                <Select
                                    labelId="Mes"
                                    label="Grado"
                                    name="nivel"
                                    value={formData.nivel}
                                    onChange={handleInputChange}
                                >
                                    {[...Array(28).keys()].map((numero) => (
                                        <MenuItem key={numero + 1} value={numero + 1}>{numero + 1}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6}> 
                            <FormControl fullWidth size="small" variant="outlined" required>
                                <InputLabel id="select-nombre-label">Nombre</InputLabel>
                                <Select
                                    labelId="select-nombre-label"
                                    id="nombre-select"
                                    value={selectedOption}
                                    label="Nombre"
                                    onChange={handleSelectChange}
                                    fullWidth
                                >
                                    <MenuItem value="Directivo">Directivo</MenuItem>
                                    <MenuItem value="Asesor">Asesor</MenuItem>
                                    <MenuItem value="Profesional">Profesional</MenuItem>
                                    <MenuItem value="Tecnico">Tecnico</MenuItem>
                                    <MenuItem value="Asistencial">Asistencial</MenuItem>
                                    <MenuItem value="otro">Otro</MenuItem>
                                </Select>
                            </FormControl> 
                        </Grid>
                        {selectedOption === 'otro' && (
                            <Grid item xs={6}>
                                <TextField
                                    label="Especificar otro"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    required
                                    name="nombreOtro"
                                    value={otherValue}
                                    onChange={handleOtherInputChange}
                                />
                            </Grid>
                        )}
                        <Grid item xs={6}>
                            <TextField
                                label="valor"
                                variant="outlined"
                                size="small"
                                fullWidth
                                required
                                name="valor"
                                value={formData.valor}
                                onChange={handleInputChange}
                            />
                        </Grid>



                        <Grid item xs={6}>
                            <TextField
                                label="descripcion"
                                variant="outlined"
                                size="small"
                                fullWidth
                                required
                                name="descripcion"
                                value={formData.descripcion}
                                onChange={handleInputChange}
                            />
                        </Grid>




                        {/* {selectid} */}

                        <Grid item  >
                            <Button
                                color='success'
                                variant='contained'
                                startIcon={<SaveIcon />}
                                fullWidth
                                onClick={() => {
                                    if (modo === 'Crear') {
                                        handleSubmitCrear();
                                    } else if (modo === 'Editar') {
                                        handleSubmit();
                                    }
                                }}
                            >
                                {modo} Profesionales
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
                    <Title title="Profesionales" />
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
                title='Listado de profesionales'
                columns={columns ?? []}
                rows={Historico ?? []}
            />

        </>
    );
};