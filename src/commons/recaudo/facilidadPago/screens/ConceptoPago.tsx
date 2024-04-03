/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import 'leaflet/dist/leaflet.css';
import { api } from '../../../../api/axios';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import AddIcon from "@mui/icons-material/Add";
import { Title } from '../../../../components';
import { Divider, Button, Grid, Dialog, TextField, } from '@mui/material';
import { CrearConceptoPago } from './CrearConceptoPago'; 
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { control_error } from '../../../../helpers';
import { ConceptoEditar } from './ConceptoEditar';
import { TiposCobro } from './TiposCobro';
import { TipoRenta } from './TipoRenta';
import { Varible } from './Varible';
import { miEstilo } from '../../../gestorDocumental/Encuesta/interfaces/types';
import SaveIcon from '@mui/icons-material/Save';
import RemoveIcon from '@mui/icons-material/Remove';
import { Knob } from 'primereact/knob';
import { Tasa } from './Tasa';


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
}

interface ConfiguracionInteres {
    id: number;
    año: number;
    mes: number;
    valor_interes: string;
    estado_editable: boolean;
}
// eslint-disable-next-line @typescript-eslint/no-var-requires
// eslint-disable-next-line @typescript-eslint/naming-convention
export const ConceptoPago: React.FC = () => {
    const [value, setValue] = useState<number>(2023);

    const [configuraciones, setConfiguraciones] = useState<ConfiguracionBasica[]>([]);
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
   useEffect(() => {
        void fetchConfiguraciones();
    }, []);

    // const [configuracionInteres, setConfiguracionInteres] = useState<ConfiguracionInteres[]>([]);

    // const fetchConfiguracionInteres = async (): Promise<void> => {
    //     try {
    //         const url = `/recaudo/configuracion_basica/configuracioninterres/get/${value}/`;
    //         const res = await api.get(url);
    //         const configuracionInteresData: ConfiguracionInteres[] = res.data?.data || [];
    //         setConfiguracionInteres(configuracionInteresData);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };
    // useEffect(() => {
    //      void fetchConfiguracionInteres(); // Puedes ajustar el año según sea necesario
    // }, [value]);










    const [selectedConfiguracion, setSelectedConfiguracion] = useState<ConfiguracionBasica | null>(null);
 const handleAbrirEditar = (configuracion: ConfiguracionBasica) => {
        setSelectedConfiguracion(configuracion);
        setIsBuscarActivo(true);
    };


    

    const handleEliminarConfiguracion = async (id_valores_variables: number) => {
        try {
            const url = `/recaudo/configuracion_baisca/valoresvariables/delete/${id_valores_variables}/`;
            const response = await api.delete(url);
            //  console.log('')("Configuración eliminada con éxito", response.data);
            // Actualizar la lista de configuraciones después de eliminar
            fetchConfiguraciones();
            control_error("eliminado exitosamente ");

        } catch (error: any) {
            console.error("Error al eliminar la configuración", error);
            fetchConfiguraciones();
            // control_error(error.response.data.detail);3

            // Manejar el error
        }
    };

    const columns = [ 
        { field: 'nombre_tipo_renta', headerName: 'Tipo de Renta', width: 130, flex: 1 },
        { field: 'nombre_tipo_cobro', headerName: 'Tipo de Cobro', width: 130, flex: 1 },
        { field: 'descripccion', headerName: 'Descripción', width: 200, flex: 1 },

        { field: 'nombre_variable', headerName: 'varible', width: 130, flex: 1 },
   
        { field: 'fecha_inicio', headerName: 'fecha inicio', width: 130, flex: 1 },
        { field: 'fecha_fin', headerName: 'Fecha fin', width: 130, flex: 1 },


        {
            field: 'valor',
            headerName: 'Valor',
            width: 130,
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
        {
            field: 'Acciones',
            headerName: 'Acciones',
            width: 200,
            flex: 1,
            renderCell: (params: any) => (
                <>
                    <IconButton
                        color="error"
                        onClick={() => handleEliminarConfiguracion(params.row.id_valores_variables)}
                    >
                        <DeleteIcon />
                    </IconButton>

                    <IconButton
                        color="primary"
                        onClick={() => handleAbrirEditar(params.row)}
                    >
                        <EditIcon />
                    </IconButton>
                </>
            )
        },

    ];


    const [is_modal_active, set_is_buscar] = useState<boolean>(false);
    const handle_open_buscar = (): void => {
        set_is_buscar(true);
    };

    const [isBuscarActivo, setIsBuscarActivo] = useState<boolean>(false);

    const [selectedButton, setSelectedButton] = useState(null);

    const handleButtonClick = (buttonText: any) => {
        setSelectedButton(buttonText);
    };

    const [is_tasa, set_is_tasa] = useState<boolean>(false);

    const handle_open_tasa = (): void => {
        set_is_tasa(true);
    };
    const handle_close = (): void => {
        set_is_tasa(false);
    };

    // Estado para el valor del "Knob", empezando en 0 que corresponde a 2023
    const [knobValue, setKnobValue] = useState<number>(2023);

    // Manejador para actualizar el valor basado en el "Knob"
  

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
                <Title title="Concepto de pago. " />
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
                            rows={configuraciones}
                            columns={columns}
                            pageSize={5}
                            autoHeight
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

                <Title title="Configuracion " />

                <Grid container item xs={12} spacing={2} marginTop={2}  >
                    <Grid item xs={4} sm={4}>
                        <Button fullWidth variant="contained" onClick={() => handleButtonClick("Tipos de renta")}>Tipos de renta</Button>
                    </Grid>
                    <Grid item xs={4} sm={4}>
                        <Button fullWidth variant="contained" onClick={() => handleButtonClick("Tipos de cobro")}>Tipos de cobro</Button>
                    </Grid>

                    <Grid item xs={4} sm={4}>
                        <Button fullWidth variant="contained" onClick={() => handleButtonClick("Variable")}>Variable</Button>
                    </Grid>
                </Grid>



            </Grid>

            {selectedButton === "Tipos de cobro" && <TiposCobro />}
            {selectedButton === "Tipos de renta" && <TipoRenta />}
            {selectedButton === "Variable" && <Varible />}


        </>
    );
};