/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import 'leaflet/dist/leaflet.css';
import { api } from '../../../../api/axios';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import AddIcon from "@mui/icons-material/Add";
import { Title } from '../../../../components';
import { Divider, Button, Grid, } from '@mui/material';
import { CrearConceptoPago } from './CrearConceptoPago';
import { Chip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { control_error } from '../../../../helpers';
import { ConceptoEditar } from './ConceptoEditar';


interface ConfiguracionBasica {
    id: number;
    Estado: boolean;
    TipoRenta: string;
    TipoCobro: string;
    Descripcion: string;
}


// eslint-disable-next-line @typescript-eslint/no-var-requires
// eslint-disable-next-line @typescript-eslint/naming-convention
export const ConceptoPago: React.FC = () => {
    const [configuraciones, setConfiguraciones] = useState<ConfiguracionBasica[]>([]);
    const [selectedConfiguracion, setSelectedConfiguracion] = useState<ConfiguracionBasica | null>(null);

    const handleAbrirEditar = (configuracion: ConfiguracionBasica) => {
        setSelectedConfiguracion(configuracion);
        setIsBuscarActivo(true);
    };

    const fetchConfiguraciones = async (): Promise<void> => {
        try {
            const url = "/recaudo/configuracion_baisca/registrosconfiguracion/get/";
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

    const handleEliminarConfiguracion = async (id: number) => {
        try {
            const url = `/recaudo/configuracion_baisca/registrosconfiguracion/delete/${id}/`;
            const response = await api.delete(url);
            console.log("Configuración eliminada con éxito", response.data);
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
        // { field: 'id', headerName: 'ID', width: 70 },
        {
            field: 'Estado',
            headerName: 'Estado',
            width: 130,
            flex: 1,

            renderCell: (params: any) => (
                <Chip
                    size="small"
                    label={params.value ? 'Activo' : 'Inactivo'}
                    color={params.value ? 'success' : 'error'}
                    variant="outlined"
                />
            )
        },
        { field: 'TipoRenta', headerName: 'Tipo de Renta', width: 130, flex: 1 },
        { field: 'TipoCobro', headerName: 'Tipo de Cobro', width: 130, flex: 1 },
        { field: 'varible', headerName: 'varible', width: 130, flex: 1 },
        { field: 'constante', headerName: 'constante', width: 130, flex: 1 },

        { field: 'Descripcion', headerName: 'Descripción', width: 200, flex: 1 },
        {
            field: 'Acciones',
            headerName: 'Acciones',
            width: 200,
            flex: 1,
            renderCell: (params: any) => (
                <>
                    <IconButton
                        color="error"
                        onClick={() => handleEliminarConfiguracion(params.row.id)}
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


    return (
        <>

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
            {/* <button onClick={() => console.log(tipoRio)}>Mostrar zonahidrica en la consola</button> */}
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
                <Title title="Tipos  de cobro " />
                <Grid item xs={3} sm={2} marginTop={2} >
                    <Button startIcon={<AddIcon />} onClick={handle_open_buscar} fullWidth variant="outlined"    >
                        Crear
                    </Button>
                </Grid>


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
                        />
                    </div>
                </Grid>





            </Grid>
        </>
    );
};