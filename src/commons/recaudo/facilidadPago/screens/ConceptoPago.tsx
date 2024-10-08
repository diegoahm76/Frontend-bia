/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import 'leaflet/dist/leaflet.css';
import { api } from '../../../../api/axios';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import AddIcon from "@mui/icons-material/Add";
import { Title } from '../../../../components';
import { Divider, Button, Grid, Chip } from '@mui/material';
import { CrearConceptoPago } from './CrearConceptoPago';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { control_error } from '../../../../helpers';
import { ConceptoEditar } from './ConceptoEditar';
import { TiposCobro } from './TiposCobro';
import { TipoRenta } from './TipoRenta';
import { Tasa } from './Tasa';
import Swal from 'sweetalert2';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

interface ConfiguracionBasica {
    valor: any;
    fecha_fin: any;
    variables: any;
    fecha_inicio: any;
    descripccion: any;
    nombre_variable: any;
    nombre_tipo_cobro: any;
    nombre_tipo_rentaany: any;
    id_valores_variables: any;
    usada: boolean;
    estado: boolean;
}
interface TipoCobro {
    id_tipo_cobro: number;
    nombre_tipo_cobro: string;
    tipo_renta_asociado: any;
}

interface TipoRenta {
    id_tipo_renta: number;
    nombre_tipo_renta: string;
    tipo_cobro_asociado: any;
    tipo_renta_asociado: any
}
export const ConceptoPago: React.FC = () => {
    const [value, setValue] = useState<number>(2023);
    const [configuraciones, setConfiguraciones] = useState<ConfiguracionBasica[]>([]);
    const [knobValue, setKnobValue] = useState<number>(2023);
    const [selectedConfiguracion, setSelectedConfiguracion] = useState<ConfiguracionBasica | null>(null);
    const [isBuscarActivo, setIsBuscarActivo] = useState<boolean>(false);
    const [is_modal_active, set_is_buscar] = useState<boolean>(false);
    const [is_tasa, set_is_tasa] = useState<boolean>(false);
    const [selectedButton, setSelectedButton] = useState(null);




    const fetchConfiguraciones = async (): Promise<void> => {
        try {
            const url = "/recaudo/configuracion_baisca/valoresvariables/get/";
            const res = await api.get(url);
            const configuracionesData: ConfiguracionBasica[] = res.data?.data || [];
            setConfiguraciones(configuracionesData);
        } catch (error) {
            console.error(error);
        }
    };



    const handleEliminarConfiguracion = async (id_valores_variables: number) => {
        try {
            const url = `/recaudo/configuracion_baisca/valoresvariables/delete/${id_valores_variables}/`;
            const response = await api.delete(url);
            fetchConfiguraciones();
            control_error("eliminado exitosamente ");

        } catch (error: any) {
            console.error("Error al eliminar la configuración", error);
            fetchConfiguraciones();
        }
    };


    const ActuailizarEstadoVariable = async (id_valor_varaible: number, usada: boolean) => {
        try {
            const url = `recaudo/configuracion_baisca/valoresvariables_estado/put/${id_valor_varaible}/`;
            const data = { "usada": !usada }
            const response = await api.put(url, data);
            let message = !usada ? 'Protegida' : 'Desprotegida';
            Swal.fire({
                icon: 'success',
                title: message,
            });
            fetchConfiguraciones();
        } catch (error: any) {
            control_error(error.response.data.detail);
        }
    };

    const columns = [
        { field: 'nombre_tipo_renta', headerName: 'Tipo de Renta', flex: 1 },
        { field: 'nombre_tipo_cobro', headerName: 'Tipo de Cobro', flex: 1 },
        { field: 'descripccion', headerName: 'Descripción', flex: 1 },
        { field: 'nombre_variable', headerName: 'Variable', flex: 1 },
        { field: 'fecha_inicio', headerName: 'Fecha de Inicio', flex: 1 },
        { field: 'fecha_fin', headerName: 'Fecha de Fin', flex: 1 },
        {
            field: 'estado',
            headerName: 'Usada',
            flex: 1,
            renderCell: (params: any) => (
                <Chip
                    icon={
                        params.row.estado ? (
                            <CheckCircleIcon style={{ color: 'green' }} />
                        ) : (
                            <CancelIcon style={{ color: 'red' }} />
                        )
                    }
                    label={params.row.estado ? 'Usada' : 'No usada'}
                    style={{
                        borderColor: params.row.estado ? 'green' : 'red',
                        color: params.row.estado ? 'green' : 'red',
                    }}
                    variant="outlined"
                />
            ),
        },
        {
            field: 'usada',
            headerName: 'Protegida',
            flex: 1,
            renderCell: (params: any) => (
                <Chip
                    icon={params.row.usada ? <LockIcon /> : <LockOpenIcon />}
                    label={params.row.usada ? 'Protegida' : 'No protegida'}
                    color={params.row.usada ? 'primary' : 'default'}
                    variant="outlined"
                />
            )
        },
        {
            field: 'valor',
            headerName: 'Valor',
            flex: 1,
            valueFormatter: (params:any) => {
              return parseInt(params.value, 10);
            },
          },
        {
            field: 'Acciones',
            headerName: 'Acciones',
            flex: 1,
            renderCell: (params: any) => (
                <>
                    {/* Mostrar el botón de eliminar solo si 'usada' y 'estado' no son ambos true */}
                    {!(params.row.usada && params.row.estado) && (
                        <IconButton
                            color="error"
                            onClick={() => handleEliminarConfiguracion(params.row.id_valores_variables)}
                        >
                            <DeleteIcon />
                        </IconButton>
                    )}
                    <IconButton
                        color="primary"
                        onClick={() => handleAbrirEditar(params.row)}
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        color="primary"
                        onClick={() => ActuailizarEstadoVariable(params.row.id_valores_variables, params.row.usada)}
                    >
                        {params.row.usada ? <LockIcon /> : <LockOpenIcon />}
                    </IconButton>
                </>
            )
        },
    ];
    

    const handle_open_buscar = (): void => {
        set_is_buscar(true);
    };



    const handleAbrirEditar = (configuracion: ConfiguracionBasica) => {
        setSelectedConfiguracion(configuracion);
        setIsBuscarActivo(true);
    };


    const handleButtonClick = (buttonText: any) => {
        setSelectedButton(buttonText);
    };


    const handle_open_tasa = (): void => {
        set_is_tasa(true);
    };
    const handle_close = (): void => {
        set_is_tasa(false);
    };

    // Manejador para decrementar el valor
    const handleDecrement = () => {
        setKnobValue(knobValue - 1);
        setValue(value - 1);
    };

    // Manejador para incrementar el valor
    const handleIncrement = () => {
        setKnobValue(knobValue + 1);
        setValue(value + 1);
    };

    useEffect(() => {
        void fetchConfiguraciones();
    }, []);

    const [tiposRenta, setTiposRenta] = useState<TipoRenta[]>([]);

    const fetchTiposRenta = async () => {
        try {
            const res = await api.get("/recaudo/configuracion_baisca/tiporenta/get/");
            setTiposRenta(res.data.data);
        } catch (error) {
            console.error("Error al obtener los tipos de renta", error);
        }
    };
    const [tiposCobro, setTiposCobro] = useState<TipoCobro[]>([]);

    const fetchTiposCobro = async () => {
        try {
            const res = await api.get("/recaudo/configuracion_baisca/tipoCobro/get/");
            setTiposCobro(res.data.data);
        } catch (error) {
            console.error("Error al obtener los tipos de cobro", error);
        }
    };

    return (
        <>

            <Tasa
                is_tasa={is_tasa}
                handle_close={handle_close}
                handleDecrement={handleDecrement}
                value={value} knobValue={knobValue}
                handleIncrement={handleIncrement} handle_open_tasa={handle_open_tasa}

            />

            <ConceptoEditar
                isBuscarActivo={isBuscarActivo}
                setIsBuscarActivo={setIsBuscarActivo}
                selectedConfiguracion={selectedConfiguracion}
                fetchConfiguraciones={fetchConfiguraciones}
            />
            <CrearConceptoPago
            setTiposCobro={setTiposCobro}
            tiposCobro={tiposCobro}
            fetchTiposCobro={fetchTiposCobro}
            tiposRenta={tiposRenta}
            setTiposRenta={setTiposRenta}
            fetchTiposRenta={fetchTiposRenta}
                is_modal_active={is_modal_active}
                set_is_modal_active={set_is_buscar}
                fetchConfiguraciones={fetchConfiguraciones}
            />
            {/* <button onClick={() => //  console.log('')(tipoRio)}>Mostrar zonahidrica en la consola</button> */}
            <Grid container
                item xs={12} marginLeft={2} marginRight={2} marginTop={3} spacing={2}
                sx={{
                    position: 'relative',
                    background: '#FAFAFA',
                    borderRadius: '15px',
                    p: '20px', m: '10px 0 20px 0', mb: '20px',
                    boxShadow: '0px 3px 6px #042F4A26',
                }}
            >
                <Title title="Concepto de pago " />
                <Grid item xs={3} sm={2} marginTop={2} >
                    <Button startIcon={<AddIcon />} onClick={handle_open_buscar} fullWidth variant="outlined"    >
                        Crear
                    </Button>
                </Grid>

                <Grid item xs={3} sm={2} marginTop={2} marginLeft={2} >
                    <Button startIcon={<AddIcon />} onClick={handle_open_tasa} fullWidth variant="outlined"    >
                        Interés
                    </Button>
                </Grid>

                <Grid item xs={9} sm={10} marginTop={2} ></Grid>
                <Divider
                    style={{
                        width: '98%',
                        marginTop: '8px',
                        marginBottom: '8px',
                        marginLeft: 'auto',
                    }}
                />
                <Grid item xs={12} sm={12} marginTop={2}>
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            density="compact"
                            autoHeight
                            pageSize={5}
                            rowHeight={75}
                            getRowHeight={() => 'auto'}
                            rowsPerPageOptions={[11]}
                            experimentalFeatures={{ newEditingApi: true }} 
                            rows={configuraciones}
                            columns={columns} 
                            getRowId={(row) => row.id_valores_variables}
                        />
                    </div>
                </Grid>
            </Grid>
            <Grid container
                item xs={12} marginLeft={2} marginRight={2} marginTop={3}
                sx={{
                    position: 'relative',
                    background: '#FAFAFA',
                    borderRadius: '15px',
                    p: '20px', m: '10px 0 20px 0', mb: '20px',
                    boxShadow: '0px 3px 6px #042F4A26',
                }}
            >

                <Title title="Configuración " />

                <Grid container item xs={12} spacing={2} marginTop={2}  >
                    <Grid item xs={12} sm={6}>
                        <Button fullWidth variant="contained" onClick={() => handleButtonClick("Tipos de renta")}>Tipos de renta</Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button fullWidth variant="contained" onClick={() => handleButtonClick("Tipos de cobro")}>Tipos de cobro</Button>
                    </Grid>

                    {/* <Grid item xs={4} sm={4}>
                        <Button fullWidth variant="contained" onClick={() => handleButtonClick("Variable")}>Variable</Button>
                    </Grid> */}
                </Grid>



            </Grid>

            {selectedButton === "Tipos de cobro" && <TiposCobro fetchTiposCobro={fetchTiposCobro} />}
            {selectedButton === "Tipos de renta" && <TipoRenta  fetchTiposRenta={fetchTiposRenta}  />}
            {/* {selectedButton === "Variable" && <Varible />} */}


        </>
    );
};